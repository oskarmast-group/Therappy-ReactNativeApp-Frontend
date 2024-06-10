import React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";
import { DARKER_TEXT } from "../../constant/colors";

const InputComponent: React.ForwardRefRenderFunction<
  TextInput,
  TextInputProps
> = (props, ref) => {
  return <TextInput style={styles.input} ref={ref} {...props} />;
};
const styles = StyleSheet.create({
  input: {
    borderWidth: 0,
    // width: "100%",
    color: DARKER_TEXT,
    backgroundColor: "transparent",
    flexGrow: 1,
    padding: 0,
    marginTop: 5,
    fontSize: 16,
    fontFamily: "Open Sans",
  },
});

export default React.forwardRef(InputComponent);
