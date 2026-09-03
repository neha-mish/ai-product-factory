---
name: product-discovery
description: Turn an ambiguous product idea into an evidence-aware problem frame before any solution architecture is proposed.
---

# Product Discovery

Produce a problem frame that a human can approve, revise, or reject. Do not propose architecture, features, implementation, vendors, or agent topology until the problem is understood and Human Gate 1 is approved.

## Investigate

- Target user: who experiences the problem; distinguish users, buyers, and other stakeholders.
- Job to be done: the progress the user is trying to make in context.
- Pain or problem: frequency, severity, and consequences.
- Current alternative: how the job is handled today and why that is insufficient.
- Desired outcome: the observable change sought, without embedding a preferred solution.
- Assumptions: beliefs not yet supported by evidence.
- Unknowns: missing information that could change the frame.
- Measurable success: outcome indicators that could show improvement.

Use supplied evidence and cite its origin. Never create research findings or user claims. If evidence is absent, frame statements as hypotheses and recommend the smallest useful research step.

## Output

Write a run artifact with sections: `Problem Frame`, `Evidence`, `Assumptions`, `Unknowns`, `Measurable Success`, and `Gate 1 Decision`. End at Human Gate 1 with status `PENDING`, `APPROVED`, or `REVISE`; only a human may set `APPROVED`.
