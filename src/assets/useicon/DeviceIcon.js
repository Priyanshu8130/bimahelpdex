import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function DeviceIcon(props) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 24 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M21.6 2.25c.636 0 1.247.237 1.697.659.45.422.703.994.703 1.591v11.25c0 .597-.253 1.169-.703 1.591-.45.422-1.06.659-1.697.659H2.4a2.484 2.484 0 01-1.697-.659A2.181 2.181 0 010 15.75V2.25C0 1.653.253 1.081.703.659A2.484 2.484 0 012.4 0h7.2L12 2.25h9.6zm-11.1 7.875h3.9v4.5h2.4v-4.5h3.9l-5.1-4.781"
        fill="#fff"
      />
    </Svg>
  );
}

export default DeviceIcon;
