/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef} from 'react';
import {Animated, Dimensions, ViewProps} from 'react-native';

interface ContainerProps extends ViewProps {
  open: boolean;
}

const screenWidth = Dimensions.get('window').width;

const LEFT_VALUE = {
  MAX: 0 - Math.min(0.75 * screenWidth, 300),
  MIN: 0,
};

const Container: React.FC<ContainerProps> = ({open, ...props}) => {
  const leftValue = useRef(
    new Animated.Value(open ? LEFT_VALUE.MIN : LEFT_VALUE.MAX),
  ).current;

  useEffect(() => {
    Animated.timing(leftValue, {
      toValue: open ? LEFT_VALUE.MIN : LEFT_VALUE.MAX,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [leftValue, open]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: 0.75 * screenWidth,
        maxWidth: 300,
        left: leftValue,
        backgroundColor: '#fbfbfd',
      }}
      {...props}
    />
  );
};

export default Container;
