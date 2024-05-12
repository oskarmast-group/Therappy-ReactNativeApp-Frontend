import React from 'react';
import MenuIcon from '../../../../resources/img/icons/MenuIcon';
import { Image, TouchableHighlight, View } from 'react-native';
import styles from './styles';
import ProfileIcon from '../../../../resources/img/icons/ProfileIcon';
import useUser from '../../../../state/user';
import { IMAGES_URL } from '../../../../resources/constants/urls';

const Menu: React.FC<{ toggleMenu: () => void }> = ({ toggleMenu }) => {
  const { data } = useUser();
  return (
    <View style={styles.container}>
      <TouchableHighlight style={styles.menuButton} onPress={toggleMenu}>
        <MenuIcon />
      </TouchableHighlight>
      <View style={styles.profileContainer}>
        {data?.current?.profileImg ? (
          <Image source={{ uri: `${IMAGES_URL}${data.current.profileImg}` }} />
        ) : (
          <ProfileIcon />
        )}
      </View>
    </View>
  );
};

export default Menu;
