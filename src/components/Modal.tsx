import React, { ReactNode } from "react";
import {
  Modal as DefaultModal,
  StyleSheet,
  StyleProp,
  ViewStyle,
  View,
} from "react-native";
import { PRIMARY_GREEN } from "../resources/constants/colors";

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<CustomModalProps> = ({ visible, onClose, children }) => {
  return (
    <DefaultModal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={[styles.modalContent]}>{children}</View>
      </View>
    </DefaultModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    borderRadius: 8,
    padding: 16,
    shadowColor: PRIMARY_GREEN,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Modal;
