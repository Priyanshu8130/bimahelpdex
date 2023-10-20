import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function AddIcon(props) {
  return (
    <Svg
      width={12}
      height={12}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M12 6.857H6.857V12H5.143V6.857H0V5.143h5.143V0h1.714v5.143H12v1.714z"
        fill="#fff"
      />
    </Svg>
  );
}

export default AddIcon;
