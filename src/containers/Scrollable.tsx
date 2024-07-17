import React, {PropsWithChildren} from 'react';
import {RefreshControl, ScrollView, StyleSheet} from 'react-native';
import {PRIMARY_GREEN} from '../resources/constants/colors';

const styles = StyleSheet.create({
  scrollView: {
    display: 'flex',
    flex: 1,
  },
  content: {
    paddingBottom: 80,
  },
});

const Scrollable: React.FC<
  PropsWithChildren<{onRefresh?: () => void; refreshing?: boolean}>
> = ({onRefresh, refreshing, children}) => {
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.content}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing ?? false}
            onRefresh={onRefresh}
            tintColor={PRIMARY_GREEN}
            colors={[PRIMARY_GREEN]}
          />
        ) : undefined
      }>
      {children}
    </ScrollView>
  );
};

export default Scrollable;
