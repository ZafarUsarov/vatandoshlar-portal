import Image from "next/image";

/**
 * Decorative, conceptual journeys — not geographic routes or live Telegram activity.
 * Coordinates are authored in the exact 1672 × 941 image coordinate system.
 */
type City = {
  name: string;
  center: readonly [number, number];
  destination: readonly [number, number];
  control: readonly [number, number];
  seconds: number;
};

const WIDTH = 1672;
const HEIGHT = 941;
const HUB = [836, 620] as const;

// Coordinates inspected against the approved 1672 × 941 source PNG.
// Destinations target open waterfronts / plazas within each island footprint.
const CITIES: readonly City[] = [
  { name: "Hamburg", center: [560, 155], destination: [561, 210], control: [725, 287], seconds: 3.4 },
  { name: "Berlin", center: [1150, 155], destination: [1090, 218], control: [980, 300], seconds: 3.5 },
  { name: "Hannover", center: [245, 344], destination: [285, 408], control: [580, 480], seconds: 3.7 },
  { name: "München", center: [1410, 389], destination: [1395, 460], control: [1110, 505], seconds: 3.8 },
  { name: "Düsseldorf", center: [245, 624], destination: [334, 705], control: [590, 657], seconds: 3.8 },
  { name: "Frankfurt", center: [735, 773], destination: [760, 845], control: [875, 717], seconds: 3.0 },
  { name: "Stuttgart", center: [1330, 690], destination: [1335, 752], control: [1090, 680], seconds: 3.7 },
];

const ARRIVAL_PAUSE = 0.85;
const HUB_PAUSE = 0.4;

/**
 * One continuous closed path. Repeated keyPoints hold the plane at each
 * destination and hub; the next leg always starts at the previous endpoint.
 */
function buildJourney() {
  const path: string[] = [`M ${HUB[0]} ${HUB[1]}`];
  const times: number[] = [0];
  const fractions: number[] = [0];
  const easing: string[] = [];
  let elapsed = 0;
  let progress = 0;

  // Estimate quadratic lengths so keyPoints correspond to the actual SVG arc length.
  const length = (from: readonly number[], control: readonly number[], to: readonly number[]) => {
    let total = 0;
    let lastX = from[0];
    let lastY = from[1];
    for (let i = 1; i <= 256; i++) {
      const t = i / 256;
      const inv = 1 - t;
      const x = inv * inv * from[0] + 2 * inv * t * control[0] + t * t * to[0];
      const y = inv * inv * from[1] + 2 * inv * t * control[1] + t * t * to[1];
      total += Math.hypot(x - lastX, y - lastY);
      lastX = x;
      lastY = y;
    }
    return total;
  };

  const lengths = CITIES.map((city) => {
    const outbound = length(HUB, city.control, city.destination);
    const inbound = length(city.destination, city.control, HUB);
    return [outbound, inbound] as const;
  });
  const totalLength = lengths.reduce((sum, pair) => sum + pair[0] + pair[1], 0);
  const totalTime = CITIES.reduce((sum, city) => sum + city.seconds * 2 + ARRIVAL_PAUSE + HUB_PAUSE, 0);

  const addStep = (duration: number, distance: number, ease: string) => {
    elapsed += duration;
    progress += distance;
    times.push(elapsed / totalTime);
    fractions.push(progress / totalLength);
    easing.push(ease);
  };

  CITIES.forEach((city, index) => {
    const [outbound, inbound] = lengths[index];
    path.push(`Q ${city.control[0]} ${city.control[1]} ${city.destination[0]} ${city.destination[1]}`);
    addStep(city.seconds, outbound, "0.42 0 0.58 1");
    addStep(ARRIVAL_PAUSE, 0, "0 0 1 1");
    path.push(`Q ${city.control[0]} ${city.control[1]} ${HUB[0]} ${HUB[1]}`);
    addStep(city.seconds, inbound, "0.42 0 0.58 1");
    addStep(HUB_PAUSE, 0, "0 0 1 1");
  });

  // Exact endpoints avoid floating-point mismatches at the loop boundary.
  times[times.length - 1] = 1;
  fractions[fractions.length - 1] = 1;

  return {
    path: path.join(" "),
    duration: `${totalTime}s`,
    keyTimes: times.join(";"),
    keyPoints: fractions.join(";"),
    keySplines: easing.join(";"),
  };
}

const journey = buildJourney();
const SHOW_DEBUG =
  process.env.NODE_ENV === "development" &&
  process.env.NEXT_PUBLIC_TELEGRAM_FLIGHT_DEBUG === "1";

export default function TelegramCommunityNetwork() {
  return (
    <figure className="relative m-0 w-full overflow-hidden rounded-xl border border-slate-800 bg-[#151a1c] sm:rounded-2xl">
      <div className="relative w-full" style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}>
        <Image
          src="/images/telegram/uzde-german-city-diorama.png"
          alt="UzDe. markaziy platformasi atrofida Hamburg, Berlin, Hannover, Düsseldorf, Frankfurt, Stuttgart va München shaharlarining yettita meʼmoriy miniatyurasi"
          fill
          sizes="(min-width: 2560px) 2528px, (min-width: 1024px) calc(100vw - 32px), (min-width: 640px) calc(100vw - 24px), calc(100vw - 16px)"
          className="object-contain"
          priority={false}
        />
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <linearGradient id="uzde-flight-metal" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#d7fff7" />
              <stop offset="0.52" stopColor="#6edbd1" />
              <stop offset="1" stopColor="#287c86" />
            </linearGradient>
            <filter id="uzde-flight-shadow" x="-60%" y="-60%" width="220%" height="220%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#020617" floodOpacity="0.6" />
            </filter>
          </defs>
          <style>{`
            .uzde-flight-plane { transform-origin: 0 0; }
            @media (max-width: 1023px) {
              .uzde-flight-plane { transform: scale(1.55); }
            }
            @media (max-width: 639px) {
              .uzde-flight-plane { transform: scale(2.55); }
            }
            @media (prefers-reduced-motion: reduce) {
              .uzde-flight-moving { display: none; }
            }
          `}</style>
          <g className="uzde-flight-moving">
            {SHOW_DEBUG && <circle r="4" fill="#ff4d6d" stroke="white" strokeWidth="1" />}
            <g className="uzde-flight-plane" filter="url(#uzde-flight-shadow)">
              <circle r="30" fill="#071d29" fillOpacity="0.95" stroke="#b89b6e" strokeWidth="1.8" />
              <circle r="25.5" fill="none" stroke="#6bd5cb" strokeOpacity="0.82" strokeWidth="1.1" />
              <circle r="21.5" fill="#0c3440" stroke="#3e8f91" strokeOpacity="0.7" strokeWidth="0.7" />
              {/* Offset the actual silhouette slightly to optically center its mass. */}
              <g transform="translate(-1.5 1.5) scale(0.83)">
                <path
                  d="M -20 -5 L 20 -18 Q 24 -19 22 -14 L 15 17 Q 14 21 10 17 L 2 9 L -7 15 L -6 3 L 15 -11 L -11 2 Z"
                  fill="url(#uzde-flight-metal)"
                  stroke="#e2fff8"
                  strokeWidth="1"
                  strokeLinejoin="round"
                />
                <path d="M -6 3 L 15 -11 L 2 9" fill="none" stroke="#2d7781" strokeWidth="1.3" />
                <path d="M -20 -5 L 20 -18" fill="none" stroke="#fff3d8" strokeOpacity="0.55" strokeWidth="0.8" />
              </g>
            </g>
            <animateMotion
              path={journey.path}
              dur={journey.duration}
              keyTimes={journey.keyTimes}
              keyPoints={journey.keyPoints}
              keySplines={journey.keySplines}
              calcMode="spline"
              repeatCount="indefinite"
            />
          </g>
          {CITIES.map((city, index) => {
            const start = CITIES.slice(0, index).reduce(
              (sum, previous) => sum + previous.seconds * 2 + ARRIVAL_PAUSE + HUB_PAUSE,
              0,
            );
            const total = Number.parseFloat(journey.duration);
            const arrival = start + city.seconds;
            return [0, 0.18].map((delay, ring) => {
              const begin = (arrival + delay) / total;
              const end = (arrival + delay + 0.65) / total;
              return (
                <circle
                  key={`${city.name}-${ring}`}
                  className="uzde-flight-moving"
                  cx={city.destination[0]}
                  cy={city.destination[1]}
                  r="5"
                  fill="none"
                  stroke={ring === 0 ? "#6dd6c9" : "#d9ad77"}
                  strokeWidth={ring === 0 ? "2" : "1.2"}
                  opacity="0"
                >
                  <animate
                    attributeName="opacity"
                    values="0;0;0.48;0;0"
                    keyTimes={`0;${Math.max(0, begin - 0.0001)};${begin};${Math.min(1, end)};1`}
                    dur={journey.duration}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="r"
                    values="5;5;7;22;5"
                    keyTimes={`0;${Math.max(0, begin - 0.0001)};${begin};${Math.min(1, end)};1`}
                    dur={journey.duration}
                    repeatCount="indefinite"
                  />
                </circle>
              );
            });
          })}
          {SHOW_DEBUG && (
            <g fontSize="16" fontFamily="sans-serif" fontWeight="600">
              <path d={journey.path} fill="none" stroke="#f8fafc" strokeWidth="2" strokeDasharray="7 7" />
              <circle cx={HUB[0]} cy={HUB[1]} r="9" fill="#ffef99" />
              {CITIES.map((city) => (
                <g key={city.name}>
                  <circle cx={city.center[0]} cy={city.center[1]} r="6" fill="#fbbf24" />
                  <circle cx={city.destination[0]} cy={city.destination[1]} r="10" fill="#10b981" stroke="white" strokeWidth="2" />
                  <circle cx={city.control[0]} cy={city.control[1]} r="5" fill="#f472b6" />
                  <text x={city.destination[0] + 14} y={city.destination[1] - 10} fill="white" stroke="#020617" strokeWidth="3" paintOrder="stroke">
                    {city.name}
                  </text>
                </g>
              ))}
            </g>
          )}
        </svg>
      </div>
      <figcaption className="sr-only">
        Shaharlar o‘rtasidagi harakat dekorativ tasvir bo‘lib, haqiqiy Telegram xabarlar oqimini ifodalamaydi.
      </figcaption>
    </figure>
  );
}
