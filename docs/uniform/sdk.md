# Uniform SDK / CLI / MCP usage

How to wire and maintain the Uniform SDK in this Next.js App Router monorepo. Loaded automatically by Cursor when editing `uniform.config.ts`, files under `apps/*/content/`, or App Router routes (see [`.cursor/rules/uniform-sdk.mdc`](../../.cursor/rules/uniform-sdk.mdc)). Linked from [`AGENTS.md`](../../AGENTS.md) for all other agents.

## SDK usage rules (critical)

1. **Full Uniform integration when asked to "add Uniform"**: do all of it — install packages, register the component, change prop types to Uniform parameter types for links/assets, and render text via `UniformText` / `UniformRichText` rather than raw strings.
2. **Never use `uniform:push` directly to write Uniform entities**: do not invoke the `uniform:push` script as a way to create or modify component definitions, component patterns, compositions, entries, or any Uniform entity. Use the Uniform MCP tool when configured; otherwise direct the user to perform the action in the Uniform web app, then re-run `npm run uniform:pull` to refresh local state.

## Authenticating

Uniform API keys are stored as `UNIFORM_API_KEY` in `.env`. They start with `uf...`. Minimum permission for reading compositions is "Read Published Compositions"; CLI usage requires read+write on whatever entity types you intend to sync (the `developer` role is a quick way to get full permissions). Use the **"Copy as .env"** button in the Uniform dashboard when creating a key — it emits all the env vars you need.

Required env vars in this repo:

- `UNIFORM_API_KEY` — server-side API key.
- `UNIFORM_PROJECT_ID` — server-side project ID.
- `NEXT_PUBLIC_UNIFORM_PROJECT_ID` — client-exposed mirror (used across `packages/csk-components` etc.).
- `UNIFORM_PREVIEW_SECRET=hello-world` — default value when setting up locally so preview works out of the box.

## How Uniform delivers layout data

A composition instance is hierarchical JSON: components nested in slots. Each component has a type that maps to a front-end component via the project's component map / registration.

**Routing** is delegated via Uniform's **Project Map**. The front-end defines a wildcard route that hands the path to Uniform's **Route API**, which resolves the correct composition instance.

## Next.js (App Router) wiring

This repo uses the **Next.js App Router** (`apps/csk/src/app/`, `apps/csk-marketing-site/src/app/`), not the Pages Router.

1. **Catch-all routing for Uniform compositions**: place the catch-all at the App Router root — e.g. `apps/<app>/src/app/[...path]/page.tsx`. If a conflicting `page.tsx` exists at the same level, rename it to `.off` (e.g. `page.tsx.off`) so it stops being a route, rather than deleting it.
2. **Composition-component coverage**: when adding the SDK, scan the Uniform project for composition components and **automatically create a corresponding front-end component for each in the codebase**, register it via the component map, and define every slot from the composition definition. Without this the preview can't resolve which React component renders the composition and will error.

## CLI

The CLI lives in the `@uniformdev/cli` npm package and **must be a devDependency** (already configured in `apps/csk` and `apps/csk-marketing-site`).

Config files in this repo:

- [`apps/csk/uniform.config.ts`](../../apps/csk/uniform.config.ts)
- [`apps/csk-marketing-site/uniform.config.ts`](../../apps/csk-marketing-site/uniform.config.ts)

These select which entity types to sync and where serialized files live (this repo serializes to **`./content/`** per the configs, not `./uniform-data/` — adjust any prior knowledge accordingly).

Two primary CLI commands:

- `uniform sync pull` — pull online project state into serialized files on disk.
- `uniform sync push` — push serialized files into the online project (mirror semantics: creates, updates, **and deletes**).

In this repo the scripts are wired per-app, not at the root:

- `npm run uniform:pull` (in `apps/csk` or `apps/csk-marketing-site`)
- `npm run uniform:push` (same)
- `npm run uniform:publish` (same)

Get CLI help: `uniform <command> --help`.

## CRITICAL — don't hand-edit serialized Uniform data

**Never create, read, update, or delete the YAML/JSON files under `apps/*/content/` directly when trying to manipulate Uniform components, content types, patterns, entries, or any other Uniform entity.** Those files are a mirror of online state; editing them by hand drifts state and is fragile.

Instead:

1. **If the Uniform MCP server is configured** (check for `.mcp.json` or active MCP tools), use it to make changes.
2. **Otherwise**, direct the user to perform the change in the Uniform web app and then run `npm run uniform:pull` in the affected app (`apps/csk` or `apps/csk-marketing-site`) to refresh disk state.
3. If you cannot reach an MCP action and the user expects one, return a graceful message and abort rather than attempting a CLI push.

After any MCP-driven change, **always run `npm run uniform:pull`** in the affected app so the on-disk state matches the online state.
