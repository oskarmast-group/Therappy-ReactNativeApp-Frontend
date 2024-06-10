import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { PRIMARY_GREEN } from '../../constants/colors';

const ChevronRightIcon: React.FC<{ color?: string }> = ({ color = PRIMARY_GREEN }) => (
  <Svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
    <Path fill="none" d="M0 0h200v200H0z" />
    <Path
      fill={color}
      d="M64.1 200c-5.3 0-9.7-4.3-9.7-9.7 0-2.6 1-5 2.8-6.8l83.5-83.5-83.5-83.5c-3.8-3.8-3.8-9.9 0-13.7C61-1 67.1-1 70.9 2.8l90.3 90.3c3.8 3.8 3.8 9.9 0 13.7l-90.3 90.3c-1.8 1.9-4.3 2.9-6.8 2.9z"
    />
  </Svg>
);
export default ChevronRightIcon;
