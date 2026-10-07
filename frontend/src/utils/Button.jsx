import React from "react";

/*
============================================================
 CORE2CODE BUTTON COLLECTION

 Theme:
 Black  #000000
 Gold  #D4AF37
 White #FFFFFF

 Buttons:
 1. GoldRevealButton
 2. SplitTextButton
 3. GoldSlideButton
 4. GoldExpandButton
 5. GoldPushButton
 6. GoldUnderlineButton
 7. GoldCornerButton
 8. GoldGlowButton

 Each button:
 - Different hover animation
 - Different click/active effect
 - CSS only
 - No React state
 - Independently reusable
============================================================
*/


/* ============================================================
   1. GOLD REVEAL BUTTON

   Hover:
   Gold fills from bottom → top.
   Text becomes black.
   Arrow moves right.

   Click:
   Physical press.
============================================================ */


const Button = ({
  children = "REGISTER",
  onClick,
  className = "",
  disabled = false,
}) => {
  return (
    <>
      <style>{`
        .core-gold-push {
          position: relative;

          min-width: 190px;
          height: 60px;

          padding: 0;

          border: none;
          background: transparent;

          cursor: pointer;

        }

        .gold-push-shadow {
          position: absolute;

          left: 0;
          right: 0;
          bottom: 0;

          height: 100%;

          border-radius: 7px;

          background: #D4AF37;

          transition:
            transform 250ms cubic-bezier(.2,.8,.2,1);
        }

        .gold-push-face {
          position: absolute;

          left: 0;
          right: 0;
          top: 0;

          height: calc(100% - 5px);

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 7px;

          background: #050505;

          border: 1px solid #D4AF37;

          color: #D4AF37;

          font-size: 13px;
          font-weight: 700;
          letter-spacing: .16em;

          text-transform: uppercase;

          transition:
            transform 250ms cubic-bezier(.2,.8,.2,1),
            color 300ms ease,
            background 300ms ease;
        }

        .core-gold-push:hover .gold-push-face {
          transform:
            translateY(-5px);

          background: #0a0a0a;
          color: #fff;
        }

        .core-gold-push:hover .gold-push-shadow {
          transform:
            translateY(1px);
        }

        .core-gold-push:active .gold-push-face {
          transform:
            translateY(3px);
        }

        .core-gold-push:active .gold-push-shadow {
          transform:
            translateY(3px);
        }

        .core-gold-push:disabled {
          opacity: .5;
          cursor: not-allowed;
        }
      `}</style>

      <button
        type="button"
        disabled={disabled}
        className={`core-gold-push ${className}`}
        onClick={onClick}
      >
        <span className="gold-push-shadow" />

        <span className="gold-push-face font-paragraph">
          {children}
        </span>
      </button>
    </>
  );
};


export default Button;