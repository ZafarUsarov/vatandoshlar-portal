import { getDb } from '@/lib/db';
export type AnswerAttachment = { id:string;answerId:string;storageKey:string;fileName:string;contentType:string;byteSize:number;status:'pending'|'ready' };
const validId=(id:string)=>/^[1-9]\d{0,18}$/.test(id);
const select=`SELECT a.id::text,a.answer_id::text,a.storage_key,a.file_name,a.content_type,a.byte_size,a.status FROM answer_attachments a JOIN answers ans ON ans.id=a.answer_id JOIN questions q ON q.id=ans.question_id`;
type Row={id:string;answer_id:string;storage_key:string;file_name:string;content_type:string;byte_size:number;status:'pending'|'ready'};
const map=(r:Row):AnswerAttachment=>({id:r.id,answerId:r.answer_id,storageKey:r.storage_key,fileName:r.file_name,contentType:r.content_type,byteSize:r.byte_size,status:r.status});
export async function listAnswerAttachments(ids:string[]):Promise<Map<string,AnswerAttachment[]>>{
 const result=new Map<string,AnswerAttachment[]>();const safe=ids.filter(validId);if(!safe.length)return result;
 const rows=await getDb().query<Row>(`${select} WHERE a.answer_id=ANY($1::bigint[]) AND a.status='ready' AND ans.status='published' AND q.status='published' ORDER BY a.id`,[safe]);
 for(const row of rows.rows){const a=map(row);result.set(a.answerId,[...(result.get(a.answerId)??[]),a])}return result;
}
export async function getAnswerAttachment(id:string,userId?:string):Promise<AnswerAttachment|null>{
 if(!validId(id))return null;
 const r=await getDb().query<Row>(`${select} WHERE a.id=$1::bigint AND ((a.status='ready' AND ans.status='published' AND q.status='published') OR (ans.author_user_id::text=$2 AND ans.status='published' AND q.status='published'))`,[id,userId??null]);return r.rows[0]?map(r.rows[0]):null;
}
export async function reserveAnswerAttachment(input:{answerId:string;userId:string;key:string;name:string;type:string;size:number}){
 if(!validId(input.answerId)||!validId(input.userId))return null;
 const r=await getDb().query<{id:string}>(`INSERT INTO answer_attachments(answer_id,storage_key,file_name,content_type,byte_size)
 SELECT ans.id,$3,$4,$5,$6 FROM answers ans JOIN questions q ON q.id=ans.question_id
 WHERE ans.id=$1::bigint AND ans.author_user_id=$2::bigint AND ans.status='published' AND q.status='published'
 RETURNING id::text`,[input.answerId,input.userId,input.key,input.name,input.type,input.size]);
 return r.rows[0]?getAnswerAttachment(r.rows[0].id,input.userId):null;
}
export async function markAnswerAttachmentReady(id:string,userId:string){
 if(!validId(id)||!validId(userId))return false;
 const r=await getDb().query(`UPDATE answer_attachments a SET status='ready' FROM answers ans JOIN questions q ON q.id=ans.question_id WHERE a.id=$1::bigint AND ans.id=a.answer_id AND ans.author_user_id=$2::bigint AND ans.status='published' AND q.status='published' RETURNING a.id`,[id,userId]);return r.rowCount===1;
}
export async function deleteAnswerAttachment(id:string,userId:string){
 if(!validId(id)||!validId(userId))return false;
 const r=await getDb().query(`DELETE FROM answer_attachments a USING answers ans WHERE a.id=$1::bigint AND ans.id=a.answer_id AND ans.author_user_id=$2::bigint RETURNING a.id`,[id,userId]);return r.rowCount===1;
}

export async function getOwnAnswerAttachment(id:string,userId:string):Promise<AnswerAttachment|null>{
 if(!validId(id)||!validId(userId))return null;
 const r=await getDb().query<Row>(`${select} WHERE a.id=$1::bigint AND ans.author_user_id=$2::bigint AND ans.status='published' AND q.status='published'`,[id,userId]);return r.rows[0]?map(r.rows[0]):null;
}
