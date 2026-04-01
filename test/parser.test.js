import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { parse, parseFrontmatter, buildToc } from '../src/parser.js';

describe('parseFrontmatter', () => {
  it('extracts YAML frontmatter', () => {
    const input = `---
title: Test Doc
subtitle: Hello World
theme: dark
toc: true
---

# Content here`;

    const { meta, body } = parseFrontmatter(input);
    assert.equal(meta.title, 'Test Doc');
    assert.equal(meta.subtitle, 'Hello World');
    assert.equal(meta.theme, 'dark');
    assert.equal(meta.toc, true);
    assert.ok(body.includes('# Content here'));
  });

  it('handles missing frontmatter', () => {
    const input = '# Just a heading\n\nSome text.';
    const { meta, body } = parseFrontmatter(input);
    assert.deepEqual(meta, {});
    assert.equal(body, input);
  });

  it('strips quotes from values', () => {
    const input = `---
title: "Quoted Title"
footer: 'Single quoted'
---

Content`;

    const { meta } = parseFrontmatter(input);
    assert.equal(meta.title, 'Quoted Title');
    assert.equal(meta.footer, 'Single quoted');
  });

  it('parses boolean values', () => {
    const input = `---
toc: true
animations: false
---

Content`;

    const { meta } = parseFrontmatter(input);
    assert.equal(meta.toc, true);
    assert.equal(meta.animations, false);
  });
});

describe('parse', () => {
  it('converts markdown to HTML', () => {
    const { html } = parse('# Hello\n\nWorld');
    assert.ok(html.includes('<h1'));
    assert.ok(html.includes('Hello'));
    assert.ok(html.includes('<p>World</p>'));
  });

  it('generates table of contents', () => {
    const { toc } = parse('# One\n## Two\n### Three\n#### Four');
    assert.equal(toc.length, 3); // h1, h2, h3 only
    assert.equal(toc[0].text, 'One');
    assert.equal(toc[0].level, 1);
    assert.equal(toc[1].text, 'Two');
    assert.equal(toc[2].text, 'Three');
  });

  it('highlights code blocks', () => {
    const { html } = parse('```javascript\nconst x = 1;\n```');
    assert.ok(html.includes('code-block'));
    assert.ok(html.includes('language-javascript'));
    assert.ok(html.includes('code-lang'));
  });

  it('renders tables', () => {
    const md = '| A | B |\n|---|---|\n| 1 | 2 |';
    const { html } = parse(md);
    assert.ok(html.includes('<table>'));
    assert.ok(html.includes('<th>'));
    assert.ok(html.includes('<td>'));
  });

  it('renders blockquotes', () => {
    const { html } = parse('> This is a quote');
    assert.ok(html.includes('<blockquote>'));
  });

  it('creates slugified IDs for headings', () => {
    const { toc } = parse('# Hello World\n## Getting Started');
    assert.equal(toc[0].id, 'hello-world');
    assert.equal(toc[1].id, 'getting-started');
  });

  it('extracts frontmatter and parses body', () => {
    const md = `---
title: My Doc
---

# Main Heading`;

    const { meta, toc } = parse(md);
    assert.equal(meta.title, 'My Doc');
    assert.equal(toc[0].text, 'Main Heading');
  });
});
