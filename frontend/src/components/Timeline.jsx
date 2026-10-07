import { useEffect, useRef, useState } from "react";
import Header from "../utils/Header";

/* ===== EDIT YOUR EVENT DATA HERE ===== */
// th = scroll point (0 to 1) where the row boards
const DEFAULT_PHASES = [
  { t: "REGISTRATION", d: "Feb – Mar 2025", tag: "", th: 0.12, items: [["Registrations open", 1], ["Problem statements out", 1], ["Sponsor outreach", 1]] },
  { t: "ONLINE ROUND", d: "Apr 2025", tag: "", th: 0.45, items: [["Coding test", 1], ["Shortlist teams", 0], ["Mentor sessions", 0]] },
  { t: "FINALE", d: "May 2025", tag: "", th: 0.78, items: [["Live build", 0], ["Demo & judging", 0], ["Awards & closing", 0]] },
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
const BASE_CSS = `@keyframes c2c-fl{50%{transform:scaleY(.04)}}`;

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
    const tileFont = /^\d$/.test(shown) ? "font-number" : "font-core";
    return (
      <div
        className={
          "relative grid aspect-[3/4] max-h-[15vh] min-w-0 [@media(max-height:600px)]:max-h-[11vh] place-items-center overflow-hidden rounded-md border sm:max-h-[20vh] sm:rounded-lg " +
          `${tileFont} text-[length:clamp(30px,min(11vw,9vh),84px)] leading-none ` +
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
  const tileFont = variant === "status" ? "font-mistical" : "font-heading";
  return (
    <span
      key={n}
      className={
        "relative mr-px inline-grid h-[1.5em] w-[.95em] place-items-center overflow-hidden rounded-[3px] sm:mr-0.5 " +
        `${tileFont} text-[length:clamp(10px,3.3vw,15px)] leading-normal ` +
        (isSpace
          ? ""
          : "bg-[#0d0d0d] ") +
        (variant === "status" ? "text-[#D4AF37] !text-[length:clamp(8px,2.4vw,11px)] " : "text-white ") +
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
        "border px-2 py-1.5 transition-[opacity,border-color,box-shadow] duration-300 sm:px-3 sm:py-2.5 " +
        (on
          ? "border-[#D4AF37] bg-[rgba(13,13,13,.75)] opacity-100 shadow-[0_0_30px_rgba(212,175,55,.14)]"
          : "border-[rgba(212,175,55,.3)] bg-[rgba(13,13,13,.75)] opacity-45")
      }
    >
      <div className="flex items-center justify-between gap-2">
        <FlapText text={phase.t} active={on} />
        <div className="flex-none">
          <FlapText text={statusWords[phase.tag] || phase.tag} active={on} variant="status" />
        </div>
      </div>
      <div className="font-paragraph mt-0.5 min-h-[15px] text-[length:clamp(12px,3.4vw,15px)] leading-tight text-[#D4AF37] sm:mt-1 sm:min-h-[18px]">{on ? phase.d : ""}</div>
      <ul
        className={
          "m-0 grid list-none gap-0.5 overflow-hidden p-0 transition-[max-height,opacity,margin] duration-300 sm:gap-1 " +
          (open ? "mt-1.5 max-h-[110px] opacity-100 sm:mt-2" : "max-h-0 opacity-0")
        }
      >
        {phase.items.map(([name, ok]) => (
          <li key={name} className="font-paragraph flex items-center gap-2 text-[length:clamp(13px,3.7vw,16px)] leading-tight sm:gap-2.5">
            <span
              aria-hidden="true"
              className="h-2.5 w-4 flex-none bg-[#D4AF37] [clip-path:polygon(0_25%,65%_25%,65%_0,100%_50%,65%_100%,65%_75%,0_75%)]"
            />
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
  scrollPerEvent = 80, // vh of scrolling per event: lower = faster
  scrollLength, // optional manual override, e.g. "300vh"
}) {
  const root = useRef(null);
  const stk = useRef(null);
  const hMax = useRef(0); // tallest the pinned card has been (keeps maths stable)
  const totalLen = scrollLength || `${phases.length * scrollPerEvent}vh`;
  const [p, setP] = useState(0);
  const [idx, setIdx] = useState(0);
  const [on, setOn] = useState(() => phases.map(() => false));

  // scroll progress (0 to 1) of this section.
  // The card is only as tall as its content and is pinned in the middle of the
  // screen, so there is no empty black space above or below it.
  useEffect(() => {
    const el = root.current;
    const card = stk.current;
    let raf = 0;
    const calc = () => {
      raf = 0;
      if (!el || !card) return;
      hMax.current = Math.max(hMax.current, card.offsetHeight);
      const H = hMax.current;
      const top = Math.max(8, (window.innerHeight - H) / 2);
      card.style.top = top + "px";
      const max = el.offsetHeight - H;
      const np = max > 0 ? clamp((top - el.getBoundingClientRect().top) / max) : 0;
      setP((old) => (Math.abs(old - np) < 0.001 ? old : np));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(calc); };
    const onResize = () => { hMax.current = 0; onScroll(); };
    calc();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(onScroll) : null;
    if (ro && card) ro.observe(card);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (ro) ro.disconnect();
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
      style={{ height: totalLen, overflowAnchor: "none" }}
      className="relative bg-black font-paragraph text-[15px] text-white"
    >
      <style>{BASE_CSS}</style>
      <div
        ref={stk}
        className="will-change-transform sticky top-2 mx-auto flex max-w-[560px] flex-col gap-2 px-2 py-1 sm:gap-3 sm:px-4 sm:py-2 md:max-w-[600px]"
      >
        <Header as="h2" className="m-0 pl-[.3em] text-[length:clamp(16px,5vw,28px)] uppercase tracking-[.3em] [text-shadow:0_0_18px_rgba(212,175,55,.45)]">
          {heading}
        </Header>

        <div className="grid grid-cols-4 gap-1.5 sm:gap-2" role="img" aria-label="Core to Code">
          {word.map((c, i) => <Tile key={i} value={c} mode="big" locked={i === 2} />)}
        </div>

        <div className="font-mistical flex items-center gap-2 text-[10px] text-[#D4AF37] sm:gap-3 sm:text-xs">
          <span className="whitespace-nowrap">CORE &rarr; CODE</span>
          <span className="h-[3px] flex-1 bg-[rgba(212,175,55,.2)]">
            <b className="block h-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" style={{ width: `${p * 100}%`, transition: "width .12s linear" }} />
          </span>
          <span className="font-number">{Math.round(p * 100)}%</span>
        </div>

        <div className="grid gap-1.5 sm:gap-2">
          {phases.map((ph, i) => (
            <Row key={ph.t} phase={ph} on={on[i]} open={i === lastOn} statusWords={statusWords} />
          ))}
        </div>

        <div
          className="font-mistical text-center text-[11px] text-[#D4AF37] transition-opacity duration-[400ms]"
          style={{ opacity: p < 0.03 ? 1 : 0 }}
        >
          
        </div>
      </div>
    </div>
  );
}