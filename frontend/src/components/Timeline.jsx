import { useEffect, useRef, useState } from "react";

/* ===== EDIT YOUR EVENT DATA HERE ===== */
// th = scroll point (0 to 1) where the row boards
const DEFAULT_PHASES = [
  { t: "REGISTRATION", d: "Feb – Mar 2025", tag: "DONE", th: 0.1, items: [["Registrations open", 1], ["Problem statements out", 1], ["Sponsor outreach", 1]] },
  { t: "ONLINE ROUND", d: "Apr 2025", tag: "ACTIVE", th: 0.45, items: [["Coding test", 1], ["Shortlist teams", 0], ["Mentor sessions", 0]] },
  { t: "FINALE", d: "24 Oct 2026", tag: "UPCOMING", th: 0.82, items: [["Live build", 0], ["Demo & judging", 0], ["Awards & closing", 0]] },
];
// Finale date & time: the countdown target (set your real date and timezone)
const DEFAULT_FINALE = "2026-10-24T10:00:00+05:30";
/* ===================================== */

const A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const STEPS = ["R", "2", "D"]; // third tile: CORE -> CO2E -> CODE
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const sh = (c) => (c === " " ? "" : c);

/* One flap tile. Same squash-and-swap animation as the original page:
   "big" squashes just the letter (swap at 80ms), "ch" squashes the whole tile. */
function Tile({ value = " ", mode = "ch", locked = false, className = "" }) {
  const [shown, setShown] = useState(value);
  const [n, setN] = useState(0);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return undefined; }
    if (value === " ") { setShown(" "); return undefined; } // blanking is instant
    setN((k) => k + 1);
    const id = setTimeout(() => setShown(value), mode === "big" ? 80 : 0);
    return () => clearTimeout(id);
  }, [value, mode]);

  if (mode === "big") {
    return (
      <div className={`tile${locked ? " lock" : ""}`}>
        <span key={n} className={n ? "f" : ""}>{sh(shown)}</span>
      </div>
    );
  }
  return <span key={n} className={`ch ${className}${n ? " f" : ""}`}>{sh(shown)}</span>;
}

/* A row of small tiles that scrambles through random letters, then settles. */
function FlapText({ text, active, base = 0, className = "" }) {
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
    <div className="txt">
      {chars.map((ch, i) => <Tile key={i} value={vals[i] ?? " "} className={ch === " " ? "sp" : className} />)}
    </div>
  );
}

/* Live flap countdown: FINALE IN  00 d 20 h 23 m 03 s */
function Countdown({ target }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const ms = Math.max(0, new Date(target).getTime() - now);
  const parts = [
    ["d", String(Math.floor(ms / 864e5)).padStart(2, "0")],
    ["h", String(Math.floor(ms / 36e5) % 24).padStart(2, "0")],
    ["m", String(Math.floor(ms / 6e4) % 60).padStart(2, "0")],
    ["s", String(Math.floor(ms / 1e3) % 60).padStart(2, "0")],
  ];
  return (
    <div className="count" role="timer" aria-label={ms ? "Time left until the finale" : "The finale is live"}>
      <span className="lab">{ms ? "FINALE IN" : "FINALE LIVE"}</span>
      {parts.map(([unit, str]) => (
        <span className="g" key={unit}>
          {[...str].map((c, j) => <Tile key={j} value={c} className="cd" />)}
          <em>{unit}</em>
        </span>
      ))}
    </div>
  );
}

function Row({ phase, on, open, statusWords }) {
  return (
    <article className={"row" + (on ? " on" : "") + (open ? " open" : "")}>
      <div className="line">
        <FlapText text={phase.t} active={on} />
        <div className="st"><FlapText text={statusWords[phase.tag] || phase.tag} active={on} className="stc" /></div>
      </div>
      <div className="date">{on ? phase.d : ""}</div>
      <ul className="ri">
        {phase.items.map(([name, ok]) => (
          <li key={name} className={ok ? "done" : ""}><i>{ok ? "\u2713" : ""}</i>{name}</li>
        ))}
      </ul>
    </article>
  );
}

export default function Core2CodeTimeline({
  phases = DEFAULT_PHASES,
  statusWords = {},
  finaleDate = DEFAULT_FINALE,
  title = "TIMELINE",
  stickyTop = "64px", // set to your fixed navbar height (or "0px" if you have none)
  className = "", // extra classes for the outer wrapper, e.g. "-mt-16" to pull it closer to the section above
  scrollDistance = "clamp(1100px, 190vh, 2000px)", // how far you scroll while the timeline is pinned (responsive; any CSS length)
}) {
  const root = useRef(null);
  const stageRef = useRef(null);
  const spacerRef = useRef(null);
  const [p, setP] = useState(0);
  const [on, setOn] = useState(() => phases.map(() => false));

  // scroll progress (0 to 1) of this section
  useEffect(() => {
    const el = root.current;
    let raf = 0;
    const calc = () => {
      raf = 0;
      if (!el) return;
      const st = stageRef.current;
      const top = parseFloat(getComputedStyle(st || el).top) || 0;
      // the stage stays pinned for exactly the spacer's height
      const max = spacerRef.current ? spacerRef.current.offsetHeight : 0;
      setP(max > 0 ? clamp((top - el.getBoundingClientRect().top) / max) : 0);
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

  // Third tile steps R -> 2 when the middle phase boards, then 2 -> D when the finale boards
  const lastI = phases.length - 1;
  const midI = Math.min(1, lastI);
  const stage = on[lastI] ? 2 : midI !== lastI && on[midI] ? 1 : 0;

  const lastOn = on.lastIndexOf(true);
  const word = ["C", "O", STEPS[stage], "E"];

  return (
    <div className={`c2c ${className}`.trim()} ref={root}>
      <style>{CSS}</style>
      <div className="stage" ref={stageRef} style={{ top: stickyTop }}>
        <h1 className="title">{title}</h1>
        <div className="word" role="img" aria-label="Core to Code">
          {word.map((c, i) => <Tile key={i} value={c} mode="big" locked={i === 2} />)}
        </div>
        <Countdown target={finaleDate} />
        <div className="board">
          {phases.map((ph, i) => (
            <Row key={ph.t} phase={ph} on={on[i]} open={i === lastOn} statusWords={statusWords} />
          ))}
        </div>
        <div className="hint" style={{ opacity: p < 0.03 ? 1 : 0 }}>SCROLL TO COMPILE</div>
      </div>
      <div ref={spacerRef} aria-hidden="true" style={{ height: scrollDistance }} />
    </div>
  );
}

const CSS = `
@import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@500;800&family=Rajdhani:wght@500;600&display=swap");
.c2c{--bg:#000000;--gold:#D4AF37;--dim:rgba(212,175,55,.3);--tile:#0d0d0d;--text:#FFFFFF;--muted:rgba(255,255,255,.55);position:relative;background:var(--bg);color:var(--text);font-family:Rajdhani,system-ui,-apple-system,"Segoe UI",sans-serif;font-size:17px;box-sizing:border-box}
.c2c *{box-sizing:border-box}
.c2c .stage{position:sticky;top:0;display:flex;flex-direction:column;gap:clamp(8px,1.8vh,16px);max-width:560px;margin:0 auto;padding:clamp(10px,2.2vh,18px) 16px}
.c2c .title{margin:0;text-align:center;font:800 clamp(24px,7.5vw,38px)/1.1 Orbitron,sans-serif;letter-spacing:.16em;padding-left:.16em;color:var(--gold);text-shadow:0 0 18px rgba(212,175,55,.45)}
.c2c .word{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
.c2c .tile{position:relative;aspect-ratio:3/4;max-height:24vh;background:var(--tile);border:1px solid rgba(212,175,55,.22);border-radius:8px;display:grid;place-items:center;overflow:hidden;font:800 clamp(54px,17vw,96px)/1 Orbitron,sans-serif;color:var(--gold);text-shadow:0 0 18px rgba(212,175,55,.45);transition:background .4s,color .4s}
.c2c .tile::after{content:"";position:absolute;left:0;right:0;top:50%;height:3px;margin-top:-1px;background:#000;box-shadow:0 1px 0 rgba(255,255,255,.07)}
.c2c .tile.lock{background:var(--gold);border-color:var(--gold);color:#000;text-shadow:none;box-shadow:0 0 40px rgba(212,175,55,.5)}
.c2c .tile span.f{animation:c2c-fl .18s ease-in-out}
@keyframes c2c-fl{50%{transform:scaleY(.04)}}
.c2c .count{display:flex;align-items:center;gap:6px;font:500 12px Orbitron,sans-serif;color:var(--muted)}
.c2c .count .lab{margin-right:4px;white-space:nowrap;font-size:clamp(10px,3vw,12px)}
.c2c .count .g{display:flex;align-items:flex-end;gap:0}
.c2c .count .g em{font:normal 600 12px Rajdhani,sans-serif;color:var(--gold);margin:0 clamp(3px,1.6vw,8px) 3px 2px}
.c2c .ch.cd{font-size:clamp(14px,4.6vw,20px);border-radius:5px;color:var(--text);margin-right:2px}
.c2c .board{display:grid;gap:clamp(6px,1.2vh,10px)}
.c2c .row{border:1px solid var(--dim);background:rgba(13,13,13,.75);padding:12px 14px;opacity:.45;transition:opacity .4s,border-color .4s,box-shadow .4s}
.c2c .row.on{opacity:1;border-color:var(--gold);box-shadow:0 0 30px rgba(212,175,55,.14)}
.c2c .line{display:flex;justify-content:space-between;align-items:center;gap:10px}
.c2c .txt{display:flex;font-size:0;line-height:0}
.c2c .ch{display:inline-grid;place-items:center;width:.95em;height:1.5em;margin-right:2px;background:var(--tile);border-radius:3px;font:500 15px Orbitron,sans-serif;color:var(--text);position:relative;overflow:hidden}
.c2c .ch::after{content:"";position:absolute;left:0;right:0;top:50%;height:1px;background:#000}
.c2c .ch.sp{background:none}
.c2c .ch.sp::after{display:none}
.c2c .ch.f{animation:c2c-fl .12s ease-in-out}
.c2c .st .ch{color:var(--gold);font-size:11px}
.c2c .date{color:var(--gold);font-weight:600;font-size:15px;margin-top:6px;min-height:18px}
.c2c .ri{list-style:none;margin:0;padding:0;display:grid;gap:5px;max-height:0;opacity:0;overflow:hidden;transition:max-height .5s,opacity .5s,margin .5s}
.c2c .row.open .ri{max-height:120px;opacity:1;margin-top:10px}
.c2c .ri li{display:flex;gap:10px;align-items:center;font-size:17px}
.c2c .ri i{flex:none;width:14px;height:14px;border:1.5px solid var(--dim);display:grid;place-items:center;font:normal 10px/1 sans-serif;color:#000}
.c2c .ri li.done i{background:var(--gold);border-color:var(--gold)}
.c2c .hint{text-align:center;font:500 11px Orbitron,sans-serif;color:var(--gold);transition:opacity .4s}
@media (max-width:480px),(max-height:720px){
.c2c .word{gap:6px}
.c2c .tile{max-height:17vh}
.c2c .row{padding:9px 12px}
.c2c .date{margin-top:4px;min-height:16px;font-size:14px}
.c2c .row.open .ri{margin-top:8px}
.c2c .ri{gap:4px}
.c2c .ri li{font-size:16px}
.c2c .hint{font-size:10px}
}
`;