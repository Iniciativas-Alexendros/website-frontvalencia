import { useEffect, useRef } from 'react'

interface Props {
  lang: 'es' | 'en'
}

export default function Hero({ lang }: Props) {
  const heroText =
    lang === 'es'
      ? {
          line1: 'ASSABORIX VALÈNCIA',
          line1sub: 'Saborea Valencia',
          line2: 'FRONT AL MEDITERRANI',
          line2sub: 'frente al Mediterráneo.',
          tag: 'Restaurante y Terraza en La Marina de Valencia',
          cta1: 'Ver Carta',
        }
      : {
          line1: 'EAT WELL',
          line1sub: 'Comer bien',
          line2: 'BY THE SEA',
          line2sub: 'Frente al mar',
          tag: 'Restaurant & Terrace at La Marina de Valencia',
          cta1: 'View Menu',
        }

  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const conn = (navigator as any).connection
    const saveData = conn?.saveData
    const isSlow = conn?.effectiveType && /2g|slow-2g/.test(conn.effectiveType)
    if (prefersReducedMotion || saveData || isSlow) {
      video.pause()
      video.removeAttribute('autoPlay')
    }
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden bg-concrete-950" aria-label="Hero">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          id="hero-video"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src="/video/vid-mob.mp4" type="video/mp4" media="(max-width: 768px)" />
          <source src="/video/vid-desk.mp4" type="video/mp4" media="(min-width: 769px)" />
        </video>
        {/* Gradient overlay for text readability */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-concrete-950/90 via-concrete-950/60 to-concrete-950/80"
          aria-hidden="true"
        ></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="font-display transition-[opacity,transform] duration-500">
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-text-primary leading-[0.95]">
            {heroText.line1}
          </span>
          <span className="block font-accent text-[0.9rem] sm:text-[1.125rem] md:text-[1.35rem] text-concrete-200/80 mt-2 leading-tight [text-shadow:0_2px_8px_rgba(0,0,0,0.45)]">
            {heroText.line1sub}
          </span>
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-terracotta-400 leading-[0.95] mt-3">
            {heroText.line2}
          </span>
          <span className="block font-accent text-[0.9rem] sm:text-[1.125rem] md:text-[1.35rem] text-concrete-200/80 mt-2 leading-tight [text-shadow:0_2px_8px_rgba(0,0,0,0.45)]">
            {heroText.line2sub}
          </span>
        </h1>

        {/* Decorative terracotta line */}
        <div className="mt-8 w-16 h-[2px] bg-terracotta-400" aria-hidden="true"></div>

        <p className="mt-6 text-base sm:text-lg md:text-xl text-concrete-100 max-w-2xl font-normal tracking-[0.2em] uppercase">
          {heroText.tag}
        </p>

        <div className="mt-10 flex justify-center">
          <a
            href="#carta"
            className="inline-flex items-center justify-center px-8 py-3 bg-terracotta-500 hover:bg-terracotta-400 text-white font-semibold text-sm uppercase tracking-widest transition-all duration-300 hover:px-12"
          >
            {heroText.cta1}
          </a>
        </div>
      </div>
    </section>
  )
}
