# mdforge — Launch Playbook

> Date: 2026-04-01  
> Status: Ready to execute

---

## Launch Assets

### 1. Product Hunt

**Name:** mdforge  
**Tagline:** Stop shipping ugly docs.  
**Description:**

mdforge is a CLI that transforms any markdown file into a premium, self-contained HTML page — dark theme, table of contents, syntax highlighting, scroll animations, copy-to-clipboard, dark/light toggle — all in one command with zero configuration.

One file in. One file out. No React project. No Python. No config files.

```
npx @cozydevkit/mdforge build README.md
```

**Topics:** Developer Tools, Open Source, Documentation, Markdown, CLI

**Maker Comment:**

I kept building premium interactive HTML docs for client projects — dark themed, animated, with TOC sidebars and syntax highlighting. After the fifth time, I thought: why isn't this a tool?

mdforge takes any .md file and outputs a single self-contained .html with everything inlined. No CDN, no Google Fonts, no external dependencies. The output file works offline, prints cleanly, and looks like a $5,000 documentation site.

The tool itself is 12 KB on npm with 4 dependencies. The entire landing page at mdforge.dev was built using mdforge (meta-demo).

---

### 2. Hacker News (Show HN)

**Title:** Show HN: mdforge — Markdown to premium interactive HTML in one command

**Text:**

I built a CLI tool that transforms markdown files into premium, self-contained HTML documentation pages.

Why: I kept hand-building dark-themed interactive doc pages for projects (with TOC, animations, syntax highlighting, etc). After building the same thing 5+ times, I extracted it into a tool.

What it does:
- `npx @cozydevkit/mdforge build README.md` → single .html file
- Premium dark theme with grain texture, generous whitespace
- Auto-generated sticky TOC sidebar with scroll tracking
- Syntax-highlighted code blocks with copy-to-clipboard
- Dark/light theme toggle (persists to localStorage)
- 5 accent colors (amber, green, blue, purple, cyan)
- Responsive, print-ready, respects prefers-reduced-motion
- Zero external dependencies in output — works offline
- 12 KB npm package, 4 dependencies total

What it's NOT:
- Not a static site generator (no routing, no build folder)
- Not a replacement for Docusaurus (no React, no plugins)
- It's specifically for: "I have a README and I want it to look amazing"

The landing page (mdforge.dev) was built using mdforge itself.

GitHub: https://github.com/cozydevkit/mdforge
npm: https://www.npmjs.com/package/@cozydevkit/mdforge

---

### 3. Dev.to Article

**Title:** I built a CLI that turns markdown into cinematic docs

**Tags:** #opensource #cli #markdown #webdev

**Body:**

# I built a CLI that turns markdown into cinematic docs

Every developer writes documentation. Almost nobody's docs look good.

I kept building premium dark-themed documentation pages for client projects — the kind with sticky sidebar TOCs, scroll-reveal animations, syntax-highlighted code blocks, and dark/light toggles. After building the same thing for the fifth time, I asked: **why isn't this a one-command tool?**

So I built **mdforge**.

## What it does

```bash
npx @cozydevkit/mdforge build README.md
```

That's it. Your `README.md` becomes a single, self-contained `.html` file with:

- Premium dark theme (grain texture, generous whitespace, Inter + JetBrains Mono)
- Auto-generated sticky TOC sidebar with active section tracking
- Syntax-highlighted code blocks with copy-to-clipboard
- Dark/light theme toggle (persists to localStorage)
- Scroll-reveal animations (respects `prefers-reduced-motion`)
- 5 accent colors (amber, green, blue, purple, cyan)
- Mobile responsive with hamburger sidebar
- Print-ready stylesheet
- **Zero external dependencies** — the output works offline

## The key insight

The output is **one file**. No `dist/` folder. No `assets/` directory. No `index.html` that loads 14 CSS and JS files. One file. Open it in a browser. Done.

Everything — CSS, JS, fonts (system fallbacks) — is inlined. You can email the file, host it on GitHub Pages, drop it in an S3 bucket, or open it from your desktop.

## How it works

1. **Parse** — markdown-it converts your .md to HTML, extracts frontmatter
2. **Transform** — Builds table of contents, highlights code blocks
3. **Render** — Wraps everything in the premium theme with inlined CSS + JS
4. **Output** — Writes a single self-contained .html file

## The numbers

| Metric | Value |
|--------|-------|
| npm package size | 12 KB |
| Dependencies | 4 |
| Output file (typical) | 20-25 KB |
| Config required | 0 files |
| Tests | 23 passing |

## What I didn't build

mdforge is **not** Docusaurus. It's not a static site generator. It doesn't have routing, plugins, or a React runtime.

It's specifically for the use case of: "I have a markdown file and I want it to look premium."

## Try it

```bash
# Use directly
npx @cozydevkit/mdforge build README.md

# Or install globally
npm install -g @cozydevkit/mdforge
mdforge build README.md -o docs/index.html --accent blue
```

The landing page at mdforge.dev was built using mdforge itself. Meta-demo.

**GitHub:** https://github.com/cozydevkit/mdforge  
**npm:** https://www.npmjs.com/package/mdforge

MIT licensed. Stars welcome.

---

### 4. Twitter/X Thread

**Thread:**

🧵 I built a CLI that turns markdown into cinematic documentation pages. One command. Zero config.

`npx @cozydevkit/mdforge build README.md`

What you get:
→ Premium dark theme
→ Sticky TOC sidebar
→ Syntax highlighting + copy-to-clipboard
→ Dark/light toggle
→ Scroll animations
→ Single self-contained HTML file

---

Why? Because I kept building premium doc pages by hand for client projects. After the 5th time, I thought: this should be a tool.

12 KB on npm. 4 dependencies. 23 tests passing.

---

The output is ONE file. No dist folder. No assets directory. Everything inlined — CSS, JS, fonts (system fallbacks). Open it from your desktop. Email it. Host it anywhere. Works offline.

---

5 accent colors: amber 🟡 green 🟢 blue 🔵 purple 🟣 cyan 🔵

```
mdforge build README.md --accent blue
mdforge build README.md --accent green --minify
mdforge build README.md --watch
```

---

The landing page was built using mdforge itself. Meta-demo 🔄

GitHub: github.com/cozydevkit/mdforge
npm: npmjs.com/package/@cozydevkit/mdforge

MIT licensed. Stars welcome ⭐

---

### 5. README Badge

For projects built with mdforge:

```markdown
[![Built with mdforge](https://img.shields.io/badge/docs-mdforge-fbbf24?style=flat-square)](https://github.com/cozydevkit/mdforge)
```

---

## Launch Checklist

- [ ] Create GitHub repo: cozydevkit/mdforge
- [ ] `npm publish` to registry
- [ ] Submit to Product Hunt (schedule for Tuesday 12:01 AM PT)
- [ ] Post Show HN
- [ ] Publish Dev.to article
- [ ] Post Twitter/X thread
- [ ] Cross-post to Reddit r/webdev, r/node, r/programming
- [ ] Add "Built with mdforge" badge to Cozerna RPTA docs
