import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

function WhatsappIcon(props) {
  return (
    <Svg
      width={50}
      height={50}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Circle cx={25} cy={25} r={25} fill="#F76031" />
      <Path
        d="M25.04 15c-5.487 0-9.96 4.45-9.96 9.91a9.9 9.9 0 001.327 4.95L15 35l5.276-1.38c1.458.79 3.096 1.21 4.764 1.21 5.488 0 9.96-4.45 9.96-9.91 0-2.65-1.035-5.14-2.915-7.01A9.89 9.89 0 0025.04 15zm.01 1.67c2.211 0 4.282.86 5.85 2.42a8.204 8.204 0 012.422 5.83c0 4.54-3.719 8.23-8.282 8.23A8.175 8.175 0 0120.83 32l-.302-.17-3.136.82.834-3.04-.2-.32a8.158 8.158 0 01-1.267-4.38c.01-4.54 3.718-8.24 8.291-8.24zm-3.537 3.66a.92.92 0 00-.664.31c-.22.25-.874.86-.874 2.07 0 1.22.894 2.39 1.005 2.56.14.17 1.769 2.67 4.271 3.73.593.27 1.055.42 1.417.53.593.19 1.136.16 1.568.1.483-.07 1.467-.6 1.679-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.16-.482-.27-.251-.14-1.477-.74-1.699-.82-.23-.08-.371-.12-.562.12-.161.25-.644.81-.784.97-.151.17-.292.19-.533.07-.261-.13-1.065-.39-2.01-1.23-.744-.66-1.236-1.47-1.387-1.72-.12-.24-.01-.39.11-.5.111-.11.272-.29.372-.44.131-.14.171-.25.252-.41.08-.17.04-.31-.02-.43-.06-.11-.563-1.35-.774-1.84-.201-.48-.402-.42-.563-.43-.14 0-.302-.01-.472-.01z"
        fill="#fff"
      />
    </Svg>
  );
}

export default WhatsappIcon;
