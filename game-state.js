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
  wallet: { xu:0, gold:0, diamond:0, dark:0, ruby:0, rainbow:0, token:0 },
  inventory: [],
  invMaxSlots: 50,
  recyclePoints: 0,
  marketStocks: { normal:[], mid:[], black:[] },
  myListings: [],
  lastStockTime: 0,
  // ═══ PROFILE ═══
  playerName: 'PlayerName',
  playerBio: '',
  // ═══ BUNDLES ═══
  factoryPlus: false,
  factoryPremium: false,
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
  // ═══ SKIN ═══
  skinCollection: { icons: [], badges: [] },
  equippedIcon: null,    // profile icon id
  equippedBadge: null,   // badge id shown next to name
});

let G = loadGame();

// Re-apply mat bonuses from purchase history to fix effects after reload
// matBonuses are cumulative so we reset to defaults then re-apply all purchases
(function reapplyMatBonuses() {
  if (!G.matPurchased || Object.keys(G.matPurchased).length === 0) return;
  // Reset to default values before re-applying
  const def = defaultState().matBonuses;
  G.matBonuses = {
    speedBoost: def.speedBoost,
    slotBoost: 0,
    autoCollect: def.autoCollect,
    inetFreeSlots: def.inetFreeSlots,
    lotteryLuckBonus: def.lotteryLuckBonus,
    recycleBoost: def.recycleBoost,
    powerEfficiency: def.powerEfficiency,
  };
  // Re-apply each purchased item the correct number of times
  // (MAT_ITEMS not defined yet at this point — defer to after MAT_ITEMS is defined)
  // This runs as a deferred call from initGame via window._reapplyMatBonusesDeferred
  window._matPurchasedToReapply = G.matPurchased;
})();

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
      if (!p.boughtTokenBundles) p.boughtTokenBundles = [];
      if (!p.wallet.token) p.wallet.token = 0;
      if (!p.taxEvadeTickets) p.taxEvadeTickets = 0;
      if (!p.debtEvadeTickets) p.debtEvadeTickets = 0;
      if (!p.permanentSpeedInternet) p.permanentSpeedInternet = false;
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
      // Always ensure all matBonus fields exist with defaults
      const defMat = defaultState().matBonuses;
      if (p.matBonuses.speedBoost === undefined)       p.matBonuses.speedBoost = defMat.speedBoost;
      if (p.matBonuses.slotBoost === undefined)        p.matBonuses.slotBoost = defMat.slotBoost;
      if (p.matBonuses.autoCollect === undefined)      p.matBonuses.autoCollect = defMat.autoCollect;
      if (p.matBonuses.inetFreeSlots === undefined)    p.matBonuses.inetFreeSlots = defMat.inetFreeSlots;
      if (p.matBonuses.lotteryLuckBonus === undefined) p.matBonuses.lotteryLuckBonus = defMat.lotteryLuckBonus;
      if (p.matBonuses.recycleBoost === undefined)     p.matBonuses.recycleBoost = defMat.recycleBoost;
      if (p.matBonuses.powerEfficiency === undefined)  p.matBonuses.powerEfficiency = defMat.powerEfficiency;
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
      // Profile
      if (!p.playerName) p.playerName = 'PlayerName';
      if (p.playerBio === undefined) p.playerBio = '';
      // Bundle flags
      if (p.factoryPlus === undefined) p.factoryPlus = false;
      if (p.factoryPremium === undefined) p.factoryPremium = false;
      // Skin
      if (!p.skinCollection) p.skinCollection = { icons: [], badges: [] };
      if (!p.skinCollection.icons) p.skinCollection.icons = [];
      if (!p.skinCollection.badges) p.skinCollection.badges = [];
      if (p.equippedIcon === undefined) p.equippedIcon = null;
      if (p.equippedBadge === undefined) p.equippedBadge = null;
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

