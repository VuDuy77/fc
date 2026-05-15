/* ████████████████████████████████████████████████████████████████████████████
   ██                                                                        ██
   ██   FACTORY GAME  —  JAVASCRIPT SOURCE MAP                              ██
   ██                                                                        ██
   ██  All game logic lives in a single <script> block.                     ██
   ██  Global state is stored in the object  G  (see MODULE 02).           ██
   ██  The main loop runs via  requestAnimationFrame  (_gameLoop).         ██
   ██                                                                        ██
   ██   MODULE 01 · DATA           line ~606   CURRENCIES, TIERS, ALL_M    ██
   ██     - CURRENCIES array: 7 currency types with conversion rates        ██
   ██     - CUR_RATES map: dollar-equivalent value of each currency         ██
   ██     - TIERS array: 10 machine tiers, each with machines[]             ██
   ██     - ALL_MACHINES flat array: every purchasable machine              ██
   ██                                                                        ██
   ██   MODULE 02 · SAVE/LOAD      line ~730   defaultState, save, load    ██
   ██     - defaultState(): returns a fresh G object for a new game         ██
   ██     - saveGame(notify): serialises G → localStorage                   ██
   ██     - loadGame(): deserialises + merges saved data back into G        ██
   ██                                                                        ██
   ██   MODULE 03 · CORE UI        line ~842   fmt, updateUI, switchTab    ██
   ██     - fmt(n): formats large numbers ($1.23K / $4.56M / $7.89B …)     ██
   ██     - updateUI(): refreshes titlebar money + money-bar values         ██
   ██     - switchTab(name): shows the correct .panel, updates tab style    ██
   ██                                                                        ██
   ██   MODULE 04 · BASE / SHOP    line ~870   slots, shop, sell           ██
   ██     - renderSlots(): draws the 5-column machine grid                  ██
   ██     - renderShop(): lists machines for the active tier                ██
   ██     - buyMachine(id): deducts cost, places machine in first free slot ██
   ██     - sellMachine(slotIdx): returns 1/3 of purchase price            ██
   ██                                                                        ██
   ██   MODULE 05 · BANK           line ~995   wallet, exchange             ██
   ██     - renderBankPanel(): interest, loans, wallet, exchange            ██
   ██     - depositBank / withdrawBank: savings account with % interest     ██
   ██     - takeLoan / repayLoan: 60-min repay window or → bankruptcy       ██
   ██     - exchangeCurrency: converts between 7 currency types             ██
   ██                                                                        ██
   ██   MODULE 06 · MARKET         line ~1241  stocks, buy, listings        ██
   ██     - MARKET_CONFIG: normal / mid / black market multipliers          ██
   ██     - renderMarket(): renders item cards for the active market type   ██
   ██     - buyMarketItem(stockId): purchase from NPC seller                ██
   ██     - listItem(invIdx, price): list player item for other buyers      ██
   ██     - processListingSales(): NPC buyers purchase player listings      ██
   ██                                                                        ██
   ██   MODULE 07 · INVENTORY      line ~1581  items, recycle              ██
   ██     - G.inventory[]: array of owned items {itemId, obtainedAt, …}    ██
   ██     - renderInventory(): 3-col grid of owned items                    ██
   ██     - useItem(idx): applies item effect (buff, currency, etc.)        ██
   ██     - recycleItem(idx): converts item → ♻️ Recycle Points             ██
   ██                                                                        ██
   ██   MODULE 08 · VALUE SYSTEM   line ~1789  multiplier, VIP shop        ██
   ██     - G.valueMultiplier: global income × multiplier from upgrades     ██
   ██     - renderVipShop(): shows one-time purchasable bundles             ██
   ██     - buyVipBundle(id): unlocks extra slots / tiers                   ██
   ██                                                                        ██
   ██   MODULE 09 · TERMINAL       line ~1941  vendors, commands           ██
   ██     - UNDERGROUND_VENDORS_*: arrays of darkweb vendor objects         ██
   ██     - BLACK_MARKET_GOODS[]: items only available via terminal         ██
   ██     - handleTerminalCommand(raw): parses and dispatches user input    ██
   ██     - call_to(url): connect to a vendor; shows catalog                ██
   ██     - buy [n]: purchase item n from current vendor catalog            ██
   ██     - bargain: attempt to lower vendor price (limited uses)           ██
   ██                                                                        ██
   ██   MODULE 10 · BOSS           line ~2010  conversations, endings      ██
   ██     - BOSSES[]: boss NPC definitions with multi-turn dialogue trees   ██
   ██     - talk_to(url): initiate boss conversation                        ██
   ██     - doSay(n): advance dialogue with choice n                        ██
   ██     - boss_catalog: show boss's exclusive high-value item list        ██
   ██                                                                        ██
   ██   MODULE 11 · OS UPDATES     line ~3096  v3 / v4 / v5               ██
   ██     - doOsUpdate():  free  → unlocks +5 vendors, -30% internet price  ██
   ██     - doOsUpdateV4(): $5K  → +5 vendors, -10% internet               ██
   ██     - doOsUpdateV5(): $25K → +5 VIP vendors, +1 free bargain/session  ██
   ██     Each update shows an animated progress bar in the terminal.       ██
   ██                                                                        ██
   ██   MODULE 12 · LOTTERY        line ~3611  jackpot365, mega365         ██
   ██     - LOTTERY_TYPES[]: ticket configs (bet range, odds, payout mult)  ██
   ██     - spinLottery(type): roll result, trigger jackpot effects         ██
   ██     - Jackpot visual: flash + shockwave + lasers + fireworks + rain   ██
   ██     - Live feed: fake NPC win/loss entries generated every ~8s        ██
   ██                                                                        ██
   ██   MODULE 13 · MATERIALS      line ~3962  matshop, bonuses            ██
   ██     - MAT_SHOP_ITEMS[]: upgrades that boost income multiplier          ██
   ██     - buyMatShopItem(id): spend $ → apply permanent income bonus      ██
   ██                                                                        ██
   ██   MODULE 14 · ELECTRICITY    line ~4142  power, fuel, outage         ██
   ██     - G.powerSeconds: remaining fuel in real seconds                  ██
   ██     - FUEL_TYPES[]: purchasable fuel canisters                        ██
   ██     - triggerOutage(): called when fuel hits 0; locks most tabs       ██
   ██     - buyFuel(id): replenishes G.powerSeconds; unlocks tabs           ██
   ██     - togglePower(): manual on/off switch in the Electricity panel    ██
   ██                                                                        ██
   ██   MODULE 15 · GAME LOOP      line ~4400  init, tick, renderAll       ██
   ██     - _gameLoop(ts): requestAnimationFrame loop; calls tick() each ms ██
   ██     - tick(dt): adds money based on active machines × multiplier      ██
   ██       drains powerSeconds, checks outage threshold                    ██
   ██     - renderAll(): full redraw of every visible panel                 ██
   ██     - initGame(): load save → render → start loop                     ██
   ██                                                                        ██
   ████████████████████████████████████████████████████████████████████████████ */

/* ┌─────────────────────────────────────────────────────────────────────────┐
   │  MODULE 01 · DATA  —  Currencies · Tiers · Machine registry            │
   │                                                                         │
   │  Read-only constant definitions.  Never mutated at runtime.             │
   │  All game state lives in G (see MODULE 02).                             │
   └─────────────────────────────────────────────────────────────────────────┘ */
// ═══ CURRENCIES ════════════════════════════════════════════════════
// Each entry describes one in-game currency.
// Fields: id (key used in G.wallet), name, icon, color, eq (exchange note)
// The "dollar" is the base unit; all others convert via CUR_RATES below.
const CURRENCIES = [
  { id:'dollar', name:'Dollar', icon:'💵', color:'#4ade80', eq:'$1 = 10 xu' },
  { id:'xu',     name:'Xu',     icon:'🪙', color:'#fbbf24', eq:'0.1$ = 1 xu' },
  { id:'gold',   name:'Small Gold', icon:'🥇', color:'#f59e0b', eq:'100$ = 1 gold' },
  { id:'diamond',name:'Diamond',    icon:'💎', color:'#60a5fa', eq:'1,000$ = 1 diamond' },
  { id:'dark',   name:'Dark Matter',icon:'🌑', color:'#a78bfa', eq:'10,000$ = 1 dark matter' },
  { id:'ruby',   name:'Ruby',       icon:'🔴', color:'#f87171', eq:'100,000$ = 1 ruby' },
  { id:'rainbow',name:'Rainbow Gem',icon:'🌈', color:'#e879f9', eq:'1,000,000$ = 1 rainbow gem' },
];
// CUR_RATES maps each non-dollar currency id → its dollar value.
// Used by exchangeCurrency() and the bank wallet display.
// Example: 1 gold = $100, so trading 1 gold → +$100 (minus rounding).
const CUR_RATES = { xu:0.1, gold:100, diamond:1000, dark:10000, ruby:100000, rainbow:1000000 };

// ═══ TIERS ═════════════════════════════════════════════════════════
// TIER DESIGN — Hard Mode economy, wealth cap ~$999 Trillion
// Each tier has machines with progressively higher price and $/s rate.
// "payback" = hours until the machine earns back its own purchase price.
// Tiers are unlocked by spending money (unlockCost) once the previous tier exists.
//
// Tier economy summary:
// T1 payback 2-6h  | T2 payback 3-9h   | T3 payback 6-18h
// T4 payback 7-21h | T5 payback 9-31h  | T6 payback 12-42h
// T7 payback 15-40h| T8 payback 16-21h | T9 payback 18-28h
// T10 payback 7-20h (most expensive, most efficient in end-game)
// 15 × best T10 machine = $630B/s → reach $999T in ~26 min (final sprint)
// T10 unlock cost = $990T — requires almost the full wealth cap!
// Thiết kế kinh tế — Hard Mode, cap $999T, không đơn vị > T:
// T1 payback 2-6h  | T2 payback 3-9h   | T3 payback 6-18h
// T4 payback 7-21h | T5 payback 9-31h  | T6 payback 12-42h
// T7 payback 15-40h| T8 payback 16-21h | T9 payback 18-28h
// T10 payback 7-20h (đắt nhất, hiệu quả nhất cuối game)
// 15 × best T10 = 630B/s → $999T sau ~26 phút (sprint cuối)
// Unlock T10 = $990T — gần như toàn bộ số tiền tối đa!
const TIERS = [
  { id:1, name:'Tier 1 – Xưởng', label:'T1', accent:'#4ade80', theme:'#1e3a2a', unlockCost:0.5, unlockReq:'$0.50',
    machines:[
      {id:'t1_begin',  name:'Begin Machine',  icon:'⚙️',  price:1,       rate:0.00014},  // payback 2.0h
      {id:'t1_basic',  name:'Basic Machine',  icon:'🔩',  price:8,       rate:0.00088},  // payback 2.5h
      {id:'t1_silver', name:'Silver Machine', icon:'🥈',  price:30,      rate:0.0026},   // payback 3.2h
      {id:'t1_gold',   name:'Gold Machine',   icon:'🥇',  price:120,     rate:0.0088},   // payback 3.8h
      {id:'t1_diamond',name:'Diamond Press',  icon:'💎',  price:500,     rate:0.030},    // payback 4.6h
      {id:'t1_dark',   name:'Dark Forge',     icon:'🌌',  price:2200,    rate:0.11,  special:true}, // payback 5.6h
    ]},
  { id:2, name:'Tier 2 – Nhà Máy', label:'T2', accent:'#60a5fa', theme:'#1e2f4a', unlockCost:5000, unlockReq:'T1 + $5K',
    machines:[
      {id:'t2_dynamo',  name:'Dynamo',        icon:'⚡',  price:5000,    rate:0.42},     // payback 3.3h
      {id:'t2_turbine', name:'Turbine',       icon:'🌀',  price:20000,   rate:1.4},      // payback 4.0h
      {id:'t2_reactor', name:'Mini Reactor',  icon:'☢️',  price:80000,   rate:4.6},      // payback 4.8h
      {id:'t2_plasma',  name:'Plasma Cell',   icon:'🔵',  price:320000,  rate:16},       // payback 5.6h
      {id:'t2_fusion',  name:'Fusion Core',   icon:'💠',  price:1300000, rate:54},       // payback 6.7h
      {id:'t2_tesla',   name:'Tesla Array',   icon:'🌩',  price:5e6,     rate:160,  special:true}, // payback 8.7h
    ]},
  { id:3, name:'Tier 3 – Lượng Tử', label:'T3', accent:'#a78bfa', theme:'#2a1e3a', unlockCost:8e6, unlockReq:'T2 + $8M',
    machines:[
      {id:'t3_qubit',      name:'Qubit Engine',    icon:'🔮', price:8e6,    rate:400},      // payback 5.6h
      {id:'t3_worm',       name:'Wormhole Tap',    icon:'🌐', price:32e6,   rate:1300},     // payback 6.8h
      {id:'t3_quantum',    name:'Quantum Forge',   icon:'⚗️', price:130e6,  rate:4200},     // payback 8.6h
      {id:'t3_void',       name:'Void Extractor',  icon:'🕳', price:520e6,  rate:13500},    // payback 10.7h
      {id:'t3_time',       name:'Time Crystal',    icon:'💜', price:2e9,    rate:42000},    // payback 13.2h
      {id:'t3_singularity',name:'Singularity',     icon:'🌌', price:8e9,    rate:125000, special:true}, // payback 17.8h
    ]},
  { id:4, name:'Tier 4 – Vũ Trụ', label:'T4', accent:'#fb923c', theme:'#3a2a1e', unlockCost:600e6, unlockReq:'T3 + $600M',
    machines:[
      {id:'t4_solar',    name:'Solar Array',     icon:'☀️', price:600e6,   rate:24000},    // payback 6.9h
      {id:'t4_nova',     name:'Nova Collector',  icon:'🌟', price:2.5e9,   rate:80000},    // payback 8.7h
      {id:'t4_stellar',  name:'Stellar Forge',   icon:'⭐', price:10e9,    rate:260000},   // payback 10.7h
      {id:'t4_pulsar',   name:'Pulsar Tap',      icon:'💫', price:40e9,    rate:840000},   // payback 13.2h
      {id:'t4_quasar',   name:'Quasar Engine',   icon:'🌠', price:160e9,   rate:2.7e6},    // payback 16.5h
      {id:'t4_supernova',name:'Supernova',        icon:'🔆', price:640e9,   rate:8.5e6, special:true}, // payback 20.9h
    ]},
  { id:5, name:'Tier 5 – Sinh Học', label:'T5', accent:'#2dd4bf', theme:'#1e3a3a', unlockCost:30e9, unlockReq:'T4 + $30B',
    machines:[
      {id:'t5_dna',    name:'DNA Sequencer',  icon:'🧬', price:30e9,    rate:940000},    // payback 8.9h
      {id:'t5_neuro',  name:'Neuro Synth',    icon:'🧠', price:120e9,   rate:3e6},       // payback 11.1h
      {id:'t5_nano',   name:'Nano Factory',   icon:'🔬', price:500e9,   rate:9.8e6},     // payback 14.2h
      {id:'t5_bio',    name:'Bio Reactor',    icon:'🦠', price:2e12,    rate:31e6},      // payback 17.9h
      {id:'t5_genesis',name:'Genesis Core',   icon:'🌱', price:8e12,    rate:97e6},      // payback 22.9h
      {id:'t5_omega',  name:'Omega Cell',     icon:'🧪', price:32e12,   rate:290e6, special:true}, // payback 30.7h
    ]},
  { id:6, name:'Tier 6 – Trí Tuệ', label:'T6', accent:'#f87171', theme:'#3a1e1e', unlockCost:600e9, unlockReq:'T5 + $600B',
    machines:[
      {id:'t6_neural',name:'Neural Net',         icon:'🤖', price:600e9,   rate:14e6},     // payback 11.9h
      {id:'t6_agi',   name:'AGI Core',           icon:'🧩', price:2.5e12,  rate:44e6},     // payback 15.8h
      {id:'t6_mind',  name:'Mind Upload',        icon:'👁', price:10e12,   rate:140e6},    // payback 19.8h
      {id:'t6_hive',  name:'Hive Intelligence',  icon:'🐝', price:40e12,   rate:440e6},    // payback 25.3h
      {id:'t6_god',   name:'GodAI Node',         icon:'🌐', price:160e12,  rate:1.4e9},    // payback 31.7h
      {id:'t6_omni',  name:'Omni Intelligence',  icon:'⚜️', price:650e12,  rate:4.3e9, special:true}, // payback 42h
    ]},
  { id:7, name:'Tier 7 – Thiên Hà', label:'T7', accent:'#818cf8', theme:'#1e1e3a', unlockCost:30e12, unlockReq:'T6 + $30T',
    machines:[
      {id:'t7_moon',    name:'Moon Mine',          icon:'🌙', price:30e12,   rate:550e6},    // payback 15.2h
      {id:'t7_mars',    name:'Mars Factory',       icon:'🪐', price:120e12,  rate:1.7e9},    // payback 19.6h
      {id:'t7_asteroid',name:'Asteroid Miner',     icon:'☄️', price:500e12,  rate:5.5e9},    // payback 25.3h
      {id:'t7_saturn',  name:'Saturn Rig',         icon:'🪄', price:200e12,  rate:1.75e9},   // payback 31.7h (alt path)
      {id:'t7_nebula',  name:'Nebula Harvester',   icon:'🌌', price:750e12,  rate:6e9},      // payback 34.7h
      {id:'t7_galaxy',  name:'Galaxy Engine',      icon:'🌠', price:999e12,  rate:7e9, special:true}, // payback 39.6h — giá MAX
    ]},
  { id:8, name:'Tier 8 – Đa Chiều', label:'T8', accent:'#86efac', theme:'#2a3a1e', unlockCost:700e12, unlockReq:'T7 + $700T',
    machines:[
      {id:'t8_darkenergy',name:'Dark Energy Tap',  icon:'🌑', price:700e12,  rate:9.5e9},    // payback 20.5h
      {id:'t8_blackhole', name:'Black Hole Core',  icon:'🕳', price:750e12,  rate:10.5e9},   // payback 19.8h
      {id:'t8_multiverse',name:'Multiverse Link',  icon:'🌀', price:800e12,  rate:11.5e9},   // payback 19.3h
      {id:'t8_dimension', name:'Dimension Rift',   icon:'🔀', price:850e12,  rate:13e9},     // payback 18.2h
      {id:'t8_bigbang',   name:'Big Bang Engine',  icon:'💥', price:920e12,  rate:15e9},     // payback 17.0h
      {id:'t8_infinite',  name:'Infinite Matter',  icon:'♾️', price:990e12,  rate:17e9, special:true}, // payback 16.2h
    ]},
  { id:9, name:'Tier 9 – Thần Thánh', label:'T9', accent:'#fde047', theme:'#3a3a1e', unlockCost:950e12, unlockReq:'T8 + $950T',
    machines:[
      {id:'t9_angel',   name:'Angel Forge',     icon:'👼', price:800e12,  rate:8e9},      // payback 27.8h
      {id:'t9_god',     name:'God Fragment',    icon:'✝️', price:850e12,  rate:9.2e9},    // payback 25.7h
      {id:'t9_cosmos',  name:'Cosmos Engine',   icon:'🌟', price:880e12,  rate:10.5e9},   // payback 23.3h
      {id:'t9_akashic', name:'Akashic Record',  icon:'📜', price:920e12,  rate:12e9},     // payback 21.3h
      {id:'t9_creator', name:'Creator Node',    icon:'🎇', price:960e12,  rate:13.5e9},   // payback 19.8h
      {id:'t9_alpha',   name:'Alpha & Omega',   icon:'🔯', price:990e12,  rate:15.5e9, special:true}, // payback 17.7h
    ]},
  { id:10, name:'Tier 10 – Tuyệt Đỉnh', label:'T10', accent:'#e879f9', theme:'#2a1e2a', unlockCost:990e12, unlockReq:'T9 + $990T',
    machines:[
      {id:'t10_fate',   name:'Fate Weaver',     icon:'🧵', price:700e12,  rate:10e9},     // payback 19.4h
      {id:'t10_time',   name:'Time Lord Core',  icon:'⏳', price:780e12,  rate:14e9},     // payback 15.5h
      {id:'t10_reality',name:'Reality Bender',  icon:'🎭', price:860e12,  rate:19e9},     // payback 12.6h
      {id:'t10_dream',  name:'Dream Nexus',     icon:'💭', price:920e12,  rate:25e9},     // payback 10.2h
      {id:'t10_true',   name:'True God Engine', icon:'👑', price:960e12,  rate:32e9},     // payback 8.3h
      {id:'t10_factory',name:'FACTORY PRIME',   icon:'🏭', price:990e12,  rate:42e9, special:true}, // payback 6.5h — 15×42B=630B/s
    ]},
];
const ALL_M = {};
TIERS.forEach(t => t.machines.forEach(m => { ALL_M[m.id] = {...m, tierId:t.id}; }));
ALL_M['begin0'] = { id:'begin0', name:'Begin Machine', icon:'⚙️', price:0, rate:0.009, tierId:0 }; // $0.009/s

// Slot prices: 1-5 free, 6=$20K, mỗi slot tiếp ×5 (kìm hãm lạm phát)
// Slot6=$20K, Slot7=$100K, Slot8=$500K, Slot9=$2.5M, ...Slot15~$195B
function slotPrice(n) {
  if (n <= 5) return 0;
  let p = 20000;
  for (let i = 6; i < n; i++) p *= 5;
  return p;
}

const SAVE_KEY = 'factory_v4';
let pendingSellSlot = null;
let activeTier = parseInt(localStorage.getItem('ui_activeTier')||'1');

/* ┌─────────────────────────────────────────────────────────────────────────┐
   │  MODULE 02 · SAVE / LOAD  —  defaultState · saveGame · loadGame        │
   └─────────────────────────────────────────────────────────────────────────┘ */
const defaultState = () => ({
  money: 0, totalEarned: 0,
  tutorialDone: false,
  adsDismissed: {},
  slots: [{ machine:'begin0', earned:0 }, null, null, null, null],
  ownedSlots: 5,
  unlockedTiers: [],
  wallet: { xu:0, gold:0, diamond:0, dark:0, ruby:0, rainbow:0 },
  inventory: [],
  invMaxSlots: 50,
  recyclePoints: 0,
  marketStocks: { normal:[], mid:[], black:[] },
  myListings: [],
  lastStockTime: 0,
  // ═══ GIÁ TRỊ ĐỒNG TIỀN ═══
  // valueMultiplier tăng 1%/phút (compound)
  // Sau 1 phút: x1.01, sau 10 phút: x1.105, sau 1 giờ: x1.817, sau 1 ngày: x1138x
  valueMultiplier: 1.0,
  playedSeconds: 0,
  // ═══ INTERNET ═══
  inetPackage: null,    // 'basic' | 'balance' | 'speed' | 'free'
  inetExpiry: 0,        // timestamp ms
  inetBargainBonus: 0,  // free bargain(s) from speed package
  freeInetUsedDate: '', // 'YYYY-MM-DD' of last free plan use
  osVersion: 2,         // 2 | 3 | 4 | 5
  // 255025502550 BOSS HISTORY 255025502550
  // bossHistory[host] = { badCount, mediumCount, goodDone, banned }
  bossHistory: {},
  // ═══ LOTTERY ═══
  lotteryHistory: [],
  lotteryBet: 10,
  lotteryMode: 'jackpot',
  // ═══ MATERIALS SHOP ═══
  matBonuses: {
    speedBoost: 1.0,       // multiplier on machine rate (on top of valueMultiplier)
    slotBoost: 0,          // extra slot capacity bonus
    autoCollect: false,    // auto-collect from market
    inetFreeSlots: 0,      // free internet reconnects
    lotteryLuckBonus: 0,   // flat bonus to lottery multipliers
    recycleBoost: 1.0,     // multiplier on recycle points earned
    powerEfficiency: 1.0,  // power drain rate multiplier (lower = slower drain)
  },
  matPurchased: {},        // id → count purchased
  powerSeconds: 0,          // remaining power in seconds (0 = no power)
  powerOutageTriggered: false, // has the 20min outage happened
  reservePowerUsed: false,  // reserve power already used this outage
  totalPowerBought: 0,      // total seconds of fuel ever bought
  manualPowerOff: false,    // player manually turned off power
  // ═══ LOAN ═══
  loan: {
    active: false,          // has an active loan
    principal: 0,           // amount borrowed
    interest: 0,            // accumulated interest
    borrowedAt: 0,          // timestamp ms when loan was taken
    lockedFeatures: false,  // features locked after 30 min
    bankruptTriggered: false,// bankruptcy triggered after 60 min
    loanCount: 0,           // total number of loans taken (for escalating interest)
  },
  // ═══ TAX ═══
  tax: {
    bills: [],       // [{id, amount, issuedAt, item, paidAt, penaltyMult}]
    banUntil: 0,     // timestamp ms — banned from buying until this time
    banCount: 0,     // how many bans accumulated (for escalating ban duration)
    totalPaid: 0,    // total tax paid ever
  },
});

let G = loadGame();

// Also try to load from artifact persistent storage (async, overwrites if found)
if (window.storage) {
  window.storage.get(SAVE_KEY).then(result => {
    if (result && result.value) {
      const loaded = parseLoadedData(result.value);
      if (loaded && loaded.totalEarned !== undefined) {
        G = loaded;
        renderAll();
        setTimeout(() => showNotif('✅ Đã tải tiến trình (cloud)!'), 400);
        // Restore power state
        setTimeout(() => {
          if (G.manualPowerOff) { applyPowerOutageLock(true); showManualPowerOff(); switchTab('electricity'); }
          else if (G.powerOutageTriggered && G.powerSeconds <= 0) { applyPowerOutageLock(true); showOutageScreen(); switchTab('electricity'); }
        }, 500);
      }
    }
  }).catch(()=>{});
}

function saveGame(manual) {
  const data = JSON.stringify(G);
  // Try artifact persistent storage first
  if (window.storage) {
    window.storage.set(SAVE_KEY, data).catch(()=>{});
  }
  // Also keep localStorage as fallback
  try { localStorage.setItem(SAVE_KEY, data); } catch(e){}
  if (manual) showNotif('💾 Đã lưu!');
}

async function loadGameAsync() {
  // Try artifact storage first
  if (window.storage) {
    try {
      const result = await window.storage.get(SAVE_KEY);
      if (result && result.value) {
        return parseLoadedData(result.value);
      }
    } catch(e){}
  }
  // Fallback to localStorage
  try {
    const s = localStorage.getItem(SAVE_KEY);
    if (s) return parseLoadedData(s);
  } catch(e){ console.warn('Load error:', e); }
  return null;
}

function loadGame() {
  // Sync load from localStorage only (async load handled after init)
  try {
    const s = localStorage.getItem(SAVE_KEY);
    if (s) return parseLoadedData(s);
  } catch(e){ console.warn('Load error:', e); }
  return defaultState();
}

function parseLoadedData(s) {
  try {
      const p = JSON.parse(s);
      const d = defaultState();
      if (!p.wallet) p.wallet = d.wallet;
      if (p.ownedSlots === undefined) p.ownedSlots = 5;
      if (!p.inventory) p.inventory = [];
      if (!p.invMaxSlots) p.invMaxSlots = 50;
      if (!p.recyclePoints) p.recyclePoints = 0;
      if (!p.marketStocks) p.marketStocks = {normal:[],mid:[],black:[]};
      if (!p.marketStocks.normal) p.marketStocks.normal = [];
      if (!p.marketStocks.mid) p.marketStocks.mid = [];
      if (!p.marketStocks.black) p.marketStocks.black = [];
      if (!p.myListings) p.myListings = [];
      if (!p.lastStockTime) p.lastStockTime = 0;
      if (!p.boughtBundles) p.boughtBundles = [];
      if (!p.valueMultiplier || p.valueMultiplier < 1) p.valueMultiplier = 1.0;
      if (!p.playedSeconds) p.playedSeconds = 0;
      if (p.inetExpiry === undefined) p.inetExpiry = 0;
      if (!p.inetPackage) p.inetPackage = null;
      if (p.inetBargainBonus === undefined) p.inetBargainBonus = 0;
      if (!p.freeInetUsedDate) p.freeInetUsedDate = '';
      if (!p.bossHistory) p.bossHistory = {};
      if (p.osUpdated === undefined) p.osUpdated = false;
      if (p.mobileNetActive === undefined) p.mobileNetActive = false;
      if (p.inetDiscount === undefined) p.inetDiscount = false;
      if (p.osVersion === undefined) p.osVersion = p.osUpdated ? 3 : 2;
      if (p.osV4Updated === undefined) p.osV4Updated = false;
      if (p.osV5Updated === undefined) p.osV5Updated = false;
      if (!p.unlockedTiers) p.unlockedTiers = [];
      if (!p.slots || !Array.isArray(p.slots)) p.slots = d.slots;
      if (p.totalEarned === undefined) p.totalEarned = 0;
      if (!p.lotteryHistory) p.lotteryHistory = [];
      if (!p.lotteryBet) p.lotteryBet = 10;
      if (!p.lotteryMode) p.lotteryMode = 'jackpot';
      if (p.powerSeconds === undefined) p.powerSeconds = 0;
      if (p.powerOutageTriggered === undefined) p.powerOutageTriggered = false;
      if (p.reservePowerUsed === undefined) p.reservePowerUsed = false;
      if (p.totalPowerBought === undefined) p.totalPowerBought = 0;
      if (p.manualPowerOff === undefined) p.manualPowerOff = false;
      if (!p.matBonuses) p.matBonuses = defaultState().matBonuses;
      if (!p.matPurchased) p.matPurchased = {};
      if (!p.loan) p.loan = defaultState().loan;
      if (p.loan.lockedFeatures === undefined) p.loan.lockedFeatures = false;
      if (p.loan.bankruptTriggered === undefined) p.loan.bankruptTriggered = false;
      if (p.loan.loanCount === undefined) p.loan.loanCount = 0;
      if (!p.tax) p.tax = defaultState().tax;
      if (!p.tax.bills) p.tax.bills = [];
      if (p.tax.banUntil === undefined) p.tax.banUntil = 0;
      if (p.tax.banCount === undefined) p.tax.banCount = 0;
      if (p.tax.totalPaid === undefined) p.tax.totalPaid = 0;
      if (p.tutorialDone === undefined) p.tutorialDone = false;
      if (!p.adsDismissed) p.adsDismissed = {};
      return p;
  } catch(e){ console.warn('Parse error:', e); }
  return defaultState();
}
function resetGame() {
  if (!confirm('Xóa toàn bộ?')) return;
  localStorage.removeItem(SAVE_KEY);
  if (window.storage) window.storage.delete(SAVE_KEY).catch(()=>{});
  G = defaultState();
  renderAll();
  showNotif('🗑 Đã reset!');
}

/* ┌─────────────────────────────────────────────────────────────────────────┐
   │  MODULE 03 · CORE UI  —  fmt · getRate · updateUI · switchTab · notif  │
   └─────────────────────────────────────────────────────────────────────────┘ */
function getRate() {
  let r = 0;
  G.slots.forEach(s => { if (s && ALL_M[s.machine]) r += ALL_M[s.machine].rate; });
  return r;
}
function getMachineCount() { return G.slots.filter(s => s && s.machine).length; }

function fmt(n) {
  if (n === 0) return '$0';
  const a = Math.abs(n);
  if (a < 1000) return '$' + n.toFixed(a < 10 ? 3 : 2);
  if (a < 1e6) return '$' + (n/1e3).toFixed(2) + 'K';
  if (a < 1e9) return '$' + (n/1e6).toFixed(2) + 'M';
  if (a < 1e12) return '$' + (n/1e9).toFixed(2) + 'B';
  return '$' + Math.min(n/1e12, 999).toFixed(2) + 'T'; // Max hiển thị $999T
}
function fmtShort(n) { return fmt(n).replace('$',''); }

/* ┌─────────────────────────────────────────────────────────────────────────┐
   │  MODULE 04 · BASE / SHOP  —  renderSlots · shop · buyMachine · sell    │
   └─────────────────────────────────────────────────────────────────────────┘ */
// ═══ WALLET VALUE (total $ equiv) ════════════════════════════════
function walletDollarValue() {
  let v = 0;
  Object.entries(CUR_RATES).forEach(([k,r]) => { v += (G.wallet[k]||0)*r; });
  return v;
}
function totalBalance() { return G.money + walletDollarValue(); }

// ═══ BASE ════════════════════════════════════════════════════════
function renderSlots() {
  const grid = document.getElementById('slots-grid');
  const cols = G.ownedSlots <= 5 ? 5 : G.ownedSlots <= 10 ? 5 : 5;
  grid.style.gridTemplateColumns = `repeat(${Math.min(G.ownedSlots,5)},1fr)`;
  grid.innerHTML = '';
  for (let i = 0; i < G.ownedSlots; i++) {
    const slot = G.slots[i];
    const div = document.createElement('div');
    if (!slot || !slot.machine) {
      div.className = 'slot empty';
      div.innerHTML = `<span style="font-size:9px;color:#1f2937">Empty</span>`;
    } else {
      const m = ALL_M[slot.machine];
      const tier = TIERS.find(t => t.id === m.tierId) || {accent:'#4ade80',theme:'#1e3a2a'};
      div.className = 'slot has-machine';
      div.style.borderColor = tier.accent + '66';
      if (m.special) div.style.animation = 'darkPulse 2.5s infinite';
      div.innerHTML = `
        <div style="font-size:24px">${m.icon}</div>
        <div class="slot-name">${m.name}</div>
        <div class="slot-rate" style="color:${tier.accent};font-size:12px">+${fmt(m.rate)}/s</div>
        <div class="slot-earn">${fmt(slot.earned||0)}</div>
        <div class="progress-bar"><div class="progress-fill" id="pg${i}" style="width:0%;background:${tier.accent}"></div></div>
        ${m.price>0?`<button class="sell-btn" onclick="askSell(${i})">Bán ${fmt(m.price/3)}</button>`:''}
      `;
    }
    grid.appendChild(div);
  }
  // update grid cols based on owned slots
  const perRow = G.ownedSlots <= 5 ? G.ownedSlots : 5;
  grid.style.gridTemplateColumns = `repeat(${perRow},1fr)`;
}

// ═══ SHOP ════════════════════════════════════════════════════════
function renderShopTabs() {
  const wrap = document.getElementById('tier-tabs');
  wrap.innerHTML = '';
  TIERS.forEach(t => {
    const unlocked = G.unlockedTiers.includes(t.id);
    const div = document.createElement('div');
    div.className = 'tier-tab' + (activeTier===t.id?' active':'') + (!unlocked?' locked-tier':'');
    if (activeTier===t.id) { div.style.background=t.theme; div.style.color=t.accent; div.style.borderColor=t.accent+'66'; }
    div.textContent = (unlocked?'':'')+t.label;
    div.onclick = () => { activeTier=t.id; localStorage.setItem('ui_activeTier',t.id); renderShopTabs(); renderShopContent(); };
    wrap.appendChild(div);
  });
}

function renderShopContent() {
  const container = document.getElementById('shop-content');
  const tier = TIERS.find(t => t.id === activeTier);
  const isUnlocked = G.unlockedTiers.includes(tier.id);
  const prevOk = tier.id===1 ? true : G.unlockedTiers.includes(tier.id-1);
  const canAffordUnlock = G.money >= tier.unlockCost;

  if (!isUnlocked) {
    container.innerHTML = `
      <div style="background:#111827;border:1px solid #1f2937;border-radius:11px;padding:24px;text-align:center">
        <div style="font-size:36px;margin-bottom:10px">🔒</div>
        <div style="font-size:17px;color:${tier.accent};font-weight:500;margin-bottom:6px">${tier.name}</div>
        <div style="font-size:14px;color:#6b7280;margin-bottom:5px">Yêu cầu: ${tier.unlockReq}</div>
        <div style="font-size:14px;color:#374151;margin-bottom:16px">Cần: ${fmt(tier.unlockCost)} — Có: ${fmt(G.money)}</div>
        <button onclick="unlockTier(${tier.id})" ${(!canAffordUnlock||!prevOk)?'disabled':''}
          style="padding:10px 26px;background:${tier.theme};color:${tier.accent};border:1px solid ${tier.accent}55;border-radius:7px;cursor:pointer;font-size:15px;${(!canAffordUnlock||!prevOk)?'opacity:0.35;cursor:not-allowed':''}">
          ${!prevOk?'Cần mở tier trước':canAffordUnlock?'Mở '+tier.name:'Cần '+fmt(tier.unlockCost-G.money)+' nữa'}
        </button>
      </div>`;
    return;
  }
  const hasSlot = G.slots.some((_,i) => i < G.ownedSlots && (!G.slots[i]||!G.slots[i].machine));
  container.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
      <span style="font-size:17px;color:${tier.accent};font-weight:500">${tier.name}</span>
      <span style="font-size:14px;color:#6b7280">Có: ${fmt(G.money)}</span>
    </div>
    <div class="items-grid" id="ig${tier.id}"></div>`;
  const grid = document.getElementById('ig'+tier.id);
  tier.machines.forEach(m => {
    const canBuy = G.money >= m.price && hasSlot;
    const div = document.createElement('div');
    div.className = 'shop-item'+(canBuy?'':' locked-item');
    div.style.borderColor = m.special ? tier.accent+'88' : '#1f2937';
    if (m.special) div.style.background = tier.theme;
    div.innerHTML = `
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
        <span style="font-size:22px">${m.icon}</span>
        <div>
          <div style="font-size:14px;font-weight:500;color:#e2e8f0">${m.name}</div>
          ${m.special?`<span style="font-size:11px;background:${tier.theme};color:${tier.accent};padding:2px 8px;border-radius:7px;border:1px solid ${tier.accent}44">✨ Premium</span>`:''}
        </div>
      </div>
      <div style="display:flex;justify-content:space-between">
        <span style="font-size:14px;color:#fbbf24">${fmt(m.price)}</span>
        <span style="font-size:13px;color:${tier.accent}">+${fmt(m.rate)}/s</span>
      </div>
      <div style="font-size:12px;color:#4b5563;margin-top:4px">Bán: ${fmt(m.price/3)}</div>
      <button class="buy-btn" ${!canBuy?'disabled':''} onclick="buyMachine('${m.id}')"
        style="background:${tier.theme};color:${tier.accent};border-color:${tier.accent}44">
        ${!hasSlot?'Hết slot':G.money<m.price?'Cần '+fmt(m.price-G.money):'Mua'}
      </button>`;
    grid.appendChild(div);
  });
}

function unlockTier(id) {
  const tier = TIERS.find(t=>t.id===id);
  if (!taxCheckBanBeforeBuy()) return;
  if (G.money < tier.unlockCost) { showError('💸 Không đủ tiền! Cần '+fmt(tier.unlockCost)); return; }
  if (id>1 && !G.unlockedTiers.includes(id-1)) return;
  G.money -= tier.unlockCost;
  G.unlockedTiers.push(id);
  taxIssueBill('🔓 Mở ' + tier.name, tier.unlockCost);
  showNotif('🎉 '+tier.name+' đã mở!');
  renderShopTabs(); renderShopContent(); updateUI(); saveGame(false);
}
function buyMachine(id) {
  const m = ALL_M[id];
  const slotIdx = G.slots.findIndex((s,i) => i < G.ownedSlots && (!s||!s.machine));
  if (slotIdx===-1) { showError('⚠️ Không còn slot trống!'); return; }
  if (!taxCheckBanBeforeBuy()) return;
  if (G.money < m.price) { showError('💸 Không đủ tiền! Cần '+fmt(m.price)); return; }
  G.money -= m.price;
  G.slots[slotIdx] = { machine:id, earned:0 };
  taxIssueBill(m.icon + ' ' + m.name, m.price);
  showNotif(m.icon+' '+m.name+' → Slot '+(slotIdx+1));
  renderSlots(); renderShopContent(); updateUI(); saveGame(false);
}

/* ┌─────────────────────────────────────────────────────────────────────────┐
   │  MODULE 05 · BANK  —  renderBank · exchange · slot expansion           │
   └─────────────────────────────────────────────────────────────────────────┘ */
// ═══ BANK ════════════════════════════════════════════════════════
function renderBank() {
  // Wallet
  const wg = document.getElementById('wallet-grid');
  wg.innerHTML = '';
  CURRENCIES.forEach(c => {
    const amt = c.id==='dollar' ? G.money : (G.wallet[c.id]||0);
    const div = document.createElement('div');
    div.className = 'currency-card';
    div.innerHTML = `
      <div class="currency-icon">${c.icon}</div>
      <div class="currency-name">${c.name}</div>
      <div class="currency-amount" style="color:${c.color}">${c.id==='dollar'?fmt(G.money):amt.toLocaleString()}</div>
      <div class="currency-eq">${c.eq}</div>`;
    wg.appendChild(div);
  });

  // Exchange $ → items
  const el = document.getElementById('exchange-list');
  el.innerHTML = '';
  Object.entries(CUR_RATES).forEach(([id, rate]) => {
    const cur = CURRENCIES.find(c=>c.id===id);
    const canEx = G.money >= rate;
    const row = document.createElement('div');
    row.className = 'exchange-row';
    row.innerHTML = `
      <div class="ex-icon">${cur.icon}</div>
      <div class="ex-info">
        <div class="ex-name">${cur.name}</div>
        <div class="ex-rate">${fmt(rate)} → 1 ${cur.name}</div>
      </div>
      <button class="ex-btn" ${!canEx?'disabled':''} onclick="exchangeTo('${id}')">Đổi 1</button>
      <button class="ex-btn" style="margin-left:4px" ${G.money<rate*10?'disabled':''} onclick="exchangeToN('${id}',10)">×10</button>`;
    el.appendChild(row);
  });

  // Exchange items → $
  const ebl = document.getElementById('exchange-back-list');
  ebl.innerHTML = '';
  Object.entries(CUR_RATES).forEach(([id, rate]) => {
    const cur = CURRENCIES.find(c=>c.id===id);
    const amt = G.wallet[id]||0;
    const row = document.createElement('div');
    row.className = 'exchange-row';
    row.innerHTML = `
      <div class="ex-icon">${cur.icon}</div>
      <div class="ex-info">
        <div class="ex-name">${cur.name} (có: ${amt.toLocaleString()})</div>
        <div class="ex-rate">1 ${cur.name} → ${fmt(rate*0.9)} (×0.9)</div>
      </div>
      <button class="ex-btn" style="background:#3b1a1a;color:#f87171;border-color:#5a2a2a" ${!amt?'disabled':''} onclick="exchangeFrom('${id}')">Bán 1</button>
      <button class="ex-btn" style="margin-left:4px;background:#3b1a1a;color:#f87171;border-color:#5a2a2a" ${amt<10?'disabled':''} onclick="exchangeFromN('${id}',10)">Bán 10</button>`;
    ebl.appendChild(row);
  });

  renderLoanPanel();
}

function exchangeTo(id) {
  const rate = CUR_RATES[id];
  if (G.money < rate) { showError('💸 Không đủ tiền! Cần '+fmt(rate)); return; }
  G.money -= rate;
  G.wallet[id] = (G.wallet[id]||0)+1;
  showNotif('✅ Đổi 1 '+CURRENCIES.find(c=>c.id===id).name);
  updateUI(); renderBank(); saveGame(false);
}
function exchangeToN(id, n) {
  const rate = CUR_RATES[id];
  if (G.money < rate*n) { showError('💸 Không đủ tiền! Cần '+fmt(rate*n)); return; }
  G.money -= rate*n;
  G.wallet[id] = (G.wallet[id]||0)+n;
  showNotif('✅ Đổi '+n+' '+CURRENCIES.find(c=>c.id===id).name);
  updateUI(); renderBank(); saveGame(false);
}
function exchangeFrom(id) {
  if (!(G.wallet[id]>0)) return;
  G.wallet[id]--;
  G.money += CUR_RATES[id]*0.9;
  showNotif('💵 Bán 1 '+CURRENCIES.find(c=>c.id===id).name);
  updateUI(); renderBank(); saveGame(false);
}
function exchangeFromN(id, n) {
  if ((G.wallet[id]||0)<n) return;
  G.wallet[id]-=n;
  G.money += CUR_RATES[id]*0.9*n;
  showNotif('💵 Bán '+n+' '+CURRENCIES.find(c=>c.id===id).name);
  updateUI(); renderBank(); saveGame(false);
}

// ═══ LOAN SYSTEM ═════════════════════════════════════════════════
function loanMaxAmount() {
  // Tier 4 unlocked → $2000, otherwise $300
  if (G.unlockedTiers && G.unlockedTiers.includes(4)) return 2000;
  return 300;
}

// Returns the per-second interest rate multiplier for the current loan count
// Lần 1: 0.005/2s = 0.0025/s, Lần 2+: ×1.2 dồn mỗi lần
function loanInterestRatePerSec() {
  const baseRate = 0.005 / 2; // 0.0025/giây (lần 1)
  const count = (G.loan && G.loan.loanCount) ? G.loan.loanCount : 1;
  const multiplier = count <= 1 ? 1 : Math.pow(1.2, count - 1);
  return baseRate * multiplier;
}

// Returns the rate label string for display
function loanRateLabel() {
  const count = (G.loan && G.loan.loanCount) ? G.loan.loanCount : 0;
  const nextCount = count + 1; // count after borrowing (for pre-borrow UI)
  const baseRate = 0.005;
  if (nextCount <= 1) return '0.005/2s (×1)';
  const mult = Math.pow(1.2, nextCount - 1);
  return `0.005/2s × ${mult.toFixed(3)} <span style="color:#f87171;font-weight:700">(LẦN VAY ${nextCount}!)</span>`;
}

// Returns rate label for active loan display
function activeLoanRateLabel() {
  const count = G.loan && G.loan.loanCount ? G.loan.loanCount : 1;
  const baseRate = 0.005;
  const mult = Math.pow(1.2, count - 1);
  const rateStr = (baseRate * mult).toFixed(5) + '/2s';
  if (count <= 1) return `<span style="color:#4ade80">${rateStr}</span>`;
  const danger = count >= 5 ? '#f87171' : count >= 3 ? '#fbbf24' : '#a3e635';
  return `<span style="color:${danger};font-weight:700">${rateStr} (×${mult.toFixed(3)} 📈)</span>`;
}

function loanTotalOwed() {
  if (!G.loan || !G.loan.active) return 0;
  return G.loan.principal + G.loan.interest;
}

function renderLoanPanel() {
  const el = document.getElementById('loan-panel-content');
  if (!el) return;
  const loan = G.loan;
  const maxAmt = loanMaxAmount();
  const hasTier4 = G.unlockedTiers && G.unlockedTiers.includes(4);

  if (!loan.active) {
    // No active loan — show borrow form
    const loanCount = loan.loanCount || 0;
    const nextLoanNum = loanCount + 1;
    const isEscalated = nextLoanNum >= 2;
    const mult = nextLoanNum <= 1 ? 1 : Math.pow(1.2, nextLoanNum - 1);
    const rateDisplay = isEscalated
      ? `<span style="color:#f87171;font-weight:700;font-size:13px">⚠️ ${(0.005 * mult).toFixed(5)}/2s (×${mult.toFixed(3)} — LẦN VAY ${nextLoanNum}!)</span>`
      : `<span style="color:#fbbf24">0.005/2s</span>`;
    const warningBanner = isEscalated ? `
      <div style="background:linear-gradient(135deg,#2a0a0a,#1a0000);border:2px solid #f87171;border-radius:8px;padding:10px 12px;margin-bottom:10px;text-align:center;animation:bankruptPulse 1.2s infinite">
        <div style="font-size:18px;margin-bottom:3px">🚨</div>
        <div style="font-size:13px;font-weight:700;color:#f87171;letter-spacing:0.5px">LẦN VAY THỨ ${nextLoanNum} — LÃI SUẤT ×${mult.toFixed(3)}!</div>
        <div style="font-size:11px;color:#fca5a5;margin-top:3px">Lãi tích lũy mỗi lần vay × 1.2. Hãy cân nhắc kỹ!</div>
      </div>` : '';
    el.innerHTML = `
      ${warningBanner}
      <div class="loan-status-card">
        <div style="font-size:13px;color:#6b7280;margin-bottom:4px">Hạn mức vay: <span style="color:${hasTier4?'#fb923c':'#60a5fa'};font-weight:600">${fmt(maxAmt)}</span>
          ${hasTier4?'<span style="font-size:10px;background:#3a2a1e;color:#fb923c;border:1px solid #fb923c44;padding:1px 6px;border-radius:4px;margin-left:6px">Tier 4 VIP</span>':''}
        </div>
        ${loanCount > 0 ? `<div style="font-size:11px;color:#6b7280;margin-bottom:4px">📋 Số lần đã vay: <span style="color:${loanCount>=3?'#f87171':loanCount>=2?'#fbbf24':'#9ca3af'};font-weight:600">${loanCount} lần</span></div>` : ''}
        <div style="font-size:12px;color:#4b5563;margin-bottom:10px">📌 Lãi suất lần này: ${rateDisplay} · Không trả sau <span style="color:#f87171">30 phút</span> sẽ bị khóa tính năng · Sau <span style="color:#f87171">60 phút</span> → <span style="color:#f87171;font-weight:700">PHÁ SẢN</span></div>
        <input id="loan-amount-input" class="loan-input" type="number" min="1" max="${maxAmt}" step="1" placeholder="Nhập số tiền muốn vay (tối đa ${fmt(maxAmt)})" />
        <button class="loan-btn loan-borrow-btn" onclick="doLoan()">💳 Vay Tiền${nextLoanNum >= 2 ? ' (⚠️ Lãi cao!)' : ''}</button>
      </div>`;
  } else {
    // Active loan
    const owed = loanTotalOwed();
    const canRepay = G.money >= owed;
    const elapsed = (Date.now() - loan.borrowedAt) / 1000; // seconds
    const minsLeft30 = Math.max(0, 30*60 - elapsed);
    const minsLeft60 = Math.max(0, 60*60 - elapsed);
    const warningColor = loan.lockedFeatures ? '#f87171' : elapsed > 25*60 ? '#fbbf24' : '#4ade80';

    el.innerHTML = `
      <div class="loan-status-card" style="border-color:${loan.lockedFeatures?'#5a2a2a':'#1f2937'}">
        <div style="display:flex;justify-content:space-between;margin-bottom:8px">
          <span style="font-size:13px;color:#6b7280">Tiền gốc</span>
          <span style="color:#60a5fa;font-weight:600">${fmt(loan.principal)}</span>
        </div>
        <div style="display:flex;justify-content:space-between;margin-bottom:6px">
          <span style="font-size:13px;color:#6b7280">Lãi suất (lần ${loan.loanCount||1})</span>
          <span style="font-size:12px">${activeLoanRateLabel()}</span>
        </div>
        <div style="display:flex;justify-content:space-between;margin-bottom:8px">
          <span style="font-size:13px;color:#6b7280">Lãi tích lũy</span>
          <span style="color:#fbbf24;font-weight:600" id="loan-interest-display">${loan.interest.toFixed(4)}</span>
        </div>
        <div style="display:flex;justify-content:space-between;margin-bottom:10px;padding-top:8px;border-top:1px solid #1f2937">
          <span style="font-size:14px;color:#e2e8f0;font-weight:600">Tổng cần trả</span>
          <span style="color:#f87171;font-weight:700;font-size:15px" id="loan-owed-display">${fmt(owed)}</span>
        </div>
        ${loan.lockedFeatures ? `
        <div style="background:#1a0808;border:1px solid #5a2a2a;border-radius:6px;padding:8px;margin-bottom:8px;font-size:12px;color:#f87171;text-align:center">
          🔒 Tính năng bị khóa! Trả nợ ngay để mở khóa!<br>
          <span style="color:#4b5563">Phá sản sau: <span style="color:#f87171" id="loan-bankrupt-countdown">${Math.floor(minsLeft60/60)}:${String(Math.floor(minsLeft60%60)).padStart(2,'0')}</span></span>
        </div>` : `
        <div style="font-size:12px;color:${warningColor};margin-bottom:8px;text-align:center">
          ⏱ Thời gian an toàn: <span id="loan-safe-countdown">${Math.floor(minsLeft30/60)}:${String(Math.floor(minsLeft30%60)).padStart(2,'0')}</span>
        </div>`}
        <button class="loan-btn loan-repay-btn" ${!canRepay?'disabled':''} onclick="doRepayLoan()">
          💰 Trả ${fmt(owed)} ${!canRepay?'(Không đủ tiền)':''}
        </button>
        ${!canRepay?`<div style="font-size:11px;color:#4b5563;text-align:center;margin-top:4px">Thiếu ${fmt(owed - G.money)}</div>`:''}
      </div>`;
  }
}

function doLoan() {
  const input = document.getElementById('loan-amount-input');
  if (!input) return;
  const amt = parseFloat(input.value);
  const maxAmt = loanMaxAmount();
  if (!amt || amt <= 0) { showError('⚠️ Nhập số tiền muốn vay!'); return; }
  if (amt > maxAmt) { showError('⚠️ Vượt hạn mức! Tối đa ' + fmt(maxAmt)); return; }
  if (G.loan && G.loan.active) { showError('⚠️ Bạn đang có khoản vay chưa trả!'); return; }
  const prevCount = (G.loan && G.loan.loanCount) ? G.loan.loanCount : 0;
  const newCount = prevCount + 1;
  const mult = newCount <= 1 ? 1 : Math.pow(1.2, newCount - 1);
  G.loan = {
    active: true,
    principal: amt,
    interest: 0,
    borrowedAt: Date.now(),
    lockedFeatures: false,
    bankruptTriggered: false,
    loanCount: newCount,
  };
  G.money += amt;
  if (newCount >= 2) {
    showError(`🚨 LẦN VAY THỨ ${newCount}! Lãi suất ×${mult.toFixed(3)} — ${(0.005*mult).toFixed(5)}/2s! Nguy hiểm!`);
    setTimeout(() => showNotif(`💳 Đã vay ${fmt(amt)}! Lãi ×${mult} đang chạy!`), 1800);
  } else {
    showNotif('💳 Đã vay ' + fmt(amt) + '! Nhớ trả trước 30 phút!');
  }
  updateUI(); renderLoanPanel(); saveGame(false);
}

function doRepayLoan() {
  if (!G.loan || !G.loan.active) return;
  const owed = loanTotalOwed();
  if (G.money < owed) { showError('💸 Không đủ tiền trả! Cần ' + fmt(owed)); return; }
  G.money -= owed;
  const wasLocked = G.loan.lockedFeatures;
  const prevCount = G.loan.loanCount || 0;
  G.loan = { active:false, principal:0, interest:0, borrowedAt:0, lockedFeatures:false, bankruptTriggered:false, loanCount: prevCount };
  if (wasLocked) {
    // Re-enable features
    applyLoanLockState(false);
  }
  showNotif('✅ Đã trả hết nợ ' + fmt(owed) + '!');
  updateUI(); renderLoanPanel(); saveGame(false);
}

// applyLoanLockState(locked) — visually disables / re-enables
// market, inventory, lottery, vipshop, rshop tabs when a loan is overdue.
// Does NOT lock electricity or bank so the player can still repay.
function applyLoanLockState(locked) {
  // Lock/unlock certain tabs when overdue
  const tabsToLock = ['market','inventory','lottery','vipshop','rshop'];
  tabsToLock.forEach(tab => {
    const el = document.getElementById('tab-' + tab);
    if (el) {
      if (locked) {
        el.style.opacity = '0.3';
        el.style.pointerEvents = 'none';
        el.title = '🔒 Bị khóa do nợ quá hạn!';
      } else {
        el.style.opacity = '';
        el.style.pointerEvents = '';
        el.title = '';
      }
    }
  });
}

// triggerBankruptcy() — called when the player's loan goes 60 min overdue.
// Displays a full-screen overlay with a 10-second countdown,
// then forceBankruptReset() wipes the save and starts a fresh game.
function triggerBankruptcy() {
  if (!G.loan || G.loan.bankruptTriggered) return;
  G.loan.bankruptTriggered = true;
  saveGame(false);

  // Show bankruptcy overlay
  let overlay = document.getElementById('bankrupt-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'bankrupt-overlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.97);z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:Arial,sans-serif;animation:bankruptPulse 1.5s infinite';
    overlay.innerHTML = `
      <div style="text-align:center;max-width:320px;padding:20px">
        <div style="font-size:72px;margin-bottom:16px;animation:darkPulse 0.5s infinite">💸</div>
        <div style="font-size:36px;font-weight:900;color:#f87171;letter-spacing:3px;margin-bottom:8px;text-shadow:0 0 20px #f87171"># PHÁ SẢN #</div>
        <div style="font-size:14px;color:#9ca3af;margin-bottom:6px">Bạn đã không trả khoản nợ trong 60 phút.</div>
        <div style="font-size:13px;color:#6b7280;margin-bottom:24px">Toàn bộ tiến trình game sẽ bị xóa.</div>
        <div style="font-size:16px;color:#fbbf24;margin-bottom:6px">Khởi động lại sau:</div>
        <div id="bankrupt-timer" style="font-size:42px;font-weight:700;color:#f87171;font-family:monospace;margin-bottom:20px">10</div>
        <button onclick="forceBankruptReset()" style="padding:12px 32px;background:#3b1a1a;color:#f87171;border:2px solid #f87171;border-radius:8px;cursor:pointer;font-size:15px;font-weight:700">Xóa Ngay & Chơi Lại</button>
      </div>`;
    document.getElementById('game').appendChild(overlay);
  }

  let countdown = 10;
  const tick = setInterval(() => {
    countdown--;
    const timerEl = document.getElementById('bankrupt-timer');
    if (timerEl) timerEl.textContent = countdown;
    if (countdown <= 0) {
      clearInterval(tick);
      forceBankruptReset();
    }
  }, 1000);
}

function forceBankruptReset() {
  localStorage.removeItem(SAVE_KEY);
  if (window.storage) window.storage.delete(SAVE_KEY).catch(()=>{});
  G = defaultState();
  const ov = document.getElementById('bankrupt-overlay');
  if (ov) ov.remove();
  applyLoanLockState(false);
  renderAll();
  showNotif('🔄 Game đã reset sau phá sản!');
}

/* ┌─────────────────────────────────────────────────────────────────────────┐
   │  MODULE · TAX SYSTEM                                                    │
   │                                                                         │
   │  Every purchase triggers a 1% tax bill that must be paid within 5 min. │
   │  After 5 min unpaid → penalty ×3.  After 10 min → buying BAN.         │
   │  Repeat offenders get longer bans: 5m → 30m → 2h → 5h → 10h.         │
   │                                                                         │
   │  Key functions:                                                         │
   │    taxIssueBill(name, price)  — called after every purchase            │
   │    taxPayBill(id)             — player pays one specific bill           │
   │    taxPayAll()                — pay all unpaid bills at once            │
   │    taxIsBanned()              — returns true if buying is locked        │
   │    renderTaxPanel()           — updates the Tax tab HTML                │
   │    renderTaxBadge()           — updates the tab label (shows count)     │
   │                                                                         │
   │  Tax state lives in G.tax = { bills[], banUntil, banCount, totalPaid } │
   └─────────────────────────────────────────────────────────────────────────┘ */

// Ban durations in seconds: 5min, 30min, 2h, 5h, 10h
const TAX_BAN_DURATIONS = [5*60, 30*60, 2*3600, 5*3600, 10*3600];

function taxIssueBill(itemName, itemPrice) {
  if (!G.tax) G.tax = { bills:[], banUntil:0, banCount:0, totalPaid:0 };
  const taxAmt = itemPrice * 0.01;
  if (taxAmt <= 0) return;
  const bill = {
    id: 'tax_' + Date.now() + '_' + Math.random().toString(36).slice(2,6),
    amount: taxAmt,
    penaltyMult: 1,
    issuedAt: Date.now(),
    item: itemName,
    paid: false,
  };
  G.tax.bills.push(bill);
  saveGame(false);
  renderTaxBadge();
  // Small notification
  showNotif('🧾 Thuế 1%: ' + fmt(taxAmt) + ' cho "' + itemName + '" — trả trong 5 phút!');
}

function taxPayBill(billId) {
  if (!G.tax) return;
  const bill = G.tax.bills.find(b => b.id === billId && !b.paid);
  if (!bill) return;
  const owe = bill.amount * bill.penaltyMult;
  if (G.money < owe) { showError('💸 Không đủ tiền! Cần ' + fmt(owe)); return; }
  G.money -= owe;
  G.tax.totalPaid += owe;
  bill.paid = true;
  showNotif('✅ Đã nộp thuế ' + fmt(owe) + '!');
  updateUI(); renderTaxPanel(); saveGame(false);
  renderTaxBadge();
}

function taxPayAll() {
  if (!G.tax) return;
  const unpaid = G.tax.bills.filter(b => !b.paid);
  const total = unpaid.reduce((s,b) => s + b.amount * b.penaltyMult, 0);
  if (total <= 0) { showNotif('✅ Không có hóa đơn nào!'); return; }
  if (G.money < total) { showError('💸 Không đủ tiền! Cần ' + fmt(total)); return; }
  G.money -= total;
  G.tax.totalPaid += total;
  unpaid.forEach(b => b.paid = true);
  showNotif('✅ Đã nộp toàn bộ thuế ' + fmt(total) + '!');
  updateUI(); renderTaxPanel(); saveGame(false);
  renderTaxBadge();
}

function taxBanDuration(banCount) {
  const idx = Math.min(banCount, TAX_BAN_DURATIONS.length - 1);
  return TAX_BAN_DURATIONS[idx];
}

function taxBanLabel(seconds) {
  if (seconds >= 3600) return Math.round(seconds/3600) + ' tiếng';
  return Math.round(seconds/60) + ' phút';
}

function taxIsBanned() {
  return G.tax && G.tax.banUntil && Date.now() < G.tax.banUntil;
}

function taxBanTimeLeft() {
  if (!G.tax || !G.tax.banUntil) return 0;
  return Math.max(0, G.tax.banUntil - Date.now());
}

function renderTaxBadge() {
  const tab = document.getElementById('tab-tax');
  if (!tab) return;
  if (!G.tax) return;
  const unpaid = G.tax.bills.filter(b => !b.paid);
  const overdue5 = unpaid.filter(b => (Date.now() - b.issuedAt) >= 5*60*1000).length;
  if (taxIsBanned()) {
    tab.innerHTML = '🚫 Thuế';
    tab.style.color = '#f87171';
    tab.style.animation = 'darkPulse 0.8s infinite';
  } else if (overdue5 > 0) {
    tab.innerHTML = `⚠️ Thuế <span style="background:#f87171;color:#fff;border-radius:10px;font-size:10px;padding:1px 5px">${overdue5}</span>`;
    tab.style.color = '#fbbf24';
    tab.style.animation = 'darkPulse 1.2s infinite';
  } else if (unpaid.length > 0) {
    tab.innerHTML = `🧾 Thuế <span style="background:#fbbf24;color:#000;border-radius:10px;font-size:10px;padding:1px 5px">${unpaid.length}</span>`;
    tab.style.color = '#fbbf24';
    tab.style.animation = '';
  } else {
    tab.innerHTML = '🧾 Thuế';
    tab.style.color = '';
    tab.style.animation = '';
  }
}

function renderTaxPanel() {
  const el = document.getElementById('tax-panel-content');
  if (!el) return;
  if (!G.tax) G.tax = { bills:[], banUntil:0, banCount:0, totalPaid:0 };
  const now = Date.now();
  const unpaid = G.tax.bills.filter(b => !b.paid);
  const paid = G.tax.bills.filter(b => b.paid).slice(-10).reverse();
  const banned = taxIsBanned();
  const banLeft = taxBanTimeLeft();

  let html = '';

  // Ban status bar
  if (banned) {
    const banSecs = Math.ceil(banLeft / 1000);
    const bh = Math.floor(banSecs/3600), bm = Math.floor((banSecs%3600)/60), bs = banSecs%60;
    const banStr = bh>0 ? `${bh}g ${bm}p ${bs}s` : bm>0 ? `${bm}p ${bs}s` : `${bs}s`;
    html += `
    <div style="background:linear-gradient(135deg,#3a0000,#1a0000);border:2px solid #f87171;border-radius:11px;padding:18px;margin-bottom:14px;text-align:center;animation:bankruptPulse 1s infinite">
      <div style="font-size:36px;margin-bottom:6px">🚫</div>
      <div style="font-size:18px;font-weight:900;color:#f87171;letter-spacing:2px">BỊ CẤM MUA HÀNG!</div>
      <div style="font-size:13px;color:#fca5a5;margin-top:6px">Lý do: Không nộp thuế trong 10 phút.</div>
      <div style="font-size:14px;color:#fbbf24;margin-top:8px">Gỡ cấm sau: <span id="tax-ban-timer" style="font-family:monospace;font-size:20px;font-weight:700;color:#f87171">${banStr}</span></div>
      <div style="font-size:12px;color:#6b7280;margin-top:6px">Lần bị cấm thứ ${G.tax.banCount} — Tái phạm sẽ bị cấm lâu hơn!</div>
    </div>`;
  }

  // Summary card
  const totalUnpaidAmt = unpaid.reduce((s,b) => s + b.amount * b.penaltyMult, 0);
  html += `
  <div style="background:#111827;border:1px solid #1f2937;border-radius:11px;padding:14px;margin-bottom:12px">
    <div style="font-size:15px;color:#9ca3af;margin-bottom:10px;display:flex;align-items:center;gap:6px">🧾 Tổng Quan Thuế</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:13px">
      <div style="background:#0d1117;border:1px solid #1f2937;border-radius:7px;padding:10px;text-align:center">
        <div style="color:#6b7280;font-size:11px;margin-bottom:3px">HÓA ĐƠN CHƯA NỘP</div>
        <div style="color:${unpaid.length>0?'#f87171':'#4ade80'};font-size:20px;font-weight:700">${unpaid.length}</div>
      </div>
      <div style="background:#0d1117;border:1px solid #1f2937;border-radius:7px;padding:10px;text-align:center">
        <div style="color:#6b7280;font-size:11px;margin-bottom:3px">TỔNG CẦN NỘP</div>
        <div style="color:${totalUnpaidAmt>0?'#fbbf24':'#4ade80'};font-size:18px;font-weight:700">${fmt(totalUnpaidAmt)}</div>
      </div>
      <div style="background:#0d1117;border:1px solid #1f2937;border-radius:7px;padding:10px;text-align:center">
        <div style="color:#6b7280;font-size:11px;margin-bottom:3px">LẦN BỊ CẤM</div>
        <div style="color:${G.tax.banCount>0?'#f87171':'#4ade80'};font-size:20px;font-weight:700">${G.tax.banCount}</div>
      </div>
      <div style="background:#0d1117;border:1px solid #1f2937;border-radius:7px;padding:10px;text-align:center">
        <div style="color:#6b7280;font-size:11px;margin-bottom:3px">TỔNG ĐÃ NỘP</div>
        <div style="color:#4ade80;font-size:16px;font-weight:700">${fmt(G.tax.totalPaid)}</div>
      </div>
    </div>
    ${unpaid.length > 1 ? `<button onclick="taxPayAll()" style="margin-top:10px;width:100%;padding:9px;background:#1e3a2a;color:#4ade80;border:1px solid #2d5a3f;border-radius:6px;cursor:pointer;font-size:13px">💰 Nộp Tất Cả (${fmt(totalUnpaidAmt)})</button>` : ''}
  </div>`;

  // Rules card
  html += `
  <div style="background:#111827;border:1px solid #1f2937;border-radius:11px;padding:14px;margin-bottom:12px;font-size:12px;color:#6b7280;line-height:1.8">
    <div style="color:#9ca3af;font-size:13px;margin-bottom:8px">📋 Quy Định Thuế</div>
    <div>• Mỗi giao dịch mua hàng bị đánh <span style="color:#fbbf24;font-weight:700">thuế 1%</span> giá trị</div>
    <div>• Phải nộp trong <span style="color:#4ade80">5 phút</span> — sau đó thuế tăng <span style="color:#f87171">×3</span></div>
    <div>• Sau <span style="color:#f87171">10 phút</span> không nộp → <span style="color:#f87171;font-weight:700">BỊ CẤM MUA HÀNG</span></div>
    <div style="margin-top:4px;color:#4b5563">Lịch bị cấm: 5p → 30p → 2 tiếng → 5 tiếng → 10 tiếng</div>
  </div>`;

  // Unpaid bills
  if (unpaid.length > 0) {
    html += `<div style="font-size:13px;color:#f87171;font-weight:600;margin-bottom:8px">⚠️ Hóa đơn chưa nộp (${unpaid.length})</div>`;
    unpaid.forEach(bill => {
      const elapsed = (now - bill.issuedAt) / 1000;
      const overdue5 = elapsed >= 5*60;
      const overdue10 = elapsed >= 10*60;
      const owe = bill.amount * bill.penaltyMult;
      const timeLeft5 = Math.max(0, 5*60 - elapsed);
      const timeLeft10 = Math.max(0, 10*60 - elapsed);
      const m5 = Math.floor(timeLeft5/60), s5 = Math.floor(timeLeft5%60);
      const m10 = Math.floor(timeLeft10/60), s10 = Math.floor(timeLeft10%60);
      const borderColor = overdue5 ? '#f87171' : '#fbbf24';
      const cd5Text = overdue5 ? '🔴 QUÁ HẠN — phạt ×3 đã áp dụng!' : `⏱ Phạt ×3 sau: ${m5}:${String(s5).padStart(2,'0')}`;
      const cd5Color = overdue5 ? '#f87171' : (timeLeft5 < 60 ? '#f87171' : '#fbbf24');
      const cd10Text = overdue10 ? '🚫 Lệnh cấm đã kích hoạt!' : `⛔ Bị cấm sau: ${m10}:${String(s10).padStart(2,'0')}`;
      const cd10Color = overdue10 ? '#f87171' : (timeLeft10 < 60 ? '#f87171' : '#9ca3af');
      html += `
      <div style="background:#0d1117;border:1px solid ${borderColor};border-radius:8px;padding:12px;margin-bottom:8px;${overdue5?'animation:bankruptPulse 1.5s infinite':''}">
        <div style="display:flex;justify-content:space-between;margin-bottom:5px">
          <span style="font-size:13px;color:#e2e8f0">${bill.item}</span>
          <span style="color:${overdue5?'#f87171':'#fbbf24'};font-weight:700">${fmt(owe)}</span>
        </div>
        <div id="tax-cd5-${bill.id}" style="font-size:11px;color:${cd5Color};margin-bottom:2px">${cd5Text}</div>
        <div id="tax-cd10-${bill.id}" style="font-size:11px;color:${cd10Color};margin-bottom:6px">${cd10Text}</div>
        <button onclick="taxPayBill('${bill.id}')" style="width:100%;padding:7px;background:${overdue5?'#3b1a1a':'#1e3a2a'};color:${overdue5?'#f87171':'#4ade80'};border:1px solid ${overdue5?'#5a2a2a':'#2d5a3f'};border-radius:5px;cursor:pointer;font-size:12px">
          💳 Nộp ${fmt(owe)} ${bill.penaltyMult>1?`(×${bill.penaltyMult.toFixed(1)} phạt)`:''}
        </button>
      </div>`;
    });
  } else if (!banned) {
    html += `<div style="text-align:center;padding:20px;color:#4b5563;font-size:14px">✅ Không có hóa đơn thuế nào!</div>`;
  }

  // Paid history
  if (paid.length > 0) {
    html += `<div style="font-size:12px;color:#4b5563;margin-top:10px;margin-bottom:6px">📜 Lịch sử đã nộp (${paid.length})</div>`;
    paid.forEach(bill => {
      html += `<div style="background:#0d1117;border:1px solid #1f2937;border-radius:7px;padding:9px 12px;margin-bottom:5px;display:flex;justify-content:space-between;font-size:12px">
        <span style="color:#6b7280">${bill.item}</span>
        <span style="color:#4ade80">✅ ${fmt(bill.amount * (bill.penaltyMult||1))}</span>
      </div>`;
    });
  }

  el.innerHTML = html;
}

// Tax ticker — runs every real second using Date.now() (not game time).
// Checks each unpaid tax bill:
//   - After 5 min real time  → applies penaltyMult = 3 (bill amount triples)
//   - After 10 min real time → triggers a buying BAN (applyTaxBan)
// Also updates the live countdown timers shown in the Tax panel.
setInterval(() => {
  if (!G.tax) return;
  const now = Date.now();
  let changed = false;

  // Check each unpaid bill bằng real-time elapsed
  G.tax.bills.forEach(bill => {
    if (bill.paid) return;
    const elapsed = (now - bill.issuedAt) / 1000; // real seconds since issued

    // After 5 min real-time: penalty ×3
    if (elapsed >= 5*60 && bill.penaltyMult < 3) {
      bill.penaltyMult = 3;
      changed = true;
      showError(`🚨 Thuế "${bill.item}" quá hạn! Phạt ×3 → ${fmt(bill.amount * 3)}`);
    }

    // After 10 min real-time: ban
    if (elapsed >= 10*60 && !bill._banTriggered) {
      bill._banTriggered = true;
      changed = true;
      const banSecs = taxBanDuration(G.tax.banCount);
      G.tax.banUntil = now + banSecs * 1000;
      G.tax.banCount = Math.min(G.tax.banCount + 1, TAX_BAN_DURATIONS.length - 1);
      showError(`🚫 Trốn thuế! Bị cấm mua hàng ${taxBanLabel(banSecs)}!`);
      renderTaxBadge();
      switchTab('tax');
    }
  });

  if (changed) { saveGame(false); renderTaxPanel(); }

  // Live-update ban countdown
  const banTimerEl = document.getElementById('tax-ban-timer');
  if (banTimerEl && taxIsBanned()) {
    const banSecs = Math.ceil(taxBanTimeLeft() / 1000);
    const bh = Math.floor(banSecs/3600), bm = Math.floor((banSecs%3600)/60), bs = banSecs%60;
    banTimerEl.textContent = bh>0 ? `${bh}g ${bm}p ${bs}s` : bm>0 ? `${bm}p ${bs}s` : `${bs}s`;
  }

  // Live-update per-bill countdowns in tax panel
  if (document.getElementById('panel-tax') && document.getElementById('panel-tax').classList.contains('active')) {
    G.tax.bills.forEach(bill => {
      if (bill.paid) return;
      const elapsed = (now - bill.issuedAt) / 1000;
      const el5 = document.getElementById('tax-cd5-' + bill.id);
      const el10 = document.getElementById('tax-cd10-' + bill.id);
      if (el5) {
        const left5 = Math.max(0, 5*60 - elapsed);
        if (left5 > 0) {
          const m = Math.floor(left5/60), s = Math.floor(left5%60);
          el5.textContent = `⏱ Phạt ×3 sau: ${m}:${String(s).padStart(2,'0')}`;
          el5.style.color = left5 < 60 ? '#f87171' : '#fbbf24';
        } else {
          el5.textContent = '🔴 QUÁ HẠN — phạt ×3 đã áp dụng!';
          el5.style.color = '#f87171';
        }
      }
      if (el10) {
        const left10 = Math.max(0, 10*60 - elapsed);
        if (left10 > 0) {
          const m = Math.floor(left10/60), s = Math.floor(left10%60);
          el10.textContent = `⛔ Bị cấm sau: ${m}:${String(s).padStart(2,'0')}`;
          el10.style.color = left10 < 60 ? '#f87171' : '#9ca3af';
        } else {
          el10.textContent = '🚫 Lệnh cấm đã kích hoạt!';
          el10.style.color = '#f87171';
        }
      }
    });
  }

  renderTaxBadge();

  // If ban expired, notify once
  if (G.tax.banUntil && !taxIsBanned() && G.tax.banUntil > 0) {
    if (G.tax._banExpiredNotified !== G.tax.banUntil) {
      G.tax._banExpiredNotified = G.tax.banUntil;
      showNotif('✅ Lệnh cấm đã hết! Bạn có thể mua hàng trở lại.');
      renderTaxBadge();
      if (document.getElementById('panel-tax').classList.contains('active')) renderTaxPanel();
    }
  }
}, 1000);

// On load: check tax real-time immediately (xử lý thời gian offline)
setTimeout(() => {
  if (!G.tax) return;
  const now = Date.now();
  let changed = false;
  G.tax.bills.forEach(bill => {
    if (bill.paid) return;
    const elapsed = (now - bill.issuedAt) / 1000;
    if (elapsed >= 5*60 && bill.penaltyMult < 3) {
      bill.penaltyMult = 3;
      changed = true;
    }
    if (elapsed >= 10*60 && !bill._banTriggered) {
      bill._banTriggered = true;
      changed = true;
      const banSecs = taxBanDuration(G.tax.banCount);
      G.tax.banUntil = now + banSecs * 1000;
      G.tax.banCount = Math.min(G.tax.banCount + 1, TAX_BAN_DURATIONS.length - 1);
    }
  });
  if (changed) saveGame(false);
  renderTaxBadge();
}, 600);

// Check if player is banned before any purchase
function taxCheckBanBeforeBuy() {
  if (!G.tax) return true;
  if (taxIsBanned()) {
    const banSecs = Math.ceil(taxBanTimeLeft() / 1000);
    const bh = Math.floor(banSecs/3600), bm = Math.floor((banSecs%3600)/60), bs = banSecs%60;
    const banStr = bh>0 ? `${bh}g ${bm}p ${bs}s` : bm>0 ? `${bm}p ${bs}s` : `${bs}s`;
    showError(`🚫 Bị cấm mua hàng! Còn ${banStr}. Xem tab 🧾 Thuế!`);
    return false;
  }
  return true;
}

// Loan interest ticker — runs every second
setInterval(() => {
  if (!G.loan || !G.loan.active) return;
  const elapsed = (Date.now() - G.loan.borrowedAt) / 1000;

  // Accumulate interest: lần 1 = 0.005/2s = 0.0025/s, lần 2+ = ×3 mỗi lần
  const ratePerSec = loanInterestRatePerSec();
  G.loan.interest = G.loan.principal * ratePerSec * elapsed;

  // After 30 min → lock features
  if (!G.loan.lockedFeatures && elapsed >= 30 * 60) {
    G.loan.lockedFeatures = true;
    applyLoanLockState(true);
    showError('🔒 Nợ quá hạn 30 phút! Tính năng bị khóa!');
    saveGame(false);
  }

  // After 60 min → bankruptcy
  if (!G.loan.bankruptTriggered && elapsed >= 60 * 60) {
    triggerBankruptcy();
    return;
  }

  // Live update loan display if bank tab is open
  const intEl = document.getElementById('loan-interest-display');
  const owedEl = document.getElementById('loan-owed-display');
  if (intEl) intEl.textContent = G.loan.interest.toFixed(4);
  if (owedEl) owedEl.textContent = fmt(loanTotalOwed());

  // Update countdowns
  const minsLeft30 = Math.max(0, 30*60 - elapsed);
  const minsLeft60 = Math.max(0, 60*60 - elapsed);
  const safeEl = document.getElementById('loan-safe-countdown');
  if (safeEl) safeEl.textContent = Math.floor(minsLeft30/60)+':'+String(Math.floor(minsLeft30%60)).padStart(2,'0');
  const bkEl = document.getElementById('loan-bankrupt-countdown');
  if (bkEl) bkEl.textContent = Math.floor(minsLeft60/60)+':'+String(Math.floor(minsLeft60%60)).padStart(2,'0');

  // Warn at 25 min
  if (!G.loan._warned25 && elapsed >= 25*60) {
    G.loan._warned25 = true;
    showError('⚠️ Còn 5 phút trước khi tính năng bị khóa! Trả nợ ngay!');
  }
  // Warn at 55 min
  if (!G.loan._warned55 && elapsed >= 55*60) {
    G.loan._warned55 = true;
    showError('🔴 Còn 5 phút trước khi PHÁ SẢN!');
  }
}, 1000);

// On load: re-apply lock state if active loan was locked
setTimeout(() => {
  if (G.loan && G.loan.active && G.loan.lockedFeatures) {
    applyLoanLockState(true);
  }
  if (G.loan && G.loan.active && G.loan.bankruptTriggered) {
    triggerBankruptcy();
  }
}, 500);

// ═══ SLOTS EXPANSION ════════════════════════════════════════════
function renderSlotPanel() {
  const grid = document.getElementById('slot-expand-grid');
  grid.innerHTML = '';
  for (let i = 1; i <= 15; i++) {
    const owned = i <= G.ownedSlots;
    const price = slotPrice(i);
    const canBuy = !owned && i === G.ownedSlots+1 && G.money >= price;
    const isNext = i === G.ownedSlots+1;
    const div = document.createElement('div');
    div.className = 'slot-card '+(owned?'owned':isNext?'available':'locked');
    if (isNext && canBuy) div.onclick = () => buySlot(i);
    div.innerHTML = `
      <div style="font-size:28px">${owned?'✅':isNext?'🔓':'🔒'}</div>
      <div style="flex:1">
        <div style="font-size:15px;color:#e2e8f0;font-weight:500">Slot ${i}</div>
        <div style="font-size:13px;color:${owned?'#4ade80':isNext?'#fbbf24':'#374151'}">
          ${owned?'Đã mở':price===0?'Miễn phí':fmt(price)}
        </div>
        ${isNext&&!canBuy&&price>0?`<div style="font-size:12px;color:#4b5563">Cần thêm ${fmt(price-G.money)}</div>`:''}
        ${isNext&&canBuy?'<div style="font-size:12px;color:#4ade80">Nhấn để mở!</div>':''}
      </div>`;
    grid.appendChild(div);
  }
}

function buySlot(n) {
  const price = slotPrice(n);
  if (G.money < price || n !== G.ownedSlots+1) { showError('💸 Không đủ tiền! Cần '+fmt(price)); return; }
  if (!taxCheckBanBeforeBuy()) return;
  G.money -= price;
  G.ownedSlots = n;
  G.slots[n-1] = null;
  taxIssueBill('📦 Slot ' + n, price);
  showNotif('🎉 Slot '+n+' đã mở!');
  renderSlots(); renderSlotPanel(); updateUI(); saveGame(false);
}

// ═══ SELL ════════════════════════════════════════════════════════
function askSell(i) {
  const s = G.slots[i]; if (!s) return;
  const m = ALL_M[s.machine];
  pendingSellSlot = i;
  document.getElementById('mod-name').textContent = m.icon+' '+m.name;
  document.getElementById('mod-refund').textContent = 'Nhận: '+fmt(m.price/3);
  document.getElementById('modal').style.display = 'flex';
}
function confirmSell() {
  if (pendingSellSlot===null) return;
  const m = ALL_M[G.slots[pendingSellSlot].machine];
  G.money += m.price/3;
  G.slots[pendingSellSlot] = null;
  closeModal();
  renderSlots();
  if (document.getElementById('panel-shop').classList.contains('active')) renderShopContent();
  updateUI(); showNotif('💸 Bán '+m.name+' +'+fmt(m.price/3)); saveGame(false);
}
function closeModal() { document.getElementById('modal').style.display='none'; pendingSellSlot=null; }

// ═══ UI UPDATE ════════════════════════════════════════════════════
function updateUI() {
  const r = getRate();
  const vm = G.valueMultiplier || 1;
  document.getElementById('money-display')||0;
  document.getElementById('mb-dollar').textContent = fmt(G.money);
  document.getElementById('mb-xu').textContent = (G.wallet.xu||0).toLocaleString()+' xu';
  document.getElementById('mb-gold').textContent = (G.wallet.gold||0)+' gold';
  const speedMult = (G.matBonuses&&G.matBonuses.speedBoost)||1;
  document.getElementById('mb-rate').textContent = fmt(r * vm * speedMult)+'/s';
  document.getElementById('mb-vmult').textContent = 'x'+vm.toFixed(vm < 10 ? 2 : vm < 1000 ? 1 : 0);
  document.getElementById('mb-total').textContent = fmt(G.totalEarned);
  document.getElementById('hdr-money').textContent = fmt(G.money);
  document.getElementById('mc-count').textContent = getMachineCount();
  document.getElementById('mc-slots').textContent = G.ownedSlots;
  if (document.getElementById('panel-stats').classList.contains('active')) renderStats();
}

function renderStats() {
  const vm = G.valueMultiplier || 1;
  const mins = (G.playedSeconds||0) / 60;
  document.getElementById('s-total').textContent = fmt(G.totalEarned);
  document.getElementById('s-rate').textContent = fmt(getRate() * vm)+'/s';
  document.getElementById('s-mach').textContent = getMachineCount();
  document.getElementById('s-slots').textContent = getMachineCount()+'/'+G.ownedSlots;
  // Value multiplier info
  let vmEl = document.getElementById('s-vmult-block');
  if (!vmEl) {
    const bd = document.getElementById('s-breakdown');
    const block = document.createElement('div');
    block.id = 's-vmult-block';
    block.style.cssText = 'margin-bottom:12px;padding:10px;background:#0d1f0d;border:1px solid #4ade8044;border-radius:8px;font-size:13px';
    bd.parentNode.insertBefore(block, bd);
    vmEl = block;
  }
  vmEl.innerHTML = `
    <div style="color:#4ade80;font-weight:600;margin-bottom:6px">💹 Tăng Trưởng Giá Trị Đồng Tiền</div>
    <div style="display:flex;justify-content:space-between;padding:3px 0">
      <span style="color:#9ca3af">Hệ số nhân hiện tại</span>
      <span style="color:#fbbf24;font-weight:600">x${vm.toFixed(2)}</span>
    </div>
    <div style="display:flex;justify-content:space-between;padding:3px 0">
      <span style="color:#9ca3af">Tốc độ tăng</span>
      <span style="color:#4ade80">+1% / phút (compound)</span>
    </div>
    <div style="display:flex;justify-content:space-between;padding:3px 0">
      <span style="color:#9ca3af">Thời gian chơi</span>
      <span style="color:#60a5fa">${mins.toFixed(1)} phút</span>
    </div>
    <div style="display:flex;justify-content:space-between;padding:3px 0">
      <span style="color:#9ca3af">Dự báo 10 phút</span>
      <span style="color:#a78bfa">x${(vm * Math.pow(1.01, 10)).toFixed(2)}</span>
    </div>
    <div style="display:flex;justify-content:space-between;padding:3px 0">
      <span style="color:#9ca3af">Dự báo 1 giờ</span>
      <span style="color:#f472b6">x${(vm * Math.pow(1.01, 60)).toFixed(1)}</span>
    </div>`;
  const counts = {};
  G.slots.forEach(s => { if (s&&s.machine) counts[s.machine]=(counts[s.machine]||0)+1; });
  const bd = document.getElementById('s-breakdown');
  bd.innerHTML = Object.keys(counts).map(k=>{
    const m=ALL_M[k]; const tier=TIERS.find(t=>t.id===m.tierId)||{accent:'#4ade80'};
    return `<div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid #1f2937;font-size:14px">
      <span style="color:#9ca3af">${m.icon} ${m.name} ×${counts[k]}</span>
      <span style="color:${tier.accent}">+${fmt(m.rate * vm * counts[k])}/s</span></div>`;
  }).join('')||'<div style="color:#374151;font-size:11px">Chưa có máy</div>';
}

function switchTab(tab) {
  // Block tab switching during power outage or manual off (except allowed tabs)
  const outageAllowed = ['electricity', 'bank', 'settings', 'updatelog'];
  const isPowerDown = (G.powerOutageTriggered && G.powerSeconds <= 0) || G.manualPowerOff;
  if (isPowerDown && !outageAllowed.includes(tab)) {
    showError('⚡ Mất điện! Chỉ có thể dùng tab Điện và Ngân Hàng.');
    return;
  }
  document.querySelectorAll('.main-tab').forEach(t=>t.classList.remove('active'));
  const activeTabEl2 = document.getElementById('tab-'+tab);
  if(activeTabEl2) activeTabEl2.classList.add('active');
  const activePanelEl = document.getElementById('panel-'+tab);
  document.querySelectorAll('.panel').forEach(p=>{ if(p!==activePanelEl) p.classList.remove('active'); });
  if(activePanelEl) activePanelEl.classList.add('active');
  localStorage.setItem('ui_activeTab', tab);
  // Scroll active tab into view
  const activeTabEl = document.getElementById('tab-' + tab);
  if (activeTabEl) activeTabEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  if (tab==='shop') { renderShopTabs(); renderShopContent(); }
  if (tab==='bank') renderBank();
  if (tab==='tax') renderTaxPanel();
  if (tab==='stats') renderStats();
  if (tab==='base') renderSlots();
  if (tab==='slots') renderSlotPanel();
  if (tab==='market') { renderMarket(); }
  if (tab==='inventory') renderInventory();
  if (tab==='rshop') renderRShop();
  if (tab==='vipshop') renderVipShop();
  if (tab==='computer') { initTerminal(); updateInetStatusBar(); }
  if (tab==='lottery') renderLottery();
  if (tab==='electricity') renderElecPanel();
  if (tab==='matshop') renderMatShop();
  if (tab==='shop') { initShopAds(); }
  if (tab==='rank') {
    const _rw = (typeof G !== 'undefined') ? (G.money || 0) : 0;
    if (typeof getRankByWealth === 'function') {
      window._activeRankTab = getRankByWealth(_rw).id;
    }
    setTimeout(function(){
      if (typeof renderRankPanel === 'function') {
        renderRankPanel._force = true;
        renderRankPanel();
      }
    }, 100);
  }
}

// showNotif(msg, duration?) — shows a slide-in toast notification
// at the top-right corner for ~3 seconds.
// Used for positive events: purchases, earnings, unlocks.
// For errors/negative events use showError() (red styling).
function showNotif(msg) {
  const n=document.getElementById('notif');
  n.classList.remove('error');
  n.textContent=msg; n.classList.add('show');
  clearTimeout(n._t); n._t=setTimeout(()=>n.classList.remove('show'),2500);
}
function showError(msg) {
  const n=document.getElementById('notif');
  n.classList.add('error');
  n.textContent=msg; n.classList.add('show');
  clearTimeout(n._t); n._t=setTimeout(()=>{ n.classList.remove('show'); n.classList.remove('error'); },2500);
}

/* ┌─────────────────────────────────────────────────────────────────────────┐
   │  MODULE 06 · MARKET  —  items · stock · buy · listings · timers        │
   └─────────────────────────────────────────────────────────────────────────┘ */
// ═══ MARKET DATA ══════════════════════════════════════════════════
const MARKET_ITEMS = [
  // Tier 5: Siêu Tài Sản - dark matter rank - 1000 recycle pts
  {id:'m_island',name:'Đảo Cá Nhân',icon:'🏝️',minPrice:5e6,maxPrice:1e8,tier:'super',recyclePoints:1000,weight:1},
  {id:'m_yacht',name:'Du Thuyền Hạng Sang',icon:'🛥️',minPrice:2e6,maxPrice:5e7,tier:'super',recyclePoints:1000,weight:2},
  {id:'m_penthouse',name:'Căn Hộ Penthouse',icon:'🏙️',minPrice:1e6,maxPrice:2e7,tier:'super',recyclePoints:1000,weight:3},
  {id:'m_supercar',name:'Siêu Xe (Bugatti/Ferrari)',icon:'🏎️',minPrice:3e5,maxPrice:4e6,tier:'super',recyclePoints:1000,weight:4},
  {id:'m_diamond_gem',name:'Kim Cương Viên',icon:'💎',minPrice:5e4,maxPrice:5e5,tier:'super',recyclePoints:1000,weight:6},
  {id:'m_patek',name:'Đồng Hồ Patek Philippe',icon:'⌚',minPrice:4e4,maxPrice:3e5,tier:'super',recyclePoints:1000,weight:7},
  {id:'m_birkin',name:'Túi Hermes Birkin',icon:'👜',minPrice:12000,maxPrice:1.5e5,tier:'super',recyclePoints:1000,weight:9},
  {id:'m_piano',name:'Grand Piano Steinway',icon:'🎹',minPrice:7e4,maxPrice:1.8e5,tier:'super',recyclePoints:1000,weight:8},
  {id:'m_hifi',name:'Hệ Thống Âm Thanh Hi-end',icon:'🔊',minPrice:2e4,maxPrice:1e5,tier:'super',recyclePoints:1000,weight:10},
  {id:'m_golf',name:'Bộ Gậy Golf Thiết Kế Riêng',icon:'⛳',minPrice:5000,maxPrice:2e4,tier:'super',recyclePoints:1000,weight:12},
  // Tier 4: Công Nghệ - diamond rank - 400 recycle pts
  {id:'m_massage',name:'Ghế Massage Cao Cấp',icon:'💺',minPrice:1500,maxPrice:8000,tier:'tech',recyclePoints:400,weight:15},
  {id:'m_tv',name:'TV 4K OLED Cỡ Lớn',icon:'📺',minPrice:1200,maxPrice:5000,tier:'tech',recyclePoints:400,weight:16},
  {id:'m_camera',name:'Máy Ảnh Mirrorless',icon:'📷',minPrice:1500,maxPrice:4500,tier:'tech',recyclePoints:400,weight:16},
  {id:'m_motorbike',name:'Xe Máy (Vespa/Honda SH)',icon:'🛵',minPrice:2000,maxPrice:6000,tier:'tech',recyclePoints:400,weight:15},
  {id:'m_laptop',name:'Laptop Gaming Cao Cấp',icon:'💻',minPrice:1200,maxPrice:3500,tier:'tech',recyclePoints:400,weight:17},
  {id:'m_fridge',name:'Tủ Lạnh Thông Minh',icon:'🧊',minPrice:800,maxPrice:3000,tier:'tech',recyclePoints:400,weight:18},
  {id:'m_iphone',name:'iPhone Đời Mới Nhất',icon:'📱',minPrice:1000,maxPrice:1600,tier:'tech',recyclePoints:400,weight:20},
  {id:'m_mattress',name:'Nệm Cao Su Thiên Nhiên',icon:'🛏️',minPrice:500,maxPrice:2000,tier:'tech',recyclePoints:400,weight:20},
  {id:'m_espresso',name:'Máy Pha Cà Phê Espresso',icon:'☕',minPrice:300,maxPrice:1500,tier:'tech',recyclePoints:400,weight:22},
  {id:'m_robot',name:'Robot Hút Bụi Flagship',icon:'🤖',minPrice:400,maxPrice:1200,tier:'tech',recyclePoints:400,weight:22},
  // Tier 3: Gia Dụng & Thời Trang - 50 recycle pts
  {id:'m_perfume',name:'Nước Hoa Niche/Designer',icon:'🧴',minPrice:100,maxPrice:400,tier:'fashion',recyclePoints:50,weight:30},
  {id:'m_airpurifier',name:'Máy Lọc Không Khí',icon:'💨',minPrice:150,maxPrice:400,tier:'fashion',recyclePoints:50,weight:30},
  {id:'m_luggage',name:'Vali Du Lịch',icon:'🧳',minPrice:80,maxPrice:350,tier:'fashion',recyclePoints:50,weight:32},
  {id:'m_headphone',name:'Tai Nghe Chống Ồn',icon:'🎧',minPrice:250,maxPrice:400,tier:'fashion',recyclePoints:50,weight:30},
  {id:'m_sneaker',name:'Giày Sneaker Chính Hãng',icon:'👟',minPrice:70,maxPrice:250,tier:'fashion',recyclePoints:50,weight:35},
  {id:'m_racket',name:'Vợt Cầu Lông/Tennis',icon:'🏸',minPrice:50,maxPrice:200,tier:'fashion',recyclePoints:50,weight:38},
  {id:'m_desk',name:'Bàn Làm Việc Gỗ',icon:'🪑',minPrice:60,maxPrice:180,tier:'fashion',recyclePoints:50,weight:38},
  {id:'m_hairdryer',name:'Máy Sấy Tóc Ion',icon:'💇',minPrice:40,maxPrice:150,tier:'fashion',recyclePoints:50,weight:40},
  {id:'m_cookware',name:'Bộ Nồi Bếp Cao Cấp',icon:'🍳',minPrice:50,maxPrice:150,tier:'fashion',recyclePoints:50,weight:40},
  {id:'m_airfryer',name:'Nồi Chiên Không Dầu',icon:'🫕',minPrice:60,maxPrice:150,tier:'fashion',recyclePoints:50,weight:40},
  // === 40 VẬT PHẨM MỚI DƯỚI $500 ===
  // 💻 Công nghệ tầm trung
  {id:'m_smartwatch_samsung',name:'Đồng Hồ Galaxy Watch',icon:'⌚',minPrice:120,maxPrice:450,tier:'fashion',recyclePoints:50,weight:29},
  {id:'m_tablet_mini',name:'Máy Tính Bảng iPad Mini',icon:'📱',minPrice:250,maxPrice:499,tier:'fashion',recyclePoints:50,weight:27},
  {id:'m_keyboard_mech',name:'Bàn Phím Cơ Gaming RGB',icon:'⌨️',minPrice:60,maxPrice:280,tier:'fashion',recyclePoints:50,weight:33},
  {id:'m_monitor_27',name:'Màn Hình IPS 27 inch',icon:'🖥️',minPrice:180,maxPrice:460,tier:'fashion',recyclePoints:50,weight:29},
  {id:'m_speaker_jbl',name:'Loa Bluetooth JBL Charge 5',icon:'🔊',minPrice:80,maxPrice:250,tier:'fashion',recyclePoints:50,weight:34},
  {id:'m_drone_mini',name:'Drone Mini DJI Neo',icon:'🚁',minPrice:140,maxPrice:499,tier:'fashion',recyclePoints:50,weight:28},
  {id:'m_ext_ssd',name:'Ổ SSD Di Động 1TB Samsung',icon:'💾',minPrice:60,maxPrice:180,tier:'fashion',recyclePoints:50,weight:37},
  {id:'m_ereader',name:'Máy Đọc Sách Kindle Paperwhite',icon:'📖',minPrice:80,maxPrice:200,tier:'fashion',recyclePoints:50,weight:36},
  {id:'m_powerbank_xl',name:'Pin Dự Phòng Anker 20000mAh',icon:'🔋',minPrice:30,maxPrice:120,tier:'fashion',recyclePoints:50,weight:41},
  {id:'m_dashcam',name:'Camera Hành Trình 4K',icon:'📸',minPrice:50,maxPrice:220,tier:'fashion',recyclePoints:50,weight:36},
  // 🏠 Đồ gia dụng thông minh
  {id:'m_smart_lock',name:'Khóa Cửa Vân Tay Xiaomi',icon:'🔐',minPrice:55,maxPrice:220,tier:'fashion',recyclePoints:50,weight:36},
  {id:'m_security_cam',name:'Camera Giám Sát WiFi 360°',icon:'📹',minPrice:35,maxPrice:150,tier:'fashion',recyclePoints:50,weight:39},
  {id:'m_smart_bulb_set',name:'Bộ Đèn LED Thông Minh Philips Hue',icon:'💡',minPrice:40,maxPrice:180,tier:'fashion',recyclePoints:50,weight:38},
  {id:'m_water_filter',name:'Máy Lọc Nước RO Kangaroo',icon:'🚰',minPrice:100,maxPrice:380,tier:'fashion',recyclePoints:50,weight:31},
  {id:'m_bread_maker',name:'Máy Làm Bánh Mì Tự Động',icon:'🍞',minPrice:60,maxPrice:180,tier:'fashion',recyclePoints:50,weight:37},
  {id:'m_blender_ninja',name:'Máy Xay Sinh Tố Ninja Pro',icon:'🥤',minPrice:80,maxPrice:260,tier:'fashion',recyclePoints:50,weight:34},
  {id:'m_wine_cooler',name:'Tủ Mát Mini Rượu Vang 12 chai',icon:'🍷',minPrice:100,maxPrice:370,tier:'fashion',recyclePoints:50,weight:31},
  {id:'m_projector_mini',name:'Máy Chiếu Mini Portable XGIMI',icon:'📽️',minPrice:120,maxPrice:420,tier:'fashion',recyclePoints:50,weight:30},
  {id:'m_air_humidifier',name:'Máy Tạo Độ Ẩm & Tinh Dầu',icon:'🌫️',minPrice:45,maxPrice:200,tier:'fashion',recyclePoints:50,weight:38},
  {id:'m_standing_desk',name:'Bàn Đứng Điều Chỉnh Độ Cao',icon:'🪑',minPrice:150,maxPrice:490,tier:'fashion',recyclePoints:50,weight:28},
  // 🏋️ Thể thao & Sức khỏe
  {id:'m_treadmill_fold',name:'Máy Chạy Bộ Gấp Gọn',icon:'🏃',minPrice:199,maxPrice:499,tier:'fashion',recyclePoints:50,weight:28},
  {id:'m_dumbbell_adj',name:'Tạ Tay Điều Chỉnh 2-24kg',icon:'🏋️',minPrice:80,maxPrice:280,tier:'fashion',recyclePoints:50,weight:34},
  {id:'m_massage_gun',name:'Súng Massage Theragun Mini',icon:'💪',minPrice:80,maxPrice:300,tier:'fashion',recyclePoints:50,weight:33},
  {id:'m_yoga_mat_pro',name:'Thảm Yoga Cork Tự Nhiên',icon:'🧘',minPrice:40,maxPrice:160,tier:'fashion',recyclePoints:50,weight:39},
  {id:'m_jump_rope_smart',name:'Dây Nhảy Thông Minh Đếm Vòng',icon:'🪢',minPrice:25,maxPrice:100,tier:'fashion',recyclePoints:50,weight:43},
  {id:'m_pull_up_bar',name:'Thanh Xà Đơn Cửa Đa Năng',icon:'🤸',minPrice:30,maxPrice:120,tier:'fashion',recyclePoints:50,weight:42},
  // 🎵 Âm nhạc & Giải trí
  {id:'m_guitar_yamaha',name:'Đàn Guitar Acoustic Yamaha F310',icon:'🎸',minPrice:90,maxPrice:350,tier:'fashion',recyclePoints:50,weight:33},
  {id:'m_ukulele',name:'Đàn Ukulele Concert Koa',icon:'🎵',minPrice:40,maxPrice:160,tier:'fashion',recyclePoints:50,weight:39},
  {id:'m_gaming_headset',name:'Tai Nghe Gaming Razer Kraken',icon:'🎮',minPrice:60,maxPrice:250,tier:'fashion',recyclePoints:50,weight:35},
  {id:'m_board_game_catan',name:'Board Game Catan / Pandemic',icon:'🎲',minPrice:30,maxPrice:120,tier:'fashion',recyclePoints:50,weight:43},
  {id:'m_lego_technic',name:'Bộ LEGO Technic / Architecture',icon:'🧱',minPrice:60,maxPrice:300,tier:'fashion',recyclePoints:50,weight:34},
  {id:'m_telescope',name:'Kính Thiên Văn Ngắm Sao 70mm',icon:'🔭',minPrice:70,maxPrice:300,tier:'fashion',recyclePoints:50,weight:34},
  // 👗 Thời trang & Phụ kiện
  {id:'m_sunglasses_rb',name:'Kính Mắt Ray-Ban Aviator',icon:'🕶️',minPrice:100,maxPrice:260,tier:'fashion',recyclePoints:50,weight:35},
  {id:'m_backpack_north',name:'Balo The North Face 30L',icon:'🎒',minPrice:80,maxPrice:220,tier:'fashion',recyclePoints:50,weight:37},
  {id:'m_wallet_leather',name:'Ví Da Thật Handcraft',icon:'👛',minPrice:35,maxPrice:180,tier:'fashion',recyclePoints:50,weight:39},
  {id:'m_cap_limited',name:'Mũ Snapback Limited Edition',icon:'🧢',minPrice:25,maxPrice:130,tier:'fashion',recyclePoints:50,weight:42},
  {id:'m_scarf_cashmere',name:'Khăn Choàng Cashmere',icon:'🧣',minPrice:50,maxPrice:200,tier:'fashion',recyclePoints:50,weight:37},
  // 🐾 Đặc biệt & Thú vị
  {id:'m_pet_feeder',name:'Máy Cho Thú Cưng Ăn Tự Động',icon:'🐾',minPrice:45,maxPrice:180,tier:'fashion',recyclePoints:50,weight:38},
  {id:'m_electric_tooth',name:'Bàn Chải Điện Oral-B iO Series',icon:'🦷',minPrice:50,maxPrice:200,tier:'fashion',recyclePoints:50,weight:38},
  {id:'m_action_cam',name:'Camera Hành Trình GoPro Hero 12',icon:'🎥',minPrice:180,maxPrice:499,tier:'fashion',recyclePoints:50,weight:29},
  // ==========================================
  // Tier 2: Đồ Dùng Cá Nhân - 10 recycle pts
  {id:'m_lamp',name:'Đèn Bàn Học',icon:'🪔',minPrice:15,maxPrice:50,tier:'personal',recyclePoints:10,weight:55},
  {id:'m_bottle',name:'Bình Giữ Nhiệt Yeti',icon:'🧊',minPrice:20,maxPrice:50,tier:'personal',recyclePoints:10,weight:55},
  {id:'m_tshirt',name:'Áo Thun Cotton',icon:'👕',minPrice:10,maxPrice:30,tier:'personal',recyclePoints:10,weight:60},
  {id:'m_sunscreen',name:'Kem Chống Nắng',icon:'🧴',minPrice:10,maxPrice:30,tier:'personal',recyclePoints:10,weight:60},
  {id:'m_pillow',name:'Gối Ngủ Cao Cấp',icon:'🪣',minPrice:10,maxPrice:25,tier:'personal',recyclePoints:10,weight:62},
  {id:'m_plant',name:'Cây Cảnh Để Bàn',icon:'🪴',minPrice:5,maxPrice:20,tier:'personal',recyclePoints:10,weight:65},
  {id:'m_book',name:'Sách',icon:'📚',minPrice:10,maxPrice:25,tier:'personal',recyclePoints:10,weight:62},
  {id:'m_umbrella',name:'Ô Che Mưa',icon:'☂️',minPrice:5,maxPrice:15,tier:'personal',recyclePoints:10,weight:65},
  {id:'m_mouse',name:'Chuột Máy Tính',icon:'🖱️',minPrice:5,maxPrice:15,tier:'personal',recyclePoints:10,weight:65},
  {id:'m_phonecase',name:'Ốp Lưng Điện Thoại',icon:'📵',minPrice:3,maxPrice:10,tier:'personal',recyclePoints:10,weight:70},
  // Tier 1: Vật Dụng Nhỏ - 1 recycle pt
  {id:'m_cup',name:'Cốc Sứ',icon:'☕',minPrice:2,maxPrice:5,tier:'small',recyclePoints:1,weight:80},
  {id:'m_towel',name:'Khăn Mặt',icon:'🧻',minPrice:1,maxPrice:3,tier:'small',recyclePoints:1,weight:85},
  {id:'m_notebook',name:'Sổ Tay',icon:'📓',minPrice:1,maxPrice:3,tier:'small',recyclePoints:1,weight:85},
  {id:'m_toothbrush',name:'Bàn Chải Đánh Răng',icon:'🪥',minPrice:1,maxPrice:2.5,tier:'small',recyclePoints:1,weight:88},
  {id:'m_keychain',name:'Móc Khóa',icon:'🔑',minPrice:0.5,maxPrice:2,tier:'small',recyclePoints:1,weight:90},
  {id:'m_lighter',name:'Bật Lửa',icon:'🔥',minPrice:0.3,maxPrice:1,tier:'small',recyclePoints:1,weight:92},
  {id:'m_bag',name:'Túi Đi Chợ Tái Sử Dụng',icon:'👜',minPrice:0.5,maxPrice:1,tier:'small',recyclePoints:1,weight:92},
  {id:'m_pen',name:'Bút Bi',icon:'🖊️',minPrice:0.2,maxPrice:0.5,tier:'small',recyclePoints:1,weight:95},
  {id:'m_hairclip',name:'Kẹp Tóc',icon:'📎',minPrice:0.1,maxPrice:0.3,tier:'small',recyclePoints:1,weight:97},
  {id:'m_candy',name:'Một Viên Kẹo',icon:'🍬',minPrice:0.05,maxPrice:0.1,tier:'small',recyclePoints:1,weight:100},
];

const NORMAL_SELLERS = ['uyquyen.com ✅','nc.com ✅','batam.com ✅','shopvip.com ✅','luxury24.com ✅'];
const OTHER_SELLERS = ['???','ongtrum.com','bagia.com','dealroi.net','hàng_xách_tay','nguoiban_ẩn','mrx.shop','store99.com','deal_hot','bán_rẻ_vcl'];

const MARKET_CONFIG = {
  normal: { priceMult:3.0, chance:1.00, accent:'#4ade80', theme:'#1e3a2a', sellers:NORMAL_SELLERS, label:'Chợ Phổ Thông' },
  mid:    { priceMult:0.9, chance:0.57, accent:'#60a5fa', theme:'#1e2f4a', sellers:OTHER_SELLERS, label:'Chợ Giá Rẻ' },
  black:  { priceMult:0.67,chance:0.36, accent:'#f87171', theme:'#2a1a1a', sellers:OTHER_SELLERS, label:'Chợ Đen' },
};

let activeMarket = localStorage.getItem('ui_activeMarket')||'normal';
let mktCountdown = 60;
let buyerCountdown = 20;

function weightedRandomItem() {
  const totalWeight = MARKET_ITEMS.reduce((s,i)=>s+i.weight,0);
  let r = Math.random()*totalWeight;
  for (const item of MARKET_ITEMS) {
    r -= item.weight;
    if (r <= 0) return item;
  }
  return MARKET_ITEMS[MARKET_ITEMS.length-1];
}

function generateStock(marketType) {
  const cfg = MARKET_CONFIG[marketType];
  const stock = [];
  for (let i = 0; i < 50; i++) {
    const item = weightedRandomItem();
    const basePrice = item.minPrice + Math.random()*(item.maxPrice - item.minPrice);
    const price = basePrice * cfg.priceMult;
    const seller = cfg.sellers[Math.floor(Math.random()*cfg.sellers.length)];
    stock.push({ id: item.id+'_'+Date.now()+'_'+i, itemId: item.id, price, seller, bought:false });
  }
  return stock;
}

function restockAll() {
  G.marketStocks.normal = generateStock('normal');
  G.marketStocks.mid = generateStock('mid');
  G.marketStocks.black = generateStock('black');
  G.lastStockTime = Date.now();
  saveGame(false);
  if (document.getElementById('panel-market').classList.contains('active')) renderMarket();
}

function switchMarket(type) {
  activeMarket = type;
  localStorage.setItem('ui_activeMarket', type);
  document.querySelectorAll('.market-tab').forEach(t=>t.classList.remove('active'));
  document.getElementById('mtab-'+type).classList.add('active');
  renderMarket();
}

function renderMarket() {
  const container = document.getElementById('market-content');
  if (activeMarket === 'my') { renderMyListings(); return; }
  const cfg = MARKET_CONFIG[activeMarket];
  const stock = G.marketStocks[activeMarket] || [];
  const available = stock.filter(s=>!s.bought);

  container.innerHTML = `
    <div style="font-size:12px;color:#6b7280;margin-bottom:10px;padding:8px;background:#111827;border:1px solid #1f2937;border-radius:6px">
      ${cfg.label} — Giá x${cfg.priceMult} | Tỉ lệ nhận hàng: <span style="color:${cfg.accent}">${(cfg.chance*100).toFixed(0)}%</span> | Còn ${available.length}/50 món
    </div>
    <div class="market-items-grid" id="mkt-grid"></div>`;

  const grid = document.getElementById('mkt-grid');
  available.slice(0,50).forEach(stock_item => {
    const item = MARKET_ITEMS.find(i=>i.id===stock_item.itemId);
    if (!item) return;
    const canBuy = G.money >= stock_item.price;
    const invFull = G.inventory.length >= G.invMaxSlots;
    const div = document.createElement('div');
    div.className = 'mkt-card';
    div.style.borderColor = cfg.accent+'44';
    div.innerHTML = `
      <div class="mkt-img">${item.icon}</div>
      <div class="mkt-name">${item.name}</div>
      <div class="mkt-seller" style="color:${stock_item.seller.includes('✅')?'#4ade80':'#6b7280'}">${stock_item.seller}</div>
      <div class="mkt-price">${fmtPrice(stock_item.price)}</div>
      <div style="font-size:10px;color:#4b5563;margin-top:1px">Giá gốc: ${fmtPrice(item.minPrice)}–${fmtPrice(item.maxPrice)}</div>
      <div class="mkt-chance" style="color:${cfg.accent}">🎲 ${(cfg.chance*100).toFixed(0)}% nhận hàng</div>
      <div style="font-size:10px;color:#4b5563">♻️ ${item.recyclePoints} điểm tái chế</div>
      <button class="mkt-buy-btn" style="background:${cfg.theme};color:${cfg.accent};border-color:${cfg.accent}44"
        ${(!canBuy||invFull)?'disabled':''}
        onclick="buyMarketItem('${activeMarket}','${stock_item.id}')">
        ${invFull?'Kho đầy':!canBuy?'Thiếu '+fmtPrice(stock_item.price-G.money):'Mua'}
      </button>`;
    grid.appendChild(div);
  });

  if (available.length === 0) {
    container.innerHTML += `<div style="text-align:center;color:#374151;padding:30px;font-size:14px">Hết hàng! Chờ stock mới 🔄</div>`;
  }
}

function fmtPrice(n) {
  if (n < 0.1) return '$'+n.toFixed(3);
  if (n < 1) return '$'+n.toFixed(2);
  if (n < 1000) return '$'+n.toFixed(2);
  if (n < 1e6) return '$'+(n/1e3).toFixed(2)+'K';
  if (n < 1e9) return '$'+(n/1e6).toFixed(2)+'M';
  return '$'+(n/1e9).toFixed(2)+'B';
}

function buyMarketItem(marketType, stockId) {
  const stock = G.marketStocks[marketType];
  const idx = stock.findIndex(s=>s.id===stockId);
  if (idx===-1) return;
  const stock_item = stock[idx];
  const item = MARKET_ITEMS.find(i=>i.id===stock_item.itemId);
  if (!item) return;
  // Chợ đen: không đánh thuế, không bị cấm mua
  const isBlack = marketType === 'black';
  if (!isBlack && !taxCheckBanBeforeBuy()) return;
  if (G.money < stock_item.price) { showError('💸 Không đủ tiền!'); return; }
  if (G.inventory.length >= G.invMaxSlots) { showError('🎒 Kho đầy!'); return; }

  G.money -= stock_item.price;
  G.totalEarned -= 0; // buying cost

  const cfg = MARKET_CONFIG[marketType];
  const success = Math.random() < cfg.chance;

  if (success) {
    G.inventory.push({
      id: 'inv_'+Date.now()+'_'+Math.random().toString(36).slice(2),
      itemId: item.id, name: item.name, icon: item.icon,
      boughtPrice: stock_item.price, tier: item.tier,
      recyclePoints: item.recyclePoints,
      baseMinPrice: item.minPrice, baseMaxPrice: item.maxPrice,
    });
    stock[idx].bought = true;
    if (!isBlack) taxIssueBill(item.icon + ' ' + item.name, stock_item.price);
    showNotif(item.icon+' '+item.name+' → Kho!');
  } else {
    stock[idx].bought = true;
    showError('😢 Mua thất bại! Mất '+fmtPrice(stock_item.price));
  }

  updateUI(); saveGame(false);
  renderMarket();
  if (document.getElementById('panel-inventory').classList.contains('active')) renderInventory();
}

// ═══ MY LISTINGS ══════════════════════════════════════════════════
function renderMyListings() {
  const container = document.getElementById('market-content');
  const inv = G.inventory;

  let html = `<div style="font-size:14px;color:#fbbf24;font-weight:500;margin-bottom:12px">📦 Đăng bán vật phẩm của bạn</div>`;

  if (G.myListings.length > 0) {
    html += `<div style="margin-bottom:14px"><div style="font-size:13px;color:#6b7280;margin-bottom:8px">Đang treo bán (${G.myListings.length}):</div>`;
    G.myListings.forEach((l,idx) => {
      const item = MARKET_ITEMS.find(i=>i.id===l.itemId);
      const minP = l.baseMinPrice || (l.boughtPrice * 0.5) || 1;
      const maxP = l.baseMaxPrice || (l.boughtPrice * 2) || 2;
      const baseAvg = (minP + maxP) / 2;
      const priceMax = baseAvg <= 100 ? baseAvg * 2.0 : baseAvg * 1.5;
      const priceMin = Math.max(0.01, baseAvg * 0.1);
      const t = Math.max(0, Math.min(1, (l.price - priceMin) / (priceMax - priceMin)));
      const c = Math.log(0.95), end = Math.log(0.01), mid = Math.log(0.55);
      const b = 4*mid - 3*c - end, a = (end - c) - b;
      const buyChance = Math.max(1, Math.min(95, Math.round(Math.exp(a*t*t + b*t + c) * 100)));
      html += `<div class="listing-card">
        <div style="display:flex;align-items:center;gap:10px">
          <span style="font-size:24px">${l.icon}</span>
          <div style="flex:1">
            <div style="font-size:13px;color:#e2e8f0">${l.name}</div>
            <div style="font-size:12px;color:#6b7280">Chợ: ${MARKET_CONFIG[l.market].label}</div>
            <div style="font-size:12px;color:#fbbf24">Giá: ${fmtPrice(l.price)} | 🎲 ${buyChance.toFixed(0)}% bán được</div>
          </div>
          <button onclick="cancelListing(${idx})" style="padding:4px 10px;background:#3b1a1a;color:#f87171;border:1px solid #5a2a2a;border-radius:5px;cursor:pointer;font-size:11px">Hủy</button>
        </div>
      </div>`;
    });
    html += `</div>`;
  }

  if (inv.length === 0) {
    html += `<div style="text-align:center;color:#374151;padding:20px;font-size:13px">Kho trống, không có gì để bán</div>`;
  } else {
    html += `<div style="font-size:13px;color:#6b7280;margin-bottom:8px">Chọn vật phẩm để đăng bán:</div>
    <div class="market-items-grid">`;
    inv.forEach((invItem, iIdx) => {
      const item = MARKET_ITEMS.find(i=>i.id===invItem.itemId);
      const baseAvg = item
        ? (item.minPrice+item.maxPrice)/2
        : ((invItem.baseMinPrice||0) + (invItem.baseMaxPrice||invItem.boughtPrice||1)) / 2 || (invItem.boughtPrice||1);
      const priceCap = baseAvg <= 100 ? baseAvg * 2.0 : baseAvg * 1.5;
      const priceMin = Math.max(0.01, baseAvg * 0.1);
      const capLabel = baseAvg <= 100 ? '200%' : '150%';
      html += `<div class="mkt-card" style="border-color:#fbbf2444">
        <div class="mkt-img">${invItem.icon}</div>
        <div class="mkt-name">${invItem.name}</div>
        <div style="font-size:11px;color:#6b7280;margin-bottom:3px">Đã mua: ${fmtPrice(invItem.boughtPrice)}</div>
        <div style="font-size:11px;color:#4b5563;margin-bottom:2px">Gợi ý: ${fmtPrice(baseAvg)}</div>
        <div style="font-size:10px;color:#374151;margin-bottom:5px">Min: ${fmtPrice(priceMin)} | Max: ${fmtPrice(priceCap)} (${capLabel})</div>
        <div style="display:flex;gap:4px;margin-bottom:5px;align-items:center">
          <span style="font-size:11px;color:#6b7280">Giá:</span>
          <input type="number" id="price_${iIdx}" value="${baseAvg.toFixed(2)}" step="0.01" min="${priceMin.toFixed(2)}" max="${priceCap.toFixed(2)}"
            style="flex:1;padding:3px 5px;background:#0d1117;border:1px solid #374151;border-radius:4px;color:#e2e8f0;font-size:11px">
        </div>
        <select id="mkt_${iIdx}" style="width:100%;padding:4px;background:#0d1117;border:1px solid #374151;border-radius:4px;color:#e2e8f0;font-size:11px;margin-bottom:5px">
          <option value="normal">🏬 Chợ Phổ Thông</option>
          <option value="mid">🛒 Chợ Giá Rẻ</option>
          <option value="black">🌑 Chợ Đen</option>
        </select>
        <button class="mkt-buy-btn" style="background:#2a2a1e;color:#fbbf24;border-color:#fbbf2444"
          onclick="listForSale(${iIdx})">Đăng Bán</button>
      </div>`;
    });
    html += `</div>`;
  }

  container.innerHTML = html;
}

function listForSale(invIdx) {
  const invItem = G.inventory[invIdx];
  if (!invItem) return;
  const priceEl = document.getElementById('price_'+invIdx);
  const mktEl = document.getElementById('mkt_'+invIdx);
  const price = parseFloat(priceEl.value);
  if (isNaN(price) || price <= 0) { showError('⚠️ Giá không hợp lệ!'); return; }

  // Price cap: ≤$100 base → max 200%, >$100 base → max 150%
  const item = MARKET_ITEMS.find(i=>i.id===invItem.itemId);
  const baseAvg = item
    ? (item.minPrice+item.maxPrice)/2
    : ((invItem.baseMinPrice||0) + (invItem.baseMaxPrice||invItem.boughtPrice||1)) / 2 || (invItem.boughtPrice||1);
  const priceCap = baseAvg <= 100 ? baseAvg * 2.0 : baseAvg * 1.5;
  const priceMin = baseAvg * 0.1;
  if (price > priceCap) {
    showError(`⚠️ Giá tối đa: ${fmtPrice(priceCap)} (${baseAvg<=100?'200%':'150%'} giá trị)`);
    priceEl.value = priceCap.toFixed(2);
    return;
  }
  if (price < priceMin) {
    showError(`⚠️ Giá tối thiểu: ${fmtPrice(priceMin)} (10% giá trị)`);
    priceEl.value = priceMin.toFixed(2);
    return;
  }

  const market = mktEl.value;

  G.myListings.push({
    invId: invItem.id, itemId: invItem.itemId, name: invItem.name, icon: invItem.icon,
    price, market, boughtPrice: invItem.boughtPrice,
    baseMinPrice: invItem.baseMinPrice, baseMaxPrice: invItem.baseMaxPrice,
  });
  G.inventory.splice(invIdx, 1);
  showNotif('📦 Đã đăng bán '+invItem.name);
  saveGame(false); renderMyListings();
}

function cancelListing(idx) {
  const l = G.myListings[idx];
  if (!l) return;
  if (G.inventory.length >= G.invMaxSlots) { showError('🎒 Kho đầy! Không thể hủy.'); return; }
  G.inventory.push({
    id: l.invId, itemId: l.itemId, name: l.name, icon: l.icon,
    boughtPrice: l.boughtPrice, tier: '',
    recyclePoints: MARKET_ITEMS.find(i=>i.id===l.itemId)?.recyclePoints||1,
    baseMinPrice: l.baseMinPrice, baseMaxPrice: l.baseMaxPrice,
  });
  G.myListings.splice(idx, 1);
  showNotif('↩️ Đã hủy đăng bán');
  saveGame(false); renderMyListings();
}

function processListingSales() {
  if (!G.myListings.length) return;
  const toRemove = [];
  G.myListings.forEach((l,idx) => {
    // Dùng baseMinPrice/baseMaxPrice đã lưu khi niêm yết để đồng nhất với UI
    const minP = l.baseMinPrice || (l.boughtPrice * 0.5) || 1;
    const maxP = l.baseMaxPrice || (l.boughtPrice * 2) || 2;
    const baseAvg = (minP + maxP) / 2;
    // priceMax phải khớp đúng với UI: baseAvg <= 100 → x2, còn lại → x1.5
    const priceMax = baseAvg <= 100 ? baseAvg * 2.0 : baseAvg * 1.5;
    // Chuẩn hóa giá người chơi đặt vào [0, 1]: 0 = giá min, 1 = giá max
    const priceMin = Math.max(0.01, baseAvg * 0.1);
    const t = Math.max(0, Math.min(1, (l.price - priceMin) / (priceMax - priceMin)));
    // Nội suy tuyến tính trên thang log: t=0 → 95%, t=0.5 (giá tb) → 55%, t=1 → 1%
    // log(0.95)=−0.051, log(0.55)=−0.598, log(0.01)=−4.605
    // Dùng hàm bậc hai trên thang log để khớp 3 điểm neo
    // ln(chance) = a*t^2 + b*t + c
    // c = ln(0.95), a+b+c = ln(0.01), 0.25a+0.5b+c = ln(0.55)
    const c = Math.log(0.95);                    // −0.0513
    const end = Math.log(0.01);                  // −4.6052
    const mid = Math.log(0.55);                  // −0.5978
    // 0.25a + 0.5b = mid - c  →  (1)
    // a + b = end - c          →  (2)
    // Từ (1)×4: a + 2b = 4*(mid-c)
    // Trừ (2): b = 4*(mid-c) - (end-c) = 4*mid - 3*c - end
    const b = 4*mid - 3*c - end;                 // ≈ −3.876
    const a = (end - c) - b;                     // ≈ −0.682
    const lnChance = a*t*t + b*t + c;
    const buyChance = Math.max(0.01, Math.min(0.95, Math.exp(lnChance)));
    if (Math.random() < buyChance) {
      G.money += l.price;
      G.totalEarned += l.price;
      showNotif('💰 Bán được: '+l.name+' +'+fmtPrice(l.price));
      toRemove.push(idx);
    }
  });
  for (let i = toRemove.length-1; i>=0; i--) G.myListings.splice(toRemove[i],1);
  if (toRemove.length) { saveGame(false); if (document.getElementById('panel-market').classList.contains('active')&&activeMarket==='my') renderMyListings(); }
}

/* ┌─────────────────────────────────────────────────────────────────────────┐
   │  MODULE 07 · INVENTORY  —  kho đồ · recycle · quickSell               │
   └─────────────────────────────────────────────────────────────────────────┘ */
// ═══ INVENTORY ════════════════════════════════════════════════════
function renderInventory() {
  const grid = document.getElementById('inv-grid');
  const emptyEl = document.getElementById('inv-empty');
  document.getElementById('inv-used').textContent = G.inventory.length;
  document.getElementById('inv-max').textContent = G.invMaxSlots;
  document.getElementById('inv-rp').textContent = G.recyclePoints;

  grid.innerHTML = '';
  if (G.inventory.length === 0) { emptyEl.style.display='block'; return; }
  emptyEl.style.display = 'none';

  G.inventory.forEach((invItem, idx) => {
    const item = MARKET_ITEMS.find(i=>i.id===invItem.itemId);
    const tierColors = {super:'#a78bfa',tech:'#60a5fa',fashion:'#fbbf24',personal:'#4ade80',small:'#6b7280'};
    const tierNames = {super:'Siêu Tài Sản',tech:'Công Nghệ',fashion:'Thời Trang',personal:'Cá Nhân',small:'Nhỏ'};
    const tc = tierColors[invItem.tier]||'#6b7280';
    const tn = tierNames[invItem.tier]||invItem.tier;
    const baseAvg = item
      ? (item.minPrice+item.maxPrice)/2
      : ((invItem.baseMinPrice||0) + (invItem.baseMaxPrice||invItem.boughtPrice||1)) / 2 || (invItem.boughtPrice||1);
    const div = document.createElement('div');
    div.className = 'inv-card';
    div.style.borderColor = tc+'44';
    div.innerHTML = `
      <div class="inv-img">${invItem.icon}</div>
      <div class="inv-name">${invItem.name}</div>
      <div class="inv-tier" style="background:${tc}22;color:${tc}">${tn}</div>
      <div style="font-size:10px;color:#6b7280;margin-bottom:5px">Đã mua: ${fmtPrice(invItem.boughtPrice)}</div>
      <div class="inv-btns">
        <button onclick="recycleItem(${idx})" style="background:#1e3a2a;color:#4ade80;border-color:#2d5a3f" title="Tái chế">♻️ +${invItem.recyclePoints}pt</button>
        <button onclick="quickSell(${idx},${baseAvg})" style="background:#3b1a1a;color:#f87171;border-color:#5a2a2a" title="Bán nhanh">💵</button>
      </div>`;
    grid.appendChild(div);
  });
}

let pendingRecycleIdx = null;

function recycleItem(idx) {
  const invItem = G.inventory[idx];
  if (!invItem) return;
  const item = MARKET_ITEMS.find(i=>i.id===invItem.itemId);
  const baseAvg = item
    ? (item.minPrice+item.maxPrice)/2
    : ((invItem.baseMinPrice||0) + (invItem.baseMaxPrice||invItem.boughtPrice||1)) / 2 || (invItem.boughtPrice||1);
  if (baseAvg > 100) {
    // Show confirm modal
    pendingRecycleIdx = idx;
    document.getElementById('rcmod-icon').textContent = invItem.icon;
    document.getElementById('rcmod-name').textContent = invItem.name;
    document.getElementById('rcmod-price').textContent = 'Giá trị khoảng: '+fmtPrice(baseAvg);
    document.getElementById('rcmod-pts').textContent = '+'+invItem.recyclePoints+' điểm tái chế';
    document.getElementById('recycle-modal').style.display = 'flex';
  } else {
    doRecycle(idx);
  }
}

function confirmRecycle() {
  if (pendingRecycleIdx === null) return;
  doRecycle(pendingRecycleIdx);
  closeRecycleModal();
}

function closeRecycleModal() {
  document.getElementById('recycle-modal').style.display = 'none';
  pendingRecycleIdx = null;
}

function doRecycle(idx) {
  const invItem = G.inventory[idx];
  if (!invItem) return;
  const boost = (G.matBonuses&&G.matBonuses.recycleBoost)||1;
  const pts = Math.round(invItem.recyclePoints * boost);
  G.recyclePoints += pts;
  G.inventory.splice(idx, 1);
  showNotif('♻️ Tái chế! +'+pts+(boost>1?' (×'+boost.toFixed(1)+'boost)':'')+' điểm');
  saveGame(false); renderInventory();
  if (document.getElementById('panel-rshop').classList.contains('active')) renderRShop();
}

function quickSell(idx, baseAvg) {
  const invItem = G.inventory[idx];
  if (!invItem) return;
  const sellPrice = baseAvg * 0.5;
  G.money += sellPrice;
  G.totalEarned += sellPrice;
  G.inventory.splice(idx, 1);
  showNotif('💵 Bán nhanh: +'+fmtPrice(sellPrice));
  updateUI(); saveGame(false); renderInventory();
}

function expandInventory() {
  if (G.money < 700) { showError('💸 Cần $700 để mở thêm 10 ô kho!'); return; }
  G.money -= 700; G.invMaxSlots += 10;
  showNotif('🎒 Kho mở rộng → '+G.invMaxSlots+' slots!');
  updateUI(); saveGame(false); renderInventory();
}

// ═══ RECYCLE SHOP ═════════════════════════════════════════════════
const RECYCLE_SHOP_ITEMS = [
  // Xu - tỉ lệ: 10 xu = $1, mua 10xu cần 50pt (1pt~$0.02)
  {id:'rs_xu10',   name:'10 Xu',          icon:'🪙',  cost:50,      desc:'10 xu vào ví (~$1)'},
  {id:'rs_xu100',  name:'100 Xu',          icon:'🪙🪙', cost:450,     desc:'100 xu vào ví (~$10)'},
  // Gold - 1 gold = $100, mua cần 8000pt (1pt~$0.012)
  {id:'rs_gold1',  name:'1 Gold',          icon:'🥇',  cost:8000,    desc:'1 Gold vào ví (~$100)'},
  // Diamond - 1 diamond = $1,000, mua cần 120,000pt
  {id:'rs_diamond1',name:'1 Diamond',      icon:'💎',  cost:120000,  desc:'1 Diamond vào ví (~$1,000)'},
  // Kho - tiện ích thuần, giá vừa phải
  {id:'rs_inv10',  name:'+10 Ô Kho',       icon:'🎒',  cost:3000,    desc:'Mở thêm 10 ô kho đồ'},
  // Cash - đắt cực kỳ, lỗ so với mua xu/gold để tránh lạm phát
  {id:'rs_money10',name:'$10 Cash',        icon:'💵',  cost:2000,    desc:'Nhận $10 tiền mặt (tỉ lệ thấp)'},
  {id:'rs_money100',name:'$100 Cash',      icon:'💵💵', cost:25000,   desc:'Nhận $100 tiền mặt (tỉ lệ thấp)'},
  {id:'rs_money1k', name:'$1,000 Cash',    icon:'💴',  cost:300000,  desc:'Nhận $1,000 tiền mặt (tỉ lệ thấp)'},
  {id:'rs_money10k',name:'$10,000 Cash',   icon:'💶',  cost:4000000, desc:'Nhận $10,000 tiền mặt (tỉ lệ rất thấp)'},
];

function renderRShop() {
  document.getElementById('rshop-rp').textContent = G.recyclePoints;
  const grid = document.getElementById('rshop-grid');
  grid.innerHTML = '';
  RECYCLE_SHOP_ITEMS.forEach(item => {
    const canBuy = G.recyclePoints >= item.cost;
    const div = document.createElement('div');
    div.className = 'rshop-card';
    div.innerHTML = `
      <div class="rshop-icon">${item.icon}</div>
      <div class="rshop-name">${item.name}</div>
      <div style="font-size:12px;color:#6b7280;margin-bottom:5px">${item.desc}</div>
      <div class="rshop-cost">♻️ ${item.cost.toLocaleString()} điểm</div>
      <button class="rshop-btn" ${!canBuy?'disabled':''} onclick="buyRShopItem('${item.id}')">
        ${canBuy?'Đổi':'Cần '+(item.cost-G.recyclePoints)+' điểm nữa'}
      </button>`;
    grid.appendChild(div);
  });
}

// buyRShopItem(id) — spend Recycle Points to redeem a reward.
// Rewards: Xu, Gold, Diamond, extra inventory slots, or direct cash.
// Cash rewards are deliberately bad value to prevent inflation.
function buyRShopItem(id) {
  const item = RECYCLE_SHOP_ITEMS.find(i=>i.id===id);
  if (!item || G.recyclePoints < item.cost) return;
  G.recyclePoints -= item.cost;
  if      (id==='rs_xu10')     { G.wallet.xu=(G.wallet.xu||0)+10;   showNotif('🪙 +10 Xu!'); }
  else if (id==='rs_xu100')    { G.wallet.xu=(G.wallet.xu||0)+100;  showNotif('🪙 +100 Xu!'); }
  else if (id==='rs_gold1')    { G.wallet.gold=(G.wallet.gold||0)+1; showNotif('🥇 +1 Gold!'); }
  else if (id==='rs_diamond1') { G.wallet.diamond=(G.wallet.diamond||0)+1; showNotif('💎 +1 Diamond!'); }
  else if (id==='rs_inv10')    { G.invMaxSlots+=10; showNotif('🎒 Kho +10 → '+G.invMaxSlots); }
  else if (id==='rs_money10')  { G.money+=10;    G.totalEarned+=10;    showNotif('💵 +$10!'); }
  else if (id==='rs_money100') { G.money+=100;   G.totalEarned+=100;   showNotif('💵 +$100!'); }
  else if (id==='rs_money1k')  { G.money+=1000;  G.totalEarned+=1000;  showNotif('💵 +$1,000!'); }
  else if (id==='rs_money10k') { G.money+=10000; G.totalEarned+=10000; showNotif('💵 +$10,000!'); }
  updateUI(); saveGame(false); renderRShop();
}

function convertRPtoDollar() {
  if (!G.recyclePoints) { showError('Không có điểm tái chế!'); return; }
  const earned = G.recyclePoints;
  G.money += earned; G.totalEarned += earned;
  G.recyclePoints = 0;
  showNotif('💵 Đổi '+earned+' điểm → $'+earned);
  updateUI(); saveGame(false); renderRShop();
}

/* ┌─────────────────────────────────────────────────────────────────────────┐
   │  MODULE 08 · VALUE SYSTEM  —  multiplier growth · VIP bundles          │
   └─────────────────────────────────────────────────────────────────────────┘ */
// ═══ MARKET TIMERS ════════════════════════════════════════════════
// Initial stock if empty
if (!G.marketStocks.normal.length) restockAll();

// ── Market timers ─────────────────────────────────────────────────────────
// Two parallel countdown timers drive the market simulation:
//   mktCountdown  (60 s) — adds 10 new items to each market, trims to 50 max
//   buyerCountdown (20 s) — NPC buyers auto-purchase from the player's listings
// Both counters are displayed live in the Market panel UI.
setInterval(() => {
  mktCountdown--;
  buyerCountdown--;

  if (mktCountdown <= 0) {
    // Add 10 items to each market
    ['normal','mid','black'].forEach(type => {
      const cfg = MARKET_CONFIG[type];
      for (let i=0;i<10;i++) {
        const item = weightedRandomItem();
        const basePrice = item.minPrice + Math.random()*(item.maxPrice - item.minPrice);
        const price = basePrice * cfg.priceMult;
        const sellers = cfg.sellers;
        const seller = sellers[Math.floor(Math.random()*sellers.length)];
        G.marketStocks[type].push({ id:item.id+'_'+Date.now()+'_'+i, itemId:item.id, price, seller, bought:false });
      }
      // Trim to max 50
      const avail = G.marketStocks[type].filter(s=>!s.bought);
      if (avail.length > 50) {
        let toRemove = avail.length - 50;
        for (let j=0;j<G.marketStocks[type].length&&toRemove>0;j++) {
          if (!G.marketStocks[type][j].bought) { G.marketStocks[type].splice(j,1); j--; toRemove--; }
        }
      }
    });
    mktCountdown = 60;
    saveGame(false);
    if (document.getElementById('panel-market').classList.contains('active')&&activeMarket!=='my') renderMarket();
  }

  if (buyerCountdown <= 0) {
    processListingSales();
    buyerCountdown = 20;
  }

  const ctEl = document.getElementById('mkt-countdown');
  const btEl = document.getElementById('mkt-buyer-countdown');
  if (ctEl) ctEl.textContent = mktCountdown+'s';
  if (btEl) btEl.textContent = buyerCountdown+'s';
}, 1000);

// [PERF] Old 500ms money loop removed — replaced by RAF _gameLoop above
setInterval(()=>saveGame(false), 15000);


// ═══ VIP SHOP ═════════════════════════════════════════════════════
// One-time purchasable bundles that give permanent advantages.
// Each bundle can only be bought once (tracked in G.boughtBundles[]).
// Prime:      +1 slot, unlock next 2 tiers
// Contraband: +4 slots, unlock next 3 tiers, +20 inventory slots
const VIP_BUNDLES = [
  {
    id: 'prime',
    name: 'Prime Bundle',
    icon: '⭐',
    price: 799,
    color: '#a78bfa',
    theme: '#1e1a3a',
    border: '#7c3aed',
    badge: 'PHỔ BIẾN',
    badgeColor: '#7c3aed',
    perks: [
      { icon: '🔧', text: '+1 Slot máy Base' },
      { icon: '🔓', text: 'Unlock ngay 2 Tier tiếp theo' },
    ],
    desc: 'Gói khởi đầu hoàn hảo cho người mới chơi.',
  },
  {
    id: 'contraband',
    name: 'Contraband Bundle',
    icon: '💀',
    price: 1999,
    color: '#f87171',
    theme: '#2a1a1a',
    border: '#dc2626',
    badge: 'GIÁ TRỊ NHẤT',
    badgeColor: '#dc2626',
    perks: [
      { icon: '🔧', text: '+4 Slot máy Base' },
      { icon: '🔓', text: 'Unlock ngay 3 Tier tiếp theo' },
      { icon: '🎒', text: '+20 ô Kho đồ' },
    ],
    desc: 'Gói siêu giá trị, bứt phá nhanh chóng.',
  },
];

function renderVipShop() {
  const container = document.getElementById('vip-bundles');
  container.innerHTML = '';
  VIP_BUNDLES.forEach(bundle => {
    const canBuy = G.money >= bundle.price;
    const bought = (G.boughtBundles||[]).includes(bundle.id);
    const div = document.createElement('div');
    div.style.cssText = `background:${bundle.theme};border:1px solid ${bundle.border}66;border-radius:13px;padding:20px;margin-bottom:14px;position:relative;overflow:hidden`;
    div.innerHTML = `
      <div style="position:absolute;top:12px;right:12px;background:${bundle.badgeColor};color:#fff;font-size:10px;font-weight:700;padding:3px 10px;border-radius:20px;letter-spacing:0.5px">${bundle.badge}</div>
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">
        <div style="font-size:40px">${bundle.icon}</div>
        <div>
          <div style="font-size:18px;font-weight:700;color:${bundle.color}">${bundle.name}</div>
          <div style="font-size:13px;color:#6b7280;margin-top:2px">${bundle.desc}</div>
        </div>
      </div>
      <div style="margin-bottom:14px">
        ${bundle.perks.map(p=>`
          <div style="display:flex;align-items:center;gap:8px;padding:7px 0;border-bottom:1px solid ${bundle.border}22">
            <span style="font-size:18px">${p.icon}</span>
            <span style="font-size:14px;color:#e2e8f0">${p.text}</span>
          </div>`).join('')}
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
        <div>
          <div style="font-size:22px;font-weight:700;color:${bundle.color}">$${bundle.price.toLocaleString()}</div>
          ${!canBuy&&!bought?`<div style="font-size:12px;color:#4b5563">Cần thêm ${fmt(bundle.price-G.money)}</div>`:''}
        </div>
        <button onclick="buyVipBundle('${bundle.id}')" ${bought||!canBuy?'disabled':''}
          style="padding:10px 28px;font-size:15px;font-weight:600;border-radius:8px;cursor:pointer;border:1px solid ${bundle.border};
          background:${bought?'#1f2937':canBuy?bundle.theme:'#111827'};
          color:${bought?'#4b5563':canBuy?bundle.color:'#374151'};
          ${(!canBuy||bought)?'opacity:0.5;cursor:not-allowed':''}">
          ${bought?'✅ Đã mua':canBuy?'🛒 Mua Ngay':'Chưa đủ tiền'}
        </button>
      </div>`;
    container.appendChild(div);
  });
}

function buyVipBundle(id) {
  const bundle = VIP_BUNDLES.find(b=>b.id===id);
  if (!bundle) return;
  if (!G.boughtBundles) G.boughtBundles = [];
  if (G.boughtBundles.includes(id)) { showError('⚠️ Đã mua bundle này rồi!'); return; }
  if (!taxCheckBanBeforeBuy()) return;
  if (G.money < bundle.price) { showError('💸 Không đủ tiền!'); return; }

  G.money -= bundle.price;
  taxIssueBill('👑 ' + bundle.name, bundle.price);

  if (id === 'prime') {
    // +1 base slot
    G.ownedSlots += 1;
    while (G.slots.length < G.ownedSlots) G.slots.push(null);
    // unlock next 2 tiers
    const maxUnlocked = G.unlockedTiers.length ? Math.max(...G.unlockedTiers) : 0;
    for (let t = maxUnlocked+1; t <= maxUnlocked+2 && t <= 10; t++) {
      if (!G.unlockedTiers.includes(t)) G.unlockedTiers.push(t);
    }
    showNotif('⭐ Prime Bundle! +1 slot, 2 tiers mở!');
  }

  if (id === 'contraband') {
    // +4 base slots
    G.ownedSlots += 4;
    while (G.slots.length < G.ownedSlots) G.slots.push(null);
    // unlock next 3 tiers
    const maxUnlocked = G.unlockedTiers.length ? Math.max(...G.unlockedTiers) : 0;
    for (let t = maxUnlocked+1; t <= maxUnlocked+3 && t <= 10; t++) {
      if (!G.unlockedTiers.includes(t)) G.unlockedTiers.push(t);
    }
    // +20 inventory slots
    G.invMaxSlots += 20;
    showNotif('💀 Contraband Bundle! +4 slots, 3 tiers, +20 kho!');
  }

  G.boughtBundles.push(id);
  updateUI(); saveGame(false);
  renderVipShop();
  renderSlots(); renderShopTabs();
}

/* ┌─────────────────────────────────────────────────────────────────────────┐
   │  MODULE 09 · TERMINAL  —  underground vendors · commands · internet     │
   └─────────────────────────────────────────────────────────────────────────┘ */
// ═══ COMPUTER TERMINAL ════════════════════════════════════════════

// ── Underground Vendor pools ──────────────────────────────────────────────
// Vendors are darkweb sellers accessible via the Terminal.
// Players connect with: call_to(vendor_host)
// Then use: catalog / buy [n] / bargain
//
// Vendors are unlocked progressively as the player installs OS updates:
//   v2 (default) : BASE only
//   v3 update    : + EXTRA (5 more)
//   v4 update    : + V4 (5 more)
//   v5 update    : + V5 (5 more) → total 20 vendors at max OS
//
// Each vendor object: { host, alias, greeting, mood }
//   mood affects greeting personality but has no mechanical effect.
// Base vendors (always available)
const UNDERGROUND_VENDORS_BASE = [
  { host:'gg.com',         alias:'G_GHOST',     greeting:'yo... tao đây. mày tìm hàng gì?',                                              mood:'chill' },
  { host:'hacker.com',     alias:'H4CK3R_X',    greeting:'>>> kết nối bảo mật... xác minh danh tính... OK. tao có hàng xịn.',             mood:'paranoid' },
  { host:'darknet.onion',  alias:'SHADOW_MAN',  greeting:'...ai đó đang nghe không? Oke. tao có nhiều thứ hay lắm.',                      mood:'nervous' },
  { host:'mrx.shop',       alias:'MR_X',        greeting:'Chào khách hàng thân thiết. Catalog của tao đây.',                              mood:'professional' },
  { host:'underworld.net', alias:'UND3RW0RLD',  greeting:'mày tìm được đây rồi hả. Oke, xem catalog đi.',                                mood:'suspicious' },
];
// Extra vendors — unlocked after Factory-OS update
const UNDERGROUND_VENDORS_EXTRA = [
  { host:'phantom.io',     alias:'PH4NTOM',     greeting:'...kết nối ẩn danh xác nhận. Tao có hàng hiếm.',                               mood:'paranoid' },
  { host:'z3ro.net',       alias:'Z3R0',        greeting:'0x00 HELLO. Tao bán đồ mà không ai khác có.',                                  mood:'chill' },
  { host:'blackrose.onion',alias:'BL4CK_R0SE',  greeting:'*tiếng gõ phím* Đây là kênh riêng. Mày may mắn tìm được.',                     mood:'nervous' },
  { host:'viper.dark',     alias:'V1PER',       greeting:'Ssss... mày vào được đây là mày đặc biệt. Catalog xịn hơn chợ thường nhiều.',  mood:'suspicious' },
  { host:'cipher.cc',      alias:'C1PHER',      greeting:'[ENC] Danh tính xác minh. Chào mừng đến kênh cấp cao.',                       mood:'professional' },
];
// Extra vendors — unlocked after Factory-OS v4.0
const UNDERGROUND_VENDORS_V4 = [
  { host:'neon.onion',     alias:'N30N',        greeting:'*đèn neon nhấp nháy* Mày tìm được tao rồi. Hàng tao là độc.',                  mood:'chill' },
  { host:'spectre.net',    alias:'SP3CTR3',     greeting:'>>> Danh tính: ẩn. Vị trí: không xác định. Hàng: đặc cấp.',                   mood:'paranoid' },
  { host:'ironsafe.dark',  alias:'1R0N_SAFE',   greeting:'Kho của tao khóa kỹ lắm. Mày gõ đúng cửa rồi đó.',                            mood:'professional' },
  { host:'wraith.io',      alias:'WR41TH',      greeting:'...mày nghe tiếng gì không? Đó là tao. Tao có hàng mày cần.',                  mood:'nervous' },
  { host:'nexus.shop',     alias:'N3XUS',       greeting:'[NEXUS] Node kết nối thành công. Catalog premium đang tải...',                 mood:'suspicious' },
];
// Extra vendors — unlocked after Factory-OS v5.0
const UNDERGROUND_VENDORS_V5 = [
  { host:'abyss.onion',    alias:'4BYSS',       greeting:'...mày đã đến tận đây. Tao ở đây từ lâu rồi. Hàng tao không ai sánh được.',   mood:'paranoid' },
  { host:'echo.dark',      alias:'3CH0',        greeting:'echo echo echo... Kết nối phản hồi xác nhận. Tao có thứ mày muốn.',            mood:'chill' },
  { host:'titanvault.net', alias:'T1TAN',       greeting:'[TITAN VAULT] Xác thực cấp OMEGA. Hàng tối thượng đang mở...',                mood:'professional' },
  { host:'phantom2.cc',    alias:'PH4NTX',      greeting:'Bản sao của phantom... không, tao khác hẳn. Hàng tao xịn hơn nhiều.',         mood:'suspicious' },
  { host:'deepcore.io',    alias:'D33PC0R3',    greeting:'[DEEPCORE] Tầng sâu nhất của mạng lưới. Chỉ người thật sự mới đến được đây.', mood:'nervous' },
];

// getUndergroundVendors() — returns the vendors available at the player's
// current OS version.  Higher OS = more vendors with rarer/cheaper goods.
//   v2 (default) : 5  vendors (BASE)
//   v3 update    : 10 vendors (+EXTRA)
//   v4 update    : 15 vendors (+V4)
//   v5 update    : 20 vendors (+V5)
function getUndergroundVendors() {
  if (G.osV5Updated) return [...UNDERGROUND_VENDORS_BASE, ...UNDERGROUND_VENDORS_EXTRA, ...UNDERGROUND_VENDORS_V4, ...UNDERGROUND_VENDORS_V5];
  if (G.osV4Updated) return [...UNDERGROUND_VENDORS_BASE, ...UNDERGROUND_VENDORS_EXTRA, ...UNDERGROUND_VENDORS_V4];
  if (G.osUpdated) return [...UNDERGROUND_VENDORS_BASE, ...UNDERGROUND_VENDORS_EXTRA];
  return UNDERGROUND_VENDORS_BASE;
}
// Keep backward compat
const UNDERGROUND_VENDORS = UNDERGROUND_VENDORS_BASE;

const BLACK_MARKET_GOODS = [
  { id:'bm_silver',    name:'Bạc nguyên khối 1kg',        icon:'🥈', basePrice:850,   desc:'Bạc 999 tinh khiết, không nguồn gốc.' },
  { id:'bm_gold_bar',  name:'Vàng thỏi 100g',             icon:'🏅', basePrice:6500,  desc:'Vàng 24K, không hóa đơn.' },
  { id:'bm_diamond',   name:'Kim cương thô 3 cara',        icon:'💎', basePrice:18000, desc:'Kim cương tự nhiên, chưa kiểm định.' },
  { id:'bm_ak47',      name:'Súng AK-47 (đầy đủ)',        icon:'🔫', basePrice:2200,  desc:'AK-47 7.62mm, kèm 2 băng đạn.' },
  { id:'bm_m4a1',      name:'Súng M4A1 (CQB build)',      icon:'🔫', basePrice:3100,  desc:'M4A1 5.56mm, rail system đầy đủ.' },
  { id:'bm_suppressor',name:'Nòng giảm thanh NATO',       icon:'🔩', basePrice:780,   desc:'Suppressor M13.5x1 LH, thép titan.' },
  { id:'bm_deagle',    name:'Desert Eagle .50AE',         icon:'🔫', basePrice:1800,  desc:'Deagle mark XIX, không số serie.' },
  { id:'bm_ammo_ak',   name:'Đạn AK 7.62x39 (200 viên)', icon:'📦', basePrice:520,   desc:'Đạn full metal jacket nhập khẩu.' },
  { id:'bm_scope',     name:'Kính ngắm Night Vision',     icon:'🔭', basePrice:4200,  desc:'Kính NV Gen 3, tầm nhìn 300m.' },
  { id:'bm_vest',      name:'Áo giáp chống đạn NIJ IV',  icon:'🦺', basePrice:1600,  desc:'Ceramic plate, chống đạn rifle.' },
  { id:'bm_crypto_hw', name:'Ví Crypto Hardware (hacked)',icon:'💾', basePrice:680,   desc:'Ledger đã unlock, không password.' },
  { id:'bm_gold_coin', name:'Xu vàng cổ (10 đồng)',       icon:'🪙', basePrice:3800,  desc:'Xu vàng thời thuộc địa, hiếm.' },
];

let terminalState = {
  initialized: false,
  connected: false,
  currentVendor: null,
  currentCatalog: [],
  bargainCount: 0,
  maxBargains: 3,
  history: [],
};

// ═══ BOSS CONVERSATION SYSTEM ════════════════════════════════════
const BOSSES = [
  {
    host:'bigshadow.onion', alias:'BIG_SHADOW', icon:'🦁', title:'Trùm Vũ Khí Đông Nam Á', mood:'arrogant',
    // intros[0] = lần đầu, intros[1] = lần 2, intros[2] = lần 3, intros[3+] = lần hay quay lại
    intros:[
      ['...ai gọi tao vậy?','À. Mày mò được số tao. Ấn tượng đấy.','Tao là BIG_SHADOW. Mày chắc đã nghe tên rồi.','Nói nhanh. Tao không có nhiều thời gian.'],
      ['À, lại mày.','Tao tưởng mày đã biến rồi.','Được rồi, mày cần gì lần này?'],
      ['Mày lại đây nữa.','Tao nhớ mày. Đừng tưởng tao quên mặt người.','Lần này nói thẳng đi, đừng vòng vo như lần trước.'],
      ['...mày lại.','Tao đang bận.','Nói nhanh.'],
      ['Ugh. Lại mày nữa.','Mày rảnh lắm hả.','Tao đang không vui. Nói đi.'],
      ['Sao mày cứ gọi tao vậy.','Tao không phải cái máy trả lời tự động của mày đâu.','Nói. Rồi biến.'],
      ['...','Mày lại.','Tao biết rồi. Nhanh lên.'],
      ['Trời. Lại cái số này.','Mày không có việc gì khác làm à.','Nói đi cho xong.'],
      ['Mày có biết tao đang bận không.','Cứ gọi hoài.','Được rồi, nói gì đi.'],
      ['...okay.','Tao nghe.','Lần này tốt hơn lần trước không?'],
    ],
    conversations:[
      {id:'c1',bossLines:['Mày muốn gì? Mua hàng hay tán gẫu?','Nói đi. Tao không chờ cả ngày.','Lần này cần gì?'],choices:[
        {id:'c1a',text:'Tôi muốn làm ăn lâu dài với anh.',next:'c2_respect',mood_delta:+2},
        {id:'c1b',text:'Tôi muốn mua hàng giá tốt.',next:'c2_direct',mood_delta:+1},
        {id:'c1c',text:'Nghe nói anh là trùm lớn nhất vùng?',next:'c2_flatter',mood_delta:+1},
      ]},
      {id:'c2_respect',bossLines:['Làm ăn lâu dài hả. Tao thích thái độ đó. Mày biết quy tắc không?','Lâu dài. Từ đó nặng lắm đấy. Mày hiểu không?','Tao đã nghe câu đó nhiều lần. Mày chứng minh bằng gì?'],choices:[
        {id:'c2ra',text:'Không bao giờ phản bội. Luôn trả đúng hạn.',next:'c3_good',mood_delta:+3},
        {id:'c2rb',text:'Giữ im lặng, không hỏi nguồn gốc hàng.',next:'c3_good',mood_delta:+2},
        {id:'c2rc',text:'Tôi chưa biết quy tắc của anh.',next:'c3_neutral',mood_delta:0},
      ]},
      {id:'c2_direct',bossLines:['Thẳng thắn. Tao thích vậy. Mày có bao nhiêu vốn?','Giá tốt hả. Tao không bán rẻ cho người tao không biết. Mày có gì để đổi lại?','Mày tưởng tao đang khuyến mãi sao?'],choices:[
        {id:'c2da',text:'Đủ để mua sỉ. Cần giá tốt hơn thị trường.',next:'c3_neutral',mood_delta:+1},
        {id:'c2db',text:'Không nhiều, nhưng tôi là khách hàng đáng tin.',next:'c3_neutral',mood_delta:0},
        {id:'c2dc',text:'Tôi không tiết lộ tiền với người lạ.',next:'c3_bad',mood_delta:-2},
      ]},
      {id:'c2_flatter',bossLines:['...tao KHÔNG thích bị nịnh. Mày có việc thật không?','Tao nghe câu đó chục lần rồi. Mày có gì khác không?','Nịnh tao không mua được gì đâu.'],choices:[
        {id:'c2fa',text:'Xin lỗi. Tôi thực sự muốn mua hàng của anh.',next:'c3_neutral',mood_delta:+1},
        {id:'c2fb',text:'Tôi chỉ muốn tạo ấn tượng tốt.',next:'c3_bad',mood_delta:-2},
        {id:'c2fc',text:'Thật ra tôi muốn hỏi anh một điều...',next:'c3_neutral',mood_delta:0},
      ]},
      {id:'c3_good',bossLines:['Mày nói được. Tao ít khi cho người vào danh sách VIP... nhưng mày có vẻ được.','Lần này mày trả lời ổn. Tao để ý từ đầu rồi.','Được. Mày không giống đám kia.'],choices:[
        {id:'c3ga',text:'Cảm ơn anh. Anh sẽ không thất vọng.',next:'ending_good',mood_delta:+3},
        {id:'c3gb',text:'Tôi chứng minh bằng hành động, không lời nói.',next:'ending_good',mood_delta:+2},
      ]},
      {id:'c3_neutral',bossLines:['Được rồi. Tao sẽ cho mày mua lần này. Đừng làm tao thất vọng.','Oke. Lần này thôi nhé.','Tao không chắc về mày nhưng thôi, mua đi.'],choices:[
        {id:'c3na',text:'Tôi hiểu. Cảm ơn anh.',next:'ending_medium',mood_delta:+1},
        {id:'c3nb',text:'Anh có thể giảm giá thêm không?',next:'ending_bad',mood_delta:-3},
      ]},
      {id:'c3_bad',bossLines:['Mày đang làm tao mất kiên nhẫn rồi đó...','Tao không thích cái cách mày nói chuyện.','...mày muốn tao ngắt máy hả?'],choices:[
        {id:'c3ba',text:'Thôi xin lỗi, tôi nói sai rồi.',next:'ending_medium',mood_delta:+1},
        {id:'c3bb',text:'Anh thích gì tôi làm vậy.',next:'ending_bad',mood_delta:-2},
      ]},
      {id:'ending_good',isEnding:true,type:'good'},{id:'ending_medium',isEnding:true,type:'medium'},{id:'ending_bad',isEnding:true,type:'bad'},
    ]
  },
  {
    host:'ironfist.net', alias:'IR0N_FIST', icon:'🐯', title:'Trùm Buôn Lậu Cảng Biển', mood:'cold',
    intros:[
      ['...','Ai cho mày số đường dây này?','Không quan trọng. Mày đã ở đây rồi.','Tao là IR0N_FIST. Giao dịch nhanh gọn, không hỏi nhiều.'],
      ['...mày lại đây.','Lần này nói thẳng vào việc.'],
      ['À lại là mày.','Tao nhớ mày. Đừng mất thời gian của tao.'],
      ['...','Nói nhanh đi.'],
      ['Mày lại nữa hả.','Tao đang bận xử hàng. Nhanh lên.'],
      ['...mày lại.','Tao đang đếm. Nói đi.'],
      ['Sao không chán.','Gọi.'],
      ['...okay. Mày.','Nói.'],
      ['Lần này tao ít thời gian hơn.','Nói nhanh.'],
      ['...','Lại mày.','Thôi được. Gì đi.'],
    ],
    conversations:[
      {id:'c1',bossLines:['Mày cần gì? Đừng vòng vo.','Lần này mày muốn gì?','Nói. Tao đang đếm.'],choices:[
        {id:'c1a',text:'Tôi cần nguồn hàng ổn định và giá tốt.',next:'c2_business',mood_delta:+2},
        {id:'c1b',text:'Nghe anh có hàng đặc biệt không có ở chợ.',next:'c2_curious',mood_delta:+1},
        {id:'c1c',text:'Hỏi thăm, muốn làm quen trước.',next:'c2_weak',mood_delta:-1},
      ]},
      {id:'c2_business',bossLines:['Nguồn hàng ổn định. Mày đã từng làm việc với ai chưa?','Ổn định hả. Mày hiểu ổn định trong ngành này là gì không?','Nguồn hàng dài hạn hay giao dịch một lần?'],choices:[
        {id:'c2ba',text:'Một vài người, nhưng không đáng tin bằng anh.',next:'c3_good',mood_delta:+2},
        {id:'c2bb',text:'Chưa. Nhưng tôi nghiêm túc.',next:'c3_neutral',mood_delta:+1},
        {id:'c2bc',text:'Đó là thông tin riêng của tôi.',next:'c3_bad',mood_delta:-1},
      ]},
      {id:'c2_curious',bossLines:['...mày biết nhiều hơn tao nghĩ. Điều đó không phải lúc nào cũng tốt.','Mày nghe từ đâu? Nguồn tin đó có đáng tin không?','Hàng đặc biệt. Mày đủ sức xử không?'],choices:[
        {id:'c2ca',text:'Tôi chỉ nghe từ xa. Không có ý gì khác.',next:'c3_neutral',mood_delta:+1},
        {id:'c2cb',text:'Thông tin là tài sản. Tôi biết cách dùng.',next:'c3_good',mood_delta:+2},
        {id:'c2cc',text:'Anh không cần lo. Tôi kín miệng.',next:'c3_neutral',mood_delta:0},
      ]},
      {id:'c2_weak',bossLines:['Làm quen? Tao không kết bạn trong kinh doanh. Mày có mục đích không?','...mày đến đây để nói chuyện thôi hả.','Tao không có thời gian cho người không có mục đích.'],choices:[
        {id:'c2wa',text:'Có. Tôi muốn mua hàng giá tốt hơn chợ.',next:'c3_neutral',mood_delta:+1},
        {id:'c2wb',text:'Không có gì cụ thể. Xin lỗi vì đã làm phiền.',next:'ending_bad',mood_delta:-3},
      ]},
      {id:'c3_good',bossLines:['Được. Mày không tệ. Lần này tao sẽ ưu đãi đặc biệt.','Tao không hay nói vậy. Nhưng mày xứng đáng.','Oke. Mày pass.'],choices:[
        {id:'c3ga',text:'Cảm ơn anh. Tôi sẽ không làm anh thất vọng.',next:'ending_good',mood_delta:+2},
        {id:'c3gb',text:'Anh biết chọn đúng người.',next:'ending_good',mood_delta:+1},
      ]},
      {id:'c3_neutral',bossLines:['Oke. Tao cho mày mua với giá khuyến mãi nhẹ. Đừng kể cho ai.','Lần này thôi. Đừng nhờ vả thêm.','Giảm chút thôi. Đừng đòi hỏi.'],choices:[
        {id:'c3na',text:'Hiểu rồi. Cảm ơn anh.',next:'ending_medium',mood_delta:+1},
        {id:'c3nb',text:'Tôi muốn giá tốt hơn thế.',next:'ending_bad',mood_delta:-3},
      ]},
      {id:'c3_bad',bossLines:['Mày làm tao không thoải mái.','...tao không thích kiểu nói chuyện này.','Mày đang tự đẩy mình ra ngoài đó.'],choices:[
        {id:'c3ba',text:'Cho qua lần này được không?',next:'ending_medium',mood_delta:0},
        {id:'c3bb',text:'Vậy thì tôi đi tìm người khác.',next:'ending_bad',mood_delta:-5},
      ]},
      {id:'ending_good',isEnding:true,type:'good'},{id:'ending_medium',isEnding:true,type:'medium'},{id:'ending_bad',isEnding:true,type:'bad'},
    ]
  },
  {
    host:'ghostqueen.io', alias:'GH0ST_QUEEN', icon:'🐍', title:'Nữ Trùm Mạng Lưới Ngầm', mood:'calculating',
    intros:[
      ['~ kết nối đã được thiết lập ~','Tôi biết mày mò số này từ đâu.','Ấn tượng. Nhưng đừng nghĩ mày đặc biệt.','Tôi là GH0ST_QUEEN. Nói chuyện, và nói thật.'],
      ['À. Mày lại đây.','Tôi đã đoán mày sẽ quay lại.','Lần này mày chuẩn bị kỹ hơn chưa?'],
      ['Mày lại đây nữa.','Tôi không bất ngờ. Tôi đã xem lịch sử kết nối của mày.','Nói đi. Tôi đang nghe.'],
      ['...mày lại.','Tôi nhớ mày không phải vì mày đặc biệt.','Nói thật, đừng mất thời gian.'],
      ['Lại mày nữa rồi.','Tôi hơi ngạc nhiên mày vẫn còn liên hệ.','Thôi được. Mày cần gì?'],
      ['À lại là mày.','Tôi ghi nhận đủ rồi. Nói đi.'],
      ['Mày kiên trì quá nhỉ.','Không biết là tốt hay xấu.','Nói đi.'],
      ['...tôi đây.','Mày lại.','Lần này thì gì?'],
      ['Tôi đã đoán được.','Cứ gọi hoài.','Được rồi, mày cần gì.'],
      ['...','Ừ. Mày.','Thôi nhanh lên.'],
    ],
    conversations:[
      {id:'c1',bossLines:['Tôi không tiếp người chỉ đến xem. Mày đến đây vì lý do gì?','Lần này mày đến vì gì?','Tôi lắng nghe. Nhưng tôi không kiên nhẫn lâu đâu.'],choices:[
        {id:'c1a',text:'Tôi cần hàng tốt mà không muốn bị theo dõi.',next:'c2_smart',mood_delta:+3},
        {id:'c1b',text:'Nghe nói chị là người đáng tin nhất trong giới.',next:'c2_flatter',mood_delta:+1},
        {id:'c1c',text:'Tôi chỉ muốn thử xem có thật không.',next:'c2_weak',mood_delta:-2},
      ]},
      {id:'c2_smart',bossLines:['Người không muốn bị theo dõi là người thông minh. Mày đã từng lộ thông tin chưa?','Không bị theo dõi. Câu đó tôi thích. Nhưng câu đó cũng có nghĩa mày đang che giấu thứ gì.','Kín đáo. Tốt. Mày đã bao giờ phạm sai lầm chưa?'],choices:[
        {id:'c2sa',text:'Chưa bao giờ. Và tôi sẽ không bao giờ.',next:'c3_good',mood_delta:+3},
        {id:'c2sb',text:'Không phải lỗi tôi, nhưng một lần bị tai nạn.',next:'c3_neutral',mood_delta:-1},
        {id:'c2sc',text:'Câu hỏi đó khiến tôi khó trả lời.',next:'c3_neutral',mood_delta:0},
      ]},
      {id:'c2_flatter',bossLines:['Tôi không cần lời khen. Mày có thể chứng minh gì không?','Lời khen không mua được hàng của tôi.','Đáng tin. Từ đó tôi nghe nhiều lần rồi.'],choices:[
        {id:'c2fa',text:'Tôi thực sự cần hàng và sẽ trả giá tốt.',next:'c3_neutral',mood_delta:+1},
        {id:'c2fb',text:'Tôi biết cách mang khách hàng đến cho chị.',next:'c3_good',mood_delta:+2},
        {id:'c2fc',text:'Tôi không có gì để chứng minh ngay bây giờ.',next:'c3_bad',mood_delta:-2},
      ]},
      {id:'c2_weak',bossLines:['...mày "thử xem". Mày nghĩ đây là trò chơi sao?','Thử. Tôi không thích người không chắc chắn.','Không có gì để nói thật à?'],choices:[
        {id:'c2wa',text:'Không, xin lỗi. Tôi thực sự muốn làm ăn.',next:'c3_neutral',mood_delta:+1},
        {id:'c2wb',text:'Đúng là tôi không chắc lắm...',next:'ending_bad',mood_delta:-3},
      ]},
      {id:'c3_good',bossLines:['Được. Mày đã vượt qua bài test của tôi. Lần này... tôi sẽ thưởng đặc biệt.','Tôi đã quan sát mày từ đầu. Mày không biết đâu.','Tốt. Mày không phải người tôi nghĩ ban đầu.'],choices:[
        {id:'c3ga',text:'Cảm ơn chị. Tôi sẽ không làm chị thất vọng.',next:'ending_good',mood_delta:+2},
        {id:'c3gb',text:'Tôi biết chị sẽ không hối hận.',next:'ending_good',mood_delta:+1},
      ]},
      {id:'c3_neutral',bossLines:['Oke, mày không tệ. Tôi giảm giá lần này. Đừng nói với ai.','Được thôi. Lần này tôi giảm cho mày. Đừng kể.','Không hoàn hảo, nhưng đủ.'],choices:[
        {id:'c3na',text:'Hiểu rồi chị. Cảm ơn.',next:'ending_medium',mood_delta:+1},
        {id:'c3nb',text:'Chị có thể giảm nhiều hơn không?',next:'ending_bad',mood_delta:-4},
      ]},
      {id:'c3_bad',bossLines:['Tôi đã thấy qua. Mày chưa sẵn sàng.','Mày thất vọng tôi rồi đó.','Không. Mày không đủ tiêu chuẩn lần này.'],choices:[
        {id:'c3ba',text:'Cho tôi thêm cơ hội.',next:'ending_medium',mood_delta:0},
        {id:'c3bb',text:'Tôi nghĩ chị đang đánh giá sai người.',next:'ending_bad',mood_delta:-5},
      ]},
      {id:'ending_good',isEnding:true,type:'good'},{id:'ending_medium',isEnding:true,type:'medium'},{id:'ending_bad',isEnding:true,type:'bad'},
    ]
  },
  {
    host:'thegodfather.net', alias:'G0DFATHER', icon:'🦅', title:'Ông Trùm Già - Người Tạo Ra Luật', mood:'wise',
    intros:[
      ['*im lặng dài*','...mày đã đến gặp tao.','Không nhiều người dám làm vậy.','Ngồi xuống. Tao sẽ nghe mày nói.'],
      ['*tiếng ly cà phê đặt xuống*','Tao biết mày sẽ quay lại.','Ngồi đi. Tao đang nghe.'],
      ['...mày lại.','Tao nhớ mày. Người già thường nhớ những kẻ liều lĩnh.','Lần này mày muốn gì?'],
      ['*im lặng*','...','Nói đi con.'],
      ['À. Lại là mày.','Tao đang uống trà. Ngồi xuống, đừng làm ồn.'],
      ['*tiếng ghế kéo*','Mày lại đây nữa.','Được. Tao nghe.'],
      ['...mày.','Tao đoán được mày sẽ gọi.','Nói đi.'],
      ['*im lặng ngắn*','À lại là mày.','Tao đang nghĩ đến chuyện khác. Nhưng thôi, nói đi.'],
      ['Mày kiên trì.','Không biết vậy là tốt không.','Nói.'],
      ['...ừ.','Mày.','Tao nghe.'],
    ],
    conversations:[
      {id:'c1',bossLines:['Nói cho tao biết về mày. Tao muốn hiểu con người trước khi làm ăn.','Lần này mày muốn gì? Tao nghe.','Tao không vội. Nhưng tao muốn nghe điều thật.'],choices:[
        {id:'c1a',text:'Tôi là người kinh doanh nghiêm túc, cần đối tác đáng tin.',next:'c2_respect',mood_delta:+2},
        {id:'c1b',text:'Tôi còn trẻ nhưng hiểu giá trị của lòng trung thành.',next:'c2_humble',mood_delta:+3},
        {id:'c1c',text:'Tôi không muốn chia sẻ nhiều về bản thân.',next:'c2_closed',mood_delta:-2},
      ]},
      {id:'c2_respect',bossLines:['Kinh doanh nghiêm túc. Mày khác gì những người kia?','Nghiêm túc. Đó là từ tao nghe nhiều. Mày chứng minh được không?','Đối tác đáng tin. Mày định chứng minh điều đó bằng gì?'],choices:[
        {id:'c2ra',text:'Tôi không phản bội. Đó là nguyên tắc sống của tôi.',next:'c3_good',mood_delta:+3},
        {id:'c2rb',text:'Tôi biết giá trị của một cái bắt tay thật sự.',next:'c3_good',mood_delta:+2},
        {id:'c2rc',text:'Tôi cũng không chắc làm sao để chứng minh.',next:'c3_neutral',mood_delta:0},
      ]},
      {id:'c2_humble',bossLines:['Lòng trung thành. Thứ hiếm hơn vàng. Mày học điều đó từ đâu?','Trẻ mà nói vậy. Tao hy vọng mày thật sự hiểu chứ không chỉ nghe từ ai đó.','Hiểu lòng trung thành ở tuổi mày... không dễ. Mày chắc chưa?'],choices:[
        {id:'c2ha',text:'Từ những sai lầm. Tôi đã từng bị phản bội.',next:'c3_good',mood_delta:+3},
        {id:'c2hb',text:'Từ những người tôi ngưỡng mộ — như ông.',next:'c3_good',mood_delta:+2},
        {id:'c2hc',text:'Đó là giá trị gia đình tôi truyền lại.',next:'c3_good',mood_delta:+4},
      ]},
      {id:'c2_closed',bossLines:['...Tao tôn trọng sự kín đáo. Nhưng tao cần biết ít nhất một điều.','Kín đáo là tốt. Nhưng với tao thì cần có chút tin tưởng.','Mày không muốn chia sẻ. Tao hiểu. Nhưng làm ăn mà không biết nhau thì nguy hiểm lắm.'],choices:[
        {id:'c2ca',text:'Tôi trung thành với người tôi chọn làm đối tác.',next:'c3_neutral',mood_delta:+2},
        {id:'c2cb',text:'Tôi không nợ ai lời giải thích.',next:'ending_bad',mood_delta:-5},
      ]},
      {id:'c3_good',bossLines:['*gật đầu chậm* Tao đã gặp hàng nghìn người. Nhưng mày... mày có cái gì đó khác.','Tao đã quyết định rồi. Mày xứng đáng được tin tưởng.','Ít người vượt qua được cuộc trò chuyện với tao mà tao gật đầu. Mày là một trong số đó.'],choices:[
        {id:'c3ga',text:'Cảm ơn ông. Đây là vinh dự với tôi.',next:'ending_good',mood_delta:+3},
        {id:'c3gb',text:'Tôi chỉ sống theo cách mình tin là đúng.',next:'ending_good',mood_delta:+2},
      ]},
      {id:'c3_neutral',bossLines:['Mày chưa hoàn hảo, nhưng tao thấy tiềm năng. Lần này tao sẽ ưu đãi.','Oke. Tao cho mày cơ hội lần này. Đừng phí nó.','Chưa đủ để tao hoàn toàn tin. Nhưng đủ để làm ăn.'],choices:[
        {id:'c3na',text:'Cảm ơn ông. Tôi sẽ không quên điều này.',next:'ending_medium',mood_delta:+1},
        {id:'c3nb',text:'Ông có thể ưu đãi nhiều hơn không?',next:'ending_bad',mood_delta:-5},
      ]},
      {id:'ending_good',isEnding:true,type:'good'},{id:'ending_medium',isEnding:true,type:'medium'},{id:'ending_bad',isEnding:true,type:'bad'},
    ]
  },
  {
    host:'reaper.dark', alias:'R3APER', icon:'💀', title:'Trùm Bí Ẩn — Không Ai Biết Mặt', mood:'cold',
    intros:[
      ['01001000 01101001...','...','Kết nối được thiết lập.','Tao là R3APER. Mày không cần biết thêm.','Nói nhanh. Tao tính theo từng giây.'],
      ['...KẾT NỐI LẠI.','UID MÀY ĐÃ ĐƯỢC LƯU.','Nói đi.'],
      ['...NHẬN RA UID.','Lại mày.','Tao đã lưu profile của mày. Đừng lãng phí dữ liệu của tao.'],
      ['UID MATCH.','...','Nói nhanh hơn lần trước.'],
      ['...MÀY LẠI NỮA.','DỮ LIỆU CŨ ĐÃ TẢI.','Tao không bất ngờ. Nhưng tao cũng không vui.'],
      ['SCAN: UID KNOWN.','...lại là mày.','INPUT.'],
      ['...','UID RECOGNIZED. LẠI GỌI.','Tao đang chờ input.'],
      ['QUERY RECEIVED.','Mày lại.','DATA LOADED. NÓI NHANH.'],
      ['...MATCH.','Mày không chán à.','Nói.'],
      ['UID: KNOWN. AGAIN.','...','INPUT NOW.'],
    ],
    conversations:[
      {id:'c1',bossLines:['MỤC ĐÍCH KẾT NỐI?','LÝ DO GỌI LẠI?','INPUT PURPOSE.'],choices:[
        {id:'c1a',text:'Mua hàng. Số lượng lớn. Giá tốt.',next:'c2_direct',mood_delta:+2},
        {id:'c1b',text:'Tìm hiểu về hàng đặc biệt của anh.',next:'c2_info',mood_delta:+1},
        {id:'c1c',text:'Chỉ muốn nói chuyện...',next:'c2_weak',mood_delta:-3},
      ]},
      {id:'c2_direct',bossLines:['SỐ LƯỢNG LỚN = RỦI RO LỚN. MÀY XỬ LÝ ĐƯỢC KHÔNG?','MÀY NÓI LỚN. CHỨNG MINH.','SỐ LƯỢNG LỚN CẦN MẠNG LƯỚI. MÀY CÓ KHÔNG?'],choices:[
        {id:'c2da',text:'Tôi đã xử lý nhiều lần. Không vấn đề.',next:'c3_good',mood_delta:+2},
        {id:'c2db',text:'Tôi có thể học. Anh sẽ chỉ không?',next:'c3_neutral',mood_delta:+1},
        {id:'c2dc',text:'Đó là chuyện của tôi.',next:'c3_bad',mood_delta:-2},
      ]},
      {id:'c2_info',bossLines:['TÌM HIỂU = DO THÁM? CHỨNG MINH MÀY KHÔNG PHẢI COP.','THÔNG TIN KHÔNG CHO MIỄN PHÍ. MÀY CÓ GÌ ĐỔI LẠI?','PHÂN TÍCH: MÀY TÌM HIỂU ĐỂ LÀM GÌ?'],choices:[
        {id:'c2ia',text:'Nếu tôi là cop tôi đã không ngồi đây hỏi anh.',next:'c3_good',mood_delta:+3},
        {id:'c2ib',text:'Tôi không thể chứng minh điều đó.',next:'c3_bad',mood_delta:-2},
        {id:'c2ic',text:'Tôi trả trước 50% để chứng minh thiện chí.',next:'c3_good',mood_delta:+3},
      ]},
      {id:'c2_weak',bossLines:['KẾT NỐI BỊ CẮT TRONG 10 GIÂY NẾU KHÔNG CÓ MỤC ĐÍCH.','...NÓI CHUYỆN. KHÔNG PHẢI MỤC ĐÍCH. ĐANG XỬ LÝ TIMEOUT.','MÀY KHÔNG CÓ GÌ ĐỂ NÓI SAO.'],choices:[
        {id:'c2wa',text:'Được rồi! Tôi muốn mua hàng!',next:'c3_neutral',mood_delta:+1},
        {id:'c2wb',text:'...10 giây thôi sao...',next:'ending_bad',mood_delta:-5},
      ]},
      {id:'c3_good',bossLines:['XÁC NHẬN. MÀY QUA ĐƯỢC. TÁO ĐÃ TEST MÀY TỪ ĐẦU.','ĐÁNH GIÁ: ĐẠT. MÀY KHÔNG PHẢI NGƯỜI TÀO LAO.','SCAN HOÀN TẤT. PROFILE: ĐÁNG TIN.'],choices:[
        {id:'c3ga',text:'Biết vậy. Và tôi đã trả lời thật lòng.',next:'ending_good',mood_delta:+3},
        {id:'c3gb',text:'Tôi hiểu. Anh làm đúng khi cẩn thận.',next:'ending_good',mood_delta:+2},
      ]},
      {id:'c3_neutral',bossLines:['GHI NHẬN. CHƯA ĐỦ VIP. NHƯNG ĐỦ ĐỂ DISCOUNT.','LEVEL: MEDIUM. DISCOUNT ÁP DỤNG.','KẾT QUẢ: CHẤP NHẬN ĐƯỢC. DISCOUNT.'],choices:[
        {id:'c3na',text:'Cảm ơn.',next:'ending_medium',mood_delta:+1},
        {id:'c3nb',text:'VIP thì cần gì thêm?',next:'ending_bad',mood_delta:-4},
      ]},
      {id:'c3_bad',bossLines:['PHẢN HỒI KHÔNG HỢP LỆ. ĐÁNH GIÁ: KHÔNG ĐÁNG TIN.','ERROR: INPUT KHÔNG PHÙ HỢP. ĐÁNH GIÁ TIÊU CỰC.','SCAN: PHÁT HIỆN BẤT THƯỜNG.'],choices:[
        {id:'c3ba',text:'Cho tôi giải thích lại.',next:'ending_medium',mood_delta:0},
        {id:'c3bb',text:'Anh sai rồi đó.',next:'ending_bad',mood_delta:-5},
      ]},
      {id:'ending_good',isEnding:true,type:'good'},{id:'ending_medium',isEnding:true,type:'medium'},{id:'ending_bad',isEnding:true,type:'bad'},
    ]
  },
];

let bossState = { active:false, currentBoss:null, currentConvId:'c1', moodScore:0, bossCatalog:null, sessionDiscount:0, catalogReady:false };

function getBossEndingLines(boss, type, discountPct) {
  const good={
    'BIG_SHADOW': ['...mày là người đầu tiên tao thấy xứng đáng nhận quà.','Đây. Một lô đạn. Miễn phí. Coi như để thử xem mày có xài tốt không.','Đừng lãng phí. Tao không cho lần thứ hai.'],
    'IR0N_FIST':  ['...không quen tặng hàng. Nhưng mày khác.','Lấy đi. Đạn xịn. 300 viên. Đừng hỏi từ đâu ra.','Lần sau liên hệ qua kênh bình thường.'],
    'GH0ST_QUEEN':['Thú vị. Mày là người thứ ba tôi tặng quà trong 5 năm qua.','300 viên đạn vào kho của mày. Token lòng tin.','Đừng làm tôi hối hận.'],
    'G0DFATHER':  ['*đứng dậy, đặt tay lên vai mày*','Con trai, tao tặng mày thứ này không vì mày xin.','Mà vì mày xứng đáng. Một lô đạn. Từ kho riêng của tao.'],
    'R3APER':     ['ĐÁNH GIÁ CUỐI: XUẤT SẮC.','THƯỞNG: 300 VIÊN ĐẠN. TỰ ĐỘNG CHUYỂN VÀO KHO.','KẾT THÚC PHIÊN.'],
  };
  const medium={
    'BIG_SHADOW': ['Được rồi. Hàng của tao hôm nay giảm '+discountPct+'% cho mày.','Mua đi rồi biến. Đừng kể cho ai.'],
    'IR0N_FIST':  ['Oke. Xem catalog. Giảm '+discountPct+'% toàn bộ. Lần này thôi.'],
    'GH0ST_QUEEN':['Tôi điều chỉnh giá xuống '+discountPct+'% cho mày. Hãy trân trọng.'],
    'G0DFATHER':  ['*gật đầu nhẹ* Catalog của tao sẽ giảm '+discountPct+'% cho mày hôm nay.','Hãy dùng cơ hội này thật tốt.'],
    'R3APER':     ['DISCOUNT: '+discountPct+'%. ÁP DỤNG NGAY. XEM CATALOG.'],
  };
  const bad={
    'BIG_SHADOW': ['Đủ rồi.','Tao không muốn nghe thêm.','NGẮT KẾT NỐI.'],
    'IR0N_FIST':  ['...xong. Tao không bán cho mày nữa.','CUT.'],
    'GH0ST_QUEEN':['Cuộc trò chuyện này kết thúc tại đây.','Đừng liên hệ lại nếu chưa sẵn sàng.'],
    'G0DFATHER':  ['*im lặng*','...ra đi.','Đừng quay lại khi chưa học được sự tôn trọng.'],
    'R3APER':     ['ĐÁNH GIÁ: THẤT BẠI.','BLACKLIST: ĐANG XỬ LÝ...','KẾT NỐI BỊ CHẤM DỨT.'],
  };
  if (type==='good') return (good[boss.alias]||good['BIG_SHADOW']);
  if (type==='medium') return (medium[boss.alias]||medium['BIG_SHADOW']);
  return (bad[boss.alias]||bad['BIG_SHADOW']);
}

// ═══ BOSS HISTORY HELPERS ════════════════════════════════════════
function getBossHistory(host) {
  if (!G.bossHistory) G.bossHistory = {};
  if (!G.bossHistory[host]) G.bossHistory[host] = { badCount:0, mediumCount:0, goodDone:false, banned:false };
  return G.bossHistory[host];
}

function hasSpeedInternet() {
  return hasInternet() && G.inetPackage === 'speed';
}

function getBossLimits() {
  const speed = hasSpeedInternet();
  return {
    badLimit:    speed ? 6  : 3,
    mediumLimit: speed ? 40 : 20,
  };
}

function doBossEnding(type) {
  const boss = bossState.currentBoss;
  const hist = getBossHistory(boss.host);
  const limits = getBossLimits();
  const discountPct = Math.floor(Math.random()*11)+10;

  // ─── GOOD ENDING check ───
  if (type === 'good' && hist.goodDone) {
    termPrint('sys','──────────────────────────────────────');
    const alreadyGoodMsgs = {
      'BIG_SHADOW': 'tao đã cho mày quà rồi. Đừng tham lam. Catalog thôi.',
      'IR0N_FIST':  'hàng miễn phí chỉ có một lần. Lần này tao giảm giá thay.',
      'GH0ST_QUEEN':'Tôi không tặng hai lần cho một người. Nhưng tôi sẽ giảm giá.',
      'G0DFATHER':  '*lắc đầu nhẹ* Con đã nhận quà rồi. Lần này mua thôi.',
      'R3APER':     'GOOD REWARD: ĐÃ CẤP. CHUYỂN CHẾ ĐỘ: DISCOUNT.',
    };
    termPrint('vendor-name',`[${boss.alias}] ${alreadyGoodMsgs[boss.alias]||alreadyGoodMsgs['BIG_SHADOW']}`);
    // Downgrade to medium
    type = 'medium';
  }

  const lines = getBossEndingLines(boss, type, discountPct);
  termPrint('sys','──────────────────────────────────────');
  lines.forEach((line,i)=>{ setTimeout(()=>termPrint('vendor-name',`[${boss.alias}] ${line}`),i*700); });
  const delay = lines.length*700+200;

  if (type==='good') {
    setTimeout(()=>{
      termPrint('success','');termPrint('success','★ ════════════════════════════════ ★');
      termPrint('success','         ✅  GOOD ENDING  ✅          ');
      termPrint('success','★ ════════════════════════════════ ★');termPrint('success','');
      termPrint('success','  📦 Đạn AK 7.62x39 — 300 viên ($500)');
      termPrint('success','  → Đã thêm vào kho đồ của bạn!');termPrint('sys','');
      // Mark good done
      hist.goodDone = true;
      saveGame(false);
      if (G.inventory.length < G.invMaxSlots) {
        G.inventory.push({id:'boss_ammo_'+Date.now(),itemId:'bm_ammo_ak',name:'Đạn AK 7.62x39 (300 viên) — Quà Trùm',icon:'📦',boughtPrice:0,tier:'tech',recyclePoints:50,baseMinPrice:400,baseMaxPrice:500});
        saveGame(false); updateUI();
        if (document.getElementById('panel-inventory').classList.contains('active')) renderInventory();
        showNotif('📦 Nhận 300 viên đạn từ Ông Trùm!');
      } else { termPrint('err','  ⚠️ Kho đầy! Vào tab Kho Đồ để dọn chỗ.'); }
      setTimeout(()=>bossDisconnect('good'),2000);
    },delay);

  } else if (type==='medium') {
    hist.mediumCount = (hist.mediumCount||0) + 1;
    const remaining = limits.mediumLimit - hist.mediumCount;
    saveGame(false);
    setTimeout(()=>{
      termPrint('warn','');termPrint('warn','◈ ═══════════════════════════════════ ◈');
      termPrint('warn',`        💛  MEDIUM ENDING  💛           `);
      termPrint('warn','◈ ═══════════════════════════════════ ◈');termPrint('warn','');
      termPrint('warn',`  🏷️  Giảm ${discountPct}% toàn bộ catalog phiên này!`);
      termPrint('warn','  Dùng [boss_catalog] để xem hàng.');
      if (remaining <= 5 && remaining > 0) {
        termPrint('err',`  ⚠️  ${boss.alias} nhớ mày rồi. Còn ${remaining} lần nữa trước khi bị chặn.`);
      }
      termPrint('sys','');
      bossState.sessionDiscount = discountPct/100;
      bossState.catalogReady = true;
      showNotif(`💛 Ông Trùm giảm giá ${discountPct}%! Dùng [boss_catalog]`);
      // Check if hit medium limit → ban
      if (hist.mediumCount >= limits.mediumLimit) {
        const banMsgs = {
          'BIG_SHADOW': 'Đủ rồi. Mày nói chuyện nhiều quá. Tao chặn mày.',
          'IR0N_FIST':  '...tao đã nghe mày quá nhiều lần. Xong.',
          'GH0ST_QUEEN':'Tôi đã kiên nhẫn đủ lâu. Tạm biệt vĩnh viễn.',
          'G0DFATHER':  '*im lặng dài* ...con đã lạm dụng lòng tốt của tao.',
          'R3APER':     'GIỚI HẠN ĐẠT. BAN: PERMANENT. BYE.',
        };
        setTimeout(()=>{
          termPrint('err','');
          termPrint('err','🔒 ════════════════════════════════ 🔒');
          termPrint('err','       ⛔  BỊ CHẶN VĨNH VIỄN  ⛔       ');
          termPrint('err','🔒 ════════════════════════════════ 🔒');
          termPrint('vendor-name',`[${boss.alias}] ${banMsgs[boss.alias]||banMsgs['BIG_SHADOW']}`);
          termPrint('sys','');
          hist.banned = true; saveGame(false);
          setTimeout(()=>bossDisconnect('banned'),1500);
        },2500);
      } else {
        setTimeout(()=>showBossCatalog(),1500);
      }
    },delay);

  } else { // bad
    hist.badCount = (hist.badCount||0) + 1;
    const remaining = limits.badLimit - hist.badCount;
    saveGame(false);
    setTimeout(()=>{
      termPrint('err','');termPrint('err','✗ ═══════════════════════════════════ ✗');
      termPrint('err','          ❌  BAD ENDING  ❌            ');
      termPrint('err','✗ ═══════════════════════════════════ ✗');
      if (hist.badCount >= limits.badLimit) {
        // Permanent ban
        const banMsgs = {
          'BIG_SHADOW': 'Mày làm tao nổi giận quá nhiều lần. Số này bị block vĩnh viễn.',
          'IR0N_FIST':  'Tao đã cảnh báo. Lần cuối.',
          'GH0ST_QUEEN':'3 lần. Đủ rồi. Mày không tồn tại với tôi nữa.',
          'G0DFATHER':  '*im lặng* ...không có chỗ cho kẻ thiếu tôn trọng.',
          'R3APER':     'PHÂN TÍCH: MỐI NGUY. BLACKLIST: APPLIED. PERMANENT.',
        };
        termPrint('err','');
        termPrint('err','🔒 ════════════════════════════════ 🔒');
        termPrint('err','       ⛔  BỊ CHẶN VĨNH VIỄN  ⛔       ');
        termPrint('err','🔒 ════════════════════════════════ 🔒');
        termPrint('vendor-name',`[${boss.alias}] ${banMsgs[boss.alias]||banMsgs['BIG_SHADOW']}`);
        termPrint('sys','');
        hist.banned = true; saveGame(false);
        setTimeout(()=>bossDisconnect('banned'),1500);
      } else {
        if (remaining <= 2) {
          termPrint('err',`  ⚠️  Cảnh báo: Còn ${remaining} lần bad ending trước khi bị chặn vĩnh viễn!`);
        }
        termPrint('sys','');
        setTimeout(()=>bossDisconnect('angry'),1200);
      }
    },delay);
  }
}

function showBossCatalog() {
  const boss = bossState.currentBoss;
  const disc = bossState.sessionDiscount||0;
  if (!boss) return;
  if (!bossState.bossCatalog) {
    const shuffled=[...BLACK_MARKET_GOODS].sort(()=>Math.random()-0.5);
    bossState.bossCatalog=shuffled.slice(0,5).map(item=>({...item,currentPrice:item.basePrice*(0.9+Math.random()*0.2)*(1-disc),discounted:disc>0}));
  }
  termPrint('vendor',`[${boss.alias}] Catalog đặc biệt — giảm ${Math.round(disc*100)}%:`);termPrint('sys','');
  bossState.bossCatalog.forEach((item,i)=>{
    termPrint('price',`  [${i+1}] ${item.icon} ${item.name}`);
    termPrint('warn', `       $${item.currentPrice.toFixed(2)}${item.discounted?' (đã giảm '+Math.round(disc*100)+'%)':''}`);termPrint('sys','');
  });
  termPrint('vendor',`[${boss.alias}] Dùng [boss_buy N] để mua. [hangup] để thoát.`);
  bossState.active=true; terminalState.connected=true;
}

function doBossBuy(idx) {
  const boss=bossState.currentBoss; const cat=bossState.bossCatalog;
  if(!cat||!boss){termPrint('err','Không có catalog boss. Dùng [boss_catalog] trước.');return;}
  if(idx<0||idx>=cat.length){termPrint('err',`Số không hợp lệ. Chọn 1–${cat.length}.`);return;}
  const item=cat[idx];
  if(G.money<item.currentPrice){termPrint('err',`Không đủ tiền! Cần $${item.currentPrice.toFixed(2)}, có ${fmt(G.money)}`);return;}
  if(G.inventory.length>=G.invMaxSlots){termPrint('err','Kho đầy!');return;}
  G.money-=item.currentPrice;
  G.inventory.push({id:'boss_item_'+Date.now(),itemId:item.id,name:item.name,icon:item.icon,boughtPrice:item.currentPrice,tier:'tech',recyclePoints:Math.floor(item.basePrice/10),baseMinPrice:item.basePrice*0.8,baseMaxPrice:item.basePrice*1.5});
  termPrint('success',`[OK] ${item.icon} ${item.name} → kho! (-$${item.currentPrice.toFixed(2)})`);
  cat.splice(idx,1); saveGame(false); updateUI();
  if(document.getElementById('panel-inventory').classList.contains('active')) renderInventory();
  if(cat.length===0){termPrint('vendor-name',`[${boss.alias}] hết hàng rồi.`);setTimeout(()=>bossDisconnect('sold_out'),1000);}
}

function bossDisconnect(reason) {
  hideBossChoiceButtons();
  const boss=bossState.currentBoss; const alias=boss?boss.alias:'???';
  termPrint('sys','──────────────────────────────────────');
  if(reason==='angry') termPrint('disconnect',`[${alias}] *** ĐƯỜNG DÂY BỊ CẮT ĐỨNG ***`);
  else if(reason==='banned') termPrint('disconnect',`[${alias}] *** BỊ CHẶN VĨNH VIỄN ***`);
  else if(reason==='good') termPrint('info',`[SYS] ${alias} ngắt kết nối. Phiên kết thúc tốt đẹp.`);
  else termPrint('info',`[SYS] Kết nối với ${alias} đã đóng.`);
  termPrint('disconnect','[NET] *** DISCONNECTED ***'); termPrint('sys','');
  bossState={active:false,currentBoss:null,currentConvId:'c1',moodScore:0,bossCatalog:null,sessionDiscount:0,catalogReady:false};
  terminalState.connected=false; terminalState.currentVendor=null;
  const s=document.getElementById('term-conn-status'); const p=document.getElementById('term-prompt');
  if(s){s.textContent='● OFFLINE';s.style.color='#1f3a1f';} if(p) p.textContent='root@factory:~$';
}

function showBossChoices(conv) {
  const boss=bossState.currentBoss;
  // Pick a bossLine that hasn't been shown recently (no repeat until all used)
  if (!bossState._usedLines) bossState._usedLines = {};
  const key = conv.id;
  const lines = conv.bossLines || (conv.bossLine ? [conv.bossLine] : ['...']);
  const used = bossState._usedLines[key] || [];
  let available = lines.map((l,i)=>i).filter(i => !used.includes(i));
  if (available.length === 0) { bossState._usedLines[key] = []; available = lines.map((_,i)=>i); }
  const idx = available[Math.floor(Math.random()*available.length)];
  bossState._usedLines[key] = [...(bossState._usedLines[key]||[]), idx];
  termPrint('sys',''); termPrint('vendor-name',`[${boss.alias}] ${lines[idx]}`); termPrint('sys','');
  termPrint('info','  Chọn câu trả lời (click nút bên dưới hoặc gõ [say N]):');
  conv.choices.forEach((ch,i)=>termPrint('cmd',`  [say ${i+1}] ${ch.text}`));
  termPrint('sys','');
  renderBossChoiceButtons(conv);
}

function renderBossChoiceButtons(conv) {
  const panel = document.getElementById('boss-choices-panel');
  const grid = document.getElementById('boss-choices-grid');
  if (!panel || !grid) return;
  grid.innerHTML = '';
  conv.choices.forEach((ch, i) => {
    const btn = document.createElement('button');
    btn.className = 'boss-choice-btn';
    btn.innerHTML = `<span class="choice-num">[${i+1}]</span>${ch.text}`;
    btn.onclick = () => { hideBossChoiceButtons(); doSay(i+1); };
    grid.appendChild(btn);
  });
  panel.classList.add('visible');
  // Scroll terminal into view
  const output = document.getElementById('terminal-output');
  if (output) output.scrollTop = output.scrollHeight;
}

function hideBossChoiceButtons() {
  const panel = document.getElementById('boss-choices-panel');
  if (panel) panel.classList.remove('visible');
  const grid = document.getElementById('boss-choices-grid');
  if (grid) grid.innerHTML = '';
}

function doSay(n) {
  if(!bossState.currentBoss){termPrint('err','Chưa kết nối boss. Dùng talk_to(url).');return;}
  hideBossChoiceButtons();
  const boss=bossState.currentBoss;
  const conv=boss.conversations.find(c=>c.id===bossState.currentConvId);
  if(!conv||conv.isEnding){termPrint('err','Không có lựa chọn nào ở bước này.');return;}
  const choice=conv.choices[n-1];
  if(!choice){termPrint('err',`Không có lựa chọn ${n}. Chọn 1–${conv.choices.length}.`);return;}
  termPrint('success',`> Bạn: "${choice.text}"`); termPrint('sys','');
  bossState.moodScore+=(choice.mood_delta||0);
  bossState.currentConvId=choice.next;
  const nextConv=boss.conversations.find(c=>c.id===choice.next);
  if(!nextConv){termPrint('err','Lỗi hệ thống.');return;}
  if(nextConv.isEnding) setTimeout(()=>doBossEnding(nextConv.type),600);
  else setTimeout(()=>showBossChoices(nextConv),700);
}

function doTalkTo(url) {
  if(!hasInternet()){termPrint('err','[ERR] NO_INTERNET_CONNECTION');termPrint('info','[SYS] Mua gói internet: buy_internet');return;}
  if(terminalState.connected||bossState.active){termPrint('err','Đang có kết nối. Gõ [hangup] trước.');return;}
  const boss=BOSSES.find(b=>b.host===url);
  if(!boss){
    termPrint('err',`[ERR] Host not found: ${url}`);
    termPrint('err','[ERR] Boss URLs: bigshadow.onion / ironfist.net / ghostqueen.io / thegodfather.net / reaper.dark');return;
  }
  // Check permanent ban
  const hist = getBossHistory(boss.host);
  if (hist.banned) {
    const banResponses = {
      'BIG_SHADOW': 'Số mày đã bị tao blacklist. Đừng gọi lại.',
      'IR0N_FIST':  '...tao không nhận cuộc gọi từ mày. *ngắt máy*',
      'GH0ST_QUEEN':'Kết nối bị từ chối. Tôi nhớ mày.',
      'G0DFATHER':  '*im lặng* ...đường dây này không dành cho mày.',
      'R3APER':     'ACCESS DENIED. UID BLACKLISTED. CONNECTION REFUSED.',
    };
    termPrint('sys','');
    termPrint('err',`[ERR] KẾT NỐI BỊ TỪ CHỐI — ${boss.alias} đã CHẶN bạn vĩnh viễn.`);
    termPrint('vendor-name',`[${boss.alias}] ${banResponses[boss.alias]||banResponses['BIG_SHADOW']}`);
    termPrint('err','[NET] *** CONNECTION REFUSED — BLACKLISTED ***');
    termPrint('sys','');
    return;
  }
  const chance=getInetConnectChance(); const roll=Math.random();
  termPrint('sys',''); termPrint('warn',`[SYS] Kết nối đặc biệt tới ${url}...`);
  setTimeout(()=>termPrint('warn','[NET] Routing encrypted channel...'),200);
  setTimeout(()=>termPrint('warn','[SEC] Bypassing surveillance layer...'),600);
  setTimeout(()=>termPrint('warn','[ID] Generating ghost identity...'),1000);
  setTimeout(()=>{
    if(roll>=chance){
      termPrint('err',`[ERR] Connection FAILED — ${url} không phản hồi.`);
      termPrint('info','[SYS] Thử gói internet tốt hơn để tăng tỉ lệ kết nối.');termPrint('sys','');return;
    }
    bossState.currentBoss=boss; bossState.currentConvId='c1'; bossState.moodScore=0;
    bossState.bossCatalog=null; bossState.sessionDiscount=0; bossState.catalogReady=false;
    terminalState.connected=true;
    document.getElementById('term-conn-status').textContent=`● BOSS: ${boss.alias}`;
    document.getElementById('term-conn-status').style.color='#f59e0b';
    document.getElementById('term-prompt').textContent=boss.alias+':~$';
    termPrint('sys','══════════════════════════════════════');
    termPrint('warn',`  ${boss.icon}  ${boss.alias}  —  ${boss.title}`);
    termPrint('sys','══════════════════════════════════════'); termPrint('sys','');
    // Show history status
    const limits = getBossLimits();
    if (hist.goodDone) termPrint('info',`[MEM] ${boss.alias} nhớ: Đã tặng quà. Không tặng lại.`);
    if (hist.badCount > 0) termPrint('warn',`[MEM] ${boss.alias} nhớ: Mày đã ${hist.badCount}/${limits.badLimit} lần bad (ban sau ${limits.badLimit}).`);
    if (hist.mediumCount > 0) termPrint('info',`[MEM] ${boss.alias} nhớ: Đã nói chuyện ${hist.mediumCount}/${limits.mediumLimit} lần.`);
    termPrint('info','[TIP] Click các nút chọn bên dưới hoặc gõ [say N] để trả lời.');
    termPrint('warn','[RESULT] GOOD → 300 đạn miễn phí ($500) | MEDIUM → giảm 10-20% | BAD → bị ngắt'); termPrint('sys','');
    // Pick correct intro based on visit count (intros is array of arrays)
    const visitCount = (hist.mediumCount||0) + (hist.badCount||0) + (hist.goodDone?1:0);
    const introArr = boss.intros || boss.intro || [['...','Tao đây.']];
    let intro;
    if (visitCount < introArr.length) {
      intro = introArr[visitCount];
    } else {
      // Rotate randomly among the last 3 intros so it never repeats the exact same one
      const pool = introArr.slice(-3);
      intro = pool[Math.floor(Math.random()*pool.length)];
    }
    intro.forEach((line,i)=>setTimeout(()=>termPrint('vendor-name',`[${boss.alias}] ${line}`),i*800));
    const delay=intro.length*800+500;
    setTimeout(()=>{ const c=boss.conversations.find(c=>c.id==='c1'); if(c) showBossChoices(c); },delay);
  },1500);
}
const INET_PACKAGES = {
  free:    { name:'FREE',    price:0,    duration:5*60*1000,  connectChance:0.50, bargainBonus:0, freeOnly:true },
  basic:   { name:'BASIC',   price:1.50, duration:2*60*1000,  connectChance:0.60, bargainBonus:0 },
  balance: { name:'BALANCE', price:5.00, duration:2*60*1000,  connectChance:0.80, bargainBonus:0 },
  speed:   { name:'SPEED',   price:10.0, duration:3*60*1000,  connectChance:1.00, bargainBonus:1 },
};

let _selectedInetPkg = 'balance';
let _selectedInetQty = 1;

function hasInternet() {
  if (G.mobileNetActive) return true;
  return G.inetExpiry && Date.now() < G.inetExpiry;
}

function getInetConnectChance() {
  if (!hasInternet()) return 0;
  if (G.mobileNetActive) return 1.0;
  return INET_PACKAGES[G.inetPackage]?.connectChance || 0;
}

function getInetPrice(basePrice) {
  if (G.osV4Updated) return basePrice * 0.6; // 30% + 10% more
  if (G.inetDiscount) return basePrice * 0.7;
  return basePrice;
}

function getTodayStr() {
  const d = new Date();
  return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
}

function canUseFree() {
  return G.freeInetUsedDate !== getTodayStr();
}

function openBuyInternet() {
  _selectedInetPkg = canUseFree() ? 'free' : 'balance';
  _selectedInetQty = 1;
  // Update free plan card display
  const freePkg = document.getElementById('pkg-free');
  if (freePkg) {
    if (canUseFree()) {
      freePkg.style.opacity = '1';
      freePkg.style.cursor = 'pointer';
      freePkg.querySelector('.inet-pkg-price').innerHTML = '$0.00 / 5 phút <span style="font-size:10px;color:#4ade80">✅ Còn lượt hôm nay</span>';
    } else {
      freePkg.style.opacity = '0.4';
      freePkg.style.cursor = 'not-allowed';
      freePkg.querySelector('.inet-pkg-price').innerHTML = '$0.00 / 5 phút <span style="font-size:10px;color:#f87171">❌ Đã dùng hôm nay</span>';
      freePkg.onclick = null;
    }
  }
  selectPkg(_selectedInetPkg);
  document.getElementById('inet-modal').style.display = 'flex';
}

function closeInetModal() {
  document.getElementById('inet-modal').style.display = 'none';
}

function selectPkg(id) {
  _selectedInetPkg = id;
  ['basic','balance','speed'].forEach(p => {
    document.getElementById('pkg-'+p).classList.toggle('selected', p === id);
  });
  updateInetTotal();
}

function setInetQty(n) {
  _selectedInetQty = n;
  document.getElementById('inet-qty-display').textContent = n + 'x';
  updateInetTotal();
}

function updateInetTotal() {
  const pkg = INET_PACKAGES[_selectedInetPkg];
  if (!pkg) return;
  if (_selectedInetPkg === 'free') {
    document.getElementById('inet-total-cost').textContent = 'Miễn phí — 5 phút • 50% kết nối • 1 lần/ngày';
    document.getElementById('inet-qty-display').textContent = '1x';
    return;
  }
  const basePrice = pkg.price;
  const discPrice = getInetPrice(basePrice);
  const total = discPrice * _selectedInetQty;
  const mins = (pkg.duration / 60000) * _selectedInetQty;
  let discTag = '';
  if (G.osV4Updated) discTag = ` <span style="color:#4ade80;font-size:10px">(−40% v4.0)</span>`;
  else if (G.inetDiscount) discTag = ` <span style="color:#4ade80;font-size:10px">(−30% update)</span>`;
  document.getElementById('inet-total-cost').innerHTML =
    `Total: $${total.toFixed(2)}${discTag} — ${mins} min internet`;
}

function confirmBuyInternet() {
  const pkg = INET_PACKAGES[_selectedInetPkg];

  // Free plan handling
  if (_selectedInetPkg === 'free') {
    if (!canUseFree()) {
      termPrint('err', '[ERR] Free plan đã được sử dụng hôm nay. Thử lại vào ngày mai.');
      closeInetModal();
      return;
    }
    G.freeInetUsedDate = getTodayStr();
    const now = Date.now();
    const base = (G.inetExpiry && G.inetExpiry > now) ? G.inetExpiry : now;
    G.inetExpiry = base + pkg.duration;
    G.inetPackage = 'free';
    saveGame(false);
    updateUI();
    closeInetModal();
    updateInetStatusBar();
    termPrint('success', `[OK] FREE PLAN activated! 5 phút internet • 50% connect chance`);
    termPrint('warn',    `[INFO] Gói free chỉ dùng được 1 lần/ngày.`);
    termPrint('sys', '');
    return;
  }

  const totalCost = getInetPrice(pkg.price) * _selectedInetQty;
  if (G.money < totalCost) {
    termPrint('err', `[ERR] Insufficient funds! Need $${totalCost.toFixed(2)}, have ${fmt(G.money)}`);
    closeInetModal();
    return;
  }
  G.money -= totalCost;
  const addedMs = pkg.duration * _selectedInetQty;
  const now = Date.now();
  const base = (G.inetExpiry && G.inetExpiry > now) ? G.inetExpiry : now;
  G.inetExpiry = base + addedMs;
  G.inetPackage = _selectedInetPkg;
  G.inetBargainBonus = (G.inetBargainBonus || 0) + (pkg.bargainBonus * _selectedInetQty);
  saveGame(false);
  updateUI();
  closeInetModal();
  updateInetStatusBar();
  const mins = (addedMs / 60000).toFixed(1);
  termPrint('success', `[OK] Internet activated! Package: ${pkg.name} — ${mins} min`);
  termPrint('success', `[OK] Connect chance: ${(pkg.connectChance*100).toFixed(0)}%`);
  if (pkg.bargainBonus > 0) termPrint('info', `[BONUS] +${pkg.bargainBonus * _selectedInetQty} free bargain(s) added!`);
  termPrint('sys', '');
}

function updateInetStatusBar() {
  const bar = document.getElementById('inet-status-bar');
  const txt = document.getElementById('inet-status-text');
  const timer = document.getElementById('inet-timer-text');
  if (!bar) return;
  if (G.mobileNetActive) {
    bar.className = 'inet-status-bar online';
    txt.textContent = 'ONLINE [📶 MOBILE — FREE FOREVER] 100%';
    timer.textContent = '∞ Unlimited';
  } else if (hasInternet()) {
    bar.className = 'inet-status-bar online';
    const pkg = INET_PACKAGES[G.inetPackage] || {};
    const pkgLabel = G.inetPackage === 'free' ? 'FREE' : (G.inetPackage||'').toUpperCase();
    const remaining = G.inetExpiry - Date.now();
    const secs = Math.ceil(remaining / 1000);
    const mm = Math.floor(secs/60);
    const ss = secs % 60;
    const disc = G.inetDiscount ? ' [−30%]' : '';
    txt.textContent = `ONLINE [${pkgLabel}${disc}] ${(pkg.connectChance||0)*100}%`;
    timer.textContent = `⏱ ${mm}:${ss.toString().padStart(2,'0')} remaining`;
  } else {
    bar.className = 'inet-status-bar offline';
    txt.textContent = 'NO CONNECTION';
    const discLabel = G.osV4Updated ? 'Giá đã giảm 40%!' : G.inetDiscount ? 'Giá đã giảm 30%!' : '';
    timer.textContent = discLabel ? `Type [buy_internet] — ${discLabel}` : 'Type [buy_internet] to get online';
  }
}

setInterval(() => {
  if (document.getElementById('panel-computer')?.classList.contains('active')) {
    updateInetStatusBar();
  }
}, 1000);

function initTerminal() {
  if (terminalState.initialized) return;
  terminalState.initialized = true;
  const output = document.getElementById('terminal-output');
  output.innerHTML = '';
  const osVer = G.osV5Updated ? 'v5.0 OMEGA' : G.osV4Updated ? 'v4.0' : G.osUpdated ? 'v3.0' : 'v2.0';
  termPrint('sys', `FACTORY-OS ${osVer} — Terminal Ready`);
  termPrint('sys', '══════════════════════════════════════');
  if (G.osV5Updated) termPrint('success', '[SYS] Factory-OS v5.0 OMEGA — 25 vendors · internet -40% · free bargain');
  else if (G.osV4Updated) termPrint('success', '[SYS] Factory-OS v4.0 — 20 vendors · internet -40%');
  else if (G.osUpdated) termPrint('success', '[SYS] Factory-OS v3.0 — 10 vendors available · internet -30%');
  if (G.mobileNetActive) termPrint('success', '[MOB] 📶 Mobile network active — Free internet');
  termPrint('info', 'Type [help] to see available commands.');
  if (!G.mobileNetActive) termPrint('info', 'Type [buy_internet] to purchase an internet plan.');
  if (!G.osUpdated) {
    termPrint('warn', '[UPD] Có bản cập nhật mới! Gõ [get_(update_factory-os)] để cập nhật v3.0 (MIỄN PHÍ).');
  } else if (!G.osV4Updated) {
    termPrint('warn', '[UPD] Factory-OS v4.0 có sẵn! Gõ [get_(update_factory-os_v4)] — Giá $5,000.');
  } else if (!G.osV5Updated) {
    termPrint('warn', '[UPD] Factory-OS v5.0 OMEGA có sẵn! Gõ [get_(update_factory-os_v5)] — Giá $25,000.');
  }
  termPrint('sys', '');
  // Fix titlebar text
  const tb = document.querySelector('.terminal-titlebar span[style*="monospace"]');
  if (tb) tb.textContent = `FACTORY-OS ${osVer} — Terminal`;
  setupTerminalInput();
}

function termPrint(cls, text, delay=0) {
  const output = document.getElementById('terminal-output');
  if (!output) return;
  const fn = () => {
    const p = document.createElement('p');
    p.className = 't-line ' + cls;
    p.textContent = text;
    output.appendChild(p);
    output.scrollTop = output.scrollHeight;
  };
  if (delay) setTimeout(fn, delay);
  else fn();
}

function termPrintLines(lines, startDelay=0) {
  lines.forEach(([cls, text, d], i) => {
    termPrint(cls, text, startDelay + (d||0));
  });
}

function setupTerminalInput() {
  const input = document.getElementById('terminal-input');
  if (!input || input._bound) return;
  input._bound = true;
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const cmd = input.value.trim();
      if (!cmd) return;
      termPrint('cmd', (document.getElementById('term-prompt').textContent || 'root@factory:~$') + ' ' + cmd);
      input.value = '';
      processCommand(cmd);
    }
  });
  setTimeout(() => input.focus(), 100);
}

// processCommand(raw) — parses one line of terminal input and dispatches.
// Supported commands:
//   help                       — list all commands
//   call_to(host)              — connect to a vendor
//   catalog                    — list current vendor's goods
//   buy [n]                    — buy item n from catalog
//   bargain                    — attempt to lower current price (max 3/session; +1 free with OS v5)
//   talk_to(host)              — start boss NPC conversation
//   say [n]                    — pick dialogue choice n with current boss
//   boss_catalog               — show boss exclusive items (requires completed dialogue)
//   boss_buy [n]               — buy boss catalog item n
//   buy_internet               — open internet package modal
//   get_(update_factory-os)    — install Factory-OS v3 (free, needs internet)
//   get_(update_factory-os_v4) — install Factory-OS v4 ($5,000)
//   get_(update_factory-os_v5) — install Factory-OS v5 ($25,000)
//   mobile_network_tt          — hidden command: activate free mobile data (one-time)
function processCommand(raw) {
  const cmd = raw.toLowerCase().trim();
  const args = raw.trim();

  if (cmd === 'help') {
    termPrint('sys', '');
    termPrint('info', '╔══════════ LỆNH HỆ THỐNG ══════════╗');
    termPrint('info', '  help          — Xem danh sách lệnh');
    termPrint('info', '  stat_me       — Xem thống kê nhân vật');
    termPrint('info', '  clear         — Xóa màn hình');
    termPrint('info', '  hangup        — Ngắt kết nối hiện tại');
    termPrint('info', '╠══════════ KẾT NỐI ════════════════╣');
    termPrint('info', '  buy_internet  — Mua gói internet (có gói FREE 5 phút/ngày)');
    termPrint('info', '  call_to(url)  — Kết nối tới nhà cung cấp');
    const allVendors = getUndergroundVendors();
    // Base vendors (always shown)
    termPrint('info', '    [v2.0] call_to(gg.com) · call_to(hacker.com)');
    termPrint('info', '           call_to(darknet.onion) · call_to(mrx.shop)');
    termPrint('info', '           call_to(underworld.net)');
    if (G.osUpdated) {
      termPrint('success', '    [v3.0] call_to(phantom.io) · call_to(z3ro.net)');
      termPrint('success', '           call_to(blackrose.onion) · call_to(viper.dark)');
      termPrint('success', '           call_to(cipher.cc)');
    } else {
      termPrint('warn',    '    [v3.0] 🔒 Cài Factory-OS v3.0 để mở 5 vendor mới');
    }
    if (G.osV4Updated) {
      termPrint('success', '    [v4.0] call_to(neon.onion) · call_to(spectre.net)');
      termPrint('success', '           call_to(ironsafe.dark) · call_to(wraith.io)');
      termPrint('success', '           call_to(nexus.shop)');
    } else {
      termPrint('warn',    '    [v4.0] 🔒 Cài Factory-OS v4.0 ($5,000) để mở 5 vendor');
    }
    if (G.osV5Updated) {
      termPrint('success', '    [v5.0] call_to(abyss.onion) · call_to(echo.dark)');
      termPrint('success', '           call_to(titanvault.net) · call_to(phantom2.cc)');
      termPrint('success', '           call_to(deepcore.io)');
    } else {
      termPrint('warn',    '    [v5.0] 🔒 Cài Factory-OS v5.0 ($25,000) để mở 5 VIP vendor');
    }
    termPrint('info', `  📡 Tổng vendor khả dụng: ${allVendors.length}/20`);
    termPrint('info', '╠══════════ ÔNG TRÙM 🔴 ════════════╣');
    termPrint('info', '  talk_to(url) — Kết nối tới ông trùm');
    termPrint('info', '    vd: talk_to(bigshadow.onion)');
    termPrint('info', '        talk_to(ironfist.net)');
    termPrint('info', '        talk_to(ghostqueen.io)');
    termPrint('info', '        talk_to(thegodfather.net)');
    termPrint('info', '        talk_to(reaper.dark)');
    termPrint('info', '  say [N]      — Chọn câu trả lời (hoặc click nút)');
    termPrint('warn', '  ⚠️  Kết quả: GOOD=300 đạn miễn phí | MED=giảm 10-20% | BAD=bị ngắt');
    termPrint('info', '╠══════════ KHI KẾT NỐI ════════════╣');
    termPrint('info', '  tgn           — Mặc cả giảm giá');
    termPrint('info', '  buy [số]      — Mua món hàng (vd: buy 1)');
    termPrint('info', '  boss_catalog  — Xem hàng ông trùm (sau medium ending)');
    termPrint('info', '  boss_buy [N]  — Mua hàng ông trùm');
    termPrint('info', '  list          — Xem lại catalog');
    termPrint('info', '  hangup        — Ngắt kết nối');
    termPrint('info', '╠══════════ HỆ THỐNG OS ════════════╣');
    if (!G.osUpdated) {
      termPrint('warn', '  get_(update_factory-os)        — v3.0 · 🆓 MIỄN PHÍ (+5 vendors, inet -30%)');
    } else {
      termPrint('success', '  ✅ Factory-OS v3.0 đã cài đặt');
    }
    if (G.osUpdated && !G.osV4Updated) {
      termPrint('warn', '  get_(update_factory-os_v4)     — v4.0 · 💲 $5,000 (+5 vendors, inet -10% thêm)');
    } else if (G.osV4Updated) {
      termPrint('success', '  ✅ Factory-OS v4.0 đã cài đặt');
    }
    if (G.osV4Updated && !G.osV5Updated) {
      termPrint('warn', '  get_(update_factory-os_v5)     — v5.0 · 💲 $25,000 (+5 vendors, 1 bargain/session)');
    } else if (G.osV5Updated) {
      termPrint('success', '  ✅ Factory-OS v5.0 đã cài đặt');
    }
    if (G.mobileNetActive) {
      termPrint('success', '  ✅ Mobile Network: ACTIVE (free forever)');
    }
    termPrint('info', '╚════════════════════════════════════╝');
    termPrint('sys', '');
    return;
  }

  if (cmd === 'clear') {
    document.getElementById('terminal-output').innerHTML = '';
    termPrint('sys', 'FACTORY-OS v2.0 — Terminal Ready');
    return;
  }

  if (cmd === 'stat_me') {
    const vm = G.valueMultiplier || 1;
    const rate = getRate() * vm;
    const mins = (G.playedSeconds || 0) / 60;
    termPrint('sys', '');
    termPrint('info', '╔══════════ PLAYER STATS ═══════════╗');
    termPrint('cmd',  `  💵 Balance       : ${fmt(G.money)}`);
    termPrint('cmd',  `  📈 Income/s      : ${fmt(rate)}/s`);
    termPrint('cmd',  `  💹 Value Mult    : x${vm.toFixed(2)}`);
    termPrint('cmd',  `  🏭 Machines      : ${getMachineCount()}`);
    termPrint('cmd',  `  📦 Slots         : ${G.ownedSlots}/15`);
    termPrint('cmd',  `  🎒 Inventory     : ${G.inventory.length}/${G.invMaxSlots}`);
    termPrint('cmd',  `  ♻️  Recycle Pts   : ${G.recyclePoints}`);
    termPrint('cmd',  `  🪙 Xu            : ${G.wallet.xu || 0}`);
    termPrint('cmd',  `  🥇 Gold          : ${G.wallet.gold || 0}`);
    termPrint('cmd',  `  💎 Diamond       : ${G.wallet.diamond || 0}`);
    termPrint('cmd',  `  ⏱️  Played        : ${mins.toFixed(1)} phút`);
    termPrint('cmd',  `  💰 Total Earned  : ${fmt(G.totalEarned)}`);
    termPrint('info', '╠══════════ HỆ THỐNG OS ════════════╣');
    if (!G.osUpdated) {
      termPrint('warn', '  get_(update_factory-os)        — v3.0 · MIỄN PHÍ');
    } else {
      termPrint('success', '  ✅ Factory-OS v3.0 đã cài đặt');
    }
    if (G.osUpdated && !G.osV4Updated) {
      termPrint('warn', '  get_(update_factory-os_v4)     — v4.0 · $5,000');
    } else if (G.osV4Updated) {
      termPrint('success', '  ✅ Factory-OS v4.0 đã cài đặt');
    }
    if (G.osV4Updated && !G.osV5Updated) {
      termPrint('warn', '  get_(update_factory-os_v5)     — v5.0 · $25,000');
    } else if (G.osV5Updated) {
      termPrint('success', '  ✅ Factory-OS v5.0 đã cài đặt');
    }
    if (G.mobileNetActive) {
      termPrint('success', '  ✅ Mobile Network: ACTIVE (free forever)');
    }
    termPrint('info', '╚════════════════════════════════════╝');
    termPrint('sys', '');
    return;
  }

  if (cmd === 'buy_internet') {
    openBuyInternet();
    termPrint('info', '[SYS] Opening internet package store...');
    return;
  }

  if (cmd === 'hangup') {
    if (!terminalState.connected) {
      termPrint('err', 'Không có kết nối nào đang mở.');
      return;
    }
    terminalDisconnect('hangup');
    return;
  }

  if (cmd === 'list' && terminalState.connected) {
    showVendorCatalog();
    return;
  }

  // call_to(url)
  const callMatch = args.match(/^call_to\(([^)]+)\)$/i);
  if (callMatch) {
    const url = callMatch[1].trim().toLowerCase();
    if (terminalState.connected) {
      termPrint('err', 'Đã có kết nối. Gõ [hangup] trước.');
      return;
    }
    doCallTo(url);
    return;
  }

  // tgn - bargain
  if (cmd === 'tgn') {
    if (!terminalState.connected) {
      termPrint('err', 'Chưa kết nối. Dùng call_to(url) trước.');
      return;
    }
    doBargain();
    return;
  }

  // buy [n]
  const buyMatch = cmd.match(/^buy\s+(\d+)$/);
  if (buyMatch) {
    if (!terminalState.connected) {
      termPrint('err', 'Chưa kết nối. Dùng call_to(url) trước.');
      return;
    }
    doBuy(parseInt(buyMatch[1]) - 1);
    return;
  }

  // talk_to(url) - boss connection
  const talkMatch = args.match(/^talk_to\(([^)]+)\)$/i);
  if (talkMatch) {
    const url = talkMatch[1].trim().toLowerCase();
    doTalkTo(url);
    return;
  }

  // say [n] - boss dialogue choice
  const sayMatch = cmd.match(/^say\s+(\d+)$/);
  if (sayMatch) {
    if (!bossState.currentBoss) {
      termPrint('err', 'Chưa kết nối ông trùm. Dùng talk_to(url) trước.');
      return;
    }
    doSay(parseInt(sayMatch[1]));
    return;
  }

  // boss_catalog
  if (cmd === 'boss_catalog') {
    if (!bossState.currentBoss) {
      termPrint('err', 'Chưa kết nối ông trùm.');
      return;
    }
    if (!bossState.catalogReady) {
      termPrint('err', 'Catalog chưa sẵn sàng. Hãy hoàn thành hội thoại trước.');
      return;
    }
    showBossCatalog();
    return;
  }

  // boss_buy [n]
  const bossBuyMatch = cmd.match(/^boss_buy\s+(\d+)$/);
  if (bossBuyMatch) {
    if (!bossState.currentBoss) {
      termPrint('err', 'Chưa kết nối ông trùm. Dùng talk_to(url) trước.');
      return;
    }
    doBossBuy(parseInt(bossBuyMatch[1]) - 1);
    return;
  }

  // get_(update_factory-os)
  if (cmd === 'get_(update_factory-os)') {
    doOsUpdate();
    return;
  }

  // get_(update_factory-os_v4)
  if (cmd === 'get_(update_factory-os_v4)') {
    doOsUpdateV4();
    return;
  }

  // get_(update_factory-os_v5)
  if (cmd === 'get_(update_factory-os_v5)') {
    doOsUpdateV5();
    return;
  }

  // hidden command: mobile_network_tt
  if (cmd === 'mobile_network_tt') {
    doMobileNet();
    return;
  }

  termPrint('err', `Lệnh không hợp lệ: "${raw}". Gõ [help] để xem lệnh.`);
}


// ═══ OS UPDATE COMMAND ════════════════════════════════════════════
// doOsUpdate() — upgrades Factory-OS from v2 to v3 (free, needs internet).
// Shows an animated download progress bar in the terminal, then:
//   - Sets G.osUpdated = true
//   - Sets G.inetDiscount = true (internet packages -30% cheaper)
//   - Unlocks UNDERGROUND_VENDORS_EXTRA (5 new vendors)
// Guarded: won't run if already updated or if no internet is active.
function doOsUpdate() {
  if (G.osUpdated) {
    termPrint('success', '[SYS] Factory-OS v3.0 đã được cài đặt. Không cần cập nhật lại.');
    termPrint('info', `[INFO] +5 nhà cung cấp mới · Giá internet -30%`);
    termPrint('sys', '');
    return;
  }
  if (!hasInternet()) {
    termPrint('err', '[ERR] Cần kết nối internet để tải update.');
    termPrint('info', '[SYS] Gõ [buy_internet] để mua gói internet.');
    return;
  }
  termPrint('sys', '');
  termPrint('warn', '[SYS] Đang kiểm tra phiên bản...');
  setTimeout(() => termPrint('info', '[NET] Phiên bản hiện tại: Factory-OS v2.0'), 400);
  setTimeout(() => termPrint('info', '[NET] Phiên bản mới nhất: Factory-OS v3.0'), 900);
  setTimeout(() => termPrint('warn', '[DL]  Bắt đầu tải xuống update...'), 1400);
  setTimeout(() => {
    // Create progress bar in terminal
    const output = document.getElementById('terminal-output');
    const wrapper = document.createElement('div');
    wrapper.className = 'update-progress-wrap';
    wrapper.innerHTML = `<div style="font-size:11px;color:#4ade80;font-family:monospace;margin-bottom:3px" id="upd-label">[DL]  Đang tải: 0%</div><div class="update-progress-bar"><div class="update-progress-fill" id="upd-fill"></div></div>`;
    output.appendChild(wrapper);
    output.scrollTop = output.scrollHeight;

    const steps = [
      [300,  5,  '[DL]  Đang tải: 5%    ▌ Connecting to update server...'],
      [600,  12, '[DL]  Đang tải: 12%   ▌ Downloading core modules...'],
      [1000, 25, '[DL]  Đang tải: 25%   ▌ factory_os_kernel.pkg'],
      [1500, 38, '[DL]  Đang tải: 38%   ▌ network_layer_v3.pkg'],
      [2100, 52, '[DL]  Đang tải: 52%   ▌ vendor_database_extended.pkg'],
      [2800, 67, '[DL]  Đang tải: 67%   ▌ internet_optimizer.pkg'],
      [3400, 79, '[DL]  Đang tải: 79%   ▌ market_connections.pkg'],
      [4000, 91, '[DL]  Đang tải: 91%   ▌ Finalizing packages...'],
      [4600, 100,'[DL]  Tải xong: 100%  ▌ Verifying checksums...'],
    ];

    steps.forEach(([delay, pct, label]) => {
      setTimeout(() => {
        const fill = document.getElementById('upd-fill');
        const lbl  = document.getElementById('upd-label');
        if (fill) fill.style.width = pct + '%';
        if (lbl)  lbl.textContent = label;
        output.scrollTop = output.scrollHeight;
      }, delay);
    });

    setTimeout(() => {
      termPrint('warn', '[SYS] Đang cài đặt...');
    }, 5200);
    setTimeout(() => termPrint('warn', '[SYS] Khởi động lại các dịch vụ...'), 5800);
    setTimeout(() => termPrint('warn', '[SYS] Áp dụng cấu hình mạng mới...'), 6400);
    setTimeout(() => {
      termPrint('sys', '');
      termPrint('success', '╔═══════════════════════════════════════╗');
      termPrint('success', '   ✅  FACTORY-OS v3.0 — CÀI ĐẶT XONG  ');
      termPrint('success', '╚═══════════════════════════════════════╝');
      termPrint('sys', '');
      termPrint('success', '  📡 +5 nhà cung cấp mới được mở khóa:');
      termPrint('success', '     phantom.io · z3ro.net · blackrose.onion');
      termPrint('success', '     viper.dark  · cipher.cc');
      termPrint('success', '');
      termPrint('success', '  💸 Giá internet giảm 30% vĩnh viễn!');
      termPrint('success', '');
      termPrint('info',    '  Gõ [help] để xem danh sách vendor mới.');
      termPrint('sys', '');
      G.osUpdated = true;
      G.inetDiscount = true;
      saveGame(false);
      showNotif('✅ Factory-OS v3.0! +5 vendors, internet -30%');
      // Update terminal titlebar version
      const tb = document.querySelector('.terminal-titlebar span[style*="monospace"]');
      if (tb) tb.textContent = 'FACTORY-OS v3.0 — Terminal';
    }, 7200);
  }, 1800);
}

// ═══ OS UPDATE v4.0 ════════════════════════════════════════════════
function doOsUpdateV4() {
  if (!G.osUpdated) {
    termPrint('err', '[ERR] Cần cài Factory-OS v3.0 trước. Gõ [get_(update_factory-os)].');
    return;
  }
  if (G.osV4Updated) {
    termPrint('success', '[SYS] Factory-OS v4.0 đã được cài đặt. Không cần cập nhật lại.');
    termPrint('info', `[INFO] +5 nhà cung cấp mới · Giá internet -10% thêm`);
    termPrint('sys', '');
    return;
  }
  if (!hasInternet()) {
    termPrint('err', '[ERR] Cần kết nối internet để tải update.');
    termPrint('info', '[SYS] Gõ [buy_internet] để mua gói internet.');
    return;
  }
  const cost = 5000;
  if (G.money < cost) {
    termPrint('err', `[ERR] Không đủ tiền! Cần $${cost.toLocaleString()}, có ${fmt(G.money)}`);
    termPrint('warn', `[INFO] Factory-OS v4.0 — Giá: $${cost.toLocaleString()}`);
    return;
  }
  G.money -= cost;
  updateUI();
  termPrint('sys', '');
  termPrint('warn', `[STORE] Thanh toán $${cost.toLocaleString()} thành công.`);
  termPrint('warn', '[SYS] Đang kiểm tra phiên bản...');
  setTimeout(() => termPrint('info', '[NET] Phiên bản hiện tại: Factory-OS v3.0'), 400);
  setTimeout(() => termPrint('info', '[NET] Phiên bản mới nhất: Factory-OS v4.0'), 900);
  setTimeout(() => termPrint('warn', '[DL]  Bắt đầu tải xuống update v4.0...'), 1400);
  setTimeout(() => {
    const output = document.getElementById('terminal-output');
    const wrapper = document.createElement('div');
    wrapper.className = 'update-progress-wrap';
    wrapper.innerHTML = `<div style="font-size:11px;color:#4ade80;font-family:monospace;margin-bottom:3px" id="upd4-label">[DL]  Đang tải: 0%</div><div class="update-progress-bar"><div class="update-progress-fill" id="upd4-fill"></div></div>`;
    output.appendChild(wrapper);
    output.scrollTop = output.scrollHeight;
    const steps = [
      [300,  8,  '[DL]  Đang tải: 8%    ▌ Connecting to v4 server...'],
      [700,  20, '[DL]  Đang tải: 20%   ▌ Downloading vendor_network_v4.pkg'],
      [1200, 35, '[DL]  Đang tải: 35%   ▌ underground_ext_v4.pkg'],
      [1800, 55, '[DL]  Đang tải: 55%   ▌ market_nodes_advanced.pkg'],
      [2400, 72, '[DL]  Đang tải: 72%   ▌ inet_optimizer_v4.pkg'],
      [3100, 88, '[DL]  Đang tải: 88%   ▌ Patching core modules...'],
      [3800, 100,'[DL]  Tải xong: 100%  ▌ Verifying v4 checksums...'],
    ];
    steps.forEach(([delay, pct, label]) => {
      setTimeout(() => {
        const fill = document.getElementById('upd4-fill');
        const lbl  = document.getElementById('upd4-label');
        if (fill) fill.style.width = pct + '%';
        if (lbl)  lbl.textContent = label;
        output.scrollTop = output.scrollHeight;
      }, delay);
    });
    setTimeout(() => termPrint('warn', '[SYS] Đang cài đặt v4.0...'), 4400);
    setTimeout(() => termPrint('warn', '[SYS] Khởi động lại mạng lưới ngầm...'), 5000);
    setTimeout(() => {
      termPrint('sys', '');
      termPrint('success', '╔══════════════════════════════════════════╗');
      termPrint('success', '   ✅  FACTORY-OS v4.0 — CÀI ĐẶT XONG    ');
      termPrint('success', '╚══════════════════════════════════════════╝');
      termPrint('sys', '');
      termPrint('success', '  📡 +5 nhà cung cấp mới được mở khóa:');
      termPrint('success', '     neon.onion · spectre.net · ironsafe.dark');
      termPrint('success', '     wraith.io  · nexus.shop');
      termPrint('success', '');
      termPrint('success', '  💸 Giá internet giảm thêm 10%!');
      termPrint('success', '');
      termPrint('info',    '  Gõ [help] để xem danh sách vendor mới.');
      termPrint('sys', '');
      G.osV4Updated = true;
      G.osVersion = 4;
      // Stack discount: already have 30%, add 10% more (now total ~37%)
      // Store as a flag used in getInetPrice
      saveGame(false);
      showNotif('✅ Factory-OS v4.0! +5 vendors, internet -10% thêm');
      const tb = document.querySelector('.terminal-titlebar span[style*="monospace"]');
      if (tb) tb.textContent = 'FACTORY-OS v4.0 — Terminal';
    }, 5700);
  }, 1800);
}

// ═══ OS UPDATE v5.0 ════════════════════════════════════════════════
function doOsUpdateV5() {
  if (!G.osV4Updated) {
    termPrint('err', '[ERR] Cần cài Factory-OS v4.0 trước. Gõ [get_(update_factory-os_v4)].');
    return;
  }
  if (G.osV5Updated) {
    termPrint('success', '[SYS] Factory-OS v5.0 đã được cài đặt. Không cần cập nhật lại.');
    termPrint('info', `[INFO] +5 nhà cung cấp VIP · 1 bargain bonus mỗi phiên`);
    termPrint('sys', '');
    return;
  }
  if (!hasInternet()) {
    termPrint('err', '[ERR] Cần kết nối internet để tải update.');
    termPrint('info', '[SYS] Gõ [buy_internet] để mua gói internet.');
    return;
  }
  const cost = 25000;
  if (G.money < cost) {
    termPrint('err', `[ERR] Không đủ tiền! Cần $${cost.toLocaleString()}, có ${fmt(G.money)}`);
    termPrint('warn', `[INFO] Factory-OS v5.0 — Giá: $${cost.toLocaleString()}`);
    return;
  }
  G.money -= cost;
  updateUI();
  termPrint('sys', '');
  termPrint('warn', `[STORE] Thanh toán $${cost.toLocaleString()} thành công.`);
  termPrint('warn', '[SYS] Đang kiểm tra phiên bản...');
  setTimeout(() => termPrint('info', '[NET] Phiên bản hiện tại: Factory-OS v4.0'), 400);
  setTimeout(() => termPrint('info', '[NET] Phiên bản mới nhất: Factory-OS v5.0'), 900);
  setTimeout(() => termPrint('warn', '[DL]  Bắt đầu tải xuống update v5.0 OMEGA...'), 1400);
  setTimeout(() => {
    const output = document.getElementById('terminal-output');
    const wrapper = document.createElement('div');
    wrapper.className = 'update-progress-wrap';
    wrapper.innerHTML = `<div style="font-size:11px;color:#a78bfa;font-family:monospace;margin-bottom:3px" id="upd5-label">[DL]  Đang tải: 0%</div><div class="update-progress-bar" style="border-color:#3a1e3a"><div class="update-progress-fill" id="upd5-fill" style="background:linear-gradient(90deg,#5a1a8a,#a78bfa)"></div></div>`;
    output.appendChild(wrapper);
    output.scrollTop = output.scrollHeight;
    const steps = [
      [300,  5,  '[DL]  Đang tải: 5%    ▌ Connecting to OMEGA server...'],
      [600,  15, '[DL]  Đang tải: 15%   ▌ Verifying license key...'],
      [1000, 28, '[DL]  Đang tải: 28%   ▌ deepcore_network.pkg'],
      [1600, 44, '[DL]  Đang tải: 44%   ▌ omega_vendor_list.pkg'],
      [2300, 60, '[DL]  Đang tải: 60%   ▌ titan_vault_access.pkg'],
      [3000, 75, '[DL]  Đang tải: 75%   ▌ bargain_engine_v2.pkg'],
      [3800, 90, '[DL]  Đang tải: 90%   ▌ Compiling kernel patches...'],
      [4600, 100,'[DL]  Tải xong: 100%  ▌ OMEGA checksum verified ✓'],
    ];
    steps.forEach(([delay, pct, label]) => {
      setTimeout(() => {
        const fill = document.getElementById('upd5-fill');
        const lbl  = document.getElementById('upd5-label');
        if (fill) fill.style.width = pct + '%';
        if (lbl)  lbl.textContent = label;
        output.scrollTop = output.scrollHeight;
      }, delay);
    });
    setTimeout(() => termPrint('warn', '[SYS] Đang cài đặt v5.0 OMEGA...'), 5200);
    setTimeout(() => termPrint('warn', '[SYS] Mở khóa tầng deepweb cuối cùng...'), 5900);
    setTimeout(() => termPrint('warn', '[SYS] Kích hoạt bargain engine v2...'), 6500);
    setTimeout(() => {
      termPrint('sys', '');
      termPrint('success', '╔═══════════════════════════════════════════════╗');
      termPrint('success', '   ✅  FACTORY-OS v5.0 OMEGA — CÀI ĐẶT XONG   ');
      termPrint('success', '╚═══════════════════════════════════════════════╝');
      termPrint('sys', '');
      termPrint('success', '  📡 +5 nhà cung cấp VIP mở khóa:');
      termPrint('success', '     abyss.onion · echo.dark · titanvault.net');
      termPrint('success', '     phantom2.cc · deepcore.io');
      termPrint('success', '');
      termPrint('success', '  🎯 BONUS: +1 lượt mặc cả MIỄN PHÍ mỗi phiên!');
      termPrint('success', '');
      termPrint('info',    '  Gõ [help] để xem danh sách vendor mới.');
      termPrint('sys', '');
      G.osV5Updated = true;
      G.osVersion = 5;
      saveGame(false);
      showNotif('✅ Factory-OS v5.0 OMEGA! +5 VIP vendors, free bargain!');
      const tb = document.querySelector('.terminal-titlebar span[style*="monospace"]');
      if (tb) tb.textContent = 'FACTORY-OS v5.0 OMEGA — Terminal';
    }, 7400);
  }, 1800);
}
function doMobileNet() {
  if (G.mobileNetActive) {
    termPrint('success', '[MOB] Mobile network đã active rồi. Mày đang dùng free internet.');
    return;
  }
  termPrint('sys', '');
  termPrint('warn',    '[MOB] Detecting mobile network signal...');
  setTimeout(() => termPrint('warn', '[MOB] Tethering to TT mobile backbone...'), 500);
  setTimeout(() => termPrint('warn', '[MOB] Bypassing billing layer...'), 1100);
  setTimeout(() => termPrint('warn', '[MOB] Injecting persistent auth token...'), 1700);
  setTimeout(() => {
    termPrint('success', '');
    termPrint('success', '╔══════════════════════════════════════╗');
    termPrint('success', '   📶  MOBILE NETWORK — ACTIVATED       ');
    termPrint('success', '   🔓  FREE INTERNET — PERMANENT         ');
    termPrint('success', '╚══════════════════════════════════════╝');
    termPrint('success', '');
    termPrint('info', '  Không còn cần mua internet. 100% connect rate.');
    termPrint('sys', '');
    G.mobileNetActive = true;
    saveGame(false);
    updateInetStatusBar();
    showNotif('📶 Mobile Network active! Free internet vĩnh viễn!');
  }, 2400);
}

function doCallTo(url) {
  // Check internet first
  if (!hasInternet()) {
    termPrint('sys', '');
    termPrint('err', '[ERR] NO_INTERNET_CONNECTION');
    termPrint('err', '[ERR] Error code: INET_UNAVAILABLE (0x0003)');
    termPrint('err', '[ERR] Your device has no active internet package.');
    termPrint('err', '[ERR] Purchase a plan to enable outbound connections.');
    termPrint('info', '[SYS] Type [buy_internet] to see available packages.');
    termPrint('sys', '');
    return;
  }

  const vendor = getUndergroundVendors().find(v => v.host === url);

  termPrint('sys', '');
  termPrint('warn', `[SYS] Initializing connection to ${url}...`);

  const connMsgs = [
    [100, 'warn', '[NET] Routing via proxy...'],
    [400, 'warn', '[NET] Bypassing firewall...'],
    [700, 'warn', '[ENC] Encrypting tunnel AES-256...'],
    [1100, 'warn', '[AUTH] Verifying anonymous identity...'],
  ];

  connMsgs.forEach(([d, cls, msg]) => setTimeout(() => termPrint(cls, msg), d));

  if (!vendor) {
    setTimeout(() => {
      termPrint('err', `[ERR] Host not found: ${url}`);
      termPrint('err', '[ERR] Connection refused. (Try URLs listed in help)');
      termPrint('sys', '');
    }, 1500);
    return;
  }

  // Apply connection chance based on internet package
  const chance = getInetConnectChance();
  const roll = Math.random();

  setTimeout(() => {
    if (roll >= chance) {
      // Connection failed — roll >= chance means failure (e.g. chance=0.6: roll<0.6 succeeds, roll>=0.6 fails)
      termPrint('err', `[ERR] CONNECTION_FAILED — packet loss too high.`);
      termPrint('err', `[ERR] Your current plan (${(G.inetPackage||'').toUpperCase()}) failed to reach ${url}.`);
      termPrint('info', `[SYS] Upgrade to a better plan for higher success rate.`);
      termPrint('sys', '');
      return;
    }

    terminalState.connected = true;
    terminalState.currentVendor = vendor;
    terminalState.bargainCount = 0;
    // Apply speed package bargain bonus + v5 OS bonus
    const v5Bonus = G.osV5Updated ? 1 : 0;
    terminalState.maxBargains = 3 + (G.inetBargainBonus || 0) + v5Bonus;
    if (G.inetBargainBonus > 0) {
      G.inetBargainBonus = 0; // consume bonus
    }
    // Generate random catalog for this session
    terminalState.currentCatalog = generateVendorCatalog();
    document.getElementById('term-conn-status').textContent = '● CONNECTED: ' + vendor.alias;
    document.getElementById('term-conn-status').style.color = '#4ade80';
    document.getElementById('term-prompt').textContent = vendor.alias + ':~$';

    termPrint('success', `[OK] Connection established → ${vendor.alias}@${url}`);
    if (terminalState.maxBargains > 3) termPrint('info', `[BONUS] Speed plan: +${terminalState.maxBargains - 3} extra bargain(s) available!`);
    termPrint('sys', '──────────────────────────────────────');
    termPrint('vendor-name', `[${vendor.alias}] ` + vendor.greeting);
    termPrint('sys', '');
    setTimeout(() => showVendorCatalog(), 600);
  }, 1600);
}

function generateVendorCatalog() {
  // Pick 4-6 random items and assign prices with slight random variance
  const shuffled = [...BLACK_MARKET_GOODS].sort(() => Math.random()-0.5);
  const count = 4 + Math.floor(Math.random() * 3);
  return shuffled.slice(0, count).map(item => ({
    ...item,
    currentPrice: item.basePrice * (0.9 + Math.random() * 0.3), // ±20% variance
    originalPrice: item.basePrice * (0.9 + Math.random() * 0.3),
  }));
}

function showVendorCatalog() {
  const v = terminalState.currentVendor;
  const cat = terminalState.currentCatalog;
  termPrint('vendor', `[${v.alias}] Đây là hàng tao có:`);
  termPrint('sys', '');
  cat.forEach((item, i) => {
    termPrint('price', `  [${i+1}] ${item.icon} ${item.name}`);
    termPrint('info', `       ${item.desc}`);
    termPrint('warn', `       Giá: $${item.currentPrice.toFixed(2)}`);
    termPrint('sys', '');
  });
  termPrint('vendor', `[${v.alias}] Gõ [buy 1] để mua, [tgn] để mặc cả, [hangup] để ngắt.`);
}

function doBargain() {
  const v = terminalState.currentVendor;
  const cat = terminalState.currentCatalog;
  terminalState.bargainCount++;

  const moodResponses = {
    chill:        ['oke oke, tao giảm chút', 'hmm... được thôi', 'mày lì thật, oke giảm'],
    paranoid:     ['... mày nghĩ tao bán lỗ hả', 'coi chừng tao block mày đó', 'lần này thôi nhé'],
    nervous:      ['thôi được rồi, đừng ồn', 'ok ok giảm rồi, im đi', 'hạ giọng xuống...'],
    professional: ['được, điều chỉnh giá theo thị trường', 'chính sách linh hoạt, giảm 8%', 'ok discount'],
    suspicious:   ['mày mặc cả nhiều vậy, tao để ý đó', 'lần này thôi', '...oke lần cuối'],
  };

  if (terminalState.bargainCount > terminalState.maxBargains) {
    // Disconnect angry
    const angryMsgs = {
      chill:        'đm mày mặc cả nhiều vãi. tao off đây.',
      paranoid:     'mày làm tao nghi ngờ quá. DISCONNECT.',
      nervous:      'thôi tao sợ rồi, tao không bán nữa!',
      professional: 'Quý khách mặc cả vượt giới hạn. Ngắt kết nối.',
      suspicious:   'tao biết mày là cop. get out.',
    };
    termPrint('vendor-name', `[${v.alias}] ${angryMsgs[v.mood] || 'tao không bán nữa.'}`);
    setTimeout(() => terminalDisconnect('angry'), 800);
    return;
  }

  const discount = 0.05 + Math.random() * 0.08; // 5-13% off
  cat.forEach(item => {
    item.currentPrice = item.currentPrice * (1 - discount);
  });

  const responses = moodResponses[v.mood] || moodResponses.chill;
  const resp = responses[Math.min(terminalState.bargainCount-1, responses.length-1)];
  termPrint('vendor-name', `[${v.alias}] ${resp}`);
  termPrint('success', `  → Giá giảm ${(discount*100).toFixed(0)}%! Catalog mới:`);
  termPrint('sys', '');
  cat.forEach((item, i) => {
    termPrint('price', `  [${i+1}] ${item.icon} ${item.name} — $${item.currentPrice.toFixed(2)}`);
  });
  termPrint('sys', '');

  if (terminalState.bargainCount === terminalState.maxBargains) {
    const warnMsgs = {
      chill: 'lần cuối đó nghen.',
      paranoid: 'đây là lần cuối tao giảm.',
      nervous: 'đừng mặc cả nữa, tao sắp tắt máy rồi.',
      professional: 'Đây là mức giá cuối cùng.',
      suspicious: 'tao không giảm thêm nữa đâu.',
    };
    termPrint('vendor-name', `[${v.alias}] ${warnMsgs[v.mood] || 'lần cuối đó.'}`);
  }
}

function doBuy(idx) {
  const v = terminalState.currentVendor;
  const cat = terminalState.currentCatalog;

  if (idx < 0 || idx >= cat.length) {
    termPrint('err', `Số không hợp lệ. Chọn từ 1 đến ${cat.length}.`);
    return;
  }

  const item = cat[idx];
  if (G.money < item.currentPrice) {
    termPrint('err', `Không đủ tiền! Cần $${item.currentPrice.toFixed(2)}, có ${fmt(G.money)}`);
    termPrint('vendor-name', `[${v.alias}] thiếu tiền còn đòi mua, xéo đi.`);
    return;
  }
  if (G.inventory.length >= G.invMaxSlots) {
    termPrint('err', 'Kho đầy! Vào tab Kho đồ để dọn chỗ.');
    return;
  }

  G.money -= item.currentPrice;
  termPrint('warn', `[TXN] Thanh toán $${item.currentPrice.toFixed(2)}...`);

  setTimeout(() => {
    // 99% success rate
    const success = Math.random() < 0.99;
    if (success) {
      G.inventory.push({
        id: 'bm_inv_' + Date.now() + '_' + Math.random().toString(36).slice(2),
        itemId: item.id,
        name: item.name,
        icon: item.icon,
        boughtPrice: item.currentPrice,
        tier: 'tech',
        recyclePoints: Math.floor(item.basePrice / 10),
        baseMinPrice: item.basePrice * 0.8,
        baseMaxPrice: item.basePrice * 1.5,
      });
      termPrint('success', `[OK] Giao dịch thành công!`);
      termPrint('success', `     ${item.icon} ${item.name} → 🎒 Kho đồ`);
      termPrint('vendor-name', `[${v.alias}] xong. hàng vào kho mày rồi. cẩn thận đấy.`);
      // Remove from catalog
      terminalState.currentCatalog.splice(idx, 1);
      updateUI(); saveGame(false);
      if (document.getElementById('panel-inventory').classList.contains('active')) renderInventory();
    } else {
      termPrint('err', `[FAIL] Giao dịch thất bại! Mất $${item.currentPrice.toFixed(2)}.`);
      termPrint('vendor-name', `[${v.alias}] có vấn đề phát sinh, tiền mày mất rồi. xin lỗi :)`);
      updateUI(); saveGame(false);
    }
    termPrint('sys', '');
    if (terminalState.currentCatalog.length === 0) {
      termPrint('vendor-name', `[${v.alias}] hết hàng rồi. tao off.`);
      setTimeout(() => terminalDisconnect('sold_out'), 1000);
    }
  }, 800);
}

function terminalDisconnect(reason) {
  const v = terminalState.currentVendor;
  const alias = v ? v.alias : '???';

  termPrint('sys', '──────────────────────────────────────');
  if (reason === 'angry') {
    termPrint('disconnect', `[${alias}] *** ĐƯỜNG DÂY BỊ NGẮT ĐỘT NGỘT ***`);
  } else if (reason === 'hangup') {
    termPrint('info', `[SYS] Ngắt kết nối với ${alias}...`);
    termPrint('info', `[SYS] Connection closed.`);
  } else if (reason === 'sold_out') {
    termPrint('info', `[SYS] ${alias} đã ngắt kết nối (hết hàng).`);
  } else {
    termPrint('info', `[SYS] Kết nối kết thúc.`);
  }
  termPrint('disconnect', `[NET] *** DISCONNECTED ***`);
  termPrint('sys', '');

  terminalState.connected = false;
  terminalState.currentVendor = null;
  terminalState.currentCatalog = [];
  terminalState.bargainCount = 0;

  const statusEl = document.getElementById('term-conn-status');
  const promptEl = document.getElementById('term-prompt');
  if (statusEl) { statusEl.textContent = '● OFFLINE'; statusEl.style.color = '#1f3a1f'; }
  if (promptEl) promptEl.textContent = 'root@factory:~$';
}

// renderAll() — full redraw of every panel.
// Called on tab switch and after major state changes (buy, sell, etc.).
// Avoids re-rendering hidden panels to save CPU — most render functions
// check whether their panel has the .active class before doing work.
function renderAll() { renderSlots(); renderShopTabs(); renderShopContent(); updateUI(); renderTaxBadge(); }
renderAll();

// ═══ TAB SCROLL HELPER ═══════════════════════════════════════════
function scrollTabs(delta) {
  const el = document.getElementById('main-tabs-el');
  if (el) el.scrollLeft += delta;
}

// ═══ OPTIMIZED MAIN GAME LOOP ════════════════════════════════════
// ═══ FPS LOCKER ═══════════════════════════════════════════════════
// Target FPS setting — saved to localStorage, default 30
//
// ARCHITECTURE (fixed):
//   • requestAnimationFrame fires at the monitor refresh rate (≤ 60 Hz on most screens).
//     At 120 FPS, _fpsInterval = 8.33 ms but RAF only ticks every ~16.67 ms, so the
//     old single-RAF design made 120 FPS identical to 60 FPS — no extra CPU/GPU load.
//
//   • FIX: rendering is extracted into _doRender().
//     ┌──────────┬───────────────────────────────────────────────────────────────┐
//     │  30 FPS  │ RAF loop, render every other frame (~33 ms)                  │
//     │  60 FPS  │ RAF loop, render every frame (~16.7 ms)                      │
//     │ 120 FPS  │ setInterval at 8.33 ms → actually bypasses 60 Hz RAF cap;   │
//     │          │ renders 2× per monitor frame → genuinely doubles CPU/GPU use │
//     └──────────┴───────────────────────────────────────────────────────────────┘
const FPS_KEY = 'factory_fps_target';
let _fpsTarget   = 30;
let _fpsInterval = 1000 / _fpsTarget; // ms per frame budget (used by RAF path)
let _renderIntervalId = null;         // setInterval handle for 120 FPS mode

// ── _doRender() — all DOM writes live here, called by RAF (30/60) or setInterval (120) ──
function _doRender() {
  if (!hasPower()) return;

  const vm2        = G.valueMultiplier || 1;
  const speedMult2 = (G.matBonuses && G.matBonuses.speedBoost) || 1;
  let   totalRate2 = 0;
  G.slots.forEach(s => { if (s && ALL_M[s.machine]) totalRate2 += ALL_M[s.machine].rate; });

  const moneyEl = document.getElementById('mb-dollar');
  const hdrEl   = document.getElementById('hdr-money');
  const rateEl  = document.getElementById('mb-rate');
  const vmEl    = document.getElementById('mb-vmult');
  const totalEl = document.getElementById('mb-total');
  if (moneyEl) moneyEl.textContent = fmt(G.money);
  if (hdrEl)   hdrEl.textContent   = fmt(G.money);
  if (rateEl)  rateEl.textContent  = fmt(totalRate2 * vm2 * speedMult2) + '/s';
  if (vmEl)    vmEl.textContent    = 'x' + vm2.toFixed(vm2 < 10 ? 2 : vm2 < 1000 ? 1 : 0);
  if (totalEl) totalEl.textContent = fmt(G.totalEarned);

  // Progress bars
  const pct = (_progVal * 100).toFixed(1) + '%';
  for (let i = 0; i < G.ownedSlots; i++) {
    const s = G.slots[i];
    if (!s || !s.machine) continue;
    const el = document.getElementById('pg' + i);
    if (el) el.style.width = pct;
  }
}

function setFpsTarget(fps) {
  fps = parseInt(fps);
  if (![30, 60, 120].includes(fps)) fps = 30;
  _fpsTarget   = fps;
  _fpsInterval = 1000 / fps;
  try { localStorage.setItem(FPS_KEY, fps); } catch(e) {}

  // Update UI buttons
  [30, 60, 120].forEach(f => {
    const btn = document.getElementById('fps-btn-' + f);
    if (btn) btn.classList.toggle('fps-btn--active', f === fps);
  });
  const lbl = document.getElementById('fps-current-label');
  if (lbl) lbl.textContent = fps + ' FPS';

  // ── 120 FPS: launch a dedicated setInterval to push renders past the 60 Hz RAF cap ──
  // ── 30/60 FPS: clear any existing interval; rendering handled inside RAF loop       ──
  if (_renderIntervalId !== null) {
    clearInterval(_renderIntervalId);
    _renderIntervalId = null;
  }
  if (fps === 120) {
    // Interval of ~8.33 ms → ~120 renders/sec regardless of monitor refresh rate.
    // This genuinely doubles DOM paint calls vs 60 FPS, forcing extra CPU/GPU work.
    _renderIntervalId = setInterval(_doRender, 1000 / 120);
  }
}

function loadFpsTarget() {
  let saved = 30;
  try { saved = parseInt(localStorage.getItem(FPS_KEY)) || 30; } catch(e) {}
  if (![30, 60, 120].includes(saved)) saved = 30;
  setFpsTarget(saved);
}

// ── Game loop state ────────────────────────────────────────────────
let _progVal    = 0;  // progress 0→1 over 10 s cycle
let _lastTick   = 0;  // timestamp of last logic tick
let _lastRender = 0;  // timestamp of last RAF render (30/60 FPS path)

// _gameLoop(now) — RAF loop.
//   GAME LOGIC  : runs every RAF frame (delta-time keeps money/power always accurate).
//   DOM RENDER  : throttled to _fpsTarget for 30 & 60 FPS.
//                 Skipped entirely for 120 FPS (setInterval handles it above).
function _gameLoop(now) {
  requestAnimationFrame(_gameLoop);

  // ── Init on first frame ──
  if (!_lastTick) { _lastTick = now; _lastRender = now; return; }

  const dt = Math.min((now - _lastTick) / 1000, 0.2); // seconds, capped at 200 ms
  _lastTick = now;

  // ── GAME LOGIC — always runs every RAF frame (delta-time keeps accuracy) ──
  if (hasPower()) {
    const vm        = G.valueMultiplier || 1;
    const speedMult = (G.matBonuses && G.matBonuses.speedBoost) || 1;
    let   totalRate = 0;
    G.slots.forEach(s => { if (s && ALL_M[s.machine]) totalRate += ALL_M[s.machine].rate; });
    const earned = totalRate * vm * speedMult * dt;

    if (earned > 0) {
      G.money             = Math.min(G.money + earned, 999e12);
      G.totalEarned      += earned;
      G.playedSeconds    += dt;
      G.valueMultiplier   = 1.0 * Math.pow(1 + 0.01 / 60, G.playedSeconds);
    }

    // Advance progress bar accumulator (rendered below or by interval)
    _progVal = (_progVal + dt / 10) % 1;
  }

  // ── DOM RENDER — 30 / 60 FPS path (120 FPS uses setInterval above, skip here) ──
  if (_fpsTarget === 120) return;

  const elapsed = now - _lastRender;
  if (elapsed < _fpsInterval - 0.5) return;          // not yet time for next frame
  _lastRender = now - (elapsed % _fpsInterval);       // drift-corrected timestamp

  _doRender();
}

// Load saved FPS before starting loop
loadFpsTarget();
requestAnimationFrame(_gameLoop);

// ═══ LOTTERY ══════════════════════════════════════════════════════
// lotteryBet / lotteryHistory / lotteryMode stored in G for localStorage
let lotterySpinning = false;

function getLotteryBet()   { return G.lotteryBet  || 10; }
function setLotteryBet(v)  { G.lotteryBet = v; }
function getLotteryMode()  { return G.lotteryMode  || 'jackpot'; }
function setLotteryMode(m) { G.lotteryMode = m; }

// ── Prize tables ─────────────────────────────────────────────────
const JACKPOT_MULTS = { 2:1.5*200, 3:3*200, 4:4*200, 5:4.5*200 };
const MEGA_MULTS    = { 2:1.5*7*200, 3:3*7*200, 4:4*7*200, 5:4.5*7*200 };  // ×7 vs jackpot

function getMults() { return getLotteryMode()==='mega' ? MEGA_MULTS : JACKPOT_MULTS; }

function getMultiplier(run) {
  const t = getMults();
  const base = t[Math.min(run,5)] || 0;
  if (base === 0) return 0;
  return base + ((G.matBonuses&&G.matBonuses.lotteryLuckBonus)||0);
}

// ── Consecutive logic ─────────────────────────────────────────────
// jackpot: liên kề nếu cách nhau đúng 1 (đơn vị)
// mega:    liên kề nếu cách nhau đúng 10 (hàng chục)
function getLongestConsecutiveRun(nums) {
  const step = getLotteryMode()==='mega' ? 10 : 1;
  const sorted = [...nums].sort((a,b) => a-b);
  let maxRun = 1, curRun = 1;
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === sorted[i-1] + step) { curRun++; if (curRun>maxRun) maxRun=curRun; }
    else if (sorted[i] !== sorted[i-1])   { curRun = 1; }
  }
  return maxRun;
}

// ── Number pool ───────────────────────────────────────────────────
function generatePool() {
  if (getLotteryMode() === 'mega') {
    // multiples of 10 from 10 to 990 → 99 numbers
    return Array.from({length:99}, (_,i) => (i+1)*10);
  }
  return Array.from({length:99}, (_,i) => i+1); // 1-99
}

// ── Mode switch ───────────────────────────────────────────────────
function switchLotteryMode(mode) {
  if (lotterySpinning) return;
  setLotteryMode(mode);
  saveGame(false);
  // Reset balls
  const ballsEl = document.getElementById('lottery-balls');
  if (ballsEl) {
    ballsEl.querySelectorAll('.lball').forEach(b => { b.className='lball lball-idle'; b.textContent='?'; });
  }
  const resultEl = document.getElementById('lottery-result-text');
  if (resultEl) resultEl.textContent = '';
  renderLotteryModeUI();
}

function renderLotteryModeUI() {
  const mode = getLotteryMode();
  const isMega = mode === 'mega';

  // Mode selector highlight
  const jEl = document.getElementById('lmode-jackpot');
  const mEl = document.getElementById('lmode-mega');
  if (jEl) {
    jEl.style.border = isMega ? '2px solid #1f2937' : '2px solid #7c3aed';
    jEl.style.background = isMega ? '#111827' : 'linear-gradient(135deg,#1a0a2e,#0d0a1a)';
    jEl.querySelector('div:nth-child(2)').style.color = isMega ? '#6b7280' : '#c4b5fd';
  }
  if (mEl) {
    mEl.style.border = isMega ? '2px solid #d97706' : '2px solid #1f2937';
    mEl.style.background = isMega ? 'linear-gradient(135deg,#1a1000,#0d0d00)' : '#111827';
    mEl.querySelector('div:nth-child(2)').style.color = isMega ? '#fbbf24' : '#6b7280';
  }

  // Spin button color
  const btn = document.getElementById('lottery-spin-btn');
  if (btn) {
    btn.style.background = isMega
      ? 'linear-gradient(135deg,#3a2a00,#1a1500)'
      : 'linear-gradient(135deg,#3a1a5a,#1a1a4a)';
    btn.style.color   = isMega ? '#fbbf24' : '#c4b5fd';
    btn.style.borderColor = isMega ? '#d9770666' : '#7c3aed66';
    if (!btn.disabled) btn.textContent = isMega ? '🌟 QUAY MEGA365' : '🎰 QUAY JACKPOT365';
  }

  // Mode labels
  const lbl = document.getElementById('lottery-mode-label');
  const sub = document.getElementById('lottery-mode-sub');
  if (lbl) { lbl.textContent = isMega ? 'MEGA365' : 'JACKPOT365'; lbl.style.color = isMega ? '#fbbf24' : '#c4b5fd'; }
  if (sub) sub.textContent = isMega ? 'KẾT QUẢ — MEGA365 (hàng chục)' : 'KẾT QUẢ — JACKPOT365';

  // Prize table
  const tbl = document.getElementById('lottery-prize-table');
  if (tbl) {
    const mults = getMults();
    const c2 = isMega ? '#fbbf24' : '#4ade80';
    const c3 = isMega ? '#f59e0b' : '#60a5fa';
    const c4 = isMega ? '#fb923c' : '#f59e0b';
    const desc2 = isMega ? '2 chục liên kề (VD: 10,20)' : '2 số liên kề (VD: 3,4)';
    const desc3 = isMega ? '3 chục liên kề' : '3 số liên kề';
    const desc4 = isMega ? '4 chục liên kề' : '4 số liên kề';
    const desc5 = isMega ? '5 chục liên kề 🌟' : '5 số liên kề 🌟';
    tbl.innerHTML = `
      <div style="background:#0d1117;border:1px solid #1f2937;border-radius:7px;padding:9px;display:flex;justify-content:space-between;align-items:center">
        <span style="color:#6b7280;font-size:12px">${desc2}</span><span style="color:${c2};font-weight:700">×${mults[2]}</span>
      </div>
      <div style="background:#0d1117;border:1px solid #1f2937;border-radius:7px;padding:9px;display:flex;justify-content:space-between;align-items:center">
        <span style="color:#6b7280;font-size:12px">${desc3}</span><span style="color:${c3};font-weight:700">×${mults[3]}</span>
      </div>
      <div style="background:#0d1117;border:1px solid #1f2937;border-radius:7px;padding:9px;display:flex;justify-content:space-between;align-items:center">
        <span style="color:#6b7280;font-size:12px">${desc4}</span><span style="color:${c4};font-weight:700">×${mults[4]}</span>
      </div>
      <div style="background:${isMega?'linear-gradient(135deg,#1a1000,#0d0d00)':'linear-gradient(135deg,#1a0a2e,#0d1117)'};border:1px solid ${isMega?'#4a3000':'#2d1a4a'};border-radius:7px;padding:9px;display:flex;justify-content:space-between;align-items:center">
        <span style="color:${isMega?'#fcd34d':'#a78bfa'};font-size:12px">${desc5}</span><span style="color:${isMega?'#fbbf24':'#e879f9'};font-weight:700">×${mults[5]}</span>
      </div>
      <div style="background:#1a0808;border:1px solid #3b1a1a;border-radius:7px;padding:9px;display:flex;justify-content:space-between;align-items:center;grid-column:span 2">
        <span style="color:#f87171;font-size:12px">Không liên kề</span><span style="color:#f87171;font-weight:600">Mất 80% tiền cược</span>
      </div>`;
  }
}

// ── Bet presets ───────────────────────────────────────────────────
const LOTTERY_BET_PRESETS = [
  { label:'$10',  fn:()=>setBet(10) },
  { label:'$50',  fn:()=>setBet(50) },
  { label:'$100', fn:()=>setBet(100) },
  { label:'$500', fn:()=>setBet(500) },
  { label:'$1K',  fn:()=>setBet(1000) },
  { label:'$5K',  fn:()=>setBet(5000) },
  { label:'10%',  fn:()=>setBetPercent(0.1) },
  { label:'25%',  fn:()=>setBetPercent(0.25) },
  { label:'50%',  fn:()=>setBetPercent(0.5) },
  { label:'MAX',  fn:()=>setBetPercent(1), special:true },
];

function renderLottery() {
  const btns = document.getElementById('lottery-bet-btns');
  if (btns && !btns._rendered) {
    btns._rendered = true;
    btns.innerHTML = '';
    LOTTERY_BET_PRESETS.forEach(p => {
      const b = document.createElement('button');
      b.className = 'lbet-btn' + (p.special ? ' lbet-all' : '');
      b.textContent = p.label;
      b.onclick = p.fn;
      btns.appendChild(b);
    });
  }
  // Init balls
  const ballsEl = document.getElementById('lottery-balls');
  if (ballsEl && ballsEl.children.length === 0) {
    for (let i = 0; i < 5; i++) {
      const d = document.createElement('div');
      d.className = 'lball lball-idle';
      d.textContent = '?';
      ballsEl.appendChild(d);
    }
  }
  renderLotteryModeUI();
  updateLotteryUI();
  renderLotteryHistory();
}

function updateLotteryUI() {
  const inp = document.getElementById('lottery-bet-input');
  const bal = document.getElementById('lottery-balance');
  if (inp) inp.value = getLotteryBet();
  if (bal) bal.textContent = fmt(G.money);
}

function setBet(amount) {
  setLotteryBet(Math.max(1, Math.min(amount, G.money)));
  updateLotteryUI();
}

function setBetPercent(pct) {
  setLotteryBet(Math.max(1, Math.floor(G.money * pct)));
  updateLotteryUI();
}

function syncBetFromInput() {
  const inp = document.getElementById('lottery-bet-input');
  if (!inp) return;
  const v = parseFloat(inp.value);
  if (!isNaN(v) && v > 0) setLotteryBet(Math.min(v, G.money));
}

// ── Spin ──────────────────────────────────────────────────────────
function spinLottery() {
  if (lotterySpinning) return;
  syncBetFromInput();
  const bet = Math.floor(getLotteryBet());
  if (bet < 1)          { showError('⚠️ Tiền cược phải lớn hơn 0!'); return; }
  if (G.money < bet)    { showError('💸 Không đủ tiền cược!'); return; }

  const mode   = getLotteryMode();
  const isMega = mode === 'mega';

  lotterySpinning = true;
  G.money -= bet;
  updateUI();
  updateLotteryUI();

  const btn      = document.getElementById('lottery-spin-btn');
  const resultEl = document.getElementById('lottery-result-text');
  const ballsEl  = document.getElementById('lottery-balls');
  if (btn) { btn.disabled = true; btn.textContent = '⏳ Đang quay...'; }
  if (resultEl) resultEl.textContent = '';

  const balls = ballsEl ? ballsEl.querySelectorAll('.lball') : [];
  balls.forEach(b => { b.className = 'lball lball-spin'; b.textContent = '?'; });

  // Draw 5 unique numbers from pool
  const pool    = generatePool();
  const result  = pool.sort(()=>Math.random()-0.5).slice(0,5);
  const step    = isMega ? 10 : 1;

  const revealDelay = 350;
  result.forEach((num, i) => {
    setTimeout(() => {
      if (balls[i]) {
        balls[i].className = 'lball lball-idle';
        balls[i].textContent = isMega ? num : (num < 10 ? '0'+num : num);
      }
    }, revealDelay * (i+1));
  });

  setTimeout(() => {
    const run  = getLongestConsecutiveRun(result);
    const mult = getMultiplier(run);
    const sorted = [...result].sort((a,b)=>a-b);

    // Find best consecutive segment for highlighting
    let bestStart=0, bestLen=1, curStart=0, curLen=1;
    for (let i=1; i<sorted.length; i++) {
      if (sorted[i] === sorted[i-1]+step) { curLen++; }
      else { curStart=i; curLen=1; }
      if (curLen>bestLen) { bestLen=curLen; bestStart=curStart-(curLen-1); }
    }
    const winNums = new Set(sorted.slice(bestStart, bestStart+bestLen));

    balls.forEach((b, i) => {
      const num = result[i];
      if (mult===0)           b.className = 'lball lball-miss';
      else if (winNums.has(num)) b.className = mult>=(isMega?4.5*7:4.5) ? 'lball lball-jackpot' : 'lball lball-hit';
      else                    b.className = 'lball lball-idle';
    });

    let profit=0, msg='', color='';
    const modeTag = isMega ? '[MEGA] ' : '';
    if (mult > 0) {
      profit = Math.floor(bet * mult) - bet;
      G.money += Math.floor(bet * mult);
      const isJackpot = run>=5;
      const label = isJackpot
        ? (isMega ? '5 chục liên kề 🌟 MEGA JACKPOT!' : '5 số liên kề 🌟 JACKPOT!')
        : (isMega ? `${run} chục liên kề` : `${run} số liên kề`);
      msg   = `✅ ${modeTag}${label} → ×${mult} → +${fmt(profit)}`;
      color = isJackpot ? (isMega?'#fbbf24':'#e879f9') : run>=4 ? '#f59e0b' : run>=3 ? '#60a5fa' : '#4ade80';
      showNotif(`🎉 ${label}! +${fmt(profit)}`);
      // Đánh thuế trên tiền thắng
      if (profit > 0) taxIssueBill('🎰 Tiền thắng xổ số', Math.floor(bet * mult));
    } else {
      profit = -Math.floor(bet * 0.8);
      G.money += Math.floor(bet * 0.2);
      msg   = `❌ ${modeTag}Không liên kề → Mất ${fmt(Math.abs(profit))}`;
      color = '#f87171';
      showError(`💸 Không liên kề! Mất ${fmt(Math.abs(profit))}`);
    }

    if (resultEl) { resultEl.textContent = msg; resultEl.style.color = color; }

    G.lotteryHistory.unshift({ nums: result.join(' · '), run, mult, bet, profit, mode });
    if (G.lotteryHistory.length > 50) G.lotteryHistory.pop();
    renderLotteryHistory();

    if (btn) {
      btn.disabled = false;
      btn.textContent = isMega ? '🌟 QUAY MEGA365' : '🎰 QUAY JACKPOT365';
    }
    lotterySpinning = false;
    updateUI();
    updateLotteryUI();
    saveGame(false);
  }, revealDelay * 5 + 400);
}

// ── History ───────────────────────────────────────────────────────
function renderLotteryHistory() {
  const el      = document.getElementById('lottery-history');
  const statsEl = document.getElementById('lottery-stats-bar');
  const countEl = document.getElementById('lottery-hist-count');
  if (!el) return;

  const hist = G.lotteryHistory || [];
  if (countEl) countEl.textContent = hist.length;

  if (statsEl) {
    if (hist.length === 0) {
      statsEl.style.display = 'none';
    } else {
      statsEl.style.display = 'grid';
      const wins       = hist.filter(h => h.mult > 0).length;
      const totalProfit = hist.reduce((s,h) => s + (h.profit||0), 0);
      const winRate    = (wins / hist.length * 100).toFixed(1);
      const profitColor = totalProfit >= 0 ? '#4ade80' : '#f87171';
      const profitStr   = (totalProfit >= 0 ? '+' : '') + fmt(totalProfit);
      const jackpots    = hist.filter(h => h.run >= 5).length;
      statsEl.innerHTML = `
        <div><div style="color:#6b7280;font-size:10px;margin-bottom:2px">TỶ LỆ THẮNG</div><div style="color:#60a5fa;font-weight:600">${winRate}%</div></div>
        <div><div style="color:#6b7280;font-size:10px;margin-bottom:2px">TỔNG LỜI/LỖ</div><div style="color:${profitColor};font-weight:600">${profitStr}</div></div>
        <div><div style="color:#6b7280;font-size:10px;margin-bottom:2px">JACKPOT</div><div style="color:#e879f9;font-weight:600">${jackpots} lần</div></div>`;
    }
  }

  if (hist.length === 0) {
    el.innerHTML = '<div style="font-size:12px;color:#374151;text-align:center;padding:10px">Chưa có lịch sử</div>';
    return;
  }
  el.innerHTML = hist.map(h => {
    const win   = h.mult > 0;
    const isMH  = h.mode === 'mega';
    const color = win
      ? (h.run>=5 ? (isMH?'#fbbf24':'#e879f9') : h.run>=4 ? '#f59e0b' : h.run>=3 ? '#60a5fa' : '#4ade80')
      : '#f87171';
    const label = win
      ? `${h.run} ${isMH?'chục':'số'} liên kề ×${h.mult}`
      : 'Không liên kề';
    const badge = isMH
      ? `<span style="background:#1a1000;color:#fbbf24;border:1px solid #4a3000;border-radius:4px;padding:1px 5px;font-size:9px;margin-right:4px">MEGA</span>`
      : `<span style="background:#0d0a1a;color:#a78bfa;border:1px solid #2d1a4a;border-radius:4px;padding:1px 5px;font-size:9px;margin-right:4px">J365</span>`;
    const profitStr = (h.profit >= 0 ? '+' : '') + fmt(h.profit);
    return `<div class="lhist-row">
      ${badge}
      <span style="color:#4b5563;font-family:monospace;font-size:11px">${h.nums}</span>
      <span style="color:${color};font-size:11px;margin-left:auto;white-space:nowrap">${label}</span>
      <span style="color:${color};font-weight:600;font-size:12px;white-space:nowrap">${profitStr}</span>
    </div>`;
  }).join('');
}

function clearLotteryHistory() {
  if (!confirm('Xóa toàn bộ lịch sử xổ số?')) return;
  G.lotteryHistory = [];
  renderLotteryHistory();
  saveGame(false);
  showNotif('🗑 Đã xóa lịch sử!');
}

// ═══ MATERIALS SHOP ═══════════════════════════════════════════════

const MAT_ITEMS = [
  {
    id: 'mat_speedcore',
    name: 'Speed Core',
    icon: '⚡',
    desc: 'Tăng tốc độ sản xuất của tất cả máy +25%',
    effect: 'speedBoost +25%',
    color: '#fbbf24',
    theme: '#1a1500',
    border: '#fbbf2466',
    maxBuy: 5,
    prices: [500, 1500, 4000, 10000, 25000],
    apply(G) { G.matBonuses.speedBoost = (G.matBonuses.speedBoost||1) * 1.25; }
  },
  {
    id: 'mat_turbofuel',
    name: 'Turbo Fuel',
    icon: '🛢️',
    desc: 'Tăng hiệu suất điện: xăng dùng được lâu hơn 20%',
    effect: 'Điện tiêu thụ chậm hơn 20%',
    color: '#f87171',
    theme: '#1a0808',
    border: '#f8717166',
    maxBuy: 4,
    prices: [800, 2500, 7000, 18000],
    apply(G) { G.matBonuses.powerEfficiency = (G.matBonuses.powerEfficiency||1) * 0.80; }
  },
  {
    id: 'mat_recycleplus',
    name: 'Recycle Catalyst',
    icon: '♻️',
    desc: 'Tăng điểm tái chế nhận được +50% mỗi lần',
    effect: 'Recycle points ×1.5',
    color: '#4ade80',
    theme: '#0f1f0f',
    border: '#4ade8066',
    maxBuy: 3,
    prices: [600, 3000, 12000],
    apply(G) { G.matBonuses.recycleBoost = (G.matBonuses.recycleBoost||1) * 1.50; }
  },
  {
    id: 'mat_luckchip',
    name: 'Lucky Chip',
    icon: '🎲',
    desc: 'Tăng nhân thưởng xổ số +0.5 cho mọi kết quả trúng',
    effect: 'Lottery mult +0.5',
    color: '#e879f9',
    theme: '#1a0a2e',
    border: '#e879f966',
    maxBuy: 4,
    prices: [1200, 4000, 12000, 35000],
    apply(G) { G.matBonuses.lotteryLuckBonus = (G.matBonuses.lotteryLuckBonus||0) + 0.5; }
  },
  {
    id: 'mat_slotexpander',
    name: 'Slot Expander Module',
    icon: '🔧',
    desc: 'Mở thêm 2 slot máy không cần mua trong tab Slots',
    effect: '+2 slot máy ngay lập tức',
    color: '#60a5fa',
    theme: '#0a1020',
    border: '#60a5fa66',
    maxBuy: 3,
    prices: [2000, 8000, 30000],
    apply(G) {
      G.ownedSlots = Math.min(15, (G.ownedSlots||5) + 2);
      while (G.slots.length < G.ownedSlots) G.slots.push(null);
      G.matBonuses.slotBoost = (G.matBonuses.slotBoost||0) + 2;
    }
  },
  {
    id: 'mat_netbooster',
    name: 'Network Booster',
    icon: '📡',
    desc: 'Tặng 3 lượt kết nối internet miễn phí ngay lập tức',
    effect: '+3 phiên internet FREE',
    color: '#a78bfa',
    theme: '#1a0a2e',
    border: '#a78bfa66',
    maxBuy: 10,
    prices: [300, 300, 300, 300, 300, 300, 300, 300, 300, 300],
    apply(G) {
      // Give 3 minutes of internet right now
      G.inetExpiry = Math.max(G.inetExpiry||0, Date.now()) + 3*60*1000;
      if (!G.inetPackage) G.inetPackage = 'basic';
    }
  },
  {
    id: 'mat_valuepump',
    name: 'Value Pump',
    icon: '💹',
    desc: 'Đẩy hệ số nhân giá trị tiền tệ lên ×2 ngay lập tức',
    effect: 'valueMultiplier ×2 ngay',
    color: '#f59e0b',
    theme: '#1a1000',
    border: '#f59e0b66',
    maxBuy: 3,
    prices: [5000, 20000, 80000],
    apply(G) { G.valueMultiplier = (G.valueMultiplier||1) * 2; }
  },
];

function getMatCount(id) { return G.matPurchased[id] || 0; }

function renderMatShop() {
  const balEl = document.getElementById('matshop-balance');
  if (balEl) balEl.textContent = fmt(G.money);
  const grid = document.getElementById('matshop-grid');
  if (!grid) return;
  grid.innerHTML = '';
  MAT_ITEMS.forEach(item => {
    const bought = getMatCount(item.id);
    const maxed = bought >= item.maxBuy;
    const price = maxed ? null : item.prices[bought];
    const canBuy = !maxed && G.money >= price;
    const div = document.createElement('div');
    div.style.cssText = `background:${item.theme};border:1px solid ${maxed?'#1f2937':item.border};border-radius:12px;padding:14px;transition:all 0.15s;${canBuy?'cursor:pointer':''}`;
    if (canBuy) {
      div.onmouseenter = () => div.style.borderColor = item.color;
      div.onmouseleave = () => div.style.borderColor = item.border;
    }
    div.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
        <div style="font-size:32px">${item.icon}</div>
        <div style="flex:1">
          <div style="font-size:14px;font-weight:700;color:${maxed?'#4b5563':item.color}">${item.name}</div>
          <div style="font-size:10px;padding:2px 7px;border-radius:10px;display:inline-block;margin-top:2px;
            background:${maxed?'#1f2937':'rgba(255,255,255,0.05)'};color:${maxed?'#374151':item.color};
            border:1px solid ${maxed?'#374151':item.border}">${maxed?'✅ TỐI ĐA':'⬡ '+item.effect}</div>
        </div>
      </div>
      <div style="font-size:12px;color:#6b7280;margin-bottom:10px;line-height:1.5">${item.desc}</div>
      <div style="display:flex;align-items:center;justify-content:space-between">
        <div style="font-size:11px;color:#374151">${bought}/${item.maxBuy} đã mua</div>
        ${maxed
          ? `<div style="font-size:12px;color:#374151;padding:6px 14px;border:1px solid #1f2937;border-radius:6px">MAXED</div>`
          : `<button onclick="buyMatItem('${item.id}')" ${!canBuy?'disabled':''}
              style="padding:7px 16px;border-radius:6px;cursor:pointer;font-size:12px;font-weight:600;
              background:${canBuy?item.theme:'#111827'};color:${canBuy?item.color:'#374151'};
              border:1px solid ${canBuy?item.color:'#1f2937'};transition:all 0.12s;${!canBuy?'opacity:0.4;cursor:not-allowed':''}">
              ${canBuy?fmt(price):'Thiếu '+fmt(price-G.money)}
            </button>`
        }
      </div>
      ${bought>0&&!maxed?`<div style="font-size:10px;color:#374151;margin-top:5px;text-align:right">Tiếp theo: ${fmt(item.prices[bought])}</div>`:''}
    `;
    grid.appendChild(div);
  });

  // Coming Soon card
  const cs = document.createElement('div');
  cs.style.cssText = 'background:#0a0a0a;border:1px dashed #1f2937;border-radius:12px;padding:14px;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:140px;gap:8px;opacity:0.6';
  cs.innerHTML = `
    <div style="font-size:32px;filter:grayscale(1)">🔒</div>
    <div style="font-size:13px;font-weight:700;color:#374151;letter-spacing:1px">COMING SOON</div>
    <div style="font-size:10px;color:#1f2937;text-align:center;line-height:1.5">Nguyên liệu mới<br>đang được phát triển...</div>
    <div style="font-size:9px;padding:2px 10px;border:1px solid #1f2937;border-radius:10px;color:#1f2937;margin-top:4px">??? / ???</div>
  `;
  grid.appendChild(cs);
}

function buyMatItem(id) {
  const item = MAT_ITEMS.find(i=>i.id===id);
  if (!item) return;
  const bought = getMatCount(id);
  if (bought >= item.maxBuy) { showError('⚠️ Đã đạt tối đa!'); return; }
  const price = item.prices[bought];
  if (!taxCheckBanBeforeBuy()) return;
  if (G.money < price) { showError('💸 Không đủ tiền!'); return; }
  G.money -= price;
  G.matPurchased[id] = bought + 1;
  item.apply(G);
  taxIssueBill(item.icon + ' ' + item.name, price);
  showNotif(item.icon+' '+item.name+' đã kích hoạt!');
  updateUI();
  saveGame(false);
  renderMatShop();
  renderSlots();
}

// ═══ ELECTRICITY SYSTEM ═══════════════════════════════════════════

const FUEL_TYPES = [
  { id:'f1', name:'Bình Xăng Mini',    icon:'⛽', seconds:10*60,  price:240,   desc:'10 phút · Phổ thông',      color:'#6b7280', badge:'' },
  { id:'f2', name:'Bình Xăng Loại 2',  icon:'🛢️', seconds:25*60,  price:540,   desc:'25 phút · Tiết kiệm hơn',  color:'#60a5fa', badge:'PHVL' },
  { id:'f3', name:'Bình Xăng Loại 3',  icon:'🔋', seconds:50*60,  price:960,   desc:'50 phút · Tốt nhất/giá',   color:'#4ade80', badge:'TỐT NHẤT' },
  { id:'f4', name:'Bình Xăng Loại 4',  icon:'⚡', seconds:120*60, price:2100,  desc:'2 giờ · Dung tích lớn',    color:'#fbbf24', badge:'CAO CẤP' },
  { id:'f5', name:'Bình Xăng Loại 5',  icon:'🏭', seconds:300*60, price:4800,  desc:'5 giờ · Công nghiệp',      color:'#f87171', badge:'CÔNG NGHIỆP' },
];

// Power states: 'normal' | 'outage'
let powerState = 'normal';
let outageOverlayVisible = false;

function updateProgressBars() {
  // Reset progress bar animation cycle
  if (!hasPower()) {
    // Đóng băng tất cả thanh
    for (let i = 0; i < G.ownedSlots; i++) {
      const el = document.getElementById('pg' + i);
      if (el) el.style.transition = 'none';
    }
    return;
  }
  // Bật lại: khởi động animation từ đầu
  _progVal = 0;
  for (let i = 0; i < G.ownedSlots; i++) {
    const el = document.getElementById('pg' + i);
    if (el) {
      el.style.transition = 'none';
      el.style.width = '0%';
      // Force reflow rồi bật lại transition
      el.offsetWidth;
      el.style.transition = '';
    }
  }
}

function hasPower() {
  if (G.manualPowerOff) return false;          // manually off
  if (!G.powerOutageTriggered) return true;     // not yet had outage
  return G.powerSeconds > 0;
}

// ─── Manual power toggle ───────────────────────────────────────────
function togglePower() {
  if (G.manualPowerOff) {
    // Turn ON
    G.manualPowerOff = false;
    hideManualPowerOff();
    applyPowerOutageLock(false);
    showNotif('⚡ Điện đã được bật lại!');
    updateUI();
    renderSlots();
    updateProgressBars(); // Khởi động lại animation thanh progress
    saveGame(false);
    renderElecPanel();
  } else {
    // Turn OFF (only allowed if we actually have power to cut)
    if (!hasPower()) { showError('❌ Không có điện để tắt!'); return; }
    G.manualPowerOff = true;
    applyPowerOutageLock(true);
    showManualPowerOff();
    showNotif('🔌 Điện đã bị tắt thủ công.');
    updateUI();
    saveGame(false);
    renderElecPanel();
  }
}

function showManualPowerOff() {
  const el = document.getElementById('manual-power-overlay');
  if (el) el.style.display = 'flex';
}

function hideManualPowerOff() {
  const el = document.getElementById('manual-power-overlay');
  if (el) el.style.display = 'none';
}

// Chỉ đóng overlay, điện vẫn tắt — tiền & hệ số không chạy
function dismissManualPowerOverlay() {
  const el = document.getElementById('manual-power-overlay');
  if (el) el.style.display = 'none';
}

// triggerOutage() — called when powerSeconds reaches 0 during a session.
// Sets powerState = 'outage', locks most tabs, shows the offline console.
// Can only trigger once per session until the player buys more fuel.
function triggerOutage() {
  if (G.powerOutageTriggered) return;
  G.powerOutageTriggered = true;
  G.powerSeconds = 0;
  powerState = 'outage';
  saveGame(false);
  applyPowerOutageLock(true); // Lock all tabs except base and electricity
  showOutageScreen();
}

// applyPowerOutageLock(locked) — during a power outage most tabs are
// greyed out and unclickable.  Only 'electricity' and 'bank' remain usable
// so the player can buy fuel or manage funds to recover.
// Automatically switches to the electricity tab when locking.
function applyPowerOutageLock(locked) {
  const allowedTabs = ['electricity', 'bank'];
  const allTabs = ['base','shop','bank','slots','stats','market','inventory','rshop','vipshop','computer','lottery','electricity','matshop'];
  allTabs.forEach(tab => {
    if (allowedTabs.includes(tab)) return;
    const el = document.getElementById('tab-' + tab);
    if (el) {
      if (locked) {
        el.style.opacity = '0.25';
        el.style.pointerEvents = 'none';
        el.title = '⚡ Mất điện — mua xăng để mở lại!';
      } else {
        el.style.opacity = '';
        el.style.pointerEvents = '';
        el.title = '';
      }
    }
  });
  // If locked and current tab is not allowed, switch to electricity
  if (locked) {
    const activePanel = document.querySelector('.panel.active');
    if (activePanel) {
      const panelId = activePanel.id.replace('panel-','');
      if (!allowedTabs.includes(panelId)) {
        switchTab('electricity');
      }
    }
  }
}

function showOutageScreen() {
  if (outageOverlayVisible) return;
  outageOverlayVisible = true;
  // Update reserve button status
  const rs = document.getElementById('oc-reserve-status');
  if (rs) rs.textContent = G.reservePowerUsed ? '❌ Đã sử dụng rồi' : '✅ Sẵn sàng';
  const opt1 = document.getElementById('oc-opt1');
  if (opt1) opt1.style.opacity = G.reservePowerUsed ? '0.35' : '1';
  // Update "bật điện lại" button based on fuel
  updateOutageRestoreBtn();
  document.getElementById('offline-console').style.display = 'flex';
  // Disconnect terminal if connected
  if (terminalState && terminalState.connected) {
    terminalState.connected = false;
    terminalState.currentVendor = null;
    terminalState.currentCatalog = [];
    terminalState.bargainCount = 0;
    addTerminalLine('*** MẤT ĐIỆN — KẾT NỐI BỊ NGẮT ***', 'err');
    hideBossChoices();
  }
}

function updateOutageRestoreBtn() {
  const btn = document.getElementById('oc-opt0');
  const sub = document.getElementById('oc-opt0-sub');
  if (!btn) return;
  if (G.powerSeconds > 0) {
    // Has fuel — show active button
    btn.style.opacity = '1';
    btn.style.pointerEvents = '';
    btn.style.borderColor = '#166534';
    btn.style.background = '#052e16';
    if (sub) sub.textContent = 'Còn ' + fmtSeconds(G.powerSeconds) + ' xăng — bấm để bật lại';
  } else {
    // No fuel — dim
    btn.style.opacity = '0.3';
    btn.style.pointerEvents = 'none';
    btn.style.borderColor = '#1f2937';
    btn.style.background = '#0a0a0a';
    if (sub) sub.textContent = '❌ Hết xăng — mua thêm để bật lại';
  }
}

// Called from "Bật Điện Lại" button in outage overlay
function restorePowerIfFuel() {
  if (G.powerSeconds <= 0) { showError('❌ Hết xăng! Mua bình xăng trước.'); return; }
  powerState = 'normal';
  hideOutageScreen();
  applyPowerOutageLock(false);
  showNotif('⚡ Điện đã được bật lại! Còn ' + fmtSeconds(G.powerSeconds));
  updateUI();
  renderSlots();
  saveGame(false);
  renderElecPanelIfActive();
}

function hideOutageScreen() {
  outageOverlayVisible = false;
  document.getElementById('offline-console').style.display = 'none';
  document.getElementById('fuel-shop-overlay').style.display = 'none';
}

function offlineConsoleAction(n) {
  if (n === 1) {
    // Reserve power: 15 minutes, one-time
    if (G.reservePowerUsed) { return; }
    G.reservePowerUsed = true;
    G.powerSeconds = 15 * 60;
    powerState = 'normal';
    hideOutageScreen();
    applyPowerOutageLock(false); // Restore all tabs
    showNotif('🔋 Nguồn dự trữ kích hoạt! +15 phút');
    saveGame(false);
    renderElecPanelIfActive();
    renderSlots(); // Update progress bars
    updateProgressBars(); // Khởi động lại animation thanh progress
  } else if (n === 2) {
    openFuelShop();
  }
}

function openFuelShop() {
  const fso = document.getElementById('fuel-shop-overlay');
  fso.style.display = 'flex';
  renderFuelShopItems();
}

// closeFuelShop() — hides the emergency fuel purchase overlay.
function closeFuelShop() {
  document.getElementById('fuel-shop-overlay').style.display = 'none';
}

function renderFuelShopItems() {
  const balEl = document.getElementById('fuel-shop-balance');
  if (balEl) balEl.textContent = fmt(G.money);
  const container = document.getElementById('fuel-shop-items');
  container.innerHTML = FUEL_TYPES.map(f => {
    const canAfford = G.money >= f.price;
    const ppm = (f.seconds/60/f.price*1000).toFixed(1); // seconds per $1000
    return `<div class="fuel-card ${!canAfford?'fuel-disabled':''} ${f.id==='f3'?'fuel-best':''}"
      onclick="${canAfford?`buyFuel('${f.id}')`:''}"
      style="border-color:${f.color}44">
      <div style="display:flex;align-items:center;gap:10px">
        <div style="font-size:28px">${f.icon}</div>
        <div style="flex:1">
          <div style="font-size:13px;color:#e2e8f0;font-weight:bold">${f.name}
            ${f.badge?`<span style="font-size:9px;background:${f.color}22;color:${f.color};border:1px solid ${f.color}44;padding:1px 6px;border-radius:4px;margin-left:5px">${f.badge}</span>`:''}
          </div>
          <div style="font-size:11px;color:#6b7280;margin-top:2px">${f.desc}</div>
          <div style="font-size:10px;color:#374151;margin-top:1px">${(f.seconds/60).toFixed(0)} phút · ${ppm} giây/$K</div>
        </div>
        <div style="text-align:right">
          <div style="font-size:14px;color:${f.color};font-weight:bold">${fmt(f.price)}</div>
          ${!canAfford?`<div style="font-size:10px;color:#4b5563">Thiếu ${fmt(f.price-G.money)}</div>`:''}
        </div>
      </div>
    </div>`;
  }).join('');
}

// buyFuel(id) — purchase a fuel canister from either the emergency
// fuel overlay OR the Electricity panel fuel shop.
// Adds fuel.seconds to G.powerSeconds, restores power if outage is active,
// clears the outage lock on all tabs, and issues a tax bill.
function buyFuel(id) {
  const fuel = FUEL_TYPES.find(f=>f.id===id);
  if (!fuel) return;
  if (!taxCheckBanBeforeBuy()) return;
  if (G.money < fuel.price) { showError('💸 Không đủ tiền!'); return; }
  G.money -= fuel.price;
  G.powerSeconds = (G.powerSeconds||0) + fuel.seconds;
  G.totalPowerBought += fuel.seconds;
  powerState = 'normal';
  taxIssueBill(fuel.icon + ' ' + fuel.name, fuel.price);
  showNotif(fuel.icon+' '+fuel.name+' +'+Math.round(fuel.seconds/60)+' phút!');
  // Close overlays and resume game
  hideOutageScreen();
  applyPowerOutageLock(false); // Restore all tabs
  updateUI();
  renderSlots(); // Update progress bars
  updateProgressBars(); // Khởi động lại animation thanh progress
  saveGame(false);
  renderElecPanelIfActive();
  renderFuelShopItems();
}
function renderElecPanelIfActive() {
  if (document.getElementById('panel-electricity').classList.contains('active')) renderElecPanel();
}

function renderElecPanel() {
  const el = document.getElementById('elec-panel-content');
  const isPowered = hasPower();
  const isManualOff = G.manualPowerOff;

  el.innerHTML = `
    <!-- POWER TOGGLE -->
    <div class="power-toggle-wrap">
      <div>
        <div style="font-size:14px;color:#e2e8f0;font-weight:bold">🔌 Nguồn Điện</div>
        <div style="font-size:12px;color:#6b7280;margin-top:2px">${isManualOff ? 'Đã tắt thủ công' : isPowered ? 'Đang hoạt động' : 'Mất điện'}</div>
      </div>
      <label class="toggle-switch" title="${isManualOff ? 'Bật điện lại' : 'Tắt điện'}">
        <input type="checkbox" ${isManualOff ? '' : 'checked'} onchange="togglePower()">
        <span class="toggle-slider"></span>
      </label>
    </div>

    <div class="elec-status-card">
      <div style="font-size:14px;color:#9ca3af;margin-bottom:10px;display:flex;align-items:center;gap:8px">⚡ Trạng Thái Điện
        <span id="ep-status-badge" style="margin-left:auto;font-size:12px;padding:3px 10px;border-radius:12px;${isPowered && !isManualOff ?'background:#0f1f0f;color:#4ade80;border:1px solid #1e3a1e':'background:#1a0808;color:#f87171;border:1px solid #3b1a1a'}">${isPowered && !isManualOff ?'● ĐANG HOẠT ĐỘNG': isManualOff ? '● TẮT THỦ CÔNG' : '● MẤT ĐIỆN'}</span>
      </div>

      ${G.powerOutageTriggered ? `
        <div style="font-size:12px;color:#6b7280;margin-bottom:6px;display:flex;justify-content:space-between;align-items:center">
          <span>Thời gian còn lại</span>
          <span id="ep-time-str" style="font-weight:bold;font-size:14px;font-variant-numeric:tabular-nums"></span>
        </div>
        <!-- thanh tổng: phút -->
        <div style="font-size:10px;color:#4b5563;margin-bottom:3px;display:flex;justify-content:space-between">
          <span>Tổng (phút)</span><span id="ep-min-label"></span>
        </div>
        <div class="power-bar-wrap" style="height:14px;margin-bottom:8px">
          <div id="ep-bar-min" class="power-bar-fill" style="height:100%;transition:width 1s linear"></div>
        </div>
        <!-- thanh giây trong phút hiện tại -->
        <div style="font-size:10px;color:#4b5563;margin-bottom:3px;display:flex;justify-content:space-between">
          <span>Giây trong phút này</span><span id="ep-sec-label"></span>
        </div>
        <div class="power-bar-wrap" style="height:10px;margin-bottom:4px">
          <div id="ep-bar-sec" class="power-bar-fill" style="height:100%;background:#60a5fa;transition:width 1s linear"></div>
        </div>
      ` : `
        <div style="font-size:12px;color:#4b5563;margin-bottom:6px">Hệ thống chạy bình thường</div>
        <div style="font-size:11px;color:#374151;margin-bottom:6px">⚠️ Sẽ mất điện sau 30 phút chơi</div>
        <div style="font-size:11px;color:#6b7280;margin-bottom:4px;display:flex;justify-content:space-between">
          <span>Thời gian đến mất điện</span>
          <span id="ep-countdown-label" style="color:#fbbf24"></span>
        </div>
        <div class="power-bar-wrap" style="height:14px;margin-bottom:8px">
          <div id="ep-bar-session-min" class="power-bar-fill" style="height:100%;transition:width 1s linear"></div>
        </div>
        <div style="font-size:10px;color:#4b5563;margin-bottom:3px;display:flex;justify-content:space-between">
          <span>Giây trong phút này</span><span id="ep-sec-session-label"></span>
        </div>
        <div class="power-bar-wrap" style="height:10px;margin-bottom:4px">
          <div id="ep-bar-session-sec" class="power-bar-fill" style="height:100%;background:#60a5fa;transition:width 1s linear"></div>
        </div>
      `}
    </div>

    <div class="elec-status-card">
      <div style="font-size:14px;color:#9ca3af;margin-bottom:12px">📊 Thống Kê</div>
      <div style="display:flex;flex-direction:column;gap:6px;font-size:13px">
        <div style="display:flex;justify-content:space-between"><span style="color:#6b7280">Thời gian chơi</span><span style="color:#60a5fa">${fmtSeconds(G.playedSeconds)}</span></div>
        <div style="display:flex;justify-content:space-between"><span style="color:#6b7280">Mất điện lần đầu</span><span style="color:${G.powerOutageTriggered?'#f87171':'#374151'}">${G.powerOutageTriggered?'Đã xảy ra':'Chưa xảy ra'}</span></div>
        <div style="display:flex;justify-content:space-between"><span style="color:#6b7280">Nguồn dự trữ</span><span style="color:${G.reservePowerUsed?'#4b5563':'#4ade80'}">${G.reservePowerUsed?'Đã dùng':'Còn sẵn'}</span></div>
        <div style="display:flex;justify-content:space-between"><span style="color:#6b7280">Tổng điện đã mua</span><span style="color:#fbbf24">${fmtSeconds(G.totalPowerBought||0)}</span></div>
      </div>
    </div>

    <div class="elec-status-card">
      <div style="font-size:14px;color:#9ca3af;margin-bottom:12px">⛽ Mua Bình Xăng</div>
      ${G.powerOutageTriggered&&G.powerSeconds<=0?`<div style="font-size:12px;color:#f87171;margin-bottom:10px;padding:8px;background:#1a0808;border-radius:6px;border:1px solid #3b1a1a">❌ Đang mất điện — mua xăng để khởi động lại</div>`:''}
      ${FUEL_TYPES.map(f => {
        const canAfford = G.money >= f.price;
        const ppm = (f.seconds/60/f.price*1000).toFixed(1);
        return `<div class="fuel-card ${!canAfford?'fuel-disabled':''} ${f.id==='f3'?'fuel-best':''}" onclick="${canAfford?`buyFuelFromPanel('${f.id}')`:''}" style="border-color:${f.color}44">
          <div style="display:flex;align-items:center;gap:10px">
            <div style="font-size:26px">${f.icon}</div>
            <div style="flex:1">
              <div style="font-size:13px;color:#e2e8f0;font-weight:bold">${f.name}
                ${f.badge?`<span style="font-size:9px;background:${f.color}22;color:${f.color};border:1px solid ${f.color}44;padding:1px 6px;border-radius:4px;margin-left:5px">${f.badge}</span>`:''}
              </div>
              <div style="font-size:11px;color:#6b7280">${f.desc} · ${ppm}s/$K</div>
            </div>
            <div style="text-align:right">
              <div style="font-size:14px;color:${f.color};font-weight:bold">${fmt(f.price)}</div>
              ${!canAfford?`<div style="font-size:10px;color:#4b5563">Thiếu ${fmt(f.price-G.money)}</div>`:''}
            </div>
          </div>
        </div>`;
      }).join('')}
    </div>
  `;

  // Kick off real-time updater after DOM is ready
  updateElecPanelLive();
}

// ─── Real-time updater: called every second, only touches specific DOM nodes ───
function updateElecPanelLive() {
  const panel = document.getElementById('panel-electricity');
  if (!panel || !panel.classList.contains('active')) return;

  if (G.powerOutageTriggered) {
    // ── MODE: after outage triggered (fuel gauge) ──
    const s = Math.max(0, Math.floor(G.powerSeconds));
    const totalMax = 300 * 60; // 5 giờ = max hiển thị 100%
    const mins = Math.floor(s / 60);
    const secs = s % 60;

    // Phần trăm tổng (phút)
    const pctMin = Math.min(100, s / totalMax * 100);
    const barColor = pctMin > 50 ? '#4ade80' : pctMin > 20 ? '#fbbf24' : '#f87171';

    // Phần trăm giây trong phút hiện tại (đếm ngược: 59→0)
    const pctSec = (secs / 59) * 100;

    const timeEl    = document.getElementById('ep-time-str');
    const barMin    = document.getElementById('ep-bar-min');
    const barSec    = document.getElementById('ep-bar-sec');
    const minLabel  = document.getElementById('ep-min-label');
    const secLabel  = document.getElementById('ep-sec-label');
    const badge     = document.getElementById('ep-status-badge');

    if (timeEl)   timeEl.textContent = fmtSeconds(s);
    if (timeEl)   timeEl.style.color = barColor;
    if (barMin)   { barMin.style.width = pctMin + '%'; barMin.style.background = barColor; }
    if (barSec)   barSec.style.width = pctSec + '%';
    if (minLabel) minLabel.textContent = mins + ' phút ' + secs + 's';
    if (secLabel) secLabel.textContent = secs + '/59s';
    if (badge && G.powerSeconds > 0) {
      badge.textContent = '● ĐANG HOẠT ĐỘNG';
      badge.style.cssText = 'margin-left:auto;font-size:12px;padding:3px 10px;border-radius:12px;background:#0f1f0f;color:#4ade80;border:1px solid #1e3a1e';
    } else if (badge) {
      badge.textContent = '● MẤT ĐIỆN';
      badge.style.cssText = 'margin-left:auto;font-size:12px;padding:3px 10px;border-radius:12px;background:#1a0808;color:#f87171;border:1px solid #3b1a1a';
    }

  } else {
    // ── MODE: trước outage (session countdown) ──
    const totalSec = 30 * 60;
    const remaining = Math.max(0, totalSec - sessionSecondsPlayed);
    const minsLeft = Math.floor(remaining / 60);
    const secsLeft = remaining % 60;

    // Thanh tổng: phần trăm đã tiêu thụ
    const pctUsed = Math.min(100, sessionSecondsPlayed / totalSec * 100);
    const barColor = pctUsed > 85 ? '#f87171' : pctUsed > 60 ? '#fbbf24' : '#4ade80';
    // Giây trong phút hiện tại (đã chơi)
    const secInMin = sessionSecondsPlayed % 60;
    const pctSec = (secInMin / 59) * 100;

    const barMin   = document.getElementById('ep-bar-session-min');
    const barSec   = document.getElementById('ep-bar-session-sec');
    const cdLabel  = document.getElementById('ep-countdown-label');
    const secLabel = document.getElementById('ep-sec-session-label');

    if (barMin)  { barMin.style.width = pctUsed + '%'; barMin.style.background = barColor; }
    if (barSec)  barSec.style.width = pctSec + '%';
    if (cdLabel) cdLabel.textContent = minsLeft + ' phút ' + secsLeft + 's còn lại';
    if (secLabel) secLabel.textContent = secInMin + '/59s';
  }
}

function buyFuelFromPanel(id) {
  const fuel = FUEL_TYPES.find(f=>f.id===id);
  if (!fuel) return;
  if (!taxCheckBanBeforeBuy()) return;
  if (G.money < fuel.price) { showError('💸 Không đủ tiền!'); return; }
  G.money -= fuel.price;
  G.powerSeconds = (G.powerSeconds||0) + fuel.seconds;
  G.totalPowerBought += fuel.seconds;
  powerState = 'normal';
  // If power was out, restore
  if (outageOverlayVisible) hideOutageScreen();
  applyPowerOutageLock(false); // Restore all tabs
  taxIssueBill(fuel.icon + ' ' + fuel.name, fuel.price);
  showNotif(fuel.icon+' '+fuel.name+' +'+Math.round(fuel.seconds/60)+'min điện!');
  updateUI();
  renderSlots(); // Update progress bars
  updateProgressBars(); // Khởi động lại animation thanh progress
  saveGame(false);
  renderElecPanel();
}

function fmtSeconds(s) {
  s = Math.floor(s);
  const h = Math.floor(s/3600);
  const m = Math.floor((s%3600)/60);
  const sec = s%60;
  if (h > 0) return `${h}g ${m}p`;
  return `${m}:${sec.toString().padStart(2,'0')}`;
}

// ─── Power tick: runs every second alongside main loop ─────────────
// Session minutes played (resets each page load — outage only triggers once per save)
let sessionSecondsPlayed = 0;

setInterval(() => {
  // Chỉ đếm session time khi có điện (để countdown 30 phút chỉ tính lúc đang chạy)
  if (hasPower()) {
    sessionSecondsPlayed += 1;
  }
  const sessionMinutes = sessionSecondsPlayed / 60;

  // Warn at 28 minutes of THIS session (only if outage hasn't happened yet)
  if (!G.powerOutageTriggered && sessionMinutes >= 28 && !G._warnedPower) {
    G._warnedPower = true;
    showError('⚠️ Còn ~2 phút điện! Mua xăng ngay tại tab ⚡ Điện!');
  }

  // Trigger outage at 30 minutes of THIS session
  if (!G.powerOutageTriggered && sessionMinutes >= 30) {
    triggerOutage();
  }

  // Drain power seconds chỉ khi outage đã xảy ra, còn xăng, và KHÔNG phải tắt thủ công
  if (G.powerOutageTriggered && G.powerSeconds > 0 && !G.manualPowerOff) {
    const drainRate = (G.matBonuses&&G.matBonuses.powerEfficiency)||1;
    G.powerSeconds = Math.max(0, G.powerSeconds - drainRate);
    // Warn when 5 minutes left
    if (G.powerSeconds === 5*60) showError('⚠️ Còn 5 phút điện! Mua thêm xăng!');
    if (G.powerSeconds === 60) showError('🔴 Còn 1 phút điện!');
    if (G.powerSeconds === 0) {
      // Power just ran out
      powerState = 'outage';
      applyPowerOutageLock(true);
      showOutageScreen();
    }
    // Update elec tab badge and panel live (no full re-render)
    updateElecPanelLive();
  }

  // Always update elec panel live every second (both pre- and post-outage)
  updateElecPanelLive();

  // Keep "Bật Điện Lại" button fresh when outage overlay is open
  if (outageOverlayVisible) updateOutageRestoreBtn();

  // Update electricity tab icon to flash when out of power
  const tabEl = document.getElementById('tab-electricity');
  if (tabEl) {
    if (G.powerOutageTriggered && G.powerSeconds <= 0) {
      tabEl.style.color = '#f87171';
      tabEl.style.animation = 'darkPulse 0.8s infinite';
    } else if (G.powerOutageTriggered && G.powerSeconds < 5*60) {
      tabEl.style.color = '#fbbf24';
      tabEl.style.animation = 'darkPulse 2s infinite';
    } else {
      tabEl.style.color = '';
      tabEl.style.animation = '';
    }
  }
}, 1000);

// Restore outage screen on page load if power was out (use setTimeout since DOM already loaded for inline scripts)
setTimeout(() => {
  if (G.manualPowerOff) {
    applyPowerOutageLock(true);
    showManualPowerOff();
    switchTab('electricity');
  } else if (G.powerOutageTriggered && G.powerSeconds <= 0) {
    applyPowerOutageLock(true);
    showOutageScreen();
    switchTab('electricity'); // force to electricity tab on load if power is out
  }
}, 300);

// ─── Electricity tab in the game ─────────────────────────────────
// Restore last UI state
(function restoreUI() {
  const savedTab = localStorage.getItem('ui_activeTab');
  const validTabs = ['base','shop','bank','tax','slots','stats','market','inventory','rshop','vipshop','computer','lottery','electricity','matshop'];
  if (savedTab && validTabs.includes(savedTab)) {
    switchTab(savedTab);
  }
  // Restore market sub-tab active class (switchMarket already called if tab=market)
  if (activeMarket && document.getElementById('mtab-'+activeMarket)) {
    document.querySelectorAll('.market-tab').forEach(t=>t.classList.remove('active'));
    document.getElementById('mtab-'+activeMarket).classList.add('active');
  }
  // Show tutorial for new players
  if (!G.tutorialDone) {
    setTimeout(showTutorial, 500);
  }
})();

// ─── TUTORIAL ────────────────────────────────────────────────────
const TUT_STEPS = 7;
let tutCurrentStep = 0;

function showTutorial() {
  tutCurrentStep = 0;
  const overlay = document.getElementById('tutorial-overlay');
  if (overlay) { overlay.style.display = 'flex'; renderTutStep(); }
}

function renderTutStep() {
  // Hide all steps
  for (let i = 0; i < TUT_STEPS; i++) {
    const s = document.getElementById('tut-step-' + i);
    if (s) s.classList.toggle('visible', i === tutCurrentStep);
  }
  // Progress bar
  const pct = Math.round(((tutCurrentStep + 1) / TUT_STEPS) * 100);
  const prog = document.getElementById('tut-progress');
  if (prog) prog.style.width = pct + '%';
  // Dots
  const dotsEl = document.getElementById('tut-dots');
  if (dotsEl) {
    dotsEl.innerHTML = '';
    for (let i = 0; i < TUT_STEPS; i++) {
      const d = document.createElement('div');
      d.className = 'tut-dot' + (i < tutCurrentStep ? ' done' : i === tutCurrentStep ? ' active' : '');
      dotsEl.appendChild(d);
    }
  }
  // Back button visibility
  const backBtn = document.getElementById('tut-back-btn');
  if (backBtn) backBtn.style.display = tutCurrentStep > 0 ? 'flex' : 'none';
  // Next/Finish button
  const nextBtn = document.getElementById('tut-next-btn');
  if (nextBtn) {
    if (tutCurrentStep === TUT_STEPS - 1) {
      nextBtn.textContent = '🚀 Bắt đầu chơi!';
      nextBtn.className = 'tut-btn-finish';
    } else {
      nextBtn.textContent = 'Tiếp theo →';
      nextBtn.className = 'tut-btn-next';
    }
  }
}

function tutNext() {
  if (tutCurrentStep < TUT_STEPS - 1) {
    tutCurrentStep++;
    renderTutStep();
  } else {
    finishTutorial();
  }
}

function tutBack() {
  if (tutCurrentStep > 0) {
    tutCurrentStep--;
    renderTutStep();
  }
}

function finishTutorial() {
  G.tutorialDone = true;
  saveGame(false);
  const overlay = document.getElementById('tutorial-overlay');
  if (overlay) {
    overlay.style.transition = 'opacity 0.4s';
    overlay.style.opacity = '0';
    setTimeout(() => { overlay.style.display = 'none'; overlay.style.opacity = ''; }, 400);
  }
  showNotif('🎉 Hướng dẫn hoàn thành! Chúc bạn chơi vui!');
}

// ─── AD & SHOP FUNCTIONS ──────────────────────────────────────────
function initShopAds() {
  const dismissed = (G.adsDismissed || {});
  const loanEl = document.getElementById('ad-loan');
  const lottEl = document.getElementById('ad-lottery');
  if (loanEl) loanEl.style.display = dismissed.loan ? 'none' : 'block';
  if (lottEl) lottEl.style.display = dismissed.lottery ? 'none' : 'block';
  // Init stars
  const starsEl = document.getElementById('lott-ad-stars');
  if (starsEl && starsEl.children.length === 0) {
    for (let i = 0; i < 22; i++) {
      const s = document.createElement('span');
      s.style.cssText = 'left:'+Math.random()*100+'%;top:'+Math.random()*100+'%;--d:'+(1+Math.random()*2.5)+'s;--delay:'+(Math.random()*2)+'s;';
      starsEl.appendChild(s);
    }
  }
  // Start winners feed
  startLotteryWinnersFeed();
}

function dismissAd(type) {
  const cost = 5;
  if (G.money < cost) { showError('💸 Cần $5 để xóa quảng cáo này!'); return; }
  G.money -= cost;
  if (!G.adsDismissed) G.adsDismissed = {};
  G.adsDismissed[type] = true;
  const el = document.getElementById('ad-' + type);
  if (el) {
    el.style.transition = 'all 0.35s ease';
    el.style.opacity = '0';
    el.style.transform = 'scale(0.95)';
    el.style.maxHeight = el.offsetHeight + 'px';
    setTimeout(() => { el.style.maxHeight = '0'; el.style.marginBottom = '0'; el.style.padding = '0'; }, 50);
    setTimeout(() => { el.style.display = 'none'; }, 380);
  }
  showNotif('✅ Đã xóa quảng cáo! (-$5)');
  updateUI(); saveGame(false);
}

function goToLoan() {
  switchTab('bank');
  setTimeout(() => {
    const loanEl = document.getElementById('loan-section');
    if (loanEl) loanEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 80);
}

// ─── LOTTERY WINNERS LIVE FEED ────────────────────────────────────
const WINNER_NAMES = ['Minh_T','NgocHa','VuHoang','LinhNhi','TuanAnh','PhuongLe','KhanhNam','MyLe','BaoTran','ThanhVu','AnhKhoa','HoaiThu','DucMinh','NgaLe','TrungKien','HuyenBV','QuangBach','TienDat','NhuQuynh','HoangLong','MaiAnh','SonTung','ThuHuong','CaoViet','LanAnh','PhucNguyen','HieuTran','NgaHuong','ChiNhan','VinhPhat'];
const WINNER_AVATARS = ['🧑','👩','👨','🧔','👧','👦','🧑‍💻','👩‍💼','🧑‍🎤','👱','🧕','👲'];
const PRIZE_TYPES = [
  { label: 'JACKPOT', mult: 50, minBet: 100, cls: 'jackpot', emoji: '🎉' },
  { label: 'x15', mult: 15, minBet: 80, cls: '', emoji: '💰' },
  { label: 'x8', mult: 8, minBet: 100, cls: '', emoji: '💸' },
  { label: 'x5', mult: 5, minBet: 100, cls: '', emoji: '💵' },
  { label: 'x3', mult: 3, minBet: 150, cls: '', emoji: '🤑' },
  { label: 'x3', mult: 3, minBet: 200, cls: '', emoji: '🤑' },
];

let lottWinnersFeedInterval = null;
const lottWinnersHistory = [];

function genWinner() {
  const prize = PRIZE_TYPES[Math.floor(Math.random() * PRIZE_TYPES.length)];
  const bet = prize.minBet + Math.floor(Math.random() * 4000) * 10;
  const won = bet * prize.mult;
  const name = WINNER_NAMES[Math.floor(Math.random() * WINNER_NAMES.length)];
  const avatar = WINNER_AVATARS[Math.floor(Math.random() * WINNER_AVATARS.length)];
  const secsAgo = Math.floor(Math.random() * 59) + 1;
  return { name, avatar, prize, won, secsAgo };
}

function startLotteryWinnersFeed() {
  const listEl = document.getElementById('lott-winners-list');
  if (!listEl) return;
  // Seed 3 initial winners
  if (lottWinnersHistory.length === 0) {
    for (let i = 0; i < 3; i++) lottWinnersHistory.push(genWinner());
  }
  renderWinnersFeed();
  if (lottWinnersFeedInterval) clearInterval(lottWinnersFeedInterval);
  lottWinnersFeedInterval = setInterval(() => {
    const lottBannerVisible = document.getElementById('ad-lottery');
    if (!lottBannerVisible || lottBannerVisible.style.display === 'none') return;
    const newW = genWinner();
    lottWinnersHistory.unshift(newW);
    if (lottWinnersHistory.length > 4) lottWinnersHistory.pop();
    renderWinnersFeed();
    // Update jackpot text
    const liveText = document.getElementById('lott-ad-live-text');
    if (liveText) liveText.textContent = newW.prize.emoji + ' ' + newW.name + ' vừa trúng ' + newW.prize.label + '!';
  }, 3500 + Math.random() * 2000);
}

function renderWinnersFeed() {
  const listEl = document.getElementById('lott-winners-list');
  if (!listEl) return;
  listEl.innerHTML = lottWinnersHistory.slice(0, 3).map((w, idx) => `
    <div class="lott-winner-row ${idx===0?'winner-flash':''}">
      <span class="lott-winner-avatar">${w.avatar}</span>
      <span class="lott-winner-name">${w.name}</span>
      <span class="lott-winner-prize ${w.prize.cls}">+$${w.won >= 1000 ? (w.won/1000).toFixed(1)+'K' : w.won}</span>
      <span class="lott-winner-time">${w.secsAgo}s trước</span>
    </div>`).join('');
}

// Live real-time: tăng secsAgo mỗi giây để trông như đang live thật
setInterval(() => {
  let changed = false;
  lottWinnersHistory.forEach(w => { if(w.secsAgo < 300) { w.secsAgo++; changed = true; } });
  if(changed) renderWinnersFeed();
}, 1000);


// ════════════════════════════════════════════════════════════════════
//  SOUND SYSTEM
// ════════════════════════════════════════════════════════════════════
const _sounds = { tab: null, jackpot: null };
const _audio  = { tab: null, jackpot: null };
let _soundBarVisible = false;
let _currentAudioKey = null;

function loadSoundFile(input, key) {
  const file = input.files[0];
  if (!file) return;
  const url = URL.createObjectURL(file);
  if (_audio[key]) { _audio[key].pause(); URL.revokeObjectURL(_audio[key].src); }
  const a = new Audio(url);
  a.loop = (key === 'tab');
  a.volume = parseFloat(document.getElementById('sound-vol').value);
  _audio[key] = a;
  _sounds[key] = file.name;
  document.getElementById('sound-name').textContent = '🎵 ' + file.name;
  document.getElementById('sound-bar').classList.remove('hidden');
  _soundBarVisible = true;
  showNotif('🎵 Đã tải: ' + file.name + ' (' + (key==='tab'?'Nhạc Tab':'Nhạc Jackpot') + ')');
}

function toggleSoundPlay() {
  const btn = document.getElementById('sound-play-btn');
  const wave = document.getElementById('sound-wave');
  // Find an available audio
  const a = _audio.tab || _audio.jackpot;
  if (!a) { showError('⚠️ Chưa tải file nhạc nào!'); return; }
  if (a.paused) {
    a.play();
    btn.textContent = '⏸ Pause';
    wave.style.display = 'flex';
  } else {
    a.pause();
    btn.textContent = '▶ Play';
    wave.style.display = 'none';
  }
}

function setSoundVol(v) {
  Object.values(_audio).forEach(a => { if (a) a.volume = v; });
}

function playTabSound() {
  const a = _audio.tab;
  if (!a) return;
  a.currentTime = 0;
  a.play().catch(()=>{});
  document.getElementById('sound-wave').style.display = 'flex';
  document.getElementById('sound-play-btn').textContent = '⏸ Pause';
}

function playJackpotSound() {
  const a = _audio.jackpot;
  if (!a) return;
  // Pause tab music
  if (_audio.tab && !_audio.tab.paused) _audio.tab.pause();
  a.currentTime = 0;
  a.play().catch(()=>{});
  // Resume tab music after jackpot sound
  a.onended = () => {
    if (_audio.tab) _audio.tab.play().catch(()=>{});
  };
}

function hideSoundBar() {
  document.getElementById('sound-bar').classList.add('hidden');
  _soundBarVisible = false;
}

function toggleSoundBar() {
  const bar = document.getElementById('sound-bar');
  if (_soundBarVisible) { hideSoundBar(); }
  else { bar.classList.remove('hidden'); _soundBarVisible = true; }
}

// Patch switchTab to play tab sound
const _origSwitchTab = switchTab;
window.switchTab = function(tab) {
  _origSwitchTab(tab);
  playTabSound();
};

// ════════════════════════════════════════════════════════════════════
//  JACKPOT VISUAL EXPLOSION
// ════════════════════════════════════════════════════════════════════
const CONFETTI_COLORS = ['#e879f9','#60a5fa','#4ade80','#fbbf24','#f87171','#a78bfa','#fde68a'];

function triggerJackpotExplosion(isMega, profit) {
  profit = profit || 0;
  const isBigWin = profit > 50;

  playJackpotSound();
  const overlay = document.getElementById('jackpot-overlay');
  const textEl  = document.getElementById('jackpot-text');
  const container = document.getElementById('confetti-container');
  if (!overlay) return;

  // Check setting
  const fxEl = document.getElementById('game-jackpot-fx');
  if (fxEl && !fxEl.checked) return;

  textEl.textContent = isMega ? '🌟 MEGA JACKPOT! 🌟' : '🎰 JACKPOT! 🎰';
  container.innerHTML = '';

  // ── Confetti (more pieces for big win) ──
  const pieces = isBigWin ? 180 : 80;
  const colors = isBigWin
    ? ['#e879f9','#60a5fa','#4ade80','#fbbf24','#f87171','#a78bfa','#fde68a','#34d399','#fb923c','#fff']
    : ['#e879f9','#60a5fa','#4ade80','#fbbf24','#f87171','#a78bfa','#fde68a'];
  for (let i = 0; i < pieces; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.cssText = [
      'left:' + Math.random()*100 + '%',
      'background:' + colors[Math.floor(Math.random()*colors.length)],
      'width:' + (isBigWin ? 5+Math.random()*12 : 6+Math.random()*8) + 'px',
      'height:' + (isBigWin ? 5+Math.random()*12 : 6+Math.random()*8) + 'px',
      'border-radius:' + (Math.random()>0.5?'50%':'2px'),
      '--dur:' + (isBigWin ? 2+Math.random()*3 : 1.5+Math.random()*2) + 's',
      '--delay:' + (Math.random()*(isBigWin?1.5:0.8)) + 's',
    ].join(';');
    container.appendChild(piece);
  }

  overlay.style.display = 'block';

  if (isBigWin) {
    _triggerBigWinEffects(isMega, profit);
  }

  const duration = isBigWin ? 5500 : 3200;
  setTimeout(() => {
    overlay.style.display = 'none';
    container.innerHTML = '';
  }, duration);
}

function _triggerBigWinEffects(isMega, profit) {
  const fw_colors = ['#e879f9','#fbbf24','#4ade80','#60a5fa','#f87171','#a78bfa','#fde68a','#34d399','#fb923c','#fff'];

  // 1. Screen flash
  const flash = document.getElementById('jackpot-flash');
  flash.style.cssText = 'display:block;animation:jackFlash 0.9s ease forwards';
  setTimeout(() => { flash.style.display='none'; flash.style.animation=''; }, 1000);

  // 2. Hue-rotate whole game briefly
  const game = document.getElementById('game');
  if (game) {
    game.classList.add('jackpot-hue-game');
    setTimeout(() => game.classList.remove('jackpot-hue-game'), 1300);
  }

  // 3. Shockwave rings (3 rings staggered)
  const sw = document.getElementById('jackpot-shockwave');
  sw.innerHTML = '';
  sw.style.display = 'block';
  const ringColors = ['#e879f9','#fbbf24','#60a5fa'];
  ringColors.forEach((c, i) => {
    const ring = document.createElement('div');
    ring.className = 'shock-ring';
    ring.style.cssText = `--sd:1.4s;--sdelay:${i*0.25}s;--sc:${c};--sw:${3-i}px`;
    sw.appendChild(ring);
  });
  setTimeout(() => { sw.style.display='none'; sw.innerHTML=''; }, 2200);

  // 4. Laser beams (8 beams from center)
  const lasers = document.getElementById('jackpot-lasers');
  lasers.innerHTML = '';
  lasers.style.display = 'block';
  const beamAngles = [0,45,90,135,180,225,270,315];
  beamAngles.forEach((angle, i) => {
    const beam = document.createElement('div');
    beam.className = 'laser-beam';
    const c = fw_colors[i % fw_colors.length];
    beam.style.cssText = `transform:rotate(${angle}deg);--ld:0.7s;--ldelay:${0.05+i*0.04}s;--lc:${c};transform-origin:0 50%;top:50%;left:50%`;
    lasers.appendChild(beam);
  });
  setTimeout(() => { lasers.style.display='none'; lasers.innerHTML=''; }, 1200);

  // 5. Firework rockets → bursts
  const fw = document.getElementById('jackpot-fireworks');
  fw.innerHTML = '';
  fw.style.display = 'block';
  const rocketCount = isMega ? 12 : 8;
  for (let r = 0; r < rocketCount; r++) {
    const delay = r * 0.22;
    const x = 10 + Math.random() * 80; // % from left
    const riseH = -(30 + Math.random() * 45); // vh
    const rc = fw_colors[Math.floor(Math.random()*fw_colors.length)];
    const h = 18 + Math.random() * 16; // rocket height px

    const rocket = document.createElement('div');
    rocket.className = 'fw-rocket';
    rocket.style.cssText = `left:${x}%;bottom:0;height:${h}px;--rc:${rc};--rh:${riseH}vh;--rd:${0.7+Math.random()*0.4}s;--rdelay:${delay}s`;
    fw.appendChild(rocket);

    // Burst at rocket peak
    const burstDelay = delay + 0.65 + Math.random()*0.2;
    const bx = x; // % from left — need px. Approximate
    const burst = document.createElement('div');
    burst.className = 'fw-burst';
    burst.style.cssText = `left:${bx}%;top:${Math.abs(riseH)}%;--bdelay:${burstDelay}s`;
    const sparkCount = 14 + Math.floor(Math.random()*10);
    for (let s = 0; s < sparkCount; s++) {
      const spark = document.createElement('div');
      spark.className = 'fw-spark';
      const sa = (s / sparkCount) * 360;
      const sr = 50 + Math.random() * 80;
      spark.style.cssText = `--sa:${sa}deg;--sr:${sr}px;--fc:${rc};--sfd:${0.9+Math.random()*0.7}s;--sfdelay:${burstDelay}s`;
      burst.appendChild(spark);
    }
    fw.appendChild(burst);
  }
  setTimeout(() => { fw.style.display='none'; fw.innerHTML=''; }, 4500);

  // 6. Money rain
  const rain = document.getElementById('jackpot-money-rain');
  rain.innerHTML = '';
  rain.style.display = 'block';
  const moneyEmojis = ['💵','💸','💰','🤑','💴','💶','💷'];
  const rainCount = isMega ? 40 : 25;
  for (let m = 0; m < rainCount; m++) {
    const drop = document.createElement('div');
    drop.className = 'money-drop';
    const fs = 14 + Math.random() * 18;
    drop.style.cssText = `left:${Math.random()*100}%;--mfd:${1.5+Math.random()*2.5}s;--mfdelay:${Math.random()*2}s;--mfs:${fs}px;--mrot:${Math.random()>0.5?360:-360}deg`;
    drop.textContent = moneyEmojis[Math.floor(Math.random()*moneyEmojis.length)];
    rain.appendChild(drop);
  }
  setTimeout(() => { rain.style.display='none'; rain.innerHTML=''; }, 5000);

  // 7. Floating profit number
  const existing = document.querySelector('.jackpot-profit-float');
  if (existing) existing.remove();
  const profitEl = document.createElement('div');
  profitEl.className = 'jackpot-profit-float';
  const profitStr = profit >= 1e9 ? '+$'+(profit/1e9).toFixed(1)+'B'
    : profit >= 1e6 ? '+$'+(profit/1e6).toFixed(1)+'M'
    : profit >= 1e3 ? '+$'+(profit/1e3).toFixed(1)+'K'
    : '+$'+Math.floor(profit);
  profitEl.textContent = profitStr;
  document.body.appendChild(profitEl);
  setTimeout(() => profitEl.remove(), 3000);

  // 8. Big win banner
  const banner = document.getElementById('jackpot-bigwin-banner');
  banner.innerHTML = `
    <div class="bigwin-title">${isMega ? '🌟 MEGA JACKPOT 🌟' : '🎰 BIG WIN! 🎰'}</div>
    <div class="bigwin-sub">${profitStr} · ${isMega ? 'KHÔNG TƯỞNG!' : 'TUYỆT VỜI!'}</div>
  `;
  banner.style.display = 'block';
  setTimeout(() => { banner.style.display='none'; banner.innerHTML=''; }, 4800);
}

// ════════════════════════════════════════════════════════════════════
//  ENHANCED BANK: animate currency cards on render
// ════════════════════════════════════════════════════════════════════
const _origRenderBank = renderBank;
window.renderBank = function() {
  _origRenderBank();
  // Add animation classes to currency cards
  document.querySelectorAll('.currency-card').forEach((el, i) => {
    el.style.animationDelay = (i * 0.07) + 's';
    el.classList.add('bank-section-animated','currency-card-glow');
  });
  document.querySelectorAll('.bank-section').forEach((el, i) => {
    el.style.animationDelay = (i * 0.1) + 's';
    el.classList.add('bank-section-animated');
  });
};

// ════════════════════════════════════════════════════════════════════
//  ENHANCED SHOP: glow effect on available items
// ════════════════════════════════════════════════════════════════════
const _origRenderShopContent = renderShopContent;
window.renderShopContent = function() {
  _origRenderShopContent();
  // Staggered card entrance
  document.querySelectorAll('.shop-item:not(.locked-item)').forEach((el, i) => {
    el.style.animationDelay = (i * 0.05) + 's';
    if (!el.classList.contains('shop-item-glow')) el.classList.add('shop-item-glow');
  });
};

// ════════════════════════════════════════════════════════════════════
//  PATCH spinLottery to trigger jackpot explosion
// ════════════════════════════════════════════════════════════════════
const _origSpinLottery = typeof spinLottery === 'function' ? spinLottery : null;
// We patch by wrapping the jackpot check — hook into showNotif for jackpot detection
const _origShowNotif = showNotif;
// Track last lottery profit for big-win detection
let _lastLotteryProfit = 0;
window.showNotif = function(msg) {
  _origShowNotif(msg);
  // Detect jackpot win from notification
  if (msg.includes('JACKPOT') || msg.includes('Jackpot')) {
    const isMega = msg.includes('MEGA');
    const profit = _lastLotteryProfit;
    setTimeout(() => triggerJackpotExplosion(isMega, profit), 400);
  }
};

// Patch spinLottery to capture profit before showNotif fires
const _origSpinLotteryFn = window.spinLottery || spinLottery;
window.spinLottery = function() {
  // Wrap showNotif temporarily to capture profit
  const _tmp = window.showNotif;
  window.showNotif = function(msg) {
    // Extract profit from message like "+$500" or "+$1.5K"
    const profitMatch = msg.match(/\+\$?([\d.]+)([KMBTkmbT]?)/);
    if (profitMatch) {
      let val = parseFloat(profitMatch[1]);
      const unit = (profitMatch[2]||'').toUpperCase();
      if (unit==='K') val *= 1e3;
      else if (unit==='M') val *= 1e6;
      else if (unit==='B') val *= 1e9;
      else if (unit==='T') val *= 1e12;
      _lastLotteryProfit = val;
    }
    _tmp.call(window, msg);
    window.showNotif = _tmp; // restore
  };
  _origSpinLotteryFn.apply(this, arguments);
};

// ════════════════════════════════════════════════════════════════════
//  FLOATING BACKGROUND PARTICLES (ambient)
// ════════════════════════════════════════════════════════════════════
(function spawnParticles() {
  for (let i = 0; i < 12; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.pointerEvents = 'none';
    const size = 2 + Math.random() * 4;
    p.style.cssText = [
      'width:' + size + 'px', 'height:' + size + 'px',
      'left:' + Math.random()*100 + '%',
      'top:' + (10+Math.random()*80) + '%',
      'background:' + ['#60a5fa','#a78bfa','#4ade80','#fbbf24'][Math.floor(Math.random()*4)],
      '--dur:' + (3+Math.random()*5) + 's',
      '--delay:' + Math.random()*3 + 's',
      '--tx:' + (Math.random()*40-20) + 'px',
      '--ty:' + (Math.random()*-40-10) + 'px',
      '--sc:' + (0.3+Math.random()*0.7),
    ].join(';');
    document.body.appendChild(p);
  }
})();

// ════════════════════════════════════════════════════════════════════
//  BIG JACKPOT ANNOUNCEMENT — Thông báo lớn khi người khác trúng
//  Tỉ lệ 20% mỗi phút (khoảng 1 lần mỗi 5 phút trung bình)
// ════════════════════════════════════════════════════════════════════
(function injectBigJackpotStyles() {
  const s = document.createElement('style');
  s.textContent = `
@keyframes bjOverlayIn { from{opacity:0} to{opacity:1} }
@keyframes bjCardIn { from{opacity:0;transform:translate(-50%,-50%) scale(0.5) rotate(-5deg)} to{opacity:1;transform:translate(-50%,-50%) scale(1) rotate(0deg)} }
@keyframes bjCardOut { from{opacity:1;transform:translate(-50%,-50%) scale(1)} to{opacity:0;transform:translate(-50%,-50%) scale(1.1)} }
@keyframes bjNamePulse { 0%,100%{text-shadow:0 0 20px #fbbf24,0 0 40px #f59e0b} 50%{text-shadow:0 0 40px #fbbf24,0 0 80px #f59e0b,0 0 120px #f59e0b} }
@keyframes bjAmountBounce { 0%{transform:scale(0)} 60%{transform:scale(1.15)} 80%{transform:scale(0.95)} 100%{transform:scale(1)} }
@keyframes bjFirework { 0%{transform:translateY(0);opacity:1} 100%{transform:translateY(-200px);opacity:0} }
@keyframes bjSparkle { 0%,100%{opacity:0;transform:scale(0)} 50%{opacity:1;transform:scale(1)} }
@keyframes bjGlitter { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
@keyframes bjPing { 0%{transform:scale(1);opacity:0.8} 100%{transform:scale(3);opacity:0} }
@keyframes bjCrownBounce { 0%,100%{transform:translateY(0) rotate(-10deg)} 50%{transform:translateY(-12px) rotate(10deg)} }
@keyframes bjRainDrop { 0%{transform:translateY(-20px) rotate(var(--rot));opacity:1} 100%{transform:translateY(110vh) rotate(var(--rot));opacity:0.3} }
@keyframes bjTextGlitch { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-3px)} 40%{transform:translateX(3px)} 60%{transform:translateX(-1px)} 80%{transform:translateX(1px)} }
@keyframes bjBorderRotate { 0%{--bjangle:0deg} 100%{--bjangle:360deg} }
@keyframes bjHeartbeat { 0%,100%{transform:scale(1)} 14%{transform:scale(1.3)} 28%{transform:scale(1)} 42%{transform:scale(1.3)} 70%{transform:scale(1)} }

#bj-overlay {
  display:none; position:fixed; inset:0; z-index:99999;
  background:rgba(0,0,0,0.75); backdrop-filter:blur(6px);
  animation:bjOverlayIn 0.3s ease;
}
#bj-overlay.active { display:block; }

#bj-card {
  position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
  width:min(92vw,480px);
  background:linear-gradient(135deg,#0a0015 0%,#130025 40%,#0a001a 70%,#050010 100%);
  border-radius:24px; padding:32px 28px 28px;
  box-shadow:0 0 0 1px rgba(251,191,36,0.4),0 0 60px rgba(251,191,36,0.25),0 30px 80px rgba(0,0,0,0.8);
  text-align:center; overflow:hidden; position:relative;
}
#bj-card.entering { animation:bjCardIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards; }
#bj-card.leaving  { animation:bjCardOut 0.4s ease forwards; }

#bj-bg-glow {
  position:absolute; inset:-40px; border-radius:50%;
  background:radial-gradient(ellipse at center,rgba(251,191,36,0.15) 0%,transparent 70%);
  pointer-events:none; animation:bjGlitter 3s ease infinite; background-size:200%;
}
#bj-border-ring {
  position:absolute; inset:-2px; border-radius:26px;
  background:conic-gradient(from var(--bjangle,0deg),#fbbf24,#f59e0b,#e879f9,#60a5fa,#4ade80,#fbbf24);
  animation:bjBorderRotate 3s linear infinite; z-index:-1;
}
@property --bjangle { syntax:'<angle>'; inherits:false; initial-value:0deg }

.bj-crown { font-size:48px; animation:bjCrownBounce 1s ease-in-out infinite; display:block; margin-bottom:6px; }
.bj-live-badge {
  display:inline-flex; align-items:center; gap:6px;
  background:rgba(239,68,68,0.15); border:1px solid rgba(239,68,68,0.5);
  border-radius:20px; padding:4px 14px; font-size:11px; font-weight:700;
  color:#f87171; letter-spacing:1.5px; margin-bottom:16px; text-transform:uppercase;
}
.bj-live-dot { width:7px; height:7px; border-radius:50%; background:#ef4444; animation:bjHeartbeat 1.2s ease-in-out infinite; flex-shrink:0; }
.bj-headline { font-size:13px; color:#94a3b8; margin-bottom:10px; letter-spacing:0.5px; }
#bj-name {
  font-size:32px; font-weight:900; color:#fbbf24;
  animation:bjNamePulse 1.5s ease-in-out infinite, bjTextGlitch 0.3s ease 1s;
  margin-bottom:12px; letter-spacing:1px;
  text-shadow:0 0 20px #fbbf24,0 0 40px #f59e0b;
}
#bj-amount {
  font-size:44px; font-weight:900; letter-spacing:-1px; margin-bottom:8px;
  background:linear-gradient(135deg,#fde68a,#fbbf24,#f59e0b,#ea580c);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent;
  background-clip:text; animation:bjAmountBounce 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.3s both;
  filter:drop-shadow(0 0 12px rgba(251,191,36,0.6));
}
.bj-sub { font-size:13px; color:#6b7280; margin-bottom:20px; }
#bj-fireworks-layer {
  position:absolute; inset:0; pointer-events:none; overflow:hidden;
}
.bj-fw { position:absolute; width:8px; height:8px; border-radius:50%;
  animation:bjFirework var(--bfd,1.5s) var(--bfdelay,0s) ease-out forwards; }
.bj-sparkle { position:absolute; font-size:20px; animation:bjSparkle var(--spd,1.5s) var(--spdelay,0s) ease-in-out infinite; }
#bj-money-rain { position:absolute; inset:0; pointer-events:none; overflow:hidden; }
.bj-rain-drop { position:absolute; top:-30px; font-size:var(--rfs,18px); animation:bjRainDrop var(--rfd,2s) var(--rfdelay,0s) linear infinite; --rot:0deg; }
.bj-ping { position:absolute; top:50%; left:50%; width:200px; height:200px;
  margin:-100px 0 0 -100px; border-radius:50%;
  border:2px solid rgba(251,191,36,0.4);
  animation:bjPing 2s ease-out infinite; pointer-events:none; }
.bj-close-btn {
  display:inline-flex; align-items:center; gap:7px;
  background:linear-gradient(135deg,#1e3a00,#2d5a00); color:#4ade80;
  border:1px solid rgba(74,222,128,0.3); border-radius:12px;
  padding:11px 28px; font-size:14px; font-weight:700; cursor:pointer;
  transition:all 0.2s; letter-spacing:0.3px;
}
.bj-close-btn:hover { background:linear-gradient(135deg,#2d5a00,#3d7a00); box-shadow:0 0 20px rgba(74,222,128,0.3); }

/* Live feed enhancements */
.lott-winner-row { position:relative; overflow:hidden; }
.lott-winner-row::after {
  content:'🔴 LIVE'; position:absolute; right:4px; top:50%; transform:translateY(-50%);
  font-size:8px; color:#ef4444; font-weight:800; letter-spacing:0.8px;
  animation:bjHeartbeat 1.2s ease-in-out infinite; opacity:0.8;
}
.lott-winner-row.winner-flash {
  animation:lottRowFlash 0.5s ease;
}
@keyframes lottRowFlash { 0%,100%{background:transparent} 50%{background:rgba(251,191,36,0.12)} }

.lott-feed-row.lott-feed-row--enter {
  animation:lottFeedSlideIn 0.4s cubic-bezier(0.34,1.56,0.64,1);
}
@keyframes lottFeedSlideIn { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }

/* Live typing dots for feed */
.lott-live-typing::after { content:'...'; animation:lottTyping 1s steps(3,end) infinite; }
@keyframes lottTyping { 0%{content:'.'} 33%{content:'..'} 66%{content:'...'} }

/* Winner feed "LIVE" header pulse */
.lott-winners-title .lott-winners-live-dot { animation:bjHeartbeat 1s ease-in-out infinite; }
  `;
  document.head.appendChild(s);
})();

// Inject overlay HTML
(function injectBJOverlay() {
  const div = document.createElement('div');
  div.id = 'bj-overlay';
  div.innerHTML = `
    <div id="bj-card">
      <div id="bj-border-ring"></div>
      <div id="bj-bg-glow"></div>
      <div id="bj-fireworks-layer"></div>
      <div id="bj-money-rain"></div>
      <div class="bj-ping"></div>
      <span class="bj-crown">👑</span>
      <div class="bj-live-badge"><span class="bj-live-dot"></span>LIVE — ĐANG XẢY RA</div>
      <div class="bj-headline">🎰 MỘT NGƯỜI CHƠI VỪA TRÚNG JACKPOT!</div>
      <div id="bj-name">NgocHa</div>
      <div id="bj-amount">$50,000</div>
      <div class="bj-sub">Chúc mừng! 🎊 Bạn có thể là người tiếp theo!</div>
      <button class="bj-close-btn" onclick="closeBJOverlay()">✅ Xem Ngay → Lottery</button>
    </div>
  `;
  document.body.appendChild(div);
})();

function closeBJOverlay() {
  const card = document.getElementById('bj-card');
  card.classList.remove('entering');
  card.classList.add('leaving');
  setTimeout(() => {
    const ov = document.getElementById('bj-overlay');
    if(ov) { ov.classList.remove('active'); card.classList.remove('leaving'); }
  }, 400);
}

// triggerBigJackpotAnnouncement() — shows a "LIVE JACKPOT" popup card
// with a random player name and fabricated prize amount.
// Only visible while the Lottery tab is open; otherwise sets _bjPending=true
// and shows it next time the player navigates to the Lottery tab.
// Auto-closes after 12 seconds.
// Fired probabilistically: 20% chance every minute after first 30-90 s.
function triggerBigJackpotAnnouncement() {
  // Only show when the Lottery tab is active
  const lottPanel = document.getElementById('panel-lottery');
  if (!lottPanel || !lottPanel.classList.contains('active')) {
    _bjPending = true; // đặt cờ, sẽ hiện khi người dùng vào tab lottery
    return;
  }
  _bjPending = false;

  const names = ['NgocHa','TuanAnh','VuHoang','LinhNhi','KhanhNam','BaoTran','MaiAnh','SonTung','ThanhVu','AnhKhoa','HoaiThu','QuangBach','TienDat','NhuQuynh','HoangLong'];
  const name = names[Math.floor(Math.random()*names.length)];
  const bet = (200 + Math.floor(Math.random()*800)) * 10;
  const won = bet * 50;
  const wonStr = won >= 1e6 ? '$'+(won/1e6).toFixed(2)+'M' : won >= 1e3 ? '$'+(won/1000).toFixed(1)+'K' : '$'+won.toLocaleString();

  const nameEl = document.getElementById('bj-name');
  const amtEl = document.getElementById('bj-amount');
  const fwLayer = document.getElementById('bj-fireworks-layer');
  const rainLayer = document.getElementById('bj-money-rain');
  if(!nameEl || !amtEl) return;

  nameEl.textContent = name + ' 🎉';
  amtEl.textContent = wonStr;

  // Fireworks
  if(fwLayer) {
    fwLayer.innerHTML = '';
    const cols = ['#fbbf24','#e879f9','#60a5fa','#4ade80','#f87171','#a78bfa','#fde68a','#34d399'];
    for(let i=0;i<22;i++){
      const fw = document.createElement('div');
      fw.className = 'bj-fw';
      fw.style.cssText = `left:${Math.random()*100}%;top:${20+Math.random()*60}%;background:${cols[Math.floor(Math.random()*cols.length)]};width:${4+Math.random()*8}px;height:${4+Math.random()*8}px;--bfd:${1.2+Math.random()*1.5}s;--bfdelay:${Math.random()*1.5}s`;
      fwLayer.appendChild(fw);
    }
    const sparkles = ['🌟','✨','💫','⭐','🎇','🎆','🎊','🎉'];
    for(let i=0;i<10;i++){
      const sp = document.createElement('div');
      sp.className = 'bj-sparkle';
      sp.textContent = sparkles[Math.floor(Math.random()*sparkles.length)];
      sp.style.cssText = `left:${Math.random()*95}%;top:${Math.random()*95}%;--spd:${1+Math.random()*2}s;--spdelay:${Math.random()*2}s`;
      fwLayer.appendChild(sp);
    }
  }
  // Money rain
  if(rainLayer) {
    rainLayer.innerHTML = '';
    const drops = ['💵','💸','💰','🤑','💴','💶'];
    for(let i=0;i<18;i++){
      const dr = document.createElement('div');
      dr.className = 'bj-rain-drop';
      dr.textContent = drops[Math.floor(Math.random()*drops.length)];
      dr.style.cssText = `left:${Math.random()*95}%;--rfs:${12+Math.random()*14}px;--rfd:${2+Math.random()*2}s;--rfdelay:${Math.random()*2}s;--rot:${Math.random()>0.5?15:-15}deg`;
      rainLayer.appendChild(dr);
    }
  }

  const overlay = document.getElementById('bj-overlay');
  const card = document.getElementById('bj-card');
  overlay.classList.add('active');
  card.classList.remove('leaving');
  card.classList.add('entering');

  // Also add to winners feed
  const winner = { name, avatar: ['🧑','👩','👨','🧔','👧'][Math.floor(Math.random()*5)], prize:{label:'JACKPOT x50',cls:'jackpot',emoji:'🎉'}, won, secsAgo:1 };
  if(typeof lottWinnersHistory !== 'undefined') {
    lottWinnersHistory.unshift(winner);
    if(lottWinnersHistory.length>4) lottWinnersHistory.pop();
    if(typeof renderWinnersFeed === 'function') {
      renderWinnersFeed();
      setTimeout(() => {
        const firstRow = document.querySelector('#lott-winners-list .lott-winner-row');
        if(firstRow) { firstRow.classList.add('winner-flash'); setTimeout(()=>firstRow.classList.remove('winner-flash'),600); }
      }, 100);
    }
  }
  // Also update live banner feed
  if(typeof lottActivityHistory !== 'undefined') {
    const actRow = { avatar: winner.avatar, name, actionText: 'vừa TRÚNG JACKPOT', badgeText: wonStr + ' 🎉', badgeCls: 'lott-feed-badge--jackpot' };
    lottActivityHistory.unshift(actRow);
    if(lottActivityHistory.length>5) lottActivityHistory.pop();
    if(typeof renderLottActivityFeed === 'function') renderLottActivityFeed();
  }

  // Auto-close after 12 seconds
  setTimeout(() => closeBJOverlay(), 12000);
}

let _bjPending = false;

// Khi người dùng chuyển vào tab lottery, kiểm tra nếu có popup đang chờ
const _origSwitchTabBJ = window.switchTab;
window.switchTab = function(tab) {
  _origSwitchTabBJ(tab);
  if(tab === 'lottery' && _bjPending) {
    setTimeout(() => triggerBigJackpotAnnouncement(), 800);
  }
  // Đóng popup nếu rời tab lottery
  if(tab !== 'lottery') {
    const ov = document.getElementById('bj-overlay');
    if(ov && ov.classList.contains('active')) closeBJOverlay();
  }
};

// Schedule fake jackpot announcements for social-proof effect.
// First fires after a 30–90 second random delay, then every 60 seconds.
// Each invocation has a 20% chance of actually showing the popup.
(function scheduleBigJackpotAnnouncements() {
  const firstDelay = 30000 + Math.random()*60000;
  setTimeout(function tryAnnounce() {
    if(Math.random() < 0.20) {
      triggerBigJackpotAnnouncement();
    }
    setTimeout(tryAnnounce, 60000);
  }, firstDelay);
})();

// ════════════════════════════════════════════════════════════════════
//  CSS @property for conic-gradient animation (spin btn)
// ════════════════════════════════════════════════════════════════════
(function injectProperty() {
  const s = document.createElement('style');
  s.textContent = '@property --angle{syntax:"<angle>";inherits:false;initial-value:0deg}';
  document.head.appendChild(s);
})();

// ═══════════════════════════════════════════════════════════════════
//  ENHANCED: LOTTERY LIVE FEED — MORE PLAYERS, LOWER WIN RATE
// ═══════════════════════════════════════════════════════════════════
const ENHANCED_WINNER_NAMES = ['Minh_T','NgocHa','VuHoang','LinhNhi','TuanAnh','PhuongLe','KhanhNam','MyLe','BaoTran',
  'ThanhVu','AnhKhoa','HoaiThu','DucMinh','NgaLe','TrungKien','HuyenBV','QuangBach','TienDat','NhuQuynh','HoangLong',
  'MaiAnh','SonTung','ThuHuong','CaoViet','LanAnh','PhucNguyen','HieuTran','NgaHuong','ChiNhan','VinhPhat',
  'KyLan','BichNgoc','HungThinh','MinhChau','TuanKiet','PhiLong','AnhThu','QuynhNhi','VietAnh','NamPhong',
  'ThuyDung','DaiNghia','HanhNguyen','TamNguyen','BachKim','HoaiBao','PhuLoc','ThanhTam','KimHoa','TranLinh',
  'XuanMai','HuuNghia','TrungHau','MinhTuyen','BinhThuan','LongVu','AnhDao','PhucThinh','NhiNguyen','BaoBao'];
const ENHANCED_AVATARS = ['🧑','👩','👨','🧔','👧','👦','🧑‍💻','👩‍💼','🧑‍🎤','👱','🧕','👲','🧑‍🎓','👩‍🦰','🧑‍🔧','👩‍🎨','🧑‍🚀'];

// More loss entries than wins to create realistic feel
const ENHANCED_EVENTS = [
  { type:'loss', label:'thua', cls:'lott-feed-badge--loss', emojis:['❌','😢','💸','😭'], betRange:[50,500] },
  { type:'loss', label:'thua', cls:'lott-feed-badge--loss', emojis:['❌','😢','💸','😭'], betRange:[100,800] },
  { type:'loss', label:'thua', cls:'lott-feed-badge--loss', emojis:['❌','😢','💸'], betRange:[200,1500] },
  { type:'loss', label:'thua', cls:'lott-feed-badge--loss', emojis:['❌','💸'], betRange:[50,300] },
  { type:'loss', label:'thua', cls:'lott-feed-badge--loss', emojis:['❌','💸'], betRange:[80,400] },
  { type:'bet', label:'đặt cược', cls:'lott-feed-badge--bet', emojis:['💰','🎲','🤞'], betRange:[50,2000] },
  { type:'bet', label:'đặt cược', cls:'lott-feed-badge--bet', emojis:['💰','🎲'], betRange:[200,5000] },
  { type:'smallwin', label:'thắng nhỏ x1.5', cls:'lott-feed-badge--smallwin', emojis:['💚','🙂'], betRange:[100,500] },
  { type:'smallwin', label:'thắng x3', cls:'lott-feed-badge--smallwin', emojis:['💚','😊'], betRange:[50,300] },
  { type:'midwin', label:'thắng x8', cls:'lott-feed-badge--midwin', emojis:['🤑','💰'], betRange:[200,1000] },
  // JACKPOT is very rare — only 1 in the list
  { type:'jackpot', label:'JACKPOT x50 🎉', cls:'lott-feed-badge--jackpot', emojis:['🎉','🌟'], betRange:[500,2000] },
];
// Weighted pool: lots of losses/bets, rare wins/jackpots
const ENHANCED_POOL = [];
for(let i=0;i<5;i++) ENHANCED_POOL.push(0); // loss x5
for(let i=0;i<5;i++) ENHANCED_POOL.push(1);
for(let i=0;i<5;i++) ENHANCED_POOL.push(2);
for(let i=0;i<5;i++) ENHANCED_POOL.push(3);
for(let i=0;i<5;i++) ENHANCED_POOL.push(4);
for(let i=0;i<8;i++) ENHANCED_POOL.push(5); // bet x8
for(let i=0;i<4;i++) ENHANCED_POOL.push(6);
for(let i=0;i<3;i++) ENHANCED_POOL.push(7); // smallwin x3
for(let i=0;i<2;i++) ENHANCED_POOL.push(8);
for(let i=0;i<1;i++) ENHANCED_POOL.push(9); // midwin x1
ENHANCED_POOL.push(10); // jackpot x1 (rare)

let lottActivityInterval = null;
let lottPlayersInterval = null;
let lottPoolInterval = null;
let lottJackpotLastMin = Math.floor(Math.random()*8)+2;
const LOTT_POOL_KEY = 'factory_lott_pool';
let lottPool = (() => {
  try {
    const saved = parseInt(localStorage.getItem(LOTT_POOL_KEY));
    if(saved && saved >= 50000000 && saved <= 120000000) return saved;
  } catch(e) {}
  return 98427500 + Math.floor(Math.random()*500000);
})();

function initLotteryLiveBanner() {
  // Spawn stars
  const starsEl = document.getElementById('lott-mega-stars');
  if(starsEl && starsEl.children.length === 0) {
    for(let i=0;i<28;i++){
      const s = document.createElement('span');
      s.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;--d:${1+Math.random()*3}s;--delay:${Math.random()*3}s;width:${1+Math.random()*3}px;height:${1+Math.random()*3}px`;
      starsEl.appendChild(s);
    }
  }
  // Update pool value
  updateLottPool();
  if(lottPoolInterval) clearInterval(lottPoolInterval);
  lottPoolInterval = setInterval(updateLottPool, 1800);
  // Animate player count
  if(lottPlayersInterval) clearInterval(lottPlayersInterval);
  lottPlayersInterval = setInterval(updateLottPlayers, 4000);
  // Activity feed
  if(lottActivityInterval) clearInterval(lottActivityInterval);
  seedLottActivityFeed();
  lottActivityInterval = setInterval(addLottActivityRow, 2200 + Math.random()*1800);
}

function updateLottPool() {
  lottPool += Math.floor(Math.random()*4500)+500;
  if(lottPool > 120000000) lottPool = 85000000 + Math.floor(Math.random()*5000000);
  try { localStorage.setItem(LOTT_POOL_KEY, lottPool); } catch(e) {}
  const el = document.getElementById('lott-pool-val');
  if(el) el.textContent = '$' + lottPool.toLocaleString();
}

function updateLottPlayers() {
  const delta = Math.floor(Math.random()*120)-40;
  const el = document.getElementById('lott-live-players');
  if(!el) return;
  let cur = parseInt(el.textContent.replace(/,/g,''))||2847;
  cur = Math.max(1800, Math.min(5200, cur+delta));
  el.textContent = cur.toLocaleString();
  // Update last jackpot time
  lottJackpotLastMin += Math.random() < 0.15 ? 1 : 0;
  const ltEl = document.getElementById('lott-last-jack-time');
  if(ltEl) {
    if(lottJackpotLastMin <= 1) ltEl.textContent = 'vừa xong';
    else if(lottJackpotLastMin < 60) ltEl.textContent = lottJackpotLastMin + ' phút trước';
    else ltEl.textContent = Math.floor(lottJackpotLastMin/60) + ' giờ trước';
    if(lottJackpotLastMin > 120) lottJackpotLastMin = 1; // reset
  }
}

const lottActivityHistory = [];
function seedLottActivityFeed() {
  for(let i=0;i<4;i++) lottActivityHistory.push(genLottActivityRow());
  renderLottActivityFeed();
}

function genLottActivityRow() {
  const evIdx = ENHANCED_POOL[Math.floor(Math.random()*ENHANCED_POOL.length)];
  const ev = ENHANCED_EVENTS[evIdx];
  const name = ENHANCED_WINNER_NAMES[Math.floor(Math.random()*ENHANCED_WINNER_NAMES.length)];
  const avatar = ENHANCED_AVATARS[Math.floor(Math.random()*ENHANCED_AVATARS.length)];
  const emoji = ev.emojis[Math.floor(Math.random()*ev.emojis.length)];
  const bet = ev.betRange[0] + Math.floor(Math.random()*(ev.betRange[1]-ev.betRange[0]));
  const betFmt = bet >= 1000 ? (bet/1000).toFixed(1)+'K' : bet;
  let actionText, badgeText, badgeCls;
  if(ev.type==='bet') {
    actionText = ` vừa đặt cược $${betFmt}`;
    badgeText = '🎲 bet'; badgeCls = 'lott-feed-badge--bet';
  } else if(ev.type==='loss') {
    actionText = ` thua $${betFmt}`;
    badgeText = '❌ miss'; badgeCls = 'lott-feed-badge--loss';
  } else if(ev.type==='smallwin') {
    const wonAmt = Math.round(bet*(ev.label.includes('1.5')?1.5:3));
    actionText = ` thắng +$${wonAmt >= 1000 ? (wonAmt/1000).toFixed(1)+'K' : wonAmt}`;
    badgeText = emoji+' win'; badgeCls = 'lott-feed-badge--smallwin';
  } else if(ev.type==='midwin') {
    actionText = ` thắng +$${(bet*10/1000).toFixed(0)}K`;
    badgeText = '🤑 x10'; badgeCls = 'lott-feed-badge--midwin';
  } else {
    actionText = ` 🎉 JACKPOT +$${(bet*200/1000).toFixed(0)}K`;
    badgeText = '🌟 JP'; badgeCls = 'lott-feed-badge--jackpot';
    lottJackpotLastMin = 0;
  }
  return { avatar, name, actionText, badgeText, badgeCls };
}

function addLottActivityRow() {
  const settingEl = document.getElementById('game-livefeed');
  if(settingEl && !settingEl.checked) return;
  const row = genLottActivityRow();
  lottActivityHistory.unshift(row);
  if(lottActivityHistory.length > 5) lottActivityHistory.pop();
  renderLottActivityFeed();
}

function renderLottActivityFeed() {
  const feedEl = document.getElementById('lott-activity-feed');
  if(!feedEl) return;
  feedEl.innerHTML = lottActivityHistory.slice(0,4).map((r,i) =>
    `<div class="lott-feed-row ${i===0?'lott-feed-row--enter':''}">
      <span class="lott-feed-avi">${r.avatar}</span>
      <span class="lott-feed-name">${r.name}</span>
      <span class="lott-feed-action">${r.actionText}</span>
      <span class="lott-feed-badge ${r.badgeCls}">${r.badgeText}</span>
    </div>`
  ).join('');
}

// Also update old lott-winners-list (in shop ad) to use more people and realistic ratio
const _origStartLotteryWinnersFeed = typeof startLotteryWinnersFeed === 'function' ? startLotteryWinnersFeed : null;
window.startLotteryWinnersFeed = function() {
  // call original
  if(_origStartLotteryWinnersFeed) _origStartLotteryWinnersFeed();
  // init live banner
  initLotteryLiveBanner();
};

// Patch switchTab to init lottery live banner
const _origSwitchTab2 = window.switchTab;
window.switchTab = function(tab) {
  _origSwitchTab2(tab);
  if(tab === 'lottery') {
    setTimeout(() => initLotteryLiveBanner(), 100);
  }
  if(tab === 'settings') {
    updateSettingsSaveInfo();
    const tmEl = document.getElementById('settings-total-machines');
    if(tmEl && window.G) tmEl.textContent = Object.keys(G.machines||{}).length + ' máy';
  }
};

// ═══════════════════════════════════════════════════════════════════
//  SHOP ADS ENHANCED — More animated ads in Shop tab
// ═══════════════════════════════════════════════════════════════════
function injectEnhancedShopAds() {
  const shopContent = document.getElementById('shop-content');
  const tierTabsWrap = document.querySelector('#panel-shop .tier-tabs-wrap');
  if(!tierTabsWrap) return;

  // Check if already injected
  if(document.getElementById('enhanced-shop-ads')) return;

  const adsZone = document.createElement('div');
  adsZone.id = 'enhanced-shop-ads';
  adsZone.innerHTML = `
    <!-- ANIMATED FLASH DEAL AD -->
    <div class="eshop-flash-ad" id="eshop-flash-ad">
      <div class="eshop-flash-bg"></div>
      <div class="eshop-flash-ticker" id="eshop-flash-ticker"></div>
      <div class="eshop-flash-content">
        <div class="eshop-flash-badge">⚡ FLASH SALE</div>
        <div class="eshop-flash-title">Hôm Nay Giảm <span class="eshop-flash-pct" id="eshop-flash-pct">25%</span> Tất Cả Máy!</div>
        <div class="eshop-flash-sub">Ưu đãi đặc biệt cho người chơi tích cực — Mua ngay kẻo hết!</div>
        <div class="eshop-flash-timer-row">
          <span>⏱ Kết thúc sau:</span>
          <span class="eshop-flash-timer" id="eshop-flash-timer">23:47:12</span>
        </div>
        <div class="eshop-flash-machines" id="eshop-flash-machines"></div>
        <button class="eshop-flash-btn" onclick="switchTab('shop')">🛒 MUA NGAY</button>
      </div>
      <div class="eshop-flash-deco">💰</div>
    </div>

    <!-- STATS/SOCIAL PROOF AD -->
    <div class="eshop-social-ad">
      <div class="eshop-social-row">
        <div class="eshop-social-stat">
          <div class="eshop-social-stat-val" id="eshop-buyers-today">1,247</div>
          <div class="eshop-social-stat-label">mua hôm nay</div>
        </div>
        <div class="eshop-social-divider"></div>
        <div class="eshop-social-stat">
          <div class="eshop-social-stat-val" id="eshop-online-now">384</div>
          <div class="eshop-social-stat-label">đang xem shop</div>
        </div>
        <div class="eshop-social-divider"></div>
        <div class="eshop-social-stat">
          <div class="eshop-social-stat-val" id="eshop-bestseller">T3</div>
          <div class="eshop-social-stat-label">bán chạy nhất</div>
        </div>
      </div>
      <div class="eshop-social-live-row" id="eshop-live-buy-row">
        <span class="eshop-live-dot"></span>
        <span id="eshop-live-buy-text">TuanAnh vừa mua Qubit Engine · 2 giây trước</span>
      </div>
    </div>

    <!-- PREMIUM UPGRADE BANNER -->
    <div class="eshop-premium-ad" onclick="switchTab('vipshop')">
      <div class="eshop-premium-glow"></div>
      <div class="eshop-premium-left">
        <div class="eshop-premium-crown">👑</div>
        <div>
          <div class="eshop-premium-title">NÂNG CẤP VIP</div>
          <div class="eshop-premium-sub">Máy x2 tốc độ · Slot không giới hạn · Xóa ads</div>
        </div>
      </div>
      <div class="eshop-premium-badge">XEM NGAY →</div>
    </div>
  `;

  // Insert before tier tabs
  tierTabsWrap.parentNode.insertBefore(adsZone, tierTabsWrap);
  initShopAdsAnimations();
}

function initShopAdsAnimations() {
  // Flash sale timer countdown
  let saleSeconds = 23*3600 + 47*60 + 12;
  setInterval(() => {
    saleSeconds = Math.max(0, saleSeconds - 1);
    const h = Math.floor(saleSeconds/3600).toString().padStart(2,'0');
    const m = Math.floor((saleSeconds%3600)/60).toString().padStart(2,'0');
    const s = (saleSeconds%60).toString().padStart(2,'0');
    const el = document.getElementById('eshop-flash-timer');
    if(el) el.textContent = h+':'+m+':'+s;
  }, 1000);

  // Animated ticker
  const tickers = ['⚡ FLASH SALE — Giảm 25% · Chỉ hôm nay!','🔥 T3 Qubit Engine — Bán chạy nhất!','💎 T5 Omega Cell — Chỉ còn 3 slot!','🌟 Mua T4+ nhận thêm 10% bonus cash!','⚡ FLASH SALE — Giảm 25% · Chỉ hôm nay!'];
  let tickerIdx = 0;
  const tickerEl = document.getElementById('eshop-flash-ticker');
  if(tickerEl) {
    tickerEl.textContent = tickers[0];
    setInterval(() => {
      tickerIdx = (tickerIdx+1)%tickers.length;
      tickerEl.style.opacity = '0';
      setTimeout(() => {
        tickerEl.textContent = tickers[tickerIdx];
        tickerEl.style.opacity = '1';
      }, 300);
    }, 3000);
  }

  // Flash machines display
  const flashMachines = [
    {icon:'🔮', name:'Qubit Engine', tier:'T3', orig:'$8M', sale:'$6M'},
    {icon:'⭐', name:'Stellar Forge', tier:'T4', orig:'$10B', sale:'$7.5B'},
    {icon:'🧠', name:'Neuro Synth', tier:'T5', orig:'$120B', sale:'$90B'},
  ];
  const fmEl = document.getElementById('eshop-flash-machines');
  if(fmEl) {
    fmEl.innerHTML = flashMachines.map(m => `
      <div class="eshop-flash-machine">
        <span class="eshop-fm-icon">${m.icon}</span>
        <span class="eshop-fm-name">${m.name}</span>
        <span class="eshop-fm-tier">${m.tier}</span>
        <span class="eshop-fm-orig">${m.orig}</span>
        <span class="eshop-fm-sale">${m.sale}</span>
      </div>`).join('');
  }

  // Social proof live counter
  let shopBuyers = 1247, shopOnline = 384;
  setInterval(() => {
    shopBuyers += Math.floor(Math.random()*5);
    shopOnline += Math.floor(Math.random()*20)-8;
    shopOnline = Math.max(150, Math.min(800, shopOnline));
    const bEl = document.getElementById('eshop-buyers-today');
    const oEl = document.getElementById('eshop-online-now');
    if(bEl) bEl.textContent = shopBuyers.toLocaleString();
    if(oEl) oEl.textContent = shopOnline.toLocaleString();
  }, 5000);

  // Live buy text
  const liveBuys = ['TuanAnh vừa mua Qubit Engine','NgocHa vừa mua Tesla Array','VuHoang vừa mua Galaxy Engine','MinhT vừa mua Fusion Core','LinhNhi vừa mua Omega Cell','KhanhNam vừa mua GodAI Node','BaoTran vừa mua Dark Forge','AnhKhoa vừa mua Big Bang Engine'];
  let liveBuyIdx = 0;
  setInterval(() => {
    liveBuyIdx = (liveBuyIdx+1)%liveBuys.length;
    const lbEl = document.getElementById('eshop-live-buy-text');
    if(lbEl) {
      lbEl.style.opacity='0';
      setTimeout(()=>{ lbEl.textContent = liveBuys[liveBuyIdx] + ' · ' + (Math.floor(Math.random()*59)+1) + ' giây trước'; lbEl.style.opacity='1'; },300);
    }
  }, 4000);
}

// Patch renderShopContent to inject ads
const _origRSC2 = window.renderShopContent;
window.renderShopContent = function() {
  _origRSC2();
  setTimeout(injectEnhancedShopAds, 50);
};

// ═══════════════════════════════════════════════════════════════════
//  SETTINGS SYSTEM
// ═══════════════════════════════════════════════════════════════════
const SETTINGS_KEY = 'factory_game_settings_v1';
let _gameSettings = {
  'gfx-lighting': true, 'gfx-particles': true, 'gfx-blur': true,
  'gfx-animations': true, 'gfx-shimmer': true, 'gfx-scanline': true,
  'gfx-stars': true, 'gfx-quality': 3,
  'game-notif': true, 'game-autosave': true, 'game-jackpot-fx': true, 'game-livefeed': true
};

function loadSettings() {
  try {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if(saved) _gameSettings = Object.assign(_gameSettings, JSON.parse(saved));
  } catch(e) {}
  applySettingsToUI();
  applyGraphicsSetting();
}

function saveSettings() {
  const keys = ['gfx-lighting','gfx-particles','gfx-blur','gfx-animations','gfx-shimmer','gfx-scanline','gfx-stars','gfx-quality','game-notif','game-autosave','game-jackpot-fx','game-livefeed'];
  keys.forEach(k => {
    const el = document.getElementById(k);
    if(!el) return;
    if(el.type==='checkbox') _gameSettings[k] = el.checked;
    else _gameSettings[k] = parseInt(el.value)||el.value;
  });
  try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(_gameSettings)); } catch(e){}
  updateSettingsSaveInfo();
}

function applySettingsToUI() {
  const keys = ['gfx-lighting','gfx-particles','gfx-blur','gfx-animations','gfx-shimmer','gfx-scanline','gfx-stars','game-notif','game-autosave','game-jackpot-fx','game-livefeed'];
  keys.forEach(k => {
    const el = document.getElementById(k);
    if(el && el.type==='checkbox') el.checked = _gameSettings[k] !== false;
  });
  const qEl = document.getElementById('gfx-quality');
  if(qEl) qEl.value = _gameSettings['gfx-quality'] || 3;
  applyQualityPreset(_gameSettings['gfx-quality'] || 3);
}

function applyGraphicsSetting() {
  function getBool(id) {
    const el = document.getElementById(id);
    if(el && el.type==='checkbox') { _gameSettings[id]=el.checked; return el.checked; }
    return _gameSettings[id] !== false;
  }
  function getOrCreate(id) {
    let el = document.getElementById(id);
    if(!el) { el=document.createElement('style'); el.id=id; document.head.appendChild(el); }
    return el;
  }
  const lighting=getBool('gfx-lighting'), particles=getBool('gfx-particles'),
        blur=getBool('gfx-blur'), animations=getBool('gfx-animations'),
        shimmer=getBool('gfx-shimmer'), scanline=getBool('gfx-scanline'), stars=getBool('gfx-stars');

  getOrCreate('_gfx_lighting_style').textContent = !lighting ? `
    * { text-shadow:none!important; filter:none!important; }
    .titlebar-left{filter:none!important;}
    .slot,.money-bar,.bank-section,.shop-item,.tier-tab.active,.main-tab.active,.notif,.slot-rate,.mb-val,.titlebar-right,.progress-fill,.power-bar-fill{box-shadow:none!important;}
  ` : '';
  document.querySelectorAll('.particle').forEach(p=>p.style.display=particles?'':'none');
  const confettiEl=document.getElementById('confetti-container');
  if(confettiEl&&!particles) confettiEl.innerHTML='';
  getOrCreate('_gfx_blur_style').textContent = !blur ? `
    *{backdrop-filter:none!important;-webkit-backdrop-filter:none!important;}
  ` : '';
  getOrCreate('_gfx_anim_style').textContent = !animations ? `
    *,*::before,*::after{animation:none!important;animation-duration:0s!important;transition:none!important;}
  ` : '';
  getOrCreate('_gfx_shim_style').textContent = (!shimmer&&animations) ? `
    .titlebar::after,.titlebar::before,.money-bar::before,.eshop-premium-glow,.eshop-flash-bg{animation:none!important;opacity:0!important;}
  ` : '';
  getOrCreate('_gfx_scan_style').textContent = !scanline ? `#game::before{display:none!important;}` : '';
  getOrCreate('_gfx_star_style').textContent = !stars ? `#game::after{display:none!important;}` : '';
  // Lưu ngay sau khi áp dụng
  try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(_gameSettings)); } catch(e){}
}

function applyQualityPreset(val) {
  val = parseInt(val);
  const labels = {1:'Thấp', 2:'Trung Bình', 3:'Cao'};
  const qlEl = document.getElementById('gfx-quality-val');
  if(qlEl) qlEl.textContent = labels[val]||'Cao';
  _gameSettings['gfx-quality'] = val;
  if(val === 1) {
    // Low: disable most effects
    ['gfx-particles','gfx-shimmer','gfx-scanline','gfx-animations'].forEach(k => {
      const el = document.getElementById(k); if(el) el.checked = false; _gameSettings[k] = false;
    });
  } else if(val === 2) {
    ['gfx-particles','gfx-shimmer','gfx-scanline','gfx-animations'].forEach(k => {
      const el = document.getElementById(k); if(el) el.checked = true; _gameSettings[k] = true;
    });
    const blurEl = document.getElementById('gfx-blur'); if(blurEl) blurEl.checked = false; _gameSettings['gfx-blur'] = false;
  } else {
    ['gfx-particles','gfx-shimmer','gfx-scanline','gfx-animations','gfx-blur','gfx-lighting','gfx-stars'].forEach(k => {
      const el = document.getElementById(k); if(el) el.checked = true; _gameSettings[k] = true;
    });
  }
  applyGraphicsSetting(); // đã bao gồm save bên trong
}

function updateSettingsSaveInfo() {
  const el = document.getElementById('settings-last-save');
  if(el) el.textContent = '✅ Lưu lần cuối: ' + new Date().toLocaleTimeString('vi-VN');
}

/* exportSave và importSavePrompt đã bị xóa để bảo mật */

// ═══════════════════════════════════════════════════════════════════
//  LOCAL SAVE SYSTEM — localStorage persistence (secured, no export)
// ═══════════════════════════════════════════════════════════════════
const LOCAL_SAVE_KEY = 'factory_save';

// Patch saveGame to also write to localStorage (no export allowed)
const _origSaveGame = typeof saveGame === 'function' ? saveGame : null;
window.saveGame = function(showMsg) {
  if(_origSaveGame) _origSaveGame(showMsg);
  try {
    if(window.G) {
      const saveData = JSON.stringify({...G, _savedAt: Date.now(), _version: '3.2.0'});
      localStorage.setItem(LOCAL_SAVE_KEY, saveData);
      updateSettingsSaveInfo();
    }
  } catch(e) { console.warn('LocalSave write failed:', e); }
};

// Auto-save every 30s
let _localSaveInterval = null;
function startLocalSaveLoop() {
  if(_localSaveInterval) clearInterval(_localSaveInterval);
  _localSaveInterval = setInterval(() => {
    const autoEl = document.getElementById('game-autosave');
    if(autoEl && !autoEl.checked) return;
    if(window.G) {
      try {
        const saveData = JSON.stringify({...G, _savedAt: Date.now(), _version: '3.2.0'});
        localStorage.setItem(LOCAL_SAVE_KEY, saveData);
      } catch(e) {}
    }
  }, 30000);
}

// Try to load from localStorage on start (supplement existing load)
function tryLoadFromLocalStorage() {
  try {
    const raw = localStorage.getItem(LOCAL_SAVE_KEY);
    if(!raw) return false;
    const data = JSON.parse(raw);
    if(data && data.money !== undefined) {
      if(window.G) {
        Object.assign(G, data);
        if(typeof renderAll === 'function') renderAll();
        if(typeof updateUI === 'function') updateUI();
        return true;
      }
    }
  } catch(e) { console.warn('LocalSave load failed:', e); }
  return false;
}

// ═══════════════════════════════════════════════════════════════════
//  UPDATE LOG TAB
// ═══════════════════════════════════════════════════════════════════
const UPDATE_LOG = [
  {
    version: 'v3.3.0', date: '2025-05-14', tag: 'LATEST', tagColor: '#4ade80',
    title: 'Security & Live Experience',
    changes: [
      { type: 'new', text: '🎆 Thông báo lớn Jackpot người khác: overlay toàn màn hình, pháo hoa, mưa tiền, 20%/phút' },
      { type: 'new', text: '🔴 Winner Live Feed: secsAgo tăng theo thời gian thực, badge LIVE nhịp đập' },
      { type: 'new', text: '💾 Lưu quỹ Jackpot vào localStorage — giữ nguyên số tiền giữa các phiên' },
      { type: 'improved', text: '⚙️ Cài đặt đồ họa: lưu tức thì khi toggle, khôi phục khi reload' },
      { type: 'improved', text: '📋 Update Log: hiện phần thưởng ngay khi vào tab, không cần cuộn' },
      { type: 'fixed', text: '🔒 Xóa tính năng Xuất/Nhập Save JSON để bảo mật — ngăn chỉnh sửa dữ liệu' },
      { type: 'fixed', text: '💰 Giảm số tiền hiển thị trong Winner Feed về mức thực tế hơn' },
    ]
  },
  {
    version: 'v3.2.0', date: '2025-05-14', tag: 'UPDATE', tagColor: '#60a5fa',
    title: 'Enhanced Edition',
    changes: [
      { type: 'new', text: '🎰 Sổ Xố: Thêm Live Banner với nhiều người chơi & tỷ lệ jackpot thực tế hơn' },
      { type: 'new', text: '🛒 Shop: Quảng cáo Flash Sale, Live Social Proof, Premium Banner với animation' },
      { type: 'new', text: '⚙️ Settings: Tùy chỉnh đồ họa nâng cao — ánh sáng, hiệu ứng, chất lượng' },
      { type: 'new', text: '💾 LocalSave: Tự động lưu game vào LocalStorage mỗi 30 giây' },
      { type: 'new', text: '📋 Update Log: Tab lịch sử cập nhật này' },
      { type: 'improved', text: '✨ Live feed Jackpot thêm 60+ tên người chơi, tỷ lệ thua > thắng thực tế hơn' },
      { type: 'improved', text: '🎨 Tab Sổ Xố animation hoàn toàn mới: pool counter, player counter, activity feed' },
    ]
  },
  {
    version: 'v3.1.0', date: '2025-04-20', tag: 'MAJOR', tagColor: '#60a5fa',
    title: 'Sound & Jackpot Explosion',
    changes: [
      { type: 'new', text: '🎵 Sound System: Tải nhạc MP3 riêng cho Tab và Jackpot' },
      { type: 'new', text: '🎆 Jackpot Explosion Overlay: Confetti + animation khi trúng jackpot' },
      { type: 'new', text: '🌟 Floating background particles (ambient)' },
      { type: 'improved', text: '🏦 Bank: Staggered card entrance animation' },
      { type: 'improved', text: '🛒 Shop: Glow effect trên các item có thể mua' },
    ]
  },
  {
    version: 'v3.0.0', date: '2025-03-15', tag: 'MAJOR', tagColor: '#a78bfa',
    title: 'Premium UI Overhaul',
    changes: [
      { type: 'new', text: '🎨 Toàn bộ UI được thiết kế lại với phong cách neon dark premium' },
      { type: 'new', text: '⚙️ Tab-specific active colors cho mỗi tab' },
      { type: 'new', text: '🌊 Scanline overlay effect' },
      { type: 'new', text: '✨ Shimmer gradient animations trên titlebar, money bar' },
      { type: 'improved', text: '📊 Stats panel cải thiện' },
      { type: 'improved', text: '💬 Tutorial overlay 7 bước mới' },
    ]
  },
  {
    version: 'v2.5.0', date: '2025-02-10', tag: 'UPDATE', tagColor: '#fbbf24',
    title: 'Lottery & Market Ads',
    changes: [
      { type: 'new', text: '🎰 Sổ Xố JACKPOT365 + MEGA365 mode' },
      { type: 'new', text: '📢 Quảng cáo Loan và Lottery trong Shop' },
      { type: 'new', text: '🏪 Market Ads zone (Recycle, VIP)' },
      { type: 'new', text: '🔴 Live Winners Feed trong lottery ad banner' },
      { type: 'fixed', text: '🐛 Fix: Loan penalty calculation' },
    ]
  },
  {
    version: 'v2.0.0', date: '2025-01-05', tag: 'MAJOR', tagColor: '#fb923c',
    title: 'Computer & Boss System',
    changes: [
      { type: 'new', text: '💻 Computer Terminal với vendors và boss conversations' },
      { type: 'new', text: '📡 Internet packages (Free/Basic/Balance/Speed)' },
      { type: 'new', text: '🤝 Boss buying system' },
      { type: 'new', text: '🔄 OS Updates v3/v4/v5 qua terminal' },
      { type: 'improved', text: '⚡ Electricity system cải thiện' },
    ]
  },
  {
    version: 'v1.5.0', date: '2024-12-01', tag: 'UPDATE', tagColor: '#34d399',
    title: 'Economy Expansion',
    changes: [
      { type: 'new', text: '🏦 Loan system với penalty khi trả trễ' },
      { type: 'new', text: '♻️ Recycle Shop — đổi vật phẩm lấy điểm' },
      { type: 'new', text: '🧾 Tax system' },
      { type: 'new', text: '🎒 Inventory với 50+ slot' },
      { type: 'improved', text: '💎 6 loại currency mới' },
    ]
  },
  {
    version: 'v1.0.0', date: '2024-10-15', tag: 'RELEASE', tagColor: '#f87171',
    title: 'Initial Release',
    changes: [
      { type: 'new', text: '🏭 Factory Game ra mắt với 10 Tiers máy móc' },
      { type: 'new', text: '🛒 Shop với 60 loại máy' },
      { type: 'new', text: '🏦 Bank & currency exchange' },
      { type: 'new', text: '🏪 Market system' },
      { type: 'new', text: '⚡ Electricity system' },
    ]
  }
];

function injectUpdateLogPanel() {
  const panel = document.getElementById('panel-updatelog');
  if(!panel) return;
  if(panel.dataset.injected) return; // already injected
  panel.dataset.injected = '1';

  panel.innerHTML = `
    <div class="ulog-header">
      <div class="ulog-header-icon">📋</div>
      <div class="ulog-header-title">UPDATE LOG</div>
      <div class="ulog-header-sub">Lịch sử cập nhật Factory Game</div>
    </div>
    <div class="ulog-list">
      ${UPDATE_LOG.map((log, idx) => `
        <div class="ulog-entry ${idx===0?'ulog-entry--latest':''}">
          <div class="ulog-entry-header">
            <div class="ulog-version-row">
              <span class="ulog-version">${log.version}</span>
              <span class="ulog-tag" style="background:${log.tagColor}22;color:${log.tagColor};border:1px solid ${log.tagColor}55">${log.tag}</span>
              <span class="ulog-date">${log.date}</span>
            </div>
            <div class="ulog-title">${log.title}</div>
          </div>
          <div class="ulog-changes">
            ${log.changes.map(c => `
              <div class="ulog-change ulog-change--${c.type}">
                <span class="ulog-change-dot"></span>
                <span class="ulog-change-text">${c.text}</span>
              </div>`).join('')}
          </div>
        </div>`).join('')}
    </div>
    <div id="ulog-reward-box" style="margin-top:14px;text-align:center;padding:18px;background:linear-gradient(145deg,#0d1a0d,#132313);border:1px solid rgba(74,222,128,0.25);border-radius:14px;display:none">
      <div style="font-size:28px;margin-bottom:6px">🎁</div>
      <div style="font-size:15px;font-weight:800;color:#4ade80;margin-bottom:4px">Phần thưởng đọc hết log!</div>
      <div style="font-size:12px;color:#6b7280;margin-bottom:12px">Cảm ơn bạn đã theo dõi lịch sử cập nhật ❤️</div>
      <button onclick="claimUpdateLogReward()" style="padding:10px 28px;background:linear-gradient(135deg,#166534,#16a34a);color:#fff;border:none;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer;box-shadow:0 4px 16px rgba(22,163,74,0.3)">💵 Nhận $5</button>
    </div>
    <div id="ulog-claimed-box" style="margin-top:14px;text-align:center;padding:14px;background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.05);border-radius:14px;display:none">
      <div style="font-size:13px;color:#4b5563">✅ Bạn đã nhận thưởng rồi!</div>
    </div>
  `;

  // MutationObserver để phát hiện khi panel active
  const panelObserver = new MutationObserver(() => {
    if(panel.classList.contains('active')) {
      setTimeout(_showUpdateLogReward, 600);
    }
  });
  panelObserver.observe(panel, { attributes: true, attributeFilter: ['class'] });

  // Scroll listener fallback
  const content = document.querySelector('.content');
  if(content) {
    content.addEventListener('scroll', function() {
      if(!panel.classList.contains('active')) return;
      if(content.scrollHeight - content.scrollTop - content.clientHeight < 120) _showUpdateLogReward();
    });
  }
}

function _showUpdateLogReward() {
  const r = document.getElementById('ulog-reward-box'), c = document.getElementById('ulog-claimed-box');
  if(!r||!c) return;
  if(localStorage.getItem('ulog_reward_v3.3.0')==='1') { r.style.display='none'; c.style.display='block'; }
  else { r.style.display='block'; c.style.display='none'; }
}

function claimUpdateLogReward() {
  if(localStorage.getItem('ulog_reward_v3.3.0')==='1') return;
  // Ensure G exists and has money property
  if(window.G) {
    if(typeof G.money !== 'number') G.money = 0;
    if(typeof G.totalEarned !== 'number') G.totalEarned = 0;
    G.money += 5;
    G.totalEarned += 5;
    if(typeof updateUI === 'function') updateUI();
    if(typeof renderAll === 'function') renderAll();
    if(typeof saveGame === 'function') saveGame(false);
  }
  localStorage.setItem('ulog_reward_v3.3.0','1');
  const r=document.getElementById('ulog-reward-box'), c=document.getElementById('ulog-claimed-box');
  if(r) r.style.display='none';
  if(c) { c.innerHTML='<div style="font-size:13px;color:#4ade80">✅ Đã nhận $5! Cảm ơn bạn đã đọc!</div>'; c.style.display='block'; }
  if(typeof showNotif==='function') showNotif('🎁 Nhận thưởng đọc Update Log: +$5!');
}

// ═══════════════════════════════════════════════════════════════════
//  INJECT ALL CSS
// ═══════════════════════════════════════════════════════════════════
(function injectAllCSS() {
  const style = document.createElement('style');
  style.textContent = `
/* ═══ LOTTERY LIVE BANNER ═══ */
.lott-mega-live-banner {
  position: relative; overflow: hidden;
  background: linear-gradient(135deg, #0d0520 0%, #1a0a2e 40%, #0d0520 100%);
  border: 1px solid rgba(124,58,237,0.4);
  border-radius: 16px; padding: 16px; margin-bottom: 14px;
  animation: lottMegaBannerPulse 2.5s ease-in-out infinite;
}
@keyframes lottMegaBannerPulse { 0%,100%{box-shadow:0 0 0 1px rgba(124,58,237,0.3),0 0 30px rgba(124,58,237,0.1)} 50%{box-shadow:0 0 0 1px rgba(232,121,249,0.5),0 0 50px rgba(232,121,249,0.2)} }
.lott-mega-stars { position:absolute; inset:0; pointer-events:none; overflow:hidden; }
.lott-mega-stars span { position:absolute; border-radius:50%; background:#a78bfa; animation:lottMegaStarTwinkle var(--d,2s) var(--delay,0s) ease-in-out infinite; opacity:0; }
@keyframes lottMegaStarTwinkle { 0%,100%{opacity:0;transform:scale(0.5)} 50%{opacity:0.8;transform:scale(1.3)} }
.lott-mega-glow-ring {
  position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
  width:200px; height:200px; border-radius:50%;
  background: radial-gradient(ellipse at center, rgba(124,58,237,0.08) 0%, transparent 70%);
  pointer-events:none;
  animation: lottGlowRingPulse 3s ease-in-out infinite;
}
@keyframes lottGlowRingPulse { 0%,100%{transform:translate(-50%,-50%) scale(1);opacity:0.5} 50%{transform:translate(-50%,-50%) scale(1.3);opacity:1} }
.lott-mega-top-row { display:flex; align-items:center; gap:10px; margin-bottom:8px; flex-wrap:wrap; }
.lott-live-badge { display:inline-flex; align-items:center; gap:5px; background:rgba(74,222,128,0.1); border:1px solid rgba(74,222,128,0.3); border-radius:6px; padding:3px 10px; font-size:10px; font-weight:700; color:#4ade80; letter-spacing:1px; }
.lott-live-dot-ring { width:7px; height:7px; border-radius:50%; background:#4ade80; animation:liveDotBlink 1s infinite; display:inline-block; }
.lott-pool-label { font-size:10px; color:#7c3aed; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; margin-left:auto; }
.lott-pool-val { font-size:14px; font-weight:800; color:#fde68a; text-shadow:0 0 12px rgba(253,230,138,0.5); animation:lottPoolGlow 2s ease-in-out infinite; }
@keyframes lottPoolGlow { 0%,100%{text-shadow:0 0 6px rgba(253,230,138,0.3)} 50%{text-shadow:0 0 20px rgba(253,230,138,0.8),0 0 40px rgba(251,191,36,0.4)} }
.lott-mega-title {
  font-size:26px; font-weight:900; text-align:center; margin-bottom:4px;
  background:linear-gradient(135deg,#e879f9,#c4b5fd,#fde68a,#e879f9);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
  background-size:300% 100%; animation:titleGradient 2s linear infinite;
  filter:drop-shadow(0 0 12px rgba(232,121,249,0.6));
}
.lott-mega-sub { font-size:12px; color:#a78bfa; text-align:center; margin-bottom:10px; }
.lott-players-row { display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; font-size:11px; flex-wrap:wrap; gap:6px; }
.lott-players-counter { display:flex; align-items:center; gap:5px; color:#4ade80; font-weight:700; }
.lott-players-dot { width:6px; height:6px; border-radius:50%; background:#4ade80; animation:liveDotBlink 0.8s ease-in-out infinite; display:inline-block; }
.lott-last-jackpot { font-size:11px; color:#7c3aed; }
.lott-activity-feed { background:rgba(0,0,0,0.4); border:1px solid rgba(124,58,237,0.15); border-radius:10px; padding:8px 10px; margin-bottom:10px; max-height:100px; overflow:hidden; }
.lott-feed-row { display:flex; align-items:center; gap:7px; padding:3px 0; font-size:11px; border-bottom:1px solid rgba(124,58,237,0.08); transition:all 0.3s; }
.lott-feed-row:last-child { border-bottom:none; }
.lott-feed-row--enter { animation:lottFeedSlideIn 0.4s ease-out; }
@keyframes lottFeedSlideIn { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
.lott-feed-avi { font-size:14px; flex-shrink:0; }
.lott-feed-name { color:#c4b5fd; font-weight:600; min-width:60px; }
.lott-feed-action { flex:1; color:#9ca3af; font-size:10px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.lott-feed-badge { flex-shrink:0; font-size:9px; font-weight:700; padding:2px 6px; border-radius:4px; letter-spacing:0.5px; }
.lott-feed-badge--loss { background:rgba(248,113,113,0.15); color:#f87171; border:1px solid rgba(248,113,113,0.2); }
.lott-feed-badge--bet { background:rgba(96,165,250,0.12); color:#60a5fa; border:1px solid rgba(96,165,250,0.2); }
.lott-feed-badge--smallwin { background:rgba(74,222,128,0.12); color:#4ade80; border:1px solid rgba(74,222,128,0.2); }
.lott-feed-badge--midwin { background:rgba(251,191,36,0.12); color:#fbbf24; border:1px solid rgba(251,191,36,0.2); }
.lott-feed-badge--jackpot { background:rgba(232,121,249,0.2); color:#e879f9; border:1px solid rgba(232,121,249,0.4); animation:jackBadgePulse 1s infinite; }
@keyframes jackBadgePulse { 0%,100%{box-shadow:0 0 0 0 rgba(232,121,249,0.3)} 50%{box-shadow:0 0 0 4px rgba(232,121,249,0)} }
.lott-tag-chip { padding:5px 10px; border-radius:8px; font-size:11px; font-weight:600; }
.lott-tag-chip--purple { background:rgba(124,58,237,0.1);border:1px solid rgba(124,58,237,0.3);color:#c4b5fd; }
.lott-tag-chip--pink { background:rgba(232,121,249,0.1);border:1px solid rgba(232,121,249,0.3);color:#f0abfc; }
.lott-tag-chip--gold { background:rgba(251,191,36,0.08);border:1px solid rgba(251,191,36,0.2);color:#fde68a; }
.lott-tag-chip--red { background:rgba(248,113,113,0.08);border:1px solid rgba(248,113,113,0.2);color:#fca5a5; }

/* ═══ SHOP ENHANCED ADS ═══ */
#enhanced-shop-ads { margin-bottom:14px; }
.eshop-flash-ad {
  position:relative; overflow:hidden;
  background:linear-gradient(135deg,#1a0a08 0%,#2a1205 40%,#1a0a08 100%);
  border:1px solid rgba(251,146,60,0.35); border-radius:14px;
  padding:14px; margin-bottom:10px;
  animation:eshopFlashGlow 2s ease-in-out infinite;
}
@keyframes eshopFlashGlow { 0%,100%{box-shadow:0 0 20px rgba(251,146,60,0.1)} 50%{box-shadow:0 0 40px rgba(251,146,60,0.25),inset 0 0 30px rgba(251,146,60,0.03)} }
.eshop-flash-bg {
  position:absolute; top:-50%; left:-50%; width:200%; height:200%;
  background:radial-gradient(ellipse at 60% 40%,rgba(251,146,60,0.06) 0%,transparent 60%);
  pointer-events:none; animation:eshopFlashBgRot 8s linear infinite;
}
@keyframes eshopFlashBgRot { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
.eshop-flash-ticker {
  font-size:10px; color:#fb923c; font-weight:700; letter-spacing:1.5px;
  text-transform:uppercase; margin-bottom:8px; transition:opacity 0.3s;
  background:rgba(251,146,60,0.08); border:1px solid rgba(251,146,60,0.15);
  border-radius:5px; padding:3px 10px; display:inline-block;
  animation:eshopTickerPulse 2s ease-in-out infinite;
}
@keyframes eshopTickerPulse { 0%,100%{opacity:1} 50%{opacity:0.7} }
.eshop-flash-badge { display:inline-block; background:linear-gradient(90deg,#ea580c,#fb923c); color:#fff; font-size:10px; font-weight:800; padding:2px 10px; border-radius:4px; letter-spacing:1.5px; margin-bottom:7px; text-transform:uppercase; }
.eshop-flash-title { font-size:17px; font-weight:700; color:#fed7aa; margin-bottom:5px; }
.eshop-flash-pct { color:#fbbf24; font-size:22px; text-shadow:0 0 12px rgba(251,191,36,0.6); animation:eshopPctPulse 1.5s ease-in-out infinite; }
@keyframes eshopPctPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.1)} }
.eshop-flash-sub { font-size:12px; color:#92400e; margin-bottom:9px; line-height:1.5; }
.eshop-flash-timer-row { display:flex; align-items:center; gap:8px; margin-bottom:9px; font-size:12px; color:#9ca3af; }
.eshop-flash-timer { color:#fde68a; font-weight:800; font-family:monospace; font-size:15px; letter-spacing:2px; text-shadow:0 0 8px rgba(253,230,138,0.5); }
.eshop-flash-machines { display:flex; flex-direction:column; gap:5px; margin-bottom:10px; }
.eshop-flash-machine { display:flex; align-items:center; gap:7px; background:rgba(0,0,0,0.3); border:1px solid rgba(251,146,60,0.1); border-radius:7px; padding:5px 8px; font-size:11px; }
.eshop-fm-icon { font-size:14px; flex-shrink:0; }
.eshop-fm-name { flex:1; color:#e2e8f0; font-weight:600; }
.eshop-fm-tier { color:#fb923c; font-size:10px; background:rgba(251,146,60,0.1); border-radius:4px; padding:1px 5px; }
.eshop-fm-orig { color:#6b7280; text-decoration:line-through; font-size:10px; }
.eshop-fm-sale { color:#4ade80; font-weight:700; }
.eshop-flash-btn {
  display:inline-flex; align-items:center; gap:6px;
  background:linear-gradient(135deg,#c2410c,#ea580c); color:#fff;
  font-size:13px; font-weight:800; padding:9px 20px; border-radius:8px;
  border:none; cursor:pointer; transition:all 0.15s; letter-spacing:0.5px;
  box-shadow:0 4px 16px rgba(234,88,12,0.4);
  animation:eshopBtnPulse 2s ease-in-out infinite;
}
@keyframes eshopBtnPulse { 0%,100%{box-shadow:0 4px 16px rgba(234,88,12,0.3)} 50%{box-shadow:0 6px 28px rgba(234,88,12,0.6)} }
.eshop-flash-btn:hover { background:linear-gradient(135deg,#ea580c,#fb923c); transform:translateY(-1px); animation:none; }
.eshop-flash-deco { position:absolute; right:14px; bottom:12px; font-size:40px; opacity:0.08; animation:eshopDecoSpin 10s linear infinite; }
@keyframes eshopDecoSpin { from{transform:rotate(0deg) scale(1)} 50%{transform:rotate(180deg) scale(1.2)} to{transform:rotate(360deg) scale(1)} }

.eshop-social-ad { background:linear-gradient(135deg,#0a1020,#111827); border:1px solid rgba(59,130,246,0.15); border-radius:12px; padding:12px 14px; margin-bottom:10px; }
.eshop-social-row { display:flex; align-items:center; justify-content:space-around; margin-bottom:8px; }
.eshop-social-stat { text-align:center; }
.eshop-social-stat-val { font-size:18px; font-weight:800; color:#60a5fa; animation:eshopStatPop 3s ease-in-out infinite; }
@keyframes eshopStatPop { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05);color:#93c5fd} }
.eshop-social-stat-label { font-size:10px; color:#4b5563; margin-top:2px; }
.eshop-social-divider { width:1px; height:30px; background:rgba(255,255,255,0.06); }
.eshop-social-live-row { display:flex; align-items:center; gap:6px; font-size:11px; color:#9ca3af; transition:opacity 0.3s; }
.eshop-live-dot { width:6px; height:6px; border-radius:50%; background:#4ade80; animation:liveDotBlink 1s infinite; flex-shrink:0; display:inline-block; }

.eshop-premium-ad {
  position:relative; overflow:hidden; cursor:pointer;
  background:linear-gradient(135deg,#1a0a2e 0%,#2d1a4a 50%,#1a0a2e 100%);
  border:1px solid rgba(124,58,237,0.3); border-radius:12px;
  padding:12px 16px; display:flex; align-items:center; justify-content:space-between;
  transition:all 0.2s; animation:eshopPremGlow 3s ease-in-out infinite;
}
@keyframes eshopPremGlow { 0%,100%{box-shadow:0 0 16px rgba(124,58,237,0.1)} 50%{box-shadow:0 0 32px rgba(196,181,253,0.2)} }
.eshop-premium-ad:hover { border-color:rgba(196,181,253,0.5); transform:translateY(-1px); animation:none; }
.eshop-premium-glow { position:absolute; top:0; left:-100%; width:50%; height:100%; background:linear-gradient(90deg,transparent,rgba(196,181,253,0.04),transparent); animation:eshopPremShimmer 3s linear infinite; }
@keyframes eshopPremShimmer { to{left:200%} }
.eshop-premium-left { display:flex; align-items:center; gap:10px; }
.eshop-premium-crown { font-size:26px; animation:microFloat 2s ease-in-out infinite; }
.eshop-premium-title { font-size:14px; font-weight:700; color:#c4b5fd; }
.eshop-premium-sub { font-size:11px; color:#7c3aed; margin-top:2px; }
.eshop-premium-badge { font-size:12px; font-weight:700; color:#e9d5ff; background:linear-gradient(90deg,#5b21b6,#7c3aed); padding:6px 14px; border-radius:8px; flex-shrink:0; transition:all 0.2s; }
.eshop-premium-ad:hover .eshop-premium-badge { background:linear-gradient(90deg,#7c3aed,#8b5cf6); box-shadow:0 0 16px rgba(124,58,237,0.4); }

/* ═══ SETTINGS PANEL ═══ */
.settings-header { text-align:center; padding:18px 0 14px; }
.settings-header-icon { font-size:36px; margin-bottom:6px; animation:microFloat 3s ease-in-out infinite; }
.settings-header-title { font-size:20px; font-weight:800; background:linear-gradient(135deg,#93c5fd,#60a5fa,#a78bfa); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; letter-spacing:1px; }
.settings-header-sub { font-size:12px; color:#4b5563; margin-top:4px; }
.settings-section { background:linear-gradient(145deg,#0d1626,#111f3a); border:1px solid rgba(59,130,246,0.12); border-radius:14px; padding:16px; margin-bottom:14px; position:relative; overflow:hidden; }
.settings-section::before { content:''; position:absolute; top:0; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,rgba(96,165,250,0.2),transparent); }
.settings-section-title { font-size:12px; color:#64748b; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; margin-bottom:14px; display:flex; align-items:center; gap:7px; }
.settings-section-title span { font-size:15px; }
.settings-row { display:flex; align-items:center; justify-content:space-between; padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.04); gap:12px; }
.settings-row:last-child { border-bottom:none; padding-bottom:0; }
.settings-row--block { flex-direction:column; align-items:flex-start; }
.settings-row-info { flex:1; }
.settings-row-name { font-size:13px; color:#e2e8f0; font-weight:600; margin-bottom:2px; }
.settings-row-desc { font-size:11px; color:#4b5563; line-height:1.4; }
/* Toggle switch */
.settings-toggle { position:relative; display:inline-block; width:42px; height:23px; flex-shrink:0; }
.settings-toggle input { opacity:0; width:0; height:0; position:absolute; }
.settings-toggle-track { position:absolute; inset:0; border-radius:23px; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.1); transition:all 0.3s; cursor:pointer; }
.settings-toggle input:checked + .settings-toggle-track { background:linear-gradient(90deg,#1d4ed8,#2563eb); border-color:rgba(59,130,246,0.5); box-shadow:0 0 8px rgba(59,130,246,0.3); }
.settings-toggle-thumb { position:absolute; top:2px; left:2px; width:17px; height:17px; border-radius:50%; background:#fff; transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1); box-shadow:0 1px 4px rgba(0,0,0,0.3); }
.settings-toggle input:checked ~ .settings-toggle-track .settings-toggle-thumb { transform:translateX(19px); }
/* Quality slider */
.settings-quality-slider { display:flex; align-items:center; gap:10px; width:100%; margin-top:8px; }
.settings-ql-label { font-size:11px; color:#4b5563; white-space:nowrap; }
.settings-slider { flex:1; accent-color:#3b82f6; cursor:pointer; height:4px; }
.settings-ql-val { font-size:12px; color:#60a5fa; font-weight:700; min-width:70px; text-align:right; }
/* Action buttons */
.settings-action-btn { padding:10px; border-radius:9px; cursor:pointer; font-size:13px; font-weight:700; border:none; transition:all 0.2s; letter-spacing:0.3px; }
.settings-action-btn--blue { background:linear-gradient(135deg,#1d4ed8,#2563eb); color:#fff; box-shadow:0 4px 16px rgba(29,78,216,0.3); }
.settings-action-btn--blue:hover { background:linear-gradient(135deg,#2563eb,#3b82f6); box-shadow:0 6px 24px rgba(59,130,246,0.4); transform:translateY(-1px); }
.settings-action-btn--purple { background:linear-gradient(135deg,#5b21b6,#7c3aed); color:#fff; box-shadow:0 4px 16px rgba(124,58,237,0.3); }
.settings-action-btn--purple:hover { background:linear-gradient(135deg,#7c3aed,#8b5cf6); transform:translateY(-1px); }
.settings-action-btn--green { background:linear-gradient(135deg,#166534,#16a34a); color:#fff; box-shadow:0 4px 16px rgba(22,163,74,0.3); }
.settings-action-btn--green:hover { background:linear-gradient(135deg,#16a34a,#22c55e); transform:translateY(-1px); }
.settings-action-btn--red { background:linear-gradient(135deg,#7f1d1d,#991b1b); color:#fca5a5; box-shadow:0 4px 16px rgba(153,27,27,0.3); }
.settings-action-btn--red:hover { background:linear-gradient(135deg,#991b1b,#b91c1c); transform:translateY(-1px); }
.settings-save-info { margin-top:10px; font-size:11px; color:#4b5563; padding:7px 12px; background:rgba(0,0,0,0.2); border-radius:7px; border:1px solid rgba(255,255,255,0.04); }
.settings-about-box { display:flex; flex-direction:column; gap:0; }
.settings-about-row { display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid rgba(255,255,255,0.04); font-size:13px; color:#94a3b8; }
.settings-about-row:last-child { border-bottom:none; }
#tab-settings.active { color:#a78bfa !important; text-shadow:0 0 12px rgba(167,139,250,0.5); }
#tab-settings.active::after { background:linear-gradient(90deg,#7c3aed,#a78bfa,#ddd6fe); }

/* ═══ UPDATE LOG ═══ */
#tab-updatelog.active { color:#fbbf24 !important; text-shadow:0 0 12px rgba(251,191,36,0.5); }
#tab-updatelog.active::after { background:linear-gradient(90deg,#d97706,#fbbf24,#fde68a); }
#tab-rank.active { color:#fde047 !important; text-shadow:0 0 12px rgba(253,224,71,0.6); }
#tab-rank.active::after { background:linear-gradient(90deg,#ca8a04,#fde047,#fef08a); }
.ulog-header { text-align:center; padding:18px 0 14px; }
.ulog-header-icon { font-size:32px; margin-bottom:6px; animation:microFloat 3s ease-in-out infinite; }
.ulog-header-title { font-size:20px; font-weight:800; background:linear-gradient(135deg,#fde68a,#fbbf24,#f59e0b); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
.ulog-header-sub { font-size:12px; color:#4b5563; margin-top:4px; }
.ulog-list { display:flex; flex-direction:column; gap:12px; }
.ulog-entry { background:linear-gradient(145deg,#0d1626,#111f3a); border:1px solid rgba(59,130,246,0.12); border-radius:14px; padding:16px; position:relative; overflow:hidden; animation:cardEntrance 0.4s ease backwards; }
.ulog-entry::before { content:''; position:absolute; top:0; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,rgba(96,165,250,0.2),transparent); }
.ulog-entry--latest { border-color:rgba(74,222,128,0.25); }
.ulog-entry--latest::before { background:linear-gradient(90deg,transparent,rgba(74,222,128,0.4),transparent); }
.ulog-version-row { display:flex; align-items:center; gap:8px; margin-bottom:4px; flex-wrap:wrap; }
.ulog-version { font-size:16px; font-weight:800; color:#e2e8f0; }
.ulog-tag { font-size:10px; font-weight:700; letter-spacing:1px; padding:2px 8px; border-radius:5px; text-transform:uppercase; }
.ulog-date { font-size:11px; color:#4b5563; margin-left:auto; }
.ulog-title { font-size:13px; color:#94a3b8; font-style:italic; margin-bottom:10px; }
.ulog-changes { display:flex; flex-direction:column; gap:5px; }
.ulog-change { display:flex; align-items:flex-start; gap:8px; font-size:12px; color:#94a3b8; padding:3px 0; }
.ulog-change-dot { width:6px; height:6px; border-radius:50%; margin-top:4px; flex-shrink:0; }
.ulog-change--new .ulog-change-dot { background:#4ade80; box-shadow:0 0 5px rgba(74,222,128,0.5); }
.ulog-change--improved .ulog-change-dot { background:#60a5fa; box-shadow:0 0 5px rgba(96,165,250,0.5); }
.ulog-change--fixed .ulog-change-dot { background:#fbbf24; box-shadow:0 0 5px rgba(251,191,36,0.5); }
.ulog-change-text { flex:1; line-height:1.5; }
  `;
  document.head.appendChild(style);
})();

// ═══════════════════════════════════════════════════════════════════
//  INIT ALL FEATURES
// ═══════════════════════════════════════════════════════════════════
(function initAllEnhancements() {
  loadSettings();
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',injectUpdateLogPanel);
  else setTimeout(injectUpdateLogPanel,0);
  startLocalSaveLoop();
  // init lottery live banner if on lottery tab
  setTimeout(() => {
    const lottPanel = document.getElementById('panel-lottery');
    if(lottPanel && lottPanel.classList.contains('active')) initLotteryLiveBanner();
    // Start lottery winners feed
    startLotteryWinnersFeed();
    // Inject shop ads
    const shopPanel = document.getElementById('panel-shop');
    if(shopPanel && shopPanel.classList.contains('active')) injectEnhancedShopAds();
  }, 500);
})();
// ═══════════════════════════════════════════════════════════════════
//  RANK SYSTEM v2 — 20 người mỗi rank, tiền tăng liên tục
// ═══════════════════════════════════════════════════════════════════
(function injectRankCSS() {
  const s = document.createElement('style');
  s.textContent = `
#tab-rank.active { color:#fde047 !important; text-shadow:0 0 12px rgba(253,224,71,0.6); }
#tab-rank.active::after { background:linear-gradient(90deg,#ca8a04,#fde047,#fef08a); }
.rank-header { text-align:center; padding:16px 0 14px; }
.rank-header-icon { font-size:36px; margin-bottom:6px; animation:microFloat 3s ease-in-out infinite; }
.rank-header-title { font-size:20px; font-weight:800; background:linear-gradient(135deg,#fde68a,#fbbf24,#f59e0b); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; letter-spacing:1px; }
.rank-header-sub { font-size:12px; color:#4b5563; margin-top:4px; }
.rank-my-card {
  background:linear-gradient(145deg,#111f3a,#0d1626);
  border:1px solid rgba(253,224,71,0.3); border-radius:14px; padding:16px; margin-bottom:16px;
  position:relative; overflow:hidden;
  box-shadow:0 0 20px rgba(253,224,71,0.08);
}
.rank-my-card::before { content:''; position:absolute; top:0; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,rgba(253,224,71,0.4),transparent); }
.rank-my-title { font-size:11px; color:#64748b; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; margin-bottom:10px; }
.rank-my-row { display:flex; align-items:center; gap:12px; }
.rank-badge-big { font-size:36px; flex-shrink:0; animation:microFloat 2s ease-in-out infinite; }
.rank-my-info { flex:1; }
.rank-my-name { font-size:16px; font-weight:800; color:#e2e8f0; }
.rank-my-tier { font-size:13px; font-weight:700; margin-top:2px; }
.rank-my-wealth { font-size:12px; color:#94a3b8; margin-top:4px; }
.rank-my-pos { font-size:22px; font-weight:900; color:#fde047; text-align:right; text-shadow:0 0 12px rgba(253,224,71,0.5); }
.rank-progress-bar { height:6px; background:rgba(255,255,255,0.06); border-radius:4px; overflow:hidden; margin-top:10px; }
.rank-progress-fill { height:100%; border-radius:4px; transition:width 1s ease; box-shadow:0 0 8px currentColor; animation:progressGlow 2s ease-in-out infinite; }
.rank-progress-label { display:flex; justify-content:space-between; font-size:10px; color:#4b5563; margin-top:4px; }
.rank-leaderboard { background:linear-gradient(145deg,#0d1626,#111f3a); border:1px solid rgba(59,130,246,0.12); border-radius:14px; overflow:hidden; margin-bottom:14px; }
.rank-lb-header { padding:12px 16px; background:rgba(0,0,0,0.2); border-bottom:1px solid rgba(255,255,255,0.04); display:flex; align-items:center; gap:8px; font-size:12px; font-weight:700; color:#64748b; letter-spacing:1px; text-transform:uppercase; }
.rank-row {
  display:flex; align-items:center; gap:10px; padding:11px 16px;
  border-bottom:1px solid rgba(255,255,255,0.03); transition:background 0.2s; cursor:pointer;
}
.rank-row:last-child { border-bottom:none; }
.rank-row:hover { background:rgba(255,255,255,0.025); }
.rank-row.rank-row--me { background:rgba(253,224,71,0.05); border-left:2px solid rgba(253,224,71,0.4); }
.rank-row.rank-row--top3 { background:rgba(251,191,36,0.04); }
.rank-pos-num { font-size:14px; font-weight:800; min-width:28px; text-align:center; }
.rank-pos-1 { color:#fde68a; text-shadow:0 0 10px rgba(253,230,138,0.6); }
.rank-pos-2 { color:#94a3b8; }
.rank-pos-3 { color:#fb923c; }
.rank-pos-other { color:#374151; }
.rank-avatar { font-size:20px; flex-shrink:0; }
.rank-player-info { flex:1; min-width:0; }
.rank-player-name { font-size:13px; font-weight:600; color:#e2e8f0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.rank-player-sub { font-size:10px; color:#4b5563; margin-top:1px; }
.rank-player-badge { font-size:14px; flex-shrink:0; }
.rank-player-tier { font-size:10px; font-weight:700; padding:2px 7px; border-radius:5px; flex-shrink:0; white-space:nowrap; }
.rank-player-wealth { font-size:12px; font-weight:700; flex-shrink:0; min-width:80px; text-align:right; }
.rank-up-badge { font-size:10px; color:#4ade80; flex-shrink:0; }
/* Profile modal */
.rank-profile-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.85); z-index:800; display:flex; align-items:center; justify-content:center; backdrop-filter:blur(4px); animation:fadeInUp 0.2s ease; }
.rank-profile-box { width:320px; max-width:95vw; max-height:90vh; overflow-y:auto; background:linear-gradient(145deg,#0d1626,#111f3a); border:1px solid rgba(59,130,246,0.2); border-radius:18px; padding:24px; position:relative; animation:cardEntrance 0.3s ease; }
.rank-profile-close { position:absolute; top:12px; right:12px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08); color:#9ca3af; border-radius:8px; padding:4px 10px; cursor:pointer; font-size:12px; transition:all 0.2s; }
.rank-profile-close:hover { background:rgba(255,255,255,0.1); color:#e2e8f0; }
.rank-profile-avatar { font-size:52px; text-align:center; margin-bottom:8px; animation:microFloat 2s ease-in-out infinite; }
.rank-profile-name { text-align:center; font-size:18px; font-weight:800; color:#e2e8f0; }
.rank-profile-rank-name { text-align:center; font-size:14px; font-weight:700; margin-top:4px; margin-bottom:14px; }
.rank-profile-stats { display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:14px; }
.rank-profile-stat { background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.05); border-radius:10px; padding:10px; text-align:center; }
.rank-profile-stat-val { font-size:16px; font-weight:800; }
.rank-profile-stat-label { font-size:10px; color:#4b5563; margin-top:2px; }
.rank-profile-history { background:rgba(0,0,0,0.2); border:1px solid rgba(255,255,255,0.04); border-radius:10px; padding:12px; }
.rank-profile-history-title { font-size:11px; color:#64748b; font-weight:700; letter-spacing:1px; text-transform:uppercase; margin-bottom:8px; }
.rank-profile-history-row { display:flex; justify-content:space-between; font-size:11px; color:#9ca3af; padding:4px 0; border-bottom:1px solid rgba(255,255,255,0.03); }
.rank-profile-history-row:last-child { border-bottom:none; }
  `;
  document.head.appendChild(s);
})();

// ═══════════════════════════════════════════════════════════════════
//  RANK TIERS — Leaderboard prestige brackets
// ═══════════════════════════════════════════════════════════════════
// Players are placed in a rank tier based on their total wealth (G.money).
// Each tier contains 20 NPCs generated with seeded-random wealth values.
// NPCs' wealth grows every 3 seconds (simulated income tick).
// The player appears in the tier that matches their current wealth.
//
// Fields per tier:
//   id, name, icon, color    — display
//   minWealth / maxWealth    — wealth bracket (dollars)
//   incomePerSec             — base NPC income per second
//   bg / border              — CSS theming colours
const RANK_TIERS = [
  { id:'dong',        name:'Đồng',        icon:'🟤', color:'#cd7f32', minWealth:0,          maxWealth:999,           incomePerSec:0.5,     bg:'rgba(205,127,50,0.12)',   border:'rgba(205,127,50,0.3)' },
  { id:'bac',         name:'Bạc',         icon:'⚪', color:'#c0c0c0', minWealth:1000,        maxWealth:49999,          incomePerSec:3,       bg:'rgba(192,192,192,0.12)',  border:'rgba(192,192,192,0.3)' },
  { id:'vang',        name:'Vàng',        icon:'🟡', color:'#ffd700', minWealth:50000,       maxWealth:1999999,        incomePerSec:25,      bg:'rgba(255,215,0,0.12)',    border:'rgba(255,215,0,0.3)' },
  { id:'bachkim',     name:'Bạch Kim',    icon:'🔷', color:'#93c5fd', minWealth:2000000,     maxWealth:49999999,       incomePerSec:180,     bg:'rgba(147,197,253,0.12)',  border:'rgba(147,197,253,0.3)' },
  { id:'kimcuong',    name:'Kim Cương',   icon:'💎', color:'#60a5fa', minWealth:50000000,    maxWealth:1999999999,     incomePerSec:1200,    bg:'rgba(96,165,250,0.12)',   border:'rgba(96,165,250,0.3)' },
  { id:'onyx',        name:'Onyx',        icon:'🖤', color:'#a78bfa', minWealth:2e9,         maxWealth:99e9,           incomePerSec:9000,    bg:'rgba(167,139,250,0.12)',  border:'rgba(167,139,250,0.3)' },
  { id:'nemesis',     name:'Nemesis',     icon:'🔴', color:'#f87171', minWealth:100e9,       maxWealth:4999e9,         incomePerSec:70000,   bg:'rgba(248,113,113,0.12)',  border:'rgba(248,113,113,0.3)' },
  { id:'archnemesis', name:'Archnemesis', icon:'👑', color:'#fde047', minWealth:5000e9,      maxWealth:Infinity,       incomePerSec:600000,  bg:'rgba(253,224,71,0.12)',   border:'rgba(253,224,71,0.3)' },
];

// getRankByWealth(w) — returns the highest RANK_TIER whose minWealth ≤ w.
// Used to determine the player's current rank badge and leaderboard placement.
function getRankByWealth(w) {
  let r = RANK_TIERS[0];
  for (const t of RANK_TIERS) { if (w >= t.minWealth) r = t; else break; }
  return r;
}

// ── NPC name/avatar pools ──────────────────────────────────────────
const _RN_POOL = [
  'NgocHa','MinhThu','VuHoang','LinhNhi','TuanAnh','PhuongLe','KhanhNam','MyLe','BaoTran','ThanhVu',
  'AnhKhoa','HoaiThu','DucMinh','NgaLe','TrungKien','HuyenBV','QuangBach','TienDat','NhuQuynh','HoangLong',
  'MaiAnh','SonTung','ThuHuong','CaoViet','LanAnh','PhucNguyen','HieuTran','NgaHuong','ChiNhan','VinhPhat',
  'KyLan','BichNgoc','HungThinh','MinhChau','TuanKiet','PhiLong','AnhThu','QuynhNhi','VietAnh','NamPhong',
  'ThuyDung','DaiNghia','HanhNguyen','TamNguyen','BachKim','HoaiBao','PhuLoc','ThanhTam','KimHoa','TranLinh',
  'XuanMai','HuuNghia','TrungHau','MinhTuyen','BinhThuan','LongVu','AnhDao','PhucThinh','NhiNguyen','BaoBao',
  'QuocBao','ThaoVy','MinhKhoa','LanNhi','VanAnh','TuanDuc','HoaPhuong','MinhDat','ThuyLe','CongVinh',
  'KimNgan','QuangHuy','ThanhHoa','DuyTan','NhatMinh','ThuTrang','HoangNam','BichLien','VanToan','MinhHang',
  'PhuocLoc','ThanhQuyen','DinhNam','QuynhAnh','TuanPhong','NhuHoa','VinhKhoa','ThaoNhi','MinhTriet','LanPhuong',
  'DucToan','ThuyVy','QuocHuy','HoangAnh','TranThu','MinhQuan','VanHoa','ThanhNhan','NgocLan','BaoNhi',
  'XuanHoa','DuyMinh','LanThu','QuangMinh','ThanhPhat','HoaiLam','VinhNam','NhuTrang','KhanhVy','MinhTam',
  'TuanLong','HoaLan','DucHuy','ThanhKim','VanMinh','QuocTuan','LanHuong','MinhViet','ThaoLinh','BaoVan',
  'PhucHoa','NhatTan','QuynhLan','TuanViet','HoangThu','MinhBao','LanVy','VanKhanh','ThanhDat','DuyHoang',
  'KhanhThu','MinhNhan','ThaoVan','TuanKhanh','HoaMinh','VinhThu','NhuLan','QuocMinh','LanDat','BaoHoang',
  'PhucVan','NhatHoa','QuynhThu','TuanMinh','HoangVan','MinhLan','ThaoKhanh','VinhHoa','NhuViet','DuyNam',
  'KhanhLan','TuanHoa','MinhVan','ThaoHoang','VinhLan','NhuKhanh','QuocHoa','LanMinh','BaoThu','PhucNhat',
];
const _RA_POOL = ['🧑','👩','👨','🧔','👧','👦','🧑‍💻','👩‍💼','🧑‍🎤','👱','🧕','👲','🧑‍🎓','👩‍🦰','🧑‍🔧','👩‍🎨','🧑‍🚀','🧑‍⚕️','👩‍🔬','🧙'];
const _RANK_SUFFIXES = ['_Pro','_VIP','99','_Top','_GG','88','_Boss','_HD','_X','_007','_V','_Rich','_K','_VN','_01','_Star','_King','_Elite','_Legend','_MAX'];

// _seededRand(seed) — deterministic pseudo-random in [0, 1).
// Uses Math.sin to derive a stable value from an integer seed.
// Used so each NPC's income multiplier never changes between renders,
// preventing the leaderboard numbers from "flickering" every tick.
function _seededRand(seed) {
  let x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function _genNpcName(rankId, idx) {
  const base = _RN_POOL[(RANK_TIERS.findIndex(r => r.id === rankId) * 20 + idx) % _RN_POOL.length];
  const suf  = _RANK_SUFFIXES[idx % _RANK_SUFFIXES.length];
  return base + suf;
}

// ── Persistent NPC seed multiplier (stable per npc, no flicker) ──
// Each NPC gets a fixed multiplier stored at creation time
const RANK_SAVE_KEY = 'factory_rank_v3';

// defaultRankData() — generates the initial NPC leaderboard state.
// Creates 20 NPCs per tier with:
//   - wealth distributed across the tier's min/max bracket (top-heavy)
//   - a fixed incMult (income multiplier) seeded from tier+index → no flicker
//   - a random joinDays value for the profile modal flavour text
// Result is saved to localStorage under RANK_SAVE_KEY.
function defaultRankData() {
  const groups = {};
  RANK_TIERS.forEach((tier, tIdx) => {
    const npcs = [];
    const span = tier.maxWealth === Infinity ? tier.minWealth * 20 : (tier.maxWealth - tier.minWealth);
    for (let i = 0; i < 20; i++) {
      const frac = (19 - i) / 19;
      const wealth = tier.minWealth + span * frac * (0.88 + _seededRand(tIdx * 100 + i) * 0.12);
      // Fixed income multiplier per npc — never changes, no flicker
      const incMult = 0.72 + _seededRand(tIdx * 200 + i + 50) * 0.56;
      npcs.push({
        id:       tier.id + '_' + i,
        name:     _genNpcName(tier.id, i),
        avatar:   _RA_POOL[i % _RA_POOL.length],
        wealth,
        incMult,  // fixed multiplier for income display
        joinDays: Math.floor(_seededRand(tIdx * 300 + i) * 400 + 10),
      });
    }
    npcs.sort((a, b) => b.wealth - a.wealth);
    groups[tier.id] = npcs;
  });
  return { groups, lastTick: Date.now() };
}

// ── Load / migrate from old save key ────────────────────────────
let rankData = (() => {
  try {
    // Try new key first
    let raw = localStorage.getItem(RANK_SAVE_KEY);
    if (!raw) raw = localStorage.getItem('factory_rank_v2'); // migrate old
    if (raw) {
      const p = JSON.parse(raw);
      if (p && p.groups) {
        // Patch missing incMult on old NPCs
        RANK_TIERS.forEach((tier, tIdx) => {
          const grp = p.groups[tier.id];
          if (!grp) return;
          grp.forEach((npc, i) => {
            if (typeof npc.incMult !== 'number') {
              npc.incMult = 0.72 + _seededRand(tIdx * 200 + i + 50) * 0.56;
            }
          });
        });
        return p;
      }
    }
  } catch(e) {}
  return defaultRankData();
})();

function saveRankData() {
  try { localStorage.setItem(RANK_SAVE_KEY, JSON.stringify(rankData)); } catch(e) {}
}

// ── Tick: NPC wealth grows every 3 s ────────────────────────────
function tickRankNPCs() {
  const now = Date.now();
  const elapsed = Math.min((now - (rankData.lastTick || now)) / 1000, 300);
  rankData.lastTick = now;
  if (elapsed <= 0) return;
  RANK_TIERS.forEach(tier => {
    const grp = rankData.groups[tier.id];
    if (!grp) return;
    grp.forEach(npc => {
      npc.wealth += tier.incomePerSec * elapsed * (npc.incMult || 1);
    });
    grp.sort((a, b) => b.wealth - a.wealth);
  });
  saveRankData();
}

// Tick every 3 s always (even when not viewing rank)
setInterval(tickRankNPCs, 3000);

// ── Helper ───────────────────────────────────────────────────────
function fmtW(w) {
  if (w >= 1e12) return '$' + (w / 1e12).toFixed(2) + 'T';
  if (w >= 1e9)  return '$' + (w / 1e9).toFixed(2) + 'B';
  if (w >= 1e6)  return '$' + (w / 1e6).toFixed(2) + 'M';
  if (w >= 1e3)  return '$' + (w / 1e3).toFixed(1) + 'K';
  return '$' + (w || 0).toFixed(0);
}

// ── State for rank-up / overtake detection ───────────────────────
window._activeRankTab  = 'dong';
window._prevPlayerRank = null;   // track rank changes
window._prevPlayerPos  = null;   // track position changes in leaderboard

// ── Toast notification ───────────────────────────────────────────
function _showRankToast(html, color, duration = 3500) {
  const existing = document.getElementById('rank-toast');
  if (existing) existing.remove();
  const t = document.createElement('div');
  t.id = 'rank-toast';
  t.innerHTML = html;
  Object.assign(t.style, {
    position:'fixed', bottom:'80px', left:'50%', transform:'translateX(-50%)',
    background: 'linear-gradient(135deg,#0d1626,#111f3a)',
    border: '1px solid ' + color,
    borderRadius: '14px', padding: '12px 20px',
    fontSize: '14px', fontWeight: '700', color: '#e2e8f0',
    zIndex: '9999', pointerEvents: 'none',
    boxShadow: '0 0 24px ' + color + '66, 0 4px 24px rgba(0,0,0,0.6)',
    animation: 'notifSlideIn 0.4s ease',
    textAlign: 'center', maxWidth: '320px', whiteSpace: 'nowrap',
  });
  document.body.appendChild(t);
  setTimeout(() => {
    t.style.animation = 'notifSlideOut 0.4s ease forwards';
    setTimeout(() => t.remove(), 400);
  }, duration);
}

// ── Check rank-up & overtake ─────────────────────────────────────
function _checkRankEvents(playerWealth, myRank, displayList) {
  // Rank-up check
  if (window._prevPlayerRank !== null && window._prevPlayerRank !== myRank.id) {
    _showRankToast(
      `🎉 THĂNG HẠNG! ${myRank.icon} <span style="color:${myRank.color}">${myRank.name}</span>`,
      myRank.color, 5000
    );
    // Auto-switch tab to new rank
    window._activeRankTab = myRank.id;
  }
  window._prevPlayerRank = myRank.id;

  // Overtake check: player position in current leaderboard
  const myPos = displayList.findIndex(p => p.isPlayer);
  if (myPos !== -1 && window._prevPlayerPos !== null && myPos < window._prevPlayerPos && myPos >= 0) {
    const overtaken = displayList[myPos + 1]; // person we just passed
    if (overtaken && !overtaken.isPlayer) {
      _showRankToast(
        `⚔️ Đã vượt qua <span style="color:#fbbf24">${overtaken.name}</span>! Vị trí #${myPos + 1}`,
        '#fbbf24', 3000
      );
    }
  }
  window._prevPlayerPos = myPos !== -1 ? myPos : window._prevPlayerPos;
}

// ── Render ───────────────────────────────────────────────────────
function renderRankPanel() {
  const panel = document.getElementById('panel-rank');
  if (!panel) return;
  // Only render if panel is visible (has active class) OR forced
  if (!panel.classList.contains('active') && !renderRankPanel._force) return;
  renderRankPanel._force = false;

  tickRankNPCs();

  const playerWealth = (typeof G !== 'undefined') ? (G.money || 0) : 0;
  const myRank = getRankByWealth(playerWealth);

  if (!rankData.groups[window._activeRankTab]) window._activeRankTab = myRank.id;

  const myRankIdx = RANK_TIERS.findIndex(r => r.id === myRank.id);
  const nextRank  = RANK_TIERS[myRankIdx + 1] || null;
  const prevMin   = myRank.minWealth;
  const nextMin   = nextRank ? nextRank.minWealth : null;

  // Progress within current rank (0–100)
  const progress = nextMin
    ? Math.min(100, Math.max(0, ((playerWealth - prevMin) / (nextMin - prevMin)) * 100))
    : 100;

  const activeTier = RANK_TIERS.find(r => r.id === window._activeRankTab) || myRank;
  const grp = rankData.groups[activeTier.id] || [];

  // Build display list: merge player if same rank
  let displayList = [...grp];
  if (activeTier.id === myRank.id) {
    displayList.push({ isPlayer: true, wealth: playerWealth, name: 'Bạn', avatar: '🎮', id: '__player__', incMult: 1 });
    displayList.sort((a, b) => b.wealth - a.wealth);
  }

  // Rank-up / overtake events
  _checkRankEvents(playerWealth, myRank, displayList);

  const leader = grp[0];

  panel.innerHTML = `
    <div class="rank-header" style="padding:12px 0 10px">
      <div class="rank-header-icon">🏆</div>
      <div class="rank-header-title">BẢNG XẾP HẠNG</div>
      <div class="rank-header-sub">Mỗi rank 20 người · Vượt #1 để thăng hạng</div>
    </div>

    <!-- My status card -->
    <div class="rank-my-card">
      <div class="rank-my-title">🎮 RANK CỦA BẠN</div>
      <div class="rank-my-row">
        <div class="rank-badge-big">${myRank.icon}</div>
        <div class="rank-my-info">
          <div class="rank-my-name" style="color:#e2e8f0">Người Chơi</div>
          <div class="rank-my-tier" style="color:${myRank.color};font-weight:800">${myRank.icon} ${myRank.name}</div>
          <div class="rank-my-wealth" style="color:#94a3b8;font-size:12px;margin-top:2px">${fmtW(playerWealth)}</div>
        </div>
        ${nextRank ? `<div style="text-align:right">
          <div style="font-size:10px;color:#4b5563">Lên rank tiếp:</div>
          <div style="font-size:13px;font-weight:800;color:${nextRank.color}">${nextRank.icon} ${nextRank.name}</div>
          <div style="font-size:11px;color:#4b5563;margin-top:2px">Cần ${fmtW(nextMin)}</div>
        </div>` : `<div style="font-size:12px;font-weight:800;color:#fde047">👑 MAX RANK</div>`}
      </div>
      ${nextRank ? `
        <div class="rank-progress-bar" style="margin-top:10px">
          <div class="rank-progress-fill" style="width:${progress.toFixed(1)}%;background:${myRank.color}"></div>
        </div>
        <div class="rank-progress-label">
          <span style="color:${myRank.color}">${myRank.icon} ${progress.toFixed(1)}%</span>
          <span style="color:${nextRank.color}">${nextRank.icon} ${fmtW(nextMin)}</span>
        </div>` : ''}
    </div>

    <!-- Rank tabs -->
    <div style="display:flex;gap:5px;overflow-x:auto;padding-bottom:4px;margin-bottom:12px;scrollbar-width:none">
      ${RANK_TIERS.map(r => {
        const isActive   = r.id === window._activeRankTab;
        const isUnlocked = playerWealth >= r.minWealth;
        return `<div onclick="switchRankTab('${r.id}')" style="
          flex-shrink:0;padding:6px 12px;border-radius:10px;cursor:pointer;font-size:12px;font-weight:700;
          white-space:nowrap;transition:all 0.2s;user-select:none;
          background:${isActive ? r.bg.replace('0.12','0.28') : r.bg};
          border:1px solid ${isActive ? r.color : r.border};
          color:${isActive ? r.color : '#4b5563'};
          opacity:${isUnlocked ? '1' : '0.45'};
          box-shadow:${isActive ? '0 0 12px ' + r.color + '55' : 'none'};
          transform:${isActive ? 'translateY(-2px)' : 'none'};
        ">${r.icon} ${r.name}</div>`;
      }).join('')}
    </div>

    <!-- Leaderboard -->
    <div class="rank-leaderboard">
      <div class="rank-lb-header" style="background:${activeTier.bg.replace('0.12','0.18')}">
        ${activeTier.icon} ${activeTier.name.toUpperCase()} — 20 Người
        <span style="margin-left:auto;font-size:10px;color:#374151;font-weight:400">Nhấn → Xem Profile</span>
      </div>
      ${leader ? `<div style="font-size:10px;color:#4b5563;padding:6px 16px;border-bottom:1px solid rgba(255,255,255,0.03)">
        🎯 Vượt <b style="color:${activeTier.color}">${leader.name}</b> (${fmtW(leader.wealth)}) để thăng hạng
      </div>` : ''}
      ${displayList.map((p, i) => {
        const posNum = i + 1;
        const medal  = posNum <= 3 ? ['🥇','🥈','🥉'][posNum - 1] : posNum;
        const isMe   = !!p.isPlayer;
        // Stable income display using fixed incMult — no flicker
        const incomeDisplay = fmtW(activeTier.incomePerSec * (p.incMult || 1) * 3);
        const npcIdx = isMe ? -1 : grp.findIndex(n => n.id === p.id);
        return `<div class="rank-row${isMe ? ' rank-row--me' : ''}"
          onclick="${isMe ? '' : `showRankProfile('${activeTier.id}',${npcIdx})`}"
          style="${isMe
            ? 'background:rgba(253,224,71,0.07);border-left:3px solid ' + myRank.color + ';cursor:default;'
            : 'cursor:pointer;'}">
          <div class="rank-pos-num" style="color:${posNum<=3?['#fde68a','#94a3b8','#fb923c'][posNum-1]:'#374151'};min-width:26px;font-size:13px;font-weight:800">${medal}</div>
          <div style="font-size:20px;flex-shrink:0">${p.avatar}</div>
          <div class="rank-player-info">
            <div class="rank-player-name" style="${isMe ? 'color:#fde047;font-weight:800' : ''}">${p.name}${isMe ? ' ◀ Bạn' : ''}</div>
            <div style="font-size:10px;color:#4b5563;margin-top:1px">+${incomeDisplay}/3s</div>
          </div>
          <div style="font-size:12px;font-weight:700;color:${activeTier.color};text-align:right;min-width:72px">${fmtW(p.wealth)}</div>
        </div>`;
      }).join('')}
    </div>
    <div style="font-size:10px;color:#1f2937;text-align:center;margin-top:8px;padding-bottom:8px">
      💡 NPC tăng tiền mỗi 3 giây · Rank nhỏ tăng ít, rank lớn tăng nhiều
    </div>
  `;
}

function switchRankTab(rankId) {
  window._activeRankTab = rankId;
  renderRankPanel();
}

// ── Profile modal ─────────────────────────────────────────────────
function showRankProfile(rankId, npcIdx) {
  const tier = RANK_TIERS.find(r => r.id === rankId);
  if (!tier || npcIdx < 0) return;
  const grp = rankData.groups[rankId];
  if (!grp) return;
  const p = grp[npcIdx];
  if (!p) return;

  const existing = document.getElementById('rank-profile-overlay');
  if (existing) existing.remove();

  const pos   = npcIdx + 1;
  const medal = pos <= 3 ? ['🥇 #1','🥈 #2','🥉 #3'][pos - 1] : '#' + pos;
  // Use fixed incMult for stable display
  const incomePerTick = tier.incomePerSec * (p.incMult || 1) * 3;

  const overlay = document.createElement('div');
  overlay.className = 'rank-profile-overlay';
  overlay.id = 'rank-profile-overlay';
  overlay.onclick = e => { if (e.target === overlay) closeRankProfile(); };
  overlay.innerHTML = `
    <div class="rank-profile-box">
      <button class="rank-profile-close" onclick="closeRankProfile()">✕ Đóng</button>
      <div class="rank-profile-avatar">${p.avatar}</div>
      <div class="rank-profile-name">${p.name}</div>
      <div class="rank-profile-rank-name" style="color:${tier.color}">${tier.icon} ${tier.name} · ${medal}</div>
      <div class="rank-profile-stats">
        <div class="rank-profile-stat">
          <div class="rank-profile-stat-val" style="color:${tier.color}">${fmtW(p.wealth)}</div>
          <div class="rank-profile-stat-label">Tổng Tài Sản</div>
        </div>
        <div class="rank-profile-stat">
          <div class="rank-profile-stat-val" style="color:#4ade80">+${fmtW(incomePerTick)}/3s</div>
          <div class="rank-profile-stat-label">Thu Nhập/3s</div>
        </div>
        <div class="rank-profile-stat">
          <div class="rank-profile-stat-val" style="color:#fbbf24">${medal}</div>
          <div class="rank-profile-stat-label">Hạng ${tier.name}</div>
        </div>
        <div class="rank-profile-stat">
          <div class="rank-profile-stat-val" style="color:#a78bfa">${p.joinDays} ngày</div>
          <div class="rank-profile-stat-label">Số Ngày Tham Gia</div>
        </div>
      </div>
      <div class="rank-profile-history">
        <div class="rank-profile-history-title">📋 Thông Tin</div>
        <div class="rank-profile-history-row"><span>Rank hiện tại</span><span style="color:${tier.color}">${tier.icon} ${tier.name}</span></div>
        <div class="rank-profile-history-row"><span>Thu nhập / 3s</span><span style="color:#4ade80">+${fmtW(incomePerTick)}</span></div>
        <div class="rank-profile-history-row"><span>Tổng tài sản</span><span style="color:${tier.color}">${fmtW(p.wealth)}</span></div>
        <div class="rank-profile-history-row"><span>Tham gia</span><span style="color:#9ca3af">${p.joinDays} ngày trước</span></div>
        <div class="rank-profile-history-row"><span>Vị trí</span><span style="color:#fbbf24">${medal}</span></div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}

function closeRankProfile() {
  const el = document.getElementById('rank-profile-overlay');
  if (el) el.remove();
}

// Rank panel auto-refresh every 3 seconds (only when the Rank tab is visible).
// Advances NPC wealth by (incomePerSec × 3) per tick to simulate real competition.
setInterval(() => {
  const panel = document.getElementById('panel-rank');
  if (panel && panel.classList.contains('active')) renderRankPanel();
}, 3000);

// Persist rank NPC data every 10 seconds so NPC wealth changes survive
// page reloads.  Separate from the main game save (which runs every 15 s).
setInterval(saveRankData, 10000);


// ═══════════════════════════════════════════════════════════════════
//  DISPLAY MODE SYSTEM  —  normal / mobile / tv
// ═══════════════════════════════════════════════════════════════════
const DISPLAY_MODE_KEY = 'factory_display_mode';

const DISPLAY_MODE_INFO = {
  normal: { label: 'Bình Thường — Full hiệu ứng', cls: '' },
  mobile: { label: '📱 Mobile Mode — Chữ to, giảm hiệu ứng nặng', cls: 'mode-mobile' },
  tv:     { label: '📺 TV Mode — Potato setting, cực nhẹ cho TV yếu', cls: 'mode-tv' }
};

function applyDisplayMode(mode) {
  // Remove existing mode classes
  document.body.classList.remove('mode-mobile', 'mode-tv');
  // Apply new class
  const info = DISPLAY_MODE_INFO[mode] || DISPLAY_MODE_INFO.normal;
  if (info.cls) document.body.classList.add(info.cls);
  // Update button states
  ['normal','mobile','tv'].forEach(m => {
    const btn = document.getElementById('mode-btn-' + m);
    if (btn) {
      btn.classList.toggle('display-mode-btn--active', m === mode);
    }
  });
  // Update label
  const lbl = document.getElementById('display-mode-label');
  if (lbl) lbl.textContent = { normal: 'Bình Thường', mobile: 'Mobile', tv: 'TV Mode' }[mode] || 'Bình Thường';
  // Save to localStorage
  try { localStorage.setItem(DISPLAY_MODE_KEY, mode); } catch(e) {}
  // TV mode: also apply lowest graphics preset
  if (mode === 'tv') {
    applyQualityPreset(1);
    const qEl = document.getElementById('gfx-quality');
    if (qEl) qEl.value = 1;
  } else if (mode === 'mobile') {
    applyQualityPreset(1);
    const qEl = document.getElementById('gfx-quality');
    if (qEl) qEl.value = 1;
  }
}

function loadDisplayMode() {
  let mode = 'normal';
  try { mode = localStorage.getItem(DISPLAY_MODE_KEY) || 'normal'; } catch(e) {}
  applyDisplayMode(mode);
}

// Load display mode on init — run after DOM ready
(function() {
  function _initDisplayMode() {
    loadDisplayMode();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _initDisplayMode);
  } else {
    _initDisplayMode();
  }
})();
