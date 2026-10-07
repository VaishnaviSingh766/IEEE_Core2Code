import { useEffect, useState } from "react";
import Header from "../utils/Header.jsx";

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
const MS_PER_CHAR = 30;

/* ---------- Typed answer ---------- */
function Answer({ text, open, reduce }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!open) return;
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
    <p className="m-0 px-[22px] pb-[22px] pl-14 min-h-[1.7em] font-mono text-sm leading-[1.7] text-[#F5E6A8] max-[520px]:pl-[22px]">
      <span className="absolute w-px h-px overflow-hidden [clip:rect(0_0_0_0)] whitespace-nowrap">
        {text}
      </span>
      <span aria-hidden="true">
        <span className="mr-2 text-[#D4AF37]">$</span>
        {text.slice(0, count)}
        {open && count < text.length && (
          <span className="inline-block w-2 h-[1.1em] ml-0.5 bg-[#D4AF37] align-[-0.15em] animate-[c2cBlink_0.8s_steps(2)_infinite]" />
        )}
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
    <section
      id="faq"
      className="bg-[#000000] text-[#FFFFFF] py-24 px-5"
      aria-labelledby="faq-heading"
    >
      {/* Single keyframe rule — cannot be expressed as a Tailwind utility */}
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@500;800&display=swap");
        @keyframes c2cBlink { 50% { opacity: 0; } }
      `}</style>

      <div className="max-w-3xl mx-auto">
       
          <Header>FAQ</Header>
        

        <div className="grid gap-3">
          {items.map((item, i) => {
            const open = openIndex === i;
            return (
              <div
                key={item.q}
                className={[
                  "relative overflow-hidden rounded-2xl border transition-all duration-300",
                  open
                    ? "border-[#D4AF37] bg-gradient-to-b from-[#1a1608] to-[#111111] shadow-[0_26px_70px_-36px_rgba(212,175,55,0.4)]"
                    : "border-[#FFFFFF]/[0.09] bg-[#111111] hover:border-[#D4AF37]/50",
                ].join(" ")}
              >
                {/* Golden top progress bar */}
                <span
                  className={[
                    "absolute left-0 top-0 h-0.5 bg-[#D4AF37] shadow-[0_0_12px_#D4AF37] transition-[width] duration-[900ms] [transition-timing-function:cubic-bezier(0.2,0.8,0.2,1)]",
                    open ? "w-full" : "w-0",
                  ].join(" ")}
                />

                <h3 className="m-0">
                  <button
                    type="button"
                    id={`faq-btn-${i}`}
                    className="flex items-center gap-4 w-full m-0 px-[22px] py-5 bg-transparent border-0 rounded-2xl text-[#FFFFFF] font-[inherit] text-lg font-medium text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D4AF37] focus-visible:-outline-offset-2"
                    aria-expanded={open}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpenIndex(open ? null : i)}
                  >
                    {/* Prompt symbol */}
                    <span
                      aria-hidden="true"
                      className={[
                        "font-mono text-[15px] text-[#D4AF37] transition-[transform,text-shadow] duration-[350ms]",
                        open ? "translate-x-1 [text-shadow:0_0_12px_#D4AF37]" : "",
                      ].join(" ")}
                    >
                      &gt;_
                    </span>

                    {/* Question text */}
                    <span
                      className={[
                        "flex-1 font-paragraph text-lg leading-relaxed text-center transition-colors duration-300",
                        open ? "text-[#D4AF37]" : "text-white",
                      ].join(" ")}
                    >
                      {item.q}
                    </span>

                    {/* Plus / Minus toggle icon */}
                    <span
                      aria-hidden="true"
                      className={[
                        "relative flex-none w-[30px] h-[30px] rounded-full border transition-[transform,background,border-color] duration-[400ms]",
                        open
                          ? "bg-[#D4AF37] border-[#D4AF37] rotate-180"
                          : "bg-transparent border-[#FFFFFF]/[0.09]",
                      ].join(" ")}
                    >
                      {/* Horizontal bar */}
                      <span
                        className={[
                          "absolute left-1/2 top-1/2 w-3 h-[1.5px] -translate-x-1/2 -translate-y-1/2 transition-colors duration-[400ms]",
                          open ? "bg-[#000000]" : "bg-[#D4AF37]",
                        ].join(" ")}
                      />
                      {/* Vertical bar */}
                      <span
                        className={[
                          "absolute left-1/2 top-1/2 w-3 h-[1.5px] -translate-x-1/2 -translate-y-1/2 transition-[transform,background] duration-[400ms]",
                          open ? "bg-[#000000] rotate-0" : "bg-[#D4AF37] rotate-90",
                        ].join(" ")}
                      />
                    </span>
                  </button>
                </h3>

                {/* Answer panel — CSS grid trick for smooth height animation */}
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  className={[
                    "grid transition-[grid-template-rows] duration-[450ms] ease-[ease]",
                    open ? "grid-rows-[1fr] visible" : "grid-rows-[0fr] invisible",
                  ].join(" ")}
                >
                  <div className="overflow-hidden">
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