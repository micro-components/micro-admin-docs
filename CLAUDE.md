# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the documentation site for MicroAdmin, an enterprise-level admin template built with Vue3, Vite5, TypeScript, Element-Plus, and UnoCSS. The documentation is built using VitePress and supports Chinese (zh-Hans) and English locales.

## Development Commands

```bash
# Install dependencies (uses pnpm)
pnpm install

# Start development server
pnpm docs:dev

# Build for production
pnpm docs:build

# Preview production build
pnpm docs:preview
```

## Project Structure

- `docs/` - VitePress documentation root
  - `src/` - Markdown source files (configured via `srcDir: "src"`)
    - `guide/` - Chinese guide documentation
    - `dev/` - Chinese development setup docs
    - `other/` - Chinese FAQ and misc docs
    - `en/` - English translations (mirrors Chinese structure)
    - `public/` - Static assets
  - `.vitepress/`
    - `config/` - VitePress configuration split by locale
      - `index.ts` - Main config entry
      - `shared.ts` - Shared config (base URL, search, social links)
      - `zh.ts` - Chinese locale config with sidebar/nav
      - `en.ts` - English locale config with sidebar/nav
    - `theme/` - Theme customization (extends default VitePress theme)

## Key Configuration Details

- **Base URL**: `/micro-admin-docs/` (for GitHub Pages deployment)
- **Search**: Algolia DocSearch configured
- **Locales**: Root is Chinese (`zh-Hans`), English at `/en/`

## Deployment

Automatically deploys to GitHub Pages on push to `main` branch via `.github/workflows/deploy.yml`. Build output goes to `docs/.vitepress/dist`.
