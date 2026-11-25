import type { EventCategoryKey } from "../../types/event";

type Props = Readonly<{ slug: string; category: EventCategoryKey }>;

export default function EventEditorialVisual({ slug, category }: Props) {
  const ramadan = slug === "ramazon-hayiti";
  const sacrifice = slug === "qurbon-hayiti";
  const sport = category === "sport";
  const community = category === "community";
  const background = ramadan ? "#163b39" : sacrifice ? "#e4d8bc" : sport ? "#d5dfcb" : community ? "#304f60" : "#dce7df";
  const ink = ramadan || community ? "#e4e9d8" : "#254b48";
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 360 160" className="block aspect-[9/4] w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="360" height="160" fill={background} />
      <g fill="none" stroke={ink} strokeWidth="1.5" opacity=".24">
        <path d="M0 130 130 0M30 160 190 0M170 160 330 0M230 160 360 30" />
      </g>
      {ramadan ? <g><path d="M108 160V79Q180 -20 252 79V160" fill="#bcd4c6" opacity=".23"/><path d="M126 160V83Q180 8 234 83V160" fill="none" stroke={ink} strokeWidth="2"/><path d="M192 42a31 31 0 1 0 20 49 35 35 0 0 1-20-49Z" fill="#d9bd83"/><path d="m221 35 3 8 8 3-8 3-3 8-3-8-8-3 8-3Z" fill={ink}/></g>
      : sacrifice ? <g transform="translate(180 80)" fill="none" stroke={ink} strokeWidth="2"><path d="M0-65 46-46 65 0 46 46 0 65-46 46-65 0-46-46Z"/><path d="M0-65 65 0 0 65-65 0Z M-46-46H46V46H-46Z"/><circle r="31" fill="#b9c9b3"/><path d="M0-25 25 0 0 25-25 0Z"/></g>
      : sport ? <g fill="none" stroke={ink} strokeWidth="2"><rect x="85" y="22" width="190" height="116" rx="3"/><path d="M180 22V138M85 52H116V108H85M275 52H244V108H275"/><circle cx="180" cy="80" r="27"/><circle cx="180" cy="80" r="12" fill="#f1f0e9"/><path d="m180 72 8 6-3 9h-10l-3-9Z" fill={ink}/></g>
      : community ? <g fill={ink}>{[116,180,244].map((x,i)=><g key={x} transform={`translate(${x} ${i===1?0:14})`}><circle cy="53" r="16"/><path d="M-28 115V99Q-28 75 0 75T28 99V115Z" opacity=".8"/></g>)}</g>
      : <g fill="none" stroke={ink} strokeWidth="2"><circle cx="180" cy="80" r="51"/><path d="M180 29 231 80 180 131 129 80Z M144 44H216V116H144Z"/><circle cx="180" cy="80" r="18" fill={ink} opacity=".35"/></g>}
    </svg>
  );
}
