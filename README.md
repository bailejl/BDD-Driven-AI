# BDD-Driven AI

**A 5-year-old reference codebase modernized with Claude Code doing 95%
of the work — and a journey log of exactly how.**

In 35 commits, this repo moved from a complex Nx monorepo on Node 12 to
a flat, AI-friendly architecture on Node 24. Stack swaps included
WebDriverIO → Playwright-BDD, Nx → Vite, plus comprehensive security
and lint modernization. The result:

- **92.39% test coverage** with zero lint errors
- **78+ code quality issues** resolved
- **~38,960 lines** of dependency / pattern updates
- **~95%** of the work done by Claude Code under deliberate guardrails

The point of this repo isn't the app. It's the **operating model** —
how a single engineer plus Claude Code can take a legacy codebase from
crusty to modern without the AI hallucinating its way through a
rewrite.

## Read these first

- 📖 [`docs/the-journey.md`](docs/the-journey.md) — the full 35-commit story:
  what worked, what broke, what the AI got wrong, and the guardrails
  that made 95%-AI delivery actually safe.
- 🤖 [`CLAUDE.md`](CLAUDE.md) — the agent contract. The single most
  important file for keeping AI behavior consistent across sessions.

## What this looks like in practice

Each branch holds one scenario — a Gherkin spec handed to the AI, with
a graded outcome on what the AI shipped, how much steering it needed,
and where it failed. Scenarios progress from toy PoC to enterprise-grade.

git branch -a

## Why this matters for R&D operations

The interesting question isn't "can AI write code." It's
"**at what scenario complexity does AI cost more coordination than it
saves**, and what guardrails change that line?" This repo is a working
attempt to answer both, in public, with the receipts.

## Local development

See [`CLAUDE.md`](CLAUDE.md) for the AI-first development workflow,
or [`docs/local-dev.md`](docs/local-dev.md) for the human one.

## License

Apache-2.0.
