import { describe, expect, it } from 'vitest'
import { parseSheetCsv } from './sheetData'

describe('Google Sheet import', () => {
  it('parses a quoted multiline answer and filters planned blank rows', () => {
    const csv = `id,platform,model,prompt,answer,response_url,collected_at,target_brand,target_aliases,competitors
one,OpenAI,GPT Test,Which tool?,"Line one.
Profound appears on line two.",https://example.com/share,16-09-2026,Writesonic,WriteSonic|Write Sonic,Semrush|Ahrefs|Profound
two,Gemini,Test,,,,16-09-2026,Writesonic,WriteSonic|Write Sonic,Semrush|Ahrefs|Profound`

    const dataset = parseSheetCsv(csv, 'https://example.com/data.csv')

    expect(dataset.target).toMatchObject({ name: 'Writesonic', aliases: ['WriteSonic', 'Write Sonic'] })
    expect(dataset.competitors.map((brand) => brand.name)).toEqual(['Semrush', 'Ahrefs', 'Profound'])
    expect(dataset.rows).toHaveLength(1)
    expect(dataset.rows[0]).toMatchObject({
      platform: 'OpenAI',
      model: 'GPT Test',
      answer: 'Line one.\nProfound appears on line two.',
      responseUrl: 'https://example.com/share',
      collectedAt: '16-09-2026',
    })
  })

  it('rejects a sheet with no complete response', () => {
    expect(() => parseSheetCsv('id,prompt,answer,target_brand,competitors\none,,,,')).toThrow(/complete prompt and answer/)
  })
})
