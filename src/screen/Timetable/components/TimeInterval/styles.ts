import { StyleSheet } from 'react-native';
import { PRIMARY_GREEN, RED } from '../../../../resources/constants/colors';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    gap: 10,
    borderRadius: 5,
    flexShrink: 1,
    flexGrow: 0,
  },
  errorContainer: {
    backgroundColor: RED,
  },
  intervalButton: {
    padding: 0,
    width: 20,
    height: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    flexGrow: 0,
  },
  iconContainer: {
    width: '100%',
    height: '100%',
  },
  timeButton: {
    padding: 5,
    minWidth: 80,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: PRIMARY_GREEN,
    borderRadius: 5,
    backgroundColor: 'transparent',
    position: 'relative',
  },
});

export default styles;
