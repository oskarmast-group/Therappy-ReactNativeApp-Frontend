import * as React from "react";
import Svg, { Path, G } from "react-native-svg";
import { PRIMARY_GREEN } from "../../../src/constant/colors";

const CalendarIcon: React.FC<{ color?: string }> = ({
  color = PRIMARY_GREEN,
}) => (
  <Svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
    <Path fill="none" d="M0 0h200v200H0z" />
    <G fill={color}>
      <Path d="M35.517 18.4h129c14.5 0 26.2 11.8 26.3 26.3v129c0 14.5-11.8 26.2-26.3 26.3h-129c-14.5 0-26.3-11.8-26.3-26.3v-129c0-14.5 11.8-26.2 26.3-26.3zm129 165.9c5.9 0 10.6-4.7 10.6-10.6v-129c0-5.9-4.7-10.6-10.6-10.6h-129c-5.9 0-10.6 4.7-10.6 10.6v129c0 5.9 4.7 10.6 10.6 10.6h129z" />
      <Path d="M136.917 52.5c-4.3 0-7.8-3.5-7.8-7.8V7.8c0-4.3 3.5-7.8 7.8-7.8s7.8 3.5 7.8 7.8v36.9c0 4.3-3.5 7.8-7.8 7.8zM63.117 52.5c-4.3 0-7.8-3.5-7.8-7.8V7.8c0-4.3 3.5-7.8 7.8-7.8s7.8 3.5 7.8 7.8v36.9c.1 4.3-3.5 7.8-7.8 7.8zM182.917 89.4h-165.9c-4.3 0-7.8-3.5-7.8-7.8s3.5-7.8 7.8-7.8h165.9c4.3 0 7.8 3.5 7.8 7.8s-3.4 7.8-7.8 7.8z" />
    </G>
  </Svg>
);
export default CalendarIcon;
