import React from "react";
import { View, StyleSheet } from "react-native";
import TopBar from "../../../../components/TopBar";
import { RTCView } from "react-native-webrtc";
import CircleActionButton, {
  CircleActionButton2,
} from "../Call/components/CircleActionButton";
import MainContainer from "../../../../components/containers/MainContainer";
import useWebRTC from "../../../../hooks/useWebRTC";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const TestVideo: React.FC = () => {
  const { localStream, videoEnabled, toggleVideo, micEnabled, toggleMic } =
    useWebRTC();

  return (
    <MainContainer withSideMenu={false} withBottomNavigation={false}>
      <TopBar title="Pruebas Técnicas" />
      <View style={styles.videoContainer}>
        {localStream && (
          <RTCView
            streamURL={localStream.toURL()}
            style={styles.video}
            objectFit="cover"
            mirror
          />
        )}
        <View style={styles.controls}>
          <CircleActionButton2
            onClick={toggleMic}
            style={styles.button}
            src={
              micEnabled ? (
                <FontAwesome5 name="microphone" size={18} color="white" />
              ) : (
                <FontAwesome5 name="microphone-slash" size={18} color="white" />
              )
            }
          />
          <CircleActionButton2
            onClick={toggleVideo}
            style={styles.button}
            src={
              videoEnabled ? (
                <FontAwesome name="video-camera" size={18} color="white" />
              ) : (
                <FontAwesome5 name="video-slash" size={18} color="white" />
              )
            }
          />
        </View>
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  controls: {
    position: "absolute",
    right: 0,
    bottom: 0,
    flexDirection: "row",
    gap: 10,
    padding: 10,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default TestVideo;
