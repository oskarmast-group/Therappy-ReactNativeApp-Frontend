import styled from 'styled-components/native';
import {PRIMARY_GREEN} from '../resources/constants/colors';

export const BaseText = styled.Text<{
  color?: string;
  weight?: number;
  fontSize?: number;
}>`
  font-family: 'Open Sans';
  color: ${({color}) => color ?? '#1e2205'};
  font-weight: ${({weight}) => weight ?? 'normal'};
  font-size: ${({fontSize}) => (fontSize ? `${fontSize}px` : '16px')};
`;

export const Title = styled.Text`
  margin: 0;
  font-size: 30px;
  font-weight: 600;
  color: ${PRIMARY_GREEN};
`;

export const Body = styled.Text`
  margin: 0;
  font-size: 0.875rem;
  color: #1e2205;
`;

export const SectionTitle = styled.Text`
  color: #1e2205;
  font-size: 18px;
  font-weight: 700;
  margin: 15px 0;
  margin-bottom: 5px;
`;

export const ErrorText = styled(BaseText)`
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: #d50000;
`;
