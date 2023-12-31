import * as React from 'react';
import Svg, {
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
  Rect,
} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function ProfileIcon(props) {
  return (
    <Svg
      width={170}
      height={94}
      //   viewBox="0 0 155 94"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G filter="url(#filter0_d_37_427)">
        <G clipPath="url(#clip0_37_427)">
          <Path
            d="M31.2 7H15.3a5.277 5.277 0 00-5.3 5.29v61.42c0 1.403.558 2.748 1.552 3.74A5.305 5.305 0 0015.3 79h148.4a5.305 5.305 0 003.748-1.55A5.285 5.285 0 00169 73.71V17.58c0-2.935-2.385-5.29-5.3-5.29H36.5L31.2 7z"
            fill="url(#paint0_linear_37_427)"
          />
          <Path
            d="M36.147 12.644l.146.146H163.7c2.641 0 4.8 2.133 4.8 4.79v56.13c0 1.27-.505 2.488-1.406 3.387A4.804 4.804 0 01163.7 78.5H15.3a4.805 4.805 0 01-3.394-1.403A4.785 4.785 0 0110.5 73.71V12.29c0-2.659 2.134-4.79 4.8-4.79h15.693l5.154 5.144z"
            stroke="#01C3BC"
            strokeOpacity={0.25}
          />
          <Path
            transform="rotate(45 11.046 4.954)"
            fill="#fff"
            d="M11.0457 4.95431H82.34049999999999V76.24911H11.0457z"
          />
          <Path
            d="M30 48a4 4 0 110 8 4 4 0 010-8zm0 10c4.42 0 8 1.79 8 4v2H22v-2c0-2.21 3.58-4 8-4z"
            fill="#01C3BC"
          />
          <Path
            d="M85.735 49.228V59h-1.96v-6.356L81.157 59h-1.484l-2.632-6.356V59h-1.96v-9.772h2.226l3.108 7.266 3.108-7.266h2.212zm9.358 2.016l-4.802 11.424h-2.086l1.68-3.864-3.108-7.56h2.198l2.002 5.418 2.03-5.418h2.086zm11.519 1.008c0 .523-.126 1.013-.378 1.47-.243.457-.63.826-1.162 1.106-.523.28-1.186.42-1.988.42h-1.638V59h-1.96v-9.772h3.598c.756 0 1.4.13 1.932.392.532.261.928.62 1.19 1.078.27.457.406.975.406 1.554zM103 53.666c.541 0 .942-.121 1.204-.364.261-.252.392-.602.392-1.05 0-.952-.532-1.428-1.596-1.428h-1.554v2.842H103zm6.963-1.218c.252-.41.579-.733.98-.966.411-.233.877-.35 1.4-.35v2.058h-.518c-.616 0-1.083.145-1.4.434-.308.29-.462.793-.462 1.512V59h-1.96v-7.756h1.96v1.204zm7.144 6.678c-.746 0-1.418-.163-2.016-.49a3.682 3.682 0 01-1.414-1.414c-.336-.607-.504-1.307-.504-2.1 0-.793.173-1.493.518-2.1a3.654 3.654 0 011.442-1.4 4.121 4.121 0 012.03-.504c.747 0 1.424.168 2.03.504a3.55 3.55 0 011.428 1.4c.355.607.532 1.307.532 2.1 0 .793-.182 1.493-.546 2.1a3.715 3.715 0 01-1.456 1.414c-.606.327-1.288.49-2.044.49zm0-1.708c.355 0 .686-.084.994-.252.318-.177.57-.439.756-.784.187-.345.28-.765.28-1.26 0-.737-.196-1.302-.588-1.694a1.876 1.876 0 00-1.414-.602c-.56 0-1.031.2-1.414.602-.373.392-.56.957-.56 1.694s.182 1.307.546 1.708c.374.392.84.588 1.4.588zm9.04-4.564h-1.358V59h-1.988v-6.146h-.882v-1.61h.882v-.392c0-.952.271-1.652.812-2.1.541-.448 1.358-.658 2.45-.63v1.652c-.476-.01-.807.07-.994.238-.187.168-.28.471-.28.91v.322h1.358v1.61zm2.264-2.534c-.345 0-.634-.107-.868-.322a1.123 1.123 0 01-.336-.826c0-.327.112-.597.336-.812.234-.224.523-.336.868-.336.346 0 .63.112.854.336.234.215.35.485.35.812 0 .327-.116.602-.35.826-.224.215-.508.322-.854.322zm.966.924V59h-1.96v-7.756h1.96zm3.897-2.604V59h-1.96V48.64h1.96zm9.146 6.314c0 .28-.019.532-.056.756h-5.67c.047.56.243.999.588 1.316.345.317.77.476 1.274.476.728 0 1.246-.313 1.554-.938h2.114a3.567 3.567 0 01-1.288 1.848c-.635.476-1.414.714-2.338.714-.747 0-1.419-.163-2.016-.49a3.606 3.606 0 01-1.386-1.414c-.327-.607-.49-1.307-.49-2.1 0-.803.163-1.507.49-2.114a3.421 3.421 0 011.372-1.4c.588-.327 1.265-.49 2.03-.49.737 0 1.395.159 1.974.476.588.317 1.041.77 1.358 1.358.327.579.49 1.246.49 2.002zm-2.03-.56c-.009-.504-.191-.905-.546-1.204-.355-.308-.789-.462-1.302-.462-.485 0-.896.15-1.232.448-.327.29-.527.695-.602 1.218h3.682z"
            fill="#000"
          />
          <Path
            d="M150.9 11.3h-1.8V9.5h1.8m0 9h-1.8v-5.4h1.8M150 5a9 9 0 100 17.998A9 9 0 00150 5z"
            fill="#01C3BC"
          />
        </G>
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_37_427"
          x1={90}
          y1={-45.5}
          x2={90}
          y2={138}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#fff" stopOpacity={0} />
          <Stop offset={1} stopColor="#01C3BC" />
        </LinearGradient>
        <ClipPath id="clip0_37_427">
          <Rect x={10} y={5} width={159} height={74} rx={5} fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default ProfileIcon;
