import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import { RTCView, MediaStream } from 'react-native-webrtc';
import { useUserMedia } from '../../../../hooks/useUserMedia'; // Make sure these hooks are adapted for React Native
import useAppointments from '../../../../state/appointments';
import Preview from './components/Preview'; // Ensure this component is adapted for React Native
import VideocallInterface from './components/VideocallInterface'; // Ensure this component is adapted for React Native

interface RouteParams {
  roomId: string;
}

const Call: React.FC = () => {
  const [callStarted, setCallStarted] = useState(false);
  const { roomId } = useParams<RouteParams>();
  const [appointments, appointmentsDispatcher] = useAppointments();

  useEffect(() => {
    appointmentsDispatcher.fetchOneStart(roomId);
  }, [roomId]);

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

  return (
    <View style={styles.container}>
      {callStarted ? (
        <VideocallInterface
          appointments={appointments}
          localStream={mediaStream}
          roomId={roomId}
          toggleMic={toggleMic}
          toggleVideo={toggleVideo}
          videoEnabled={videoEnabled}
          micEnabled={micEnabled}
        />
      ) : (
        <Preview appointments={appointments} startCall={() => setCallStarted(true)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Call;
