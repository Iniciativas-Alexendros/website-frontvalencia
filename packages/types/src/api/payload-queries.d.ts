// Tipos para queries y mutationes de Payload CMS

export interface CollectionQueries {
  Menu: string
  Space: string
  Allergen: string
  Event: string
  SiteConfig: string
}

export interface PayloadRESTResponse<T> {
  docs: T[]
  totalDocs: number
  totalPages: number
  page: number
  limit: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

export interface PayloadPopulateOptions {
  depth?: number
  select?: (keyof any)[]
  populate?: {
    [key: string]: boolean | PopulateOptions
  }
}

export interface PopulateOptions {
  depth?: number
  select?: (keyof any)[]
}
