type InstallVideoProps = {
  de: boolean;
};

export default function InstallVideo({ de }: InstallVideoProps) {
  return (
    <section aria-labelledby="install-video-title" className="pt-16 sm:pt-20">
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700 dark:text-emerald-400">
          {de ? "Videoanleitung" : "Video qo‘llanma"}
        </p>
        <h2 id="install-video-title" className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
          {de ? "Installation im Video ansehen" : "Video orqali o‘rnatishni ko‘ring"}
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
          {de
            ? "So fügst du UzDe auf iPhone und Android zu deinem Startbildschirm hinzu."
            : "UzDe’ni iPhone va Android bosh ekraniga qo‘shish jarayonini tomosha qiling."}
        </p>
      </div>
      <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-lg dark:border-slate-800">
        <video
          className="block aspect-video w-full"
          controls
          playsInline
          preload="none"
          aria-label={de ? "UzDe Installationsvideo" : "UzDe o‘rnatish videosi"}
        >
          <source src="/videos/uzde-install-guide.mp4" type="video/mp4" />
          {de ? "Dein Browser unterstützt keine Videowiedergabe." : "Brauzeringiz video ijrosini qo‘llab-quvvatlamaydi."}
        </video>
      </div>
    </section>
  );
}
