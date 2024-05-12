import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const SearchIcon = () => (
  <Svg viewBox="0 0 30 30" preserveAspectRatio="xMidYMid slice">
    <G data-name="Group 50">
      <G
        fill="none"
        stroke="#b3cc1d"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        data-name="Icon feather-search"
      >
        <Path d="M25.5 13.5a12 12 0 1 1-12-12 12 12 0 0 1 12 12Z" data-name="Path 8" />
        <Path d="m28.5 28.5-6.525-6.525" data-name="Path 9" />
      </G>
    </G>
  </Svg>
);

export default SearchIcon;
