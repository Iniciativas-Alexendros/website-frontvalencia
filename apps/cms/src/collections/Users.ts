import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access/isAdmin'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'name', 'roles', 'createdAt'],
    group: 'Admin',
  },
  access: {
    create: isAdmin,
    read: () => true,
    update: ({ req, id }) => {
      if (!req.user) return false
      if (req.user.roles?.includes('admin')) return true
      return req.user.id === id
    },
    delete: isAdmin,
    admin: ({ req }) => isAdmin({ req }),
  },
  auth: {
    tokenExpiration: 60 * 60 * 24 * 7, // 7 días
    cookies: {
      sameSite: 'None',
      secure: process.env.NODE_ENV === 'production',
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'roles',
      type: 'select',
      required: true,
      defaultValue: ['editor'],
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Viewer', value: 'viewer' },
      ],
      hasMany: true,
      access: {
        // Solo admins pueden leer/asignar roles
        read: ({ req }) => isAdmin({ req }),
        update: ({ req }) => isAdmin({ req }),
      },
    },
    {
      name: 'previewSecret',
      type: 'text',
      admin: {
        description: 'Token personal para preview mode (opcional)',
        condition: (data) => data?.roles?.includes('admin'),
      },
      access: {
        read: ({ req }) => isAdmin({ req }),
      },
    },
  ],
  timestamps: true,
}
