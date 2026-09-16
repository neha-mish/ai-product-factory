export type Brand = {
  id: string
  name: string
  aliases: string[]
  isTarget?: boolean
}

export type AnswerRow = {
  id: string
  prompt: string
  platform: string
  answer: string
}

export type Dataset = {
  target: Brand
  competitors: Brand[]
  rows: AnswerRow[]
}

export type BrandMention = {
  brandId: string
  positions: number[]
  matchedTerms: string[]
}

export type RowAnalysis = AnswerRow & {
  mentions: BrandMention[]
  orderedBrandIds: string[]
  domains: string[]
  targetMissingWithCompetitor: boolean
}

export type BrandSummary = Brand & {
  mentionedIn: number
  mentionRate: number
  firstMentionedIn: number
  totalOccurrences: number
}

export type Analysis = {
  rowCount: number
  brands: BrandSummary[]
  rows: RowAnalysis[]
  gaps: RowAnalysis[]
  domains: { domain: string; count: number }[]
}
