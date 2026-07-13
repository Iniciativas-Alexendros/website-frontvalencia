import React from 'react'

interface Props {
  lang: 'es' | 'en'
  page: 'home' | 'menu' | 'space' | 'location' | 'book' | 'legal' | 'event'
  eventName?: string
  eventDate?: string
}

const StructuredData: React.FC<Props> = ({ lang, page, eventName, eventDate }) => {
  const siteUrl = 'https://frontvalencia.com'
  const locale = lang === 'es' ? 'es-ES' : 'en-US'

  // --- Organization ---
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${siteUrl}/#restaurant`,
    name: 'FRONT Valencia',
    url: siteUrl,
    image: `${siteUrl}/og-image.svg`,
    description:
      lang === 'es'
        ? 'Restaurante y terraza en La Marina de Valencia. Cocina mediterránea, arroces, brasas y cócteles frente al mar.'
        : 'Restaurant and terrace at La Marina de Valencia. Mediterranean cuisine, rice dishes, grilled meats, and cocktails by the sea.',
    servesCuisine: ['Mediterranean', 'Spanish', 'Valencian'],
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'C/Travesía, La Marina de Valencia',
      addressLocality: 'Valencia',
      postalCode: '46024',
      addressCountry: 'ES',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 39.4531,
      longitude: -0.3262,
    },
    telephone: '+34 965 020 349',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Monday',
        opens: '09:00',
        closes: '00:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Tuesday',
        opens: '09:00',
        closes: '00:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Wednesday',
        opens: '09:00',
        closes: '00:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Thursday',
        opens: '09:00',
        closes: '00:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Friday',
        opens: '09:00',
        closes: '02:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '02:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '09:00',
        closes: '00:00',
      },
    ],
    sameAs: ['https://www.instagram.com/frontvalencia'],
  }

  // --- WebSite ---
  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: 'FRONT Valencia — Restaurante y Terraza',
    description:
      lang === 'es'
        ? 'Restaurante y Terraza en La Marina de Valencia. Arroces, brasas, tapas y cócteles. Frente al mar, junto al Reloj del Puerto.'
        : 'Restaurant & Terrace at La Marina de Valencia. Rice dishes, grilled meats, tapas, and cocktails. Seaside dining.',
    inLanguage: locale,
    publisher: { '@id': `${siteUrl}/#restaurant` },
  }

  // --- BreadcrumbList ---
  const breadcrumbs: Record<string, { name: string; item: string }[]> = {
    home: [],
    menu: [
      { name: lang === 'es' ? 'Inicio' : 'Home', item: siteUrl },
      {
        name: lang === 'es' ? 'Carta' : 'Menu',
        item: `${siteUrl}/${lang}/carta`,
      },
    ],
    space: [
      { name: lang === 'es' ? 'Inicio' : 'Home', item: siteUrl },
      {
        name: lang === 'es' ? 'Espacio' : 'Space',
        item: `${siteUrl}/${lang}/espacio`,
      },
    ],
    location: [
      { name: lang === 'es' ? 'Inicio' : 'Home', item: siteUrl },
      {
        name: lang === 'es' ? 'Localización' : 'Location',
        item: `${siteUrl}/${lang}/localizacion`,
      },
    ],
    book: [
      { name: lang === 'es' ? 'Inicio' : 'Home', item: siteUrl },
      {
        name: lang === 'es' ? 'Reservas' : 'Book',
        item: `${siteUrl}/${lang}/reservas`,
      },
    ],
  }

  const breadcrumb = breadcrumbs[page] || []
  const breadcrumbList =
    breadcrumb.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumb.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.name,
            item: item.item,
          })),
        }
      : null

  // --- Current page schema ---
  let pageSchema: Record<string, unknown> | null = null
  if (eventName && eventDate) {
    pageSchema = {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: eventName,
      startDate: eventDate,
      location: { '@id': `${siteUrl}/#restaurant` },
    }
  }

  const schemas = [organization, website, breadcrumbList, pageSchema].filter(Boolean)

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemas.length === 1 ? schemas[0] : schemas),
      }}
    />
  )
}

export default StructuredData
