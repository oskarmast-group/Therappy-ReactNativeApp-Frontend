import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useParams } from "react-router-native";
import Preview from "./components/Preview"; // Ensure this component is adapted for React Native
import VideocallInterface from "./components/VideocallInterface";
import { useAppointment } from "../../../../context/Appointment";
import useWebRTC from "../../../../hooks/useWebRTC";
import Appointment from "../../../../interfaces/Appointment";
import Loading from "../../../../components/Loading";

const Call: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { viewAppointment, loadingStates } = useAppointment();
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const {
    callStarted,
    localStream,
    remoteStream,
    createOffer,
    videoEnabled,
    toggleVideo,
    endCall,
    micEnabled,
    toggleMic,
  } = useWebRTC(roomId);

  useEffect(() => {
    const fetchAppointment = async () => {
      const res = await viewAppointment(roomId!);
      if (res) setAppointment(res);
    };
    fetchAppointment();
  }, [roomId]);

  return (
    <View style={styles.container}>
      {loadingStates.viewAppointment || !appointment ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Loading />
        </View>
      ) : callStarted ? (
        <VideocallInterface
          appointment={appointment}
          localStream={localStream}
          remoteStream={remoteStream}
          toggleMic={toggleMic}
          toggleVideo={toggleVideo}
          videoEnabled={videoEnabled}
          micEnabled={micEnabled}
          endCall={endCall}
        />
      ) : (
        <Preview
          appointment={appointment}
          startCall={() => createOffer()}
          localStream={localStream}
          toggleMic={toggleMic}
          toggleVideo={toggleVideo}
          videoEnabled={videoEnabled}
          micEnabled={micEnabled}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default Call;
