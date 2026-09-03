# Architecture

## Purpose

AI Product Factory is a repository-native decision system. Its architecture makes agent roles, inputs, outputs, evidence limits, and approval gates inspectable in version-controlled Markdown.

## System model

| Layer | Responsibility | Durable location |
|---|---|---|
| Operating contract | Global constraints, workflow, routing, decision vocabulary | `AGENTS.md` |
| Specialist capabilities | Bounded instructions for Discovery, Critic, Eval, and Product Review | `.agents/skills/*/SKILL.md` |
| Run workspace | Inputs, evidence, intermediate reasoning, and outputs for one execution | `runs/` |
| Product memory | Reviewed artifacts for a product concept that has moved beyond exploration | `products/` |
| Reusable knowledge | Synthesized principles and cross-product learning | `knowledge/wiki/` |
| Architecture history | Decisions and their tradeoffs | `docs/decisions/` |

## Workflow and control gates

The mandatory sequence is Discovery → Critic → Eval → Product Review.

**Gate 1 — Problem framing:** after Discovery, a human approves or revises the target user, job, problem, desired outcome, assumptions, unknowns, and measurable success. Solution development cannot proceed before approval.

**Gate 2 — Evaluation contract:** after Eval design, a human approves or revises criteria, metrics, thresholds, test methods, failure conditions, and the holdout strategy. Implementation or build cannot proceed before approval.

The Product Review returns exactly one of `EXPERIMENT`, `INVESTIGATE`, or `REJECT`. Agents recommend; humans retain authority over consequential action.

## Artifact lifecycle

1. A run begins in `runs/` and contains execution-specific material. Raw notes remain there.
2. A product artifact is promoted to `products/` only after human review establishes that it is a useful, current source of truth for that concept. It records provenance back to the originating run.
3. Knowledge enters `knowledge/wiki/` only when it is synthesized, reusable across product concepts, supported by evidence or clearly labeled as a principle, and given a maintainer or review condition. Wiki entries link to supporting product artifacts or runs where appropriate.

Promotion is selective, not copying: run → reviewed product artifact → reusable wiki knowledge.

## Builder and evaluator separation

Builders may see the approved acceptance contract but should not author their own final assessment where practical. The evaluator independently applies the contract. Known tests support iteration; holdout or sealed scenarios test generalization and are inaccessible to the builder until evaluation. A human controls access and records only the scenario identifiers and results needed for auditability.

## AI boundary and public runtime

AI may support discovery, criticism, synthesis, and artifact creation during the factory process. Deterministic logic is preferred for routing, validation, rendering, and other behavior that does not benefit from model judgment.

The eventual public or recruiter-facing application must run without an OpenAI API key, another paid model API, or runtime LLM calls. Approved factory outputs may be compiled into deterministic data, pages, and interactions. This keeps the portfolio reviewable, predictable, low-cost, and independent of model availability. No application framework or runtime is selected in V0.1.

## Current boundaries

V0.1 contains documentation only: no database, LLM integration, API keys, dependency installation, fake execution layer, or user interface. See [ADR 0001](docs/decisions/0001-agent-native-architecture.md) for the foundational decision.
