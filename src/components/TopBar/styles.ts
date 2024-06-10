import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 56,
    display: "flex",
    flexDirection: "row",
    flexBasis: 0,
    flexShrink: 0,
    flexGrow: 0,
    justifyContent: "flex-start",
    gap: 20,
    alignItems: "center",
    // '@media (max-height: 670px)': {
    //   minHeight: 36,
    // },
  },
  menuButton: {
    width: 25,
    height: 25,
  },
});

export default styles;
