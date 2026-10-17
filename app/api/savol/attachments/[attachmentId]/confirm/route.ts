import { NextResponse } from 'next/server';
import { getCurrentPublicUser } from '@/lib/auth/user';
import { getAttachmentById, markReady } from '@/lib/savol/savol-attachment-repository';
import { verifyMarketImageObject } from '@/lib/market/market-r2';
import { matchesSignature } from '@/lib/savol/savol-attachment-policy';
export const runtime='nodejs';
export async function POST(_request:Request,{params}:{params:Promise<{attachmentId:string}>}){
 const user=await getCurrentPublicUser();if(!user)return NextResponse.json({error:'Unauthorized'},{status:401});
 const {attachmentId}=await params;const a=await getAttachmentById(attachmentId,user.user.id);
 if(!a)return NextResponse.json({error:'Not found'},{status:404});
 if(a.status==='ready')return NextResponse.json({ok:true});
 try{const obj=await verifyMarketImageObject(a.storageKey);
 if(obj.bytes!==a.byteSize||obj.type!==a.contentType||!matchesSignature(obj.signature,a.contentType))return NextResponse.json({error:'File mismatch'},{status:422});
 return NextResponse.json({ok:await markReady(attachmentId,user.user.id)})}catch{return NextResponse.json({error:'Storage unavailable'},{status:503})}
}
