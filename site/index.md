---
title: mdforge
subtitle: Stop shipping ugly docs.
accent: amber
footer: "Made with mdforge &mdash; <a href='https://github.com/cozydevkit/mdforge'>GitHub</a> &bull; <a href='https://cozydevkit.com'>CozyDevKit</a>"
---

# mdforge

> Markdown to premium interactive HTML in one command. Zero config. One file out.

Your README deserves better than GitHub's default renderer. Your API docs shouldn't look like a 1998 help page. Your project docs should look as good as your product.

**mdforge** takes any `.md` file and outputs a single, self-contained `.html` file with a premium dark theme, auto-generated table of contents, syntax-highlighted code blocks, scroll-reveal animations, dark/light toggle, and copy-to-clipboard — all with zero configuration and zero external dependencies.

---

## Quick Start

Install globally or use with npx — no project setup needed:

```bash
npm install -g @cozydevkit/mdforge
```

Then build any markdown file:

```bash
mdforge build README.md
```

That's it. Open the output `.html` file. Your docs are premium.

---

## One Command. Three Examples.

### Default (amber accent, dark theme)

```bash
mdforge build README.md -o docs/index.html
```

### Blue accent, minified for production

```bash
mdforge build README.md -o site/index.html --accent blue --minify
```

### Watch mode for live editing

```bash
mdforge build README.md -o preview.html --watch
```

---

## What You Get

Every output file is a **single self-contained HTML file** with:

| Feature | Details |
|---------|---------|
| Premium dark theme | Grain texture, generous whitespace, Inter + JetBrains Mono |
| Auto table of contents | Sticky sidebar with active section tracking |
| Syntax highlighting | Language badges, dark terminal styling |
| Copy to clipboard | Hover any code block, click Copy |
| Scroll animations | Subtle fade-up reveals, respects reduced-motion |
| Dark/light toggle | One click, persists to localStorage |
| 5 accent colors | amber, green, blue, purple, cyan |
| Mobile responsive | Hamburger sidebar, touch-safe |
| Print ready | Hides sidebar, light background for paper |
| Zero dependencies | No CDN, no Google Fonts, no external anything |

---

## Frontmatter

Control the output with YAML at the top of your markdown:

```yaml
---
title: My Project
subtitle: The official documentation
theme: dark
accent: blue
toc: true
animations: true
footer: "Built with mdforge"
---
```

All fields are optional. Defaults are sensible.

---

## CLI Reference

```bash
mdforge build <file> [options]
```

| Flag | Default | Description |
|------|---------|-------------|
| `-o, --output <path>` | `<file>.html` | Output file path |
| `-t, --theme <name>` | `dark` | Theme: dark or light |
| `-a, --accent <color>` | `amber` | Accent: amber, green, blue, purple, cyan |
| `-w, --watch` | off | Watch for changes, auto-rebuild |
| `-m, --minify` | off | Minify output HTML |
| `--title <string>` | — | Override document title |
| `--subtitle <string>` | — | Override subtitle |
| `--no-toc` | — | Hide table of contents |
| `--no-animations` | — | Disable scroll animations |

### Scaffold a new docs folder

```bash
mdforge init
```

Creates `docs/index.md` with a starter template and `.github/workflows/docs.yml` for auto-building on push.

---

## CI/CD Integration

Build docs automatically on every push to `main`:

```yaml
# .github/workflows/docs.yml
name: Build Docs
on:
  push:
    branches: [main]
    paths: ['docs/**']

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npx @cozydevkit/mdforge build docs/index.md -o site/index.html --minify
      - uses: actions/upload-pages-artifact@v3
        with:
          path: site/
```

---

## Why Not...

| Tool | What's missing |
|------|---------------|
| **Docusaurus** | Requires React, config files, build pipeline. Overkill for a README. |
| **MkDocs** | Python dependency. Plugin-heavy for basic styling. |
| **Docsify** | Runtime JS (no static output). SEO-weak. |
| **mdBook** | Rust ecosystem. Book format only. |
| **GitHub README** | No dark theme, no sidebar, no interactivity, no print stylesheet. |
| **mdforge** | One command. Zero config. Premium output. Single HTML file. |

---

## Design Philosophy

> Your docs should look as good as your product.

- **Dark-first** — developers live in dark mode
- **Typography matters** — Inter for prose, JetBrains Mono for code
- **Whitespace is a feature** — generous padding, not cramped
- **Animations with purpose** — subtle reveals, not distracting
- **Accessibility built-in** — reduced motion, print styles, semantic HTML
- **Zero lock-in** — the output is plain HTML, take it anywhere

---

## The Numbers

| Metric | Value |
|--------|-------|
| npm package size | 11.9 KB |
| Output file (typical) | 20-25 KB |
| Dependencies | 4 |
| Test coverage | 23 tests passing |
| Config required | 0 files |
| Time to first build | ~3 seconds |

---

## Built With

| Component | Choice |
|-----------|--------|
| Runtime | Node.js 18+ |
| Markdown | markdown-it |
| CLI | commander |
| Watch | chokidar |
| Minify | html-minifier-terser |

---

## Get Started

```bash
# Option A: Install globally
npm install -g @cozydevkit/mdforge
mdforge build README.md

# Option B: Use directly with npx
npx @cozydevkit/mdforge build README.md

# Option C: Scaffold a new docs folder
npx @cozydevkit/mdforge init
npx @cozydevkit/mdforge build docs/index.md
```

---

## License

MIT — do whatever you want.

Built by [CozyDevKit](https://cozydevkit.com).

---

*Stop shipping ugly docs.*
