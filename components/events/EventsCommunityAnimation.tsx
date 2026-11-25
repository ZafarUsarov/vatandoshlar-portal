"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { SupportedEventLocale } from "@/types/event";
import styles from "./EventsCommunityAnimation.module.css";

const palette = ["#34566A", "#387D80", "#789176", "#B79A6C", "#3B504B"];
const roundCoordinate = (value: number): number => Number(value.toFixed(3));

type PersonData = { x: number; y: number; dx: number; dy: number; color: number; skin: string; scale?: number; book?: boolean; woman?: boolean; scarf?: boolean; textile?: boolean; older?: boolean; doppi?: boolean; chess?: boolean; child?: boolean; facing?: number; science?: "research" | "typing"; hair?: "bun" | "bob" };

function ReadingBook({ color, skin, alternate }: { color: string; skin: string; alternate: boolean }) {
  return <g className={alternate ? styles.readerAlternate : undefined}>
    <path d="M-10 -55L-17 -43L-12 -36" stroke={color} strokeWidth="6" strokeLinecap="round" fill="none" />
    <g transform="translate(0 -39)">
      <path d="M-14 -8Q-7 -11 0 -6Q7 -11 14 -8V7Q7 4 0 10Q-7 4 -14 7Z" fill="#34566A" />
      <path d="M-12 -8Q-6 -9 0 -5Q6 -9 12 -8V5Q6 2 0 8Q-6 2 -12 5Z" fill="#EEEAE0" />
      <path d="M0 -5V8M-10 -4L-2 -2M-10 0L-2 2M2 -2L10 -4M2 2L10 0" stroke="#789176" strokeWidth=".7" fill="none" />
      <g className={styles.readerPage}>
        <path d="M0 -5Q6 -9 12 -8V5Q6 2 0 8Z" fill="#F5F1E6" stroke="#D0C2AA" strokeWidth=".5" />
        <path d="M2 -2L10 -4M2 2L10 0" stroke="#789176" strokeWidth=".7" />
      </g>
    </g>
    <circle cx="-12" cy="-36" r="3" fill={skin} />
    <g transform="translate(10 -55)">
      <g className={styles.readerHand}>
        <path d="M0 0L7 10L2 15" stroke={color} strokeWidth="6" strokeLinecap="round" fill="none" />
        <circle cx="2" cy="15" r="3" fill={skin} />
      </g>
    </g>
  </g>;
}

function Person({ person, index }: { person: PersonData; index: number }) {
  const { x, y, dx, dy, color, skin, scale = 1, book, doppi, chess, child, woman, scarf, textile, older, science, hair, facing = 1 } = person;
  const motion = { "--dx": `${roundCoordinate(dx)}px`, "--dy": `${roundCoordinate(dy)}px`, "--offset": `${roundCoordinate((index % 4) * 0.13)}s`, "--via": `${roundCoordinate(dy - 170)}px` } as CSSProperties;
  return <g transform={`translate(${x} ${y})`}>
    <g className={chess ? styles.chessTraveller : child ? styles.childTraveller : styles.traveller} style={motion}>
      <g transform={`scale(${scale})`}>
        <ellipse cy="1" rx="15" ry="3" fill="#3B504B" opacity=".16" />
        <g className={chess ? styles.chessBody : styles.body}>
          <g transform={`scale(${facing} 1)`}>
          <g className={chess ? styles.standingLegs : undefined}><path className={styles.legA} d="M-5 -29 L-7 -15 L-9 -2" stroke="#3B504B" strokeWidth="7" strokeLinecap="round" fill="none" />
          <path className={styles.legB} d="M5 -29 L7 -15 L9 -2" stroke="#34566A" strokeWidth="7" strokeLinecap="round" fill="none" />
          <path d="M-12 -2h8M5 -2h9" stroke="#263c3b" strokeWidth="4" strokeLinecap="round" /></g>
          {chess && <g className={styles.seatedLegs}><path d="M-5 -29L5 -23L8 -3M5 -29L15 -26L18 -3" stroke="#34566A" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none"/><path d="M8 -2h7M18 -2h7" stroke="#263c3b" strokeWidth="4" strokeLinecap="round"/></g>}
          <path d={woman ? "M-12 -58Q0 -65 12 -58L17 -10Q0 -5 -17 -10Z" : "M-12 -58 Q0 -65 12 -58 L10 -29 Q0 -25 -10 -29Z"} fill={palette[color]} />
          {!book && <>
          <g className={styles.armA}><path d="M-10 -55 L-17 -43 L-14 -35" stroke={palette[color]} strokeWidth="6" strokeLinecap="round" fill="none" />
          <circle cx="-14" cy="-34" r="3" fill={skin} /></g><g className={chess ? (facing===1 ? styles.whiteHand : styles.blackHand) : science ? styles.scienceHand : styles.armB}><path d={chess ? "M10 -55 L19 -43 L27 -45" : science ? "M10 -55L20 -43L29 -36" : "M10 -55 L17 -44 L19 -39"} stroke={palette[color]} strokeWidth="6" strokeLinecap="round" fill="none" />
          <circle cx={chess?27:science?29:19} cy={chess?-45:science?-36:-38} r="3" fill={skin} /></g>
          </>}
          <path d="M-3 -66V-59H3V-66" fill={skin} />
          {textile && <path d="M-7 -55L0 -48 7 -55 0 -62ZM-7 -39L0 -32 7 -39 0 -46ZM-7 -23L0 -16 7 -23 0 -30Z" fill="#D0C2AA" stroke="#387D80" strokeWidth="1.5"/>}
          <g className={book ? styles.readerHead : undefined}>
          {woman && scarf && <path d="M-10 -73Q-14 -88 0 -88Q14 -88 11 -73L14 -58Q0 -51 -14 -58Z" fill="#D0C2AA"/>}
          {woman && !scarf && (hair === "bun" ? <g><circle cx="9" cy="-86" r="6" fill="#3B504B"/><path d="M-9 -72Q-12 -86 0 -86Q12 -86 9 -72L7 -68H-7Z" fill="#3B504B"/></g> : <path d="M-10 -73Q-13 -87 0 -87Q13 -87 10 -73L11 -65L5 -66L-5 -66L-11 -65Z" fill="#3B504B"/>)}
          <ellipse cy="-73" rx="8" ry="10" fill={skin} />
          {!scarf && <path d="M-8 -73 Q-11 -85 1 -85 Q10 -85 8 -72 L4 -78 L-6 -76Z" fill={older ? "#a8ada3" : "#3B504B"} />}
          {doppi && <Doppi />}
          <path d="M-3 -72h.8M4 -72h.8" stroke="#3B504B" strokeWidth="1.2" strokeLinecap="round"/><path d="M0 -67q2 1 4 -1" fill="none" stroke="#8f654d" strokeWidth=".7"/>

          </g>
          {book && <ReadingBook color={palette[color]} skin={skin} alternate={index % 4 === 3} />}
          </g>
        </g>
      </g>
    </g>
  </g>;
}

function Child({person,index}:{person:PersonData;index:number}) {
  const {x,y,dx,dy,scale=1,skin,color}=person;
  const c=palette[color], girl=index%2===1;
  const motion={"--dx":`${roundCoordinate(dx)}px`,"--dy":`${roundCoordinate(dy)}px`,"--run":`${index%2? -9:9}px`,"--phase":`${roundCoordinate(index*.13)}s`} as CSSProperties;
  return <g transform={`translate(${x} ${y})`}><g className={styles.kidTravel} style={motion}><g transform={`scale(${scale})`}>
    <ellipse rx="12" ry="3" fill="#3B504B" opacity=".16"/>
    <g className={styles.kidBody}>
      <path className={styles.kidLegA} d="M-5 -20L-7 -10L-8 -1" stroke="#34566A" strokeWidth="5.5" strokeLinecap="round" fill="none"/>
      <path className={styles.kidLegB} d="M5 -20L7 -10L8 -1" stroke="#3B504B" strokeWidth="5.5" strokeLinecap="round" fill="none"/>
      <path className={styles.kidArmA} d="M-8 -35L-15 -27L-17 -23" stroke={c} strokeWidth="6" strokeLinecap="round" fill="none"/>
      <path className={styles.kidArmB} d="M8 -35L15 -27L17 -23" stroke={c} strokeWidth="6" strokeLinecap="round" fill="none"/>
      <path d={girl&&index!==1?"M-9 -38Q0 -42 9 -38L13 -13H-13Z":"M-9 -38Q0 -42 9 -38L10 -20H-10Z"} fill={c}/>
      {index===5&&<path d="M0 -35L6 -28 0 -21 -6 -28Z" fill="#D0C2AA" stroke="#387D80"/>}
      {index===1&&<path d="M9 -55Q22 -54 15 -35L10 -40Z" fill="#3B504B"/>}
      {index===3&&<path d="M-11 -51Q-15 -66 0 -66Q15 -66 11 -51L13 -40H-13Z" fill="#3B504B"/>}
      {index===5&&<path d="M-10 -51L-14 -34M10 -51L14 -34" stroke="#3B504B" strokeWidth="5" strokeLinecap="round"/>}
      <ellipse cy="-51" rx="11" ry="12" fill={skin}/>
      {index===2?[-8,-4,0,4,8].map(k=><circle key={k} cx={k} cy={roundCoordinate(-60-Math.cos(k/8)*2)} r="4" fill="#3B504B"/>):<path d="M-11 -51Q-14 -67 0 -65Q14 -65 11 -51L5 -58 -8 -57Z" fill="#3B504B"/>}
      <path d="M-4 -51h.8M4 -51h.8M-3 -46Q0 -42 3 -46" stroke="#594c40" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      <ellipse cx="-7" cy="-47" rx="2" ry="1" fill="#bf846f" opacity=".5"/><ellipse cx="7" cy="-47" rx="2" ry="1" fill="#bf846f" opacity=".5"/>
    </g></g></g></g>;
}

function Doppi() {
  return <g strokeLinejoin="round">
    <path d="M-9 -77L-10 -84L-5 -89L4 -90L10 -85L10 -78L4 -76L-5 -76Z" fill="#151819"/>
    <path d="M-10 -84L0 -82L10 -85M0 -82V-76" fill="none" stroke="#414747" strokeWidth=".6"/>
    {[-7,-2,3,7].map((x,i)=><path key={x} transform={`translate(${x} ${i===0||i===3?-85:-87}) scale(.48)`} d="M-3 5C-6 1 -4 -5 0 -6C-1 -3 4 -2 3 2C2 5 -1 6 -3 5ZM-2 3Q1 0 0 -3" fill="#EEEAE0" fillRule="evenodd" stroke="#151819" strokeWidth=".45"/>)}
    <path d="M-9 -79q2 -3 4 0q2 -3 4 0q2 -3 4 0q2 -3 4 0l2 -1" stroke="#EEEAE0" strokeWidth=".65" fill="none"/>
  </g>;
}

type PieceKind = "r" | "n" | "b" | "q" | "k" | "p";
const backRank: PieceKind[] = ["r", "n", "b", "q", "k", "b", "n", "r"];
const moves = [{from:"e2",to:"e4"},{from:"e7",to:"e5"},{from:"g1",to:"f3"},{from:"b8",to:"c6"},{from:"f1",to:"b5"},{from:"a7",to:"a6"}];
const initialPieces = [8,7,2,1].flatMap(rank => backRank.map((kind,file) => ({square:`${String.fromCharCode(97+file)}${rank}`,kind:rank===7||rank===2?"p" as const:kind,white:rank<=2})));
// Each immutable frame maps a stable piece identity to its occupied square.
const boardFrames = moves.reduce<Record<string,string>[]>((frames, move) => {
  const previous = frames[frames.length-1];
  const id = Object.keys(previous).find(key => previous[key]===move.from);
  if (!id || Object.values(previous).includes(move.to)) throw new Error("Invalid chess sequence");
  return [...frames, {...previous,[id]:move.to}];
}, [Object.fromEntries(initialPieces.map(piece => [piece.square,piece.square]))]);
// Oblique axonometric projection: ranks run from right (black) to left (white).
function project(file:number, row:number): [number,number] { return [50 + file*5 - row*7, file*3 + row*2.5]; }
function squarePosition(square:string) { return project(square.charCodeAt(0)-97+.5,8-Number(square[1])+.5); }
function polygon(points:[number,number][]) { return points.map(point=>point.join(",")).join(" "); }
function ChessPiece({kind,white}:{kind:PieceKind;white:boolean}) {
  const shapes: Record<PieceKind,string> = {
    p:"M-1.8 -1L-1 -3A1.6 1.6 0 1 1 1 -3L1.8 -1Z",
    r:"M-2 -1L-1.4 -4L-2 -5V-7H-1V-6H1V-7H2V-5L1.4 -4L2 -1Z",
    n:"M-2 -1L-.8 -4L-2 -4L-1.5 -6L.5 -8L2 -6L2 -1Z",
    b:"M-2 -1L-.8 -4L-1.6 -5.5L0 -8L1.6 -5.5L.8 -4L2 -1Z",
    q:"M-2 -1L-1 -4L-2.5 -7L-1 -6L0 -8L1 -6L2.5 -7L1 -4L2 -1Z",
    k:"M-2 -1L-1 -5L-.6 -6H-2V-7H-.6V-9H.6V-7H2V-6H.6L1 -5L2 -1Z"
  };
  return <g fill={white?"#EEEAE0":"#263c3b"} stroke={white?"#52645e":"#D0C2AA"} strokeWidth=".35" strokeLinejoin="round"><ellipse rx="2.5" ry="1.1"/><path d={shapes[kind]}/></g>;
}
// Both seats share file coordinate 4, on opposite ends of the rank axis.
function chessSeat(white: boolean): [number, number] {
  return project(4, white ? 10.5 : -2.5);
}
function ChessChair({ x, y, scale, white }: { x:number; y:number; scale:number; white:boolean }) {
  const [px,py] = chessSeat(white);
  return <g transform={`translate(${x+px*scale} ${y+(py+39)*scale}) scale(${scale})`}>
    <path d="M-9 -19V0M9 -19V0" stroke="#3B504B" strokeWidth="3" strokeLinecap="round"/>
    <path d="M-12 -20L0 -25L12 -20L0 -15Z" fill="#B79A6C"/>
    <path d={white ? "M-12 -20V-36L0 -31V-15Z" : "M12 -20V-36L0 -31V-15Z"} fill="#96784f"/>
  </g>;
}
function ChessArea({ x, y, scale }: { x:number; y:number; scale:number }) {
  const corners = [project(-.5,-.5),project(8.5,-.5),project(8.5,8.5),project(-.5,8.5)];
  const pieces = [...initialPieces].sort((a,b)=>squarePosition(a.square)[1]-squarePosition(b.square)[1]);
  return <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <ellipse cx="42" cy="76" rx="55" ry="12" fill="#3B504B" opacity=".12"/>
    {[corners[1],corners[2],corners[3]].map(([px,py],i)=><path key={i} d={`M${px} ${py+6}v27`} stroke="#3B504B" strokeWidth="4" strokeLinecap="round"/>)}
    <polygon points={polygon([corners[1],corners[2],[corners[2][0],corners[2][1]+6],[corners[1][0],corners[1][1]+6]])} fill="#96784f"/>
    <polygon points={polygon([corners[2],corners[3],[corners[3][0],corners[3][1]+6],[corners[2][0],corners[2][1]+6]])} fill="#aa8d61"/>
    <polygon points={polygon(corners)} fill="#B79A6C"/>
    {Array.from({length:64},(_,i)=>{const f=i%8,r=Math.floor(i/8);return <polygon key={i} points={polygon([project(f,r),project(f+1,r),project(f+1,r+1),project(f,r+1)])} fill={(f+r)%2===0?"#EEEAE0":"#789176"}/>;})}
    {pieces.map(piece=>{const [px,py]=squarePosition(piece.square);const step=moves.findIndex((_,i)=>boardFrames[i][piece.square]!==boardFrames[i+1][piece.square]);const [tx,ty]=squarePosition(boardFrames[boardFrames.length-1][piece.square]);return <g key={piece.square} transform={`translate(${px} ${py})`}><g className={step<0?undefined:styles[`chessMove${step}`]} style={{"--mx":`${tx-px}px`,"--my":`${ty-py}px`} as CSSProperties}><ChessPiece kind={piece.kind} white={piece.white}/></g></g>;})}

  </g>;
}

function Tree({ x, y }: { x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`}><path d="M0 0V-65" stroke="#3B504B" strokeWidth="5" /><ellipse cy="-72" rx="25" ry="40" fill="#789176" /><ellipse cx="-9" cy="-82" rx="14" ry="25" fill="#D1DED5" opacity=".55" /></g>;
}

function Scene({ mobile }: { mobile: boolean }) {
  const w = mobile ? 600 : 1440;
  const h = mobile ? 750 : 600;
  const zones = mobile ? [[20, 205], [155, 12], [342, 205]] : [[35, 65], [580, 25], [1120, 65]];
  const center = mobile ? [300, 535] : [720, 465];
  const chess = mobile ? [65, 610] : [105, 425];
  const chessScale = mobile ? .85 : 1;
  // Distribute each group by distance along its half of the same oval.
  const rx = mobile ? 193 : 286;
  const ry = 108;
  const arc = Array.from({ length: 361 }, (_, i) => {
    const angle = -Math.PI / 2 + Math.PI * i / 360;
    return { x: rx * Math.cos(angle), y: ry * Math.sin(angle) };
  });
  const distances = [0];
  for (let i = 1; i < arc.length; i++) {
    distances.push(distances[i - 1] + Math.hypot(arc[i].x - arc[i - 1].x, arc[i].y - arc[i - 1].y));
  }
  const target = (right: boolean, slot: number) => {
    const distance = distances[distances.length - 1] * (slot + 0.5) / 10;
    const i = distances.findIndex(value => value >= distance);
    const t = (distance - distances[i - 1]) / (distances[i] - distances[i - 1]);
    const x = arc[i - 1].x + (arc[i].x - arc[i - 1].x) * t;
    const y = arc[i - 1].y + (arc[i].y - arc[i - 1].y) * t;
    return [center[0] + (right ? x : -x), center[1] + y];
  };
  let men = 0, women = 0;
  const people: PersonData[] = zones.flatMap(([x,y], zone) => [0,1,2,3].map(i => {
    const woman = (zone === 2 || zone === 1) && i >= 2;
    const px = x + (zone === 0 ? [43,106,174,237][i] : 35+i*65) * (mobile ? .85 : 1);
    const py = y + (zone === 0 ? [164,184,164,184][i] : 218+(i%2)*22) * (mobile ? .85 : 1);
    const [tx,ty] = target(woman, woman ? women++ : men++);
    return {x:px,y:py,dx:tx-px,dy:ty-py,color:(zone+i)%5,skin:["#C99C79","#A97759","#E1B994","#B88B6C"][i],scale:mobile?.62:.88,book:zone===1&&(i===1||i===3),science:zone===1&&i===0?"research":zone===1&&i===2?"typing":undefined,hair:zone===1&&i===3?"bun":undefined,doppi:!woman&&i%2===0,woman,scarf:woman&&i%2===0,textile:woman&&i%2===1,older:zone===2&&i===3};
  }));
  const chessPlayers: PersonData[] = [true,false].map((white,i)=>{
    const [sx,sy]=chessSeat(white);
    const x=chess[0]+sx*chessScale,y=chess[1]+(sy+39)*chessScale;
    const [tx,ty]=target(false,men++);
    return {x,y,dx:tx-x,dy:ty-y,color:i,skin:i===0?"#C99C79":"#A97759",chess:true,doppi:true,facing:i===0?1:-1,scale:mobile?.57:.88};
  });
  const playground = mobile ? [480,650] : [1200,490];
  const childOffsets = [[-65,0],[0,-15],[65,0],[-42,38],[22,42],[78,30]];
  const children = childOffsets.map(([ox,oy],i)=>{
    const x=playground[0]+ox*(mobile?.75:1), y=playground[1]+oy*(mobile?.75:1);
    const [tx,ty] = target(true, women + i);
    return {x,y,dx:tx-x,dy:ty-y,color:[0,3,1,2,4,3][i],skin:["#C99C79","#E1B994","#A97759"][i%3],scale:mobile?.62:.88};
  });
  const ballMotion = Object.fromEntries(children.map((child,i)=>[`--p${i}`,`${child.x-playground[0]}px, ${child.y-playground[1]-5}px`]));
  return <svg shapeRendering="geometricPrecision" aria-hidden="true" focusable="false" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className={mobile ? styles.mobile : styles.desktop}>
    <rect width={w} height={h} className={styles.sky} />
    <path d={`M0 ${h*.36} Q${w*.25} ${h*.23} ${w*.5} ${h*.38} T${w} ${h*.34} V${h}H0Z`} className={styles.land} />
    {mobile ? <g fill="none" stroke="#D0C2AA" strokeWidth="10" strokeLinecap="round"><path d="M139 190 Q90 280 100 395 Q110 455 155 490"/><path d="M441 190 Q510 280 500 395 Q490 455 445 490"/><path d="M300 392 V448"/></g> : zones.map(([x,y],i)=><path key={i} d={`M${x+(mobile?119:140)} ${y+(mobile?175:210)} Q${x+(mobile?119:140)} ${center[1]} ${center[0]} ${center[1]}`} stroke="#D0C2AA" strokeWidth={mobile?15:40} fill="none" />)}
    <g transform={`translate(${zones[0].join(" ")}) scale(${mobile?.85:1})`}>
      <rect x="0" y="58" width="280" height="150" rx="26" fill="#789176" />
      <rect x="12" y="70" width="256" height="126" rx="16" fill="none" stroke="#EEEAE0" strokeWidth="2" />
      <path d="M12 116H-3V150H12M268 116H283V150H268" fill="none" stroke="#EEEAE0" strokeWidth="2"/><path d="M140 70V196M12 110H45V156H12M268 110H235V156H268" fill="none" stroke="#EEEAE0" strokeWidth="2" /><circle cx="140" cy="133" r="26" fill="none" stroke="#EEEAE0" strokeWidth="2" />
      <g className={styles.ball}><circle cx="100" cy="177" r="9" fill="#EEEAE0" stroke="#34566A" /><path d="m100 172 5 4-2 5h-6l-2-5Z" fill="#34566A" /></g>

    </g>
    <g transform={`translate(${zones[1].join(" ")}) scale(${mobile?.85:1})`}>
      <path d="M0 50H280V185H0Z" fill="#D0C2AA"/><path d="M-8 50H288L270 35H10Z" fill="#34566A"/>
      {Array.from({length:6},(_,i)=><g key={i}><rect x={13+i*43} y="65" width="32" height="92" fill="#34566A"/><path d={`M${29+i*43} 65V157`} stroke="#D1DED5" strokeWidth="2"/><path d={`M${13+i*43} 110h32`} stroke="#D1DED5" strokeWidth="2"/></g>)}
      <rect x="116" y="145" width="48" height="40" fill="#3B504B"/><path d="M105 185H175L187 196H93Z" fill="#B79A6C"/>
      <g transform="translate(75 205)"><path d="M-25 0H25M-20 0V24M20 0V24" stroke="#96784f" strokeWidth="5"/><path d="M-12 -4H14M8 -5Q23 -25 3 -34" stroke="#34566A" strokeWidth="5" fill="none"/><path d="M-5 -39L8 -32 -2 -17 -15 -24Z" fill="#EEEAE0" stroke="#34566A" strokeWidth="2"/><path d="M-15 -12H8" stroke="#34566A" strokeWidth="3"/><rect x="15" y="-5" width="10" height="5" rx="1" fill="#EEEAE0"/></g>
      <g transform="translate(205 205)"><path d="M-25 0H25M-20 0V24M20 0V24" stroke="#96784f" strokeWidth="5"/><path d="M-17 -26H17L15 -5H-15Z" fill="#34566A"/><path d="M-14 -23H14L12 -8H-12Z" fill="#D1DED5"/><path d="M-15 -5H15L23 0H-23Z" fill="#789176"/><path d="M-12 -3H12M-8 -1H8" stroke="#34566A" strokeWidth=".8"/><path d="M-10 -19H10M-10 -15H5" stroke="#789176" strokeWidth="1"/></g>
    </g>
    <g transform={`translate(${zones[2].join(" ")}) scale(${mobile?.85:1})`}>
      <rect x="0" y="72" width="280" height="120" fill="#D0C2AA"/><path d="M90 72Q90 28 140 12Q190 28 190 72Z" fill="#387D80"/><path d="M140 12V72M115 29Q105 49 110 72M165 29Q175 49 170 72" stroke="#D1DED5" fill="none" strokeWidth="2"/>
      {[20,110,200].map(x=><g key={x}><path d={`M${x} 192V120Q${x+30} 78 ${x+60} 120V192Z`} fill="#34566A"/><path d={`M${x+8} 120l22 -22 22 22 -22 22Z`} stroke="#B79A6C" fill="none" strokeWidth="2"/></g>)}
      <path d="M0 79H280" stroke="#387D80" strokeWidth="7"/>
      <g transform="translate(200 206)"><rect width="75" height="9" fill="#B79A6C"/><path d="M5 9V30M70 9V30" stroke="#3B504B" strokeWidth="4"/>{[12,37,62].map(x=><g key={x}><ellipse cx={x} cy="-5" rx="10" ry="5" fill="#387D80"/><path d={`M${x-6} -5h12`} stroke="#EEEAE0"/></g>)}</g>
    </g>
    <Tree x={mobile?20:490} y={mobile?350:220}/><Tree x={mobile?575:1010} y={mobile?350:230}/>
    <path d={mobile?"M165 680 Q180 655 195 638":"M230 505 Q340 535 459 520"} stroke="#D0C2AA" strokeWidth={mobile?10:18} strokeLinecap="round" fill="none"/>
    <g transform={`translate(${center.join(" ")})`}><ellipse rx={mobile?205:300} ry="120" fill="#D0C2AA"/><ellipse rx={mobile?193:286} ry="108" className={styles.plaza}/></g>
    <ChessChair x={chess[0]} y={chess[1]} scale={chessScale} white={false}/>
    <Person person={chessPlayers[1]} index={13}/>
    <ChessArea x={chess[0]} y={chess[1]} scale={chessScale}/>
    <ChessChair x={chess[0]} y={chess[1]} scale={chessScale} white/>
    <Person person={chessPlayers[0]} index={12}/>
    <g transform={`translate(${playground.join(" ")})`}>
      <ellipse cy="12" rx={mobile?85:108} ry={mobile?35:48} fill="#789176" opacity=".22"/>
      <g className={styles.kidsBall} style={ballMotion as CSSProperties}><circle r="6" fill="#EEEAE0" stroke="#34566A" strokeWidth="1.5"/><path d="m0 -4 4 3-2 4h-4l-2-4Z" fill="#387D80"/></g>
    </g>
    {children.map((person,i)=><Child key={`child-${i}`} person={person} index={i}/>)}
    {people.map((person,i)=><Person key={i} person={person} index={i}/>)}
    <g transform={`translate(${center.join(" ")})`}> <g className={styles.identity}><text textAnchor="middle" y="13" fill="#34566A" fontSize={mobile?38:52} fontWeight="700" letterSpacing="-2">UzDe.</text></g> </g>
  </svg>;
}

export default function EventsCommunityAnimation({ locale }: { locale: SupportedEventLocale }) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [cycle, setCycle] = useState(0);
  useEffect(()=>{
    const node=ref.current;
    if (!node) return;
    const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:0.01});
    observer.observe(node);
    const media=window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync=()=>setReduced(media.matches);
    sync(); media.addEventListener("change",sync);
    return ()=>{observer.disconnect();media.removeEventListener("change",sync);};
  },[]);
  const uz=locale==="uz";
  return <figure ref={ref} className={styles.figure} data-running={visible&&!paused&&!reduced}>
    <div key={cycle} role="img" aria-label={uz?"Sport, ilm-fan va madaniyat vakillari umumiy maydonda birlaşadi.":"Menschen aus Sport, Wissenschaft und Kultur begegnen sich auf einem gemeinsamen Platz."}>
      <Scene mobile={false}/><Scene mobile />
    </div>
    <figcaption className={styles.caption}><span>{uz?"Hamjamiyat ǵoyasining konseptual tasviri":"Konzeptionelle Darstellung der Gemeinschaft"}</span><div className={styles.controls}>
      <button type="button" disabled={reduced} onClick={()=>setPaused(p=>!p)}>{paused?(uz?"Davom ettiriş":"Fortsetzen"):(uz?"Töxtatiş":"Pause")}</button>
      <button type="button" disabled={reduced} onClick={()=>{setCycle(c=>c+1);setPaused(false);}}>{uz?"Qayta ijro":"Neu starten"}</button>
    </div></figcaption>
  </figure>;
}
