import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const VideocallIcon: React.FC<{ color?: string }> = ({ color = '#fff' }) => (
  <Svg preserveAspectRatio="xMidYMid slice" viewBox="0 0 26.028 17.29">
    <G
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      data-name="Icon feather-video"
    >
      <Path d="m25.027 3.184-7.645 5.461 7.645 5.461Z" data-name="Path 16" />
      <Path
        d="M3.184 1H15.2a2.184 2.184 0 0 1 2.184 2.184v10.922A2.184 2.184 0 0 1 15.2 16.29H3.184A2.184 2.184 0 0 1 1 14.106V3.184A2.184 2.184 0 0 1 3.184 1Z"
        data-name="Path 17"
      />
    </G>
  </Svg>
);
export default VideocallIcon;
