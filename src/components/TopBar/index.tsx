import React from 'react';
import {BaseText} from '../Text';
import GoBackIcon from '../../resources/img/icons/GoBackIcon';
import {View} from 'react-native';
import {Link} from 'react-router-native';
import styles from './styles';
import {PRIMARY_GREEN} from '../../resources/constants/colors';

const TopBar: React.FC<{
  title?: string;
  backRoute?: string;
  fontSize?: number;
  color?: string;
}> = ({title = '', backRoute, fontSize = 26, color = PRIMARY_GREEN}) => {
  return (
    <View style={styles.container}>
      <Link to={backRoute ?? '..'}>
        <View style={styles.menuButton}>
          <GoBackIcon />
        </View>
      </Link>
      <BaseText
        flexGrow={1}
        fontSize={fontSize}
        weight={600}
        marginRight={35}
        color={color}
        textAlign={'center'}>
        {title}
      </BaseText>
    </View>
  );
};

export default TopBar;
