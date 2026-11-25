import { CATEGORY_COLORS, type MapMarker } from './news-data.ts';

interface Point {
  readonly x: number;
  readonly y: number;
}

const MAP_WIDTH = 452;
const MAP_HEIGHT = 186;
const LON_MIN = -168;
const LON_MAX = 186;
const LAT_MIN = -55;
const LAT_MAX = 76;

function project(lon: number, lat: number): Point {
  const x = ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * MAP_WIDTH;
  const clampedLat = Math.max(LAT_MIN, Math.min(LAT_MAX, lat));
  const y = ((LAT_MAX - clampedLat) / (LAT_MAX - LAT_MIN)) * MAP_HEIGHT;
  return { x: Number(x.toFixed(1)), y: Number(y.toFixed(1)) };
}

function polygonPath(coords: readonly (readonly [number, number])[]): string {
  return (
    coords
      .map(([lon, lat], index) => {
        const pt = project(lon, lat);
        return `${index === 0 ? 'M' : 'L'}${pt.x},${pt.y}`;
      })
      .join(' ') + ' Z'
  );
}

const LANDMASSES: readonly (readonly (readonly [number, number])[])[] = [
  // North America + Central America
  [
    [-166, 65], [-161, 70], [-145, 70], [-128, 70], [-110, 68], [-94, 67],
    [-82, 63], [-78, 53], [-66, 60], [-56, 52], [-64, 45], [-70, 42],
    [-76, 35], [-81, 25], [-84, 30], [-90, 29], [-97, 26], [-96, 19],
    [-89, 21], [-87, 16], [-83, 10], [-78, 8], [-82, 8], [-88, 13],
    [-95, 16], [-105, 20], [-110, 24], [-115, 31], [-121, 35], [-124, 42],
    [-125, 49], [-134, 57], [-148, 60], [-160, 56], [-166, 60],
  ],
  // Greenland
  [
    [-52, 60], [-42, 60], [-30, 68], [-18, 74], [-25, 76], [-48, 76],
    [-62, 74], [-55, 67],
  ],
  // Cuba / Caribbean hint
  [
    [-85, 22], [-75, 20], [-74, 21], [-82, 23],
  ],
  // South America
  [
    [-78, 9], [-72, 11], [-62, 10], [-50, 2], [-35, -6], [-38, -14],
    [-41, -22], [-48, -28], [-54, -35], [-62, -40], [-67, -50], [-69, -54],
    [-74, -52], [-73, -40], [-71, -24], [-76, -14], [-81, -5], [-79, 2],
  ],
  // Europe (Western, Central, Eastern, Iberia, Italy, Balkans)
  [
    [-9, 37], [-9, 43], [-2, 43], [-4, 48], [2, 51], [8, 54], [10, 57],
    [14, 54], [20, 55], [24, 59], [30, 60], [32, 66], [42, 67], [58, 68],
    [60, 55], [48, 46], [39, 45], [30, 46], [28, 41], [23, 38], [20, 40],
    [16, 40], [12, 42], [14, 45], [8, 44], [3, 42], [-2, 37], [-6, 36],
  ],
  // Scandinavia
  [
    [5, 60], [10, 64], [16, 69], [28, 71], [31, 69], [25, 65], [22, 60],
    [18, 59], [14, 56], [11, 59], [7, 58],
  ],
  // Great Britain & Ireland
  [
    [-5, 50], [1, 51], [-1, 55], [-4, 58], [-6, 56], [-4, 52],
  ],
  [
    [-10, 52], [-6, 52], [-6, 55], [-9, 55],
  ],
  // Africa
  [
    [-17, 15], [-16, 21], [-10, 32], [-5, 36], [10, 37], [11, 33],
    [20, 32], [32, 31], [35, 25], [43, 12], [51, 12], [49, 4],
    [41, -2], [40, -14], [35, -24], [28, -33], [18, -34], [14, -22],
    [12, -6], [9, 4], [2, 6], [-8, 5], [-15, 11],
  ],
  // Madagascar
  [
    [44, -25], [47, -25], [50, -13], [48, -13], [44, -19],
  ],
  // Asia + Middle East
  [
    [27, 41], [36, 41], [42, 42], [50, 40], [54, 46], [60, 55],
    [58, 68], [75, 72], [105, 75], [135, 72], [168, 66], [176, 62],
    [162, 54], [156, 51], [141, 54], [136, 44], [129, 40], [129, 35],
    [126, 35], [125, 39], [118, 39], [122, 31], [120, 23], [109, 20],
    [109, 12], [104, 10], [102, 13], [104, 1], [100, 6], [98, 16],
    [90, 22], [84, 18], [78, 8], [73, 18], [68, 24], [60, 25],
    [56, 26], [51, 24], [59, 22], [53, 16], [44, 13], [39, 21],
    [35, 29], [35, 36], [27, 37],
  ],
  // Sri Lanka
  [
    [80, 9], [82, 7], [80, 6], [79, 8],
  ],
  // Japan
  [
    [130, 31], [132, 34], [139, 35], [141, 40], [145, 44], [141, 45],
    [138, 38], [131, 34],
  ],
  // Taiwan
  [
    [120.5, 22.0], [122.0, 25.1], [121.0, 25.2], [120.1, 23.0],
  ],
  // Philippines
  [
    [120, 18], [123, 14], [126, 7], [122, 7], [120, 14],
  ],
  // Indonesia (Sumatra, Java, Borneo, Sulawesi)
  [
    [95, 5], [105, -6], [103, -6], [96, 1],
  ],
  [
    [106, -6], [115, -8], [114, -9], [106, -7],
  ],
  [
    [109, 2], [118, 5], [118, -3], [110, -3],
  ],
  [
    [131, -2], [141, -3], [150, -10], [142, -9], [134, -5],
  ],
  // Australia
  [
    [114, -22], [123, -16], [131, -12], [136, -12], [141, -16], [143, -11],
    [146, -18], [153, -27], [150, -37], [141, -38], [136, -35], [129, -32],
    [115, -34], [113, -26],
  ],
  // Tasmania
  [
    [145, -41], [148, -41], [147, -43.5], [145, -43],
  ],
  // New Zealand (North & South Islands)
  [
    [173, -35], [178, -38], [175, -41], [174, -39],
  ],
  [
    [172, -41], [174, -42], [169, -46], [167, -45],
  ],
];

export function renderWorldMapSvg(markers: readonly MapMarker[]): string {
  const latLines = [-30, 0, 30, 60];
  const lonLines = [-120, -60, 0, 60, 120];

  const graticule = [
    ...latLines.map((lat) => {
      const y = project(0, lat).y;
      const dash = lat === 0 ? 'stroke-dasharray="3,2" stroke="#85A1BA"' : 'stroke="#A6BED4"';
      return `<line x1="0" y1="${y}" x2="${MAP_WIDTH}" y2="${y}" ${dash} stroke-width="0.65"/>`;
    }),
    ...lonLines.map((lon) => {
      const x = project(lon, 0).x;
      return `<line x1="${x}" y1="0" x2="${x}" y2="${MAP_HEIGHT}" stroke="#A6BED4" stroke-width="0.6"/>`;
    }),
  ].join('');

  const landPaths = LANDMASSES.map(
    (poly) =>
      `<path d="${polygonPath(poly)}" fill="#F3EDE0" stroke="#7B7160" stroke-width="0.85" stroke-linejoin="round"/>`,
  ).join('');

  const markerElements = markers
    .map((m) => {
      const pt = project(m.lon, m.lat);
      const color = CATEGORY_COLORS[m.category];
      const dx = m.labelDx ?? 5;
      const dy = m.labelDy ?? -4;
      const anchor = m.anchor ?? 'start';
      const labelEl = m.showLabel
        ? `<text x="${(pt.x + dx).toFixed(1)}" y="${(pt.y + dy).toFixed(1)}" text-anchor="${anchor}" font-family="Segoe UI, Arial, sans-serif" font-size="8.0" font-weight="800" fill="#0F172A" paint-order="stroke" stroke="#F8F5EE" stroke-width="2.6" stroke-linejoin="round">${m.label}</text>`
        : '';

      return `
        <g>
          <circle cx="${pt.x}" cy="${pt.y}" r="6.2" fill="${color}" fill-opacity="0.25"/>
          <circle cx="${pt.x}" cy="${pt.y}" r="3.2" fill="${color}" stroke="#FFFFFF" stroke-width="1.25"/>
          ${labelEl}
        </g>`;
    })
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${MAP_WIDTH} ${MAP_HEIGHT}" width="${MAP_WIDTH}" height="${MAP_HEIGHT}" style="display:block;width:100%;height:auto;">
    <defs>
      <linearGradient id="oceanGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#C9DCED"/>
        <stop offset="100%" stop-color="#B6CDE1"/>
      </linearGradient>
    </defs>
    <rect width="${MAP_WIDTH}" height="${MAP_HEIGHT}" fill="url(#oceanGrad)"/>
    ${graticule}
    ${landPaths}
    ${markerElements}
  </svg>`;
}
