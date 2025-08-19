# @uniformdev/design-extensions-tools

A comprehensive command-line interface (CLI) tool and utility library for managing design tokens, UI components, and configurations in Uniform projects. This tool streamlines the workflow between design systems and development by providing seamless connection with design extensions integration.

## 🚀 Features

- **Design Token Management**: Pull, push, and apply design tokens (colors, dimensions, fonts, borders)
- **Multi-format Support**: Generate CSS and Tailwind CSS configurations
- **Environment Configuration**: Flexible configuration via environment variables or CLI options

## 📦 Installation

Install the package as a dependency in your project:

```bash
npm install @uniformdev/design-extensions-tools
```

Or install globally for CLI access:

```bash
npm install -g @uniformdev/design-extensions-tools
```

## 🔧 Setup

### Environment Configuration

Set up your environment variables in a `.env` file:

```bash
# Required: Your Uniform API key
UNIFORM_API_KEY=your_api_key_here

# Optional: Custom Uniform host (defaults to https://uniform.app)
UNIFORM_CLI_BASE_URL=https://uniform.app

# Optional: Project ID (can also be specified via CLI)
UNIFORM_PROJECT_ID=your_project_id
```

### Integration with Next.js

Wrap your pages with the `DesignExtensionsProvider` to enable design extension features:

```typescript
// app/layout.tsx or app/page.tsx
import { notFound } from 'next/navigation';
import { CANVAS_EDITOR_STATE } from '@uniformdev/canvas';
import {
  resolveRouteFromCode,
  UniformComposition,
  UniformPageParameters,
  createUniformStaticParams,
} from '@uniformdev/canvas-next-rsc-v2';
import { emptyPlaceholderResolver } from '@uniformdev/csk-components/components/canvas/emptyPlaceholders';
import { compositionCache } from '@uniformdev/csk-components/utils/getSlotComponents';
import { DesignExtensionsProvider } from '@uniformdev/design-extensions-tools/components/providers/server';
import { componentResolver } from '@/components';
import getAllStaticGeneratedPages from '@/utils/getAllStaticGeneratedPages';

export const generateStaticParams = async () => {
  const paths = await getAllStaticGeneratedPages();
  return createUniformStaticParams({
    paths,
  });
};

export default async function UniformPage(props: UniformPageParameters) {
  const result = await resolveRouteFromCode(props);

  if (!result.route) {
    notFound();
  }

  return (
    <DesignExtensionsProvider isPreviewMode={result.pageState.compositionState === CANVAS_EDITOR_STATE}>
      <UniformComposition
        {...result}
        resolveComponent={componentResolver}
        resolveEmptyPlaceholder={emptyPlaceholderResolver}
        compositionCache={compositionCache}
      />
    </DesignExtensionsProvider>
  );
}

export { generateMetadata } from '@/utils/metadata';

```

## 📋 Available Commands

### `pull` - Fetch Design Tokens

Downloads design token configurations from your integration and creates a `dex.config.json` file.

```bash
design-extensions-tools pull [options]
```

**Options:**
- `-c, --colors` - Pull colors configuration
- `-d, --dimensions` - Pull dimensions configuration  
- `-f, --fonts` - Pull fonts configuration
- `-b, --borders` - Pull borders configuration
- `-g, --groups` - Pull groups configuration
- `-at, --allTokens` - Pull all token types (colors, dimensions, fonts, borders)
- `-as, --allSettings` - Pull all settings (groups)
- `--apiKey <key>` - Uniform API key (defaults to UNIFORM_API_KEY env var)
- `--apiHost <url>` - Uniform host URL (defaults to UNIFORM_CLI_BASE_URL env var)
- `-p, --project <id>` - Uniform project ID (defaults to UNIFORM_PROJECT_ID env var)

**Examples:**
```bash
# Pull all design tokens
design-extensions-tools pull --allTokens

# Pull specific token types
design-extensions-tools pull --colors --dimensions

# Pull with custom project
design-extensions-tools pull --colors --project my-project-id
```

### `apply` - Apply Configuration

Applies the `dex.config.json` configuration to generate CSS or Tailwind CSS files.

```bash
design-extensions-tools apply [options]
```

**Options:**
- `-m, --mode <mode>` - Output format: `css` or `tailwind` (default: `tailwind`)

**Examples:**
```bash
# Generate Tailwind CSS configuration (default)
design-extensions-tools apply

# Generate pure CSS
design-extensions-tools apply --mode css
```

### `push` - Upload Design Tokens

Uploads design token configurations from your `dex.config.json` file to the integration.

```bash
design-extensions-tools push [options]
```

**Options:**
- `-c, --colors` - Push colors configuration
- `-d, --dimensions` - Push dimensions configuration
- `-f, --fonts` - Push fonts configuration
- `-b, --borders` - Push borders configuration
- `-g, --groups` - Push groups configuration
- `-at, --allTokens` - Push all token types
- `-as, --allSettings` - Push all settings
- `--apiKey <key>` - Uniform API key (defaults to UNIFORM_API_KEY env var)
- `--apiHost <url>` - Uniform host URL (defaults to UNIFORM_CLI_BASE_URL env var)
- `-p, --project <id>` - Uniform project ID (defaults to UNIFORM_PROJECT_ID env var)

**Examples:**
```bash
# Push all design tokens
design-extensions-tools push --allTokens

# Push specific token types
design-extensions-tools push --colors --borders

# Push with custom API key
design-extensions-tools push --colors --apiKey custom-key
```

## 📁 Configuration File

The tool generates and uses a `dex.config.json` file that contains your design token configurations:

```json
{
  "colors": {
    "light": {
      "button-primary": "#0052ED",
      "button-primary-hover": "#0B4ECA",
      "text-primary": "#001242",
      "page-background-primary": "#FFFFFF"
    }
  },
  "dimensions": {
    "container-small": "24px",
    "container-medium": "48px",
    "spacer-small": "20px",
    "spacer-medium": "40px"
  },
  "fonts": {
    "dm-sans": "",
    "space-mono": ""
  },
  "defaultFontKey": "dm-sans",
  "borders": {
    "border-primary": {
      "radius": "25px",
      "width": "1px",
      "color": "#E5E7EB",
      "style": "solid"
    }
  },
  "allowedGroups": {}
}
```