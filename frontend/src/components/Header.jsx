import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import Logo Assets
import collegeLogo from '../assets/logos/college-logo.png';

import ieeeLogo from '../assets/logos/ieee-logo.png';
import bangaloreSection from '../assets/logos/bangalore-section.png';
import wieLogo from '../assets/logos/wie-logo.png';
import computerSociety from '../assets/logos/computer-society.png';

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: 'Home', href: '/', id: 'home' },
  { label: 'About Us', href: '/aboutUs', id: 'about' },
  { label: 'Contact Us', href: '/contactUs', id: 'contact' },
  { label: 'FAQs', href: '/ faqs', id: 'faqs' }
];

const logosData = [
  { src: collegeLogo, alt: 'College Logo', height: 'h-9 sm:h-11 lg:h-14' },
  { src: ieeeLogo, alt: 'IEEE Logo', height: 'h-7 sm:h-9 lg:h-10' },
  { src: bangaloreSection, alt: 'IEEE Bangalore Section', height: 'h-6 sm:h-8 lg:h-9' },
  { src: wieLogo, alt: 'IEEE WIE', height: 'h-6 sm:h-8 lg:h-9' },
  { src: computerSociety, alt: 'IEEE Computer Society', height: 'h-6 sm:h-8 lg:h-9' }
];

export default function Header() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const brandingRef = useRef(null);
  const navRef = useRef(null);
  const borderLineRef = useRef(null);
  const particlesRef = useRef(null);
  const glowRef = useRef(null);
  const mobileMenuInnerRef = useRef(null);
  const hamburgerRef = useRef(null);
  const mobileMenuOverlayRef = useRef(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');
  const [reducedMotion, setReducedMotion] = useState(false);
  const prevActiveLinkRef = useRef('#home');
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

      // 7. Gold Energy Border
      const borderGlow = document.querySelector('.border-energy-glow');
      if (!reducedMotion && borderGlow) {
        gsap.to(borderGlow, {
          left: '100%',
          duration: 5,
          repeat: -1,
          ease: 'linear'
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

  // Scroll-based active section detection
  useEffect(() => {
    const sectionIds = navItems.map(item => item.id);
    const observers = [];

    sectionIds.forEach(id => {
      const section = document.getElementById(id);
      if (!section) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveLink(`#${id}`);
          }
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );

      observer.observe(section);
      observers.push(observer);
    });

    return () => observers.forEach(obs => obs.disconnect());
  }, []);

  // GSAP smooth active-state color transition
  // This is the SINGLE SOURCE OF TRUTH for nav text color.
  // Hover handlers must NOT animate color/textShadow — only scale, capsule, sweep, letterSpacing.
  useEffect(() => {
    const allLinks = document.querySelectorAll('.hover-nav-link');
    allLinks.forEach(link => {
      const text = link.querySelector('.nav-text');
      const href = link.getAttribute('href');
      const shouldBeActive = href === activeLink;

      link.setAttribute('data-active', shouldBeActive ? 'true' : 'false');

      if (text) {
        // overwrite: true kills any competing tween on these properties
        gsap.to(text, {
          color: shouldBeActive ? '#F5D76E' : '#FFFFFF',
          textShadow: shouldBeActive ? '0 0 6px rgba(245,215,110,0.25)' : 'none',
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      }
    });

    prevActiveLinkRef.current = activeLink;
  }, [activeLink]);

  // Unified Magnifier Hover Setup (Shared for Desktop and Mobile)
  // IMPORTANT: Hover ONLY controls scale, capsule, sweep, and letterSpacing.
  // Text color is exclusively owned by the active-state effect above.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const links = document.querySelectorAll('.hover-nav-link');
      const cleanups = [];

      links.forEach(link => {
        const text = link.querySelector('.nav-text');
        const capsule = link.querySelector('.nav-capsule');
        const sweep = link.querySelector('.nav-sweep');

        if (reducedMotion) return;

        const handleHoverIn = () => {
          gsap.killTweensOf([link, capsule, sweep]);

          gsap.to(link, { scale: 1.12, duration: 0.4, ease: 'power3.out' });
          gsap.to(capsule, { opacity: 1, duration: 0.4, ease: 'power3.out' });
          gsap.to(text, { letterSpacing: '0.17em', duration: 0.4, ease: 'power3.out' });

          gsap.fromTo(sweep,
            { left: '-100%' },
            { left: '150%', duration: 0.8, ease: 'power2.out' }
          );
        };

        const handleHoverOut = () => {
          gsap.killTweensOf([link, capsule, sweep]);

          gsap.to(link, { scale: 1, duration: 0.4, ease: 'power3.out' });
          gsap.to(capsule, { opacity: 0, duration: 0.4, ease: 'power3.out' });
          gsap.to(text, { letterSpacing: '0.15em', duration: 0.4, ease: 'power3.out' });
        };

        const handleMouseMove = (e) => {
          const rect = link.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          link.style.setProperty('--mouse-x', `${x}px`);
          link.style.setProperty('--mouse-y', `${y}px`);
        };

        link.addEventListener('mouseenter', handleHoverIn);
        link.addEventListener('mouseleave', handleHoverOut);
        link.addEventListener('mousemove', handleMouseMove);
        link.addEventListener('focus', handleHoverIn);
        link.addEventListener('blur', handleHoverOut);

        cleanups.push(() => {
          link.removeEventListener('mouseenter', handleHoverIn);
          link.removeEventListener('mouseleave', handleHoverOut);
          link.removeEventListener('mousemove', handleMouseMove);
          link.removeEventListener('focus', handleHoverIn);
          link.removeEventListener('blur', handleHoverOut);
        });
      });

      return () => {
        cleanups.forEach(cleanup => cleanup());
      };
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

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

  const handleNavClick = (href) => {
    setActiveLink(href);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
    // Smooth scroll to section
    const sectionId = href.replace('#', '');
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
        className="fixed top-0 left-0 w-full z-50 transition-all duration-500 bg-background/0 py-2 sm:py-3"
      >
        <style>{`
          .header-scrolled {
            background-color: rgba(3, 3, 3, 0.85);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            padding-top: 0.5rem !important;
            padding-bottom: 0.5rem !important;
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
            border-bottom: 1px solid rgba(212, 175, 55, 0.15);
          }
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>

        {/* Background Ambient Glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div
            ref={glowRef}
            className="absolute top-1/2 left-1/4 w-[24rem] h-16 bg-gold/10 blur-[80px] rounded-full -translate-y-1/2"
          />
        </div>

        {/* Floating Particles */}
        <div
          ref={particlesRef}
          className="absolute inset-0 overflow-hidden pointer-events-none -z-10 hidden md:block"
        >
          {particles}
        </div>

        <div className="w-full px-4 lg:px-6 flex items-center h-full relative z-10 gap-4">

          {/* Institutional Logo Strip */}
          <div ref={brandingRef} className="flex items-center justify-start gap-1.5 sm:gap-3 lg:gap-4 flex-1 min-w-0 py-1" aria-label="Institutional Branding">
            {logosData.map((logo, index) => (
              <React.Fragment key={index}>
                <button
                  className="branding-logo relative group cursor-pointer flex items-center justify-center flex-shrink min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
                  aria-label={logo.alt}
                >
                  {/* Hover Aura */}
                  <div className="logo-aura absolute inset-[-4px] bg-gold blur-[8px] opacity-0 pointer-events-none rounded-full" />
                  <img src={logo.src} alt={logo.alt} className={`${logo.height} w-auto max-w-full object-contain relative z-10 drop-shadow-md`} />
                </button>
                {/* Separator */}
                {index < logosData.length - 1 && (
                  <div className="h-4 sm:h-5 lg:h-6 w-[1px] bg-gold/25 logo-separator flex-shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Desktop Navigation */}
          <nav ref={navRef} className="hidden md:flex items-center gap-1 lg:gap-3 flex-shrink-0" aria-label="Main Navigation">
            {navItems.map((item, index) => {
              const isActive = activeLink === item.href;
              return (
                <a
                  key={index}
                  href={item.href}
                  data-active={isActive}
                  className="hover-nav-link relative group py-2 px-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold flex justify-center items-center rounded-full"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                >
                  {/* Glassy Gold Lens Hover */}
                  <div className="nav-capsule absolute inset-0 rounded-full opacity-0 pointer-events-none border border-[rgba(245,215,110,0.55)] bg-[rgba(212,175,55,0.14)] backdrop-blur-[15px] shadow-[0_0_20px_rgba(212,175,55,0.2),inset_0_0_15px_rgba(245,215,110,0.1)] overflow-hidden transition-colors">
                    {/* Interactive mouse hotspot glow */}
                    <div className="absolute inset-0 opacity-50 pointer-events-none" style={{ background: 'radial-gradient(circle 50px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(245,215,110,0.5), transparent)' }} />
                    {/* Metallic Sweep */}
                    <div className="nav-sweep absolute top-0 -left-[100%] w-[150%] h-full bg-gradient-to-r from-transparent via-[rgba(245,215,110,0.25)] to-transparent skew-x-[-20deg]" />
                  </div>

                  {/* Terminal Typography Container */}
                  <div className="relative z-10 flex items-center pointer-events-none">
                    <span className={`nav-text text-xs lg:text-sm font-medium tracking-[0.15em] uppercase whitespace-nowrap ${isActive ? 'text-[#F5D76E]' : 'text-[#FFFFFF]'}`}
                      style={{ textShadow: isActive ? '0 0 6px rgba(245,215,110,0.25)' : 'none' }}
                    >
                      {item.label}
                    </span>
                  </div>


                </a>
              );
            })}
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded flex-shrink-0 ml-auto"
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

        {/* Bottom Energy Border */}
        <div ref={borderLineRef} className="absolute bottom-0 left-0 w-full h-[1px] bg-white/[0.03] hidden md:block">
          <div className="border-energy-glow absolute top-0 -left-[100px] w-[100px] h-full bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        ref={mobileMenuOverlayRef}
        className="fixed inset-0 bg-[#030303]/98 backdrop-blur-xl z-40 hidden opacity-0"
      >
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
          className="flex flex-col items-center justify-start h-full w-full relative hidden opacity-0 z-20 pt-20 sm:pt-24 pb-8 overflow-y-auto no-scrollbar"
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

          <nav className="flex flex-col items-center gap-4 sm:gap-6 w-[min(88vw,420px)] mx-auto flex-shrink-0" aria-label="Mobile Navigation">
            {navItems.map((item, index) => {
              const isActive = activeLink === item.href;
              return (
                <div key={index} className="mobile-nav-wrapper overflow-hidden p-3 w-full flex justify-center">
                  <a
                    href={item.href}
                    data-active={isActive}
                    className="hover-nav-link relative group py-5 px-10 sm:px-14 w-fit flex flex-col items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-3xl"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                  >
                    {/* Glassy Gold Lens (Hidden by default, shown on hover/focus) */}
                    <div className="nav-capsule absolute inset-0 rounded-3xl opacity-0 pointer-events-none border border-[rgba(245,215,110,0.55)] bg-[rgba(212,175,55,0.14)] backdrop-blur-[15px] shadow-[0_0_20px_rgba(212,175,55,0.2),inset_0_0_15px_rgba(245,215,110,0.1)] overflow-hidden transition-colors">
                      {/* Interactive mouse hotspot glow */}
                      <div className="absolute inset-0 opacity-50 pointer-events-none" style={{ background: 'radial-gradient(circle 80px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(245,215,110,0.5), transparent)' }} />
                      {/* Metallic Sweep */}
                      <div className="nav-sweep absolute top-0 -left-[100%] w-[150%] h-full bg-gradient-to-r from-transparent via-[rgba(245,215,110,0.25)] to-transparent skew-x-[-20deg]" />
                    </div>

                    <div className="flex flex-col items-center gap-1.5 relative z-10 pointer-events-none">

                      <span className={`nav-text text-2xl sm:text-3xl font-medium tracking-[0.15em] uppercase whitespace-nowrap ${isActive ? 'text-[#F5D76E]' : 'text-[#FFFFFF]'}`}
                        style={{ textShadow: isActive ? '0 0 6px rgba(245,215,110,0.25)' : 'none' }}
                      >
                        {item.label}
                      </span>
                    </div>


                  </a>
                </div>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
