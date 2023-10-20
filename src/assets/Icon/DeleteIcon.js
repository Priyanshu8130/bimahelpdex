import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';

function DeleteIcon(props) {
  return (
    <Svg
      width={34}
      height={34}
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Rect
        x={0.5}
        y={0.5}
        width={33}
        height={33}
        rx={9.5}
        fill="#fff"
        stroke="#F3F3F3"
      />
      <Path
        d="M11 24a2 2 0 002 2h8a2 2 0 002-2V12H11v12zm2-10h8v10h-8V14zm7.5-5l-1-1h-5l-1 1H10v2h14V9h-3.5z"
        fill="#F76031"
      />
    </Svg>
  );
}

export default DeleteIcon;
