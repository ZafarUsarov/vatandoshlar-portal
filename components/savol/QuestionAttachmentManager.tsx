'use client';
import { useState } from 'react';
type Attachment={id:string;fileName:string;contentType:string;byteSize:number};
export default function QuestionAttachmentManager({questionId,initial,locale}:{questionId:string;initial:Attachment[];locale:'uz'|'de'}){
 const [items,setItems]=useState(initial);const [busy,setBusy]=useState(false);const [error,setError]=useState('');const de=locale==='de';
 async function upload(file:File){setError('');setBusy(true);
 let id:string|undefined;
 try{
 if(items.length>=3||file.size>5*1024*1024||file.size<1||!['image/jpeg','image/png','image/webp','application/pdf'].includes(file.type))throw Error(de?'Maximal 3 Dateien à 5 MB (JPG, PNG, WebP, PDF).':'Ko‘pi bilan 3 ta, har biri 5 MB (JPG, PNG, WebP, PDF).');
 const res=await fetch(`/api/savol/questions/${questionId}/attachments`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({fileName:file.name,contentType:file.type,byteSize:file.size})});
 const data=await res.json();if(!res.ok)throw Error(data.error||'Upload failed');id=data.attachmentId;
 const uploaded=await fetch(`/api/savol/attachments/${id}/upload`,{method:'PUT',headers:{'Content-Type':file.type},body:file});if(!uploaded.ok)throw Error((await uploaded.json()).error||'Upload failed');
 const confirmed=await fetch(`/api/savol/attachments/${id}/confirm`,{method:'POST'});if(!confirmed.ok||(await confirmed.json()).ok!==true)throw Error('Confirmation failed');
 setItems(old=>[...old,{id:id!,fileName:file.name,contentType:file.type,byteSize:file.size}]);
 }catch(e){if(id)await fetch(`/api/savol/attachments/${id}`,{method:'DELETE'}).catch(()=>{});setError(e instanceof Error?e.message:'Upload failed')}finally{setBusy(false)}
 }
 async function remove(id:string){setBusy(true);setError('');try{const res=await fetch(`/api/savol/attachments/${id}`,{method:'DELETE'});if(!res.ok)throw Error('Delete failed');setItems(old=>old.filter(x=>x.id!==id))}catch(e){setError(e instanceof Error?e.message:'Delete failed')}finally{setBusy(false)}}
 return <section aria-label={de ? "Anhänge" : "Ilovalar"} className="space-y-3 border-t border-slate-200 pt-5 dark:border-slate-700">
  <div>
    <h3 className="font-semibold">{de ? "Anhänge" : "Ilovalar"} ({items.length}/3)</h3>
    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">JPG, PNG, WebP, PDF · {de ? "max. 5 MB pro Datei" : "har biri 5 MB gacha"}</p>
  </div>
  {items.length > 0 && <ul className="space-y-2">
    {items.map(a => <li key={a.id} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-800/70">
      {a.contentType.startsWith('image/') ?
        // This image is served through the authenticated attachment endpoint; Next Image optimization is not appropriate for this small thumbnail.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={`/api/savol/attachments/${a.id}`} alt={a.fileName} className="h-20 w-20 shrink-0 rounded-lg border border-slate-200 bg-white object-cover dark:border-slate-700" loading="lazy" /> :
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-white text-xs font-bold text-red-700 dark:bg-slate-900 dark:text-red-300" aria-label="PDF">PDF</div>}
      <div className="min-w-0 flex-1">
        <a href={`/api/savol/attachments/${a.id}`} target="_blank" rel="noopener noreferrer" className="block truncate text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-400" title={a.fileName}>{a.fileName}</a>
        <span className="text-xs text-slate-500 dark:text-slate-400">{(a.byteSize / 1024).toFixed(0)} KB</span>
      </div>
      <button type="button" disabled={busy} onClick={() => void remove(a.id)} className="shrink-0 rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium hover:bg-slate-100 disabled:opacity-50 dark:border-slate-600 dark:hover:bg-slate-700">{de ? "Entfernen" : "O‘chirish"}</button>
    </li>)}
  </ul>}
  <label className="inline-flex cursor-pointer items-center rounded-xl border border-dashed border-emerald-600 px-4 py-2.5 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50 dark:text-emerald-400 dark:hover:bg-emerald-950/30">
    {busy ? (de ? "Wird hochgeladen…" : "Yuklanmoqda…") : (de ? "Datei hinzufügen" : "Fayl qo‘shish")}
    <input type="file" accept="image/jpeg,image/png,image/webp,application/pdf" className="sr-only" disabled={busy || items.length >= 3} onChange={e => {const f=e.target.files?.[0];if(f)void upload(f);e.target.value='';}} />
  </label>
  <p className="text-xs text-slate-500 dark:text-slate-400">{de ? "Anhänge werden sofort hochgeladen oder entfernt. Textänderungen speichern Sie mit der Schaltfläche unten." : "Ilovalar darhol yuklanadi yoki o‘chiriladi. Matndagi o‘zgarishlarni pastdagi tugma orqali saqlang."}</p>
  {error && <p role="alert" className="text-sm text-red-600 dark:text-red-400">{error}</p>}
 </section>;
}
