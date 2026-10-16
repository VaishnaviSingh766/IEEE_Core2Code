import React, { useEffect, useMemo, useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import Header from "../utils/Header";

const KONFHUB_WIDGET_URL =
  import.meta.env.VITE_KONFHUB_WIDGET_URL?.trim() || "";

const getValidatedWidgetUrl = () => {
  if (!KONFHUB_WIDGET_URL) {
    return {
      url: "",
      error:
        "KonfHub ticketing is not configured yet. Set VITE_KONFHUB_WIDGET_URL to the widget URL from the KonfHub dashboard.",
    };
  }

  try {
    const url = new URL(KONFHUB_WIDGET_URL);
    const isKonfHubHost =
      url.hostname === "konfhub.com" ||
      url.hostname.endsWith(".konfhub.com");

    if (url.protocol !== "https:" || !isKonfHubHost) {
      return {
        url: "",
        error:
          "The configured KonfHub widget URL must be an HTTPS URL hosted by konfhub.com.",
      };
    }

    return { url: url.toString(), error: "" };
  } catch {
    return {
      url: "",
      error:
        "The configured KonfHub widget URL is invalid. Copy only the iframe src URL from the KonfHub embed code.",
    };
  }
};

const Registration = () => {
  const [widgetState, setWidgetState] = useState("loading");

  const widget = useMemo(() => getValidatedWidgetUrl(), []);

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

  useEffect(() => {
    if (widget.error) {
      setWidgetState("error");
    }
  }, [widget.error]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black font-['Inter',ui-sans-serif,system-ui,sans-serif] text-white antialiased">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 38% at 50% -4%, rgba(212,175,55,0.16), transparent 70%), radial-gradient(ellipse 40% 30% at 100% 100%, rgba(154,123,32,0.10), transparent 70%)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        {[
          "left-[12%] top-[18%]",
          "left-[88%] top-[24%]",
          "left-[7%] top-[74%]",
          "left-[93%] top-[82%]",
        ].map((pos, index) => (
          <span
            key={index}
            className={`absolute ${pos} h-1 w-1 rounded-full bg-[#F4D35E] opacity-40 shadow-[0_0_8px_2px_rgba(244,211,94,0.35)] motion-safe:animate-pulse`}
            style={{ animationDuration: `${4 + index}s` }}
          />
        ))}
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center px-3 py-12 sm:px-5 sm:py-16">
        <header className="mb-10 text-center">
          <Header as="h1">Registrations</Header>
          <p className="font-mistical mt-3 text-sm text-neutral-300">
            Team Registration
          </p>
          <p className="font-paragraph mt-1 text-sm text-neutral-500">
            From Core to Code.
          </p>
        </header>

        <section
          aria-labelledby="ticketing-title"
          className="relative w-full overflow-hidden rounded-[2rem] bg-white/[0.03] px-2 py-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] ring-1 ring-white/[0.05] backdrop-blur-2xl sm:px-6 sm:py-8"
        >
          <div
            aria-hidden="true"
            className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent"
          />

          {widgetState === "loading" && !widget.error && (
            <div
              className="absolute inset-x-2 top-24 z-10 flex min-h-[30rem] items-center justify-center gap-2 rounded-2xl bg-black/30 text-sm text-neutral-400 sm:inset-x-6"
              role="status"
            >
              <Loader2 className="h-4 w-4 animate-spin text-[#D4AF37]" />
              Loading ticketing…
            </div>
          )}

          {widget.error && (
            <div
              className="flex min-h-[20rem] flex-col items-center justify-center rounded-2xl border border-red-400/20 bg-red-400/5 p-6 text-center"
              role="alert"
            >
              <AlertCircle className="mb-3 h-6 w-6 text-red-400" />
              <p className="text-sm font-medium text-red-200">
                Ticketing is temporarily unavailable
              </p>
              <p className="mt-2 max-w-lg text-xs leading-5 text-red-300/80">
                {widget.error}
              </p>
            </div>
          )}

          {!widget.error && (
            <div
              className={`w-full overflow-hidden rounded-2xl bg-white transition-opacity ${
                widgetState === "ready" ? "opacity-100" : "opacity-0"
              }`}
            >
              <iframe
                title="Core2Code event ticketing"
                src={widget.url}
                className="block h-[760px] w-full border-0 sm:h-[800px]"
                loading="eager"
                onLoad={() => setWidgetState("ready")}
                onError={() => setWidgetState("error")}
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          )}

          {widgetState === "error" && !widget.error && (
            <div
              className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-red-400/20 bg-red-400/5 p-4 text-center text-xs text-red-300"
              role="alert"
            >
              <AlertCircle className="h-4 w-4" />
              We could not load the KonfHub ticketing widget. Please refresh
              the page or use the event ticketing link.
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Registration;
