import { useEffect, useState } from "react";

/* ---------- Content: edit these ---------- */
const FAQS = [
  {
    q: "Who can participate?",
    a: "Engineering students. First-years compete in Track A. Second and third-years compete in Track B.",
  },
  {
    q: "Is it team based?",
    a: "Yes. Every team has exactly 2 members and both compete in all three rounds.",
  },
  {
    q: "Can students from different branches participate?",
    a: "Yes, as long as both members are in the same track (same year group).",
  },
  {
    q: "What should participants bring?",
    a: "A laptop with charger, your college ID and the tools you like to build with.",
  },
  {
    q: "How are winners selected?",
    a: "Rounds 1 and 2 shortlist teams by score. In Round 3, judges score the prototype and presentation, and the top team in each track wins.",
  },
];

// Typing speed: milliseconds per character (higher = slower)
const MS_PER_CHAR = 45;

/* ---------- Styles (scoped, no Tailwind needed) ---------- */
const css = `
.c2c-faq{background:#0A0A0A;color:#FAFAFA;padding:96px 20px}
.c2c-faq *,.c2c-faq *::before,.c2c-faq *::after{box-sizing:border-box}
.c2c-faq .wrap{max-width:768px;margin:0 auto}
.c2c-faq h2{margin:0 0 12px;font-size:clamp(32px,5vw,52px);line-height:1.08;letter-spacing:-.03em;font-weight:700}
.c2c-faq .lead{margin:0 0 40px;color:#A1A1AA;font-size:17px}
.c2c-faq .list{display:grid;gap:12px}
.c2c-faq .item{position:relative;overflow:hidden;background:#111111;border:1px solid rgba(255,255,255,.09);border-radius:16px;transition:border-color .3s,box-shadow .4s,background .4s}
.c2c-faq .item:hover{border-color:rgba(212,175,55,.5)}
.c2c-faq .item.open{border-color:#D4AF37;background:linear-gradient(180deg,#1a1608,#111111);box-shadow:0 26px 70px -36px rgba(255,215,0,.4)}
.c2c-faq .item::before{content:"";position:absolute;left:0;top:0;height:2px;width:0;background:#FFD700;box-shadow:0 0 12px #FFD700;transition:width .9s cubic-bezier(.2,.8,.2,1)}
.c2c-faq .item.open::before{width:100%}
.c2c-faq .btn{display:flex;align-items:center;gap:16px;width:100%;margin:0;padding:20px 22px;background:none;border:0;border-radius:16px;color:#FAFAFA;font:inherit;font-size:18px;font-weight:500;text-align:left;cursor:pointer}
.c2c-faq .btn:focus-visible{outline:2px solid #FFD700;outline-offset:-2px}
.c2c-faq .prompt{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:15px;color:#FFD700;transition:transform .35s,text-shadow .35s}
.c2c-faq .btn:hover .prompt,.c2c-faq .open .prompt{transform:translateX(4px);text-shadow:0 0 12px #FFD700}
.c2c-faq .q{flex:1;transition:color .3s}
.c2c-faq .btn:hover .q,.c2c-faq .open .q{color:#FFD700}
.c2c-faq .pm{position:relative;flex:none;width:30px;height:30px;border-radius:50%;border:1px solid rgba(255,255,255,.09);transition:transform .4s,background .4s,border-color .4s}
.c2c-faq .pm::before,.c2c-faq .pm::after{content:"";position:absolute;left:50%;top:50%;width:12px;height:1.5px;margin:-.75px 0 0 -6px;background:#FFD700;transition:transform .4s,background .4s}
.c2c-faq .pm::after{transform:rotate(90deg)}
.c2c-faq .open .pm{background:#FFD700;border-color:#FFD700;transform:rotate(180deg)}
.c2c-faq .open .pm::before,.c2c-faq .open .pm::after{background:#0A0A0A}
.c2c-faq .open .pm::after{transform:rotate(0)}
.c2c-faq .panel{display:grid;grid-template-rows:0fr;visibility:hidden;transition:grid-template-rows .45s ease,visibility 0s .45s}
.c2c-faq .open .panel{grid-template-rows:1fr;visibility:visible;transition:grid-template-rows .45s ease,visibility 0s}
.c2c-faq .panel>div{overflow:hidden}
.c2c-faq .out{margin:0;padding:0 22px 22px 56px;min-height:1.7em;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:14px;line-height:1.7;color:#F5E6A8}
.c2c-faq .dollar{margin-right:8px;color:#FFD700}
.c2c-faq .cr{display:inline-block;width:8px;height:1.1em;margin-left:2px;background:#FFD700;vertical-align:-.15em;animation:c2cBlink .8s steps(2) infinite}
.c2c-faq .sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
@keyframes c2cBlink{50%{opacity:0}}
@media(max-width:520px){.c2c-faq .out{padding-left:22px}.c2c-faq .btn{font-size:16px}}
@media(prefers-reduced-motion:reduce){.c2c-faq *,.c2c-faq *::before,.c2c-faq *::after{transition:none!important;animation:none!important}}
`;

/* ---------- Typed answer ---------- */
function Answer({ text, open, reduce }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!open) return; // keep text as-is while the panel collapses
    if (reduce) {
      setCount(text.length);
      return;
    }
    let c = 0;
    setCount(0);
    const id = setInterval(() => {
      c += 1;
      setCount(c);
      if (c >= text.length) clearInterval(id);
    }, MS_PER_CHAR);
    return () => clearInterval(id);
  }, [open, text, reduce]);

  return (
    <p className="out">
      <span className="sr">{text}</span>
      <span aria-hidden="true">
        <span className="dollar">$</span>
        {text.slice(0, count)}
        {open && count < text.length && <span className="cr" />}
      </span>
    </p>
  );
}

/* ---------- Component ---------- */
export default function Faqs({ items = FAQS }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [reduce] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  return (
    <section id="faq" className="c2c-faq" aria-labelledby="faq-heading">
      <style>{css}</style>
      <div className="wrap">
        <h2 id="faq-heading">Questions, answered.</h2>
        <p className="lead">Can't find yours? Reach the organizers below.</p>

        <div className="list">
          {items.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={item.q} className={`item${open ? " open" : ""}`}>
                <h3 style={{ margin: 0 }}>
                  <button
                    type="button"
                    id={`faq-btn-${i}`}
                    className="btn"
                    aria-expanded={open}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpenIndex(open ? null : i)}
                  >
                    <span className="prompt" aria-hidden="true">&gt;_</span>
                    <span className="q">{item.q}</span>
                    <i className="pm" aria-hidden="true" />
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  className="panel"
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                >
                  <div>
                    <Answer text={item.a} open={open} reduce={reduce} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}