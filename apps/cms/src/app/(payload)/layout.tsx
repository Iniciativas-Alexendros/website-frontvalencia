import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { RootLayout } from '@payloadcms/next/layouts'

type Args = {
  children: React.ReactNode
  params: Promise<{ params: string[] }>
}

export const metadata: Metadata = {
  title: 'FRONT CMS',
  description: 'Payload CMS — FRONT Valencia',
}

const Layout = ({ children, params }: Args) => RootLayout({ children, config: configPromise, params, importMap: {} })

export default Layout
