import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function ImageIcon(props) {
  return (
    <Svg
      width={20}
      height={18}
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M5.833 11.7l3.75-5.4 2.917 4.05 2.083-2.7L17.5 11.7m.833-9.9h-6.666L10 0H5c-.442 0-.866.19-1.179.527A1.876 1.876 0 003.333 1.8v10.8c0 .477.176.935.488 1.273.313.337.737.527 1.179.527h13.333c.442 0 .866-.19 1.179-.527.312-.338.488-.796.488-1.273v-9c0-.477-.176-.935-.488-1.273a1.606 1.606 0 00-1.179-.527zM1.667 3.6H0v12.6c0 .477.176.935.488 1.273.313.337.737.527 1.179.527h15v-1.8h-15V3.6z"
        fill="#F76031"
      />
    </Svg>
  );
}

export default ImageIcon;
