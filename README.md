# Uniform Component Starter Kit (CSK6) Monorepo

Welcome to the **Uniform Component Starter Kit (CSK6)** monorepo! This repository contains multiple packages and applications designed to streamline the development workflow with **Next.js 15 App Router**, **TailwindCSS**, and **TypeScript**. It is powered by **Turborepo** to ensure efficient builds and optimized package management.

## Repository Structure

```
.github/              # GitHub Actions for CI/CD
 └── workflows/       # Automated workflows for package publishing
.husky/               # Pre-commit hooks to enforce linting rules
apps/
 ├── csk-v-next/      # Main Next.js 15 App Router application
 ├── csk-v-next-demo/ # Marketing site project with component catalog
 └── storybook/       # Interactive environment for visually testing UI components
packages/
 ├── csk-cli/         # CLI tool for project setup and automation
 ├── csk-components/  # Component library for building UI
 ├── csk-recipes/     # Predefined recipes for integrating features
 ├── design-extensions-tools/ # Utilities for design extension integration
 ├── eslint-config/   # Shared ESLint configuration
 └── typescript-config/ # Shared TypeScript configuration
.gitignore            # Ignoring unnecessary files
.npmrc                # NPM registry settings
.prettierrc.js        # Prettier formatting rules
commitlint.config.mjs # Commit message validation
package-lock.json     # Lock file for dependencies
package.json          # Root package configuration
README.md             # You're reading it now!
turbo.json            # Turborepo configuration
```

## Getting Started

### 1. Install Dependencies

Ensure you have **Node.js 20+** installed, then run:

```bash
npm install
```

### 2. Configure Environment Variables

Fill in the `.env` file inside `apps/csk-v-next` with the required settings before running the application.

### 3. Verify Setup

Run the following command to ensure everything is set up correctly:

```bash
npm run build
```

### 4. Running the Development Server

Navigate to the application directory and start the server:

```bash
cd apps/csk-v-next
npm run dev
```

### 5. Building the Project

To build all packages and applications:

```bash
npm run build
```

### 6. Running Linting & Formatting

This monorepo enforces consistent code quality using ESLint and Prettier. Run:

```bash
npm run lint
```

### 7. Publishing Packages

This repository includes **GitHub Actions** for NPM package publishing. This shoud be run manually on github actions.

## Pre-commit Hooks

We use **Husky** to enforce linting and commit message validation:

- **Linting**: Runs on every commit to ensure consistent code quality.
- **Commit Message Validation**: Enforces proper commit messages to follow best practices.

If a commit message does not follow the required format, it will be rejected.
