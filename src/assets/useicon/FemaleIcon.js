import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function FemaleIcon(props) {
  return (
    <Svg
      width={12}
      height={18}
      viewBox="0 0 12 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M6 0a6 6 0 016 6c0 2.97-2.16 5.44-5 5.92V14h2v2H7v2H5v-2H3v-2h2v-2.08C2.16 11.44 0 8.97 0 6a6 6 0 016-6zm0 2a4 4 0 100 8 4 4 0 000-8z"
        fill="#000"
      />
    </Svg>
  );
}

export default FemaleIcon;
