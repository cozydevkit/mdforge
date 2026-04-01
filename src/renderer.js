/**
 * mdforge — renderer.js
 * Assembles parsed markdown + theme CSS + inline JS into a single self-contained HTML file
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ─── Accent Color Maps ───
const ACCENT_VARS = {
  amber:  { accent: '#fbbf24', dim: 'rgba(251,191,36,.08)', glow: 'rgba(251,191,36,.12)', hover: '#fcd34d' },
  green:  { accent: '#34d399', dim: 'rgba(52,211,153,.08)',  glow: 'rgba(52,211,153,.12)',  hover: '#6ee7b7' },
  blue:   { accent: '#60a5fa', dim: 'rgba(96,165,250,.08)',  glow: 'rgba(96,165,250,.12)',  hover: '#93bbfd' },
  purple: { accent: '#a78bfa', dim: 'rgba(167,139,250,.08)', glow: 'rgba(167,139,250,.12)', hover: '#c4b5fd' },
  cyan:   { accent: '#22d3ee', dim: 'rgba(34,211,238,.08)',  glow: 'rgba(34,211,238,.12)',  hover: '#67e8f9' },
};

const ACCENT_VARS_LIGHT = {
  amber:  { accent: '#d97706', dim: 'rgba(217,119,6,.08)',   glow: 'rgba(217,119,6,.1)' },
  green:  { accent: '#059669', dim: 'rgba(5,150,105,.08)',   glow: 'rgba(5,150,105,.1)' },
  blue:   { accent: '#2563eb', dim: 'rgba(37,99,235,.08)',   glow: 'rgba(37,99,235,.1)' },
  purple: { accent: '#7c3aed', dim: 'rgba(124,58,237,.08)',  glow: 'rgba(124,58,237,.1)' },
  cyan:   { accent: '#0891b2', dim: 'rgba(8,145,178,.08)',   glow: 'rgba(8,145,178,.1)' },
};

function loadThemeCSS() {
  return readFileSync(join(__dirname, 'themes', 'dark.css'), 'utf-8');
}

function buildAccentOverride(accentName) {
  if (accentName === 'amber') return ''; // default, no override needed
  const dark = ACCENT_VARS[accentName];
  const light = ACCENT_VARS_LIGHT[accentName];
  if (!dark) return '';
  return `
:root {
  --accent: ${dark.accent}; --accent-dim: ${dark.dim};
  --accent-glow: ${dark.glow};
}
a { color: ${dark.accent}; }
a:hover { color: ${dark.hover}; }
[data-theme="light"] {
  --accent: ${light.accent}; --accent-dim: ${light.dim};
  --accent-glow: ${light.glow};
}
`;
}

function renderTocHTML(toc) {
  if (!toc.length) return '';
  const items = toc.map(item => {
    const cls = `toc-h${item.level}`;
    return `<li><a href="#${item.id}" class="${cls}">${item.text}</a></li>`;
  }).join('\n          ');
  return `<ul class="df-toc">\n          ${items}\n        </ul>`;
}

function wrapSections(html) {
  // Wrap content before each heading in a reveal div
  // Split on headings, wrap each chunk
  const parts = html.split(/(?=<h[1-6][\s>])/);
  return parts.map(part => `<div class="df-reveal">${part}</div>`).join('\n');
}

// ─── Inline JS ───
const INLINE_JS = `
document.addEventListener('DOMContentLoaded', () => {
  // Scroll reveal
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.df-reveal').forEach(el => obs.observe(el));

  // TOC active tracking
  const tocLinks = document.querySelectorAll('.df-toc a');
  const headings = Array.from(tocLinks).map(a => document.getElementById(a.getAttribute('href').slice(1))).filter(Boolean);
  if (headings.length) {
    const tocObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          tocLinks.forEach(l => l.classList.remove('active'));
          const active = document.querySelector('.df-toc a[href="#' + e.target.id + '"]');
          if (active) active.classList.add('active');
        }
      });
    }, { threshold: 0.3, rootMargin: '-80px 0px -60% 0px' });
    headings.forEach(h => tocObs.observe(h));
  }

  // Theme toggle
  const toggle = document.getElementById('dfThemeToggle');
  if (toggle) {
    const saved = localStorage.getItem('mdforge-theme');
    if (saved) document.documentElement.setAttribute('data-theme', saved);
    function updateIcon() {
      const dark = document.documentElement.getAttribute('data-theme') !== 'light';
      toggle.textContent = dark ? '\\u2600' : '\\u263E';
    }
    updateIcon();
    toggle.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('mdforge-theme', next);
      updateIcon();
    });
  }

  // Mobile sidebar toggle
  const mobToggle = document.getElementById('dfMobileToggle');
  const sidebar = document.getElementById('dfSidebar');
  if (mobToggle && sidebar) {
    mobToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
    document.querySelectorAll('.df-toc a').forEach(a => {
      a.addEventListener('click', () => sidebar.classList.remove('open'));
    });
  }

  // Copy to clipboard on code blocks
  document.querySelectorAll('.code-block').forEach(block => {
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = 'Copy';
    btn.setAttribute('aria-label', 'Copy code to clipboard');
    btn.addEventListener('click', () => {
      const code = block.querySelector('code');
      if (!code) return;
      navigator.clipboard.writeText(code.textContent).then(() => {
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
      });
    });
    block.appendChild(btn);
  });
});
`;

// ─── Main Render ───
export function render({ html, toc, meta }) {
  const css = loadThemeCSS();
  const accentCSS = buildAccentOverride(meta.accent || 'amber');
  const title = meta.title || 'Documentation';
  const subtitle = meta.subtitle || '';
  const footer = meta.footer || 'Built with <a href="https://github.com/cozydevkit/mdforge">mdforge</a> by CozyDevKit';
  const showToc = meta.toc !== false && toc.length > 0;
  const showAnimations = meta.animations !== false;

  const contentHTML = showAnimations ? wrapSections(html) : html;
  const tocHTML = showToc ? renderTocHTML(toc) : '';

  const sidebarBlock = showToc ? `
    <aside class="df-sidebar" id="dfSidebar">
      <div class="df-brand">
        <div class="df-brand-mark">md</div>
        <div class="df-brand-text">${esc(title)}</div>
      </div>
      ${subtitle ? `<div class="df-subtitle">${esc(subtitle)}</div>` : ''}
      ${tocHTML}
    </aside>` : '';

  const mainStyle = showToc ? '' : ' style="margin-left:0;max-width:780px;margin:0 auto;"';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="generator" content="mdforge v${getVersion()}">
<style>
${css}
${accentCSS}
/* ─── Copy Button ─── */
.code-block { position: relative; }
.copy-btn {
  position: absolute; top: .5rem; right: .5rem;
  background: var(--bg-3); border: 1px solid var(--border);
  color: var(--text-3); font-family: var(--mono); font-size: .65rem;
  padding: .25rem .6rem; border-radius: 4px; cursor: pointer;
  opacity: 0; transition: opacity .2s, background .2s, color .2s;
  z-index: 2; font-weight: 600; text-transform: uppercase; letter-spacing: .04em;
}
.code-block:hover .copy-btn { opacity: 1; }
.copy-btn:hover { background: var(--accent); color: var(--bg-0); border-color: var(--accent); }
.copy-btn.copied { background: var(--green); color: var(--bg-0); border-color: var(--green); opacity: 1; }
</style>
</head>
<body>

<button class="df-mobile-toggle" id="dfMobileToggle" aria-label="Toggle navigation">&#9776;</button>
<button class="df-theme-toggle" id="dfThemeToggle" aria-label="Toggle theme">&#9788;</button>

<div class="df-page">
  ${sidebarBlock}
  <main class="df-main"${mainStyle}>
    ${contentHTML}
    <div class="df-footer">
      <p>${footer}</p>
    </div>
  </main>
</div>

<script>
${INLINE_JS}
</script>

</body>
</html>`;
}

function esc(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function getVersion() {
  try {
    const pkg = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf-8'));
    return pkg.version;
  } catch { return '0.1.0'; }
}
