import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { TouchableOpacityProps } from "react-native";
import { PRIMARY_GREEN } from "../constant/colors";
import { BaseText } from "./Text";

export interface ButtonProps extends TouchableOpacityProps {
  backgroundColor?: string;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  width?: string;
  flexGrow?: number;
  flexShrink?: number;
  flex?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
}

const Button: React.FC<ButtonProps> = ({
  children,
  backgroundColor = PRIMARY_GREEN,
  paddingTop = 10,
  paddingRight = 10,
  paddingBottom = 10,
  paddingLeft = 10,
  // width = "100%",
  flexGrow,
  flexShrink,
  flex,
  marginTop = 0,
  marginRight = 0,
  marginBottom = 0,
  marginLeft = 0,
  disabled,
  style,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: disabled ? "#cccccc" : backgroundColor,
          paddingTop,
          paddingRight,
          paddingBottom,
          paddingLeft,
          // width,
          marginTop,
          marginRight,
          marginBottom,
          marginLeft,
          opacity: disabled ? 0.6 : 1,
          flexGrow,
          flexShrink,
          flex,
        },
        style,
      ]}
      disabled={disabled}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
};

export const ButtonText: React.FC<{
  disabled?: boolean;
  color?: string;
  style?: TextStyle;
  children: string;
}> = ({ children, disabled, color = "#fbfbfd", style }) => {
  return (
    <BaseText
      style={[
        styles.buttonText,
        { color: disabled ? "#666666" : color },
        style,
      ]}
    >
      {children}
    </BaseText>
  );
};

export const CancelButton: React.FC<ButtonProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <Button
      style={[styles.cancelButton, style]}
      backgroundColor="#fbfbfd"
      {...props}
    >
      {children}
    </Button>
  );
};

export const IconButton: React.FC<ButtonProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <Button
      style={[styles.iconButton, style]}
      paddingTop={5}
      paddingRight={5}
      paddingBottom={5}
      paddingLeft={5}
      backgroundColor={PRIMARY_GREEN}
      {...props}
    >
      {children}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  } as ViewStyle,
  buttonText: {
    textAlign: "center",
  } as TextStyle,
  cancelButton: {
    backgroundColor: "#fbfbfd",
    borderColor: PRIMARY_GREEN,
    borderWidth: 2,
  } as ViewStyle,
  iconButton: {
    borderRadius: 12,
    margin: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  } as ViewStyle,
});

export default Button;
