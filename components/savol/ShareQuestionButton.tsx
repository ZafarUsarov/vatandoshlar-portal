"use client";
import { useState } from "react";
import { Share2, Check } from "lucide-react";
export default function ShareQuestionButton({locale}:{locale:"uz"|"de"}){
 const [copied,setCopied]=useState(false);
 async function share(){const url=window.location.href;try{if(navigator.share){await navigator.share({url});return;}await navigator.clipboard.writeText(url);setCopied(true);}catch{/* Browser denied sharing or user cancelled. */}}
 return <button type="button" onClick={()=>void share()} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold transition hover:border-emerald-400 hover:bg-emerald-50 dark:border-slate-700 dark:hover:bg-slate-800" aria-label={locale==="de"?"Frage teilen":"Savolni ulashish"}>{copied?<Check size={16}/>:<Share2 size={16}/>} {copied?(locale==="de"?"Link kopiert":"Havola nusxalandi"):(locale==="de"?"Teilen":"Ulashish")}</button>;
}
