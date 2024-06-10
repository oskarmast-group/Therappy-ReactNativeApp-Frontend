import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    maxWidth: 70,
    width: 70,
    display: 'flex',
    flexShrink: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  status: {
    position: 'absolute',
    backgroundColor: 'transparent',
    right: 0,
    top: 0,
    width: 20,
    height: 20,
  },
  menuContainer: {
    position: 'absolute',
    left: -3,
    top: 0,
    padding: 5,
    width: 20,
    height: 20,
  },
  fileContainer: {
    width: 36,
    height: 36,
    marginBottom: 5,
  },
  documentsOptionsContainer: {
    position: 'absolute',
    top: 24,
    left: 3,
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: '#000000',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 0,
    elevation: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  option: {
    paddingVertical: 5,
  },
});

export default styles;
