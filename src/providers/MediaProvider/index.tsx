import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
  useCallback,
} from 'react';
import {MediaStream, mediaDevices} from 'react-native-webrtc';
import {DEVICES_TYPES, DeviceInfo, DevicesList} from './types';
import {DEFAULT_DEVICES_LIST} from './defaults';

type MediaContextType = {
  mediaStream: MediaStream | null;
  devices: DevicesList;
  toggleVideo: () => void;
  toggleMic: () => void;
  switchCamera: () => void;
  micEnabled?: boolean;
  videoEnabled?: boolean;
  isFrontCamera?: boolean;
};

const MediaContext = createContext<MediaContextType>({
  mediaStream: null,
  devices: DEFAULT_DEVICES_LIST,
  toggleVideo: () => {},
  toggleMic: () => {},
  switchCamera: () => {},
  micEnabled: true,
  videoEnabled: true,
  isFrontCamera: true,
});

export const MediaProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [isFrontCamera, setIsFrontCamera] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);
  const [devices, setDevices] = useState<DevicesList>({
    ...DEFAULT_DEVICES_LIST,
  });

  useEffect(() => {
    const initStream = async () => {
      const sources = (await mediaDevices.enumerateDevices()) as DeviceInfo[];
      const videoSource = sources.find(
        device =>
          device.kind === 'videoinput' &&
          (device.facing === 'front' || device.facing === 'user'),
      );
      const constraints = {
        audio: true,
        video: videoSource
          ? {deviceId: videoSource.deviceId, facingMode: videoSource.facing}
          : true,
      };
      const stream = await mediaDevices.getUserMedia(constraints);
      setMediaStream(stream);
      setDevices({
        [DEVICES_TYPES.AUDIO_INPUT]: filterByType(
          sources,
          DEVICES_TYPES.AUDIO_INPUT,
        ),
        [DEVICES_TYPES.AUDIO_OUTPUT]: filterByType(
          sources,
          DEVICES_TYPES.AUDIO_OUTPUT,
        ),
        [DEVICES_TYPES.VIDEO_INPUT]: filterByType(
          sources,
          DEVICES_TYPES.VIDEO_INPUT,
        ),
      });
    };

    initStream();

    return () => {
      console.log('unmount', mediaStream);
      mediaStream?.getTracks().forEach(track => track.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleVideo = useCallback(() => {
    if (!mediaStream) {
      return;
    }
    mediaStream.getVideoTracks().forEach(track => {
      track.enabled = !videoEnabled;
    });
    setVideoEnabled(!videoEnabled);
  }, [mediaStream, videoEnabled]);

  const toggleMic = useCallback(() => {
    if (!mediaStream) {
      return;
    }
    mediaStream.getAudioTracks().forEach(track => {
      track.enabled = !micEnabled;
    });
    setMicEnabled(!micEnabled);
  }, [mediaStream, micEnabled]);

  const switchCamera = useCallback(async () => {
    const videoTrack = mediaStream?.getVideoTracks()[0];
    if (videoTrack) {
      const currentPosition = (
        videoTrack.getConstraints() as {
          facingMode: 'user' | 'environment' | 'front';
        }
      ).facingMode;
      const newFacing =
        currentPosition === 'user' ? ['environment'] : ['user', 'front'];
      const sources = (await mediaDevices.enumerateDevices()) as DeviceInfo[];
      const newSource = sources.find(
        device =>
          device.kind === 'videoinput' && newFacing.includes(device.facing),
      );
      if (newSource && mediaStream) {
        const newStream = await mediaDevices.getUserMedia({
          video: {deviceId: newSource.deviceId, facingMode: newSource.facing},
        });
        const newVideoTrack = newStream.getVideoTracks()[0];
        videoTrack.stop();
        mediaStream.removeTrack(videoTrack);
        mediaStream.addTrack(newVideoTrack);
        console.log(mediaStream.getVideoTracks());
        newStream.removeTrack(newVideoTrack);
        const newSourceConstraints = newVideoTrack.getConstraints() as {
          facingMode: 'user' | 'environment' | 'front';
        };
        setIsFrontCamera(
          newSourceConstraints.facingMode === 'user' ||
            newSourceConstraints.facingMode === 'front',
        );
      }
    }
  }, [mediaStream]);

  return (
    <MediaContext.Provider
      value={{
        mediaStream,
        toggleVideo,
        toggleMic,
        switchCamera,
        devices,
        micEnabled,
        videoEnabled,
        isFrontCamera,
      }}>
      {children}
    </MediaContext.Provider>
  );
};

export const useMedia = () => {
  const context = useContext(MediaContext);
  if (!context) {
    throw new Error('useMedia must be used within a MediaProvider');
  }
  return context;
};

const filterByType = (devices: DeviceInfo[], type: DEVICES_TYPES) =>
  devices.filter(({kind}) => kind === type);
