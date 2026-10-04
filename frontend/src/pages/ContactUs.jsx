import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* =========================================================
   FIX LEAFLET MARKER ICON
========================================================= */

const sitIcon = new L.DivIcon({
  className: "sit-custom-marker",
  html: `
    <div style="
      width:42px;
      height:42px;
      border-radius:50%;
      background:#F5C542;
      border:4px solid #050505;
      box-shadow:0 0 0 5px rgba(245,197,66,0.25),
                 0 0 30px rgba(245,197,66,0.8);
      display:flex;
      align-items:center;
      justify-content:center;
      color:#050505;
      font-size:20px;
      font-weight:900;
    ">
      ★
    </div>
  `,
  iconSize: [42, 42],
  iconAnchor: [21, 21],
  popupAnchor: [0, -24],
});

/* =========================================================
   MAP LOCATION
========================================================= */

const SIT_POSITION = [13.3379, 77.1013];

/* =========================================================
   MAP CONTROLLER
========================================================= */

function MapController() {
  const map = useMap();

  const goToSIT = () => {
    map.flyTo(SIT_POSITION, 16, {
      duration: 1.8,
    });
  };

  return (
    <button
      type="button"
      onClick={goToSIT}
      className="
        absolute bottom-5 left-1/2 z-[1000]
        flex -translate-x-1/2
        items-center gap-3
        whitespace-nowrap
        rounded-xl
        bg-[#F5C542]
        px-7 py-3.5
        text-sm font-extrabold
        text-black
        shadow-[0_8px_30px_rgba(245,197,66,0.35)]
        transition-all duration-300
        hover:scale-105
        hover:bg-white
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
  const [submitted, setSubmitted] = useState(false);

  /* =======================================================
     SEND EMAIL USING MAILTO
  ======================================================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const phone = form.elements.phone.value.trim();
    const message = form.elements.message.value.trim();

    /*
      FIXED EMAIL ADDRESS
      This is the address where the message will be sent.
    */
    const fixedToEmail = "event@sittumkur.ac.in";

    /*
      NAME + PHONE GO INTO SUBJECT
    */
    const subject = `${name} - ${phone}`;

    /*
      EMAIL + MESSAGE GO INTO COMPOSE BODY
    */
    const body = `Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}`;

    /*
      OPEN USER'S DEFAULT EMAIL CLIENT
    */
    const mailtoLink =
      `mailto:${fixedToEmail}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#000000] text-white">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="mx-auto max-w-[1320px] px-6 pb-16 pt-24 sm:px-8 lg:px-10">

        <div className="flex flex-col items-center text-center">

          <h1
            className="
              text-[48px]
              font-extrabold
              leading-none
              tracking-[-2px]
              text-[#F5C542]
              sm:text-[58px]
              lg:text-[68px]
            "
          >
            Contact Us
          </h1>

          <div className="mt-5 h-[4px] w-[68px] rounded-full bg-[#F5C542]" />

        </div>

        <h2
          className="
            mt-8
            text-center
            text-[36px]
            font-extrabold
            leading-[1.08]
            tracking-[-1.5px]
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
            mx-auto
            mt-6
            max-w-[760px]
            text-center
            text-sm
            font-medium
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
            border-[#F5C542]
            bg-[#111111]
            px-7
            pb-9
            pt-10
            shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]
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
              border-white/20
            "
          />

          <div className="relative flex w-full flex-col">

            <div
              className="
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
                mb-8
                text-left
                text-[30px]
                font-bold
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


            {/* =================================================
                FORM
            ================================================= */}

            <form
              onSubmit={handleSubmit}
              className="flex flex-1 flex-col"
            >

              {/* NAME */}

              <input
                name="name"
                type="text"
                placeholder="Your Name"
                required
                className="
                  mb-4
                  h-[58px]
                  w-full
                  rounded-[10px]
                  border
                  border-[#555]
                  bg-[#0B0B0B]
                  px-5
                  text-[15px]
                  text-white
                  outline-none
                  placeholder:text-[#AAA]
                  transition-all
                  duration-200
                  focus:border-[#F5C542]
                  focus:ring-1
                  focus:ring-[#F5C542]/20
                "
              />


              {/* EMAIL */}

              <input
                name="email"
                type="email"
                placeholder="Your Email"
                required
                className="
                  mb-4
                  h-[58px]
                  w-full
                  rounded-[10px]
                  border
                  border-[#555]
                  bg-[#0B0B0B]
                  px-5
                  text-[15px]
                  text-white
                  outline-none
                  placeholder:text-[#AAA]
                  transition-all
                  duration-200
                  focus:border-[#F5C542]
                  focus:ring-1
                  focus:ring-[#F5C542]/20
                "
              />


              {/* PHONE */}

              <input
                name="phone"
                type="tel"
                placeholder="Your Phone Number"
                required
                className="
                  mb-4
                  h-[58px]
                  w-full
                  rounded-[10px]
                  border
                  border-[#555]
                  bg-[#0B0B0B]
                  px-5
                  text-[15px]
                  text-white
                  outline-none
                  placeholder:text-[#AAA]
                  transition-all
                  duration-200
                  focus:border-[#F5C542]
                  focus:ring-1
                  focus:ring-[#F5C542]/20
                "
              />


              {/* MESSAGE */}

              <textarea
                name="message"
                placeholder="Your Message"
                rows="7"
                required
                className="
                  mb-5
                  min-h-[205px]
                  flex-1
                  w-full
                  resize-y
                  rounded-[10px]
                  border
                  border-[#555]
                  bg-[#0B0B0B]
                  px-5
                  py-4
                  text-[15px]
                  text-white
                  outline-none
                  placeholder:text-[#AAA]
                  transition-all
                  duration-200
                  focus:border-[#F5C542]
                  focus:ring-1
                  focus:ring-[#F5C542]/20
                "
              />


              {/* SEND BUTTON */}

              <button
                type="submit"
                className="
                  group
                  relative
                  h-[58px]
                  w-full
                  shrink-0
                  overflow-hidden
                  rounded-[9px]
                  bg-[#F5C542]
                  text-[15px]
                  font-bold
                  text-[#171717]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-white
                  hover:shadow-[0_8px_30px_rgba(245,197,66,0.25)]
                  active:scale-[0.98]
                "
              >

                <span className="relative z-10">
                  Send Message
                </span>

                <span
                  className="
                    absolute
                    inset-0
                    -translate-x-full
                    bg-gradient-to-r
                    from-transparent
                    via-white/40
                    to-transparent
                    transition-transform
                    duration-700
                    group-hover:translate-x-full
                  "
                />

              </button>


              {submitted && (
                <div className="mt-4 text-center text-sm text-[#F5C542]">
                  Opening your email client...
                </div>
              )}

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
            border-[#F5C542]
            bg-[#111111]
            p-7
            shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]
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
              border-white/20
            "
          />

          <div className="relative flex w-full flex-col">

            {/* TITLE */}

            <div className="mb-2 text-[13px] font-bold text-[#F5C542]">
              Our Location
            </div>

            <h2
              className="
                mb-7
                text-[28px]
                font-bold
                leading-[1.3]
                sm:text-[30px]
              "
            >
              Find Us at the Venue
            </h2>


            {/* =================================================
                LOCATION DETAILS
            ================================================= */}

            <div className="mb-7 space-y-6">

              {/* VENUE */}

              <div>
                <div
                  className="
                    text-[14px]
                    font-bold
                    leading-[1.45]
                    text-white
                    sm:text-[15px]
                  "
                >
                  Siddaganga Institute of Technology, Tumkur
                </div>

                <div
                  className="
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


              {/* =================================================
                  EVENT CONTACTS
              ================================================= */}

              <div>

                {/* HEADING */}

                <div
                  className="
                    text-[15px]
                    font-extrabold
                    leading-[1.45]
                    text-white
                    sm:text-[16px]
                  "
                >
                  For Event Queries
                </div>

                <div
                  className="
                    mt-4
                    text-[14px]
                    font-bold
                    leading-[1.45]
                    text-white
                    sm:text-[15px]
                  "
                >
                  Rahul Kumar
                </div>

                <div
                  className="
                    mt-[3px]
                    text-[12px]
                    font-normal
                    leading-[1.45]
                    text-[#999]
                    sm:text-[13px]
                  "
                >
                  +91 98765 43210
                </div>


                {/* SECOND PERSON */}

                <div
                  className="
                    mt-5
                    text-[14px]
                    font-bold
                    leading-[1.45]
                    text-white
                    sm:text-[15px]
                  "
                >
                  Ananya Sharma
                </div>

                <div
                  className="
                    mt-[3px]
                    text-[12px]
                    font-normal
                    leading-[1.45]
                    text-[#999]
                    sm:text-[13px]
                  "
                >
                  +91 87654 32109
                </div>

              </div>

            </div>


            {/* =================================================
                REAL LEAFLET MAP
            ================================================= */}

            <div
              className="
                relative
                mt-auto
                h-[390px]
                w-full
                overflow-hidden
                rounded-[16px]
                border-2
                border-[#F5C542]
                bg-[#02070c]
                shadow-[0_0_35px_rgba(245,197,66,0.12)]
                sm:h-[430px]
              "
            >

              <MapContainer
                center={[20.5937, 78.9629]}
                zoom={5}
                scrollWheelZoom={true}
                zoomControl={false}
                className="h-full w-full"
              >

                {/* MAP */}

                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />


                {/* SIT MARKER */}

                <Marker
                  position={SIT_POSITION}
                  icon={sitIcon}
                >

                  <Popup>

                    <div
                      style={{
                        minWidth: "190px",
                        textAlign: "center",
                        fontFamily: "Arial, sans-serif",
                      }}
                    >

                      <strong
                        style={{
                          color: "#111",
                          fontSize: "14px",
                        }}
                      >
                        Siddaganga Institute of Technology
                      </strong>

                      <br />

                      <span
                        style={{
                          color: "#555",
                          fontSize: "12px",
                        }}
                      >
                        Tumakuru, Karnataka
                      </span>

                    </div>

                  </Popup>

                </Marker>


                {/* ZOOM CONTROL */}

                <ZoomControl position="topright" />


                {/* FLY TO SIT */}

                <MapController />

              </MapContainer>


              {/* =================================================
                  MAP LABEL
              ================================================= */}

              <div
                className="
                  pointer-events-none
                  absolute
                  left-4
                  top-4
                  z-[1000]
                  rounded-xl
                  border
                  border-[#F5C542]/70
                  bg-[#05090d]/90
                  px-4
                  py-2
                  shadow-lg
                  backdrop-blur-md
                "
              >

                <div
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[2px]
                    text-[#F5C542]
                  "
                >
                  Location
                </div>

                <div className="mt-1 text-sm font-bold text-white">
                  India
                </div>

              </div>


              {/* =================================================
                  MAP STYLING
              ================================================= */}

              <style>
                {`
                  .leaflet-container {
                    background: #02070c !important;
                    font-family: Arial, Helvetica, sans-serif;
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

.leaflet-popup-content-wrapper,
.leaflet-popup-tip {
  background: #F5C542 !important;
  color: #111 !important;
}

.leaflet-popup-content {
  margin: 12px 14px !important;
}

.leaflet-popup-close-button {
  color: #111 !important;
}

.leaflet-popup-close-button:hover {
  color: #000 !important;
}
  `}
            </style>

          </div>

        </div>

      </section>

    </main>

  </div>
);
}