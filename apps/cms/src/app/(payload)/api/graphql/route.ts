import configPromise from '@payload-config'
import { GET as GETHandler, POST as POSTHandler } from '@payloadcms/next/routes'

export const GET = GETHandler(configPromise)
export const POST = POSTHandler(configPromise)
