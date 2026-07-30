import Header from "../components/Header";

const services = [
  {
    title: "Bundeslandlar",
    description:
      "O‘zingiz yashayotgan hududdagi vatandoshlar hamjamiyatini toping.",
    icon: "📍",
  },
  {
    title: "Telegram guruhlari",
    description:
      "Tekshirilgan hududiy Telegram guruhlari va botlariga qo‘shiling.",
    icon: "✈️",
  },
  {
    title: "Foydali ma’lumotlar",
    description:
      "Ish, uy-joy, hujjatlar, ta’lim va kundalik hayot bo‘yicha qo‘llanmalar.",
    icon: "📚",
  },
];

export default function Home() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-white pt-20 text-slate-950">
        <section className="relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 -z-10 h-[620px] bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.14),_transparent_42%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.14),_transparent_38%)]" />

          <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center sm:py-32 lg:px-8">
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
              🇩🇪 Germaniyadagi o‘zbekistonliklar platformasi
            </span>

            <h1 className="mt-8 max-w-5xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              Germaniyadagi vatandoshlarni birlashtiruvchi raqamli makon
            </h1>

            <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
              Hududiy hamjamiyatlar, foydali ma’lumotlar, tadbirlar va
              xizmatlarni bitta ishonchli platformadan toping.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#xizmatlar"
                className="rounded-full bg-blue-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Boshlash
              </a>

              <a
                href="#xizmatlar"
                className="rounded-full border border-slate-300 bg-white px-7 py-3.5 font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Batafsil
              </a>
            </div>

            <div className="mt-16 grid w-full max-w-4xl grid-cols-1 gap-4 rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-xl shadow-slate-200/40 backdrop-blur sm:grid-cols-3">
              <div className="rounded-2xl p-5">
                <p className="text-3xl font-semibold">16</p>
                <p className="mt-1 text-sm text-slate-500">Bundesland</p>
              </div>

              <div className="rounded-2xl border-y border-slate-200 p-5 sm:border-x sm:border-y-0">
                <p className="text-3xl font-semibold">3+</p>
                <p className="mt-1 text-sm text-slate-500">
                  Faol Telegram guruhi
                </p>
              </div>

              <div className="rounded-2xl p-5">
                <p className="text-3xl font-semibold">1</p>
                <p className="mt-1 text-sm text-slate-500">
                  Yagona platforma
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="xizmatlar"
          className="mx-auto max-w-7xl px-6 py-24 lg:px-8"
        >
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
              Platforma imkoniyatlari
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Sizga kerakli ma’lumotlar bir joyda
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Germaniyadagi kundalik hayot va vatandoshlar hamjamiyatiga
              tegishli asosiy xizmatlar.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-xl">
                  {service.icon}
                </div>

                <h3 className="mt-6 text-xl font-semibold">
                  {service.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {service.description}
                </p>

                <a
                  href="#"
                  className="mt-7 inline-flex text-sm font-semibold text-blue-600"
                >
                  Batafsil →
                </a>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}