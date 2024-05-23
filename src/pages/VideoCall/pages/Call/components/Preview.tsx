// Preview.tsx
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components/native';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GREEN } from '../../../../../resources/constants/colors';
import NoProfileSVG from '../../../../../resources/img/no-profile.svg';
import { IMAGES_URL } from '../../../../../resources/constants/urls';
import { capitalize } from '../../../../../utils/text';
import { dateFormat } from '../../../../../utils/date';
import { getDisplayTime } from '../../../../../utils/time';
import { addMinutes } from 'date-fns';
import { useUserMedia } from '../../../../../hooks/useUserMedia';
import { VideoContainer } from '../../../containers/VideoContainer';
import Video from 'react-native-video';
import Button from '../../../../../components/Button';
import CircleActionButton from './CircleActionButton';
import MicOnSVG from '../../../../../resources/img/mic-on.svg';
import MicOffSVG from '../../../../../resources/img/mic-off.svg';
import CamOnSVG from '../../../../../resources/img/cam-on.svg';
import CamOffSVG from '../../../../../resources/img/cam-off.svg';
import MainContainer from '../../../../../containers/MainContainer';
import TopBar from '../../../../../components/TopBar';

const ProfileContainer = styled.View`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 50px;
  align-items: center;
`;

const ProfileImageContainer = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  overflow: hidden;
  border: 2px solid ${GREEN};
`;

const ProfileImage = styled.Image`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Preview = ({ appointments, startCall }) => {
  const {
    mediaStream,
    devices,
    selectedDevices,
    changeSelectedDevice,
    videoEnabled,
    toggleVideo,
    micEnabled,
    toggleMic,
  } = useUserMedia();

  const videoRef = useRef(null);

  useEffect(() => {
    if (mediaStream && videoRef.current) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [mediaStream]);

  return (
    <MainContainer withSideMenu={false} withBottomNavigation={false}>
      <TopBar title={'Videollamada'} />
      <ProfileContainer>
        <ProfileImageContainer>
          <Image
            source={
              appointments?.appointment?.profileImg
                ? { uri: `${IMAGES_URL}${appointments?.appointment?.profileImg}` }
                : NoProfileSVG
            }
          />
        </ProfileImageContainer>
      </ProfileContainer>
      {appointments.appointment?.name && appointments.appointment?.lastName && (
        <Text style={{ textAlign: 'center', margin: 10 }}>
          {`${appointments.appointment?.title ?? ''} ${appointments.appointment?.name} ${
            appointments.appointment?.lastName
          }`}
        </Text>
      )}
      {!appointments.fetching.state && appointments.appointment?.date && (
        <Text style={{ textAlign: 'center' }}>
          {capitalize(dateFormat(appointments.appointment?.date, 'EEEE - LLLL d, uuuu'))}
        </Text>
      )}
      {!appointments.fetching.state && appointments.appointment?.date && (
        <Text style={{ textAlign: 'center', marginBottom: 15 }}>
          {getDisplayTime(appointments.appointment?.date)} -{' '}
          {getDisplayTime(addMinutes(new Date(appointments.appointment?.date), 50))}
        </Text>
      )}
      <VideoContainer>
        <Video ref={videoRef} autoPlay playsInline muted />
        <View style={styles.actionButtons}>
          <CircleActionButton src={micEnabled ? MicOnSVG : MicOffSVG} onClick={toggleMic} alt={'Mutear'} />
          <CircleActionButton src={videoEnabled ? CamOnSVG : CamOffSVG} onClick={toggleVideo} alt={'Apagar video'} />
        </View>
      </VideoContainer>
      <Button type="button" onClick={startCall} style={{ marginTop: 10 }} disabled={false}>
        Unirse a llamada
      </Button>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  actionButtons: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    padding: 10,
  },
});

export default Preview;
