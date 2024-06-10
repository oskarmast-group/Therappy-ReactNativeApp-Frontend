import * as React from 'react';
import Svg, { Path, G } from 'react-native-svg';

const SendMessageIcon = () => (
  <Svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
    <Path fill="none" d="M0 0h200v200H0z" />
    <G fill="#717402">
      <Path d="M90.733 117.034c-4.3 0-7.8-3.5-7.8-7.8 0-2.1.8-4.1 2.3-5.5l101.4-101.4c3.1-3.1 8-3.1 11.1 0 3.1 3.1 3.1 8 0 11.1l-101.4 101.3c-1.5 1.5-3.5 2.3-5.6 2.3z" />
      <Path d="M192.133.034c4.3 0 7.8 3.5 7.8 7.8 0 .9-.1 1.8-.4 2.6l-64.5 184.3c-1.4 4.1-5.9 6.2-10 4.8-2-.7-3.7-2.2-4.6-4.2l-35.6-80.2-80.2-35.6c-4-1.8-5.7-6.4-4-10.3.9-2 2.5-3.5 4.6-4.2l184.3-64.6c.9-.3 1.8-.4 2.6-.4zm-65.4 170.9 52.6-150.3-150.3 52.6 64.9 28.8c1.8.8 3.2 2.2 4 4l28.8 64.9z" />
    </G>
  </Svg>
);
export default SendMessageIcon;
