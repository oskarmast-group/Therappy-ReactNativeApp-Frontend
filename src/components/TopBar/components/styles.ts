import StyleSheet from 'react-native-media-query';

const {styles} = StyleSheet.create({
  container: {
    width: '100%',
    height: 56,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    '@media (max-height: 670px)': {
      height: 36,
    },
  },
  menuButton: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    margin: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: 25,
  },
});

export default styles;
