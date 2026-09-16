import { describe, expect, it } from 'vitest'
import { analyzeDataset, extractDomains, findBrandMention } from './analyze'
import type { Brand, Dataset } from './types'

const brand: Brand = { id: 'acme', name: 'Acme AI', aliases: ['Acme'] }

describe('findBrandMention', () => {
  it('matches names and explicit aliases without case sensitivity', () => {
    expect(findBrandMention('ACME is useful. Acme AI is focused.', brand).positions).toEqual([0, 16])
  })

  it('does not match a brand inside another word', () => {
    expect(findBrandMention('The Acmeology method is unrelated.', brand).positions).toEqual([])
  })
})

describe('extractDomains', () => {
  it('normalizes and deduplicates visible URL domains', () => {
    expect(
      extractDomains('See https://www.Example.com/a, https://example.com/b and http://docs.test/path.'),
    ).toEqual(['example.com', 'docs.test'])
  })
})

describe('analyzeDataset', () => {
  const dataset: Dataset = {
    target: { ...brand, isTarget: true },
    competitors: [{ id: 'zen', name: 'ZenDeskly', aliases: ['Zen Deskly'] }],
    rows: [
      { id: '1', platform: 'ChatGPT', prompt: 'One', answer: 'ZenDeskly leads; Acme follows.' },
      { id: '2', platform: 'Claude', prompt: 'Two', answer: 'Zen Deskly is one option.' },
      { id: '3', platform: 'Gemini', prompt: 'Three', answer: 'Acme AI is the only tracked brand.' },
    ],
  }

  it('calculates rates, order, and target gaps', () => {
    const result = analyzeDataset(dataset)
    expect(result.brands.find((item) => item.id === 'acme')).toMatchObject({
      mentionedIn: 2,
      mentionRate: 67,
      firstMentionedIn: 1,
    })
    expect(result.brands.find((item) => item.id === 'zen')).toMatchObject({
      mentionedIn: 2,
      mentionRate: 67,
      firstMentionedIn: 2,
    })
    expect(result.gaps.map((row) => row.id)).toEqual(['2'])
    expect(result.rows[0].orderedBrandIds).toEqual(['zen', 'acme'])
  })
})
