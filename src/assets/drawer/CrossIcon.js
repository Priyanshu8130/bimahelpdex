import * as React from "react"
import Svg, { Path } from "react-native-svg"

function CrossIcon(props) {
  return (
    <Svg
      width={15}
      height={15}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M15 1.51L13.49 0 7.5 5.99 1.51 0 0 1.51 5.99 7.5 0 13.49 1.51 15 7.5 9.01 13.49 15 15 13.49 9.01 7.5 15 1.51z"
        fill="#000"
      />
    </Svg>
  )
}

export default CrossIcon
