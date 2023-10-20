import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function OthersIcon(props) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M15.202 1.636h-3.748V0H18v6.545h-1.636V2.79l-3.952 3.952a4.091 4.091 0 01-2.594 6.267v1.718h1.636v1.637H9.819V18H8.182v-1.636H6.545v-1.637h1.637V13.01A4.091 4.091 0 015.58 6.76l-.965-.974-1.146 1.137L2.315 5.76l1.146-1.137-1.825-1.825v2.93H0V0h5.727v1.636H2.79L4.615 3.47 5.793 2.3l1.162 1.162-1.179 1.17.958.965A4.068 4.068 0 019 4.91c.818 0 1.604.246 2.25.68l3.952-3.953zM9 6.546a2.455 2.455 0 100 4.909 2.455 2.455 0 000-4.91z"
        fill="#000"
      />
    </Svg>
  );
}

export default OthersIcon;
