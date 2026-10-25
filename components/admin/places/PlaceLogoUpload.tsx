"use client";
import { useState } from "react";
export default function PlaceLogoUpload({ initialPath, locale }: {initialPath:string;locale:"uz"|"de"}) {
 const [path,setPath]=useState(initialPath);const [busy,setBusy]=useState(false);const [error,setError]=useState("");
 async function upload(file:File) {
  setBusy(true);setError("");
  try { const data = new FormData();data.set("logo",file);const response=await fetch("/api/admin/places/logo",{method:"POST",body:data});if(!response.ok) throw new Error("Upload failed");const result:{path:string}=await response.json();setPath(result.path); }
  catch {setError(locale==="de"?"Upload fehlgeschlagen":"Yuklashda xatolik");}
  finally {setBusy(false);}
 }
 return <div className="space-y-2 md:col-span-2"><label className="block text-sm font-semibold">{locale==="de"?"Logo hochladen":"Logotip yuklash"}</label>
  <input type="hidden" name="logoPath" value={path}/><input type="file" accept="image/png,image/jpeg,image/webp" disabled={busy} onChange={e=>{const file=e.target.files?.[0];if(file) void upload(file);}} />
  {path && <div className="flex items-center gap-3"><img src={path} alt="Logo preview" className="h-20 w-40 object-contain"/><button type="button" onClick={()=>setPath("")} className="text-sm text-red-600">{locale==="de"?"Entfernen":"Olib tashlash"}</button></div>}
  {busy && <p role="status">{locale==="de"?"Wird hochgeladen...":"Yuklanmoqda..."}</p>}{error && <p role="alert" className="text-red-600">{error}</p>}
 </div>;
}
