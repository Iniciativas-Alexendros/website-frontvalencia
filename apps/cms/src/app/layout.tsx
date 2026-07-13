import type { Metadata } from 'next'
import './importMap'

export const metadata: Metadata = {
  title: 'FRONT CMS',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
