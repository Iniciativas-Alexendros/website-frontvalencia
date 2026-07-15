import { useState, useEffect, useCallback } from 'react'

interface Props {
  lang: 'es' | 'en'
  site?: {
    externalLinks?: {
      reservations?: { es?: string; en?: string }
    }
    contact?: {
      phone?: string
      whatsapp?: string
      eventsEmail?: string
      reservationsEmail?: string
    }
  }
}

export default function ReservasSection({ lang, site }: Props) {
  const [modalOpen, setModalOpen] = useState(false)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [iframeTimedOut, setIframeTimedOut] = useState(false)

  const reservasText =
    lang === 'es'
      ? {
          heading: 'RESERVA',
          tagline: 'FRONT · COMER BIEN FRENTE A LA MARINA',
          description:
            'Menú de mediodía entre semana · Carta disponible todos los días · Menús de grupo disponibles bajo reserva.',
          cta: 'Reservar mesa',
          ctaSubtitle: 'Elige fecha, hora y comensales',
          schedule: 'Horario',
          weekday: 'De lunes a viernes: 9:00 a 19:00.',
          weekend: 'Sábados, domingos y festivos: 11:30 a 19:00.',
          nights: 'Noches de viernes y sábados hasta la 1:30h (desde el 8 de abril).',
          groups: 'Para grupos o eventos, también abrimos fuera de este horario. Consulta disponibilidad en',
          contact: 'Y si tienes cualquier duda, contáctanos por WhatsApp o teléfono en el',
          conditions: 'CONDICIONES DE RESERVA',
          conditionsText: [
            'Guardaremos tu mesa hasta 15 minutos después de la hora reservada por cortesía; pasado este tiempo, quedará liberada.',
            'No gestionamos reservas a través de redes sociales. Todas las reservas deben realizarse a través de nuestro sistema oficial (CoverManager) o contactando directamente con el restaurante.',
            'Para grupos de más de 8 personas, contáctanos en reservas@frontvalencia.com.',
            'Para eventos privados y de empresa, escríbenos a eventos@frontvalencia.com o llámanos al +34 965 020 349.',
            'Si necesitas cancelar o modificar tu reserva, por favor hazlo con al menos 24 horas de antelación a través del enlace que recibirás en tu email de confirmación.',
            'El menú del día está disponible de lunes a viernes (13:00-16:00). Los menús de grupo están disponibles bajo reserva previa para grupos de 8 o más personas.',
          ],
          whatsappCta: 'WhatsApp',
          loadingWidget: 'Cargando sistema de reservas…',
          closeModal: 'Cerrar',
        }
      : {
          heading: 'BOOK',
          tagline: 'FRONT · EAT WELL BY THE MARINA',
          description: 'Weekday lunch menu · Full menu available daily · Group menus available by reservation.',
          cta: 'Book a table',
          ctaSubtitle: 'Choose date, time and party size',
          schedule: 'Hours',
          weekday: 'Monday to Friday: 9:00 - 19:00.',
          weekend: 'Saturdays, Sundays & Holidays: 11:30 - 19:00.',
          nights: 'Friday and Saturday nights until 1:30 AM (from April 8).',
          groups: 'For groups or events, we also open outside these hours. Check availability at',
          contact: 'For any questions, contact us by WhatsApp or phone at',
          conditions: 'BOOKING CONDITIONS',
          conditionsText: [
            'We will hold your table for 15 minutes past the reserved time as a courtesy; after that, it will be released.',
            'We do not manage reservations through social media. All reservations must be made through our official system (CoverManager) or by contacting the restaurant directly.',
            'For groups of more than 8 people, contact reservas@frontvalencia.com.',
            'For private and corporate events, write to eventos@frontvalencia.com or call +34 965 020 349.',
            'If you need to cancel or modify your reservation, please do so at least 24 hours in advance via the link in your confirmation email.',
            'The daily menu is available Monday to Friday (13:00-16:00). Group menus are available by prior reservation for groups of 8 or more.',
          ],
          whatsappCta: 'WhatsApp',
          loadingWidget: 'Loading booking system…',
          closeModal: 'Close',
        }

  const widgetSrc =
    lang === 'es'
      ? (site?.externalLinks?.reservations?.es ??
        'https://www.covermanager.com/reservation/module_restaurant/restaurante-front-valencia/spanish')
      : (site?.externalLinks?.reservations?.en ??
        'https://www.covermanager.com/reservation/module_restaurant/restaurante-front-valencia/english')

  const phone = site?.contact?.phone ?? '+34 965 020 349'
  const phoneClean = (site?.contact?.whatsapp ?? '34965020349').replace(/\D/g, '')
  const eventsEmail = site?.contact?.eventsEmail ?? 'eventos@frontvalencia.com'

  const handleOpen = useCallback(() => {
    setModalOpen(true)
    setIframeLoaded(false)
    setIframeTimedOut(false)
    document.body.style.overflow = 'hidden'
  }, [])

  useEffect(() => {
    if (!modalOpen) return
    const timeout = setTimeout(() => {
      if (!iframeLoaded) setIframeTimedOut(true)
    }, 15000)
    return () => clearTimeout(timeout)
  }, [modalOpen, iframeLoaded])

  const handleClose = useCallback(() => {
    setModalOpen(false)
    document.body.style.overflow = ''
  }, [])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalOpen) handleClose()
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [modalOpen, handleClose])

  return (
    <>
      <section
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
        id={lang === 'es' ? 'reservas' : 'book'}
        aria-label={reservasText.heading}
      >
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black uppercase tracking-tight text-text-primary">{reservasText.heading}</h2>
          <div className="mt-4 mx-auto w-16 h-[2px] bg-terracotta-400" aria-hidden="true"></div>
          <p className="mt-6 text-xl text-terracotta-400 font-light tracking-widest uppercase">
            {reservasText.tagline}
          </p>
          <p className="mt-3 text-base text-text-secondary max-w-2xl mx-auto">{reservasText.description}</p>
        </div>

        {/* CTA Card */}
        <div className="mb-16 reveal">
          <div className="relative bg-concrete-900 border border-concrete-800 p-8 sm:p-12 text-center group hover:border-terracotta-400/30 transition-colors duration-500">
            {/* Decorative line */}
            <div className="w-12 h-[2px] bg-terracotta-400 mx-auto mb-6" aria-hidden="true"></div>

            {/* Icon */}
            <div className="mx-auto mb-6 w-16 h-16 flex items-center justify-center border border-concrete-700 group-hover:border-terracotta-400/50 transition-colors duration-500">
              <svg
                className="w-8 h-8 text-terracotta-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                />
              </svg>
            </div>

            <p className="text-sm text-text-muted uppercase tracking-widest mb-8">{reservasText.ctaSubtitle}</p>

            <button
              onClick={handleOpen}
              className="inline-flex items-center gap-3 bg-terracotta-500 hover:bg-terracotta-400 text-white font-bold text-lg uppercase tracking-widest px-10 py-4 transition-all duration-300 hover:px-12 focus:outline-none"
              aria-haspopup="dialog"
            >
              {reservasText.cta}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
              </svg>
            </button>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-2 gap-8 text-sm">
          {/* Schedule */}
          <div className="bg-concrete-900 p-6 border border-concrete-800 space-y-4 reveal">
            <div className="w-10 h-[2px] bg-terracotta-400" aria-hidden="true"></div>
            <h3 className="text-lg font-semibold text-text-primary uppercase tracking-[0.15em]">
              {reservasText.schedule}
            </h3>
            <ul className="space-y-1.5 text-text-secondary">
              <li>{reservasText.weekday}</li>
              <li>{reservasText.weekend}</li>
              <li className="text-terracotta-400 font-semibold">{reservasText.nights}</li>
            </ul>
            <p className="text-text-muted leading-relaxed">
              {reservasText.groups}{' '}
              <a
                href={`mailto:${eventsEmail}`}
                className="text-terracotta-400 hover:text-terracotta-300 underline underline-offset-2"
              >
                {eventsEmail}
              </a>
            </p>
            <p className="text-text-muted leading-relaxed">
              {reservasText.contact}{' '}
              <a href={`tel:${phoneClean}`} className="text-terracotta-400 hover:text-terracotta-300 font-semibold">
                {phone}
              </a>
            </p>
            <a
              href={`https://wa.me/${phoneClean}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 border border-concrete-600 hover:border-terracotta-400 text-concrete-200 hover:text-terracotta-400 font-semibold text-sm uppercase tracking-widest transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              {reservasText.whatsappCta}
            </a>
          </div>

          {/* Conditions */}
          <div className="bg-concrete-900 p-6 border border-concrete-800 space-y-4 reveal">
            <div className="w-10 h-[2px] bg-terracotta-400" aria-hidden="true"></div>
            <h3 className="text-lg font-semibold text-text-primary uppercase tracking-[0.15em]">
              {reservasText.conditions}
            </h3>
            <div className="space-y-3">
              {reservasText.conditionsText.map((clause, idx) => (
                <p key={idx} className="text-text-secondary leading-relaxed">
                  {clause}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={reservasText.heading}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-concrete-950/90 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <div className="relative w-full max-w-3xl bg-concrete-900 border border-concrete-700 shadow-2xl max-h-[90vh] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-concrete-800 shrink-0 bg-concrete-900">
              <div>
                <h3 className="text-lg font-bold uppercase tracking-wide text-text-primary">{reservasText.heading}</h3>
                <p className="text-xs text-text-muted mt-0.5">{reservasText.ctaSubtitle}</p>
              </div>
              <button
                onClick={handleClose}
                className="w-10 h-10 flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-concrete-800 transition-colors"
                aria-label={reservasText.closeModal}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Iframe container */}
            <div className="relative flex-1 min-h-0 bg-white">
              {!iframeLoaded && !iframeTimedOut && (
                <div className="absolute inset-0 flex items-center justify-center bg-concrete-900 z-10">
                  <div className="text-center">
                    <div className="w-8 h-8 border-2 border-concrete-700 border-t-terracotta-400 rounded-full animate-spin mx-auto mb-3"></div>
                    <p className="text-xs uppercase tracking-widest text-text-muted">{reservasText.loadingWidget}</p>
                  </div>
                </div>
              )}
              {iframeTimedOut && (
                <div className="absolute inset-0 flex items-center justify-center bg-concrete-900 z-10 p-8">
                  <div className="text-center">
                    <p className="text-sm text-text-secondary mb-3">
                      {lang === 'es'
                        ? 'No se ha podido cargar el sistema de reservas.'
                        : 'Could not load the booking system.'}
                    </p>
                    <p className="text-xs text-text-muted">
                      {lang === 'es' ? `Llama al ${phone} para reservar.` : `Call ${phone} to book.`}
                    </p>
                  </div>
                </div>
              )}
              <iframe
                title={reservasText.heading}
                src={widgetSrc}
                className="w-full h-full border-0"
                style={{ minHeight: '600px' }}
                referrerPolicy="no-referrer"
                onLoad={() => {
                  setIframeLoaded(true)
                  setIframeTimedOut(false)
                }}
                onError={() => {
                  setIframeTimedOut(true)
                  setIframeLoaded(false)
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
