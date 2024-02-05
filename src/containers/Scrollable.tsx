import React, {PropsWithChildren} from 'react';
import {ScrollView, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  scrollView: {
    display: 'flex',
    flex: 1,
  },
  content: {
    paddingBottom: 40,
  },
});

const Scrollable: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.content}>
      {children}
    </ScrollView>
  );
};

export default Scrollable;
