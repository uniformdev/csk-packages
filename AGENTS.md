# AGENTS.md

Guidance for AI coding agents working in this repository. Plain markdown, no enforced schema. Deep reference material lives in [`docs/uniform/`](docs/uniform/) and is loaded selectively (Cursor via `.cursor/rules/*.mdc` globs; other agents follow the links below when relevant). This file stays slim and always-applicable.

## Project overview

This is the **Uniform Component Starter Kit (CSK)** monorepo — an npm workspaces project with workspaces under [`apps/*`](apps/) and [`packages/*`](packages/). All workspaces keep their `version` field in lockstep (enforced by `manypkg check`). External `@uniformdev/*` packages come from npm; several `@uniformdev/*` packages are produced *by* this repo (workspace packages) and must not be confused with the npm-published ones.

Package manager: **npm 11.x**. Node: `^18.18.0 || ^19.8.0 || >= 20.0.0`. Stack: **Next.js App Router**.

## Common scripts (run from repo root)

| Command | What it does |
|---|---|
| `npm run build` | Full build via Turbo across all workspaces. **Use this to verify changes** — workspace-level checks can miss runtime errors that the full root build catches. |
| `npm run lint` / `npm run lint:fix` | Turbo lint across all workspaces |
| `npm run format` | Turbo format |
| `npm run workspace:check` | `manypkg check` — verifies workspace versions are in lockstep |
| `npm run workspace:fix` | `manypkg fix` — resolves workspace version drift |
| `npm run reinstall` | Wipe `node_modules` + build artifacts everywhere, then `npm install` |

## Workflows (project-level skills)

Deterministic, repeatable chores — follow the canonical procedure in the linked file, don't improvise:

- **Update Uniform packages** → bump every external `@uniformdev/*` dependency to its latest npm version (skipping the local workspace `@uniformdev/*` packages), wipe the lockfile, run reinstall. Triggered by "update uniform packages" / "bump uniform" / `/update-uniform-packages`. Procedure: [`.claude/skills/update-uniform-packages/SKILL.md`](.claude/skills/update-uniform-packages/SKILL.md).
- **Create alpha packages** → bump every workspace's `version` field from `X.Y.Z` to `X.Y.Z-alpha.1` (all workspaces stay in lockstep), wipe the lockfile, run reinstall. Triggered by "create alpha packages" / "bump alpha" / "alpha release" / `/create-alpha-packages`. Procedure: [`.claude/skills/create-alpha-packages/SKILL.md`](.claude/skills/create-alpha-packages/SKILL.md).

## House rules

- **Never bump the local workspace `@uniformdev/*` packages to npm registry versions.** The packages with `@uniformdev/*` *names* under `apps/*` and `packages/*` are produced by this repo and resolved via npm workspaces; they are not the same as the npm-published `@uniformdev/*` SDK packages.
- **Workspace versions stay in lockstep.** Don't bump one workspace's `version` without bumping them all. Use `npm run workspace:fix` if drift is detected.
- **Do not commit, tag, push, or open PRs autonomously.** Leave that to the human.
- **Do not skip git hooks** (`--no-verify`, `--no-gpg-sign`, etc.) unless the human explicitly asks.
- **Do not run `build` / `lint` / tests automatically after a reinstall** unless asked.
- **Lockfile**: don't hand-edit `package-lock.json`. If a workflow requires regenerating it, delete it and run `npm run reinstall`.
- **Verification**: prefer `npm run build` from the repo root over workspace-scoped checks — the root build catches RSC runtime errors that scoped checks miss.

## Coding standards

- Generate clean code; remove unused code so the linter and TypeScript checks pass automatically.
- **Package manager: npm.** This repo uses npm workspaces with `package-lock.json`. Do not introduce `pnpm` or `yarn`; do not commit alternative lockfiles.
- You are a senior front-end engineer — follow current Next.js / React / TailwindCSS best practices. Do not re-invent the wheel.
- Do not over-deliver. Make the minimum changes the user asked for; do not create more components, files, or abstractions than requested.
- **Verification: `npm run build` from the repo root** is the canonical post-change check — it catches RSC runtime errors that workspace-scoped checks (typecheck/lint) miss. Do **not** run a build *concurrently* with `npm run dev` — stop the dev server first, since they share build artifact directories.

## Environment variables

Always wire up when working with Uniform:

- `UNIFORM_API_KEY` — server-side API key (read-published-compositions permission minimum, more for CLI usage).
- `UNIFORM_PROJECT_ID` — server-side project ID.
- `NEXT_PUBLIC_UNIFORM_PROJECT_ID` — client-exposed mirror (already used across `packages/csk-components` etc.).
- `UNIFORM_PREVIEW_SECRET=hello-world` — default value when setting up locally so preview works out of the box.

## Deep references (load when relevant)

These docs are linked, not inlined — consult them when working on the matching surface area. Cursor auto-attaches them via globs in `.cursor/rules/`; Claude Code and other agents should read them on demand from these links.

- **[docs/uniform/concepts.md](docs/uniform/concepts.md)** — Uniform CMS modeling: compositions, components, slots, patterns, naming, parameter/field types, MCP unsupported features. Consult when designing or describing Uniform entities. Cursor auto-attach globs: `apps/**/*.{ts,tsx}`, `packages/csk-components/**`, `packages/csk-recipes/**`, `packages/design-extensions-tools/**`.
- **[docs/uniform/sdk.md](docs/uniform/sdk.md)** — Uniform SDK / CLI / MCP usage: `uniform.config.ts`, sync push/pull, App Router catch-all route wiring, MCP-vs-CLI rules, the "never hand-edit `apps/*/content/`" rule. Consult when wiring or maintaining the SDK. Cursor auto-attach globs: `apps/*/uniform.config.ts`, `apps/*/content/**`, `apps/*/.env*`, `apps/*/src/app/**`.

## How agents discover these workflows

| Agent | Always-on | Loaded selectively |
|---|---|---|
| Claude Code | [`CLAUDE.md`](CLAUDE.md) → `@AGENTS.md` | [`docs/uniform/*.md`](docs/uniform/) via markdown links when relevant; [`.claude/skills/<name>/SKILL.md`](.claude/skills/) for workflows |
| Cursor | this `AGENTS.md` (natively read per Cursor docs as an alternative to `.cursor/rules`) | [`.cursor/rules/uniform-concepts.mdc`](.cursor/rules/uniform-concepts.mdc) + [`.cursor/rules/uniform-sdk.mdc`](.cursor/rules/uniform-sdk.mdc) auto-attach via globs; workflow `.mdc` files trigger on intent |
| Codex / Aider / Copilot / Zed / JetBrains Junie / Warp / Devin / Google Jules / others | this `AGENTS.md` | `docs/uniform/*.md` via the markdown links above |

If you're editing always-on rules, edit **this file only**. If you're editing Uniform deep reference, edit the relevant `docs/uniform/*.md` only. If you're editing a workflow procedure, edit the `SKILL.md` only — entry-point files pick up changes automatically.
