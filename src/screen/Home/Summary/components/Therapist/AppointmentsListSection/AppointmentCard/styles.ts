import { StyleSheet } from "react-native";
import { DARKER_TEXT, GREEN } from "../../../../../../../constant/colors";

const styles = StyleSheet.create({
  container: {
    margin: 0,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: GREEN,
    borderRadius: 20,
    flexDirection: "column",
    gap: 10,
    padding: 10,
  },
  linkChildrenContainer: {
    flexDirection: "row",
    gap: 10,
    color: DARKER_TEXT,
    flexShrink: 1,
  },
  imageContainer: {
    width: 66,
    height: 66,
    overflow: "hidden",
    borderRadius: 12,
  },
  image: {
    width: 66,
    height: 66,
  },
  informationContainer: {
    flexShrink: 1,
    minHeight: 50,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
});

export default styles;
