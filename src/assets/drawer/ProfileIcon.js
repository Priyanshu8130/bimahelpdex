import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function ProfileIcon(props) {
  return (
    <Svg
      width={16}
      height={15}
      viewBox="0 0 16 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M11.454 3.75c0 .995-.402 1.948-1.118 2.652a3.854 3.854 0 01-2.7 1.098 3.854 3.854 0 01-2.7-1.098A3.716 3.716 0 013.818 3.75c0-.995.402-1.948 1.118-2.652A3.854 3.854 0 017.636 0c1.013 0 1.984.395 2.7 1.098a3.716 3.716 0 011.118 2.652zm3.819 9.375V15H0v-1.875c0-2.072 3.417-3.75 7.636-3.75 4.22 0 7.637 1.678 7.637 3.75z"
        fill="#009C9D"
      />
    </Svg>
  );
}

export default ProfileIcon;
