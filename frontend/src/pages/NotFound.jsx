import React from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useLayoutEffect, useRef } from 'react';

export default function NotFound() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.not-found-text',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }
      );
      
      gsap.to('.glow-ball', {
        x: 'random(-50, 50)',
        y: 'random(-50, 50)',
        duration: 'random(3, 6)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="min-h-screen w-full bg-[#030303] flex flex-col items-center justify-center text-white relative overflow-hidden"
    >
      {/* Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="glow-ball absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-gold/20 blur-[120px] rounded-full" />
        <div className="glow-ball absolute bottom-1/3 right-1/4 w-[250px] h-[250px] bg-gold/10 blur-[100px] rounded-full" />
      </div>

      <div className="z-10 flex flex-col items-center text-center px-4">
        <h1 className="not-found-text text-8xl md:text-[150px] font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#B8860B] via-[#F5D76E] to-[#D4AF37] leading-none mb-4 drop-shadow-lg">
          404
        </h1>
        <h2 className="not-found-text text-2xl md:text-4xl font-semibold mb-6 tracking-wide text-gray-200">
          Page Not Found
        </h2>
        <p className="not-found-text text-gray-400 max-w-md mx-auto mb-10 text-sm md:text-base">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <Link 
          to="/" 
          className="not-found-text relative inline-flex items-center justify-center px-8 py-3 rounded-full bg-gradient-to-r from-[#B8860B] via-[#F5D76E] to-[#D4AF37] text-black font-bold uppercase tracking-wider overflow-hidden group transition-transform hover:scale-105 active:scale-95"
        >
          <span className="relative z-10">Return to Home</span>
          <div className="absolute inset-0 bg-white/30 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
        </Link>
      </div>
    </div>
  );
}
