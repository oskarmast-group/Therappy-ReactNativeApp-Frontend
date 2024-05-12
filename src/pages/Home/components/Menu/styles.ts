import StyleSheet from 'react-native-media-query';
import { GREEN } from '../../../../resources/constants/colors';

const { styles } = StyleSheet.create({
  container: {
    width: '100%',
    height: 56,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    '@media (max-height: 670px)': {
      height: 36,
    },
  },
  profileContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    borderColor: GREEN,
    borderWidth: 2,
    borderStyle: 'solid',
    '@media (max-height: 670px)': {
      height: 36,
      width: 36,
      borderRadius: 18,
    },
  },
  menuButton: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 0,
    padding: 1,
    margin: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: 35,
    height: 25,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

export default styles;
