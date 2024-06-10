/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import ChevronRightIcon from "../../../../../../../../assets/images/icons/ChevronRightIcon";

const Chevron: React.FC<{ open: boolean }> = ({ open }) => {
  const animation = useRef(new Animated.Value(open ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: open ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [animation, open]);

  const rotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["90deg", "270deg"],
  });

  return (
    <Animated.View
      style={{
        width: 15,
        height: 15,
        transform: [{ rotate: rotation }],
      }}
    >
      <ChevronRightIcon />
    </Animated.View>
  );
};

export default Chevron;
