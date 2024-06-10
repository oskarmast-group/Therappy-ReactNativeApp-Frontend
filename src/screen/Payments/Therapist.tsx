import Loading from "../../components/Loading";
import TopBar from "../../components/TopBar";
import React, { PropsWithChildren, useEffect, useState } from "react";
import {
  BaseText,
  Body,
  H4Title,
  SectionTitle,
  Title,
} from "../../components/Text";
import Button, { ButtonText, IconButton } from "../../components/Button";
import ALERT_TYPES from "../../alert/interfaces/AlertTypes";
import { useAlert } from "../../alert";
import { formatMoney, tranlateDay } from "../../utils/text";
import { DARKER_TEXT, PRIMARY_GREEN } from "../../resources/constants/colors";
import InfoSVG from "../../resources/img/icons/InfoIcon";
import { useNavigate } from "react-router-native";
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { useAuth } from "../../context/Auth";
import { useAccount } from "../../context/Account";
import { getAccountLink } from "../../services/account";
import { AxiosResponse } from "axios";
import Scrollable from "../../components/containers/Scrollable";

const ErrorText: React.FC<PropsWithChildren> = ({ children }) => (
  <Text style={styles.errorText}>{children}</Text>
);

const TotalAmount: React.FC<PropsWithChildren> = ({ children }) => (
  <Text style={styles.totalAmount}>{children}</Text>
);

const AmountDetailsContainer: React.FC<PropsWithChildren> = ({ children }) => (
  <View style={styles.amountDetailsContainer}>{children}</View>
);

const AmountDetail: React.FC<PropsWithChildren> = ({ children }) => (
  <View style={styles.amountDetail}>{children}</View>
);

const PayoutFrequencyContainer: React.FC<PropsWithChildren> = ({
  children,
}) => <View style={styles.payoutFrequencyContainer}>{children}</View>;

const ScrollableChild: React.FC<PropsWithChildren> = ({ children }) => (
  <View style={styles.scrollableChild}>{children}</View>
);

const getAvailableAmount = (balance: any) => {
  if (!balance.available) return 0;

  const amountMxn = balance.available.find(
    (b: { currency: string }) => b.currency === "mxn"
  );

  if (!amountMxn) return 0;
  return amountMxn.amount / 100;
};

const getPendingAmount = (balance: any) => {
  if (!balance.pending) return 0;

  const amountMxn = balance.pending.find(
    (b: { currency: string }) => b.currency === "mxn"
  );

  if (!amountMxn) return 0;
  return amountMxn.amount / 100;
};

const getTotalAmount = (balance: any) => {
  const available = getAvailableAmount(balance);
  const pending = getPendingAmount(balance);

  return formatMoney(available + pending);
};

type Schedule = {
  interval: string;
  weekly_anchor: string | number;
  monthly_anchor: string | number;
  delay_days: number;
};

const getPayoutFrecuencyString = (schedule: Schedule) => {
  switch (schedule.interval) {
    case "daily":
      return "Recibes depositos disponibles diario.";
    case "weekly":
      return `Recibes depositos disponibles el ${
        tranlateDay[schedule.weekly_anchor as keyof typeof tranlateDay]
      } de cada semana.`;
    case "monthly":
      return `Recibes depositos disponibles el ${schedule.monthly_anchor} de cada mes.`;
    default:
      return "";
  }
};

const Therapists = () => {
  const { user } = useAuth();
  const {
    accountInfo: accountInformation,
    fetchAccountInformation,
    loadingAccountInfo,
  } = useAccount();
  const [requestingLink, setRequestingLink] = useState(false);
  const [error, setError] = useState("");
  const alert = useAlert();
  const navigate = useNavigate();
  useEffect(() => {
    fetchAccountInformation();
  }, []);

  const requestAccountLink = async () => {
    setRequestingLink(true);
    try {
      const accountLink: any = await getAccountLink();

      navigate(accountLink.url);
    } catch (e) {
      console.error(e);
      setError("Stripe no disponible.");
    }

    setRequestingLink(false);
  };

  console.log(accountInformation);

  return (
    <>
      <TopBar title={"Pagos"} />
      <Scrollable>
        <ScrollableChild>
          {loadingAccountInfo || !user ? (
            <Loading />
          ) : accountInformation?.details_submitted ? (
            <View style={{ display: "flex", flexDirection: "column" }}>
              <SectionTitle>Balance Total</SectionTitle>
              <TotalAmount>
                {getTotalAmount(accountInformation.balance)}
              </TotalAmount>
              <AmountDetailsContainer>
                <AmountDetail>
                  <H4Title>Disponible</H4Title>
                  <Body>
                    {formatMoney(
                      getAvailableAmount(accountInformation.balance)
                    )}
                  </Body>
                </AmountDetail>
                <AmountDetail>
                  <View
                    style={{ display: "flex", flexDirection: "row", gap: 5 }}
                  >
                    <H4Title>Pendiente</H4Title>
                    <TouchableHighlight
                      onPress={() => {
                        alert({
                          type: ALERT_TYPES.INFO,
                          config: {
                            title: "Saldo pendiente",
                            body: (
                              <Text>
                                Por seguridad el dinero que ingresa a Stripe
                                deberá permanacer ahí por{" "}
                                {
                                  accountInformation.settings.payouts.schedule
                                    .delay_days
                                }{" "}
                                días. {"\n"}
                                {"\n"}
                                Al terminar este periodo el saldo pasará a estar
                                disponible para la siguiente transferencia
                                automática.
                              </Text>
                            ),
                            buttonText: "OK",
                          },
                        })
                          .then(() => {})
                          .catch(() => {});
                      }}
                      style={{
                        padding: 5,
                        backgroundColor: PRIMARY_GREEN,
                        borderRadius: 12,
                        gap: 20,
                        margin: 0,
                        alignItems: "center",
                        display: "flex",
                        width: 24,
                        height: 24,
                      }}
                    >
                      <View style={{ width: 14, height: 14 }}>
                        <InfoSVG />
                      </View>
                    </TouchableHighlight>
                  </View>

                  <Body>
                    {formatMoney(getPendingAmount(accountInformation.balance))}
                  </Body>
                </AmountDetail>
              </AmountDetailsContainer>
              {accountInformation.settings.payouts.schedule.interval !==
                "manual" && (
                <PayoutFrequencyContainer>
                  <H4Title>Transferencia automática</H4Title>
                  <Body>
                    {getPayoutFrecuencyString(
                      accountInformation.settings.payouts.schedule
                    )}
                  </Body>
                </PayoutFrequencyContainer>
              )}
            </View>
          ) : (
            <>
              <Body style={{ textAlign: "center" }}>
                Tienes que completar tu registro en la página de Stripe para
                comenzar a recibir pagos.
              </Body>
              <Button
                onPress={requestAccountLink}
                disabled={requestingLink}
                style={{ marginTop: 30, maxWidth: 200, alignSelf: "center" }}
              >
                <BaseText>Ir a Stripe</BaseText>
              </Button>
              {error && <ErrorText>{error}</ErrorText>}
            </>
          )}
        </ScrollableChild>
      </Scrollable>
    </>
  );
};

const styles = StyleSheet.create({
  errorText: {
    textAlign: "center",
    fontSize: 12, // Converted from 0.75rem to pixels (0.75rem = 12px)
    fontWeight: "600",
    color: "#d50000",
  },
  totalAmount: {
    fontSize: 54,
    fontWeight: "600",
    color: "#000",
  },
  amountDetailsContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    color: "#000",
  },
  amountDetail: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    color: "#000",
  },
  payoutFrequencyContainer: {
    marginTop: 15,
    padding: 10,
    borderWidth: 2,
    borderColor: "#000", // DARKER_TEXT color should be defined or imported
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
  },
  scrollableChild: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    alignContent: "center",
  },
});

export default Therapists;
