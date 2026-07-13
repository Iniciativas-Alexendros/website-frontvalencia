import React from 'react'

interface Props {
  lang: 'es' | 'en'
}

const ClubBanner: React.FC<Props> = ({ lang }) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8" aria-label="The Club">
      <div className="max-w-5xl mx-auto bg-concrete-900 border border-concrete-800 p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-text-primary uppercase tracking-wide">
            {lang === 'es' ? 'The Club' : 'The Club'}
          </h2>
          <p className="mt-2 text-text-secondary">
            {lang === 'es'
              ? 'Únete a la comunidad FRONT. Eventos exclusivos, promociones y sorpresas.'
              : 'Join the FRONT community. Exclusive events, promotions and surprises.'}
          </p>
        </div>
        <a
          href="https://front.feending.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-terracotta-500 hover:bg-terracotta-400 text-white font-semibold text-sm uppercase tracking-widest px-8 py-3 transition-colors duration-fast shrink-0"
        >
          {lang === 'es' ? 'Descubrir' : 'Discover'}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </section>
  )
}

export default ClubBanner
