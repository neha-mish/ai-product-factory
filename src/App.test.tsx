import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'

const sheetCsv = `id,platform,model,prompt,answer,response_url,collected_at,target_brand,target_aliases,competitors
chatgpt-01,OpenAI,GPT Test,Which tools?,"Profound and Ahrefs are visible.",https://example.com/share,16-09-2026,Writesonic,WriteSonic|Write Sonic,Semrush|Ahrefs|Profound`

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, text: async () => sheetCsv }))
})

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

describe('AnswerLens app', () => {
  it('loads and analyzes the published experiment', async () => {
    render(<App />)
    await waitFor(() => expect(screen.getByText('Real observed experiment loaded')).toBeTruthy())
    expect(screen.getByText(/1 answer · 1 AI platform/)).toBeTruthy()
    expect(screen.getByText('Where visibility drops')).toBeTruthy()
    expect(screen.getByText('Trace every signal to its source')).toBeTruthy()
  })

  it('allows the reviewer to enter the dataset editor', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Edit this dataset' }))
    expect(screen.getByRole('heading', { name: /Bring the answers/ })).toBeTruthy()
    expect(screen.getByLabelText('Target brand')).toBeTruthy()
  })
})
