import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const FileUploadIcon = () => (
  <Svg preserveAspectRatio="xMidYMid slice">
    <Path
      fill="#717402"
      d="M20.75 9.563V0H6.688A1.683 1.683 0 0 0 5 1.688v32.625A1.683 1.683 0 0 0 6.688 36h23.625A1.683 1.683 0 0 0 32 34.313V11.25h-9.562a1.692 1.692 0 0 1-1.688-1.687Zm4.583 15.188H20.75v5.625a1.125 1.125 0 0 1-1.125 1.124h-2.25a1.125 1.125 0 0 1-1.125-1.125v-5.624h-4.583a1.125 1.125 0 0 1-.792-1.924l6.78-6.729a1.2 1.2 0 0 1 1.69 0l6.78 6.729a1.125 1.125 0 0 1-.792 1.924Zm6.175-17.368L24.624.492A1.686 1.686 0 0 0 23.429 0H23v9h9v-.429a1.682 1.682 0 0 0-.492-1.188Z"
    />
    <Path fill="none" d="M0 0h36v36H0z" />
  </Svg>
);
export default FileUploadIcon;
