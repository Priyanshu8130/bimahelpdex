import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function NotificationIcon(props) {
  return (
    <Svg
      width={30}
      height={30}
      viewBox="0 0 21 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M17.778 11.655a6.217 6.217 0 01-1.667.25c-3.367 0-6.111-2.94-6.111-6.548 0-1.75.644-3.333 1.667-4.512A2.092 2.092 0 0010 0C8.778 0 7.778 1.071 7.778 2.381v.345c-3.3 1.048-5.556 4.298-5.556 7.988v7.143L0 20.238v1.19h20v-1.19l-2.222-2.38v-6.203zM10 25c1.233 0 2.222-1.06 2.222-2.381H7.778c0 1.322 1 2.381 2.222 2.381z"
        fill="#000"
      />
      <Path
        d="M16.5 10c2.481 0 4.5-2.019 4.5-4.5S18.981 1 16.5 1A4.505 4.505 0 0012 5.5c0 2.481 2.019 4.5 4.5 4.5z"
        fill="#FFB411"
      />
    </Svg>
  );
}

export default NotificationIcon;
