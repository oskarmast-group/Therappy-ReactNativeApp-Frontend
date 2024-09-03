import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    display: 'flex',
    justifyContent: 'space-between',
  },
  spacer: {
    flexGrow: 1,
    flexShrink: 0,
    minHeight: 12,
    flexBasis: 0,
  },
  scrollContainer: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 'auto',
  },
  scrollContent: {
    justifyContent: 'flex-end',
    display: 'flex',
  },
  test: {
    height: 1600,
  },
});

export default styles;
