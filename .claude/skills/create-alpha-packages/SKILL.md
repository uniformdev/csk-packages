---
name: create-alpha-packages
description: Cut an alpha release of this monorepo by appending `-alpha.1` to the `version` field in every workspace package.json (root + apps/* + packages/*), removing `package-lock.json`, and running `npm run reinstall` from the repo root. Triggered by "create alpha packages", "bump alpha", or `/create-alpha-packages`.
---

# create-alpha-packages

Bumps the `version` field in every workspace `package.json` from the current shared release like `6.1.84` to `6.1.84-alpha.1`, then refreshes the lockfile and `node_modules`. Mirrors the historical pattern from commits like `1727748c` ("chore: bump monorepo packages to 6.1.79-alpha.1").

This is **not** a dependency bump. For bumping external `@uniformdev/*` deps, use the separate `update-uniform-packages` skill.

## When to invoke

- "create alpha packages"
- "bump alpha" / "alpha bump" / "alpha release"
- `/create-alpha-packages`

## Conventions enforced

- All workspace `version` fields stay in **lockstep** (enforced by `manypkg check` via the root `workspace:check` script). If drift is detected, stop and surface it — do not silently fix.
- Postfix is **always `-alpha.1`**. Never increment to `-alpha.2`. If you need a new alpha after one was already cut, the base version itself should be bumped first (separate operation).
- **All** workspaces are touched, including private ones under the `@repo/*` scope.

## Workspace package.json files (reference snapshot — discover at runtime)

At authoring time the workspaces were:

```
package.json                                  (root, name: csk-packages)
apps/csk/package.json                         (@uniformdev/component-starter-kit)
apps/csk-marketing-site/package.json          (@uniformdev/csk-marketing-site)
apps/csk-storybook/package.json               (@uniformdev/csk-storybook)
packages/csk-cli/package.json                 (@uniformdev/csk-cli)
packages/csk-components/package.json          (@uniformdev/csk-components)
packages/csk-recipes/package.json             (@uniformdev/csk-recipes)
packages/design-extensions-tools/package.json (@uniformdev/design-extensions-tools)
packages/eslint-config/package.json           (@repo/eslint-config)
packages/internal-scripts/package.json        (@repo/internal-scripts)
packages/typescript-config/package.json       (@repo/typescript-config)
```

Always re-discover from the filesystem; do not hard-code.

## Steps

### 1. Read current version from root + every workspace

```bash
node -e "const fs=require('fs'),p=require('path');const files=['package.json'];for(const r of ['apps','packages']){if(!fs.existsSync(r))continue;for(const d of fs.readdirSync(r)){const f=p.join(r,d,'package.json');if(fs.existsSync(f))files.push(f);}}for(const f of files){const j=JSON.parse(fs.readFileSync(f,'utf8'));console.log(j.version+'\\t'+f);}"
```

### 2. Verify lockstep

Every printed line must share the same `version`. If any differs, **stop** and report:

```
Workspace version drift detected:
  6.1.84       package.json
  6.1.84       apps/csk/package.json
  6.1.83       packages/csk-components/package.json   <-- mismatch
Run `npm run workspace:fix` (manypkg fix) to resolve drift before re-running this skill.
```

Do not proceed.

### 3. Compute target version

Let `current` be the root's current `version`. Strip any prerelease tag (everything from the first `-` onward), then append `-alpha.1`.

| Current | Target |
|---|---|
| `6.1.84` | `6.1.84-alpha.1` |
| `6.1.84-alpha.1` | `6.1.84-alpha.1` (no-op, files won't change) |
| `6.1.84-rc.2` | `6.1.84-alpha.1` |

If `current === target` for every file, tell the user "Already at <target> — nothing to do" and stop (do not delete the lockfile or reinstall).

### 4. Edit each package.json

For every file from step 1, use the `Edit` tool to replace exactly:

- `old_string`: `"version": "<current>",`
- `new_string`: `"version": "<target>",`

The top-level `version` line is unique near the top of each `package.json` (lines 2–3), so the match is unambiguous. Do **not** use `replace_all`. Do **not** touch `dependencies`, `devDependencies`, or `peerDependencies`, even if a workspace name appears there.

### 5. Print summary

```
Bumped 11 files: 6.1.84 → 6.1.84-alpha.1
  package.json
  apps/csk/package.json
  apps/csk-marketing-site/package.json
  apps/csk-storybook/package.json
  packages/csk-cli/package.json
  packages/csk-components/package.json
  packages/csk-recipes/package.json
  packages/design-extensions-tools/package.json
  packages/eslint-config/package.json
  packages/internal-scripts/package.json
  packages/typescript-config/package.json
```

### 6. Remove the lockfile

```bash
rm -f package-lock.json
```

The root `reinstall` script does not delete the lockfile itself; we remove it explicitly so npm re-resolves from scratch.

### 7. Run reinstall from the repo root

```bash
npm run reinstall
```

This is the existing root script — it wipes all `node_modules` plus build artifacts (`.turbo`, `.next`, `dist`, `storybook-static`) and runs `npm install`. Stream output; do not background. Expect a couple of minutes.

### 8. Report final state

One-line confirmation: "Alpha cut: 6.1.84 → 6.1.84-alpha.1. Lockfile regenerated. Reinstall OK." Surface any reinstall failure verbatim and stop — do not attempt to "fix" it.

## Do NOT

- Do not increment past `-alpha.1` (use `-alpha.1` every time; the base version is what differs across runs).
- Do not modify any field other than the top-level `version` in each package.json.
- Do not touch `dependencies` / `devDependencies` / `peerDependencies`, even when a workspace name like `@uniformdev/csk-components` appears there with a `workspace:*` or version range.
- Do not "fix" workspace version drift silently — surface it and let the user resolve via `npm run workspace:fix`.
- Do not edit `package-lock.json` by hand; let `npm install` regenerate it.
- Do not commit, tag, push, or open a PR.
- Do not run `npm run build`, `lint`, or tests after reinstall unless asked.
- Do not switch package managers or edit `packageManager`.
