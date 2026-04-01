import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { render } from '../src/renderer.js';
import { parse } from '../src/parser.js';

describe('render', () => {
  it('produces valid HTML with doctype', () => {
    const { html, toc, meta } = parse('# Test\n\nHello');
    const output = render({ html, toc, meta });
    assert.ok(output.startsWith('<!DOCTYPE html>'));
    assert.ok(output.includes('<html lang="en">'));
    assert.ok(output.includes('</html>'));
  });

  it('inlines CSS (no external stylesheet)', () => {
    const { html, toc, meta } = parse('# Test');
    const output = render({ html, toc, meta });
    assert.ok(output.includes('<style>'));
    assert.ok(output.includes('--bg-0'));
    assert.ok(!output.includes('<link rel="stylesheet"'));
  });

  it('inlines JS (no external script)', () => {
    const { html, toc, meta } = parse('# Test');
    const output = render({ html, toc, meta });
    assert.ok(output.includes('<script>'));
    assert.ok(output.includes('DOMContentLoaded'));
    assert.ok(!output.includes('src='));
  });

  it('generates TOC sidebar when toc is not disabled', () => {
    const { html, toc, meta } = parse('# One\n## Two\n## Three');
    const output = render({ html, toc, meta });
    assert.ok(output.includes('df-sidebar'));
    assert.ok(output.includes('df-toc'));
    assert.ok(output.includes('href="#one"'));
  });

  it('hides TOC when meta.toc is false', () => {
    const { html, toc, meta } = parse('---\ntoc: false\n---\n# One\n## Two');
    const output = render({ html, toc, meta });
    // CSS will contain .df-sidebar rules, but the actual sidebar element should not render
    assert.ok(!output.includes('id="dfSidebar"'));
  });

  it('uses title from meta', () => {
    const { html, toc, meta } = parse('---\ntitle: My Project\n---\n# Heading');
    const output = render({ html, toc, meta });
    assert.ok(output.includes('<title>My Project</title>'));
  });

  it('includes theme toggle', () => {
    const { html, toc, meta } = parse('# Test');
    const output = render({ html, toc, meta });
    assert.ok(output.includes('dfThemeToggle'));
  });

  it('includes copy button CSS', () => {
    const { html, toc, meta } = parse('# Test\n\n```js\nconst x = 1;\n```');
    const output = render({ html, toc, meta });
    assert.ok(output.includes('.copy-btn'));
  });

  it('wraps sections in reveal divs when animations enabled', () => {
    const { html, toc, meta } = parse('# One\n\nText\n\n## Two\n\nMore');
    const output = render({ html, toc, meta });
    assert.ok(output.includes('df-reveal'));
  });

  it('includes mdforge generator meta tag', () => {
    const { html, toc, meta } = parse('# Test');
    const output = render({ html, toc, meta });
    assert.ok(output.includes('name="generator"'));
    assert.ok(output.includes('mdforge'));
  });

  it('applies accent color override for non-amber', () => {
    const { html, toc } = parse('# Test');
    const meta = { accent: 'blue' };
    const output = render({ html, toc, meta });
    assert.ok(output.includes('#60a5fa'));
  });

  it('includes footer', () => {
    const { html, toc, meta } = parse('# Test');
    const output = render({ html, toc, meta });
    assert.ok(output.includes('df-footer'));
    assert.ok(output.includes('mdforge'));
  });
});
