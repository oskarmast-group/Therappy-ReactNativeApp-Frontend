import { StyleSheet } from "react-native";
import { DARKER_TEXT } from "../../../../../../../constant/colors";

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    flexShrink: 1,
  },
  header: {
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    borderBottomColor: `${DARKER_TEXT}55`,
    borderBottomWidth: 1,
    borderStyle: "solid",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  collapseContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    flexShrink: 1,
  },
  documentsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 15,
    flexShrink: 1,
    height: 100,
    minHeight: 100,
  },
});

export default styles;
