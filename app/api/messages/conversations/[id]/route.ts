import { NextResponse } from "next/server";
import { notifyConversationRecipient } from "@/lib/messaging/message-email-notification";
import { getCurrentPublicUser } from "@/lib/auth/user";
import { getConversationMessages, markRead, sendMessage } from "@/lib/messaging/messaging-repository";

type Context = { params: Promise<{ id: string }> };
export async function GET(_request: Request, context: Context) {
  const user=await getCurrentPublicUser();
  if (!user) return NextResponse.json({error:"Unauthorized"},{status:401});
  const {id}=await context.params;
  const messages=await getConversationMessages(user.user.id,id);
  if (!messages) return NextResponse.json({error:"Not found"},{status:404});
  return NextResponse.json({messages},{headers:{"Cache-Control":"no-store"}});
}
export async function POST(request:Request,context:Context) {
  const user=await getCurrentPublicUser();
  if (!user) return NextResponse.json({error:"Unauthorized"},{status:401});
  const {id}=await context.params;
  const input:unknown=await request.json().catch(()=>null);
  const body=input && typeof input==="object" ? (input as Record<string,unknown>).body : null;
  if (typeof body!=="string" || body.trim().length<1 || body.trim().length>2000)
    return NextResponse.json({error:"Invalid message"},{status:400});
  const ok=await sendMessage(user.user.id,id,body);
  if (!ok) return NextResponse.json({error:"Not found"},{status:404});
  await notifyConversationRecipient(id, user.user.id).catch(error => {
    console.error("Messaging notification error", error instanceof Error ? error.message : "unknown error");
  });
  return NextResponse.json({ok:true},{status:201});
}

// Read receipts are explicit: listing/polling messages must never mark them as read.
export async function PATCH(_request: Request, context: Context) {
  const user = await getCurrentPublicUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await context.params;
  const messages = await getConversationMessages(user.user.id, id);
  if (messages === null) return NextResponse.json({ error: "Not found" }, { status: 404 });
  await markRead(user.user.id, id);
  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}
