import React, {
  ReactNode,
  RefAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextProps,
  TouchableOpacity,
  View,
} from "react-native";
import { DARKER_TEXT, PRIMARY_GREEN } from "../../constant/colors";
import EditIcon from "../../../assets/images/icons/EditIcon";
import CircleCheckIcon from "../../../assets/images/icons/CircleCheckIcon";
import InputComponent from "./InputComponent";
import LabelComponent from "./LabelComponent";
interface LabelProps extends TextProps {
  label?: string;
}

enum IconPositions {
  LEADING = "leading",
  TRAILING = "trailing",
  NONE = "none",
}

const Input: React.FC<{
  labelProps?: LabelProps;
  inputProps?: TextInputProps & RefAttributes<TextInput>;
  iconProps?: { icon?: ReactNode; position?: IconPositions };
  editable?: boolean;
  loading?: boolean;
  onSubmit?: () => void;
}> = ({
  iconProps = {},
  inputProps = {},
  labelProps = {},
  editable = false,
  loading = false,
  onSubmit,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const { value, ...restInputProps } = inputProps;

  const { icon, position: iconPosition = IconPositions.LEADING } = iconProps;

  const { label = "", ...restLabelProps } = labelProps;

  const validValue = (!!value || value === "0") && !!label;

  const withIcon = !!icon && iconPosition !== IconPositions.NONE;

  const withLeadingIcon = withIcon && iconPosition === IconPositions.LEADING;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit = () => {
    setIsEditing(false);
    onSubmit && onSubmit();
  };

  useEffect(() => {
    // if (inputRef.current) {
    //   if (isEditing) {
    //     inputRef.current.focus();
    //   } else {
    //     inputRef.current.blur();
    // }
    // }
  }, [isEditing]);

  return (
    <View style={styles.container}>
      {withLeadingIcon && (
        <View style={styles.imageContainer}>{!!icon && icon}</View>
      )}
      <View style={styles.inputContainer}>
        <InputComponent
          editable={(!editable || (editable && isEditing)) && !loading}
          value={value}
          placeholderTextColor={"#484848"}
          onFocus={() => {
            setIsActive(true);
            setIsEditing(true);
          }}
          onBlur={() => {
            setIsActive(false);
            if (editable) {
              handleSubmit();
            }
          }}
          onSubmitEditing={handleSubmit}
          ref={inputRef}
          {...restInputProps}
        />
      </View>
      {!!label && (
        <View style={styles.labelContainer}>
          <LabelComponent
            withIcon={withLeadingIcon}
            isActive={validValue || isActive}
            {...restLabelProps}
          >
            {label}
          </LabelComponent>
        </View>
      )}
      {withIcon && iconPosition === IconPositions.TRAILING && !editable && (
        <View style={styles.imageContainer}>{!!icon && icon}</View>
      )}
      {editable &&
        (loading ? (
          <ActivityIndicator color={PRIMARY_GREEN} />
        ) : (
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={isEditing ? handleSubmit : handleEdit}
          >
            {isEditing ? <CircleCheckIcon /> : <EditIcon />}
          </TouchableOpacity>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 5,
    paddingStart: 10,
    paddingEnd: 10,
    borderColor: "#687711",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 30,
    position: "relative",
  },
  containerWithLabel: {
    marginTop: 20,
  },
  inputContainer: {
    flex: 1,
    position: "relative",
    zIndex: 20,
  },
  imageContainer: {
    width: 25,
    minHeight: 25,
    height: 25,
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
  },
  labelContainer: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: "absolute",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  registerButton: {
    marginTop: 30,
    maxWidth: 200,
    color: "#ffffff",
  },
  inputWithMarginTop: {
    marginTop: 20,
  },
});

export default Input;
