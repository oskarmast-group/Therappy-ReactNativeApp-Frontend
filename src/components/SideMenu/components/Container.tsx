/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { SafeAreaView, View, ViewProps } from 'react-native';
import styles from './styles';

interface ContainerProps extends ViewProps {
  open: boolean;
}

const Container: React.FC<ContainerProps> = ({ ...props }) => {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container} {...props} />
    </SafeAreaView>
  );
};

export default Container;
