import React, {useCallback} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import ProfileIcon from '../../../../resources/img/icons/ProfileIcon';
import {Image} from 'react-native';
import {IMAGES_URL} from '../../../../resources/constants/urls';
import CameraIcon from '../../../../resources/img/icons/CameraIcon';
import useUser from '../../../../state/user';

const ProfileUpload: React.FC = () => {
  const {data: user, dispatcher: userDispatcher} = useUser();

  const onUpload = useCallback(() => {
    // DocumentPicker.pickSingle({
    //   type: [types.doc, types.docx, types.pdf],
    // })
    //   .then(response => {
    //     if (response.type === null || response.name === null) {
    //       throw new Error('Formato invalido');
    //     }
    //     const file = new File(response.uri, response.type, response.name);
    //     if (type === 'new') {
    //       const data = {
    //         doc: file,
    //         documentType: props.documentType,
    //         uuid: 'newdoc',
    //       };
    //       dispatcher.newDocStart(data);
    //       return;
    //     }
    //   })
    //   .catch(e => {
    //     console.error(e);
    //     if (!DocumentPicker.isCancel(e)) {
    //       alert({
    //         type: ALERT_TYPES.INFO,
    //         config: {
    //           title: 'Formato incorrecto',
    //           body: (
    //             <BaseText>
    //               Verifica que el documento que intentas subir sea válido, menor
    //               a 200kB y de tipo doc, docx o pdf.
    //             </BaseText>
    //           ),
    //           buttonText: 'OK',
    //         },
    //       })
    //         .then(() => {})
    //         .catch(() => {});
    //     }
    //   });
  }, [userDispatcher]);

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
      {/* <TouchableOpacity
        onPress={onUpload}
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
      </TouchableOpacity> */}
    </View>
  );
};

export default ProfileUpload;
