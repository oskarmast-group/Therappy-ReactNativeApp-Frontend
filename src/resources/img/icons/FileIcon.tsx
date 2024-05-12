import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const FileIcon = () => (
  <Svg preserveAspectRatio="xMidYMid slice">
    <Path
      fill="#717402"
      d="M20.75 9.563V0H6.688A1.683 1.683 0 0 0 5 1.688v32.625A1.683 1.683 0 0 0 6.688 36h23.625A1.683 1.683 0 0 0 32 34.313V11.25h-9.562a1.692 1.692 0 0 1-1.688-1.687ZM32 8.571V9h-9V0h.429a1.686 1.686 0 0 1 1.2.492l6.884 6.891A1.682 1.682 0 0 1 32 8.571Z"
      data-name="Icon awesome-file"
    />
    <Path fill="none" d="M0 0h36v36H0z" data-name="Rectangle 66" />
  </Svg>
);
export default FileIcon;
