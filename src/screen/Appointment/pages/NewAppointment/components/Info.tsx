import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { PRIMARY_GREEN } from "../../../../../resources/constants/colors";
import Close from "../../../../../resources/img/Close";

const Info = ({ close }: { close: () => void }) => {
  return (
    <View style={styles.modalContainer}>
      <TouchableOpacity style={styles.closeButton} onPress={close}>
        <Close />
      </TouchableOpacity>
      <Text style={styles.modalTitle}>Sesión de cortesía</Text>
      <Text style={styles.modalText}>
        La primera sesión con un terapeuta será una entrevista para determinar
        si es un buen emparejamiento.
        {"\n\n"}
        Por este motivo no se te cobrarán sesiones hasta que se te asigne
        oficialmente un terapeuta.
      </Text>
      <TouchableOpacity style={styles.okButton} onPress={close}>
        <Text style={styles.okButtonText}>OK</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Info;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  closeButton: {
    alignSelf: "flex-end",
    backgroundColor: PRIMARY_GREEN,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  okButton: {
    backgroundColor: PRIMARY_GREEN,
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  okButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
