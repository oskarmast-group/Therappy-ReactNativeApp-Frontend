import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  actionsRow: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginTop: 20,
    flexShrink: 1,
    gap: 10,
    marginBottom: 20,
  },
  videocallIconContainer: {
    width: 27,
    height: 18,
    overflow: 'hidden',
  },
  messageIconContainer: {
    width: 20,
    height: 20,
    overflow: 'hidden',
  },
});

export default styles;
