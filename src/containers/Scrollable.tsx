import React, {PropsWithChildren} from 'react';
import {ScrollView, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: 20,
  },
});

const Scrollable: React.FC<PropsWithChildren> = ({children}) => {
  return <ScrollView style={styles.scrollView}>{children}</ScrollView>;
};

export default Scrollable;
