import React from 'react';
import Svg, { G, Path } from 'react-native-svg';
const CloseIcon: React.FC<{ color?: string }> = ({ color = '#717402' }) => (
  <Svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
    <G fill={color}>
      <Path d="M7.8 200c-2.1 0-4.1-.8-5.5-2.3-3.1-3.1-3.1-8 0-11.1L186.6 2.3c3.1-3.1 8-3.1 11.1 0 3.1 3.1 3.1 8 0 11.1L13.4 197.7c-1.5 1.5-3.5 2.3-5.6 2.3z" />
      <Path d="M192.2 200c-2.1 0-4.1-.8-5.5-2.3L2.3 13.4c-3.1-3.1-3.1-8 0-11.1 3.1-3.1 8-3.1 11.1 0l184.3 184.3c3.1 3.1 3.1 8 0 11.1-1.5 1.5-3.5 2.3-5.5 2.3z" />
    </G>
  </Svg>
);
export default CloseIcon;
