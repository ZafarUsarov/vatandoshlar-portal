import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { getCurrentAdmin } from "@/lib/auth/admin";
import { putMarketImageObject } from "@/lib/market/market-r2";
export const runtime = "nodejs";
const types: Record<string,string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };
function signature(b: Uint8Array,t:string) {
  if(t === "image/jpeg") return b.length >= 3 && b[0]===255 && b[1]===216 && b[2]===255;
  if(t === "image/png") return b.length >= 8 && [137,80,78,71,13,10,26,10].every((n,i)=>b[i]===n);
  return t === "image/webp" && b.length >= 12 && String.fromCharCode(...b.slice(0,4)) === "RIFF" && String.fromCharCode(...b.slice(8,12)) === "WEBP";
}
export async function POST(request:Request) {
  if (!(await getCurrentAdmin())) return NextResponse.json({error:"Unauthorized"},{status:401});
  if(Number(request.headers.get("content-length")) > 5*1024*1024+65536) return NextResponse.json({error:"Too large"},{status:413});
  let form:FormData;
  try { form = await request.formData(); } catch { return NextResponse.json({error:"Invalid upload"},{status:400}); }
  const file = form.get("logo");
  if(!(file instanceof File) || !types[file.type] || file.size === 0 || file.size > 5*1024*1024) return NextResponse.json({error:"Invalid image"},{status:400});
  const bytes = new Uint8Array(await file.arrayBuffer());
  if(!signature(bytes,file.type)) return NextResponse.json({error:"Invalid image signature"},{status:400});
  const name = `${randomUUID()}.${types[file.type]}`;
  try { await putMarketImageObject(`places/logos/${name}`,file.type,bytes); }
  catch { return NextResponse.json({error:"Storage failed"},{status:503}); }
  return NextResponse.json({path:`/api/places/logos/${name}`});
}
