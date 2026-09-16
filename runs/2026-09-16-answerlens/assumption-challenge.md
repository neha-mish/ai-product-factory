# AnswerLens: Assumption Challenge

- **Run:** `2026-09-16-answerlens`
- **Input:** [`problem-frame.md`](problem-frame.md), Gate 1 approved
- **Role:** Product Critic

## Challenges

| Challenge | Basis | Product impact | Smallest useful validation |
|---|---|---|---|
| Brand-name matching may create misleading precision. | Exact matching misses aliases, product names, possessives, spelling variants, and semantic references; loose matching creates false positives for common words. | Core metrics can be wrong while appearing objective. | Support explicit aliases, whole-term case-insensitive matching, and a source-answer audit view. Add fixtures for overlapping and ambiguous names. |
| The supplied prompt set may not represent customer demand. | V0 accepts user-provided prompts and has no demand or sampling evidence. | A polished dashboard could encourage market-level conclusions from a biased sample. | Display sample size and coverage limitations beside results; describe all metrics as properties of the supplied dataset. |
| Mention frequency and position may not equal useful visibility. | A brand can be mentioned negatively, as an afterthought, or in an irrelevant context. | Users may optimize a proxy that does not reflect trust, consideration, or revenue. | Call metrics directional; retain source inspection; do not combine them into a universal “visibility score” in V0. |
| Citation extraction is format-dependent. | AI products render citations differently; pasted text may omit link targets or contain unrelated URLs. | Citation counts may be incomplete or wrongly interpreted as authority. | Support visible URLs/domains only, label the rule, and report “no extractable domain” rather than “no citations.” |
| AEO investigation prompts could be mistaken for recommendations. | Even cautious suggestions carry authority when displayed next to quantitative results. | The product could imply causes not established by the data. | Use conditional language, show the observation that triggered each hypothesis, and include a persistent “investigate, not conclude” label. |
| Custom input could become the timebox's main UX risk. | Unstructured multi-answer text is difficult to parse reliably; CSV upload adds schema and error-state work. | The prototype may fail before demonstrating its core analysis. | Use a small structured form with repeatable prompt/answer rows; defer CSV and bulk ingestion. |
| A sample-only experience can look hard-coded. | Recruiters may assume the dashboard is a visual mock rather than a working analysis tool. | The artifact would not prove hands-on building. | Let users edit brands and answers and visibly recalculate; include deterministic unit tests in the repository. |
| The concept overlaps Writesonic's product territory. | The experiment uses AI visibility concepts central to the target company. | It may look derivative or like an attempted substitute rather than independent product judgment. | Frame it as a narrow learning experiment built from public domain concepts, avoid Writesonic branding/data, and emphasize scoping and evaluation choices. |
| No real-user evidence exists. | The run contains role and domain relevance but no user interviews or observed workflow data. | The prototype cannot support demand, usability, or roadmap claims. | Label it an experiment; make the next step a short task-based test with relevant marketers rather than additional features. |

## Top Three Invalidating Assumptions

### 1. The metrics are accurate enough to support the observations

This ranks first because mention detection drives every downstream view. Alias, boundary, and parsing errors could invalidate the product's core output even if the interface looks convincing. V0 must prefer transparent, auditable matching over sophisticated-looking scores.

### 2. The supplied prompt set is meaningful enough to analyze

Even perfect calculations are not useful if the inputs are arbitrary or biased. V0 cannot solve prompt representativeness, so it must keep dataset scope visible and avoid market-wide conclusions.

### 3. Users can turn observed gaps into a responsible next investigation

If the output stops at counts, it may be a dashboard without a decision. If it goes too far, it invents causality. The experiment must test whether traceable, cautiously worded investigation areas create value without becoming prescriptions.

## Critic Recommendation

**Ready for evaluation design with constraints.**

Proceed only if V0:

- avoids a composite AEO or visibility score;
- supports explicit brand aliases and auditable source matching;
- treats results as properties of the supplied dataset;
- extracts only visible citation domains;
- labels investigation areas as hypotheses;
- uses structured prompt/answer rows instead of bulk ingestion;
- defers trend monitoring, platform automation, sentiment, and prescriptive content recommendations.

