import React from 'react'

interface Props {
  lang: 'es' | 'en'
}

const EspacioSection: React.FC<Props> = ({ lang }) => {
  const text =
    lang === 'es'
      ? {
          heading: 'COMER FRENTE AL MAR, EN UNA JOYA CON ARQUITECTURA DE ESTILO BRUTALISTA.',
          intro:
            'La Marina de Valencia vibra con un nuevo actor en su ecosistema de innovación. No es un proyecto tech más: es diseño, gastronomía y creatividad disruptiva. Grupo El Alto y Groovelives Team se han unido para dar vida a FRONT, el nuevo espacio gastronómico que marca tendencia en The Terminal Hub.',
          desc: 'Groovelives Team, expertos en crear experiencias donde se cruzan música, arte y cultura, junto a El Alto, con más de 40 años de trayectoria en gastronomía sostenible, presentan una propuesta que va más allá de la comida. FRONT se integra con la arquitectura brutalista del edificio y lo transforma en un lugar para disfrutar frente al mar, conectar y formar parte de la Valencia creativa.',
          cta: '¿Tienes un evento privado en mente?',
          contact: 'Contáctanos',
          spaces: ['Terraza cubierta', 'Lounge', 'Cocktails Bar', 'Acceso terraza fin de semana'],
          spacesHeading: 'Espacios',
          galleryAria: 'Galería del espacio',
        }
      : {
          heading: 'DINING BY THE SEA, INSIDE A BRUTALIST GEM.',
          intro:
            "La Marina de Valencia welcomes a new player in its innovation ecosystem. It's not another tech project: it's design, gastronomy, and disruptive creativity. Grupo El Alto and Groovelives Team have joined forces to create FRONT, the trendsetting gastronomic space at The Terminal Hub.",
          desc: "Groovelives Team, experts in creating experiences where music, art, and culture intersect, alongside El Alto, with over 40 years of sustainable gastronomy, present a proposal that goes beyond food. FRONT integrates with the building's brutalist architecture and transforms it into a place to enjoy the seafront, connect, and be part of creative Valencia.",
          cta: 'Have a private event in mind?',
          contact: 'Contact us',
          spaces: ['Covered terrace', 'Lounge', 'Cocktails Bar', 'Weekend terrace access'],
          spacesHeading: 'Spaces',
          galleryAria: 'Space gallery',
        }

  const galleryImages =
    lang === 'es'
      ? [
          {
            src: '/images/espacio/Rectangle-96.png',
            alt: 'Interior del restaurante FRONT',
            w: 1600,
            h: 1200,
            large: true,
          },
          {
            src: '/images/espacio/Rectangle-97.png',
            alt: 'Terraza cubierta de FRONT',
            w: 800,
            h: 600,
          },
          {
            src: '/images/espacio/Rectangle-98.png',
            alt: 'Barra de cócteles de FRONT',
            w: 800,
            h: 600,
          },
          {
            src: '/images/espacio/EXT.png',
            alt: 'Exterior de FRONT en La Marina',
            w: 800,
            h: 600,
          },
          {
            src: '/images/espacio/GENERAL-3.jpg',
            alt: 'Vista general del espacio FRONT',
            w: 800,
            h: 600,
          },
        ]
      : [
          {
            src: '/images/espacio/Rectangle-96.png',
            alt: 'FRONT restaurant interior',
            w: 1600,
            h: 1200,
            large: true,
          },
          {
            src: '/images/espacio/Rectangle-97.png',
            alt: 'FRONT covered terrace',
            w: 800,
            h: 600,
          },
          {
            src: '/images/espacio/Rectangle-98.png',
            alt: 'FRONT cocktail bar',
            w: 800,
            h: 600,
          },
          {
            src: '/images/espacio/EXT.png',
            alt: 'FRONT exterior at La Marina',
            w: 800,
            h: 600,
          },
          {
            src: '/images/espacio/GENERAL-3.jpg',
            alt: 'FRONT space general view',
            w: 800,
            h: 600,
          },
        ]

  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
      id={lang === 'es' ? 'espacio' : 'space'}
      aria-label={lang === 'es' ? 'Espacio' : 'Space'}
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-text-primary max-w-3xl mx-auto leading-tight">
          {text.heading}
        </h2>
        <div className="mt-6 mx-auto w-16 h-[2px] bg-terracotta-400" aria-hidden="true"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div className="space-y-6">
          <p className="text-base text-text-secondary leading-relaxed">{text.intro}</p>
          <p className="text-base text-text-secondary leading-relaxed">{text.desc}</p>
        </div>
        <div className="space-y-6">
          <div className="bg-concrete-900 p-6 border border-concrete-800">
            <div className="w-10 h-[2px] bg-terracotta-400 mb-4" aria-hidden="true"></div>
            <h3 className="text-lg font-semibold text-text-primary mb-4 uppercase tracking-[0.15em]">
              {text.spacesHeading}
            </h3>
            <ul className="space-y-3">
              {text.spaces.map((space, idx) => (
                <li key={idx} className="flex items-center gap-3 text-text-secondary">
                  <span className="w-1.5 h-1.5 bg-terracotta-400 shrink-0" aria-hidden="true"></span>
                  {space}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-concrete-900 p-6 border border-concrete-800">
            <div className="w-10 h-[2px] bg-terracotta-400 mb-4" aria-hidden="true"></div>
            <p className="text-sm text-text-muted mb-3">{text.cta}</p>
            <a
              href="mailto:eventos@frontvalencia.com"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-terracotta-500 hover:bg-terracotta-400 text-white font-semibold uppercase tracking-wider text-sm transition-colors"
            >
              {text.contact}
            </a>
          </div>
        </div>
      </div>

      {/* Gallery Grid (masonry-like) */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3" role="list" aria-label={text.galleryAria}>
        {galleryImages.map((img, i) => (
          <div
            key={i}
            className={
              'relative aspect-[4/3] overflow-hidden bg-concrete-900 border group ' +
              (img.large ? 'md:col-span-2 md:row-span-2 md:aspect-square' : '')
            }
            role="listitem"
          >
            <img
              src={img.src}
              alt={img.alt}
              width={img.w}
              height={img.h}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
            {/* Hover overlay with magnifier */}
            <div className="absolute inset-0 bg-concrete-950/0 group-hover:bg-concrete-950/40 transition-colors duration-500 flex items-center justify-center pointer-events-none">
              <svg
                className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default EspacioSection
