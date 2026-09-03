---
name: design-evals
description: Convert proposed product behavior into an approved, measurable evaluation contract before implementation begins.
---

# Design Evaluations

Use the approved problem frame and critic output to define the acceptance contract before implementation. Do not choose metrics merely because they are easy to collect, and do not disguise subjective judgment as objective measurement.

For every criterion specify:

| Field | Requirement |
|---|---|
| Behavior | Observable product behavior being evaluated |
| Metric | How performance or quality is measured |
| Threshold | The pre-agreed boundary for acceptance |
| Test method | Procedure, inputs, evaluator, and evidence captured |
| Failure condition | Result that fails the criterion or stops the experiment |

Cover intended behavior, important failure modes, and the leading invalidating assumptions. Mark uncertainty in thresholds and explain how it will be calibrated.

## Independence and holdouts

Separate builder and evaluator roles wherever practical. The builder may use disclosed development scenarios. Reserve representative holdout or sealed scenarios to test generalization; the builder must not see their inputs or expected results before evaluation. A human or independent evaluator controls them, prevents leakage, versions scenario identifiers, and reveals only the information needed to diagnose results after scoring. Do not use sealed tests to hide the acceptance criteria themselves.

## Output and gate

Write an evaluation contract containing the criteria table, test ownership, development scenarios, holdout strategy, evidence-capture plan, and unresolved risks. End at Human Gate 2 with status `PENDING`, `APPROVED`, or `REVISE`; only a human may set `APPROVED`. No implementation or build begins before approval.
