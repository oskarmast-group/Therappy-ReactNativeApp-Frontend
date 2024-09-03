import React from 'react';
import MenuIcon from '../../../../resources/img/icons/MenuIcon';
import {Image, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import ProfileIcon from '../../../../resources/img/icons/ProfileIcon';
import useUser from '../../../../state/user';
import {IMAGES_URL} from '../../../../resources/constants/urls';
import {Link} from 'react-router-native';

const Menu: React.FC<{toggleMenu: () => void}> = ({toggleMenu}) => {
  const {data} = useUser();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
        <MenuIcon />
      </TouchableOpacity>
      <Link to={'/perfil'} underlayColor={'tranparent'}>
        <View style={styles.profileContainer}>
          {data?.current?.profileImg ? (
            <Image
              style={styles.image}
              source={{uri: `${IMAGES_URL}${data.current.profileImg}`}}
            />
          ) : (
            <ProfileIcon />
          )}
        </View>
      </Link>
    </View>
  );
};

export default Menu;
