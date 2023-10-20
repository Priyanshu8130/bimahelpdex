import * as React from 'react';
import Svg, {G, Circle, Path, Defs} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function CameraIcon(props) {
  return (
    <Svg
      width={44}
      height={44}
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G filter="url(#filter0_d_608_305)">
        <Circle cx={17} cy={13} r={13} fill="#fff" />
      </G>
      <Path
        d="M11.4 8.333h2.1L14.9 7h4.2l1.4 1.333h2.1c.371 0 .727.14.99.39.262.25.41.59.41.944v8c0 .353-.148.692-.41.942-.263.25-.619.391-.99.391H11.4c-.371 0-.727-.14-.99-.39-.262-.25-.41-.59-.41-.943v-8c0-.354.148-.693.41-.943.263-.25.619-.39.99-.39zm5.6 2a3.59 3.59 0 00-2.475.977 3.255 3.255 0 00-1.025 2.357c0 .884.369 1.732 1.025 2.357A3.59 3.59 0 0017 17a3.59 3.59 0 002.475-.976 3.255 3.255 0 001.025-2.357c0-.884-.369-1.732-1.025-2.357A3.59 3.59 0 0017 10.333zm0 1.334c.557 0 1.091.21 1.485.585.394.375.615.884.615 1.415 0 .53-.221 1.039-.615 1.414a2.154 2.154 0 01-1.485.586c-.557 0-1.091-.211-1.485-.586a1.953 1.953 0 01-.615-1.414c0-.53.221-1.04.615-1.415A2.154 2.154 0 0117 11.668z"
        fill="#F76031"
      />
      <Defs></Defs>
    </Svg>
  );
}

export default CameraIcon;
