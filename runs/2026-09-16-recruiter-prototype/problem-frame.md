# Recruiter-Facing Prototype: Problem Frame

- **Run:** `2026-09-16-recruiter-prototype`
- **Date:** 2026-09-16
- **Owner:** Neha Mishra
- **Timebox:** Four focused hours
- **Target application:** Writesonic — AI Product Manager
- **Run outcome:** SUPERSEDED before Gate 1 approval
- **Superseded by:** [`../2026-09-16-answerlens/problem-frame.md`](../2026-09-16-answerlens/problem-frame.md)

> This initial direction framed the deliverable as a recruiter-facing wrapper around the repository. Human review concluded that a small, usable product experiment would provide stronger evidence for the target role. No Critic, Eval, or implementation work proceeded from this frame.

## Problem Frame

### Target user and stakeholders

The primary user is a recruiter or hiring manager reviewing Neha Mishra for an AI Product Manager role. They have limited attention and need to decide whether her application merits a deeper interview.

Neha is the product owner and subject of the evidence. She needs the experience to represent her work truthfully and make her product judgment visible without requiring the reviewer to inspect the repository in depth.

### Job to be done

When reviewing Neha's application, the recruiter or hiring manager needs to quickly verify that she can move an ambiguous AI product problem toward a testable decision—not merely describe AI concepts—so they can confidently decide whether to advance her.

### Problem

The current V0.1 repository demonstrates a thoughtful agent-native operating model, but only through documentation. A time-constrained reviewer must infer how its contracts, specialist roles, human gates, evaluations, and decision vocabulary work together. The repository therefore provides weak proof of actual execution despite having a strong product philosophy.

### Current alternative

The reviewer can read the README, architecture decision, specialist skills, and wiki pages. This is transparent and auditable, but it requires too much synthesis and does not show a completed input-to-decision journey.

### Desired outcome

Within a short review, the reviewer can:

1. understand the product problem and why the system exists;
2. follow one credible run from ambiguous input through specialist artifacts and human gates to a product decision;
3. distinguish implemented behavior from future ambition;
4. see evidence of Neha's product judgment, evaluation thinking, and hands-on building;
5. access the experience through a stable public link without signing in or supplying an API key.

The prototype is successful only if it makes the repository's existing method easier to inspect. It must not simulate a live autonomous agent or imply validation that has not occurred.

## Evidence

### Sourced facts

- The repository currently contains operating contracts, four specialist skills, durable knowledge conventions, architecture documentation, and one ADR, but no application or completed run. Source: repository at commit `d07dc06`.
- The required workflow is Discovery → Human Gate 1 → Critic → Eval → Human Gate 2 → Product Review. Source: `AGENTS.md`.
- Product Review produces exactly one of `EXPERIMENT`, `INVESTIGATE`, or `REJECT`. Source: `AGENTS.md` and `ARCHITECTURE.md`.
- The public experience must run without a paid model API or runtime LLM dependency. Source: `ARCHITECTURE.md` and ADR 0001.
- The user has authorized a recruiter-facing prototype for the Writesonic AI Product Manager application and set a four-hour timebox. Source: user instruction for this run.

### Inferences

- A guided, deterministic walkthrough of one real run is likely to communicate the architecture faster than repository documentation alone.
- Showing uncertainty, gates, and rejected assumptions is likely to be more credible than presenting a polished but opaque “AI agent” demo.

No recruiter research, usability data, traffic data, or conversion data has been supplied. None is claimed.

## Assumptions

1. A Writesonic recruiter or hiring manager will open an external portfolio link.
2. The reviewer will spend roughly two to four minutes on the first visit.
3. One deeply worked example will create more confidence than several shallow case-study cards.
4. The repository's decision workflow is relevant evidence for the target AI Product Manager role.
5. A deterministic experience can feel product-like and impressive without a live LLM.
6. The prototype can be deployed within the remaining timebox using a low-complexity stack.
7. The public artifact can disclose that its content was created with AI-assisted coding while keeping Neha's approvals and judgment explicit.

## Unknowns

- Which Writesonic reviewer persona will see the link first: recruiter, product leader, or technical interviewer?
- Whether the application form preserves links as clickable URLs.
- Which proof matters most to the reviewer: product framing, evaluation design, agent architecture, or implementation quality?
- Whether the reviewer will inspect the GitHub history after viewing the prototype.
- What device and viewport the reviewer will use.
- Whether a deployment account is already authenticated in this environment.

## Measurable Success

These are proposed outcome indicators, not yet an approved evaluation contract:

- A first-time reviewer can state the product's purpose and final decision after a brief guided review.
- The reviewer can identify both human approval gates and explain why they exist.
- Every material claim shown in the prototype maps to a committed repository artifact.
- The prototype clearly labels current capability, evidence, assumptions, and future scope.
- The deployed experience loads without authentication, API keys, or runtime model calls.
- The repository can be installed, tested, built, and redeployed using documented commands.
- The experience remains usable on common mobile and desktop viewport widths.

## Gate 1 Decision

- **Status:** PENDING
- **Human reviewer:** Neha Mishra
- **Decision needed:** Approve this problem frame, or specify revisions before Critic work begins.
