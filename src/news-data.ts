export type CategoryKey = 'markets' | 'security' | 'diplomacy' | 'climate' | 'space' | 'culture';

export interface MarketMetric {
  readonly label: string;
  readonly value: string;
  readonly direction: 'up' | 'down' | 'neutral';
}

export interface HeroStory {
  readonly kicker: string;
  readonly headline: string;
  readonly summary: string;
  readonly imageFile: string;
  readonly metrics: readonly MarketMetric[];
}

export interface SpotlightCard {
  readonly id: number;
  readonly category: CategoryKey;
  readonly kicker: string;
  readonly region: string;
  readonly headline: string;
  readonly summary: string;
  readonly imageFile: string;
  readonly objectPosition?: string;
}

export interface RegionalBrief {
  readonly tag: string;
  readonly lead: string;
  readonly body: string;
}

export interface ContinentSection {
  readonly id: string;
  readonly title: string;
  readonly accent: string;
  readonly countLabel: string;
  readonly briefs: readonly RegionalBrief[];
}

export interface MapMarker {
  readonly id: number;
  readonly lon: number;
  readonly lat: number;
  readonly label: string;
  readonly category: CategoryKey;
  readonly labelDx?: number;
  readonly labelDy?: number;
  readonly anchor?: 'start' | 'middle' | 'end';
  readonly showLabel?: boolean;
}

export interface EditionData {
  readonly masthead: string;
  readonly dateLabel: string;
  readonly subtitle: string;
  readonly editionNote: string;
  readonly hero: HeroStory;
  readonly spotlights: readonly SpotlightCard[];
  readonly continents: readonly ContinentSection[];
  readonly markers: readonly MapMarker[];
}

export const CATEGORY_COLORS: Readonly<Record<CategoryKey, string>> = {
  markets: '#0F766E',
  security: '#C81E1E',
  diplomacy: '#1D4ED8',
  climate: '#B45309',
  space: '#4338CA',
  culture: '#7E22CE',
};

export const CATEGORY_LABELS: Readonly<Record<CategoryKey, string>> = {
  markets: 'Markets',
  security: 'Security',
  diplomacy: 'Diplomacy',
  climate: 'Climate/Health',
  space: 'Space',
  culture: 'Sport/Culture',
};

export const EDITION_2026_11_24: EditionData = {
  masthead: 'THE GLOBAL DISPATCH',
  dateLabel: 'TUESDAY, 24 NOVEMBER 2026',
  subtitle: 'FULL-DAY WORLD BRIEFING · 38 VERIFIED STORIES · 8 GLOBAL REGIONS · ALL 6 CONTINENTS · MARKETS · WAR · CLIMATE · SPACE · SPORT',
  editionNote: 'All 38 stories verified for Tuesday, 24 November 2026 across every time zone',
  hero: {
    kicker: 'LEAD STORY · GLOBAL MARKETS & U.S. POLITICS',
    headline: 'Asia Chips Rally on Huang’s Nvidia Return; Wall St Rotates as Congress Probes Deal',
    summary:
      'Taiwan (+9.0%), KOSPI (+7.5%) & Nikkei (+4.5%) surge on Huang’s return; Wall St rotates (Dow +0.85% to 50,019; Nasdaq -1.48%; NVDA -5.9%) as Congress vows probe.',
    imageFile: 'hero-markets.jpg',
    metrics: [
      { label: 'DOW', value: '+0.85% (50,019)', direction: 'up' },
      { label: 'NDQ', value: '-1.48%', direction: 'down' },
      { label: 'NVDA', value: '-5.86%', direction: 'down' },
      { label: 'TAIEX', value: '+9.0%', direction: 'up' },
      { label: 'BRENT', value: '~$90 (-3%)', direction: 'down' },
    ],
  },
  spotlights: [
    {
      id: 1,
      category: 'security',
      kicker: 'MIDDLE EAST · HORMUZ',
      region: 'Hormuz / Riyadh',
      headline: 'Tankers Hit Mines in Hormuz; Riyadh Struck',
      summary: 'IRGC cites 3–4 tankers aflame; Houthis hit Riyadh tower; Iran sets 7 talk terms.',
      imageFile: 'spot-hormuz.jpg',
      objectPosition: 'center 46%',
    },
    {
      id: 2,
      category: 'security',
      kicker: 'UKRAINE & NATO',
      region: 'Zaporizhzhia / Poland',
      headline: 'Zaporizhzhia Bombed; NATO Trains in Poland',
      summary: 'Guided bombs hurt 40+; Dymer toll hits 12; 11-nation European force drills in Poland.',
      imageFile: 'spot-security.jpg',
      objectPosition: 'center 48%',
    },
    {
      id: 3,
      category: 'climate',
      kicker: 'CLIMATE · UN SUMMIT',
      region: 'Antalya, Turkey',
      headline: 'COP31 Collapses Without Accord',
      summary: 'First UN climate summit without cover deal in 17 yrs over fossil-fuel & aid rift.',
      imageFile: 'spot-climate.jpg',
      objectPosition: 'center 56%',
    },
    {
      id: 4,
      category: 'space',
      kicker: 'SPACE · CHINA & ESA',
      region: 'Jiuquan / Mercury',
      headline: 'Shenzhou-24 Picks 1st Foreign Crew',
      summary: 'Pakistani specialist tapped for Tiangong; ESA confirms BepiColombo safe at Mercury.',
      imageFile: 'spot-space.jpg',
      objectPosition: 'center 25%',
    },
    {
      id: 5,
      category: 'culture',
      kicker: 'SPORT · EUROPE',
      region: 'Geneva / Madrid',
      headline: 'World Chess Draw; Real Madrid 5–1 PSV',
      summary: 'Gukesh & Sindarov (both 20) draw Game 1 in 38 moves; Mbappé brace powers UCL win.',
      imageFile: 'spot-chess.jpg',
      objectPosition: 'center 20%',
    },
  ],
  continents: [
    {
      id: 'north-america',
      title: 'NORTH AMERICA',
      accent: '#1D4ED8',
      countLabel: '4 STORIES',
      briefs: [
        {
          tag: 'US',
          lead: 'CDC Bypass Warning:',
          body: 'Director Erica Schwartz tells AP strained scientists publish urgent measles alerts externally.',
        },
        {
          tag: 'US',
          lead: 'CIA Breach & Defense:',
          body: 'Unclassified CIA cyber breach revealed; Ford & GM hold Pentagon defense-hardware talks.',
        },
        {
          tag: 'CAN',
          lead: 'Ottawa Pushback:',
          body: 'Canada rejects Pentagon “atrophied” memo; BoC Gov. Macklem speaks as Alphabet closes C$6B bond.',
        },
        {
          tag: 'MEX',
          lead: 'U.S. Drone & Cartel:',
          body: 'Mexico confirms U.S. spy drone aided “Chapo Isidro” raid (20 dead in Guasave); trial stays local.',
        },
      ],
    },
    {
      id: 'latin-america',
      title: 'LATIN AMERICA',
      accent: '#0369A1',
      countLabel: '4 STORIES',
      briefs: [
        {
          tag: 'COL',
          lead: 'Villavicencio Car Bomb:',
          body: 'Blast at Meta Governor’s Office injures 23–25; police end 25-person supermarket hostage standoff.',
        },
        {
          tag: 'BRA',
          lead: 'Storm & ECLAC Summit:',
          body: 'Rio Grande do Sul storm displaces ~20,000 in Tupanciretã; UN ECLAC tech summit opens in Brasília.',
        },
        {
          tag: 'VEN',
          lead: 'U.S.–Caracas Pact:',
          body: 'Pentagon chief Hegseth & interim Pres. Delcy Rodríguez sign military training and intel accord.',
        },
        {
          tag: 'ECU/PR',
          lead: 'Rights Probe & Culture:',
          body: 'U.S. pauses Ecuador joint raids over abuse probe; WHO grants Cuba $2M; 75th Miss Universe final.',
        },
      ],
    },
    {
      id: 'europe',
      title: 'EUROPE',
      accent: '#C81E1E',
      countLabel: '4 STORIES',
      briefs: [
        {
          tag: 'UK',
          lead: 'Timms PIP Welfare Reset:',
          body: 'Government review calls 13-yr disability benefit “unfit”; IFS flags major claimant shifts.',
        },
        {
          tag: 'EU',
          lead: '4-Yr Profit Boom:',
          body: 'European firms pace strongest earnings season in 4 years; ECB flags sovereign debt pressure.',
        },
        {
          tag: 'NATO',
          lead: 'Rome & Estonia Spat:',
          body: 'NATO Resilience Symposium opens in Rome on hybrid threats; Moscow & Tallinn clash on drones.',
        },
        {
          tag: 'UCL',
          lead: 'Champions League MD5:',
          body: 'Man City 2–2 Napoli; Arsenal 1–1 Dortmund; Galatasaray 1–0 Aston Villa; Como 1–0 AEK Athens.',
        },
      ],
    },
    {
      id: 'mideast',
      title: 'MIDDLE EAST',
      accent: '#B45309',
      countLabel: '4 STORIES',
      briefs: [
        {
          tag: 'OIL',
          lead: 'Crude Dips to ~$90:',
          body: 'Brent falls ~3% (WTI ~$81) on rising Gulf transits & Libya flows despite Hormuz mine attacks.',
        },
        {
          tag: 'ISR',
          lead: 'Iran Chem-Arms Claim:',
          body: 'Defense Min. Israel Katz alleges Iran is building chemical weapons; Tehran calls claim fraudulent.',
        },
        {
          tag: 'IRQ',
          lead: 'Kurdish Border Move:',
          body: 'Baghdad moves to assume control of KRG border crossings & energy sites over smuggling intel.',
        },
        {
          tag: 'GAZA',
          lead: 'Strikes & Gulf Talks:',
          body: 'Israeli strikes hit Gaza & S. Lebanon amid winter flooding; U.S. & Qatar press maritime security.',
        },
      ],
    },
    {
      id: 'africa',
      title: 'AFRICA',
      accent: '#0F766E',
      countLabel: '4 STORIES',
      briefs: [
        {
          tag: 'EGY/SDN',
          lead: 'Cairo Talks & $55M Aid:',
          body: 'El-Sisi hosts Sudan PM Idris on Red Sea & prisoners; AfDB/UNICEF launch Port Sudan water project.',
        },
        {
          tag: 'LBY',
          lead: 'Sharara & Benghazi:',
          body: 'NOC reopens Sharara crude pipeline; Tripoli condemns Ukrainian sea-drone strike on Merkury.',
        },
        {
          tag: 'NER',
          lead: '$9.6B Niamey Forum:',
          body: 'UNDP-backed inaugural Niger Investment Forum (N2IF) opens across 13 strategic sectors.',
        },
        {
          tag: 'NGA/DRC',
          lead: 'Oil Windfall & Mining:',
          body: 'CREA pegs Nigeria’s energy windfall at $7.5B; DRC enforces local-share foreign mining rules.',
        },
      ],
    },
    {
      id: 'east-asia',
      title: 'EAST ASIA',
      accent: '#4338CA',
      countLabel: '4 STORIES',
      briefs: [
        {
          tag: 'KOR',
          lead: 'Ulleung Alert & NIS:',
          body: 'Jets scramble as Russian warplanes enter KADIZ; Kang Kum-sil tapped as 1st female spy chief.',
        },
        {
          tag: 'TWN',
          lead: 'Election Interference:',
          body: 'Taipei flags Beijing air-ticket subsidies ahead of Nov 28 local elections as TAIEX jumps 9.0%.',
        },
        {
          tag: 'JPN',
          lead: 'Ransomware & Moscow:',
          body: 'Osaki Electric ransomware disrupts smart-meter supply; Tokyo visits reporter jailed in Russia.',
        },
        {
          tag: 'CHN',
          lead: 'Espionage & Tariffs:',
          body: 'Beijing reports death sentence in spy case; Asian exporters weigh looming U.S. tariff tiers.',
        },
      ],
    },
    {
      id: 'south-se-asia',
      title: 'SOUTH & SE ASIA',
      accent: '#047857',
      countLabel: '4 STORIES',
      briefs: [
        {
          tag: 'IND/NPL',
          lead: '$1.62B Flood Pact:',
          body: 'Nepal PM Balendra Shah wraps India visit with $1.62B aid & Ayodhya–Janakpur rail link.',
        },
        {
          tag: 'SGP',
          lead: '6% GDP & Telecom Deal:',
          body: 'Singapore lifts 2026 GDP forecast to ~6% on AI boom; StarHub & M1 unveil all-share merger.',
        },
        {
          tag: 'IND',
          lead: 'Lowy Index & UNSC:',
          body: 'India holds #3 in Lowy Asia Power Index (narrowest China gap); warns UNSC on war food shocks.',
        },
        {
          tag: 'SEA',
          lead: 'AI Water & Cloud:',
          body: 'Analysts warn El Niño drought threatens SE Asia data centers; Noma expands SG/AU AI cloud.',
        },
      ],
    },
    {
      id: 'oceania',
      title: 'OCEANIA & PACIFIC',
      accent: '#7E22CE',
      countLabel: '4 STORIES',
      briefs: [
        {
          tag: 'AUS',
          lead: 'Foreign Policy Speech:',
          body: 'FM Penny Wong tells Parliament Australia must keep U.S. alliance while elevating middle powers.',
        },
        {
          tag: 'AUS',
          lead: 'Social Law & Snow:',
          body: 'Canberra nears bill to sue platforms over addictive feeds; rare snow chills Tasmania (-19.3°C).',
        },
        {
          tag: 'NZL',
          lead: '$17B Grid & Flood Risk:',
          body: 'Auckland unveils $17B energy transition; scientists warn Waiho River threatens Franz Josef.',
        },
        {
          tag: 'PAC',
          lead: 'COP31 & El Niño:',
          body: 'Pacific envoys slam COP31 adaptation failure as El Niño deepens PNG drought & cyclone threat.',
        },
      ],
    },
  ],
  markers: [
    { id: 1, lon: -74.0, lat: 40.7, label: 'NYC/DC', category: 'markets', labelDx: 5, labelDy: -5, anchor: 'start', showLabel: true },
    { id: 2, lon: -75.7, lat: 45.4, label: 'Ottawa', category: 'diplomacy', labelDx: -5, labelDy: -6, anchor: 'end', showLabel: false },
    { id: 3, lon: -108.5, lat: 25.5, label: 'Sinaloa', category: 'security', labelDx: -5, labelDy: 3, anchor: 'end', showLabel: true },
    { id: 4, lon: -66.1, lat: 18.5, label: 'San Juan', category: 'culture', labelDx: 5, labelDy: 2, anchor: 'start', showLabel: false },
    { id: 5, lon: -66.9, lat: 10.5, label: 'Caracas', category: 'diplomacy', labelDx: 5, labelDy: -4, anchor: 'start', showLabel: true },
    { id: 6, lon: -73.6, lat: 4.1, label: 'Villavicencio', category: 'security', labelDx: -5, labelDy: 7, anchor: 'end', showLabel: true },
    { id: 7, lon: -47.9, lat: -15.8, label: 'Brasília', category: 'diplomacy', labelDx: 5, labelDy: -2, anchor: 'start', showLabel: true },
    { id: 8, lon: -53.8, lat: -29.1, label: 'S. Brazil', category: 'climate', labelDx: 5, labelDy: 6, anchor: 'start', showLabel: false },
    { id: 9, lon: -0.1, lat: 51.5, label: 'London', category: 'diplomacy', labelDx: -5, labelDy: -5, anchor: 'end', showLabel: true },
    { id: 10, lon: -3.7, lat: 40.4, label: 'Madrid', category: 'culture', labelDx: -5, labelDy: 4, anchor: 'end', showLabel: false },
    { id: 11, lon: 6.1, lat: 46.2, label: 'Geneva', category: 'culture', labelDx: -5, labelDy: 3, anchor: 'end', showLabel: false },
    { id: 12, lon: 12.5, lat: 41.9, label: 'Rome', category: 'diplomacy', labelDx: 5, labelDy: 5, anchor: 'start', showLabel: false },
    { id: 13, lon: 21.8, lat: 50.4, label: 'Poland', category: 'security', labelDx: -3, labelDy: -7, anchor: 'middle', showLabel: true },
    { id: 14, lon: 35.1, lat: 47.8, label: 'Ukraine', category: 'security', labelDx: 6, labelDy: -2, anchor: 'start', showLabel: true },
    { id: 15, lon: 30.7, lat: 36.9, label: 'Antalya', category: 'climate', labelDx: -5, labelDy: -3, anchor: 'end', showLabel: false },
    { id: 16, lon: 20.1, lat: 32.1, label: 'Benghazi', category: 'security', labelDx: -6, labelDy: 4, anchor: 'end', showLabel: true },
    { id: 17, lon: 31.2, lat: 30.0, label: 'Cairo', category: 'diplomacy', labelDx: -4, labelDy: 10, anchor: 'end', showLabel: true },
    { id: 18, lon: 46.7, lat: 24.7, label: 'Riyadh', category: 'security', labelDx: -4, labelDy: 8, anchor: 'end', showLabel: false },
    { id: 19, lon: 56.3, lat: 26.6, label: 'Hormuz', category: 'security', labelDx: 3, labelDy: 10, anchor: 'start', showLabel: true },
    { id: 20, lon: 44.4, lat: 33.3, label: 'Baghdad', category: 'diplomacy', labelDx: 5, labelDy: -2, anchor: 'start', showLabel: false },
    { id: 21, lon: 2.1, lat: 13.5, label: 'Niamey', category: 'markets', labelDx: -5, labelDy: 3, anchor: 'end', showLabel: true },
    { id: 22, lon: 37.2, lat: 19.6, label: 'Port Sudan', category: 'climate', labelDx: 5, labelDy: 6, anchor: 'start', showLabel: false },
    { id: 23, lon: 7.5, lat: 9.1, label: 'Abuja', category: 'markets', labelDx: -5, labelDy: 6, anchor: 'end', showLabel: false },
    { id: 24, lon: 28.8, lat: -3.5, label: 'DRC', category: 'markets', labelDx: 5, labelDy: 4, anchor: 'start', showLabel: true },
    { id: 25, lon: 77.2, lat: 28.6, label: 'New Delhi', category: 'diplomacy', labelDx: 6, labelDy: 6, anchor: 'start', showLabel: true },
    { id: 26, lon: 100.3, lat: 40.9, label: 'Jiuquan', category: 'space', labelDx: -5, labelDy: -5, anchor: 'end', showLabel: true },
    { id: 27, lon: 127.0, lat: 37.6, label: 'Seoul', category: 'security', labelDx: -1, labelDy: -7, anchor: 'middle', showLabel: true },
    { id: 28, lon: 139.7, lat: 35.7, label: 'Tokyo', category: 'markets', labelDx: 5, labelDy: 3, anchor: 'start', showLabel: true },
    { id: 29, lon: 121.5, lat: 25.0, label: 'Taipei', category: 'markets', labelDx: 5, labelDy: 5, anchor: 'start', showLabel: false },
    { id: 30, lon: 103.8, lat: 1.3, label: 'Singapore', category: 'markets', labelDx: -5, labelDy: 7, anchor: 'end', showLabel: true },
    { id: 31, lon: 149.1, lat: -35.3, label: 'Canberra', category: 'diplomacy', labelDx: -5, labelDy: 4, anchor: 'end', showLabel: true },
    { id: 32, lon: 174.8, lat: -36.8, label: 'Auckland', category: 'climate', labelDx: -4, labelDy: -7, anchor: 'end', showLabel: true },
  ],
};
