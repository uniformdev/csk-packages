# @uniformdev/csk-recipes

The **Uniform CSK Recipes** provides a command-line interface (CLI) and utility functions to help you work with recipes in a CSK project. It simplifies project initialization by allowing you to choose templates and include specific recipes.

## Installation

To get started, install the package in your Next.js application:

```bash
npm install @uniformdev/csk-recipes --save-dev
```

## `init` Command

The `init` command helps you quickly set up a CSK project by allowing you to select a template and include specific recipes.

### Usage

You can add a script command to your `package.json` for easier usage:

```json
"scripts": {
  "recipes:init": "csk-recipes init"
}
```

Run the command with:

```bash
npm run recipes:init
```

### CLI Arguments

#### `--template` / `-t`

Specifies the template to use for the project.
Supported template options include:

- **`baseline`**: A minimal starting point with only essential features.
- **`coffee-shop`**: A template tailored for a coffee shop business with relevant components.
- **`radiant`**: A feature-rich template for vibrant and dynamic projects.

**Usage Example**:

```bash
csk-recipes init --template baseline
```

---

#### `--recipes` / `-r`

Defines the recipes to include in the project. You can specify one or more recipes, separated by spaces.

Available recipe options:

- **`localization`**: Adds support for managing and displaying multiple languages.
- **`ga`**: Integrates Google Analytics for tracking and insights.
- **`uniform-insights`**: Includes tools for enhanced performance and user behavior analytics.

**Usage Example**:

```bash
csk-recipes init --recipes localization ga uniform-insights
```

---

#### `--dev` / `-d`

Runs the initialization in development mode.

**Usage Example**:

```bash
csk-recipes init --dev
```

### Full Example

To create a project using the `coffee-shop` template and include `localization` and `ga` recipes:

```bash
csk-recipes init --template coffee-shop --recipes localization ga
```

## Additional Environment Variables

### Custom Branch Names

You can configure custom branch names using environment variables:

```dotenv
GOLD_BRANCH=
BASELINE_RECIPES_BRANCH=
```
