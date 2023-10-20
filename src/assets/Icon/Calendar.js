import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Calendar(props) {
  return (
    <Svg
      width={17}
      height={19}
      viewBox="0 0 17 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M3.778 9.5h1.889v1.9h-1.89V9.5zM17 3.8v13.3c0 1.054-.84 1.9-1.889 1.9H1.89A1.894 1.894 0 010 17.1V3.8a1.9 1.9 0 011.889-1.9h.944V0h1.89v1.9h7.555V0h1.889v1.9h.944C16.16 1.9 17 2.755 17 3.8zM1.889 5.7H15.11V3.8H1.89v1.9zM15.11 17.1V7.6H1.89v9.5H15.11zm-3.778-5.7V9.5h1.89v1.9h-1.89zm-3.777 0V9.5h1.888v1.9H7.556zm-3.778 1.9h1.889v1.9h-1.89v-1.9zm7.555 1.9v-1.9h1.89v1.9h-1.89zm-3.777 0v-1.9h1.888v1.9H7.556z"
        fill="#009C9D"
      />
    </Svg>
  );
}

export default Calendar;
