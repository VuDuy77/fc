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
  { id:'token',  name:'Token',      icon:'🔮', color:'#00f5ff', eq:'Đồng tiền hiếm nhất · Mua qua Token Shop' },
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

