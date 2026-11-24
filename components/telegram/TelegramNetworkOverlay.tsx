/** Decorative, illustrative message routes aligned to telegram-master-visual.webp. */
export default function TelegramNetworkOverlay() {
  const routes = [
    { id: "north", path: "M 265 250 Q 356 265 466 290", duration: "9s", begin: "-1s", end: [466, 290] },
    { id: "east", path: "M 1188 390 Q 1115 408 1056 440 Q 1108 498 1150 570", duration: "11s", begin: "-5s", end: [1150, 570] },
    { id: "south", path: "M 1030 730 Q 946 812 775 890", duration: "10s", begin: "-7s", end: [775, 890] },
  ] as const;

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1536 1024"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{`
        .network-motion { opacity: .92; }
        @media (prefers-reduced-motion: reduce) {
          .network-motion { display: none; }
        }
      `}</style>
      <defs>
        <filter id="telegram-message-halo" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      {routes.map((route) => (
        <g className="network-motion" key={route.id}>
          <path
            d={route.path}
            fill="none"
            stroke="#5eead4"
            strokeOpacity="0.28"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <g>
            <circle r="11" fill="#67e8f9" opacity="0.32" filter="url(#telegram-message-halo)" />
            <path
              d="M -10 -6 L 11 0 L -10 6 L -6 1 L 3 0 L -6 -1 Z"
              fill="#e6ffff"
              stroke="#67e8f9"
              strokeWidth="0.9"
              strokeLinejoin="round"
            />
            <animateMotion
              path={route.path}
              dur={route.duration}
              begin={route.begin}
              repeatCount="indefinite"
              rotate="auto"
              calcMode="paced"
            />
          </g>
          <circle cx={route.end[0]} cy={route.end[1]} r="5" fill="none" stroke="#67e8f9" strokeWidth="2" opacity="0">
            <animate attributeName="r" values="5;19;5" dur={route.duration} begin={route.begin} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;0;0;0;0;0;0;0;0.65;0" dur={route.duration} begin={route.begin} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
    </svg>
  );
}
