import React, {useMemo} from 'react';
import AppointmentState from '../../../../state/appointments/state';
import {Dimensions, StyleSheet, View} from 'react-native';
import videoStyles from '../styles';
import CircleActionButton from '../../component/CircleActionButton';
import RefreshIcon from '../../../../resources/img/icons/call/RefreshIcon';
import MicOnIcon from '../../../../resources/img/icons/call/MicOnIcon';
import MicOffIcon from '../../../../resources/img/icons/call/MicOffIcon';
import CamOnIcon from '../../../../resources/img/icons/call/CamOnIcon';
import CamOffIcon from '../../../../resources/img/icons/call/CamOffIcon';
import {RED} from '../../../../resources/constants/colors';
import HangUpIcon from '../../../../resources/img/icons/call/HangUpIcon';
import {useVideocall} from '../VideocallProvider';
import {DailyMediaView} from '@daily-co/react-native-daily-js';
import styled from 'styled-components/native';
import Loading from '../../../../components/Loading';
import {Orientation, useOrientation} from '../../../../hooks/useOrientation';

const screenWidth = Dimensions.get('window').width;

const LocalVideoContainer = styled.View<{
  widthPercentage: number;
  aspectRatio: number;
}>`
  position: absolute;
  right: 10px;
  top: 10px;
  width: ${({widthPercentage}) => widthPercentage * screenWidth}px;
  height: ${({aspectRatio, widthPercentage}) =>
    (widthPercentage * screenWidth) / aspectRatio}px;
  overflow: hidden;
  z-index: 1;
  flex-grow: 1;
  border-radius: 10px;
`;

const VideocallInterface: React.FC<{
  appointments: AppointmentState;
}> = (
  {
    // appointments,
  },
) => {
  const {
    leaveCall,
    usingFrontCamera,
    switchCamera,
    isCameraMuted,
    isMicMuted,
    toggleCamera,
    toggleMic,
    videoTrack,
    audioTrack,
    videoDimmensions,
    remoteParticipants,
  } = useVideocall();
  const orientation = useOrientation();

  const onHangup = () => {
    leaveCall();
  };

  const remoteStream = useMemo(() => {
    if (remoteParticipants.length === 0) {
      return {
        videoTrack: null,
        audioTrack: null,
      };
    }
    const participant = remoteParticipants[0];

    return {
      videoTrack: participant?.tracks.video.track ?? null,
      audioTrack: participant?.tracks.audio.track ?? null,
    };
  }, [remoteParticipants]);

  console.log('videoDimmensions', videoDimmensions);

  return (
    <View style={styles.window}>
      <View style={styles.remoteVideoContainer}>
        {(remoteStream.videoTrack || remoteStream.audioTrack) && (
          <DailyMediaView
            videoTrack={remoteStream.videoTrack}
            audioTrack={remoteStream.audioTrack}
            objectFit={'contain'}
            zOrder={0}
            style={videoStyles.stream}
          />
        )}
        {remoteParticipants.length === 0 && <Loading />}
      </View>
      {(videoTrack || audioTrack) &&
        videoDimmensions.height &&
        videoDimmensions.width && (
          <LocalVideoContainer
            widthPercentage={
              videoDimmensions.height > videoDimmensions.width ? 0.3 : 0.35
            }
            aspectRatio={videoDimmensions.height / videoDimmensions.width}>
            <DailyMediaView
              videoTrack={videoTrack}
              audioTrack={audioTrack}
              objectFit={'contain'}
              zOrder={1}
              style={videoStyles.stream}
              mirror={usingFrontCamera}
            />
          </LocalVideoContainer>
        )}
      <View
        style={StyleSheet.compose(
          styles.controlsContainer,
          orientation === Orientation.Portrait
            ? styles.controlsPortrait
            : styles.controlsLandscape,
        )}>
        <CircleActionButton onPress={switchCamera}>
          <RefreshIcon color={'white'} />
        </CircleActionButton>
        <CircleActionButton onPress={toggleMic}>
          {isMicMuted ? <MicOffIcon /> : <MicOnIcon />}
        </CircleActionButton>
        <CircleActionButton onPress={toggleCamera}>
          {isCameraMuted ? <CamOffIcon /> : <CamOnIcon />}
        </CircleActionButton>
        <CircleActionButton backgroundColor={RED} onPress={onHangup}>
          <HangUpIcon />
        </CircleActionButton>
      </View>
      {/* <Watermark>
        <Logo src={TherappyLogo} alt={'Logo Therappy'} />
        {appointments.appointment?.name &&
          appointments.appointment?.lastName && (
            <p
              style={{
                textAlign: 'center',
                margin: '10px',
                color: '#fbfbfd',
              }}>
              En llamada con:
              <br />
              {`${appointments.appointment?.title ?? ''} ${
                appointments.appointment?.name
              } ${appointments.appointment?.lastName}`}
            </p>
          )}
      </Watermark> */}
    </View>
  );
};

export default VideocallInterface;

const styles = StyleSheet.create({
  window: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  controlsContainer: {
    display: 'flex',
    gap: 10,
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  controlsPortrait: {
    bottom: 130,
  },
  controlsLandscape: {
    bottom: 10,
  },
  remoteVideoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
