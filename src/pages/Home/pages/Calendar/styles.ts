import { StyleSheet } from 'react-native';
import { PRIMARY_GREEN } from '../../../../resources/constants/colors';

const styles = StyleSheet.create({
  tabContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    flexShrink: 1,
  },
  tab: {
    paddingVertical: 10,
    flex: 1,
    borderColor: PRIMARY_GREEN,
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: PRIMARY_GREEN,
  },
});

export default styles;
