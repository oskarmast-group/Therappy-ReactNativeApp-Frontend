import { StyleSheet } from 'react-native';
import { GREEN_HIGHLIGHT } from '../../../../../resources/constants/colors';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 3,
    flexShrink: 1,
    flexGrow: 0,
  },
  newMessageHeader: {
    fontFamily: 'Open Sans',
    textAlign: 'center',
    margin: 5,
    alignSelf: 'center',
    backgroundColor: GREEN_HIGHLIGHT,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    flexShrink: 0,
    flexGrow: 0,
  },
});

export default styles;
