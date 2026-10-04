import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import Logo Assets
import collegeLogo from '../assets/logos/college-logo.png';

import ieeeLogo from '../assets/logos/ieee-logo.png';
import bangaloreSection from '../assets/logos/bangalore-section.png';
import wieLogo from '../assets/logos/wie-logo.png';
import computerSociety from '../assets/logos/computer-society.png';

gsap.registerPlugin(ScrollTrigger);

// Import Nav Icons (mask images)
import homeIcon from '../assets/logos/home.png';
import aboutIcon from '../assets/logos/about_us.png';
import contactIcon from '../assets/logos/contact_us.png';

const navItems = [
  { label: 'Home', href: '/', id: 'home', icon: homeIcon },
  { label: 'About Us', href: '/about', id: 'about', icon: aboutIcon },
  { label: 'Contact Us', href: '/contactUs', id: 'contact', icon: contactIcon }
];

const logosData = [
  { src: collegeLogo, alt: 'College Logo', height: 'h-9 sm:h-11 lg:h-14' },
  { src: ieeeLogo, alt: 'IEEE Logo', height: 'h-7 sm:h-9 lg:h-10' },
  { src: bangaloreSection, alt: 'IEEE Bangalore Section', height: 'h-6 sm:h-8 lg:h-9' },
  { src: wieLogo, alt: 'IEEE WIE', height: 'h-6 sm:h-8 lg:h-9' },
  { src: computerSociety, alt: 'IEEE Computer Society', height: 'h-6 sm:h-8 lg:h-9' }
];

/* ═══ Centralised logo links — paste real URLs here ═══ */
const LOGO_LINKS = [
  { name: "Siddaganga Institute of Technology", url: "https://sit.ac.in/" },   // paste college site link here
  { name: "IEEE", url: "https://www.ieee.org/" },   // paste IEEE link here
  { name: "IEEE Bangalore Section", url: "https://ieeebangalore.org/" },   // paste Bangalore Section link here
  { name: "IEEE Women in Engineering", url: "https://wie.ieee.org/" },   // paste WIE link here
  { name: "IEEE Computer Society", url: "https://www.computer.org/" },   // paste Computer Society link here
];

/* ═══ NavPill – Expanding circle-to-pill nav link ═══ */
const NavPill = ({ item, onClick, className = '' }) => (
  <li className={`nb-item ${className}`}>
    <NavLink
      to={item.href}
      end={item.href === '/'}
      aria-current="page"
      className={({ isActive }) => `nb-link hover-nav-link ${isActive ? 'active' : ''}`}
      onClick={(e) => {
        onClick();
      }}
      aria-label={item.label}
    >
      {({ isActive }) => (
        <>
          <span className="nb-icon" style={{ '--icon': `url(${item.icon})` }} />
          <span className="nb-title">{item.label}</span>
          {isActive && <span className="nb-active-indicator" />}
        </>
      )}
    </NavLink>
  </li>
);

/* ═══ MobileBlobItem – Gooey hover/tap link for mobile menu ═══ */
const MobileBlobItem = ({ item, onClick, isRegister = false, className = '' }) => {
  const handleClick = (e) => {
    // NavLink handles routing; we delay closing the menu so tap animation is seen
    setTimeout(() => {
      onClick();
    }, 250);
  };

  const innerContent = (
    <>
      <span className="nb-m-inner">
        <span className="nb-m-blobs">
          {[0, 1, 2, 3].map((n) => (
            <span key={n} className="nb-m-blob" style={{ left: `${n * 24}%`, transitionDelay: `${n * 0.07}s` }} />
          ))}
        </span>
      </span>
      {item.icon && <span className="nb-icon" style={{ '--icon': `url(${item.icon})` }} />}
      <span className="nb-m-title">{item.label}</span>
    </>
  );

  return (
    <div className={`nb-m-item ${className}`}>
      {isRegister ? (
        <a
          href="PASTE_YOUR_FORM_LINK_HERE"
          target="_blank"
          rel="noopener noreferrer"
          className="nb-m-link nb-m-register"
          onClick={handleClick}
          aria-label={item.label}
        >
          {innerContent}
        </a>
      ) : (
        <NavLink
          to={item.href}
          end={item.href === '/'}
          aria-current="page"
          className={({ isActive }) => `nb-m-link ${isActive ? 'active' : ''}`}
          onClick={handleClick}
          aria-label={item.label}
        >
          {innerContent}
        </NavLink>
      )}
    </div>
  );
};

const REGISTER_URL = "PASTE_YOUR_FORM_LINK_HERE";

export default function Header() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const brandingRef = useRef(null);
  const navRef = useRef(null);
  const borderLineRef = useRef(null);
  const particlesRef = useRef(null);
  const goldDotsLayerRef = useRef(null);
  const glowRef = useRef(null);
  const mobileMenuInnerRef = useRef(null);
  const hamburgerRef = useRef(null);
  const mobileMenuOverlayRef = useRef(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const isInitialMount = useRef(true);

  // Check for reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Initialization & Animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Header Entrance
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' }
      });

      if (!reducedMotion) {
        tl.fromTo('.branding-logo',
          { opacity: 0, x: -15 },
          { opacity: 1, x: 0, duration: 0.7, stagger: 0.08 }
        )
          .fromTo('.logo-separator',
            { opacity: 0 },
            { opacity: 1, duration: 0.5, stagger: 0.08 },
            "<0.1"
          )
          .fromTo(navRef.current.children,
            { opacity: 0, y: -15 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.05 },
            "-=0.6"
          )
          .fromTo(borderLineRef.current,
            { scaleX: 0 },
            { scaleX: 1, duration: 1, transformOrigin: 'center' },
            "-=0.6"
          );
      } else {
        gsap.set(['.branding-logo', '.logo-separator', ...navRef.current.children], { opacity: 1 });
        gsap.set(borderLineRef.current, { scaleX: 1 });
      }

      // 2. Gold Ambient Glow
      if (!reducedMotion && glowRef.current) {
        gsap.to(glowRef.current, {
          x: 'random(-30, 30)',
          y: 'random(-10, 10)',
          duration: 'random(6, 10)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }

      // 3. Floating Digital Particles
      if (!reducedMotion && particlesRef.current) {
        const particles = particlesRef.current.children;
        gsap.utils.toArray(particles).forEach(particle => {
          gsap.to(particle, {
            y: `random(-15, 15)`,
            x: `random(-15, 15)`,
            opacity: `random(0.3, 0.7)`,
            scale: `random(0.8, 1.1)`,
            rotation: `random(-45, 45)`,
            duration: `random(3, 8)`,
            delay: `random(0, 2)`,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
          });
        });
      }

      // 9. Scroll Animation
      ScrollTrigger.create({
        start: 'top -30',
        end: 99999,
        toggleClass: { className: 'header-scrolled', targets: headerRef.current }
      });

    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // ═══════════ GOLD FLOWING LINE & FLOATING DOTS ANIMATION ═══════════
  useLayoutEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // ── Flowing Gold Light at bottom border ──
      const borderGlowEl = document.querySelector('.border-energy-glow-enhanced');
      if (borderGlowEl) {
        gsap.to(borderGlowEl, {
          left: '110%',
          duration: 7,
          ease: 'none',
          repeat: -1,
          delay: 0.2,
        });
      }

      // ── Floating Gold Dots ──
      const dotsContainer = goldDotsLayerRef.current;
      if (dotsContainer) {
        const dots = dotsContainer.children;
        gsap.utils.toArray(dots).forEach((dot) => {
          gsap.to(dot, {
            x: `random(-12, 12)`,
            y: `random(-6, 6)`,
            opacity: `random(0.15, 0.7)`,
            scale: `random(0.7, 1.3)`,
            duration: `random(4, 10)`,
            delay: `random(0, 3)`,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Generate responsive gold dot count
  const getGoldDotCount = () => {
    if (typeof window === 'undefined') return 25;
    const w = window.innerWidth;
    if (w < 640) return 14;
    if (w < 1024) return 22;
    return 35;
  };

  const goldDots = Array.from({ length: getGoldDotCount() }).map((_, i) => {
    const size = 1 + Math.random() * 2;
    const opacity = 0.1 + Math.random() * 0.4;
    return (
      <div
        key={`gd-${i}`}
        className="absolute rounded-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${2 + Math.random() * 96}%`,
          top: `${5 + Math.random() * 90}%`,
          backgroundColor: ['#F5D76E', '#D4AF37', '#FFD700'][Math.floor(Math.random() * 3)],
          opacity,
          boxShadow: size > 2 ? `0 0 ${size * 2}px rgba(212,175,55,0.4)` : 'none',
        }}
      />
    );
  });



  // Logo Group Hover Setup
  useLayoutEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      const logos = document.querySelectorAll('.branding-logo');
      const cleanups = [];

      logos.forEach(logo => {
        const img = logo.querySelector('img');
        const aura = logo.querySelector('.logo-aura');

        const hoverIn = () => {
          gsap.to(img, { scale: 1.04, duration: 0.3, ease: 'power3.out' });
          gsap.to(aura, { opacity: 0.4, duration: 0.3, ease: 'power3.out' });
        };
        const hoverOut = () => {
          gsap.to(img, { scale: 1, duration: 0.3, ease: 'power3.out' });
          gsap.to(aura, { opacity: 0, duration: 0.3, ease: 'power3.out' });
        };

        logo.addEventListener('mouseenter', hoverIn);
        logo.addEventListener('mouseleave', hoverOut);
        logo.addEventListener('focus', hoverIn);
        logo.addEventListener('blur', hoverOut);

        cleanups.push(() => {
          logo.removeEventListener('mouseenter', hoverIn);
          logo.removeEventListener('mouseleave', hoverOut);
          logo.removeEventListener('focus', hoverIn);
          logo.removeEventListener('blur', hoverOut);
        });
      });

      return () => cleanups.forEach(c => c());
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Mobile Menu Animation Orchestrator
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const ctx = gsap.context(() => {
      const lines = hamburgerRef.current.children;
      gsap.killTweensOf(lines);
      gsap.killTweensOf('.mobile-nav-wrapper');
      gsap.killTweensOf(mobileMenuOverlayRef.current);
      gsap.killTweensOf(mobileMenuInnerRef.current);

      if (isMobileMenuOpen) {
        document.body.style.overflow = 'hidden';

        // --- OPENING TIMELINE ---
        const tlOpen = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tlOpen.to(mobileMenuOverlayRef.current, { opacity: 1, duration: 0.4, display: 'block' })
          .to(mobileMenuInnerRef.current, { opacity: 1, duration: 0.3, display: 'flex' }, "<")
          // Circuit borders
          .fromTo('.circuit-top', { scaleX: 0 }, { scaleX: 1, duration: 0.2, transformOrigin: 'left' }, "-=0.1")
          .fromTo('.circuit-right', { scaleY: 0 }, { scaleY: 1, duration: 0.2, transformOrigin: 'top' })
          .fromTo('.circuit-bottom', { scaleX: 0 }, { scaleX: 1, duration: 0.2, transformOrigin: 'right' })
          .fromTo('.circuit-left', { scaleY: 0 }, { scaleY: 1, duration: 0.2, transformOrigin: 'bottom' })
          // Normal staggered submerging/emerging entrance (Home -> About -> Contact -> FAQS)
          .fromTo('.mobile-nav-wrapper',
            { opacity: 0, y: 55, scale: 0.96, filter: 'blur(5px)', clipPath: 'inset(100% 0 0 0)' },
            {
              opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', clipPath: 'inset(0% 0 0 0)',
              duration: 0.6, stagger: 0.1, ease: 'power3.out',
              clearProps: 'filter,clipPath'
            },
            "-=0.3"
          )
          .fromTo('.mobile-particle', { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.05 }, "-=0.6");

        gsap.to(lines[0], { y: 6, rotation: 45, duration: 0.3, ease: 'power2.inOut' });
        gsap.to(lines[1], { opacity: 0, duration: 0.3 });
        gsap.to(lines[2], { y: -6, rotation: -45, duration: 0.3, ease: 'power2.inOut' });

      } else {
        document.body.style.overflow = '';

        // --- CLOSING TIMELINE (EXPLICIT REVERSE ORDER) ---
        const tlClose = gsap.timeline({ defaults: { ease: 'power3.in' } });

        // Get items and strictly reverse array: FAQS -> Contact -> About -> Home
        const items = gsap.utils.toArray('.mobile-nav-wrapper').reverse();

        // Kill any ongoing hover animations inside items before closing
        items.forEach(wrapper => {
          const link = wrapper.querySelector('.hover-nav-link');
          if (link) gsap.killTweensOf(link.querySelectorAll('*'));
        });

        tlClose
          // Explicit Submerging order
          .to(items, {
            opacity: 0,
            y: 55,
            scale: 0.96,
            filter: 'blur(5px)',
            clipPath: 'inset(100% 0 0 0)',
            duration: 0.4,
            stagger: 0.1
          })
          .to('.mobile-particle', { opacity: 0, scale: 0, duration: 0.3 }, "<")
          // Reverse borders circuit
          .to('.circuit-left', { scaleY: 0, duration: 0.15, transformOrigin: 'bottom' })
          .to('.circuit-bottom', { scaleX: 0, duration: 0.15, transformOrigin: 'right' })
          .to('.circuit-right', { scaleY: 0, duration: 0.15, transformOrigin: 'top' })
          .to('.circuit-top', { scaleX: 0, duration: 0.15, transformOrigin: 'left' })
          // Hide panels perfectly, leaving zero leftover content
          .to(mobileMenuInnerRef.current, { opacity: 0, duration: 0.2, display: 'none' })
          .to(mobileMenuOverlayRef.current, { opacity: 0, duration: 0.3, display: 'none' });

        gsap.to(lines[0], { y: 0, rotation: 0, duration: 0.3, ease: 'power2.inOut' });
        gsap.to(lines[1], { opacity: 1, duration: 0.3 });
        gsap.to(lines[2], { y: 0, rotation: 0, duration: 0.3, ease: 'power2.inOut' });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Particles generator
  const particles = Array.from({ length: 15 }).map((_, i) => (
    <div key={i} className="absolute w-1 h-1 bg-gold rounded-full opacity-40"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`
      }}
    />
  ));

  const mobileParticles = Array.from({ length: 12 }).map((_, i) => (
    <div key={i} className="mobile-particle absolute w-[2px] h-[2px] bg-gold rounded-full opacity-0 z-0"
      style={{
        left: `${5 + Math.random() * 90}%`,
        top: `${5 + Math.random() * 90}%`
      }}
    />
  ));

  return (
    <div ref={containerRef}>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-50 transition-all duration-500 bg-[#030303] py-2 sm:py-3"
        style={{ isolation: 'isolate' }}
      >
        {/* ═══ All nb- styles: expanding circle-to-pill effect ═══ */}
        <style>{`
          .header-scrolled {
            background-color: rgba(3, 3, 3, 1);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            padding-top: 0.5rem !important;
            padding-bottom: 0.5rem !important;
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
            border-bottom: 1px solid rgba(212, 175, 55, 0.15);
          }
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

          /* ═══ nb- expanding circle pill nav ═══ */
          .nb-list {
            display: flex;
            gap: 18px;
            list-style: none;
            margin: 0;
            padding: 0;
            align-items: center;
          }
          .nb-item {
            isolation: isolate;
            display: flex;
          }

          /* Idle: ONLY the gold icon floating on the navbar */
          .nb-link {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 50px;
            height: 50px;
            border-radius: 50px;
            background: transparent;
            border: none;
            box-shadow: none;
            text-decoration: none;
            overflow: visible;
            transition: width 0.5s cubic-bezier(.4,0,.2,1);
          }

          /* Gold gradient fill (::before) – fully opaque on hover */
          .nb-link::before {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(45deg, #B8860B, #F5D76E, #D4AF37);
            border-radius: inherit;
            opacity: 0;
            z-index: 0;
            transition: opacity 0.5s ease;
          }

          /* Soft gold glow (::after) – shadow under pill */
          .nb-link::after {
            content: "";
            position: absolute;
            inset: 0;
            top: 8px;
            background: linear-gradient(45deg, #B8860B, #F5D76E, #D4AF37);
            border-radius: inherit;
            filter: blur(15px);
            opacity: 0;
            z-index: -1;
            transition: opacity 0.5s ease;
          }

          /* CSS mask icon */
          .nb-icon {
            position: absolute;
            z-index: 2;
            width: 28px;
            height: 28px;
            display: block;
            background-color: #D4AF37;
            -webkit-mask: var(--icon) center / contain no-repeat;
            mask: var(--icon) center / contain no-repeat;
            transform: scale(1);
            transition: transform 0.5s ease, background-color 0.3s ease;
            transition-delay: 0.25s; /* Idle: delayed scale up */
          }

          /* Title – centered, hidden at idle */
          .nb-title {
            position: absolute;
            z-index: 2;
            color: #000 !important;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            white-space: nowrap;
            font-size: 0.85em;
            transform: scale(0);
            transition: transform 0.5s ease;
            transition-delay: 0s;
          }

          /* Active Route Indicator - small dot */
          .nb-active-indicator {
            position: absolute;
            bottom: 4px;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background-color: #D4AF37;
            box-shadow: 0 0 6px rgba(212, 175, 55, 0.8);
            z-index: 3;
            pointer-events: none;
          }

          /* ─── Hover / Focus (desktop only) ─── */
          @media (hover: hover) {
            .nb-link:hover,
            .nb-link:focus-visible {
              width: 160px;
            }
            .nb-link:hover::before,
            .nb-link:focus-visible::before {
              opacity: 1;
            }
            .nb-link:hover::after,
            .nb-link:focus-visible::after {
              opacity: 0.5;
            }
            .nb-link:hover .nb-icon,
            .nb-link:focus-visible .nb-icon {
              transform: scale(0);
              transition-delay: 0s;
            }
            .nb-link:hover .nb-title,
            .nb-link:focus-visible .nb-title {
              transform: scale(1);
              transition-delay: 0.25s;
            }
          }

          /* ─── Active route: no expanded pill, just the dot ─── */
          /* No special expansion needed for active state, the dot is handled by React component */

          /* ─── Mobile: icon + label side-by-side ─── */
          .mobile-nav-wrapper .nb-item {
            width: 100%;
          }
          .mobile-nav-wrapper .nb-link {
            width: 100%;
            border-radius: 14px;
            height: 60px;
            gap: 12px;
            justify-content: center;
          }
          /* Remove the absolute positioning on mobile to let them sit side-by-side */
          .mobile-nav-wrapper .nb-icon {
            position: relative;
            transform: scale(1) !important;
            background-color: #D4AF37;
            transition: none;
          }
          .mobile-nav-wrapper .nb-title {
            position: relative;
            transform: scale(1) !important;
            color: #D4AF37 !important;
            font-size: 1.1rem;
            transition: none;
          }
          .mobile-nav-wrapper .nb-active-indicator {
            display: none; /* Hide dot on mobile, use full fill instead */
          }
          /* Mobile tap/active state */
          .mobile-nav-wrapper .nb-link:active::before,
          .mobile-nav-wrapper .nb-link.active::before {
            opacity: 1;
          }
          .mobile-nav-wrapper .nb-link:active .nb-icon,
          .mobile-nav-wrapper .nb-link.active .nb-icon {
            background-color: #000;
          }
          .mobile-nav-wrapper .nb-link:active .nb-title,
          .mobile-nav-wrapper .nb-link.active .nb-title {
            color: #000 !important;
          }

          /* ─── nb-register button ─── */
          .nb-register {
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 12px 28px;
            border-radius: 50px;
            background: linear-gradient(45deg, #B8860B, #F5D76E, #D4AF37);
            color: #000 !important;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            font-size: 0.85em;
            white-space: nowrap;
            text-decoration: none;
            border: none;
            box-shadow: 0 0 0 rgba(212,175,55,0);
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          /* Glossy shine */
          .nb-register::after {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%);
            transform: translateX(-120%);
            z-index: 1;
            transition: transform 0.7s ease;
          }

          /* Slow gold pulse ring */
          .nb-register::before {
            content: "";
            position: absolute;
            inset: -4px;
            border-radius: 54px;
            box-shadow: 0 0 0 0 rgba(212,175,55,0.7);
            z-index: -1;
            animation: nb-pulse-ring 2.5s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
          }

          @keyframes nb-pulse-ring {
            0% { box-shadow: 0 0 0 0 rgba(212,175,55,0.7); }
            70% { box-shadow: 0 0 0 15px rgba(212,175,55,0); }
            100% { box-shadow: 0 0 0 0 rgba(212,175,55,0); }
          }

          /* ─── Hover / Focus (desktop only) ─── */
          @media (hover: hover) {
            .nb-register:hover,
            .nb-register:focus-visible {
              transform: translateY(-2px);
              box-shadow: 0 8px 22px rgba(212,175,55,0.55);
            }
            .nb-register:hover::after,
            .nb-register:focus-visible::after {
              transform: translateX(120%);
            }
          }
          
          .nb-register:active {
            transform: scale(0.97) !important;
          }

          /* ─── Reduced motion ─── */
          @media (prefers-reduced-motion: reduce) {
            .nb-link, .nb-link::before, .nb-link::after, .nb-icon, .nb-title {
              transition: none !important;
            }
            .nb-register::before {
              animation: none !important;
              display: none;
            }
          }

          /* ─── Mobile Menu Blob Items (fixed: removed goo filter, added clip) ─── */
          @media (max-width: 1279px) {

            /* STEP 1+2: Outer wrapper – unclipped, carries the safe glow */
            .nb-m-item {
              position: relative;
              border-radius: 999px;                          /* (changed) matches pill */
              background: transparent !important;            /* (changed) no gold bg leak */
              transition: box-shadow 0.3s ease;
            }

            /* The link itself – fully clipped pill */
            .nb-m-link {
              position: relative;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 12px;
              width: 100%;
              height: 100%;
              border-radius: 999px;                          /* (changed) large pill radius */
              text-transform: uppercase;
              font-weight: bold;
              letter-spacing: 0.1em;
              background: rgba(255, 255, 255, 0.05);
              backdrop-filter: blur(10px);
              -webkit-backdrop-filter: blur(10px);
              border: 1.5px solid rgba(212, 175, 55, 0.5);
              color: #D4AF37 !important;
              overflow: hidden;                              /* clip children to pill */
              isolation: isolate;
              clip-path: inset(0 round 999px);               /* (added) hard pixel clip */
              -webkit-clip-path: inset(0 round 999px);
              background-clip: padding-box;                  /* (added) prevent border bleed */
              text-decoration: none;
              box-shadow: none;                              /* (changed) no shadow here, moved to wrapper */
              transition: none;
            }

            /* Inner blob container – inherits clip */
            .nb-m-inner {
              position: absolute;
              inset: 0;
              overflow: hidden;
              border-radius: inherit;                        /* matches pill */
              z-index: 1;
              pointer-events: none;
            }

            /* Blobs layer – NO goo filter (changed: removed filter:url(#nb-goo)) */
            .nb-m-blobs {
              position: relative;
              display: block;
              height: 100%;
              border-radius: inherit;                        /* (added) inherit pill clip */
              /* filter: url(#nb-goo);  ── REMOVED: caused gold rectangle leak ── */
            }

            /* Individual blob circles */
            .nb-m-blob {
              position: absolute;
              top: 0;
              width: 32%;                                    /* (changed) slightly wider */
              height: 150%;                                  /* (changed) taller for coverage */
              border-radius: 50%;
              background-color: #F5D76E;
              transform: translateY(160%) scale(1.3);        /* (changed) idle: hidden below */
              transition: transform 0.5s cubic-bezier(0.65, 0, 0.35, 1);
            }
            /* Fixed left positions per blob (changed: overrides inline left) */
            .nb-m-blob:nth-child(1) { left: -6%;  transition-delay: 0s; }
            .nb-m-blob:nth-child(2) { left: 22%;  transition-delay: 0.06s; }
            .nb-m-blob:nth-child(3) { left: 50%;  transition-delay: 0.12s; }
            .nb-m-blob:nth-child(4) { left: 76%;  transition-delay: 0.18s; }

            /* Solid gold fill underneath (::before) – keeps fill complete */
            .nb-m-link::before {
              content: "";
              position: absolute;
              inset: 0;
              z-index: 0;
              border-radius: inherit;                        /* matches pill */
              background: linear-gradient(135deg, #B8860B, #F5D76E, #D4AF37);
              transform: translateY(101%);
              transition: transform 0.5s 0.15s cubic-bezier(0.65, 0, 0.35, 1);
            }

            /* Title + icon at z-index 3 */
            .nb-m-title {
              position: relative;
              z-index: 3;
              transition: color 0.3s ease;
            }
            .nb-m-link .nb-icon {
              position: relative;                            /* (added) keep in flow */
              z-index: 3;
            }

            /* Register Now Idle (Inverted) */
            .nb-m-link.nb-m-register {
              background: linear-gradient(135deg, #B8860B, #F5D76E, #D4AF37);
              color: #000 !important;
              border: 1.5px solid transparent;
            }
            .nb-m-link.nb-m-register::before {
              background: #000;
            }
            .nb-m-link.nb-m-register .nb-m-blob {
              background-color: #000;
            }

            /* ── Hover / Tap / Active States ── */

            /* STEP 3: Safe glow on WRAPPER only (unclipped, has border-radius) */
            .nb-m-item:active,
            .nb-m-item:focus-within {
              box-shadow: 0 0 12px rgba(212, 175, 55, 0.3); /* (changed) safe glow on wrapper */
            }
            .nb-m-item:has(.nb-m-link.active) {
              box-shadow: 0 0 12px rgba(212, 175, 55, 0.3); /* active route glow */
            }
            @media (hover: hover) {
              .nb-m-item:hover {
                box-shadow: 0 0 12px rgba(212, 175, 55, 0.3);
              }
            }

            /* Blobs rise into view on active/tap/hover */
            .nb-m-link:active .nb-m-blob,
            .nb-m-link:focus-visible .nb-m-blob,
            .nb-m-link.active .nb-m-blob {
              transform: translateY(-8%) scale(1.5);         /* (changed) slightly tighter */
            }
            @media (hover: hover) {
              .nb-m-link:hover .nb-m-blob {
                transform: translateY(-8%) scale(1.5);
              }
            }

            /* Solid fill slides up on active/tap/hover */
            .nb-m-link:active::before,
            .nb-m-link:focus-visible::before,
            .nb-m-link.active::before {
              transform: translateY(0);
            }
            @media (hover: hover) {
              .nb-m-link:hover::before {
                transform: translateY(0);
              }
            }

            /* Text goes black on fill */
            .nb-m-link:active .nb-m-title,
            .nb-m-link:focus-visible .nb-m-title,
            .nb-m-link.active .nb-m-title {
              color: #000 !important;
            }
            @media (hover: hover) {
              .nb-m-link:hover .nb-m-title {
                color: #000 !important;
              }
            }

            /* Icon goes black on fill */
            .nb-m-link:active .nb-icon,
            .nb-m-link:focus-visible .nb-icon,
            .nb-m-link.active .nb-icon {
              background-color: #000;
            }
            @media (hover: hover) {
              .nb-m-link:hover .nb-icon {
                background-color: #000;
              }
            }

            /* Register Now Hover (Inverted colors) */
            .nb-m-link.nb-m-register:active,
            .nb-m-link.nb-m-register:focus-visible,
            .nb-m-link.nb-m-register.active {
              border-color: rgba(212, 175, 55, 0.5);
            }
            @media (hover: hover) {
              .nb-m-link.nb-m-register:hover {
                border-color: rgba(212, 175, 55, 0.5);
              }
            }
            .nb-m-link.nb-m-register:active .nb-m-title,
            .nb-m-link.nb-m-register:focus-visible .nb-m-title,
            .nb-m-link.nb-m-register.active .nb-m-title {
              color: #D4AF37 !important;
            }
            @media (hover: hover) {
              .nb-m-link.nb-m-register:hover .nb-m-title {
                color: #D4AF37 !important;
              }
            }

            /* Reduced motion */
            @media (prefers-reduced-motion: reduce) {
              .nb-m-link, .nb-m-blob, .nb-m-link::before, .nb-m-title {
                transition: none !important;
              }
              /* (changed) no filter to remove, just ensure blobs are static */
            }
          }

          /* ═══ nb-logo-link — added: clickable logo wrapper ═══ */
          .nb-logo-link {
            display: inline-flex;
            align-items: center;
            cursor: pointer;
            text-decoration: none;
            color: inherit;
            transition: transform .3s ease, filter .3s ease;
          }
          @media (hover: hover) {
            .nb-logo-link:hover {
              transform: translateY(-2px) scale(1.05);
              filter: drop-shadow(0 0 8px rgba(212,175,55,.6));
            }
          }
          .nb-logo-link:focus-visible {
            outline: 2px solid #D4AF37;
            outline-offset: 4px;
            border-radius: 6px;
          }
          @media (prefers-reduced-motion: reduce) {
            .nb-logo-link {
              transition: none !important;
              transform: none !important;
            }
          }
        `}</style>

        {/* Hidden Goo Filter */}
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <defs>
            <filter id="nb-goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="b" />
              <feColorMatrix in="b" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 20 -8" />
            </filter>
          </defs>
        </svg>

        {/* Background Ambient Glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
          <div
            ref={glowRef}
            className="absolute top-1/2 left-1/4 w-[24rem] h-16 bg-gold/10 blur-[80px] rounded-full -translate-y-1/2"
          />
        </div>


        {/* ═══ Floating Gold Dots ═══ */}
        <div
          ref={goldDotsLayerRef}
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ zIndex: 1 }}
        >
          {goldDots}
        </div>

        {/* Floating Particles (original) */}
        <div
          ref={particlesRef}
          className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block"
          style={{ zIndex: 1 }}
        >
          {particles}
        </div>

        <div className="w-full px-4 lg:px-6 flex items-center h-full relative z-10 gap-4">

          {/* Institutional Logo Strip */}
          <div ref={brandingRef} className="flex items-center justify-start gap-1.5 sm:gap-3 lg:gap-4 flex-1 min-w-0 py-1" aria-label="Institutional Branding">
            {logosData.map((logo, index) => {
              const link = LOGO_LINKS[index]; // added: pull matching link entry
              return (
                <React.Fragment key={index}>
                  {/* Wrapped in <a> for external link — added */}
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${link.name} website`}
                    className="nb-logo-link branding-logo relative group cursor-pointer flex items-center justify-center flex-shrink min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
                    onClick={(e) => { if (link.url === "#") e.preventDefault(); }}
                  >
                    {/* Hover Aura */}
                    <div className="logo-aura absolute inset-[-4px] bg-gold blur-[8px] opacity-0 pointer-events-none rounded-full" />
                    <img src={logo.src} alt={link.name} className={`${logo.height} w-auto max-w-full object-contain relative z-10 drop-shadow-md`} />
                  </a>
                  {/* Separator */}
                  {index < logosData.length - 1 && (
                    <div className="h-4 sm:h-5 lg:h-6 w-[1px] bg-gold/25 logo-separator flex-shrink-0" />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Desktop Navigation – expanding pill items */}
          <nav ref={navRef} className="hidden xl:flex items-center gap-1 lg:gap-3 flex-shrink-0" aria-label="Main Navigation">
            <ul className="nb-list">
              {navItems.map((item, index) => {
                return (
                  <NavPill
                    key={index}
                    item={item}
                    onClick={handleNavClick}
                  />
                );
              })}
              {/* Register Now Button (Desktop) */}
              <li className="nb-item ml-2">
                <a
                  href="/register"
                  className="nb-register"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('/register');
                  }}
                >
                  Register Now
                </a>
              </li>
            </ul>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            className="xl:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded flex-shrink-0 ml-auto"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <div ref={hamburgerRef} className="w-5 h-[12px] relative flex flex-col justify-between pointer-events-none">
              <span className="w-full h-[1.5px] bg-white block rounded-full" />
              <span className="w-full h-[1.5px] bg-white block rounded-full" />
              <span className="w-full h-[1.5px] bg-white block rounded-full" />
            </div>
          </button>

        </div>

        {/* Bottom Energy Border with Flowing Gold Light */}
        <div ref={borderLineRef} className="absolute bottom-0 left-0 w-full h-[3px] pointer-events-none" style={{ zIndex: 2 }}>
          {/* Static subtle gold baseline */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(212,175,55,0.12)] to-transparent" />
          {/* Flowing gold light orb */}
          <div
            className="border-energy-glow-enhanced absolute top-1/2 -translate-y-1/2 -left-[60px] w-[60px] h-[3px] pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.15) 15%, rgba(245,215,110,0.9) 40%, #FFD700 50%, rgba(245,215,110,0.9) 60%, rgba(212,175,55,0.15) 85%, transparent 100%)',
              boxShadow: '0 0 12px 3px rgba(245,215,110,0.4), 0 0 30px 6px rgba(212,175,55,0.15)',
              borderRadius: '50%',
            }}
          />
        </div>
      </header>

      {/* Mobile Menu Overlay — fixed panel below header, centered items */}
      <div
        ref={mobileMenuOverlayRef}
        className="fixed inset-0 bg-[#030303]/98 backdrop-blur-xl z-40 hidden opacity-0"
      >
        {/* ── mobile-menu-panel layout (changed) ── */}
        <style>{`
          @media (max-width: 1023px) {
            /* Panel fills viewport below the header */
            .nb-mobile-panel {
              position: fixed !important;
              left: 0; right: 0; bottom: 0;
              top: 70px;                                     /* header height */
              height: calc(100dvh - 70px);                   /* dvh for mobile browser toolbars */
              height: calc(100vh - 70px);                     /* fallback */
              display: flex !important;
              flex-direction: column;
              justify-content: center;                       /* vertical centering */
              align-items: center;                           /* horizontal centering */
              gap: 18px;                                     /* tight even spacing */
              padding: 24px 20px;
              padding-bottom: 8vh;                           /* optical lift */
              overflow-y: auto;
              /* reset old spacing */
              padding-top: 0 !important;
            }

            /* Remove large gaps/padding from the inner <nav> */
            .nb-mobile-panel nav.nb-mobile-nav {
              gap: 0 !important;
              width: 100%;
              max-width: 420px;
              padding: 0;
              margin: 0;
            }
            .nb-mobile-panel nav.nb-mobile-nav .nb-list {
              gap: 18px !important;
            }

            /* Each item: constrained width, fixed height, no extra margin */
            .nb-mobile-panel .mobile-nav-wrapper {
              width: min(320px, 100%) !important;
              height: 56px !important;
              padding: 0 !important;
              margin: 0 !important;
            }

            /* Register Now gets a tiny top margin for separation */
            .nb-mobile-panel .mobile-nav-wrapper.nb-register-wrapper {
              margin-top: 8px !important;
            }

            /* Landscape / very short screens: don't clip items */
            @media (max-height: 520px) {
              .nb-mobile-panel {
                justify-content: flex-start !important;
                gap: 12px !important;
                padding-top: 16px !important;
                padding-bottom: 16px !important;
              }
              .nb-mobile-panel .mobile-nav-wrapper {
                height: 52px !important;
              }
              .nb-mobile-panel nav.nb-mobile-nav .nb-list {
                gap: 12px !important;
              }
            }
          }
        `}</style>
        {/* Cinematic Dark Background & Balanced Ambient Light */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
          {/* Subtle balanced radial gradients instead of one intense bar */}
          <div className="absolute top-0 left-0 w-[80vw] h-[80vw] bg-gold/5 blur-[120px] rounded-full translate-x-[-30%] translate-y-[-30%]" />
          <div className="absolute bottom-0 right-0 w-[80vw] h-[80vw] bg-gold/5 blur-[120px] rounded-full translate-x-[30%] translate-y-[30%]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-gold/5 blur-[140px] rounded-full opacity-40" />

          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(212, 175, 55, 1) 25%, rgba(212, 175, 55, 1) 26%, transparent 27%, transparent 74%, rgba(212, 175, 55, 1) 75%, rgba(212, 175, 55, 1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(212, 175, 55, 1) 25%, rgba(212, 175, 55, 1) 26%, transparent 27%, transparent 74%, rgba(212, 175, 55, 1) 75%, rgba(212, 175, 55, 1) 76%, transparent 77%, transparent)', backgroundSize: '60px 60px' }} />
          {mobileParticles}
        </div>

        {/* Dynamic Gold Energy Border Circuit */}
        <div className="absolute inset-4 border border-transparent pointer-events-none z-10">
          <div className="circuit-top absolute top-0 left-0 w-full h-[1px] bg-gold/30" />
          <div className="circuit-right absolute top-0 right-0 w-[1px] h-full bg-gold/30" />
          <div className="circuit-bottom absolute bottom-0 left-0 w-full h-[1px] bg-gold/30" />
          <div className="circuit-left absolute top-0 left-0 w-[1px] h-full bg-gold/30" />
        </div>

        <div
          ref={mobileMenuInnerRef}
          className="nb-mobile-panel flex flex-col items-center w-full relative hidden opacity-0 z-20 no-scrollbar"
        >
          {/* Compact Logo Branding at the top of the mobile menu */}
          {/* <div className="flex items-center justify-center gap-1.5 sm:gap-3 w-[min(90vw,420px)] mx-auto mb-10 flex-nowrap flex-shrink-0 min-w-0">
            {logosData.map((logo, index) => (
              <React.Fragment key={'mobile-' + index}>
                <div className="flex flex-shrink min-w-0 items-center justify-center">
                  <img src={logo.src} alt={logo.alt} className="h-5 sm:h-7 w-auto max-w-full object-contain drop-shadow-md" />
                </div>
                {index < logosData.length - 1 && (
                  <div className="h-4 w-[1px] bg-gold/25 flex-shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div> */}

          {/* Mobile nav – centered pills with icon + label always visible (changed) */}
          <nav className="nb-mobile-nav flex flex-col items-center w-full mx-auto flex-shrink-0" aria-label="Mobile Navigation">
            <ul className="nb-list" style={{ flexDirection: 'column', width: '100%', alignItems: 'center' }}>
              {navItems.map((item, index) => {
                return (
                  <div key={index} className="mobile-nav-wrapper overflow-hidden flex justify-center">
                    <MobileBlobItem
                      item={item}
                      onClick={handleNavClick}
                      className="w-full h-full"
                    />
                  </div>
                );
              })}

              {/* Register Now Button (Mobile Blob) */}
              <div className="mobile-nav-wrapper nb-register-wrapper overflow-hidden flex justify-center">
                <MobileBlobItem
                  item={{ label: 'Register Now', href: REGISTER_URL }}
                  onClick={handleNavClick}
                  isRegister={true}
                  className="w-full h-full"
                />
              </div>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
