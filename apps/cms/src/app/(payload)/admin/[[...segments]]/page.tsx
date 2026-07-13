import configPromise from '@payload-config'
import { AdminPage } from '@payloadcms/next/views'
import type { Metadata } from 'next'
import { importMap } from '../importMap'

type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export const metadata: Metadata = {
  title: 'FRONT CMS — Admin',
}

const Page = ({ params, searchParams }: Args) => AdminPage({ config: configPromise, params, searchParams, importMap })

export default Page
