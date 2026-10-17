import { randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import { getCurrentPublicUser } from '@/lib/auth/user';
import { reserveAnswerAttachment } from '@/lib/savol/answer-attachment-repository';
import { validAttachment } from '@/lib/savol/savol-attachment-policy';
import { consumeMarketImageUploadQuota } from '@/lib/market/market-image-rate-limit';
export const runtime='nodejs';
export async function POST(request:Request,{params}:{params:Promise<{answerId:string}>}){
 const user=await getCurrentPublicUser();if(!user)return NextResponse.json({error:'Unauthorized'},{status:401});
 const {answerId}=await params;
 if(!/^[1-9]\d{0,18}$/.test(answerId))return NextResponse.json({error:'Invalid answer'},{status:400});
 let data:unknown;try{data=await request.json()}catch{return NextResponse.json({error:'Invalid JSON'},{status:400})}
 if(!data||typeof data!=='object')return NextResponse.json({error:'Invalid input'},{status:400});
 const d=data as Record<string,unknown>;
 const type=typeof d.contentType==='string'?d.contentType:'';
 const size=typeof d.byteSize==='number'?d.byteSize:NaN;
 const name=typeof d.fileName==='string'?d.fileName.trim():'';
 if(!validAttachment(type,size)||!name||name.length>180||/[\x00-\x1f\x7f]/.test(name))return NextResponse.json({error:'Invalid file'},{status:400});
 try{if(!await consumeMarketImageUploadQuota(user.user.id))return NextResponse.json({error:'Upload limit reached'},{status:429})}catch{return NextResponse.json({error:'Unavailable'},{status:503})}
 const extension=({'image/jpeg':'jpg','image/png':'png','image/webp':'webp','application/pdf':'pdf'} as Record<string,string>)[type];
 try{const a=await reserveAnswerAttachment({answerId,userId:user.user.id,key:`savol/answers/${answerId}/${randomUUID()}.${extension}`,name,type,size});
 if(!a)return NextResponse.json({error:'Not permitted or limit reached'},{status:403});
 return NextResponse.json({attachmentId:a.id},{headers:{'Cache-Control':'no-store'}})}catch{return NextResponse.json({error:'Unable to reserve attachment'},{status:409})}
}
