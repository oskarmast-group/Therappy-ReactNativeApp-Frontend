import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const CardGenericIcon = () => (
  <Svg viewBox="0 0 512 512" preserveAspectRatio="xMidYMid slice">
    <Path
      fill="#717402"
      d="M53.33 85.33h405.34c29.45 0 53.33 23.89 53.33 53.34v234.66c0 29.45-23.88 53.33-53.33 53.34H53.33C23.88 426.66 0 402.78 0 373.33V138.67c0-29.45 23.88-53.33 53.33-53.34Z"
    />
    <Path fill="#b9b9b9" d="M0 149.33h512v85.33H0z" />
    <Path
      fill="#fafafa"
      d="M160 320H74.67c-5.89.18-10.81-4.45-10.99-10.34s4.45-10.81 10.34-10.99H160c5.89-.18 10.81 4.45 10.99 10.34.18 5.89-4.45 10.81-10.34 10.99H160ZM224 362.67H74.67c-5.89 0-10.67-4.77-10.68-10.66 0-5.89 4.77-10.67 10.66-10.68h149.34c5.89 0 10.67 4.78 10.66 10.68 0 5.89-4.78 10.66-10.66 10.66Z"
    />
    <Path fill="none" d="M0 0h512v512H0z" />
  </Svg>
);

export default CardGenericIcon;
