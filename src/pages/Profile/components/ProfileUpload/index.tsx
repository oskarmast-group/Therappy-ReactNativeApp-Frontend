import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import ProfileIcon from '../../../../resources/img/icons/ProfileIcon';
import {Image} from 'react-native';
import {IMAGES_URL} from '../../../../resources/constants/urls';
import useUser from '../../../../state/user';
import CameraIcon from '../../../../resources/img/icons/CameraIcon';
import {BaseText} from '../../../../components/Text';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import File from '../../../../interfaces/File';

const ProfileUpload: React.FC = () => {
  const {data: user, dispatcher: userDispatcher} = useUser();
  const [showOptions, setShowOptions] = useState(false);

  const onUpload = useCallback(
    (response: ImagePickerResponse) => {
      if (response.assets && response.assets[0]) {
        const asset = response.assets[0];
        if (!asset.uri || !asset.type || !asset.fileName) {
          return;
        }
        const file = new File(asset.uri, asset.type, asset.fileName);
        const data = {
          profile: file,
        };
        userDispatcher.updateImageStart(data);
        return;
      }
    },
    [userDispatcher],
  );

  const openCamera = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      quality: 0.5,
      maxHeight: 700,
      maxWidth: 700,
    });
    onUpload(result);
  };

  const onOpenCamera = async () => {
    if (Platform.OS === 'ios') {
      openCamera();
      return;
    }

    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
    ]);
    console.log(granted);
    if (granted['android.permission.CAMERA'] === 'granted') {
      openCamera();
    }
  };
  const onOpenGallery = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.5,
      maxHeight: 700,
      maxWidth: 700,
      selectionLimit: 1,
    });
    onUpload(result);
  };

  const loadingPicture =
    user.fetching.update.isFetching &&
    user.fetching.update.config?.key === 'image';

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {user?.current?.profileImg ? (
          <Image
            style={styles.profileImage}
            source={{uri: `${IMAGES_URL}${user?.current?.profileImg}`}}
          />
        ) : (
          <ProfileIcon />
        )}
      </View>
      <TouchableOpacity
        onPress={() => setShowOptions(!showOptions)}
        disabled={loadingPicture}
        style={
          loadingPicture
            ? StyleSheet.compose(styles.upload, styles.uploadDisabled)
            : styles.upload
        }>
        {loadingPicture ? (
          <ActivityIndicator color={'#fbfbfd'} />
        ) : (
          <View style={styles.uploadImage}>
            <CameraIcon />
          </View>
        )}
      </TouchableOpacity>
      {showOptions && (
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            onPress={() => {
              setShowOptions(false);
              onOpenCamera();
            }}>
            <BaseText>Cámara</BaseText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setShowOptions(false);
              onOpenGallery();
            }}>
            <BaseText>Galería</BaseText>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ProfileUpload;
