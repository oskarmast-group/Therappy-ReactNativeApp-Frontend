import {StyleSheet} from 'react-native';
import {DARKER_TEXT, GREEN} from '../../../../resources/constants/colors';

const styles = StyleSheet.create({
  container: {
    flexBasis: 0,
    flexShrink: 0,
    flexGrow: 0,
    display: 'flex',
    gap: 5,
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: GREEN,
    padding: 3,
    borderRadius: 25,
    marginBottom: 20,
    minHeight: 46,
  },
  input: {
    flex: 1,
    padding: 10,
    maxHeight: 130,
    fontFamily: 'Open Sans',
    color: DARKER_TEXT,
  },
  button: {
    width: 40,
    height: 40,
    padding: 10,
  },
});

export default styles;
