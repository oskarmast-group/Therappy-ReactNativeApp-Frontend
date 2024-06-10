import { StyleSheet } from 'react-native';
import { PRIMARY_GREEN } from '../../../../../../resources/constants/colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  imageContainer: {
    width: 100,
    height: 100,
    overflow: 'hidden',
    borderRadius: 65,
    borderColor: PRIMARY_GREEN,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default styles;
