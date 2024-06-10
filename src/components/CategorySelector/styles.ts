import { StyleSheet } from "react-native";
import { GOLDEN } from "../../constant/colors";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    flexShrink: 1,
  },
  tab: {
    flexShrink: 1,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: GOLDEN,
    borderRadius: 7,
  },
  tabActive: {
    backgroundColor: GOLDEN,
  },
});

export default styles;
