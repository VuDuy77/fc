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
        ${(G.debtEvadeTickets||0) > 0 ? `<button onclick="useEvadeTicketFromTab('loan')" style="margin-top:10px;width:100%;padding:10px;background:#1a1500;color:#ffd700;border:1px solid #b45309;border-radius:8px;cursor:pointer;font-size:13px;font-weight:700">🎫 Dùng Vé Xóa Nợ (còn ${G.debtEvadeTickets||0} vé)</button>` : ''}
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

function useEvadeTicket(invIdx) {
  const invItem = G.inventory[invIdx];
  if (!invItem || !invItem.isTicket) return;
  // Show selection popup
  var overlay = document.createElement('div');
  overlay.id = 'evade-ticket-popup';
  overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.85);z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px';
  overlay.innerHTML =
    '<div style="background:#0d1117;border:2px solid #b4530966;border-radius:16px;padding:24px 20px;width:100%;max-width:320px;position:relative">'
    + '<button onclick="document.getElementById(\'evade-ticket-popup\').remove()" style="position:absolute;top:10px;right:12px;background:#1f2937;border:1px solid #374151;color:#9ca3af;border-radius:7px;padding:3px 9px;cursor:pointer;font-size:14px;font-weight:700">✕</button>'
    + '<div style="text-align:center;margin-bottom:18px">'
      + '<div style="font-size:40px;margin-bottom:6px">🎫</div>'
      + '<div style="font-size:16px;font-weight:800;color:#ffd700;margin-bottom:4px">Vé Trốn Thuế & Nợ</div>'
      + '<div style="font-size:12px;color:#6b7280">Chọn cách sử dụng vé này</div>'
    + '</div>'
    + '<button onclick="applyEvadeTicket(' + invIdx + ',\'tax\')" style="width:100%;padding:12px;background:#1a1500;color:#ffd700;border:1.5px solid #b45309;border-radius:10px;cursor:pointer;font-size:14px;font-weight:700;margin-bottom:10px">🧾 Xóa 1 Hóa Đơn Thuế</button>'
    + '<button onclick="applyEvadeTicket(' + invIdx + ',\'loan\')" style="width:100%;padding:12px;background:#1a0f00;color:#fb923c;border:1.5px solid #92400e;border-radius:10px;cursor:pointer;font-size:14px;font-weight:700">🏦 Xóa Khoản Nợ Hiện Tại</button>'
    + '</div>';
  document.body.appendChild(overlay);
}

function applyEvadeTicket(invIdx, type) {
  const invItem = G.inventory[invIdx];
  if (!invItem || !invItem.isTicket) return;

  if (type === 'tax') {
    if (!G.tax || !G.tax.bills) { showError('⚠️ Không có hóa đơn thuế nào!'); return; }
    const unpaid = G.tax.bills.filter(b => !b.paid);
    if (unpaid.length === 0) { showError('✅ Không có hóa đơn thuế chưa nộp!'); return; }
    // Pay off first unpaid bill for free
    unpaid[0].paid = true;
    unpaid[0].paidAt = Date.now();
    G.inventory.splice(invIdx, 1);
    G.taxEvadeTickets = Math.max(0, (G.taxEvadeTickets||0) - 1);
    var popup = document.getElementById('evade-ticket-popup');
    if (popup) popup.remove();
    showNotif('🎫 Vé đã xóa hóa đơn thuế "' + unpaid[0].item + '"!');
    updateUI(); saveGame(false);
    renderTaxPanel(); renderTaxBadge();
    if (document.getElementById('panel-inventory').classList.contains('active')) renderInventory();
  } else if (type === 'loan') {
    if (!G.loan || !G.loan.active) { showError('⚠️ Bạn không có khoản nợ nào!'); return; }
    const wasLocked = G.loan.lockedFeatures;
    const prevCount = G.loan.loanCount || 0;
    G.loan = { active:false, principal:0, interest:0, borrowedAt:0, lockedFeatures:false, bankruptTriggered:false, loanCount: prevCount };
    if (wasLocked) { applyLoanLockState(false); }
    G.inventory.splice(invIdx, 1);
    G.debtEvadeTickets = Math.max(0, (G.debtEvadeTickets||0) - 1);
    var popup = document.getElementById('evade-ticket-popup');
    if (popup) popup.remove();
    showNotif('🎫 Vé đã xóa toàn bộ khoản nợ miễn phí!');
    updateUI(); saveGame(false);
    renderLoanPanel();
    if (document.getElementById('panel-inventory').classList.contains('active')) renderInventory();
  }
}

function useEvadeTicketFromTab(type) {
  // Find first ticket in inventory
  var ticketIdx = G.inventory.findIndex(function(it){ return it.isTicket; });
  if (ticketIdx === -1) {
    // No ticket object in inventory but counter says there are — use counter directly
    if (type === 'tax') {
      if (!G.tax || !G.tax.bills) { showError('⚠️ Không có hóa đơn thuế!'); return; }
      var unpaid2 = G.tax.bills.filter(function(b){ return !b.paid; });
      if (!unpaid2.length) { showError('✅ Không có hóa đơn chưa nộp!'); return; }
      unpaid2[0].paid = true; unpaid2[0].paidAt = Date.now();
      G.taxEvadeTickets = Math.max(0, (G.taxEvadeTickets||0) - 1);
      showNotif('🎫 Vé đã xóa hóa đơn thuế!');
      updateUI(); saveGame(false); renderTaxPanel(); renderTaxBadge();
    } else {
      if (!G.loan || !G.loan.active) { showError('⚠️ Không có khoản nợ!'); return; }
      var wasLocked2 = G.loan.lockedFeatures;
      var prevCount2 = G.loan.loanCount || 0;
      G.loan = { active:false, principal:0, interest:0, borrowedAt:0, lockedFeatures:false, bankruptTriggered:false, loanCount:prevCount2 };
      if (wasLocked2) applyLoanLockState(false);
      G.debtEvadeTickets = Math.max(0, (G.debtEvadeTickets||0) - 1);
      showNotif('🎫 Vé đã xóa khoản nợ!');
      updateUI(); saveGame(false); renderLoanPanel();
    }
    return;
  }
  applyEvadeTicket(ticketIdx, type);
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
    ${(G.taxEvadeTickets||0) > 0 && unpaid.length > 0 ? `<button onclick="useEvadeTicketFromTab('tax')" style="margin-top:8px;width:100%;padding:9px;background:#1a1500;color:#ffd700;border:1px solid #b45309;border-radius:6px;cursor:pointer;font-size:13px">🎫 Dùng Vé Trốn Thuế (còn ${G.taxEvadeTickets||0} vé)</button>` : ''}
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
  // Update token display in titlebar
  const tokenAmt = G.wallet && G.wallet.token ? G.wallet.token : 0;
  const hdrToken = document.getElementById('hdr-token');
  const hdrTokenVal = document.getElementById('hdr-token-val');
  if (hdrToken) hdrToken.style.display = tokenAmt > 0 ? 'inline-flex' : 'none';
  if (hdrTokenVal) hdrTokenVal.textContent = tokenAmt.toLocaleString();
  if (document.getElementById('panel-stats').classList.contains('active')) renderStats();
}

// ══════════════════════════════════════════════════════════════
// PROFILE FUNCTIONS
// ══════════════════════════════════════════════════════════════
function getNameTagHTML(name) {
  if (G.factoryPremium) {
    return '<span class="nametag-wrap">'
      + '<span class="nametag-glitchy" data-text="' + name + '">' + name + '</span>'
      + '<span class="nametag-check nametag-check--premium" title="Factory Premium">\u2714</span>'
      + '</span>';
  } else if (G.factoryPlus) {
    return '<span class="nametag-wrap">'
      + '<span class="nametag-sunny">' + name + '</span>'
      + '<span class="nametag-check nametag-check--plus" title="Factory Plus">\u2714</span>'
      + '</span>';
  }
  return '<span>' + name + '</span>';
}

function renderProfileDisplay() {
  var nameEl = document.getElementById('profile-name-display');
  var bioEl = document.getElementById('profile-bio-display');
  if (!nameEl) return;
  var name = G.playerName || 'PlayerName';
  nameEl.innerHTML = getNameTagHTML(name);
  if (bioEl) bioEl.textContent = G.playerBio || '';
}

function openProfileEdit() {
  var form = document.getElementById('profile-edit-form');
  var nameInp = document.getElementById('profile-name-input');
  var bioInp = document.getElementById('profile-bio-input');
  if (!form) return;
  if (nameInp) nameInp.value = G.playerName || 'PlayerName';
  if (bioInp) bioInp.value = G.playerBio || '';
  form.style.display = 'block';
  if (nameInp) nameInp.focus();
}

function closeProfileEdit() {
  var form = document.getElementById('profile-edit-form');
  if (form) form.style.display = 'none';
}

function saveProfileEdit() {
  var nameInp = document.getElementById('profile-name-input');
  var bioInp = document.getElementById('profile-bio-input');
  var name = (nameInp ? nameInp.value.trim() : '') || 'PlayerName';
  var bio = bioInp ? bioInp.value.trim() : '';
  G.playerName = name.substring(0, 24);
  G.playerBio = bio.substring(0, 80);
  closeProfileEdit();
  renderProfileDisplay();
  saveGame(false);
  showNotif('✅ Profile đã được lưu!');
}

function renderStats() {
  const vm = G.valueMultiplier || 1;
  const mins = (G.playedSeconds||0) / 60;
  document.getElementById('s-total').textContent = fmt(G.totalEarned);
  document.getElementById('s-rate').textContent = fmt(getRate() * vm)+'/s';
  document.getElementById('s-mach').textContent = getMachineCount();
  document.getElementById('s-slots').textContent = getMachineCount()+'/'+G.ownedSlots;

  // ── Render profile name + bio + nametag ──
  renderProfileDisplay();
  renderProfileRankCard();


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
  if (tab==='stats') { renderStats(); renderProfileDisplay(); }
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

