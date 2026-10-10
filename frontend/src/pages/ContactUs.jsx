import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  ZoomControl,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Button from "../utils/Button";
import Header from "../utils/Header";

/* =========================================================
   SIT MARKER ICON
========================================================= */

const sitIcon = new L.DivIcon({
  className: "sit-custom-marker",
  html: `
    <div class="sit-marker-circle">
      <span>★</span>
    </div>
  `,
  iconSize: [42, 42],
  iconAnchor: [21, 21],
});

/* =========================================================
   SIDDAGANGA INSTITUTE OF TECHNOLOGY LOCATION
========================================================= */

const SIT_POSITION = [13.32692, 77.12606];

/* =========================================================
   MAP CONTROLLER
========================================================= */

function MapController({ onExplore }) {
  const map = useMap();

  const goToSIT = () => {
    onExplore();

    map.flyTo(SIT_POSITION, 17, {
      duration: 2.2,
      easeLinearity: 0.25,
    });
  };

  return (
    <button
      type="button"
      onClick={goToSIT}
      className="
        absolute
        bottom-5
        left-1/2
        z-[1000]
        flex
        -translate-x-1/2
        items-center
        gap-3
        whitespace-nowrap
        rounded-xl
        bg-[#F5C542]
        px-7
        py-3.5
        text-sm
        font-extrabold
        text-black
        shadow-[0_8px_30px_rgba(245,197,66,0.35)]
        transition-all
        duration-300
        hover:scale-105
        hover:bg-white
        active:scale-95
      "
    >
      <span className="text-xl">⌖</span>
      Explore SIT on Map
    </button>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function ContactUs() {
  const [mapExplored, setMapExplored] = useState(false);

  /* =======================================================
     SEND MESSAGE
  ======================================================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const phone = form.elements.phone.value.trim();
    const message = form.elements.message.value.trim();

    const fixedToEmail = "ieee@sit.ac.in";
    const subject = `${name} - ${phone}`;

    const body = `Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}`;

    const mailtoLink =
      `mailto:${fixedToEmail}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  };

  return (
    <div
      className="
        min-h-screen
        overflow-x-hidden
        bg-[#050505]
        text-white
      "
    >
      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="
          mx-auto
          max-w-[1320px]
          px-6
          pb-16
          pt-24
          sm:px-8
          lg:px-10
        "
      >
        <div className="flex flex-col items-center text-center">
          <Header
            as="h1"
            className="
              text-[48px]
              leading-none
              tracking-[-2px]
              text-[#F5C542]
              sm:text-[58px]
              lg:text-[68px]
            "
          >
            Contact Us
          </Header>

          <div
            className="
              mt-5
              h-[4px]
              w-[68px]
              rounded-full
              bg-[#F5C542]
            "
          />
        </div>

        <h2
          className="
            font-mistical
            mt-8
            text-center
            text-[36px]
            leading-[1.08]
            sm:text-[46px]
            lg:text-[56px]
          "
        >
          Drop Us a{" "}
          <strong className="text-[#F5C542]">
            Message
          </strong>
        </h2>

        <p
          className="
            font-paragraph
            mx-auto
            mt-6
            max-w-[760px]
            text-center
            text-sm
            leading-[1.7]
            text-[#BDBDBD]
            sm:text-base
          "
        >
          Have a question about the event? We're here to help. Reach out to us
          for any queries regarding registrations, schedules, venue or anything
          else.
        </p>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main
        className="
          mx-auto
          grid
          w-full
          max-w-[1320px]
          grid-cols-1
          items-stretch
          gap-8
          px-5
          pb-20
          sm:px-8
          lg:grid-cols-2
          lg:px-10
        "
      >
        {/* =================================================
            SEND MESSAGE CARD
        ================================================= */}

        <section
          className="
            relative
            flex
            h-full
            overflow-hidden
            rounded-[17px]
            border
            border-[rgba(212,175,55,0.39)]
            bg-[rgba(255,255,255,0.06)]
            px-7
            pb-9
            pt-10
            shadow-[0_15px_45px_rgba(0,0,0,0.35)]
            sm:px-10
            sm:pb-11
            sm:pt-12
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              rounded-[17px]
              border
              border-white/10
            "
          />

          <div className="relative flex w-full flex-col">
            <div
              className="
                font-mistical
                mb-4
                text-left
                text-[14px]
                font-bold
                text-[#F5C542]
                sm:text-[15px]
              "
            >
              Send us a message
            </div>

            <h2
              className="
                font-mistical
                mb-8
                text-left
                text-[30px]
                leading-[1.25]
                sm:text-[34px]
              "
            >
              We'd{" "}
              <strong className="text-[#F5C542]">
                Love
              </strong>{" "}
              to Hear from You
            </h2>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="flex flex-1 flex-col"
            >
              <input
                name="name"
                type="text"
                placeholder="Your Name"
                required
                className="
                  mb-4 h-[58px] w-full rounded-[10px]
                  border border-[#555] bg-[#0B0B0B]
                  px-5 text-[15px] text-white outline-none
                  placeholder:text-[#AAA] transition-all duration-200
                  focus:border-[#F5C542]
                  focus:ring-1 focus:ring-[#F5C542]/20
                "
              />

              <input
                name="email"
                type="email"
                placeholder="Your Email"
                required
                className="
                  mb-4 h-[58px] w-full rounded-[10px]
                  border border-[#555] bg-[#0B0B0B]
                  px-5 text-[15px] text-white outline-none
                  placeholder:text-[#AAA] transition-all duration-200
                  focus:border-[#F5C542]
                  focus:ring-1 focus:ring-[#F5C542]/20
                "
              />

              <input
                name="phone"
                type="tel"
                placeholder="Your Phone Number"
                required
                className="
                  mb-4 h-[58px] w-full rounded-[10px]
                  border border-[#555] bg-[#0B0B0B]
                  px-5 text-[15px] text-white outline-none
                  placeholder:text-[#AAA] transition-all duration-200
                  focus:border-[#F5C542]
                  focus:ring-1 focus:ring-[#F5C542]/20
                "
              />

              <textarea
                name="message"
                placeholder="Your Message"
                rows="7"
                required
                className="
                  mb-5 min-h-[205px] w-full flex-1 resize-y
                  rounded-[10px] border border-[#555]
                  bg-[#0B0B0B] px-5 py-4 text-[15px]
                  text-white outline-none placeholder:text-[#AAA]
                  transition-all duration-200
                  focus:border-[#F5C542]
                  focus:ring-1 focus:ring-[#F5C542]/20
                "
              />

              <Button
                className="w-full"
                onClick={(e) => {
                  e.currentTarget.closest("form")?.requestSubmit();
                }}
              >
                Send Message
              </Button>
            </form>
          </div>
        </section>

        {/* =================================================
            LOCATION CARD
        ================================================= */}

        <section
          className="
            relative
            flex
            h-full
            overflow-hidden
            rounded-[17px]
            border
            border-[rgba(212,175,55,0.39)]
            bg-[rgba(255,255,255,0.06)]
            p-7
            shadow-[0_15px_45px_rgba(0,0,0,0.35)]
            sm:p-9
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              rounded-[17px]
              border
              border-white/10
            "
          />

          <div className="relative flex w-full flex-col">
            <div
              className="
                font-mistical
                mb-2
                text-[13px]
                font-bold
                text-[#F5C542]
              "
            >
              Our Location
            </div>

            <h2
              className="
                font-mistical
                mb-7
                text-[28px]
                leading-[1.3]
                sm:text-[30px]
              "
            >
              Find Us at the Venue
            </h2>

            <div className="mb-7 space-y-6">
              <div>
                <div
                  className="
                    font-paragraph
                    text-[14px]
                    leading-[1.45]
                    text-white
                    sm:text-[15px]
                  "
                >
                  Siddaganga Institute of Technology, Tumkur
                </div>

                <div
                  className="
                    font-paragraph
                    mt-[4px]
                    text-[12px]
                    leading-[1.45]
                    text-[#999]
                    sm:text-[13px]
                  "
                >
                  Karnataka - 572103
                </div>
              </div>

              <div>
                <div
                  className="
                    font-mistical
                    text-[15px]
                    leading-[1.45]
                    text-white
                    sm:text-[16px]
                  "
                >
                  Contact Us
                </div>

                <div className="mt-4">
                  <div
                    className="
                      font-paragraph
                      text-[14px]
                      leading-[1.35]
                      text-white
                      sm:text-[15px]
                    "
                  >
                    D Jaya Srikar
                  </div>

                  <div
                    className="
                      font-mistical
                      mt-[2px]
                      text-[12px]
                      leading-[1.35]
                      text-[#F5C542]
                      sm:text-[13px]
                    "
                  >
                    Chairman
                  </div>

                  <div
                    className="
                      font-number
                      mt-[2px]
                      text-[12px]
                      leading-[1.35]
                      text-[#999]
                      sm:text-[13px]
                    "
                  >
                    +91 8217651756
                  </div>
                </div>

                <div className="mt-5">
                  <div
                    className="
                      font-paragraph
                      text-[14px]
                      leading-[1.35]
                      text-white
                      sm:text-[15px]
                    "
                  >
                    Chetan Kumar R S
                  </div>

                  <div
                    className="
                      font-mistical
                      mt-[2px]
                      text-[12px]
                      leading-[1.35]
                      text-[#F5C542]
                      sm:text-[13px]
                    "
                  >
                    Vice Chairman
                  </div>

                  <div
                    className="
                      font-number
                      mt-[2px]
                      text-[12px]
                      leading-[1.35]
                      text-[#999]
                      sm:text-[13px]
                    "
                  >
                    +91 7676967922
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                MAP
            ================================================= */}

            <div
              className="
                relative isolate mt-auto h-[390px] w-full
                transform-gpu overflow-hidden rounded-[16px]
                border-2 border-[#F5C542] bg-[#02070c]
                shadow-[0_0_35px_rgba(245,197,66,0.12)]
                sm:h-[430px]
              "
            >
              <MapContainer
                center={[20.5937, 78.9629]}
                zoom={5}
                scrollWheelZoom={true}
                dragging={true}
                zoomControl={false}
                className="relative z-0 h-full w-full"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />

                <Marker
                  position={SIT_POSITION}
                  icon={sitIcon}
                />

                <ZoomControl position="topright" />

                <MapController
                  onExplore={() => setMapExplored(true)}
                />
              </MapContainer>

              {/* LOCATION LABEL ONLY — NO YELLOW POPUP */}

              <div
                className="
                  pointer-events-none
                  absolute left-4 top-4 z-[1000]
                  max-w-[calc(100%-80px)]
                  rounded-xl border border-[#F5C542]/70
                  bg-[#05090d]/90 px-4 py-2
                  shadow-lg backdrop-blur-md
                "
              >
                <div
                  className="
                    text-[10px] font-bold uppercase
                    tracking-[2px] text-[#F5C542]
                  "
                >
                  Location
                </div>

                <div className="mt-1 text-sm font-bold text-white">
                  {mapExplored
                    ? "Siddaganga Institute of Technology"
                    : "India"}
                </div>

                {mapExplored && (
                  <div className="mt-1 text-[11px] text-[#D0D0D0]">
                    Tumakuru, Karnataka
                  </div>
                )}
              </div>

              {/* MAP STYLING */}

              <style>{`
                .leaflet-container {
                  background: #02070c !important;
                  font-family: Arial, Helvetica, sans-serif;
                }

                .sit-custom-marker {
                  background: transparent;
                  border: none;
                }

                .sit-marker-circle {
                  display: flex;
                  width: 42px;
                  height: 42px;
                  align-items: center;
                  justify-content: center;
                  border: 3px solid #ffffff;
                  border-radius: 50%;
                  background: #F5C542;
                  color: #050505;
                  font-size: 22px;
                  box-shadow:
                    0 0 0 5px rgba(245, 197, 66, 0.25),
                    0 0 22px rgba(245, 197, 66, 0.65);
                }

                .leaflet-control-zoom {
                  border: 1px solid rgba(245,197,66,0.7) !important;
                  border-radius: 12px !important;
                  overflow: hidden;
                  box-shadow: 0 8px 25px rgba(0,0,0,0.5) !important;
                }

                .leaflet-control-zoom a {
                  width: 46px !important;
                  height: 46px !important;
                  line-height: 46px !important;
                  background: rgba(5,9,13,0.94) !important;
                  color: #F5C542 !important;
                  border-bottom: 1px solid rgba(245,197,66,0.35) !important;
                  font-size: 24px !important;
                  transition: all 0.2s ease;
                }

                .leaflet-control-zoom a:last-child {
                  border-bottom: none !important;
                }

                .leaflet-control-zoom a:hover {
                  background: #F5C542 !important;
                  color: #000 !important;
                }
              `}</style>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}