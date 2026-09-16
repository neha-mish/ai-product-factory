# ADR 0003: Published experiment data feed

- **Status:** Accepted
- **Date:** 2026-09-16

## Context

The first AnswerLens release opened with a fictional dataset. That proved the deterministic analysis and editing path, but weakened the credibility of the recruiter-facing demonstration. The remaining timebox did not justify authentication, a database, or multiple paid provider integrations.

## Decision

Use a published Google Sheet CSV as the default read-only experiment feed. Collect a small pilot manually from consumer AI experiences, retain platform/model/date provenance, ignore incomplete planned rows, and keep a fictional dataset only as a clearly labelled fallback.

The browser fetches and parses the public CSV. It does not write to the sheet. In-browser edits are ephemeral. The deterministic analysis engine remains independent of the feed.

## Consequences

- The demonstration uses observed rather than fabricated responses.
- New completed rows can appear without an application deployment.
- The sheet is public and therefore must contain no confidential, personal, employer, or client data.
- Manual collection limits scale but avoids claiming that provider API responses reproduce consumer-product behaviour.
- Google Sheets availability and publishing latency become runtime dependencies; the UI must expose failures and retain a fallback path.
- A production system would require provider-specific connectors, background execution, terms review, and versioned persistent storage.
