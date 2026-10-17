import { getDb } from '@/lib/db';
export type QuestionAttachment = { id:string; questionId:string; storageKey:string; fileName:string; contentType:string; byteSize:number; status:'pending'|'ready' };
const validId = (v:string) => /^[1-9]\d{0,18}$/.test(v);
export async function getQuestionAttachments(questionId:string, userId?:string):Promise<QuestionAttachment[]> {
 if(!validId(questionId)) return [];
 const r=await getDb().query<{id:string;question_id:string;storage_key:string;file_name:string;content_type:string;byte_size:number;status:'pending'|'ready'}>(`SELECT a.id::text, a.question_id::text, a.storage_key, a.file_name, a.content_type, a.byte_size, a.status
 FROM question_attachments a JOIN questions q ON q.id=a.question_id
 WHERE q.id=$1::bigint AND ((a.status='ready' AND q.status='published') OR (q.author_user_id::text=$2 AND q.status='published'))
 ORDER BY a.id`,[questionId,userId??null]);
 return r.rows.map(x=>({id:x.id,questionId:x.question_id,storageKey:x.storage_key,fileName:x.file_name,contentType:x.content_type,byteSize:x.byte_size,status:x.status}));
}
export async function getAttachmentById(id:string,userId?:string):Promise<QuestionAttachment|null>{
 if(!validId(id)) return null;
 const r=await getDb().query<{id:string;question_id:string;storage_key:string;file_name:string;content_type:string;byte_size:number;status:'pending'|'ready'}>(`SELECT a.id::text,a.question_id::text,a.storage_key,a.file_name,a.content_type,a.byte_size,a.status
 FROM question_attachments a JOIN questions q ON q.id=a.question_id
 WHERE a.id=$1::bigint AND ((a.status='ready' AND q.status='published') OR (q.author_user_id::text=$2 AND q.status='published'))`,[id,userId??null]);
 const x=r.rows[0];return x?{id:x.id,questionId:x.question_id,storageKey:x.storage_key,fileName:x.file_name,contentType:x.content_type,byteSize:x.byte_size,status:x.status}:null;
}
export async function getOwnAttachmentById(id:string,userId:string):Promise<QuestionAttachment|null>{
 if(!validId(id)||!validId(userId))return null;
 const r=await getDb().query<{id:string;question_id:string;storage_key:string;file_name:string;content_type:string;byte_size:number;status:'pending'|'ready'}>(`SELECT a.id::text,a.question_id::text,a.storage_key,a.file_name,a.content_type,a.byte_size,a.status
 FROM question_attachments a JOIN questions q ON q.id=a.question_id
 WHERE a.id=$1::bigint AND q.author_user_id=$2::bigint AND q.status='published'`,[id,userId]);
 const x=r.rows[0];return x?{id:x.id,questionId:x.question_id,storageKey:x.storage_key,fileName:x.file_name,contentType:x.content_type,byteSize:x.byte_size,status:x.status}:null;
}
export async function reserveAttachment(input:{questionId:string;userId:string;key:string;name:string;type:string;size:number}):Promise<QuestionAttachment|null>{
 if(!validId(input.questionId)||!validId(input.userId))return null;
 const r=await getDb().query<{id:string}>(`INSERT INTO question_attachments(question_id,storage_key,file_name,content_type,byte_size)
 SELECT q.id,$3,$4,$5,$6 FROM questions q WHERE q.id=$1::bigint AND q.author_user_id=$2::bigint AND q.status='published'
 AND (SELECT count(*) FROM question_attachments a WHERE a.question_id=q.id)<3 RETURNING id::text`,[input.questionId,input.userId,input.key,input.name,input.type,input.size]);
 return r.rows[0]?getAttachmentById(r.rows[0].id,input.userId):null;
}
export async function markReady(id:string,userId:string){
 if(!validId(id)||!validId(userId))return false;
 const r=await getDb().query(`UPDATE question_attachments a SET status='ready' FROM questions q WHERE a.id=$1::bigint AND q.id=a.question_id AND q.author_user_id=$2::bigint AND q.status='published' RETURNING a.id`,[id,userId]);return r.rowCount===1;
}
export async function removeAttachment(id:string,userId:string){
 if(!validId(id)||!validId(userId))return false;
 const r=await getDb().query(`DELETE FROM question_attachments a USING questions q WHERE a.id=$1::bigint AND q.id=a.question_id AND q.author_user_id=$2::bigint AND q.status='published' RETURNING a.id`,[id,userId]);return r.rowCount===1;
}
