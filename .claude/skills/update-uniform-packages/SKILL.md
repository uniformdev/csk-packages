---
name: update-uniform-packages
description: Bump every external @uniformdev/* dependency in this monorepo to its latest npm version, leaving the local @uniformdev/* workspace packages untouched, then wipe the lockfile and run `npm run reinstall`. Triggered by "update uniform packages" or `/update-uniform-packages`.
---

# update-uniform-packages

Updates all external `@uniformdev/*` packages across this monorepo's package.json files to their latest npm versions, then refreshes the lockfile and `node_modules`. The seven `@uniformdev/*` workspace packages produced by this repo are skipped — they're resolved via npm workspaces, not the registry.

## When to invoke

Run when the user says any of:
- "update uniform packages"
- "bump uniform"
- `/update-uniform-packages`

## Trigger context (verify on every run — do not hard-code)

The lists below are **reference values from when this skill was authored**, captured for reviewer context. The skill itself **re-discovers** them at runtime so it stays correct as the monorepo evolves. Never trust these without confirming.

Local `@uniformdev/*` workspace names (skip-list) at authoring time:
`@uniformdev/design-extensions-tools`, `@uniformdev/csk-recipes`, `@uniformdev/csk-components`, `@uniformdev/csk-cli`, `@uniformdev/csk-storybook`, `@uniformdev/component-starter-kit`, `@uniformdev/csk-marketing-site`.

External `@uniformdev/*` deps in scope at authoring time:
`@uniformdev/assets`, `@uniformdev/canvas`, `@uniformdev/cli`, `@uniformdev/context`, `@uniformdev/metascript`, `@uniformdev/next-app-router`, `@uniformdev/next-app-router-client`, `@uniformdev/next-app-router-shared`, `@uniformdev/project-map`.

## Steps

### 1. Build the skip-list (local workspace names)

Run from the repo root:

```bash
node -e "const fs=require('fs'),p=require('path');const roots=['apps','packages'];const names=[];for(const r of roots){if(!fs.existsSync(r))continue;for(const d of fs.readdirSync(r)){const f=p.join(r,d,'package.json');if(fs.existsSync(f)){const n=JSON.parse(fs.readFileSync(f,'utf8')).name;if(n&&n.startsWith('@uniformdev/'))names.push(n);}}}console.log(names.join('\n'));"
```

Every name printed must be excluded from the bump.

### 2. Enumerate external `@uniformdev/*` deps in every package.json

For root `package.json` plus every `apps/*/package.json` and `packages/*/package.json`, read `dependencies`, `devDependencies`, and `peerDependencies`. Collect every key starting with `@uniformdev/`. Filter out anything in the skip-list from step 1. The result is the set of packages to bump.

```bash
node -e "const fs=require('fs'),p=require('path');const skip=new Set(process.argv.slice(1));const files=['package.json'];for(const r of ['apps','packages']){if(!fs.existsSync(r))continue;for(const d of fs.readdirSync(r)){const f=p.join(r,d,'package.json');if(fs.existsSync(f))files.push(f);}}const found={};for(const f of files){const j=JSON.parse(fs.readFileSync(f,'utf8'));for(const field of ['dependencies','devDependencies','peerDependencies']){const deps=j[field]||{};for(const k of Object.keys(deps)){if(k.startsWith('@uniformdev/')&&!skip.has(k)){(found[k]=found[k]||[]).push({file:f,field,current:deps[k]});}}}}console.log(JSON.stringify(found,null,2));" -- <skip-list-from-step-1>
```

This gives a map of `{ pkg: [ {file, field, current}, ... ] }`.

### 3. Resolve latest versions

For each unique external package, query npm:

```bash
npm view <pkg> version
```

Run these in parallel (one Bash call per package via parallel tool use) for speed.

### 4. Edit each package.json

For every `(pkg, file, field, current)` tuple from step 2, use the `Edit` tool on the file:

- `old_string`: `"<pkg>": "<current>"`
- `new_string`: `"<pkg>": "^<latest>"`

**Always emit `^<latest>`** — preserve the caret-range convention used throughout this repo, even if the current spec was an exact pin. If `current` is already `^<latest>`, skip the edit for that line.

Use a separate `Edit` call per occurrence; do not bulk-rewrite the file.

### 5. Print change summary

Before reinstalling, show the user a per-file summary like:

```
apps/csk/package.json
  @uniformdev/canvas               ^20.64.0 → ^20.71.0
  @uniformdev/cli                  ^20.64.0 → ^20.71.0
packages/csk-components/package.json
  @uniformdev/next-app-router      ^20.64.0 → ^20.71.0
  ...
```

Group by file. If nothing changed, say so and stop — don't run reinstall.

### 6. Remove the lockfile

```bash
rm -f package-lock.json
```

The root `reinstall` script does not delete the lockfile itself; we remove it explicitly so npm re-resolves from scratch.

### 7. Run reinstall from the repo root

```bash
npm run reinstall
```

This is the existing root script — it wipes all `node_modules`, build artifacts (`.turbo`, `.next`, `dist`, `storybook-static`), and runs `npm install`. Expect it to take a couple of minutes. Stream output; do not background it.

### 8. Report

One-line confirmation: which packages were bumped, that the lockfile was regenerated, and that reinstall exited 0. If reinstall failed, surface the error verbatim and stop — do not attempt to "fix" it.

## Do NOT

- Do not bump any package whose name appears in the step-1 skip-list, even if it's referenced as a dependency.
- Do not touch any version field that isn't an `@uniformdev/*` dependency.
- Do not modify the `version` field of the root or any workspace package.
- Do not switch package managers, edit `packageManager`, or hand-edit `package-lock.json` after it regenerates.
- Do not commit, tag, push, or open a PR — leave that to the user.
- Do not run `npm run build`, `lint`, or tests automatically after reinstall. The user will ask if they want that.
- Do not skip step 6 (lockfile removal) — bumping versions without regenerating the lockfile leaves stale resolutions.
