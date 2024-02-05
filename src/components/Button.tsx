import styled from 'styled-components/native';
import {PRIMARY_GREEN} from '../resources/constants/colors';
import {BaseText} from './Text';
import {TouchableOpacityProps} from 'react-native';

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
}

const Button = styled.TouchableOpacity<ButtonProps>`
  width: ${({width}) => width ?? '100%'};
  padding-top: ${({paddingTop}) => paddingTop ?? 10}px;
  padding-right: ${({paddingRight}) => paddingRight ?? 10}px;
  padding-bottom: ${({paddingBottom}) => paddingBottom ?? 10}px;
  padding-left: ${({paddingLeft}) => paddingLeft ?? 10}px;
  border-radius: 50px;
  border: none;
  outline: none;
  font-size: 1rem;
  ${({flexShrink}) => (flexShrink ? `flex-shrink:${flexShrink};` : '')}
  ${({flexGrow}) => (flexGrow ? `flex-grow:${flexGrow};` : '')}
  ${({flex}) => (flex ? `flex:${flex};` : '')}
  cursor: pointer;
  background-color: ${({disabled, backgroundColor}) =>
    disabled ? '#cccccc' : backgroundColor ?? PRIMARY_GREEN};
  opacity: ${({disabled}) => (disabled ? 0.6 : 1)};
`;

export const ButtonText = styled(BaseText)<{
  disabled?: boolean;
  color?: string;
}>`
  text-align: center;
  color: ${({disabled, color}) => (disabled ? '#666666' : color ?? '#fbfbfd')};
`;

export const CancelButton = styled(Button)`
  background-color: '#fbfbfd';
  color: ${PRIMARY_GREEN};
  border: 2px solid ${PRIMARY_GREEN};
`;

export default Button;
