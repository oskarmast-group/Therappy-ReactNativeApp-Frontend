import styled from 'styled-components/native';

const VideoContainer = styled.View<{height: number | null; maxHeight?: string}>`
  position: relative;
  min-height: 200px;
  width: 100%;
  height: ${({height}) => height ?? 'auto'};
  max-height: ${({maxHeight}) => maxHeight ?? '550px'};
  background-color: #1d1d1f;
  margin-bottom: 20px;
`;

export default VideoContainer;
