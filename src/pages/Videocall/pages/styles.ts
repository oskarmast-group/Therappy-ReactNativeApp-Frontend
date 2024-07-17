import {StyleSheet} from 'react-native';

const videoStyles = StyleSheet.create({
  stream: {
    flex: 1,
  },
  controlsContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    padding: 10,
  },
});

export default videoStyles;
