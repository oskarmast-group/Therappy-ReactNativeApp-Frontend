import {StyleSheet} from 'react-native';
import {GREEN} from '../../resources/constants/colors';

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  divider: {
    height: 1,
    width: '60%',
    alignSelf: 'center',
    backgroundColor: GREEN,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default styles;
