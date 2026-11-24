import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { EDITION_2026_11_24 } from './news-data.ts';
import { renderEditionHtml } from './template.ts';

const currentDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = dirname(currentDir);
const assetsDir = join(repoRoot, 'assets');
const previewDir = join(repoRoot, 'preview');

mkdirSync(previewDir, { recursive: true });
const html = renderEditionHtml(EDITION_2026_11_24, assetsDir);
const outHtmlPath = join(previewDir, 'edition.html');
writeFileSync(outHtmlPath, html, 'utf8');
console.log(`Wrote ${outHtmlPath} (${Buffer.byteLength(html, 'utf8')} bytes)`);
