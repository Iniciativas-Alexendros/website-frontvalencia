import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { RootPage, generateMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap'

type Args = {
  params: Promise<{ params: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export const metadata: Metadata = generateMetadata({
  config: configPromise,
})

const Page = ({ params, searchParams }: Args) => RootPage({ config: configPromise, params, searchParams, importMap })

export default Page
