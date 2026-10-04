import React, { useEffect, useState } from "react";

const Events = () => {
  const [showTracks, setShowTracks] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState("second");
  const [selectedRound, setSelectedRound] = useState(2);

  const trackData = {
    first: [
      {
        number: 1,
        title: "The Foundation",
        description:
          "Build your programming fundamentals and strengthen your problem-solving skills.",
        points: [
          "Basic programming concepts",
          "Logical thinking",
          "Programming fundamentals",
        ],
        tags: ["C", "C++", "Java", "Logic"],
      },
      {
        number: 2,
        title: "DSA Arena",
        description:
          "Put your problem-solving skills to the test with data structures and algorithms.",
        points: [
          "Arrays and strings",
          "Searching and sorting",
          "Data structures",
        ],
        tags: ["Arrays", "Strings", "Sorting", "DSA"],
      },
      {
        number: 3,
        title: "Final Build",
        description:
          "Turn your ideas into a practical solution for a real-world problem.",
        points: [
          "Understand the given theme",
          "Find a meaningful problem",
          "Build your solution",
        ],
        tags: ["Ideas", "Problem", "Build", "Solution"],
      },
    ],

    second: [
      {
        number: 1,
        title: "The Foundation",
        description:
          "Test your understanding of computer science fundamentals and core concepts.",
        points: [
          "Computer science fundamentals",
          "Core subject concepts",
          "Logical problem solving",
        ],
        tags: ["OS", "DBMS", "CN", "OOP"],
      },
      {
        number: 2,
        title: "DSA Arena",
        description: "Hard problems, tight time limits.",
        points: [
          "Graph and tree problems",
          "Dynamic programming",
          "Optimisation under constraints",
        ],
        tags: ["Graphs", "Trees", "DP", "Greedy"],
      },
      {
        number: 3,
        title: "Final Build",
        description:
          "Solve a real-world problem and transform your idea into a working solution.",
        points: [
          "Analyse the given theme",
          "Identify the problem",
          "Build a practical solution",
        ],
        tags: ["Problem", "Solution", "Build", "Innovation"],
      },
    ],
  };

  const currentRound =
    trackData[selectedTrack][selectedRound - 1];

  useEffect(() => {
    if (showTracks) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showTracks]);

  const openTracks = () => {
    setSelectedTrack("second");
    setSelectedRound(2);
    setShowTracks(true);
  };

  const closeTracks = () => {
    setShowTracks(false);
  };

  const selectTrack = (track) => {
    setSelectedTrack(track);
    setSelectedRound(1);
  };

  const nextRound = () => {
    if (selectedRound < 3) {
      setSelectedRound((previous) => previous + 1);
    }
  };

  const previousRound = () => {
    if (selectedRound > 1) {
      setSelectedRound((previous) => previous - 1);
    }
  };

  return (
    <>
      {/* ============================================================
          EVENT COMPONENT
      ============================================================ */}

      <section
        id="events"
        className="relative min-h-screen overflow-hidden bg-[#050505] px-5 py-20 font-['Rajdhani',sans-serif] text-white sm:px-8 md:px-12 lg:px-20"
      >
        {/* Background grid */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] bg-[size:55px_55px]" />
        </div>

        {/* Background glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e4bd3d]/[0.035] blur-[120px]" />

        {/* Decorative dots */}
        <div className="absolute left-[8%] top-[15%] h-1 w-1 rounded-full bg-[#e4bd3d]" />
        <div className="absolute right-[12%] top-[30%] h-1 w-1 rounded-full bg-[#e4bd3d]" />
        <div className="absolute bottom-[20%] left-[10%] h-1 w-1 rounded-full bg-[#e4bd3d]" />
        <div className="absolute bottom-[12%] right-[8%] h-1 w-1 rounded-full bg-[#e4bd3d]" />

        <div className="relative mx-auto flex min-h-screen max-w-[920px] flex-col items-center justify-center">
          <h2 className="mb-8 text-center font-['Orbitron',sans-serif] text-3xl font-extrabold uppercase leading-none tracking-[0.16em] text-[#e4bd3d] sm:text-4xl md:text-5xl">
            THE EVENTS
          </h2>

          {/* Main event card */}
          <div className="relative w-full rounded-[30px] border border-[#80691f] bg-[#080909] p-[1px] shadow-[0_0_60px_rgba(228,189,61,0.05)]">
            <div className="relative overflow-hidden rounded-[29px] border border-[#292a26] px-6 py-10 sm:px-10 md:px-14 md:py-14">
              {/* Inner glow */}
              <div className="pointer-events-none absolute right-[-100px] top-[-100px] h-[280px] w-[280px] rounded-full bg-[#e4bd3d]/[0.04] blur-[90px]" />

              {/* Small decorative dots */}
              <div className="absolute left-5 top-12 h-1 w-1 rounded-full bg-[#e4bd3d]" />
              <div className="absolute right-7 top-24 h-1 w-1 rounded-full bg-[#e4bd3d]" />
              <div className="absolute bottom-14 right-7 h-1 w-1 rounded-full bg-[#e4bd3d]" />

              {/* Event name */}
              <h1 className="relative font-['Orbitron',sans-serif] text-4xl font-extrabold uppercase leading-none tracking-[-0.04em] sm:text-5xl md:text-6xl">
                core
                <span className="text-[#e4bd3d]">2</span>
                code
              </h1>

              {/* Event type */}
              <div className="mt-7 inline-flex rounded-xl border border-white/15 bg-white/[0.025] px-4 py-2">
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-white/90">
                  Global coding event
                </span>
              </div>

              {/* Description */}
              <p className="mt-8 max-w-3xl text-lg font-medium leading-8 tracking-wide text-white/65 sm:text-xl md:text-2xl md:leading-10">
                A one-day technical challenge that takes you from computer
                science fundamentals to problem solving, and finally to
                building real-world solutions.
              </p>

              {/* Event information */}
              <div className="mt-8 flex flex-wrap gap-3">
                <div className="rounded-xl border border-[#65551f] bg-black px-4 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-white/90">
                  One day
                </div>

                <div className="rounded-xl border border-[#65551f] bg-black px-4 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-white/90">
                  Three rounds
                </div>

                <div className="rounded-xl border border-[#65551f] bg-black px-4 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-white/90">
                  Two tracks
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                {/* Register */}
                <button
                  type="button"
                  className="w-[180px] whitespace-nowrap rounded-2xl bg-[#e4bd3d] px-2 py-3.5 font-['Orbitron',sans-serif] text-[10px] font-bold uppercase tracking-[0.1em] text-black shadow-[0_0_35px_rgba(228,189,61,0.12)] transition-all duration-300 hover:bg-[#f0ca4c] hover:shadow-[0_0_40px_rgba(228,189,61,0.2)] sm:w-auto sm:px-7 sm:text-xs sm:tracking-[0.14em]"
                >
                  Register now
                </button>

                {/* Explore */}
                <button
                  type="button"
                  onClick={openTracks}
                  className="w-[180px] whitespace-nowrap rounded-2xl border border-[#d3ae35] px-2 py-3.5 font-['Orbitron',sans-serif] text-[10px] font-bold uppercase tracking-[0.1em] text-[#e4bd3d] transition-all duration-300 hover:bg-[#e4bd3d] hover:text-black sm:w-auto sm:px-7 sm:text-xs sm:tracking-[0.14em]"
                >
                  Explore tracks
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          EXPLORE TRACKS OVERLAY
          This stays inside Events.jsx.
      ============================================================ */}

      {showTracks && (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/90 backdrop-blur-md">
          {/* Outer container */}
          <div className="flex min-h-screen items-center justify-center px-4 py-6 sm:px-8">
            <div className="relative w-full max-w-[900px]">
              {/* Gold outer border */}
              <div className="absolute -inset-[1px] rounded-[28px] border border-[#8e7625]/70" />

              {/* Main detail panel */}
              <div className="relative rounded-[28px] border border-white/10 bg-[#070808] px-5 py-8 shadow-[0_0_70px_rgba(228,189,61,0.07)] sm:px-8 md:px-12 md:py-10">
                {/* Close button */}
                <button
                  type="button"
                  onClick={closeTracks}
                  aria-label="Close tracks"
                  className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-xl text-white/70 transition-all duration-300 hover:border-[#e4bd3d] hover:bg-[#e4bd3d] hover:text-black"
                >
                  ×
                </button>

                {/* Heading */}
                <div className="pr-12">
                  <p className="text-sm text-white/40">
                    core
                    <span className="text-[#e4bd3d]">2</span>
                    code
                  </p>

                  <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl">
                    Explore your track
                  </h2>

                  <p className="mt-3 text-sm text-white/45 sm:text-base">
                    Pick your year, then see how the three rounds work.
                  </p>
                </div>

                {/* Track selector */}
                <div className="mx-auto mt-8 flex max-w-[520px] rounded-xl border border-white/10 bg-[#0b0c0c] p-1">
                  <button
                    type="button"
                    onClick={() => selectTrack("first")}
                    className={`flex-1 rounded-lg px-3 py-3 text-xs transition-all duration-300 sm:text-sm ${
                      selectedTrack === "first"
                        ? "bg-[#e4bd3d] font-semibold text-black"
                        : "text-white/50 hover:text-white"
                    }`}
                  >
                    First year
                  </button>

                  <button
                    type="button"
                    onClick={() => selectTrack("second")}
                    className={`flex-1 rounded-lg px-3 py-3 text-xs transition-all duration-300 sm:text-sm ${
                      selectedTrack === "second"
                        ? "bg-[#e4bd3d] font-semibold text-black"
                        : "text-white/50 hover:text-white"
                    }`}
                  >
                    Second & third year
                  </button>
                </div>

                {/* Round navigation */}
                <div className="mx-auto mt-8 flex max-w-[650px] items-start">
                  {/* Round 1 */}
                  <button
                    type="button"
                    onClick={() => setSelectedRound(1)}
                    className="flex min-w-0 flex-1 flex-col items-center"
                  >
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm transition-all duration-300 ${
                        selectedRound === 1
                          ? "border-[#e4bd3d] bg-[#e4bd3d] text-black shadow-[0_0_20px_rgba(228,189,61,0.3)]"
                          : "border-white/20 bg-[#070808] text-white"
                      }`}
                    >
                      1
                    </div>

                    <span
                      className={`mt-2 text-center text-[10px] sm:text-xs ${
                        selectedRound === 1
                          ? "text-[#e4bd3d]"
                          : "text-white/40"
                      }`}
                    >
                      The Foundation
                    </span>
                  </button>

                  {/* Line */}
                  <div className="mt-[18px] h-px flex-1 bg-white/10" />

                  {/* Round 2 */}
                  <button
                    type="button"
                    onClick={() => setSelectedRound(2)}
                    className="flex min-w-0 flex-1 flex-col items-center"
                  >
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm transition-all duration-300 ${
                        selectedRound === 2
                          ? "border-[#e4bd3d] bg-[#e4bd3d] text-black shadow-[0_0_20px_rgba(228,189,61,0.3)]"
                          : "border-white/20 bg-[#070808] text-white"
                      }`}
                    >
                      2
                    </div>

                    <span
                      className={`mt-2 text-center text-[10px] sm:text-xs ${
                        selectedRound === 2
                          ? "text-[#e4bd3d]"
                          : "text-white/40"
                      }`}
                    >
                      DSA Arena
                    </span>
                  </button>

                  {/* Line */}
                  <div className="mt-[18px] h-px flex-1 bg-white/10" />

                  {/* Round 3 */}
                  <button
                    type="button"
                    onClick={() => setSelectedRound(3)}
                    className="flex min-w-0 flex-1 flex-col items-center"
                  >
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm transition-all duration-300 ${
                        selectedRound === 3
                          ? "border-[#e4bd3d] bg-[#e4bd3d] text-black shadow-[0_0_20px_rgba(228,189,61,0.3)]"
                          : "border-white/20 bg-[#070808] text-white"
                      }`}
                    >
                      3
                    </div>

                    <span
                      className={`mt-2 text-center text-[10px] sm:text-xs ${
                        selectedRound === 3
                          ? "text-[#e4bd3d]"
                          : "text-white/40"
                      }`}
                    >
                      Final Build
                    </span>
                  </button>
                </div>

                {/* Round content */}
                <div className="mx-auto mt-8 max-w-[650px]">
                  <div className="rounded-2xl border border-white/10 bg-[#0a0b0b] p-5 shadow-[0_0_30px_rgba(255,255,255,0.02)] sm:p-7">
                    {/* Round number */}
                    <p className="text-sm text-white/40">
                      Round {currentRound.number} of 3
                    </p>

                    {/* Title */}
                    <h3 className="mt-2 text-2xl font-medium sm:text-3xl">
                      {currentRound.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-4 text-sm leading-7 text-white/55 sm:text-base">
                      {currentRound.description}
                    </p>

                    {/* Points */}
                    <div className="mt-5 space-y-2.5">
                      {currentRound.points.map((point) => (
                        <div
                          key={point}
                          className="flex items-start gap-3"
                        >
                          <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] bg-[#e4bd3d] text-[10px] font-black text-black">
                            ✓
                          </span>

                          <span className="text-sm leading-6 text-white/85">
                            {point}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {currentRound.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-lg border border-white/10 bg-black px-3 py-1.5 text-xs text-white/65"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Navigation buttons */}
                    <div className="mt-7 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={previousRound}
                        disabled={selectedRound === 1}
                        className={`rounded-xl px-6 py-3 text-sm transition-all duration-300 ${
                          selectedRound === 1
                            ? "cursor-not-allowed border border-white/10 text-white/20"
                            : "border border-[#80691f] bg-black text-white hover:border-[#e4bd3d] hover:bg-[#e4bd3d] hover:text-black"
                        }`}
                      >
                        Back
                      </button>

                      {selectedRound < 3 ? (
                        <button
                          type="button"
                          onClick={nextRound}
                          className="rounded-xl bg-[#e4bd3d] px-7 py-3 text-sm font-medium text-black shadow-[0_0_25px_rgba(228,189,61,0.15)] transition-all duration-300 hover:bg-[#f0ca4c]"
                        >
                          Next
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="rounded-xl bg-[#e4bd3d] px-7 py-3 text-sm font-medium text-black shadow-[0_0_25px_rgba(228,189,61,0.15)] transition-all duration-300 hover:bg-[#f0ca4c]"
                        >
                          Register now
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom close */}
                <div className="mt-8 flex justify-center">
                  <button
                    type="button"
                    onClick={closeTracks}
                    className="text-xs text-white/30 transition hover:text-[#e4bd3d]"
                  >
                    Close event details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Events;