/*
  Core2Code – Prizes (responsive, static, no clicks)
  Large screens (md and up): gold podium.
  Small screens (below md): golden tickets.
  Palette (only these three): Black #000000 · Gold #D4AF37 · White #FFFFFF
  React + Tailwind v3+.
  Edit the `podium` and `tickets` arrays to change names and amounts.
*/

import Header from "../utils/Header";

/* ───────────────────────── Large screens: podium ───────────────────────── */

const podium = [
  { id: "second", place: "2", title: "Second Prize", amount: "₹2,500", height: "md:h-[20rem]", order: "md:order-1" },
  { id: "first", place: "1", title: "First Prize", amount: "₹3,500", height: "md:h-[26rem]", order: "md:order-2", champion: true },
  { id: "young", icon: true, title: "Young Minds", amount: "₹2,000", height: "md:h-[16rem]", order: "md:order-3" },
];

const Crown = () => (
  <svg viewBox="0 0 48 32" className="h-8 w-12" fill="currentColor" aria-hidden="true">
    <path d="M4 28 0 6l12 10L24 0l12 16L48 6l-4 22z" />
  </svg>
);

const Bulb = () => (
  <svg viewBox="0 0 24 24" className="h-16 w-16 md:h-20 md:w-20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2V17h6v-.3c0-.8.4-1.5 1-2A7 7 0 0 0 12 2z" />
  </svg>
);

function PodiumPrizes() {
  return (
    <section className="relative overflow-hidden bg-[#000000] px-5 pb-20 pt-0 text-[#FFFFFF] sm:px-8 md:-mt-2 md:pb-28 md:pt-0">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,500;6..96,700;6..96,900&family=Manrope:wght@400;500;700&display=swap');
        .c2c-display { font-family: 'Bodoni Moda', 'Didot', Georgia, serif; }
        .c2c-body { font-family: 'Manrope', system-ui, sans-serif; }
        @keyframes c2c-sheen { 0% { transform: translateX(-120%) skewX(-18deg); } 100% { transform: translateX(320%) skewX(-18deg); } }
        .c2c-sheen { animation: c2c-sheen 3.6s ease-in-out 0.6s 2 both; }
        @media (prefers-reduced-motion: reduce) { .c2c-sheen { animation: none; } }
      `}</style>

      {/* soft gold glow behind the champion */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/4 rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, #D4AF37 0%, transparent 65%)" }}
      />

      <div className="c2c-body relative mx-auto mt-10 max-w-5xl sm:mt-12 md:mt-16">
        <header className="mx-auto max-w-2xl text-center">
          <Header>PRIZES</Header>
        </header>

        <div className="mt-8 grid grid-cols-1 items-end gap-4 md:mt-10 md:grid-cols-3 md:gap-5">
          {podium.map((p) => (
            <article
              key={p.id}
              className={`relative flex flex-col justify-between gap-10 overflow-hidden border p-6 md:gap-0 md:p-7 ${p.order} ${p.height} ${p.champion
                ? "border-[#D4AF37] bg-[#D4AF37] text-[#000000]"
                : "border-[#FFFFFF]/15 bg-[#FFFFFF]/[0.02]"
                }`}
            >
              {p.champion && (
                <span
                  aria-hidden="true"
                  className="c2c-sheen pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-[#FFFFFF]/50 to-transparent"
                />
              )}

              <div className="flex items-start justify-between">
                {p.icon ? (
                  <span className="text-[#D4AF37]"><Bulb /></span>
                ) : (
                  <span className={`font-number text-7xl font-black leading-none md:text-8xl ${p.champion ? "text-[#000000]" : "text-[#D4AF37]"}`}>
                    {p.place}
                  </span>
                )}
                {p.champion && <Crown />}
              </div>

              <div>
                <p className={`font-mistical text-sm font-medium ${p.champion ? "text-[#000000]/70" : "text-[#FFFFFF]/60"}`}>{p.title}</p>
                <p
                  className={`font-number mt-1 text-4xl md:text-5xl ${p.champion ? "text-[#000000]" : "text-[#FFFFFF]"
                    }`}
                >
                  {p.amount}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Small screens: golden tickets ───────────────────────── */

const ICONS = {
  trophy: "M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4zM7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3",
  medal: "M8 2l4 7 4-7M12 9a6 6 0 1 0 0 12 6 6 0 0 0 0-12zM12 13l1 2 2 .3-1.5 1.4.4 2.1-1.9-1-1.9 1 .4-2.1L9 15.3l2-.3z",
  bulb: "M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2V17h6v-.3c0-.8.4-1.5 1-2A7 7 0 0 0 12 2z",
};

const tickets = [
  { id: "first", icon: "trophy", name: "First Prize", amount: "₹30,000", tag: "1st", no: "0001", hero: true },
  { id: "second", icon: "medal", name: "Second Prize", amount: "₹15,000", tag: "2nd", no: "0002" },
  { id: "young", icon: "bulb", name: "Young Minds", amount: "₹7,500", tag: "Special", no: "0003" },
];

// [top %, left %, size px]
const sparkles = [[6, 10, 14], [12, 88, 18], [40, 3, 10], [55, 96, 12], [80, 8, 16], [92, 90, 12]];

function TicketPrizes() {
  return (
    <section className="relative mt-8 overflow-hidden bg-[#000000] px-4 pb-20 pt-0 text-[#FFFFFF] sm:px-8">
      <style>{`
  @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,500;6..96,700;6..96,900&family=Manrope:wght@400;500;700&display=swap');

  .c2c-display {
    font-family: 'Bodoni Moda', 'Didot', Georgia, serif;
  }

  .c2c-body {
    font-family: 'Manrope', system-ui, sans-serif;
  }

  .prize-number {
    font-family: "Dekatron", sans-serif !important;
    font-weight: 600 !important;
    font-style: normal !important;
  }

  ...
`}</style>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, #D4AF37 0%, transparent 65%)" }}
      />

      {sparkles.map(([top, left, size], i) => (
        <svg key={i} aria-hidden="true" viewBox="0 0 24 24" className="c2c-twinkle pointer-events-none absolute text-[#D4AF37]"
          style={{ top: `${top}%`, left: `${left}%`, width: size, height: size, animationDelay: `${i * 0.7}s` }} fill="currentColor">
          <path d="M12 0l2 10 10 2-10 2-2 10-2-10L0 12l10-2z" />
        </svg>
      ))}

      <div className="relative mx-auto max-w-3xl">
        <header className="text-center">
          <Header>Prizes</Header>
        </header>

        <div className="mt-8 space-y-6">
          {tickets.map((p) => (
            <article key={p.id}>
              <div
                className={`relative flex overflow-hidden border-2 ${p.hero ? "border-[#D4AF37] shadow-[0_0_70px_-12px_rgba(212,175,55,0.6)]" : "border-[#D4AF37]/70"
                  }`}
              >
                {/* stub */}
                <div
                  className={`relative flex w-28 shrink-0 flex-col items-center justify-center gap-3 px-3 py-6 sm:w-44 ${p.hero ? "bg-[#000000] text-[#D4AF37]" : "bg-[#D4AF37] text-[#000000]"
                    }`}
                >
                  <svg viewBox="0 0 24 24" className={p.hero ? "h-14 w-14 sm:h-20 sm:w-20" : "h-12 w-12 sm:h-16 sm:w-16"} fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d={ICONS[p.icon]} />
                  </svg>
                  <span className="font-paragraph text-sm font-bold sm:text-base">{p.tag}</span>

                  {/* perforation */}
                  <span aria-hidden="true" className={`absolute inset-y-4 right-0 border-r-2 border-dashed ${p.hero ? "border-[#D4AF37]/60" : "border-[#000000]/40"}`} />
                  {/* notches */}
                  <span aria-hidden="true" className={`absolute -right-3 -top-3 z-10 h-6 w-6 rounded-full border-2 bg-[#000000] ${p.hero ? "border-[#D4AF37]" : "border-[#D4AF37]/70"}`} />
                  <span aria-hidden="true" className={`absolute -bottom-3 -right-3 z-10 h-6 w-6 rounded-full border-2 bg-[#000000] ${p.hero ? "border-[#D4AF37]" : "border-[#D4AF37]/70"}`} />
                </div>

                {/* body */}
                <div
                  className={`relative flex flex-1 flex-col justify-center px-5 sm:px-10 ${p.hero ? "bg-[#D4AF37] py-9 text-[#000000] sm:py-12" : "bg-[#000000] py-7 text-[#FFFFFF]"
                    }`}
                >
                  <h3 className={`font-mistical font-bold ${p.hero ? "text-2xl sm:text-4xl" : "text-xl sm:text-3xl"}`}>{p.name}</h3>
                  <p
                    className={`font-number mt-1 leading-tight ${p.hero
                        ? "text-5xl text-[#000000] sm:text-7xl"
                        : "text-[#D4AF37] text-4xl sm:text-6xl"
                      }`}
                  >
                    {p.amount}
                  </p>
                  <span className={`font-paragraph mt-4 text-xs ${p.hero ? "text-[#000000]/70" : "text-[#D4AF37]/80"}`}>C2C · <span className="font-number">{p.no}</span></span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Switcher ───────────────────────── */

export default function Prizes() {
  return (
    <>
      <div className="hidden md:block">
        <PodiumPrizes />
      </div>
      <div className="md:hidden">
        <TicketPrizes />
      </div>
    </>
  );
}