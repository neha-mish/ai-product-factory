import type { Analysis, Brand, BrandMention, Dataset, RowAnalysis } from './types'

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const termPattern = (term: string) => {
  const escaped = escapeRegExp(term.trim())
  return new RegExp(`(?<![\\p{L}\\p{N}])${escaped}(?![\\p{L}\\p{N}])`, 'giu')
}

export function findBrandMention(text: string, brand: Brand): BrandMention {
  const terms = [...new Set([brand.name, ...brand.aliases].map((term) => term.trim()).filter(Boolean))]
  const found: { position: number; term: string; length: number }[] = []

  for (const term of terms) {
    for (const match of text.matchAll(termPattern(term))) {
      if (typeof match.index === 'number') found.push({ position: match.index, term: match[0], length: match[0].length })
    }
  }

  const unique = found
    .sort((a, b) => a.position - b.position || b.length - a.length)
    .filter((item, index, items) => !items.slice(0, index).some((kept) =>
      item.position < kept.position + kept.length && kept.position < item.position + item.length,
    ))

  return {
    brandId: brand.id,
    positions: unique.map((item) => item.position),
    matchedTerms: unique.map((item) => item.term),
  }
}

export function extractDomains(text: string): string[] {
  const urls = text.match(/https?:\/\/[^\s<>()\[\]{}"']+/gi) ?? []
  const domains = urls.flatMap((raw) => {
    try {
      const cleaned = raw.replace(/[.,;:!?]+$/, '')
      return [new URL(cleaned).hostname.toLowerCase().replace(/^www\./, '')]
    } catch {
      return []
    }
  })
  return [...new Set(domains)]
}

export function analyzeDataset(dataset: Dataset): Analysis {
  const brands = [dataset.target, ...dataset.competitors]
  const completeRows = dataset.rows.filter((row) => row.prompt.trim() && row.answer.trim())

  const rows: RowAnalysis[] = completeRows.map((row) => {
    const mentions = brands.map((brand) => findBrandMention(row.answer, brand))
    const orderedBrandIds = mentions
      .filter((mention) => mention.positions.length)
      .sort((a, b) => a.positions[0] - b.positions[0])
      .map((mention) => mention.brandId)
    const targetMention = mentions.find((mention) => mention.brandId === dataset.target.id)
    const competitorPresent = mentions.some(
      (mention) => mention.brandId !== dataset.target.id && mention.positions.length > 0,
    )

    return {
      ...row,
      mentions,
      orderedBrandIds,
      domains: extractDomains(row.answer),
      targetMissingWithCompetitor: !targetMention?.positions.length && competitorPresent,
    }
  })

  const summaries = brands.map((brand) => {
    const relevant = rows.map((row) => row.mentions.find((mention) => mention.brandId === brand.id)!)
    const mentionedIn = relevant.filter((mention) => mention.positions.length > 0).length
    return {
      ...brand,
      mentionedIn,
      mentionRate: rows.length ? Math.round((mentionedIn / rows.length) * 100) : 0,
      firstMentionedIn: rows.filter((row) => row.orderedBrandIds[0] === brand.id).length,
      totalOccurrences: relevant.reduce((sum, mention) => sum + mention.positions.length, 0),
    }
  })

  const domainCounts = new Map<string, number>()
  rows.forEach((row) => row.domains.forEach((domain) => domainCounts.set(domain, (domainCounts.get(domain) ?? 0) + 1)))

  return {
    rowCount: rows.length,
    brands: summaries,
    rows,
    gaps: rows.filter((row) => row.targetMissingWithCompetitor),
    domains: [...domainCounts.entries()]
      .map(([domain, count]) => ({ domain, count }))
      .sort((a, b) => b.count - a.count || a.domain.localeCompare(b.domain)),
  }
}
