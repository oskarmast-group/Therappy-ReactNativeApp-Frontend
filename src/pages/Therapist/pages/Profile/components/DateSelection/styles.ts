import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {
  DARKER_TEXT,
  GOLDEN,
  GOLDEN_HIGHLIGHT,
  PRIMARY_GREEN,
} from '../../../../../../resources/constants/colors';

export const DateContainer = styled.TouchableOpacity<{
  inactive: boolean;
  selected: boolean;
}>`
  padding: 3px;
  min-width: 65px;
  height: 85px;
  border: solid ${PRIMARY_GREEN} 1px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1px;
  opacity: ${({inactive}) => (inactive ? 0.3 : 1)};
  background-color: ${({selected}) =>
    selected ? PRIMARY_GREEN : 'transparent'};
  flex-shrink: 1;
`;

export const HourContainer = styled.TouchableOpacity<{
  inactive: boolean;
  selected: boolean;
}>`
  min-width: 85px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  border-style: solid;
  border-width: 1px;
  border-radius: 10px;
  border-color: ${({inactive}) => (inactive ? GOLDEN_HIGHLIGHT : GOLDEN)};
  background-color: ${({selected}) => (selected ? GOLDEN : 'transparent')};
  flex-shrink: 1;
  position: relative;
`;

const styles = StyleSheet.create({
  datesContainerScroll: {
    flex: 1,
  },
  datesContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    minHeight: 100,
    paddingBottom: 20,
    gap: 20,
  },
  hoursContainerScroll: {
    flex: 1,
  },
  hoursContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    paddingBottom: 20,
    minHeight: 50,
  },
  banner: {
    fontFamily: 'Open Sans',
    fontSize: 14,
    color: DARKER_TEXT,
    transform: [{rotate: '-15deg'}],
    fontWeight: '700',
    position: 'absolute',
  },
  button: {
    width: '100%',
    padding: 10,
    borderRadius: 50,
    backgroundColor: PRIMARY_GREEN,
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});

export default styles;
