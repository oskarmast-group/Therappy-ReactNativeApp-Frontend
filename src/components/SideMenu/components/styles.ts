import { Dimensions, StyleSheet } from 'react-native';
import { PRIMARY_GREEN } from '../../../resources/constants/colors';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  safeAreaContainer: {
    position: 'relative',
    flex: 1,
  },
  container: {
    width: 0.75 * screenWidth,
    maxWidth: 300,
    backgroundColor: '#fbfbfd',
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  topSection: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 50,
    paddingEnd: 20,
    paddingBottom: 10,
    paddingStart: 20,
    backgroundColor: PRIMARY_GREEN,
    gap: 50,
  },
  closeButtonContainer: {
    alignSelf: 'flex-end',
    width: 25,
    height: 25,
  },
  navigationSection: {
    flex: 1,
    paddingTop: 10,
    paddingEnd: 20,
    paddingBottom: 10,
    paddingStart: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  linkContent: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  textContainer: {
    flex: 1,
  },
  iconContainer: {
    height: 25,
    width: 25,
  },
  arrowIconContainer: {
    height: 25,
    width: 25,
  },
});

export default styles;
