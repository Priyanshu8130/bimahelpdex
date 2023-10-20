import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

function EmailIcon(props) {
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
        d="M35 19c0-1.1-.9-2-2-2H17c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V19zm-2 0l-8 5-8-5h16zm0 12H17V21l8 5 8-5v10z"
        fill="#fff"
      />
    </Svg>
  );
}

export default EmailIcon;
