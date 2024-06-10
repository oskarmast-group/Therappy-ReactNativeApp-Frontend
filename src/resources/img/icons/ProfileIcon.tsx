import * as React from 'react';
import { Circle, G, Path, Svg } from 'react-native-svg';
const ProfileIcon = () => (
  <Svg viewBox="0 0 201 201" preserveAspectRatio="xMidYMid slice">
    <Path fill="none" d="M0 0h200v200H0z" data-name="RectanGle 75" />
    <G fill="#717402" data-name="Icon feather-user">
      <Path
        d="M161.871 175.521a5.916 5.916 0 0 1-5.916-5.916v-15.468a25.047 25.047 0 0 0-25.019-25.019H69.065a25.019 25.019 0 0 0-25.019 25.019v15.468a5.917 5.917 0 1 1-11.833 0v-15.468a36.852 36.852 0 0 1 36.852-36.852h61.871a36.894 36.894 0 0 1 36.852 36.852v15.468a5.916 5.916 0 0 1-5.917 5.916Z"
        data-name="Path 115"
      />
      <Path
        d="M100 24.479a36.852 36.852 0 1 1-36.852 36.852A36.894 36.894 0 0 1 100 24.479Zm0 61.871a25.019 25.019 0 1 0-25.019-25.019A25.047 25.047 0 0 0 100 86.35Z"
        data-name="Path 116"
      />
    </G>
    <G fill="none" stroke="#717402" strokeWidth={10} data-name="Ellipse 32">
      <Circle cx={100.5} cy={100.5} r={100.5} stroke="none" />
      <Circle cx={100.5} cy={100.5} r={95.5} />
    </G>
  </Svg>
);
export default ProfileIcon;
