/* ┌─────────────────────────────────────────────────────────────────────────┐
   │  MODULE · CASINO — Hexper Currency + Minesweeper · Blackjack           │
   │                    Lucky Wheel · Dice                                   │
   │                                                                         │
   │  Tỷ giá: 2 Token = 1 Hexper (quy đổi 2 chiều)                         │
   │  Giới hạn: max 500 Hexper/ngày từ casino (bảo vệ giá trị tiền tệ)     │
   └─────────────────────────────────────────────────────────────────────────┘ */

// ═══════════════════════════════════════════════════════
//  HEXPER CURRENCY CONSTANTS
// ═══════════════════════════════════════════════════════
const HEXPER_RATE        = 2;      // 2 token = 1 hexper
const HEXPER_DAILY_LIMIT = 500;    // max hexper có thể KIẾM từ casino mỗi ngày
const WHEEL_COOLDOWN_MS  = 30000;  // 30 giây giữa 2 lần quay

// Nhà cái luôn có lợi thế — house edge ~12-18%
const HOUSE_EDGE = {
  minesweeper : 0.15,  // 15% edge
  blackjack   : 0.13,  // 13% edge  (player có thêm skill nên thấp hơn)
  wheel       : 0.18,  // 18% edge (built into prize table)
  dice        : 0.15,  // 15% edge
};

// ═══════════════════════════════════════════════════════
//  UTILITY
// ═══════════════════════════════════════════════════════
function fmtH(n) {
  if (n === 0) return '0 ⬡';
  if (n < 1000) return n.toFixed(n % 1 === 0 ? 0 : 2) + ' ⬡';
  return (n / 1000).toFixed(2) + 'K ⬡';
}

function casinoResetDailyIfNeeded() {
  const today = new Date().toISOString().slice(0, 10);
  if (G.casinoDailyDate !== today) {
    G.casinoDailyDate  = today;
    G.casinoDailyBets  = 0;
  }
}

function casinoRemainingToday() {
  casinoResetDailyIfNeeded();
  return Math.max(0, HEXPER_DAILY_LIMIT - G.casinoDailyBets);
}

// Thêm hexper khi thắng (có giới hạn ngày)
function casinoAwardHexper(amount) {
  const remain = casinoRemainingToday();
  const actual = Math.min(amount, remain);
  G.wallet.hexper = (G.wallet.hexper || 0) + actual;
  G.casinoDailyBets += actual;
  if (G.casinoStats) G.casinoStats.hexperEarned = (G.casinoStats.hexperEarned || 0) + actual;
  saveGame(false);
  return actual;
}

// Trừ hexper khi đặt cược
function casinoSpendHexper(amount) {
  if ((G.wallet.hexper || 0) < amount) return false;
  G.wallet.hexper -= amount;
  if (G.casinoStats) {
    G.casinoStats.gamesPlayed = (G.casinoStats.gamesPlayed || 0) + 1;
    G.casinoStats.totalLost   = (G.casinoStats.totalLost   || 0) + amount;
  }
  saveGame(false);
  return true;
}

// Đổi Token → Hexper
function casinoBuyHexper(tokens) {
  tokens = Math.floor(tokens);
  if (tokens < 2) { showError('⬡ Cần ít nhất 2 Token để đổi!'); return; }
  if ((G.wallet.token || 0) < tokens) { showError('⬡ Không đủ Token!'); return; }
  if (tokens % 2 !== 0) { tokens = tokens - 1; } // phải chẵn
  const hexperGained = tokens / HEXPER_RATE;
  G.wallet.token  -= tokens;
  G.wallet.hexper  = (G.wallet.hexper || 0) + hexperGained;
  showNotif(`⬡ Đổi ${tokens} Token → ${fmtH(hexperGained)} thành công!`);
  saveGame(false);
  renderCasino();
  updateUI();
}

// Đổi Hexper → Token
function casinoSellHexper(hexper) {
  hexper = Math.floor(hexper);
  if (hexper < 1) { showError('⬡ Cần ít nhất 1 Hexper để đổi!'); return; }
  if ((G.wallet.hexper || 0) < hexper) { showError('⬡ Không đủ Hexper!'); return; }
  const tokenGained = hexper * HEXPER_RATE;
  G.wallet.hexper -= hexper;
  G.wallet.token   = (G.wallet.token || 0) + tokenGained;
  showNotif(`⬡ Đổi ${fmtH(hexper)} → ${tokenGained} Token thành công!`);
  saveGame(false);
  renderCasino();
  updateUI();
}

// ═══════════════════════════════════════════════════════
//  CASINO STATE (runtime, không lưu)
// ═══════════════════════════════════════════════════════
let _casinoGame  = null; // 'mine'|'blackjack'|'wheel'|'dice'|null
let _casinoBet   = 1;

// ── Minesweeper state
let _mineGrid    = [];   // array of 25: {mine,revealed,flagged}
let _mineActive  = false;
let _mineWon     = false;
let _mineCollect = 0;    // hexper earned if player cashes out

// ── Blackjack state
let _bjDeck      = [];
let _bjPlayer    = [];
let _bjDealer    = [];
let _bjState     = 'idle'; // idle|playing|done

// ── Wheel state
let _wheelSpinning = false;
const WHEEL_PRIZES = [
  { label:'0.5×', mult:0.5,  color:'#dc2626', weight:30 },
  { label:'0×',   mult:0,    color:'#7f1d1d', weight:20 },
  { label:'1.2×', mult:1.2,  color:'#d97706', weight:22 },
  { label:'1.5×', mult:1.5,  color:'#16a34a', weight:15 },
  { label:'2×',   mult:2.0,  color:'#0ea5e9', weight:9  },
  { label:'3×',   mult:3.0,  color:'#7c3aed', weight:3  },
  { label:'5×',   mult:5.0,  color:'#db2777', weight:1  },
];

// ── Dice state
let _diceResult  = null;
let _diceChoose  = 'high'; // 'high'(4-6) | 'low'(1-3) | 'exact'
let _diceExact   = 6;

// ═══════════════════════════════════════════════════════
//  MAIN RENDER
// ═══════════════════════════════════════════════════════
function renderCasino() {
  const panel = document.getElementById('panel-casino');
  if (!panel) return;
  const hex    = G.wallet.hexper || 0;
  const tok    = G.wallet.token  || 0;
  const remain = casinoRemainingToday();

  panel.innerHTML = `
<div style="padding:14px;max-width:600px;margin:0 auto">

  <!-- HEADER -->
  <div style="background:linear-gradient(135deg,#0f0a1e,#1a0a2e,#0a1420);border:1px solid #4c1d95;border-radius:14px;padding:16px;margin-bottom:14px">
    <div style="text-align:center;margin-bottom:10px">
      <span style="font-size:28px">🎮</span>
      <div style="font-size:20px;font-weight:800;color:#a78bfa;letter-spacing:1px">KHU VUI CHƠI CASINO</div>
      <div style="font-size:12px;color:#6b7280;margin-top:2px">Giải trí có trách nhiệm · Nhà cái luôn thắng lâu dài</div>
    </div>

    <!-- Wallet row -->
    <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
      <div style="background:#1a1030;border:1px solid #4c1d95;border-radius:10px;padding:10px 16px;text-align:center">
        <div style="font-size:11px;color:#7c3aed;margin-bottom:3px">⬡ HEXPER</div>
        <div style="font-size:20px;font-weight:700;color:#c4b5fd" id="casino-hexper-val">${fmtH(hex)}</div>
        <div style="font-size:10px;color:#4b5563">Giới hạn hôm nay: <span id="casino-hexper-remain">${fmtH(remain)}</span></div>
      </div>
      <div style="background:#101a10;border:1px solid #166534;border-radius:10px;padding:10px 16px;text-align:center">
        <div style="font-size:11px;color:#4ade80;margin-bottom:3px">🔮 TOKEN</div>
        <div style="font-size:20px;font-weight:700;color:#86efac" id="casino-token-val">${tok.toLocaleString()}</div>
        <div style="font-size:10px;color:#4b5563">2 Token = 1 Hexper</div>
      </div>
    </div>

    <!-- Exchange -->
    <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap;justify-content:center">
      <div style="display:flex;gap:6px;align-items:center">
        <input id="cx-token-in" type="number" min="2" max="${tok}" step="2" value="${Math.min(tok,10)}"
          style="width:72px;background:#0d1117;border:1px solid #374151;border-radius:7px;color:#e2e8f0;padding:5px 8px;font-size:13px">
        <button onclick="casinoBuyHexper(+document.getElementById('cx-token-in').value)"
          style="background:#1e1040;color:#a78bfa;border:1px solid #4c1d95;border-radius:7px;padding:5px 12px;font-size:13px;cursor:pointer">
          Token → ⬡
        </button>
      </div>
      <div style="display:flex;gap:6px;align-items:center">
        <input id="cx-hex-in" type="number" min="1" max="${hex}" step="1" value="${Math.min(hex,5)}"
          style="width:72px;background:#0d1117;border:1px solid #374151;border-radius:7px;color:#e2e8f0;padding:5px 8px;font-size:13px">
        <button onclick="casinoSellHexper(+document.getElementById('cx-hex-in').value)"
          style="background:#101a10;color:#4ade80;border:1px solid #166534;border-radius:7px;padding:5px 12px;font-size:13px;cursor:pointer">
          ⬡ → Token
        </button>
      </div>
    </div>
  </div>

  <!-- GAME SELECT -->
  <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:14px">
    ${_gameCard('mine',    '💣', 'Minesweeper', 'Đào mìn kiếm tiền · Cash out bất cứ lúc nào')}
    ${_gameCard('blackjack','🃏','Blackjack',   '21 điểm · Đánh bại dealer')}
    ${_gameCard('wheel',   '🎡', 'Vòng Quay',   '30s cooldown · Nhân hệ số cược')}
    ${_gameCard('dice',    '🎲', 'Lắc Xúc Xắc','Cao/Thấp/Chính xác')}
  </div>

  <!-- ACTIVE GAME AREA -->
  <div id="casino-game-area"></div>

  <!-- STATS -->
  <div style="background:#0d1117;border:1px solid #1f2937;border-radius:10px;padding:12px;margin-top:14px;font-size:12px;color:#6b7280">
    <div style="font-weight:600;color:#9ca3af;margin-bottom:6px">📊 Thống Kê Casino</div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px">
      <div>🎮 Ván: <b style="color:#d1d5db">${(G.casinoStats?.gamesPlayed||0)}</b></div>
      <div>⬡ Đã kiếm: <b style="color:#c4b5fd">${fmtH(G.casinoStats?.hexperEarned||0)}</b></div>
      <div>🏆 Lớn nhất: <b style="color:#fbbf24">${fmtH(G.casinoStats?.biggestWin||0)}</b></div>
    </div>
    <div style="margin-top:8px;font-size:11px;color:#374151;border-top:1px solid #1f2937;padding-top:8px">
      ⚠️ Các trò chơi này được thiết kế để giải trí. Nhà cái có lợi thế cạnh tranh để đảm bảo giá trị ⬡ Hexper bền vững.
      Giới hạn kiếm ${HEXPER_DAILY_LIMIT}⬡/ngày được áp dụng để bảo vệ nền kinh tế trong game.
    </div>
  </div>
</div>`;

  // Re-open game if was active
  if (_casinoGame) _renderActiveGame();

  // Start realtime hexper update ticker
  _startCasinoHexperTicker();
}

// ── Realtime Hexper ticker — cập nhật số Hexper & Token trong tab Trò Chơi ──
let _casinoHexperTickerID = null;
function _startCasinoHexperTicker() {
  if (_casinoHexperTickerID) clearInterval(_casinoHexperTickerID);
  _casinoHexperTickerID = setInterval(() => {
    const panel = document.getElementById('panel-casino');
    if (!panel || !panel.classList.contains('active')) return;
    const hexEl    = document.getElementById('casino-hexper-val');
    const remEl    = document.getElementById('casino-hexper-remain');
    const tokEl    = document.getElementById('casino-token-val');
    if (!hexEl || !remEl || !tokEl) { clearInterval(_casinoHexperTickerID); _casinoHexperTickerID = null; return; }
    hexEl.textContent = fmtH(G.wallet.hexper || 0);
    remEl.textContent = fmtH(casinoRemainingToday());
    tokEl.textContent = (G.wallet.token || 0).toLocaleString();
  }, 1000);
}

function _gameCard(id, icon, name, desc) {
  const active = _casinoGame === id;
  return `<div onclick="casinoOpenGame('${id}')"
    style="background:${active?'#1a1030':'#0d1117'};border:1px solid ${active?'#7c3aed':'#1f2937'};border-radius:11px;padding:14px;cursor:pointer;transition:all .2s">
    <div style="font-size:28px">${icon}</div>
    <div style="font-size:15px;font-weight:600;color:#e2e8f0;margin:4px 0">${name}</div>
    <div style="font-size:11px;color:#6b7280">${desc}</div>
  </div>`;
}

function casinoOpenGame(id) {
  _casinoGame  = id;
  // reset sub-states
  _mineActive  = false;
  _bjState     = 'idle';
  _diceResult  = null;
  renderCasino();
  document.getElementById('casino-game-area')?.scrollIntoView({behavior:'smooth',block:'nearest'});
}

function _renderActiveGame() {
  const area = document.getElementById('casino-game-area');
  if (!area) return;
  switch (_casinoGame) {
    case 'mine':      area.innerHTML = _mineUI();      if (_mineActive) _attachMineEvents(); break;
    case 'blackjack': area.innerHTML = _bjUI();        break;
    case 'wheel':     area.innerHTML = _wheelUI();     _initWheelCanvas(); break;
    case 'dice':      area.innerHTML = _diceUI();      break;
  }
}

// ═══════════════════════════════════════════════════════
//  BET INPUT HELPER
// ═══════════════════════════════════════════════════════
function _betBar(gameId) {
  const hex = G.wallet.hexper || 0;
  return `
<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:12px">
  <span style="font-size:13px;color:#9ca3af">Cược (⬡):</span>
  <input id="bet-${gameId}" type="number" min="1" max="${Math.max(1,Math.floor(hex))}" step="1"
    value="${Math.min(_casinoBet, Math.max(1,Math.floor(hex)))}"
    style="width:80px;background:#0d1117;border:1px solid #374151;border-radius:7px;color:#e2e8f0;padding:5px 8px;font-size:14px"
    onchange="_casinoBet=Math.max(1,+this.value)">
  <button onclick="_casinoBet=Math.max(1,Math.floor((G.wallet.hexper||0)/2));document.getElementById('bet-${gameId}').value=_casinoBet"
    style="${_miniBtn('#1f2937','#9ca3af')}">½</button>
  <button onclick="_casinoBet=Math.max(1,Math.floor(G.wallet.hexper||0));document.getElementById('bet-${gameId}').value=_casinoBet"
    style="${_miniBtn('#1f2937','#9ca3af')}">MAX</button>
  <span style="font-size:12px;color:#4b5563">Có: ${fmtH(hex)}</span>
</div>`;
}

function _miniBtn(bg, color) {
  return `background:${bg};color:${color};border:1px solid #374151;border-radius:6px;padding:4px 10px;font-size:12px;cursor:pointer`;
}

// ─────────────────────────────────────────────────────
//  ██╗    MINESWEEPER
// ─────────────────────────────────────────────────────
const MINE_SIZE  = 5; // 5×5 grid
const MINE_COUNT = 5; // 5 mines (20%)

function _mineUI() {
  const hex = G.wallet.hexper || 0;

  if (!_mineActive) {
    return `<div style="background:#0d1117;border:1px solid #1f2937;border-radius:12px;padding:16px">
      <div style="font-size:18px;font-weight:700;color:#e2e8f0;margin-bottom:4px">💣 Minesweeper</div>
      <div style="font-size:12px;color:#6b7280;margin-bottom:12px">
        Lưới 5×5 với ${MINE_COUNT} mìn. Mỗi ô an toàn bạn nhận được tiền. Cash out bất cứ lúc nào!
        <br>Xác suất an toàn giảm dần theo số ô đã mở.
      </div>
      ${_betBar('mine')}
      <button onclick="mineStart()"
        ${hex<1?'disabled':''}
        style="background:#1e1040;color:#a78bfa;border:1px solid #7c3aed;border-radius:8px;padding:10px 24px;font-size:15px;cursor:pointer;${hex<1?'opacity:0.4;cursor:not-allowed':''}">
        💣 Bắt Đầu Đào Mìn
      </button>
      ${hex<1?'<div style="font-size:12px;color:#dc2626;margin-top:8px">⬡ Bạn cần có Hexper để chơi! Đổi Token → Hexper ở trên.</div>':''}
    </div>`;
  }

  // Active game
  const safe = MINE_SIZE*MINE_SIZE - MINE_COUNT;
  const revealed = _mineGrid.filter(c=>c.revealed && !c.mine).length;
  const multi = _calcMineMultiplier(revealed);
  const cashout = (_casinoBet * multi).toFixed(2);

  let gridHTML = '<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin:12px 0">';
  for (let i = 0; i < MINE_SIZE*MINE_SIZE; i++) {
    const cell = _mineGrid[i];
    let bg='#1f2937', txt='', cursor='pointer', opacity='1';
    if (cell.revealed) {
      bg   = cell.mine ? '#7f1d1d' : '#14532d';
      txt  = cell.mine ? '💥'       : '✅';
      cursor='default';
    }
    gridHTML += `<div id="mcell-${i}" onclick="mineTap(${i})"
      style="background:${bg};border:1px solid #374151;border-radius:8px;height:52px;display:flex;align-items:center;justify-content:center;font-size:20px;cursor:${cursor};user-select:none;transition:background .15s">
      ${txt}
    </div>`;
  }
  gridHTML += '</div>';

  return `<div style="background:#0d1117;border:1px solid #7c3aed;border-radius:12px;padding:16px">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
      <div style="font-size:16px;font-weight:700;color:#a78bfa">💣 Minesweeper</div>
      <div style="font-size:13px;color:#6b7280">Cược: ${fmtH(_casinoBet)} · Ô an toàn: ${revealed}/${safe}</div>
    </div>
    <div style="background:#1a1030;border-radius:8px;padding:8px 12px;display:flex;gap:16px;margin-bottom:6px">
      <span style="font-size:13px;color:#9ca3af">Hệ số: <b style="color:#c4b5fd">${multi.toFixed(2)}×</b></span>
      <span style="font-size:13px;color:#9ca3af">Cash out: <b style="color:#4ade80">${fmtH(+cashout)}</b></span>
    </div>
    ${gridHTML}
    <div style="display:flex;gap:10px;margin-top:6px">
      <button onclick="mineCashOut()" ${revealed===0?'disabled':''}
        style="flex:1;background:#14532d;color:#4ade80;border:1px solid #166534;border-radius:8px;padding:9px;font-size:14px;cursor:pointer;${revealed===0?'opacity:0.4;cursor:not-allowed':''}">
        💰 Cash Out ${revealed>0?fmtH(+cashout):''}
      </button>
      <button onclick="mineReset()"
        style="background:#1f2937;color:#9ca3af;border:1px solid #374151;border-radius:8px;padding:9px 16px;font-size:14px;cursor:pointer">
        Bỏ
      </button>
    </div>
  </div>`;
}

function _calcMineMultiplier(revealed) {
  // Multiplier tăng theo số ô an toàn đã mở, có house edge built-in
  // Công thức: product of (safe_left/total_left) cho mỗi bước, × (1 - HOUSE_EDGE)
  let total = MINE_SIZE * MINE_SIZE;
  let mines = MINE_COUNT;
  let prob  = 1;
  for (let i = 0; i < revealed; i++) {
    prob *= (total - mines - i) / (total - i);
  }
  // Multiplier = 1/prob × (1 - house_edge)
  if (revealed === 0) return 0;
  return Math.max(0.1, (1 / prob) * (1 - HOUSE_EDGE.minesweeper));
}

function mineStart() {
  const betEl = document.getElementById('bet-mine');
  if (betEl) _casinoBet = Math.max(1, Math.floor(+betEl.value));
  if (!casinoSpendHexper(_casinoBet)) { showError('⬡ Không đủ Hexper!'); return; }

  // Build grid
  _mineGrid = Array.from({length:MINE_SIZE*MINE_SIZE}, () => ({mine:false,revealed:false}));
  // Place mines (seeded randomly, player cannot see)
  let placed = 0;
  while (placed < MINE_COUNT) {
    const idx = Math.floor(Math.random() * MINE_SIZE*MINE_SIZE);
    if (!_mineGrid[idx].mine) { _mineGrid[idx].mine = true; placed++; }
  }
  _mineActive = true;
  _mineWon    = false;

  const area = document.getElementById('casino-game-area');
  if (area) { area.innerHTML = _mineUI(); }
}

function mineTap(idx) {
  if (!_mineActive) return;
  const cell = _mineGrid[idx];
  if (cell.revealed) return;

  cell.revealed = true;

  if (cell.mine) {
    // Hit mine — reveal all
    _mineGrid.forEach(c => c.revealed = true);
    _mineActive = false;
    _refreshMineUI();
    setTimeout(() => {
      showError('💥 Dính mìn! Mất ' + fmtH(_casinoBet));
      if (G.casinoStats) G.casinoStats.gamesPlayed = (G.casinoStats.gamesPlayed||0)+1;
      saveGame(false);
    }, 300);
    return;
  }

  // Check win: all safe revealed
  const safe     = MINE_SIZE*MINE_SIZE - MINE_COUNT;
  const revealed = _mineGrid.filter(c=>c.revealed && !c.mine).length;
  if (revealed === safe) {
    // Cleared all safe cells
    const multi   = _calcMineMultiplier(revealed);
    const winAmt  = casinoAwardHexper(Math.floor(_casinoBet * multi));
    _mineActive   = false;
    _mineGrid.forEach(c => c.revealed = true);
    _refreshMineUI();
    _recordWin(winAmt);
    setTimeout(() => showNotif('🎉 Cleared! +' + fmtH(winAmt)), 200);
    return;
  }

  _refreshMineUI();
}

function mineCashOut() {
  if (!_mineActive) return;
  const revealed = _mineGrid.filter(c=>c.revealed && !c.mine).length;
  if (revealed === 0) return;
  const multi   = _calcMineMultiplier(revealed);
  const winAmt  = casinoAwardHexper(Math.floor(_casinoBet * multi));
  _mineActive   = false;
  _mineGrid.forEach(c => { if (c.mine) c.revealed = true; });
  _refreshMineUI();
  _recordWin(winAmt);
  showNotif('💰 Cash Out! +' + fmtH(winAmt));
}

function mineReset() {
  _mineActive = false;
  const area = document.getElementById('casino-game-area');
  if (area) area.innerHTML = _mineUI();
}

function _refreshMineUI() {
  const area = document.getElementById('casino-game-area');
  if (area) area.innerHTML = _mineUI();
}

function _attachMineEvents() {} // cells use onclick inline


// ─────────────────────────────────────────────────────
//  ██╗    BLACKJACK
// ─────────────────────────────────────────────────────
const BJ_SUITS  = ['♠','♥','♦','♣'];
const BJ_RANKS  = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];

function _bjBuildDeck() {
  const d = [];
  BJ_SUITS.forEach(s => BJ_RANKS.forEach(r => d.push({s,r})));
  // Shuffle
  for (let i = d.length-1; i > 0; i--) {
    const j = Math.floor(Math.random()*(i+1));
    [d[i],d[j]] = [d[j],d[i]];
  }
  return d;
}

function _bjVal(hand) {
  let total = 0, aces = 0;
  hand.forEach(c => {
    if (['J','Q','K'].includes(c.r)) total += 10;
    else if (c.r === 'A') { total += 11; aces++; }
    else total += +c.r;
  });
  while (total > 21 && aces > 0) { total -= 10; aces--; }
  return total;
}

function _bjCardHTML(c, hidden=false) {
  const red = c.s==='♥'||c.s==='♦';
  if (hidden) return `<div style="${_cardStyle('#1f2937','#6b7280')}">🂠</div>`;
  return `<div style="${_cardStyle('#1a1a1a', red?'#ef4444':'#e2e8f0')}">${c.r}${c.s}</div>`;
}

function _cardStyle(bg,col) {
  return `display:inline-flex;align-items:center;justify-content:center;width:44px;height:64px;background:${bg};border:1.5px solid #374151;border-radius:8px;font-size:16px;font-weight:700;color:${col};margin:3px`;
}

function _bjUI() {
  const hex = G.wallet.hexper || 0;

  if (_bjState === 'idle') {
    return `<div style="background:#0d1117;border:1px solid #1f2937;border-radius:12px;padding:16px">
      <div style="font-size:18px;font-weight:700;color:#e2e8f0;margin-bottom:4px">🃏 Blackjack</div>
      <div style="font-size:12px;color:#6b7280;margin-bottom:12px">Đạt 21 điểm hoặc gần nhất. Blackjack trả 1.5×. Dealer dừng ở 17.</div>
      ${_betBar('bj')}
      <button onclick="bjDeal()" ${hex<1?'disabled':''}
        style="background:#1c3a1a;color:#4ade80;border:1px solid #166534;border-radius:8px;padding:10px 24px;font-size:15px;cursor:pointer;${hex<1?'opacity:0.4;cursor:not-allowed':''}">
        🃏 Chia Bài
      </button>
    </div>`;
  }

  const pv    = _bjVal(_bjPlayer);
  const dv    = _bjVal(_bjDealer);
  const done  = _bjState === 'done';

  let statusMsg = '';
  if (done) {
    if (pv > 21) statusMsg = `<div style="color:#dc2626;font-weight:700">💥 Quá 21 — Thua!</div>`;
    else if (dv > 21) statusMsg = `<div style="color:#4ade80;font-weight:700">🎉 Dealer quá 21 — Thắng!</div>`;
    else if (pv > dv) statusMsg = `<div style="color:#4ade80;font-weight:700">🎉 Thắng! ${pv} vs ${dv}</div>`;
    else if (pv === dv) statusMsg = `<div style="color:#fbbf24;font-weight:700">🤝 Hòa — Hoàn tiền</div>`;
    else statusMsg = `<div style="color:#dc2626;font-weight:700">😞 Thua! ${pv} vs ${dv}</div>`;
  }

  return `<div style="background:#0d1117;border:1px solid #166534;border-radius:12px;padding:16px">
    <div style="font-size:16px;font-weight:700;color:#4ade80;margin-bottom:10px">🃏 Blackjack — Cược: ${fmtH(_casinoBet)}</div>
    <div style="margin-bottom:10px">
      <div style="font-size:12px;color:#6b7280;margin-bottom:4px">DEALER ${done?'('+dv+')':'(?)'}</div>
      <div>${_bjDealer.map((c,i)=>_bjCardHTML(c, !done&&i===1)).join('')}</div>
    </div>
    <div style="margin-bottom:12px">
      <div style="font-size:12px;color:#6b7280;margin-bottom:4px">BẠN (${pv})</div>
      <div>${_bjPlayer.map(c=>_bjCardHTML(c)).join('')}</div>
    </div>
    ${statusMsg}
    ${!done ? `
    <div style="display:flex;gap:8px;margin-top:10px">
      <button onclick="bjHit()"
        style="flex:1;background:#1c3a1a;color:#4ade80;border:1px solid #166534;border-radius:8px;padding:9px;font-size:14px;cursor:pointer">
        Rút Bài
      </button>
      <button onclick="bjStand()"
        style="flex:1;background:#1a1030;color:#a78bfa;border:1px solid #4c1d95;border-radius:8px;padding:9px;font-size:14px;cursor:pointer">
        Dừng
      </button>
    </div>` : `
    <div style="display:flex;gap:8px;margin-top:10px">
      <button onclick="bjNew()"
        style="flex:1;background:#1f2937;color:#9ca3af;border:1px solid #374151;border-radius:8px;padding:9px;font-size:14px;cursor:pointer">
        Ván Mới
      </button>
    </div>`}
  </div>`;
}

function bjDeal() {
  const betEl = document.getElementById('bet-bj');
  if (betEl) _casinoBet = Math.max(1, Math.floor(+betEl.value));
  if (!casinoSpendHexper(_casinoBet)) { showError('⬡ Không đủ Hexper!'); return; }

  _bjDeck   = _bjBuildDeck();
  _bjPlayer = [_bjDeck.pop(), _bjDeck.pop()];
  _bjDealer = [_bjDeck.pop(), _bjDeck.pop()];
  _bjState  = 'playing';

  // Natural blackjack?
  if (_bjVal(_bjPlayer) === 21) {
    bjStand();
    return;
  }

  const area = document.getElementById('casino-game-area');
  if (area) area.innerHTML = _bjUI();
}

function bjHit() {
  if (_bjState !== 'playing') return;
  _bjPlayer.push(_bjDeck.pop());
  if (_bjVal(_bjPlayer) >= 21) bjStand();
  else {
    const area = document.getElementById('casino-game-area');
    if (area) area.innerHTML = _bjUI();
  }
}

function bjStand() {
  if (_bjState !== 'playing') return;
  // Dealer draws to 17
  while (_bjVal(_bjDealer) < 17) _bjDealer.push(_bjDeck.pop());
  _bjState = 'done';

  const pv = _bjVal(_bjPlayer);
  const dv = _bjVal(_bjDealer);
  let win  = 0;

  if (pv > 21) {
    // bust — already paid when spending
  } else if (dv > 21 || pv > dv) {
    // Blackjack pays 1.5×, normal pays 1× + stake back
    const isNatural = pv === 21 && _bjPlayer.length === 2;
    const mult = isNatural ? 1.5 : 1.0;
    // Apply house edge: reduce effective multiplier slightly
    const effMult = mult * (1 - HOUSE_EDGE.blackjack * 0.5); // partial edge on win side
    win = casinoAwardHexper(Math.floor(_casinoBet * (1 + effMult)));
    _recordWin(win);
  } else if (pv === dv) {
    // Tie — refund bet
    win = casinoAwardHexper(_casinoBet);
  }

  if (G.casinoStats) G.casinoStats.gamesPlayed = (G.casinoStats.gamesPlayed||0)+1;
  saveGame(false);

  const area = document.getElementById('casino-game-area');
  if (area) area.innerHTML = _bjUI();
}

function bjNew() {
  _bjState = 'idle';
  const area = document.getElementById('casino-game-area');
  if (area) area.innerHTML = _bjUI();
}


// ─────────────────────────────────────────────────────
//  ██╗    LUCKY WHEEL
// ─────────────────────────────────────────────────────
function _wheelUI() {
  const hex       = G.wallet.hexper || 0;
  const now       = Date.now();
  const cooldown  = WHEEL_COOLDOWN_MS - (now - (G.casinoLastSpinTime||0));
  const onCooldown = cooldown > 0;

  return `<div style="background:#0d1117;border:1px solid #1f2937;border-radius:12px;padding:16px">
    <div style="font-size:18px;font-weight:700;color:#e2e8f0;margin-bottom:4px">🎡 Vòng Quay May Mắn</div>
    <div style="font-size:12px;color:#6b7280;margin-bottom:10px">Cooldown 30s giữa các lần quay. Hệ số nhân vào tiền cược.</div>
    ${_betBar('wheel')}
    <div style="display:flex;justify-content:center;margin-bottom:12px">
      <div style="position:relative">
        <canvas id="wheel-canvas" width="220" height="220" style="border-radius:50%"></canvas>
        <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:30px;height:30px;background:#111;border:2px solid #7c3aed;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;color:#a78bfa">⬡</div>
        <!-- Pointer -->
        <div style="position:absolute;top:-8px;left:50%;transform:translateX(-50%);width:0;height:0;border-left:10px solid transparent;border-right:10px solid transparent;border-bottom:20px solid #a78bfa"></div>
      </div>
    </div>
    <div id="wheel-result" style="text-align:center;min-height:28px;font-size:15px;font-weight:600;color:#c4b5fd;margin-bottom:10px"></div>
    <button id="wheel-spin-btn" onclick="wheelSpin()" ${hex<1||onCooldown?'disabled':''}
      style="width:100%;background:${onCooldown?'#1f2937':'#1e1040'};color:${onCooldown?'#6b7280':'#a78bfa'};border:1px solid ${onCooldown?'#374151':'#7c3aed'};border-radius:8px;padding:10px;font-size:15px;cursor:${onCooldown?'not-allowed':'pointer'}">
      ${onCooldown ? '⏳ Cooldown: ' + Math.ceil(cooldown/1000) + 's' : '🎡 Quay!'}
    </button>
    <div style="margin-top:10px;display:flex;flex-wrap:wrap;gap:5px;justify-content:center">
      ${WHEEL_PRIZES.map(p=>`<span style="background:${p.color}22;border:1px solid ${p.color}55;border-radius:5px;padding:3px 8px;font-size:11px;color:${p.color}">${p.label}</span>`).join('')}
    </div>
  </div>`;
}

function _initWheelCanvas() {
  const canvas = document.getElementById('wheel-canvas');
  if (!canvas) return;
  _drawWheel(canvas, 0);
}

function _drawWheel(canvas, rotation) {
  const ctx   = canvas.getContext('2d');
  const cx    = canvas.width  / 2;
  const cy    = canvas.height / 2;
  const r     = cx - 4;
  const total = WHEEL_PRIZES.reduce((s,p)=>s+p.weight, 0);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let angle = rotation;
  WHEEL_PRIZES.forEach(p => {
    const slice = (p.weight / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, angle, angle + slice);
    ctx.closePath();
    ctx.fillStyle = p.color;
    ctx.fill();
    ctx.strokeStyle = '#111';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Label
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle + slice/2);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px Inter,sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(p.label, r - 8, 4);
    ctx.restore();
    angle += slice;
  });
}

function wheelSpin() {
  const betEl = document.getElementById('bet-wheel');
  if (betEl) _casinoBet = Math.max(1, Math.floor(+betEl.value));

  const now = Date.now();
  if (now - (G.casinoLastSpinTime||0) < WHEEL_COOLDOWN_MS) {
    showError('⏳ Vòng quay đang hồi!'); return;
  }
  if (!casinoSpendHexper(_casinoBet)) { showError('⬡ Không đủ Hexper!'); return; }

  G.casinoLastSpinTime = now;
  _wheelSpinning = true;

  // Pick prize weighted
  const total  = WHEEL_PRIZES.reduce((s,p)=>s+p.weight, 0);
  let   rnd    = Math.random() * total;
  let   chosen = WHEEL_PRIZES[0];
  let   cumAngle = 0;
  const slices = WHEEL_PRIZES.map(p => {
    const a = (p.weight/total)*Math.PI*2; cumAngle+=a;
    return {p, end:cumAngle};
  });
  let acc = 0;
  for (const s of slices) {
    rnd -= s.p.weight;
    if (rnd <= 0) { chosen = s.p; break; }
  }

  // Animate spin
  const canvas  = document.getElementById('wheel-canvas');
  if (!canvas) return;
  const totalRot= Math.PI*2 * (5 + Math.random()*3); // 5-8 full turns
  // Figure out where the chosen prize should stop (pointer at top = 0)
  const sliceStart = slices.find(s=>s.p===chosen);
  const midAngle   = sliceStart.end - (chosen.weight/total)*Math.PI;
  const stopAngle  = totalRot - midAngle + Math.PI*1.5; // align pointer

  let   start = null;
  const dur   = 4000;
  const animFrame = (ts) => {
    if (!start) start = ts;
    const elapsed = ts - start;
    const t = Math.min(elapsed/dur, 1);
    const ease = 1 - Math.pow(1-t, 4); // ease out quart
    const rot = stopAngle * ease;
    _drawWheel(canvas, rot);
    if (t < 1) {
      requestAnimationFrame(animFrame);
    } else {
      _wheelSpinning = false;
      // Award
      const winAmt = chosen.mult > 0
        ? casinoAwardHexper(Math.floor(_casinoBet * chosen.mult))
        : 0;
      const resEl = document.getElementById('wheel-result');
      if (resEl) {
        if (chosen.mult === 0) {
          resEl.style.color = '#dc2626';
          resEl.textContent = `💥 ${chosen.label} — Mất ${fmtH(_casinoBet)}`;
        } else {
          resEl.style.color = chosen.color;
          resEl.textContent = `🎉 ${chosen.label} — +${fmtH(winAmt)}`;
          _recordWin(winAmt);
        }
      }
      if (G.casinoStats) G.casinoStats.gamesPlayed=(G.casinoStats.gamesPlayed||0)+1;
      saveGame(false);
      // Refresh button after cooldown update
      setTimeout(() => {
        const area = document.getElementById('casino-game-area');
        if (area) area.innerHTML = _wheelUI(); _initWheelCanvas();
      }, 3000);
    }
  };
  requestAnimationFrame(animFrame);
}


// ─────────────────────────────────────────────────────
//  ██╗    DICE
// ─────────────────────────────────────────────────────
const DICE_FACES = ['','⚀','⚁','⚂','⚃','⚄','⚅'];

function _diceUI() {
  const hex = G.wallet.hexper || 0;
  const face = _diceResult ? DICE_FACES[_diceResult] : '🎲';

  // Multiplier info
  const HIGH_MULT  = (6/3) * (1 - HOUSE_EDGE.dice); // ~1.13×
  const LOW_MULT   = HIGH_MULT;
  const EXACT_MULT = (6/1) * (1 - HOUSE_EDGE.dice); // ~5.1×

  return `<div style="background:#0d1117;border:1px solid #1f2937;border-radius:12px;padding:16px">
    <div style="font-size:18px;font-weight:700;color:#e2e8f0;margin-bottom:4px">🎲 Lắc Xúc Xắc</div>
    <div style="font-size:12px;color:#6b7280;margin-bottom:12px">Đoán kết quả để nhân tiền cược. Chính xác thưởng gấp đôi!</div>
    ${_betBar('dice')}

    <!-- Choice -->
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:12px">
      <button onclick="_diceChoose='high';_diceExact=6;_refreshDiceUI()"
        style="background:${_diceChoose==='high'?'#1c3a1a':'#0d1117'};color:${_diceChoose==='high'?'#4ade80':'#9ca3af'};border:1px solid ${_diceChoose==='high'?'#166534':'#374151'};border-radius:8px;padding:10px;font-size:13px;cursor:pointer">
        📈 Cao (4-6)<br><span style="font-size:11px;color:#6b7280">${HIGH_MULT.toFixed(2)}×</span>
      </button>
      <button onclick="_diceChoose='low';_diceExact=1;_refreshDiceUI()"
        style="background:${_diceChoose==='low'?'#1a0a2e':'#0d1117'};color:${_diceChoose==='low'?'#a78bfa':'#9ca3af'};border:1px solid ${_diceChoose==='low'?'#4c1d95':'#374151'};border-radius:8px;padding:10px;font-size:13px;cursor:pointer">
        📉 Thấp (1-3)<br><span style="font-size:11px;color:#6b7280">${LOW_MULT.toFixed(2)}×</span>
      </button>
      <button onclick="_diceChoose='exact';_refreshDiceUI()"
        style="background:${_diceChoose==='exact'?'#1c1a00':'#0d1117'};color:${_diceChoose==='exact'?'#fbbf24':'#9ca3af'};border:1px solid ${_diceChoose==='exact'?'#92400e':'#374151'};border-radius:8px;padding:10px;font-size:13px;cursor:pointer">
        🎯 Chính Xác<br><span style="font-size:11px;color:#6b7280">${EXACT_MULT.toFixed(2)}×</span>
      </button>
    </div>

    ${_diceChoose === 'exact' ? `
    <div style="margin-bottom:12px;display:flex;align-items:center;gap:10px">
      <span style="font-size:13px;color:#9ca3af">Chọn số:</span>
      ${[1,2,3,4,5,6].map(n=>`
        <button onclick="_diceExact=${n};_refreshDiceUI()"
          style="width:36px;height:36px;background:${_diceExact===n?'#92400e':'#1f2937'};color:${_diceExact===n?'#fbbf24':'#9ca3af'};border:1px solid ${_diceExact===n?'#b45309':'#374151'};border-radius:7px;cursor:pointer;font-size:16px">${DICE_FACES[n]}</button>
      `).join('')}
    </div>` : ''}

    <!-- Dice face display -->
    <div style="text-align:center;margin:12px 0">
      <div id="dice-face" style="font-size:72px;line-height:1;transition:all .1s">${face}</div>
      ${_diceResult ? `<div style="font-size:14px;color:#9ca3af;margin-top:4px">Kết quả: ${_diceResult}</div>` : ''}
    </div>

    <button onclick="diceRoll()" ${hex<1?'disabled':''}
      style="width:100%;background:#1c1a00;color:#fbbf24;border:1px solid #92400e;border-radius:8px;padding:10px;font-size:15px;cursor:pointer;${hex<1?'opacity:0.4;cursor:not-allowed':''}">
      🎲 Lắc Ngay!
    </button>
  </div>`;
}

function _refreshDiceUI() {
  const area = document.getElementById('casino-game-area');
  if (area) area.innerHTML = _diceUI();
}

function diceRoll() {
  const betEl = document.getElementById('bet-dice');
  if (betEl) _casinoBet = Math.max(1, Math.floor(+betEl.value));
  if (!casinoSpendHexper(_casinoBet)) { showError('⬡ Không đủ Hexper!'); return; }

  // Animate
  let rolls = 0;
  const maxRolls = 10 + Math.floor(Math.random()*6);
  const roll = () => {
    _diceResult = 1 + Math.floor(Math.random()*6);
    const faceEl = document.getElementById('dice-face');
    if (faceEl) faceEl.textContent = DICE_FACES[_diceResult];
    rolls++;
    if (rolls < maxRolls) {
      setTimeout(roll, 60 + rolls*15);
    } else {
      _diceFinish();
    }
  };
  _diceResult = null;
  roll();
}

function _diceFinish() {
  const r = _diceResult;
  const HIGH_MULT  = (6/3) * (1 - HOUSE_EDGE.dice);
  const LOW_MULT   = HIGH_MULT;
  const EXACT_MULT = (6/1) * (1 - HOUSE_EDGE.dice);

  let won = false;
  let mult = 0;
  if (_diceChoose === 'high'  && r >= 4) { won=true; mult=HIGH_MULT;  }
  if (_diceChoose === 'low'   && r <= 3) { won=true; mult=LOW_MULT;   }
  if (_diceChoose === 'exact' && r === _diceExact) { won=true; mult=EXACT_MULT; }

  if (won) {
    const winAmt = casinoAwardHexper(Math.floor(_casinoBet * (1 + mult)));
    _recordWin(winAmt);
    showNotif(`🎲 Thắng! +${fmtH(winAmt)}`);
  } else {
    showError(`🎲 Thua! Mất ${fmtH(_casinoBet)}`);
  }

  if (G.casinoStats) G.casinoStats.gamesPlayed=(G.casinoStats.gamesPlayed||0)+1;
  saveGame(false);

  // Refresh UI to show result
  setTimeout(() => {
    const area = document.getElementById('casino-game-area');
    if (area) area.innerHTML = _diceUI();
  }, 800);
}


// ═══════════════════════════════════════════════════════
//  RECORD WIN + RENDER ACTIVE
// ═══════════════════════════════════════════════════════
function _recordWin(amount) {
  if (!G.casinoStats) return;
  G.casinoStats.totalWon = (G.casinoStats.totalWon||0) + amount;
  if (amount > (G.casinoStats.biggestWin||0)) G.casinoStats.biggestWin = amount;
}
