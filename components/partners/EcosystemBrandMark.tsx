import Image from 'next/image';
import TalksOrbitalGraphic from '@/components/events/talks/TalksOrbitalGraphic';
import SpecialistsFlowMark from '@/components/specialists/SpecialistsFlowMark';
import type {Brand} from '@/data/partners/content';
export default function EcosystemBrandMark({brand}:{brand:Brand}) {
 const id=brand.animationVariant;
 if(brand.logo) return <Image src={brand.logo} alt="" width={100} height={100} className="h-full w-full object-contain"/>;
 if(id==='talks') return <TalksOrbitalGraphic/>;
 if(id==='specialists') return <div className="flex h-full w-full items-center justify-center [&>span]:!m-0 [&>span]:!size-[80%] [&>span]:!translate-y-0"><SpecialistsFlowMark/></div>;
 if(id==='market') return <MarketProductsServicesMark/>;
 return <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true" className="h-full w-full">


  {id==='travel' && <DigitalRouteMark />}

  {id==='guide' && <GuideLifeKnowledgeMark />}
 </svg>;
}


const travelRoute =
  "M12 108H48Q60 108 60 96V48Q60 36 72 36H96Q108 36 108 24V12";

function RouteVehicle() {
  return (
    <g fill="currentColor" stroke="none">
      {[-7, 3].map(x =>
        [-6.5, 4].map(y => (
          <rect
            key={`${x}-${y}`}
            x={x}
            y={y}
            width="4"
            height="2.5"
            rx="1"
          />
        ))
      )}
      <rect
        x="-10"
        y="-5.5"
        width="20"
        height="11"
        rx="4"
      />
      <path
        d="M3 -4L6 -3V3L3 4Z M-5 -4L-7 -3V3L-5 4Z"
        fill="currentColor"
        className="brightness-[1.8] dark:brightness-[0.45]"
      />
      <path
        d="M8 -3V-1 M8 1V3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        className="brightness-[2] dark:brightness-[0.5]"
      />
    </g>
  );
}

function DigitalRouteMark() {
  return (
    <g>
      <g strokeWidth="0.8" opacity="0.23">
        {[12, 36, 60, 84, 108].map(n => (
          <path
            key={n}
            d={`M${n} 12V108 M12 ${n}H108`}
          />
        ))}
      </g>

      <path
        d={travelRoute}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle cx="12" cy="108" r="4" strokeWidth="1.8" />
      <circle cx="108" cy="12" r="5" strokeWidth="1.5" />
      <circle
        cx="108"
        cy="12"
        r="2"
        fill="currentColor"
        stroke="none"
      />

      <g className="motion-reduce:hidden">
        <animateMotion
          path={travelRoute}
          dur="9s"
          rotate="auto"
          repeatCount="indefinite"
          calcMode="paced"
        />
        <animate
          attributeName="opacity"
          values="0;1;1;0;0"
          keyTimes="0;0.06;0.91;0.98;1"
          dur="9s"
          repeatCount="indefinite"
        />
        <RouteVehicle />
      </g>

      <g
        className="hidden motion-reduce:block"
        transform="translate(60 72) rotate(-90)"
      >
        <RouteVehicle />
      </g>
    </g>
  );
}


function MarketProductsServicesMark() {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      aria-hidden="true"
      className="h-full w-full"
    >
      <g className="market-product-card">
        <rect x="8" y="13" width="35" height="44" rx="3"/>
        <rect x="14" y="19" width="23" height="18" rx="1"/>
        <path d="M14 43H36M14 49H28"/>
      </g>

      <g className="market-service-card">
        <rect x="57" y="43" width="35" height="44" rx="3"/>
        <circle cx="74.5" cy="55" r="5"/>
        <path d="M64 69Q74 56 85 69M64 77H85"/>
      </g>

      <path
        className="market-connection"
        d="M49 23H75V36M23 64V77H50"
        strokeDasharray="3 3"
      />

      <circle
        className="market-active-dot"
        cx="50"
        cy="50"
        r="4"
        fill="currentColor"
      />

      <style>{`
        @keyframes uzdeMarketFloat {
          0%, 100% { transform: translateY(-2px); }
          50% { transform: translateY(2px); }
        }

        @keyframes uzdeMarketDash {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -24; }
        }

        @keyframes uzdeMarketPulse {
          0%, 100% {
            transform: scale(0.9);
            opacity: 0.75;
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
          }
        }

        @media (prefers-reduced-motion: no-preference) {
          .market-product-card,
          .market-service-card {
            animation: uzdeMarketFloat 4s ease-in-out infinite;
          }

          .market-service-card {
            animation-delay: -2s;
          }

          .market-connection {
            animation: uzdeMarketDash 4s linear infinite;
          }

          .market-active-dot {
            transform-box: fill-box;
            transform-origin: center;
            animation: uzdeMarketPulse 4s ease-in-out infinite;
          }
        }
      `}</style>
    </svg>
  );
}


const guideKnowledgePaths = [
  "M34 34L47 47",
  "M86 34L73 47",
  "M34 86L47 73",
  "M86 86L73 73",
] as const;

function GuideLifeKnowledgeMark() {
  return (
    <g
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g strokeDasharray="2.5 3.5" opacity="0.48">
        {guideKnowledgePaths.map(path => (
          <path key={path} d={path}/>
        ))}
      </g>

      <circle cx="60" cy="60" r="19"/>

      <path d="M60 53Q53 48 45 51V68Q53 65 60 70Q67 65 75 68V51Q67 48 60 53V70"/>

      <path
        d="M49 55Q54 54 57 57 M49 60Q54 59 57 62 M63 57Q67 54 71 55 M63 62Q67 59 71 60"
        strokeWidth="0.9"
      />

      <g className="uzde-guide-knowledge-node">
        <path d="M12 8H27L34 15V37H12Z M27 8V15H34 M17 21H29 M17 26H29 M17 31H25"/>
      </g>

      <g
        className="uzde-guide-knowledge-node"
        style={{animationDelay: "-9s"}}
      >
        <path d="M81 19L97 10L113 19L97 28Z M87 23V32Q97 39 107 32V23 M113 19V32"/>
        <circle cx="113" cy="34" r="1.4" fill="currentColor"/>
      </g>

      <g
        className="uzde-guide-knowledge-node"
        style={{animationDelay: "-6s"}}
      >
        <rect x="8" y="88" width="30" height="22" rx="3"/>
        <path d="M17 88V82H29V88 M8 96Q23 102 38 96"/>
        <rect x="20" y="96" width="6" height="5" rx="1"/>
      </g>

      <g
        className="uzde-guide-knowledge-node"
        style={{animationDelay: "-3s"}}
      >
        <path d="M81 96L97 81L113 96 M86 92V111H108V92 M93 111V100H101V111"/>
      </g>

      <g
        className="fill-teal-600 dark:fill-teal-300 motion-reduce:hidden"
        stroke="none"
      >
        {guideKnowledgePaths.map((path, index) => (
          <circle key={path} r="2" opacity="0">
            <animateMotion
              path={path}
              dur="3s"
              begin={`${index * 0.75}s`}
              repeatCount="indefinite"
              calcMode="paced"
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.2;0.8;1"
              dur="3s"
              begin={`${index * 0.75}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </g>

      <style>{`
        @keyframes uzdeGuideKnowledgeActive {
          0%, 30%, 100% { opacity: 0.65; }
          10%, 20% { opacity: 1; }
        }

        @media (prefers-reduced-motion: no-preference) {
          .uzde-guide-knowledge-node {
            animation: uzdeGuideKnowledgeActive 12s ease-in-out infinite;
          }
        }
      `}</style>
    </g>
  );
}
