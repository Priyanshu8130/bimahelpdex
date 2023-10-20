import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function PolicyHealthIcon(props) {
  return (
    <Svg
      width={22}
      height={18}
      viewBox="0 0 12 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M6.857 1.8H5.143L4.286 0h3.428l-.857 1.8zm.857 3.6V3.6h.857v-.9H3.43v.9h.857v1.8C1.92 5.4 0 7.416 0 9.9V18h12V9.9c0-2.484-1.92-4.5-4.286-4.5zm1.715 8.1H6.857v2.7H5.143v-2.7H2.57v-1.8h2.572V9h1.714v2.7H9.43v1.8z"
        fill="#F76031"
      />
    </Svg>
  );
}

export default PolicyHealthIcon;
