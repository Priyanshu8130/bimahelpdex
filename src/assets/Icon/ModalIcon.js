import * as React from 'react';
import Svg, {Circle, Defs, Pattern, Use, Image} from 'react-native-svg';
function ModalIcon(props) {
  return (
    <Svg
      width={30}
      height={30}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}>
      <Circle cx={10} cy={10} r={10} fill="url(#pattern0)" />
      <Defs>
        <Pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}>
          <Use
            xlinkHref="#image0_195_283"
            transform="translate(0 -.075) scale(.00135)"
          />
        </Pattern>
        <Image
          id="image0_195_283"
          width={740}
          height={1109}
        />
      </Defs>
    </Svg>
  );
}
export default ModalIcon;