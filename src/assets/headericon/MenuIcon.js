import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function MenuIcon(props) {
  return (
    <Svg
      width={35}
      height={35}
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M23.694 3.975C17.77-.975 8.924-.18 3.974 5.745-.973 11.67-.18 20.515 5.746 25.465c5.925 4.949 14.77 4.154 19.72-1.77a14.004 14.004 0 002.728-12.783 1.003 1.003 0 00-1.24-.694c-.535.15-.846.704-.694 1.24a11.999 11.999 0 01-2.335 10.953c-4.239 5.074-11.815 5.752-16.887 1.516C1.965 19.69 1.28 12.109 5.518 7.034 9.757 1.96 17.331 1.28 22.405 5.518a1.005 1.005 0 101.29-1.543z"
        fill="#000"
      />
      <Path
        d="M16.853 12.035h-8.97c-.487 0-.883-.454-.883-1.018 0-.563.396-1.017.883-1.017h8.97c.489 0 .883.457.883 1.017 0 .564-.396 1.018-.883 1.018zM21.117 16.101H7.883c-.487 0-.883-.454-.883-1.017 0-.564.396-1.018.883-1.018h13.234c.49 0 .883.457.883 1.018 0 .563-.396 1.017-.883 1.017zM13.472 20H7.883C7.396 20 7 19.543 7 18.983c0-.564.396-1.018.883-1.018h5.589c.489 0 .883.454.883 1.018 0 .563-.397 1.017-.883 1.017z"
        fill="#F76031"
      />
    </Svg>
  );
}

export default MenuIcon;