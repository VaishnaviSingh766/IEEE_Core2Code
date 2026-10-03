import React, { useState } from "react";

export default function ContactUs() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    e.target.reset();

    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white">

      {/* ================= HERO ================= */}

      <section className="mx-auto max-w-[1320px] px-6 pb-16 pt-20 sm:px-8 lg:px-10">

        <div className="mb-5 flex items-center gap-3.5 text-3xl font-bold text-[#F5C542] sm:text-4xl lg:text-[50px]">
          <span className="h-[3px] w-10 bg-[#F5C542] sm:w-11" />
          <span>Contact Us</span>
        </div>

        <h1 className="text-[45px] font-extrabold leading-[1.05] tracking-[-2px] sm:text-6xl lg:text-[78px]">
          Drop Us a{" "}
          <strong className="text-[#F5C542]">
            Message
          </strong>
        </h1>

        <p className="mt-6 max-w-[700px] text-sm font-medium leading-[1.65] text-[#BDBDBD] sm:text-base">
          Have a question about the event? We're here to help. Reach out to us
          for any queries regarding registrations, schedules, venue or anything
          else.
        </p>

      </section>


      {/* ================= MAIN CONTENT ================= */}

      <main className="mx-auto grid w-full max-w-[1320px] grid-cols-1 gap-8 px-5 pb-20 sm:px-8 lg:grid-cols-2 lg:px-10">

        {/* ================= SEND MESSAGE ================= */}

        <section className="relative min-h-[570px] overflow-hidden rounded-[17px] border border-[#F5C542] bg-gradient-to-br from-[#0B0B0B] to-[#111] p-7 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] sm:p-9">

          {/* Inner border */}
          <div className="pointer-events-none absolute inset-0 rounded-[17px] border border-white/20" />

          <div className="relative">

            <div className="mb-2 text-center text-[13px] font-bold text-[#F5C542]">
              Send us a message
            </div>

            <h2 className="mb-7 text-[27px] font-bold leading-[1.3]">
              We'd{" "}
              <strong className="text-[#F5C542]">
                Love
              </strong>{" "}
              to Hear from You
            </h2>

            <form onSubmit={handleSubmit} className="w-full">

              {/* Name */}
              <input
                type="text"
                placeholder="Your Name"
                required
                className="mb-4 h-[52px] w-full rounded-[10px] border border-[#555] bg-gradient-to-r from-[#111] to-[#151515] px-[17px] text-[15px] text-white outline-none transition-all duration-200 placeholder:text-[#AAA] focus:border-[#F5C542] focus:ring-1 focus:ring-[#F5C542]/20"
              />

              {/* Email */}
              <input
                type="email"
                placeholder="Your Email"
                required
                className="mb-4 h-[52px] w-full rounded-[10px] border border-[#555] bg-gradient-to-r from-[#111] to-[#151515] px-[17px] text-[15px] text-white outline-none transition-all duration-200 placeholder:text-[#AAA] focus:border-[#F5C542] focus:ring-1 focus:ring-[#F5C542]/20"
              />

              {/* Message */}
              <textarea
                placeholder="Your Message"
                rows="6"
                required
                className="mb-4 min-h-[150px] w-full resize-y rounded-[10px] border border-[#555] bg-gradient-to-r from-[#111] to-[#151515] px-[17px] py-[15px] text-[15px] text-white outline-none transition-all duration-200 placeholder:text-[#AAA] focus:border-[#F5C542] focus:ring-1 focus:ring-[#F5C542]/20"
              />

              {/* Submit */}
              <button
                type="submit"
                className="group relative h-[53px] w-full overflow-hidden rounded-[9px] bg-[#F5C542] text-[15px] font-bold text-[#171717] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_8px_30px_rgba(245,197,66,0.25)] active:scale-[0.98]"
              >
                <span className="relative z-10">
                  Send Message
                </span>

                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </button>

              {submitted && (
                <div className="mt-3 text-center text-sm text-[#F5C542]">
                  Message sent successfully!
                </div>
              )}

            </form>

          </div>

        </section>


        {/* ================= LOCATION ================= */}

        <section className="relative min-h-[570px] overflow-hidden rounded-[17px] border border-[#F5C542] bg-gradient-to-br from-[#0B0B0B] to-[#111] p-7 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] sm:p-9">

          {/* Inner border */}
          <div className="pointer-events-none absolute inset-0 rounded-[17px] border border-white/20" />

          <div className="relative">

            <div className="mb-2 text-left text-[13px] font-bold text-[#F5C542]">
              Our Location
            </div>

            <h2 className="mb-7 text-[27px] font-bold leading-[1.3]">
              Find Us at the Venue
            </h2>

            <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[0.88fr_1.12fr]">

              {/* ================= DETAILS ================= */}

              <div className="min-w-0 pt-1">

                <Info
                  icon="⌖"
                  title="Siddaganga Institute of Technology, Tumkur"
                  text="Karnataka - 572103"
                />

                <Info
                  icon="◷"
                  title="Mon - Sat, 9:00 AM - 6:00 PM"
                  text=""
                />

                <Info
                  icon="☎"
                  title="+91 98765 43210"
                  text="Event Queries"
                />

                <Info
                  icon="✉"
                  title="event@sittumkur.ac.in"
                  text="For general queries"
                />

              </div>


              {/* ================= MAP ================= */}

              <div className="relative h-[350px] w-full overflow-hidden rounded-[15px] border-2 border-[#F5C542] bg-[#E9EADE] text-[#252525] shadow-[inset_0_0_25px_rgba(0,0,0,0.12)]">

                {/* Map grid */}
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage: `
                      linear-gradient(
                        90deg,
                        rgba(100,100,100,.15) 1px,
                        transparent 1px
                      ),
                      linear-gradient(
                        rgba(100,100,100,.15) 1px,
                        transparent 1px
                      )
                    `,
                    backgroundSize: "46px 46px",
                    transform: "rotate(-1deg) scale(1.1)",
                  }}
                />

                {/* Roads */}
                <div className="absolute left-[-10%] top-[58%] z-[2] h-1 w-[125%] rotate-[17deg] bg-[#C9A227]/35" />

                <div className="absolute left-[-2%] top-[32%] z-[2] h-[5px] w-[105%] -rotate-[8deg] bg-white/80" />

                <div className="absolute left-[10%] top-[78%] z-[2] h-[3px] w-[80%] -rotate-[5deg] bg-[#BBB]" />


                {/* Distance circles */}
                <div className="absolute left-[49%] top-[36%] z-[1] h-[125px] w-[125px] rounded-full border border-dashed border-[#967828]/45" />

                <div className="absolute left-[37%] top-[24%] z-[1] h-[205px] w-[205px] rounded-full border border-dashed border-[#967828]/45" />

                <div className="absolute left-[24%] top-[12%] z-[1] h-[285px] w-[285px] rounded-full border border-dashed border-[#967828]/45" />


                {/* Places */}

                <MapPlace
                  className="left-[58%] top-[13%]"
                  text="Siddaganga Mutt"
                />

                <MapPlace
                  className="left-[13%] top-[23%] flex-col gap-[3px]"
                  text="Tumkur Bus Stand"
                  dotRight
                />

                <MapPlace
                  className="left-[-7%] top-[54%] translate-x-[18px]"
                  text="Tumkur Railway Station"
                />

                <MapPlace
                  className="right-[5%] top-[65%] flex-row-reverse"
                  text="Siddaganga Polytechnic"
                />

                <MapPlace
                  className="bottom-[16%] right-[7%] flex-row-reverse"
                  text="Kyatsandra"
                />


                {/* Main location */}
                <div className="absolute left-[75%] top-[31%] z-10 w-[220px] -translate-x-1/2 rounded-[18px] bg-[#F5C542] px-3.5 py-2.5 text-center text-[11px] font-extrabold leading-[1.3] text-[#111] shadow-[0_2px_5px_rgba(0,0,0,0.3)]">
                  Siddaganga Institute of Technology
                </div>


                {/* Pin */}
                <div className="absolute left-[59%] top-[51%] z-[7] h-8 w-6 -translate-x-1/2 -translate-y-1/2">

                  <div className="absolute left-0 top-0 h-6 w-6 rotate-[-45deg] rounded-[50%_50%_50%_0] bg-[#222]" />

                </div>


                {/* Distance text */}
                <div className="absolute bottom-[26%] right-[43%] z-[4] text-[9px] text-[#777]">
                  1 km
                </div>

                <div className="absolute bottom-[10%] right-[32%] z-[4] text-[9px] text-[#777]">
                  2 km
                </div>


                {/* Google Maps button */}
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Siddaganga+Institute+of+Technology+Tumkur"
                  target="_blank"
                  rel="noreferrer"
                  className="absolute bottom-0 left-0 right-0 z-20 flex h-[53px] items-center justify-center bg-[#E9BD28] text-[15px] font-bold text-[#242424] no-underline transition-all duration-200 hover:bg-[#F5C542] hover:text-black"
                >
                  Open in Google Maps
                </a>

              </div>

            </div>


            {/* ================= FOLLOW US ================= */}

            <div className="mt-7 border-t border-[#444] pt-[22px]">

              <div className="mb-3 text-[13px] font-bold text-[#F5C542]">
                Follow Us
              </div>

              <div className="flex gap-3">

                <SocialLink label="Instagram">
                  <svg viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle
                      cx="17.5"
                      cy="6.5"
                      r="1"
                      className="fill-current stroke-none"
                    />
                  </svg>
                </SocialLink>

                <SocialLink label="LinkedIn">
                  <svg viewBox="0 0 24 24">
                    <path
                      className="fill-current stroke-none"
                      d="
                        M4.8 3.2
                        a2.3 2.3 0 1 1 0 4.6
                        a2.3 2.3 0 0 1 0-4.6z

                        M3 9h4v12H3z

                        M9 9h3.8v1.7h.1
                        c.6-1.1 1.9-2.2 3.9-2.2
                        4.1 0 4.9 2.7 4.9 6.2V21h-4v-5.6
                        c0-1.3 0-3-1.8-3
                        -1.8 0-2.1 1.4-2.1 2.9V21H9z
                      "
                    />
                  </svg>
                </SocialLink>

                <SocialLink label="X">
                  <svg viewBox="0 0 24 24">
                    <path
                      className="fill-current stroke-none"
                      d="
                        M18.2 2.5h3.5l-7.6 8.7
                        L23 21.5h-6.8l-5.3-7
                        -6.1 7H1.3l8.1-9.3
                        L1 2.5h7l4.9 6.5z

                        M17 19.2h1.9L7 4.6H5z
                      "
                    />
                  </svg>
                </SocialLink>

                <SocialLink label="YouTube">
                  <svg viewBox="0 0 24 24">
                    <path
                      className="fill-current stroke-none"
                      d="
                        M21.6 7.2
                        a2.6 2.6 0 0 0-1.8-1.8
                        C18.2 5 12 5 12 5
                        s-6.2 0-7.8.4
                        A2.6 2.6 0 0 0 2.4 7.2
                        C2 8.8 2 12 2 12
                        s0 3.2.4 4.8
                        a2.6 2.6 0 0 0 1.8 1.8
                        C5.8 19 12 19 12 19
                        s6.2 0 7.8-.4
                        a2.6 2.6 0 0 0 1.8-1.8
                        C22 15.2 22 12 22 12
                        s0-3.2-.4-4.8z

                        M10 15.3V8.7l5.5 3.3z
                      "
                    />
                  </svg>
                </SocialLink>

              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}


/* ================================================= */
/* ================= INFO COMPONENT ================= */
/* ================================================= */

function Info({ icon, title, text }) {
  return (
    <div className="mb-[22px] flex items-start gap-[13px]">

      <div className="flex h-[39px] w-[39px] min-w-[39px] items-center justify-center rounded-full border-2 border-[#F5C542] text-[17px] font-bold text-[#F5C542] shadow-[0_0_0_2px_rgba(245,197,66,0.05)]">
        {icon}
      </div>

      <div>

        <div className="text-[14px] font-bold leading-[1.5] text-white">
          {title}
        </div>

        {text && (
          <div className="mt-[3px] text-[12px] leading-[1.45] text-[#999]">
            {text}
          </div>
        )}

      </div>

    </div>
  );
}


/* ================================================= */
/* ================= MAP PLACE ====================== */
/* ================================================= */

function MapPlace({ className = "", text, dotRight = false }) {
  return (
    <div
      className={`absolute z-[5] flex items-center gap-[6px] whitespace-nowrap text-[12px] font-semibold text-[#444] ${className}`}
    >
      {!dotRight && (
        <span className="inline-block h-[11px] w-[11px] rounded-full border-2 border-[#444] bg-[#282828]" />
      )}

      <span>{text}</span>

      {dotRight && (
        <span className="inline-block h-[11px] w-[11px] rounded-full border-2 border-[#444] bg-[#282828]" />
      )}
    </div>
  );
}


/* ================================================= */
/* ================= SOCIAL LINK ==================== */
/* ================================================= */

function SocialLink({ children, label }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="flex h-[42px] w-[42px] items-center justify-center rounded-full border-2 border-[#F5C542] text-[#F5C542] transition-all duration-300 hover:-translate-y-1 hover:bg-[#F5C542] hover:text-black hover:shadow-[0_8px_20px_rgba(245,197,66,0.25)]"
    >
      <span className="h-5 w-5">
        {React.cloneElement(children, {
          className: "h-5 w-5 fill-none stroke-current stroke-[1.8]",
        })}
      </span>
    </a>
  );
}