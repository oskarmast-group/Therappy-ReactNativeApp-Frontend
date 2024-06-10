import * as React from 'react';
import Svg, { G, Circle, Path } from 'react-native-svg';

const DocumentPendingIcon = () => (
  <Svg preserveAspectRatio="xMidYMid slice">
    <G transform="translate(-86 -527)">
      <Circle cx={7.5} cy={7.5} r={7.5} fill="#e5be0a" data-name="Ellipse 23" transform="translate(86 527)" />
      <Path
        fill="#fff"
        d="M93.509 529.75a3.6 3.6 0 0 0-3.193 1.689.446.446 0 0 0 .1.61l.8.607a.445.445 0 0 0 .617-.077 1.8 1.8 0 0 1 1.535-.917c.571 0 1.277.367 1.277.921 0 .418-.345.633-.909.949-.657.368-1.527.827-1.527 1.974v.182a.445.445 0 0 0 .445.445h1.341a.445.445 0 0 0 .441-.446v-.107c0-.795 2.329-.83 2.329-2.98a3.188 3.188 0 0 0-3.256-2.85Zm-.186 6.929a1.285 1.285 0 1 0 1.285 1.285 1.287 1.287 0 0 0-1.285-1.285Z"
        data-name="Icon awesome-question"
      />
    </G>
  </Svg>
);
export default DocumentPendingIcon;
