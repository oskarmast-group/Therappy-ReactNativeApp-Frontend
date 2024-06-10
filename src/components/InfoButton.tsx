import React, { ReactNode } from "react";
import Button, { ButtonProps } from "./Button";
import { StyleSheet, View, TextStyle } from "react-native";
import { BaseText } from "./Text";
import InfoIcon from "../../assets/images/icons/InfoIcon";
import { WHITE } from "../constant/colors";

interface InfoButtonProps {
  buttonProps?: ButtonProps;
  textProps?: TextStyle;
  content: string | ReactNode;
  icon?: ReactNode;
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    flexShrink: 1,
  },
  iconContainer: {
    width: 33,
    height: 33,
  },
});

const InfoButton: React.FC<InfoButtonProps> = ({
  content,
  buttonProps,
  icon,
  textProps = {},
}) => {
  return (
    <Button {...buttonProps}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>{icon ? icon : <InfoIcon />}</View>
        {typeof content === "string" ? (
          <BaseText fontSize={14} color={WHITE} {...textProps}>
            {content}
          </BaseText>
        ) : (
          content
        )}
      </View>
    </Button>
  );
};

export default InfoButton;
