import configPromise from '@payload-config'
import {
  GET as GETHandler,
  POST as POSTHandler,
  PATCH as PATCHHandler,
  DELETE as DELETEHandler,
} from '@payloadcms/next/routes'

export const GET = GETHandler(configPromise)
export const POST = POSTHandler(configPromise)
export const PATCH = PATCHHandler(configPromise)
export const DELETE = DELETEHandler(configPromise)
