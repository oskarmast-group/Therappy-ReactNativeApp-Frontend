import React from "react";
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleSheet,
  View,
} from "react-native";
import { PRIMARY_GREEN } from "../constant/colors";

const Loading: React.FC<ActivityIndicatorProps> = ({
  color = PRIMARY_GREEN,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={color} {...props} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
});
