import React, {PropsWithChildren} from 'react';
import styled from 'styled-components/native';

const Button = styled.TouchableOpacity<{backgroundColor?: string}>`
  width: 35px;
  height: 35px;
  border-radius: 25px;
  border: none;
  outline: none;
  background-color: ${({backgroundColor}) => backgroundColor ?? 'gray'};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

const CircleActionButton: React.FC<
  PropsWithChildren<{onPress: () => void; backgroundColor?: string}>
> = ({onPress, backgroundColor, children}) => {
  return (
    <Button onPress={onPress} backgroundColor={backgroundColor}>
      {children}
    </Button>
  );
};

export default CircleActionButton;
