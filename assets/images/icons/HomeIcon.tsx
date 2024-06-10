import * as React from "react";
import Svg, { Path, G } from "react-native-svg";
import { PRIMARY_GREEN } from "../../../src/constant/colors";

const HomeIcon: React.FC<{ color?: string }> = ({ color = PRIMARY_GREEN }) => (
  <Svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
    <Path fill="none" d="M0 0h200v200H0z" />
    <G fill={color}>
      <Path d="M100.017.033c1.7 0 3.4.6 4.8 1.6l82.9 64.5c1.9 1.5 3 3.8 3 6.2v101.4c0 14.5-11.8 26.2-26.3 26.3h-129c-14.5 0-26.2-11.8-26.3-26.3v-101.4c0-2.4 1.1-4.7 3-6.2l82.9-64.5c1.5-1.1 3.2-1.6 5-1.6zm75.1 76.1-75.1-58.4-75.1 58.4v97.6c0 5.9 4.7 10.6 10.6 10.6h129c5.9 0 10.6-4.7 10.6-10.6v-97.6z" />
      <Path d="M127.617 200.033c-4.3 0-7.8-3.5-7.8-7.8v-84.4h-39.6v84.3c0 4.3-3.5 7.8-7.8 7.8s-7.8-3.5-7.8-7.8v-92.2c0-4.3 3.5-7.8 7.8-7.8h55.3c4.3 0 7.8 3.5 7.8 7.8v92.2c0 4.4-3.5 7.9-7.9 7.9z" />
    </G>
  </Svg>
);
export default HomeIcon;
