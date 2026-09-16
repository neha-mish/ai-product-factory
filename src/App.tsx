import { useEffect, useMemo, useState } from 'react'
import { analyzeDataset } from './analyze'
import { sampleData } from './sampleData'
import { loadPublishedSheet } from './sheetData'
import type { AnswerRow, Brand, Dataset } from './types'

const cloneSample = (): Dataset => JSON.parse(JSON.stringify(sampleData))

const uid = () => Math.random().toString(36).slice(2, 10)

function aliasesToText(brand: Brand) {
  return brand.aliases.join(', ')
}

function updateBrand(brand: Brand, patch: Partial<Brand>): Brand {
  return { ...brand, ...patch }
}

function Icon({ name }: { name: 'lens' | 'arrow' | 'check' | 'plus' | 'trash' | 'spark' }) {
  const paths = {
    lens: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/></>,
    arrow: <><path d="M5 12h14"/><path d="m14 7 5 5-5 5"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    plus: <><path d="M12 5v14"/><path d="M5 12h14"/></>,
    trash: <><path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="m7 7 1 13h8l1-13"/></>,
    spark: <><path d="m12 3 1.2 4.8L18 9l-4.8 1.2L12 15l-1.2-4.8L6 9l4.8-1.2L12 3Z"/><path d="m19 15 .6 2.4L22 18l-2.4.6L19 21l-.6-2.4L16 18l2.4-.6L19 15Z"/></>,
  }
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>
}

export default function App() {
  const [dataset, setDataset] = useState<Dataset>(cloneSample)
  const [sheetState, setSheetState] = useState<'loading' | 'loaded' | 'error'>('loading')
  const [sheetError, setSheetError] = useState('')
  const [mode, setMode] = useState<'results' | 'input'>('results')
  const [sourceFilter, setSourceFilter] = useState<string>('all')
  const [methodOpen, setMethodOpen] = useState(false)

  useEffect(() => {
    let active = true
    loadPublishedSheet()
      .then((loaded) => {
        if (!active) return
        setDataset(loaded)
        setSheetState('loaded')
      })
      .catch((error: unknown) => {
        if (!active) return
        setSheetError(error instanceof Error ? error.message : 'The published sheet could not be loaded.')
        setSheetState('error')
      })
    return () => { active = false }
  }, [])

  const analysis = useMemo(() => analyzeDataset(dataset), [dataset])
  const errors = {
    target: dataset.target.name.trim() ? '' : 'Add a target brand.',
    competitors: dataset.competitors.some((item) => item.name.trim()) ? '' : 'Add at least one competitor.',
    rows: dataset.rows.some((row) => row.prompt.trim() && row.answer.trim()) ? '' : 'Add one complete prompt and answer.',
  }
  const valid = !Object.values(errors).some(Boolean)

  const setTarget = (patch: Partial<Brand>) =>
    setDataset((current) => ({ ...current, target: updateBrand(current.target, patch) }))

  const setCompetitor = (id: string, patch: Partial<Brand>) =>
    setDataset((current) => ({
      ...current,
      competitors: current.competitors.map((brand) => brand.id === id ? updateBrand(brand, patch) : brand),
    }))

  const setRow = (id: string, patch: Partial<AnswerRow>) =>
    setDataset((current) => ({
      ...current,
      rows: current.rows.map((row) => row.id === id ? { ...row, ...patch } : row),
    }))

  const showSources = (brandId: string) => {
    setSourceFilter(brandId)
    document.getElementById('evidence')?.scrollIntoView({ behavior: 'smooth' })
  }

  const visibleRows = analysis.rows.filter((row) => {
    if (sourceFilter === 'all') return true
    if (sourceFilter === 'gaps') return row.targetMissingWithCompetitor
    return row.mentions.some((mention) => mention.brandId === sourceFilter && mention.positions.length)
  })

  const brandName = (id: string) => analysis.brands.find((brand) => brand.id === id)?.name ?? id

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand-lockup" href="#top" aria-label="AnswerLens home">
          <span className="logo"><Icon name="lens" /></span>
          <span>AnswerLens</span>
          <span className="beta">V0 experiment</span>
        </a>
        <nav aria-label="Primary navigation">
          <button className={mode === 'results' ? 'nav-active' : ''} onClick={() => setMode('results')}>Analysis</button>
          <button className={mode === 'input' ? 'nav-active' : ''} onClick={() => setMode('input')}>Edit dataset</button>
          <button onClick={() => setMethodOpen(true)}>Method</button>
        </nav>
        <a className="github-link" href="https://github.com/neha-mish/ai-product-factory" target="_blank" rel="noreferrer">View build <Icon name="arrow" /></a>
      </header>

      <main id="top">
        {mode === 'input' ? (
          <section className="input-page">
            <div className="page-heading split-heading">
              <div>
                <p className="eyebrow">Your dataset</p>
                <h1>Bring the answers.<br />We’ll make the pattern visible.</h1>
                <p className="lede">Paste a small set of AI answers. Analysis happens locally in your browser—no model calls, and your edits are not uploaded.</p>
              </div>
              <button className="secondary-button" onClick={() => { setDataset(cloneSample()); setSheetState('error'); setSheetError('Using the fictional fallback dataset.') }}>Restore sample</button>
            </div>

            <div className="form-layout">
              <aside className="form-aside">
                <span className="step-number">01</span>
                <h2>Track your market</h2>
                <p>Names and aliases are matched as whole terms, without semantic guessing.</p>
              </aside>
              <div className="form-panel">
                <div className="field-group target-field">
                  <div className="field-label-row"><label htmlFor="target-name">Target brand</label><span>Your brand</span></div>
                  <input id="target-name" value={dataset.target.name} onChange={(event) => setTarget({ name: event.target.value })} placeholder="e.g. Northstar CRM" />
                  {errors.target && <p className="field-error">{errors.target}</p>}
                  <label className="sub-label" htmlFor="target-aliases">Aliases <span>comma separated</span></label>
                  <input id="target-aliases" value={aliasesToText(dataset.target)} onChange={(event) => setTarget({ aliases: event.target.value.split(',').map((item) => item.trim()).filter(Boolean) })} placeholder="Northstar, North Star" />
                </div>

                <div className="competitor-list">
                  <div className="field-label-row"><label>Competitors</label><span>{dataset.competitors.length} tracked</span></div>
                  {dataset.competitors.map((brand, index) => (
                    <div className="competitor-row" key={brand.id}>
                      <span className="row-index">{String(index + 1).padStart(2, '0')}</span>
                      <div>
                        <input aria-label={`Competitor ${index + 1} name`} value={brand.name} onChange={(event) => setCompetitor(brand.id, { name: event.target.value })} placeholder="Competitor name" />
                        <input aria-label={`${brand.name || `Competitor ${index + 1}`} aliases`} className="alias-input" value={aliasesToText(brand)} onChange={(event) => setCompetitor(brand.id, { aliases: event.target.value.split(',').map((item) => item.trim()).filter(Boolean) })} placeholder="Aliases, comma separated" />
                      </div>
                      <button className="icon-button" aria-label={`Remove ${brand.name || 'competitor'}`} onClick={() => setDataset((current) => ({ ...current, competitors: current.competitors.filter((item) => item.id !== brand.id) }))}><Icon name="trash" /></button>
                    </div>
                  ))}
                  {errors.competitors && <p className="field-error">{errors.competitors}</p>}
                  <button className="text-button" onClick={() => setDataset((current) => ({ ...current, competitors: [...current.competitors, { id: uid(), name: '', aliases: [] }] }))}><Icon name="plus" /> Add competitor</button>
                </div>
              </div>
            </div>

            <div className="form-layout answers-layout">
              <aside className="form-aside">
                <span className="step-number">02</span>
                <h2>Add observed answers</h2>
                <p>Use responses you collected from AI assistants. Each result remains traceable to this source text.</p>
              </aside>
              <div className="form-panel answer-list">
                {dataset.rows.map((row, index) => (
                  <article className="answer-input-card" key={row.id}>
                    <div className="answer-card-head">
                      <span>Answer {String(index + 1).padStart(2, '0')}</span>
                      <button className="icon-button" aria-label={`Remove answer ${index + 1}`} onClick={() => setDataset((current) => ({ ...current, rows: current.rows.filter((item) => item.id !== row.id) }))}><Icon name="trash" /></button>
                    </div>
                    <div className="two-fields">
                      <label>Platform<input value={row.platform} onChange={(event) => setRow(row.id, { platform: event.target.value })} placeholder="ChatGPT" /></label>
                      <label>Prompt<input value={row.prompt} onChange={(event) => setRow(row.id, { prompt: event.target.value })} placeholder="What would a prospect ask?" /></label>
                    </div>
                    {(row.model || row.collectedAt || row.responseUrl) && <p className="row-provenance">{[row.model, row.collectedAt].filter(Boolean).join(' · ')}{row.responseUrl && <> · <a href={row.responseUrl} target="_blank" rel="noreferrer">Open original response</a></>}</p>}
                    <label>AI answer<textarea rows={5} value={row.answer} onChange={(event) => setRow(row.id, { answer: event.target.value })} placeholder="Paste the observed answer, including visible source URLs..." /></label>
                  </article>
                ))}
                {errors.rows && <p className="field-error">{errors.rows}</p>}
                <button className="text-button" onClick={() => setDataset((current) => ({ ...current, rows: [...current.rows, { id: uid(), platform: '', prompt: '', answer: '' }] }))}><Icon name="plus" /> Add answer</button>
                <button className="primary-button analyze-button" disabled={!valid} onClick={() => { setMode('results'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>Analyze {analysis.rowCount} complete answers <Icon name="arrow" /></button>
              </div>
            </div>
          </section>
        ) : (
          <section className="results-page">
            <div className="hero">
              <div className="hero-copy">
                <p className="eyebrow">AI visibility · observed, not guessed</p>
                <h1>See where your brand<br /><em>shows up—and where it doesn’t.</em></h1>
                <p className="lede">AnswerLens turns supplied AI answers into traceable brand visibility signals. No black-box score. Every observation leads back to evidence.</p>
                <div className="hero-actions">
                  <button className="primary-button" onClick={() => setMode('input')}>Edit this dataset <Icon name="arrow" /></button>
                  <button className="secondary-button" onClick={() => setMethodOpen(true)}>How it works</button>
                </div>
              </div>
              <div className="hero-note">
                <span className="pulse-dot" />
                <div>
                  <strong>{sheetState === 'loading' ? 'Loading published experiment…' : dataset.source?.kind === 'sheet' ? 'Real observed experiment loaded' : 'Fallback experiment loaded'}</strong>
                  <p>{analysis.rowCount} answer{analysis.rowCount === 1 ? '' : 's'} · {new Set(analysis.rows.map((row) => row.platform)).size} AI platform{new Set(analysis.rows.map((row) => row.platform)).size === 1 ? '' : 's'} · analyzed locally</p>
                  {dataset.source?.url && <a href={dataset.source.url} target="_blank" rel="noreferrer">View public dataset</a>}
                </div>
              </div>
            </div>

            {sheetState === 'error' && <div className="import-warning"><strong>Published sheet unavailable.</strong> <span>{sheetError} Showing the fallback dataset.</span></div>}

            {!valid ? (
              <div className="invalid-state">
                <span><Icon name="lens" /></span><h2>This dataset needs a little more evidence.</h2>
                <p>{Object.values(errors).filter(Boolean).join(' ')}</p>
                <button className="primary-button" onClick={() => setMode('input')}>Fix dataset <Icon name="arrow" /></button>
              </div>
            ) : (
              <>
                <div className="scope-banner"><Icon name="check" /><p><strong>Read this as a dataset observation—not a market conclusion.</strong> Results cover only these {analysis.rowCount} supplied answers. Mention does not imply preference, sentiment, or business impact.</p></div>

                <section className="section-block" aria-labelledby="visibility-heading">
                  <div className="section-heading"><div><p className="eyebrow">01 · Observe</p><h2 id="visibility-heading">Visibility, answer by answer</h2></div><p>How often each tracked brand appeared in this supplied set.</p></div>
                  <div className="brand-grid">
                    {analysis.brands.map((brand, index) => (
                      <article className={`brand-card ${brand.isTarget ? 'target-card' : ''}`} key={brand.id}>
                        <div className="brand-card-top"><span className="brand-rank">{String(index + 1).padStart(2, '0')}</span>{brand.isTarget && <span className="your-brand">Your brand</span>}</div>
                        <h3>{brand.name || 'Unnamed brand'}</h3>
                        <div className="rate-row"><strong>{brand.mentionRate}%</strong><span>{brand.mentionedIn} of {analysis.rowCount} answers</span></div>
                        <div className="meter"><span style={{ width: `${brand.mentionRate}%` }} /></div>
                        <div className="mini-stats"><span><b>{brand.firstMentionedIn}</b> mentioned first</span><span><b>{brand.totalOccurrences}</b> total matches</span></div>
                        <button onClick={() => showSources(brand.id)}>Inspect matching answers <Icon name="arrow" /></button>
                      </article>
                    ))}
                  </div>
                </section>

                <section className="section-block diagnosis" aria-labelledby="diagnosis-heading">
                  <div className="section-heading"><div><p className="eyebrow">02 · Diagnose</p><h2 id="diagnosis-heading">Where visibility drops</h2></div><p>Prompts where a competitor appeared while {dataset.target.name} did not.</p></div>
                  <div className="diagnosis-grid">
                    <div className="gap-panel">
                      <div className="gap-number"><strong>{analysis.gaps.length}</strong><span>of {analysis.rowCount}<br />prompts are gaps</span></div>
                      {analysis.gaps.length ? (
                        <div className="gap-list">
                          {analysis.gaps.map((row) => (
                            <button key={row.id} onClick={() => { setSourceFilter('gaps'); document.getElementById('evidence')?.scrollIntoView({ behavior: 'smooth' }) }}>
                              <span>{row.platform}</span><p>{row.prompt}</p><Icon name="arrow" />
                            </button>
                          ))}
                        </div>
                      ) : <p className="empty-copy">No target-absent competitor gaps were observed in this dataset.</p>}
                    </div>
                    <aside className="investigation-card">
                      <div className="investigation-label"><Icon name="spark" /> Investigation area—not a conclusion</div>
                      <h3>{analysis.gaps.length ? 'Examine the questions where competitors own the shortlist.' : 'Broaden the prompt set before drawing a conclusion.'}</h3>
                      <p>{analysis.gaps.length
                        ? `${dataset.target.name} was absent from ${analysis.gaps.length} answer${analysis.gaps.length === 1 ? '' : 's'} where at least one tracked competitor appeared. Review whether your owned content clearly addresses these use cases and whether relevant third-party sources associate your brand with them.`
                        : `The target appeared whenever a tracked competitor did in this small set. That does not establish broad visibility; test additional customer questions and use cases.`}</p>
                      <div className="not-proven"><span>What this does not prove</span><p>It does not explain why an AI system included or excluded a brand, or predict that a content change will improve visibility.</p></div>
                    </aside>
                  </div>
                </section>

                <section className="section-block sources-section" aria-labelledby="sources-heading">
                  <div className="section-heading"><div><p className="eyebrow">03 · Inspect</p><h2 id="sources-heading">Visible source domains</h2></div><p>Domains extracted only from visible URLs in pasted answers.</p></div>
                  {analysis.domains.length ? <div className="domain-list">{analysis.domains.map((item, index) => <div key={item.domain}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item.domain}</strong><em>{item.count} answer{item.count === 1 ? '' : 's'}</em></div>)}</div> : <div className="no-domains">No extractable domains found. This does not mean the original answers had no citations.</div>}
                </section>

                <section className="section-block evidence-section" id="evidence" aria-labelledby="evidence-heading">
                  <div className="section-heading evidence-heading"><div><p className="eyebrow">04 · Verify</p><h2 id="evidence-heading">Trace every signal to its source</h2></div><label>Show<select value={sourceFilter} onChange={(event) => setSourceFilter(event.target.value)}><option value="all">All answers</option><option value="gaps">Visibility gaps</option>{analysis.brands.map((brand) => <option key={brand.id} value={brand.id}>{brand.name} matches</option>)}</select></label></div>
                  <div className="evidence-list">
                    {visibleRows.map((row) => (
                      <details className="evidence-card" key={row.id}>
                        <summary>
                          <div><span className="platform-tag">{row.platform || 'Unknown platform'}{row.model ? ` · ${row.model}` : ''}</span>{row.targetMissingWithCompetitor && <span className="gap-tag">Target absent</span>}<h3>{row.prompt}</h3></div>
                          <span className="summary-meta">{row.orderedBrandIds.length} tracked brand{row.orderedBrandIds.length === 1 ? '' : 's'} <span>+</span></span>
                        </summary>
                        <div className="evidence-body">
                          {(row.collectedAt || row.responseUrl) && <div className="evidence-provenance"><span>{row.collectedAt ? `Collected ${row.collectedAt}` : 'Collection date not provided'}</span>{row.responseUrl && <a href={row.responseUrl} target="_blank" rel="noreferrer">Open original response <Icon name="arrow" /></a>}</div>}
                          <p>{row.answer}</p>
                          <div className="match-strip"><span>Observed order</span>{row.orderedBrandIds.length ? row.orderedBrandIds.map((id, index) => <b key={id}>{index + 1}. {brandName(id)}</b>) : <b>No tracked brands</b>}</div>
                          <div className="match-strip"><span>Visible domains</span>{row.domains.length ? row.domains.map((domain) => <b key={domain}>{domain}</b>) : <b>No extractable domains</b>}</div>
                        </div>
                      </details>
                    ))}
                    {!visibleRows.length && <p className="empty-copy">No answers match this filter.</p>}
                  </div>
                </section>
              </>
            )}
          </section>
        )}
      </main>

      <footer><div className="footer-brand"><span className="logo"><Icon name="lens" /></span><div><strong>AnswerLens</strong><p>A time-boxed product experiment by Neha Mishra.</p></div></div><p>Built to observe before assuming.<br />No runtime AI. Public read-only dataset.</p></footer>

      {methodOpen && <div className="modal-backdrop" role="presentation" onMouseDown={() => setMethodOpen(false)}><section className="method-modal" role="dialog" aria-modal="true" aria-labelledby="method-title" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" aria-label="Close method" onClick={() => setMethodOpen(false)}>×</button><p className="eyebrow">Method & limits</p><h2 id="method-title">Transparent by design.</h2><ol><li><b>Match named entities.</b><span>Whole-term, case-insensitive matching uses the brand names and aliases you provide.</span></li><li><b>Aggregate observations.</b><span>Mention rate, first mention, gap prompts, and visible URL domains are calculated only across complete supplied answers.</span></li><li><b>Keep the evidence attached.</b><span>Every aggregate can be inspected against its prompt and original answer.</span></li><li><b>Separate observation from hypothesis.</b><span>Investigation areas are questions to explore—not explanations, prescriptions, or predicted uplift.</span></li></ol><div className="modal-limit"><strong>What V0 deliberately does not do</strong><p>No live AI querying, sentiment analysis, semantic positioning, automatic competitor discovery, universal visibility score, or market-wide claims.</p></div><a href="https://github.com/neha-mish/ai-product-factory/tree/main/runs/2026-09-16-answerlens" target="_blank" rel="noreferrer">Read the product run <Icon name="arrow" /></a></section></div>}
    </div>
  )
}
