import * as React from "react"
import Svg, { Path } from "react-native-svg"

function TabReviewIcon(props) {
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
        d="M12.8 9.6h-6L8.4 8h4.4M3.2 9.6v-2l5.504-5.488a.41.41 0 01.568 0l1.408 1.416c.16.16.16.408 0 .568L5.176 9.6M14.4 0H1.6A1.6 1.6 0 000 1.6V16l3.2-3.2h11.2a1.6 1.6 0 001.6-1.6V1.6A1.6 1.6 0 0014.4 0z"
        fill="#000"
      />
    </Svg>
  )
}

export default TabReviewIcon
