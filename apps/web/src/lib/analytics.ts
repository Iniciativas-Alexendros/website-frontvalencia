type ConsentCategory = 'analytics' | 'marketing'

interface Consent {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

const STORAGE_KEY = 'front-cookie-consent'

export function getConsent(): Consent | null {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return null
  try {
    return JSON.parse(stored)
  } catch {
    return null
  }
}

export function hasConsent(category: ConsentCategory): boolean {
  const consent = getConsent()
  if (!consent) return false
  return consent[category]
}

export function loadScript(src: string, id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.getElementById(id)) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.id = id
    script.src = src
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`))
    document.head.appendChild(script)
  })
}

export function initAnalytics(): void {
  window.addEventListener('cookie-consent', ((e: CustomEvent<Consent>) => {
    const consent = e.detail
    if (consent.analytics) {
      // Metricool
      loadScript('https://tracker.metricool.com/resources/be.js', 'metricool-script').catch(() => {})
    }
    if (consent.marketing) {
      // Meta Pixel — only loaded when a pixel ID is configured via env,
      // and only after the user grants marketing consent.
      const pixelId = import.meta.env.PUBLIC_META_PIXEL_ID
      if (pixelId) {
        loadMetaPixel(pixelId).catch(() => {})
      }
    }
  }) as EventListener)
}

function loadMetaPixel(pixelId: string): Promise<void> {
  return new Promise((resolve) => {
    if (document.getElementById('meta-pixel')) {
      resolve()
      return
    }
    // Meta Pixel base code
    const script = document.createElement('script')
    script.id = 'meta-pixel'
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${pixelId}');
      fbq('track', 'PageView');
    `
    document.head.appendChild(script)
    resolve()
  })
}

// Auto-init on script load
if (typeof window !== 'undefined') {
  initAnalytics()
  // Check for existing consent on page load
  const consent = getConsent()
  if (consent) {
    window.dispatchEvent(new CustomEvent('cookie-consent', { detail: consent }))
  }
}
