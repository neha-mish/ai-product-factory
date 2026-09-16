# AnswerLens V0: Evaluation Contract

- **Run:** `2026-09-16-answerlens`
- **Inputs:** [`problem-frame.md`](problem-frame.md), [`assumption-challenge.md`](assumption-challenge.md)
- **Build timebox:** Four to five focused hours
- **Gate 2 status:** APPROVED

## Acceptance Criteria

| ID | Observable behavior | Metric | Acceptance threshold | Test method and evidence | Failure condition |
|---|---|---|---|---|---|
| A1 | Detects target and competitor mentions using names and explicit aliases. | Correct brand-presence classifications. | 100% on disclosed unit fixtures and all human-controlled holdout fixtures. | Automated tests plus holdout result record. | Any missed or false brand presence in the test fixtures. |
| A2 | Avoids substring false positives. | Boundary-case accuracy. | 100% on fixtures including overlapping/common terms. | Automated unit tests. | A shorter brand matches inside an unrelated longer word. |
| A3 | Calculates per-brand mention rate over supplied answers. | Exact agreement with hand-calculated fixture results. | 100% for disclosed and holdout fixtures. | Automated analysis tests. | Any numerator, denominator, or percentage differs from expected output. |
| A4 | Identifies the first mentioned tracked brand and ordinal mention order. | Exact agreement with expected order. | 100% for disclosed and holdout fixtures. | Automated analysis tests. | Wrong first brand or order for any fixture. |
| A5 | Identifies prompts where competitors appear and the target brand is absent. | Gap-classification accuracy. | 100% for disclosed and holdout fixtures. | Automated tests and source-detail inspection. | Any known gap is missed or any non-gap is labeled a gap. |
| A6 | Extracts visible HTTP(S) citation domains from supplied answer text. | Domain-extraction accuracy. | 100% on supported URL fixtures; unsupported formats are not claimed as citations. | Automated URL/domain fixtures. | Incorrect domain, missed supported URL, or claim that absence of an extractable URL proves no citation exists. |
| T1 | Every metric and gap can be traced to source answers. | Traceability coverage. | Every aggregate card links or filters to all contributing prompt/answer rows. | Manual desktop and mobile walkthrough with screenshot evidence. | A result cannot be explained from displayed source rows. |
| E1 | The UI separates observation from hypothesis. | Label and language compliance. | All action-oriented outputs use “Investigation area” or equivalent and cite the triggering observation; no causal or uplift claim appears. | Copy review against rendered build. | Any unsupported “why,” guaranteed action, or predicted uplift is displayed. |
| E2 | Dataset limits remain visible. | Limitation visibility. | Sample size and “supplied dataset, not market-wide” language appear in the results view without opening a modal. | Manual inspection at desktop and mobile widths. | Results can be viewed without the scope limitation. |
| U1 | A first-time reviewer can experience the product immediately. | Sample-path completion. | Sample data loads and produces results in no more than one intentional action. | Manual fresh-session test. | Blank start, broken sample, or more than one setup action before useful results. |
| U2 | The prototype performs real custom analysis. | Custom-path completion. | User can edit target, aliases, competitors, prompts, and answers; results recompute without reload. | Manual test with a non-sample dataset. | Any required field cannot be edited or results remain tied to sample values. |
| U3 | Invalid or incomplete input fails clearly. | Error-state coverage. | Empty target, no competitors, or no complete prompt/answer rows produce specific inline guidance and no misleading metrics. | Manual negative-path tests. | Crash, silent failure, or plausible-looking output from invalid input. |
| Q1 | Core experience works on common screen sizes. | Layout and interaction completion. | No horizontal page overflow and all controls/results are usable at 375×812 and 1440×900. | Browser inspection and screenshots. | Clipped content, inaccessible controls, or page-level horizontal scrolling. |
| Q2 | Public build has no paid/runtime AI dependency. | Network/runtime dependency audit. | Analysis runs locally; no API key; no model call; production build succeeds. | Code inspection, production build, and browser network check. | Required API credential, model request, or failed production build. |
| Q3 | Repository communicates the product decision. | Documentation completeness. | README covers problem, scope, method, limitations, run commands, tests, deployment, and deferred work. | Human review. | A reviewer cannot distinguish implemented behavior from future scope. |

## Development Scenarios

Builders may use these disclosed cases:

1. Target absent while one competitor appears multiple times.
2. Target and two competitors all appear, with a competitor first.
3. Target appears through an explicitly configured alias.
4. A short brand term appears inside an unrelated longer word and must not match.
5. An answer includes multiple URLs from the same domain and one from another domain.
6. An answer contains no extractable URL; UI must say “no extractable domains,” not “no citations.”
7. Incomplete custom row and empty target trigger specific validation.

## Holdout Strategy

Before implementation, the human evaluator keeps at least four small fixtures outside the builder-visible test file:

- an alias/punctuation edge case;
- an overlapping-name boundary case;
- a multi-brand mention-order case;
- a citation URL normalization case.

The builder sees the acceptance criteria but not the exact holdout strings or expected results. After the build, the evaluator runs the fixtures and records only identifiers, pass/fail status, and diagnosis needed for failed criteria. Because this is a solo timeboxed prototype, Neha may act as holdout custodian while Codex performs the build.

## Test Ownership

- **Builder:** Codex, using AI-assisted coding.
- **Human product owner and holdout custodian:** Neha Mishra.
- **Automated evaluator:** deterministic unit tests for the analysis engine.
- **Manual evaluator:** Neha for first-use clarity and holdout inputs; Codex for build, accessibility, responsive layout, and language audit.

## Evidence Capture

- Automated test output committed or summarized in the run result.
- Production build output summarized in the run result.
- Desktop and mobile screenshots stored with the run.
- Manual checklist for sample, custom, invalid-input, traceability, and limitations paths.
- Holdout results recorded without exposing sealed inputs before evaluation.
- Deployment URL and commit recorded in the final product review.

## Explicitly Deferred

- Live querying of AI platforms
- Automated competitor discovery
- Authentication, accounts, and persistence
- CSV or bulk import
- Scheduled monitoring and longitudinal comparison
- Sentiment, semantic positioning, or model-generated summaries
- A composite AEO/GEO/visibility score
- Prescriptive content briefs or promised visibility uplift
- Marketing workflow integrations

## Unresolved Risks

- The thresholds are correctness-focused and do not validate market demand or downstream business value.
- A solo evaluator is weaker than independent target-user testing.
- URL extraction cannot recover hidden citation metadata lost during copy/paste.
- Even careful investigation language may be overinterpreted when paired with quantitative signals.

## Human Gate 2

- **Status:** APPROVED
- **Human reviewer:** Neha Mishra
- **Decision:** Approved in conversation on 2026-09-16 without revisions.
