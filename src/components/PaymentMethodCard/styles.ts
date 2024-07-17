import {StyleSheet} from 'react-native';
import {GREEN} from '../../resources/constants/colors';

const styles = StyleSheet.create({
  container: {
    margin: 0,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: GREEN,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexShrink: 1,
  },
  imageContainer: {
    width: 50,
    height: 50,
    overflow: 'hidden',
    borderRadius: 12,
  },
  informationContainer: {
    flexShrink: 1,
    minHeight: 50,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  trailingButton: {
    width: 20,
    height: 20,
    marginLeft: 'auto',
    overflow: 'hidden',
  },
});

export default styles;
