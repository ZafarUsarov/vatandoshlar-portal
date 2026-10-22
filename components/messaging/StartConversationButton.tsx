"use client";

import { useState } from "react";
import { MessageSquareText } from "lucide-react";
import { useRouter } from "@/i18n/navigation";

export default function StartConversationButton({kind,listingId,de=false,fullWidth=false}:{kind:"market"|"travel";listingId:string;de?:boolean;fullWidth?:boolean}) {
 const router=useRouter();const [busy,setBusy]=useState(false);const [error,setError]=useState(false);
 async function start(){setBusy(true);setError(false);try{
  const response=await fetch('/api/messages/conversations',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({kind,listingId})});
  if(response.status===401){router.push('/id/login');return;}
  if(!response.ok)throw new Error('Failed');
  router.push('/account/messages');
 }catch{setError(true);}finally{setBusy(false);}}
 return <div><button type="button" onClick={()=>void start()} disabled={busy} className={`whitespace-nowrap text-sm sm:text-base inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800 disabled:opacity-50 ${fullWidth ? "w-full" : ""}`}><MessageSquareText aria-hidden="true" className="h-5 w-5" />{de?'Nachricht schreiben':'Xabar yozish'}</button>{error&&<p role="alert" className="mt-2 text-sm text-red-600">{de?'Unterhaltung konnte nicht gestartet werden':'Suhbat ochilmadi'}</p>}</div>;
}
