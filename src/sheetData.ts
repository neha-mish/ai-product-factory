import Papa from 'papaparse'
import type { Brand, Dataset } from './types'

export const PUBLISHED_SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQVUgX8UDmUIgiF3ukJBHlmELAkskPOCEbOGBwSDEBT0Bb-zO8zCX7tl6aIbT7lMa7VsjKBtD5VWhhb/pub?gid=0&single=true&output=csv'

type SheetRow = {
  id?: string
  platform?: string
  model?: string
  prompt?: string
  answer?: string
  response_url?: string
  collected_at?: string
  target_brand?: string
  target_aliases?: string
  competitors?: string
}

const splitTerms = (value = '') => value.split('|').map((item) => item.trim()).filter(Boolean)

const brandId = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const asBrand = (name: string): Brand => ({ id: brandId(name), name, aliases: [] })

export function parseSheetCsv(csv: string, sourceUrl = PUBLISHED_SHEET_URL): Dataset {
  const parsed = Papa.parse<SheetRow>(csv, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.trim(),
  })

  if (parsed.errors.length) throw new Error(`The sheet could not be parsed: ${parsed.errors[0].message}`)

  const rows = parsed.data.filter((row) => row.prompt?.trim() && row.answer?.trim())
  if (!rows.length) throw new Error('The sheet does not contain a complete prompt and answer yet.')

  const first = rows[0]
  const targetName = first.target_brand?.trim()
  const competitorNames = splitTerms(first.competitors)
  if (!targetName) throw new Error('The first complete row is missing target_brand.')
  if (!competitorNames.length) throw new Error('The first complete row is missing competitors.')

  return {
    target: {
      id: brandId(targetName),
      name: targetName,
      aliases: splitTerms(first.target_aliases),
      isTarget: true,
    },
    competitors: competitorNames.map(asBrand),
    rows: rows.map((row, index) => ({
      id: row.id?.trim() || `sheet-${index + 1}`,
      platform: row.platform?.trim() || 'Unknown platform',
      model: row.model?.trim(),
      prompt: row.prompt!.trim(),
      answer: row.answer!.trim(),
      responseUrl: row.response_url?.trim(),
      collectedAt: row.collected_at?.trim(),
    })),
    source: { kind: 'sheet', label: 'Published Google Sheet', url: sourceUrl },
  }
}

export async function loadPublishedSheet(url = PUBLISHED_SHEET_URL): Promise<Dataset> {
  const response = await fetch(url, { cache: 'no-store' })
  if (!response.ok) throw new Error(`Google Sheet returned ${response.status}.`)
  return parseSheetCsv(await response.text(), url)
}
