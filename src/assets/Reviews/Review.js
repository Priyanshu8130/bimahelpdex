import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Review(props) {
  return (
    <Svg
      width={21}
      height={20}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M7.795 18.947H2.227C.991 18.947 0 18.011 0 16.842V2.105C0 .937.991 0 2.227 0h15.59c1.237 0 2.228.937 2.228 2.105v5.61a3.05 3.05 0 00-1.069-.2c-.412 0-.802.085-1.158.243V2.105H2.228v14.737h5.69l-.123.116v1.99zM4.455 6.316H15.59V4.21H4.454v2.105zm0 8.42h5.69l2.105-1.978v-.126H4.454v2.105zm0-4.21H14.61l.98-.926V8.421H4.454v2.105zm16.37.61L19.399 9.79a.637.637 0 00-.857 0l-1.114 1.053L19.711 13l1.114-1.053a.556.556 0 000-.81zM10.023 20h2.294l6.737-6.39-2.283-2.157-6.748 6.379V20z"
        fill="#fff"
      />
    </Svg>
  )
}

export default Review
