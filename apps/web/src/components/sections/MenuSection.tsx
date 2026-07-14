import React from 'react'

interface MenuItem {
  number?: number
  name: string
  description?: string
  price?: string
  allergens?: number[]
  tags?: string[]
  note?: string
}

interface MenuCategory {
  name: string
  time?: string
  note?: string
  items: MenuItem[]
}

interface Props {
  categories: MenuCategory[]
  allergenLegend?: { code: number; name: string }[]
  lang: 'es' | 'en'
}

const MenuSection: React.FC<Props> = ({ categories, allergenLegend, lang }) => {
  // Build a code → name map for allergen lookups
  const allergenMap: Record<number, string> = {}
  ;(allergenLegend ?? []).forEach((a) => {
    allergenMap[a.code] = a.name
  })

  // Tag labels per language
  const tagLabels: Record<string, { es: string; en: string }> = {
    ecológico: { es: 'ECO', en: 'ECO' },
    'sin-gluten': { es: 'S. GLUTEN', en: 'GF' },
    vegano: { es: 'VEGANO', en: 'VEGAN' },
    picante: { es: 'PICANTE', en: 'HOT' },
  }

  // Detect if category is a group menu (contains "MENÚ" or "MENU" in name, but NOT daily menu)
  const isGroupMenu = (categoryName: string) => {
    const upperName = categoryName.toUpperCase()
    const isDaily = upperName.includes('MENÚ DEL DÍA') || upperName.includes('DAILY LUNCH MENU')
    return !isDaily && (upperName.includes('MENÚ') || upperName.includes('MENU'))
  }

  // Check if this is the breakfast category (first category)
  const isBreakfastCategory = (categoryName: string) => {
    const upperName = categoryName.toUpperCase()
    return upperName.includes('DESAYUNO') || upperName.includes('BREAKFAST')
  }

  // Check if this is the first lunch category (index 2 = ENSALADAS / GARDEN SALADS)
  const isFirstLunchCategory = (categoryName: string, index: number) => {
    return index === 2
  }

  // Check if this is the rice category
  const isRiceCategory = (categoryName: string) => {
    const upperName = categoryName.toUpperCase()
    return upperName.includes('ARROCES') || upperName.includes('RICE')
  }

  // Extract text inside parentheses from category name for styling
  const renderCategoryName = (name: string, isRice: boolean) => {
    if (!isRice) return <span>{name}</span>

    // For rice category, find text in parentheses and style it
    const parenMatch = name.match(/^(.*?)\s*(\([^)]+\))$/)
    if (!parenMatch) return <span>{name}</span>

    const [, mainText, parenText] = parenMatch
    return (
      <span>
        {mainText}
        <span className="ml-2 text-[0.6em] font-normal">{parenText}</span>
      </span>
    )
  }

  // Render group menu as cards with full description
  const renderGroupMenu = (category: MenuCategory) => (
    <div key={category.name} className="reveal">
      <div className="border-b border-concrete-700 pb-3 mb-8">
        <div className="w-10 h-[2px] bg-terracotta-400 mb-3" aria-hidden="true"></div>
        <div className="flex items-baseline justify-between gap-4 flex-wrap">
          <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-text-primary">{category.name}</h3>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {category.items.map((item, iIdx) => (
          <div
            key={iIdx}
            className="relative p-6 bg-concrete-900/30 border border-concrete-700 hover:border-terracotta-400/50 hover:bg-concrete-900/50 transition-all duration-300"
          >
            <div className="mb-4">
              <span className="text-xs font-mono text-terracotta-400 uppercase tracking-[0.15em]">{item.number}</span>
              <h4 className="mt-1 text-lg font-bold text-text-primary leading-snug">{item.name}</h4>
            </div>
            {item.description && (
              <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">{item.description}</p>
            )}
            {item.note && <p className="mt-3 text-xs text-text-muted italic">{item.note}</p>}
            {item.price && <p className="mt-4 text-lg font-semibold text-terracotta-400">{item.price}</p>}
          </div>
        ))}
      </div>
    </div>
  )

  // Render item name with special handling for markers
  const renderItemName = (name: string) => {
    const parts = name.split(/\s*(-\s*(?:A ESCOGER|A ELEGIR|A COMPARTIR|CHOOSE|TO SHARE)\s*-)\s*/i)
    if (parts.length === 1) return <span>{name}</span>
    return (
      <span>
        {parts.map((part, i) => {
          const isMarker = /^-\s*(?:A ESCOGER|A ELEGIR|A COMPARTIR|CHOOSE|TO SHARE)\s*-/i.test(part)
          return isMarker ? (
            <span key={i}>
              <br />
              <span className="text-[0.6em] font-normal text-text-muted tracking-wider">{part}</span>
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        })}
      </span>
    )
  }

  // Render regular menu category as list
  const renderRegularMenu = (category: MenuCategory, cIdx: number) => {
    return (
      <div key={cIdx} className="reveal">
        <div className="border-b border-concrete-700 pb-3 mb-8">
          <div className="w-10 h-[2px] bg-terracotta-400 mb-3" aria-hidden="true"></div>
          <div className="flex items-baseline justify-between gap-4 flex-wrap">
            <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-text-primary">
              {renderCategoryName(category.name, isRiceCategory(category.name))}
            </h3>
            {category.time && (
              <span className="text-xs font-semibold text-terracotta-400 uppercase tracking-[0.2em]">
                {category.time}
              </span>
            )}
          </div>
          {category.note && <p className="mt-2 text-sm text-text-secondary italic">{category.note}</p>}
        </div>

        <div className="space-y-1">
          {category.items.map((item, iIdx) => (
            <div
              key={iIdx}
              className="group relative pl-4 pr-2 py-3 -ml-4 hover:bg-concrete-900/40 border-l-2 border-transparent hover:border-l-terracotta-400 transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                {item.number && (
                  <span className="text-xs font-mono text-text-muted mt-1 tabular-nums w-5 text-right shrink-0">
                    {String(item.number)}
                  </span>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3">
                    <h4 className="text-base font-semibold text-text-primary leading-snug">
                      {renderItemName(item.name)}
                    </h4>
                    {item.tags && item.tags.length > 0 && (
                      <span className="inline-flex items-center gap-1 shrink-0">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-block text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 border border-concrete-600 text-text-muted"
                          >
                            {lang === 'es' ? (tagLabels[tag]?.es ?? tag) : (tagLabels[tag]?.en ?? tag)}
                          </span>
                        ))}
                      </span>
                    )}
                    <span
                      className="flex-1 border-b border-dotted border-concrete-700 translate-y-[-2px]"
                      aria-hidden="true"
                    ></span>
                    {item.price && (
                      <span className="text-sm font-semibold text-terracotta-400 whitespace-nowrap tabular-nums shrink-0">
                        {item.price}
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <p className="mt-1 text-sm text-text-secondary leading-relaxed whitespace-pre-line">
                      {item.description}
                    </p>
                  )}
                  {item.note && <p className="mt-1 text-xs text-text-muted italic">{item.note}</p>}
                  {item.allergens && item.allergens.length > 0 && (
                    <p className="mt-1 text-[11px] text-text-muted uppercase tracking-wider">
                      {item.allergens
                        .map((code) => {
                          const name = allergenMap[code]
                          return name ? `${code}. ${name}` : `${code}`
                        })
                        .join(' · ')}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
      id="carta"
      aria-label={lang === 'es' ? 'Carta' : 'Menu'}
    >
      <div className="text-center mb-16">
        <h2
          className="text-4xl font-black uppercase tracking-tight text-text-primary"
          style={{ viewTransitionName: 'carta-title' }}
        >
          {lang === 'es' ? 'Carta' : 'Menu'}
        </h2>
        <div className="mt-4 mx-auto w-16 h-[2px] bg-terracotta-400" aria-hidden="true"></div>
      </div>

      {categories.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-concrete-700">
          <p className="text-text-muted text-lg">
            {lang === 'es'
              ? 'El menú no está disponible en este momento. Consulte nuestra carta en el restaurante.'
              : 'The menu is temporarily unavailable. Please check our menu at the restaurant.'}
          </p>
        </div>
      ) : (
        <div className="space-y-20">
          {categories.map((category, cIdx) => {
            const isBreakfast = isBreakfastCategory(category.name)
            const isFirstLunch = isFirstLunchCategory(category.name, cIdx)

            return (
              <React.Fragment key={cIdx}>
                {isBreakfast && cIdx === 0 && (
                  <div className="text-center mb-12">
                    <div className="w-10 h-[2px] bg-terracotta-400 mx-auto mb-4" aria-hidden="true"></div>
                    <p className="text-sm font-semibold text-terracotta-400 uppercase tracking-[0.2em] max-w-xl mx-auto">
                      {lang === 'es' ? 'A partir de las 9:00h' : 'From 9:00am'}
                    </p>
                  </div>
                )}
                {isFirstLunch && (
                  <div className="text-center mb-12">
                    <div className="w-10 h-[2px] bg-terracotta-400 mx-auto mb-4" aria-hidden="true"></div>
                    <p className="text-sm font-semibold text-terracotta-400 uppercase tracking-[0.2em] max-w-xl mx-auto">
                      {lang === 'es' ? 'Disponible desde las 13:00h' : 'Available from 1:00pm'}
                    </p>
                  </div>
                )}
                {isGroupMenu(category.name) ? renderGroupMenu(category) : renderRegularMenu(category, cIdx)}
              </React.Fragment>
            )
          })}
        </div>
      )}

      {allergenLegend && allergenLegend.length > 0 && (
        <div className="mt-20 pt-8 border-t border-concrete-700">
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-text-secondary mb-4">
            {lang === 'es' ? 'Alérgenos' : 'Allergens'}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-2 text-xs text-text-muted">
            {allergenLegend.map((a) => (
              <span key={a.code}>
                <span className="font-mono text-text-secondary">{a.code}</span> · {a.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

export default MenuSection
