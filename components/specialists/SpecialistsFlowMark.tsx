/** Five-node Connect motion identity for the specialists hero. */
export default function SpecialistsFlowMark() {
  const nodes = [
    [14, 14], [86, 14], [50, 50], [14, 86], [86, 86],
  ] as const;
  const edges = [
    [0, 2], [1, 2], [2, 3], [2, 4],
  ] as const;

  return (
    <span
      aria-hidden="true"
      className="ml-[10px] inline-block size-[clamp(36px,4vw,54px)] shrink-0 align-[-0.08em] translate-y-[-0.12em] leading-none"
    >
      <svg viewBox="7 7 86 86" className="block size-full overflow-hidden" fill="none">
        <g stroke="currentColor" strokeWidth="3.5" strokeOpacity="0.60" strokeLinecap="round">
          {edges.map(([from, to]) => (
            <line
              key={`${from}-${to}`}
              x1={nodes[from][0]}
              y1={nodes[from][1]}
              x2={nodes[to][0]}
              y2={nodes[to][1]}
            />
          ))}
        </g>
        <g fill="currentColor">
          {nodes.map(([cx, cy], index) => (
            <circle key={index} cx={cx} cy={cy} r={index === 2 ? 6.2 : 6.4} className={index === 2 ? "text-teal-600 dark:text-teal-300" : undefined} />
          ))}
        </g>
        <g className="motion-reduce:hidden text-teal-600 dark:text-teal-300" fill="currentColor">
          <circle r="4.6">
            <animateMotion
              path="M14 14 L50 50 L86 14 L50 50 L86 86 L50 50 L14 86 L50 50 L14 14"
              dur="5.6s"
              repeatCount="indefinite"
              calcMode="linear"
            />
          </circle>
        </g>
      </svg>
    </span>
  );
}
