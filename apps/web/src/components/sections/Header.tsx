import { useEffect, useRef, useState } from 'react'

interface Props {
  lang: 'es' | 'en'
  isHome?: boolean
  site?: {
    externalLinks?: { club?: string }
  }
}

export default function Header({ lang, isHome = false, site }: Props) {
  const careersUrl = 'https://grupoelalto-1738067471.teamtailor.com/'

  const navItems =
    lang === 'es'
      ? [
          { label: 'Carta', href: '#carta' },
          { label: 'Espacio', href: '#espacio' },
          { label: 'Localización', href: '#localizacion' },
          { label: 'Contacto', href: '#localizacion' },
          { label: 'Talento', href: careersUrl, external: true },
        ]
      : [
          { label: 'Menu', href: '#carta' },
          { label: 'Space', href: '#espacio' },
          { label: 'Location', href: '#localizacion' },
          { label: 'Contact', href: '#localizacion' },
          { label: 'Careers', href: careersUrl, external: true },
        ]

  const otherLang = lang === 'es' ? 'en' : 'es'
  const otherLangHref =
    typeof window !== 'undefined'
      ? window.location.pathname.replace(lang === 'es' ? /^\/es/ : /^\/en/, lang === 'es' ? '/en' : '/es')
      : lang === 'es'
        ? '/en/'
        : '/es/'

  const [mobileOpen, setMobileOpen] = useState(false)
  const headerRef = useRef<HTMLHeadElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Mobile menu toggle
  const toggleMenu = () => {
    setMobileOpen(!mobileOpen)
  }

  // Smooth scroll to anchor
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const targetId = href.startsWith('#') ? href.slice(1) : null
    if (targetId) {
      e.preventDefault()
      const target = document.getElementById(targetId)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      if (mobileOpen) setMobileOpen(false)
    }
  }

  // Header scroll-aware background (only on home)
  useEffect(() => {
    if (!isHome || !headerRef.current) return
    const header = headerRef.current
    const onScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add('bg-surface/95', 'backdrop-blur-md', 'border-concrete-800')
        header.classList.remove('bg-transparent', 'border-transparent')
      } else {
        header.classList.remove('bg-surface/95', 'backdrop-blur-md', 'border-concrete-800')
        header.classList.add('bg-transparent', 'border-transparent')
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  // Mobile menu animation
  useEffect(() => {
    if (!menuRef.current) return
    const menu = menuRef.current
    if (mobileOpen) {
      menu.style.maxHeight = menu.scrollHeight + 'px'
      menu.style.opacity = '1'
    } else {
      menu.style.maxHeight = '0px'
      menu.style.opacity = '0'
    }
  }, [mobileOpen])

  const headerClass = [
    'fixed top-0 left-0 right-0 z-50 transition-colors duration-300',
    isHome
      ? 'bg-transparent border-b border-transparent'
      : 'bg-surface/95 backdrop-blur-md border-b border-concrete-800',
  ].join(' ')

  return (
    <header ref={headerRef} id="site-header" data-is-home={isHome ? 'true' : 'false'} className={headerClass}>
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <a
          href={lang === 'es' ? '/es/' : '/en/'}
          className="flex items-center gap-3 shrink-0"
          aria-label="FRONT — Home"
        >
          <img
            src="/images/logos/logo-icon.png"
            alt="FRONT"
            width="64"
            height="32"
            className="h-8 w-auto"
            loading="eager"
            decoding="async"
          />
          <img
            src="/images/logos/from-logo.svg"
            alt="FRONT La Marina de Valencia"
            width="80"
            height="20"
            className="h-5 w-auto hidden sm:block"
            loading="eager"
            decoding="async"
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) =>
            item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative text-sm font-medium tracking-[0.15em] uppercase transition-colors duration-200 py-1 text-concrete-300 hover:text-text-primary flex items-center gap-1"
              >
                {item.label}
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            ) : (
              <a
                key={item.href}
                href={item.href}
                className="relative text-sm font-medium tracking-[0.15em] uppercase transition-colors duration-200 py-1 text-concrete-300 hover:text-text-primary"
                onClick={(e) => handleAnchorClick(e, item.href)}
              >
                {item.label}
              </a>
            ),
          )}
        </div>

        {/* Right side: Lang toggle + Contactar CTA */}
        <div className="flex items-center gap-4 shrink-0">
          <a
            href={otherLangHref}
            className="text-xs font-bold uppercase tracking-[0.2em] text-concrete-400 hover:text-text-primary transition-colors"
            aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a español'}
          >
            {lang === 'es' ? 'EN' : 'ES'}
          </a>
          <a
            href="#localizacion"
            className="inline-flex items-center gap-2 bg-terracotta-500 hover:bg-terracotta-400 text-white text-sm font-semibold uppercase tracking-wider px-5 py-2 transition-colors duration-200"
            onClick={(e) => handleAnchorClick(e, '#localizacion')}
          >
            {lang === 'es' ? 'Contactar' : 'Contact'}
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          id="mobile-menu-btn"
          className="md:hidden p-2 text-concrete-300 hover:text-text-primary"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={lang === 'es' ? 'Abrir menú' : 'Open menu'}
          onClick={toggleMenu}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu (slide-down animation) */}
      <div
        ref={menuRef}
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out bg-surface border-t ${
          mobileOpen ? 'max-h-96 opacity-100 border-concrete-800' : 'max-h-0 opacity-0 border-transparent'
        }`}
      >
        <div className="px-4 py-6 space-y-4">
          {navItems.map((item) =>
            item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-lg font-medium uppercase tracking-wider text-concrete-300 hover:text-text-primary flex items-center gap-2"
              >
                {item.label}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            ) : (
              <a
                key={item.href}
                href={item.href}
                className="block text-lg font-medium uppercase tracking-wider text-concrete-300 hover:text-text-primary"
                onClick={(e) => handleAnchorClick(e, item.href)}
              >
                {item.label}
              </a>
            ),
          )}
          <a
            href={lang === 'es' ? '#localizacion' : '#localizacion'}
            className="block text-lg font-medium uppercase tracking-wider text-concrete-300 hover:text-text-primary bg-terracotta-500 hover:bg-terracotta-400 text-white px-4 py-2 text-center"
            onClick={(e) => handleAnchorClick(e, '#localizacion')}
          >
            {lang === 'es' ? 'Contactar' : 'Contact'}
          </a>
        </div>
      </div>
    </header>
  )
}
