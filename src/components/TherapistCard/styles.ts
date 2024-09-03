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
    flexDirection: 'row',
    gap: 10,
  },
  containerBorder: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: GREEN,
    borderRadius: 20,
    padding: 10,
  },
  link: {
    flexGrow: 1,
  },
  linkChildrenContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    color: DARKER_TEXT,
    flexGrow: 1,
  },
  informationContainer: {
    flexGrow: 1,
    minHeight: 50,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  dotMenuContainer: {
    width: 28,
    height: 28,
    padding: 2,
    display: 'flex',
    justifyContent: 'center',
    flexBasis: 28,
    alignSelf: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    top: -10,
    right: 30,
    zIndex: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  option: {
    padding: 5,
  },
});

export default styles;
