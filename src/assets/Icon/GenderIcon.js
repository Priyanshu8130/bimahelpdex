import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function GenderIcon(props) {
  return (
    <Svg
      width={12}
      height={18}
      viewBox="0 0 8 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M4.8 0H3.2v1.792l-1.568-.9-.8 1.374 1.568.892-1.568.892.8 1.374 1.568-.9v2.66C1.376 7.547 0 9.142 0 11.053 0 13.232 1.792 15 4 15s4-1.768 4-3.947c0-1.91-1.376-3.506-3.2-3.869v-2.66l1.568.9.8-1.374L5.6 3.158l1.568-.892-.8-1.374-1.568.9V0zM4 13.421c-1.32 0-2.4-1.066-2.4-2.368C1.6 9.75 2.68 8.684 4 8.684c1.32 0 2.4 1.066 2.4 2.369 0 1.302-1.08 2.368-2.4 2.368z"
        fill="#009C9D"
      />
    </Svg>
  );
}

export default GenderIcon;
