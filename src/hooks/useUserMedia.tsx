import { useState, useEffect } from 'react';
import { mediaDevices, MediaStream, MediaStreamTrack } from 'react-native-webrtc';

const DEFAULT_CAPTURE_OPTIONS = {
  audio: true,
  video: true,
};

export const DEVICES_TYPES = {
  AUDIO_INPUT: 'audioinput',
  AUDIO_OUTPUT: 'audiooutput',
  VIDEO_INPUT: 'videoinput',
};

interface DeviceInfo {
  deviceId: string;
  kind: string;
  label: string;
}

const DEFAULT_SELECTED_DEVICES: Record<string, string> = {
  [DEVICES_TYPES.AUDIO_INPUT]: '',
  [DEVICES_TYPES.AUDIO_OUTPUT]: '',
  [DEVICES_TYPES.VIDEO_INPUT]: '',
};

const DEFAULT_DEVICES_LIST: Record<string, DeviceInfo[]> = {
  [DEVICES_TYPES.AUDIO_INPUT]: [],
  [DEVICES_TYPES.AUDIO_OUTPUT]: [],
  [DEVICES_TYPES.VIDEO_INPUT]: [],
};

export function useUserMedia() {
  const [options, setOptions] = useState<Object>(DEFAULT_CAPTURE_OPTIONS);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [devices, setDevices] = useState<Record<string, DeviceInfo[]>>({ ...DEFAULT_DEVICES_LIST });
  const [selectedDevices, setSelectedDevices] = useState<Record<string, string>>({ ...DEFAULT_SELECTED_DEVICES });
  const [micEnabled, setMicEnabled] = useState<boolean>(true);
  const [videoEnabled, setVideoEnabled] = useState<boolean>(true);

  async function initDevices() {
    const devices = await detectDevices();
    if (!devices) return;
    const { audioInputs, audioOutputs, videoInputs } = devices;
    setSelectedDevices({
      [DEVICES_TYPES.AUDIO_INPUT]: audioInputs.length === 0 ? '' : audioInputs[0].deviceId,
      [DEVICES_TYPES.AUDIO_OUTPUT]: audioOutputs.length === 0 ? '' : audioOutputs[0].deviceId,
      [DEVICES_TYPES.VIDEO_INPUT]: videoInputs.length === 0 ? '' : videoInputs[0].deviceId,
    });
  }

  async function detectDevices(): Promise<{
    audioInputs: DeviceInfo[];
    audioOutputs: DeviceInfo[];
    videoInputs: DeviceInfo[];
  } | null> {
    try {
      const devices = await mediaDevices.enumerateDevices();
      console.log(devices);

      const audioInputs = filterByType(devices, DEVICES_TYPES.AUDIO_INPUT);
      const audioOutputs = filterByType(devices, DEVICES_TYPES.AUDIO_OUTPUT);
      const videoInputs = filterByType(devices, DEVICES_TYPES.VIDEO_INPUT);

      setDevices({
        [DEVICES_TYPES.AUDIO_INPUT]: audioInputs,
        [DEVICES_TYPES.AUDIO_OUTPUT]: audioOutputs,
        [DEVICES_TYPES.VIDEO_INPUT]: videoInputs,
      });

      return { audioInputs, audioOutputs, videoInputs };
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  useEffect(() => {
    initDevices();
  }, []);

  const refreshDevicesList = () => {
    detectDevices();
  };

  useEffect(() => {
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, [mediaStream]);

  useEffect(() => {
    async function enableStream() {
      try {
        const stream = await mediaDevices.getUserMedia(options);
        setMediaStream(stream);
      } catch (e) {
        console.error(e);
      }
    }

    enableStream();
  }, [options]);

  const changeSelectedDevice = (type: string, deviceId: string) => {
    setSelectedDevices({
      ...selectedDevices,
      [type]: deviceId,
    });
  };

  useEffect(() => {
    const videoId = selectedDevices[DEVICES_TYPES.VIDEO_INPUT];
    const audioId = selectedDevices[DEVICES_TYPES.AUDIO_INPUT];
    setOptions({
      video: videoId ? { deviceId: { exact: videoId } } : undefined,
      audio: audioId ? { deviceId: { exact: audioId } } : undefined,
    });
  }, [selectedDevices]);

  const toggleMic = () => {
    if (mediaStream) {
      mediaStream.getAudioTracks().forEach((track: MediaStreamTrack) => {
        track.enabled = !micEnabled;
      });
      setMicEnabled(!micEnabled);
    }
  };

  const toggleVideo = () => {
    if (mediaStream) {
      mediaStream.getVideoTracks().forEach((track: MediaStreamTrack) => {
        track.enabled = !videoEnabled;
      });
      setVideoEnabled(!videoEnabled);
    }
  };

  return {
    mediaStream,
    devices,
    selectedDevices,
    changeSelectedDevice,
    videoEnabled,
    toggleVideo,
    micEnabled,
    toggleMic,
  };
}

const filterByType = (devices: MediaDeviceInfo[], type: string): DeviceInfo[] =>
  devices.filter(({ kind }) => kind === type) as DeviceInfo[];
