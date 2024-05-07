import React, { PropsWithChildren } from 'react';
import { Image, View } from 'react-native';
import styles from './styles';
import { Link } from 'react-router-native';
import { IMAGES_URL } from '../../resources/constants/urls';
import ProfileIcon from '../../resources/img/icons/ProfileIcon';
import { BaseText } from '../Text';
import { NestedClient } from '../../interfaces/User';

const LinkContainer: React.FC<PropsWithChildren<{ id: number; shouldRender: boolean }>> = ({
  shouldRender = false,
  id,
  children,
}) => {
  return shouldRender ? (
    <Link to={`/terapeutas/${id}`}>
      <View style={styles.linkChildrenContainer}>{children}</View>
    </Link>
  ) : (
    <View style={styles.linkChildrenContainer}>{children}</View>
  );
};

const ClientCard: React.FC<{
  client: NestedClient;
  clickable: boolean;
}> = ({ client, clickable = true }) => {
  const { id, name, lastName, profileImg } = client;
  return (
    <View style={styles.container}>
      <LinkContainer id={id} shouldRender={clickable}>
        <View style={styles.imageContainer}>
          {profileImg ? <Image style={styles.image} source={{ uri: `${IMAGES_URL}${profileImg}` }} /> : <ProfileIcon />}
        </View>
        <View style={styles.informationContainer}>
          <BaseText fontSize={18} marginBottom={5}>{`${name} ${lastName}`}</BaseText>
        </View>
      </LinkContainer>
    </View>
  );
};

export default ClientCard;
