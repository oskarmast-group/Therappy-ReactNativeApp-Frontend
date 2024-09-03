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
    position: 'relative',
  },
  isFirst: {
    marginTop: 15,
  },
  linkChildrenContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    color: DARKER_TEXT,
    width: '100%',
    flexShrink: 1,
    justifyContent: 'space-between',
    position: 'relative',
    minWidth: 50,
    minHeight: 50,
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
    flexGrow: 1,
    minHeight: 50,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  dotMenuContainer: {
    width: 28,
    height: 28,
    padding: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    top: -10,
    right: 30,
    zIndex: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  option: {
    padding: 5,
  },
});

export default styles;
