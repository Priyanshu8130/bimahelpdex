import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function FileIcon(props) {
  return (
    <Svg
      width={13}
      height={13}
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M1.445 0C.643 0 0 .551 0 1.238v9.905c0 .328.152.643.423.875.271.232.639.363 1.022.363h2.889v-1.182l1.51-1.294h-4.4V8.667h5.844l1.445-1.238H1.445V6.19h8.732l1.38-1.182V3.714L7.223 0H1.445zM6.5.929l3.973 3.404H6.5V.93zm5.164 5.88a.435.435 0 00-.288.1l-.737.631 1.51 1.288.736-.626a.32.32 0 000-.489l-.939-.804a.43.43 0 00-.281-.1zm-1.451 1.096l-4.435 3.807V13H7.28l4.442-3.807-1.51-1.288z"
        fill="#fff"
      />
    </Svg>
  );
}

export default FileIcon;
