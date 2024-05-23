import React, { useEffect, useState, useRef } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import {
  RTCIceCandidate,
  RTCPeerConnection,
  RTCSessionDescription,
  mediaDevices,
  MediaStream,
  MediaStreamTrack,
  RTCView,
} from 'react-native-webrtc';

const MyWebRTC: React.FC = () => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);
  const [serverConnected, setServerConnected] = useState(false);
  const serverConnection = useRef<WebSocket | null>(null);
  const localVideoRef = useRef<any>(null);
  const remoteVideoRef = useRef<any>(null);

  useEffect(() => {
    // Initialize the server connection
    serverConnection.current = new WebSocket('wss://my-webrtc-server.com');
    serverConnection.current.onopen = () => {
      setServerConnected(true);
    };

    serverConnection.current.onmessage = handleServerMessage;

    // Set up the local stream
    mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream: MediaStream) => {
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error('Error accessing media devices.', error);
      });

    return () => {
      if (serverConnection.current) {
        serverConnection.current.close();
      }
    };
  }, []);

  const createPeerConnection = () => {
    // Create a new peer connection
    const pc = new RTCPeerConnection();

    // Set up event handlers for the connection
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        serverConnection.current?.send(
          JSON.stringify({
            type: 'candidate',
            candidate: event.candidate,
          }),
        );
      }
    };

    pc.onaddstream = (event) => {
      setRemoteStream(event.stream);
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.stream;
      }
    };

    if (localStream) {
      pc.addStream(localStream);
    }

    setPeerConnection(pc);
  };

  const createOffer = () => {
    peerConnection
      ?.createOffer()
      .then((offer) => {
        return peerConnection.setLocalDescription(offer);
      })
      .then(() => {
        serverConnection.current?.send(
          JSON.stringify({
            type: 'offer',
            offer: peerConnection.localDescription,
          }),
        );
      })
      .catch((error) => {
        console.error('Error creating an offer.', error);
      });
  };

  const handleServerMessage = (message: MessageEvent) => {
    const { type, offer, answer, candidate } = JSON.parse(message.data);

    switch (type) {
      case 'offer':
        if (!peerConnection) {
          createPeerConnection();
        }

        peerConnection
          ?.setRemoteDescription(new RTCSessionDescription(offer))
          .then(() => {
            return peerConnection?.createAnswer();
          })
          .then((answer) => {
            return peerConnection?.setLocalDescription(answer);
          })
          .then(() => {
            serverConnection.current?.send(
              JSON.stringify({
                type: 'answer',
                answer: peerConnection?.localDescription,
              }),
            );
          })
          .catch((error) => {
            console.error('Error handling offer.', error);
          });
        break;

      case 'answer':
        peerConnection?.setRemoteDescription(new RTCSessionDescription(answer)).catch((error) => {
          console.error('Error setting remote description.', error);
        });
        break;

      case 'candidate':
        peerConnection?.addIceCandidate(new RTCIceCandidate(candidate)).catch((error) => {
          console.error('Error adding ICE candidate.', error);
        });
        break;

      default:
        console.warn('Unknown message type:', type);
        break;
    }
  };

  return (
    <View style={styles.container}>
      {serverConnected && <Button title="Create Offer" onPress={createOffer} />}
      <View style={styles.videoContainer}>
        <RTCView ref={localVideoRef} streamURL={localStream ? localStream.toURL() : ''} style={styles.video} />
        <RTCView ref={remoteVideoRef} streamURL={remoteStream ? remoteStream.toURL() : ''} style={styles.video} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: 200,
    height: 200,
    backgroundColor: 'black',
    margin: 5,
  },
});

export default MyWebRTC;
