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

function NewPolicyIcon(props) {
  return (
    <Svg
      width={179}
      height={94}
      viewBox="0 0 179 94"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G filter="url(#filter0_d_613_309)">
        <G clipPath="url(#clip0_613_309)">
          <Path
            d="M31.2 7H15.3a5.277 5.277 0 00-5.3 5.29v61.42c0 1.403.558 2.748 1.552 3.74A5.305 5.305 0 0015.3 79h148.4a5.305 5.305 0 003.748-1.55A5.285 5.285 0 00169 73.71V17.58c0-2.935-2.385-5.29-5.3-5.29H36.5L31.2 7z"
            fill="url(#paint0_linear_613_309)"
          />
          <Path
            d="M36.147 12.644l.146.146H163.7c2.641 0 4.8 2.133 4.8 4.79v56.13c0 1.27-.505 2.488-1.406 3.387A4.804 4.804 0 01163.7 78.5H15.3a4.805 4.805 0 01-3.394-1.403A4.785 4.785 0 0110.5 73.71V12.29c0-2.659 2.134-4.79 4.8-4.79h15.693l5.154 5.144z"
            stroke="#9543FE"
            strokeOpacity={0.25}
          />
          <Path
            transform="rotate(45 11.046 4.954)"
            fill="#fff"
            d="M11.0457 4.95431H82.34049999999999V76.24911H11.0457z"
          />
          <Path
            d="M76.51 42.988c.55.103 1.003.378 1.358.826.355.448.532.961.532 1.54 0 .523-.13.985-.392 1.386-.252.392-.62.7-1.106.924-.485.224-1.06.336-1.722.336h-4.214v-9.772h4.032c.663 0 1.232.107 1.708.322.485.215.85.513 1.092.896.252.383.378.817.378 1.302 0 .57-.154 1.045-.462 1.428-.299.383-.7.653-1.204.812zm-3.584-.728h1.792c.467 0 .826-.103 1.078-.308.252-.215.378-.518.378-.91s-.126-.695-.378-.91c-.252-.215-.611-.322-1.078-.322h-1.792v2.45zm1.974 4.144c.476 0 .845-.112 1.106-.336.27-.224.406-.541.406-.952 0-.42-.14-.747-.42-.98-.28-.243-.658-.364-1.134-.364h-1.932v2.632H74.9zm12.384-6.16V48H85.31v-.98a2.635 2.635 0 01-.994.798c-.401.187-.84.28-1.316.28-.607 0-1.143-.126-1.61-.378a2.814 2.814 0 01-1.106-1.134c-.261-.504-.392-1.101-.392-1.792v-4.55h1.96v4.27c0 .616.154 1.092.462 1.428.308.327.728.49 1.26.49.541 0 .966-.163 1.274-.49.308-.336.462-.812.462-1.428v-4.27h1.974zm9.354 0l-4.802 11.424H89.75l1.68-3.864-3.108-7.56h2.198l2.002 5.418 2.03-5.418h2.086zM109.388 48h-1.96l-4.438-6.706V48h-1.96v-9.786h1.96l4.438 6.72v-6.72h1.96V48zm9.147-4.046c0 .28-.018.532-.056.756h-5.67c.047.56.243.999.588 1.316.346.317.77.476 1.274.476.728 0 1.246-.313 1.554-.938h2.114a3.567 3.567 0 01-1.288 1.848c-.634.476-1.414.714-2.338.714-.746 0-1.418-.163-2.016-.49a3.606 3.606 0 01-1.386-1.414c-.326-.607-.49-1.307-.49-2.1 0-.803.164-1.507.49-2.114a3.421 3.421 0 011.372-1.4c.588-.327 1.265-.49 2.03-.49.738 0 1.396.159 1.974.476.588.317 1.041.77 1.358 1.358.327.579.49 1.246.49 2.002zm-2.03-.56c-.009-.504-.191-.905-.546-1.204-.354-.308-.788-.462-1.302-.462-.485 0-.896.15-1.232.448-.326.29-.527.695-.602 1.218h3.682zm14.213-3.15L128.45 48h-2.114l-1.414-5.418L123.508 48h-2.128l-2.282-7.756h1.988l1.372 5.908 1.484-5.908h2.072l1.456 5.894 1.372-5.894h1.876zM78.092 59.252c0 .523-.126 1.013-.378 1.47-.243.457-.63.826-1.162 1.106-.523.28-1.185.42-1.988.42h-1.638V66h-1.96v-9.772h3.598c.756 0 1.4.13 1.932.392.532.261.929.62 1.19 1.078.27.457.406.975.406 1.554zm-3.612 1.414c.541 0 .943-.121 1.204-.364.261-.252.392-.602.392-1.05 0-.952-.532-1.428-1.596-1.428h-1.554v2.842h1.554zm8.448 5.46c-.747 0-1.42-.163-2.016-.49a3.675 3.675 0 01-1.414-1.414c-.336-.607-.504-1.307-.504-2.1 0-.793.172-1.493.518-2.1a3.647 3.647 0 011.442-1.4 4.118 4.118 0 012.03-.504c.746 0 1.423.168 2.03.504a3.554 3.554 0 011.428 1.4c.354.607.532 1.307.532 2.1 0 .793-.182 1.493-.546 2.1a3.72 3.72 0 01-1.456 1.414c-.607.327-1.288.49-2.044.49zm0-1.708c.354 0 .686-.084.994-.252.317-.177.569-.439.756-.784.186-.345.28-.765.28-1.26 0-.737-.196-1.302-.588-1.694a1.877 1.877 0 00-1.414-.602c-.56 0-1.032.2-1.414.602-.374.392-.56.957-.56 1.694s.182 1.307.546 1.708c.373.392.84.588 1.4.588zm7.443-8.778V66h-1.96V55.64h1.96zm2.93 1.68c-.344 0-.634-.107-.867-.322a1.123 1.123 0 01-.336-.826c0-.327.112-.597.336-.812.233-.224.523-.336.868-.336s.63.112.854.336c.233.215.35.485.35.812a1.1 1.1 0 01-.35.826c-.224.215-.509.322-.854.322zm.967.924V66h-1.96v-7.756h1.96zm1.432 3.878c0-.803.164-1.503.49-2.1a3.443 3.443 0 011.358-1.4c.579-.336 1.242-.504 1.988-.504.962 0 1.755.243 2.38.728.635.476 1.06 1.148 1.274 2.016h-2.114a1.494 1.494 0 00-.574-.784c-.261-.196-.588-.294-.98-.294-.56 0-1.003.205-1.33.616-.326.401-.49.975-.49 1.722 0 .737.164 1.311.49 1.722.327.401.77.602 1.33.602.794 0 1.312-.355 1.554-1.064h2.114c-.214.84-.639 1.507-1.274 2.002-.634.495-1.428.742-2.38.742-.746 0-1.41-.163-1.988-.49a3.562 3.562 0 01-1.358-1.4c-.326-.607-.49-1.311-.49-2.114zm16.346-3.878l-4.802 11.424h-2.086l1.68-3.864-3.108-7.56h2.198l2.002 5.418 2.03-5.418h2.086z"
            fill="#000"
          />
          <Path
            d="M150.9 11.3h-1.8V9.5h1.8m0 9h-1.8v-5.4h1.8M150 5a9 9 0 100 17.998A9 9 0 00150 5zM32.09 50.5c0 1.194-.459 2.338-1.277 3.182A4.298 4.298 0 0127.727 55a4.298 4.298 0 01-3.085-1.318 4.573 4.573 0 01-1.278-3.182c0-1.194.46-2.338 1.278-3.182A4.298 4.298 0 0127.727 46c1.158 0 2.267.474 3.086 1.318A4.572 4.572 0 0132.09 50.5zm4.364 11.25V64H19v-2.25c0-2.486 3.905-4.5 8.727-4.5 4.822 0 8.728 2.014 8.728 4.5zm3.819-3.938V59.5h-1.637v-1.688h1.637zm-2.182-5.624h-1.636v-.563c0-.895.344-1.754.958-2.386a3.223 3.223 0 012.314-.989c.868 0 1.7.356 2.314.989A3.43 3.43 0 0143 51.625a3.319 3.319 0 01-1.407 2.711l-.328.214a2.336 2.336 0 00-.992 1.913v.224h-1.637v-.224c0-1.34.655-2.588 1.735-3.32l.316-.213c.426-.292.677-.776.677-1.305 0-.448-.173-.877-.48-1.193a1.612 1.612 0 00-1.157-.495c-.434 0-.85.178-1.157.495-.307.316-.48.745-.48 1.193v.563z"
            fill="#9543FE"
          />
        </G>
      </G>
      <Defs>
        <LinearGradient
          id="paint0_linear_613_309"
          x1={90}
          y1={-45.5}
          x2={90}
          y2={138}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#fff" stopOpacity={0} />
          <Stop offset={1} stopColor="#9543FE" />
        </LinearGradient>
        <ClipPath id="clip0_613_309">
          <Rect x={10} y={5} width={159} height={74} rx={5} fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default NewPolicyIcon;
