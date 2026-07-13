type ConsentCategory = 'analytics' | 'marketing';

interface Consent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const STORAGE_KEY = 'front-cookie-consent';

export function getConsent(): Consent | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function hasConsent(category: ConsentCategory): boolean {
  const consent = getConsent();
  if (!consent) return false;
  return consent[category];
}

export function loadScript(src: string, id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.getElementById(id)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.id = id;
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });
}

export function initAnalytics(): void {
  window.addEventListener('cookie-consent', ((e: CustomEvent<Consent>) => {
    const consent = e.detail;
    if (consent.analytics) {
      // Metricool
      loadScript('https://tracker.metricool.com/resources/be.js', 'metricool-script').catch(() => {});
    }
    if (consent.marketing) {
      // Meta Pixel (placeholder — actual pixel ID from env)
      // loadScript('https://connect.facebook.net/en_US/fbevents.js', 'meta-pixel').catch(() => {});
    }
  }) as EventListener);
}

// Auto-init on script load
if (typeof window !== 'undefined') {
  initAnalytics();
  // Check for existing consent on page load
  const consent = getConsent();
  if (consent) {
    window.dispatchEvent(new CustomEvent('cookie-consent', { detail: consent }));
  }
}
