# docforge — Product Plan

> **Tagline:** Stop shipping ugly docs.  
> **One-liner:** A CLI that transforms markdown into premium interactive HTML documentation — dark theme, scroll animations, syntax highlighting, table of contents — zero config.  
> **Parent brand:** CozyDevKit.com  
> **License:** MIT  
> **Target:** Open source CLI tool + npm package

---

## The Gap

| What Exists | What's Missing |
|---|---|
| Docusaurus | Heavy (React SSR), requires config, opinionated structure |
| MkDocs | Python-based, bland default theme, plugin-heavy |
| Docsify | Runtime JS, no static output, SEO-weak |
| mdBook | Rust ecosystem only, book-format only |
| GitHub README | No interactivity, no dark theme, no visual hierarchy |
| **docforge** | **Single command. Markdown in. Premium HTML out. Zero config.** |

---

## Core Value Proposition

```
INPUT:  README.md (or any .md file)
OUTPUT: Standalone .html file with:
        - Premium dark theme (Cozerna-grade aesthetics)
        - Auto-generated table of contents
        - Scroll-reveal animations
        - Syntax-highlighted code blocks
        - Responsive (mobile-first)
        - Dark/light theme toggle
        - Print-ready stylesheet
        - Zero external dependencies in output
        - Single file — no build folder, no assets folder
```

---

## Architecture

```
docforge/
  bin/
    docforge.js          # CLI entry point (#!/usr/bin/env node)
  src/
    parser.js            # Markdown → AST (markdown-it)
    transformer.js       # AST → enriched HTML sections
    renderer.js          # HTML + CSS + JS → single file output
    themes/
      dark.css           # Default premium dark theme
      light.css          # Light theme variant
    templates/
      page.html          # Base HTML template (Handlebars-style)
    highlight.js         # Code syntax highlighting (inline)
    toc.js               # Table of contents generator
    animations.js        # Scroll reveal + counter animations
  test/
    fixtures/            # Sample .md files for testing
    parser.test.js
    renderer.test.js
  package.json
  README.md
  LICENSE
  .gitignore
```

---

## CLI Interface

### Basic Usage
```bash
# Single file
docforge build README.md

# Output to specific file
docforge build README.md -o docs/index.html

# Watch mode (rebuild on save)
docforge watch README.md

# Multiple files → multi-page site
docforge build docs/*.md -o site/

# With options
docforge build README.md --theme light --title "My Project" --no-animations
```

### Frontmatter Support
```markdown
---
title: My Project Documentation
subtitle: Enterprise Architecture Guide
theme: dark
accent: amber
logo: ./logo.svg
footer: "Built with docforge by CozyDevKit"
toc: true
animations: true
---

# Chapter 1: Getting Started
...
```

### CLI Flags
```
docforge build <file|glob>

Options:
  -o, --output <path>     Output file or directory (default: <input>.html)
  -t, --theme <name>      Theme: dark | light (default: dark)
  -w, --watch             Watch for changes and rebuild
  --title <string>        Document title (overrides frontmatter)
  --subtitle <string>     Subtitle below title
  --accent <color>        Accent color: amber | green | blue | purple | cyan
  --no-toc                Disable table of contents
  --no-animations         Disable scroll animations
  --no-theme-toggle       Hide dark/light toggle
  --minify                Minify output HTML
  -v, --version           Show version
  -h, --help              Show help
```

---

## Feature Set (MVP → V1 → V2)

### MVP (Prototype — this session)
- [ ] Parse markdown to HTML (markdown-it)
- [ ] Headings → auto-generated table of contents
- [ ] Code blocks → syntax highlighted (Prism-compatible inline)
- [ ] Wrap in premium dark theme (single-file CSS inlined)
- [ ] Scroll-reveal animations on sections (inline JS)
- [ ] Responsive layout
- [ ] CLI: `docforge build <file>` → outputs `.html`
- [ ] Single self-contained HTML output (no external deps)

### V1 (First npm publish)
- [ ] Frontmatter parsing (title, subtitle, theme, accent, logo)
- [ ] Dark/light theme toggle (inline)
- [ ] Multiple accent colors (amber, green, blue, purple, cyan)
- [ ] `--watch` mode with file watcher
- [ ] Print stylesheet
- [ ] Favicon injection
- [ ] `--minify` flag
- [ ] npm package: `npx docforge build README.md`

### V2 (Community growth)
- [ ] Multi-file → multi-page site with shared nav
- [ ] Custom CSS injection (`--css custom.css`)
- [ ] Logo/brand injection from frontmatter
- [ ] Search (inline, no server)
- [ ] Mermaid diagram support
- [ ] Math/LaTeX support (KaTeX inline)
- [ ] Copy-to-clipboard on code blocks
- [ ] GitHub-flavored markdown extensions (alerts, task lists)
- [ ] Plugin system (transform pipeline hooks)

---

## Tech Stack

| Component | Choice | Why |
|---|---|---|
| Runtime | Node.js 20+ | Universal, npm ecosystem |
| Markdown parser | markdown-it | Fast, extensible, plugin-rich |
| Syntax highlighting | Prism.js (subset) | Lightweight, inline-able, 30+ languages |
| CLI framework | commander.js | Standard, tiny, zero config |
| Template engine | String literals | No dependency needed for single template |
| File watcher | chokidar | Standard, cross-platform |
| Minifier | html-minifier-terser | Optional, production output |
| Test runner | Node test runner | Built-in, zero deps |

**Total dependencies: 4 (markdown-it, commander, chokidar, html-minifier-terser)**

---

## Theme Design (Inherited from Cozerna DNA)

The output HTML will carry the same design DNA as the Cozerna landing pages:

- **Dark-first:** `#050508` background, `#f0f4f8` text
- **Amber accent:** `#fbbf24` for links, highlights, TOC active
- **Typography:** Inter + JetBrains Mono (system fallbacks, no Google Fonts dependency)
- **Spacing:** Generous padding (premium feel)
- **Animations:** Subtle scroll-reveal (fade-up), respects `prefers-reduced-motion`
- **Code blocks:** Dark terminal style with language badge
- **TOC:** Sticky sidebar on desktop, collapsible on mobile
- **Headings:** Gradient underline on hover, anchor links
- **Tables:** Styled with alternating rows, amber header
- **Blockquotes:** Left-border accent, italic styling
- **HR:** Gradient line divider
- **Images:** Rounded corners, shadow, zoom on click

---

## Competitive Positioning

```
                    Config Required
                         ↑
            Docusaurus   |   MkDocs
              ●          |     ●
                         |
  ← Ugly ────────────────┼──────────────── Beautiful →
                         |
              Docsify     |   docforge ★
                ●        |     ●
                         |
                         ↓
                    Zero Config
```

**docforge lives in the bottom-right quadrant: beautiful + zero config.**

---

## Go-to-Market

### Phase 1: Prototype (Day 1)
- Working CLI that converts .md → premium .html
- Demo: convert docforge's own README into a showcase page
- Push to GitHub under CozyDevKit org

### Phase 2: Launch (Week 1)
- Publish to npm: `npx docforge build README.md`
- Product Hunt launch: "Stop shipping ugly docs"
- Hacker News Show HN post
- Dev.to article: "I built a CLI that turns markdown into cinematic docs"
- Twitter/X thread with before/after screenshots

### Phase 3: Community (Month 1)
- GitHub Actions integration example
- VS Code extension (preview pane)
- Template gallery (different accent colors, layouts)
- "Built with docforge" badge
- Community themes

---

## Success Metrics

| Metric | 1 Week | 1 Month | 3 Months |
|---|---|---|---|
| GitHub stars | 100 | 500 | 2,000 |
| npm weekly downloads | 50 | 500 | 5,000 |
| Product Hunt upvotes | 200 | — | — |
| Contributors | 1 | 5 | 15 |

---

## Session Execution Plan

**What we build NOW (MVP prototype):**

1. `package.json` + project scaffold
2. `src/parser.js` — markdown-it parse
3. `src/themes/dark.css` — premium dark theme (inline-ready)
4. `src/renderer.js` — assemble single-file HTML
5. `bin/docforge.js` — CLI entry point
6. `README.md` — the tool's own docs (also the demo input)
7. Test: `docforge build README.md` → open the output

**Let's go.**
