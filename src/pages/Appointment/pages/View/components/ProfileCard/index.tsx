import React from 'react';
import { Image, View } from 'react-native';
import styles from './styles';
import Appointment from '../../../../../../interfaces/Appointment';
import { IMAGES_URL } from '../../../../../../resources/constants/urls';
import ProfileIcon from '../../../../../../resources/img/icons/ProfileIcon';

const ProfileCard: React.FC<{ appointment: Appointment | null }> = ({ appointment }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {appointment?.profileImg ? (
          <Image style={styles.image} source={{ uri: `${IMAGES_URL}${appointment?.profileImg}` }} />
        ) : (
          <ProfileIcon />
        )}
      </View>
    </View>
  );
};

export default ProfileCard;
