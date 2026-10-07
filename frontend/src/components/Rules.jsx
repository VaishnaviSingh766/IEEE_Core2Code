import React from "react";
import Header from "../utils/Header";

const RULES = [
  "Participants must register in teams and compete in the track corresponding to their academic year.",
  "Participants must report to the venue on time. Late entry may result in disqualification from the respective round.",
  "All rounds must be completed within the specified time limits. Late submissions will not be considered.",
  "Participants must follow the rules and instructions provided by the organizers and event coordinators throughout the event.",
  "Use of unfair means, plagiarism, impersonation, or copying another team's work will result in immediate disqualification.",
  "For the MCQ and DSA rounds, participants must not use unauthorized external assistance, including mobile phones, internet resources, or AI tools, unless explicitly permitted.",
  "In the final round, teams must identify a problem within the assigned domain and develop their solution within the given 6-hour time limit.",
  "Final submissions must include the required GitHub repository link, deployed link (if available), problem statement, proposed solution, and an explanation of its uniqueness and impact.",
  "Any external APIs, datasets, libraries, or resources used in the final project must be properly acknowledged.",
  "The decision of the judges and organizing committee regarding evaluation, tie-breakers, disqualification, and final results will be final.",
];

const Rules = () => {
  return (
    <section
      aria-labelledby="rules-heading"
      className="min-h-screen bg-black px-5 py-16 text-white sm:px-8 sm:py-6 lg:px-10"
    >
      <div className="mx-auto max-w-5xl">
        <Header as="h1" className="mb-12 sm:mb-16" id="rules-heading">
          Rules
        </Header>

        <div className="mt-8 font-paragraph space-y-5 text-base leading-7 text-white/80 sm:mt-12 sm:space-y-6 sm:text-lg sm:leading-8 md:mt-8">
          {RULES.map((rule, index) => (
            <p key={rule} className="m-0">
              <span className="font-number mr-3 text-[#D4AF37]">
                {index + 1}.
              </span>
              {rule}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Rules;