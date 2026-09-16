# AnswerLens · AI Product Factory

AnswerLens is a four-to-five-hour product experiment that turns user-supplied AI answers into transparent brand-visibility observations.

**[Open the live prototype](https://answerlens-neha-mish.vercel.app)**

It answers a deliberately narrow question: **given this set of AI answers, where did the target brand appear, which competitors appeared first, which prompts exposed target-absent gaps, and which visible source domains were present?**

It does not produce a universal AEO score or claim to explain why a model included a brand.

## Why this exists

Raw answers from ChatGPT, Claude, Gemini, and similar tools are easy to collect but difficult to compare consistently. AnswerLens provides a deterministic **Observe → Diagnose** workflow:

1. Define a target brand, explicit aliases, and competitors.
2. Supply prompts and observed AI answers.
3. Calculate mention rate, first mention, prompt-level visibility gaps, and visible URL domains.
4. Trace every aggregate result back to the original answer.
5. Treat AEO/GEO outputs as investigation areas—not causes, prescriptions, or promised uplift.

The longer-term product hypothesis is **Ask → Observe → Diagnose → Improve → Re-test**. Only Observe → Diagnose is implemented.

## Try the prototype

The app opens with a fictional sample dataset, so the complete experience is visible immediately. Select **Edit this dataset** to replace the brands, aliases, prompts, platforms, and answers. Analysis recomputes locally in the browser.

No data is uploaded or persisted. No model API is called.

## What is implemented

- Case-insensitive, whole-term brand and alias matching
- Overlap handling that prefers the most specific matching term
- Per-brand mention rate, first-mention count, and total matches
- Prompts where competitors appear while the target brand is absent
- Visible HTTP(S) domain extraction and normalization
- Source-level traceability for every result
- Editable sample and custom input path
- Explicit dataset and causal limitations
- Responsive interface and focused automated tests

## Deliberately not implemented

- Live querying of AI platforms
- Automatic competitor discovery
- Authentication, accounts, storage, or tracking
- Sentiment or semantic-positioning analysis
- Composite AEO/GEO/visibility scoring
- Model-generated summaries or content briefs
- Causal recommendations or predicted visibility lift
- Repeated experiments and change-over-time monitoring

These omissions are product decisions, not unfinished promises. See the [approved evaluation contract](runs/2026-09-16-answerlens/evaluation-contract.md) and [assumption challenge](runs/2026-09-16-answerlens/assumption-challenge.md).

## Run locally

Requires a current Node.js release and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Test and build

```bash
npm test
npm run build
```

The production build is written to `dist/`. `vercel.json` configures Vercel to run the same build.

## Product evidence

- [Problem frame](runs/2026-09-16-answerlens/problem-frame.md)
- [Assumption challenge](runs/2026-09-16-answerlens/assumption-challenge.md)
- [Evaluation contract](runs/2026-09-16-answerlens/evaluation-contract.md)
- [Product review](runs/2026-09-16-answerlens/product-review.md)
- [Evaluation result](runs/2026-09-16-answerlens/evaluation-result.md)
- [Architecture decision](docs/decisions/0002-deterministic-recruiter-prototype.md)

The repository began as AI Product Factory: an agent-native workflow for turning ambiguous AI ideas into testable decisions. AnswerLens is its first bounded product experiment. The governing sequence remains Discovery → Critic → Eval → Product Review, with human approval gates before solution development and implementation. Start with [`AGENTS.md`](AGENTS.md) for the operating contract.
