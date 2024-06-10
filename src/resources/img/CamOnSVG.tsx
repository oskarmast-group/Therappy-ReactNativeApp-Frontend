import * as React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";
const CamOnSVG = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={184} height={188} {...props}>
    <G data-name="Group 128">
      <Path
        fill="#fff"
        d="M105.617 38h-82.88A13.736 13.736 0 0 0 9 51.737v82.88a13.736 13.736 0 0 0 13.737 13.737h82.88a13.736 13.736 0 0 0 13.737-13.737v-82.88A13.736 13.736 0 0 0 105.617 38Zm54.429 10.834-31.5 21.726v45.233l31.5 21.7a9.215 9.215 0 0 0 14.484-7.414v-73.83c0-7.3-8.363-11.611-14.484-7.415Z"
        data-name="Icon awesome-video"
      />
      <Path fill="none" d="M0 0h184v188H0z" data-name="Rectangle 59" />
    </G>
  </Svg>
);
export default CamOnSVG;
