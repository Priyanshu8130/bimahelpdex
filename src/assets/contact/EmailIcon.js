import * as React from "react"
import Svg, { Path } from "react-native-svg"

function EmailIcon(props) {
  return (
    <Svg
      width={15}
      height={12}
      viewBox="0 0 15 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M15 1.5c0-.825-.675-1.5-1.5-1.5h-12C.675 0 0 .675 0 1.5v9c0 .825.675 1.5 1.5 1.5h12c.825 0 1.5-.675 1.5-1.5v-9zm-1.5 0l-6 3.75-6-3.75h12zm0 9h-12V3l6 3.75 6-3.75v7.5z"
        fill="#FFB411"
      />
    </Svg>
  )
}

export default EmailIcon
