# @uniformdev/csk-cli

`@uniformdev/csk-cli` is a command-line interface (CLI) tool designed to streamline the development workflow within Uniform projects. It provides commands for pulling additional data and generating components based on Canvas data.

## Installation

You can install the package as a dependency in your project:

```bash
npm install @uniformdev/csk-cli --save-dev
```

## Commands

### `pull` Command

The `pull` command retrieves additional data for the project. Currently, it supports pulling locales, with potential future expansions.

#### Usage

Add the following script to your `package.json`:

```json
"scripts": {
  "pull:locales": "csk-cli pull -l"
}
```

Run the command using:

```bash
npm run pull:locales
```

#### Options

- `-l, --locales` – Pulls locales configuration.

#### Environment Variables

Before running the command, configure the following environment variables:

- `UNIFORM_API_KEY` – Your Uniform API key.
- `UNIFORM_PROJECT_ID` – The ID of your Uniform project.

These can be set in a `.env` file or provided directly in the CLI environment.

#### Optional Configuration

To specify a custom folder for generated components, set the `CUSTOM_CANVAS_FOLDER_PATH` environment variable:

```bash
LOCALES_PATH=src/i18n
```

---

### `scaffold` Command

The `scaffold` command generates React components based on Canvas data, making it easier to integrate new components into a Uniform project.

#### Features

- **Component Generation**: Automatically generates React components with necessary imports, types, and properties.
- **Component Registration**: Registers components in the Custom Canvas resolver.
- **Custom Folder Support**: Allows specifying a custom folder for generated components.

#### Usage

Add the following script to your `package.json`:

```json
"scripts": {
  "scaffold:add": "csk-cli scaffold"
}
```

Run the command using:

```bash
npm run scaffold:add
```

#### Environment Variables

Before running the command, configure the following environment variables:

- `UNIFORM_API_KEY` – Your Uniform API key.
- `UNIFORM_PROJECT_ID` – The ID of your Uniform project.

These can be set in a `.env` file or provided directly in the CLI environment.

#### Optional Configuration

To specify a custom folder for generated components, set the `CUSTOM_CANVAS_FOLDER_PATH` environment variable:

```bash
CUSTOM_CANVAS_FOLDER_PATH=src/components/custom-canvas
```

#### Generated Code

The package generates a React component and integrates it into the Canvas resolver by updating the component mappings.

#### Workflow

1. **Set Environment Variables**: Ensure `UNIFORM_API_KEY` and `UNIFORM_PROJECT_ID` are set.
2. **Run the Command**: Use `npm run scaffold:add` as configured in your project.
