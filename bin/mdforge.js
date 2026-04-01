#!/usr/bin/env node

/**
 * mdforge CLI
 * Usage: mdforge build <file> [-o output.html] [--watch] [--minify] [--accent blue]
 */

import { Command } from 'commander';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { basename, extname, resolve, dirname } from 'path';
import { parse } from '../src/parser.js';
import { render } from '../src/renderer.js';

const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf-8'));

const ACCENTS = ['amber', 'green', 'blue', 'purple', 'cyan'];

const program = new Command();

program
  .name('mdforge')
  .description('Stop shipping ugly docs. Markdown → premium interactive HTML.')
  .version(pkg.version);

// ─── BUILD ───
program
  .command('build <file>')
  .description('Build a markdown file into premium HTML')
  .option('-o, --output <path>', 'Output file path')
  .option('-t, --theme <name>', 'Theme: dark | light', 'dark')
  .option('-a, --accent <color>', `Accent color: ${ACCENTS.join(' | ')}`, 'amber')
  .option('--title <string>', 'Document title (overrides frontmatter)')
  .option('--subtitle <string>', 'Subtitle text')
  .option('--no-toc', 'Disable table of contents')
  .option('--no-animations', 'Disable scroll animations')
  .option('-w, --watch', 'Watch for changes and rebuild')
  .option('-m, --minify', 'Minify output HTML')
  .action(async (file, opts) => {
    const inputPath = resolve(file);

    if (!existsSync(inputPath)) {
      console.error(`\x1b[31m✗\x1b[0m File not found: ${file}`);
      process.exit(1);
    }

    if (!ACCENTS.includes(opts.accent)) {
      console.error(`\x1b[31m✗\x1b[0m Invalid accent: ${opts.accent}. Choose: ${ACCENTS.join(', ')}`);
      process.exit(1);
    }

    const outputPath = opts.output
      ? resolve(opts.output)
      : resolve(basename(file, extname(file)) + '.html');

    await buildFile(inputPath, outputPath, file, opts);

    if (opts.watch) {
      console.log(`  \x1b[33m👀 Watching\x1b[0m ${file} for changes... (Ctrl+C to stop)`);
      console.log('');

      const { watch } = await import('chokidar');
      const watcher = watch(inputPath, { ignoreInitial: true });
      watcher.on('change', async () => {
        await buildFile(inputPath, outputPath, file, opts);
      });
    }
  });

// ─── INIT ───
program
  .command('init')
  .description('Scaffold a docs/ folder with a starter template')
  .option('-d, --dir <path>', 'Directory to create', 'docs')
  .action((opts) => {
    const dir = resolve(opts.dir);

    if (existsSync(dir)) {
      console.error(`\x1b[31m✗\x1b[0m Directory already exists: ${opts.dir}`);
      process.exit(1);
    }

    mkdirSync(dir, { recursive: true });

    const starter = `---
title: My Project
subtitle: Documentation
theme: dark
accent: amber
toc: true
animations: true
footer: "Built with mdforge by CozyDevKit"
---

# My Project

> A short description of what this project does.

## Getting Started

\`\`\`bash
npm install my-project
\`\`\`

## Usage

\`\`\`javascript
import { myFunction } from 'my-project';

const result = myFunction({ option: true });
console.log(result);
\`\`\`

## API Reference

### \`myFunction(options)\`

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| \`option\` | boolean | \`false\` | Enable the feature |
| \`count\` | number | \`10\` | Number of items |

Returns: \`Result\` object.

## FAQ

**Q: How do I install it?**

Run \`npm install my-project\` and import it.

**Q: Does it work with TypeScript?**

Yes. Types are included.

## License

MIT

---

*Built with [mdforge](https://github.com/cozydevkit/mdforge).*
`;

    writeFileSync(resolve(dir, 'index.md'), starter, 'utf-8');

    // GitHub Actions workflow
    const workflow = `name: Build Docs
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
      - run: npx mdforge build docs/index.md -o site/index.html --minify
      - uses: actions/upload-pages-artifact@v3
        with:
          path: site/
`;

    const ghDir = resolve(dir, '..', '.github', 'workflows');
    mkdirSync(ghDir, { recursive: true });
    writeFileSync(resolve(ghDir, 'docs.yml'), workflow, 'utf-8');

    console.log('');
    console.log(`  \x1b[33m⚡ mdforge init\x1b[0m`);
    console.log('');
    console.log(`  \x1b[32m✓\x1b[0m Created ${opts.dir}/index.md`);
    console.log(`  \x1b[32m✓\x1b[0m Created .github/workflows/docs.yml`);
    console.log('');
    console.log(`  \x1b[90mNext: mdforge build ${opts.dir}/index.md\x1b[0m`);
    console.log('');
  });

// ─── BUILD HELPER ───
async function buildFile(inputPath, outputPath, displayFile, opts) {
  const source = readFileSync(inputPath, 'utf-8');
  const { meta, html, toc } = parse(source);

  // CLI flags override frontmatter
  if (opts.title) meta.title = opts.title;
  if (opts.subtitle) meta.subtitle = opts.subtitle;
  if (opts.theme) meta.theme = opts.theme;
  if (opts.accent) meta.accent = opts.accent;
  if (opts.toc === false) meta.toc = false;
  if (opts.animations === false) meta.animations = false;

  // Default title from filename
  if (!meta.title) {
    meta.title = basename(displayFile, extname(displayFile));
  }

  let output = render({ html, toc, meta });

  // Minify
  if (opts.minify) {
    const { minify } = await import('html-minifier-terser');
    output = await minify(output, {
      collapseWhitespace: true,
      removeComments: true,
      minifyCSS: true,
      minifyJS: true,
    });
  }

  // Ensure output directory exists
  const outputDir = dirname(outputPath);
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  writeFileSync(outputPath, output, 'utf-8');

  const sizeKB = (Buffer.byteLength(output) / 1024).toFixed(1);
  const minTag = opts.minify ? ' · minified' : '';
  const time = new Date().toLocaleTimeString();
  console.log('');
  console.log(`  \x1b[33m⚡ mdforge\x1b[0m \x1b[90m${time}\x1b[0m`);
  console.log('');
  console.log(`  \x1b[32m✓\x1b[0m ${displayFile} → \x1b[36m${outputPath}\x1b[0m`);
  console.log(`  \x1b[90m  ${sizeKB} KB · ${toc.length} sections · ${meta.accent || 'amber'} · ${meta.theme || 'dark'}${minTag}\x1b[0m`);
  console.log('');
}

program.parse();
