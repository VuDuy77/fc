/* ═══ LOTTERY LIVE BANNER ═══ */
.lott-mega-live-banner {
  position: relative; overflow: hidden;
  background: linear-gradient(135deg, #0d0520 0%, #1a0a2e 40%, #0d0520 100%);
  border: 1px solid rgba(124,58,237,0.4);
  border-radius: 16px; padding: 16px; margin-bottom: 14px;
  animation: lottMegaBannerPulse 2.5s ease-in-out infinite;
}
@keyframes lottMegaBannerPulse { 0%,100%{box-shadow:0 0 0 1px rgba(124,58,237,0.3),0 0 30px rgba(124,58,237,0.1)} 50%{box-shadow:0 0 0 1px rgba(232,121,249,0.5),0 0 50px rgba(232,121,249,0.2)} }
.lott-mega-stars { position:absolute; top:0; right:0; bottom:0; left:0; pointer-events:none; overflow:hidden; }
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
// Expose handlers for inline onclick (file:// and strict bundlers)
window.switchLotteryMode = switchLotteryMode;
window.spinLottery = spinLottery;
window.toggleLottLiveBanner = toggleLottLiveBanner;
window.applyGraphicsSetting = applyGraphicsSetting;
window.applyQualityPreset = applyQualityPreset;
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
.rank-profile-overlay { position:fixed; top:0; right:0; bottom:0; left:0; background:rgba(0,0,0,0.85); z-index:800; display:flex; align-items:center; justify-content:center; backdrop-filter:blur(4px); animation:fadeInUp 0.2s ease; }
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
        <div class="rank-badge-big">${getRankSVG(myRank.id, 40)}</div>
        <div class="rank-my-info">
          <div class="rank-my-name" style="color:#e2e8f0">${getNameTagHTML(G.playerName || 'PlayerName')}</div>
          <div class="rank-my-tier" style="color:${myRank.color};font-weight:800;display:flex;align-items:center;gap:5px">${getRankSVG(myRank.id, 14)} ${myRank.name}</div>
          <div class="rank-my-wealth" style="color:#94a3b8;font-size:12px;margin-top:2px">${fmtW(playerWealth)}</div>
        </div>
        ${nextRank ? `<div style="text-align:right">
          <div style="font-size:10px;color:#4b5563">Lên rank tiếp:</div>
          <div style="font-size:13px;font-weight:800;color:${nextRank.color};display:flex;align-items:center;gap:4px;justify-content:flex-end">${getRankSVG(nextRank.id, 16)} ${nextRank.name}</div>
          <div style="font-size:11px;color:#4b5563;margin-top:2px">Cần ${fmtW(nextMin)}</div>
        </div>` : `<div style="font-size:12px;font-weight:800;color:#fde047">👑 MAX RANK</div>`}
      </div>
      ${nextRank ? `
        <div class="rank-progress-bar" style="margin-top:10px">
          <div class="rank-progress-fill" style="width:${progress.toFixed(1)}%;background:${myRank.color}"></div>
        </div>
        <div class="rank-progress-label">
          <span style="color:${myRank.color};display:flex;align-items:center;gap:4px">${getRankSVG(myRank.id, 12)} ${progress.toFixed(1)}%</span>
          <span style="color:${nextRank.color};display:flex;align-items:center;gap:4px">${getRankSVG(nextRank.id, 12)} ${fmtW(nextMin)}</span>
        </div>` : ''}
    </div>

    <!-- Rank tabs -->
    <div style="display:flex;gap:5px;overflow-x:auto;padding-bottom:4px;margin-bottom:12px;scrollbar-width:none">
      ${RANK_TIERS.map(r => {
        const isActive   = r.id === window._activeRankTab;
        const isUnlocked = playerWealth >= r.minWealth;
        return `<div onclick="switchRankTab('${r.id}')" style="
          flex-shrink:0;padding:6px 10px;border-radius:10px;cursor:pointer;font-size:12px;font-weight:700;
          white-space:nowrap;transition:all 0.2s;user-select:none;
          display:flex;align-items:center;gap:5px;
          background:${isActive ? r.bg.replace('0.12','0.28') : r.bg};
          border:1px solid ${isActive ? r.color : r.border};
          color:${isActive ? r.color : '#4b5563'};
          opacity:${isUnlocked ? '1' : '0.45'};
          box-shadow:${isActive ? '0 0 12px ' + r.color + '55' : 'none'};
          transform:${isActive ? 'translateY(-2px)' : 'none'};
        ">${getRankSVG(r.id, 18)} ${r.name}</div>`;
      }).join('')}
    </div>

    <!-- Leaderboard -->
    <div class="rank-leaderboard">
      <div class="rank-lb-header" style="background:${activeTier.bg.replace('0.12','0.18')};display:flex;align-items:center;gap:6px">
        ${getRankSVG(activeTier.id, 18)} ${activeTier.name.toUpperCase()} — 20 Người
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
            <div class="rank-player-name" style="${isMe ? 'color:#fde047;font-weight:800' : ''}">${isMe ? getNameTagHTML(G.playerName || 'Bạn') + ' ◀ Bạn' : p.name}</div>
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

// ═══ RANK SVG ICONS ═══════════════════════════════════════════════
function getRankSVG(rankId, size) {
  size = size || 32;
  const s = size;
  switch(rankId) {
    case 'dong':
      return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="13" fill="#7c4a1e" stroke="#cd7f32" stroke-width="2"/><circle cx="16" cy="16" r="9" fill="none" stroke="#e8a96a" stroke-width="1" stroke-dasharray="2 2"/><circle cx="16" cy="16" r="5" fill="#cd7f32"/><circle cx="16" cy="16" r="2.5" fill="#e8c49a"/></svg>';
    case 'bac':
      return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="16,3 27,9.5 27,22.5 16,29 5,22.5 5,9.5" fill="#2a2a3a" stroke="#c0c0c0" stroke-width="1.5"/><polygon points="16,7 23.5,11.5 23.5,20.5 16,25 8.5,20.5 8.5,11.5" fill="none" stroke="#e8e8e8" stroke-width="0.8" opacity="0.5"/><polygon points="16,10 21,13 21,19 16,22 11,19 11,13" fill="#9ca3af"/><circle cx="16" cy="16" r="3" fill="#e2e8f0"/></svg>';
    case 'vang':
      return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="16,2 19.5,11.5 30,11.5 21.5,17.5 24.5,27 16,21 7.5,27 10.5,17.5 2,11.5 12.5,11.5" fill="#b8860b" stroke="#ffd700" stroke-width="1.2" stroke-linejoin="round"/><polygon points="16,5.5 18.8,13 26.5,13 20.5,17.5 22.8,25 16,20.5 9.2,25 11.5,17.5 5.5,13 13.2,13" fill="#ffd700"/><circle cx="16" cy="15" r="3" fill="#fff7a0" opacity="0.9"/></svg>';
    case 'bachkim':
      return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="16,2 24,8 30,16 24,24 16,30 8,24 2,16 8,8" fill="#1e293b" stroke="#93c5fd" stroke-width="1.5"/><polygon points="16,5 22,10 27,16 22,22 16,27 10,22 5,16 10,10" fill="none" stroke="#bae6fd" stroke-width="0.8" opacity="0.6"/><polygon points="16,9 20,13 22,16 20,19 16,23 12,19 10,16 12,13" fill="#60a5fa" opacity="0.7"/><polygon points="16,12 19,15 16,20 13,15" fill="#e0f2fe"/></svg>';
    case 'kimcuong':
      return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="16,2 26,10 26,22 16,30 6,22 6,10" fill="#0f2044" stroke="#3b82f6" stroke-width="1.5"/><polygon points="16,2 26,10 16,16" fill="#1d4ed8" opacity="0.8"/><polygon points="26,10 26,22 16,16" fill="#2563eb" opacity="0.7"/><polygon points="26,22 16,30 16,16" fill="#1e40af" opacity="0.8"/><polygon points="16,30 6,22 16,16" fill="#1d4ed8" opacity="0.7"/><polygon points="6,22 6,10 16,16" fill="#2563eb" opacity="0.8"/><polygon points="6,10 16,2 16,16" fill="#3b82f6" opacity="0.6"/><circle cx="16" cy="11" r="2.5" fill="#93c5fd" opacity="0.9"/></svg>';
    case 'onyx':
      return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="16,1 31,16 16,31 1,16" fill="#0d0d1a" stroke="#7c3aed" stroke-width="1.5"/><polygon points="16,4 28,16 16,28 4,16" fill="none" stroke="#a78bfa" stroke-width="0.8" opacity="0.5"/><polygon points="16,8 24,16 16,24 8,16" fill="#1e1b4b"/><polygon points="16,8 24,16 16,16" fill="#4c1d95" opacity="0.8"/><polygon points="24,16 16,24 16,16" fill="#3730a3" opacity="0.7"/><polygon points="16,24 8,16 16,16" fill="#4c1d95" opacity="0.8"/><polygon points="8,16 16,8 16,16" fill="#3730a3" opacity="0.7"/><circle cx="16" cy="16" r="2" fill="#a78bfa"/></svg>';
    case 'nemesis':
      return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="rank-svg-nemesis"><circle cx="16" cy="16" r="13" fill="#1a0505" stroke="#dc2626" stroke-width="2"/><circle cx="16" cy="16" r="9" fill="#7f1d1d"/><ellipse cx="16" cy="16" rx="6" ry="9" fill="#991b1b" transform="rotate(-20 16 16)"/><ellipse cx="16" cy="16" rx="5" ry="8" fill="#dc2626" transform="rotate(-20 16 16)"/><ellipse cx="16" cy="16" rx="3" ry="5" fill="#f87171" transform="rotate(-20 16 16)"/><ellipse cx="16" cy="16" rx="1.5" ry="3" fill="#fecaca" transform="rotate(-20 16 16)"/><line x1="16" y1="3" x2="16" y2="0" stroke="#f87171" stroke-width="1.5"/><line x1="22" y1="5" x2="24" y2="2" stroke="#f87171" stroke-width="1.2"/><line x1="10" y1="5" x2="8" y2="2" stroke="#f87171" stroke-width="1.2"/><line x1="27" y1="10" x2="30" y2="9" stroke="#f87171" stroke-width="1.2"/><line x1="5" y1="10" x2="2" y2="9" stroke="#f87171" stroke-width="1.2"/></svg>';
    case 'archnemesis':
      return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="rank-svg-archnemesis"><defs><linearGradient id="cg'+s+'" x1="16" y1="10" x2="16" y2="28" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#fde047"/><stop offset="100%" stop-color="#b45309"/></linearGradient></defs><polygon points="4,28 4,14 10,20 16,10 22,20 28,14 28,28" fill="#78350f" stroke="#d97706" stroke-width="1.5" stroke-linejoin="round"/><polygon points="4,28 4,14 10,20 16,10 22,20 28,14 28,28" fill="url(#cg'+s+')" stroke="#fbbf24" stroke-width="1"/><rect x="4" y="26" width="24" height="4" rx="1.5" fill="#b45309" stroke="#fbbf24" stroke-width="0.8"/><circle cx="16" cy="14" r="3" fill="#dc2626" stroke="#fde047" stroke-width="0.8"/><circle cx="7" cy="21" r="2" fill="#3b82f6" stroke="#fde047" stroke-width="0.8"/><circle cx="25" cy="21" r="2" fill="#10b981" stroke="#fde047" stroke-width="0.8"/></svg>';
    default:
      return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 32 32"><circle cx="16" cy="16" r="13" fill="#374151"/></svg>';
  }
}

// ═══ RANK CARD IN PROFILE ══════════════════════════════════════════
function renderProfileRankCard() {
  var el = document.getElementById('profile-rank-card');
  if (!el) return;
  var rank  = getRankByWealth(G.money);
  var tIdx  = RANK_TIERS.indexOf(rank);
  var next  = RANK_TIERS[tIdx + 1];
  var progress = next
    ? Math.min(100, ((G.money - rank.minWealth) / (next.minWealth - rank.minWealth)) * 100)
    : 100;
  var hasFx = (rank.id === 'nemesis' || rank.id === 'archnemesis');
  var nameStyle = 'font-size:17px;font-weight:800;color:'+rank.color+';line-height:1.2'
    + (hasFx ? ';will-change:filter;animation:rank-name-pulse 2s ease-in-out infinite' : '');
  el.innerHTML =
    '<div style="display:flex;align-items:center;gap:12px">'
    + '<div style="flex-shrink:0;position:relative">'
      + getRankSVG(rank.id, 44)
      + (hasFx ? '<div class="rank-card-aura rank-card-aura--'+rank.id+'"></div>' : '')
    + '</div>'
    + '<div style="flex:1;min-width:0">'
      + '<div style="font-size:11px;color:#4b5563;letter-spacing:1px;text-transform:uppercase;margin-bottom:2px">RANK HIỆN TẠI</div>'
      + '<div style="'+nameStyle+'">'+rank.name+'</div>'
      + '<div style="font-size:11px;color:#6b7280;margin-top:2px">'+(typeof fmtW==='function'?fmtW(G.money):fmt(G.money))+'</div>'
    + '</div>'
    + (next
      ? '<div style="text-align:right;flex-shrink:0"><div style="font-size:9px;color:#4b5563;margin-bottom:4px">KẾ TIẾP</div>'
        + getRankSVG(next.id, 24)
        + '<div style="font-size:10px;color:'+next.color+';font-weight:700;margin-top:2px">'+next.name+'</div></div>'
      : '<div style="font-size:12px;font-weight:800;color:#fde047;text-align:right">MAX<br>RANK</div>')
    + '</div>'
    + (next
      ? '<div style="margin-top:10px">'
        + '<div style="height:6px;background:rgba(255,255,255,0.06);border-radius:4px;overflow:hidden">'
          + '<div style="height:100%;width:'+progress.toFixed(1)+'%;background:'+rank.color
            + ';border-radius:4px;box-shadow:0 0 8px '+rank.color+'88;transition:width 0.5s ease'
            + (hasFx?';animation:rank-bar-glow 1.5s ease-in-out infinite':'')+'"></div>'
        + '</div>'
        + '<div style="display:flex;justify-content:space-between;font-size:10px;color:#4b5563;margin-top:3px">'
          + '<span style="color:'+rank.color+'">'+progress.toFixed(1)+'%</span>'
          + '<span>Cần '+(typeof fmtW==='function'?fmtW(next.minWealth):fmt(next.minWealth))+'</span>'
        + '</div>'
      + '</div>'
      : '');
}
