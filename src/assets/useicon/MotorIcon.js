import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function MotorIcon(props) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 15 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M9.517 5.318l1.316 2.864H4.167L5.35 5.318h4.167zM5 9a.828.828 0 00-.833.818c0 .45.375.818.833.818a.828.828 0 00.833-.818A.828.828 0 005 9zm5 0a.828.828 0 00-.833.818c0 .45.375.818.833.818a.828.828 0 00.833-.818A.828.828 0 0010 9zm5-5.727v4.909c0 4.54-3.2 8.787-7.5 9.818C3.2 16.97 0 12.723 0 8.182v-4.91L7.5 0 15 3.273zM12.5 9l-1.8-4.09a1.248 1.248 0 00-1.183-.82H5.35c-.55 0-1.017.345-1.183.82L2.5 9v3.273c0 .45.375.818.833.818h.834A.828.828 0 005 12.273v-.819h5v.819c0 .45.375.818.833.818h.834a.828.828 0 00.833-.818V9z"
        fill="#000"
      />
    </Svg>
  );
}

export default MotorIcon;
