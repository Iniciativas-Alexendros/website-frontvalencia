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
  const reservasText =
    lang === 'es'
      ? {
          heading: 'RESERVA',
          tagline: 'FRONT · COMER BIEN FRENTE A LA MARINA',
          description:
            'Menú de mediodía entre semana · Carta disponible todos los días · Menús de grupo disponibles bajo reserva.',
          schedule: 'Horario',
          weekday: 'De lunes a viernes: 9:00 a 19:00.',
          weekend: 'Sábados, domingos y festivos: 11:30 a 19:00.',
          nights: 'Noches de viernes y sábados hasta la 1:30h (desde el 8 de abril).',
          groups: 'Para grupos o eventos, también abrimos fuera de este horario. Consulta disponibilidad en',
          contact: 'Y si tienes cualquier duda, contáctanos por WhatsApp o teléfono en el',
          conditions: 'CONDICIONES DE RESERVA',
          conditionsSummary: 'Lee las condiciones antes de reservar',
          conditionsText:
            'Guardaremos tu mesa hasta 15 minutos después de la hora reservada por cortesía; pasado este tiempo, quedará liberada. No gestionamos reservas a través de redes sociales. Para grupos de más de 8 personas, contáctanos en reservas@frontvalencia.com. Para eventos privados y de empresa, escríbenos a eventos@frontvalencia.com o llámanos al +34 965 020 349.',
          moreInfo: 'Ver condiciones completas',
          whatsappCta: 'WhatsApp',
          loadingWidget: 'Cargando sistema de reservas…',
        }
      : {
          heading: 'BOOK',
          tagline: 'FRONT · EAT WELL BY THE MARINA',
          description: 'Weekday lunch menu · Full menu available daily · Group menus available by reservation.',
          schedule: 'Hours',
          weekday: 'Monday to Friday: 9:00 - 19:00.',
          weekend: 'Saturdays, Sundays & Holidays: 11:30 - 19:00.',
          nights: 'Friday and Saturday nights until 1:30 AM (from April 8).',
          groups: 'For groups or events, we also open outside these hours. Check availability at',
          contact: 'For any questions, contact us by WhatsApp or phone at',
          conditions: 'BOOKING CONDITIONS',
          conditionsSummary: 'Read the conditions before booking',
          conditionsText:
            'We will hold your table for 15 minutes past the reserved time as a courtesy; after that, it will be released. We do not manage reservations through social media. For groups of more than 8 people, contact reservas@frontvalencia.com. For private and corporate events, write to eventos@frontvalencia.com or call +34 965 020 349.',
          moreInfo: 'View full conditions',
          whatsappCta: 'WhatsApp',
          loadingWidget: 'Loading booking system…',
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
  const reservationsEmail = site?.contact?.reservationsEmail ?? 'reservas@frontvalencia.com'

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto" id="reservas" aria-label={reservasText.heading}>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black uppercase tracking-tight text-text-primary">{reservasText.heading}</h2>
        <div className="mt-4 mx-auto w-16 h-[2px] bg-terracotta-400" aria-hidden="true"></div>
        <p className="mt-6 text-xl text-terracotta-400 font-light tracking-widest uppercase">{reservasText.tagline}</p>
        <p className="mt-3 text-base text-text-secondary max-w-2xl mx-auto">{reservasText.description}</p>
      </div>

      {/* CoverManager Widget (with skeleton) */}
      <div
        className="mb-12 relative bg-concrete-900 border border-concrete-800 min-h-[600px]"
        id="reservas-widget-container"
      >
        <div
          id="reservas-skeleton"
          className="absolute inset-0 flex items-center justify-center bg-concrete-900"
          aria-hidden="true"
        >
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-concrete-700 border-t-terracotta-400 rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-xs uppercase tracking-widest text-text-muted">{reservasText.loadingWidget}</p>
          </div>
        </div>
        <iframe
          title={reservasText.heading}
          src={widgetSrc}
          className="w-full h-[600px] border-0 relative z-10"
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={() => {
            const skeleton = document.getElementById('reservas-skeleton')
            if (skeleton) skeleton.remove()
          }}
        ></iframe>
      </div>

      {/* Info */}
      <div className="grid md:grid-cols-2 gap-8 text-sm">
        <div className="bg-concrete-900 p-6 border border-concrete-800 space-y-4">
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
          {/* WhatsApp button */}
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

        <div className="bg-concrete-900 p-6 border border-concrete-800 space-y-4">
          <div className="w-10 h-[2px] bg-terracotta-400" aria-hidden="true"></div>
          <h3 className="text-lg font-semibold text-text-primary uppercase tracking-[0.15em]">
            {reservasText.conditions}
          </h3>
          {/* Accordion: conditions summary collapsed by default */}
          <details className="group">
            <summary className="cursor-pointer text-text-secondary hover:text-terracotta-400 font-medium text-sm transition-colors list-none flex items-center justify-between">
              <span>{reservasText.conditionsSummary}</span>
              <svg
                className="w-4 h-4 transition-transform group-open:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p className="mt-3 text-text-secondary leading-relaxed">{reservasText.conditionsText}</p>
          </details>
          <a
            href={lang === 'es' ? '/es/condiciones-reserva' : '/en/booking-conditions'}
            className="inline-block text-terracotta-400 hover:text-terracotta-300 underline underline-offset-2 text-sm"
          >
            {reservasText.moreInfo} →
          </a>
        </div>
      </div>
    </section>
  )
}
