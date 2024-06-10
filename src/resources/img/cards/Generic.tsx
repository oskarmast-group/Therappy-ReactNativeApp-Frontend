import * as React from "react";
import Svg, { SvgProps, Defs, Path } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: style */
const Generic = (props: SvgProps) => (
  <Svg id="Layer_1" data-name="Layer 1" viewBox="0 0 512 512" {...props}>
    <Defs></Defs>
    <Path
      d="M53.33 85.33h405.34A53.34 53.34 0 0 1 512 138.67v234.66a53.34 53.34 0 0 1-53.33 53.34H53.33A53.34 53.34 0 0 1 0 373.33V138.67a53.34 53.34 0 0 1 53.33-53.34Z"
      style={{
        fill: "#059aad",
      }}
    />
    <Path
      d="M0 149.33h512v85.33H0z"
      style={{
        fill: "#b9b9b9",
      }}
    />
    <Path
      d="M160 320H74.67a10.67 10.67 0 1 1 0-21.33H160a10.67 10.67 0 1 1 0 21.33ZM224 362.67H74.67a10.67 10.67 0 1 1 0-21.34H224a10.67 10.67 0 0 1 0 21.34Z"
      className="cls-3"
    />
  </Svg>
);
export default Generic;
