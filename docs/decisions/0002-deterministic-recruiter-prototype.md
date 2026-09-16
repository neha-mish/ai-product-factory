# ADR 0002: Deterministic AnswerLens prototype

- **Status:** Accepted
- **Date:** 2026-09-16

## Context

The V0.1 architecture deliberately deferred a public application until a real run justified one. The approved AnswerLens run defines a bounded experiment: analyze user-supplied AI answers for named-brand presence, mention order, target-absent competitor gaps, and visible citation domains. The artifact must be publicly reviewable, inexpensive, auditable, and buildable within four to five hours.

## Decision

Build AnswerLens as a client-side React and TypeScript application compiled by Vite. Keep the analysis engine deterministic and separate from presentation components. Ship sample data for immediate review and an editable structured form to prove that analysis is real. Use no backend, database, authentication, runtime model call, or required API credential.

The public app is a compiled view over an approved product run; Markdown remains the source of record for product reasoning, gates, and evaluation. Automated unit tests cover deterministic analysis. Manual checks cover first-use clarity, traceability, responsive layout, and language boundaries.

## Consequences

- The prototype is deployable as static assets and works without paid services.
- Results are reproducible and inspectable, but limited to literal names and explicit aliases.
- User data remains in the current browser session and is not persisted.
- The app cannot automate answer collection, semantic positioning, sentiment, or longitudinal tracking.
- Future runtime AI or persistence would require new evidence, an updated evaluation contract, and an architecture decision.

