---
title: mdforge
subtitle: Stop shipping ugly docs.
---

# mdforge

> Markdown to premium interactive HTML in one command. Zero config.

**mdforge** transforms plain `.md` files into beautiful, self-contained HTML documentation with a premium dark theme, table of contents, syntax highlighting, scroll animations, and responsive design — all in a single output file with zero external dependencies.

## Why mdforge?

Every developer writes docs. Nobody's docs look good.

- **Docusaurus** requires a React project, config files, and a build pipeline
- **MkDocs** needs Python, plugins, and theme customization
- **GitHub README** has no dark theme, no interactivity, no visual hierarchy
- **mdforge** needs one command: `mdforge build README.md`

## Quick Start

```bash
# Install globally
npm install -g mdforge

# Or use directly with npx
npx mdforge build README.md

# Output to specific file
npx mdforge build README.md -o docs/index.html
```

That's it. Open the `.html` file. Your docs are premium.

## What You Get

Every output file includes:

| Feature | Status |
|---------|--------|
| Premium dark theme | Included |
| Auto-generated table of contents | Included |
| Syntax-highlighted code blocks | Included |
| Scroll-reveal animations | Included |
| Dark/light theme toggle | Included |
| Responsive (mobile-first) | Included |
| Print-ready stylesheet | Included |
| Reduced-motion support | Included |
| Zero external dependencies | Included |
| Single self-contained HTML file | Included |

## Frontmatter

Control the output with YAML frontmatter at the top of your markdown:

```yaml
---
title: My Project
subtitle: The official documentation
theme: dark
toc: true
animations: true
footer: "Built with mdforge"
---
```

## CLI Options

```bash
mdforge build <file>

Options:
  -o, --output <path>     Output file path
  -t, --theme <name>      Theme: dark | light (default: dark)
  --title <string>        Document title
  --subtitle <string>     Subtitle text
  --no-toc                Disable table of contents
  --no-animations         Disable scroll animations
  -v, --version           Show version
  -h, --help              Show help
```

## Example

### Input

A standard markdown file with headings, code blocks, tables, and lists.

### Output

A single `.html` file that looks like this:

- Dark background with grain texture
- Sticky sidebar with table of contents
- Active section tracking as you scroll
- Syntax-highlighted code blocks with language badges
- Smooth scroll-reveal animations
- One-click dark/light theme toggle
- Print-ready (hides sidebar, light background)
- Works offline (zero external dependencies)

## Code Highlighting

mdforge automatically highlights code blocks. Just specify the language:

```javascript
function calculateTax(assessedValue, rate) {
  const basic = assessedValue * rate.basicRpt;
  const sef = assessedValue * rate.sefRate;
  return { basic, sef, total: basic + sef };
}
```

```python
def calculate_penalty(balance, months_late, rate=0.02, cap=0.72):
    """LGC Section 255: 2% per month, 72% cap"""
    penalty_rate = min(months_late * rate, cap)
    return round(balance * penalty_rate, 2)
```

```bash
# Deploy in one command
docker-compose up -d
```

## How It Works

1. **Parse** — Reads your `.md` file, extracts frontmatter and content
2. **Transform** — Converts markdown to HTML, builds table of contents, highlights code
3. **Render** — Wraps everything in the premium theme with inline CSS and JS
4. **Output** — Writes a single self-contained `.html` file

No build folder. No assets directory. No configuration. One file in, one file out.

## Design Philosophy

> Your docs should look as good as your product.

mdforge is opinionated about aesthetics and unopinionated about everything else:

- **Dark-first** — because developers live in dark mode
- **Typography matters** — Inter for prose, JetBrains Mono for code
- **Whitespace is a feature** — generous padding, not cramped
- **Animations with purpose** — subtle reveals, not distracting
- **Accessibility built-in** — reduced motion, print styles, semantic HTML
- **Zero lock-in** — the output is plain HTML, take it anywhere

## Tech Stack

| Component | Choice |
|-----------|--------|
| Runtime | Node.js 18+ |
| Markdown | markdown-it |
| CLI | commander |
| Dependencies | **2 total** |

## License

MIT — do whatever you want.

## Credits

Built by [CozyDevKit](https://cozydevkit.com). Part of the Cozerna platform family.

---

*Stop shipping ugly docs.*
