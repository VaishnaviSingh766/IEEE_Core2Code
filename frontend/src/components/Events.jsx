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
      <section
        id="events"
        className="relative min-h-screen overflow-hidden bg-[#000000] px-5 py-20 font-['Rajdhani',sans-serif] text-[#FFFFFF] sm:px-8 md:px-12 lg:px-20"
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] bg-[size:55px_55px]" />
        </div>

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/[0.035] blur-[120px]" />

        <div className="absolute left-[8%] top-[15%] h-1 w-1 rounded-full bg-[#D4AF37]" />
        <div className="absolute right-[12%] top-[30%] h-1 w-1 rounded-full bg-[#D4AF37]" />
        <div className="absolute bottom-[20%] left-[10%] h-1 w-1 rounded-full bg-[#D4AF37]" />
        <div className="absolute bottom-[12%] right-[8%] h-1 w-1 rounded-full bg-[#D4AF37]" />

        <div className="relative mx-auto flex min-h-[calc(100vh-10rem)] max-w-[920px] flex-col items-center justify-center">
          <h2 className="mb-8 text-center font-['Orbitron',sans-serif] text-3xl font-extrabold uppercase leading-none tracking-[0.16em] text-[#D4AF37] sm:text-4xl md:text-5xl">
            THE EVENT
          </h2>

          <div className="relative w-full rounded-[30px] border border-[#D4AF37]/40 bg-[#000000] p-[1px] shadow-[0_0_60px_rgba(212,175,55,0.05)]">
            <div className="relative overflow-hidden rounded-[29px] border border-[#FFFFFF]/10 px-6 py-10 sm:px-10 md:px-14 md:py-14">
              <div className="pointer-events-none absolute right-[-100px] top-[-100px] h-[280px] w-[280px] rounded-full bg-[#D4AF37]/[0.04] blur-[90px]" />

              <div className="absolute left-5 top-12 h-1 w-1 rounded-full bg-[#D4AF37]" />
              <div className="absolute right-7 top-24 h-1 w-1 rounded-full bg-[#D4AF37]" />
              <div className="absolute bottom-14 right-7 h-1 w-1 rounded-full bg-[#D4AF37]" />

              <h1 className="relative font-['Orbitron',sans-serif] text-4xl font-extrabold uppercase leading-none tracking-[-0.04em] text-[#FFFFFF] sm:text-5xl md:text-6xl">
                core
                <span className="text-[#D4AF37]">2</span>
                code
              </h1>

              <div className="mt-7 inline-flex rounded-xl border border-[#FFFFFF]/15 bg-[#FFFFFF]/[0.025] px-4 py-2">
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#FFFFFF]/90">
                  Global coding event
                </span>
              </div>

              <p className="mt-8 max-w-3xl text-lg font-medium leading-8 tracking-wide text-[#FFFFFF]/65 sm:text-xl md:text-2xl md:leading-10">
                A one-day technical challenge that takes you from computer
                science fundamentals to problem solving, and finally to
                building real-world solutions.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <div className="rounded-xl border border-[#D4AF37]/40 bg-[#000000] px-4 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-[#FFFFFF]/90">
                  One day
                </div>

                <div className="rounded-xl border border-[#D4AF37]/40 bg-[#000000] px-4 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-[#FFFFFF]/90">
                  Three rounds
                </div>

                <div className="rounded-xl border border-[#D4AF37]/40 bg-[#000000] px-4 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-[#FFFFFF]/90">
                  Two tracks
                </div>
              </div>

              <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  className="w-[180px] whitespace-nowrap rounded-2xl bg-[#D4AF37] px-2 py-3.5 font-['Orbitron',sans-serif] text-[10px] font-bold uppercase tracking-[0.1em] text-[#000000] shadow-[0_0_35px_rgba(212,175,55,0.12)] transition-all duration-300 hover:bg-[#D4AF37]/80 hover:shadow-[0_0_40px_rgba(212,175,55,0.2)] sm:w-auto sm:px-7 sm:text-xs sm:tracking-[0.14em]"
                >
                  Register now
                </button>

                <button
                  type="button"
                  onClick={openTracks}
                  className="w-[180px] whitespace-nowrap rounded-2xl border border-[#D4AF37] px-2 py-3.5 font-['Orbitron',sans-serif] text-[10px] font-bold uppercase tracking-[0.1em] text-[#D4AF37] transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#000000] sm:w-auto sm:px-7 sm:text-xs sm:tracking-[0.14em]"
                >
                  Explore tracks
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showTracks && (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-[#000000]/90 backdrop-blur-md">
          <div className="flex min-h-screen items-center justify-center px-4 py-6 sm:px-8">
            <div className="relative w-full max-w-[900px]">
              <div className="absolute -inset-[1px] rounded-[28px] border border-[#D4AF37]/70" />

              <div className="relative rounded-[28px] border border-[#FFFFFF]/10 bg-[#000000] px-5 py-8 shadow-[0_0_70px_rgba(212,175,55,0.07)] sm:px-8 md:px-12 md:py-10">
                <button
                  type="button"
                  onClick={closeTracks}
                  aria-label="Close tracks"
                  className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37] bg-transparent font-sans text-2xl font-normal leading-none text-[#D4AF37] transition-colors duration-300 hover:bg-[#D4AF37] hover:text-[#000000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#000000]"
                >
                  ×
                </button>

                <div className="pr-12">
                  <p className="font-['Orbitron',sans-serif] text-xl font-extrabold uppercase tracking-[-0.04em] text-[#FFFFFF]/75 sm:text-2xl">
                    core
                    <span className="text-[#D4AF37]">2</span>
                    code
                  </p>

                  <h2 className="mt-3 text-3xl font-medium tracking-tight text-[#FFFFFF] sm:text-4xl md:text-5xl">
                    Explore your track
                  </h2>

                  <p className="mt-3 text-sm text-[#FFFFFF]/45 sm:text-base">
                    Pick your year, then see how the three rounds work.
                  </p>
                </div>

                <div className="mx-auto mt-8 flex max-w-[520px] rounded-xl border border-[#FFFFFF]/10 bg-[#000000] p-1">
                  <button
                    type="button"
                    onClick={() => selectTrack("first")}
                    className={`flex-1 rounded-lg px-3 py-3 text-xs transition-all duration-300 sm:text-sm ${
                      selectedTrack === "first"
                        ? "bg-[#D4AF37] font-semibold text-[#000000]"
                        : "text-[#FFFFFF]/50 hover:text-[#FFFFFF]"
                    }`}
                  >
                    First year
                  </button>

                  <button
                    type="button"
                    onClick={() => selectTrack("second")}
                    className={`flex-1 rounded-lg px-3 py-3 text-xs transition-all duration-300 sm:text-sm ${
                      selectedTrack === "second"
                        ? "bg-[#D4AF37] font-semibold text-[#000000]"
                        : "text-[#FFFFFF]/50 hover:text-[#FFFFFF]"
                    }`}
                  >
                    Second & third year
                  </button>
                </div>

                <div className="mx-auto mt-8 flex max-w-[650px] items-start">
                  <button
                    type="button"
                    onClick={() => setSelectedRound(1)}
                    className="flex min-w-0 flex-1 flex-col items-center"
                  >
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm transition-all duration-300 ${
                        selectedRound === 1
                          ? "border-[#D4AF37] bg-[#D4AF37] text-[#000000] shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                          : "border-[#FFFFFF]/20 bg-[#000000] text-[#FFFFFF]"
                      }`}
                    >
                      1
                    </div>

                    <span
                      className={`mt-2 text-center text-[10px] sm:text-xs ${
                        selectedRound === 1
                          ? "text-[#D4AF37]"
                          : "text-[#FFFFFF]/40"
                      }`}
                    >
                      The Foundation
                    </span>
                  </button>

                  <div className={`mt-[18px] h-px flex-1 transition-all duration-500 ${
                    selectedRound >= 2
                      ? "bg-[#D4AF37] shadow-[0_0_8px_2px_rgba(212,175,55,0.6)]"
                      : "bg-[#FFFFFF]/10"
                  }`} />

                  <button
                    type="button"
                    onClick={() => setSelectedRound(2)}
                    className="flex min-w-0 flex-1 flex-col items-center"
                  >
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm transition-all duration-300 ${
                        selectedRound === 2
                          ? "border-[#D4AF37] bg-[#D4AF37] text-[#000000] shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                          : "border-[#FFFFFF]/20 bg-[#000000] text-[#FFFFFF]"
                      }`}
                    >
                      2
                    </div>

                    <span
                      className={`mt-2 text-center text-[10px] sm:text-xs ${
                        selectedRound === 2
                          ? "text-[#D4AF37]"
                          : "text-[#FFFFFF]/40"
                      }`}
                    >
                      DSA Arena
                    </span>
                  </button>

                  <div className={`mt-[18px] h-px flex-1 transition-all duration-500 ${
                    selectedRound >= 3
                      ? "bg-[#D4AF37] shadow-[0_0_8px_2px_rgba(212,175,55,0.6)]"
                      : "bg-white/10"
                  }`} />

                  <button
                    type="button"
                    onClick={() => setSelectedRound(3)}
                    className="flex min-w-0 flex-1 flex-col items-center"
                  >
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm transition-all duration-300 ${
                        selectedRound === 3
                          ? "border-[#D4AF37] bg-[#D4AF37] text-[#000000] shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                          : "border-[#FFFFFF]/20 bg-[#000000] text-[#FFFFFF]"
                      }`}
                    >
                      3
                    </div>

                    <span
                      className={`mt-2 text-center text-[10px] sm:text-xs ${
                        selectedRound === 3
                          ? "text-[#D4AF37]"
                          : "text-[#FFFFFF]/40"
                      }`}
                    >
                      Final Build
                    </span>
                  </button>
                </div>

                <div className="mx-auto mt-8 max-w-[650px]">
                  <div className="rounded-2xl border border-[#FFFFFF]/10 bg-[#000000] p-5 shadow-[0_0_30px_rgba(255,255,255,0.02)] sm:p-7">
                    <p className="text-sm text-[#FFFFFF]/40">
                      Round {currentRound.number} of 3
                    </p>

                    <h3 className="mt-2 text-2xl font-medium text-[#FFFFFF] sm:text-3xl">
                      {currentRound.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-[#FFFFFF]/55 sm:text-base">
                      {currentRound.description}
                    </p>

                    <div className="mt-5 space-y-2.5">
                      {currentRound.points.map((point) => (
                        <div
                          key={point}
                          className="flex items-start gap-3"
                        >
                          <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] bg-[#D4AF37] text-[10px] font-black text-[#000000]">
                            ✓
                          </span>

                          <span className="text-sm leading-6 text-[#FFFFFF]/85">
                            {point}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {currentRound.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-lg border border-[#FFFFFF]/10 bg-[#000000] px-3 py-1.5 text-xs text-[#FFFFFF]/65"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-7 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={previousRound}
                        disabled={selectedRound === 1}
                        className={`rounded-xl px-6 py-3 text-sm transition-all duration-300 ${
                          selectedRound === 1
                            ? "cursor-not-allowed border border-[#FFFFFF]/10 text-[#FFFFFF]/20"
                            : "border border-[#D4AF37]/50 bg-[#000000] text-[#FFFFFF] hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#000000]"
                        }`}
                      >
                        Back
                      </button>

                      {selectedRound < 3 ? (
                        <button
                          type="button"
                          onClick={nextRound}
                          className="rounded-xl bg-[#D4AF37] px-7 py-3 text-sm font-medium text-[#000000] shadow-[0_0_25px_rgba(212,175,55,0.15)] transition-all duration-300 hover:bg-[#D4AF37]/80"
                        >
                          Next
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="rounded-xl bg-[#D4AF37] px-7 py-3 text-sm font-medium text-[#000000] shadow-[0_0_25px_rgba(212,175,55,0.15)] transition-all duration-300 hover:bg-[#D4AF37]/80"
                        >
                          Register now
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col items-center gap-4">
                  <button
                    type="button"
                    className="rounded-xl bg-[#D4AF37] px-7 py-3 text-sm font-medium text-[#000000] shadow-[0_0_25px_rgba(212,175,55,0.15)] transition-all duration-300 hover:bg-[#D4AF37]/80"
                  >
                    Register now
                  </button>

                  <button
                    type="button"
                    onClick={closeTracks}
                    className="text-xs text-[#FFFFFF]/30 transition hover:text-[#D4AF37]"
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