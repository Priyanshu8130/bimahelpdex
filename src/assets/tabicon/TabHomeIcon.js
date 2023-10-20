import * as React from "react"
import Svg, { Path } from "react-native-svg"

function TabHomeIcon(props) {
  return (
    <Svg
      width={18}
      height={16}
      viewBox="0 0 18 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M7.2 16v-5.647h3.6V16h4.5V8.47H18L9 0 0 8.47h2.7V16h4.5z"
        fill="#000"
      />
    </Svg>
  )
}

export default TabHomeIcon
