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

// Re-apply all mat bonuses from purchase history (called after MAT_ITEMS is defined)
(function applyAllMatBonusesFromHistory() {
  if (!window._matPurchasedToReapply) return;
  const purchased = window._matPurchasedToReapply;
  window._matPurchasedToReapply = null;
  // Reset matBonuses to defaults before re-applying
  const def = defaultState().matBonuses;
  G.matBonuses.speedBoost     = def.speedBoost;
  G.matBonuses.slotBoost      = 0;
  G.matBonuses.lotteryLuckBonus = def.lotteryLuckBonus;
  G.matBonuses.recycleBoost   = def.recycleBoost;
  G.matBonuses.powerEfficiency = def.powerEfficiency;
  // Re-apply each item N times
  Object.entries(purchased).forEach(([id, count]) => {
    const item = MAT_ITEMS.find(i => i.id === id);
    if (!item || !count) return;
    // For cumulative effects: re-apply count times
    // But slot expander and network booster have side effects — skip slot/inet re-apply
    // (ownedSlots and inetExpiry are already saved in G directly)
    for (let n = 0; n < count; n++) {
      if (id === 'mat_slotexpander' || id === 'mat_netbooster') {
        // These are already persisted in G.ownedSlots / G.inetExpiry — only update the bonus counter
        if (id === 'mat_slotexpander') G.matBonuses.slotBoost = (G.matBonuses.slotBoost||0) + 2;
        // netbooster: no persistent bonus field needed (inetExpiry already saved)
      } else {
        item.apply(G);
      }
    }
  });
})();

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
  const allowedTabs = ['electricity', 'bank', 'settings', 'updatelog', 'rank'];
  const allTabs = ['base','shop','bank','slots','stats','market','inventory','rshop','vipshop','computer','lottery','electricity','matshop','settings','updatelog','rank','tax'];
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
    G.powerOutageTriggered = true;
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
  // Mark outage system as active so fuel bar shows immediately
  G.powerOutageTriggered = true;
  taxIssueBill(fuel.icon + ' ' + fuel.name, fuel.price);
  const totalRemaining = G.powerSeconds;
  showNotif(fuel.icon+' '+fuel.name+' +'+Math.round(fuel.seconds/60)+' phút! ⛽ Còn '+fmtSeconds(totalRemaining)+' xăng');
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
        <div class="power-bar-wrap" style="height:24px;margin-bottom:8px;border-radius:8px">
          <div id="ep-bar-min" class="power-bar-fill" style="height:100%;transition:width 1s linear;border-radius:8px"></div>
        </div>
        <!-- thanh giây trong phút hiện tại -->
        <div style="font-size:10px;color:#4b5563;margin-bottom:3px;display:flex;justify-content:space-between">
          <span>Giây trong phút này</span><span id="ep-sec-label"></span>
        </div>
        <div class="power-bar-wrap" style="height:14px;margin-bottom:4px;border-radius:6px">
          <div id="ep-bar-sec" class="power-bar-fill" style="height:100%;background:#60a5fa;transition:width 1s linear;border-radius:6px"></div>
        </div>
      ` : `
        <div style="font-size:12px;color:#4b5563;margin-bottom:6px">Hệ thống chạy bình thường</div>
        <div style="font-size:11px;color:#374151;margin-bottom:6px">⚠️ Sẽ mất điện sau 30 phút chơi</div>
        <div style="font-size:11px;color:#6b7280;margin-bottom:4px;display:flex;justify-content:space-between">
          <span>Thời gian đến mất điện</span>
          <span id="ep-countdown-label" style="color:#fbbf24"></span>
        </div>
        <div class="power-bar-wrap" style="height:24px;margin-bottom:8px;border-radius:8px">
          <div id="ep-bar-session-min" class="power-bar-fill" style="height:100%;transition:width 1s linear;border-radius:8px"></div>
        </div>
        <div style="font-size:10px;color:#4b5563;margin-bottom:3px;display:flex;justify-content:space-between">
          <span>Giây trong phút này</span><span id="ep-sec-session-label"></span>
        </div>
        <div class="power-bar-wrap" style="height:14px;margin-bottom:4px;border-radius:6px">
          <div id="ep-bar-session-sec" class="power-bar-fill" style="height:100%;background:#60a5fa;transition:width 1s linear;border-radius:6px"></div>
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
      ${G.powerOutageTriggered&&G.powerSeconds>0?`<div style="font-size:12px;color:#4ade80;margin-bottom:10px;padding:8px;background:#0f1f0f;border-radius:6px;border:1px solid #1e3a1e">⛽ Xăng hiện có: <span style="font-weight:700">${fmtSeconds(G.powerSeconds)}</span></div>`:''}
      ${FUEL_TYPES.map(f => {
        const canAfford = G.money >= f.price;
        const ppm = (f.seconds/60/f.price*1000).toFixed(1);
        const futureTotal = (G.powerSeconds||0) + f.seconds;
        const timeLabel = G.powerOutageTriggered
          ? `<div style="font-size:10px;color:#4ade80;margin-top:2px">→ Sau khi mua: <b>${fmtSeconds(futureTotal)}</b></div>`
          : `<div style="font-size:10px;color:#6b7280;margin-top:2px">⏱ Thời lượng: <b>${fmtSeconds(f.seconds)}</b></div>`;
        return `<div class="fuel-card ${!canAfford?'fuel-disabled':''} ${f.id==='f3'?'fuel-best':''}" onclick="${canAfford?`buyFuelFromPanel('${f.id}')`:''}" style="border-color:${f.color}44">
          <div style="display:flex;align-items:center;gap:10px">
            <div style="font-size:26px">${f.icon}</div>
            <div style="flex:1">
              <div style="font-size:13px;color:#e2e8f0;font-weight:bold">${f.name}
                ${f.badge?`<span style="font-size:9px;background:${f.color}22;color:${f.color};border:1px solid ${f.color}44;padding:1px 6px;border-radius:4px;margin-left:5px">${f.badge}</span>`:''}
              </div>
              <div style="font-size:11px;color:#6b7280">${f.desc} · ${ppm}s/$K</div>
              ${timeLabel}
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
  // Mark outage system as active so fuel bar shows immediately
  G.powerOutageTriggered = true;
  // If power was out, restore
  if (outageOverlayVisible) hideOutageScreen();
  applyPowerOutageLock(false); // Restore all tabs
  taxIssueBill(fuel.icon + ' ' + fuel.name, fuel.price);
  const totalRemaining = G.powerSeconds;
  showNotif(fuel.icon+' '+fuel.name+' +'+Math.round(fuel.seconds/60)+'min! ⛽ Còn '+fmtSeconds(totalRemaining)+' xăng');
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
  // --- FUEL DRAIN (luôn drain nếu đã mua xăng, không cần chờ outage) ---
  if (G.powerSeconds > 0 && !G.manualPowerOff) {
    // Đánh dấu outage đã triggered ngay khi có xăng để UI hiện thanh xăng
    if (!G.powerOutageTriggered) {
      G.powerOutageTriggered = true;
      // Reset session counter vì giờ dùng fuel hệ
      sessionSecondsPlayed = 9999; // skip session-based trigger
    }
    const drainRate = (G.matBonuses && G.matBonuses.powerEfficiency) || 1;
    G.powerSeconds = Math.max(0, G.powerSeconds - drainRate);
    if (G.powerSeconds === 5*60) showError('⚠️ Còn 5 phút điện! Mua thêm xăng!');
    if (G.powerSeconds === 60)   showError('🔴 Còn 1 phút điện!');
    if (G.powerSeconds === 0) {
      powerState = 'outage';
      applyPowerOutageLock(true);
      showOutageScreen();
    }
    updateElecPanelLive();

  } else if (!G.powerOutageTriggered) {
    // --- SESSION COUNTDOWN (chỉ chạy khi chưa có xăng và chưa từng outage) ---
    if (hasPower()) sessionSecondsPlayed += 1;
    const sessionMinutes = sessionSecondsPlayed / 60;

    if (sessionMinutes >= 28 && !G._warnedPower) {
      G._warnedPower = true;
      showError('⚠️ Còn ~2 phút điện! Mua xăng ngay tại tab ⚡ Điện!');
    }
    if (sessionMinutes >= 30) {
      triggerOutage();
    }
    updateElecPanelLive();
  }

  // Always update elec panel live every second
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
  // If player has fuel pre-purchased, activate the fuel system
  if (G.powerSeconds > 0 && !G.powerOutageTriggered) {
    G.powerOutageTriggered = true;
  }
  if (G.manualPowerOff) {
    applyPowerOutageLock(true);
    showManualPowerOff();
    switchTab('electricity');
  } else if (G.powerOutageTriggered && G.powerSeconds <= 0) {
    applyPowerOutageLock(true);
    showOutageScreen();
    switchTab('electricity'); // force to electricity tab on load if power is out
  } else if (G.powerOutageTriggered && G.powerSeconds > 0) {
    // Has fuel — make sure tabs are unlocked
    applyPowerOutageLock(false);
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
  if (overlay) { overlay.classList.add('is-open'); renderTutStep(); }
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
    setTimeout(() => {
      overlay.classList.remove('is-open');
      overlay.style.opacity = '';
      overlay.style.transition = '';
    }, 400);
  }
  showNotif('🎉 Hướng dẫn hoàn thành! Chúc bạn chơi vui!');
}

// Đóng hướng dẫn bằng phím Escape
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  const overlay = document.getElementById('tutorial-overlay');
  if (overlay && overlay.classList.contains('is-open')) finishTutorial();
});

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

  // Scale text based on win level
  if (isMega) {
    textEl.textContent = '🌟 MEGA JACKPOT! 🌟';
  } else if (isBigWin) {
    textEl.textContent = '🎉 JACKPOT! 🎉';
  } else {
    textEl.textContent = '🎊 TRÚNG THƯỞNG! 🎊';
  }
  container.innerHTML = '';

  // ── Confetti (scale with win size) ──
  const pieces = isBigWin ? 180 : 60;
  const colors = isBigWin
    ? ['#e879f9','#60a5fa','#4ade80','#fbbf24','#f87171','#a78bfa','#fde68a','#34d399','#fb923c','#fff']
    : ['#4ade80','#60a5fa','#fbbf24','#a78bfa','#fde68a'];
  for (let i = 0; i < pieces; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.cssText = [
      'left:' + Math.random()*100 + '%',
      'background:' + colors[Math.floor(Math.random()*colors.length)],
      'width:' + (isBigWin ? 5+Math.random()*12 : 4+Math.random()*8) + 'px',
      'height:' + (isBigWin ? 5+Math.random()*12 : 4+Math.random()*8) + 'px',
      'border-radius:' + (Math.random()>0.5?'50%':'2px'),
      '--dur:' + (isBigWin ? 2+Math.random()*3 : 1.2+Math.random()*1.8) + 's',
      '--delay:' + (Math.random()*(isBigWin?1.5:0.6)) + 's',
    ].join(';');
    container.appendChild(piece);
  }

  overlay.style.display = 'block';

  if (isBigWin) {
    _triggerBigWinEffects(isMega, profit);
  }

  const duration = isBigWin ? 5500 : 2500;
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
  // Note: jackpot explosion is now triggered directly inside spinLottery for all win levels
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
  display:none; position:fixed; top:0; right:0; bottom:0; left:0; z-index:99999;
  background:rgba(0,0,0,0.75); backdrop-filter:blur(6px);
  animation:bjOverlayIn 0.3s ease; pointer-events:none;
}
#bj-overlay.active { display:block; }

#bj-card {
  pointer-events:auto;
  position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
  width:92vw; max-width:480px;
  background:linear-gradient(135deg,#0a0015 0%,#130025 40%,#0a001a 70%,#050010 100%);
  border-radius:24px; padding:32px 28px 28px;
  box-shadow:0 0 0 1px rgba(251,191,36,0.4),0 0 60px rgba(251,191,36,0.25),0 30px 80px rgba(0,0,0,0.8);
  text-align:center; overflow:hidden; position:relative;
}
#bj-card.entering { animation:bjCardIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards; }
#bj-card.leaving  { animation:bjCardOut 0.4s ease forwards; }

#bj-bg-glow {
  position:absolute; top:-40px; right:-40px; bottom:-40px; left:-40px; border-radius:50%;
  background:radial-gradient(ellipse at center,rgba(251,191,36,0.15) 0%,transparent 70%);
  pointer-events:none; animation:bjGlitter 3s ease infinite; background-size:200%;
}
#bj-border-ring {
  position:absolute; top:-2px; right:-2px; bottom:-2px; left:-2px; border-radius:26px;
  background:linear-gradient(135deg,#fbbf24,#f59e0b,#e879f9,#60a5fa,#4ade80,#fbbf24);
  z-index:-1;
}


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
  position:absolute; top:0; right:0; bottom:0; left:0; pointer-events:none; overflow:hidden;
}
.bj-fw { position:absolute; width:8px; height:8px; border-radius:50%;
  animation:bjFirework var(--bfd,1.5s) var(--bfdelay,0s) ease-out forwards; }
.bj-sparkle { position:absolute; font-size:20px; animation:bjSparkle var(--spd,1.5s) var(--spdelay,0s) ease-in-out infinite; }
#bj-money-rain { position:absolute; top:0; right:0; bottom:0; left:0; pointer-events:none; overflow:hidden; }
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
  div.addEventListener('click', (e) => {
    if (e.target === div) closeBJOverlay();
  });
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
  /* @property removed for iOS12 compatibility */
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
    setTimeout(() => { initLotteryLiveBanner(); if (typeof renderLottery === 'function') renderLottery(); }, 100);
  }
  if(tab === 'settings') {
    if (typeof applySettingsToUI === 'function') applySettingsToUI();
    updateSettingsSaveInfo();
    if (typeof updateResetPwStatus === 'function') updateResetPwStatus();
    const tmEl = document.getElementById('settings-total-machines');
    if(tmEl && window.G) tmEl.textContent = (G.slots ? G.slots.filter(Boolean).length : 0) + ' máy';
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
  if(qEl) qEl.value = _gameSettings['gfx-quality'] || 1;
  applyQualityPreset(_gameSettings['gfx-quality'] || 1);
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
    *:not(.settings-toggle):not(.settings-toggle *):not(.toggle-switch):not(.toggle-switch *),
    *:not(.settings-toggle):not(.settings-toggle *):not(.toggle-switch):not(.toggle-switch *)::before,
    *:not(.settings-toggle):not(.settings-toggle *):not(.toggle-switch):not(.toggle-switch *)::after {
      animation:none!important; animation-duration:0s!important; transition:none!important;
    }
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
  val = parseInt(val, 10);
  if (isNaN(val) || val < 1) val = 1;
  if (val > 3) val = 3;
  const labels = {1:'Thấp', 2:'Trung bình', 3:'Cao'};
  const qlEl = document.getElementById('gfx-quality-val');
  const qSlider = document.getElementById('gfx-quality');
  if (qSlider) qSlider.value = String(val);
  if (qlEl) qlEl.textContent = labels[val] || 'Cao';
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

  `;
  document.head.appendChild(style);
})();
