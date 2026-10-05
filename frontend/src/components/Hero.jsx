import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '../utils/Button'

gsap.registerPlugin(ScrollTrigger)

// ---------- C2C wheel helpers ----------
const polar = (r, deg) => [
  r * Math.cos((deg * Math.PI) / 180),
  r * Math.sin((deg * Math.PI) / 180)
]

const arc = (r, a0, a1) => {
  const [x0, y0] = polar(r, a0)
  const [x1, y1] = polar(r, a1)

  return `M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${Math.abs(a1 - a0) > 180 ? 1 : 0
    } 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`
}

// 60 calibration ticks
const WHEEL_TICKS = Array.from({ length: 60 }, (_, i) => {
  const major = i % 5 === 0
  const [x1, y1] = polar(major ? 272 : 279, i * 6)
  const [x2, y2] = polar(288, i * 6)

  return {
    x1,
    y1,
    x2,
    y2,
    major
  }
})

// ---------- Wheel Rings ----------
function WheelRings({ suffix }) {
  return (
    <>
      {/* Outer ring */}
      <g className={`c2c-ring-outer${suffix}`}>
        <circle
          r="288"
          stroke="#D4AF37"
          strokeOpacity="0.35"
          strokeWidth="1"
        />

        {WHEEL_TICKS.map((t, i) => (
          <line
            key={i}
            x1={t.x1}
            y1={t.y1}
            x2={t.x2}
            y2={t.y2}
            stroke="#D4AF37"
            strokeWidth={t.major ? 1.4 : 0.8}
            strokeOpacity={t.major ? 0.7 : 0.35}
          />
        ))}

        <path
          d={arc(288, -60, -20)}
          stroke="#FFD978"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </g>

      {/* Middle ring */}
      <g className={`c2c-ring-mid${suffix}`}>
        <circle
          r="250"
          stroke="#D4AF37"
          strokeOpacity="0.25"
          strokeWidth="0.9"
          strokeDasharray="2 10"
        />

        <path
          d={arc(250, 15, 75)}
          stroke="#F0C75E"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeOpacity="0.95"
        />

        <path
          d={arc(250, 140, 165)}
          stroke="#D4AF37"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeOpacity="0.8"
        />

        <path
          d={arc(250, 230, 292)}
          stroke="#F0C75E"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeOpacity="0.95"
        />
      </g>

      {/* Inner ring */}
      <g className={`c2c-ring-inner${suffix}`}>
        <circle
          r="215"
          stroke="#D4AF37"
          strokeOpacity="0.3"
          strokeWidth="0.9"
        />

        <path
          d={arc(215, 200, 300)}
          stroke="#FFD978"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        <circle
          cx={polar(215, 300)[0]}
          cy={polar(215, 300)[1]}
          r="4.5"
          fill="#FFD978"
        />
      </g>
    </>
  )
}

// ---------- Responsive fragment configuration ----------
const FRAG_CONFIG = {
  frag1: {
    cx: 1300,
    cy: 220,
    tablet: { dx: 0, dy: -10, scale: 1.2 },
    largeMobile: { dx: 10, dy: -5, scale: 1.15 },
    smallMobile: { dx: 15, dy: -10, scale: 1.15 }
  },

  frag2: {
    cx: 260,
    cy: 125,
    tablet: { dx: 0, dy: -10, scale: 1.2 },
    largeMobile: { dx: -10, dy: -5, scale: 1.15 },
    smallMobile: { dx: -15, dy: -10, scale: 1.15 }
  },

  frag3: {
    cx: 1170,
    cy: 480,
    tablet: { dx: 40, dy: 580, scale: 1.2 },
    largeMobile: { dx: 80, dy: 760, scale: 1.15 },
    smallMobile: { dx: 140, dy: 900, scale: 1.15 }
  },

  frag4: {
    cx: 1320,
    cy: 740,
    tablet: { dx: 0, dy: 350, scale: 1.2 },
    largeMobile: { dx: 10, dy: 350, scale: 1.15 },
    smallMobile: { dx: 15, dy: 480, scale: 1.15 }
  },

  frag5: {
    cx: 320,
    cy: 780,
    tablet: { dx: 0, dy: 10, scale: 1.2 },
    largeMobile: { dx: -10, dy: 10, scale: 1.15 },
    smallMobile: { dx: -15, dy: 0, scale: 1.15 }
  },

  frag6: {
    cx: 1100,
    cy: 280,
    tablet: { dx: 0, dy: -10, scale: 0.88 },
    largeMobile: { dx: 280, dy: -5, scale: 0.84 },
    smallMobile: { dx: 340, dy: 0, scale: 0.82 }
  },

  frag7: {
    cx: 880,
    cy: 350,
    tablet: { dx: 240, dy: -30, scale: 1.15 },
    largeMobile: { dx: -730, dy: 1220, scale: 1.15 },
    smallMobile: { dx: -650, dy: 1200, scale: 1.15 }
  },

  frag8: {
    cx: 810,
    cy: 140,
    tablet: { dx: 0, dy: -20, scale: 1.2 },
    largeMobile: { dx: 0, dy: -25, scale: 1.15 },
    smallMobile: { dx: 0, dy: -20, scale: 1.15 }
  },

  frag9: {
    cx: 940,
    cy: 680,
    tablet: { dx: 0, dy: 70, scale: 1.15 },
    largeMobile: { dx: 0, dy: 60, scale: 1.15 },
    smallMobile: { dx: 0, dy: 250, scale: 1.15 }
  },

  frag10: {
    cx: 1170,
    cy: 780,
    tablet: { dx: -220, dy: 10, scale: 0.88 },
    largeMobile: { dx: 10, dy: 10, scale: 0.84 },
    smallMobile: { dx: 15, dy: 0, scale: 0.82 }
  }
}

function getFragTransform(key, tier, vbHeight) {
  if (tier === 'desktop' || !FRAG_CONFIG[key]) return undefined

  const conf = FRAG_CONFIG[key]
  const p = conf[tier]

  if (!p) return undefined

  const {
    dx = 0,
    dy = 0,
    scale = 1,
    rotate = 0
  } = p

  const scaleY =
    vbHeight && tier !== 'desktop'
      ? vbHeight / 1000
      : 1

  const targetX = conf.cx + dx
  const targetY = conf.cy * scaleY + dy

  const rotStr =
    rotate !== 0
      ? ` rotate(${rotate})`
      : ''

  const scaleStr =
    scale !== 1
      ? ` scale(${scale})`
      : ''

  return `translate(${targetX}, ${targetY})${rotStr}${scaleStr} translate(-${conf.cx}, -${conf.cy})`
}

export default function Hero() {
  const heroRef = useRef(null)
  const heroInnerRef = useRef(null)

  const [bleedStyle, setBleedStyle] = useState({})
  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0
  })

  const [targetMouse, setTargetMouse] = useState({
    x: 0,
    y: 0
  })

  const [reducedMotion, setReducedMotion] = useState(false)

  const [windowDimensions, setWindowDimensions] =
    useState({
      width:
        typeof window !== 'undefined'
          ? window.innerWidth
          : 1440,

      height:
        typeof window !== 'undefined'
          ? window.innerHeight
          : 900
    })

  // ---------- Resize ----------
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    handleResize()

    window.addEventListener(
      'resize',
      handleResize
    )

    return () => {
      window.removeEventListener(
        'resize',
        handleResize
      )
    }
  }, [])

  const {
    width: windowWidth,
    height: windowHeight
  } = windowDimensions

  const isPortraitTablet =
    windowWidth <= 1024 &&
    windowHeight > windowWidth

  const tier =
    windowWidth < 480
      ? 'smallMobile'
      : windowWidth < 768
        ? 'largeMobile'
        : windowWidth < 1024 ||
          isPortraitTablet
          ? 'tablet'
          : 'desktop'

  const isSmall =
    tier === 'smallMobile' ||
    tier === 'largeMobile'

  const vbWidth = 1600

  const vbHeight =
    tier === 'desktop'
      ? 1000
      : Math.round(
        1600 *
        ((windowHeight || 900) /
          (document.documentElement
            .clientWidth ||
            windowWidth ||
            1600))
      )

  // ---------- Reduced motion ----------
  useEffect(() => {
    const mq = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    )

    setReducedMotion(mq.matches)

    const handler = (e) => {
      setReducedMotion(e.matches)
    }

    mq.addEventListener(
      'change',
      handler
    )

    return () => {
      mq.removeEventListener(
        'change',
        handler
      )
    }
  }, [])

  // ---------- Full viewport bleed ----------
  useEffect(() => {
    const updateBleed = () => {
      const docW =
        document.documentElement.clientWidth

      const parentW =
        heroRef.current?.parentElement
          ?.clientWidth || docW

      if (docW > parentW) {
        const diff =
          (docW - parentW) / 2

        setBleedStyle({
          width: `${docW}px`,
          marginLeft: `-${diff}px`,
          marginRight: `-${diff}px`
        })
      } else {
        setBleedStyle({
          width: '100%'
        })
      }
    }

    updateBleed()

    window.addEventListener(
      'resize',
      updateBleed
    )

    return () => {
      window.removeEventListener(
        'resize',
        updateBleed
      )
    }
  }, [])

  // ---------- Mouse parallax ----------
  useEffect(() => {
    if (reducedMotion) return

    const isMobile =
      window.matchMedia(
        '(max-width: 1023px)'
      ).matches

    if (isMobile) return

    let animId

    const lerp = (a, b, t) =>
      a + (b - a) * t

    const tick = () => {
      setMousePos((prev) => ({
        x: lerp(
          prev.x,
          targetMouse.x,
          0.05
        ),

        y: lerp(
          prev.y,
          targetMouse.y,
          0.05
        )
      }))

      animId =
        requestAnimationFrame(tick)
    }

    animId =
      requestAnimationFrame(tick)

    return () =>
      cancelAnimationFrame(animId)
  }, [targetMouse, reducedMotion])

  const handleMouseMove = (e) => {
    if (
      reducedMotion ||
      window.innerWidth < 1024 ||
      !heroRef.current
    ) {
      return
    }

    const rect =
      heroRef.current.getBoundingClientRect()

    const x =
      ((e.clientX - rect.left) /
        rect.width -
        0.5) *
      2

    const y =
      ((e.clientY - rect.top) /
        rect.height -
        0.5) *
      2

    setTargetMouse({
      x,
      y
    })
  }

  const handleMouseLeave = () => {
    setTargetMouse({
      x: 0,
      y: 0
    })
  }

  // ==========================================================
  // GSAP + SCROLLTRIGGER
  // ==========================================================

  useLayoutEffect(() => {
    if (
      !heroRef.current ||
      !heroInnerRef.current
    ) {
      return
    }

    const ctx = gsap.context(() => {
      gsap.set(
        '.hero-content-layer',
        {
          opacity: 1
        }
      )

      gsap.set(
        '.fragment-svg',
        {
          opacity: 1
        }
      )

      if (reducedMotion) {
        gsap.set(
          [
            '.fragment-micro',
            '.fragment-plate',
            '.fragment-outline',
            '.hero-header-bar',
            '.hero-eyebrow-pill',
            '.hero-headline-word',
            '.hero-tagline-wrap',
            '.hero-description-wrap',
            '.hero-btn',
            '.hero-scroll-indicator'
          ],
          {
            opacity: 1,
            clearProps: 'all'
          }
        )

        return
      }

      // ========================================================
      // ENTRANCE
      // ========================================================

      const tl = gsap.timeline({
        defaults: {
          ease: 'power3.out'
        }
      })

      tl
        .fromTo(
          '.fragment-micro',
          {
            opacity: 0,
            scale: 0.8
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            stagger: 0.05
          },
          0.1
        )

        .fromTo(
          '.fragment-plate',
          {
            opacity: 0,
            scale: 0.88,
            rotateZ: 4
          },
          {
            opacity: 1,
            scale: 1,
            rotateZ: 0,
            duration: 1.8,
            stagger: 0.08,
            ease: 'expo.out'
          },
          0.3
        )

        .fromTo(
          '.fragment-outline',
          {
            strokeDashoffset: 600,
            opacity: 0
          },
          {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 1.6,
            stagger: 0.1,
            ease: 'power2.inOut'
          },
          0.5
        )

        .fromTo(
          '.hero-header-bar',
          {
            opacity: 0,
            y: -16
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8
          },
          0.7
        )

        .fromTo(
          '.hero-eyebrow-pill',
          {
            opacity: 0,
            x: -20
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.7
          },
          0.85
        )

        .fromTo(
          '.hero-headline-word',
          {
            opacity: 0,
            y: 40,
            skewY: 1.5
          },
          {
            opacity: 1,
            y: 0,
            skewY: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'expo.out'
          },
          1
        )

        .fromTo(
          '.hero-tagline-wrap',
          {
            opacity: 0,
            y: 18
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7
          },
          1.3
        )

        .fromTo(
          '.hero-description-wrap',
          {
            opacity: 0,
            y: 15
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7
          },
          1.4
        )

        .fromTo(
          '.hero-btn',
          {
            opacity: 0,
            y: 20
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12
          },
          1.55
        )

        .fromTo(
          '.hero-scroll-indicator',
          {
            opacity: 0
          },
          {
            opacity: 1,
            duration: 0.8
          },
          1.75
        )

      // ========================================================
      // SCROLL
      // ========================================================

      const isDesktop =
        window.innerWidth >= 1024 &&
        window.innerWidth >=
        window.innerHeight

      const scrollTl =
        gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: isDesktop
              ? '+=225%'
              : '+=145%',
            pin: heroInnerRef.current,
            pinSpacing: true,
            scrub: 0.9,
            anticipatePin: 1,
            invalidateOnRefresh: true
          }
        })

      // Phase 1

      scrollTl.to(
        '.hero-scroll-indicator',
        {
          opacity: 0,
          y: 15,
          ease: 'none',
          duration: 0.2
        },
        0
      )

      scrollTl.to(
        '.frag-converge-a',
        {
          x: isDesktop ? -40 : -4,
          y: isDesktop ? 30 : 3,
          rotateZ: isDesktop ? -4 : 0,
          ease: 'none',
          duration: 0.35
        },
        0.05
      )

      scrollTl.to(
        '.frag-converge-b',
        {
          x: isDesktop ? 35 : 4,
          y: isDesktop ? -25 : -3,
          rotateZ: isDesktop ? 5 : 0,
          ease: 'none',
          duration: 0.35
        },
        0.05
      )

      // Phase 2

      scrollTl.to(
        '.frag-foreground',
        {
          scale: isDesktop
            ? 1.18
            : 1.01,

          filter:
            'drop-shadow(0 0 25px rgba(212,175,55,0.45))',

          ease: 'none',
          duration: 0.4
        },
        0.25
      )

      scrollTl.to(
        '.frag-midground',
        {
          rotateZ: isDesktop ? 8 : 1,
          scale: isDesktop
            ? 1.06
            : 1.005,

          ease: 'none',
          duration: 0.4
        },
        0.25
      )

      scrollTl.to(
        '.hero-text-block',
        {
          y: isDesktop
            ? -35
            : -14,

          opacity: 0.85,
          ease: 'none',
          duration: 0.4
        },
        0.25
      )

      // Phase 3

      scrollTl.to(
        '.frag-scatter-left',
        {
          x: isDesktop
            ? -120
            : -10,

          y: isDesktop
            ? -60
            : -6,

          opacity: isDesktop
            ? 0.2
            : 0.35,

          scale: isDesktop
            ? 0.9
            : 0.98,

          ease: 'power2.in',
          duration: 0.45
        },
        0.55
      )

      scrollTl.to(
        '.frag-scatter-right',
        {
          x: isDesktop
            ? 140
            : 10,

          y: isDesktop
            ? 80
            : 6,

          opacity: isDesktop
            ? 0.2
            : 0.35,

          scale: isDesktop
            ? 1.12
            : 1.01,

          ease: 'power2.in',
          duration: 0.45
        },
        0.55
      )

      scrollTl.to(
        '.frag-scatter-up',
        {
          y: isDesktop
            ? -110
            : -8,

          opacity: 0.15,

          ease: 'power2.in',
          duration: 0.45
        },
        0.55
      )

      scrollTl.to(
        '.hero-text-block',
        {
          y: isDesktop
            ? -80
            : -35,

          opacity: 0.15,
          filter: 'blur(3px)',

          ease: 'none',
          duration: 0.4
        },
        0.6
      )

      // Phase 4

      scrollTl.to(
        '.hero-content-layer',
        {
          opacity: 0,
          y: isDesktop
            ? -100
            : -30,

          ease: 'power2.in',
          duration: 0.25
        },
        0.85
      )

      scrollTl.to(
        '.fragment-svg',
        {
          opacity: 0.1,
          scale: isDesktop
            ? 1.05
            : 1.01,

          ease: 'power2.in',
          duration: 0.25
        },
        0.85
      )

      // ========================================================
      // C2C WORDMARK
      // ========================================================

      gsap.set(
        '.c2c-word',
        {
          opacity: 1
        }
      )

      const letters =
        gsap.utils.toArray(
          '.c2c-letter'
        )

      const sectors = [
        205,
        335,
        90
      ].sort(
        () =>
          Math.random() -
          0.5
      )

      const seeds =
        letters.map(
          (_, i) => ({
            a:
              ((sectors[i] +
                gsap.utils.random(
                  -30,
                  30
                )) *
                Math.PI) /
              180,

            d: gsap.utils.random(
              0.55,
              0.9
            ),

            r: gsap.utils.random(
              -35,
              35
            ),

            s: gsap.utils.random(
              0.7,
              1.5
            )
          })
        )

      letters.forEach(
        (el, i) => {
          const sd = seeds[i]

          const start =
            1.0 +
            i * 0.06

          scrollTl.fromTo(
            el,
            {
              x: () =>
                Math.cos(sd.a) *
                sd.d *
                window.innerWidth *
                0.75,

              y: () =>
                Math.sin(sd.a) *
                sd.d *
                window.innerHeight *
                0.75,

              rotation: sd.r,
              scale: sd.s
            },
            {
              x: 0,
              y: 0,
              rotation: 0,
              scale: 1,

              ease:
                'power3.out',

              duration: 0.38
            },
            start
          )

          scrollTl.fromTo(
            el,
            {
              opacity: 0
            },
            {
              opacity: 1,
              ease: 'none',
              duration: 0.18
            },
            start
          )
        }
      )

      // Main wheel

      scrollTl
        .fromTo(
          '.c2c-wheel',
          {
            opacity: 0,
            scale: 0.7
          },
          {
            opacity: 1,
            scale: 1,
            ease: 'power3.out',
            duration: 0.5
          },
          0.98
        )

        .fromTo(
          '.c2c-ring-outer',
          {
            rotation: 0
          },
          {
            rotation: 140,
            ease: 'none',
            duration: 0.78
          },
          0.98
        )

        .fromTo(
          '.c2c-ring-mid',
          {
            rotation: 0
          },
          {
            rotation: -200,
            ease: 'none',
            duration: 0.78
          },
          0.98
        )

        .fromTo(
          '.c2c-ring-inner',
          {
            rotation: 0
          },
          {
            rotation: 260,
            ease: 'none',
            duration: 0.78
          },
          0.98
        )

        .fromTo(
          '.c2c-glow',
          {
            opacity: 0,
            scale: 0.6
          },
          {
            opacity: 1,
            scale: 1.05,
            ease: 'power2.out',
            duration: 0.5
          },
          1.05
        )

        .fromTo(
          '.c2c-line',
          {
            scaleX: 0
          },
          {
            scaleX: 1,
            ease: 'power3.out',
            duration: 0.15
          },
          1.45
        )

        .fromTo(
          '.c2c-caption-text',
          {
            opacity: 0,
            y: 8
          },
          {
            opacity: 1,
            y: 0,
            ease: 'power3.out',
            duration: 0.12
          },
          1.47
        )

      // ========================================================
      // MOBILE CORNER WHEELS
      // TOP-RIGHT + BOTTOM-LEFT
      // ========================================================

      if (
        gsap.utils.toArray(
          '.c2c-wheel-b'
        ).length
      ) {
        scrollTl
          .fromTo(
            '.c2c-wheel-b',
            {
              opacity: 0,
              scale: 0.7
            },
            {
              opacity: 1,
              scale: 1,
              ease: 'power3.out',
              duration: 0.5
            },
            0.98
          )

          .fromTo(
            '.c2c-ring-outer-b',
            {
              rotation: 0
            },
            {
              rotation: 140,
              ease: 'none',
              duration: 0.78
            },
            0.98
          )

          .fromTo(
            '.c2c-ring-mid-b',
            {
              rotation: 0
            },
            {
              rotation: -200,
              ease: 'none',
              duration: 0.78
            },
            0.98
          )

          .fromTo(
            '.c2c-ring-inner-b',
            {
              rotation: 0
            },
            {
              rotation: 260,
              ease: 'none',
              duration: 0.78
            },
            0.98
          )
      }

      // Fade C2C

      scrollTl.to(
        '.c2c-word',
        {
          opacity: 0,
          ease: 'none',
          duration: 0.18
        },
        1.58
      )

      ScrollTrigger.refresh()
    }, heroRef)

    return () => {
      ctx.revert()
    }
  }, [reducedMotion, isSmall])

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

        {/* ======================================================
            LAYER 0 — ATMOSPHERE
        ====================================================== */}

        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(
                circle at 1px 1px,
                rgba(212,175,55,0.2) 1px,
                transparent 0
              )
            `,
            backgroundSize: '64px 64px',

            transform: reducedMotion
              ? 'none'
              : `translate(
                  ${mousePos.x * -2}px,
                  ${mousePos.y * -2}px
                )`,

            transition:
              'transform 0.6s cubic-bezier(0.16,1,0.3,1)'
          }}
        />

        {/* Gold atmospheric glow */}

        <div
          className="absolute top-1/2 right-[10%] lg:right-[18%] -translate-y-1/2 w-[300px] sm:w-[480px] lg:w-[620px] h-[300px] sm:h-[480px] lg:h-[620px] rounded-full pointer-events-none z-0 blur-[150px] opacity-15 transition-transform duration-700 ease-out"
          style={{
            background:
              'radial-gradient(circle, rgba(240,199,94,0.3) 0%, rgba(212,175,55,0.08) 50%, transparent 75%)',

            transform: reducedMotion
              ? 'translateY(-50%)'
              : `translate(
                  ${mousePos.x * 12}px,
                  calc(-50% + ${mousePos.y * 12}px)
                )`
          }}
        />

        {/* HUD corners */}

        <div className="absolute inset-0 pointer-events-none z-0 opacity-25 hidden md:block">

          <span className="absolute top-10 left-10 text-[#D4AF37] font-mono text-[10px]">
            ┼
          </span>

          <span className="absolute top-10 right-10 text-[#D4AF37] font-mono text-[10px]">
            ┼
          </span>

          <span className="absolute bottom-12 left-10 text-[#D4AF37] font-mono text-[10px]">
            ┼
          </span>

          <span className="absolute bottom-12 right-10 text-[#D4AF37] font-mono text-[10px]">
            ┼
          </span>

          <span className="absolute top-1/2 left-8 -translate-y-1/2 text-[#A3A3A3]/60 font-mono text-[8px] tracking-[0.25em] uppercase">
            SEC // 00_FRAGMENTS
          </span>

        </div>

        {/* ======================================================
            LAYER 1 — GOLD FRAGMENTS
        ====================================================== */}

        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-[1] flex items-center justify-center">

          <svg
            viewBox={
              tier === 'desktop'
                ? '0 0 1600 1000'
                : `0 0 ${vbWidth} ${vbHeight}`
            }

            preserveAspectRatio={
              tier === 'desktop'
                ? 'xMidYMid slice'
                : 'xMidYMid meet'
            }

            className={`fragment-svg select-none overflow-visible ${tier === 'desktop'
                ? 'h-full w-auto min-w-full max-w-none shrink-0 lg:w-full lg:h-full'
                : 'w-full h-full'
              }`}
          >

            <defs>

              <linearGradient
                id="goldBrushedA"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor="#4A3305"
                />

                <stop
                  offset="20%"
                  stopColor="#B8860B"
                />

                <stop
                  offset="48%"
                  stopColor="#F0C75E"
                />

                <stop
                  offset="55%"
                  stopColor="#FFD978"
                />

                <stop
                  offset="78%"
                  stopColor="#D4AF37"
                />

                <stop
                  offset="100%"
                  stopColor="#3B2803"
                />
              </linearGradient>

              <linearGradient
                id="goldBrushedB"
                x1="100%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor="#5E4208"
                />

                <stop
                  offset="30%"
                  stopColor="#F0C75E"
                />

                <stop
                  offset="60%"
                  stopColor="#D4AF37"
                />

                <stop
                  offset="85%"
                  stopColor="#B8860B"
                />

                <stop
                  offset="100%"
                  stopColor="#2E1F03"
                />
              </linearGradient>

              <linearGradient
                id="goldPlateDark"
                x1="0%"
                y1="50%"
                x2="100%"
                y2="50%"
              >
                <stop
                  offset="0%"
                  stopColor="#1E1402"
                  stopOpacity="0.8"
                />

                <stop
                  offset="50%"
                  stopColor="#B8860B"
                  stopOpacity="0.4"
                />

                <stop
                  offset="100%"
                  stopColor="#0F0A01"
                  stopOpacity="0.9"
                />
              </linearGradient>

              <linearGradient
                id="goldStrokeLinear"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop
                  offset="0%"
                  stopColor="#B8860B"
                  stopOpacity="0.2"
                />

                <stop
                  offset="35%"
                  stopColor="#FFD978"
                  stopOpacity="0.9"
                />

                <stop
                  offset="70%"
                  stopColor="#D4AF37"
                  stopOpacity="0.8"
                />

                <stop
                  offset="100%"
                  stopColor="#5E4208"
                  stopOpacity="0.15"
                />
              </linearGradient>

              <filter
                id="goldMetallicShadow"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feDropShadow
                  dx="0"
                  dy="6"
                  stdDeviation="12"
                  floodColor="#D4AF37"
                  floodOpacity="0.18"
                />
              </filter>

            </defs>

            {/* Background geometry */}

            <g
              className="layer-bg-geometry"
              style={{
                opacity:
                  tier === 'desktop'
                    ? 1
                    : 0.25,

                transform:
                  reducedMotion
                    ? 'none'
                    : `translate(
                        ${mousePos.x * 2}px,
                        ${mousePos.y * 2}px
                      )`,

                transition:
                  'transform 0.4s ease-out, opacity 0.4s ease-out'
              }}
            >

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

            {/* Mid fragments */}

            <g
              className="layer-mid-fragments"
              style={{
                transform:
                  reducedMotion
                    ? 'none'
                    : `translate(
                        ${mousePos.x * 5}px,
                        ${mousePos.y * 5}px
                      )`,

                transition:
                  'transform 0.4s ease-out'
              }}
            >

              {/* Fragment 1 */}

              <g
                transform={getFragTransform(
                  'frag1',
                  tier,
                  vbHeight
                )}
              >
                <g
                  className="fragment-plate frag-midground frag-converge-a frag-scatter-right"
                  filter="url(#goldMetallicShadow)"
                >

                  <polygon
                    points="1180,80 1480,140 1390,360 1120,290"
                    fill="url(#goldBrushedA)"
                    stroke="#FFD978"
                    strokeWidth="1.2"
                    strokeOpacity="0.8"
                  />

                  <line
                    x1="1200"
                    y1="120"
                    x2="1360"
                    y2="330"
                    stroke="#FFD978"
                    strokeWidth="0.8"
                    strokeOpacity="0.6"
                  />

                  <text
                    x="1220"
                    y="240"
                    fill="#FFD978"
                    fontSize="8"
                    fontFamily="monospace"
                    letterSpacing="2"
                    opacity="0.75"
                  >
                    PLATE // 01_A
                  </text>

                </g>
              </g>

              {/* Fragment 2 */}

              <g
                transform={getFragTransform(
                  'frag2',
                  tier,
                  vbHeight
                )}
              >
                <g
                  className="fragment-plate frag-midground frag-scatter-left"
                  filter="url(#goldMetallicShadow)"
                >

                  <polygon
                    points="180,90 380,40 340,160 140,210"
                    fill="url(#goldBrushedB)"
                    stroke="#D4AF37"
                    strokeWidth="1"
                    strokeOpacity="0.7"
                  />

                  <line
                    x1="160"
                    y1="150"
                    x2="360"
                    y2="100"
                    stroke="#FFD978"
                    strokeWidth="0.8"
                    strokeOpacity="0.5"
                  />

                </g>
              </g>

              {/* Fragment 3 */}

              <g
                transform={getFragTransform(
                  'frag3',
                  tier,
                  vbHeight
                )}
              >
                <g
                  className="fragment-plate frag-midground frag-converge-b frag-scatter-right"
                  filter="url(#goldMetallicShadow)"
                >

                  <polygon
                    points="1020,380 1260,330 1320,580 1080,630"
                    fill="url(#goldBrushedB)"
                    stroke="#FFD978"
                    strokeWidth="1.4"
                    strokeOpacity="0.85"
                  />

                  <polygon
                    points="1060,420 1220,380 1260,540 1100,580"
                    fill="#0A0A0A"
                    fillOpacity="0.5"
                    stroke="#D4AF37"
                    strokeWidth="0.8"
                    strokeOpacity="0.4"
                  />

                  <text
                    x="1100"
                    y="490"
                    fill="#F0C75E"
                    fontSize="9"
                    fontFamily="monospace"
                    letterSpacing="3"
                    opacity="0.9"
                  >
                    CORE // 02
                  </text>

                </g>
              </g>

              {/* Fragment 4 */}

              <g
                transform={getFragTransform(
                  'frag4',
                  tier,
                  vbHeight
                )}
              >
                <g
                  className="fragment-plate frag-midground frag-scatter-right"
                  filter="url(#goldMetallicShadow)"
                >

                  <polygon
                    points="1140,680 1440,610 1490,790 1210,870"
                    fill="url(#goldBrushedA)"
                    stroke="#D4AF37"
                    strokeWidth="1.2"
                    strokeOpacity="0.75"
                  />

                  <line
                    x1="1170"
                    y1="720"
                    x2="1420"
                    y2="660"
                    stroke="#FFD978"
                    strokeWidth="0.8"
                    strokeOpacity="0.6"
                  />

                </g>
              </g>

              {/* Fragment 5 */}

              <g
                transform={getFragTransform(
                  'frag5',
                  tier,
                  vbHeight
                )}
              >
                <g
                  className="fragment-plate frag-midground frag-scatter-left"
                  filter="url(#goldMetallicShadow)"
                >

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

            {/* Foreground fragments */}

            <g
              className="layer-fg-fragments"
              style={{
                transform:
                  reducedMotion
                    ? 'none'
                    : `translate(
                        ${mousePos.x * 8.5}px,
                        ${mousePos.y * 8.5}px
                      )`,

                transition:
                  'transform 0.4s ease-out'
              }}
            >

              {/* Fragment 6 */}

              <g
                transform={getFragTransform(
                  'frag6',
                  tier,
                  vbHeight
                )}
              >
                <g
                  className="fragment-outline frag-foreground frag-converge-a"
                  filter="url(#goldMetallicShadow)"
                >

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

                  {Array.from({
                    length: 7
                  }).map((_, i) => {
                    const angle =
                      0.2 +
                      i * 0.16

                    const r = 180

                    const x1 =
                      1040 +
                      Math.cos(angle) *
                      r

                    const y1 =
                      280 +
                      Math.sin(angle) *
                      r

                    const x2 =
                      1040 +
                      Math.cos(angle) *
                      (r + 10)

                    const y2 =
                      280 +
                      Math.sin(angle) *
                      (r + 10)

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

              {/* Fragment 7 */}

              <g
                transform={getFragTransform(
                  'frag7',
                  tier,
                  vbHeight
                )}
              >
                <g
                  className="fragment-plate frag-foreground frag-converge-b frag-scatter-right"
                  filter="url(#goldMetallicShadow)"
                >

                  <polygon
                    points="840,320 960,280 920,380 810,410"
                    fill="url(#goldBrushedA)"
                    stroke="#FFD978"
                    strokeWidth="1.5"
                    strokeOpacity="0.9"
                  />

                </g>
              </g>

              {/* Fragment 8 */}

              <g
                transform={getFragTransform(
                  'frag8',
                  tier,
                  vbHeight
                )}
              >
                <g
                  className="fragment-plate frag-foreground frag-scatter-up"
                  filter="url(#goldMetallicShadow)"
                >

                  <polygon
                    points="760,110 880,85 860,165 740,190"
                    fill="url(#goldBrushedB)"
                    stroke="#D4AF37"
                    strokeWidth="1.2"
                    strokeOpacity="0.8"
                  />

                  <text
                    x="765"
                    y="150"
                    fill="#FFD978"
                    fontSize="8"
                    fontFamily="monospace"
                    letterSpacing="2"
                  >
                    SYS // 01
                  </text>

                </g>
              </g>

              {/* Fragment 9 */}

              <g
                transform={getFragTransform(
                  'frag9',
                  tier,
                  vbHeight
                )}
              >
                <g
                  className="fragment-plate frag-foreground frag-scatter-right"
                  filter="url(#goldMetallicShadow)"
                >

                  <polygon
                    points="890,640 1020,590 980,720 860,760"
                    fill="url(#goldBrushedA)"
                    stroke="#FFD978"
                    strokeWidth="1.2"
                    strokeOpacity="0.85"
                  />

                </g>
              </g>

              {/* Fragment 10 */}

              <g
                transform={getFragTransform(
                  'frag10',
                  tier,
                  vbHeight
                )}
              >

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

              {/* Particles */}

              <g className="fragment-micro">

                <circle
                  cx="780"
                  cy="260"
                  r="2"
                  fill="#FFD978"
                  filter="url(#goldMetallicShadow)"
                />

                <circle
                  cx="920"
                  cy="180"
                  r="2.5"
                  fill="#F0C75E"
                />

                <circle
                  cx="1060"
                  cy="310"
                  r="1.5"
                  fill="#FFD978"
                />

                <circle
                  cx="820"
                  cy="540"
                  r="2"
                  fill="#D4AF37"
                />

                <circle
                  cx="980"
                  cy="620"
                  r="2.5"
                  fill="#FFD978"
                  filter="url(#goldMetallicShadow)"
                />

                <circle
                  cx="740"
                  cy="710"
                  r="1.5"
                  fill="#F0C75E"
                />

                <circle
                  cx="1240"
                  cy="460"
                  r="2"
                  fill="#FFD978"
                />

                <circle
                  cx="680"
                  cy="380"
                  r="1.5"
                  fill="#D4AF37"
                />

                <circle
                  cx="480"
                  cy="220"
                  r="2"
                  fill="#F0C75E"
                />

                <text
                  x="830"
                  y="555"
                  fill="#D4AF37"
                  fontSize="7"
                  fontFamily="monospace"
                  letterSpacing="1.5"
                  opacity="0.65"
                >
                  [X: 083 // Y: 055]
                </text>

                <text
                  x="1255"
                  y="475"
                  fill="#D4AF37"
                  fontSize="7"
                  fontFamily="monospace"
                  letterSpacing="1.5"
                  opacity="0.65"
                >
                  NODE_07
                </text>

              </g>

            </g>

          </svg>

        </div>

        {/* ======================================================
            LAYER 2 — DARK OVERLAY
        ====================================================== */}

        <div className="absolute inset-0 pointer-events-none z-[2] bg-gradient-to-b from-black/80 via-black/40 to-black/85 lg:bg-gradient-to-r lg:from-black/95 lg:via-black/75 lg:via-45% lg:to-transparent" />

        {/* ======================================================
            LAYER 3 — HERO CONTENT
        ====================================================== */}

        <div className="hero-content-layer relative z-10 w-full min-h-[100svh] flex flex-col justify-between px-5 sm:px-8 md:px-12 lg:px-16 xl:px-24 pt-24 pb-6 sm:pt-28 sm:pb-8 lg:pt-32 lg:pb-10">

          <div
            className={`hero-text-block flex-1 flex flex-col justify-center ${tier === 'desktop'
                ? 'text-left'
                : 'mx-auto items-center text-center'
              } my-auto w-full py-8 sm:py-12 lg:py-6 max-w-2xl xl:max-w-3xl`}
          >

            {/* Eyebrow */}

            <div className="hero-eyebrow-pill inline-flex items-center gap-2.5 w-fit px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[10px] sm:text-[11px] font-mono tracking-[0.22em] text-[#F0C75E] uppercase mb-4 sm:mb-6">

              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_6px_#D4AF37]" />

              <span>
                IEEE COMPUTER SOCIETY
              </span>

            </div>

            {/* Heading */}

            <div className="hero-headline w-full select-none">

              <h1
                className={`flex items-baseline gap-2.5 sm:gap-4 lg:gap-5 flex-wrap ${tier === 'desktop'
                    ? ''
                    : 'justify-center'
                  }`}
              >

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

            {/* Tagline */}

            <div className="space-y-3 pt-3 sm:pt-4 max-w-lg">

              <div
                className={`hero-tagline-wrap flex items-center gap-2.5 ${tier === 'desktop'
                    ? ''
                    : 'justify-center'
                  }`}
              >

                <span className="font-mono text-base text-[#D4AF37] font-semibold">
                  //
                </span>

                <p className="text-lg sm:text-xl md:text-2xl font-light text-[#E5E5E5] tracking-wide">
                  From Core to Code.
                </p>

              </div>

              <div className="hero-description-wrap">

                <p className="text-[#A3A3A3] text-sm sm:text-base leading-relaxed font-normal">
                  Where ideas, logic and technology come together to build what comes next.
                </p>

              </div>

            </div>

            {/* Buttons */}

            <div
              className={`hero-btn pt-6 sm:pt-8 flex flex-col sm:flex-row items-center gap-4 ${tier === 'desktop'
                  ? ''
                  : 'justify-center'
                }`}
            >

              <Button
                onClick={() => {
                  const target =
                    document.getElementById('events') ||
                    document.querySelector('section:nth-of-type(2)')
                  target?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                EXPLORE EVENT
              </Button>

              <Button>
                REGISTER NOW
              </Button>

            </div>

          </div>

        </div>

        {/* ======================================================
            LAYER 4 — C2C WORDMARK + WHEELS
        ====================================================== */}

        <div
          aria-hidden
          className="c2c-word absolute inset-0 z-[12] flex items-center justify-center pointer-events-none opacity-0"
        >

          {/* Glow */}

          <div className="c2c-glow absolute aspect-square w-[min(110vw,100svh)] rounded-full opacity-0 bg-[radial-gradient(circle,rgba(240,199,94,0.22)_0%,rgba(212,175,55,0.07)_40%,transparent_70%)]" />

          {/* Main wheel */}

          <svg
            className="c2c-wheel absolute aspect-square w-[min(94vw,88svh)] overflow-visible opacity-0"
            viewBox="-300 -300 600 600"
            fill="none"
          >

            <WheelRings suffix="" />

          </svg>

          {/* ====================================================
              MOBILE CORNER WHEELS

              TOP-RIGHT + BOTTOM-LEFT
          ==================================================== */}

          {isSmall && (
            <>
              {/* TOP-RIGHT WHEEL */}

              <svg
                className="c2c-wheel-b absolute right-[-14vw] top-[-6svh] aspect-square w-[58vw] overflow-visible opacity-0"
                viewBox="-300 -300 600 600"
                fill="none"
              >
                <WheelRings suffix="-b" />
              </svg>

              {/* BOTTOM-LEFT WHEEL */}

              <svg
                className="c2c-wheel-b absolute left-[-14vw] bottom-[-6svh] aspect-square w-[58vw] overflow-visible opacity-0"
                viewBox="-300 -300 600 600"
                fill="none"
              >
                <WheelRings suffix="-b" />
              </svg>
            </>
          )}

          {/* C2C WORD */}

          <div className="relative flex items-baseline justify-center gap-[0.04em] font-black uppercase leading-none tracking-tight text-[30vw] sm:text-[24vw] lg:text-[17vw]">

            <span className="c2c-letter block text-white">
              C
            </span>

            <span className="c2c-letter block bg-gradient-to-br from-[#FFD978] via-[#F0C75E] to-[#B8860B] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(212,175,55,0.45)]">
              2
            </span>

            <span className="c2c-letter block text-white">
              C
            </span>

          </div>

          {/* Caption */}

          <div className="absolute inset-x-0 bottom-[11svh] flex items-center justify-center gap-4 px-6">

            <span className="c2c-line h-px w-12 origin-right bg-gradient-to-r from-transparent to-[#D4AF37] sm:w-24" />

            <span className="c2c-caption-text font-mono text-[10px] uppercase tracking-[0.3em] text-[#F0C75E] sm:text-xs">
              From Core to Code
            </span>

            <span className="c2c-line h-px w-12 origin-left bg-gradient-to-l from-transparent to-[#D4AF37] sm:w-24" />

          </div>

        </div>

      </section>
    </div>
  )
}