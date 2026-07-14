import React, { useEffect } from 'react'

interface Props {
  lang: 'es' | 'en'
}

const APP_VERSION = '1.0.1'

const Footer: React.FC<Props> = ({ lang }) => {
  const t =
    lang === 'es'
      ? {
          contact: 'Contacto',
          legal: 'Legal',
          social: 'Síguenos',
          careers: 'Talento',
          legalAdvice: 'Aviso Legal',
          privacy: 'Privacidad',
          cookies: 'Cookies',
          copyright: `© ${new Date().getFullYear()} FRONT THE TERMINAL BAR. Todos los derechos reservados.`,
          version: `v${APP_VERSION}`,
          authorLabel: 'Web',
          newsletter: 'Suscríbete para enterarte de todo',
          email: 'Email',
          subscribe: 'Suscribirse',
          thanks: '¡Gracias!',
          addressLabel: 'Dirección',
          phoneLabel: 'Teléfono',
          emailLabel: 'Email',
          scanMenu: 'Escanea para ver la carta',
          viewPdf: 'Ver carta PDF',
        }
      : {
          contact: 'Contact',
          legal: 'Legal',
          social: 'Follow us',
          careers: 'Careers',
          legalAdvice: 'Legal Notice',
          privacy: 'Privacy',
          cookies: 'Cookies',
          copyright: `© ${new Date().getFullYear()} FRONT THE TERMINAL BAR. All rights reserved.`,
          version: `v${APP_VERSION}`,
          authorLabel: 'Web',
          newsletter: 'Subscribe to stay updated',
          email: 'Email',
          subscribe: 'Subscribe',
          thanks: 'Thanks!',
          addressLabel: 'Address',
          phoneLabel: 'Phone',
          emailLabel: 'Email',
          scanMenu: 'Scan to view the menu',
          viewPdf: 'View menu PDF',
        }

  // Placeholder data – replace with real CMS data as needed
  const phone = '+34 965 020 349'
  const phoneClean = '34965020349'
  const email = 'hello@frontvalencia.com'
  const eventsEmail = 'eventos@frontvalencia.com'
  const reservationsEmail = 'reservas@frontvalencia.com'
  const address = 'C/Travesía'
  const city = 'Valencia'
  const postal = '46024'
  const area = 'La Marina de Valencia'
  const instagram = 'https://www.instagram.com/frontvalencia'
  const careers = 'https://grupoelalto-1738067471.teamtailor.com/'

  useEffect(() => {
    const form = document.getElementById('newsletter-form') as HTMLFormElement | null
    const feedback = document.getElementById('newsletter-feedback')
    const btnLabel = document.getElementById('newsletter-btn-label')
    if (!form) return
    const handler = (e: Event) => {
      e.preventDefault()
      if (!feedback || !btnLabel) return
      const input = form.querySelector<HTMLInputElement>('#newsletter-email')
      if (!input || !input.value) return
      console.info('[newsletter] subscribe request:', input.value)
      feedback.classList.remove('hidden')
      btnLabel.textContent = feedback.textContent ?? '✓'
      input.value = ''
      setTimeout(() => {
        feedback.classList.add('hidden')
        if (btnLabel) btnLabel.textContent = form.dataset.originalLabel ?? btnLabel.textContent ?? ''
      }, 3000)
    }
    form.addEventListener('submit', handler)
    return () => form?.removeEventListener('submit', handler)
  }, [])

  return (
    <footer className="bg-concrete-950 border-t border-concrete-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Logo + Newsletter */}
          <div>
            <img
              src="/images/logos/LOGO_MV_SVG.svg"
              alt="FRONT"
              width={120}
              height={40}
              className="h-10 w-auto mb-6"
              loading="lazy"
              decoding="async"
            />
            <p className="text-sm text-text-muted mb-4">{t.newsletter}</p>
            <form id="newsletter-form" className="flex gap-2">
              <label htmlFor="newsletter-email" className="sr-only">
                {t.email}
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                placeholder="email@example.com"
                className="flex-1 min-w-0 bg-concrete-900 border border-concrete-700 px-3 py-2 text-sm text-text-primary placeholder-concrete-500 focus:border-terracotta-400 focus:outline-none transition-colors"
                required
                autoComplete="email"
              />
              <button
                type="submit"
                className="bg-terracotta-500 hover:bg-terracotta-400 text-white px-4 py-2 text-sm font-semibold uppercase tracking-wider transition-colors shrink-0"
              >
                <span id="newsletter-btn-label">{t.subscribe}</span>
              </button>
            </form>
            <p
              id="newsletter-feedback"
              className="mt-2 text-xs text-terracotta-400 hidden"
              role="status"
              aria-live="polite"
            >
              {t.thanks}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-text-primary mb-4">{t.contact}</h3>
            <ul className="space-y-2.5 text-sm text-text-secondary">
              <li>
                <span className="text-text-muted text-xs uppercase tracking-wider block">{t.addressLabel}</span>
                {address}
                <br />
                {postal} — {area}, {city}
              </li>
              <li>
                <span className="text-text-muted text-xs uppercase tracking-wider block">{t.phoneLabel}</span>
                <a href={`tel:${phoneClean}`} className="hover:text-terracotta-400 transition-colors">
                  {phone}
                </a>
              </li>
              <li>
                <span className="text-text-muted text-xs uppercase tracking-wider block">{t.emailLabel}</span>
                <a href={`mailto:${email}`} className="hover:text-terracotta-400 transition-colors">
                  {email}
                </a>
                <br />
                <a href={`mailto:${reservationsEmail}`} className="hover:text-terracotta-400 transition-colors text-xs">
                  {reservationsEmail}
                </a>
                <br />
                <a href={`mailto:${eventsEmail}`} className="hover:text-terracotta-400 transition-colors text-xs">
                  {eventsEmail}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-text-primary mb-4">{t.legal}</h3>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li>
                <a
                  href={lang === 'es' ? '/es/legal-advice' : '/en/legal-advice'}
                  className="hover:text-terracotta-400 transition-colors"
                >
                  {t.legalAdvice}
                </a>
              </li>
              <li>
                <a
                  href={lang === 'es' ? '/es/privacy-policy' : '/en/privacy-policy'}
                  className="hover:text-terracotta-400 transition-colors"
                >
                  {t.privacy}
                </a>
              </li>
              <li>
                <a
                  href={lang === 'es' ? '/es/cookies-policy' : '/en/cookies-policy'}
                  className="hover:text-terracotta-400 transition-colors"
                >
                  {t.cookies}
                </a>
              </li>
              <li>
                <a
                  href={careers}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-terracotta-400 transition-colors flex items-center gap-1"
                >
                  {t.careers}
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          {/* Social + QR */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-text-primary mb-4">{t.social}</h3>
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-terracotta-400 transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C15.668 23.986 15.259 24 12 24c-3.259 0-3.668-.014-4.948-.072-4.354-.2-6.782-2.618-6.979-6.98-.059-1.28-.073-1.689-.07-4.949 0-3.259.014-3.667.072-4.947.196-4.354 2.617-6.78 6.979-6.98C8.332.014 8.741 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              @frontvalencia
            </a>

            {/* QR Code */}
            <div className="mt-6">
              <p className="text-xs text-text-muted uppercase tracking-wider mb-2">{t.scanMenu}</p>
              <a
                href="/files/menu-frontvalencia.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block hover:opacity-80 transition-opacity"
                aria-label={t.viewPdf}
              >
                <img
                  src="/images/qr-menu.png"
                  alt={t.scanMenu}
                  width={96}
                  height={96}
                  className="w-24 h-24"
                  loading="lazy"
                  decoding="async"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-concrete-800 pt-8 text-center space-y-2">
          <p className="text-xs text-text-muted tracking-wider">{t.copyright}</p>
          <p className="text-xs text-text-muted tracking-wider">
            {t.version} — {t.authorLabel}:{' '}
            <a
              href="https://alexendros.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-terracotta-400 transition-colors underline underline-offset-2 decoration-concrete-600 hover:decoration-terracotta-400"
            >
              Alexendros
            </a>{' '}
            · Alejandro Domingo Agustí
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
