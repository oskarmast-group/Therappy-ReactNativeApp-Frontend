import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import TopBar from '../../../../components/TopBar';
import MainContainer from '../../../../containers/MainContainer';
import { useUserMedia } from '../../../../hooks/useUserMedia';
import { RTCView } from 'react-native-webrtc';
import CircleActionButton from '../Call/components/CircleActionButton';
import MicOnSVG from '../../../../resources/img/mic-on.svg';
import MicOffSVG from '../../../../resources/img/mic-off.svg';
import CamOnSVG from '../../../../resources/img/cam-on.svg';
import CamOffSVG from '../../../../resources/img/cam-off.svg';

const TestVideo: React.FC = () => {
  const videoRef = useRef<any>(null);
  const { mediaStream, videoEnabled, toggleVideo, micEnabled, toggleMic } = useUserMedia();

  return (
    <MainContainer withSideMenu={false} withBottomNavigation={false}>
      <TopBar title="Pruebas Técnicas" />
      <View style={styles.videoContainer}>
        {mediaStream && <RTCView streamURL={mediaStream.toURL()} style={styles.video} objectFit="cover" />}
        <View style={styles.controls}>
          <CircleActionButton
            onClick={toggleMic}
            style={styles.button}
            src={micEnabled ? MicOnSVG : MicOffSVG}
          ></CircleActionButton>
          <CircleActionButton
            onClick={toggleVideo}
            style={styles.button}
            src={videoEnabled ? CamOnSVG : CamOffSVG}
          ></CircleActionButton>
        </View>
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  controls: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    gap: 10,
    padding: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default TestVideo;
