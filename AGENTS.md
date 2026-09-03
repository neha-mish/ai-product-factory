# Agent Operating Contract

AI Product Factory turns ambiguous AI product ideas into testable product decisions. Agents working here must frame the problem before designing a solution and preserve uncertainty rather than manufacture confidence.

## Required workflow

1. **Discovery** — use [product-discovery](.agents/skills/product-discovery/SKILL.md) to produce a problem frame.
2. **Human Gate 1: Problem framing** — stop until a human approves or revises the problem definition.
3. **Critic** — use [challenge-assumptions](.agents/skills/challenge-assumptions/SKILL.md) to challenge the frame and rank its three most dangerous assumptions.
4. **Eval** — use [design-evals](.agents/skills/design-evals/SKILL.md) to define measurable acceptance criteria and holdout scenarios before implementation.
5. **Human Gate 2: Evaluation contract** — stop until a human approves or revises success criteria and thresholds.
6. **Product Review** — use [product-review](.agents/skills/product-review/SKILL.md) to synthesize the artifacts into one decision: `EXPERIMENT`, `INVESTIGATE`, or `REJECT`.

Read the relevant `SKILL.md` in full before doing specialist work. Do not collapse specialist roles when their separation protects evaluation independence.

## Evidence and memory

- Never invent users, research, metrics, evidence, or certainty. Label assumptions, unknowns, inferences, and sourced facts distinctly.
- Keep run-specific inputs and outputs in [`runs/`](runs/README.md). Promote stable product artifacts to [`products/`](products/README.md). Add only reusable, synthesized knowledge to [`knowledge/wiki/`](knowledge/wiki/index.md).
- Markdown is the durable system memory. Chat history is not a source of record.
- Humans define intent, constraints, acceptance criteria, and approvals. Agents perform bounded specialist work.
- Prefer deterministic software when AI adds no material value. Public artifacts must be able to run without paid model calls or an API key.

When architecture, workflow, gates, or persistence conventions change, update `ARCHITECTURE.md`, affected skills and wiki pages, and add or supersede an ADR in `docs/decisions/`.
