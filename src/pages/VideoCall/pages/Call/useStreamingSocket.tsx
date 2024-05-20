import { useEffect, useState } from 'react';
import { getToken } from '../../../../resources/api/auth';
import { API } from '../../../../resources/constants/urls';
import socketIOClient from 'socket.io-client';
import Webrtc from './webrtc';
import { MediaStream } from 'react-native-webrtc';

const pcConfig: object = {
  iceServers: [
    {
      urls: [
        'stun:stun.l.google.com:19302',
        'stun:stun1.l.google.com:19302',
        'stun:stun2.l.google.com:19302',
        'stun:stun3.l.google.com:19302',
        'stun:stun4.l.google.com:19302',
      ],
    },
    {
      urls: 'turn:numb.viagenie.ca',
      credential: 'muazkh',
      username: 'webrtc@live.com',
    },
    {
      urls: 'turn:numb.viagenie.ca',
      credential: 'muazkh',
      username: 'webrtc@live.com',
    },
    {
      urls: 'turn:192.158.29.39:3478?transport=udp',
      credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
      username: '28224511:1379330808',
    },
  ],
};

export const useStreamingSocket = (roomId: string, localStream: MediaStream) => {
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [webrtc, setWebrtc] = useState<Webrtc | null>(null);
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);

  useEffect(() => {
    const newSocket = socketIOClient(API.BASE_URL, {
      auth: {
        token: getToken(),
      },
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    const webrtcInstance = new Webrtc(socket, localStream, pcConfig, {
      log: true,
      warn: true,
      error: true,
    });

    webrtcInstance.addEventListener('createdRoom', () => {
      webrtcInstance.gotStream();
    });

    webrtcInstance.addEventListener('joinedRoom', () => {
      webrtcInstance.gotStream();
    });

    webrtcInstance.addEventListener('newUser', (e: CustomEvent) => {
      const stream = e.detail.stream as MediaStream;
      setRemoteStream(stream);
    });

    webrtcInstance.addEventListener('removeUser', () => {
      setRemoteStream(null);
    });

    setWebrtc(webrtcInstance);

    return () => {
      webrtcInstance.removeEventListener('createdRoom');
      webrtcInstance.removeEventListener('joinedRoom');
      webrtcInstance.removeEventListener('newUser');
      webrtcInstance.removeEventListener('removeUser');
    };
  }, [socket, localStream]);

  useEffect(() => {
    if (!socket || !localStream || !webrtc) return;
    webrtc.joinRoom(roomId);
  }, [socket, webrtc, localStream, roomId]);

  const leaveCall = () => {
    if (socket && webrtc && webrtc.roomId) {
      socket.emit('leave room', webrtc.roomId);
    }
  };

  return { leaveCall, remoteStream };
};
