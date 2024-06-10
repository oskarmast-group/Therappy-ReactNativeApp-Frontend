import React from "react";
import {
  TouchableOpacity,
  Image,
  StyleProp,
  ViewStyle,
  StyleSheet,
  View,
} from "react-native";

interface CircleActionButtonProps {
  src: any;
  alt?: string;
  onClick: () => void;
  style?: StyleProp<ViewStyle>;
}

const CircleActionButton: React.FC<CircleActionButtonProps> = ({
  src,
  onClick,
  style,
}) => {
  return (
    <TouchableOpacity onPress={onClick} style={[styles.button, style]}>
      <Image source={src} style={styles.icon} />
    </TouchableOpacity>
  );
};

export const CircleActionButton2: React.FC<CircleActionButtonProps> = ({
  src,
  onClick,
  style,
}) => {
  return (
    <TouchableOpacity onPress={onClick} style={[styles.button, style]}>
      {src}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CircleActionButton;
