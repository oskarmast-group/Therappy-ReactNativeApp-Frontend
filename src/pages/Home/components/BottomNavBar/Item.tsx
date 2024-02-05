import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import styles from './styles';
import {Link} from 'react-router-native';

interface ItemProps {
  icon: ReactNode;
  path: string;
  current: string;
  withNotification?: boolean;
}

const isCurrent = (path: string, current: string, index: number) => {
  const pathList = path.split('/');
  const currentList = current.split('/');
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

export default Item;
