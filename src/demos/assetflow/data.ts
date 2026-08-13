/** Demo seed data for AssetFlow. Entirely fictional — no client data. */

export const TODAY = '2026-08-13'

export type AssetStatus = 'in-service' | 'in-store' | 'maintenance' | 'checked-out' | 'disposed'
export type Condition = 'excellent' | 'good' | 'fair' | 'poor'

export type Branch = { id: string; name: string; city: string; manager: string }
export type Building = { id: string; branchId: string; name: string; floors: number }
export type Room = {
  id: string
  buildingId: string
  floor: number
  name: string
  code: string
  officer: string
}

export type Asset = {
  id: string
  tag: string
  name: string
  category: string
  model: string
  serial: string
  roomId: string
  custodian: string
  status: AssetStatus
  condition: Condition
  purchased: string
  cost: number
  lifeYears: number
}

export type WorkOrder = {
  id: string
  assetTag: string
  assetName: string
  kind: 'Preventive' | 'Corrective' | 'Inspection'
  priority: 'Low' | 'Medium' | 'High'
  status: 'scheduled' | 'in-progress' | 'awaiting-parts' | 'completed'
  technician: string
  opened: string
  due: string
  note: string
  cost: number
}

export type StockItem = {
  id: string
  name: string
  unit: string
  onHand: number
  reorderAt: number
  unitCost: number
  store: string
}

export type Movement = {
  id: string
  assetTag: string
  action: string
  who: string
  when: string
  detail: string
}

export const branches: Branch[] = [
  { id: 'br-hq', name: 'Head Office', city: 'Addis Ababa', manager: 'Selamawit Bekele' },
  { id: 'br-adm', name: 'Adama Depot', city: 'Adama', manager: 'Yonas Tesfaye' },
  { id: 'br-haw', name: 'Hawassa Branch', city: 'Hawassa', manager: 'Marta Girma' },
]

export const buildings: Building[] = [
  { id: 'bl-1', branchId: 'br-hq', name: 'Tower A', floors: 4 },
  { id: 'bl-2', branchId: 'br-hq', name: 'Annex', floors: 2 },
  { id: 'bl-3', branchId: 'br-adm', name: 'Warehouse 1', floors: 1 },
  { id: 'bl-4', branchId: 'br-adm', name: 'Depot Office', floors: 2 },
  { id: 'bl-5', branchId: 'br-haw', name: 'Main Block', floors: 3 },
]

export const rooms: Room[] = [
  { id: 'rm-101', buildingId: 'bl-1', floor: 1, name: 'Reception', code: 'A-101', officer: 'Hanna Alemu' },
  { id: 'rm-104', buildingId: 'bl-1', floor: 1, name: 'Server Room', code: 'A-104', officer: 'Dawit Mekonnen' },
  { id: 'rm-201', buildingId: 'bl-1', floor: 2, name: 'Finance Office', code: 'A-201', officer: 'Betelhem Tadesse' },
  { id: 'rm-203', buildingId: 'bl-1', floor: 2, name: 'Meeting Room 2', code: 'A-203', officer: 'Hanna Alemu' },
  { id: 'rm-301', buildingId: 'bl-1', floor: 3, name: 'Engineering Bay', code: 'A-301', officer: 'Dawit Mekonnen' },
  { id: 'rm-401', buildingId: 'bl-1', floor: 4, name: 'Executive Suite', code: 'A-401', officer: 'Selamawit Bekele' },
  { id: 'rm-a01', buildingId: 'bl-2', floor: 1, name: 'Records Store', code: 'X-101', officer: 'Meron Haile' },
  { id: 'rm-a02', buildingId: 'bl-2', floor: 2, name: 'Training Room', code: 'X-201', officer: 'Meron Haile' },
  { id: 'rm-w01', buildingId: 'bl-3', floor: 1, name: 'Bay 1 — Heavy', code: 'W-01', officer: 'Yonas Tesfaye' },
  { id: 'rm-w02', buildingId: 'bl-3', floor: 1, name: 'Bay 2 — Spares', code: 'W-02', officer: 'Abel Negash' },
  { id: 'rm-d01', buildingId: 'bl-4', floor: 1, name: 'Dispatch Office', code: 'D-101', officer: 'Abel Negash' },
  { id: 'rm-d02', buildingId: 'bl-4', floor: 2, name: 'Depot Admin', code: 'D-201', officer: 'Yonas Tesfaye' },
  { id: 'rm-h01', buildingId: 'bl-5', floor: 1, name: 'Front Desk', code: 'H-101', officer: 'Marta Girma' },
  { id: 'rm-h02', buildingId: 'bl-5', floor: 2, name: 'Sales Floor', code: 'H-201', officer: 'Kalkidan Assefa' },
  { id: 'rm-h03', buildingId: 'bl-5', floor: 3, name: 'IT Closet', code: 'H-301', officer: 'Kalkidan Assefa' },
]

export const categories = [
  'IT Equipment',
  'Furniture',
  'Vehicles',
  'Machinery',
  'Network',
  'Lab Equipment',
  'Software License',
  'Appliance',
] as const

export const assets: Asset[] = [
  { id: 'a01', tag: 'AF-IT-0104', name: 'Dell PowerEdge R650', category: 'IT Equipment', model: 'R650 / 128GB', serial: 'SN-8841203', roomId: 'rm-104', custodian: 'Dawit Mekonnen', status: 'in-service', condition: 'excellent', purchased: '2024-03-12', cost: 1_240_000, lifeYears: 6 },
  { id: 'a02', tag: 'AF-NW-0021', name: 'Cisco Catalyst 9300', category: 'Network', model: 'C9300-48P', serial: 'SN-4410992', roomId: 'rm-104', custodian: 'Dawit Mekonnen', status: 'in-service', condition: 'excellent', purchased: '2024-03-12', cost: 620_000, lifeYears: 7 },
  { id: 'a03', tag: 'AF-NW-0022', name: 'APC Smart-UPS 5000VA', category: 'Network', model: 'SRT5KRMXLI', serial: 'SN-7712045', roomId: 'rm-104', custodian: 'Dawit Mekonnen', status: 'maintenance', condition: 'fair', purchased: '2021-11-04', cost: 385_000, lifeYears: 5 },
  { id: 'a04', tag: 'AF-IT-0210', name: 'MacBook Pro 14"', category: 'IT Equipment', model: 'M3 Pro / 36GB', serial: 'SN-9930118', roomId: 'rm-201', custodian: 'Betelhem Tadesse', status: 'in-service', condition: 'excellent', purchased: '2025-01-22', cost: 310_000, lifeYears: 4 },
  { id: 'a05', tag: 'AF-IT-0211', name: 'HP LaserJet M776', category: 'IT Equipment', model: 'M776dn', serial: 'SN-2210447', roomId: 'rm-201', custodian: 'Betelhem Tadesse', status: 'in-service', condition: 'good', purchased: '2023-06-09', cost: 148_000, lifeYears: 5 },
  { id: 'a06', tag: 'AF-FN-0330', name: 'Executive Desk (Oak)', category: 'Furniture', model: 'ED-180', serial: '—', roomId: 'rm-401', custodian: 'Selamawit Bekele', status: 'in-service', condition: 'good', purchased: '2022-02-18', cost: 96_000, lifeYears: 10 },
  { id: 'a07', tag: 'AF-FN-0331', name: 'Conference Table 12-seat', category: 'Furniture', model: 'CT-12', serial: '—', roomId: 'rm-203', custodian: 'Hanna Alemu', status: 'in-service', condition: 'good', purchased: '2022-02-18', cost: 132_000, lifeYears: 10 },
  { id: 'a08', tag: 'AF-IT-0212', name: 'Epson EB-L520U Projector', category: 'IT Equipment', model: 'EB-L520U', serial: 'SN-5540021', roomId: 'rm-203', custodian: 'Hanna Alemu', status: 'checked-out', condition: 'good', purchased: '2023-09-30', cost: 172_000, lifeYears: 5 },
  { id: 'a09', tag: 'AF-VH-0007', name: 'Toyota Hilux 2.4D', category: 'Vehicles', model: 'Double Cab', serial: 'VIN-MR0HA8CD', roomId: 'rm-d01', custodian: 'Abel Negash', status: 'in-service', condition: 'good', purchased: '2023-04-02', cost: 3_450_000, lifeYears: 8 },
  { id: 'a10', tag: 'AF-VH-0008', name: 'Isuzu NPR Truck', category: 'Vehicles', model: 'NPR 5.2T', serial: 'VIN-JAANPR75', roomId: 'rm-d01', custodian: 'Abel Negash', status: 'maintenance', condition: 'fair', purchased: '2020-08-15', cost: 4_100_000, lifeYears: 10 },
  { id: 'a11', tag: 'AF-MC-0055', name: 'Forklift 3T Diesel', category: 'Machinery', model: 'FD30T', serial: 'SN-6620881', roomId: 'rm-w01', custodian: 'Yonas Tesfaye', status: 'in-service', condition: 'good', purchased: '2022-10-11', cost: 2_180_000, lifeYears: 12 },
  { id: 'a12', tag: 'AF-MC-0056', name: 'Air Compressor 500L', category: 'Machinery', model: 'AC-500', serial: 'SN-3390274', roomId: 'rm-w01', custodian: 'Yonas Tesfaye', status: 'in-service', condition: 'fair', purchased: '2021-05-20', cost: 540_000, lifeYears: 10 },
  { id: 'a13', tag: 'AF-MC-0057', name: 'Pallet Jack (Electric)', category: 'Machinery', model: 'EPT20', serial: 'SN-1180553', roomId: 'rm-w02', custodian: 'Abel Negash', status: 'in-store', condition: 'excellent', purchased: '2025-07-01', cost: 285_000, lifeYears: 8 },
  { id: 'a14', tag: 'AF-AP-0140', name: 'Standing AC 3HP', category: 'Appliance', model: 'GSH-36', serial: 'SN-7702394', roomId: 'rm-h02', custodian: 'Kalkidan Assefa', status: 'in-service', condition: 'good', purchased: '2023-12-05', cost: 118_000, lifeYears: 7 },
  { id: 'a15', tag: 'AF-AP-0141', name: 'Water Dispenser', category: 'Appliance', model: 'WD-20', serial: 'SN-4419920', roomId: 'rm-h01', custodian: 'Marta Girma', status: 'in-service', condition: 'good', purchased: '2024-02-14', cost: 22_000, lifeYears: 5 },
  { id: 'a16', tag: 'AF-IT-0213', name: 'Lenovo ThinkPad T14', category: 'IT Equipment', model: 'T14 Gen 4', serial: 'SN-8820117', roomId: 'rm-h02', custodian: 'Kalkidan Assefa', status: 'in-service', condition: 'good', purchased: '2024-09-18', cost: 165_000, lifeYears: 4 },
  { id: 'a17', tag: 'AF-IT-0214', name: 'Lenovo ThinkPad T14', category: 'IT Equipment', model: 'T14 Gen 4', serial: 'SN-8820118', roomId: 'rm-h02', custodian: 'Marta Girma', status: 'checked-out', condition: 'good', purchased: '2024-09-18', cost: 165_000, lifeYears: 4 },
  { id: 'a18', tag: 'AF-NW-0023', name: 'Ubiquiti UDM Pro', category: 'Network', model: 'UDM-Pro', serial: 'SN-6650032', roomId: 'rm-h03', custodian: 'Kalkidan Assefa', status: 'in-service', condition: 'excellent', purchased: '2025-03-27', cost: 78_000, lifeYears: 6 },
  { id: 'a19', tag: 'AF-SW-0402', name: 'AutoCAD LT — 12 seats', category: 'Software License', model: 'Annual', serial: 'LIC-AC-2026', roomId: 'rm-301', custodian: 'Dawit Mekonnen', status: 'in-service', condition: 'excellent', purchased: '2026-01-05', cost: 620_000, lifeYears: 1 },
  { id: 'a20', tag: 'AF-SW-0403', name: 'Microsoft 365 Business — 60 seats', category: 'Software License', model: 'Annual', serial: 'LIC-M365-26', roomId: 'rm-104', custodian: 'Dawit Mekonnen', status: 'in-service', condition: 'excellent', purchased: '2026-01-05', cost: 840_000, lifeYears: 1 },
  { id: 'a21', tag: 'AF-LB-0088', name: 'Digital Torque Tester', category: 'Lab Equipment', model: 'DTT-500', serial: 'SN-9910233', roomId: 'rm-301', custodian: 'Dawit Mekonnen', status: 'in-service', condition: 'good', purchased: '2023-02-27', cost: 410_000, lifeYears: 8 },
  { id: 'a22', tag: 'AF-LB-0089', name: 'Thermal Imaging Camera', category: 'Lab Equipment', model: 'FLIR E8', serial: 'SN-5520918', roomId: 'rm-301', custodian: 'Dawit Mekonnen', status: 'in-store', condition: 'excellent', purchased: '2025-11-19', cost: 295_000, lifeYears: 7 },
  { id: 'a23', tag: 'AF-FN-0332', name: 'Filing Cabinet ×8', category: 'Furniture', model: 'FC-4D', serial: '—', roomId: 'rm-a01', custodian: 'Meron Haile', status: 'in-service', condition: 'fair', purchased: '2019-07-08', cost: 88_000, lifeYears: 10 },
  { id: 'a24', tag: 'AF-FN-0333', name: 'Training Chairs ×40', category: 'Furniture', model: 'TC-40', serial: '—', roomId: 'rm-a02', custodian: 'Meron Haile', status: 'in-service', condition: 'good', purchased: '2022-11-30', cost: 144_000, lifeYears: 8 },
  { id: 'a25', tag: 'AF-IT-0215', name: 'Dell OptiPlex 7010 ×6', category: 'IT Equipment', model: '7010 SFF', serial: 'SN-BATCH-06', roomId: 'rm-a02', custodian: 'Meron Haile', status: 'in-service', condition: 'good', purchased: '2023-08-21', cost: 396_000, lifeYears: 5 },
  { id: 'a26', tag: 'AF-AP-0142', name: 'Generator 40kVA', category: 'Appliance', model: 'FG-40', serial: 'SN-2280664', roomId: 'rm-w01', custodian: 'Yonas Tesfaye', status: 'in-service', condition: 'good', purchased: '2021-09-02', cost: 1_320_000, lifeYears: 12 },
  { id: 'a27', tag: 'AF-IT-0102', name: 'HP ProLiant DL380 (retired)', category: 'IT Equipment', model: 'Gen9', serial: 'SN-1120998', roomId: 'rm-a01', custodian: 'Meron Haile', status: 'disposed', condition: 'poor', purchased: '2017-05-14', cost: 780_000, lifeYears: 6 },
  { id: 'a28', tag: 'AF-MC-0058', name: 'Welding Machine 400A', category: 'Machinery', model: 'MIG-400', serial: 'SN-7730116', roomId: 'rm-w02', custodian: 'Abel Negash', status: 'in-service', condition: 'good', purchased: '2024-06-17', cost: 232_000, lifeYears: 9 },
]

export const workOrders: WorkOrder[] = [
  { id: 'WO-1042', assetTag: 'AF-NW-0022', assetName: 'APC Smart-UPS 5000VA', kind: 'Corrective', priority: 'High', status: 'awaiting-parts', technician: 'Dawit Mekonnen', opened: '2026-08-03', due: '2026-08-16', note: 'Battery bank at 41% health. Replacement cells ordered from supplier.', cost: 62_000 },
  { id: 'WO-1043', assetTag: 'AF-VH-0008', assetName: 'Isuzu NPR Truck', kind: 'Corrective', priority: 'High', status: 'in-progress', technician: 'Abel Negash', opened: '2026-08-07', due: '2026-08-15', note: 'Clutch replacement and full brake inspection at depot garage.', cost: 138_000 },
  { id: 'WO-1044', assetTag: 'AF-MC-0055', assetName: 'Forklift 3T Diesel', kind: 'Preventive', priority: 'Medium', status: 'scheduled', technician: 'Yonas Tesfaye', opened: '2026-08-10', due: '2026-08-21', note: '500-hour service — oil, filters, hydraulic check.', cost: 24_000 },
  { id: 'WO-1045', assetTag: 'AF-AP-0142', assetName: 'Generator 40kVA', kind: 'Preventive', priority: 'Medium', status: 'scheduled', technician: 'Yonas Tesfaye', opened: '2026-08-11', due: '2026-08-25', note: 'Quarterly load test and coolant change.', cost: 18_500 },
  { id: 'WO-1046', assetTag: 'AF-IT-0211', assetName: 'HP LaserJet M776', kind: 'Corrective', priority: 'Low', status: 'scheduled', technician: 'Dawit Mekonnen', opened: '2026-08-12', due: '2026-08-28', note: 'Recurring paper jam in tray 3.', cost: 4_200 },
  { id: 'WO-1039', assetTag: 'AF-MC-0056', assetName: 'Air Compressor 500L', kind: 'Inspection', priority: 'Medium', status: 'completed', technician: 'Yonas Tesfaye', opened: '2026-07-14', due: '2026-07-22', note: 'Pressure vessel inspection passed. Certificate filed.', cost: 9_800 },
  { id: 'WO-1040', assetTag: 'AF-VH-0007', assetName: 'Toyota Hilux 2.4D', kind: 'Preventive', priority: 'Low', status: 'completed', technician: 'Abel Negash', opened: '2026-07-19', due: '2026-07-26', note: '10,000 km service completed at authorised garage.', cost: 21_400 },
  { id: 'WO-1041', assetTag: 'AF-MC-0058', assetName: 'Welding Machine 400A', kind: 'Inspection', priority: 'Low', status: 'completed', technician: 'Abel Negash', opened: '2026-07-28', due: '2026-08-04', note: 'Earth-leakage test passed.', cost: 3_600 },
]

export const stock: StockItem[] = [
  { id: 's1', name: 'A4 Paper (ream)', unit: 'ream', onHand: 42, reorderAt: 60, unitCost: 620, store: 'Head Office' },
  { id: 's2', name: 'Toner 59A Black', unit: 'pcs', onHand: 6, reorderAt: 8, unitCost: 4_900, store: 'Head Office' },
  { id: 's3', name: 'Hydraulic Oil 20L', unit: 'drum', onHand: 11, reorderAt: 6, unitCost: 7_400, store: 'Adama Depot' },
  { id: 's4', name: 'Cat6 Patch Cable 2m', unit: 'pcs', onHand: 88, reorderAt: 40, unitCost: 210, store: 'Head Office' },
  { id: 's5', name: 'Welding Rod 3.2mm', unit: 'kg', onHand: 14, reorderAt: 25, unitCost: 480, store: 'Adama Depot' },
  { id: 's6', name: 'Safety Gloves (pair)', unit: 'pair', onHand: 63, reorderAt: 30, unitCost: 340, store: 'Adama Depot' },
  { id: 's7', name: 'Diesel Filter NPR', unit: 'pcs', onHand: 2, reorderAt: 5, unitCost: 3_150, store: 'Adama Depot' },
  { id: 's8', name: 'Whiteboard Marker', unit: 'pcs', onHand: 37, reorderAt: 20, unitCost: 95, store: 'Hawassa Branch' },
]

export const movements: Movement[] = [
  { id: 'm1', assetTag: 'AF-IT-0212', action: 'Checked out', who: 'Hanna Alemu', when: '2026-08-12', detail: 'Projector taken to Adama for the regional review.' },
  { id: 'm2', assetTag: 'AF-LB-0089', action: 'Received', who: 'Dawit Mekonnen', when: '2026-08-11', detail: 'Registered into store after customs clearance.' },
  { id: 'm3', assetTag: 'AF-NW-0022', action: 'Sent to maintenance', who: 'Dawit Mekonnen', when: '2026-08-03', detail: 'UPS battery health below threshold — WO-1042 opened.' },
  { id: 'm4', assetTag: 'AF-IT-0214', action: 'Reassigned', who: 'Marta Girma', when: '2026-07-30', detail: 'Custody moved from Kalkidan Assefa to Marta Girma.' },
  { id: 'm5', assetTag: 'AF-IT-0102', action: 'Disposed', who: 'Selamawit Bekele', when: '2026-07-24', detail: 'End of life. Board approval ref BD-2026-11.' },
  { id: 'm6', assetTag: 'AF-MC-0057', action: 'Transferred', who: 'Abel Negash', when: '2026-07-21', detail: 'Moved from Bay 1 to Bay 2 — Spares.' },
]

/* ---- derived helpers ------------------------------------------------ */

export const roomById = (id: string) => rooms.find((r) => r.id === id)!
export const buildingById = (id: string) => buildings.find((b) => b.id === id)!
export const branchById = (id: string) => branches.find((b) => b.id === id)!

export function branchOfAsset(a: Asset): Branch {
  return branchById(buildingById(roomById(a.roomId).buildingId).branchId)
}

export function locationLabel(a: Asset): string {
  const room = roomById(a.roomId)
  const building = buildingById(room.buildingId)
  const branch = branchById(building.branchId)
  return `${branch.name} · ${building.name} · ${room.code}`
}

const yearsBetween = (from: string, to: string) =>
  (new Date(to).getTime() - new Date(from).getTime()) / (365.25 * 24 * 3600 * 1000)

/** Straight-line depreciation to a 5% residual. */
export function bookValue(a: Asset, on: string = TODAY): number {
  if (a.status === 'disposed') return 0
  const salvage = a.cost * 0.05
  const age = Math.max(0, yearsBetween(a.purchased, on))
  const fraction = Math.min(age / a.lifeYears, 1)
  return Math.round(a.cost - (a.cost - salvage) * fraction)
}

export function ageLabel(a: Asset): string {
  const y = yearsBetween(a.purchased, TODAY)
  if (y < 1) return `${Math.max(1, Math.round(y * 12))} months`
  return `${y.toFixed(1)} years`
}

export const statusMeta: Record<AssetStatus, { label: string; tone: string }> = {
  'in-service': { label: 'In service', tone: 'good' },
  'in-store': { label: 'In store', tone: 'info' },
  maintenance: { label: 'Maintenance', tone: 'warn' },
  'checked-out': { label: 'Checked out', tone: 'accent' },
  disposed: { label: 'Disposed', tone: 'bad' },
}
