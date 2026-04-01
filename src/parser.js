/**
 * mdforge — parser.js
 * Markdown → structured HTML with syntax highlighting and frontmatter extraction
 */

import MarkdownIt from 'markdown-it';

// ─── Frontmatter Parser ───
export function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };

  const meta = {};
  match[1].split('\n').forEach(line => {
    const idx = line.indexOf(':');
    if (idx > 0) {
      const key = line.slice(0, idx).trim();
      let val = line.slice(idx + 1).trim();
      // strip quotes
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      // booleans
      if (val === 'true') val = true;
      else if (val === 'false') val = false;
      meta[key] = val;
    }
  });

  return { meta, body: match[2] };
}

// ─── TOC Collector ───
export function buildToc(tokens) {
  const toc = [];
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].type === 'heading_open') {
      const level = parseInt(tokens[i].tag.slice(1));
      const contentToken = tokens[i + 1];
      const text = contentToken ? contentToken.content : '';
      const id = slugify(text);
      // inject id into heading open token
      tokens[i].attrSet('id', id);
      if (level >= 1 && level <= 3) {
        toc.push({ level, text, id });
      }
    }
  }
  return toc;
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// ─── Syntax Highlight (inline, no external dep) ───
function highlightCode(str, lang) {
  const escaped = escapeHtml(str);
  const langLabel = lang ? `<span class="code-lang">${lang}</span>` : '';
  return `<div class="code-block">${langLabel}<pre><code class="language-${lang || 'text'}">${escaped}</code></pre></div>`;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ─── Main Parse Function ───
export function parse(markdownSource) {
  const { meta, body } = parseFrontmatter(markdownSource);

  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: highlightCode,
  });

  // Parse to tokens first (for TOC)
  const tokens = md.parse(body, {});
  const toc = buildToc(tokens);

  // Render to HTML
  const html = md.renderer.render(tokens, md.options, {});

  return { meta, html, toc };
}
