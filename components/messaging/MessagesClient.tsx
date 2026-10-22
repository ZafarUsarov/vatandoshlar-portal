"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowUpRight, Check, CheckCheck, Inbox, LoaderCircle, MessageCircle, Paperclip, FileText, X, Search, Send, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

type Conversation = {
  id: string; title: string; other_name: string; last_message: string | null;
  unread_count: string; updated_at: string; kind: "market" | "travel";
  listing_slug: string | null; listing_price: string | null; listing_currency: string | null;
  image_url: string | null;
};
type Attachment = {id:string; original_filename:string; mime_type:string; file_size:string};
type Message = { id: string; sender_user_id: string; body: string; created_at: string; read_at: string | null; attachments?:Attachment[] };

type Props = { userId: string; de: boolean };
const time = (date: string, de: boolean) => new Date(date).toLocaleTimeString(de ? "de-DE" : "uz-UZ", { hour: "2-digit", minute: "2-digit" });
const dateLabel = (date: string, de: boolean) => {
  const d = new Date(date); const now = new Date();
  if (d.toDateString() === now.toDateString()) return de ? "Heute" : "Bugun";
  const yesterday = new Date(now); yesterday.setDate(now.getDate() - 1);
  if (d.toDateString() === yesterday.toDateString()) return de ? "Gestern" : "Kecha";
  return d.toLocaleDateString(de ? "de-DE" : "uz-UZ", { day: "numeric", month: "long", year: "numeric" });
};
const priceLabel = (c: Conversation, de: boolean) => {
  if (!c.listing_price) return null;
  const n = Number(c.listing_price);
  if (!Number.isFinite(n)) return null;
  return `${n.toLocaleString(de ? "de-DE" : "de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${c.listing_currency || "€"}`;
};

async function compressImage(file: File): Promise<File> {
  if (typeof createImageBitmap !== "function") return file;
  const bitmap=await createImageBitmap(file,{imageOrientation:"from-image"});
  try {
    const scale=Math.min(1,1600/Math.max(bitmap.width,bitmap.height));
    const canvas=document.createElement("canvas");canvas.width=Math.round(bitmap.width*scale);canvas.height=Math.round(bitmap.height*scale);
    const ctx=canvas.getContext("2d");if(!ctx) return file;
    ctx.drawImage(bitmap,0,0,canvas.width,canvas.height);
    const blob=await new Promise<Blob|null>(resolve=>canvas.toBlob(resolve,"image/webp",0.78));
    if (!blob || blob.type!=="image/webp" || blob.size>=file.size) return file;
    return new File([blob],file.name.replace(/\.[^.]+$/,"")+".webp",{type:"image/webp"});
  } finally {bitmap.close();}
}

function PendingPreview({ file, onRemove, removeLabel }: { file: File; onRemove: () => void; removeLabel: string }) {
  const previewRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (!file.type.startsWith("image/")) return;
    const objectUrl = URL.createObjectURL(file);
    const element = previewRef.current;
    if (element) element.src = objectUrl;
    return () => {
      if (element) element.removeAttribute("src");
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);
  return <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800">
    {file.type.startsWith("image/") ? <img ref={previewRef} alt={file.name} className="h-full w-full object-cover" /> : <div className="flex flex-col items-center gap-1 px-2"><FileText className="h-6 w-6"/><span className="w-full truncate text-center text-[10px]">{file.name}</span></div>}
    <button type="button" onClick={onRemove} aria-label={removeLabel} className="absolute right-1 top-1 rounded-full bg-slate-900/80 p-1 text-white hover:bg-slate-900"><X className="h-3.5 w-3.5"/></button>
  </div>;
}

export default function MessagesClient({ userId, de }: Props) {
  const t = (uz: string, german: string) => de ? german : uz;
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const selectConversation = useCallback((id: string | null) => {
    setActive(id);
    const url = new URL(window.location.href);
    if (id) url.searchParams.set("conversation", id);
    else url.searchParams.delete("conversation");
    window.history.pushState(null, "", url.pathname + url.search + url.hash);
  }, []);
  const [messages, setMessages] = useState<Message[]>([]);
  const activeRef = useRef<string | null>(null);
  const messageRequestRef = useRef(0);
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [lightbox, setLightbox] = useState<{src:string;alt:string}|null>(null);
  const [preparing, setPreparing] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);
  const [loadingList, setLoadingList] = useState(true);
  const [loadingChat, setLoadingChat] = useState(false);
  const [error, setError] = useState("");
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const stickToBottomRef = useRef(true);
  const forceBottomRef = useRef(true);
  const previousConversationRef = useRef<string | null>(null);
  const previousLastMessageRef = useRef<string | null>(null);
  const [showNewMessageButton, setShowNewMessageButton] = useState(false);
  const scrollToBottom = useCallback(() => {
    const el = chatScrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);
  const onChatScroll = useCallback(() => {
    const el = chatScrollRef.current;
    if (!el) return;
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100;
    stickToBottomRef.current = nearBottom;
    if (nearBottom) setShowNewMessageButton(false);
  }, []);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);
  useEffect(() => {
    const restore = () => {
      const id = new URLSearchParams(window.location.search).get("conversation");
      setActive(id && /^[1-9]\d{0,17}$/.test(id) ? id : null);
    };
    restore();
    window.addEventListener("popstate", restore);
    return () => window.removeEventListener("popstate", restore);
  }, []);
  useEffect(() => { activeRef.current = active; }, [active]);
  const selected = conversations.find(c => c.id === active);
  const filtered = useMemo(() => conversations.filter(c => `${c.other_name} ${c.title} ${c.last_message || ""}`.toLocaleLowerCase().includes(query.toLocaleLowerCase())), [conversations, query]);

  const refresh = useCallback(async () => {
    const response = await fetch("/api/messages/conversations", { cache: "no-store" });
    if (!response.ok) throw new Error("conversations");
    const data: { conversations: Conversation[] } = await response.json();
    setConversations(data.conversations);
  }, []);
  const refreshMessages = useCallback(async (id: string) => {
    const requestId = ++messageRequestRef.current;
    const response = await fetch(`/api/messages/conversations/${id}`, { cache: "no-store" });
    if (!response.ok) throw new Error("messages");
    const data: { messages: Message[] } = await response.json();
    // An older response must not replace newer messages or another conversation.
    if (requestId === messageRequestRef.current && activeRef.current === id) setMessages(data.messages);
  }, []);

  useEffect(() => {
    let cancelled = false;
    void Promise.resolve().then(async () => {
      try { await refresh(); } catch { if (!cancelled) setError(t("Suhbatlar yuklanmadi", "Unterhaltungen konnten nicht geladen werden")); }
      finally { if (!cancelled) setLoadingList(false); }
    });
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, de]);
  useEffect(() => {
    if (!active) return;
    let cancelled = false;
    void Promise.resolve().then(async () => {
      if (cancelled) return;
      setLoadingChat(true); setMessages([]); setError("");
      try { await refreshMessages(active); } catch { if (!cancelled) setError(t("Xabarlar yuklanmadi", "Nachrichten konnten nicht geladen werden")); }
      finally { if (!cancelled) setLoadingChat(false); }
    });
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, refreshMessages, de]);
  const acknowledgeRead = useCallback(async (id: string) => {
    if (document.visibilityState !== "visible" || !document.hasFocus() || !stickToBottomRef.current) return;
    const response = await fetch(`/api/messages/conversations/${id}`, { method: "PATCH", cache: "no-store" });
    if (response.ok) await refresh();
  }, [refresh]);
  useEffect(() => {
    if (!active) return;
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        void refreshMessages(active).catch(() => {});
        void refresh().catch(() => {});
      }
    };
    const onFocus = () => { if (document.visibilityState === "visible") {
      void refreshMessages(active).catch(() => {});
      void refresh().catch(() => {});
    } };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", onFocus);
    return () => { document.removeEventListener("visibilitychange", onVisible); window.removeEventListener("focus", onFocus); };
  }, [active, acknowledgeRead, refreshMessages, refresh]);
  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      if (document.visibilityState !== "visible") return;
      void refreshMessages(active).catch(() => {});
      void refresh().catch(() => {});
    }, 3000);
    return () => clearInterval(interval);
  }, [active, refreshMessages, refresh]);
  useEffect(() => {
    if (!active || loadingChat || document.visibilityState !== "visible" || !document.hasFocus() || !stickToBottomRef.current || !messages.some(m => m.sender_user_id !== userId && !m.read_at)) return;
    let cancelled = false;
    void Promise.resolve().then(() => {
      if (!cancelled) return acknowledgeRead(active).catch(() => {});
    });
    return () => { cancelled = true; };
  }, [active, loadingChat, messages, userId, acknowledgeRead]);

  // Keep the chat pinned to the bottom only when appropriate; do not scroll the entire page.
  useLayoutEffect(() => {
    if (!active || loadingChat) return;
    const last = messages.at(-1)?.id ?? null;
    const conversationChanged = previousConversationRef.current !== active;
    const newMessage = last !== previousLastMessageRef.current;
    const shouldFollow = forceBottomRef.current || conversationChanged || stickToBottomRef.current;
    previousConversationRef.current = active;
    previousLastMessageRef.current = last;
    if (shouldFollow) {
      scrollToBottom();
      stickToBottomRef.current = true;
      forceBottomRef.current = false;
      setShowNewMessageButton(false);
    } else if (newMessage && last !== null) {
      setShowNewMessageButton(true);
    }
  }, [active, loadingChat, messages, scrollToBottom]);

  // Images and attachment previews can increase height after messages have rendered.
  useEffect(() => {
    const el = chatScrollRef.current;
    if (!el || !active) return;
    const observer = new ResizeObserver(() => {
      if (stickToBottomRef.current) scrollToBottom();
    });
    for (const child of Array.from(el.children)) observer.observe(child);
    return () => observer.disconnect();
  }, [active, messages, scrollToBottom]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
    el.style.overflowY = el.scrollHeight > 160 ? "auto" : "hidden";
  }, [draft, active]);

  async function chooseFiles(list: FileList | null) {
    if (!list?.length) return;
    if (pendingFiles.length + list.length > 5) {setError(t("Bir xabarda ko‘pi bilan 5 ta fayl", "Maximal 5 Dateien pro Nachricht"));return;}
    setPreparing(true);setError("");
    try {
      const added: File[]=[];
      for(const file of Array.from(list)) {
        const ext=file.name.split(".").pop()?.toLowerCase();
        if (["heic","heif"].includes(ext||"")) throw new Error(t("HEIC/HEIF ushbu brauzerda qo‘llab-quvvatlanmaydi", "HEIC/HEIF wird in diesem Browser nicht unterstützt"));
        if (["jpg","jpeg","png","webp"].includes(ext||"")) {
          if(file.size>15*1024*1024) throw new Error(t("Rasm 15 MB dan katta", "Bild größer als 15 MB"));
          added.push(await compressImage(file));
        } else if (["pdf","txt"].includes(ext||"")) {
          if(file.size>10*1024*1024) throw new Error(t("Hujjat 10 MB dan katta", "Dokument größer als 10 MB"));
          added.push(file);
        } else throw new Error(t("Fayl turi qo‘llab-quvvatlanmaydi (PDF/TXT va rasmlar)", "Dateityp nicht unterstützt (PDF/TXT und Bilder)"));
      }
      setPendingFiles(prev=>[...prev,...added]);
    } catch(e) {setError(e instanceof Error ? e.message : t("Fayl tayyorlanmadi", "Datei konnte nicht vorbereitet werden"));}
    finally {setPreparing(false);if(fileRef.current) fileRef.current.value="";}
  }
  async function send() {
    const text = draft.trim();
    if (!active || (!text && !pendingFiles.length) || busy || preparing || text.length > 2000) return;
    forceBottomRef.current = true;
    setBusy(true); setError("");
    try {
      let response: Response;
      if (pendingFiles.length) {
        const form=new FormData();form.append("body",text);pendingFiles.forEach(f=>form.append("files",f));
        response=await new Promise<Response>((resolve,reject)=>{
          const xhr=new XMLHttpRequest();xhr.open("POST",`/api/messages/conversations/${active}/attachments`);
          xhr.upload.onprogress=e=>{if(e.lengthComputable)setProgress(Math.round(e.loaded/e.total*100));};
          xhr.onload=()=>resolve(new Response(xhr.responseText,{status:xhr.status||500}));
          xhr.onerror=()=>reject(new Error("Network error"));xhr.send(form);
        });
      } else response = await fetch(`/api/messages/conversations/${active}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ body: text }) });
      if (!response.ok) throw new Error("send");
      setDraft("");setPendingFiles([]);setProgress(0);
      await Promise.all([refreshMessages(active), refresh()]);
      chatScrollRef.current?.scrollTo({ top: chatScrollRef.current.scrollHeight, behavior: "smooth" });
    } catch { setError(t("Xabar yuborilmadi. Qayta urinib ko‘ring.", "Nachricht konnte nicht gesendet werden. Bitte erneut versuchen.")); }
    finally { setBusy(false); }
  }

  return (
    <div className="mx-auto w-full max-w-[1480px] px-4 pb-6 pt-7 sm:px-6 lg:px-8 lg:pt-10">
      <style jsx global>{`
        :root { --messaging-unread-background: #c6f2df; }
        .dark { --messaging-unread-background: #164e3d; }
      `}</style>
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">{t("Xabarlar", "Nachrichten")}</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 sm:text-base">{t("E’lonlar orqali bog‘langan suhbatlaringiz shu yerda.", "Hier finden Sie Ihre Unterhaltungen zu Anzeigen.")}</p>
      </div>
      <div className="grid min-h-[min(730px,calc(100dvh-220px))] gap-3 md:grid-cols-[minmax(280px,38fr)_minmax(0,62fr)] lg:gap-4" style={{ height: "min(760px, calc(100dvh - 215px))" }}>
        <aside className={`${active ? "hidden md:flex" : "flex"} min-h-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900`} aria-label={t("Suhbatlar", "Unterhaltungen")}>
          <div className="shrink-0 border-b border-slate-100 px-4 pb-4 pt-5 dark:border-slate-800 sm:px-5">
            <div className="mb-4 flex items-center gap-2"><h2 className="text-lg font-bold text-slate-950 dark:text-white">{t("Suhbatlar", "Unterhaltungen")}</h2><span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">{conversations.length}</span></div>
            <label className="flex min-h-11 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 dark:border-slate-700 dark:bg-slate-800"><Search className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true"/><span className="sr-only">{t("Suhbatlarni qidirish", "Unterhaltungen suchen")}</span><input value={query} onChange={e => setQuery(e.target.value)} className="min-w-0 flex-1 appearance-none !border-0 !bg-transparent py-2.5 text-sm text-slate-900 !shadow-none !outline-none !ring-0 focus:!border-0 focus:!shadow-none focus:!outline-none focus:!ring-0 focus-visible:!outline-none focus-visible:!ring-0 placeholder:text-slate-400 dark:text-white" style={{ outline: "none", boxShadow: "none", WebkitAppearance: "none" }} placeholder={t("Suhbatlarni qidirish...", "Unterhaltungen suchen...")}/></label>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-auto">
            {loadingList && <div className="flex items-center justify-center gap-2 p-8 text-sm text-slate-500"><LoaderCircle className="h-4 w-4 animate-spin"/>{t("Yuklanmoqda...", "Wird geladen...")}</div>}
            {!loadingList && filtered.length === 0 && <div className="px-6 py-14 text-center"><Inbox className="mx-auto mb-3 h-8 w-8 text-slate-300"/><p className="text-sm text-slate-500">{query ? t("Suhbat topilmadi", "Keine Unterhaltung gefunden") : t("Hozircha suhbatlar yo‘q. Suhbatni e’lon orqali boshlashingiz mumkin.", "Noch keine Unterhaltungen. Starten Sie einen Chat über eine Anzeige.")}</p></div>}
            {filtered.map(c => <button key={c.id} type="button" onClick={() => { forceBottomRef.current = true; stickToBottomRef.current = true; setShowNewMessageButton(false); selectConversation(c.id); setError(""); }} aria-current={active === c.id ? "true" : undefined} style={Number(c.unread_count) > 0 ? { backgroundColor: "var(--messaging-unread-background)" } : undefined} className={`flex w-full items-start gap-3 border-b border-slate-100 px-4 py-4 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600 dark:border-slate-800 sm:px-5 ${Number(c.unread_count) > 0 ? "border-l-[3px] !border-l-emerald-600 !bg-emerald-200/90 hover:!bg-emerald-200 dark:!border-l-emerald-400 dark:!bg-emerald-900/65 dark:hover:!bg-emerald-900/75" : active === c.id ? "border-l-[3px] border-l-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40" : "border-l-[3px] border-l-transparent hover:bg-slate-50 dark:hover:bg-slate-800"}`}>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">{c.image_url ? <Image src={c.image_url} width={48} height={48} unoptimized alt="" className="h-12 w-12 rounded-xl object-cover"/> : <MessageCircle className="h-5 w-5"/>}</div>
              <div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-2"><span className="truncate text-sm font-bold text-slate-950 dark:text-white">{c.other_name}</span><span className="shrink-0 text-xs text-slate-500">{time(c.updated_at, de)}</span></div><p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">{c.title}</p><div className="mt-1 flex items-center justify-between gap-2"><p className="truncate text-sm text-slate-600 dark:text-slate-300">{c.last_message || t("Yangi suhbat", "Neue Unterhaltung")}</p>{Number(c.unread_count) > 0 && <span className="flex min-h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 px-1.5 text-xs font-bold text-white">{c.unread_count}</span>}</div></div>
            </button>)}
          </div>
        </aside>
        <section className={`${active ? "flex" : "hidden md:flex"} min-h-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900`} aria-label={t("Chat oynasi", "Chatfenster")}>
          {!selected ? <div className="flex h-full flex-col items-center justify-center px-8 text-center"><div className="mb-5 rounded-3xl bg-emerald-50 p-5 dark:bg-emerald-950"><MessageCircle className="h-10 w-10 text-emerald-600"/></div><h2 className="text-xl font-bold text-slate-900 dark:text-white">{t("Suhbatni tanlang", "Unterhaltung auswählen")}</h2><p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">{t("Xabarlarni o‘qish va javob yozish uchun chap tomondan suhbatni tanlang.", "Wählen Sie links eine Unterhaltung, um Nachrichten zu lesen und zu antworten.")}</p><p className="mt-5 flex items-center gap-2 text-xs text-slate-400"><ShieldCheck className="h-4 w-4"/>{t("Telefon raqamingizni ulashish shart emas", "Sie müssen Ihre Telefonnummer nicht teilen")}</p></div> : <>
            <div className="flex shrink-0 items-center gap-3 border-b border-slate-100 px-3 py-3 dark:border-slate-800 sm:px-5 sm:py-4">
              <button type="button" onClick={() => selectConversation(null)} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600 dark:text-slate-300 dark:hover:bg-slate-800 md:hidden" aria-label={t("Suhbatlarga qaytish", "Zurück zu Unterhaltungen")}><ArrowLeft className="h-5 w-5"/></button>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">{selected?.image_url ? <Image src={selected.image_url} width={48} height={48} unoptimized alt="" className="h-12 w-12 rounded-xl object-cover"/> : <MessageCircle className="h-5 w-5"/>}</div>
              <div className="min-w-0 flex-1"><h2 className="truncate text-sm font-bold text-slate-950 dark:text-white sm:text-base">{selected.other_name}</h2><p className="truncate text-xs text-slate-500 dark:text-slate-400">{selected.title}</p>{priceLabel(selected, de) && <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">{priceLabel(selected, de)}</p>}</div>
              {selected.listing_slug && <Link href={`/${selected.kind === "market" ? "market" : "safar"}/${selected.listing_slug}`} className="inline-flex min-h-10 shrink-0 items-center gap-1 rounded-xl border border-emerald-500 px-2.5 text-xs font-semibold text-emerald-800 hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600 dark:text-emerald-300 dark:hover:bg-emerald-950 sm:px-4"><ArrowUpRight className="h-4 w-4"/><span className="hidden sm:inline">{t("E’lonni ko‘rish", "Anzeige ansehen")}</span><span className="sm:hidden">{t("E’lon", "Anzeige")}</span></Link>}
            </div>
            <div className="relative min-h-0 flex-1">
            <div ref={chatScrollRef} onScroll={onChatScroll} className="h-full min-h-0 space-y-3 overflow-y-auto overscroll-y-auto bg-slate-50/40 px-3 py-5 dark:bg-slate-950/40 sm:px-6" aria-live="polite" aria-relevant="additions text">
              {loadingChat && <p className="flex items-center justify-center gap-2 py-6 text-sm text-slate-500"><LoaderCircle className="h-4 w-4 animate-spin"/>{t("Yuklanmoqda...", "Wird geladen...")}</p>}
              {!loadingChat && messages.length === 0 && <p className="py-10 text-center text-sm text-slate-500">{t("Hali xabar yo‘q. Birinchi xabarni yuboring.", "Noch keine Nachrichten. Schreiben Sie die erste Nachricht.")}</p>}
              {messages.map((m, i) => { const own = m.sender_user_id === userId; const prev = messages[i - 1]; const divider = !prev || new Date(prev.created_at).toDateString() !== new Date(m.created_at).toDateString(); return <div key={m.id}>{divider && <div className="my-5 flex justify-center"><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-300">{dateLabel(m.created_at, de)}</span></div>}<div className={`flex ${own ? "justify-end" : "justify-start"}`}><div className="max-w-[85%] sm:max-w-[75%]"><div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm sm:text-base ${own ? "rounded-br-md bg-emerald-100 text-slate-900 dark:bg-emerald-900 dark:text-emerald-50" : "rounded-bl-md bg-white text-slate-900 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-white dark:ring-slate-700"}`}>{m.body !== "📎" && <p className="whitespace-pre-wrap break-words [overflow-wrap:anywhere]">{m.body}</p>}{m.attachments?.map(a=>{const src=`/api/messages/conversations/${active}/attachments/${a.id}`;return <div key={a.id} className="mt-2 min-w-0">{a.mime_type.startsWith("image/") ? <button type="button" onClick={()=>setLightbox({src,alt:a.original_filename})} className="block max-w-full overflow-hidden rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600" aria-label={t("Rasmni kattalashtirish", "Bild vergrößern")}><img src={src} loading="lazy" alt={a.original_filename} className="max-h-64 max-w-full rounded-xl object-contain" /></button> : <a href={src} target="_blank" rel="noopener noreferrer" className="flex min-w-0 items-center gap-2 rounded-xl border border-slate-200/60 p-2 text-sm underline-offset-2 hover:underline dark:border-slate-600"><FileText className="h-5 w-5 shrink-0"/><span className="min-w-0 break-all">{a.original_filename} ({Math.ceil(Number(a.file_size)/1024)} KB)</span></a>}</div>;})}</div><div className={`mt-1 flex items-center gap-1 text-[11px] text-slate-400 ${own ? "justify-end" : "justify-start"}`}><time dateTime={m.created_at}>{time(m.created_at, de)}</time>{own && (m.read_at ? <CheckCheck aria-label={t("O‘qilgan", "Gelesen")} className="h-3.5 w-3.5 text-emerald-600"/> : <Check aria-label={t("Yuborilgan", "Gesendet")} className="h-3.5 w-3.5"/>)}</div></div></div></div>; })}
            </div>
            {showNewMessageButton && <button type="button" onClick={() => { stickToBottomRef.current = true; forceBottomRef.current = false; scrollToBottom(); setShowNewMessageButton(false); }} className="absolute bottom-3 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"><ArrowDown className="h-4 w-4"/>{t("Yangi xabar", "Neue Nachricht")}</button>}
            </div>
            <div className="shrink-0 px-4">{pendingFiles.length>0 && <div className="flex flex-wrap gap-2 py-2">{pendingFiles.map((f,i)=><PendingPreview key={`${f.name}-${i}`} file={f} onRemove={()=>setPendingFiles(v=>v.filter((_,j)=>j!==i))} removeLabel={t("Olib tashlash", "Entfernen")}/>)}</div>}{preparing && <p className="text-xs text-slate-500">{t("Rasm siqilmoqda...", "Bild wird komprimiert...")}</p>}{busy && pendingFiles.length>0 && <p className="text-xs text-slate-500">{t("Yuklanmoqda", "Wird hochgeladen")}: {progress}%</p>}</div><form className="shrink-0 border-t border-slate-100 bg-white px-3 py-3 dark:border-slate-800 dark:bg-slate-900 sm:px-5 sm:py-4" onSubmit={e => { e.preventDefault(); void send(); }}><div className="flex items-end gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-1.5 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/15 dark:border-slate-700 dark:bg-slate-800"><input ref={fileRef} type="file" multiple accept=".jpg,.jpeg,.png,.webp,.pdf,.txt" className="sr-only" aria-label={t("Fayl tanlash", "Datei auswählen")} onChange={e=>void chooseFiles(e.target.files)}/><button type="button" onClick={()=>fileRef.current?.click()} disabled={busy||preparing} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-200 focus-visible:outline-2 focus-visible:outline-emerald-600 disabled:opacity-50 dark:text-slate-300 dark:hover:bg-slate-700" aria-label={t("Fayl biriktirish", "Datei anhängen")}><Paperclip className="h-5 w-5"/></button><label htmlFor="chat-message" className="sr-only">{t("Xabar", "Nachricht")}</label><textarea ref={textareaRef} id="chat-message" value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); void send(); } }} rows={1} maxLength={2000} placeholder={t("Xabar yozing...", "Nachricht schreiben...")} className="max-h-40 min-h-10 min-w-0 flex-1 resize-none appearance-none border-0 bg-transparent px-3 py-2.5 text-sm text-slate-900 shadow-none outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 focus-visible:outline-none dark:text-white placeholder:text-slate-400 sm:text-base" style={{ boxShadow: "none", outline: "none" }}/><button type="submit" disabled={busy || preparing || (!draft.trim() && !pendingFiles.length)} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white transition-colors hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:cursor-not-allowed disabled:opacity-50" aria-label={t("Yuborish", "Senden")}>{busy ? <LoaderCircle className="h-5 w-5 animate-spin"/> : <Send className="h-5 w-5"/>}</button></div><p className="mt-2 hidden text-right text-[11px] text-slate-400 sm:block">{t("Enter — yuborish · Shift + Enter — yangi qator", "Enter — senden · Shift + Enter — neue Zeile")}</p></form>
          </>}
          {error && <div role="alert" className="border-t border-red-100 bg-red-50 px-4 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">{error}<button type="button" className="ml-3 underline" onClick={() => { setError(""); void refresh(); if (active) void refreshMessages(active); }}>{t("Qayta urinish", "Erneut versuchen")}</button></div>}
        </section>
      </div>
      {lightbox && <div role="dialog" aria-modal="true" aria-label={t("Rasmni ko‘rish", "Bild ansehen")} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4" onClick={()=>setLightbox(null)}>
        <button type="button" onClick={()=>setLightbox(null)} aria-label={t("Yopish", "Schließen")} className="absolute right-4 top-4 rounded-full bg-white/15 p-3 text-white hover:bg-white/25"><X className="h-6 w-6"/></button>
        <img src={lightbox.src} alt={lightbox.alt} className="max-h-[90vh] max-w-[95vw] object-contain" onClick={e=>e.stopPropagation()}/>
      </div>}
    </div>
  );
}
