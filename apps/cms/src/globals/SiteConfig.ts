import type { GlobalConfig } from 'payload'
import { isAdmin } from '../access/isAdmin'
import { isAdminOrEditor } from '../access/isEditorOrAdmin'

export const SiteConfig: GlobalConfig = {
  slug: 'site-config',
  label: { es: 'Configuración Web', en: 'Site Configuration' },
  admin: { group: { es: 'Configuración', en: 'Configuration' } },
  access: { read: () => true, update: isAdmin },
  fields: [
    { name: 'name', type: 'text', defaultValue: 'FRONT' },
    { name: 'tagline', type: 'text', localized: true },
    { name: 'description', type: 'textarea', localized: true },
    { name: 'ogImage', type: 'upload', relationTo: 'media' },
    {
      name: 'contact',
      type: 'group',
      fields: [
        { name: 'phone', type: 'text', defaultValue: '+34 965 020 349' },
        { name: 'whatsapp', type: 'text', defaultValue: '34965020349' },
        {
          name: 'email',
          type: 'email',
          defaultValue: 'hello@frontvalencia.com',
        },
        {
          name: 'reservationsEmail',
          type: 'email',
          defaultValue: 'reservas@frontvalencia.com',
        },
        {
          name: 'eventsEmail',
          type: 'email',
          defaultValue: 'eventos@frontvalencia.com',
        },
      ],
    },
    {
      name: 'location',
      type: 'group',
      fields: [
        { name: 'address', type: 'text', defaultValue: 'C/Travesía' },
        { name: 'city', type: 'text', defaultValue: 'Valencia' },
        { name: 'postalCode', type: 'text', defaultValue: '46024' },
        { name: 'area', type: 'text', defaultValue: 'La Marina de Valencia' },
        {
          name: 'mapsUrl',
          type: 'text',
          defaultValue: 'https://maps.app.goo.gl/FVnSVDYfv5XnNiU16',
        },
        { name: 'mapsEmbed', type: 'text' },
        {
          name: 'transport',
          type: 'group',
          fields: [
            {
              name: 'bus',
              type: 'array',
              fields: [{ name: 'line', type: 'text' }],
            },
            { name: 'parking', type: 'textarea', localized: true },
            { name: 'bikeParking', type: 'text', localized: true },
          ],
        },
      ],
    },
    {
      name: 'hours',
      type: 'group',
      fields: [
        { name: 'weekday', type: 'text', localized: true },
        { name: 'weekend', type: 'text', localized: true },
        { name: 'nights', type: 'text', localized: true },
      ],
    },
    {
      name: 'social',
      type: 'group',
      fields: [
        {
          name: 'instagram',
          type: 'text',
          defaultValue: 'https://www.instagram.com/frontvalencia',
        },
        { name: 'facebook', type: 'text' },
      ],
    },
    {
      name: 'externalLinks',
      type: 'group',
      fields: [
        { name: 'club', type: 'text' },
        { name: 'careers', type: 'text' },
        {
          name: 'reservations',
          type: 'group',
          fields: [
            { name: 'provider', type: 'text', defaultValue: 'covermanager' },
            { name: 'es', type: 'text' },
            { name: 'en', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'seo',
      type: 'json',
      admin: {
        description: 'SEO metadata por locale. JSON con claves locale → { title, description }',
      },
    },
  ],
}
