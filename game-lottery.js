// ═══ LOTTERY ══════════════════════════════════════════════════════
// lotteryBet / lotteryHistory / lotteryMode stored in G for localStorage
let lotterySpinning = false;

function getLotteryBet()   { return G.lotteryBet  || 10; }
function setLotteryBet(v)  { G.lotteryBet = v; }
function getLotteryMode()  { return G.lotteryMode  || 'jackpot'; }
function setLotteryMode(m) { G.lotteryMode = m; }

// ── Prize tables ─────────────────────────────────────────────────
// run = số bóng có giá trị GIỐNG NHAU nhiều nhất (2=đôi, 3=tam, 4=tứ quý, 5=ngũ linh)
const JACKPOT_MULTS = { 2: 40, 3: 200, 4: 800, 5: 2000 };
const MEGA_MULTS    = { 2: 280, 3: 1400, 4: 5600, 5: 14000 };

function getMults() { return getLotteryMode()==='mega' ? MEGA_MULTS : JACKPOT_MULTS; }

function getMultiplier(run) {
  const t = getMults();
  const base = t[Math.min(run,5)] || 0;
  if (base === 0) return 0;
  return base + ((G.matBonuses&&G.matBonuses.lotteryLuckBonus)||0);
}

// ── Match logic: tìm số xuất hiện nhiều nhất ─────────────────────
// Trả về số lần xuất hiện nhiều nhất, chỉ tính >= 2 (đôi trở lên)
function getBestMatch(nums) {
  const freq = {};
  nums.forEach(n => { freq[n] = (freq[n]||0) + 1; });
  let maxCount = 0, winVal = null;
  Object.entries(freq).forEach(([val, cnt]) => {
    if (cnt > maxCount || (cnt === maxCount && winVal === null)) {
      maxCount = cnt; winVal = Number(val);
    }
  });
  return maxCount >= 2 ? { maxCount, winVal } : { maxCount: 0, winVal: null };
}

// Alias để không phá code cũ gọi getLongestConsecutiveRun
function getLongestConsecutiveRun(nums) {
  return getBestMatch(nums).maxCount;
}

// ── Number pool ───────────────────────────────────────────────────
function generatePool() {
  if (getLotteryMode() === 'mega') {
    // HARDER x3 cho mega: pool 1-300, rút CÓ TRÙNG (with replacement)
    return Array.from({length:300}, (_,i) => (i+1)*10);
  }
  // HARDER x3: pool 1-300, rút có thể trùng (with replacement)
  return Array.from({length:300}, (_,i) => i+1);
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
    const jTitle = jEl.querySelector('div:nth-child(2)');
    if (jTitle) jTitle.style.color = isMega ? '#6b7280' : '#c4b5fd';
  }
  if (mEl) {
    mEl.style.border = isMega ? '2px solid #d97706' : '2px solid #1f2937';
    mEl.style.background = isMega ? 'linear-gradient(135deg,#1a1000,#0d0d00)' : '#111827';
    const mTitle = mEl.querySelector('div:nth-child(2)');
    if (mTitle) mTitle.style.color = isMega ? '#fbbf24' : '#6b7280';
  }

  // Spin button color
  const btn = document.getElementById('lottery-spin-btn');
  if (btn) {
    btn.style.background = isMega
      ? 'linear-gradient(135deg,#3a2a00,#1a1500)'
      : 'linear-gradient(135deg,#3a1a5a,#1a1a4a)';
    btn.style.color   = isMega ? '#fbbf24' : '#c4b5fd';
    btn.style.borderColor = isMega ? '#d9770666' : '#7c3aed66';
    if (!btn.disabled) btn.textContent = isMega ? '🌟 QUAY MEGA365' : '🎰 QUAY LIVE JACKPOT365';
  }

  // Mode labels
  const lbl = document.getElementById('lottery-mode-label');
  const sub = document.getElementById('lottery-mode-sub');
  if (lbl) { lbl.textContent = isMega ? 'MEGA365' : 'LIVE JACKPOT365'; lbl.style.color = isMega ? '#fbbf24' : '#c4b5fd'; }
  if (sub) sub.textContent = isMega ? 'KẾT QUẢ — MEGA365 (hàng chục)' : 'KẾT QUẢ — LIVE JACKPOT365';

  // Prize table
  const tbl = document.getElementById('lottery-prize-table');
  if (tbl) {
    const mults = getMults();
    const c2 = isMega ? '#fbbf24' : '#4ade80';
    const c3 = isMega ? '#f59e0b' : '#60a5fa';
    const c4 = isMega ? '#fb923c' : '#f59e0b';
    const desc2 = 'Đôi (2 bóng số giống nhau)';
    const desc3 = 'Tam (3 bóng số giống nhau)';
    const desc4 = 'Tứ Quý (4 bóng số giống nhau)';
    const desc5 = 'NGŨ LINH 🌟 (5 bóng giống nhau)';
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
        <span style="color:#f87171;font-size:12px">Không có đôi → thua</span><span style="color:#f87171;font-weight:600">Mất 80% tiền cược</span>
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

function toggleLottLiveBanner() {
  const banner = document.getElementById('lott-mega-live-banner');
  if (!banner) return;
  banner.classList.toggle('is-collapsed');
  try {
    localStorage.setItem('lott_banner_collapsed', banner.classList.contains('is-collapsed') ? '1' : '0');
  } catch (e) {}
}

function renderLottery() {
  const banner = document.getElementById('lott-mega-live-banner');
  if (banner && !banner.classList.contains('is-collapsed')) {
    try {
      if (localStorage.getItem('lott_banner_collapsed') === '1') banner.classList.add('is-collapsed');
    } catch (e) {}
  }
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

  // Draw 5 numbers WITH REPLACEMENT from pool (số có thể trùng nhau)
  // Pool 1-300 (jackpot) hoặc 10-3000 bội 10 (mega) — khó hơn 3x so với cũ
  const pool    = generatePool();
  const result  = Array.from({length:5}, () => pool[Math.floor(Math.random()*pool.length)]);
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

    // Highlight bóng trúng: bóng nào có số bằng winVal
    const matchInfo = getBestMatch(result);
    const winVal = matchInfo.winVal;

    balls.forEach((b, i) => {
      const num = result[i];
      if (mult===0)               b.className = 'lball lball-miss';
      else if (num === winVal)    b.className = run>=5 ? 'lball lball-jackpot' : 'lball lball-hit';
      else                        b.className = 'lball lball-idle';
    });

    let profit=0, msg='', color='';
    const modeTag = isMega ? '[MEGA] ' : '';
    if (mult > 0) {
      profit = Math.floor(bet * mult) - bet;
      G.money += Math.floor(bet * mult);
      const isJackpot = run>=5;
      const winLabels = { 2:'Đôi', 3:'Tam', 4:'Tứ Quý', 5:'NGŨ LINH 🌟' };
      const label = `${winLabels[run]||run} số ${winVal}`;
      const fullLabel = isJackpot
        ? (isMega ? `NGŨ LINH ${winVal} 🌟 MEGA JACKPOT!` : `NGŨ LINH ${winVal} 🌟 JACKPOT!`)
        : label;
      msg   = `✅ ${modeTag}${fullLabel} → ×${mult} → +${fmt(profit)}`;
      color = isJackpot ? (isMega?'#fbbf24':'#e879f9') : run>=4 ? '#f59e0b' : run>=3 ? '#60a5fa' : '#4ade80';
      showNotif(`🎉 ${fullLabel}! +${fmt(profit)}`);
      // Trigger fireworks for ANY win
      _lastLotteryProfit = profit;
      setTimeout(() => triggerJackpotExplosion(isMega || isJackpot, profit), 400);
      // Đánh thuế trên tiền thắng
      if (profit > 0) taxIssueBill('🎰 Tiền thắng xổ số', Math.floor(bet * mult));
    } else {
      profit = -Math.floor(bet * 0.8);
      G.money += Math.floor(bet * 0.2);
      msg   = `❌ ${modeTag}Không có đôi → Mất ${fmt(Math.abs(profit))}`;
      color = '#f87171';
      showError(`💸 Không có đôi! Mất ${fmt(Math.abs(profit))}`);
    }

    if (resultEl) { resultEl.textContent = msg; resultEl.style.color = color; }

    G.lotteryHistory.unshift({ nums: result.join(' · '), run, mult, bet, profit, mode });
    if (G.lotteryHistory.length > 50) G.lotteryHistory.pop();
    renderLotteryHistory();

    if (btn) {
      btn.disabled = false;
      btn.textContent = isMega ? '🌟 QUAY MEGA365' : '🎰 QUAY LIVE JACKPOT365';
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

