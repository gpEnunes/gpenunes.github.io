export type Project = {
  slug: string
  title: string
  url: string
  accent: string
  favicon: string
  order: number
  type: string
  typePt: string
  tags: string[]
  description: string
  descriptionPt: string
  highlights: string[]
  highlightsPt: string[]
}

export type WritingPost = {
  slug: string
  title: string
  description: string
  date: string
  image?: string
  readTime?: string
  category?: string
  tags: string[]
  body: string
}
