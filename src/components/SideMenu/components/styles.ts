import {Dimensions, StyleSheet} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    top: 0,
    bottom: 0,
    width: 0.75 * screenWidth,
    maxWidth: 300,
    left: 0 - Math.min(0.75 * screenWidth, 300),
    backgroundColor: '#fbfbfd',
  },
});

export default styles;
