import { useState, useEffect } from 'react'

interface Props {
  lang: 'es' | 'en'
}

const text = {
  es: {
    title: 'Uso de Cookies',
    description:
      'Utilizamos cookies para mejorar tu experiencia y analizar el tráfico. Puedes elegir qué cookies aceptar.',
    acceptAll: 'Aceptar todas',
    rejectAll: 'Rechazar',
    configure: 'Configurar',
    necessary: 'Necesarias',
    necessaryHint: 'Siempre activas',
    analytics: 'Análisis',
    marketing: 'Marketing',
    save: 'Guardar preferencias',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v.64a1.5 1.5 0 0 1-.586 1.183l-1.272 1.022a.75.75 0 0 0 .144 1.262l1.245.622a1.5 1.5 0 0 1 .75 1.296v.717a1.5 1.5 0 0 0 .422 1.06l.998.998a1.5 1.5 0 0 0 1.06.422h.717a1.5 1.5 0 0 1 1.296.75l.622 1.245a.75.75 0 0 0 1.262-.144l1.022-1.272a1.5 1.5 0 0 1 1.183-.586h.64c1.135 0 2.098-.845 2.232-1.976A48.872 48.872 0 0 1 18 11.25v-1.5m-6 3.75v.75a3 3 0 0 1-3 3H7.5a3 3 0 0 1-3-3v-.75m12 0a2.25 2.25 0 0 0-2.25-2.25H9.75a2.25 2.25 0 0 0-2.25 2.25M12 3v.75"
        />
      </svg>
    ),
  },
  en: {
    title: 'Cookie Usage',
    description:
      'We use cookies to improve your experience and analyse traffic. You can choose which cookies to accept.',
    acceptAll: 'Accept all',
    rejectAll: 'Reject',
    configure: 'Settings',
    necessary: 'Necessary',
    necessaryHint: 'Always active',
    analytics: 'Analytics',
    marketing: 'Marketing',
    save: 'Save preferences',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v.64a1.5 1.5 0 0 1-.586 1.183l-1.272 1.022a.75.75 0 0 0 .144 1.262l1.245.622a1.5 1.5 0 0 1 .75 1.296v.717a1.5 1.5 0 0 0 .422 1.06l.998.998a1.5 1.5 0 0 0 1.06.422h.717a1.5 1.5 0 0 1 1.296.75l.622 1.245a.75.75 0 0 0 1.262-.144l1.022-1.272a1.5 1.5 0 0 1 1.183-.586h.64c1.135 0 2.098-.845 2.232-1.976A48.872 48.872 0 0 1 18 11.25v-1.5m-6 3.75v.75a3 3 0 0 1-3 3H7.5a3 3 0 0 1-3-3v-.75m12 0a2.25 2.25 0 0 0-2.25-2.25H9.75a2.25 2.25 0 0 0-2.25 2.25M12 3v.75"
        />
      </svg>
    ),
  },
}

type Consent = {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

const STORAGE_KEY = 'front-cookie-consent'

export default function CookieConsent({ lang }: Props) {
  const [visible, setVisible] = useState(false)
  const [showConfig, setShowConfig] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [consent, setConsent] = useState<Consent>({
    necessary: true,
    analytics: false,
    marketing: false,
  })

  const t = text[lang]

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      setVisible(true)
    }
    // Trigger slide-up animation after mount
    requestAnimationFrame(() => setMounted(true))
  }, [])

  const saveConsent = (c: Consent) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(c))
    setVisible(false)
    window.dispatchEvent(new CustomEvent('cookie-consent', { detail: c }))
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label={t.title}
      aria-modal="false"
      className={`fixed bottom-0 left-0 right-0 z-50 bg-concrete-900 border-t border-concrete-700 p-4 sm:p-6 shadow-2xl transition-transform duration-500 ease-out ${
        mounted ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="text-terracotta-400 mt-0.5 shrink-0" aria-hidden="true">
              {t.icon}
            </div>
            <div>
              <h2 className="text-base font-semibold text-text-primary uppercase tracking-wider">{t.title}</h2>
              <p className="mt-1 text-sm text-text-secondary max-w-2xl leading-relaxed">{t.description}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto shrink-0">
            <button
              onClick={() =>
                saveConsent({
                  necessary: true,
                  analytics: false,
                  marketing: false,
                })
              }
              className="px-4 py-2.5 text-sm font-medium text-concrete-200 hover:text-text-primary border border-concrete-600 hover:border-concrete-400 transition-colors uppercase tracking-wider"
            >
              {t.rejectAll}
            </button>
            <button
              onClick={() => setShowConfig(!showConfig)}
              aria-expanded={showConfig}
              className="px-4 py-2.5 text-sm font-medium text-concrete-200 hover:text-text-primary border border-concrete-600 hover:border-concrete-400 transition-colors uppercase tracking-wider"
            >
              {t.configure}
            </button>
            <button
              onClick={() =>
                saveConsent({
                  necessary: true,
                  analytics: true,
                  marketing: true,
                })
              }
              className="px-4 py-2.5 text-sm font-medium text-concrete-200 hover:text-text-primary border border-concrete-600 hover:border-terracotta-400 hover:text-terracotta-400 transition-colors uppercase tracking-wider"
            >
              {t.acceptAll}
            </button>
          </div>
        </div>

        {showConfig && (
          <div className="mt-6 pt-4 border-t border-concrete-700 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <label className="flex items-center gap-3 text-sm text-text-secondary">
              <input type="checkbox" checked disabled className="w-4 h-4 accent-terracotta-500 cursor-not-allowed" />
              <span>
                <span className="block text-text-primary font-medium">{t.necessary}</span>
                <span className="block text-xs text-text-muted">{t.necessaryHint}</span>
              </span>
            </label>
            <label className="flex items-center gap-3 text-sm text-text-secondary cursor-pointer">
              <input
                type="checkbox"
                checked={consent.analytics}
                onChange={(e) => setConsent({ ...consent, analytics: e.target.checked })}
                className="w-4 h-4 accent-terracotta-500"
              />
              <span className="text-text-primary font-medium">{t.analytics}</span>
            </label>
            <label className="flex items-center gap-3 text-sm text-text-secondary cursor-pointer">
              <input
                type="checkbox"
                checked={consent.marketing}
                onChange={(e) => setConsent({ ...consent, marketing: e.target.checked })}
                className="w-4 h-4 accent-terracotta-500"
              />
              <span className="text-text-primary font-medium">{t.marketing}</span>
            </label>
            <div className="sm:col-span-3">
              <button
                onClick={() => saveConsent(consent)}
                className="px-4 py-2.5 text-sm font-medium text-concrete-200 hover:text-text-primary border border-concrete-600 hover:border-terracotta-400 hover:text-terracotta-400 transition-colors uppercase tracking-wider"
              >
                {t.save}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
