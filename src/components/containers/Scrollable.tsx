import React from "react";
import { ScrollView, ScrollViewProps, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
});

interface IProps extends ScrollViewProps {
  children: React.ReactNode;
}

const Scrollable: React.FC<IProps> = ({ children, ...rest }) => {
  return (
    <ScrollView
      /**
       * Place this above the rest of the props to avoid overriding them
       */
      {...rest}
      showsVerticalScrollIndicator={false}
      style={styles.scrollView}
      contentContainerStyle={styles.content}
    >
      {children}
    </ScrollView>
  );
};

export default Scrollable;
