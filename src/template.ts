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
    background: #F4EFE6;
    color: #0F172A;
    font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    text-rendering: geometricPrecision;
  }
  .page {
    width: 1024px;
    height: 1024px;
    display: flex;
    flex-direction: column;
    background: #F4EFE6;
  }

  /* COMMANDING MIDNIGHT-NAVY MASTHEAD (76px) */
  .masthead {
    height: 76px;
    background: #0D1B2A;
    border-bottom: 2.5px solid #C81E1E;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .mast-top {
    height: 54px;
    padding: 0 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
    letter-spacing: -0.4px;
    color: #FAF6EE;
    line-height: 1;
  }
  .mast-edition {
    font-size: 9.5px;
    font-weight: 800;
    letter-spacing: 1.1px;
    color: #F59E0B;
    text-transform: uppercase;
  }
  .date-badge {
    background: #C81E1E;
    color: #FFFFFF;
    font-size: 17.5px;
    font-weight: 900;
    letter-spacing: 0.75px;
    padding: 6px 15px;
    border-radius: 2px;
    border: 1px solid rgba(250, 204, 21, 0.55);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
  }
  .mast-sub {
    height: 20px;
    padding: 0 14px;
    background: #EAE2D3;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 8.8px;
    font-weight: 800;
    letter-spacing: 0.65px;
    color: #0F172A;
    text-transform: uppercase;
  }

  /* UPPER SHOWCASE (296px) */
  .upper-spread {
    height: 296px;
    padding: 8px 14px 7px;
    display: grid;
    grid-template-columns: 522px 464px;
    gap: 10px;
  }
  .hero-card {
    background: #FFFDF9;
    border: 1px solid #CFC4B0;
    border-top: 3px solid #C81E1E;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .hero-media {
    position: relative;
    height: 152px;
    width: 100%;
    overflow: hidden;
    background: #1B2E4B;
    border-bottom: 1px solid #CFC4B0;
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
    top: 7px;
    left: 7px;
    background: rgba(200, 30, 30, 0.95);
    color: #FFFFFF;
    font-size: 8.6px;
    font-weight: 800;
    letter-spacing: 0.75px;
    padding: 2.5px 8px;
    text-transform: uppercase;
  }
  .hero-content {
    flex: 1;
    padding: 6px 10px 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .hero-headline {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 20.5px;
    font-weight: 900;
    line-height: 1.12;
    color: #09111E;
    letter-spacing: -0.35px;
  }
  .hero-summary {
    font-size: 10.3px;
    line-height: 1.24;
    color: #1E293B;
    margin-top: 3px;
  }
  .hero-metrics {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-top: 4px;
    padding-top: 4px;
    border-top: 1px solid #E5DEC9;
  }
  .metric-pill {
    font-size: 8.7px;
    font-weight: 800;
    padding: 2px 5.5px;
    border-radius: 2px;
    letter-spacing: 0.15px;
    white-space: nowrap;
  }
  .metric-up {
    background: #E4F4F0;
    color: #0F766E;
    border: 1px solid #AEDBD2;
  }
  .metric-down {
    background: #FDECEC;
    color: #B91C1C;
    border: 1px solid #F2BDBD;
  }
  .metric-neutral {
    background: #EEF2F7;
    color: #334155;
    border: 1px solid #CBD5E1;
  }

  /* RIGHT MAP PANEL */
  .map-panel {
    background: #FFFDF9;
    border: 1px solid #CFC4B0;
    border-top: 3px solid #0D1B2A;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .map-header {
    padding: 4px 8px 3px;
    border-bottom: 1px solid #E2D9C8;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #FBF8F1;
  }
  .map-title {
    font-size: 9.8px;
    font-weight: 900;
    letter-spacing: 0.55px;
    color: #0D1B2A;
    text-transform: uppercase;
  }
  .map-subtitle {
    font-size: 8.3px;
    font-weight: 800;
    color: #475569;
  }
  .map-legend {
    padding: 2.5px 8px;
    background: #F2ECE0;
    border-bottom: 1px solid #E2D9C8;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 7.9px;
    font-weight: 800;
    color: #1E293B;
  }
  .legend-item {
    display: inline-flex;
    align-items: center;
    gap: 3px;
  }
  .legend-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    display: inline-block;
  }
  .map-canvas {
    padding: 2px 5px;
    background: #FFFDF9;
    border-bottom: 1px solid #E2D9C8;
  }
  .map-kpis {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    background: #FAF6EE;
  }
  .kpi-cell {
    padding: 3.5px 6px;
    border-right: 1px solid #E2D9C8;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .kpi-cell:last-child {
    border-right: none;
  }
  .kpi-kicker {
    font-size: 7.4px;
    font-weight: 900;
    letter-spacing: 0.45px;
    text-transform: uppercase;
    margin-bottom: 0.5px;
  }
  .kpi-val {
    font-size: 9.1px;
    font-weight: 900;
    color: #09111E;
    line-height: 1.12;
  }
  .kpi-sub {
    font-size: 7.9px;
    color: #334155;
    line-height: 1.12;
    margin-top: 1px;
  }

  /* MIDDLE 5-CARD ILLUSTRATED SPOTLIGHT STRIP (182px) */
  .spot-strip {
    height: 182px;
    padding: 0 14px 7px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 8px;
  }
  .spot-card {
    background: #FFFDF9;
    border: 1px solid #CFC4B0;
    border-top: 3px solid #0D1B2A;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .spot-media {
    position: relative;
    height: 82px;
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
    bottom: 3px;
    right: 3px;
    background: rgba(13, 27, 42, 0.88);
    color: #FAF6EE;
    font-size: 7.3px;
    font-weight: 800;
    padding: 1px 4.5px;
    border-radius: 2px;
  }
  .spot-body {
    flex: 1;
    padding: 4px 6.5px 4px;
    display: flex;
    flex-direction: column;
  }
  .spot-kicker {
    font-size: 7.4px;
    font-weight: 900;
    letter-spacing: 0.45px;
    text-transform: uppercase;
    margin-bottom: 1.5px;
  }
  .spot-title {
    font-family: Georgia, "Times New Roman", serif;
    font-size: 11.7px;
    font-weight: 900;
    line-height: 1.13;
    color: #09111E;
    margin-bottom: 2.5px;
  }
  .spot-summary {
    font-size: 8.6px;
    line-height: 1.18;
    color: #1E293B;
  }

  /* LOWER 8-REGION MATRIX (446px: 4 cols x 2 rows) */
  .continent-grid {
    height: 446px;
    padding: 0 14px 7px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 7px 8px;
  }
  .continent-box {
    background: #FFFDF9;
    border: 1px solid #CFC4B0;
    border-top: 3px solid #0D1B2A;
    display: flex;
    flex-direction: column;
    padding: 4px 6.5px 4px;
    overflow: hidden;
  }
  .continent-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 3px;
    margin-bottom: 3px;
    border-bottom: 1px solid #E2D9C8;
  }
  .continent-title {
    font-size: 10.2px;
    font-weight: 900;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
  .continent-count {
    font-size: 7.1px;
    font-weight: 800;
    color: #334155;
    background: #ECE5D8;
    padding: 1px 4px;
    border-radius: 2px;
    letter-spacing: 0.3px;
  }
  .brief-list {
    list-style: none;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .brief-item {
    font-size: 8.95px;
    line-height: 1.19;
    color: #1E293B;
    padding-bottom: 2.5px;
    border-bottom: 1px dotted #DDD4C2;
  }
  .brief-item:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
  .brief-tag {
    display: inline-block;
    color: #FFFFFF;
    font-size: 6.9px;
    font-weight: 900;
    letter-spacing: 0.25px;
    padding: 0.5px 3.5px;
    border-radius: 2px;
    margin-right: 2.5px;
    vertical-align: 0.5px;
  }
  .brief-lead {
    font-weight: 800;
    color: #09111E;
    margin-right: 1.5px;
  }
  .brief-text {
    color: #243042;
  }

  /* FOOTER (24px) */
  .footer {
    height: 24px;
    background: #0D1B2A;
    color: #EFE9DD;
    padding: 0 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 8.5px;
    font-weight: 800;
    letter-spacing: 0.6px;
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
          <span class="mast-edition">38 Stories · 8 Regions</span>
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
          <span class="map-title">World Event Map · 24 Nov 2026</span>
          <span class="map-subtitle">32 Mapped Hotspots · 8 Regions</span>
        </div>
        <div class="map-legend">${legendHtml}</div>
        <div class="map-canvas">${worldMapSvg}</div>
        <div class="map-kpis">
          <div class="kpi-cell">
            <span class="kpi-kicker" style="color:#4338CA">China · Politburo</span>
            <span class="kpi-val">Shanghai Purge</span>
            <span class="kpi-sub">Chen Jining under graft probe</span>
          </div>
          <div class="kpi-cell">
            <span class="kpi-kicker" style="color:#0F766E">Global M&amp;A · Pharma</span>
            <span class="kpi-val">Sanofi $41B Deal</span>
            <span class="kpi-sub">Buys Insmed; biggest since ’23</span>
          </div>
          <div class="kpi-cell">
            <span class="kpi-kicker" style="color:#C81E1E">UN &amp; UK · Human Toll</span>
            <span class="kpi-val">47k / 5,258 Deaths</span>
            <span class="kpi-sub">UN femicide; UK heat record</span>
          </div>
        </div>
      </aside>
    </section>

    <section class="spot-strip">${spotlightsHtml}</section>

    <section class="continent-grid">${continentsHtml}</section>

    <footer class="footer">
      <span>${escapeHtml(edition.masthead)} · <span class="footer-accent">${escapeHtml(edition.dateLabel)}</span></span>
      <span>38 Verified Full-Day Stories · 8 Global Regions · All 6 Continents</span>
      <span>One-Day World Summary</span>
    </footer>
  </main>
</body>
</html>`;
}
