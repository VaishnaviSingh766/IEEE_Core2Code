import { useState, useEffect, useCallback } from "react";
import { motion, useAnimation } from "motion/react";
import "../CompoFiles/Cursor.css";

const NeonCursor = () => {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const trailControls = useAnimation();
  const glowControls = useAnimation();

  const handleMouseMove = useCallback((e) => {
    setPosition({
      x: e.clientX,
      y: e.clientY,
    });
  }, []);

  const handleMouseDown = () => setIsClicking(true);
  const handleMouseUp = () => setIsClicking(false);

  const handleMouseOver = useCallback(
    (e) => {
      const target = e.target;

      if (
        target instanceof Element &&
        target.closest('a, button, input, [data-hover="true"]')
      ) {
        setIsHovering(true);

        void trailControls.start({
          scale: 1.5,
          borderColor: "#ffd700",
          borderWidth: "3px",
        });

        void glowControls.start({
          scale: 2,
          opacity: 0.8,
        });
      }
    },
    [trailControls, glowControls]
  );

  const handleMouseOut = useCallback(() => {
    setIsHovering(false);

    void trailControls.start({
      scale: 1,
      borderColor: "#daa520",
      borderWidth: "2px",
    });

    void glowControls.start({
      scale: 1,
      opacity: 0.4,
    });
  }, [trailControls, glowControls]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    document.body.classList.add("neon-cursor-enabled");

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);

      document.body.classList.remove("neon-cursor-enabled");
    };
  }, [handleMouseMove, handleMouseOver, handleMouseOut]);

  return (
    <div className="neon-cursor-container">
      {/* Main dot */}
      <motion.div
        className="cursor-main"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: isClicking ? 0.8 : isHovering ? 1.2 : 1,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 400,
          mass: 0.5,
        }}
      />

      {/* Trailing ring */}
      <motion.div
        className="cursor-trail"
        animate={{
          x: position.x - 20,
          y: position.y - 20,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
          mass: 0.8,
        }}
      />

      {/* Outer glow */}
      <motion.div
        className="cursor-glow"
        animate={{
          x: position.x - 30,
          y: position.y - 30,
        }}
        transition={{
          type: "spring",
          damping: 40,
          stiffness: 150,
          mass: 1,
        }}
      />
    </div>
  );
};

export default NeonCursor;