import React, { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import Header from "../utils/Header";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const FEE = 50;

const TRACKS = ["Track 1", "Track 2"];

// Track 1:
// Examples: 1SI26CS001, 2SI26CS001
const TRACK1_USN_REGEX = /^[1-9]SI26[A-Z]{2}\d{3}$/i;

// Track 2:
// Examples: 1SI23CS001, 1SI24CS001, 1SI25CS001
const TRACK2_USN_REGEX = /^1SI2[3-5][A-Z]{2}\d{3}$/i;

const initialForm = {
  p1Name: "",
  p1Usn: "",
  p2Name: "",
  p2Usn: "",
  track: "",
};

const GOLD_GRADIENT =
  "linear-gradient(135deg, #D4AF37, #F4D35E)";

const Field = ({
  id,
  label,
  value,
  onChange,
  error,
  autoComplete,
}) => (
  <div className="relative pt-5">
    <input
      id={id}
      name={id}
      type="text"
      value={value}
      onChange={onChange}
      placeholder=" "
      autoComplete={autoComplete}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`peer w-full border-b bg-transparent pb-2 pt-1 text-[15px] text-white outline-none transition-colors duration-200 ${
        error
          ? "border-red-400/70"
          : "border-white/15 hover:border-white/30"
      }`}
    />

    <label
      htmlFor={id}
      className="pointer-events-none absolute left-0 top-[1.55rem] origin-left text-[15px] text-neutral-500 transition-all duration-200 peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#D4AF37] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs"
    >
      {label}
    </label>

    <span
      aria-hidden="true"
      className="absolute bottom-[1.375rem] left-0 h-px w-full origin-center scale-x-0 bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.7)] transition-transform duration-300 peer-focus:scale-x-100"
    />

    <p
      id={`${id}-error`}
      role={error ? "alert" : undefined}
      className={`mt-1.5 min-h-[1rem] text-xs ${
        error ? "text-red-400" : "text-transparent"
      }`}
    >
      {error || "\u00A0"}
    </p>
  </div>
);

const GroupTitle = ({ children }) => (
  <div className="mb-1 flex items-center gap-2.5">
    <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)]" />

    <h2 className="font-mistical text-sm text-neutral-200">
      {children}
    </h2>
  </div>
);

const Registration = () => {
  const [form, setForm] = useState(initialForm);

  const [errors, setErrors] = useState({});

  const [status, setStatus] = useState("idle");

  const [registrationId, setRegistrationId] = useState("");

  useEffect(() => {
    const id = "c2c-inter-font";

    if (document.getElementById(id)) return;

    const link = document.createElement("link");

    link.id = id;
    link.rel = "stylesheet";

    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap";

    document.head.appendChild(link);
  }, []);

  const setField = (key) => (e) => {
    const value = e.target.value;

    setForm((f) => ({
      ...f,
      [key]: key.endsWith("Usn")
        ? value.toUpperCase()
        : value,
    }));

    if (errors[key]) {
      setErrors((er) => ({
        ...er,
        [key]: undefined,
      }));
    }

    if (
      status === "success" ||
      status === "error"
    ) {
      setStatus("idle");
      setRegistrationId("");
    }
  };

  const selectTrack = (track) => {
    setForm((f) => ({
      ...f,
      track,
    }));

    // Clear old USN errors when changing track
    setErrors((er) => ({
      ...er,
      p1Usn: undefined,
      p2Usn: undefined,
      track: undefined,
    }));

    setStatus("idle");
    setRegistrationId("");
  };

  const validate = () => {
    const e = {};

    /*
     * Basic name validation
     */

    if (!form.p1Name.trim()) {
      e.p1Name =
        "Participant 1 name is required";
    }

    if (!form.p2Name.trim()) {
      e.p2Name =
        "Participant 2 name is required";
    }

    /*
     * Track validation
     */

    if (!form.track) {
      e.track = "Please select a track";

      return e;
    }

    /*
     * Select the correct USN pattern
     * based on the selected track.
     */

    const usnRegex =
      form.track === "Track 1"
        ? TRACK1_USN_REGEX
        : TRACK2_USN_REGEX;

    /*
     * Participant 1 USN
     */

    if (!usnRegex.test(form.p1Usn.trim())) {
      e.p1Usn =
        form.track === "Track 1"
          ? "Track 1 requires a USN like 1SI26CS001"
          : "Track 2 requires a USN like 1SI23CS001";
    }

    /*
     * Participant 2 USN
     */

    if (!usnRegex.test(form.p2Usn.trim())) {
      e.p2Usn =
        form.track === "Track 1"
          ? "Track 1 requires a USN like 1SI26CS001"
          : "Track 2 requires a USN like 1SI23CS001";
    }

    /*
     * Both participants must have
     * different USNs.
     */

    if (
      !e.p1Usn &&
      !e.p2Usn &&
      form.p1Usn.trim().toUpperCase() ===
        form.p2Usn.trim().toUpperCase()
    ) {
      e.p2Usn =
        "Both participants need different USNs";
    }

    return e;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (status === "submitting") return;

    const found = validate();

    setErrors(found);

    if (Object.keys(found).length > 0) {
      return;
    }

    if (!BACKEND_URL) {
      console.error(
        "VITE_BACKEND_URL is not configured."
      );

      setStatus("error");

      return;
    }

    if (!window.Razorpay) {
      console.error(
        "Razorpay Checkout script is not loaded."
      );

      setStatus("error");

      return;
    }

    try {
      setStatus("submitting");

      /*
       * STEP 1
       * Create registration + Razorpay order
       */

      const createOrderResponse =
        await fetch(
          `${BACKEND_URL}/api/payment/create-order`,
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              participant1: {
                name: form.p1Name.trim(),

                usn: form.p1Usn
                  .trim()
                  .toUpperCase(),
              },

              participant2: {
                name: form.p2Name.trim(),

                usn: form.p2Usn
                  .trim()
                  .toUpperCase(),
              },

              track: form.track,
            }),
          }
        );

      const orderData =
        await createOrderResponse.json();

      if (
        !createOrderResponse.ok ||
        !orderData.success
      ) {
        throw new Error(
          orderData.message ||
            "Failed to create registration."
        );
      }

      /*
       * STEP 2
       * Open Razorpay Checkout
       */

      const options = {
        key: orderData.keyId,

        amount: orderData.amount * 100,

        currency: orderData.currency,

        name: "CORE 2 CODE",

        description: "Team Registration",

        order_id: orderData.orderId,

        handler: async function (response) {
          try {
            /*
             * STEP 3
             * Verify payment on backend
             */

            const verifyResponse =
              await fetch(
                `${BACKEND_URL}/api/payment/verify`,
                {
                  method: "POST",

                  headers: {
                    "Content-Type":
                      "application/json",
                  },

                  body: JSON.stringify({
                    razorpay_order_id:
                      response.razorpay_order_id,

                    razorpay_payment_id:
                      response.razorpay_payment_id,

                    razorpay_signature:
                      response.razorpay_signature,
                  }),
                }
              );

            const verifyData =
              await verifyResponse.json();

            if (
              !verifyResponse.ok ||
              !verifyData.success
            ) {
              throw new Error(
                verifyData.message ||
                  "Payment verification failed."
              );
            }

            /*
             * PAYMENT SUCCESS
             */

            setRegistrationId(
              verifyData.registrationId ||
                orderData.registrationId
            );

            setStatus("success");

            setForm(initialForm);
          } catch (error) {
            console.error(
              "Payment verification error:",
              error
            );

            setStatus("error");
          }
        },

        prefill: {
          name: form.p1Name.trim(),
        },

        notes: {
          registrationId:
            orderData.registrationId,

          track: form.track,
        },

        theme: {
          color: "#D4AF37",
        },

        modal: {
          ondismiss: function () {
            setStatus("idle");
          },
        },
      };

      const razorpay =
        new window.Razorpay(options);

      razorpay.on(
        "payment.failed",
        function (response) {
          console.error(
            "Payment failed:",
            response.error
          );

          setStatus("error");
        }
      );

      razorpay.open();
    } catch (error) {
      console.error(
        "Registration error:",
        error
      );

      setStatus("error");
    }
  };

  const isSubmitting =
    status === "submitting";

  const trackIndex =
    TRACKS.indexOf(form.track);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black font-['Inter',ui-sans-serif,system-ui,sans-serif] text-white antialiased">

      {/* Background */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 38% at 50% -4%, rgba(212,175,55,0.16), transparent 70%), radial-gradient(ellipse 40% 30% at 100% 100%, rgba(154,123,32,0.10), transparent 70%)",
        }}
      />

      {/* Decorative particles */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        {[
          "left-[12%] top-[18%]",
          "left-[88%] top-[24%]",
          "left-[7%] top-[74%]",
          "left-[93%] top-[82%]",
        ].map((pos, i) => (
          <span
            key={i}
            className={`absolute ${pos} h-1 w-1 rounded-full bg-[#F4D35E] opacity-40 shadow-[0_0_8px_2px_rgba(244,211,94,0.35)] motion-safe:animate-pulse`}
            style={{
              animationDuration: `${4 + i}s`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-xl flex-col items-center px-5 py-12 sm:py-16">

        {/* Header */}

        <header className="mb-10 text-center">

          <Header as="h1">Registrations</Header>

          <p className="font-mistical mt-3 text-sm text-neutral-300">
            Team Registration
          </p>

          <p className="font-paragraph mt-1 text-sm text-neutral-500">
            From Core to Code.
          </p>

        </header>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          noValidate
          className="relative w-full rounded-[2rem] bg-white/[0.03] px-6 py-8 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] ring-1 ring-white/[0.05] backdrop-blur-2xl sm:px-10 sm:py-10"
        >

          {/* Gold top line */}

          <div
            aria-hidden="true"
            className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent"
          />

          {/* Participants */}

          <div className="space-y-7">

            {/* Participant 1 */}

            <fieldset>

              <legend className="sr-only">
                Participant 1
              </legend>

              <GroupTitle>
                Participant <span className="font-number">1</span>
              </GroupTitle>

              <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">

                <Field
                  id="p1Name"
                  label="Full name"
                  value={form.p1Name}
                  onChange={setField("p1Name")}
                  error={errors.p1Name}
                  autoComplete="name"
                />

                <Field
                  id="p1Usn"
                  label="USN"
                  value={form.p1Usn}
                  onChange={setField("p1Usn")}
                  error={errors.p1Usn}
                  autoComplete="off"
                />

              </div>

            </fieldset>

            {/* Participant 2 */}

            <fieldset>

              <legend className="sr-only">
                Participant 2
              </legend>

              <GroupTitle>
                Participant <span className="font-number">2</span>
              </GroupTitle>

              <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">

                <Field
                  id="p2Name"
                  label="Full name"
                  value={form.p2Name}
                  onChange={setField("p2Name")}
                  error={errors.p2Name}
                  autoComplete="off"
                />

                <Field
                  id="p2Usn"
                  label="USN"
                  value={form.p2Usn}
                  onChange={setField("p2Usn")}
                  error={errors.p2Usn}
                  autoComplete="off"
                />

              </div>

            </fieldset>

          </div>

          {/* Track Selection */}

          <section className="mt-8">

            <div className="mb-3 flex items-center gap-2.5">

              <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)]" />

              <h2 className="font-mistical text-sm text-neutral-200">
                Select track
              </h2>

            </div>

            <div
              role="radiogroup"
              aria-label="Select track"
              className="relative grid grid-cols-2 rounded-full bg-black/60 p-1 ring-1 ring-white/10"
            >

              <span
                aria-hidden="true"
                className={`absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full transition-all duration-300 ease-out ${
                  trackIndex < 0
                    ? "opacity-0"
                    : "opacity-100"
                }`}
                style={{
                  backgroundImage:
                    GOLD_GRADIENT,

                  transform: `translateX(${
                    Math.max(trackIndex, 0) *
                    100
                  }%)`,

                  boxShadow:
                    "0 0 22px -4px rgba(212,175,55,0.6)",
                }}
              />

              {TRACKS.map((track) => {

                const selected =
                  form.track === track;

                return (
                  <button
                    key={track}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() =>
                      selectTrack(track)
                    }
                    className={`relative z-10 flex items-center justify-center gap-1.5 rounded-full py-3 text-sm font-semibold transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/70 ${
                      selected
                        ? "text-black"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    {selected && (
                      <Check
                        className="h-4 w-4"
                        strokeWidth={3}
                      />
                    )}

                    <span>
                      {track.slice(0, -1)}
                      <span className="font-number">
                        {track.slice(-1)}
                      </span>
                    </span>
                  </button>
                );
              })}

            </div>

            <p
              role={
                errors.track
                  ? "alert"
                  : undefined
              }
              className={`mt-2 min-h-[1rem] pl-2 text-xs ${
                errors.track
                  ? "text-red-400"
                  : "text-transparent"
              }`}
            >
              {errors.track || "\u00A0"}
            </p>

          </section>

          {/* Fee */}

          <div className="mt-6 flex items-end justify-between border-t border-white/[0.07] pt-6">

            <span className="text-sm text-neutral-400">
              Registration fee
            </span>

            <span className="flex items-baseline gap-1.5">

              <span className="font-number text-3xl leading-none text-[#D4AF37]">
                ₹{FEE}
              </span>

              <span className="text-sm text-neutral-500">
                / team
              </span>

            </span>

          </div>

          {/* Submit */}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold tracking-wide text-black transition-all duration-200 motion-safe:hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-6px_rgba(212,175,55,0.7)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D35E] focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
            style={{
              backgroundImage:
                GOLD_GRADIENT,
            }}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Proceed to Payment — ₹{FEE}
              </>
            )}
          </button>

          {/* Success */}

          {status === "success" && (
            <div className="mt-5 rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/5 p-4 text-center">

              <div className="mb-2 flex justify-center">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#D4AF37]/15">

                  <Check
                    className="h-5 w-5 text-[#D4AF37]"
                    strokeWidth={3}
                  />

                </div>

              </div>

              <p className="font-mistical text-sm text-white">
                Registration Successful
              </p>

              <p className="font-paragraph mt-1 text-xs text-neutral-400">
                Your payment has been verified.
              </p>

              <p className="font-paragraph mt-3 text-xs text-neutral-500">
                Registration ID
              </p>

              <p className="font-number mt-1 text-lg text-[#D4AF37]">
                {registrationId}
              </p>

              <p className="font-paragraph mt-3 text-xs text-neutral-500">
                Please save this Registration ID
                for event check-in.
              </p>

            </div>
          )}

          {/* Error */}

          {status === "error" && (
            <p
              role="alert"
              className="mt-4 text-center text-xs text-red-400"
            >
              Something went wrong. Please try
              again.
            </p>
          )}

        </form>

      </div>
    </main>
  );
};

export default Registration;