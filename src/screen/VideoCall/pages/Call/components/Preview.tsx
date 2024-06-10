/* eslint-disable react-native/no-inline-styles */
// Preview.tsx
import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { GREEN } from "../../../../../resources/constants/colors";
import { IMAGES_URL } from "../../../../../resources/constants/urls";
import { capitalize } from "../../../../../utils/text";
import { dateFormat } from "../../../../../utils/date";
import { getDisplayTime } from "../../../../../utils/time";
import { addMinutes } from "date-fns";
import Button from "../../../../../components/Button";
import CircleActionButton, { CircleActionButton2 } from "./CircleActionButton";
import TopBar from "../../../../../components/TopBar";
import { MediaStream, RTCView } from "react-native-webrtc";
import Loading from "../../../../../components/Loading";
import Appointment from "../../../../../interfaces/Appointment";
import MainContainer from "../../../../../components/containers/MainContainer";
import MicOnSVG from "../../../../../resources/img/MicOnSVG";
import MicOffSVG from "../../../../../resources/img/MicOffSVG";
import CamOnSVG from "../../../../../resources/img/CamOnSVG";
import CamOffSVG from "../../../../../resources/img/CamOffSVG";
import NoProfileSVG from "../../../../../resources/img/NoProfileSVG";
import VideoContainer from "../../../containers/VideoContainer";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const Preview: React.FC<{
  appointment: Appointment;
  startCall: () => void;
  localStream: MediaStream | null;
  toggleMic: () => void;
  toggleVideo: () => void;
  videoEnabled: boolean;
  micEnabled: boolean;
}> = ({
  appointment,
  startCall,
  localStream,
  videoEnabled,
  toggleVideo,
  micEnabled,
  toggleMic,
}) => {
  return (
    <MainContainer withSideMenu={false} withBottomNavigation={false}>
      <TopBar title={"Videollamada"} />
      <View style={styles.profileContainer}>
        <View style={styles.profileImageContainer}>
          <Image
            style={{ width: "100%", height: "100%" }}
            source={
              appointment?.profileImg
                ? {
                    uri: `${IMAGES_URL}${appointment?.profileImg}`,
                  }
                : (NoProfileSVG as any)
            }
          />
        </View>
      </View>
      {appointment.name && appointment.lastName && (
        <Text style={{ textAlign: "center", margin: 10 }}>
          {`${appointment.title ?? ""} ${appointment.name} ${
            appointment.lastName
          }`}
        </Text>
      )}
      {appointment.date && (
        <Text style={{ textAlign: "center" }}>
          {capitalize(dateFormat(appointment.date, "EEEE - LLLL d, uuuu"))}
        </Text>
      )}
      {appointment.date && (
        <Text style={{ textAlign: "center", marginBottom: 15 }}>
          {getDisplayTime(appointment.date)} -{" "}
          {getDisplayTime(addMinutes(new Date(appointment.date), 50))}
        </Text>
      )}
      <VideoContainer>
        {!localStream ? (
          <Loading />
        ) : (
          <RTCView
            streamURL={localStream.toURL()}
            style={{ width: "100%", height: "100%" }}
            objectFit="contain"
            mirror
          />
        )}

        <View style={styles.actionButtons}>
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
        </View>
      </VideoContainer>

      <Button onPress={startCall} style={{ marginTop: 10 }} disabled={false}>
        <Text>Unirse a llamada</Text>
      </Button>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  actionButtons: {
    position: "absolute",
    right: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    padding: 10,
  },
  profileContainer: {
    width: "100%",
    justifyContent: "center",
    marginTop: 50,
    alignItems: "center",
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    borderColor: GREEN,
    borderWidth: 2,
  },
});

export default Preview;
