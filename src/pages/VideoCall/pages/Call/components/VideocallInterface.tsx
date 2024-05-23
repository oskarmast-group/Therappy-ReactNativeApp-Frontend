import React, { useEffect, useRef, useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { MediaStream, RTCView } from 'react-native-webrtc';
// import { Ring } from '@uiball/loaders';
import { useStreamingSocket } from '../useStreamingSocket';
import MicOnSVG from '../../../../../resources/img/mic-on.svg';
import MicOffSVG from '../../../../../resources/img/mic-off.svg';
import CamOnSVG from '../../../../../resources/img/cam-on.svg';
import CamOffSVG from '../../../../../resources/img/cam-off.svg';
import SoundOnSVG from '../../../../../resources/img/sound-on.svg';
import SoundOffSVG from '../../../../../resources/img/sound-off.svg';
import HangupCall from '../../../../../resources/img/icons/videocall-hangup-icon.svg';

interface Props {
  appointments: {
    appointment?: {
      name?: string;
      lastName?: string;
      title?: string;
    };
  };
  localStream: MediaStream | null;
  roomId: string;
  toggleMic: () => void;
  toggleVideo: () => void;
  videoEnabled: boolean;
  micEnabled: boolean;
}

const VideocallInterface: React.FC<Props> = ({
  appointments,
  localStream,
  roomId,
  toggleMic,
  toggleVideo,
  videoEnabled,
  micEnabled,
}) => {
  const { remoteStream } = useStreamingSocket(roomId, localStream);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const localVideoRef = useRef<RTCView>(null);
  const remoteVideoRef = useRef<RTCView>(null);

  useEffect(() => {
    if (localStream && localVideoRef.current) {
      localVideoRef.current.srcObject = localStream.toURL();
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteStream && remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream.toURL();
    }
  }, [remoteStream]);

  return (
    <View style={styles.window}>
      <View style={styles.remoteVideoContainer}>
        {remoteStream ? (
          <RTCView ref={remoteVideoRef} style={styles.remoteVideo} objectFit="cover" />
        ) : (
          <View style={styles.loader}>
            <ActivityIndicator color="#fbfbfd" size={45} />
          </View>
        )}
        {localStream && <RTCView ref={localVideoRef} style={styles.localVideo} objectFit="cover" />}
        <View style={styles.actionsContainer}>
          <CircleActionButton src={micEnabled ? MicOnSVG : MicOffSVG} onPress={toggleMic} alt={'Mutear'} />
          <CircleActionButton src={videoEnabled ? CamOnSVG : CamOffSVG} onPress={toggleVideo} alt={'Apagar video'} />
          <CircleActionButton
            src={soundEnabled ? SoundOnSVG : SoundOffSVG}
            onPress={() => setSoundEnabled(!soundEnabled)}
            alt={'Apagar sonido'}
          />
          <CircleActionButton
            src={HangupCall}
            onPress={() => {
              // Add your hangup logic here
            }}
            alt={'Apagar sonido'}
            style={{ backgroundColor: 'red' }}
          />
        </View>
        <View style={styles.watermark}>
          <Image source={require('../../../../../resources/img/therappy-logo-white.png')} style={styles.logo} />
          {appointments.appointment?.name && appointments.appointment?.lastName && (
            <Text style={styles.appointmentText}>
              En llamada con:
              <br />
              {`${appointments.appointment?.title ?? ''} ${appointments.appointment?.name} ${
                appointments.appointment?.lastName
              }`}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

interface CircleActionButtonProps {
  src: any;
  onPress: () => void;
  alt: string;
  style?: object;
}

const CircleActionButton: React.FC<CircleActionButtonProps> = ({ src, onPress, alt, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.circleButton, style]}>
      <Image source={src} style={styles.circleButtonImage} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  window: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  remoteVideoContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#1d1d1f',
  },
  remoteVideo: {
    width: '100%',
    height: '100%',
  },
  loader: {
    position: 'absolute',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  localVideo: {
    position: 'absolute',
    right: 10,
    top: 10,
    width: '30%',
    maxWidth: 250,
    height: 'auto',
  },
  watermark: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  logo: {
    width: 100,
    opacity: 0.6,
  },
  appointmentText: {
    textAlign: 'center',
    margin: 10,
    color: '#fbfbfd',
  },
  actionsContainer: {
    display: 'flex',
    gap: 10,
    position: 'absolute',
    bottom: 130,
    left: 0,
    right: 0,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  circleButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  circleButtonImage: {
    width: 30,
    height: 30,
  },
});

export default VideocallInterface;
