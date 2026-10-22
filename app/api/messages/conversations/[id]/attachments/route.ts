import { NextResponse } from "next/server";
import { notifyConversationRecipient } from "@/lib/messaging/message-email-notification";
import { randomUUID } from "node:crypto";
import { getCurrentPublicUser } from "@/lib/auth/user";
import { getDb } from "@/lib/db";
import { validId } from "@/lib/messaging/messaging-repository";
import { validateAttachment, MAX_ATTACHMENTS } from "@/lib/messaging/message-attachment-validation";
import { putAttachment, deleteAttachment } from "@/lib/messaging/message-attachment-storage";

export const runtime = "nodejs";
export async function POST(request: Request, {params}: {params:Promise<{id:string}>}) {
 const user = await getCurrentPublicUser();
 if (!user) return NextResponse.json({error:"Unauthorized"},{status:401});
 const {id}=await params;
 if (!validId(id)) return NextResponse.json({error:"Invalid conversation"},{status:400});
 const length=Number(request.headers.get("content-length") || "0");
 if (length > 76*1024*1024) return NextResponse.json({error:"Payload too large"},{status:413});
 const form=await request.formData().catch(()=>null);
 if (!form) return NextResponse.json({error:"Invalid form"},{status:400});
 const files=form.getAll("files");
 const body=String(form.get("body") ?? "").trim();
 if (!files.length || files.length>MAX_ATTACHMENTS || body.length>2000 || files.some(f=>!(f instanceof File))) return NextResponse.json({error:"Invalid input"},{status:400});
 const db=getDb();
 const participant=await db.query(`SELECT 1 FROM conversations WHERE id=$1::bigint AND (starter_user_id=$2::bigint OR owner_user_id=$2::bigint)`,[id,user.user.id]);
 if (!participant.rowCount) return NextResponse.json({error:"Not found"},{status:404});
 const rate=await db.query<{count:string}>(`SELECT count(*)::text AS count FROM messages WHERE sender_user_id=$1::bigint AND created_at>now()-interval '1 minute'`,[user.user.id]);
 if (Number(rate.rows[0]?.count)>19) return NextResponse.json({error:"Too many messages"},{status:429});
 const checked=[];
 for(const f of files) { const v=await validateAttachment(f as File); if(!v) return NextResponse.json({error:"Unsupported or invalid file"},{status:400}); checked.push(v); }
 const uploaded:string[]=[];
 let client;
 try {
   for (const f of checked) {const key=`private/messages/${id}/${randomUUID()}`;await putAttachment(key,f.bytes,f.mime);uploaded.push(key);}
   client=await db.connect();await client.query("BEGIN");
   const msg=await client.query<{id:string}>(`INSERT INTO messages(conversation_id,sender_user_id,body) SELECT id,$2::bigint,$3 FROM conversations WHERE id=$1::bigint AND (starter_user_id=$2::bigint OR owner_user_id=$2::bigint) RETURNING id::text`,[id,user.user.id,body || "📎"]);
   if(!msg.rows[0]) throw new Error("Conversation unavailable");
   for(let i=0;i<checked.length;i++){const f=checked[i];await client.query(`INSERT INTO message_attachments(message_id,storage_key,original_filename,mime_type,file_size,image_width,image_height) VALUES($1::bigint,$2,$3,$4,$5,$6,$7)`,[msg.rows[0].id,uploaded[i],f.name,f.mime,f.bytes.length,f.width,f.height]);}
   await client.query(`UPDATE conversations SET updated_at=now() WHERE id=$1::bigint`,[id]);
   await client.query("COMMIT");
   // Email delivery must never turn a successfully committed upload into a failed request.
   await notifyConversationRecipient(id, user.user.id).catch(error => {
     console.error("Messaging notification error", error instanceof Error ? error.message : "unknown error");
   });
   return NextResponse.json({ok:true},{status:201});
 } catch {
   if(client) await client.query("ROLLBACK").catch(()=>{});
   await Promise.allSettled(uploaded.map(key=>deleteAttachment(key)));
   return NextResponse.json({error:"Upload failed"},{status:500});
 } finally {client?.release();}
}
