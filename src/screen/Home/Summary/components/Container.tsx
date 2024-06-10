import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';

const Container: React.FC<ViewProps> = ({ ...props }) => {
  return <View style={styles.container} {...props} />;
};

export default Container;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    minHeight: 0,
    flexShrink: 1,
  },
});
