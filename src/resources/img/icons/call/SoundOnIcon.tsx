import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

const SoundOnIcon: React.FC<{color?: string}> = ({color = 'white'}) => (
  <Svg viewBox="0 0 184 188" preserveAspectRatio="xMidYMid slice">
    <G data-name="Group 136">
      <Path
        fill={color}
        d="M70.795 40.848 45.227 66.41H15.9a6.9 6.9 0 0 0-6.9 6.9v41.38a6.9 6.9 0 0 0 6.9 6.9h29.33l25.568 25.562a6.9 6.9 0 0 0 11.774-4.877v-96.55a6.9 6.9 0 0 0-11.777-4.877Zm67.051-14.679a6.954 6.954 0 0 0-7.633 11.627 67.145 67.145 0 0 1 0 112.41 6.953 6.953 0 1 0 7.633 11.624 81.054 81.054 0 0 0 0-135.662Zm9.1 67.83a53.06 53.06 0 0 0-24.648-44.9 6.868 6.868 0 0 0-9.518 2.144 6.979 6.979 0 0 0 2.129 9.587 39.276 39.276 0 0 1 0 66.338 6.978 6.978 0 0 0-2.129 9.587 6.881 6.881 0 0 0 9.513 2.147 53.057 53.057 0 0 0 24.648-44.9ZM106.2 71.908a6.9 6.9 0 1 0-6.656 12.087 11.327 11.327 0 0 1 0 20.007 6.9 6.9 0 1 0 6.656 12.087 25.126 25.126 0 0 0 0-44.181Z"
        data-name="Icon awesome-volume-up"
      />
      <Path fill="none" d="M0 0h184v188H0z" data-name="Rectangle 59" />
    </G>
  </Svg>
);

export default SoundOnIcon;
