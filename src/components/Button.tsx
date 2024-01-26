import styled from 'styled-components/native';
import {PRIMARY_GREEN} from '../resources/constants/colors';
import {BaseText} from './Text';

export const IconButton = styled.Button`
  border: none;
  outline: none;
  padding: 5px;
  background-color: ${PRIMARY_GREEN};
  border-radius: 12px;
  display: flex;
  gap: 20px;
  margin: 0;
  cursor: pointer;
  align-items: center;
  img {
    height: 14px;
    width: auto;
  }
  p {
    margin: 0;
    font-size: 14px;
    color: #fbfbfd;
  }
`;

const Button = styled.TouchableOpacity`
  width: 100%;
  padding: 10px;
  border-radius: 50px;
  border: none;
  outline: none;
  font-size: 1rem;
  cursor: pointer;

  background-color: ${({disabled}) => (disabled ? '#cccccc' : PRIMARY_GREEN)};
  opacity: ${({disabled}) => (disabled ? 0.6 : 1)};
`;

export const ButtonText = styled(BaseText)<{disabled?: boolean}>`
  text-align: center;
  color: ${({disabled}) => (disabled ? '#666666' : '#fbfbfd')};
`;

export const CancelButton = styled(Button)`
  background-color: '#fbfbfd';
  color: ${PRIMARY_GREEN};
  border: 2px solid ${PRIMARY_GREEN};
`;

export default Button;
