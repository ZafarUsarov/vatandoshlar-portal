import { NextResponse } from "next/server";
import { getMarketImageObject } from "@/lib/market/market-r2";
export const runtime = "nodejs";
export async function GET(_request:Request,{params}:{params:Promise<{name:string}>}) {
  const {name} = await params;
  if(!/^[a-f0-9-]{36}\.(jpg|png|webp)$/.test(name)) return new Response(null,{status:404});
  try {
    const bytes = await getMarketImageObject(`places/logos/${name}`);
    if(!bytes) return new Response(null,{status:404});
    const type = name.endsWith(".png") ? "image/png" : name.endsWith(".webp") ? "image/webp" : "image/jpeg";
    return new NextResponse(Buffer.from(bytes),{headers:{"Content-Type":type,"Cache-Control":"public, max-age=31536000, immutable","X-Content-Type-Options":"nosniff"}});
  } catch { return new Response(null,{status:404}); }
}
