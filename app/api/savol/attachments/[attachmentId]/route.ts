import { NextResponse } from 'next/server';
import { getCurrentPublicUser } from '@/lib/auth/user';
import { getAttachmentById, getOwnAttachmentById, removeAttachment } from '@/lib/savol/savol-attachment-repository';
import { signMarketImageGet, deleteMarketImageObject } from '@/lib/market/market-r2';
export const runtime='nodejs';
export async function GET(_request:Request,{params}:{params:Promise<{attachmentId:string}>}){
 const {attachmentId}=await params;const a=await getAttachmentById(attachmentId);
 if(!a||a.status!=='ready')return NextResponse.json({error:'Not found'},{status:404});
 try{const url=await signMarketImageGet(a.storageKey);return NextResponse.redirect(url,{status:307,headers:{'Cache-Control':'private, no-store','Referrer-Policy':'no-referrer','X-Content-Type-Options':'nosniff'}})}catch{return NextResponse.json({error:'Storage unavailable'},{status:503})}
}
export async function DELETE(_request:Request,{params}:{params:Promise<{attachmentId:string}>}){
 const user=await getCurrentPublicUser();if(!user)return NextResponse.json({error:'Unauthorized'},{status:401});
 const {attachmentId}=await params;const a=await getOwnAttachmentById(attachmentId,user.user.id);
 if(!a)return NextResponse.json({error:'Not found'},{status:404});
 try{await deleteMarketImageObject(a.storageKey);const ok=await removeAttachment(attachmentId,user.user.id);return NextResponse.json({ok},{status:ok?200:409})}catch{return NextResponse.json({error:'Delete failed'},{status:503})}
}
