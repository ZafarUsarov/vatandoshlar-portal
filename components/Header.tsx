const navigation = [
  { name: "Bosh sahifa", href: "#" },
  { name: "Telegram", href: "#telegram" },
  { name: "Xizmatlar", href: "#xizmatlar" },
  { name: "Ish", href: "#ish" },
  { name: "Tadbirlar", href: "#tadbirlar" },
];

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <a
          href="#"
          className="text-xl font-bold tracking-tight text-emerald-600 sm:text-2xl"
        >
          Vatandoshlar.de
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
            >
              {item.name}
            </a>
          ))}
        </nav>

        <a
          href="#telegram"
          className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          Kirish
        </a>
      </div>
    </header>
  );
}