import { useEffect, useState } from 'react'

interface Props {
  lang: 'es' | 'en'
  site?: {
    location?: {
      mapsUrl?: string
      postalCode?: string
    }
  }
}

export default function LocalizacionSection({ lang, site }: Props) {
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapTimedOut, setMapTimedOut] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!mapLoaded) setMapTimedOut(true)
    }, 15000)
    return () => clearTimeout(timeout)
  }, [mapLoaded])

  const mapsUrl = site?.location?.mapsUrl ?? 'https://maps.app.goo.gl/FVnSVDYfv5XnNiU16'
  const postalCode = site?.location?.postalCode ?? '46024'
  const locationData =
    lang === 'es'
      ? {
          heading: 'LOCALIZACIÓN',
          address: 'The Terminal Hub, La Marina de Valencia',
          area: 'La Marina de Valencia, The Terminal Hub',
          weekday: 'Lunes a Viernes: 9:00 a 19:00',
          weekend: 'Sábados, Domingos y Festivos: 11:30 a 19:00',
          nights: 'Noches de viernes y sábados hasta la 1:30h',
          parking:
            'Parking público de pago gestionado por el Ayuntamiento de Valencia. Acceso a través del Tinglado nº 5.',
          bike: 'Parking bicis disponible',
          directions: 'Cómo llegar',
          mapLabel: 'Mapa de ubicación de FRONT',
          addressHeading: 'Dirección',
          hoursHeading: 'Horario',
          transportHeading: 'Cómo llegar',
          busLabel: 'Bus',
          parkingLabel: 'Parking',
          bikeLabel: 'Bicis',
        }
      : {
          heading: 'LOCATION',
          address: 'The Terminal Hub, La Marina de Valencia',
          area: 'La Marina de Valencia, The Terminal Hub',
          weekday: 'Monday to Friday: 9:00 - 19:00',
          weekend: 'Saturdays, Sundays & Holidays: 11:30 - 19:00',
          nights: 'Friday and Saturday nights until 1:30 AM',
          parking: 'Public paid parking managed by Valencia City Council. Access through Tinglado nº 5.',
          bike: 'Bike parking available',
          directions: 'How to get there',
          mapLabel: 'Map showing FRONT location',
          addressHeading: 'Address',
          hoursHeading: 'Hours',
          transportHeading: 'Getting there',
          busLabel: 'Bus',
          parkingLabel: 'Parking',
          bikeLabel: 'Bikes',
        }

  const busLines =
    lang === 'es'
      ? [
          'Doctor J.J. Dòmine - Edifici del Rellotge: Líneas 4, 19, 92, 95, 99',
          'Avinguda del Port - Joan Verdeguer: Líneas 4, 30, 95, C3',
          'Manuel Soto Enginyer - Estació: Líneas 4, 19, 30, 92, 95, 99',
        ]
      : [
          'Doctor J.J. Dòmine - Edifici del Rellotge: Lines 4, 19, 92, 95, 99',
          'Avinguda del Port - Joan Verdeguer: Lines 4, 30, 95, C3',
          'Manuel Soto Enginyer - Estació: Lines 4, 19, 30, 92, 95, 99',
        ]

  const embedSrc =
    import.meta.env.PUBLIC_GOOGLE_MAPS_EMBED_URL ??
    'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3080.6!2d-0.3237!3d39.4501!2m2!1zNzAmNDcnMjUuMiJO!3sMCczOS41MCc1LjMiVw!3m3!1i1024!2i768!4f13.1!3m2!1s0xd604f4b7e4fa7c1%3A0x7e3a4f0d4d1c2f0a!2sThe+Terminal+Hub%2C+La+Marina+de+Valencia!5e0!3m2!1ses!2ses!4v1719000000000'

  useEffect(() => {
    if (mapLoaded) return
    const timeout = setTimeout(() => {
      if (!mapLoaded) setMapTimedOut(true)
    }, 15000)
    return () => clearTimeout(timeout)
  }, [mapLoaded])

  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
      id={lang === 'es' ? 'localizacion' : 'location'}
      aria-label={locationData.heading}
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black uppercase tracking-tight text-text-primary">{locationData.heading}</h2>
        <div className="mt-4 mx-auto w-16 h-[2px] bg-terracotta-400" aria-hidden="true"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Info */}
        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-text-primary mb-3 flex items-center gap-2">
              <svg
                className="w-4 h-4 text-terracotta-400 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {locationData.addressHeading}
            </h3>
            <p className="text-text-secondary">{locationData.address}</p>
            <p className="text-text-secondary">
              {postalCode} — {locationData.area}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-text-primary mb-3 flex items-center gap-2">
              <svg
                className="w-4 h-4 text-terracotta-400 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {locationData.hoursHeading}
            </h3>
            <ul className="space-y-1.5 text-text-secondary text-sm">
              <li>{locationData.weekday}</li>
              <li>{locationData.weekend}</li>
              <li className="text-terracotta-400 font-semibold">{locationData.nights}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-text-primary mb-3 flex items-center gap-2">
              <svg
                className="w-4 h-4 text-terracotta-400 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
              {locationData.transportHeading}
            </h3>
            <div className="space-y-3 text-sm text-text-muted">
              <div>
                <p className="text-text-secondary font-semibold uppercase tracking-wider text-xs mb-1.5">
                  {locationData.busLabel}
                </p>
                <ul className="space-y-1 ml-1">
                  {busLines.map((line, i) => (
                    <li key={i} className="leading-relaxed">
                      · {line}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="leading-relaxed">
                <span className="text-text-secondary font-semibold uppercase tracking-wider text-xs">
                  {locationData.parkingLabel}:
                </span>{' '}
                {locationData.parking}
              </p>
              <p className="leading-relaxed">
                <span className="text-text-secondary font-semibold uppercase tracking-wider text-xs">
                  {locationData.bikeLabel}:
                </span>{' '}
                {locationData.bike}
              </p>
            </div>
          </div>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-terracotta-500 hover:bg-terracotta-400 text-white font-semibold text-sm uppercase tracking-widest px-6 py-3 transition-all duration-300 hover:px-10"
          >
            {locationData.directions}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>

        {/* Map with skeleton placeholder */}
        <div
          className="relative aspect-square bg-concrete-900 border border-concrete-800 overflow-hidden"
          id="map-container"
        >
          {/* Skeleton shown until iframe loads */}
          {!mapLoaded && !mapTimedOut && (
            <div className="absolute inset-0 flex items-center justify-center bg-concrete-900" aria-hidden="true">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-concrete-700 border-t-terracotta-400 rounded-full animate-spin mx-auto mb-3"></div>
                <p className="text-xs uppercase tracking-widest text-text-muted">Cargando mapa…</p>
              </div>
            </div>
          )}
          {mapTimedOut && (
            <div className="absolute inset-0 flex items-center justify-center bg-concrete-900 z-10 p-8">
              <div className="text-center">
                <p className="text-sm text-text-secondary mb-3">
                  {lang === 'es' ? 'No se ha podido cargar el mapa.' : 'Could not load the map.'}
                </p>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-terracotta-400 hover:text-terracotta-300 underline"
                >
                  {lang === 'es' ? 'Abrir en Google Maps' : 'Open in Google Maps'}
                </a>
              </div>
            </div>
          )}
          <iframe
            title={locationData.mapLabel}
            className="w-full h-full border-0 relative z-10"
            loading="lazy"
            referrerPolicy="no-referrer"
            src={embedSrc}
            allowFullScreen
            onLoad={() => setMapLoaded(true)}
          ></iframe>
        </div>
      </div>
    </section>
  )
}
