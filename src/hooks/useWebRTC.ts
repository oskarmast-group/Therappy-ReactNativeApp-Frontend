import { useEffect, useRef, useState } from "react";
import {
  mediaDevices,
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  MediaStream,
} from "react-native-webrtc";
import io, { Socket } from "socket.io-client";

const useWebRTC = (roomId?: string) => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const socket = useRef<Socket | null>(null);
  const [callStarted, setCallStarted] = useState(false);
  const [isFront, setIsFront] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState<boolean>(true);
  const [micEnabled, setMicEnabled] = useState<boolean>(true);
  const url = "";
  useEffect(() => {
    socket.current = io(url);

    // socket.current.emit("join", roomId);

    socket.current.on("offer", async (data) => {
      await createAnswer(data.offer);
    });

    socket.current.on("answer", async (data) => {
      await handleRemoteAnswer(data.answer);
    });

    socket.current.on("ice-candidate", async (data) => {
      await handleRemoteIceCandidate(data.candidate);
    });

    const configuration = {
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    };

    const setupWebRTC = async () => {
      try {
        const mediaConstraints = {
          audio: true,
          video: {
            mandatory: {
              minWidth: 500, // Provide your own width, height and frame rate here
              minHeight: 300,
              minFrameRate: 30,
            },
            facingMode: isFront ? "user" : "environment",
          },
        };
        const localStream = await mediaDevices.getUserMedia(mediaConstraints);
        setLocalStream(localStream);

        peerConnection.current = new RTCPeerConnection(configuration);
        localStream.getTracks().forEach((track) => {
          peerConnection.current?.addTrack(track, localStream);
        });

        peerConnection.current.addEventListener("track", (event) => {
          console.log("track");
          if (event.streams && event.streams[0]) {
            setRemoteStream(event.streams[0]);
          }
        });

        peerConnection.current.addEventListener(
          "connectionstatechange",
          (event) => {
            console.log(
              "Connection state:",
              peerConnection.current?.connectionState
            );
            switch (peerConnection.current?.connectionState) {
              case "closed":
                // You can handle the call being disconnected here.

                break;
            }
          }
        );

        peerConnection.current.addEventListener(
          "icecandidateerror",
          (event) => {
            console.log("iceError", event);
            // You can ignore some candidate errors.
            // Connections can still be made even when errors occur.
          }
        );

        peerConnection.current.addEventListener(
          "iceconnectionstatechange",
          (event) => {
            console.log(
              "ICE connection state:",
              peerConnection.current?.iceConnectionState
            );
            switch (peerConnection.current?.iceConnectionState) {
              case "connected":
              case "completed":
                // You can handle the call being connected here.
                // Like setting the video streams to visible.

                break;
            }
          }
        );

        peerConnection.current.addEventListener("icecandidate", (event) => {
          if (event.candidate) {
            socket.current?.emit("ice-candidate", {
              roomId,
              candidate: event.candidate,
            });
          }
        });
      } catch (error) {
        console.error("Failed to get local stream", error);
      }
    };

    setupWebRTC();

    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
      endCall();
      socket.current?.disconnect();
    };
  }, [url, roomId]);

  const endCall = () => {
    if (peerConnection.current) {
      peerConnection.current.close();
    }
    setCallStarted(false);
  };

  const toggleCamera = () => {
    setIsFront(!isFront);
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach((track) => {
        track.enabled = !videoEnabled;
      });
      setVideoEnabled((prev) => !prev);
    }
  };

  const toggleMic = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = !micEnabled;
      });
      setMicEnabled((prev) => !prev);
    }
  };

  const createOffer = async () => {
    if (!peerConnection.current || !roomId) return;
    const offerDescription = await peerConnection.current.createOffer({
      mandatory: {
        OfferToReceiveAudio: true,
        OfferToReceiveVideo: true,
        VoiceActivityDetection: true,
      },
    });
    await peerConnection.current.setLocalDescription(offerDescription);
    setCallStarted(true);
    socket.current?.emit("offer", { roomId, offer: offerDescription });
  };

  const createAnswer = async (offer: RTCSessionDescription) => {
    if (!peerConnection.current || !roomId) return;
    await peerConnection.current.setRemoteDescription(
      new RTCSessionDescription(offer)
    );
    const answerDescription = await peerConnection.current.createAnswer();
    await peerConnection.current.setLocalDescription(answerDescription);
    setCallStarted(true);
    socket.current?.emit("answer", { roomId, answer: answerDescription });
  };

  const handleRemoteAnswer = async (answer: RTCSessionDescription) => {
    if (!peerConnection.current) return;
    await peerConnection.current.setRemoteDescription(
      new RTCSessionDescription(answer)
    );
  };

  const handleRemoteIceCandidate = async (candidate: RTCIceCandidate) => {
    if (!peerConnection.current) return;
    await peerConnection.current.addIceCandidate(
      new RTCIceCandidate(candidate)
    );
  };

  return {
    localStream,
    remoteStream,
    callStarted,
    toggleMic,
    toggleVideo,
    toggleCamera,
    endCall,
    micEnabled,
    videoEnabled,
    createOffer,
    createAnswer,
    handleRemoteAnswer,
    handleRemoteIceCandidate,
  };
};

export default useWebRTC;
