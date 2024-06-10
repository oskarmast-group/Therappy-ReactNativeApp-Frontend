/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef } from "react";
import { Animated, TextInputProps } from "react-native";
import { DARK_TEXT } from "../../constant/colors";

interface LabelComponentProps extends TextInputProps {
  isActive: boolean;
  withIcon: boolean;
}

const FONT_SIZE = {
  MAX: 16,
  MIN: 12,
};

const TOP_VALUE = {
  MAX: 12,
  MIN: 0,
};

const LabelComponent: React.FC<LabelComponentProps> = ({
  isActive,
  withIcon,
  children,
  ...rest
}) => {
  const topValue = useRef(
    new Animated.Value(isActive ? TOP_VALUE.MIN : TOP_VALUE.MAX)
  ).current;
  const fontSizeValue = useRef(
    new Animated.Value(isActive ? FONT_SIZE.MAX : FONT_SIZE.MIN)
  ).current;

  useEffect(() => {
    Animated.timing(topValue, {
      toValue: isActive ? TOP_VALUE.MIN : TOP_VALUE.MAX,
      duration: 200,
      useNativeDriver: false,
    }).start();

    Animated.timing(fontSizeValue, {
      toValue: isActive ? FONT_SIZE.MIN : FONT_SIZE.MAX,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isActive, topValue, fontSizeValue]);

  return (
    <Animated.Text
      style={{
        position: "absolute",
        top: topValue,
        left: withIcon ? 45 : 10,
        fontSize: fontSizeValue,
        fontWeight: "500",
        color: DARK_TEXT,
      }}
      {...rest}
    >
      {children}
    </Animated.Text>
  );
};

export default LabelComponent;
