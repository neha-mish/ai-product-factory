# AnswerLens: Problem Frame

- **Run:** `2026-09-16-answerlens`
- **Date:** 2026-09-16
- **Owner:** Neha Mishra
- **Timebox:** Four to five focused hours
- **Target application:** Writesonic — AI Product Manager

## Problem Frame

### Target user and stakeholders

The initial target user is a growth or content professional in a B2B SaaS marketing team who is responsible for understanding how a brand appears in AI-generated answers. They can collect example answers from tools such as ChatGPT, Claude, Gemini, or Perplexity, but do not have an immediate way to turn those outputs into consistent, comparable signals.

Stakeholders may include marketing leaders who care about brand visibility and product teams evaluating whether the observed gaps justify further investigation. This timeboxed experiment does not assume enterprise buyers, automated data collection, or production analytics requirements.

### Job to be done

When reviewing a set of AI answers about a market, the user needs to identify where their brand appears, how prominently it appears relative to named competitors, and which prompts or topics expose meaningful visibility gaps, so they can decide what AEO/GEO questions deserve investigation next and later determine whether visibility changed.

### Problem

Raw AI answers are easy to generate but difficult to compare systematically. Manual review can reveal anecdotes, yet it does not reliably summarize mention frequency, relative prominence, competitor presence, or missing-brand patterns across multiple prompts. This makes it easy to overgeneralize from one answer or mistake generated prose for market evidence.

### Current alternative

The user can read each answer, highlight brand names manually, and record observations in a spreadsheet. This is workable for a very small sample but becomes inconsistent and makes cross-prompt patterns harder to see.

### Desired outcome

Given user-supplied prompts and AI answers, the user can quickly:

1. compare the target brand's mention rate with selected competitors;
2. see which brand is mentioned first and where brands appear in each answer;
3. identify prompts where competitors appear but the target brand does not;
4. inspect which cited domains appear in the supplied answers;
5. inspect the underlying answer behind every aggregate signal;
6. distinguish observed evidence from interpretation and product recommendations;
7. see clearly labeled potential AEO/GEO investigation areas;
8. understand the prototype's methodology and limitations.

The experiment analyzes supplied text. It does not discover competitors, query AI platforms, measure the wider market, infer why a model did or did not mention a brand, or promise that a content action will improve visibility or business outcomes.

### Product loop and V0 boundary

The longer-term product loop is:

**Ask → Observe → Diagnose → Improve → Re-test**

- **Ask:** Define representative questions that prospects may ask AI assistants.
- **Observe:** Run those prompts across AI systems and capture the answers.
- **Diagnose:** Analyze mentions, relative prominence, citations, competitors, topics, and gaps.
- **Improve:** Form evidence-aware content, source, or positioning hypotheses.
- **Re-test:** Repeat the prompt set and compare observed visibility over time.

V0 implements only **Observe → Diagnose** using user-supplied answers. It may surface investigation areas, but it must not present them as proven causes or guaranteed prescriptions.

Example of an allowed output:

> **Observed:** Competitor X appeared in 8 of 10 comparison prompts; the target brand appeared in 3 of 10.
>
> **AEO investigation:** Review whether the brand has clear content for these comparison and use-case questions, and whether relevant third-party sources associate the brand with them.

An output predicting a specific visibility lift from a proposed article or action is outside scope and unsupported.

## Evidence

### Sourced facts

- Writesonic describes its current product around tracking brand visibility in AI answers, prioritizing gaps, acting, and measuring results. Source: public Writesonic product pages reviewed on 2026-09-16.
- The Writesonic AI Product Manager role emphasizes building working prototypes with AI coding tools, moving from idea to testable prototype in hours, competitive intelligence, analytics, experimentation, and user-centered simplicity. Source: public role listing reviewed on 2026-09-16.
- Neha has professional experience evaluating AI outputs, identifying failure patterns, designing evaluation loops, and translating output quality into product improvements. Source: user-supplied career materials.
- The project has a four-to-five-hour build constraint and should be deployable as a working public prototype. Source: user instruction for this run.

### Inferences

- A deterministic text-analysis workflow is sufficient to test whether aggregate visibility signals are more useful than reading raw answers alone.
- Traceability from a metric back to the source answer will make the analysis more credible than an opaque generated summary.
- A sample dataset can reduce first-use friction while custom input demonstrates that the prototype performs real analysis rather than displaying a fixed mockup.
- Framing diagnostic outputs as investigation areas can make them actionable without pretending the supplied answers establish causality.

No user research, demand validation, or evidence of willingness to pay has been supplied. The prototype is an exploratory product experiment, not a validated business.

## Assumptions

1. Users can legally and practically provide the AI answers they want to analyze.
2. Exact and normalized brand-name matching is useful enough for a first experiment despite aliases and ambiguous names.
3. Mention rate, first mention, and mention position are understandable directional signals.
4. Citation-domain extraction from supplied text is reliable enough when citations appear as recognizable URLs or domains.
5. Users value source-level inspection and will not treat the aggregate metrics as ground truth about the entire market.
6. A guided sample plus a simple custom-input flow can communicate the product within two minutes.
7. Useful analysis can be delivered entirely in the browser without a model API, backend, authentication, or persistent database.
8. The timebox is sufficient for a responsive app, a small deterministic analysis engine, focused tests, documentation, and deployment.

## Unknowns

- Which user persona experiences this problem most acutely.
- How many prompts and platforms constitute a useful or representative sample.
- Whether mention prominence correlates with a meaningful marketing or business outcome.
- How often brand aliases, spelling variations, product names, or ambiguous words cause matching errors.
- How reliably citations and source domains can be extracted from differently formatted AI answers.
- Which action a user would take after finding a visibility gap.
- Whether users prefer pasting individual answers, structured JSON, or CSV upload.
- Which prompts should remain stable across repeated experiments and which should evolve with the market.

## Measurable Success

These indicators are proposals for the Eval specialist to refine:

- On a disclosed fixture dataset, the analysis engine calculates brand mentions, first-mentioned brand, and missing-target-brand prompts correctly.
- On supported citation formats, the analysis engine extracts cited domains correctly and makes extraction limitations visible.
- Every aggregate result can be traced to the relevant prompt and source answer.
- A first-time reviewer can load the sample and identify the largest observed visibility gap without instructions from the builder.
- A user can replace the sample with custom data and receive recalculated results.
- Limitations state that the results describe only the supplied dataset and are not causal or market-representative.
- AEO/GEO investigation areas are labeled as hypotheses and contain no promised uplift.
- The deployed app works without authentication, API keys, runtime model calls, or paid services.
- The project passes automated analysis tests and a production build.

## Gate 1 Decision

- **Status:** APPROVED
- **Human reviewer:** Neha Mishra
- **Decision:** Approved in conversation on 2026-09-16 after adding the AI visibility/AEO/GEO product loop, V0 boundary, citation analysis, and deferred evolution.

## Deferred Product Evolution

- **V1:** Saved prompt sets and repeated experiments to compare visibility over time.
- **V2:** Evidence-aware AEO/GEO opportunity diagnosis and content/source hypotheses.
- **V3:** Automated collection and monitoring across AI platforms.
- **V4:** Marketing workflow integrations connecting hypotheses, actions, re-tests, and measured change.

These stages are directional hypotheses, not committed roadmap items.
