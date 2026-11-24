import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  CATEGORY_COLORS,
  CATEGORY_LABELS,
  type CategoryKey,
  type EditionData,
} from './news-data.ts';
import { renderWorldMapSvg } from './world-map.ts';

function escapeHtml(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function loadImageDataUri(assetsDir: string, fileName: string): string {
  const bytes = readFileSync(join(assetsDir, fileName));
  const mime = fileName.endsWith('.png') ? 'image/png' : 'image/jpeg';
  return `data:${mime};base64,${bytes.toString('base64')}`;
}

export function renderEditionHtml(edition: EditionData, assetsDir: string): string {
  const heroImg = loadImageDataUri(assetsDir, edition.hero.imageFile);
  const worldMapSvg = renderWorldMapSvg(edition.markers);

  const legendKeys: readonly CategoryKey[] = [
    'markets',
    'security',
    'diplomacy',
    'climate',
    'space',
    'culture',
  ];

  const legendHtml = legendKeys
    .map(
      (key) => `
      <span class="legend-item">
        <span class="legend-dot" style="background:${CATEGORY_COLORS[key]}"></span>${escapeHtml(CATEGORY_LABELS[key])}
      </span>`,
    )
    .join('');

  const metricsHtml = edition.hero.metrics
    .map((m) => {
      const cls =
        m.direction === 'up'
          ? 'metric-up'
          : m.direction === 'down'
            ? 'metric-down'
            : 'metric-neutral';
      return `<span class="metric-pill ${cls}"><strong>${escapeHtml(m.label)}</strong> ${escapeHtml(m.value)}</span>`;
    })
    .join('');

  const spotlightsHtml = edition.spotlights
    .map((card) => {
      const imgUri = loadImageDataUri(assetsDir, card.imageFile);
      const accent = CATEGORY_COLORS[card.category];
      const pos = card.objectPosition ?? 'center center';
      return `
      <article class="spot-card" style="border-top-color:${accent}">
        <div class="spot-media">
          <img src="${imgUri}" alt="${escapeHtml(card.headline)}" style="object-position:${pos}" />
          <span class="spot-region">${escapeHtml(card.region)}</span>
        </div>
        <div class="spot-body">
          <div class="spot-kicker" style="color:${accent}">${escapeHtml(card.kicker)}</div>
          <h2 class="spot-title">${escapeHtml(card.headline)}</h2>
          <p class="spot-summary">${escapeHtml(card.summary)}</p>
        </div>
      </article>`;
    })
    .join('');

  const continentsHtml = edition.continents
    .map((section) => {
      const itemsHtml = section.briefs
        .map(
          (item) => `
          <li class="brief-item">
            <span class="brief-tag" style="background:${section.accent}">${escapeHtml(item.tag)}</span>
            <strong class="brief-lead">${escapeHtml(item.lead)}</strong>
            <span class="brief-text">${escapeHtml(item.body)}</span>
          </li>`,
        )
        .join('');

      return `
      <section class="continent-box" style="border-top-color:${section.accent}">
        <header class="continent-head">
          <h3 class="continent-title" style="color:${section.accent}">${escapeHtml(section.title)}</h3>
          <span class="continent-count">${escapeHtml(section.countLabel)}</span>
        </header>
        <ul class="brief-list">${itemsHtml}</ul>
      </section>`;
    })
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>${escapeHtml(edition.masthead)} — ${escapeHtml(edition.dateLabel)}</title>
<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html, body {
    width: 1024px;
    height: 1024px;
    overflow: hidden;
    background: #F6F1E7;
    color: #111827;
    font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    text-rendering: geometricPrecision;
  }
  .page {
    width: 1024px;
    height: 1024px;
    display: flex;
    flex-direction: column;
    background: #F6F1E7;
  }

  /* MASTHEAD (74px) */
  .masthead {
    height: 74px;
    padding: 7px 14px 0;
    background: #FAF6EE;
    border-top: 4px solid #111827;
    border-bottom: 1.5px solid #111827;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .mast-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 4px;
  }
  .mast-brand {
    display: flex;
    align-items: baseline;
    gap: 10px;
  }
  .mast-title {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 32px;
    font-weight: 900;
    letter-spacing: -0.6px;
    color: #0F172A;
    line-height: 1;
  }
  .mast-edition {
    font-size: 9.5px;
    font-weight: 700;
    letter-spacing: 1px;
    color: #64748B;
    text-transform: uppercase;
  }
  .date-badge {
    background: #B91C1C;
    color: #FFFFFF;
    font-size: 16.5px;
    font-weight: 800;
    letter-spacing: 0.7px;
    padding: 6px 14px;
    border-radius: 2px;
    box-shadow: inset 0 -2px 0 rgba(0, 0, 0, 0.18);
  }
  .mast-sub {
    height: 20px;
    margin: 0 -14px;
    padding: 0 14px;
    background: #EBE3D4;
    border-top: 1px solid #D4C8B4;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 9.1px;
    font-weight: 700;
    letter-spacing: 0.72px;
    color: #1E293B;
    text-transform: uppercase;
  }

  /* UPPER SHOWCASE (326px) */
  .upper-spread {
    height: 326px;
    padding: 9px 14px 8px;
    display: grid;
    grid-template-columns: 530px 454px;
    gap: 12px;
  }
  .hero-card {
    background: #FFFDF9;
    border: 1px solid #D5CCB9;
    border-top: 3px solid #B91C1C;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .hero-media {
    position: relative;
    height: 176px;
    width: 100%;
    overflow: hidden;
    background: #1B2E4B;
    border-bottom: 1px solid #D5CCB9;
  }
  .hero-media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 42%;
    display: block;
  }
  .hero-pill {
    position: absolute;
    top: 8px;
    left: 8px;
    background: rgba(185, 28, 28, 0.94);
    color: #FFFFFF;
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 0.8px;
    padding: 3px 8px;
    text-transform: uppercase;
  }
  .hero-content {
    flex: 1;
    padding: 6px 11px 6px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .hero-headline {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 20.5px;
    font-weight: 800;
    line-height: 1.12;
    color: #0F172A;
    letter-spacing: -0.3px;
  }
  .hero-summary {
    font-size: 10.5px;
    line-height: 1.25;
    color: #334155;
    margin-top: 3px;
  }
  .hero-metrics {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-top: 5px;
    padding-top: 5px;
    border-top: 1px solid #E8E1D3;
  }
  .metric-pill {
    font-size: 9.2px;
    font-weight: 700;
    padding: 2.5px 6px;
    border-radius: 2px;
    letter-spacing: 0.2px;
    white-space: nowrap;
  }
  .metric-up {
    background: #E6F4F1;
    color: #0F766E;
    border: 1px solid #B7DFD8;
  }
  .metric-down {
    background: #FDECEC;
    color: #B91C1C;
    border: 1px solid #F4C4C4;
  }
  .metric-neutral {
    background: #EEF2F7;
    color: #334155;
    border: 1px solid #CBD5E1;
  }

  /* RIGHT MAP PANEL */
  .map-panel {
    background: #FFFDF9;
    border: 1px solid #D5CCB9;
    border-top: 3px solid #1E3A5F;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .map-header {
    padding: 5px 9px 4px;
    border-bottom: 1px solid #E5DEC9;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #FBF8F1;
  }
  .map-title {
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.6px;
    color: #1E3A5F;
    text-transform: uppercase;
  }
  .map-subtitle {
    font-size: 8.6px;
    font-weight: 700;
    color: #64748B;
  }
  .map-legend {
    padding: 3px 8px;
    background: #F4EFE4;
    border-bottom: 1px solid #E5DEC9;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 8.2px;
    font-weight: 700;
    color: #334155;
  }
  .legend-item {
    display: inline-flex;
    align-items: center;
    gap: 3px;
  }
  .legend-dot {
    width: 6.5px;
    height: 6.5px;
    border-radius: 50%;
    display: inline-block;
  }
  .map-canvas {
    padding: 3px 5px;
    background: #FFFDF9;
    border-bottom: 1px solid #E5DEC9;
  }
  .map-kpis {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    background: #FAF6EE;
  }
  .kpi-cell {
    padding: 5px 7px;
    border-right: 1px solid #E5DEC9;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .kpi-cell:last-child {
    border-right: none;
  }
  .kpi-kicker {
    font-size: 7.8px;
    font-weight: 800;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin-bottom: 1px;
  }
  .kpi-val {
    font-size: 9.4px;
    font-weight: 800;
    color: #0F172A;
    line-height: 1.15;
  }
  .kpi-sub {
    font-size: 8.2px;
    color: #475569;
    line-height: 1.15;
    margin-top: 1px;
  }

  /* MIDDLE 4 SPOTLIGHTS (194px) */
  .spot-strip {
    height: 194px;
    padding: 0 14px 8px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }
  .spot-card {
    background: #FFFDF9;
    border: 1px solid #D5CCB9;
    border-top: 3px solid #1E3A5F;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .spot-media {
    position: relative;
    height: 92px;
    overflow: hidden;
    background: #1B2E4B;
    border-bottom: 1px solid #E2D9C8;
  }
  .spot-media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .spot-region {
    position: absolute;
    bottom: 4px;
    right: 4px;
    background: rgba(15, 23, 42, 0.84);
    color: #F8FAFC;
    font-size: 7.8px;
    font-weight: 700;
    padding: 1.5px 5px;
    border-radius: 2px;
  }
  .spot-body {
    flex: 1;
    padding: 5px 8px 6px;
    display: flex;
    flex-direction: column;
  }
  .spot-kicker {
    font-size: 8px;
    font-weight: 800;
    letter-spacing: 0.55px;
    text-transform: uppercase;
    margin-bottom: 2px;
  }
  .spot-title {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 12.8px;
    font-weight: 800;
    line-height: 1.14;
    color: #0F172A;
    margin-bottom: 3px;
  }
  .spot-summary {
    font-size: 9.4px;
    line-height: 1.21;
    color: #334155;
  }

  /* LOWER 6-CONTINENT GRID (404px) */
  .continent-grid {
    height: 404px;
    padding: 0 14px 8px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 8px 10px;
  }
  .continent-box {
    background: #FFFDF9;
    border: 1px solid #D5CCB9;
    border-top: 3px solid #1E3A5F;
    display: flex;
    flex-direction: column;
    padding: 5px 8px 5px;
    overflow: hidden;
  }
  .continent-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 4px;
    margin-bottom: 4px;
    border-bottom: 1px solid #E5DEC9;
  }
  .continent-title {
    font-size: 11.2px;
    font-weight: 900;
    letter-spacing: 0.65px;
    text-transform: uppercase;
  }
  .continent-count {
    font-size: 7.8px;
    font-weight: 800;
    color: #475569;
    background: #EFE9DC;
    padding: 1.5px 5px;
    border-radius: 2px;
    letter-spacing: 0.4px;
  }
  .brief-list {
    list-style: none;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .brief-item {
    font-size: 9.7px;
    line-height: 1.24;
    color: #1F2937;
    padding-bottom: 3px;
    border-bottom: 1px dotted #E2D9C8;
  }
  .brief-item:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
  .brief-tag {
    display: inline-block;
    color: #FFFFFF;
    font-size: 7.5px;
    font-weight: 800;
    letter-spacing: 0.3px;
    padding: 0.5px 4px;
    border-radius: 2px;
    margin-right: 3px;
    vertical-align: 0.5px;
  }
  .brief-lead {
    font-weight: 800;
    color: #0F172A;
    margin-right: 2px;
  }
  .brief-text {
    color: #2D3748;
  }

  /* FOOTER (26px) */
  .footer {
    height: 26px;
    background: #111827;
    color: #EFE9DD;
    padding: 0 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 8.8px;
    font-weight: 700;
    letter-spacing: 0.65px;
    text-transform: uppercase;
  }
  .footer-accent {
    color: #F59E0B;
  }
</style>
</head>
<body>
  <main class="page">
    <header class="masthead">
      <div class="mast-top">
        <div class="mast-brand">
          <h1 class="mast-title">${escapeHtml(edition.masthead)}</h1>
          <span class="mast-edition">International Edition</span>
        </div>
        <div class="date-badge">${escapeHtml(edition.dateLabel)}</div>
      </div>
      <div class="mast-sub">${escapeHtml(edition.subtitle)}</div>
    </header>

    <section class="upper-spread">
      <article class="hero-card">
        <div class="hero-media">
          <img src="${heroImg}" alt="${escapeHtml(edition.hero.headline)}" />
          <span class="hero-pill">${escapeHtml(edition.hero.kicker)}</span>
        </div>
        <div class="hero-content">
          <div>
            <h2 class="hero-headline">${escapeHtml(edition.hero.headline)}</h2>
            <p class="hero-summary">${escapeHtml(edition.hero.summary)}</p>
          </div>
          <div class="hero-metrics">${metricsHtml}</div>
        </div>
      </article>

      <aside class="map-panel">
        <div class="map-header">
          <span class="map-title">Global Event Map · 24 Nov 2026</span>
          <span class="map-subtitle">26 Mapped Hotspots · 6 Continents</span>
        </div>
        <div class="map-legend">${legendHtml}</div>
        <div class="map-canvas">${worldMapSvg}</div>
        <div class="map-kpis">
          <div class="kpi-cell">
            <span class="kpi-kicker" style="color:#4338CA">Space Milestone</span>
            <span class="kpi-val">Shenzhou-24</span>
            <span class="kpi-sub">1st foreign Tiangong crew</span>
          </div>
          <div class="kpi-cell">
            <span class="kpi-kicker" style="color:#B45309">Climate Talks</span>
            <span class="kpi-val">COP31 Collapses</span>
            <span class="kpi-sub">No Antalya accord</span>
          </div>
          <div class="kpi-cell">
            <span class="kpi-kicker" style="color:#7E22CE">World Chess</span>
            <span class="kpi-val">Gukesh vs Sindarov</span>
            <span class="kpi-sub">Youngest match opens</span>
          </div>
        </div>
      </aside>
    </section>

    <section class="spot-strip">${spotlightsHtml}</section>

    <section class="continent-grid">${continentsHtml}</section>

    <footer class="footer">
      <span>${escapeHtml(edition.masthead)} · <span class="footer-accent">${escapeHtml(edition.dateLabel)}</span></span>
      <span>6 Inhabited Continents · 30+ Verified Global Stories</span>
      <span>One-Day World News Summary</span>
    </footer>
  </main>
</body>
</html>`;
}
