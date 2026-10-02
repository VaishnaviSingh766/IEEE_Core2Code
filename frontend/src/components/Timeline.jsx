import { useEffect, useRef, useState } from "react";

/* ===== EDIT YOUR EVENT DATA HERE ===== */
// th = scroll point (0 to 1) where the row boards
const DEFAULT_PHASES = [
  { t: "REGISTRATION", d: "Feb – Mar 2025", tag: "DONE", th: 0.1, items: [["Registrations open", 1], ["Problem statements out", 1], ["Sponsor outreach", 1]] },
  { t: "ONLINE ROUND", d: "Apr 2025", tag: "ACTIVE", th: 0.45, items: [["Coding test", 1], ["Shortlist teams", 0], ["Mentor sessions", 0]] },
  { t: "FINALE", d: "May 2025", tag: "UPCOMING", th: 0.82, items: [["Live build", 0], ["Demo & judging", 0], ["Awards & closing", 0]] },
];
/* ===================================== */

const A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // used only for the row text scramble

/* The third tile shows these in order as you scroll: CORE -> CO2E -> CODE.
   Add more entries (e.g. ["R","S","T","D"]) to get more steps. */
const SEQ = ["R", "2", "D"];
const ROLL_END = 0.75;        // scroll point where the tile finishes on the last entry
const STEPS = SEQ.length - 1;
const STEP_MS = 160;          // time between steps

const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const sh = (c) => (c === " " ? "" : c);

/* Tailwind can't define @keyframes or @import fonts without a config change,
   so this tiny stylesheet is the only plain CSS in the file. */
const BASE_CSS = `
@import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@500;800&family=Rajdhani:wght@500;600&display=swap");
@keyframes c2c-fl{50%{transform:scaleY(.04)}}
`;

/* One flap tile.
   mode "big": large tile, only the letter squashes (swap at 35ms).
   mode "ch" : small tile, the whole tile squashes.
   variant   : "" | "space" | "status" (small tiles only) */
function Tile({ value = " ", mode = "ch", locked = false, variant = "" }) {
  const [shown, setShown] = useState(value);
  const [n, setN] = useState(0);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return undefined; }
    if (value === " ") { setShown(" "); return undefined; } // blanking is instant
    setN((k) => k + 1);
    const id = setTimeout(() => setShown(value), mode === "big" ? 35 : 0);
    return () => clearTimeout(id);
  }, [value, mode]);

  if (mode === "big") {
    return (
      <div
        className={
          "relative grid aspect-[3/4] max-h-[24vh] place-items-center overflow-hidden rounded-lg border " +
          "font-['Orbitron',sans-serif] text-[length:clamp(54px,17vw,96px)] font-extrabold leading-none " +
          "transition-[background-color,color] duration-[400ms] " +
          "after:absolute after:inset-x-0 after:top-1/2 after:-mt-px after:h-[3px] after:bg-black " +
          "after:shadow-[0_1px_0_rgba(255,255,255,.07)] after:content-[''] " +
          (locked
            ? "border-[#D4AF37] bg-[#D4AF37] text-black shadow-[0_0_40px_rgba(212,175,55,.5)]"
            : "border-[rgba(212,175,55,.22)] bg-[#0d0d0d] text-[#D4AF37] [text-shadow:0_0_18px_rgba(212,175,55,.45)]")
        }
      >
        <span key={n} className={n ? "animate-[c2c-fl_.14s_ease-in-out]" : ""}>{sh(shown)}</span>
      </div>
    );
  }

  const isSpace = variant === "space";
  return (
    <span
      key={n}
      className={
        "relative mr-0.5 inline-grid h-[1.5em] w-[.95em] place-items-center overflow-hidden rounded-[3px] " +
        "font-['Orbitron',sans-serif] text-[15px] font-medium leading-normal " +
        (isSpace
          ? ""
          : "bg-[#0d0d0d] after:absolute after:inset-x-0 after:top-1/2 after:h-px after:bg-black after:content-[''] ") +
        (variant === "status" ? "text-[#D4AF37] !text-[11px] " : "text-white ") +
        (n ? "animate-[c2c-fl_.12s_ease-in-out]" : "")
      }
    >
      {sh(shown)}
    </span>
  );
}

/* A row of small tiles that scrambles through random letters, then settles. */
function FlapText({ text, active, base = 0, variant = "" }) {
  const chars = [...text];
  const [vals, setVals] = useState(() => chars.map(() => " "));

  useEffect(() => {
    const cs = [...text];
    if (!active) { setVals(cs.map(() => " ")); return undefined; }
    const ivs = [];
    const starts = [];
    cs.forEach((ch, i) => {
      if (ch === " ") return;
      starts.push(setTimeout(() => {
        let k = 0;
        const tot = 5 + i * 2;
        const iv = setInterval(() => {
          k += 1;
          setVals((v) => { const c = [...v]; c[i] = k >= tot ? ch : A[(Math.random() * 26) | 0]; return c; });
          if (k >= tot) clearInterval(iv);
        }, 55);
        ivs.push(iv);
      }, base));
    });
    return () => { starts.forEach(clearTimeout); ivs.forEach(clearInterval); };
  }, [active, text, base]);

  return (
    <div className="flex text-[0px] leading-[0]">
      {chars.map((ch, i) => (
        <Tile key={i} value={vals[i] ?? " "} variant={ch === " " ? "space" : variant} />
      ))}
    </div>
  );
}

function Row({ phase, on, open, statusWords }) {
  return (
    <article
      className={
        "border px-3.5 py-3 transition-[opacity,border-color,box-shadow] duration-[400ms] " +
        (on
          ? "border-[#D4AF37] bg-[rgba(13,13,13,.75)] opacity-100 shadow-[0_0_30px_rgba(212,175,55,.14)]"
          : "border-[rgba(212,175,55,.3)] bg-[rgba(13,13,13,.75)] opacity-45")
      }
    >
      <div className="flex items-center justify-between gap-2.5">
        <FlapText text={phase.t} active={on} />
        <div>
          <FlapText text={statusWords[phase.tag] || phase.tag} active={on} variant="status" />
        </div>
      </div>
      <div className="mt-1.5 min-h-[18px] text-[15px] font-semibold text-[#D4AF37]">{on ? phase.d : ""}</div>
      <ul
        className={
          "m-0 grid list-none gap-[5px] overflow-hidden p-0 transition-[max-height,opacity,margin] duration-500 " +
          (open ? "mt-2.5 max-h-[120px] opacity-100" : "max-h-0 opacity-0")
        }
      >
        {phase.items.map(([name, ok]) => (
          <li key={name} className="flex items-center gap-2.5 text-[17px]">
            <i
              className={
                "grid h-3.5 w-3.5 flex-none place-items-center border-[1.5px] font-sans text-[10px] not-italic leading-none text-black " +
                (ok ? "border-[#D4AF37] bg-[#D4AF37]" : "border-[rgba(212,175,55,.3)]")
              }
            >
              {ok ? "\u2713" : ""}
            </i>
            {name}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function Core2CodeTimeline({
  phases = DEFAULT_PHASES,
  statusWords = {},
  heading = "TIMELINE",
  scrollLength = "440vh",
}) {
  const root = useRef(null);
  const [p, setP] = useState(0);
  const [idx, setIdx] = useState(0);
  const [on, setOn] = useState(() => phases.map(() => false));

  // scroll progress (0 to 1) of this section
  useEffect(() => {
    const el = root.current;
    let raf = 0;
    const calc = () => {
      raf = 0;
      if (!el) return;
      const max = el.offsetHeight - window.innerHeight;
      setP(max > 0 ? clamp(-el.getBoundingClientRect().top / max) : 0);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(calc); };
    calc();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // which rows have boarded (small hysteresis so it doesn't flicker)
  useEffect(() => {
    setOn((prev) => phases.map((ph, i) => (prev[i] ? p >= ph.th - 0.04 : p >= ph.th)));
  }, [p, phases]);

  // the third tile steps through SEQ, chasing the scroll position
  const fin = p >= phases[phases.length - 1].th;
  const target = fin ? STEPS : Math.round(clamp(p / ROLL_END) * STEPS);
  useEffect(() => {
    const id = setInterval(() => setIdx((c) => (c === target ? c : c + (c < target ? 1 : -1))), STEP_MS);
    return () => clearInterval(id);
  }, [target]);

  const lastOn = on.lastIndexOf(true);
  const word = ["C", "O", SEQ[idx], "E"];

  return (
    <div
      ref={root}
      style={{ height: scrollLength }}
      className="relative bg-black font-['Rajdhani',system-ui,-apple-system,'Segoe_UI',sans-serif] text-[17px] text-white"
    >
      <style>{BASE_CSS}</style>
      <div className="sticky top-0 mx-auto flex h-screen max-w-[560px] flex-col justify-center gap-4 p-[18px] supports-[height:100dvh]:h-[100dvh]">
        <h2 className="m-0 pl-[.3em] text-center font-['Orbitron',sans-serif] text-[length:clamp(20px,5.5vw,30px)] font-extrabold uppercase leading-none tracking-[.3em] text-[#D4AF37] [text-shadow:0_0_18px_rgba(212,175,55,.45)]">
          {heading}
        </h2>

        <div className="grid grid-cols-4 gap-2" role="img" aria-label="Core to Code">
          {word.map((c, i) => <Tile key={i} value={c} mode="big" locked={i === 2} />)}
        </div>

        <div className="flex items-center gap-3 font-['Orbitron',sans-serif] text-xs font-medium text-[#D4AF37]">
          <span>CORE &rarr; CODE</span>
          <span className="h-[3px] flex-1 bg-[rgba(212,175,55,.2)]">
            <b className="block h-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" style={{ width: `${p * 100}%` }} />
          </span>
          <span>{Math.round(p * 100)}%</span>
        </div>

        <div className="grid gap-2.5">
          {phases.map((ph, i) => (
            <Row key={ph.t} phase={ph} on={on[i]} open={i === lastOn} statusWords={statusWords} />
          ))}
        </div>

        <div
          className="text-center font-['Orbitron',sans-serif] text-[11px] font-medium text-[#D4AF37] transition-opacity duration-[400ms]"
          style={{ opacity: p < 0.03 ? 1 : 0 }}
        >
          SCROLL TO COMPILE
        </div>
      </div>
    </div>
  );
}