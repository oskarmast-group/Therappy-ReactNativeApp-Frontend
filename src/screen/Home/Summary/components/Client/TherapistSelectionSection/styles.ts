import { StyleSheet } from "react-native";
import { GREEN } from "../../../../../../constant/colors";

const styles = StyleSheet.create({
  linkContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: GREEN,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    height: 42,
  },
  iconContainer: {
    height: 22,
    width: 22,
  },
  therapistsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    flexShrink: 1,
  },
});

export default styles;
