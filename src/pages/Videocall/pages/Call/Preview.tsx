import React from 'react';
import MainContainer from '../../../../containers/MainContainer';
import TopBar from '../../../../components/TopBar';
import {Image, StyleSheet, View} from 'react-native';
import AppointmentState from '../../../../state/appointments/state';
import {PRIMARY_GREEN} from '../../../../resources/constants/colors';
import ProfileIcon from '../../../../resources/img/icons/ProfileIcon';
import {IMAGES_URL} from '../../../../resources/constants/urls';
import AppointmentCard from '../../../../components/AppointmentCard';
import Button, {ButtonText} from '../../../../components/Button';
import VideoContainer from '../../containers/VideoContainer';
import CircleActionButton from '../../component/CircleActionButton';
import RefreshIcon from '../../../../resources/img/icons/call/RefreshIcon';
import MicOnIcon from '../../../../resources/img/icons/call/MicOnIcon';
import MicOffIcon from '../../../../resources/img/icons/call/MicOffIcon';
import CamOnIcon from '../../../../resources/img/icons/call/CamOnIcon';
import CamOffIcon from '../../../../resources/img/icons/call/CamOffIcon';
import videoStyles from '../styles';
import {useVideocall} from '../VideocallProvider';
import {DailyMediaView} from '@daily-co/react-native-daily-js';

const Preview: React.FC<{
  appointments: AppointmentState;
  meetingUrl?: string;
  meetingToken?: string;
}> = ({appointments, meetingUrl, meetingToken}) => {
  const {
    joinCall,
    usingFrontCamera,
    switchCamera,
    isCameraMuted,
    isMicMuted,
    toggleCamera,
    toggleMic,
    videoTrack,
    audioTrack,
    videoDimmensions,
  } = useVideocall();

  const onJoinMeeting = () => {
    if (meetingUrl && meetingToken) {
      joinCall(meetingUrl, meetingToken);
    }
  };

  return (
    <MainContainer withSideMenu={false} withBottomNavigation={false}>
      <TopBar title={'Videollamada'} />
      <View style={styles.imageContainer}>
        <View style={styles.profileImage}>
          {appointments?.appointment?.profileImg ? (
            <Image
              width={96}
              height={96}
              source={{
                uri: `${IMAGES_URL}${appointments?.appointment?.profileImg}`,
              }}
            />
          ) : (
            <ProfileIcon />
          )}
        </View>
      </View>
      <View style={styles.separator} />
      {appointments.appointment && (
        <AppointmentCard app={appointments.appointment} withImage={false} />
      )}
      <View style={styles.separator} />
      <VideoContainer height={videoDimmensions.height} maxHeight={'350px'}>
        {(videoTrack || audioTrack) && (
          <DailyMediaView
            videoTrack={videoTrack}
            audioTrack={audioTrack}
            objectFit={'contain'}
            zOrder={0}
            style={videoStyles.stream}
            mirror={usingFrontCamera}
          />
        )}
        <View style={videoStyles.controlsContainer}>
          <CircleActionButton onPress={switchCamera}>
            <RefreshIcon color={'white'} />
          </CircleActionButton>
          <CircleActionButton onPress={toggleMic}>
            {isMicMuted ? <MicOffIcon /> : <MicOnIcon />}
          </CircleActionButton>
          <CircleActionButton onPress={toggleCamera}>
            {isCameraMuted ? <CamOffIcon /> : <CamOnIcon />}
          </CircleActionButton>
        </View>
      </VideoContainer>
      <Button
        onPress={onJoinMeeting}
        marginTop={10}
        disabled={!meetingUrl || !meetingToken}>
        <ButtonText>Unirse a llamada</ButtonText>
      </Button>
    </MainContainer>
  );
};

export default Preview;

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 1,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    borderColor: PRIMARY_GREEN,
    borderWidth: 2,
    borderStyle: 'solid',
  },
  separator: {
    height: 20,
  },
});
