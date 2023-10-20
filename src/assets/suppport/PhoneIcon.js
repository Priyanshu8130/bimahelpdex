import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

function PhoneIcon(props) {
  return (
    <Svg
      width={50}
      height={50}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Circle cx={25} cy={25} r={25} fill="#F76031" />
      <Path
        d="M19.022 23.656a16.775 16.775 0 007.322 7.322l2.445-2.445c.311-.31.744-.4 1.133-.277 1.245.41 2.578.633 3.967.633A1.111 1.111 0 0135 30v3.889A1.111 1.111 0 0133.889 35 18.89 18.89 0 0115 16.111 1.111 1.111 0 0116.111 15H20a1.111 1.111 0 011.111 1.111c0 1.389.222 2.722.633 3.967.123.389.034.822-.277 1.133l-2.445 2.445z"
        fill="#fff"
      />
    </Svg>
  );
}

export default PhoneIcon;
