import * as React from "react";
import Svg, { SvgProps, G, Path } from "react-native-svg";
const Trash = (props: SvgProps) => (
  <Svg width={36} height={36} {...props}>
    <G fill="none" data-name="Group 131">
      <Path d="M0 0h36v36H0z" data-name="Rectangle 63" />
      <G
        stroke="#cf142b"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        data-name="Icon feather-trash-2"
      >
        <Path d="M4.5 9h27" data-name="Path 99" />
        <Path
          d="M28.5 9v21a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9M12 9V6a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v3"
          data-name="Path 100"
        />
        <Path d="M15 16.5v9" data-name="Path 101" />
        <Path d="M21 16.5v9" data-name="Path 102" />
      </G>
    </G>
  </Svg>
);
export default Trash;
