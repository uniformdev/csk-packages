# @uniformdev/csk-cli

`@uniformdev/csk-cli` is a command-line interface (CLI) tool designed to streamline the development workflow within Uniform projects. It provides commands for initializing projects, pulling Canvas data, pulling additional data like locales, and generating components based on Canvas data.

## Installation

You can install the package as a dependency in your project:

```bash
npm install @uniformdev/csk-cli --save-dev
```

## Commands

### `init` Command

The `init` command initializes your Uniform project by pushing content, design extensions, and publishing the context manifest.

#### Usage

Add the following script to your `package.json`:

```json
"scripts": {
  "init": "csk-cli init",
  "init:dev": "csk-cli init --dev"
}
```

Run the command using:

```bash
npm run init
```

#### Options

- `--dev` – Initializes the project in development mode, preserving all CSK variant folders.

#### What it does

1. Pushes design extensions configuration
2. Pushes content from `./content` folder using Uniform sync
3. Publishes the context manifest
4. If CSK variants are detected, prompts to select which variant to push
5. In production mode (default), cleans up unused variant folders after initialization

#### Environment Variables

Before running the command, configure the following environment variables:

- `UNIFORM_API_KEY` – Your Uniform API key (must have "Developer" role).
- `UNIFORM_PROJECT_ID` – The ID of your Uniform project.

These can be set in a `.env` file or provided directly in the CLI environment.

---

### `pull` Command

The `pull` command retrieves data for the project. It supports pulling Uniform Canvas data and locales.

#### Usage

Add the following scripts to your `package.json`:

```json
"scripts": {
  "pull:uniform": "csk-cli pull -u",
  "pull:uniform:dev": "csk-cli pull -u --dev",
  "pull:locales": "csk-cli pull -l"
}
```

Run the commands using:

```bash
npm run pull:uniform
# or
npm run pull:locales
```

#### Options

- `-u, --uniform` – Pulls Uniform Canvas data including design extensions and content.
- `-l, --locales` – Pulls locales configuration.
- `--dev` – Used with `-u` to pull in development mode, preserving all CSK variant folders.

#### Pull Uniform (`-u`)

When using the `-u` or `--uniform` flag, the command:

1. Pulls design extensions configuration
2. Applies design extensions to your project
3. Pulls content using Uniform sync to `./content` folder
4. If CSK variants are detected, prompts to select which variant to pull
5. In production mode (default), cleans up unused variant folders after pulling

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
