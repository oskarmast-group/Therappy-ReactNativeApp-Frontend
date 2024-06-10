import React from "react";
import { View, StyleSheet } from "react-native";
import { DARKER_TEXT, GREEN } from "../../../resources/constants/colors";
import { useAlert } from "../../../alert";
import ALERT_TYPES from "../../../alert/interfaces/AlertTypes";
import { BaseText } from "../../../components/Text";
import { IPaymentMethod } from "../../../interfaces/User";
import { useAccount } from "../../../context/Account";
import Trash from "../../../resources/img/Trash";
import Visa from "../../../resources/img/cards/Visa";
import Amex from "../../../resources/img/cards/Amex";
import Generic from "../../../resources/img/cards/Generic";
import Mastercard from "../../../resources/img/cards/Mastercard";

const styles = StyleSheet.create({
  container: {
    margin: 0,
    borderWidth: 1,
    borderColor: GREEN,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    display: "flex",
  },
  imageContainer: {
    width: 45,
    overflow: "hidden",
    borderRadius: 12,
  },
  imageCard: {
    width: "100%",
    height: "100%",
  },
  information: {
    flex: 1,
    minHeight: 50,
    justifyContent: "center",
    marginLeft: 10,
  },
  customText: {
    color: DARKER_TEXT,
    flexDirection: "column",
    display: "flex",
  },
  customButton: {
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 5,
    width: 35,
    display: "flex",
    alignItems: "center",
    gap: 20,
  },
  customImage: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  baseTextBold: {
    fontSize: 16,
    color: DARKER_TEXT,
    fontWeight: "bold",
  },
  baseTextSmallBold: {
    fontSize: 12,
    color: DARKER_TEXT,
    fontWeight: "bold",
  },
});

const renderCardLogo = (brand: string) => {
  switch (brand) {
    case "visa":
      return <Visa />;
    case "amex":
      return <Amex />;
    case "generic":
      return <Generic />;
    case "mastercard":
      return <Mastercard />;
    default:
      return null; // or render a default logo if brand doesn't match any case
  }
};

const PaymentMethod = ({ method }: { method: IPaymentMethod }) => {
  const alert = useAlert();
  const {
    fetchPaymentMethods,
    loadingPaymentMethods,
    removePaymentMethod,
    loadingDeletePaymentMethod,
  } = useAccount();

  const onDelete = () => {
    alert({
      type: ALERT_TYPES.CONFIRM,
      config: {
        title: "Eliminar método de pago",
        body: `¿Estás seguro que quieres eliminar el método con terminación ${method.card.last4}?`,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Eliminar",
      },
    })
      .then(() => {
        removePaymentMethod(method.id);
      })
      .catch(() => {});
  };

  const cardLogo = renderCardLogo(method.card.brand);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.imageCard}>{cardLogo}</View>
      </View>
      <View style={styles.information}>
        <View style={styles.textContainer}>
          <BaseText
            style={styles.baseTextBold}
          >{`**** **** ${method.card.last4}`}</BaseText>
          <BaseText style={styles.baseTextSmallBold}>
            Expira {`${method.card.exp_month}/${method.card.exp_year}`}
          </BaseText>
        </View>
      </View>
      {/* <Image source={Trash} style={{ height: 20, width: 20 }} /> */}
      <Trash />
    </View>
  );
};

export default PaymentMethod;
