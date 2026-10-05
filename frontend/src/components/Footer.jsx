import React from "react";

const SOCIALS = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/ieee-sit-student-branch-official",
    path: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11.5H3V9.75Zm6.5 0h3.83v1.57h.06c.53-1 1.84-2.07 3.78-2.07 4.04 0 4.78 2.66 4.78 6.1v5.9h-4v-5.23c0-1.25-.02-2.85-1.74-2.85-1.74 0-2 1.36-2 2.76v5.32h-4V9.75Z",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/ieeesitsb?igsh=dGtpNWo0ZGFlZW1z",
    path: "M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0-3 0Zm5.25-3.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z",
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@tech-nomadsieeesitsb638?si=Y0gsDvyIbwu_wTwi",
    path: "M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.27 5 12 5 12 5s-6.27 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2C2 8.78 2 12 2 12s0 3.22.4 4.8a2.5 2.5 0 0 0 1.76 1.77C5.73 19 12 19 12 19s6.27 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77C22 15.22 22 12 22 12s0-3.22-.4-4.8ZM10 15V9l5.2 3-5.2 3Z",
  },
  {
    name: "Telegram",
    href: "https://t.me/ieeesitsb",
    path: "M21.9 4.1a1 1 0 0 0-1-.17L2.7 11a1 1 0 0 0 .08 1.9l4.6 1.5 1.8 5.5a1 1 0 0 0 1.67.4l2.6-2.5 4.4 3.2a1 1 0 0 0 1.57-.6l3-15.4a1 1 0 0 0-.52-1.0ZM9.6 13.7l8-5-6.2 6.2-.3 3.2-1.5-4.4Z",
  },
  {
    name: "Email",
    href: "mailto:ieee@sit.ac.in",
    path: "M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1 2.9V17h16V7.9l-8 5.6-8-5.6ZM18.4 7H5.6l6.4 4.5L18.4 7Z",
  },
];

export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;800&family=Rajdhani:wght@400;500&display=swap');

        .ft {
          --black: #000000;
          --gold: var(--accent, #f5a623);
          --white: #ffffff;
          position: relative;
          width: 100%;
          box-sizing: border-box;
          background: var(--black);
          color: var(--white);
          font-family: "Rajdhani", system-ui, sans-serif;
          text-align: center;
          padding: 36px 0 0;
          overflow: hidden;
        }

        .ft *,
        .ft *::before,
        .ft *::after {
          box-sizing: border-box;
        }

        .ft a {
          color: inherit;
          text-decoration: none;
        }

        .ft a:focus-visible {
          outline: 2px solid var(--gold);
          outline-offset: 4px;
        }

        .ft::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: var(--gold);
          opacity: 0.35;
        }

        .ft::after {
          content: "";
          position: absolute;
          top: -1px;
          left: 0;
          width: 18%;
          height: 3px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--gold),
            transparent
          );
          animation: ft-scan 4.5s ease-in-out infinite alternate;
        }

        @keyframes ft-scan {
          to {
            left: 82%;
          }
        }

        .ft__inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .ft__main {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 30px;
          text-align: left;
        }

        .ft__brand {
          flex: 1;
          min-width: 0;
        }

        .ft__name {
          margin: 0;
          font-family: "Orbitron", sans-serif;
          font-weight: 800;
          font-size: clamp(2rem, 5vw, 3.2rem);
          letter-spacing: 0.14em;
          line-height: 1.2;
        }

        .ft__sub {
          margin: 8px 0 0;
          font-family: "Orbitron", sans-serif;
          font-weight: 600;
          font-size: 0.95rem;
          letter-spacing: 0.3em;
          color: var(--gold);
        }

        .ft__social {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          flex-shrink: 0;
        }

        .ft__title {
          margin: 0;
          font-family: "Orbitron", sans-serif;
          font-weight: 600;
          font-size: 0.8rem;
          letter-spacing: 0.2em;
          text-align: center;
        }

        .ft__list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 14px;
        }

        .ft__pulse {
          position: relative;
          display: grid;
          place-items: center;
          width: 46px;
          height: 46px;
          border-radius: 50%;
          border: 1px solid var(--gold);
          color: var(--white);
          transition: background 0.2s, color 0.2s;
        }

        .ft__pulse svg {
          width: 20px;
          height: 20px;
          fill: currentColor;
        }

        .ft__pulse:hover,
        .ft__pulse:focus-visible {
          background: var(--gold);
          color: var(--black);
          outline: none;
        }

        .ft__pulse:focus-visible {
          box-shadow:
            0 0 0 3px var(--black),
            0 0 0 5px var(--gold);
        }

        .ft__copy {
          margin: 28px 0 0;
          padding: 12px 24px 16px;
          border-top: 1px solid var(--gold);
          font-size: 0.95rem;
          letter-spacing: 0.04em;
          text-align: center;
        }

        @media (max-width: 700px) {
          .ft {
            padding-top: 32px;
          }

          .ft__inner {
            padding: 0 16px;
          }

          .ft__main {
            flex-direction: column;
            align-items: center;
            gap: 26px;
            text-align: center;
          }

          .ft__brand {
            width: 100%;
          }

          .ft__name {
            font-size: clamp(1.7rem, 8vw, 2.5rem);
          }

          .ft__sub {
            font-size: 0.8rem;
            letter-spacing: 0.2em;
          }

          .ft__social {
            align-items: center;
            width: 100%;
            gap: 14px;
          }

          .ft__title {
            margin: 0;
          }

          .ft__list {
            justify-content: center;
            gap: 14px;
          }

          .ft__pulse {
            width: 44px;
            height: 44px;
          }

          .ft__copy {
            margin-top: 24px;
            padding: 12px 16px 16px;
            font-size: 0.85rem;
          }
        }

        @media (max-width: 360px) {
          .ft__list {
            gap: 10px;
          }

          .ft__pulse {
            width: 40px;
            height: 40px;
          }
        }
      `}</style>

      <footer className="ft">
        <div className="ft__inner">
          <div className="ft__main">
            <div className="ft__brand">
              <h2 className="ft__name">IEEE SIT</h2>
              <p className="ft__sub">Student Branch</p>
            </div>

            <div className="ft__social">
              <h3 className="ft__title">Follow us</h3>

              <ul className="ft__list">
                {SOCIALS.map(({ name, href, path }) => (
                  <li key={name}>
                    <a
                      className="ft__pulse"
                      href={href}
                      target={
                        href.startsWith("mailto:")
                          ? undefined
                          : "_blank"
                      }
                      rel="noopener noreferrer"
                      aria-label={name}
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d={path} />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className="ft__copy">
          © {new Date().getFullYear()} IEEE SIT SB. All rights reserved.
        </p>
      </footer>
    </>
  );
}