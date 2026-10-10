import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../utils/Button";
import Header from "../utils/Header";

const Events = () => {
  const navigate = useNavigate();
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
          "Find a problem",
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
          "Binary Search",
          "Recursion",
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
    setSelectedRound(1);
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
        className="relative mb-0 min-h-fit overflow-hidden bg-[#000000] px-4 py-16 font-['Rajdhani',sans-serif] text-[#FFFFFF] sm:px-8 md:px-12 lg:px-20 sm:py-20"
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] bg-[size:55px_55px]" />
        </div>

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[350px] sm:h-[500px] sm:w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/[0.035] blur-[120px]" />

        <div className="relative mx-auto flex max-w-[920px] flex-col items-center justify-center">
          <div className="mb-8 sm:mb-10">
            <Header>THE EVENT</Header>
          </div>

          <div className="relative w-full rounded-[24px] sm:rounded-[30px] border border-[#D4AF37]/40 bg-[#000000] p-[1px] shadow-[0_0_60px_rgba(212,175,55,0.05)]">
            <div className="relative overflow-hidden rounded-[23px] sm:rounded-[29px] border border-[#FFFFFF]/10 px-5 py-8 sm:px-10 md:px-14 md:py-14">
              <div className="pointer-events-none absolute right-[-100px] top-[-100px] h-[280px] w-[280px] rounded-full bg-[#D4AF37]/[0.04] blur-[90px]" />

              <h1 className="relative font-mistical text-3xl font-extrabold uppercase leading-none tracking-[-0.04em] text-[#FFFFFF] sm:text-5xl md:text-6xl">
                core
                <span className="font-number text-[#D4AF37]">2</span>
                code
              </h1>

              <div className="mt-5 sm:mt-7 inline-flex rounded-xl border border-[#FFFFFF]/15 bg-[#FFFFFF]/[0.025] px-3.5 py-1.5 sm:px-4 sm:py-2">
                <span className="font-mistical text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-[#FFFFFF]/90">
                  Global coding event
                </span>
              </div>

              <p className="font-paragraph mt-6 sm:mt-8 max-w-3xl text-base font-medium leading-7 tracking-wide text-[#FFFFFF]/65 sm:text-xl md:text-2xl md:leading-10">
                A one-day technical challenge that takes you from computer
                science fundamentals to problem solving, and finally to
                building real-world solutions.
              </p>

              <div className="mt-6 sm:mt-8 flex flex-wrap gap-2.5 sm:gap-3">
                <div className="font-paragraph rounded-xl border border-[#D4AF37]/40 bg-[#000000] px-3.5 py-2 sm:px-4 sm:py-2.5 text-[11px] sm:text-xs uppercase tracking-[0.12em] text-[#FFFFFF]/90">
                  One day
                </div>

                <div className="font-paragraph rounded-xl border border-[#D4AF37]/40 bg-[#000000] px-3.5 py-2 sm:px-4 sm:py-2.5 text-[11px] sm:text-xs uppercase tracking-[0.12em] text-[#FFFFFF]/90">
                  Three rounds
                </div>

                <div className="font-paragraph rounded-xl border border-[#D4AF37]/40 bg-[#000000] px-3.5 py-2 sm:px-4 sm:py-2.5 text-[11px] sm:text-xs uppercase tracking-[0.12em] text-[#FFFFFF]/90">
                  Two tracks
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <Button
                  className="font-paragraph !min-w-0 w-full sm:w-auto sm:!min-w-[190px] !h-12 sm:!h-[56px]"
                  onClick={() => navigate("/registrations")}
                >
                  REGISTER NOW
                </Button>

                <Button
                  className="font-paragraph !min-w-0 w-full sm:w-auto sm:!min-w-[190px] !h-12 sm:!h-[56px]"
                  onClick={openTracks}
                >
                  EXPLORE TRACKS
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showTracks && (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-[#000000]/90 backdrop-blur-md">
          <div className="flex min-h-screen items-center justify-center px-3 py-4 sm:px-6 sm:py-8">
            <div className="relative w-full max-w-[900px]">
              <div className="absolute -inset-[1px] rounded-[22px] sm:rounded-[28px] border border-[#D4AF37]/70" />

              <div className="relative rounded-[22px] sm:rounded-[28px] border border-[#FFFFFF]/10 bg-[#000000] px-4 py-6 sm:px-8 md:px-12 md:py-10 shadow-[0_0_70px_rgba(212,175,55,0.07)]">
                <div>
                  <p className="font-mistical text-lg font-extrabold uppercase tracking-[-0.04em] text-[#FFFFFF]/75 sm:text-2xl">
                    core
                    <span className="font-number text-[#D4AF37]">2</span>
                    code
                  </p>

                  <h2 className="font-mistical mt-2 sm:mt-3 text-2xl font-medium tracking-tight text-[#FFFFFF] sm:text-4xl md:text-5xl">
                    Explore your track
                  </h2>

                  <p className="font-paragraph mt-2 sm:mt-3 text-xs text-[#FFFFFF]/45 sm:text-base">
                    Pick your year, then see how the three rounds work.
                  </p>
                </div>

                <div className="mx-auto mt-6 sm:mt-8 flex max-w-[520px] rounded-xl border border-[#FFFFFF]/10 bg-[#000000] p-1">
                  <button
                    type="button"
                    onClick={() => selectTrack("first")}
                    className={`font-paragraph flex-1 rounded-lg px-2.5 py-2.5 text-xs transition-all duration-300 sm:px-3 sm:py-3 sm:text-sm ${
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
                    className={`font-paragraph flex-1 rounded-lg px-2.5 py-2.5 text-xs transition-all duration-300 sm:px-3 sm:py-3 sm:text-sm ${
                      selectedTrack === "second"
                        ? "bg-[#D4AF37] font-semibold text-[#000000]"
                        : "text-[#FFFFFF]/50 hover:text-[#FFFFFF]"
                    }`}
                  >
                    Second & third year
                  </button>
                </div>

                <div className="mx-auto mt-6 sm:mt-8 flex max-w-[650px] items-start">
                  <button
                    type="button"
                    onClick={() => setSelectedRound(1)}
                    className="flex min-w-0 flex-1 flex-col items-center"
                  >
                    <div
                      className={`font-number flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border text-xs sm:text-sm transition-all duration-300 ${
                        selectedRound === 1
                          ? "border-[#D4AF37] bg-[#D4AF37] text-[#000000] shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                          : "border-[#FFFFFF]/20 bg-[#000000] text-[#FFFFFF]"
                      }`}
                    >
                      1
                    </div>

                    <span
                      className={`font-mistical mt-1.5 sm:mt-2 text-center text-[9px] sm:text-xs font-medium truncate max-w-[75px] sm:max-w-none ${
                        selectedRound === 1
                          ? "text-[#D4AF37]"
                          : "text-[#FFFFFF]/40"
                      }`}
                    >
                      The Foundation
                    </span>
                  </button>

                  <div className={`mt-[15px] sm:mt-[18px] h-px flex-1 transition-all duration-500 ${
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
                      className={`font-number flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border text-xs sm:text-sm transition-all duration-300 ${
                        selectedRound === 2
                          ? "border-[#D4AF37] bg-[#D4AF37] text-[#000000] shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                          : "border-[#FFFFFF]/20 bg-[#000000] text-[#FFFFFF]"
                      }`}
                    >
                      2
                    </div>

                    <span
                      className={`font-mistical mt-1.5 sm:mt-2 text-center text-[9px] sm:text-xs font-medium truncate max-w-[75px] sm:max-w-none ${
                        selectedRound === 2
                          ? "text-[#D4AF37]"
                          : "text-[#FFFFFF]/40"
                      }`}
                    >
                      DSA Arena
                    </span>
                  </button>

                  <div className={`mt-[15px] sm:mt-[18px] h-px flex-1 transition-all duration-500 ${
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
                      className={`font-number flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border text-xs sm:text-sm transition-all duration-300 ${
                        selectedRound === 3
                          ? "border-[#D4AF37] bg-[#D4AF37] text-[#000000] shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                          : "border-[#FFFFFF]/20 bg-[#000000] text-[#FFFFFF]"
                      }`}
                    >
                      3
                    </div>

                    <span
                      className={`font-mistical mt-1.5 sm:mt-2 text-center text-[9px] sm:text-xs font-medium truncate max-w-[75px] sm:max-w-none ${
                        selectedRound === 3
                          ? "text-[#D4AF37]"
                          : "text-[#FFFFFF]/40"
                      }`}
                    >
                      Final Build
                    </span>
                  </button>
                </div>

                <div className="mx-auto mt-6 sm:mt-8 max-w-[650px]">
                  <div className="rounded-2xl border border-[#FFFFFF]/10 bg-[#000000] p-4 sm:p-7 shadow-[0_0_30px_rgba(255,255,255,0.02)]">
                    <p className="font-paragraph text-xs sm:text-sm text-[#FFFFFF]/40">
                      Round <span className="font-number">{currentRound.number}</span> of <span className="font-number">3</span>
                    </p>

                    <h3 className="font-mistical mt-1 sm:mt-2 text-xl sm:text-2xl md:text-3xl font-medium text-[#FFFFFF]">
                      {currentRound.title}
                    </h3>

                    <p className="font-paragraph mt-3 sm:mt-4 text-xs sm:text-sm leading-6 sm:leading-7 text-[#FFFFFF]/55 md:text-base">
                      {currentRound.description}
                    </p>

                    <div className="mt-4 sm:mt-5 space-y-2 sm:space-y-2.5">
                      {currentRound.points.map((point) => (
                        <div
                          key={point}
                          className="flex items-start gap-2.5 sm:gap-3"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-1 md:mt-2 h-2.5 w-4 shrink-0 bg-[#D4AF37] [clip-path:polygon(0_25%,65%_25%,65%_0,100%_50%,65%_100%,65%_75%,0_75%)]"
                          />

                          <span className="font-paragraph text-xs sm:text-sm leading-5 sm:leading-6 text-[#FFFFFF]/85">
                            {point}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 sm:mt-5 flex flex-wrap gap-2">
                      {currentRound.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-paragraph rounded-lg border border-[#FFFFFF]/10 bg-[#000000] px-2.5 py-1 text-[11px] sm:text-xs text-[#FFFFFF]/65"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 sm:mt-7 flex items-center justify-between gap-3 sm:gap-4">
                      <Button
                        className="font-paragraph !min-w-0 flex-1 sm:flex-initial sm:!min-w-[150px] !h-11 sm:!h-[54px]"
                        onClick={previousRound}
                        disabled={selectedRound === 1}
                      >
                        BACK
                      </Button>

                      {selectedRound < 3 ? (
                        <Button
                          className="font-paragraph !min-w-0 flex-1 sm:flex-initial sm:!min-w-[150px] !h-11 sm:!h-[54px]"
                          onClick={nextRound}
                        >
                          NEXT
                        </Button>
                      ) : (
                        <Button
                          className="font-paragraph !min-w-0 flex-1 sm:flex-initial sm:!min-w-[170px] !h-11 sm:!h-[54px]"
                          onClick={() => navigate("/registrations")}
                        >
                          REGISTER NOW
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 sm:mt-8 flex items-center justify-center gap-3 sm:gap-4">
                  <Button
                    className="font-paragraph !min-w-0 flex-1 sm:flex-initial sm:!min-w-[190px] !h-12 sm:!h-[56px]"
                    onClick={() => navigate("/registrations")}
                  >
                    REGISTER NOW
                  </Button>

                  <Button
                    className="font-paragraph !min-w-0 flex-1 sm:flex-initial sm:!min-w-[190px] !h-12 sm:!h-[56px]"
                    onClick={closeTracks}
                  >
                    CLOSE
                  </Button>
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