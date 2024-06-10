import React, { PropsWithChildren, useEffect, useState } from "react";
import Loading from "../../components/Loading";
import TopBar from "../../components/TopBar";
import { BaseText, Body } from "../../components/Text";
import Button from "../../components/Button";
// import { usePaymentSheet } from "@stripe/stripe-react-native";
import { View, StyleSheet } from "react-native";
import { API } from "../../resources/constants/urls";
import axios from "axios";
import { useAuth } from "../../context/Auth";
import Scrollable from "../../components/containers/Scrollable";
import { useAccount } from "../../context/Account";
import api from "../../services/api";
import PaymentMethod from "./components/PaymentMethods";
import { IPaymentMethod } from "../../interfaces/User";

const MethodsContainer: React.FC<PropsWithChildren> = ({ children }) => (
  <View style={styles.methodsContainer}>{children}</View>
);

const ScrollableChild: React.FC<PropsWithChildren> = ({ children }) => (
  <View style={styles.scrollableChild}>{children}</View>
);

const Clients = () => {
  const { fetchPaymentMethods, loadingPaymentMethods } = useAccount();
  const [paymentMethods, setPaymentMethods] = useState<IPaymentMethod[] | null>(
    null
  );
  const [ready, setReady] = useState(false);
  // const { initPaymentSheet, presentPaymentSheet, loading } = usePaymentSheet();

  useEffect(() => {
    const handlePaymentMethod = async () => {
      try {
        const res = await fetchPaymentMethods();
        console.log("result", res);
        setPaymentMethods(res);
      } catch (error) {
        console.log(error);
      }
    };
    handlePaymentMethod();
  }, []);

  // const initialisePaymentSheet = async () => {
  //   // console.log('initialisePaymentSheet');
  //   const { setupIntentSecret, ephemeralKey, customerId } =
  //     await fetchPaymentSheetParams();
  //   // console.log(setupIntentSecret);
  //   const { error } = await initPaymentSheet({
  //     customerId: customerId,
  //     customerEphemeralKeySecret: ephemeralKey.secret,
  //     setupIntentClientSecret: setupIntentSecret,
  //     merchantDisplayName: "Example Inc.",
  //     applePay: {
  //       merchantCountryCode: "US",
  //     },
  //     googlePay: {
  //       merchantCountryCode: "US",
  //       testEnv: true,
  //       currencyCode: "usd",
  //     },
  //     allowsDelayedPaymentMethods: true,
  //     // returnURL: 'stripe-example://stripe-redirect',
  //   });
  //   if (error) {
  //     // console.error('An error occurred while initializing payment sheet:', error.message);
  //   } else {
  //     setReady(true);
  //   }
  // };

  const fetchPaymentSheetParams = async () => {
    try {
      const url = `/stripe-clients/payment-sheet`;

      const response = await api.post(url, {});

      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { setupIntentSecret, ephemeralKey, customerId } = response.data;
      // console.log(ephemeralKey.id, 'ephemeralKey');
      return {
        setupIntentSecret,
        ephemeralKey,
        customerId,
      };
    } catch (error) {
      console.error(
        "An error occurred while fetching payment sheet parameters:",
        error
      );
      // You can also handle the error here or re-throw it to be handled by the calling code
      throw error;
    }
  };

  async function buy() {
    // const { error } = await presentPaymentSheet();
    // if (error) {
    //   // console.error('An error occurred while initializing payment sheet:', error.message);
    // } else {
    //   // Alert.alert('Success', 'The payment method was setup successfully');
    //   setReady(false);
    // }
  }

  return (
    <>
      <TopBar title={"Métodos de pago"} />
      <Scrollable>
        <ScrollableChild>
          {loadingPaymentMethods || !paymentMethods ? (
            <Loading />
          ) : (
            <>
              <MethodsContainer>
                {paymentMethods?.length > 0 ? (
                  paymentMethods.map((method, index) => (
                    <PaymentMethod
                      method={method}
                      key={`payment-method-${index}`}
                    />
                  ))
                ) : (
                  <Body style={{ textAlign: "center" }}>
                    <BaseText>
                      No tienes métodos de pago registrados aún
                    </BaseText>
                  </Body>
                )}
              </MethodsContainer>
              <Button
                onPress={buy}
                style={{
                  marginTop: 30,
                  maxWidth: 200,
                  alignSelf: "center",
                }}
              >
                <BaseText style={{ color: "#fff" }}>Agregar Método</BaseText>
              </Button>
            </>
          )}
        </ScrollableChild>
      </Scrollable>
    </>
  );
};

const styles = StyleSheet.create({
  scrollableChild: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    alignContent: "center",
  },
  methodsContainer: {
    flexDirection: "column",
    gap: 10,
    padding: 0,
    flex: 1,
    minHeight: 0,
    marginBottom: 0,
  },
});

export default Clients;
