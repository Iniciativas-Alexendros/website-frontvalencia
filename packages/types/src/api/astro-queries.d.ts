// Tipos para queries y mutationes de Astro

import type { GetStaticPathsResult } from 'astro'
import type { MenuData, SiteConfig } from '../domain'

export interface AstroPageProps {
  params: any
  data: any
}

export interface MenuPageData {
  menuData: MenuData
  siteConfig: SiteConfig
}

export interface SSGPathsResult {
  params: {
    lang: string
  }
  segments: string[]
}

export interface ContentCollection {
  Menu: string
  Site: string
}
