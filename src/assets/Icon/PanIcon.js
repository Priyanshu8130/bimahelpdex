import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function PanIcon(props) {
  return (
    <Svg
      width={15}
      height={20}
      viewBox="0 0 15 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M13.125 0H1.875C.835 0 0 .89 0 2v8c0 1.11.834 2 1.875 2h11.25c1.04 0 1.875-.89 1.875-2V2c0-1.11-.834-2-1.875-2zm0 2v1H1.875V2h11.25zm-11.25 8V6h11.25v4H1.875z"
        fill="#009C9D"
      />
    </Svg>
  );
}

export default PanIcon;
