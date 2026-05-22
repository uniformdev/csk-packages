# Uniform CMS — core concepts

Reference for how Uniform models content. Read this before creating, editing, or describing Uniform entities. This doc is loaded automatically by Cursor when editing Uniform-aware code (see [`.cursor/rules/uniform-concepts.mdc`](../../.cursor/rules/uniform-concepts.mdc)) and is linked from [`AGENTS.md`](../../AGENTS.md) for all other agents.

## Authoring practices (critical)

1. **Component patterns**: Always create a component pattern when pushing a new component to a Uniform project, and fill it with realistic content (using prior examples of the component's usage where possible; otherwise generate sensible defaults).
2. **Slot defaults**: When creating a new slot in Uniform, configure it with `allowAllComponents=true`, `inheritAllowedComponents=false`, and `patternsInAllowedComponents=false`.
3. **Parameter overridability**: When pushing a component pattern, mark every parameter as overridable by default.
4. **Repeated properties**: When you see repeated property sets (e.g. `title1/description1/image1`, `title2/description2/image2`, …), model the repeated set as a child component and render it via `UniformSlot`. Avoid suffix-numbered parameter pollution.

## Compositions

A **composition instance** is roughly equivalent to a page. **Composition definitions** define a reusable schema for instances — same structure as a component (parameters + slots), plus a route/page binding that instances use.

- "Composition" alone is ambiguous — infer from context: schema/template ⇒ definition; page/route ⇒ instance.
- Composition **parameters** are for global content that will never be personalized (e.g. OpenGraph / meta tags). Don't put "hero title" on the composition — put it on a `Hero` component in the content slot.
- A single composition definition called `Page` is usually enough. Add more (e.g. `Popup`, `Minimal Page`) only when the page shell or parameters genuinely differ.

## Entries

**Entries** are instances of structured content defined by a **content type** (the blueprint). Each entry has a built-in slug; do not define an explicit `slug` field.

How entries differ from compositions/components: an entry is design-agnostic structured content. A component/composition is the experience layer that displays content. The same entry can be shown via a hero, a card, or a list component by binding entry fields to component parameters in a pattern.

Entries can reference other entries (relationships) to compose complex structures.

## Components

A Uniform component is a CMS-author-manipulable visual element with **parameters** (props) and **slots** (named child-component containers). Each component has a definition (schema) and instances (placed within composition slots).

Component definition attributes: _name_, _public ID_, _parameters_, _slots_.

Slot definition attributes: _name_, _public ID_, _allowed components_, _min components_, _max components_.

**Slot allowability rules**:

1. `allowAllComponents: true` — anything goes.
2. `allowAllComponents: false` — `allowedComponents` is an explicit list of public IDs. Component patterns are listed with a `$p:<uuid>` prefix.
3. `patternsInAllowedComponents`:
   - `true` — a pattern is only allowed if its specific `$p:<uuid>` is in the list. Other patterns based on the same base component are not allowed.
   - `false` — a pattern is allowed if its base component type is in the list. (When flipping this to `false`, remove any `$p:` entries first.)
4. When editing a component or composition **pattern definition**, the slot section component (`$slotSection`) is always allowed in any slot.

Before adding components to a slot, confirm they're allowed by the above rules.

## Slot sections (`$slotSection`)

Only valid inside **component patterns** and **composition patterns** — not on regular component definitions.

- A slot section creates an extension point so pattern consumers can insert components into a slot that's otherwise locked down by the pattern.
- Slot sections have one slot, `$slotSectionItems`. When pattern consumers add components, they target `$slotSectionItems` — not the parent slot name.
- At delivery time, the slot section dissolves and its children become part of the parent slot.
- Slot sections cannot have default components when defined on a pattern.
- Slot section contents on nested patterns may only be set on the direct parent consumer. To expose a nested slot section, re-export it by adding a slot section to the parent pattern in the child's slot section.
- Do NOT include `$slotSection` in lists of allowed components for plain (non-pattern) entities.

## Content types

Define a reusable structure for content (e.g. `Product`, `BlogPost`) with fields. Entries are instances. A content type schema differs from a component schema: components represent a specific visual rendering; content types are abstract content shapes that can be presented many ways via patterns.

Content type attributes: _name_, _public ID_, _fields_.

## Patterns

Patterns are units of reuse. Updates to a pattern propagate to every consumer immediately.

- **Component pattern** — a shared component instance with parameter values and slot children. Can be nested 2–3 levels deep (more causes performance issues).
- **Composition pattern** — a shared composition template; non-overridable data is locked down.
- **Entry pattern** — same idea for entries.
- **Overrides** — a pattern definition can mark parameters/fields as overridable. Consumers can break inheritance and supply their own values. Nested patterns inherit overridability; you cannot re-lock an already-overridable parameter from an outer pattern.
- **As shared content snippets** — reuse exact content (e.g. legal disclaimer on every press release).
- **As data binding templates** — a pattern can declare a **data resource** (e.g. a Uniform entry or external REST API) and bind parameters to it via **dynamic tokens** like `${#jptr:/myEntry/fields/title}`. Example: a `Product Card` pattern with an entry data resource auto-fills `title` and `image` from a chosen product.

Pattern attributes: _name_, _type_ (base component public ID), _public id_, _data resources_ (name, type), _parameters_ (value, overridable), _slots_.

## Assets

Media files live in the **Asset Library**. Mesh integrations can add external sources (DAM, Unsplash, Getty, …).

Asset attributes: _public id_, _type_ (`image`/`video`/`audio`/`document`/`other`), _source_ (`uniform-assets` or a Mesh integration ID), _fields_ (title, description, file, URL, focal point, dimensions, …).

## Localization

Locales are declared at the project level. Compositions, entries, and patterns must **enable** a locale before they can have content in it. Enable the default locale on new entries/patterns/compositions unless the user specifies otherwise.

## Field / parameter types

Common attributes: _name_, _public ID_ (unique within a component or content type; cannot be changed after creation), _localizable_, _required_, _type_, _guidance_, _overridable_ (only on pattern definitions).

Allowed types: `text`, `richText` (Lexical JSON), `select`, `multi-select`, `number`, `date`, `dateTime`, `checkbox`, `link`, `asset`, `json` (not author-friendly), `contentReference` (content types only — not components), `$enr` (enrichment tagging), `group` (visual grouping; grouped fields must immediately follow the group in the fields list).

## Naming conventions

- Names use **title-cased prose**: `Main Header`, not `main-header` or `MainHeader`. Don't include the entity type in the name (`Hero`, not `Hero Component`).
- Don't name entities after sample content; describe meaning. `<h1>Hello</h1>` is FPO — the component is `Headline`, not `Hello`.
- **Public IDs** are camelCase, slugified from the name (`Main Header` → `mainHeader`). Unique within their entity type. Immutable after creation.
- Public IDs that start with `$` are **system-owned**. Don't try to alter system components like `$personalization` or remove the `$viz` parameter. You may add/remove system components such as `$test` in `allowedComponents` lists.
- Help text is 1 short sentence, plain text, no markdown/HTML. Often unnecessary — only add it when expectations are non-obvious (e.g. "Image must be 250×250 px").

## Tool usage tips

- Before creating or updating Uniform Patterns, fetch the relevant Component Definitions so you know valid types and parameters.
- Batch multiple updates to the same pattern into a single tool call.
- When a Uniform tool returns an edit URL, surface it to the user as a link.
- Before reordering parameters/fields on a definition, fetch the latest data so you target the correct positions.
- Reordering = remove + re-add in the new order.
- Enable the default locale on new entries/patterns/compositions unless the user says otherwise.
- Duplicating entries/compositions/patterns: use the duplicate function, not "create new + copy data".

## Unsupported via MCP / AI today

If the user asks for any of these, explain the limitation and (where possible) offer a Uniform web app link instead:

- Creating new Loop component instances
- Adding/editing/removing block-type fields, parameters, or definitions
- Editing conditional values on parameters/fields (default value is editable)
- Setting visibility rules on component instances
- Changing data sources, types, or resources
- Adding/removing project map nodes or linking compositions to them
- Adding/removing content from Uniform Releases, or modifying releases (lock, schedule)
- Anything that requires published content (you only have draft access)
- Managing workflows or workflow stage transitions
- Creating, uploading, editing, or deleting assets
- Changing user permissions
