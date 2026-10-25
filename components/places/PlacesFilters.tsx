"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Category = "restaurant" | "hotel" | "shop" | "service" | "organization" | "other";
const categories: { id: Category; uz: string; de: string; icon: Category }[] = [
  { id: "restaurant", uz: "Restoran va kafe", de: "Restaurant & Café", icon: "restaurant" },
  { id: "hotel", uz: "Mehmonxonalar", de: "Hotels", icon: "hotel" },
  { id: "shop", uz: "Do‘konlar", de: "Geschäfte", icon: "shop" },
  { id: "service", uz: "Xizmatlar", de: "Dienstleistungen", icon: "service" },
  { id: "organization", uz: "Tashkilotlar", de: "Organisationen", icon: "organization" },
  { id: "other", uz: "Boshqa", de: "Sonstige", icon: "other" },
];
function Icon({name, className=""}: {name:"search"|"pin"|"reset"|"chevron"|"grid";className?:string}) {
 const paths={search:<><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,pin:<><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,reset:<><path d="M3 11a9 9 0 1 1 3 7"/><path d="M3 4v7h7"/></>,chevron:<path d="m6 9 6 6 6-6"/>,grid:<><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>};
 return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={`h-5 w-5 shrink-0 ${className}`}>{paths[name]}</svg>;
}
function CategoryIcon({name}: {name: Category | "all"}) {
 const shapes = {
  all: <><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></>,
  restaurant: <><path d="M4 3v7a3 3 0 0 0 6 0V3M7 3v18M20 21V3c-4 2-5 7-5 11h5"/></>,
  hotel: <><path d="M3 21V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v16M2 21h20M9 21v-5h6v5M7 7h2M15 7h2M7 11h2M15 11h2"/></>,
  shop: <><path d="M3 10h18l-2-6H5l-2 6ZM5 10v11h14V10M9 21v-7h6v7"/></>,
  service: <><path d="M14.7 6.3a4 4 0 0 0-5 5L3 18l3 3 6.7-6.7a4 4 0 0 0 5-5l-3 3-3-3 3-3Z"/></>,
  organization: <><path d="M4 21V5l8-3 8 3v16M2 21h20M9 21v-5h6v5M8 8h1M15 8h1M8 12h1M15 12h1"/></>,
  other: <><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></>,
 };
 return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0">{shapes[name]}</svg>;
}
type CitySuggestion = { id: string; city: string; state: string; stateCode: string; postalCode: string | null };
export default function PlacesFilters({locale,q,category,location,locationId}:{locale:"uz"|"de";q:string;category:string;location:string;locationId:string}) {
 const router=useRouter();const [term,setTerm]=useState(q);const [cat,setCat]=useState(category);const [place,setPlace]=useState(location);const [selectedCityId,setSelectedCityId]=useState(locationId);const [locating,setLocating]=useState(false);const [message,setMessage]=useState("");const de=locale==="de";
 const [suggestions,setSuggestions]=useState<CitySuggestion[]>([]);
 const [suggestOpen,setSuggestOpen]=useState(false);
 const [activeSuggestion,setActiveSuggestion]=useState(-1);
 const suggestionRef=useRef<HTMLDivElement>(null);
 const initialized=useRef(false);
 useEffect(()=>{
  if(!suggestOpen || place.trim().length<2){return;}
  const controller=new AbortController();
  const timer=setTimeout(async()=>{
   try{const response=await fetch(`/api/places/city-suggestions?q=${encodeURIComponent(place.trim())}`,{signal:controller.signal});
    if(!response.ok)throw new Error('suggest');
    const result=await response.json() as {suggestions:CitySuggestion[]};
    setSuggestions(result.suggestions);setActiveSuggestion(-1);
   }catch{if(!controller.signal.aborted)setSuggestions([])}
  },180);
  return()=>{clearTimeout(timer);controller.abort()};
 },[place,suggestOpen]);
 const chooseCity=(item:CitySuggestion)=>{setPlace(`${item.city} (${item.state})`);setSelectedCityId(item.id);setSuggestOpen(false);setSuggestions([])};

 useEffect(()=>{
  if(!initialized.current){initialized.current=true;return;}
  const timer=setTimeout(()=>{
   const params=new URLSearchParams();
   if(term.trim())params.set("q",term.trim());
   if(cat)params.set("category",cat);
   if(place.trim())params.set("location",place.trim());if(selectedCityId)params.set("locationId",selectedCityId);
   router.replace(`/${locale}/places${params.size?`?${params.toString()}`:""}`,{scroll:false});
  },450);
  return()=>clearTimeout(timer);
 },[term,place,cat,selectedCityId,locale,router]);
 const locate=()=>{if(!navigator.geolocation){setMessage(de?"Standort ist nicht verfügbar.":"Joylashuv xizmati mavjud emas.");return;}setLocating(true);setMessage("");navigator.geolocation.getCurrentPosition(async position=>{try{const params=new URLSearchParams({lat:String(position.coords.latitude),lon:String(position.coords.longitude)});const response=await fetch(`/api/places/nearest-city?${params}`);if(!response.ok)throw new Error("location");const data=await response.json() as {id?:string;city?:string;state?:string};if(!data.city || !data.id)throw new Error("city");setPlace(`${data.city} (${data.state??""})`);setSelectedCityId(data.id);setSuggestOpen(false);setMessage(de?`Standort: ${data.city}`:`Joylashuv: ${data.city}`)}catch{setMessage(de?"Stadt konnte nicht bestimmt werden.":"Shaharni aniqlab bo‘lmadi.")}finally{setLocating(false)}},()=>{setLocating(false);setMessage(de?"Standortfreigabe nicht erteilt.":"Joylashuvga ruxsat berilmadi.")},{enableHighAccuracy:false,timeout:10000,maximumAge:300000})};
 return <section className="places-filters mt-8 space-y-5 [&_*]:focus:!outline-none [&_*]:focus-visible:!outline-none [&_*]:focus:!ring-0 [&_*]:focus-visible:!ring-0 [&_*]:focus:!shadow-none [&_*]:focus-visible:!shadow-none">
  <form onSubmit={e=>e.preventDefault()} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5">
   <div className="grid gap-3 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1.2fr)]">
    <label className="flex min-w-0 items-center gap-2 rounded-xl border border-slate-300 px-4 dark:border-slate-700"><Icon name="search" className="text-slate-500"/><input aria-label={de?"Name oder Beschreibung":"Nomi yoki tavsifi"} maxLength={100} value={term} onChange={e=>setTerm(e.target.value)} placeholder={de?"Name oder Beschreibung suchen":"Nomi yoki tavsifi bo‘yicha qidiring"} className="min-h-12 w-full min-w-0 bg-transparent text-sm outline-none focus:outline-none focus:ring-0 placeholder:text-slate-400"/></label>
    <label className="relative flex min-w-0 items-center gap-2 rounded-xl border border-slate-300 px-4 dark:border-slate-700"><Icon name="grid" className="text-slate-500"/><select aria-label={de?"Alle Kategorien":"Barcha yo‘nalishlar"} value={cat} onChange={e=>setCat(e.target.value)} className="min-h-12 w-full min-w-0 appearance-none bg-transparent pr-7 text-sm outline-none focus:outline-none focus:ring-0"><option value="">{de?"Alle Kategorien":"Barcha yo‘nalishlar"}</option>{categories.map(c=><option key={c.id} value={c.id}>{de?c.de:c.uz}</option>)}</select><Icon name="chevron" className="pointer-events-none absolute right-3 h-4 w-4 text-slate-500"/></label>
    <div className="relative min-w-0" ref={suggestionRef}><div className="flex min-w-0 items-center gap-2 rounded-xl border border-slate-300 px-3 dark:border-slate-700"><button type="button" onClick={locate} disabled={locating} aria-label={de?"Standort ermitteln":"Joylashuvimni aniqlash"} title={de?"Meinen Standort verwenden":"Joylashuvimni aniqlash"} className="rounded-lg p-1 text-emerald-700 hover:bg-emerald-50 disabled:opacity-50 dark:text-emerald-400 dark:hover:bg-slate-800"><Icon name="pin"/></button><input aria-label={de?"PLZ oder Stadt":"PLZ yoki shahar"} maxLength={100} value={place} onChange={e=>{setPlace(e.target.value);setSelectedCityId("");setSuggestOpen(true)}} onFocus={()=>setSuggestOpen(true)} onBlur={()=>setTimeout(()=>setSuggestOpen(false),120)} onKeyDown={e=>{if(e.key==='Escape')setSuggestOpen(false);if(e.key==='ArrowDown'&&suggestions.length){e.preventDefault();setActiveSuggestion(i=>(i+1)%suggestions.length)}if(e.key==='ArrowUp'&&suggestions.length){e.preventDefault();setActiveSuggestion(i=>(i+suggestions.length-1)%suggestions.length)}if(e.key==='Enter'&&suggestOpen&&activeSuggestion>=0&&suggestions[activeSuggestion]){e.preventDefault();chooseCity(suggestions[activeSuggestion])}}} role="combobox" aria-autocomplete="list" aria-expanded={suggestOpen&&suggestions.length>0} aria-controls="places-city-options" autoComplete="off" placeholder={de?"PLZ oder Stadt eingeben":"PLZ yoki shahar nomini kiriting"} className="min-h-12 w-full min-w-0 bg-transparent text-sm outline-none focus:outline-none focus:ring-0 placeholder:text-slate-400"/></div>
    {suggestOpen&&place.trim().length>=2&&suggestions.length>0&&<div id="places-city-options" role="listbox" className="absolute left-0 right-0 top-full z-30 mt-1 max-h-60 overflow-y-auto rounded-xl border border-slate-200 bg-white p-1 shadow-lg dark:border-slate-700 dark:bg-slate-900">{suggestions.map((item,i)=><button key={item.id} role="option" aria-selected={i===activeSuggestion} type="button" onMouseDown={e=>e.preventDefault()} onClick={()=>chooseCity(item)} className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800 ${i===activeSuggestion?'bg-slate-100 dark:bg-slate-800':''}`}><span className="min-w-0 truncate">{item.city} <span className="text-slate-500 dark:text-slate-400">({item.state})</span></span>{item.postalCode&&<span className="shrink-0 text-xs text-slate-500">{item.postalCode}</span>}</button>)}</div>}</div>
   </div>
   {message&&<p role="status" className="mt-2 text-xs text-slate-500 dark:text-slate-400">{message}</p>}
   <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
    <button type="button" onClick={()=>setCat("")} className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium ${!cat?"border-emerald-700 bg-emerald-700 text-white":"border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"}`}><CategoryIcon name="all"/>{de?"Alle":"Barchasi"}</button>
    {categories.map(c=><button key={c.id} type="button" onClick={()=>setCat(c.id)} className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${cat===c.id?"border-emerald-700 bg-emerald-700 text-white":"border-slate-200 bg-white text-slate-700 hover:border-emerald-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"}`}><CategoryIcon name={c.icon}/>{de?c.de:c.uz}</button>)}
   </div>
  </form>
  <style>{`.places-filters :is(input,select,button):is(:focus,:focus-visible), .places-filters :is(label,div):focus-within { outline: none !important; box-shadow: none !important; --tw-ring-shadow: 0 0 #0000 !important; }`}</style>
 </section>;
}
