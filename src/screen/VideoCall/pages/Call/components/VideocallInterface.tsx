import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { MediaStream, RTCView } from "react-native-webrtc";
import Appointment from "../../../../../interfaces/Appointment";
import CamOnSVG from "../../../../../resources/img/CamOnSVG";
import CamOffSVG from "../../../../../resources/img/CamOffSVG";
import MicOnSVG from "../../../../../resources/img/MicOnSVG";
import MicOffSVG from "../../../../../resources/img/MicOffSVG";
import SoundOffSVG from "../../../../../resources/img/SoundOffSVG";
import HangupCall from "../../../../../resources/img/icons/HangupCall";
import SoundOnSVG from "../../../../../resources/img/SoundOnSVG";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { CircleActionButton2 } from "./CircleActionButton";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  appointment: Appointment;
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  toggleMic: () => void;
  toggleVideo: () => void;
  videoEnabled: boolean;
  micEnabled: boolean;
  endCall: () => void;
}

const VideocallInterface: React.FC<Props> = ({
  appointment,
  localStream,
  remoteStream,
  toggleMic,
  toggleVideo,
  videoEnabled,
  micEnabled,
  endCall,
}) => {
  const [soundEnabled, setSoundEnabled] = useState(false);

  return (
    <View style={styles.window}>
      <View style={styles.remoteVideoContainer}>
        {remoteStream ? (
          <RTCView
            streamURL={remoteStream.toURL()}
            style={styles.remoteVideo}
            objectFit="cover"
            mirror
          />
        ) : (
          <View style={styles.loader}>
            <ActivityIndicator color="#fbfbfd" size={45} />
          </View>
        )}
        {localStream && (
          <RTCView
            streamURL={localStream.toURL()}
            style={styles.localVideo}
            objectFit="cover"
            mirror
          />
        )}
        <View style={styles.actionsContainer}>
          <CircleActionButton2
            src={
              micEnabled ? (
                <FontAwesome5 name="microphone" size={18} color="white" />
              ) : (
                <FontAwesome5 name="microphone-slash" size={18} color="white" />
              )
            }
            onClick={toggleMic}
            alt={"Mutear"}
          />
          <CircleActionButton2
            src={
              videoEnabled ? (
                <FontAwesome name="video-camera" size={18} color="white" />
              ) : (
                <FontAwesome5 name="video-slash" size={18} color="white" />
              )
            }
            onClick={toggleVideo}
            alt={"Apagar video"}
          />
          <CircleActionButton2
            src={
              soundEnabled ? (
                <FontAwesome name="volume-up" size={18} color="white" />
              ) : (
                <Ionicons name="volume-mute-sharp" size={18} color="white" />
              )
            }
            onClick={() => setSoundEnabled(!soundEnabled)}
            alt={"Apagar sonido"}
          />
          <CircleActionButton2
            src={<Ionicons name="call" size={18} color="white" />}
            onClick={endCall}
            alt={"Apagar sonido"}
            style={{ backgroundColor: "red" }}
          />
        </View>
        <View style={styles.watermark}>
          {/* <Image
            source={require("../../../../../resources/img/therappy-logo-white.png")}
            style={styles.logo}
          /> */}
          {appointment.name && appointment.lastName && (
            <Text style={styles.appointmentText}>
              En llamada con:
              {`${appointment.title ?? ""} ${appointment.name} ${
                appointment.lastName
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

const CircleActionButton: React.FC<CircleActionButtonProps> = ({
  src,
  onPress,
  alt,
  style,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.circleButton, style]}>
      <Image source={src} style={styles.circleButtonImage} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  window: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  remoteVideoContainer: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#1d1d1f",
  },
  remoteVideo: {
    width: "100%",
    height: "100%",
  },
  loader: {
    position: "absolute",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  localVideo: {
    position: "absolute",
    right: 10,
    top: 40,
    width: 100,
    maxWidth: 250,
    height: 150,
  },
  watermark: {
    position: "absolute",
    right: 10,
    bottom: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  logo: {
    width: 100,
    opacity: 0.6,
  },
  appointmentText: {
    textAlign: "center",
    margin: 10,
    color: "#fbfbfd",
  },
  actionsContainer: {
    display: "flex",
    gap: 10,
    position: "absolute",
    bottom: 130,
    left: 0,
    right: 0,
    justifyContent: "center",
    flexDirection: "row",
  },
  circleButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  circleButtonImage: {
    width: 30,
    height: 30,
  },
});

export default VideocallInterface;
