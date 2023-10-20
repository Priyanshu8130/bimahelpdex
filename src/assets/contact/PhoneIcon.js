import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function PhoneIcon(props) {
  return (
    <Svg
      width={15}
      height={15}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M3.017 6.492a12.58 12.58 0 005.491 5.491l1.834-1.833a.836.836 0 01.85-.208 9.467 9.467 0 002.975.475.834.834 0 01.833.833v2.917a.833.833 0 01-.833.833A14.167 14.167 0 010 .833.833.833 0 01.833 0H3.75a.833.833 0 01.833.833c0 1.042.167 2.042.475 2.975a.836.836 0 01-.208.85L3.017 6.492z"
        fill="#009C9D"
      />
    </Svg>
  );
}

export default PhoneIcon;
