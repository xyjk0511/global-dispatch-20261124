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
  security: '#B91C1C',
  diplomacy: '#1D4ED8',
  climate: '#B45309',
  space: '#4338CA',
  culture: '#7E22CE',
};

export const CATEGORY_LABELS: Readonly<Record<CategoryKey, string>> = {
  markets: 'Markets & Tech',
  security: 'Security',
  diplomacy: 'Diplomacy',
  climate: 'Climate & Health',
  space: 'Space',
  culture: 'Culture & Sport',
};

export const EDITION_2026_11_24: EditionData = {
  masthead: 'THE GLOBAL DISPATCH',
  dateLabel: 'TUESDAY, 24 NOVEMBER 2026',
  subtitle: 'ONE-DAY WORLD BRIEFING · ALL 6 INHABITED CONTINENTS · MARKETS · SECURITY · SPACE · CLIMATE · DIPLOMACY · SPORT',
  editionNote: 'Verified events of Tuesday, 24 November 2026 across global time zones',
  hero: {
    kicker: 'LEAD STORY · GLOBAL MARKETS & U.S. POLITICS',
    headline: 'Asia Tech Stocks Rally on Huang’s Nvidia Return; U.S. Lawmakers Probe Deal',
    summary:
      'Taiwan (+9.1%), South Korea’s KOSPI (+7.5%) and Japan’s Nikkei (+4.5%) surge after Nvidia reinstates CEO Jensen Huang following White House talks; bipartisan U.S. Congress committees announce national security and governance hearings.',
    imageFile: 'hero-markets.jpg',
    metrics: [
      { label: 'TAIEX', value: '+9.1%', direction: 'up' },
      { label: 'KOSPI', value: '+7.5%', direction: 'up' },
      { label: 'NIKKEI', value: '+4.5%', direction: 'up' },
      { label: 'NVDA', value: '+31%', direction: 'up' },
      { label: 'BRENT', value: '$90 (-3%)', direction: 'down' },
    ],
  },
  spotlights: [
    {
      id: 1,
      category: 'space',
      kicker: 'SPACE · CHINA & PAKISTAN',
      region: 'Jiuquan / Islamabad',
      headline: 'Shenzhou-24 Names First Foreign Astronaut',
      summary: 'CMSA unveils Tiangong crew featuring Pakistani payload specialist Muhammad Zeeshan Ali.',
      imageFile: 'spot-space.jpg',
      objectPosition: 'center 25%',
    },
    {
      id: 2,
      category: 'security',
      kicker: 'SECURITY · UKRAINE & NATO',
      region: 'Perm / Warsaw',
      headline: 'Ukraine Hits Russian Oil; NATO Space Alert',
      summary: 'Perm refinery struck; NATO deploys AWACS to Poland & warns on Russian space nuke.',
      imageFile: 'spot-security.jpg',
      objectPosition: 'center 48%',
    },
    {
      id: 3,
      category: 'climate',
      kicker: 'CLIMATE · UN SUMMIT',
      region: 'Antalya, Turkey',
      headline: 'COP31 Talks Collapse Without Accord',
      summary: 'Overtime UN climate summit deadlocks on fossil-fuel phase-out and adaptation finance.',
      imageFile: 'spot-climate.jpg',
      objectPosition: 'center 56%',
    },
    {
      id: 4,
      category: 'culture',
      kicker: 'SPORT · SWITZERLAND',
      region: 'Geneva',
      headline: 'Youngest World Chess Match Opens',
      summary: 'Reigning champion Gukesh (20) faces Javokhir Sindarov (20) in 14-game FIDE title clash.',
      imageFile: 'spot-chess.jpg',
      objectPosition: 'center 20%',
    },
  ],
  continents: [
    {
      id: 'americas',
      title: 'AMERICAS',
      accent: '#1D4ED8',
      countLabel: 'N. & S. AMERICA',
      briefs: [
        {
          tag: 'US',
          lead: 'AI Carbon & Space IPO:',
          body: 'Harvard/MIT studies find top 400 U.S. data centers out-emit Denmark; Quantum Space debuts on NYSE (QSPC).',
        },
        {
          tag: 'CAN/MEX',
          lead: 'BoC & Cartel Trial:',
          body: 'Bank of Canada’s Macklem addresses policy in Toronto; Alphabet closes C$6B bond; Mexico to try “El Chapo Isidro” locally.',
        },
        {
          tag: 'VEN/BRA',
          lead: 'Defense & Tech Summits:',
          body: 'Pentagon chief Hegseth signs Caracas security pact with Delcy Rodríguez; UN ECLAC innovation summit opens in Brasília.',
        },
        {
          tag: 'COL/PR',
          lead: 'Health & Culture:',
          body: 'Malaria spikes in quake-hit Chocó amid Ecuador El Niño rains (62k+ hit); 75th Miss Universe grand final in San Juan.',
        },
      ],
    },
    {
      id: 'europe',
      title: 'EUROPE',
      accent: '#B91C1C',
      countLabel: 'EU · NATO · MED',
      briefs: [
        {
          tag: 'MED/UKR',
          lead: 'Warship Sunk Off Libya:',
          body: 'Kyiv confirms sea-drone strike sank Russian corvette Merkury in Benghazi; Tripoli condemns foreign raid in its waters.',
        },
        {
          tag: 'POL/GER',
          lead: 'NATO Air & Aid Pledge:',
          body: 'Russian recon drone enters Polish airspace; German FM Wadephul pledges €11.6B for Kyiv into 2027 at Berlin assembly.',
        },
        {
          tag: 'ESA',
          lead: 'Climate Satellites:',
          body: 'Thales Alenia Space signs €240M+ OHB contract for Copernicus Sentinel-3NG ocean and ice-sheet altimeters.',
        },
        {
          tag: 'EURO',
          lead: 'Diverging Economies:',
          body: 'ECB Stability Review flags sovereign debt stress; German private sector hits 4-year high while France contracts.',
        },
      ],
    },
    {
      id: 'mideast',
      title: 'MIDDLE EAST',
      accent: '#B45309',
      countLabel: 'GULF · LEVANT',
      briefs: [
        {
          tag: 'OIL',
          lead: 'Crude Slides & Blockade:',
          body: 'Brent nears $90 (WTI ~$81) on rising Gulf flows; Iran vows to use all tools to confront the U.S. naval blockade.',
        },
        {
          tag: 'CYBER',
          lead: 'Maritime Cyber Probe:',
          body: 'U.S. investigates suspected Iranian cyberattacks targeting roughly 50 commercial ships and oil tankers near the Gulf.',
        },
        {
          tag: 'DIPL',
          lead: 'Regional De-escalation:',
          body: 'Netanyahu presses U.S. on Iran strikes as Israeli intel warns of multi-front war; Gulf states, Qatar & Turkey mediate.',
        },
        {
          tag: 'GAZA',
          lead: 'Strikes & UNSC Warning:',
          body: 'Airstrikes hit Gaza City & Khan Younis amid winter storm floods; India warns UNSC of Global South war food/fuel shocks.',
        },
      ],
    },
    {
      id: 'africa',
      title: 'AFRICA',
      accent: '#0F766E',
      countLabel: 'NORTH TO SOUTH',
      briefs: [
        {
          tag: 'LIBYA',
          lead: 'Sharara Pipeline Reopens:',
          body: 'National Oil Corp. confirms Sharara crude pipeline resumed flows to Zawiya storage, adding supply pressure on global oil.',
        },
        {
          tag: 'NIGER',
          lead: 'Niamey Investment Forum:',
          body: 'UNDP-backed inaugural Niger International Investment Forum (N2IF) opens across 13 strategic economic sectors.',
        },
        {
          tag: 'ETH/SDN',
          lead: 'Health & AU Mediation:',
          body: '5th Africa Public Health Conference opens in Addis Ababa; Sudan opposition urges AU/IGAD mediation with Ethiopia.',
        },
        {
          tag: 'NGA/DRC',
          lead: 'Diplomacy, Ebola & Oil:',
          body: 'Nigeria protests South Africa envoy tensions; Ituri clashes trap DRC Ebola teams; CREA tallies $21B African oil windfall.',
        },
      ],
    },
    {
      id: 'asia',
      title: 'ASIA',
      accent: '#4338CA',
      countLabel: 'EAST · SOUTH · SE',
      briefs: [
        {
          tag: 'KOR',
          lead: 'Air Alert & Spy Chief:',
          body: 'Jets scramble & Ulleung Island issues brief shelter alert over Russian warplanes; Kang Kum-sil tapped as 1st female NIS chief.',
        },
        {
          tag: 'IND/NPL',
          lead: '$1.62B Himalayan Pact:',
          body: 'Nepal PM Balendra Shah wraps India visit with $1.62B flood-reconstruction package & Ayodhya–Janakpur rail link.',
        },
        {
          tag: 'SGP',
          lead: 'AI Boom & Telecom Merger:',
          body: 'Singapore raises 2026 GDP outlook to ~6% on AI demand; StarHub & M1 announce merger; CO2 storage pact with Australia.',
        },
        {
          tag: 'CHN/JPN',
          lead: 'Security & Diplomacy:',
          body: 'Beijing reports death sentence in official espionage case; Japan–Czechia sign tax pact; Tokyo visits reporter jailed in Moscow.',
        },
      ],
    },
    {
      id: 'oceania',
      title: 'OCEANIA & PACIFIC',
      accent: '#7E22CE',
      countLabel: 'AUS · NZ · ISLANDS',
      briefs: [
        {
          tag: 'AUS',
          lead: 'U.S. Alliance Defense:',
          body: 'Foreign Minister Penny Wong tells Parliament Australia cannot abandon its U.S. alliance despite “America-first” shifts.',
        },
        {
          tag: 'TECH',
          lead: 'Social Media Law & Snow:',
          body: 'Canberra nears deal letting users sue platforms over addictive algorithms; unseasonable summer snow chills Tasmania (-19.3°C).',
        },
        {
          tag: 'NZL',
          lead: 'Energy & Flood Risk:',
          body: 'Auckland unveils $17B energy transition plan; scientists warn rising Waiho River threatens Franz Josef within 7 years.',
        },
        {
          tag: 'PAC',
          lead: 'COP31 & El Niño Fallout:',
          body: 'Pacific envoys decry COP31 adaptation deadlock as potent El Niño deepens PNG drought and raises cyclone threat.',
        },
      ],
    },
  ],
  markers: [
    { id: 1, lon: -77.0, lat: 38.9, label: 'Washington', category: 'markets', labelDx: 6, labelDy: -5, anchor: 'start', showLabel: true },
    { id: 2, lon: -79.4, lat: 43.7, label: 'Toronto', category: 'markets', labelDx: -6, labelDy: -7, anchor: 'end', showLabel: false },
    { id: 3, lon: -107.4, lat: 24.8, label: 'Sinaloa', category: 'security', labelDx: -6, labelDy: 3, anchor: 'end', showLabel: true },
    { id: 4, lon: -66.1, lat: 18.5, label: 'San Juan', category: 'culture', labelDx: 6, labelDy: 2, anchor: 'start', showLabel: false },
    { id: 5, lon: -66.9, lat: 10.5, label: 'Caracas', category: 'diplomacy', labelDx: 6, labelDy: -3, anchor: 'start', showLabel: true },
    { id: 6, lon: -77.0, lat: 5.5, label: 'Chocó', category: 'climate', labelDx: -6, labelDy: 6, anchor: 'end', showLabel: false },
    { id: 7, lon: -47.9, lat: -15.8, label: 'Brasília', category: 'diplomacy', labelDx: 6, labelDy: 4, anchor: 'start', showLabel: true },
    { id: 8, lon: 6.1, lat: 46.2, label: 'Geneva', category: 'culture', labelDx: -6, labelDy: 2, anchor: 'end', showLabel: true },
    { id: 9, lon: 13.4, lat: 52.5, label: 'Berlin', category: 'diplomacy', labelDx: 0, labelDy: -7, anchor: 'middle', showLabel: false },
    { id: 10, lon: 21.0, lat: 52.2, label: 'Warsaw', category: 'security', labelDx: 5, labelDy: -5, anchor: 'start', showLabel: true },
    { id: 11, lon: 56.2, lat: 58.0, label: 'Perm', category: 'security', labelDx: 6, labelDy: -4, anchor: 'start', showLabel: true },
    { id: 12, lon: 30.7, lat: 36.9, label: 'Antalya', category: 'climate', labelDx: 5, labelDy: -4, anchor: 'start', showLabel: true },
    { id: 13, lon: 20.1, lat: 32.1, label: 'Benghazi', category: 'security', labelDx: -5, labelDy: 7, anchor: 'end', showLabel: true },
    { id: 14, lon: 56.3, lat: 26.6, label: 'Hormuz', category: 'security', labelDx: -5, labelDy: 8, anchor: 'end', showLabel: true },
    { id: 15, lon: 2.1, lat: 13.5, label: 'Niamey', category: 'markets', labelDx: -6, labelDy: 3, anchor: 'end', showLabel: true },
    { id: 16, lon: 38.7, lat: 9.0, label: 'Addis', category: 'climate', labelDx: 6, labelDy: 4, anchor: 'start', showLabel: true },
    { id: 17, lon: 29.5, lat: 1.5, label: 'Ituri', category: 'climate', labelDx: -6, labelDy: 6, anchor: 'end', showLabel: false },
    { id: 18, lon: 28.0, lat: -26.2, label: 'Pretoria', category: 'diplomacy', labelDx: 6, labelDy: 4, anchor: 'start', showLabel: true },
    { id: 19, lon: 77.2, lat: 28.6, label: 'New Delhi', category: 'diplomacy', labelDx: 6, labelDy: 4, anchor: 'start', showLabel: true },
    { id: 20, lon: 100.3, lat: 40.9, label: 'Jiuquan', category: 'space', labelDx: -5, labelDy: -5, anchor: 'end', showLabel: true },
    { id: 21, lon: 127.0, lat: 37.6, label: 'Seoul', category: 'security', labelDx: -2, labelDy: -7, anchor: 'middle', showLabel: true },
    { id: 22, lon: 139.7, lat: 35.7, label: 'Tokyo', category: 'markets', labelDx: 6, labelDy: 3, anchor: 'start', showLabel: true },
    { id: 23, lon: 121.5, lat: 25.0, label: 'Taipei', category: 'markets', labelDx: 6, labelDy: 5, anchor: 'start', showLabel: false },
    { id: 24, lon: 103.8, lat: 1.3, label: 'Singapore', category: 'markets', labelDx: -6, labelDy: 7, anchor: 'end', showLabel: true },
    { id: 25, lon: 149.1, lat: -35.3, label: 'Canberra', category: 'diplomacy', labelDx: -6, labelDy: 4, anchor: 'end', showLabel: true },
    { id: 26, lon: 174.8, lat: -36.8, label: 'Auckland', category: 'climate', labelDx: -4, labelDy: -7, anchor: 'end', showLabel: true },
  ],
};
