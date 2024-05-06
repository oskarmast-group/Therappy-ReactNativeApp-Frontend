import styled from 'styled-components/native';
import {PRIMARY_GREEN, TEXT} from '../resources/constants/colors';
import { Link } from 'react-router-native';

export interface TextProps {
  color?: string;
  weight?: number;
  fontSize?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  textAlign?: 'auto' | 'center' | 'justify' | 'left' | 'right';
  flexGrow?: number;
  flexShrink?: number;
  flex?: number;
  fontStyle?: 'italic' | 'normal';
  opacity?: number;
}

export const BaseText = styled.Text<TextProps>`
  font-family: 'Open Sans';
  color: ${({color}) => color ?? TEXT};
  font-weight: ${({weight}) => weight ?? 'normal'};
  font-size: ${({fontSize}) => (fontSize ? `${fontSize}px` : '16px')};
  margin-top: ${({marginTop}) => (marginTop ? `${marginTop}px` : '0')};
  margin-bottom: ${({marginBottom}) =>
    marginBottom ? `${marginBottom}px` : '0'};
  margin-left: ${({marginLeft}) => (marginLeft ? `${marginLeft}px` : '0')};
  margin-right: ${({marginRight}) => (marginRight ? `${marginRight}px` : '0')};
  text-align: ${({textAlign}) => textAlign ?? 'auto'};
  ${({flexShrink}) => (flexShrink ? `flex-shrink:${flexShrink};` : '')}
  ${({flexGrow}) => (flexGrow ? `flex-grow:${flexGrow};` : '')}
  ${({flex}) => (flex ? `flex:${flex};` : '')}
  font-style: ${({fontStyle}) => fontStyle ?? 'normal'};
  opacity: ${({opacity}) => opacity ?? 1};
`;

export const Title = styled.Text`
  margin: 0;
  font-size: 30px;
  font-weight: 600;
  color: ${PRIMARY_GREEN};
`;

export const Body = styled.Text`
  margin: 0;
  font-size: 14px;
  color: #1e2205;
`;

export const CustomLink = styled(Link)`
    color: #1e2205;
    text-decoration: none;
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
