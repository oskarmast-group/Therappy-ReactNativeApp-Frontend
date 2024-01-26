import {StyleSheet} from 'react-native';
import {DARKER_TEXT} from '../../../resources/constants/colors';

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
  input: {
    borderWidth: 0,
    width: '100%',
    color: DARKER_TEXT,
    backgroundColor: 'transparent',
    flexGrow: 1,
    padding: 0,
    marginTop: 10,
  },
});

export default styles;
