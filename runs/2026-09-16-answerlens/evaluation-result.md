# AnswerLens V0: Evaluation Result

- **Date:** 2026-09-16
- **Evaluated revision:** `592d3e0` plus this evidence update
- **Production URL:** https://answerlens-neha-mish.vercel.app

## Automated evidence

| Check | Result | Evidence |
|---|---|---|
| Brand and alias detection | PASS | Unit fixtures cover case-insensitive name and alias matching. |
| Boundary protection | PASS | Unit fixture rejects a short brand embedded in an unrelated longer word. |
| Overlapping alias handling | PASS | Longest matching term wins at an overlapping position, preventing double counting. |
| Mention rate and first-mention calculation | PASS | Hand-calculated fixture matches engine output. |
| Target-absent competitor gaps | PASS | Expected gap row is classified correctly. |
| Visible domain extraction | PASS | URLs are normalized and duplicate domains are removed per answer. |
| Published-data path | PASS | Interface test confirms the public experiment is parsed and rendered after loading. |
| CSV integrity | PASS | Fixtures cover quoted multiline answers, metadata, aliases, and incomplete planned rows. |
| Editable dataset path | PASS | Interface test confirms navigation to structured custom inputs. |
| Production build | PASS | Type checking and Vite production build completed successfully. |

Automated suite result: **8 tests passed across 3 files**.

## Language and scope audit

- Results are described as observations of the supplied dataset.
- The results view keeps the non-market-wide limitation visible.
- AEO output is labeled “Investigation area—not a conclusion.”
- The UI makes no causal explanation, guaranteed action, or predicted uplift claim.
- Absence of visible URLs is described as “No extractable domains,” not “No citations.”
- No API key, runtime model call, backend credential, authentication, or private persistence is present.
- The public Google Sheet is identified as a lightweight experiment feed; it is not presented as a private database.

## Pending human evaluation

The following approved checks require the human product owner and are not represented as passed:

- Four sealed holdout fixtures: alias/punctuation, overlapping-name boundary, multi-brand order, and URL normalization.
- First-use task: identify the largest observed visibility gap without builder explanation.
- Visual inspection at 375×812 and 1440×900. Responsive CSS is implemented, but exact viewport screenshots were not captured in the build environment.
- A short task-based test with a relevant B2B SaaS marketer to assess whether the outputs change the next investigation.

## Current conclusion

The prototype is technically ready for public review as a directional pilot. The current one-prompt, three-platform dataset demonstrates the workflow but is not evidence of validated demand, representative market visibility, causal AEO diagnosis, or business impact.
