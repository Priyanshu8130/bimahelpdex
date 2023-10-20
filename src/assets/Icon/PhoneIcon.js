import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function PhoneIcon(props) {
  return (
    <Svg
      width={15}
      height={20}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M3 6.5A12.532 12.532 0 008.5 12l1.833-1.833c.25-.25.584-.334.834-.167.916.333 1.916.5 3 .5.416 0 .833.417.833.833v2.834c0 .416-.417.833-.833.833C6.333 15 0 8.667 0 .833 0 .333.417 0 .833 0H3.75c.5 0 .833.333.833.833 0 1 .167 2 .5 3 .084.334 0 .584-.166.834L3 6.5z"
        fill="#009C9D"
      />
    </Svg>
  );
}

export default PhoneIcon;
