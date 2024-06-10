import { StyleSheet } from "react-native";
import { PRIMARY_GREEN } from "../../../../../../../../constant/colors";

const styles = StyleSheet.create({
  documentContainer: {
    position: "relative",
    maxWidth: 70,
    width: 70,
    display: "flex",
    flexShrink: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadContainer: {
    position: "relative",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: `${PRIMARY_GREEN}33`,
    borderStyle: "dashed",
    maxWidth: 70,
    width: 70,
    display: "flex",
    flexShrink: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fileContainer: {
    width: 36,
    height: 36,
    marginBottom: 5,
  },
  loaderContainer: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  documentName: {
    flexWrap: "nowrap",
    overflow: "hidden",
    position: "absolute",
    width: "100%",
    maxWidth: "100%",
  },
});

export default styles;
