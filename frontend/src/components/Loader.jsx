import { useEffect, useState } from "react";
import "../CompoFiles/Core2CodeLoader.css";

function Word({ text, letterCount, initialDirection }) {
  return (
    <span className="loader-word" style={{ width: `${letterCount}ch` }} aria-hidden="true">
      {text.slice(0, letterCount).split("").map((letter, index) => (
        <span
          className={`loader-letter${index === 0 && initialDirection !== 0 ? " loader-letter-opening" : index === 0 ? "" : " loader-letter-entering"}`}
          key={`${index}-${letter}`}
          style={{
            "--rise-offset":
              index === 0
                ? `${initialDirection * 0.16}em`
                : index % 2 === 0
                  ? "-0.16em"
                  : "0.16em",
            "--spin-start":
              index === 0
                ? initialDirection < 0
                  ? "-1800deg"
                  : "1800deg"
                : index % 2 === 0
                  ? "-720deg"
                  : "720deg",
          }}
        >
          {letter}
        </span>
      ))}
    </span>
  );
}

export default function Core2CodeLoader({ onComplete }) {
  const [stage, setStage] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setStage(3);
      return;
    }
    if (stage === 3) return;

    const timeoutId = window.setTimeout(() => {
      setStage((currentStage) => currentStage + 1);
    }, stage === 0 ? 1400 : 600);

    return () => window.clearTimeout(timeoutId);
  }, [reducedMotion, stage]);

  useEffect(() => {
    if (stage !== 3) return;

    const timeoutId = window.setTimeout(
      () => onComplete?.(),
      reducedMotion ? 0 : 900,
    );
    return () => window.clearTimeout(timeoutId);
  }, [onComplete, reducedMotion, stage]);

  const letterCount = stage + 1;
  const initialDirection = stage === 0 ? -1 : 0;

  return (
    <main
      className="flex min-h-screen w-full items-center justify-center overflow-hidden bg-black font-sans text-[clamp(3rem,10vw,9.375rem)] font-black italic leading-none tracking-[-0.08em] text-[#d4af37]"
      role="status"
      aria-label="Loading Core2Code"
    >
      <div className="flex items-center whitespace-nowrap" aria-hidden="true">
        <Word text="CORE" letterCount={letterCount} initialDirection={initialDirection} />
        <span className="mx-[0.08em] text-white">2</span>
        <Word text="CODE" letterCount={letterCount} initialDirection={-initialDirection} />
      </div>
    </main>
  );
}
