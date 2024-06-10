import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";
import {
  DARKER_TEXT,
  GOLDEN,
  GOLDEN_HIGHLIGHT,
  PRIMARY_GREEN,
} from "../../../../../../resources/constants/colors";

interface DateContainerProps extends TouchableOpacityProps {
  inactive: boolean;
  selected: boolean;
}

const DateContainer: React.FC<DateContainerProps> = ({
  inactive,
  selected,
  ...props
}) => (
  <TouchableOpacity
    style={[
      styles.dateContainer,
      {
        opacity: inactive ? 0.3 : 1,
        backgroundColor: selected ? PRIMARY_GREEN : "transparent",
      },
    ]}
    {...props}
  />
);

interface HourContainerProps extends TouchableOpacityProps {
  inactive: boolean;
  selected: boolean;
}

const HourContainer: React.FC<HourContainerProps> = ({
  inactive,
  selected,
  ...props
}) => (
  <TouchableOpacity
    style={[
      styles.hourContainer,
      {
        borderColor: inactive ? GOLDEN_HIGHLIGHT : GOLDEN,
        backgroundColor: selected ? GOLDEN : "transparent",
      },
    ]}
    {...props}
  />
);

const styles = StyleSheet.create({
  datesContainerScroll: {
    flex: 1,
  } as ViewStyle,
  datesContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    minHeight: 100,
    paddingBottom: 20,
    gap: 20,
  } as ViewStyle,
  dateContainer: {
    padding: 3,
    minWidth: 65,
    height: 85,
    borderColor: PRIMARY_GREEN,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    gap: 1,
    flexShrink: 1,
  } as ViewStyle,
  hoursContainerScroll: {
    flex: 1,
  } as ViewStyle,
  hoursContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    paddingBottom: 20,
    minHeight: 50,
  } as ViewStyle,
  hourContainer: {
    minWidth: 85,
    justifyContent: "center",
    alignItems: "center",
    height: 35,
    borderWidth: 1,
    borderRadius: 10,
    flexShrink: 1,
    position: "relative",
  } as ViewStyle,
  banner: {
    fontFamily: "Open Sans",
    fontSize: 14,
    color: DARKER_TEXT,
    transform: [{ rotate: "-15deg" }],
    fontWeight: "700",
    position: "absolute",
  } as TextStyle,
  button: {
    width: "100%",
    padding: 10,
    borderRadius: 50,
    backgroundColor: PRIMARY_GREEN,
    marginTop: 10,
  } as ViewStyle,
  buttonDisabled: {
    opacity: 0.5,
  } as ViewStyle,
});

export { DateContainer, HourContainer };
export default styles;
