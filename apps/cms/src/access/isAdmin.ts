import type { Access } from 'payload'

/**
 * Solo admins pueden realizar la operación.
 *
 * Uso en collections:
 * ```ts
 * import { isAdmin } from '../access/isAdmin';
 *
 * export const SomeCollection: CollectionConfig = {
 *   slug: 'some',
 *   access: {
 *     create: isAdmin,
 *     delete: isAdmin,
 *     read: () => true,
 *     update: isAdmin,
 *   },
 *   fields: [...]
 * }
 * ```
 */
export const isAdmin: Access = ({ req }) => {
  if (!req.user) return false
  return Array.isArray(req.user.roles) && req.user.roles.includes('admin')
}

/**
 * Helper para admin panel route (no confundir con collection access).
 */
export const isAdminPanel: Access = ({ req }) => isAdmin({ req })
