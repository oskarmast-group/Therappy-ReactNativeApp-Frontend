import StyleSheet from 'react-native-media-query';

const {styles} = StyleSheet.create({
  container: {
    width: '100%',
    height: 56,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 20,
    alignItems: 'center',
    '@media (max-height: 670px)': {
      height: 36,
    },
  },
  menuButton: {
    width: 25,
    height: 25,
  },
});

export default styles;
