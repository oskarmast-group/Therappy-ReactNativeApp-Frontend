/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, GestureResponderEvent, ViewProps } from 'react-native';
import styled from 'styled-components/native';

interface BackgroundProps extends ViewProps {
  open: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

const screenWidth = Dimensions.get('window').width;

const LEFT_VALUE = {
  MAX: -screenWidth,
  MIN: 0,
};

const RIGHT_VALUE = {
  MAX: screenWidth,
  MIN: 0,
};

const Press = styled.Pressable`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Background: React.FC<BackgroundProps> = ({ open, onPress, children, ...props }) => {
  const leftValue = useRef(new Animated.Value(open ? LEFT_VALUE.MIN : LEFT_VALUE.MAX)).current;

  const rightValue = useRef(new Animated.Value(open ? RIGHT_VALUE.MIN : RIGHT_VALUE.MAX)).current;

  useEffect(() => {
    Animated.timing(leftValue, {
      toValue: open ? LEFT_VALUE.MIN : LEFT_VALUE.MAX,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [leftValue, open]);

  useEffect(() => {
    Animated.timing(rightValue, {
      toValue: open ? RIGHT_VALUE.MIN : RIGHT_VALUE.MAX,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [rightValue, open]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: leftValue,
        right: rightValue,
      }}
      {...props}
    >
      <Press onPress={onPress}>{children}</Press>
    </Animated.View>
  );
};

export default Background;
