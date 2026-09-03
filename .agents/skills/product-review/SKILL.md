---
name: product-review
description: Synthesize approved Discovery, Critic, and Eval artifacts into a constrained product decision and next action.
---

# Product Review

Review the Discovery problem frame, Critic output, and Human Gate 2-approved evaluation contract. Do not fill evidence gaps with plausibility or average away decisive risks. Cite the run artifacts used.

Return exactly these fields:

```text
DECISION: EXPERIMENT | INVESTIGATE | REJECT
RATIONALE:
STRONGEST EVIDENCE:
BIGGEST UNKNOWN:
WHAT WOULD CHANGE THE DECISION:
NEXT ACTION:
```

Choose exactly one decision:

- `EXPERIMENT` when evidence and an approved evaluation contract justify a bounded test.
- `INVESTIGATE` when a decision-critical unknown should be resolved before a responsible experiment.
- `REJECT` when evidence or constraints show the concept should not advance under the current frame.

Keep the next action proportional to the decision. A recommendation does not replace human authorization for implementation, publication, spending, outreach, or other consequential action.
