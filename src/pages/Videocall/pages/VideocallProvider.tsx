import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
  useCallback,
  useMemo,
} from 'react';
import Daily, {
  DailyCall,
  DailyEvent,
  DailyParticipant,
  MediaStreamTrack,
} from '@daily-co/react-native-daily-js';
import {Orientation, useOrientation} from '../../../hooks/useOrientation';
import {useNavigate} from 'react-router-native';

interface VideoDimensions {
  width: number | null;
  height: number | null;
}

export enum AppState {
  Idle,
  Lobby,
  Joining,
  Joined,
  Leaving,
  Error,
}

const meetingEvents: DailyEvent[] = ['joined-meeting', 'left-meeting', 'error'];
const participantEvents: DailyEvent[] = [
  'participant-updated',
  'participant-joined',
  'participant-left',
];

interface VideocallContextType {
  appState: AppState;
  callObject: DailyCall | null;
  joinCall: (meetingURL: string, meetingToken: string) => void;
  leaveCall: () => void;
  orientation: Orientation;
  localParticipant: DailyParticipant | null;
  usingFrontCamera: boolean;
  switchCamera: () => void;
  isCameraMuted: boolean;
  toggleCamera: () => void;
  isMicMuted: boolean;
  toggleMic: () => void;
  remoteParticipants: DailyParticipant[];
  videoTrack: MediaStreamTrack | null;
  audioTrack: MediaStreamTrack | null;
  videoDimmensions: VideoDimensions;
}

function getStreamStates(callObject: DailyCall) {
  let isCameraMuted = false,
    isMicMuted = false;
  if (callObject && callObject.participants()) {
    console.log('exists');
    isCameraMuted = !callObject.localVideo();
    isMicMuted = !callObject.localAudio();
  }
  return [isCameraMuted, isMicMuted];
}

const VideocallContext = createContext<VideocallContextType>({
  appState: AppState.Idle,
  callObject: null,
  joinCall: () => {},
  leaveCall: () => {},
  orientation: Orientation.Portrait,
  localParticipant: null,
  usingFrontCamera: true,
  switchCamera: () => {},
  isCameraMuted: false,
  toggleCamera: () => {},
  isMicMuted: false,
  toggleMic: () => {},
  remoteParticipants: [],
  videoTrack: null,
  audioTrack: null,
  videoDimmensions: {width: null, height: null},
});

const VideocallProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [appState, setAppState] = useState<AppState>(AppState.Idle);
  const [callObject, setCallObject] = useState<DailyCall | null>(null);
  const orientation = useOrientation();
  const [usingFrontCamera, setUsingFrontCamera] = useState(true);
  const [isCameraMuted, setCameraMuted] = useState(false);
  const [isMicMuted, setMicMuted] = useState(false);
  const [localParticipant, setLocalParticipant] =
    useState<DailyParticipant | null>(null);
  const [remoteParticipants, setRemoteParticipants] = useState<
    DailyParticipant[]
  >([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize the Daily call object
    const dailyCallObject = Daily.createCallObject();
    setCallObject(dailyCallObject);

    return () => {
      // Cleanup the call object on component unmount
      if (!dailyCallObject.isDestroyed()) {
        dailyCallObject.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (!callObject) {
      return;
    }

    function handleNewMeetingState() {
      // console.log(event);
      console.log('handleNewMeetingState', callObject?.meetingState());
      switch (callObject?.meetingState()) {
        case 'joined-meeting':
          setAppState(AppState.Joined);
          break;
        case 'left-meeting':
          callObject?.destroy().then(() => {
            setCallObject(null);
            setAppState(AppState.Idle);
            navigate(-1);
          });
          break;
        case 'error':
          setAppState(AppState.Error);
          break;
        default:
          break;
      }
    }

    for (const event of meetingEvents) {
      callObject.on(event, handleNewMeetingState);
    }

    function handleParticipantEvent() {
      // console.log(event);
      console.log('handleParticipantUpdated');
      if (callObject) {
        const [cameraMuted, micMuted] = getStreamStates(callObject);
        setCameraMuted(cameraMuted);
        setMicMuted(micMuted);
        setLocalParticipant(callObject.participants().local ?? null);
        const participants: DailyParticipant[] = [];
        for (const [id, participant] of Object.entries(
          callObject.participants(),
        )) {
          if (id === 'local' || id.endsWith('-screen')) {
            continue;
          }
          participants.push(participant);
        }
        setRemoteParticipants(participants);
      }
    }

    for (const event of participantEvents) {
      callObject.on(event, handleParticipantEvent);
    }

    callObject.startCamera().catch(_ => {});
    callObject?.getCameraFacingMode().then(facingMode => {
      setUsingFrontCamera(facingMode === 'user');
    });
    setAppState(AppState.Lobby);

    return function cleanup() {
      for (const event of meetingEvents) {
        callObject.off(event, handleNewMeetingState);
      }
      for (const event of participantEvents) {
        callObject.off(event, handleParticipantEvent);
      }
    };
  }, [callObject, navigate]);

  const joinCall = useCallback(
    (meetingURL: string, meetingToken: string) => {
      if (!callObject) {
        return;
      }
      callObject.join({url: meetingURL, token: meetingToken}).catch(_ => {});
      setAppState(AppState.Joining);
    },
    [callObject],
  );

  const leaveCall = useCallback(() => {
    if (!callObject) {
      return;
    }
    if (appState === AppState.Error) {
      callObject.destroy().then(() => {
        setCallObject(null);
        setAppState(AppState.Idle);
      });
    } else {
      setAppState(AppState.Leaving);
      callObject.leave();
    }
  }, [callObject, appState]);

  const switchCamera = useCallback(async () => {
    if (!callObject) {
      return;
    }
    const {device} = await callObject.cycleCamera();
    if (device) {
      setUsingFrontCamera(device.facingMode === 'user');
    }
  }, [callObject]);

  const toggleCamera = useCallback(() => {
    callObject?.setLocalVideo(isCameraMuted);
  }, [callObject, isCameraMuted]);

  const toggleMic = useCallback(() => {
    callObject?.setLocalAudio(isMicMuted);
  }, [callObject, isMicMuted]);

  const videoTrack = useMemo(() => {
    return localParticipant?.tracks.video.track ?? null;
  }, [localParticipant]);

  const audioTrack = useMemo(() => {
    return localParticipant?.tracks.audio.track ?? null;
  }, [localParticipant]);

  const videoDimmensions = useMemo<VideoDimensions>(() => {
    console.log(orientation);
    if (!videoTrack) {
      return {width: null, height: null};
    }

    const constraints = videoTrack.getConstraints() as {
      width?: number;
      height?: number;
    };

    return orientation === Orientation.Portrait
      ? {
          width: constraints.width ?? null,
          height: constraints.height ?? null,
        }
      : {
          width: constraints.height ?? null,
          height: constraints.width ?? null,
        };
  }, [videoTrack, orientation]);

  return (
    <VideocallContext.Provider
      value={{
        appState,
        callObject,
        joinCall,
        leaveCall,
        orientation,
        localParticipant,
        usingFrontCamera,
        switchCamera,
        isCameraMuted,
        toggleCamera,
        isMicMuted,
        toggleMic,
        remoteParticipants,
        videoTrack,
        audioTrack,
        videoDimmensions,
      }}>
      {children}
    </VideocallContext.Provider>
  );
};

// Custom hook to use the videocall context
const useVideocall = (): VideocallContextType => {
  const context = useContext(VideocallContext);
  if (context === undefined) {
    throw new Error('useVideocall must be used within a VideocallProvider');
  }
  return context;
};

// Export the provider and the custom hook
export {VideocallProvider, useVideocall};
