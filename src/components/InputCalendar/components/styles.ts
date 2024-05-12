import { StyleSheet } from 'react-native';
import { DARKER_TEXT, DARK_TEXT } from '../../../resources/constants/colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    paddingStart: 10,
    paddingEnd: 10,
    borderColor: '#687711',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 30,
    position: 'relative',
  },
  containerWithLabel: {
    marginTop: 20,
  },
  inputContainer: {
    flex: 1,
    position: 'relative',
    paddingTop: 10,
    paddingBottom: 5,
  },
  input: {
    borderWidth: 0,
    width: '100%',
    color: DARKER_TEXT,
    backgroundColor: 'transparent',
    flexGrow: 1,
    padding: 0,
    marginTop: 10,
    fontFamily: 'Open Sans',
  },
  imageContainer: {
    width: 25,
    minHeight: 25,
    height: 25,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  labelContainer: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  label: {
    position: 'absolute',
    top: 0,
    left: 10,
    fontSize: 12,
    fontWeight: '500',
    color: DARK_TEXT,
  },
  labelWithIcon: {
    left: 45,
  },
});

export default styles;
