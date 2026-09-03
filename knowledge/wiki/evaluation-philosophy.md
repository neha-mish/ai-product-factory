# Evaluation Philosophy

Evaluation is a product-design activity, not a final quality check. The acceptance contract is created before implementation so success cannot be redefined after seeing results.

Each criterion names an observable behavior, metric, threshold, test method, and failure condition. Thresholds should reflect the user outcome and risk; uncertain thresholds are labeled and calibrated rather than presented as facts.

Builder and evaluator concerns remain separate wherever practical. Builders can iterate against disclosed development scenarios, while representative holdout or sealed scenarios test whether behavior generalizes. Builders do not see sealed inputs or expected results before evaluation. Human-controlled access, versioned identifiers, and leakage records make holdouts useful without obscuring the contract.

Evaluation includes negative outcomes. A failed criterion, unsafe failure mode, or invalidated product assumption is decision evidence—not an invitation to invent a success narrative. Results inform one of `EXPERIMENT`, `INVESTIGATE`, or `REJECT`.
