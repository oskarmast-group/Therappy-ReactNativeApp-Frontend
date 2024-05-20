// CircleActionButton.tsx
import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, Image, StyleProp, ViewStyle } from 'react-native';

const Button = styled(TouchableOpacity)`
  width: 35px;
  height: 35px;
  border-radius: 25px;
  border: none;
  outline: none;
  background-color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled(Image)`
  width: 20px;
  height: 20px;
  margin: auto;
`;

interface CircleActionButtonProps {
  src: any;
  alt?: string;
  onClick: () => void;
  style?: StyleProp<ViewStyle>;
}

const CircleActionButton: React.FC<CircleActionButtonProps> = ({ src, onClick, style }) => {
  return (
    <Button onPress={onClick} style={style}>
      <Icon source={src} />
    </Button>
  );
};

export default CircleActionButton;
