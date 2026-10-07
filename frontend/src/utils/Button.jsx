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
    <button
      type="button"
      disabled={disabled}
      className={`group relative h-[60px] min-w-[190px] cursor-pointer border-0 bg-transparent p-0 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      onClick={onClick}
    >
      <span className="absolute inset-x-0 bottom-0 h-full rounded-[7px] bg-[#D4AF37] transition-transform duration-[250ms] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:translate-y-px group-active:translate-y-[3px]" />

      <span className="absolute inset-x-0 top-0 flex h-[calc(100%-5px)] items-center justify-center rounded-[7px] border border-[#D4AF37] bg-[#050505] font-paragraph text-[13px] font-bold uppercase tracking-[.16em] text-[#D4AF37] [transition:transform_250ms_cubic-bezier(.2,.8,.2,1),color_300ms_ease,background_300ms_ease] group-hover:-translate-y-[5px] group-hover:bg-[#0a0a0a] group-hover:text-white group-active:translate-y-[3px]">
        {children}
      </span>
    </button>
  );
};


export default Button;