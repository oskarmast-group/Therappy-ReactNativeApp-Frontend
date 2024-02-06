import {StyleSheet} from 'react-native';
import {DARKER_TEXT, GREEN} from '../../resources/constants/colors';
import styled from 'styled-components/native';

export interface ImageContainerProps {
  width?: number;
  height?: number;
  borderRadius?: number;
}

export const ImageContainer = styled.View<ImageContainerProps>`
  width: ${({width}) => width ?? 66}px;
  height: ${({height}) => height ?? 66}px;
  overflow: hidden;
  border-radius: ${({borderRadius}) => borderRadius ?? 12}px;
`;

export interface ImageProps {
  width?: number;
  height?: number;
}

export const ImageComponent = styled.Image<ImageProps>`
  width: ${({width}) => width ?? 66}px;
  height: ${({height}) => height ?? 66}px;
`;

const styles = StyleSheet.create({
  container: {
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
  },
  containerBorder: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: GREEN,
    borderRadius: 20,
    padding: 10,
  },
  linkChildrenContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    color: DARKER_TEXT,
    width: '100%',
  },
  informationContainer: {
    flex: 1,
    minHeight: 50,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

export default styles;
