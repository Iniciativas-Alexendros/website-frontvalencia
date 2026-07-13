import type { Access } from 'payload'

/**
 * Admins o editors pueden realizar la operación.
 * Si no hay rol editor definido, usar solo admin.
 *
 * Uso en collections:
 * ```ts
 * import { isAdminOrEditor } from '../access/isEditorOrAdmin';
 *
 * export const SomeCollection: CollectionConfig = {
 *   slug: 'some',
 *   access: {
 *     create: isAdminOrEditor,
 *     update: isAdminOrEditor,
 *     delete: isAdmin, // solo admin puede eliminar
 *     read: () => true,
 *   },
 *   fields: [...]
 * }
 * ```
 */
export const isAdminOrEditor: Access = ({ req }) => {
  if (!req.user) return false
  const roles = (req.user as { roles?: string[] }).roles
  if (!Array.isArray(roles)) return false
  return roles.includes('admin') || roles.includes('editor')
}

/**
 * Cualquier usuario autenticado (admin, editor, viewer).
 */
export const isAuthenticated: Access = ({ req }) => !!req.user
