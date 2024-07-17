import {StyleSheet} from 'react-native';
import {DARKER_TEXT, GREEN} from '../../resources/constants/colors';

const styles = StyleSheet.create({
  container: {
    margin: 0,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: GREEN,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    flexShrink: 1,
  },
  linkChildrenContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    color: DARKER_TEXT,
    width: '100%',
    flexShrink: 1,
  },
  imageContainer: {
    width: 48,
    height: 48,
    overflow: 'hidden',
    borderRadius: 12,
  },
  image: {
    width: 48,
    height: 48,
  },
  informationContainer: {
    flexShrink: 1,
    minHeight: 50,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default styles;
