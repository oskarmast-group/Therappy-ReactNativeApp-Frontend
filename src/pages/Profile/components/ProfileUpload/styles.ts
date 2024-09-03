import {StyleSheet} from 'react-native';
import {GREEN, PRIMARY_GREEN} from '../../../../resources/constants/colors';

const styles = StyleSheet.create({
  container: {
    width: 130,
    height: 130,
    marginTop: 0,
    position: 'relative',
    alignSelf: 'center',
    display: 'flex',
    flexShrink: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    borderColor: GREEN,
    borderWidth: 2,
    borderStyle: 'solid',
  },
  profileImage: {
    width: 120,
    height: 120,
  },
  upload: {
    width: 40,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    flexShrink: 1,
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: PRIMARY_GREEN,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  uploadDisabled: {
    backgroundColor: '#cccccc',
  },
  uploadImage: {
    width: 26,
    height: 22,
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 10,
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
