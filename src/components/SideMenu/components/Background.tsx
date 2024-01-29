import React from 'react';
import {Dimensions, GestureResponderEvent, ViewProps} from 'react-native';
import styled from 'styled-components/native';

interface BackgroundProps extends ViewProps {
  open: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

const screenWidth = Dimensions.get('window').width;

const Container = styled.View<{open?: boolean}>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: ${({open}) => (open ? 0 : screenWidth)}px;
`;

const Press = styled.Pressable`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Background: React.FC<BackgroundProps> = ({
  open,
  onPress,
  children,
  ...props
}) => {
  return (
    <Container open={open} {...props}>
      <Press onPress={onPress}>{children}</Press>
    </Container>
  );
};

export default Background;
