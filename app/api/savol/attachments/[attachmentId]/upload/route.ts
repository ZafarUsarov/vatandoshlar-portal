import { NextResponse } from 'next/server';
import { getCurrentPublicUser } from '@/lib/auth/user';
import { getAttachmentById } from '@/lib/savol/savol-attachment-repository';
import { validAttachment, matchesSignature, MAX_ATTACHMENT_BYTES } from '@/lib/savol/savol-attachment-policy';
import { putMarketImageObject } from '@/lib/market/market-r2';
export const runtime='nodejs';
export async function PUT(request:Request,{params}:{params:Promise<{attachmentId:string}>}){
 const user=await getCurrentPublicUser();if(!user)return NextResponse.json({error:'Unauthorized'},{status:401});
 const {attachmentId}=await params;const a=await getAttachmentById(attachmentId,user.user.id);
 if(!a||a.status!=='pending')return NextResponse.json({error:'Not found'},{status:404});
 if(request.headers.get('content-type')!==a.contentType)return NextResponse.json({error:'Wrong type'},{status:400});
 if(Number(request.headers.get('content-length'))>MAX_ATTACHMENT_BYTES)return NextResponse.json({error:'Too large'},{status:413});
 if(!request.body)return NextResponse.json({error:'Empty file'},{status:400});
 const reader=request.body.getReader();const chunks:Uint8Array[]=[];let length=0;
 try{while(true){const {done,value}=await reader.read();if(done)break;length+=value.byteLength;if(length>MAX_ATTACHMENT_BYTES){await reader.cancel();return NextResponse.json({error:'Too large'},{status:413})}chunks.push(value)}}catch{return NextResponse.json({error:'Invalid upload'},{status:400})}
 const bytes=new Uint8Array(length);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length}
 if(!validAttachment(a.contentType,length)||length!==a.byteSize||!matchesSignature(bytes,a.contentType))return NextResponse.json({error:'Invalid file contents'},{status:422});
 try{await putMarketImageObject(a.storageKey,a.contentType,bytes);return NextResponse.json({ok:true})}catch{return NextResponse.json({error:'Storage unavailable'},{status:503})}
}
