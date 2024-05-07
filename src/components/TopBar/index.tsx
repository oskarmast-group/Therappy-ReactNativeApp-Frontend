import React from 'react';
import { BaseText } from '../Text';
import GoBackIcon from '../../resources/img/icons/GoBackIcon';
import { TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { PRIMARY_GREEN } from '../../resources/constants/colors';
import { useRouter } from '../../providers/RouterProvider';

const TopBar: React.FC<{
  title?: string;
  backRoute?: string;
  fontSize?: number;
  color?: string;
}> = ({ title = '', backRoute, fontSize = 26, color = PRIMARY_GREEN }) => {
  const { goBack } = useRouter();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => goBack(backRoute ?? '..')}>
        <View style={styles.menuButton}>
          <GoBackIcon />
        </View>
      </TouchableOpacity>
      <BaseText flexGrow={1} fontSize={fontSize} weight={600} marginRight={35} color={color} textAlign={'center'}>
        {title}
      </BaseText>
    </View>
  );
};

export default TopBar;
