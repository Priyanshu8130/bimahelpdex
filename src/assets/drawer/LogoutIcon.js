import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function LogoutIcon(props) {
  return (
    <Svg
      width={13}
      height={14}
      viewBox="0 0 13 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M9.389 10.5V8.4H4.333V5.6H9.39V3.5L13 7l-3.611 3.5zM7.944 0c.384 0 .75.147 1.022.41.27.263.423.619.423.99v1.4H7.944V1.4h-6.5v11.2h6.5v-1.4H9.39v1.4c0 .371-.152.727-.423.99-.271.262-.638.41-1.022.41h-6.5c-.383 0-.75-.148-1.02-.41A1.378 1.378 0 010 12.6V1.4C0 1.029.152.673.423.41S1.061 0 1.444 0h6.5z"
        fill="#009C9D"
      />
    </Svg>
  );
}

export default LogoutIcon;
