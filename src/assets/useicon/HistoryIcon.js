import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function HistoryIcon(props) {
  return (
    <Svg
      width={14}
      height={12}
      viewBox="0 0 14 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M8.333 3.333h-1v3.334l2.854 1.693.48-.807-2.334-1.386V3.333zM8 0a6 6 0 00-6 6H0l2.64 2.687L5.333 6h-2A4.667 4.667 0 118 10.667a4.63 4.63 0 01-3.293-1.374l-.947.947A5.93 5.93 0 008 12 6 6 0 108 0z"
        fill="#fff"
      />
    </Svg>
  );
}

export default HistoryIcon;
