/* ┌─────────────────────────────────────────────────────────────────────────┐
   │  MODULE 16 · BANNER  —  Key currency · 4 banners · 10 rare metals       │
   └─────────────────────────────────────────────────────────────────────────┘ */

// ═══ RARE METALS (10 loại, tỉ lệ khác nhau) ═══════════════════════════════
const BANNER_METALS = [
  { id:'iron',        name:'Sắt',         icon:'🔩', rarity:'common',    color:'#9ca3af', rate:0.350, tokenValue:5    },
  { id:'copper',      name:'Đồng',        icon:'🟤', rarity:'common',    color:'#f97316', rate:0.280, tokenValue:10   },
  { id:'silver',      name:'Bạc',         icon:'🥈', rarity:'uncommon',  color:'#e2e8f0', rate:0.150, tokenValue:25   },
  { id:'gold_m',      name:'Vàng',        icon:'🥇', rarity:'uncommon',  color:'#fbbf24', rate:0.100, tokenValue:50   },
  { id:'platinum',    name:'Bạch Kim',    icon:'⬡',  rarity:'rare',      color:'#60a5fa', rate:0.050, tokenValue:120  },
  { id:'titanium',    name:'Titanium',    icon:'🔷', rarity:'rare',      color:'#38bdf8', rate:0.030, tokenValue:200  },
  { id:'palladium',   name:'Palladium',   icon:'💠', rarity:'epic',      color:'#a78bfa', rate:0.015, tokenValue:400  },
  { id:'rhodium',     name:'Rhodium',     icon:'🔮', rarity:'epic',      color:'#c084fc', rate:0.008, tokenValue:700  },
  { id:'iridium',     name:'Iridium',     icon:'🌌', rarity:'legendary', color:'#f472b6', rate:0.004, tokenValue:1500 },
  { id:'unobtainium', name:'Unobtainium', icon:'✨', rarity:'mythic',    color:'#ffd700', rate:0.001, tokenValue:5000 },
];

// Build weighted pool
function _buildMetalPool(metals) {
  const pool = [];
  metals.forEach(function(m) {
    const w = Math.round(m.rate * 1000);
    for (let i = 0; i < w; i++) pool.push(m.id);
  });
  // Ensure pool not empty
  if (pool.length === 0) pool.push('iron');
  return pool;
}

// ═══ BANNERS ══════════════════════════════════════════════════════════════
const BANNERS = [
  {
    id: 'starter',
    name: 'Banner Khởi Đầu',
    icon: '🌅',
    desc: 'Dành cho người mới — Tỉ lệ Silver, Gold & Platinum được tăng cao! Sau khi quay 10 lần sẽ biến mất vĩnh viễn.',
    color: '#4ade80',
    theme: 'linear-gradient(135deg,#0a1f0a,#0d2e10)',
    border: '#4ade80',
    badge: '🌅 STARTER',
    isStarter: true,
    rateUpMetals: ['silver','gold_m','platinum'],
  },
  {
    id: 'classic',
    name: 'Banner Cổ Điển',
    icon: '⚔️',
    desc: 'Kim loại cơ bản với tỉ lệ cân bằng. Phù hợp mọi cấp độ người chơi.',
    color: '#60a5fa',
    theme: 'linear-gradient(135deg,#0a0f1f,#0d1530)',
    border: '#3b82f6',
    badge: '⚔️ CLASSIC',
    isStarter: false,
    rateUpMetals: ['silver','gold_m','platinum','titanium'],
  },
  {
    id: 'elite',
    name: 'Banner Elite',
    icon: '💎',
    desc: 'Tỉ lệ kim loại hiếm được tăng gấp đôi! Palladium và Rhodium nâng cao.',
    color: '#a78bfa',
    theme: 'linear-gradient(135deg,#0f0a1f,#1a0d35)',
    border: '#7c3aed',
    badge: '💎 ELITE',
    isStarter: false,
    rateUpMetals: ['palladium','rhodium','iridium'],
  },
  {
    id: 'mythic',
    name: 'Banner Huyền Thoại',
    icon: '✨',
    desc: 'Cơ hội duy nhất chạm tay vào Unobtainium huyền thoại. Tỉ lệ tối thượng nâng cao!',
    color: '#ffd700',
    theme: 'linear-gradient(135deg,#1a1000,#2d1f00)',
    border: '#ffd700',
    badge: '👑 MYTHIC',
    isStarter: false,
    rateUpMetals: ['iridium','unobtainium'],
  },
];

// Build pools per banner
function _getBannerPool(bannerId) {
  if (bannerId === 'starter') {
    return _buildMetalPool(BANNER_METALS.map(function(m) {
      return ['silver','gold_m','platinum'].includes(m.id) ? Object.assign({}, m, {rate: m.rate * 1.5}) : m;
    }));
  }
  if (bannerId === 'elite') {
    return _buildMetalPool(BANNER_METALS.map(function(m) {
      return ['palladium','rhodium','iridium'].includes(m.id) ? Object.assign({}, m, {rate: m.rate * 2}) : m;
    }));
  }
  if (bannerId === 'mythic') {
    return _buildMetalPool(BANNER_METALS.map(function(m) {
      if (m.id === 'unobtainium') return Object.assign({}, m, {rate: 0.005});
      if (m.id === 'iridium') return Object.assign({}, m, {rate: 0.012});
      return m;
    }));
  }
  // classic — standard pool
  return _buildMetalPool(BANNER_METALS);
}

function _pullOnce(pool) {
  return pool[Math.floor(Math.random() * pool.length)];
}
function _doPulls(count, pool) {
  const results = [];
  for (let i = 0; i < count; i++) results.push(_pullOnce(pool));
  return results;
}

// ═══ ACTIVE BANNER STATE ══════════════════════════════════════════════════
let _activeBannerId = 'starter';

// ═══ RENDER BANNER PANEL ══════════════════════════════════════════════════
function renderBannerPanel() {
  const container = document.getElementById('panel-banner');
  if (!container) return;

  const keyAmt = (G.wallet && G.wallet.key) ? G.wallet.key : 0;
  const tokenAmt = (G.wallet && G.wallet.token) ? G.wallet.token : 0;
  const starterDone = G.bannerStarterDone || false;

  // If active banner is starter and it's done, switch to classic
  if (_activeBannerId === 'starter' && starterDone) _activeBannerId = 'classic';
  const banner = BANNERS.find(function(b) { return b.id === _activeBannerId; }) || BANNERS[1];

  const rarityColors = {common:'#9ca3af', uncommon:'#4ade80', rare:'#60a5fa', epic:'#a78bfa', legendary:'#f472b6', mythic:'#ffd700'};

  // Build banner tabs HTML
  let tabsHtml = '';
  BANNERS.forEach(function(b) {
    const done = b.isStarter && starterDone;
    const active = b.id === _activeBannerId;
    tabsHtml += '<div onclick="if(!' + done + '){_activeBannerId=\'' + b.id + '\';renderBannerPanel();}" '
      + 'style="flex-shrink:0;padding:7px 13px;border-radius:10px;cursor:' + (done ? 'not-allowed' : 'pointer') + ';font-size:12px;font-weight:700;'
      + 'background:' + (active ? b.theme : '#111827') + ';'
      + 'color:' + (done ? '#374151' : active ? b.color : '#6b7280') + ';'
      + 'border:1.5px solid ' + (active ? b.border + '88' : '#1f2937') + ';'
      + 'opacity:' + (done ? '0.4' : '1') + ';white-space:nowrap;transition:all 0.2s">'
      + b.icon + ' ' + b.name + (done ? ' ✓' : '') + '</div>';
  });

  // Rate-up metals for active banner
  let rateUpHtml = '';
  banner.rateUpMetals.forEach(function(mid) {
    const m = BANNER_METALS.find(function(x) { return x.id === mid; });
    if (!m) return;
    rateUpHtml += '<span style="background:' + m.color + '22;color:' + m.color + ';font-size:12px;padding:3px 8px;border-radius:8px;border:1px solid ' + m.color + '44">'
      + m.icon + ' ' + m.name + '</span>';
  });

  // Pull buttons
  let pullBtnsHtml = '';
  if (banner.isStarter && !starterDone) {
    var canAffordStarter = tokenAmt >= 7000;
    pullBtnsHtml = '<div style="background:#0a1f0a;border:1px solid #4ade8044;border-radius:10px;padding:10px;margin-bottom:10px;text-align:center">'
      + '<div style="font-size:13px;color:#4ade80;font-weight:700">🌅 Quay 10 lần với tỉ lệ tăng cao!</div>'
      + '<div style="font-size:11px;color:#6b7280;margin-top:3px">Chi phí: 10 🗝️ Key (hoặc 7,000 🔮 Token để mua Key)</div></div>'
      + '<button onclick="doBannerPull(\'starter\',10,false)" '
      + 'style="width:100%;padding:14px;background:linear-gradient(135deg,#1e3a1e,#0d2e10);color:#4ade80;border:2px solid #4ade8066;border-radius:12px;cursor:pointer;font-size:15px;font-weight:800;margin-bottom:6px">'
      + '🗝️ Quay 10 Lần — 10 Key</button>';
  } else if (banner.isStarter && starterDone) {
    pullBtnsHtml = '<div style="text-align:center;padding:20px;color:#374151;font-size:14px">✅ Đã sử dụng Banner Khởi Đầu</div>';
  } else {
    pullBtnsHtml = '<div style="display:flex;gap:8px;margin-bottom:6px">'
      + '<button onclick="doBannerPull(\'' + banner.id + '\',1,false)" '
      + 'style="flex:1;padding:12px 4px;background:#0d1117;color:' + banner.color + ';border:1.5px solid ' + banner.border + '55;border-radius:10px;cursor:pointer;font-size:12px;font-weight:700;line-height:1.4">'
      + '🗝️ Quay 1 Lần<br><span style="font-size:10px;color:#6b7280">1 Key</span></button>'
      + '<button onclick="doBannerPull(\'' + banner.id + '\',10,false)" '
      + 'style="flex:1;padding:12px 4px;background:#0d1117;color:' + banner.color + ';border:1.5px solid ' + banner.border + '55;border-radius:10px;cursor:pointer;font-size:12px;font-weight:700;line-height:1.4">'
      + '🗝️ Quay 10 Lần<br><span style="font-size:10px;color:#6b7280">10 Key</span></button>'
      + '<button onclick="doBannerPull(\'' + banner.id + '\',100,false)" '
      + 'style="flex:1;padding:12px 4px;background:linear-gradient(135deg,#1a1200,#0d1117);color:' + banner.color + ';border:2px solid ' + banner.border + '77;border-radius:10px;cursor:pointer;font-size:12px;font-weight:800;line-height:1.4">'
      + '🗝️ Quay 100 Lần<br><span style="font-size:10px;color:#fbbf24">100 Key + 5 🆓</span></button>'
      + '</div>';
  }

  // Metals rate table
  let rateTableHtml = '';
  BANNER_METALS.forEach(function(m) {
    const rc = rarityColors[m.rarity] || '#9ca3af';
    const pct = (m.rate * 100).toFixed(2);
    rateTableHtml += '<div style="display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid #1f293733">'
      + '<span style="font-size:16px;width:22px;text-align:center">' + m.icon + '</span>'
      + '<span style="font-size:13px;color:' + m.color + ';flex:1">' + m.name + '</span>'
      + '<span style="font-size:10px;color:' + rc + ';background:' + rc + '22;padding:1px 6px;border-radius:8px">' + m.rarity + '</span>'
      + '<span style="font-size:12px;color:#fbbf24;width:44px;text-align:right">' + pct + '%</span>'
      + '<span style="font-size:11px;color:#4ade80;width:56px;text-align:right">+' + m.tokenValue + '🔮</span>'
      + '</div>';
  });

  container.innerHTML =
    '<div style="padding:14px 12px;max-width:520px;margin:0 auto">'

    // Header: Key display + buy button
    + '<div style="background:linear-gradient(135deg,#0a0a1a,#111827);border:1px solid #1f2937;border-radius:14px;padding:14px 16px;margin-bottom:14px;display:flex;align-items:center;justify-content:space-between">'
    +   '<div style="display:flex;align-items:center;gap:10px">'
    +     '<span style="font-size:26px">🗝️</span>'
    +     '<div><div style="font-size:13px;color:#ffd700;font-weight:700;letter-spacing:1px">KEY CỦA BẠN</div>'
    +     '<div style="font-size:11px;color:#6b7280">Dùng để quay Banner · 1 Key = 700 🔮</div></div>'
    +   '</div>'
    +   '<div style="text-align:right">'
    +     '<div style="font-size:26px;font-weight:900;color:#ffd700">' + keyAmt.toLocaleString() + ' 🗝️</div>'
    +     '<button onclick="showBuyKeyPopup()" style="margin-top:5px;padding:5px 12px;background:linear-gradient(135deg,#1a1000,#2a1a00);color:#ffd700;border:1px solid #ffd70066;border-radius:8px;cursor:pointer;font-size:11px;font-weight:700">+ Mua Key (700 🔮)</button>'
    +   '</div>'
    + '</div>'

    // Banner tabs
    + '<div style="display:flex;gap:6px;margin-bottom:12px;overflow-x:auto;padding-bottom:4px">' + tabsHtml + '</div>'

    // Active banner card
    + '<div style="background:' + banner.theme + ';border:2px solid ' + banner.border + '55;border-radius:16px;padding:18px 16px;margin-bottom:14px">'
    +   '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">'
    +     '<div style="display:flex;align-items:center;gap:10px">'
    +       '<span style="font-size:32px">' + banner.icon + '</span>'
    +       '<div><div style="font-size:16px;font-weight:800;color:' + banner.color + '">' + banner.name + '</div>'
    +       '<div style="font-size:11px;color:#6b7280;margin-top:2px;max-width:220px">' + banner.desc + '</div></div>'
    +     '</div>'
    +     '<span style="background:' + banner.border + '22;color:' + banner.color + ';font-size:11px;font-weight:700;padding:4px 10px;border-radius:20px;border:1px solid ' + banner.border + '44;white-space:nowrap">' + banner.badge + '</span>'
    +   '</div>'
    +   '<div style="background:#0d1117;border-radius:10px;padding:10px;margin-bottom:12px">'
    +     '<div style="font-size:11px;color:#fbbf24;font-weight:700;margin-bottom:6px">⭐ KIM LOẠI TỈ LỆ CAO</div>'
    +     '<div style="display:flex;gap:6px;flex-wrap:wrap">' + rateUpHtml + '</div>'
    +   '</div>'
    +   pullBtnsHtml
    + '</div>'

    // Rate table
    + '<div style="background:#111827;border:1px solid #1f2937;border-radius:12px;padding:14px;margin-bottom:14px">'
    +   '<div style="font-size:13px;color:#9ca3af;font-weight:700;margin-bottom:10px">📊 TỈ LỆ KIM LOẠI</div>'
    +   rateTableHtml
    +   '<div style="font-size:11px;color:#374151;margin-top:8px">* Kim loại vào Kho Đồ — bán lấy Token tại tab Kho Đồ</div>'
    + '</div>'

    // Mineral inventory section
    + _renderBannerMineralInventory()

    + '</div>';
}


// ═══ MINERAL INVENTORY IN BANNER ══════════════════════════════════════════
function _renderBannerMineralInventory() {
  // Collect all metals in inventory
  var counts = {};
  BANNER_METALS.forEach(function(m) { counts[m.id] = 0; });
  if (G.inventory) {
    G.inventory.forEach(function(it) {
      if (it.itemId && counts[it.itemId] !== undefined) counts[it.itemId]++;
    });
  }
  // Also check wallet metal fields
  if (G.wallet) {
    BANNER_METALS.forEach(function(m) {
      if (G.wallet[m.id]) counts[m.id] = (counts[m.id] || 0) + (G.wallet[m.id] || 0);
    });
  }

  var totalOwned = Object.values(counts).reduce(function(a,b){ return a+b; }, 0);
  var totalTokenValue = 0;
  BANNER_METALS.forEach(function(m) { totalTokenValue += (counts[m.id] || 0) * m.tokenValue; });

  var rarityColors = {common:'#9ca3af', uncommon:'#4ade80', rare:'#60a5fa', epic:'#a78bfa', legendary:'#f472b6', mythic:'#ffd700'};

  var rowsHtml = '';
  BANNER_METALS.forEach(function(m) {
    var qty = counts[m.id] || 0;
    if (qty === 0) return;
    var rc = rarityColors[m.rarity] || '#9ca3af';
    rowsHtml += '<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid #1f293733">'
      + '<span style="font-size:18px;width:24px;text-align:center">' + m.icon + '</span>'
      + '<span style="font-size:13px;color:' + m.color + ';flex:1">' + m.name + '</span>'
      + '<span style="font-size:10px;color:' + rc + ';background:' + rc + '22;padding:1px 6px;border-radius:8px">' + m.rarity + '</span>'
      + '<span style="font-size:13px;color:#e2e8f0;font-weight:700;width:32px;text-align:right">×' + qty + '</span>'
      + '<span style="font-size:11px;color:#00f5ff;width:64px;text-align:right">+' + (qty * m.tokenValue).toLocaleString() + ' 🔮</span>'
      + '</div>';
  });

  if (rowsHtml === '') {
    rowsHtml = '<div style="text-align:center;color:#374151;padding:14px;font-size:13px">⛏️ Chưa có khoáng sản nào — hãy quay Banner để khai thác!</div>';
  }

  return '<div style="background:#0d1117;border:1px solid #1f2937;border-radius:12px;padding:14px;margin-bottom:14px">'
    + '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">'
    +   '<div style="font-size:13px;color:#9ca3af;font-weight:700">⛏️ KHO KHOÁNG SẢN CỦA BẠN</div>'
    +   (totalOwned > 0
        ? '<div style="font-size:12px;color:#00f5ff;font-weight:700">' + totalOwned + ' mảnh · ' + totalTokenValue.toLocaleString() + ' 🔮</div>'
        : '')
    + '</div>'
    + rowsHtml
    + (totalOwned > 0 ? '<div style="font-size:11px;color:#374151;margin-top:8px">💡 Bán khoáng sản tại tab Kho Đồ để nhận Token</div>' : '')
    + '</div>';
}

// ═══ BUY KEY POPUP ════════════════════════════════════════════════════════
function showBuyKeyPopup() {
  var existing = document.getElementById('buy-key-popup');
  if (existing) existing.remove();
  var tokenAmt = (G.wallet && G.wallet.token) ? G.wallet.token : 0;
  var keyAmt = (G.wallet && G.wallet.key) ? G.wallet.key : 0;
  var canBuy1 = tokenAmt >= 700;
  var canBuy10 = tokenAmt >= 7000;
  var maxBuy = Math.floor(tokenAmt / 700);

  var overlay = document.createElement('div');
  overlay.id = 'buy-key-popup';
  overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.88);z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px;backdrop-filter:blur(6px)';
  overlay.innerHTML =
    '<div style="background:linear-gradient(135deg,#0d1117,#1a1000);border:2px solid #ffd70066;border-radius:18px;padding:28px 22px;width:100%;max-width:340px;position:relative;box-shadow:0 0 40px #ffd70033">'
    + '<button onclick="document.getElementById(\'buy-key-popup\').remove()" style="position:absolute;top:12px;right:14px;background:#1f2937;border:1px solid #374151;color:#9ca3af;border-radius:8px;padding:4px 10px;cursor:pointer;font-size:15px;font-weight:700">✕</button>'
    + '<div style="text-align:center;margin-bottom:18px">'
    +   '<div style="font-size:44px;margin-bottom:6px">🗝️</div>'
    +   '<div style="font-size:17px;font-weight:800;color:#ffd700">Mua Key</div>'
    +   '<div style="font-size:13px;color:#6b7280;margin-top:4px">1 Key = 700 🔮 Token</div>'
    + '</div>'
    + '<div style="background:#0d1117;border:1px solid #ffd70033;border-radius:10px;padding:12px;margin-bottom:14px">'
    +   '<div style="display:flex;justify-content:space-between;margin-bottom:5px"><span style="color:#9ca3af;font-size:13px">Token hiện có:</span><span style="color:#00f5ff;font-weight:700">' + tokenAmt.toLocaleString() + ' 🔮</span></div>'
    +   '<div style="display:flex;justify-content:space-between;margin-bottom:5px"><span style="color:#9ca3af;font-size:13px">Key hiện có:</span><span style="color:#ffd700;font-weight:700">' + keyAmt.toLocaleString() + ' 🗝️</span></div>'
    +   '<div style="display:flex;justify-content:space-between"><span style="color:#9ca3af;font-size:13px">Có thể mua tối đa:</span><span style="color:#4ade80;font-weight:700">' + maxBuy + ' Key</span></div>'
    + '</div>'
    + '<div style="display:flex;gap:8px;margin-bottom:8px">'
    +   '<button onclick="buyKey(1)" ' + (!canBuy1 ? 'disabled' : '') + ' style="flex:1;padding:11px 4px;background:' + (canBuy1 ? 'linear-gradient(135deg,#1a1000,#2a1a00)' : '#0d1117') + ';color:' + (canBuy1 ? '#ffd700' : '#374151') + ';border:1.5px solid ' + (canBuy1 ? '#ffd70055' : '#1f2937') + ';border-radius:10px;cursor:' + (canBuy1 ? 'pointer' : 'not-allowed') + ';font-size:13px;font-weight:700;line-height:1.5">x1<br><span style="font-size:10px">700 🔮</span></button>'
    +   '<button onclick="buyKey(10)" ' + (!canBuy10 ? 'disabled' : '') + ' style="flex:1;padding:11px 4px;background:' + (canBuy10 ? 'linear-gradient(135deg,#1a1000,#2a1a00)' : '#0d1117') + ';color:' + (canBuy10 ? '#ffd700' : '#374151') + ';border:1.5px solid ' + (canBuy10 ? '#ffd70055' : '#1f2937') + ';border-radius:10px;cursor:' + (canBuy10 ? 'pointer' : 'not-allowed') + ';font-size:13px;font-weight:700;line-height:1.5">x10<br><span style="font-size:10px">7,000 🔮</span></button>'
    +   '<button onclick="buyKey(' + maxBuy + ')" ' + (!canBuy1 ? 'disabled' : '') + ' style="flex:1;padding:11px 4px;background:' + (canBuy1 ? 'linear-gradient(135deg,#1a1000,#2a1a00)' : '#0d1117') + ';color:' + (canBuy1 ? '#ffd700' : '#374151') + ';border:1.5px solid ' + (canBuy1 ? '#ffd70055' : '#1f2937') + ';border-radius:10px;cursor:' + (canBuy1 ? 'pointer' : 'not-allowed') + ';font-size:12px;font-weight:700;line-height:1.5">Tất cả<br><span style="font-size:10px">' + maxBuy + ' Key</span></button>'
    + '</div>'
    + '<div style="font-size:11px;color:#374151;text-align:center;margin-bottom:12px">Key dùng để quay Banner kim loại quý</div>'
    + '<div style="height:1px;background:linear-gradient(90deg,transparent,#ffd70033,transparent);margin-bottom:12px"></div>'
    + '<button onclick="document.getElementById(\'buy-key-popup\').remove();showRealBuyPopup()" '
    + 'style="width:100%;padding:11px;background:linear-gradient(135deg,#0d2a0d,#1a3a1a);color:#4ade80;border:1.5px solid #4ade8066;border-radius:10px;cursor:pointer;font-size:13px;font-weight:700;display:flex;align-items:center;justify-content:center;gap:7px">'
    + '💳 Mua Key bằng tiền thật</button>'
    + '</div>';
  document.body.appendChild(overlay);
}

// ═══ REAL MONEY PURCHASE POPUP ════════════════════════════════════════════
function showRealBuyPopup() {
  var existing = document.getElementById('real-buy-popup');
  if (existing) existing.remove();

  var overlay = document.createElement('div');
  overlay.id = 'real-buy-popup';
  overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.92);z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px;backdrop-filter:blur(8px)';
  overlay.innerHTML =
    '<div style="background:linear-gradient(135deg,#0d1117,#111827);border:2px solid #4ade8055;border-radius:20px;padding:26px 20px;width:100%;max-width:360px;position:relative;box-shadow:0 0 50px #4ade8022">'
    + '<button onclick="document.getElementById(\'real-buy-popup\').remove()" style="position:absolute;top:12px;right:14px;background:#1f2937;border:1px solid #374151;color:#9ca3af;border-radius:8px;padding:4px 10px;cursor:pointer;font-size:15px;font-weight:700">✕</button>'
    + '<div style="text-align:center;margin-bottom:18px">'
    +   '<div style="font-size:42px;margin-bottom:6px">💳</div>'
    +   '<div style="font-size:18px;font-weight:800;color:#4ade80">Mua Key Thật</div>'
    +   '<div style="font-size:12px;color:#6b7280;margin-top:4px">Chọn phương thức thanh toán</div>'
    + '</div>'
    // Option 1: Mã 8 chữ số
    + '<div onclick="document.getElementById(\'real-buy-popup\').remove();showCodeBuyPopup()" '
    + 'style="background:linear-gradient(135deg,#0a1220,#111f3a);border:1.5px solid #3b82f655;border-radius:14px;padding:16px;margin-bottom:10px;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;gap:14px" '
    + 'onmouseover="this.style.borderColor=\'#60a5fa88\';this.style.boxShadow=\'0 0 18px #3b82f633\'" onmouseout="this.style.borderColor=\'#3b82f655\';this.style.boxShadow=\'none\'">'
    +   '<div style="font-size:32px;flex-shrink:0">🔑</div>'
    +   '<div>'
    +     '<div style="font-size:15px;font-weight:700;color:#60a5fa">Nhập Mã Kích Hoạt</div>'
    +     '<div style="font-size:12px;color:#6b7280;margin-top:3px">Mã dạng <span style="color:#93c5fd;font-family:monospace">XX-XX-XX-XX</span> (8 số)</div>'
    +     '<div style="font-size:11px;color:#374151;margin-top:4px">Mua mã qua email: <span style="color:#60a5fa">tranthikimai4@gmail.com</span></div>'
    +   '</div>'
    + '</div>'
    // Option 2: Ngân hàng
    + '<div onclick="document.getElementById(\'real-buy-popup\').remove();showBankBuyPopup()" '
    + 'style="background:linear-gradient(135deg,#120a20,#1e1235);border:1.5px solid #7c3aed55;border-radius:14px;padding:16px;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;gap:14px" '
    + 'onmouseover="this.style.borderColor=\'#a78bfa88\';this.style.boxShadow=\'0 0 18px #7c3aed33\'" onmouseout="this.style.borderColor=\'#7c3aed55\';this.style.boxShadow=\'none\'">'
    +   '<div style="font-size:32px;flex-shrink:0">🏦</div>'
    +   '<div>'
    +     '<div style="font-size:15px;font-weight:700;color:#a78bfa">Chuyển Khoản Ngân Hàng</div>'
    +     '<div style="font-size:12px;color:#6b7280;margin-top:3px">Vietcombank · TK: <span style="color:#c4b5fd;font-family:monospace;font-weight:700">0905393373</span></div>'
    +     '<div style="font-size:11px;color:#374151;margin-top:4px">Liên hệ email sau khi chuyển khoản</div>'
    +   '</div>'
    + '</div>'
    + '</div>';
  document.body.appendChild(overlay);
}

// ═══ CODE BUY POPUP ═══════════════════════════════════════════════════════
function showCodeBuyPopup() {
  var existing = document.getElementById('code-buy-popup');
  if (existing) existing.remove();

  var overlay = document.createElement('div');
  overlay.id = 'code-buy-popup';
  overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.92);z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px;backdrop-filter:blur(8px)';
  overlay.innerHTML =
    '<div style="background:linear-gradient(135deg,#0a1220,#111f3a);border:2px solid #3b82f666;border-radius:20px;padding:26px 20px;width:100%;max-width:360px;position:relative;box-shadow:0 0 50px #3b82f622">'
    + '<button onclick="document.getElementById(\'code-buy-popup\').remove();showRealBuyPopup()" style="position:absolute;top:12px;left:14px;background:#1f2937;border:1px solid #374151;color:#9ca3af;border-radius:8px;padding:4px 10px;cursor:pointer;font-size:13px;font-weight:700">← Quay lại</button>'
    + '<button onclick="document.getElementById(\'code-buy-popup\').remove()" style="position:absolute;top:12px;right:14px;background:#1f2937;border:1px solid #374151;color:#9ca3af;border-radius:8px;padding:4px 10px;cursor:pointer;font-size:15px;font-weight:700">✕</button>'
    + '<div style="text-align:center;margin-bottom:18px;padding-top:8px">'
    +   '<div style="font-size:42px;margin-bottom:6px">🔑</div>'
    +   '<div style="font-size:17px;font-weight:800;color:#60a5fa">Nhập Mã Kích Hoạt</div>'
    +   '<div style="font-size:12px;color:#6b7280;margin-top:4px">Mã gồm 8 số theo định dạng XX-XX-XX-XX</div>'
    + '</div>'
    + '<div style="background:#0d1117;border:1px solid #3b82f633;border-radius:12px;padding:14px;margin-bottom:14px">'
    +   '<div style="font-size:12px;color:#60a5fa;font-weight:700;margin-bottom:8px">📧 Cách mua mã:</div>'
    +   '<div style="font-size:12px;color:#9ca3af;line-height:1.8">'
    +     '1. Liên hệ qua email để đặt mua<br>'
    +     '2. Thanh toán và nhận mã kích hoạt<br>'
    +     '3. Nhập mã vào ô bên dưới'
    +   '</div>'
    +   '<div style="margin-top:10px;background:#111827;border:1px solid #3b82f644;border-radius:8px;padding:10px;display:flex;align-items:center;gap:8px">'
    +     '<span style="font-size:16px">📮</span>'
    +     '<div>'
    +       '<div style="font-size:11px;color:#4b5563">Email liên hệ:</div>'
    +       '<div style="font-size:13px;font-weight:700;color:#60a5fa">tranthikimai4@gmail.com</div>'
    +     '</div>'
    +   '</div>'
    + '</div>'
    + '<div style="margin-bottom:12px">'
    +   '<div style="font-size:12px;color:#6b7280;margin-bottom:7px;font-weight:600">Nhập mã của bạn:</div>'
    +   '<input id="code-input-field" type="text" maxlength="14" placeholder="VD: AB7H-32F5-53PQ" '
    +   'oninput="formatCodeInput(this)" '
    +   'style="width:100%;box-sizing:border-box;padding:13px 14px;background:#111827;border:2px solid #3b82f644;border-radius:10px;color:#e2e8f0;font-size:15px;font-weight:700;font-family:monospace;letter-spacing:2px;text-align:center;outline:none;transition:border-color 0.2s" '
    +   'onfocus="this.style.borderColor=\'#60a5fa88\'" onblur="this.style.borderColor=\'#3b82f644\'">'
    +   '<div id="code-msg" style="font-size:12px;margin-top:7px;text-align:center;min-height:18px"></div>'
    + '</div>'
    + '<button onclick="redeemCode()" '
    + 'style="width:100%;padding:13px;background:linear-gradient(135deg,#1e3a5f,#1e40af);color:#93c5fd;border:1.5px solid #3b82f655;border-radius:10px;cursor:pointer;font-size:14px;font-weight:800;letter-spacing:0.5px">'
    + '✅ Kích Hoạt Mã</button>'
    + '</div>';
  document.body.appendChild(overlay);
}

// ═══ FORMAT & REDEEM CODE ═════════════════════════════════════════════════
function formatCodeInput(input) {
  var raw = input.value.toUpperCase().replace(/[^A-Z2-9]/g, '').slice(0, 12);
  var parts = [];
  for (var i = 0; i < raw.length; i += 4) parts.push(raw.slice(i, i + 4));
  input.value = parts.join('-');
}

// ═══ API HELPER — Kết nối Google Sheets ══════════════════════════════════
function _callGAPI_B(code, bundleId, callback) {
  var url = (typeof localStorage !== 'undefined' && localStorage.getItem('factory_api_url')) || '';
  if (!url) { callback({ ok: false, msg: '⚠️ Chưa cài đặt API! Liên hệ admin.' }); return; }
  fetch(url, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'check', code: code.trim().toUpperCase(), bundleId: bundleId || '*' })
  }).then(function(r){ return r.json(); }).then(function(d){ callback(d); })
  .catch(function(e){ callback({ ok: false, msg: '❌ Lỗi kết nối: ' + e.message }); });
}

function redeemCode() {
  var input = document.getElementById('code-input-field');
  var msg = document.getElementById('code-msg');
  if (!input || !msg) return;
  var code = input.value.trim();
  if (!/^\d{2}-\d{2}-\d{2}-\d{2}$/.test(code)) {
    msg.style.color = '#f87171';
    msg.textContent = '⚠️ Mã không đúng định dạng! Vui lòng nhập đủ 8 số.';
    return;
  }
  msg.style.color = '#60a5fa'; msg.textContent = '⏳ Đang kiểm tra mã với server...';
  _callGAPI_B(code, 'key', function(res) {
    if (!res.ok) { msg.style.color = '#f87171'; msg.textContent = res.msg; return; }
    G.wallet.key = (G.wallet.key || 0) + 50;
    saveGame(false); updateUI();
    var popup = document.getElementById('code-buy-popup');
    if (popup) popup.remove();
    showNotif('🎉 Mã hợp lệ! +50 🗝️ Key đã được nạp vào tài khoản!');
    renderBannerPanel();
  });
}

// ═══ BANK BUY POPUP ═══════════════════════════════════════════════════════
function showBankBuyPopup() {
  var existing = document.getElementById('bank-buy-popup');
  if (existing) existing.remove();

  var overlay = document.createElement('div');
  overlay.id = 'bank-buy-popup';
  overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.92);z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px;backdrop-filter:blur(8px)';
  overlay.innerHTML =
    '<div style="background:linear-gradient(135deg,#120a20,#1e1235);border:2px solid #7c3aed66;border-radius:20px;padding:26px 20px;width:100%;max-width:360px;position:relative;box-shadow:0 0 50px #7c3aed22">'
    + '<button onclick="document.getElementById(\'bank-buy-popup\').remove();showRealBuyPopup()" style="position:absolute;top:12px;left:14px;background:#1f2937;border:1px solid #374151;color:#9ca3af;border-radius:8px;padding:4px 10px;cursor:pointer;font-size:13px;font-weight:700">← Quay lại</button>'
    + '<button onclick="document.getElementById(\'bank-buy-popup\').remove()" style="position:absolute;top:12px;right:14px;background:#1f2937;border:1px solid #374151;color:#9ca3af;border-radius:8px;padding:4px 10px;cursor:pointer;font-size:15px;font-weight:700">✕</button>'
    + '<div style="text-align:center;margin-bottom:18px;padding-top:8px">'
    +   '<div style="font-size:42px;margin-bottom:6px">🏦</div>'
    +   '<div style="font-size:17px;font-weight:800;color:#a78bfa">Chuyển Khoản Ngân Hàng</div>'
    +   '<div style="font-size:12px;color:#6b7280;margin-top:4px">Vietcombank — Nhận Key sau khi xác nhận</div>'
    + '</div>'
    // Bank info card
    + '<div style="background:#0d0d1a;border:1.5px solid #7c3aed55;border-radius:14px;padding:16px;margin-bottom:14px">'
    +   '<div style="font-size:11px;color:#7c3aed;font-weight:700;letter-spacing:1px;margin-bottom:10px">THÔNG TIN NGÂN HÀNG</div>'
    +   '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid #1f2937">'
    +     '<span style="font-size:13px;color:#6b7280">Ngân hàng:</span>'
    +     '<span style="font-size:14px;font-weight:700;color:#c4b5fd">Vietcombank</span>'
    +   '</div>'
    +   '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid #1f2937">'
    +     '<span style="font-size:13px;color:#6b7280">Số tài khoản:</span>'
    +     '<div style="display:flex;align-items:center;gap:6px">'
    +       '<span id="bank-acc-num" style="font-size:16px;font-weight:900;color:#a78bfa;font-family:monospace;letter-spacing:2px">0905393373</span>'
    +       '<button onclick="navigator.clipboard&&navigator.clipboard.writeText(\'0905393373\').then(function(){var b=document.getElementById(\'copy-bank-btn\');if(b){b.textContent=\'✓\';setTimeout(function(){b.textContent=\'📋\'},1500)}})" id="copy-bank-btn" style="background:#1f2937;border:1px solid #374151;color:#9ca3af;border-radius:6px;padding:3px 8px;cursor:pointer;font-size:13px">📋</button>'
    +     '</div>'
    +   '</div>'
    +   '<div style="display:flex;justify-content:space-between;align-items:center">'
    +     '<span style="font-size:13px;color:#6b7280">Chủ tài khoản:</span>'
    +     '<span style="font-size:13px;font-weight:700;color:#e2e8f0">Trần Thị Kim Mai</span>'
    +   '</div>'
    + '</div>'
    // Steps
    + '<div style="background:#0d1117;border:1px solid #7c3aed33;border-radius:12px;padding:14px;margin-bottom:14px">'
    +   '<div style="font-size:12px;color:#a78bfa;font-weight:700;margin-bottom:8px">📋 Các bước thực hiện:</div>'
    +   '<div style="font-size:12px;color:#9ca3af;line-height:2">'
    +     '1. Chuyển khoản với nội dung: <span style="color:#c4b5fd;font-weight:700">TEN_GAME MUA KEY</span><br>'
    +     '2. Chụp màn hình biên lai chuyển khoản<br>'
    +     '3. Gửi email kèm biên lai đến:<br>'
    +     '<span style="color:#a78bfa;font-weight:700">tranthikimai4@gmail.com</span><br>'
    +     '4. Nhận mã kích hoạt qua email<br>'
    +     '5. Dùng mã tại mục <b style="color:#60a5fa">Nhập Mã Kích Hoạt</b>'
    +   '</div>'
    + '</div>'
    + '<div style="display:flex;gap:8px">'
    +   '<button onclick="document.getElementById(\'bank-buy-popup\').remove()" style="flex:1;padding:11px;background:#1f2937;color:#9ca3af;border:1px solid #374151;border-radius:10px;cursor:pointer;font-size:13px;font-weight:600">Đóng</button>'
    +   '<button onclick="document.getElementById(\'bank-buy-popup\').remove();showCodeBuyPopup()" style="flex:1;padding:11px;background:linear-gradient(135deg,#1e1235,#2d1a4a);color:#c4b5fd;border:1.5px solid #7c3aed55;border-radius:10px;cursor:pointer;font-size:13px;font-weight:700">🔑 Nhập Mã</button>'
    + '</div>'
    + '</div>';
  document.body.appendChild(overlay);
}

function buyKey(count) {
  count = parseInt(count) || 0;
  if (count <= 0) return;
  var cost = count * 700;
  var tokenAmt = (G.wallet && G.wallet.token) ? G.wallet.token : 0;
  if (tokenAmt < cost) { showError('💸 Không đủ Token! Cần ' + cost.toLocaleString() + ' 🔮'); return; }
  G.wallet.token -= cost;
  G.wallet.key = ((G.wallet.key) || 0) + count;
  var popup = document.getElementById('buy-key-popup');
  if (popup) popup.remove();
  updateUI();
  saveGame(false);
  showNotif('🗝️ Mua ' + count + ' Key thành công!');
  renderBannerPanel();
}

// ═══ DO BANNER PULL ═══════════════════════════════════════════════════════
function doBannerPull(bannerId, count, isFree) {
  var banner = BANNERS.find(function(b) { return b.id === bannerId; });
  if (!banner) return;

  // Starter banner — 10 key pull, permanent close after
  if (banner.isStarter) {
    if (G.bannerStarterDone) { showError('⚠️ Banner Khởi Đầu đã hết!'); return; }
    // Deduct 10 keys like normal
    var keyAmt = (G.wallet && G.wallet.key) ? G.wallet.key : 0;
    if (keyAmt < 10) { showBannerNoKeyPopup(banner, 10); return; }
    G.wallet.key -= 10;
    G.bannerStarterDone = true;
    var pool = _getBannerPool('starter');
    var results = _doPulls(10, pool);
    showBannerResults(results, banner, 0);
    saveGame(false);
    return;
  }

  // Key-based pulls
  var keyAmt = (G.wallet && G.wallet.key) ? G.wallet.key : 0;
  if (keyAmt < count) {
    showBannerNoKeyPopup(banner, count);
    return;
  }

  var freeBonus = count === 100 ? 5 : 0;
  G.wallet.key -= count;
  updateUI();

  var bPool = _getBannerPool(bannerId);
  var results = _doPulls(count + freeBonus, bPool);
  showBannerResults(results, banner, freeBonus);
  saveGame(false);
}

// ═══ NO KEY POPUP ═════════════════════════════════════════════════════════
function showBannerNoKeyPopup(banner, count) {
  var existing = document.getElementById('banner-nokey-popup');
  if (existing) existing.remove();
  var keyAmt = (G.wallet && G.wallet.key) || 0;
  var needed = count - keyAmt;
  var tokenNeeded = needed * 700;

  var overlay = document.createElement('div');
  overlay.id = 'banner-nokey-popup';
  overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.88);z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px;backdrop-filter:blur(6px)';
  overlay.innerHTML =
    '<div style="background:linear-gradient(135deg,#0d1117,#1a0a0a);border:2px solid #f8717166;border-radius:18px;padding:26px 22px;width:100%;max-width:320px;box-shadow:0 0 40px #f8717133">'
    + '<div style="text-align:center;margin-bottom:16px">'
    +   '<div style="font-size:40px;margin-bottom:8px">🗝️</div>'
    +   '<div style="font-size:16px;font-weight:800;color:#f87171">Không đủ Key!</div>'
    +   '<div style="font-size:13px;color:#6b7280;margin-top:4px">Cần <b style="color:#ffd700">' + count + ' 🗝️ Key</b> để quay ' + count + ' lần</div>'
    + '</div>'
    + '<div style="background:#0d1117;border:1px solid #f8717133;border-radius:10px;padding:12px;margin-bottom:14px;font-size:13px">'
    +   '<div style="display:flex;justify-content:space-between;margin-bottom:4px"><span style="color:#9ca3af">Key hiện có:</span><span style="color:#ffd700">' + keyAmt + ' 🗝️</span></div>'
    +   '<div style="display:flex;justify-content:space-between;margin-bottom:4px"><span style="color:#9ca3af">Cần thêm:</span><span style="color:#f87171">' + needed + ' 🗝️</span></div>'
    +   '<div style="display:flex;justify-content:space-between"><span style="color:#9ca3af">Chi phí Token:</span><span style="color:#00f5ff">' + tokenNeeded.toLocaleString() + ' 🔮</span></div>'
    + '</div>'
    + '<div style="display:flex;gap:8px">'
    +   '<button onclick="document.getElementById(\'banner-nokey-popup\').remove()" style="flex:1;padding:10px;background:#1f2937;color:#9ca3af;border:1px solid #374151;border-radius:10px;cursor:pointer;font-size:13px;font-weight:600">Hủy</button>'
    +   '<button onclick="document.getElementById(\'banner-nokey-popup\').remove();showBuyKeyPopup()" style="flex:1;padding:10px;background:linear-gradient(135deg,#1a1000,#2a1a00);color:#ffd700;border:1.5px solid #ffd70066;border-radius:10px;cursor:pointer;font-size:13px;font-weight:700">🗝️ Mua Key</button>'
    + '</div>'
    + '</div>';
  document.body.appendChild(overlay);
}

// ═══ MINING SOUND ═════════════════════════════════════════════════════════
function _playMiningSound() {
  try {
    var ctx = new (window.AudioContext || window.webkitAudioContext)();
    function _hit(t, freq, dur) {
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.4, t + dur * 0.6);
      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
      osc.start(t); osc.stop(t + dur);
    }
    var now = ctx.currentTime;
    // Tiếng đào mỏ: "tunk tunk tunk" 3 nhịp
    _hit(now + 0.00, 280, 0.13);
    _hit(now + 0.18, 260, 0.13);
    _hit(now + 0.36, 300, 0.15);
    _hit(now + 0.55, 240, 0.10);
    _hit(now + 0.68, 320, 0.18);
    // Tiếng kim loại rơi
    var osc2 = ctx.createOscillator();
    var g2 = ctx.createGain();
    osc2.connect(g2); g2.connect(ctx.destination);
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(900, now + 0.9);
    osc2.frequency.exponentialRampToValueAtTime(400, now + 1.3);
    g2.gain.setValueAtTime(0.12, now + 0.9);
    g2.gain.exponentialRampToValueAtTime(0.001, now + 1.3);
    osc2.start(now + 0.9); osc2.stop(now + 1.4);
  } catch(e) {}
}

// ═══ MINING ANIMATION OVERLAY ═════════════════════════════════════════════
function _showMiningAnimation(cb) {
  var anim = document.createElement('div');
  anim.id = 'banner-mining-anim';
  anim.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.96);z-index:10000;display:flex;flex-direction:column;align-items:center;justify-content:center;backdrop-filter:blur(8px)';
  anim.innerHTML =
    '<style>'
    + '@keyframes mineSwing{0%{transform:rotate(-30deg) scale(1)}40%{transform:rotate(30deg) scale(1.1)}70%{transform:rotate(10deg) scale(0.95)}100%{transform:rotate(-30deg) scale(1)}}'
    + '@keyframes mineSpark{0%{opacity:1;transform:scale(0.5) translate(0,0)}100%{opacity:0;transform:scale(1.5) translate(var(--tx),var(--ty))}}'
    + '@keyframes mineRock{0%{transform:translateX(0)}20%{transform:translateX(-4px) rotate(-2deg)}40%{transform:translateX(4px) rotate(2deg)}60%{transform:translateX(-3px)}80%{transform:translateX(3px) rotate(-1deg)}100%{transform:translateX(0)}}'
    + '@keyframes mineGlow{0%,100%{box-shadow:0 0 18px #fbbf2455}50%{box-shadow:0 0 40px #fbbf24cc,0 0 80px #fbbf2444}}'
    + '@keyframes mineFadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}'
    + '@keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}'
    + '</style>'
    + '<div style="text-align:center;animation:mineFadeIn 0.4s ease">'
    +   '<div style="font-size:72px;animation:mineSwing 0.55s ease-in-out infinite;display:inline-block;transform-origin:bottom center;margin-bottom:8px">⛏️</div>'
    +   '<div style="position:relative;width:90px;height:70px;margin:0 auto 14px">'
    +     '<div style="font-size:48px;animation:mineRock 0.55s ease-in-out infinite">🪨</div>'
    +     '<div style="position:absolute;top:10px;right:0;font-size:14px;animation:mineSpark 0.55s ease-out infinite;--tx:18px;--ty:-12px">✨</div>'
    +     '<div style="position:absolute;top:5px;left:5px;font-size:12px;animation:mineSpark 0.55s 0.12s ease-out infinite;--tx:-14px;--ty:-18px">💥</div>'
    +     '<div style="position:absolute;bottom:8px;right:4px;font-size:10px;animation:mineSpark 0.55s 0.25s ease-out infinite;--tx:10px;--ty:10px">⭐</div>'
    +   '</div>'
    +   '<div style="font-size:16px;font-weight:800;background:linear-gradient(90deg,#fbbf24,#4ade80,#60a5fa,#fbbf24);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 1.2s linear infinite;letter-spacing:2px">ĐANG ĐÀO MỎ...</div>'
    +   '<div style="font-size:12px;color:#6b7280;margin-top:8px;letter-spacing:1px">Tìm kiếm kim loại quý hiếm</div>'
    +   '<div style="display:flex;gap:6px;justify-content:center;margin-top:16px" id="mining-dots">'
    +     '<div style="width:8px;height:8px;border-radius:50%;background:#fbbf24;animation:mineSpark 0.8s 0s infinite;--tx:0px;--ty:-6px"></div>'
    +     '<div style="width:8px;height:8px;border-radius:50%;background:#4ade80;animation:mineSpark 0.8s 0.2s infinite;--tx:0px;--ty:-6px"></div>'
    +     '<div style="width:8px;height:8px;border-radius:50%;background:#60a5fa;animation:mineSpark 0.8s 0.4s infinite;--tx:0px;--ty:-6px"></div>'
    +   '</div>'
    + '</div>';
  document.body.appendChild(anim);
  _playMiningSound();
  setTimeout(function() {
    var el = document.getElementById('banner-mining-anim');
    if (el) { el.style.transition = 'opacity 0.3s'; el.style.opacity = '0'; setTimeout(function(){ if(el) el.remove(); cb(); }, 300); }
    else cb();
  }, 1600);
}

// ═══ SHOW BANNER RESULTS ══════════════════════════════════════════════════
function showBannerResults(results, banner, freeBonus) {
  _showMiningAnimation(function() { _showBannerResultsPopup(results, banner, freeBonus); });
}

function _showBannerResultsPopup(results, banner, freeBonus) {
  // Tally
  var tally = {};
  results.forEach(function(id) { tally[id] = (tally[id] || 0) + 1; });

  var rarityOrder = {mythic:0, legendary:1, epic:2, rare:3, uncommon:4, common:5};
  var sorted = Object.entries(tally).sort(function(a, b) {
    var ma = BANNER_METALS.find(function(x) { return x.id === a[0]; });
    var mb = BANNER_METALS.find(function(x) { return x.id === b[0]; });
    return (rarityOrder[ma ? ma.rarity : 'common'] || 5) - (rarityOrder[mb ? mb.rarity : 'common'] || 5);
  });

  // Add to inventory
  var totalTokens = 0;
  results.forEach(function(id) {
    var m = BANNER_METALS.find(function(x) { return x.id === id; });
    if (!m) return;
    totalTokens += m.tokenValue;
    if (G.inventory.length < (G.invMaxSlots || 50)) {
      G.inventory.push({
        id: 'metal_' + id + '_' + Date.now() + '_' + Math.floor(Math.random()*99999),
        itemId: 'banner_metal_' + id,
        name: m.name,
        icon: m.icon,
        tier: m.rarity,
        boughtPrice: 0,
        recyclePoints: 0,
        tokenValue: m.tokenValue,
        isBannerMetal: true,
        metalId: m.id,
        color: m.color,
        obtainedAt: Date.now(),
      });
    }
  });

  // Remove old popup
  var existing = document.getElementById('banner-result-popup');
  if (existing) existing.remove();

  var rarityColors = {common:'#9ca3af', uncommon:'#4ade80', rare:'#60a5fa', epic:'#a78bfa', legendary:'#f472b6', mythic:'#ffd700'};

  var resultsHtml = '';
  sorted.forEach(function(entry) {
    var id = entry[0], cnt = entry[1];
    var m = BANNER_METALS.find(function(x) { return x.id === id; });
    if (!m) return;
    var rc = rarityColors[m.rarity] || '#9ca3af';
    resultsHtml +=
      '<div style="display:flex;align-items:center;gap:10px;padding:8px 12px;background:' + m.color + '11;border:1px solid ' + m.color + '44;border-radius:10px;margin-bottom:6px">'
      + '<span style="font-size:24px">' + m.icon + '</span>'
      + '<div style="flex:1">'
      +   '<div style="font-size:14px;font-weight:700;color:' + m.color + '">' + m.name
      +     ' <span style="font-size:10px;color:' + rc + ';background:' + rc + '22;padding:1px 6px;border-radius:8px">' + m.rarity + '</span></div>'
      +   '<div style="font-size:11px;color:#6b7280">+' + m.tokenValue + ' 🔮 mỗi cái · Bán tại Kho Đồ</div>'
      + '</div>'
      + '<div style="font-size:20px;font-weight:900;color:' + m.color + '">×' + cnt + '</div>'
      + '</div>';
  });

  var overlay = document.createElement('div');
  overlay.id = 'banner-result-popup';
  overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.92);z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px;backdrop-filter:blur(8px)';
  overlay.innerHTML =
    '<div style="background:linear-gradient(135deg,#0d1117,#111827);border:2px solid ' + banner.border + '55;border-radius:20px;padding:24px 20px;width:100%;max-width:400px;max-height:88vh;overflow-y:auto">'
    + '<div style="text-align:center;margin-bottom:16px">'
    +   '<div style="font-size:40px;margin-bottom:6px">' + banner.icon + '</div>'
    +   '<div style="font-size:17px;font-weight:800;color:' + banner.color + '">' + banner.name + '</div>'
    +   '<div style="font-size:13px;color:#6b7280">Quay ' + results.length + ' lần' + (freeBonus > 0 ? ' (+' + freeBonus + ' miễn phí!)' : '') + '</div>'
    + '</div>'
    + '<div style="margin-bottom:14px">' + resultsHtml + '</div>'
    + '<div style="background:#0d1117;border:1px solid #4ade8033;border-radius:10px;padding:12px;text-align:center;margin-bottom:14px">'
    +   '<div style="font-size:12px;color:#9ca3af;margin-bottom:4px">Tổng giá trị có thể bán</div>'
    +   '<div style="font-size:22px;font-weight:900;color:#4ade80">+' + totalTokens.toLocaleString() + ' 🔮</div>'
    +   '<div style="font-size:11px;color:#6b7280;margin-top:2px">Kim loại đã vào Kho Đồ — bán để nhận Token</div>'
    + '</div>'
    + '<button onclick="document.getElementById(\'banner-result-popup\').remove();renderBannerPanel()" '
    + 'style="width:100%;padding:13px;background:linear-gradient(135deg,#111827,#0d1117);color:' + banner.color + ';border:2px solid ' + banner.border + '55;border-radius:12px;cursor:pointer;font-size:15px;font-weight:700">'
    + '✅ Đóng</button>'
    + '</div>';
  document.body.appendChild(overlay);
}

// ═══ EXPOSE PURCHASE FUNCTIONS ════════════════════════════════════════════
window.showRealBuyPopup = showRealBuyPopup;
window.showCodeBuyPopup = showCodeBuyPopup;
window.showBankBuyPopup = showBankBuyPopup;
window.redeemCode = redeemCode;
window.formatCodeInput = formatCodeInput;

// ═══ SELL BANNER METAL FROM INVENTORY ════════════════════════════════════
function sellBannerMetal(invIdx) {
  var item = G.inventory[invIdx];
  if (!item || !item.isBannerMetal) return;
  var tokenVal = item.tokenValue || 0;
  G.wallet.token = (G.wallet.token || 0) + tokenVal;
  G.inventory.splice(invIdx, 1);
  updateUI();
  saveGame(false);
  showNotif(item.icon + ' Bán ' + item.name + ' +' + tokenVal + ' 🔮');
  if (typeof renderInventory === 'function') renderInventory();
}
