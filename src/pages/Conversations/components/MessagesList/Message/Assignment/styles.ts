import {StyleSheet} from 'react-native';
import {PRIMARY_GREEN} from '../../../../../../resources/constants/colors';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: PRIMARY_GREEN,
    width: '100%',
    borderRadius: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 10,
    marginVertical: 10,
    flexShrink: 1,
  },
  options: {
    display: 'flex',
    width: '100%',
    gap: 15,
  },
});

export default styles;
