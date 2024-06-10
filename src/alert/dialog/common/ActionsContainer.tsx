// ActionsContainer.tsx
import React, { PropsWithChildren } from "react";
import { View, StyleSheet } from "react-native";

const ActionsContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  child: {
    marginRight: 10,
  },
});

export default ActionsContainer;
