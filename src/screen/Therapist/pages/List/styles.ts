import { StyleSheet } from 'react-native';
import { GREEN } from '../../../../resources/constants/colors';

const styles = StyleSheet.create({
  searchContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: GREEN,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 21,
    flexShrink: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  imageContainer: {
    height: 22,
    width: 22,
  },
  input: {
    flex: 1,
    height: '100%',
    padding: 0,
  },
  therapistsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    flexShrink: 1,
  },
});

export default styles;
