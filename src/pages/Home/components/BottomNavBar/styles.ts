import { StyleSheet } from 'react-native';
import { GREEN_HIGHLIGHT } from '../../../../resources/constants/colors';
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    flexShrink: 1,
  },
  component: {
    display: 'flex',
    backgroundColor: '#fbfbfd',
    flexDirection: 'row',
    borderRadius: 34,
    shadowColor: '#000000',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 50,
    flexGrow: 1,
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexShrink: 1,
  },
  iconContainer: {
    width: 33,
    height: 33,
  },
  indicator: {
    width: 30,
    height: 3,
    marginTop: 5,
    backgroundColor: 'transparent',
    borderRadius: 3,
  },
  indicatorActive: {
    backgroundColor: GREEN_HIGHLIGHT,
  },
  notifications: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: GREEN_HIGHLIGHT,
  },
});

export default styles;
