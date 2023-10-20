import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function GeneralIcon(props) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 16 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M14.198 11.143c-.25 1.688-1.24 3.154-2.64 4.08-.178-.712-1.275-1.294-2.71-1.457a12.26 12.26 0 01.677-2.52c.339.205.731.325 1.177.325 3.166 0 2.676-5.142 2.676-5.142s-.446.857-1.784.857h-.892c-1.23 0-2.23.96-2.23 2.143 0 .428.126.797.33 1.122A11.019 11.019 0 0110.703 9c-1.177 1.14-2.078 2.571-2.675 3.943-.562-1.054-1.267-1.86-1.784-2.229.42.172.812.429 1.186.686.098-.206.152-.437.152-.686-.045-2.34-4.014-2.143-4.014-2.143.277.36.446.815.446 1.286v.857c0 .943.803 1.715 1.784 1.715.446 0 .847-.155 1.16-.429.205.54.356 1.157.437 1.749-1.534.128-2.712.728-2.899 1.482-1.632-1.088-2.711-2.897-2.711-4.945 0-3.309 2.8-6 6.243-6v2.571l4.46-3.428L8.026 0v2.571C3.594 2.571 0 6.026 0 10.286S3.594 18 8.027 18c4.13 0 7.527-3 7.973-6.857h-1.802z"
        fill="#000"
      />
    </Svg>
  );
}

export default GeneralIcon;
