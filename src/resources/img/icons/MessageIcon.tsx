import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { PRIMARY_GREEN } from '../../constants/colors';

const MessageIcon: React.FC<{ color?: string }> = ({ color = PRIMARY_GREEN }) => (
  <Svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
    <Path fill="none" d="M0 0h200v200H0z" />
    <Path
      fill={color}
      d="M104.9 0h5.3c48.4 2.4 87.1 41 89.7 89.3v5.6c0 52.4-42.4 94.9-94.8 94.9-13.6 0-27.1-2.9-39.5-8.6l-55.4 18.5c-4.1 1.4-8.5-.8-9.9-4.9-.5-1.6-.5-3.4 0-5l18.5-55.4C-3 86.7 18 30.4 65.7 8.6 78.1 3 91.4 0 104.9 0zm0 174.1c43.8.1 79.4-35.4 79.5-79.2v-5.1c-2.4-40.1-34.4-72-74.5-74.1H105c-43.7.1-79.1 35.6-79 79.3 0 12.2 2.9 24.3 8.4 35.3.9 1.9 1.1 4 .4 6l-14.5 43.5 43.5-14.5c2-.7 4.1-.5 6 .4 10.8 5.5 22.9 8.4 35.1 8.4z"
    />
  </Svg>
);
export default MessageIcon;
