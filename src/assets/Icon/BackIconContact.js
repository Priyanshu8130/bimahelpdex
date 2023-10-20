import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function BackIconContact(props) {
  return (
    <Svg
      width={14}
      height={14}
      viewBox="0 0 13 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M13 18.515L4.965 10.5 13 2.467 10.526 0 0 10.5 10.526 21 13 18.515z"
        fill="#F76031"
      />
    </Svg>
  );
}

export default BackIconContact;
