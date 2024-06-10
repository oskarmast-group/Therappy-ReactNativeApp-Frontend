import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
    flexGrow: 1,
    flexBasis: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 5,
    paddingVertical: 0,
    minHeight: 45,
    gap: 5,
  },
  labelContainer: {
    minWidth: 110,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  hoursContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 1,
    flexGrow: 1,
    flexBasis: 'auto',
    gap: 5,
    width: '100%',
  },
});

export default styles;
