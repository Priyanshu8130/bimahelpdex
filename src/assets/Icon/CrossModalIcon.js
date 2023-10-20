import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

function CrossModalIcon(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Circle cx={12} cy={12} r={12} fill="#F76031" />
      <Path
        d="M18 7.209L16.791 6 12 10.791 7.209 6 6 7.209 10.791 12 6 16.791 7.209 18 12 13.209 16.791 18 18 16.791 13.209 12 18 7.209z"
        fill="#fff"
      />
    </Svg>
  );
}

export default CrossModalIcon;
