# Uniform CSK CLI

The **Uniform CSK CLI** provides a command-line interface (CLI) and utility functions to help you work with modules in csk. It is part of the [Uniform Platform](https://uniform.app). For more details, refer to our [documentation](https://docs.uniform.app).


## Installation

To get started, install the package in your Next.js application:

```bash
npm i @uniformdev/csk-cli
```

## `init` command

A command designed to help you quickly get started with CSK, allowing you to choose the templates and packages you want to install in your project.

### Usage
You can add a script command to your package.json for easier usage:

```json
"scripts": {
  "modules:init": "csk-cli init"
}
```

Run the command with:

```bash
npm run modules:init
```


## CLI Arguments

### `--template` / `-t`
Specifies the template to use for the project.  
Supported template options include:

- **`baseline`**: A minimal starting point with only essential features.
- **`coffee-shop`**: A template tailored for a coffee shop business with relevant components.
- **`radiant`**: A feature-rich template for vibrant and dynamic projects.

**Usage Example**:
```bash
csk-cli init --template baseline
```

---

### `--modules` / `-m`
Defines the modules to include in the project. You can specify one or more modules, separated by spaces.  

Available module options:
- **`localization`**: Adds support for managing and displaying multiple languages.
- **`ga`**: Integrates Google Analytics for tracking and insights.
- **`uniform-insights`**: Includes tools for enhanced performance and user behavior analytics.

**Usage Example**:
```bash
csk-cli init --modules localization ga uniform-insights
```

---

### Full Example
To create a project using the `coffee-shop` template and include `localization` and `ga` modules:
```bash
csk-cli init --template coffee-shop --modules localization ga
```


## Additional environment variable

###  Custom branches name
```dotenv
GOLD_BRANCH=
FULL_PACK_BRANCH=
```

## `scaffold` command

A Command designed to generate React components based on Canvas data. This package simplifies the process of creating and registering components in a Uniform project.

### Features

- Component Generation: Generates Canvas React components based on Canvas data with all the necessary imports, types and properties.
- Component Registration: Automatically registers components in the Custom Canvas resolver.
- Custom Folder Support: Optionally specify a custom folder path for your components.


### Usage

You can add a script command to your package.json for easier usage:

```json
"scripts": {
  "scaffold:add": "scaffold add"
}
```

Run the command with:

```bash
npm run scaffold:add
```

### Environment Variables

Before running the command, you can configure the following environment variables:

- UNIFORM_API_KEY: Your Uniform API key.
- UNIFORM_PROJECT_ID: The ID of your Uniform project.

These can be set in a .env file or provided directly during the CLI process.

### Optional Configuration

If you want to use a custom folder for your components, set the CUSTOM_CANVAS_FOLDER_PATH environment variable:

```bash
CUSTOM_CANVAS_FOLDER_PATH=src/components/custom-canvas
```

### Generated Code

The package generates a React component and integrates it into the Canvas resolver by updating the component mappings.

### Workflow

1. Set Environment Variables: Ensure the required variables (UNIFORM_API_KEY and UNIFORM_PROJECT_ID) are set.
2. Run the Command: Use npx scaffold add or your custom npm script (npm run scaffold:add).
