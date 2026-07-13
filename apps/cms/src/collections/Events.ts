import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access/isAdmin'
import { isAdminOrEditor } from '../access/isEditorOrAdmin'

export const Events: CollectionConfig = {
  slug: 'events',
  labels: {
    singular: { es: 'Evento', en: 'Event' },
    plural: { es: 'Eventos', en: 'Events' },
  },
  admin: {
    group: { es: 'Contenido', en: 'Content' },
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'time', 'published'],
  },
  access: {
    create: isAdminOrEditor,
    read: () => true,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' } },
    },
    {
      name: 'time',
      type: 'text',
      admin: { placeholder: '20:00 - 23:00' },
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
    },
    {
      name: 'images',
      type: 'array',
      labels: {
        singular: { es: 'Imagen', en: 'Image' },
        plural: { es: 'Imágenes', en: 'Images' },
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        { name: 'alt', type: 'text', localized: true },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      label: { es: 'CTA', en: 'CTA' },
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
          defaultValue: { es: 'Reservar', en: 'Book now' },
        },
        {
          name: 'url',
          type: 'text',
          admin: { placeholder: 'https://covermanager.com/...' },
        },
      ],
    },
  ],
}
