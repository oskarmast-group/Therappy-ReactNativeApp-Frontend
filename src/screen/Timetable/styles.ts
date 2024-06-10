import { StyleSheet } from "react-native";
import { PRIMARY_GREEN } from "../../resources/constants/colors";

const styles = StyleSheet.create({
  headerContainer: {
    flexShrink: 1,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  updateButton: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    backgroundColor: PRIMARY_GREEN,
    borderRadius: 20,
    alignSelf: "center",
  },
});

export default styles;
