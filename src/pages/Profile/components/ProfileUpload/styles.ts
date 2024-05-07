import { StyleSheet } from 'react-native';
import { GREEN, PRIMARY_GREEN } from '../../../../resources/constants/colors';

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
    width: 22,
    height: 22,
  },
});

export default styles;
