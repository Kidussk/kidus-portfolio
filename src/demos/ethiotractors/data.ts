/** Demo seed data for EthioTractors. Fictional enquiries and figures. */

export type Sector = 'agriculture' | 'construction' | 'mining' | 'power'

export const sectorLabel: Record<Sector, string> = {
  agriculture: 'Agriculture',
  construction: 'Construction',
  mining: 'Mining',
  power: 'Power & Logistics',
}

export type Product = {
  id: string
  name: string
  brand: string
  category: string
  sector: Sector
  blurb: string
  specs: [string, string][]
  tags: string[]
  published: boolean
  quoteClicks: number
}

export type Enquiry = {
  id: string
  name: string
  company: string
  email: string
  phone: string
  sector: Sector
  interest: string
  message: string
  received: string
  status: 'new' | 'contacted' | 'quoted' | 'closed'
  source: 'contact' | 'newsletter'
}

export const brands = [
  {
    key: 'doganlar',
    name: 'Doğanlar Agriculture',
    origin: 'Turkey',
    note: 'Nearly half a century of tillage equipment — ploughs, chisels, disc harrows and rotovators, heat-treated for demanding soil.',
    mark: 'DG',
  },
  {
    key: 'zoomlion',
    name: 'Zoomlion',
    origin: 'China',
    note: 'Earthmoving, mobile cranes, concrete, foundation and mining machinery, backed by a global parts and service network.',
    mark: 'ZL',
  },
  {
    key: 'romsan',
    name: 'Romsan Machinery',
    origin: 'Turkey',
    note: 'NATO-type transport trailers, mobile and containerised generator sets, and field living containers.',
    mark: 'RM',
  },
]

export const products: Product[] = [
  {
    id: 'p01',
    name: 'RK Series Disc Harrow',
    brand: 'Doğanlar',
    category: 'Tillage',
    sector: 'agriculture',
    blurb: 'Offset disc harrow for primary tillage on heavy soils, with heat-treated notched discs.',
    specs: [
      ['Working width', '2.4 – 3.6 m'],
      ['Discs', '24 – 32'],
      ['Tractor power', '90 – 140 hp'],
      ['Weight', '1,850 kg'],
    ],
    tags: ['Tillage', 'Trailed'],
    published: true,
    quoteClicks: 148,
  },
  {
    id: 'p02',
    name: 'Mouldboard Plough 5-Furrow',
    brand: 'Doğanlar',
    category: 'Tillage',
    sector: 'agriculture',
    blurb: 'Reversible mouldboard plough with shear-bolt protection for stony ground.',
    specs: [
      ['Furrows', '5'],
      ['Working depth', 'Up to 35 cm'],
      ['Tractor power', '110 – 160 hp'],
      ['Weight', '1,420 kg'],
    ],
    tags: ['Tillage', 'Mounted'],
    published: true,
    quoteClicks: 96,
  },
  {
    id: 'p03',
    name: 'Rotovator 210',
    brand: 'Doğanlar',
    category: 'Seedbed',
    sector: 'agriculture',
    blurb: 'Seedbed preparation rotovator with side chain drive and adjustable skids.',
    specs: [
      ['Working width', '2.1 m'],
      ['Blades', '48'],
      ['Tractor power', '70 – 95 hp'],
      ['PTO', '540 rpm'],
    ],
    tags: ['Seedbed', 'PTO'],
    published: true,
    quoteClicks: 71,
  },
  {
    id: 'p04',
    name: 'RH1104 Tractor',
    brand: 'Zoomlion',
    category: 'Tractors',
    sector: 'agriculture',
    blurb: 'Four-wheel-drive utility tractor with synchronised shuttle transmission.',
    specs: [
      ['Rated power', '110 hp'],
      ['Transmission', '16F / 8R'],
      ['Lift capacity', '3,500 kg'],
      ['Drive', '4WD'],
    ],
    tags: ['Tractor', '4WD'],
    published: true,
    quoteClicks: 312,
  },
  {
    id: 'p05',
    name: 'Combine Harvester TE90',
    brand: 'Zoomlion',
    category: 'Harvesting',
    sector: 'agriculture',
    blurb: 'Wheeled grain combine with a 2.6 m cutting header and 3,500 L grain tank.',
    specs: [
      ['Engine', '190 hp'],
      ['Header width', '2.6 m'],
      ['Grain tank', '3,500 L'],
      ['Threshing', 'Longitudinal axial'],
    ],
    tags: ['Harvesting', 'Grain'],
    published: true,
    quoteClicks: 204,
  },
  {
    id: 'p06',
    name: 'ZE215E Excavator',
    brand: 'Zoomlion',
    category: 'Earthmoving',
    sector: 'construction',
    blurb: 'Twenty-one tonne crawler excavator tuned for general contracting and trenching.',
    specs: [
      ['Operating weight', '21,500 kg'],
      ['Bucket', '0.91 m³'],
      ['Engine', 'Low-emission 160 hp'],
      ['Max dig depth', '6.6 m'],
    ],
    tags: ['Excavator', 'Crawler'],
    published: true,
    quoteClicks: 421,
  },
  {
    id: 'p07',
    name: 'ZL50GN Wheel Loader',
    brand: 'Zoomlion',
    category: 'Earthmoving',
    sector: 'construction',
    blurb: 'Five tonne wheel loader for aggregate handling, stockpiling and site clearance.',
    specs: [
      ['Rated load', '5,000 kg'],
      ['Bucket', '3.0 m³'],
      ['Engine', '220 hp'],
      ['Tip load', '9,800 kg'],
    ],
    tags: ['Loader', 'Aggregate'],
    published: true,
    quoteClicks: 287,
  },
  {
    id: 'p08',
    name: 'QY25V Truck Crane',
    brand: 'Zoomlion',
    category: 'Lifting',
    sector: 'construction',
    blurb: 'Twenty-five tonne truck-mounted crane with a four-section telescopic boom.',
    specs: [
      ['Max lift', '25 t'],
      ['Boom', '10.5 – 33.5 m'],
      ['Max height', '45 m'],
      ['Chassis', '6×4'],
    ],
    tags: ['Crane', 'Lifting'],
    published: true,
    quoteClicks: 176,
  },
  {
    id: 'p09',
    name: 'Concrete Batching Plant HZS90',
    brand: 'Zoomlion',
    category: 'Concrete',
    sector: 'construction',
    blurb: 'Ninety cubic metre per hour batching plant with twin-shaft mixer and skip feed.',
    specs: [
      ['Output', '90 m³/h'],
      ['Mixer', 'Twin-shaft 1.5 m³'],
      ['Aggregate bins', '4'],
      ['Control', 'Automatic'],
    ],
    tags: ['Concrete', 'Plant'],
    published: false,
    quoteClicks: 58,
  },
  {
    id: 'p10',
    name: 'ZD220-3 Motor Grader',
    brand: 'Zoomlion',
    category: 'Road building',
    sector: 'construction',
    blurb: 'Motor grader for road formation and maintenance, with articulated frame steering.',
    specs: [
      ['Blade width', '3.96 m'],
      ['Engine', '220 hp'],
      ['Operating weight', '16,800 kg'],
      ['Steering', 'Articulated'],
    ],
    tags: ['Grader', 'Roads'],
    published: true,
    quoteClicks: 133,
  },
  {
    id: 'p11',
    name: 'ZE490E Mining Excavator',
    brand: 'Zoomlion',
    category: 'Mining',
    sector: 'mining',
    blurb: 'Forty-nine tonne excavator with reinforced undercarriage for quarry and mine duty.',
    specs: [
      ['Operating weight', '49,000 kg'],
      ['Bucket', '2.6 m³'],
      ['Engine', '355 hp'],
      ['Max dig depth', '7.5 m'],
    ],
    tags: ['Mining', 'Heavy'],
    published: true,
    quoteClicks: 239,
  },
  {
    id: 'p12',
    name: 'Rigid Dump Truck 40T',
    brand: 'Zoomlion',
    category: 'Mining',
    sector: 'mining',
    blurb: 'Forty tonne rigid haul truck for quarry benches and short haul roads.',
    specs: [
      ['Payload', '40 t'],
      ['Body volume', '24 m³'],
      ['Engine', '540 hp'],
      ['Drive', '6×4'],
    ],
    tags: ['Haulage', 'Quarry'],
    published: true,
    quoteClicks: 191,
  },
  {
    id: 'p13',
    name: 'NATO Type Lowbed Trailer',
    brand: 'Romsan',
    category: 'Trailers',
    sector: 'power',
    blurb: 'Three-axle lowbed transport trailer built to defence-grade specification.',
    specs: [
      ['Capacity', '60 t'],
      ['Axles', '3'],
      ['Deck length', '9.5 m'],
      ['Ramps', 'Hydraulic'],
    ],
    tags: ['Trailer', 'Transport'],
    published: true,
    quoteClicks: 84,
  },
  {
    id: 'p14',
    name: 'Containerised Generator 250 kVA',
    brand: 'Romsan',
    category: 'Power',
    sector: 'power',
    blurb: 'Sound-attenuated containerised diesel generator set for remote camps and sites.',
    specs: [
      ['Prime power', '250 kVA'],
      ['Enclosure', '20 ft container'],
      ['Fuel tank', '1,000 L'],
      ['Noise', '75 dB at 7 m'],
    ],
    tags: ['Generator', 'Camp'],
    published: true,
    quoteClicks: 152,
  },
  {
    id: 'p15',
    name: 'Field Living Container',
    brand: 'Romsan',
    category: 'Site facilities',
    sector: 'power',
    blurb: 'Insulated accommodation container with sanitary fit-out for remote operations.',
    specs: [
      ['Size', '6 × 2.4 m'],
      ['Insulation', '50 mm PU'],
      ['Beds', '4'],
      ['Fit-out', 'Sanitary + power'],
    ],
    tags: ['Camp', 'Accommodation'],
    published: true,
    quoteClicks: 47,
  },
]

export const enquiries: Enquiry[] = [
  {
    id: 'EQ-2041',
    name: 'Tesfaye Wolde',
    company: 'Wolde Agro Farms',
    email: 'tesfaye@woldeagro.et',
    phone: '+251 911 22 33 44',
    sector: 'agriculture',
    interest: 'RH1104 Tractor',
    message:
      'We farm 340 hectares of wheat near Bahir Dar and want to replace two ageing tractors. Please send pricing and whether financing is possible.',
    received: '2026-08-13',
    status: 'new',
    source: 'contact',
  },
  {
    id: 'EQ-2040',
    name: 'Meaza Alemayehu',
    company: 'Horizon Construction PLC',
    email: 'meaza@horizoncon.et',
    phone: '+251 912 88 10 05',
    sector: 'construction',
    interest: 'ZE215E Excavator',
    message:
      'Two units required for a road package in Oromia starting October. Need delivery lead time and service coverage in the region.',
    received: '2026-08-12',
    status: 'new',
    source: 'contact',
  },
  {
    id: 'EQ-2039',
    name: 'Getachew Bekele',
    company: 'Rift Valley Minerals',
    email: 'g.bekele@rvminerals.com',
    phone: '+251 913 40 77 21',
    sector: 'mining',
    interest: 'ZE490E Mining Excavator',
    message:
      'Evaluating equipment for a new quarry bench. Interested in the 49 t class plus two haul trucks. Can you visit the site?',
    received: '2026-08-11',
    status: 'contacted',
    source: 'contact',
  },
  {
    id: 'EQ-2038',
    name: 'Sara Nigussie',
    company: 'Adama Grain Union',
    email: 'sara.n@adamagrain.et',
    phone: '+251 914 55 62 90',
    sector: 'agriculture',
    interest: 'Combine Harvester TE90',
    message:
      'The union is considering a shared harvester for the cooperative. What is the maintenance requirement and parts availability?',
    received: '2026-08-09',
    status: 'quoted',
    source: 'contact',
  },
  {
    id: 'EQ-2037',
    name: 'Daniel Habte',
    company: 'Habte Energy Services',
    email: 'daniel@habte-energy.et',
    phone: '+251 915 71 30 18',
    sector: 'power',
    interest: 'Containerised Generator 250 kVA',
    message:
      'Need three containerised sets for a telecoms rollout. Please confirm noise levels and whether ATS panels are included.',
    received: '2026-08-06',
    status: 'quoted',
    source: 'contact',
  },
  {
    id: 'EQ-2036',
    name: 'Newsletter subscriber',
    company: '',
    email: 'abebe.k@gmail.com',
    phone: '',
    sector: 'agriculture',
    interest: 'Newsletter subscription',
    message: 'Requested product news and updates.',
    received: '2026-08-05',
    status: 'closed',
    source: 'newsletter',
  },
  {
    id: 'EQ-2035',
    name: 'Yohannes Tadesse',
    company: 'Blue Nile Contractors',
    email: 'yohannes@bnc.et',
    phone: '+251 916 09 44 27',
    sector: 'construction',
    interest: 'QY25V Truck Crane',
    message: 'Crane needed for a six-month bridge project. Rental or purchase both considered.',
    received: '2026-08-02',
    status: 'closed',
    source: 'contact',
  },
]

/** Quote-click counters by week, the anonymous engagement beacon in the real system. */
export const trafficByWeek = [
  { week: 'W28', views: 1840, quotes: 42 },
  { week: 'W29', views: 2110, quotes: 51 },
  { week: 'W30', views: 1975, quotes: 47 },
  { week: 'W31', views: 2480, quotes: 64 },
  { week: 'W32', views: 2760, quotes: 71 },
  { week: 'W33', views: 3120, quotes: 88 },
]

export const statusTone: Record<Enquiry['status'], string> = {
  new: 'accent',
  contacted: 'info',
  quoted: 'warn',
  closed: 'good',
}
