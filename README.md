# AI Product Factory

AI Product Factory is an agent-native system for turning ambiguous AI product ideas into testable product decisions.

**Current stage: V0.1 — Foundation.** This repository establishes the operating contracts, specialist skills, durable knowledge model, human approval gates, and evaluation philosophy. It is not production-ready and does not yet include a recruiter-facing application.

## What this demonstrates

- **Agent orchestration:** bounded Discovery, Critic, Eval, and Product Review responsibilities with explicit handoffs.
- **Context engineering:** concise operating instructions route agents to task-specific skills and durable documentation.
- **Durable knowledge:** Markdown preserves decisions, product artifacts, and reusable learning outside chat history.
- **Human-in-the-loop design:** humans approve the problem frame and evaluation contract before work advances.
- **Evaluation-driven development:** observable success criteria and failure conditions are agreed before implementation.
- **Holdout evaluation:** some scenarios remain sealed from builders to reduce optimization against known tests.
- **AI-versus-deterministic judgment:** AI is used only where it adds value; published experiences must work without an LLM or paid API at runtime.

## Decision flow

```text
Ambiguous AI product idea
          ↓
      Discovery
          ↓
 Assumption challenge
          ↓
  Evaluation design
          ↓
    Product review
          ↓
EXPERIMENT | INVESTIGATE | REJECT
```

Two human gates make the workflow intentionally non-automatic: the problem definition must be approved before solution development, and the evaluation contract must be approved before implementation or build.

## Repository guide

- [`AGENTS.md`](AGENTS.md) — operating contract and workflow map.
- [`.agents/skills/`](.agents/skills/) — specialist instructions.
- [`knowledge/wiki/`](knowledge/wiki/index.md) — durable, reusable knowledge.
- [`runs/`](runs/README.md) — execution-specific evidence and outputs.
- [`products/`](products/README.md) — durable product-concept artifacts promoted from runs.
- [`ARCHITECTURE.md`](ARCHITECTURE.md) — boundaries, artifact lifecycle, and runtime constraints.
- [`docs/decisions/`](docs/decisions/0001-agent-native-architecture.md) — architecture decision records.

Start with [`AGENTS.md`](AGENTS.md). Do not begin solution or UI development until the required gates are approved.
