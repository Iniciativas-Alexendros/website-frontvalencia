import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '../access/isEditorOrAdmin'
import { isAdmin } from '../access/isAdmin'

const SPACES_SELECT = [
  {
    label: { es: 'Terraza cubierta', en: 'Covered terrace' },
    value: 'terraza',
  },
  { label: { es: 'Lounge', en: 'Lounge' }, value: 'lounge' },
  {
    label: { es: 'Cocktails Bar', en: 'Cocktails Bar' },
    value: 'cocktail-bar',
  },
  { label: { es: 'Comedor interior', en: 'Dining room' }, value: 'comedor' },
  {
    label: { es: 'Acceso terraza fin de semana', en: 'Weekend terrace' },
    value: 'terraza-fin-semana',
  },
]

export const Space: CollectionConfig = {
  slug: 'spaces',
  labels: {
    singular: { es: 'Espacio', en: 'Space' },
    plural: { es: 'Espacios', en: 'Spaces' },
  },
  admin: {
    group: { es: 'Contenido', en: 'Content' },
    useAsTitle: 'heading',
    defaultColumns: ['heading', 'updatedAt'],
  },
  access: {
    create: isAdminOrEditor,
    read: () => true,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        placeholder: 'COMER FRENTE AL MAR, DENTRO DE UNA JOYA BRUTALISTA.',
      },
    },
    {
      name: 'intro',
      type: 'richText',
      localized: true,
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
    },
    {
      name: 'spaces',
      type: 'select',
      hasMany: true,
      options: SPACES_SELECT,
      admin: { isClearable: true },
    },
    {
      name: 'gallery',
      type: 'array',
      labels: {
        singular: { es: 'Imagen', en: 'Image' },
        plural: { es: 'Galería', en: 'Gallery' },
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
          localized: true,
        },
        {
          name: 'large',
          type: 'checkbox',
          defaultValue: false,
          admin: { description: 'Ocupa 2 columnas en el grid masonry' },
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      label: { es: 'CTA (Eventos privados)', en: 'CTA (Private events)' },
      fields: [
        {
          name: 'text',
          type: 'text',
          localized: true,
          defaultValue: {
            es: '¿Tienes un evento privado en mente?',
            en: 'Have a private event in mind?',
          },
        },
        {
          name: 'email',
          type: 'email',
          defaultValue: 'eventos@frontvalencia.com',
        },
      ],
    },
  ],
}
