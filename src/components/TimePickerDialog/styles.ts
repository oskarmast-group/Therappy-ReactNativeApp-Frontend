import { StyleSheet } from 'react-native';
import { GREEN_HIGHLIGHT, PRIMARY_GREEN } from '../../resources/constants/colors';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
  },
  timeDisplayContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  timesContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  amPmButton: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    minWidth: 80,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
    backgroundColor: 'transparent',
    position: 'relative',
    alignSelf: 'center',
  },
  amPmButtonActive: {
    backgroundColor: PRIMARY_GREEN,
  },
  numbersContainer: {
    paddingHorizontal: 2,
    paddingVertical: 0,
    borderRadius: 8,
  },
  numbersContainerActive: {
    backgroundColor: GREEN_HIGHLIGHT,
  },
});

export default styles;
