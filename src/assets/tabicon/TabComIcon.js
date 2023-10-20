import * as React from "react"
import Svg, { Path } from "react-native-svg"

function TabComIcon(props) {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M14.4 12H16v-1.6h-1.6V12zm0-8v4.8H16V4h-1.6zM7.2 5.6h4.4L7.2 1.2v4.4zM1.6 0H8l4.8 4.8v9.6c0 .888-.712 1.6-1.6 1.6H1.6A1.6 1.6 0 010 14.4V1.6C0 .712.712 0 1.6 0zm7.2 12.8v-1.6H1.6v1.6h7.2zm2.4-3.2V8H1.6v1.6h9.6z"
        fill="#000"
      />
    </Svg>
  )
}

export default TabComIcon
