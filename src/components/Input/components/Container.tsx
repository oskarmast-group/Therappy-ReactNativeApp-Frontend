import React from 'react';
import {View} from 'react-native';
import {ViewProps} from 'react-native-svg/lib/typescript/fabric/utils';
import styles from './styles';

const Container: React.FC<ViewProps> = ({...props}) => {
  return <View style={styles.container} {...props} />;
};

export default Container;
