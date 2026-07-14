import { useEffect, useRef, useState } from 'react'

interface Props {
  lang: 'es' | 'en'
}

export default function Hero({ lang }: Props) {
  const heroText =
    lang === 'es'
      ? {
          line1: 'ASSABORIX VALÈNCIA',
          line1sub: 'Saborear Valencia',
          line2: 'FRONT AL MEDITERRANI',
          line2sub: 'Frente al Mediterráneo',
          tag: 'Restaurante y Terraza en La Marina de Valencia',
          cta1: 'Ver Carta',
          cta2: 'Contactar',
        }
      : {
          line1: 'EAT WELL',
          line1sub: 'Comer bien',
          line2: 'BY THE SEA',
          line2sub: 'Frente al mar',
          tag: 'Restaurant & Terrace at La Marina de Valencia',
          cta1: 'View Menu',
          cta2: 'Contact',
        }

  const parallaxRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const conn = (navigator as any).connection
      const saveData = conn?.saveData
      const isSlow = conn?.effectiveType && /2g|slow-2g/.test(conn.effectiveType)
      if (prefersReducedMotion || saveData || isSlow) {
        video.pause()
        video.removeAttribute('autoPlay')
      }
    }

    const parallaxEl = parallaxRef.current
    if (!parallaxEl) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIntersecting(true)
          } else {
            setIsIntersecting(false)
          }
        })
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0,
      },
    )

    observer.observe(parallaxEl)

    const handleScroll = () => {
      if (!isIntersecting || !parallaxEl) return

      const scrolled = window.scrollY
      const rate = scrolled * 0.3
      parallaxEl.style.transform = `translate3d(0, ${rate}px, 0)`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isIntersecting])

  return (
    <section className="relative h-screen w-full overflow-hidden" aria-label="Hero">
      {/* Parallax Background Image (hero-poster.jpg) - Main LCP element */}
      <div ref={parallaxRef} className="absolute inset-0 -z-10 will-change-transform" aria-hidden="true">
        <img
          src="/images/hero-poster.jpg"
          alt=""
          width="1920"
          height="1080"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        {/* Dark gradient overlay for text readability */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-concrete-950/95 via-concrete-950/70 to-concrete-950/40"
          aria-hidden="true"
        ></div>
      </div>

      {/* Optional Video Background (paused by default on reduced motion/slow connection) */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          id="hero-video"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero-poster.jpg"
          aria-hidden="true"
        >
          <source src="/video/vid-mob.mp4" type="video/mp4" media="(max-width: 768px)" />
          <source src="/video/vid-desk.mp4" type="video/mp4" media="(min-width: 769px)" />
        </video>
        {/* Additional subtle overlay for video blending */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-concrete-950/60 via-transparent to-concrete-950/30"
          aria-hidden="true"
        ></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="font-display transition-[opacity,transform] duration-500">
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-text-primary leading-[0.95]">
            {heroText.line1}
          </span>
          <span className="block text-xs sm:text-sm font-light italic tracking-[0.25em] text-concrete-400 mt-1.5">
            {heroText.line1sub}
          </span>
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-terracotta-400 leading-[0.95] mt-3">
            {heroText.line2}
          </span>
          <span className="block text-xs sm:text-sm font-light italic tracking-[0.25em] text-concrete-400 mt-1.5">
            {heroText.line2sub}
          </span>
        </h1>

        {/* Decorative terracotta line */}
        <div className="mt-8 w-20 h-[2px] bg-terracotta-400" aria-hidden="true"></div>

        <p className="mt-6 text-base sm:text-lg md:text-xl text-concrete-100 max-w-2xl font-normal tracking-[0.2em] uppercase">
          {heroText.tag}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <a
            href="#carta"
            className="inline-flex items-center justify-center px-8 py-3 bg-terracotta-500 hover:bg-terracotta-400 text-white font-semibold text-sm uppercase tracking-widest transition-all duration-300 hover:px-12"
          >
            {heroText.cta1}
          </a>
          <a
            href="#localizacion"
            className="inline-flex items-center justify-center px-8 py-3 border border-concrete-200 hover:border-text-primary text-concrete-100 hover:text-text-primary font-semibold text-sm uppercase tracking-widest transition-all duration-300 hover:px-12"
          >
            {heroText.cta2}
          </a>
        </div>
      </div>
    </section>
  )
}
