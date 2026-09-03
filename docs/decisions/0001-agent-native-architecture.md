# ADR 0001: Agent-native repository architecture

- **Status:** Accepted
- **Date:** 2026-09-02

## Context

AI Product Factory must demonstrate how an AI Product Manager designs a reliable environment for bounded agents, durable knowledge, evaluation, and human judgment. A chat-first system would leave responsibilities, evidence, and decisions trapped in transient conversation context. The eventual public experience must also operate without an OpenAI API key, paid model calls, or runtime LLM dependency.

## Decision

Use version-controlled Markdown as system memory, a concise `AGENTS.md` as the operating contract and map, specialist `SKILL.md` files for bounded capabilities, explicit directories for runs, products, reusable wiki knowledge, and ADRs, and two human approval gates before solution development and implementation.

The workflow is Discovery → Critic → Eval → Product Review, producing exactly `EXPERIMENT`, `INVESTIGATE`, or `REJECT`. Builder and evaluator concerns are separated where practical, with human-controlled sealed scenarios for holdout evaluation.

AI may assist during factory work where judgment or synthesis adds value. The eventual recruiter-facing application will consume approved artifacts as deterministic/static content and interactions, without requiring runtime LLM calls or paid APIs. Technology for that application is deliberately not selected in V0.1.

## Alternatives considered

### Chatbot as the core architecture

Rejected because chat context is difficult to audit, version, promote selectively, or use as durable product memory. It also encourages a runtime model dependency that conflicts with the public-experience constraint.

### One general-purpose agent prompt

Rejected because it obscures responsibility, weakens builder/evaluator independence, and makes specialist behavior harder to inspect or revise.

### Custom orchestration service and database

Deferred because V0.1 needs transparent operating contracts and artifacts, not infrastructure. Adding services now would increase complexity without validating the product method.

### Deterministic workflow only

Not selected as the complete factory because discovery criticism and synthesis can benefit from bounded AI judgment. Deterministic mechanisms remain preferred for tasks that do not require it.

## Consequences

- The repository is readable and auditable by humans and agents.
- Knowledge survives individual chats and can evolve through reviewable diffs.
- Human gates and artifact promotion require deliberate coordination rather than automatic execution.
- Markdown conventions provide transparency but not enforcement; later tooling may validate them deterministically.
- The public application can remain predictable and accessible without credentials, model latency, or usage cost.

## Risks

- Documentation can drift across contracts, skills, and architecture.
- Agents may bypass gates or mislabel unsupported claims without validation and review.
- Sealed scenarios can leak or become unrepresentative.
- The wiki can accumulate raw output unless promotion discipline is maintained.
- Manual artifact management may become cumbersome as usage grows.

## Revisit conditions

Revisit this decision when repeated real runs show that Markdown cannot support traceability or scale; gate compliance needs enforceable automation; sealed-test custody needs stronger controls; multiple contributors require structured workflow state; or a validated public use case materially benefits from optional runtime AI without making it required.
