import { StyleSheet, View, ViewProps } from "react-native";
import React from "react";

const VideoContainer: React.FC<ViewProps> = ({ children, style, ...props }) => {
  return (
    <View style={[styles.container, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    position: "relative",
    minHeight: 200,
    maxHeight: 250,
    backgroundColor: "#1d1d1f",
    marginBottom: 20,
  },
});

export default VideoContainer;
