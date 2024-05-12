import { StyleSheet } from 'react-native';
import { PRIMARY_GREEN } from '../../../../../../resources/constants/colors';

const styles = StyleSheet.create({
  container: {
    borderBottomColor: PRIMARY_GREEN,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    flexShrink: 1,
  },
  linkChildrenContainer: {
    display: 'flex',
    gap: 10,
    alignItems: 'flex-start',
    marginBottom: 20,
    flexDirection: 'row',
  },
  imageContainer: {
    width: 55,
    height: 55,
    overflow: 'hidden',
    borderRadius: 10,
  },
  image: {
    width: 55,
    height: 55,
  },
  informationContainer: {
    flex: 1,
    minHeight: 50,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  unreadContainer: {
    minWidth: 24,
    minHeight: 24,
    borderRadius: 30,
    backgroundColor: PRIMARY_GREEN,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
