import React, { useEffect, useRef, useState } from 'react'

// Responsive fragment positioning configuration (desktop = identity / no-op)
const FRAG_CONFIG = {
  // Fragment 1: Upper-Right Major Chiseled Golden Plate (original center ~1300, 220)
  frag1: {
    cx: 1300,
    cy: 220,
    tablet: { dx: -160, dy: -10, scale: 0.82 },
    largeMobile: { dx: -220, dy: -25, scale: 0.74 },
    smallMobile: { dx: -270, dy: -40, scale: 0.68 },
  },
  // Fragment 2: Upper-Left Architectural Prism Beam (original center ~260, 125)
  frag2: {
    cx: 260,
    cy: 125,
    tablet: { dx: 220, dy: -10, scale: 0.82 },
    largeMobile: { dx: 320, dy: -5, scale: 0.72 },
    smallMobile: { dx: 370, dy: 0, scale: 0.65 },
  },
  // Fragment 3: Center-Right Monolithic Plate (original center ~1170, 480)
  // Kept toward right edge, scaled down, wide black space between it, heading, and other cards
  frag3: {
    cx: 1170,
    cy: 480,
    tablet: { dx: -70, dy: -10, scale: 0.78 },
    largeMobile: { dx: -110, dy: -10, scale: 0.68 },
    smallMobile: { dx: -125, dy: -10, scale: 0.58 },
  },
  // Fragment 4: Lower-Right Architectural Wedge Plate (original center ~1320, 740)
  // Shifted away from CTA buttons and Center-Right card
  frag4: {
    cx: 1320,
    cy: 740,
    tablet: { dx: -150, dy: 15, scale: 0.8 },
    largeMobile: { dx: -220, dy: 25, scale: 0.7 },
    smallMobile: { dx: -260, dy: 40, scale: 0.6 },
  },
  // Fragment 5: Lower-Left Geometric Plate (original center ~320, 780)
  // Frames left margin alongside tagline, clearly above CTA buttons
  frag5: {
    cx: 320,
    cy: 780,
    tablet: { dx: 150, dy: -70, scale: 0.78 },
    largeMobile: { dx: 240, dy: -180, scale: 0.68 },
    smallMobile: { dx: 270, dy: -250, scale: 0.58 },
  },
  // Fragment 6: Precision Golden Ring Arc (original center ~1100, 280)
  frag6: {
    cx: 1100,
    cy: 280,
    tablet: { dx: -70, dy: -10, scale: 0.82 },
    largeMobile: { dx: -70, dy: -15, scale: 0.72 },
    smallMobile: { dx: -60, dy: -20, scale: 0.65 },
  },
  // Fragment 7: Angular Golden Shard (original center ~880, 350)
  // Shifted toward upper-right perimeter away from the central heading
  frag7: {
    cx: 880,
    cy: 350,
    tablet: { dx: 40, dy: -30, scale: 0.78 },
    largeMobile: { dx: 60, dy: -60, scale: 0.65 },
    smallMobile: { dx: 80, dy: -80, scale: 0.52 },
  },
  // Fragment 8: Top-Center Rectangular Block (original center ~810, 140)
  // Centered above heading with generous black space
  frag8: {
    cx: 810,
    cy: 140,
    tablet: { dx: 0, dy: -10, scale: 0.82 },
    largeMobile: { dx: -15, dy: -25, scale: 0.7 },
    smallMobile: { dx: -30, dy: -45, scale: 0.6 },
  },
  // Fragment 9: Lower Center-Right Sharp Shard -> Lower Card (original center ~940, 680)
  // Anchored in bottom center below CTA buttons with black gap
  frag9: {
    cx: 940,
    cy: 680,
    tablet: { dx: -70, dy: 80, scale: 0.8 },
    largeMobile: { dx: -100, dy: 170, scale: 0.72 },
    smallMobile: { dx: -140, dy: 230, scale: 0.65 },
  },
  // Fragment 10: Lower Ring Arc (original center ~1170, 780)
  frag10: {
    cx: 1170,
    cy: 780,
    tablet: { dx: -120, dy: 15, scale: 0.82 },
    largeMobile: { dx: -120, dy: 30, scale: 0.72 },
    smallMobile: { dx: -90, dy: 40, scale: 0.62 },
  },
}

function getFragTransform(key, tier) {
  if (tier === 'desktop' || !FRAG_CONFIG[key]) return undefined
  const conf = FRAG_CONFIG[key]
  const p = conf[tier]
  if (!p) return undefined
  const { dx = 0, dy = 0, scale = 1, rotate = 0 } = p
  if (dx === 0 && dy === 0 && scale === 1 && rotate === 0) return undefined
  const rotStr = rotate !== 0 ? ` rotate(${rotate})` : ''
  const scaleStr = scale !== 1 ? ` scale(${scale})` : ''
  return `translate(${conf.cx + dx}, ${conf.cy + dy})${rotStr}${scaleStr} translate(-${conf.cx}, -${conf.cy})`
}

export default function Hero() {
  const heroRef = useRef(null)
  const heroInnerRef = useRef(null)
  const [bleedStyle, setBleedStyle] = useState({})
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [targetMouse, setTargetMouse] = useState({ x: 0, y: 0 })
  const [reducedMotion, setReducedMotion] = useState(false)
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1440,
    height: typeof window !== 'undefined' ? window.innerHeight : 900,
  })

  // Responsive resize listener
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const { width: windowWidth, height: windowHeight } = windowDimensions

  // Detect tablet/iPad in portrait (e.g. 768x1024, 820x1180, 834x1194, 1024x1366)
  const isPortraitTablet =
    windowWidth <= 1024 && windowHeight > windowWidth

  const tier =
    windowWidth < 480
      ? 'smallMobile'
      : windowWidth < 768
        ? 'largeMobile'
        : (windowWidth < 1024 || isPortraitTablet)
          ? 'tablet'
          : 'desktop'

  // 1. Accessibility: Detect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // 2. Full-viewport edge-to-edge container breakout without horizontal scrollbars
  useEffect(() => {
    const updateBleed = () => {
      const docW = document.documentElement.clientWidth
      const parentW = heroRef.current?.parentElement?.clientWidth || docW
      if (docW > parentW) {
        const diff = (docW - parentW) / 2
        setBleedStyle({
          width: `${docW}px`,
          marginLeft: `-${diff}px`,
          marginRight: `-${diff}px`,
        })
      } else {
        setBleedStyle({ width: '100%' })
      }
    }

    updateBleed()
    window.addEventListener('resize', updateBleed)
    return () => window.removeEventListener('resize', updateBleed)
  }, [])

  // 3. Desktop mouse parallax smoothing with requestAnimationFrame (disabled on mobile & reduced-motion)
  useEffect(() => {
    if (reducedMotion) return
    const isMobile = window.matchMedia('(max-width: 1023px)').matches
    if (isMobile) return

    let animId
    const lerp = (a, b, t) => a + (b - a) * t

    const tick = () => {
      setMousePos((prev) => ({
        x: lerp(prev.x, targetMouse.x, 0.05),
        y: lerp(prev.y, targetMouse.y, 0.05),
      }))
      animId = requestAnimationFrame(tick)
    }

    animId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animId)
  }, [targetMouse, reducedMotion])

  const handleMouseMove = (e) => {
    if (reducedMotion || window.innerWidth < 1024 || !heroRef.current) return
    const rect = heroRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2 // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2 // -1 to 1
    setTargetMouse({ x, y })
  }

  const handleMouseLeave = () => {
    setTargetMouse({ x: 0, y: 0 })
  }

  // 4. GSAP & ScrollTrigger Dynamic Loading & Lifecycle Management
  useEffect(() => {
    let gsapContext = null

    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve()
          return
        }
        const s = document.createElement('script')
        s.src = src
        s.async = true
        s.onload = resolve
        s.onerror = reject
        document.head.appendChild(s)
      })
    }

    const initHeroAnimation = () => {
      const gsap = window.gsap
      if (!gsap) return

      if (window.ScrollTrigger) {
        gsap.registerPlugin(window.ScrollTrigger)
      }

      gsapContext = gsap.context(() => {
        // ENTRANCE TIMELINE
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

        // Initial setup
        gsap.set('.hero-content-layer', { opacity: 1 })
        gsap.set('.fragment-svg', { opacity: 1 })

        // Sequential cinematic entrance
        tl
          // 1. Small atmospheric fragments appear first
          .fromTo(
            '.fragment-micro',
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 1.2, stagger: 0.05 },
            0.1
          )
          // 2. Golden metallic plates reveal with spatial expansion
          .fromTo(
            '.fragment-plate',
            { opacity: 0, scale: 0.88, rotateZ: 4 },
            { opacity: 1, scale: 1, rotateZ: 0, duration: 1.8, stagger: 0.08, ease: 'expo.out' },
            0.3
          )
          // 3. Thin architectural outlines draw in
          .fromTo(
            '.fragment-outline',
            { strokeDashoffset: 600, opacity: 0 },
            { strokeDashoffset: 0, opacity: 1, duration: 1.6, stagger: 0.1, ease: 'power2.inOut' },
            0.5
          )
          // 4. Top HUD bar
          .fromTo(
            '.hero-header-bar',
            { opacity: 0, y: -16 },
            { opacity: 1, y: 0, duration: 0.8 },
            0.7
          )
          // 5. Eyebrow badge
          .fromTo(
            '.hero-eyebrow-pill',
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.7 },
            0.85
          )
          // 6. Main typography reveals
          .fromTo(
            '.hero-headline-word',
            { opacity: 0, y: 40, skewY: 1.5 },
            { opacity: 1, y: 0, skewY: 0, duration: 0.9, stagger: 0.12, ease: 'expo.out' },
            1.0
          )
          // 7. Tagline & description
          .fromTo(
            '.hero-tagline-wrap',
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.7 },
            1.3
          )
          .fromTo(
            '.hero-description-wrap',
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.7 },
            1.4
          )
          // 8. Buttons appear last
          .fromTo(
            '.hero-btn',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 },
            1.55
          )
          // 9. Scroll prompt
          .fromTo(
            '.hero-scroll-indicator',
            { opacity: 0 },
            { opacity: 1, duration: 0.8 },
            1.75
          )

        // SCROLL TRIGGER: ASSEMBLE -> REVEAL -> DISASSEMBLE
        if (!reducedMotion && window.ScrollTrigger && heroRef.current) {
          const isDesktop =
            window.innerWidth >= 1024 && window.innerWidth >= window.innerHeight

          const scrollTl = gsap.timeline({
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: isDesktop ? '+=140%' : '+=90%',
              pin: heroInnerRef.current,
              pinSpacing: true,
              pinReparent: true,
              scrub: 0.9,
              anticipatePin: 1,
            },
          })

          // Phase 1 (0–25%): Scroll indicator vanishes, fragments begin convergent assembly
          scrollTl.to('.hero-scroll-indicator', { opacity: 0, y: 15, ease: 'none', duration: 0.2 }, 0)

          scrollTl.to('.frag-converge-a', {
            x: isDesktop ? -40 : -4,
            y: isDesktop ? 30 : 3,
            rotateZ: isDesktop ? -4 : 0,
            ease: 'none',
            duration: 0.35,
          }, 0.05)

          scrollTl.to('.frag-converge-b', {
            x: isDesktop ? 35 : 4,
            y: isDesktop ? -25 : -3,
            rotateZ: isDesktop ? 5 : 0,
            ease: 'none',
            duration: 0.35,
          }, 0.05)

          // Phase 2 (25–60%): Secondary rotation, scaling toward viewer, text subtle drift
          scrollTl.to('.frag-foreground', {
            scale: isDesktop ? 1.18 : 1.01,
            filter: 'drop-shadow(0 0 25px rgba(212,175,55,0.45))',
            ease: 'none',
            duration: 0.4,
          }, 0.25)

          scrollTl.to('.frag-midground', {
            rotateZ: isDesktop ? 8 : 1,
            scale: isDesktop ? 1.06 : 1.005,
            ease: 'none',
            duration: 0.4,
          }, 0.25)

          scrollTl.to('.hero-text-block', {
            y: isDesktop ? -35 : -14,
            opacity: 0.85,
            ease: 'none',
            duration: 0.4,
          }, 0.25)

          // Phase 3 (60–90%): Disassemble — fragments scatter outward, text ascends and fades
          scrollTl.to('.frag-scatter-left', {
            x: isDesktop ? -120 : -10,
            y: isDesktop ? -60 : -6,
            opacity: isDesktop ? 0.2 : 0.35,
            scale: isDesktop ? 0.9 : 0.98,
            ease: 'power2.in',
            duration: 0.45,
          }, 0.55)

          scrollTl.to('.frag-scatter-right', {
            x: isDesktop ? 140 : 10,
            y: isDesktop ? 80 : 6,
            opacity: isDesktop ? 0.2 : 0.35,
            scale: isDesktop ? 1.12 : 1.01,
            ease: 'power2.in',
            duration: 0.45,
          }, 0.55)

          scrollTl.to('.frag-scatter-up', {
            y: isDesktop ? -110 : -8,
            opacity: 0.15,
            ease: 'power2.in',
            duration: 0.45,
          }, 0.55)

          scrollTl.to('.hero-text-block', {
            y: isDesktop ? -80 : -35,
            opacity: 0.15,
            filter: 'blur(3px)',
            ease: 'none',
            duration: 0.4,
          }, 0.6)

          // Phase 4 (90–100%): Clean transition into next section
          scrollTl.to('.hero-content-layer', {
            opacity: 0,
            y: isDesktop ? -100 : -30,
            ease: 'power2.in',
            duration: 0.25,
          }, 0.85)

          scrollTl.to('.fragment-svg', {
            opacity: 0.1,
            scale: isDesktop ? 1.05 : 1.01,
            ease: 'power2.in',
            duration: 0.25,
          }, 0.85)
        }
      }, heroRef)
    }

    if (window.gsap && window.ScrollTrigger) {
      initHeroAnimation()
    } else {
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js')
        .then(() => loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js'))
        .then(() => initHeroAnimation())
        .catch(() => {
          // Graceful fallback for offline environments
          const el = heroRef.current?.querySelectorAll('.hero-content-layer, .fragment-plate, .fragment-micro')
          el?.forEach((item) => {
            item.style.opacity = '1'
          })
        })
    }

    return () => {
      if (gsapContext) {
        gsapContext.revert()
      }
    }
  }, [reducedMotion])

  return (
    <div
      ref={heroRef}
      className="relative w-full min-h-[100svh]"
    >
      <section
        ref={heroInnerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="hero-inner relative w-full min-h-[100svh] overflow-hidden bg-[#000000] text-white flex flex-col justify-between select-none"
        style={bleedStyle}
      >
        {/* ================= LAYER 0: BLACK SPACE & SUBTLE GOLD AMBIENCE ================= */}
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-20"
          style={{
            backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(212, 175, 55, 0.2) 1px, transparent 0)
          `,
            backgroundSize: '64px 64px',
            transform: reducedMotion ? 'none' : `translate(${mousePos.x * -2}px, ${mousePos.y * -2}px)`,
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

        {/* Atmospheric Brushed Gold Soft Radial Glow */}
        <div
          className="absolute top-1/2 right-[10%] lg:right-[18%] -translate-y-1/2 w-[300px] sm:w-[480px] lg:w-[620px] h-[300px] sm:h-[480px] lg:h-[620px] rounded-full pointer-events-none z-0 blur-[150px] opacity-15 transition-transform duration-700 ease-out"
          style={{
            background: 'radial-gradient(circle, rgba(240,199,94,0.3) 0%, rgba(212,175,55,0.08) 50%, transparent 75%)',
            transform: reducedMotion
              ? 'translateY(-50%)'
              : `translate(${mousePos.x * 12}px, calc(-50% + ${mousePos.y * 12}px))`,
          }}
        />

        {/* Technical atmospheric corner tick marks */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-25 hidden md:block">
          <span className="absolute top-10 left-10 text-[#D4AF37] font-mono text-[10px]">┼</span>
          <span className="absolute top-10 right-10 text-[#D4AF37] font-mono text-[10px]">┼</span>
          <span className="absolute bottom-12 left-10 text-[#D4AF37] font-mono text-[10px]">┼</span>
          <span className="absolute bottom-12 right-10 text-[#D4AF37] font-mono text-[10px]">┼</span>
          <span className="absolute top-1/2 left-8 -translate-y-1/2 text-[#A3A3A3]/60 font-mono text-[8px] tracking-[0.25em] uppercase">
            SEC // 00_FRAGMENTS
          </span>
        </div>

        {/* ================= LAYER 1: SUSPENDED GOLDEN FRAGMENTS (CINEMATIC SCULPTURE) ================= */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-[1] flex items-center justify-center">
          <svg
            viewBox="0 0 1600 1000"
            preserveAspectRatio="xMidYMid slice"
            className="fragment-svg h-full w-auto min-w-full max-w-none shrink-0 lg:w-full lg:h-full select-none overflow-visible"
          >
            <defs>
              {/* 1. Brushed Gold Metallic Gradient A */}
              <linearGradient id="goldBrushedA" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4A3305" />
                <stop offset="20%" stopColor="#B8860B" />
                <stop offset="48%" stopColor="#F0C75E" />
                <stop offset="55%" stopColor="#FFD978" />
                <stop offset="78%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#3B2803" />
              </linearGradient>

              {/* 2. Brushed Gold Metallic Gradient B (Inverse Angle) */}
              <linearGradient id="goldBrushedB" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#5E4208" />
                <stop offset="30%" stopColor="#F0C75E" />
                <stop offset="60%" stopColor="#D4AF37" />
                <stop offset="85%" stopColor="#B8860B" />
                <stop offset="100%" stopColor="#2E1F03" />
              </linearGradient>

              {/* 3. Deep Bevel Shadow Metallic */}
              <linearGradient id="goldPlateDark" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#1E1402" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#B8860B" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#0F0A01" stopOpacity="0.9" />
              </linearGradient>

              {/* 4. Hairline Golden Stroke Gradient */}
              <linearGradient id="goldStrokeLinear" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#B8860B" stopOpacity="0.2" />
                <stop offset="35%" stopColor="#FFD978" stopOpacity="0.9" />
                <stop offset="70%" stopColor="#D4AF37" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#5E4208" stopOpacity="0.15" />
              </linearGradient>

              {/* Subtle Metallic Drop Shadow Filter */}
              <filter id="goldMetallicShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="6" stdDeviation="12" floodColor="#D4AF37" floodOpacity="0.18" />
              </filter>
            </defs>

            {/* ================= DEPTH LAYER 1: BACKGROUND SUBTLE GEOMETRY ================= */}
            <g
              className="layer-bg-geometry"
              style={{
                opacity: tier === 'desktop' ? 1 : 0.25,
                transform: reducedMotion
                  ? 'none'
                  : `translate(${mousePos.x * 2}px, ${mousePos.y * 2}px)`,
                transition: 'transform 0.4s ease-out, opacity 0.4s ease-out',
              }}
            >
              {/* Large faint background geometric frames */}
              <polygon
                points="940,120 1380,80 1280,480 880,420"
                fill="url(#goldPlateDark)"
                stroke="#D4AF37"
                strokeWidth="0.8"
                strokeOpacity="0.15"
                className="fragment-plate frag-scatter-up"
              />
              <polygon
                points="380,520 720,440 680,820 320,780"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="0.8"
                strokeOpacity="0.12"
                strokeDasharray="6 12"
                className="fragment-outline frag-scatter-left"
              />

              {/* Concentric thin orbital rings */}
              <circle
                cx="1100"
                cy="480"
                r="260"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="0.7"
                strokeOpacity="0.15"
                strokeDasharray="4 14"
                className="fragment-outline"
              />
              <circle
                cx="1100"
                cy="480"
                r="420"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="0.6"
                strokeOpacity="0.08"
                strokeDasharray="2 18"
              />
            </g>

            {/* ================= DEPTH LAYER 2: MIDGROUND SUSPENDED GOLD PLATES ================= */}
            <g
              className="layer-mid-fragments"
              style={{
                transform: reducedMotion
                  ? 'none'
                  : `translate(${mousePos.x * 5}px, ${mousePos.y * 5}px)`,
                transition: 'transform 0.4s ease-out',
              }}
            >
              {/* FRAGMENT 1: Upper-Right Major Chiseled Golden Plate */}
              <g transform={getFragTransform('frag1', tier)} style={{ transition: reducedMotion ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                <g className="fragment-plate frag-midground frag-converge-a frag-scatter-right" filter="url(#goldMetallicShadow)">
                  <polygon
                    points="1180,80 1480,140 1390,360 1120,290"
                    fill="url(#goldBrushedA)"
                    stroke="#FFD978"
                    strokeWidth="1.2"
                    strokeOpacity="0.8"
                  />
                  {/* Internal machined bevel line */}
                  <line x1="1200" y1="120" x2="1360" y2="330" stroke="#FFD978" strokeWidth="0.8" strokeOpacity="0.6" />
                  <text x="1220" y="240" fill="#FFD978" fontSize="8" fontFamily="monospace" letterSpacing="2" opacity="0.75">
                    PLATE // 01_A
                  </text>
                </g>
              </g>

              {/* FRAGMENT 2: Upper-Left Architectural Golden Prism Beam */}
              <g transform={getFragTransform('frag2', tier)} style={{ transition: reducedMotion ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                <g className="fragment-plate frag-midground frag-scatter-left" filter="url(#goldMetallicShadow)">
                  <polygon
                    points="180,90 380,40 340,160 140,210"
                    fill="url(#goldBrushedB)"
                    stroke="#D4AF37"
                    strokeWidth="1"
                    strokeOpacity="0.7"
                  />
                  <line x1="160" y1="150" x2="360" y2="100" stroke="#FFD978" strokeWidth="0.8" strokeOpacity="0.5" />
                </g>
              </g>

              {/* FRAGMENT 3: Center-Right Monolithic Angular Plate */}
              <g transform={getFragTransform('frag3', tier)} style={{ transition: reducedMotion ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                <g className="fragment-plate frag-midground frag-converge-b frag-scatter-right" filter="url(#goldMetallicShadow)">
                  <polygon
                    points="1020,380 1260,330 1320,580 1080,630"
                    fill="url(#goldBrushedB)"
                    stroke="#FFD978"
                    strokeWidth="1.4"
                    strokeOpacity="0.85"
                  />
                  {/* Surface architectural cut */}
                  <polygon
                    points="1060,420 1220,380 1260,540 1100,580"
                    fill="#0A0A0A"
                    fillOpacity="0.5"
                    stroke="#D4AF37"
                    strokeWidth="0.8"
                    strokeOpacity="0.4"
                  />
                  <text x="1100" y="490" fill="#F0C75E" fontSize="9" fontFamily="monospace" letterSpacing="3" opacity="0.9">
                    CORE // 02
                  </text>
                </g>
              </g>

              {/* FRAGMENT 4: Lower-Right Architectural Wedge Plate */}
              <g transform={getFragTransform('frag4', tier)} style={{ transition: reducedMotion ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                <g className="fragment-plate frag-midground frag-scatter-right" filter="url(#goldMetallicShadow)">
                  <polygon
                    points="1140,680 1440,610 1490,790 1210,870"
                    fill="url(#goldBrushedA)"
                    stroke="#D4AF37"
                    strokeWidth="1.2"
                    strokeOpacity="0.75"
                  />
                  <line x1="1170" y1="720" x2="1420" y2="660" stroke="#FFD978" strokeWidth="0.8" strokeOpacity="0.6" />
                </g>
              </g>

              {/* FRAGMENT 5: Lower-Left Geometric Plate */}
              <g transform={getFragTransform('frag5', tier)} style={{ transition: reducedMotion ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                <g className="fragment-plate frag-midground frag-scatter-left" filter="url(#goldMetallicShadow)">
                  <polygon
                    points="220,720 460,660 410,840 180,890"
                    fill="url(#goldBrushedB)"
                    stroke="#D4AF37"
                    strokeWidth="1"
                    strokeOpacity="0.6"
                  />
                </g>
              </g>
            </g>

            {/* ================= DEPTH LAYER 3: FOREGROUND SUSPENDED FRAGMENTS & ACCENTS ================= */}
            <g
              className="layer-fg-fragments"
              style={{
                transform: reducedMotion
                  ? 'none'
                  : `translate(${mousePos.x * 8.5}px, ${mousePos.y * 8.5}px)`,
                transition: 'transform 0.4s ease-out',
              }}
            >
              {/* FRAGMENT 6: Precision Golden Ring Arc with Radial Calibration */}
              <g transform={getFragTransform('frag6', tier)} style={{ transition: reducedMotion ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                <g className="fragment-outline frag-foreground frag-converge-a" filter="url(#goldMetallicShadow)">
                  <path
                    d="M 980 210 A 180 180 0 0 1 1220 340"
                    fill="none"
                    stroke="url(#goldStrokeLinear)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 995 230 A 155 155 0 0 1 1200 345"
                    fill="none"
                    stroke="#FFD978"
                    strokeWidth="1"
                    strokeDasharray="4 8"
                    strokeOpacity="0.65"
                  />
                  {/* Radial calibration ticks */}
                  {Array.from({ length: 7 }).map((_, i) => {
                    const angle = 0.2 + i * 0.16
                    const r = 180
                    const x1 = 1040 + Math.cos(angle) * r
                    const y1 = 280 + Math.sin(angle) * r
                    const x2 = 1040 + Math.cos(angle) * (r + 10)
                    const y2 = 280 + Math.sin(angle) * (r + 10)
                    return (
                      <line
                        key={`ring-tick-${i}`}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#FFD978"
                        strokeWidth="1"
                        strokeOpacity="0.75"
                      />
                    )
                  })}
                </g>
              </g>

              {/* FRAGMENT 7: Angular Golden Shard pointing inward toward text */}
              <g transform={getFragTransform('frag7', tier)} style={{ transition: reducedMotion ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                <g className="fragment-plate frag-foreground frag-converge-b frag-scatter-right" filter="url(#goldMetallicShadow)">
                  <polygon
                    points="840,320 960,280 920,380 810,410"
                    fill="url(#goldBrushedA)"
                    stroke="#FFD978"
                    strokeWidth="1.5"
                    strokeOpacity="0.9"
                  />
                </g>
              </g>

              {/* FRAGMENT 8: Floating Golden Rectangular Block (Top Center-Right) */}
              <g transform={getFragTransform('frag8', tier)} style={{ transition: reducedMotion ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                <g className="fragment-plate frag-foreground frag-scatter-up" filter="url(#goldMetallicShadow)">
                  <polygon
                    points="760,110 880,85 860,165 740,190"
                    fill="url(#goldBrushedB)"
                    stroke="#D4AF37"
                    strokeWidth="1.2"
                    strokeOpacity="0.8"
                  />
                  <text x="765" y="150" fill="#FFD978" fontSize="8" fontFamily="monospace" letterSpacing="2">
                    SYS // 01
                  </text>
                </g>
              </g>

              {/* FRAGMENT 9: Lower Center-Right Sharp Shard */}
              <g transform={getFragTransform('frag9', tier)} style={{ transition: reducedMotion ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                <g className="fragment-plate frag-foreground frag-scatter-right" filter="url(#goldMetallicShadow)">
                  <polygon
                    points="890,640 1020,590 980,720 860,760"
                    fill="url(#goldBrushedA)"
                    stroke="#FFD978"
                    strokeWidth="1.2"
                    strokeOpacity="0.85"
                  />
                </g>
              </g>

              {/* FRAGMENT 10: Lower Angular Ring Arc */}
              <g transform={getFragTransform('frag10', tier)} style={{ transition: reducedMotion ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                <path
                  className="fragment-outline frag-foreground"
                  d="M 1080 720 A 140 140 0 0 1 1260 840"
                  fill="none"
                  stroke="url(#goldStrokeLinear)"
                  strokeWidth="2"
                  strokeDasharray="12 6"
                  strokeOpacity="0.8"
                />
              </g>

              {/* Atmospheric Gold Micro Particles & Stardust */}
              <g className="fragment-micro">
                <circle cx="780" cy="260" r="2" fill="#FFD978" filter="url(#goldMetallicShadow)" />
                <circle cx="920" cy="180" r="2.5" fill="#F0C75E" />
                <circle cx="1060" cy="310" r="1.5" fill="#FFD978" />
                <circle cx="820" cy="540" r="2" fill="#D4AF37" />
                <circle cx="980" cy="620" r="2.5" fill="#FFD978" filter="url(#goldMetallicShadow)" />
                <circle cx="740" cy="710" r="1.5" fill="#F0C75E" />
                <circle cx="1240" cy="460" r="2" fill="#FFD978" />
                <circle cx="680" cy="380" r="1.5" fill="#D4AF37" />
                <circle cx="480" cy="220" r="2" fill="#F0C75E" />

                {/* Coordinate markings */}
                <text x="830" y="555" fill="#D4AF37" fontSize="7" fontFamily="monospace" letterSpacing="1.5" opacity="0.65">
                  [X: 083 // Y: 055]
                </text>
                <text x="1255" y="475" fill="#D4AF37" fontSize="7" fontFamily="monospace" letterSpacing="1.5" opacity="0.65">
                  NODE_07
                </text>
              </g>
            </g>
          </svg>
        </div>

        {/* ================= LAYER 2: DARK GRADIENT OVERLAY (CONTRAST & READABILITY) ================= */}
        {/* 
        Ensures 100% razor-sharp readability for the typography.
        Mobile: dark wash that keeps central text legible over the golden fragments.
        Desktop: directional feathering from the left to let the golden fragments shine on the right.
      */}
        <div className="absolute inset-0 pointer-events-none z-[2] bg-gradient-to-b from-black/80 via-black/40 to-black/85 lg:bg-gradient-to-r lg:from-black/95 lg:via-black/75 lg:via-45% lg:to-transparent" />

        {/* ================= LAYER 3: EDITORIAL HERO CONTENT ================= */}
        <div className="hero-content-layer relative z-10 w-full min-h-[100svh] flex flex-col justify-between px-5 sm:px-8 md:px-12 lg:px-16 xl:px-24 py-6 sm:py-8 lg:py-10">

          {/* TOP HUD BAR */}
          <header className="hero-header-bar w-full flex items-center justify-between font-mono text-xs tracking-widest text-[#A3A3A3] pb-4 border-b border-neutral-900/80">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F0C75E] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
              </span>
              <span className="text-[#F5F5F5] font-semibold tracking-[0.24em] text-[11px] sm:text-xs uppercase">
                IEEE COMPUTER SOCIETY
              </span>
            </div>

            <div className="flex items-center gap-4 text-[11px] sm:text-xs tracking-[0.2em] font-mono">
              <span className="hidden sm:inline-block text-[#737373] text-[10px]">
                01 // CORE2CODE
              </span>
              <span className="text-[#F0C75E] font-bold">
                EST. 2026
              </span>
            </div>
          </header>

          {/* MAIN EDITORIAL HERO BODY (40-50% width on desktop, centered left) */}
          <div className="hero-text-block flex-1 flex flex-col justify-center text-left my-auto w-full py-8 sm:py-12 lg:py-6 max-w-2xl xl:max-w-3xl">

            {/* Eyebrow Pill */}
            <div className="hero-eyebrow-pill inline-flex items-center gap-2.5 w-fit px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[10px] sm:text-[11px] font-mono tracking-[0.22em] text-[#F0C75E] uppercase mb-4 sm:mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_6px_#D4AF37]" />
              <span>IEEE COMPUTER SOCIETY</span>
            </div>

            {/* Editorial Main Heading: CORE [gold 2] CODE */}
            <div className="hero-headline select-none">
              <h1 className="flex items-baseline gap-2.5 sm:gap-4 lg:gap-5 flex-wrap">
                <span className="hero-headline-word block text-[13vw] sm:text-[10vw] md:text-7xl lg:text-[5.2rem] xl:text-[6.4rem] font-black uppercase tracking-tight leading-[0.9] text-[#FFFFFF]">
                  CORE
                </span>
                <span className="hero-headline-word block text-[13vw] sm:text-[10vw] md:text-7xl lg:text-[5.2rem] xl:text-[6.4rem] font-black uppercase tracking-tight leading-[0.9] bg-gradient-to-br from-[#FFD978] via-[#F0C75E] to-[#B8860B] bg-clip-text text-transparent filter drop-shadow-[0_0_30px_rgba(212,175,55,0.45)]">
                  2
                </span>
                <span className="hero-headline-word block text-[13vw] sm:text-[10vw] md:text-7xl lg:text-[5.2rem] xl:text-[6.4rem] font-black uppercase tracking-tight leading-[0.9] text-[#FFFFFF]">
                  CODE
                </span>
              </h1>
            </div>

            {/* Tagline & Description */}
            <div className="space-y-3 pt-3 sm:pt-4 max-w-lg">
              {/* Tagline */}
              <div className="hero-tagline-wrap flex items-center gap-2.5">
                <span className="font-mono text-base text-[#D4AF37] font-semibold">//</span>
                <p className="text-lg sm:text-xl md:text-2xl font-light text-[#E5E5E5] tracking-wide">
                  From Core to Code.
                </p>
              </div>

              {/* Description */}
              <div className="hero-description-wrap">
                <p className="text-[#A3A3A3] text-sm sm:text-base leading-relaxed font-normal">
                  Where ideas, logic and technology come together to build what comes next.
                </p>
              </div>
            </div>

            {/* Buttons: Brushed Gold & Premium Dark Glass */}
            <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4.5">
              {/* Primary: EXPLORE EVENT */}
              <button
                type="button"
                onClick={() => {
                  const target = document.getElementById('events') || document.querySelector('section:nth-of-type(2)')
                  target?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="hero-btn group relative px-7 sm:px-8 py-3.5 rounded-sm font-bold text-xs sm:text-sm tracking-[0.18em] uppercase overflow-hidden cursor-pointer transition-all duration-300 transform active:scale-95 bg-gradient-to-r from-[#D4AF37] via-[#F0C75E] to-[#C9A227] text-[#000000] shadow-[0_0_22px_rgba(212,175,55,0.28)] hover:shadow-[0_0_34px_rgba(240,199,94,0.55)] hover:-translate-y-0.5"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                <span className="relative flex items-center justify-center gap-2.5">
                  <span>EXPLORE EVENT</span>
                  <span className="transform group-hover:translate-x-1.5 transition-transform duration-300 font-bold">
                    →
                  </span>
                </span>
              </button>

              {/* Secondary: REGISTER NOW */}
              <button
                type="button"
                className="hero-btn group relative px-7 sm:px-8 py-3.5 rounded-sm font-bold text-xs sm:text-sm tracking-[0.18em] uppercase overflow-hidden cursor-pointer transition-all duration-300 border border-[#D4AF37]/50 hover:border-[#F0C75E] bg-black/60 hover:bg-[#D4AF37]/10 text-[#F5F5F5] hover:text-[#FFD978] backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.8)] hover:shadow-[0_0_24px_rgba(212,175,55,0.22)] hover:-translate-y-0.5 active:scale-95"
              >
                <span className="relative flex items-center justify-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] group-hover:bg-[#FFD978] transition-colors shadow-[0_0_6px_#D4AF37]" />
                  <span>REGISTER NOW</span>
                </span>
              </button>
            </div>

          </div>

          {/* BOTTOM SCROLL INDICATOR */}
          <footer className="w-full flex items-center justify-between text-[11px] font-mono tracking-widest text-[#737373] pt-4 pb-1 border-t border-neutral-900/70">
            <div className="hidden sm:flex items-center gap-2 text-[#A3A3A3]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/80 shadow-[0_0_6px_#D4AF37]" />
              <span>METALLIC FRAGMENT COMPOSITION</span>
            </div>

            <div
              onClick={() => {
                window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' })
              }}
              className="hero-scroll-indicator mx-auto sm:mx-0 flex flex-col sm:flex-row items-center gap-2 text-[#D4AF37]/80 hover:text-[#FFD978] transition-colors cursor-pointer group"
            >
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase">
                SCROLL TO EXPLORE
              </span>
              <svg
                className="w-3.5 h-3.5 text-[#D4AF37] animate-bounce"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>

            <div className="hidden sm:block text-right text-[#737373]">
              <span>CORE2CODE // IEEE CS &copy; 2026</span>
            </div>
          </footer>

        </div>
      </section>
    </div>
  )
}