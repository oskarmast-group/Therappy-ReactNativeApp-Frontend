// Header.tsx
import React from "react";
import { View, StyleSheet } from "react-native";

const Header: React.FC<{ children: any }> = ({ children }) => {
  return <View style={styles.header}>{children}</View>;
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    backgroundColor: "var(--text)", // Adjust according to the color you want
    borderRadius: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    display: "flex",
    justifyContent: "center",
  },
});

export default Header;
