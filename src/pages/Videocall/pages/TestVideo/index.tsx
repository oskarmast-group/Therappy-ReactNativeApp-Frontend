import React, {useMemo} from 'react';
import MainContainer from '../../../../containers/MainContainer';
import TopBar from '../../../../components/TopBar';
import {View} from 'react-native';
import CircleActionButton from '../../component/CircleActionButton';
import MicOnIcon from '../../../../resources/img/icons/call/MicOnIcon';
import MicOffIcon from '../../../../resources/img/icons/call/MicOffIcon';
import CamOnIcon from '../../../../resources/img/icons/call/CamOnIcon';
import CamOffIcon from '../../../../resources/img/icons/call/CamOffIcon';
import RefreshIcon from '../../../../resources/img/icons/call/RefreshIcon';
import videoStyles from '../styles';
import {DailyMediaView} from '@daily-co/react-native-daily-js';
import {useVideocall} from '../VideocallProvider';
import VideoContainer from '../../containers/VideoContainer';

const TestVideo: React.FC = () => {
  const {
    localParticipant,
    usingFrontCamera,
    switchCamera,
    isCameraMuted,
    isMicMuted,
    toggleCamera,
    toggleMic,
  } = useVideocall();

  const videoTrack = useMemo(() => {
    return localParticipant?.tracks.video.track;
  }, [localParticipant]);

  const audioTrack = useMemo(() => {
    return localParticipant?.tracks.audio.track;
  }, [localParticipant]);

  const [, videoHeight] = useMemo(() => {
    if (!videoTrack) {
      return [null, null];
    }

    const constraints = videoTrack.getConstraints() as {
      width?: number;
      height?: number;
    };

    return [constraints.width ?? null, constraints.height ?? null];
  }, [videoTrack]);

  return (
    <MainContainer>
      <TopBar title={'Pruebas Técnicas'} />
      <VideoContainer height={videoHeight}>
        {(videoTrack || audioTrack) && (
          <DailyMediaView
            videoTrack={videoTrack ?? null}
            audioTrack={audioTrack ?? null}
            objectFit={'contain'}
            zOrder={0}
            style={videoStyles.stream}
            mirror={usingFrontCamera}
          />
        )}
        <View style={videoStyles.controlsContainer}>
          <CircleActionButton onPress={switchCamera}>
            <RefreshIcon color={'white'} />
          </CircleActionButton>
          <CircleActionButton onPress={toggleMic}>
            {isMicMuted ? <MicOffIcon /> : <MicOnIcon />}
          </CircleActionButton>
          <CircleActionButton onPress={toggleCamera}>
            {isCameraMuted ? <CamOffIcon /> : <CamOnIcon />}
          </CircleActionButton>
        </View>
      </VideoContainer>
    </MainContainer>
  );
};

export default TestVideo;
