import React from 'react';
import {BaseText} from '../Text';
import GoBackIcon from '../../resources/img/icons/GoBackIcon';
import {View} from 'react-native';
import {Link, useLocation} from 'react-router-native';
import styles from './styles';
import {PRIMARY_GREEN} from '../../resources/constants/colors';

const TopBar: React.FC<{title?: string; backRoute?: string}> = ({
  title = '',
  backRoute,
}) => {
  const location = useLocation();
  console.log(location);
  return (
    <View style={styles.container}>
      <Link to={backRoute ?? '../..'}>
        <View style={styles.menuButton}>
          <GoBackIcon />
        </View>
      </Link>
      <BaseText
        flexGrow={1}
        fontSize={26}
        weight={600}
        marginRight={35}
        color={PRIMARY_GREEN}
        textAlign={'center'}>
        {title}
      </BaseText>
    </View>
  );
};

export default TopBar;
