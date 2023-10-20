import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function MaleIcon(props) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M6 6c1.29 0 2.5.41 3.47 1.11L14.58 2H10V0h8v8h-2V3.41L10.89 8.5c.7 1 1.11 2.2 1.11 3.5a6 6 0 11-6-6zm0 2a4 4 0 100 8 4 4 0 000-8z"
        fill="#000"
      />
    </Svg>
  );
}

export default MaleIcon;
