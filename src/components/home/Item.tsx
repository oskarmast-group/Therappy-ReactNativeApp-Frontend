import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { Link } from "react-router-native";
import { GREEN_HIGHLIGHT } from "../../constant/colors";

interface ItemProps {
  icon: ReactNode;
  path: string;
  current: string;
  withNotification?: boolean;
}

const isCurrent = (path: string, current: string, index: number) => {
  const pathList = path.split("/");
  const currentList = current.split("/");
  return pathList[pathList.length - 1] === currentList[index];
};

const Item: React.FC<ItemProps> = ({
  icon,
  path,
  current,
  withNotification = false,
}) => {
  const active = isCurrent(path, current, 2);
  return (
    <Link to={path}>
      <View style={styles.itemContainer}>
        <View style={styles.iconContainer}>{icon}</View>
        <View
          style={
            active
              ? StyleSheet.compose(styles.indicator, styles.indicatorActive)
              : styles.indicator
          }
        />
        {withNotification && <View style={styles.notifications} />}
      </View>
    </Link>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexShrink: 1,
  },
  iconContainer: {
    width: 33,
    height: 33,
  },
  indicator: {
    width: 30,
    height: 3,
    marginTop: 5,
    backgroundColor: "transparent",
    borderRadius: 3,
  },
  indicatorActive: {
    backgroundColor: GREEN_HIGHLIGHT,
  },
  notifications: {
    position: "absolute",
    right: 0,
    top: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: GREEN_HIGHLIGHT,
  },
});

export default Item;
