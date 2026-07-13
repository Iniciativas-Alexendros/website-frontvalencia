import type { Payload } from 'payload'

export async function seed(payload: Payload): Promise<void> {
  const { logger } = payload

  // ── 1. Allergens ──────────────────────────────────────────────
  logger.info('Seeding allergens…')

  const allergens = [
    { code: 1, name: { es: 'Gluten', en: 'Gluten' } },
    { code: 2, name: { es: 'Crustáceos', en: 'Crustaceans' } },
    { code: 3, name: { es: 'Huevos', en: 'Eggs' } },
    { code: 4, name: { es: 'Pescado', en: 'Fish' } },
    { code: 5, name: { es: 'Cacahuetes', en: 'Peanuts' } },
    { code: 6, name: { es: 'Soja', en: 'Soybeans' } },
    { code: 7, name: { es: 'Leche', en: 'Milk' } },
    { code: 8, name: { es: 'Frutos de cáscara', en: 'Tree nuts' } },
    { code: 9, name: { es: 'Apio', en: 'Celery' } },
    { code: 10, name: { es: 'Mostaza', en: 'Mustard' } },
    { code: 11, name: { es: 'Sésamo', en: 'Sesame' } },
    { code: 12, name: { es: 'Sulfitos', en: 'Sulphites' } },
    { code: 13, name: { es: 'Altramuces', en: 'Lupin' } },
    { code: 14, name: { es: 'Moluscos', en: 'Molluscs' } },
  ]

  for (const a of allergens) {
    try {
      await payload.create({ collection: 'allergens', data: a })
    } catch {
      logger.warn(`Allergen "${a.name.es}" already exists, skipping`)
    }
  }

  // ── 2. Admin user ─────────────────────────────────────────────
  logger.info('Seeding admin user…')

  try {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@frontvalencia.com',
        password: 'admin123',
        name: 'Admin',
        roles: ['admin'],
      },
    })
  } catch {
    logger.warn('Admin user already exists, skipping')
  }

  // ── 3. Menu categories ────────────────────────────────────────
  logger.info('Seeding menu categories…')

  const categories = [
    {
      name: { es: 'DESAYUNOS', en: 'BREAKFAST' },
      time: { es: '9:00H – 12:00H', en: '9:00AM – 12:00PM' },
      order: 1,
    },
    {
      name: { es: 'TAPAS', en: 'TAPAS' },
      time: { es: 'DESDE LAS 13H', en: 'FROM 1PM' },
      order: 2,
    },
    { name: { es: 'ENTRANTES', en: 'STARTERS' }, time: '', order: 3 },
    { name: { es: 'ENSALADAS', en: 'SALADS' }, time: '', order: 4 },
    { name: { es: 'ARROCES', en: 'RICE' }, time: '', order: 5 },
    { name: { es: 'BRASAS', en: 'GRILL' }, time: '', order: 6 },
    { name: { es: 'POSTRES', en: 'DESSERTS' }, time: '', order: 7 },
    { name: { es: 'COCKTAILS', en: 'COCKTAILS' }, time: '', order: 8 },
  ]

  for (const c of categories) {
    try {
      await payload.create({ collection: 'menu-categories', data: c })
    } catch {
      logger.warn(`Category "${c.name.es}" already exists, skipping`)
    }
  }

  // ── 4. Menu items ─────────────────────────────────────────────
  logger.info('Seeding menu items…')

  const { docs: catDocs } = await payload.find({
    collection: 'menu-categories',
    limit: 50,
    depth: 0,
  })
  const { docs: allDocs } = await payload.find({
    collection: 'allergens',
    limit: 50,
    depth: 0,
  })

  const cat = (slug: string) => catDocs.find((c) => c.name?.toLowerCase().includes(slug))?.id
  const a = (codes: number[]) => codes.map((c) => allDocs.find((a) => a.code === c)?.id).filter(Boolean)

  const menuItems = [
    // BREAKFAST
    {
      number: 1,
      name: { es: 'Tostada con tomate y AOVE', en: 'Tomato toast with EVOO' },
      price: '4,50€',
      category: cat('desayuno'),
      tags: ['vegano'],
    },
    {
      number: 2,
      name: { es: 'Croissant de mantequilla', en: 'Butter croissant' },
      price: '3,50€',
      category: cat('desayuno'),
      allergens: a([3, 7]),
    },
    {
      number: 3,
      name: { es: 'Huevos revueltos con trufa', en: 'Truffle scrambled eggs' },
      price: '9,50€',
      category: cat('desayuno'),
      allergens: a([3, 7]),
    },
    {
      number: 4,
      name: {
        es: 'Yogur griego con granola y fruta',
        en: 'Greek yogurt with granola & fruit',
      },
      price: '7,50€',
      category: cat('desayuno'),
      allergens: a([7, 8]),
      tags: ['ecologico'],
    },
    {
      number: 5,
      name: {
        es: 'Tortilla de patatas caramelizada',
        en: 'Caramelized potato omelette',
      },
      price: '8,00€',
      category: cat('desayuno'),
      allergens: a([3]),
    },
    {
      number: 6,
      name: { es: 'Zumo de naranja natural', en: 'Fresh orange juice' },
      price: '4,00€',
      category: cat('desayuno'),
      tags: ['vegano'],
    },

    // TAPAS
    {
      number: 7,
      name: {
        es: 'Patatas bravas con salsa brava y alioli',
        en: 'Patatas bravas & alioli',
      },
      price: '6,50€',
      category: cat('tapas'),
      tags: ['vegano'],
    },
    {
      number: 8,
      name: {
        es: 'Croquetas de jamón ibérico (4 uds)',
        en: 'Ibérico ham croquettes (4 pcs)',
      },
      price: '8,00€',
      category: cat('tapas'),
      allergens: a([3, 7]),
    },
    {
      number: 9,
      name: { es: 'Boquerones en vinagre', en: 'White anchovies in vinegar' },
      price: '7,50€',
      category: cat('tapas'),
      allergens: a([4, 12]),
    },
    {
      number: 10,
      name: {
        es: 'Tortilla de patatas con cebolla caramelizada',
        en: 'Spanish omelette with onion',
      },
      price: '7,00€',
      category: cat('tapas'),
      allergens: a([3]),
    },
    {
      number: 11,
      name: {
        es: 'Pulpo á feira sobre parmentier',
        en: 'Octopus á feira on potato cream',
      },
      price: '12,00€',
      category: cat('tapas'),
      allergens: a([14]),
    },
    {
      number: 12,
      name: { es: 'Gambas al ajillo', en: 'Garlic shrimp' },
      price: '10,50€',
      category: cat('tapas'),
      allergens: a([2]),
    },

    // STARTERS
    {
      number: 13,
      name: {
        es: 'Carpaccio de buey con parmesano y rúcula',
        en: 'Beef carpaccio with parmesan',
      },
      price: '14,00€',
      category: cat('entrantes'),
      allergens: a([3, 7]),
    },
    {
      number: 14,
      name: {
        es: 'Tartar de atún con aguacate y sésamo',
        en: 'Tuna tartare with avocado & sesame',
      },
      price: '15,00€',
      category: cat('entrantes'),
      allergens: a([4, 6, 11]),
    },
    {
      number: 15,
      name: {
        es: 'Vieiras gratinadas con bechamel',
        en: 'Gratinated scallops with béchamel',
      },
      price: '14,50€',
      category: cat('entrantes'),
      allergens: a([3, 7, 14]),
    },
    {
      number: 16,
      name: {
        es: 'Hummus de garbanzo con pimentón',
        en: 'Chickpea hummus with paprika',
      },
      price: '7,50€',
      category: cat('entrantes'),
      tags: ['vegano'],
    },
    {
      number: 17,
      name: { es: 'Calamar a la andaluza', en: 'Andalusian-style squid' },
      price: '9,00€',
      category: cat('entrantes'),
      allergens: a([1, 14]),
    },
    {
      number: 18,
      name: {
        es: 'Tabla de ibéricos y quesos',
        en: 'Ibérico meats & cheese board',
      },
      price: '16,00€',
      category: cat('entrantes'),
      allergens: a([3, 7]),
    },

    // SALADS
    {
      number: 19,
      name: {
        es: 'Ensalada verde con vinagreta de mostaza',
        en: 'Green salad with mustard vinaigrette',
      },
      price: '9,00€',
      category: cat('ensaladas'),
      allergens: a([10]),
      tags: ['vegano'],
    },
    {
      number: 20,
      name: {
        es: 'Ensalada de tomate heirloom y burrata',
        en: 'Heirloom tomato & burrata salad',
      },
      price: '11,00€',
      category: cat('ensaladas'),
      allergens: a([3, 7]),
    },
    {
      number: 21,
      name: {
        es: 'Ensalada de quinoa, aguacate y granada',
        en: 'Quinoa, avocado & pomegranate salad',
      },
      price: '10,50€',
      category: cat('ensaladas'),
      tags: ['vegano', 'sin-gluten'],
    },
    {
      number: 22,
      name: {
        es: 'Ensalada César con pollo crujiente',
        en: 'Caesar salad with crispy chicken',
      },
      price: '12,00€',
      category: cat('ensaladas'),
      allergens: a([1, 3, 7]),
    },

    // RICE
    {
      number: 23,
      name: { es: 'Paella Valenciana', en: 'Valencian paella' },
      price: '16,00€',
      category: cat('arroces'),
      allergens: a([4, 14]),
      note: { es: 'Mín. 2 personas', en: 'Min. 2 people' },
    },
    {
      number: 24,
      name: {
        es: 'Arroz negro con sepia y alioli',
        en: 'Black rice with cuttlefish & alioli',
      },
      price: '17,00€',
      category: cat('arroces'),
      allergens: a([2, 4, 14]),
      note: { es: 'Mín. 2 personas', en: 'Min. 2 people' },
    },
    {
      number: 25,
      name: { es: 'Arroz meloso de bogavante', en: 'Creamy lobster rice' },
      price: '22,00€',
      category: cat('arroces'),
      allergens: a([2]),
      note: { es: 'Mín. 2 personas', en: 'Min. 2 people' },
    },
    {
      number: 26,
      name: {
        es: 'Arroz vegetal con verduras de temporada',
        en: 'Seasonal vegetable rice',
      },
      price: '14,00€',
      category: cat('arroces'),
      tags: ['vegano'],
      note: { es: 'Mín. 2 personas', en: 'Min. 2 people' },
    },
    {
      number: 27,
      name: {
        es: 'Arroz caldoso con pato y setas',
        en: 'Brothy rice with duck & mushrooms',
      },
      price: '18,00€',
      category: cat('arroces'),
      allergens: a([8]),
      note: { es: 'Mín. 2 personas', en: 'Min. 2 people' },
    },
    {
      number: 28,
      name: { es: 'Fideuà de mariscos', en: 'Seafood noodle paella' },
      price: '17,00€',
      category: cat('arroces'),
      allergens: a([1, 2, 4]),
      note: { es: 'Mín. 2 personas', en: 'Min. 2 people' },
    },

    // GRILL
    {
      number: 29,
      name: {
        es: 'Entrecot de ternera a la brasa',
        en: 'Grilled beef entrecôte',
      },
      price: '22,00€',
      category: cat('brasas'),
    },
    {
      number: 30,
      name: {
        es: 'Presa ibérica con pimientos asados',
        en: 'Ibérico pork with roasted peppers',
      },
      price: '19,00€',
      category: cat('brasas'),
    },
    {
      number: 31,
      name: {
        es: 'Pollo de corral al limón y romero',
        en: 'Free-range chicken with lemon & rosemary',
      },
      price: '16,00€',
      category: cat('brasas'),
      tags: ['ecologico'],
    },
    {
      number: 32,
      name: {
        es: 'Berenjenas asadas con miso y sésamo',
        en: 'Grilled eggplant with miso & sesame',
      },
      price: '10,00€',
      category: cat('brasas'),
      allergens: a([6, 11]),
      tags: ['vegano'],
    },
    {
      number: 33,
      name: { es: 'Parrillada de verduras', en: 'Grilled vegetable platter' },
      price: '11,00€',
      category: cat('brasas'),
      tags: ['vegano', 'sin-gluten'],
    },
    {
      number: 34,
      name: { es: 'Chuletillas de cordero lechal', en: 'Milk-fed lamb chops' },
      price: '21,00€',
      category: cat('brasas'),
    },

    // DESSERTS
    {
      number: 35,
      name: { es: 'Tarta de queso vasca', en: 'Basque cheesecake' },
      price: '7,00€',
      category: cat('postres'),
      allergens: a([3, 7]),
    },
    {
      number: 36,
      name: { es: 'Crema catalana', en: 'Catalan cream' },
      price: '6,50€',
      category: cat('postres'),
      allergens: a([3, 7]),
    },
    {
      number: 37,
      name: {
        es: 'Coulant de chocolate con helado de vainilla',
        en: 'Chocolate fondant with vanilla ice cream',
      },
      price: '8,50€',
      category: cat('postres'),
      allergens: a([3, 7]),
    },
    {
      number: 38,
      name: { es: 'Sorbete de limón al cava', en: 'Lemon sorbet with cava' },
      price: '6,00€',
      category: cat('postres'),
      tags: ['sin-gluten'],
    },

    // COCKTAILS
    {
      number: 39,
      name: { es: 'Margarita clásica', en: 'Classic Margarita' },
      price: '10,00€',
      category: cat('cocktails'),
    },
    {
      number: 40,
      name: { es: 'Mojito de fresa', en: 'Strawberry Mojito' },
      price: '9,50€',
      category: cat('cocktails'),
    },
    {
      number: 41,
      name: { es: 'Negroni', en: 'Negroni' },
      price: '11,00€',
      category: cat('cocktails'),
    },
    {
      number: 42,
      name: { es: 'Espresso Martini', en: 'Espresso Martini' },
      price: '11,00€',
      category: cat('cocktails'),
    },
    {
      number: 43,
      name: { es: 'Aperol Spritz', en: 'Aperol Spritz' },
      price: '9,00€',
      category: cat('cocktails'),
    },
    {
      number: 44,
      name: { es: 'Cóctel de la casa (sin alcohol)', en: 'House mocktail' },
      price: '7,00€',
      category: cat('cocktails'),
      tags: ['vegano'],
    },
  ]

  for (const item of menuItems) {
    try {
      await payload.create({ collection: 'menu-items', data: item })
    } catch {
      logger.warn(`Menu item "${item.name.es}" already exists, skipping`)
    }
  }

  // ── 5. Site Config ────────────────────────────────────────────
  logger.info('Seeding site config…')

  try {
    await payload.updateGlobal({
      slug: 'site-config',
      data: {
        name: 'FRONT',
        tagline: { es: 'Restaurante y Terraza', en: 'Restaurant & Terrace' },
        description: {
          es: 'Cocina mediterránea en La Marina de Valencia. Arroces, brasas y productos locales frente al mar.',
          en: 'Mediterranean cuisine at La Marina de Valencia. Rice, grill & local produce by the sea.',
        },
        contact: {
          phone: '+34 965 020 349',
          whatsapp: '34965020349',
          email: 'hello@frontvalencia.com',
          reservationsEmail: 'reservas@frontvalencia.com',
          eventsEmail: 'eventos@frontvalencia.com',
        },
        location: {
          address: 'C/Travesía',
          city: 'Valencia',
          postalCode: '46024',
          area: 'La Marina de Valencia',
          mapsUrl: 'https://maps.app.goo.gl/FVnSVDYfv5XnNiU16',
        },
        hours: {
          weekday: { es: '09:00 – 00:00', en: '09:00 – 00:00' },
          weekend: { es: '09:00 – 01:00', en: '09:00 – 01:00' },
        },
        social: {
          instagram: 'https://www.instagram.com/frontvalencia',
        },
        externalLinks: {
          reservations: {
            provider: 'covermanager',
          },
          club: 'https://club.frontvalencia.com',
        },
      },
    })
  } catch (err) {
    logger.warn(`Site config could not be seeded: ${String(err)}`)
  }

  logger.info('Seed complete ✅')
}
