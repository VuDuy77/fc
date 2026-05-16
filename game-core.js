/* ┌─────────────────────────────────────────────────────────────────────────┐
   │  MODULE 03 · CORE UI  —  fmt · getRate · updateUI · switchTab · notif  │
   └─────────────────────────────────────────────────────────────────────────┘ */
function getRate() {
  let r = 0;
  G.slots.forEach(s => { if (s && ALL_M[s.machine]) r += ALL_M[s.machine].rate; });
  // Factory Plus / Premium: x2 income
  if (G.factoryPlus || G.factoryPremium) r *= 2;
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

