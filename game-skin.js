/* ┌─────────────────────────────────────────────────────────────────────────┐
   │  MODULE · SKIN SHOP  —  Cases · Profile Icons · Badges                 │
   └─────────────────────────────────────────────────────────────────────────┘ */

// ══════════════════════════════════════════════════════════════
//  SVG ICON POOL  (no emoji — all hand-drawn SVG)
// ══════════════════════════════════════════════════════════════
const SKIN_SVG = {
  // ── Profile Icons ──────────────────────────────────────────
  pfp_robot: (c='#60a5fa',s=64) => `<svg width="${s}" height="${s}" viewBox="0 0 64 64"><rect x="14" y="20" width="36" height="28" rx="7" fill="${c}" opacity=".18"/><rect x="14" y="20" width="36" height="28" rx="7" fill="none" stroke="${c}" stroke-width="2.5"/><rect x="22" y="28" width="8" height="8" rx="3" fill="${c}"/><rect x="34" y="28" width="8" height="8" rx="3" fill="${c}"/><rect x="26" y="40" width="12" height="3" rx="1.5" fill="${c}" opacity=".7"/><rect x="28" y="12" width="8" height="10" rx="3" fill="${c}" opacity=".5"/><circle cx="32" cy="11" r="3" fill="${c}"/><line x1="20" y1="34" x2="14" y2="34" stroke="${c}" stroke-width="2.5" stroke-linecap="round"/><line x1="50" y1="34" x2="44" y2="34" stroke="${c}" stroke-width="2.5" stroke-linecap="round"/></svg>`,

  pfp_knight: (c='#a78bfa',s=64) => `<svg width="${s}" height="${s}" viewBox="0 0 64 64"><polygon points="32,10 44,20 44,44 32,52 20,44 20,20" fill="${c}" opacity=".15" stroke="${c}" stroke-width="2"/><polygon points="32,18 40,25 40,42 32,47 24,42 24,25" fill="${c}" opacity=".25"/><line x1="32" y1="18" x2="32" y2="47" stroke="${c}" stroke-width="1.5" opacity=".6"/><line x1="24" y1="32" x2="40" y2="32" stroke="${c}" stroke-width="1.5" opacity=".6"/><circle cx="32" cy="10" r="3.5" fill="${c}"/></svg>`,

  pfp_flame: (c='#f97316',s=64) => `<svg width="${s}" height="${s}" viewBox="0 0 64 64"><path d="M32 54 C18 54 12 42 18 32 C20 28 22 26 22 22 C26 28 24 32 28 36 C28 30 32 24 36 18 C38 26 34 32 38 38 C42 34 42 28 40 22 C48 30 52 40 46 48 C44 52 38 54 32 54Z" fill="${c}" opacity=".85"/><path d="M32 48 C26 48 24 42 28 38 C30 42 32 40 34 36 C38 40 38 48 32 48Z" fill="#fde68a" opacity=".9"/></svg>`,

  pfp_star: (c='#fbbf24',s=64) => `<svg width="${s}" height="${s}" viewBox="0 0 64 64"><polygon points="32,10 37,26 54,26 40,36 46,52 32,42 18,52 24,36 10,26 27,26" fill="${c}" opacity=".9"/><polygon points="32,16 36,27 48,27 39,34 42,46 32,39 22,46 25,34 16,27 28,27" fill="#fff" opacity=".2"/></svg>`,

  pfp_crown: (c='#f59e0b',s=64) => `<svg width="${s}" height="${s}" viewBox="0 0 64 64"><path d="M12 44 L16 22 L28 34 L32 16 L36 34 L48 22 L52 44 Z" fill="${c}" opacity=".85"/><rect x="12" y="44" width="40" height="6" rx="3" fill="${c}"/><circle cx="12" cy="22" r="4" fill="${c}"/><circle cx="32" cy="14" r="4" fill="${c}"/><circle cx="52" cy="22" r="4" fill="${c}"/><circle cx="32" cy="44" r="2.5" fill="#fff" opacity=".6"/><circle cx="22" cy="44" r="2" fill="#fff" opacity=".4"/><circle cx="42" cy="44" r="2" fill="#fff" opacity=".4"/></svg>`,

  pfp_dragon: (c='#10b981',s=64) => `<svg width="${s}" height="${s}" viewBox="0 0 64 64"><ellipse cx="32" cy="36" rx="16" ry="12" fill="${c}" opacity=".2" stroke="${c}" stroke-width="2"/><path d="M20 36 C18 28 22 20 32 18 C42 20 46 28 44 36" fill="${c}" opacity=".35" stroke="${c}" stroke-width="1.5"/><circle cx="26" cy="26" r="3.5" fill="${c}"/><circle cx="38" cy="26" r="3.5" fill="${c}"/><circle cx="26" cy="25" r="1.5" fill="#fff"/><circle cx="38" cy="25" r="1.5" fill="#fff"/><path d="M28 32 Q32 35 36 32" stroke="${c}" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M20 20 L16 12 M22 18 L20 10" stroke="${c}" stroke-width="2" stroke-linecap="round" opacity=".7"/><path d="M44 20 L48 12 M42 18 L44 10" stroke="${c}" stroke-width="2" stroke-linecap="round" opacity=".7"/><path d="M44 38 C48 40 50 46 46 48 C50 46 54 44 52 38" fill="${c}" opacity=".5"/></svg>`,

  pfp_ghost: (c='#818cf8',s=64) => `<svg width="${s}" height="${s}" viewBox="0 0 64 64"><path d="M16 48 L16 28 C16 18 48 18 48 28 L48 48 C48 48 44 44 40 48 C40 48 36 44 32 48 C32 48 28 44 24 48 C24 48 20 44 16 48Z" fill="${c}" opacity=".75"/><circle cx="26" cy="30" r="4" fill="#fff" opacity=".9"/><circle cx="38" cy="30" r="4" fill="#fff" opacity=".9"/><circle cx="27" cy="31" r="1.5" fill="#1e1b4b"/><circle cx="39" cy="31" r="1.5" fill="#1e1b4b"/></svg>`,

  pfp_crystal: (c='#67e8f9',s=64) => `<svg width="${s}" height="${s}" viewBox="0 0 64 64"><polygon points="32,10 48,24 44,50 32,54 20,50 16,24" fill="${c}" opacity=".2" stroke="${c}" stroke-width="2"/><polygon points="32,16 42,26 40,46 32,50 24,46 22,26" fill="${c}" opacity=".15"/><line x1="32" y1="10" x2="32" y2="54" stroke="#fff" stroke-width="1" opacity=".3"/><line x1="16" y1="24" x2="48" y2="24" stroke="#fff" stroke-width="1" opacity=".3"/><circle cx="32" cy="10" r="2" fill="#fff" opacity=".8"/><circle cx="48" cy="24" r="2" fill="#fff" opacity=".6"/><circle cx="16" cy="24" r="2" fill="#fff" opacity=".6"/></svg>`,

  pfp_galaxy: (c='#c084fc',s=64) => `<svg width="${s}" height="${s}" viewBox="0 0 64 64"><circle cx="32" cy="32" r="20" fill="${c}" opacity=".1" stroke="${c}" stroke-width="1.5"/><ellipse cx="32" cy="32" rx="24" ry="8" fill="none" stroke="${c}" stroke-width="1.5" opacity=".5" transform="rotate(-30 32 32)"/><circle cx="32" cy="32" r="5" fill="${c}" opacity=".8"/><circle cx="32" cy="32" r="2" fill="#fff" opacity=".9"/><circle cx="20" cy="22" r="1.5" fill="#fff" opacity=".7"/><circle cx="44" cy="18" r="1" fill="#fff" opacity=".5"/><circle cx="14" cy="36" r="1" fill="#fff" opacity=".4"/><circle cx="50" cy="42" r="1.5" fill="#fff" opacity=".6"/><circle cx="38" cy="48" r="1" fill="#fff" opacity=".4"/></svg>`,

  pfp_phoenix: (c='#fb923c',s=64) => `<svg width="${s}" height="${s}" viewBox="0 0 64 64"><path d="M32 54 C24 50 14 42 16 30 C18 22 26 18 32 20 C38 18 46 22 48 30 C50 42 40 50 32 54Z" fill="${c}" opacity=".25"/><path d="M32 20 C26 14 14 16 12 26 C18 22 26 22 32 28" fill="${c}" opacity=".6"/><path d="M32 20 C38 14 50 16 52 26 C46 22 38 22 32 28" fill="${c}" opacity=".6"/><path d="M24 38 C20 30 22 22 32 18 C42 22 44 30 40 38 C38 44 36 48 32 52 C28 48 26 44 24 38Z" fill="${c}" opacity=".8"/><circle cx="32" cy="30" r="5" fill="#fde68a" opacity=".9"/><path d="M32 52 L28 44 M32 52 L36 44" stroke="${c}" stroke-width="2" opacity=".5" stroke-linecap="round"/></svg>`,

  pfp_void: (c='#6366f1',s=64) => `<svg width="${s}" height="${s}" viewBox="0 0 64 64"><circle cx="32" cy="32" r="22" fill="#0d0d1a"/><circle cx="32" cy="32" r="22" fill="none" stroke="${c}" stroke-width="2"/><circle cx="32" cy="32" r="14" fill="none" stroke="${c}" stroke-width="1" opacity=".5"/><circle cx="32" cy="32" r="6" fill="${c}" opacity=".7"/><circle cx="32" cy="32" r="2" fill="#fff"/><line x1="10" y1="32" x2="22" y2="32" stroke="${c}" stroke-width="1" opacity=".4"/><line x1="42" y1="32" x2="54" y2="32" stroke="${c}" stroke-width="1" opacity=".4"/><line x1="32" y1="10" x2="32" y2="22" stroke="${c}" stroke-width="1" opacity=".4"/><line x1="32" y1="42" x2="32" y2="54" stroke="${c}" stroke-width="1" opacity=".4"/></svg>`,

  // ── Badges ─────────────────────────────────────────────────
  badge_bronze: (s=28) => `<svg width="${s}" height="${s}" viewBox="0 0 28 28"><circle cx="14" cy="14" r="12" fill="#92400e" opacity=".9"/><circle cx="14" cy="14" r="9" fill="#b45309" opacity=".7"/><text x="14" y="19" text-anchor="middle" font-size="11" font-weight="900" fill="#fef3c7" font-family="Arial">B</text></svg>`,

  badge_silver: (s=28) => `<svg width="${s}" height="${s}" viewBox="0 0 28 28"><circle cx="14" cy="14" r="12" fill="#4b5563" opacity=".9"/><circle cx="14" cy="14" r="9" fill="#9ca3af" opacity=".6"/><text x="14" y="19" text-anchor="middle" font-size="11" font-weight="900" fill="#f1f5f9" font-family="Arial">S</text></svg>`,

  badge_gold: (s=28) => `<svg width="${s}" height="${s}" viewBox="0 0 28 28"><circle cx="14" cy="14" r="12" fill="#b45309" opacity=".9"/><circle cx="14" cy="14" r="9" fill="#fbbf24" opacity=".8"/><text x="14" y="19" text-anchor="middle" font-size="11" font-weight="900" fill="#451a03" font-family="Arial">G</text></svg>`,

  badge_diamond: (s=28) => `<svg width="${s}" height="${s}" viewBox="0 0 28 28"><polygon points="14,3 24,11 21,23 7,23 4,11" fill="#0e7490" opacity=".9"/><polygon points="14,7 21,13 18.5,21 9.5,21 7,13" fill="#67e8f9" opacity=".7"/><polygon points="14,3 4,11 7,3" fill="#a5f3fc" opacity=".4"/></svg>`,

  badge_flame: (s=28) => `<svg width="${s}" height="${s}" viewBox="0 0 28 28"><path d="M14 24C8 24 5 18 8 13C9 11 10 10 10 8C12 11 11 13 13 15C13 12 14 10 16 7C17 10 15 13 17 16C19 13 19 10 18 8C22 12 23 18 20 22C19 23 17 24 14 24Z" fill="#f97316" opacity=".9"/><path d="M14 21C11 21 10 18 12 16C13 18 14 17 15 15C17 17 17 21 14 21Z" fill="#fde68a" opacity=".95"/></svg>`,

  badge_lightning: (s=28) => `<svg width="${s}" height="${s}" viewBox="0 0 28 28"><polygon points="16,3 8,15 14,15 12,25 20,12 14,12" fill="#fbbf24" opacity=".95"/><polygon points="16,3 8,15 14,15 12,25 20,12 14,12" fill="none" stroke="#fef3c7" stroke-width="0.5" opacity=".5"/></svg>`,

  badge_skull: (s=28) => `<svg width="${s}" height="${s}" viewBox="0 0 28 28"><ellipse cx="14" cy="13" rx="9" ry="10" fill="#1e293b" stroke="#64748b" stroke-width="1.5"/><circle cx="11" cy="12" r="2.5" fill="#e2e8f0"/><circle cx="17" cy="12" r="2.5" fill="#e2e8f0"/><circle cx="11" cy="12" r="1" fill="#0f172a"/><circle cx="17" cy="12" r="1" fill="#0f172a"/><rect x="10" y="19" width="2" height="5" rx="1" fill="#64748b"/><rect x="13" y="19" width="2" height="5" rx="1" fill="#64748b"/><rect x="16" y="19" width="2" height="5" rx="1" fill="#64748b"/><rect x="9.5" y="20" width="9" height="2" rx="1" fill="#334155" opacity=".5"/></svg>`,

  badge_crown: (s=28) => `<svg width="${s}" height="${s}" viewBox="0 0 28 28"><path d="M4 20 L6 10 L11 15 L14 6 L17 15 L22 10 L24 20 Z" fill="#f59e0b" opacity=".9"/><rect x="4" y="20" width="20" height="4" rx="2" fill="#b45309"/><circle cx="4" cy="10" r="2.5" fill="#fde68a"/><circle cx="14" cy="5" r="2.5" fill="#fde68a"/><circle cx="24" cy="10" r="2.5" fill="#fde68a"/></svg>`,

  badge_star: (s=28) => `<svg width="${s}" height="${s}" viewBox="0 0 28 28"><polygon points="14,3 16.5,10.5 25,10.5 18.5,15.5 21,23 14,18 7,23 9.5,15.5 3,10.5 11.5,10.5" fill="#fbbf24" opacity=".9"/></svg>`,

  badge_galaxy: (s=28) => `<svg width="${s}" height="${s}" viewBox="0 0 28 28"><circle cx="14" cy="14" r="11" fill="#1e1b4b" stroke="#6366f1" stroke-width="1.5"/><ellipse cx="14" cy="14" rx="9" ry="3" fill="none" stroke="#a78bfa" stroke-width="1" opacity=".6" transform="rotate(-30 14 14)"/><circle cx="14" cy="14" r="3" fill="#c084fc" opacity=".9"/><circle cx="8" cy="10" r="0.8" fill="#fff" opacity=".7"/><circle cx="20" cy="9" r="0.6" fill="#fff" opacity=".5"/><circle cx="22" cy="18" r="0.8" fill="#fff" opacity=".6"/><circle cx="7" cy="19" r="0.6" fill="#fff" opacity=".4"/></svg>`,

  badge_void: (s=28) => `<svg width="${s}" height="${s}" viewBox="0 0 28 28"><circle cx="14" cy="14" r="11" fill="#0d0820" stroke="#6d28d9" stroke-width="1.5"/><circle cx="14" cy="14" r="7" fill="none" stroke="#7c3aed" stroke-width="1" opacity=".5"/><circle cx="14" cy="14" r="3" fill="#8b5cf6" opacity=".8"/><circle cx="14" cy="14" r="1" fill="#fff" opacity=".9"/></svg>`,

  badge_rainbow: (s=28) => `<svg width="${s}" height="${s}" viewBox="0 0 28 28"><defs><linearGradient id="rbg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f87171"/><stop offset="25%" stop-color="#fbbf24"/><stop offset="50%" stop-color="#4ade80"/><stop offset="75%" stop-color="#60a5fa"/><stop offset="100%" stop-color="#c084fc"/></linearGradient></defs><circle cx="14" cy="14" r="12" fill="url(#rbg)" opacity=".9"/><circle cx="14" cy="14" r="7" fill="#0d0d1a" opacity=".7"/><circle cx="14" cy="14" r="3" fill="url(#rbg)" opacity=".8"/></svg>`,

  badge_nemesis: (s=28) => `<svg width="${s}" height="${s}" viewBox="0 0 28 28"><polygon points="14,2 18,9 26,10 20,17 22,25 14,21 6,25 8,17 2,10 10,9" fill="#dc2626" opacity=".9"/><polygon points="14,6 17,11 23,12 18.5,17 20,23 14,20 8,23 9.5,17 5,12 11,11" fill="#fca5a5" opacity=".3"/><circle cx="14" cy="14" r="2.5" fill="#fff" opacity=".8"/></svg>`,
};

// ══════════════════════════════════════════════════════════════
//  CASE DEFINITIONS
// ══════════════════════════════════════════════════════════════
const SKIN_CASES = [
  // ─── ICON CASES (buy with $) ──────────────────────────────
  {
    id: 'icon_basic',
    name: 'Starter Icon Case',
    type: 'icon',    // drops profile icons
    currency: 'money',
    price: 100,
    theme: { bg: '#0d1626', border: '#1e40af', accent: '#60a5fa', glow: 'rgba(96,165,250,0.25)' },
    label: 'Basic',
    rarityLabel: 'Phổ Thông',
    items: [
      { id:'pfp_robot',   rarity:'common',    weight:35, color:'#60a5fa' },
      { id:'pfp_knight',  rarity:'common',    weight:30, color:'#a78bfa' },
      { id:'pfp_flame',   rarity:'uncommon',  weight:18, color:'#f97316' },
      { id:'pfp_star',    rarity:'uncommon',  weight:12, color:'#fbbf24' },
      { id:'pfp_crown',   rarity:'rare',      weight:5,  color:'#f59e0b' },
    ],
    decorSVG: (s=80) => `<svg width="${s}" height="${s}" viewBox="0 0 80 80"><rect x="8" y="8" width="64" height="64" rx="12" fill="#0d1626" stroke="#1e40af" stroke-width="2"/><rect x="14" y="14" width="52" height="52" rx="8" fill="rgba(30,64,175,0.15)"/><circle cx="40" cy="35" r="14" fill="rgba(96,165,250,0.15)" stroke="#60a5fa" stroke-width="1.5"/><line x1="32" y1="35" x2="48" y2="35" stroke="#60a5fa" stroke-width="1.5" opacity=".5"/><line x1="40" y1="27" x2="40" y2="43" stroke="#60a5fa" stroke-width="1.5" opacity=".5"/><circle cx="40" cy="35" r="5" fill="#60a5fa" opacity=".7"/><rect x="24" y="54" width="32" height="5" rx="2.5" fill="#1e40af" opacity=".7"/><text x="40" y="74" text-anchor="middle" font-size="8" fill="#93c5fd" font-family="Arial" font-weight="600">STARTER</text></svg>`,
  },
  {
    id: 'icon_elite',
    name: 'Elite Icon Case',
    type: 'icon',
    currency: 'money',
    price: 500,
    theme: { bg: '#1a0a0a', border: '#991b1b', accent: '#f87171', glow: 'rgba(248,113,113,0.25)' },
    label: 'Elite',
    rarityLabel: 'Cao Cấp',
    items: [
      { id:'pfp_ghost',   rarity:'uncommon',  weight:28, color:'#818cf8' },
      { id:'pfp_crystal', rarity:'uncommon',  weight:24, color:'#67e8f9' },
      { id:'pfp_dragon',  rarity:'rare',      weight:20, color:'#10b981' },
      { id:'pfp_galaxy',  rarity:'epic',      weight:15, color:'#c084fc' },
      { id:'pfp_phoenix', rarity:'epic',      weight:9,  color:'#fb923c' },
      { id:'pfp_void',    rarity:'legendary', weight:4,  color:'#6366f1' },
    ],
    decorSVG: (s=80) => `<svg width="${s}" height="${s}" viewBox="0 0 80 80"><rect x="8" y="8" width="64" height="64" rx="12" fill="#1a0a0a" stroke="#991b1b" stroke-width="2"/><path d="M40 18 L56 28 L56 50 L40 60 L24 50 L24 28 Z" fill="rgba(153,27,27,0.2)" stroke="#f87171" stroke-width="1.5"/><path d="M40 26 L50 32 L50 46 L40 52 L30 46 L30 32 Z" fill="rgba(248,113,113,0.1)"/><circle cx="40" cy="39" r="5" fill="#f87171" opacity=".8"/><circle cx="40" cy="39" r="2" fill="#fff" opacity=".7"/><text x="40" y="74" text-anchor="middle" font-size="8" fill="#fca5a5" font-family="Arial" font-weight="600">ELITE</text></svg>`,
  },

  // ─── BADGE CASES (buy with token) ─────────────────────────
  {
    id: 'badge_starter',
    name: 'Bronze Badge Case',
    type: 'badge',
    currency: 'token',
    price: 99,
    theme: { bg: '#1c1108', border: '#78350f', accent: '#d97706', glow: 'rgba(217,119,6,0.25)' },
    label: 'Bronze',
    rarityLabel: 'Cơ Bản',
    items: [
      { id:'badge_bronze',    rarity:'common',    weight:40, color:'#b45309' },
      { id:'badge_silver',    rarity:'common',    weight:30, color:'#9ca3af' },
      { id:'badge_star',      rarity:'uncommon',  weight:18, color:'#fbbf24' },
      { id:'badge_lightning', rarity:'rare',      weight:9,  color:'#fbbf24' },
      { id:'badge_flame',     rarity:'epic',      weight:3,  color:'#f97316' },
    ],
    decorSVG: (s=80) => `<svg width="${s}" height="${s}" viewBox="0 0 80 80"><rect x="8" y="8" width="64" height="64" rx="12" fill="#1c1108" stroke="#78350f" stroke-width="2"/><circle cx="40" cy="36" r="18" fill="rgba(120,53,15,0.2)" stroke="#d97706" stroke-width="1.5"/><circle cx="40" cy="36" r="12" fill="rgba(217,119,6,0.15)"/><circle cx="40" cy="36" r="6" fill="#d97706" opacity=".7"/><circle cx="40" cy="36" r="2.5" fill="#fef3c7" opacity=".8"/><line x1="24" y1="36" x2="30" y2="36" stroke="#d97706" stroke-width="1.5" opacity=".5"/><line x1="50" y1="36" x2="56" y2="36" stroke="#d97706" stroke-width="1.5" opacity=".5"/><line x1="40" y1="20" x2="40" y2="26" stroke="#d97706" stroke-width="1.5" opacity=".5"/><line x1="40" y1="46" x2="40" y2="52" stroke="#d97706" stroke-width="1.5" opacity=".5"/><text x="40" y="68" text-anchor="middle" font-size="7" fill="#fde68a" font-family="Arial" font-weight="600">BRONZE CASE</text></svg>`,
  },
  {
    id: 'badge_silver',
    name: 'Silver Badge Case',
    type: 'badge',
    currency: 'token',
    price: 199,
    theme: { bg: '#0f1117', border: '#334155', accent: '#94a3b8', glow: 'rgba(148,163,184,0.2)' },
    label: 'Silver',
    rarityLabel: 'Bạc',
    items: [
      { id:'badge_silver',    rarity:'common',    weight:30, color:'#9ca3af' },
      { id:'badge_gold',      rarity:'uncommon',  weight:28, color:'#fbbf24' },
      { id:'badge_skull',     rarity:'uncommon',  weight:22, color:'#64748b' },
      { id:'badge_diamond',   rarity:'rare',      weight:13, color:'#67e8f9' },
      { id:'badge_crown',     rarity:'epic',      weight:6,  color:'#f59e0b' },
      { id:'badge_star',      rarity:'legendary', weight:1,  color:'#fde68a' },
    ],
    decorSVG: (s=80) => `<svg width="${s}" height="${s}" viewBox="0 0 80 80"><rect x="8" y="8" width="64" height="64" rx="12" fill="#0f1117" stroke="#334155" stroke-width="2"/><polygon points="40,18 56,30 50,50 40,54 30,50 24,30" fill="rgba(51,65,85,0.25)" stroke="#94a3b8" stroke-width="1.5"/><polygon points="40,24 50,33 46,47 40,50 34,47 30,33" fill="rgba(148,163,184,0.1)"/><circle cx="40" cy="36" r="5" fill="#94a3b8" opacity=".8"/><circle cx="40" cy="36" r="2" fill="#f1f5f9" opacity=".8"/><text x="40" y="72" text-anchor="middle" font-size="7" fill="#cbd5e1" font-family="Arial" font-weight="600">SILVER CASE</text></svg>`,
  },
  {
    id: 'badge_gold',
    name: 'Gold Badge Case',
    type: 'badge',
    currency: 'token',
    price: 299,
    theme: { bg: '#1a1100', border: '#92400e', accent: '#fbbf24', glow: 'rgba(251,191,36,0.3)' },
    label: 'Gold',
    rarityLabel: 'Vàng',
    items: [
      { id:'badge_gold',      rarity:'uncommon',  weight:30, color:'#fbbf24' },
      { id:'badge_crown',     rarity:'uncommon',  weight:25, color:'#f59e0b' },
      { id:'badge_flame',     rarity:'rare',      weight:20, color:'#f97316' },
      { id:'badge_diamond',   rarity:'rare',      weight:14, color:'#67e8f9' },
      { id:'badge_galaxy',    rarity:'epic',      weight:8,  color:'#c084fc' },
      { id:'badge_rainbow',   rarity:'legendary', weight:3,  color:'#e879f9' },
    ],
    decorSVG: (s=80) => `<svg width="${s}" height="${s}" viewBox="0 0 80 80"><rect x="8" y="8" width="64" height="64" rx="12" fill="#1a1100" stroke="#92400e" stroke-width="2"/><path d="M40 16 L52 24 L52 54 L40 62 L28 54 L28 24 Z" fill="rgba(146,64,14,0.2)" stroke="#fbbf24" stroke-width="1.5"/><circle cx="40" cy="38" r="10" fill="rgba(251,191,36,0.1)" stroke="#f59e0b" stroke-width="1"/><circle cx="40" cy="20" r="3" fill="#fbbf24" opacity=".9"/><circle cx="52" cy="38" r="2" fill="#fbbf24" opacity=".7"/><circle cx="28" cy="38" r="2" fill="#fbbf24" opacity=".7"/><circle cx="40" cy="56" r="3" fill="#fbbf24" opacity=".9"/><circle cx="40" cy="38" r="4" fill="#fbbf24" opacity=".8"/><text x="40" y="74" text-anchor="middle" font-size="7" fill="#fde68a" font-family="Arial" font-weight="600">GOLD CASE</text></svg>`,
  },
  {
    id: 'badge_nemesis',
    name: 'Nemesis Badge Case',
    type: 'badge',
    currency: 'token',
    price: 599,
    theme: { bg: '#0d0010', border: '#6d28d9', accent: '#c084fc', glow: 'rgba(192,132,252,0.35)' },
    label: 'Nemesis',
    rarityLabel: 'Huyền Thoại',
    items: [
      { id:'badge_galaxy',    rarity:'rare',      weight:28, color:'#c084fc' },
      { id:'badge_void',      rarity:'rare',      weight:24, color:'#6366f1' },
      { id:'badge_skull',     rarity:'epic',      weight:20, color:'#64748b' },
      { id:'badge_nemesis',   rarity:'epic',      weight:16, color:'#dc2626' },
      { id:'badge_rainbow',   rarity:'legendary', weight:9,  color:'#e879f9' },
      { id:'badge_star',      rarity:'mythic',    weight:3,  color:'#fde68a' },
    ],
    decorSVG: (s=80) => `<svg width="${s}" height="${s}" viewBox="0 0 80 80"><rect x="8" y="8" width="64" height="64" rx="12" fill="#0d0010" stroke="#6d28d9" stroke-width="2"/><circle cx="40" cy="38" r="22" fill="none" stroke="#6d28d9" stroke-width="1" opacity=".5"/><circle cx="40" cy="38" r="15" fill="rgba(109,40,217,0.15)" stroke="#a78bfa" stroke-width="1"/><circle cx="40" cy="38" r="8" fill="rgba(192,132,252,0.2)"/><circle cx="40" cy="38" r="3" fill="#c084fc" opacity=".9"/><circle cx="40" cy="38" r="1.2" fill="#fff" opacity=".9"/><circle cx="28" cy="22" r="1.5" fill="#c084fc" opacity=".6"/><circle cx="52" cy="20" r="1" fill="#a78bfa" opacity=".5"/><circle cx="56" cy="44" r="1.5" fill="#818cf8" opacity=".6"/><circle cx="26" cy="52" r="1" fill="#c084fc" opacity=".4"/><text x="40" y="72" text-anchor="middle" font-size="7" fill="#d8b4fe" font-family="Arial" font-weight="600">NEMESIS CASE</text></svg>`,
  },
  {
    id: 'badge_ultimate',
    name: 'Ultimate Badge Case',
    type: 'badge',
    currency: 'token',
    price: 1999,
    theme: { bg: '#0a0014', border: '#7c3aed', accent: '#e879f9', glow: 'rgba(232,121,249,0.4)' },
    label: 'Ultimate',
    rarityLabel: 'Tối Thượng',
    items: [
      { id:'badge_void',      rarity:'epic',      weight:25, color:'#6366f1' },
      { id:'badge_nemesis',   rarity:'epic',      weight:22, color:'#dc2626' },
      { id:'badge_galaxy',    rarity:'legendary', weight:20, color:'#c084fc' },
      { id:'badge_rainbow',   rarity:'legendary', weight:18, color:'#e879f9' },
      { id:'badge_skull',     rarity:'mythic',    weight:10, color:'#64748b' },
      { id:'badge_star',      rarity:'mythic',    weight:5,  color:'#fde68a' },
    ],
    decorSVG: (s=80) => `<svg width="${s}" height="${s}" viewBox="0 0 80 80"><defs><linearGradient id="ult-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0a0014"/><stop offset="100%" stop-color="#1a0020"/></linearGradient><linearGradient id="ult-ring" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#e879f9"/><stop offset="50%" stop-color="#7c3aed"/><stop offset="100%" stop-color="#60a5fa"/></linearGradient></defs><rect x="8" y="8" width="64" height="64" rx="12" fill="url(#ult-bg)" stroke="url(#ult-ring)" stroke-width="2"/><circle cx="40" cy="37" r="20" fill="none" stroke="url(#ult-ring)" stroke-width="1.2" opacity=".6"/><circle cx="40" cy="37" r="13" fill="none" stroke="#a78bfa" stroke-width="1" opacity=".4"/><circle cx="40" cy="37" r="6" fill="rgba(232,121,249,0.3)"/><circle cx="40" cy="37" r="2.5" fill="#e879f9" opacity=".9"/><circle cx="40" cy="37" r="1" fill="#fff"/><circle cx="23" cy="28" r="1.5" fill="#e879f9" opacity=".7"/><circle cx="57" cy="26" r="1" fill="#c084fc" opacity=".6"/><circle cx="58" cy="48" r="1.5" fill="#60a5fa" opacity=".6"/><circle cx="22" cy="50" r="1" fill="#a78bfa" opacity=".5"/><circle cx="40" cy="18" r="2" fill="#e879f9" opacity=".8"/><circle cx="40" cy="56" r="2" fill="#7c3aed" opacity=".7"/><text x="40" y="72" text-anchor="middle" font-size="7" fill="#e879f9" font-family="Arial" font-weight="700">ULTIMATE</text></svg>`,
  },
];

// ── Rarity config ──────────────────────────────────────────────
const RARITY_CONFIG = {
  common:    { label:'Phổ Thông', color:'#94a3b8', bg:'rgba(148,163,184,0.1)' },
  uncommon:  { label:'Không Thường', color:'#4ade80', bg:'rgba(74,222,128,0.12)' },
  rare:      { label:'Hiếm', color:'#60a5fa', bg:'rgba(96,165,250,0.15)' },
  epic:      { label:'Sử Thi', color:'#c084fc', bg:'rgba(192,132,252,0.18)' },
  legendary: { label:'Huyền Thoại', color:'#f59e0b', bg:'rgba(245,158,11,0.2)' },
  mythic:    { label:'Huyền Bí', color:'#f43f5e', bg:'rgba(244,63,94,0.2)' },
};

// ══════════════════════════════════════════════════════════════
//  ITEM NAMES
// ══════════════════════════════════════════════════════════════
const SKIN_ITEM_NAMES = {
  // Icons
  pfp_robot: 'Cyborg',
  pfp_knight: 'Hiệp Sĩ',
  pfp_flame: 'Ngọn Lửa',
  pfp_star: 'Ngôi Sao',
  pfp_crown: 'Hoàng Gia',
  pfp_dragon: 'Rồng Thần',
  pfp_ghost: 'Linh Hồn',
  pfp_crystal: 'Tinh Thể',
  pfp_galaxy: 'Thiên Hà',
  pfp_phoenix: 'Phượng Hoàng',
  pfp_void: 'Hư Không',
  // Badges
  badge_bronze: 'Huy Hiệu Đồng',
  badge_silver: 'Huy Hiệu Bạc',
  badge_gold: 'Huy Hiệu Vàng',
  badge_diamond: 'Huy Hiệu Kim Cương',
  badge_flame: 'Huy Hiệu Lửa',
  badge_lightning: 'Huy Hiệu Sét',
  badge_skull: 'Huy Hiệu Đầu Lâu',
  badge_crown: 'Huy Hiệu Vương Miện',
  badge_star: 'Huy Hiệu Ngôi Sao',
  badge_galaxy: 'Huy Hiệu Thiên Hà',
  badge_void: 'Huy Hiệu Hư Không',
  badge_rainbow: 'Huy Hiệu Cầu Vồng',
  badge_nemesis: 'Huy Hiệu Nemesis',
};

// ══════════════════════════════════════════════════════════════
//  HELPER: WEIGHTED RANDOM
// ══════════════════════════════════════════════════════════════
function skinWeightedRandom(items) {
  const total = items.reduce((s,i) => s + i.weight, 0);
  let r = Math.random() * total;
  for (const item of items) {
    r -= item.weight;
    if (r <= 0) return item;
  }
  return items[items.length - 1];
}

// ══════════════════════════════════════════════════════════════
//  GET SVG FOR PROFILE ICON / BADGE  (used externally)
// ══════════════════════════════════════════════════════════════
function getSkinIconSVG(id, size=64) {
  const fn = SKIN_SVG[id];
  if (!fn) return '';
  // Icons take color arg, badges don't (or use default)
  // Detect by prefix
  if (id.startsWith('pfp_')) {
    // find item color from cases
    let color = '#60a5fa';
    for (const c of SKIN_CASES) {
      const it = c.items.find(x => x.id === id);
      if (it) { color = it.color; break; }
    }
    return fn(color, size);
  }
  return fn(size);
}

// ══════════════════════════════════════════════════════════════
//  OPEN CASE — returns drop result
// ══════════════════════════════════════════════════════════════
function openSkinCase(caseId) {
  const sc = SKIN_CASES.find(c => c.id === caseId);
  if (!sc) return;

  // Show confirm popup for token cases
  if (sc.currency === 'token') {
    const tok = G.wallet.token || 0;
    if (tok < sc.price) { showError('🔮 Không đủ token! Cần ' + sc.price + ' token'); return; }
    // Build confirm overlay
    const existing = document.getElementById('skin-case-confirm');
    if (existing) existing.remove();
    const overlay = document.createElement('div');
    overlay.id = 'skin-case-confirm';
    overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.88);z-index:1300;display:flex;align-items:center;justify-content:center;padding:16px;backdrop-filter:blur(6px)';
    const t = sc.theme;
    overlay.innerHTML = `
      <div style="background:linear-gradient(135deg,${t.bg},#0d1117);border:2px solid ${t.accent}55;border-radius:16px;padding:26px 22px;width:100%;max-width:320px;text-align:center;box-shadow:0 0 40px ${t.glow}">
        <div style="font-size:40px;margin-bottom:10px">🎁</div>
        <div style="font-size:16px;font-weight:800;color:${t.accent};margin-bottom:6px">${sc.name}</div>
        <div style="font-size:13px;color:#9ca3af;margin-bottom:16px">Xác nhận mở hòm này?</div>
        <div style="background:#0d1117;border:1px solid ${t.accent}33;border-radius:10px;padding:10px;margin-bottom:18px">
          <div style="font-size:13px;color:#6b7280">Chi phí</div>
          <div style="font-size:20px;font-weight:800;color:#00f5ff">🔮 ${sc.price} Token</div>
          <div style="font-size:12px;color:#4b5563;margin-top:4px">Còn lại: 🔮 ${tok - sc.price} Token</div>
        </div>
        <div style="display:flex;gap:10px">
          <button onclick="document.getElementById('skin-case-confirm').remove()" style="flex:1;padding:11px;background:#1f2937;color:#9ca3af;border:1px solid #374151;border-radius:10px;cursor:pointer;font-size:14px;font-weight:600">Hủy</button>
          <button onclick="document.getElementById('skin-case-confirm').remove();_doOpenSkinCase('${caseId}')" style="flex:1;padding:11px;background:linear-gradient(135deg,${t.bg},${t.border}44);color:${t.accent};border:1.5px solid ${t.accent}66;border-radius:10px;cursor:pointer;font-size:14px;font-weight:700">✅ Xác Nhận</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    return;
  }

  // Money cases: open directly (no confirm needed)
  _doOpenSkinCase(caseId);
}

function _doOpenSkinCase(caseId) {
  const sc = SKIN_CASES.find(c => c.id === caseId);
  if (!sc) return;

  // Currency check
  if (sc.currency === 'money') {
    if (G.money < sc.price) { showError('💸 Không đủ tiền! Cần ' + fmt(sc.price)); return; }
    G.money -= sc.price;
  } else {
    const tok = G.wallet.token || 0;
    if (tok < sc.price) { showError('🔮 Không đủ token! Cần ' + sc.price + ' token'); return; }
    G.wallet.token -= sc.price;
  }

  const drop = skinWeightedRandom(sc.items);
  const rc = RARITY_CONFIG[drop.rarity];

  // Play case open sound
  (function playCaseOpenSound() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      // Click / thud
      const buf1 = ctx.createBuffer(1, ctx.sampleRate * 0.15, ctx.sampleRate);
      const d1 = buf1.getChannelData(0);
      for (let i = 0; i < d1.length; i++) {
        d1[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.04));
      }
      const src1 = ctx.createBufferSource();
      src1.buffer = buf1;
      const g1 = ctx.createGain(); g1.gain.value = 0.4;
      src1.connect(g1); g1.connect(ctx.destination);
      src1.start(0);
      // Rising shimmer tone
      const osc = ctx.createOscillator();
      const gOsc = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, ctx.currentTime + 0.05);
      osc.frequency.linearRampToValueAtTime(900, ctx.currentTime + 0.4);
      gOsc.gain.setValueAtTime(0, ctx.currentTime + 0.05);
      gOsc.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.15);
      gOsc.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
      osc.connect(gOsc); gOsc.connect(ctx.destination);
      osc.start(ctx.currentTime + 0.05);
      osc.stop(ctx.currentTime + 0.5);
      // Rarity-based extra chime (epic+ gets higher pitch)
      const rarityPitch = { common:0, uncommon:0, rare:1, epic:2, legendary:3, mythic:4 };
      const bonus = rarityPitch[drop.rarity] || 0;
      if (bonus > 0) {
        const osc2 = ctx.createOscillator();
        const g2 = ctx.createGain();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(600 + bonus * 200, ctx.currentTime + 0.35);
        osc2.frequency.linearRampToValueAtTime(1200 + bonus * 300, ctx.currentTime + 0.7);
        g2.gain.setValueAtTime(0, ctx.currentTime + 0.35);
        g2.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.45);
        g2.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);
        osc2.connect(g2); g2.connect(ctx.destination);
        osc2.start(ctx.currentTime + 0.35);
        osc2.stop(ctx.currentTime + 0.8);
      }
    } catch(e) {}
  })();

  // Save to collection
  if (!G.skinCollection) G.skinCollection = { icons: [], badges: [] };
  const collKey = sc.type === 'icon' ? 'icons' : 'badges';
  if (!G.skinCollection[collKey].includes(drop.id)) {
    G.skinCollection[collKey].push(drop.id);
  }

  updateUI();
  saveGame(false);

  // Show open animation overlay
  showCaseOpenResult(sc, drop, rc);
}

// ══════════════════════════════════════════════════════════════
//  RENDER RESULT OVERLAY
// ══════════════════════════════════════════════════════════════
function showCaseOpenResult(sc, drop, rc) {
  const existing = document.getElementById('skin-result-overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'skin-result-overlay';
  overlay.style.cssText = `
    position:fixed;top:0;left:0;right:0;bottom:0;
    background:rgba(0,0,0,0.92);z-index:1200;
    display:flex;align-items:center;justify-content:center;
    backdrop-filter:blur(8px);animation:fadeInUp 0.25s ease;
  `;

  const itemName = SKIN_ITEM_NAMES[drop.id] || drop.id;
  const itemSVG = getSkinIconSVG(drop.id, 100);
  const isNew = true; // simplified — already added above

  overlay.innerHTML = `
    <div style="text-align:center;max-width:340px;padding:20px;position:relative">
      <!-- particles -->
      <div id="skin-particles" style="position:absolute;inset:0;pointer-events:none;overflow:hidden"></div>
      <!-- glow ring -->
      <div style="width:160px;height:160px;margin:0 auto 16px;position:relative">
        <div style="position:absolute;inset:-10px;border-radius:50%;background:radial-gradient(ellipse,${rc.color}44 0%,transparent 70%);animation:skinGlowPulse 1.5s ease-in-out infinite"></div>
        <div style="width:160px;height:160px;border-radius:50%;background:${rc.bg};border:2px solid ${rc.color}66;display:flex;align-items:center;justify-content:center;box-shadow:0 0 40px ${rc.color}55;animation:skinIconEntrance 0.4s cubic-bezier(0.34,1.56,0.64,1)">
          ${itemSVG}
        </div>
      </div>
      <div style="font-size:11px;font-weight:700;letter-spacing:2px;color:${rc.color};text-transform:uppercase;margin-bottom:6px;text-shadow:0 0 12px ${rc.color}88">${rc.label}</div>
      <div style="font-size:22px;font-weight:800;color:#e2e8f0;margin-bottom:4px">${itemName}</div>
      <div style="font-size:13px;color:#6b7280;margin-bottom:20px">từ ${sc.name}</div>
      <div style="display:flex;gap:10px;justify-content:center">
        ${drop.id.startsWith('pfp_') ? `<button onclick="equipSkinIcon('${drop.id}');closeSkinResult()" style="padding:10px 22px;background:linear-gradient(135deg,#1e3a5f,#1e40af);color:#60a5fa;border:1px solid #2563eb44;border-radius:9px;cursor:pointer;font-size:13px;font-weight:600">Trang Bị Icon</button>` : `<button onclick="equipSkinBadge('${drop.id}');closeSkinResult()" style="padding:10px 22px;background:linear-gradient(135deg,#1e1b4b,#312e81);color:#a78bfa;border:1px solid #4338ca44;border-radius:9px;cursor:pointer;font-size:13px;font-weight:600">Trang Bị Huy Hiệu</button>`}
        <button onclick="closeSkinResult()" style="padding:10px 22px;background:#1f2937;color:#9ca3af;border:1px solid #374151;border-radius:9px;cursor:pointer;font-size:13px">Đóng</button>
      </div>
    </div>
    <style>
      @keyframes skinGlowPulse{0%,100%{opacity:.6;transform:scale(1)}50%{opacity:1;transform:scale(1.08)}}
      @keyframes skinIconEntrance{from{transform:scale(0) rotate(-180deg);opacity:0}to{transform:scale(1) rotate(0deg);opacity:1}}
      @keyframes skinParticle{from{transform:translateY(0) scale(1);opacity:1}to{transform:translateY(-120px) scale(0);opacity:0}}
    </style>
  `;
  document.body.appendChild(overlay);

  // Spawn particles
  setTimeout(() => {
    const pEl = document.getElementById('skin-particles');
    if (!pEl) return;
    for (let i = 0; i < 18; i++) {
      const p = document.createElement('div');
      const angle = (i / 18) * 360;
      const dist = 60 + Math.random() * 60;
      const cx = 170 + Math.cos(angle * Math.PI / 180) * dist;
      const cy = 80 + Math.sin(angle * Math.PI / 180) * dist;
      p.style.cssText = `position:absolute;width:5px;height:5px;border-radius:50%;
        background:${rc.color};left:${cx}px;top:${cy}px;
        animation:skinParticle ${0.6+Math.random()*0.8}s ease forwards ${Math.random()*0.4}s`;
      pEl.appendChild(p);
    }
  }, 100);
}

function closeSkinResult() {
  const el = document.getElementById('skin-result-overlay');
  if (el) el.remove();
  renderSkinTab();
}

// ══════════════════════════════════════════════════════════════
//  EQUIP
// ══════════════════════════════════════════════════════════════
function equipSkinIcon(id) {
  if (!G.skinCollection || !G.skinCollection.icons.includes(id)) {
    showError('Bạn chưa sở hữu icon này!'); return;
  }
  G.equippedIcon = id;
  saveGame(false);
  updateProfileAvatarDisplay();
  showNotif('✅ Đã trang bị icon!');
  renderSkinTab();
}

function equipSkinBadge(id) {
  if (!G.skinCollection || !G.skinCollection.badges.includes(id)) {
    showError('Bạn chưa sở hữu huy hiệu này!'); return;
  }
  G.equippedBadge = id;
  saveGame(false);
  // Re-render profile display to show new badge
  if (typeof renderProfileDisplay === 'function') renderProfileDisplay();
  showNotif('✅ Đã trang bị huy hiệu!');
  renderSkinTab();
}

function unequipSkinIcon() {
  G.equippedIcon = null;
  saveGame(false);
  updateProfileAvatarDisplay();
  showNotif('Icon đã gỡ bỏ');
  renderSkinTab();
}

function unequipSkinBadge() {
  G.equippedBadge = null;
  saveGame(false);
  if (typeof renderProfileDisplay === 'function') renderProfileDisplay();
  showNotif('Huy hiệu đã gỡ bỏ');
  renderSkinTab();
}

// Update profile avatar in panel-stats
function updateProfileAvatarDisplay() {
  const el = document.getElementById('profile-avatar');
  if (!el) return;
  if (G.equippedIcon && SKIN_SVG[G.equippedIcon]) {
    el.innerHTML = getSkinIconSVG(G.equippedIcon, 64);
    el.style.fontSize = '';
  } else {
    el.innerHTML = '';
    el.style.fontSize = '48px';
    el.textContent = '🎮';
  }
}

// ══════════════════════════════════════════════════════════════
//  RENDER SKIN TAB
// ══════════════════════════════════════════════════════════════
function renderSkinTab() {
  const panel = document.getElementById('panel-skin');
  if (!panel) return;

  if (!G.skinCollection) G.skinCollection = { icons: [], badges: [] };

  const tok = G.wallet.token || 0;
  const iconCases = SKIN_CASES.filter(c => c.type === 'icon');
  const badgeCases = SKIN_CASES.filter(c => c.type === 'badge');

  const caseCard = (sc) => {
    const canBuy = sc.currency === 'money' ? G.money >= sc.price : tok >= sc.price;
    const priceLabel = sc.currency === 'money' ? fmt(sc.price) : sc.price + ' Token';
    const priceColor = sc.currency === 'money' ? '#4ade80' : '#00f5ff';
    const btnBg = canBuy
      ? (sc.currency === 'money' ? 'linear-gradient(135deg,#1e3a5f,#1e40af)' : 'linear-gradient(135deg,#0d1f3a,#0e7490)')
      : '#111827';
    const btnColor = canBuy ? (sc.currency === 'money' ? '#93c5fd' : '#67e8f9') : '#374151';

    // Drop chances display
    const totalW = sc.items.reduce((s,i) => s + i.weight, 0);
    const rarityGroups = {};
    sc.items.forEach(it => {
      if (!rarityGroups[it.rarity]) rarityGroups[it.rarity] = 0;
      rarityGroups[it.rarity] += it.weight;
    });
    const chanceRows = Object.entries(rarityGroups).map(([r, w]) => {
      const rc = RARITY_CONFIG[r];
      const pct = ((w / totalW) * 100).toFixed(1);
      return `<span style="font-size:10px;color:${rc.color};padding:2px 6px;background:${rc.bg};border-radius:4px;border:1px solid ${rc.color}33">${rc.label} ${pct}%</span>`;
    }).join('');

    return `
      <div style="background:${sc.theme.bg};border:1px solid ${sc.theme.border};border-radius:14px;padding:16px;position:relative;overflow:hidden;transition:box-shadow .3s"
        onmouseenter="this.style.boxShadow='0 0 24px ${sc.theme.glow}'" onmouseleave="this.style.boxShadow='none'">
        <!-- animated corner particles -->
        <div style="position:absolute;top:-20px;right:-20px;width:80px;height:80px;border-radius:50%;background:radial-gradient(ellipse,${sc.theme.glow},transparent 70%);pointer-events:none"></div>
        <div style="position:absolute;bottom:-30px;left:-20px;width:60px;height:60px;border-radius:50%;background:radial-gradient(ellipse,${sc.theme.glow},transparent 70%);pointer-events:none"></div>

        <div style="display:flex;align-items:center;gap:14px;margin-bottom:12px">
          <!-- Case visual -->
          <div style="flex-shrink:0;position:relative">
            ${sc.decorSVG(80)}
            <div style="position:absolute;inset:0;border-radius:12px;box-shadow:0 0 16px ${sc.theme.glow};pointer-events:none"></div>
          </div>
          <div style="flex:1;min-width:0">
            <div style="font-size:9px;font-weight:700;letter-spacing:2px;color:${sc.theme.accent};text-transform:uppercase;margin-bottom:2px">${sc.rarityLabel}</div>
            <div style="font-size:15px;font-weight:700;color:#e2e8f0;margin-bottom:3px">${sc.name}</div>
            <div style="font-size:13px;color:${priceColor};font-weight:600">${priceLabel}</div>
          </div>
        </div>

        <!-- Drop rates -->
        <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:12px">${chanceRows}</div>

        <button onclick="openSkinCase('${sc.id}')" ${!canBuy?'disabled':''}
          style="width:100%;padding:10px;background:${btnBg};color:${btnColor};border:1px solid ${sc.theme.border};border-radius:9px;cursor:${canBuy?'pointer':'not-allowed'};font-size:13px;font-weight:600;transition:all .2s;${!canBuy?'opacity:0.45':''}">
          ${canBuy ? '🎲 Mở Hòm' : (sc.currency === 'money' ? 'Cần ' + fmt(sc.price - G.money) + ' nữa' : 'Cần ' + (sc.price - tok) + ' Token nữa')}
        </button>
      </div>`;
  };

  // Collection display
  const collectionSection = (type) => {
    const coll = type === 'icon' ? (G.skinCollection.icons || []) : (G.skinCollection.badges || []);
    const equipped = type === 'icon' ? G.equippedIcon : G.equippedBadge;
    if (coll.length === 0) return `<div style="color:#374151;font-size:13px;padding:12px 0;text-align:center">Chưa có vật phẩm nào. Mở hòm để nhận!</div>`;
    return coll.map(id => {
      const isEquipped = equipped === id;
      const isBadge = id.startsWith('badge_');
      const svg = getSkinIconSVG(id, isBadge ? 36 : 48);
      const name = SKIN_ITEM_NAMES[id] || id;
      // find rarity
      let rarity = 'common', color = '#94a3b8';
      for (const c of SKIN_CASES) {
        const it = c.items.find(x => x.id === id);
        if (it) { rarity = it.rarity; color = it.color; break; }
      }
      const rc = RARITY_CONFIG[rarity];
      return `
        <div style="background:#0d1117;border:1px solid ${isEquipped ? rc.color : '#1f2937'};border-radius:10px;padding:10px;text-align:center;cursor:pointer;transition:all .2s;${isEquipped?'box-shadow:0 0 12px '+rc.color+'55':''}"
          onclick="${type==='icon'?'equipSkinIcon':'equipSkinBadge'}('${id}')">
          <div style="margin-bottom:4px">${svg}</div>
          <div style="font-size:10px;color:${rc.color};font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${name}</div>
          ${isEquipped ? `<div style="font-size:9px;color:${rc.color};margin-top:2px">✓ Đang dùng</div>` : ''}
        </div>`;
    }).join('');
  };

  panel.innerHTML = `
    <div style="background:linear-gradient(135deg,#0a0014,#0d0520);border:1px solid #2d1a4a;border-radius:14px;padding:14px 16px;margin-bottom:14px;position:relative;overflow:hidden">
      <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% -20%,rgba(124,58,237,0.12),transparent 60%);pointer-events:none"></div>
      <div style="font-size:16px;font-weight:800;color:#c084fc;margin-bottom:2px">🎁 Skin Shop</div>
      <div style="font-size:12px;color:#6b7280">Mở hòm nhận icon profile và huy hiệu độc quyền</div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-top:8px;flex-wrap:wrap;gap:8px">
        <div style="display:flex;gap:14px">
          <span style="font-size:13px;color:#4ade80;font-weight:600">Có: ${fmt(G.money)}</span>
          <span style="font-size:13px;color:#00f5ff;font-weight:600">🔮 ${tok} Token</span>
        </div>
        <button onclick="showTokenShopRealBuyPopup()" style="padding:6px 14px;background:linear-gradient(135deg,#0d2a0d,#1a3a1a);color:#4ade80;border:1.5px solid #4ade8055;border-radius:8px;cursor:pointer;font-size:12px;font-weight:700">💳 Mua Token</button>
      </div>
    </div>

    <!-- Icon Cases -->
    <div style="font-size:13px;font-weight:700;color:#60a5fa;letter-spacing:1px;text-transform:uppercase;margin-bottom:10px;display:flex;align-items:center;gap:8px">
      <div style="width:16px;height:2px;background:#60a5fa;border-radius:2px"></div>
      Hòm Icon Profile <span style="font-size:10px;color:#4b5563;font-weight:400">(mua bằng $)</span>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:18px">
      ${iconCases.map(caseCard).join('')}
    </div>

    <!-- Badge Cases -->
    <div style="font-size:13px;font-weight:700;color:#00f5ff;letter-spacing:1px;text-transform:uppercase;margin-bottom:10px;display:flex;align-items:center;gap:8px">
      <div style="width:16px;height:2px;background:#00f5ff;border-radius:2px"></div>
      Hòm Huy Hiệu <span style="font-size:10px;color:#4b5563;font-weight:400">(mua bằng Token)</span>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:18px">
      ${badgeCases.map(caseCard).join('')}
    </div>

    <!-- My Collection -->
    <div style="font-size:13px;font-weight:700;color:#e2e8f0;letter-spacing:1px;text-transform:uppercase;margin-bottom:10px;display:flex;align-items:center;gap:8px">
      <div style="width:16px;height:2px;background:#e2e8f0;border-radius:2px"></div>
      Bộ Sưu Tập Của Tôi
    </div>

    <div style="background:#0d1117;border:1px solid #1f2937;border-radius:11px;padding:14px;margin-bottom:10px">
      <div style="font-size:12px;color:#60a5fa;font-weight:600;margin-bottom:8px">Icon Profile (${(G.skinCollection.icons||[]).length} vật phẩm)
        ${G.equippedIcon?`<button onclick="unequipSkinIcon()" style="margin-left:8px;padding:2px 8px;background:#1f2937;color:#9ca3af;border:1px solid #374151;border-radius:5px;cursor:pointer;font-size:10px">Gỡ Icon</button>`:''}
      </div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">${collectionSection('icon')}</div>
    </div>

    <div style="background:#0d1117;border:1px solid #1f2937;border-radius:11px;padding:14px">
      <div style="font-size:12px;color:#00f5ff;font-weight:600;margin-bottom:8px">Huy Hiệu (${(G.skinCollection.badges||[]).length} vật phẩm)
        ${G.equippedBadge?`<button onclick="unequipSkinBadge()" style="margin-left:8px;padding:2px 8px;background:#1f2937;color:#9ca3af;border:1px solid #374151;border-radius:5px;cursor:pointer;font-size:10px">Gỡ Huy Hiệu</button>`:''}
      </div>
      <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:7px">${collectionSection('badge')}</div>
    </div>
  `;
}

// ═══ TOKEN SHOP REAL-MONEY POPUPS ═════════════════════════════════════════
function showTokenShopRealBuyPopup() {
  var existing = document.getElementById('token-real-buy-popup');
  if (existing) existing.remove();

  var overlay = document.createElement('div');
  overlay.id = 'token-real-buy-popup';
  overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.92);z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px;backdrop-filter:blur(8px)';
  overlay.innerHTML =
    '<div style="background:linear-gradient(135deg,#0d1117,#111827);border:2px solid #00f5ff44;border-radius:20px;padding:26px 20px;width:100%;max-width:360px;position:relative;box-shadow:0 0 50px #00f5ff11">'
    + '<button onclick="document.getElementById(\'token-real-buy-popup\').remove()" style="position:absolute;top:12px;right:14px;background:#1f2937;border:1px solid #374151;color:#9ca3af;border-radius:8px;padding:4px 10px;cursor:pointer;font-size:15px;font-weight:700">✕</button>'
    + '<div style="text-align:center;margin-bottom:18px">'
    +   '<div style="font-size:42px;margin-bottom:6px">🔮</div>'
    +   '<div style="font-size:18px;font-weight:800;color:#00f5ff">Mua Token Bằng Tiền Thật</div>'
    +   '<div style="font-size:12px;color:#6b7280;margin-top:4px">Chọn phương thức thanh toán · Mua được nhiều lần</div>'
    + '</div>'
    + '<div onclick="document.getElementById(\'token-real-buy-popup\').remove();showTokenCodePopup()" '
    + 'style="background:linear-gradient(135deg,#0a1220,#111f3a);border:1.5px solid #3b82f655;border-radius:14px;padding:16px;margin-bottom:10px;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;gap:14px" '
    + 'onmouseover="this.style.borderColor=\'#60a5fa88\'" onmouseout="this.style.borderColor=\'#3b82f655\'">'
    +   '<div style="font-size:32px;flex-shrink:0">🔑</div>'
    +   '<div>'
    +     '<div style="font-size:15px;font-weight:700;color:#60a5fa">Nhập Mã Kích Hoạt</div>'
    +     '<div style="font-size:12px;color:#6b7280;margin-top:3px">Mã dạng <span style="color:#93c5fd;font-family:monospace">XXXX-XXXX-XXXX-X</span></div>'
    +     '<div style="font-size:11px;color:#374151;margin-top:4px">Mua mã: <span style="color:#60a5fa">tranthikimai4@gmail.com</span></div>'
    +   '</div>'
    + '</div>'
    + '<div onclick="document.getElementById(\'token-real-buy-popup\').remove();showTokenBankPopup()" '
    + 'style="background:linear-gradient(135deg,#120a20,#1e1235);border:1.5px solid #7c3aed55;border-radius:14px;padding:16px;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;gap:14px" '
    + 'onmouseover="this.style.borderColor=\'#a78bfa88\'" onmouseout="this.style.borderColor=\'#7c3aed55\'">'
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

function showTokenCodePopup() {
  var existing = document.getElementById('token-code-popup');
  if (existing) existing.remove();

  var overlay = document.createElement('div');
  overlay.id = 'token-code-popup';
  overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.92);z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px;backdrop-filter:blur(8px)';
  overlay.innerHTML =
    '<div style="background:linear-gradient(135deg,#0a1220,#111f3a);border:2px solid #3b82f666;border-radius:20px;padding:26px 20px;width:100%;max-width:360px;position:relative;box-shadow:0 0 50px #3b82f622">'
    + '<button onclick="document.getElementById(\'token-code-popup\').remove();showTokenShopRealBuyPopup()" style="position:absolute;top:12px;left:14px;background:#1f2937;border:1px solid #374151;color:#9ca3af;border-radius:8px;padding:4px 10px;cursor:pointer;font-size:13px;font-weight:700">← Quay lại</button>'
    + '<button onclick="document.getElementById(\'token-code-popup\').remove()" style="position:absolute;top:12px;right:14px;background:#1f2937;border:1px solid #374151;color:#9ca3af;border-radius:8px;padding:4px 10px;cursor:pointer;font-size:15px;font-weight:700">✕</button>'
    + '<div style="text-align:center;margin-bottom:18px;padding-top:8px">'
    +   '<div style="font-size:42px;margin-bottom:6px">🔑</div>'
    +   '<div style="font-size:17px;font-weight:800;color:#60a5fa">Nhập Mã Kích Hoạt</div>'
    +   '<div style="font-size:12px;color:#6b7280;margin-top:4px">Nhận phần thưởng · Mã dạng: XXXX-XXXX-XXXX-X</div>'
    + '</div>'
    + '<div style="background:#0d1117;border:1px solid #3b82f633;border-radius:12px;padding:14px;margin-bottom:14px">'
    +   '<div style="font-size:12px;color:#60a5fa;font-weight:700;margin-bottom:8px">📧 Cách mua mã:</div>'
    +   '<div style="font-size:12px;color:#9ca3af;line-height:1.9">'
    +     '1. Liên hệ email để đặt mua Token<br>'
    +     '2. Thanh toán và nhận mã kích hoạt<br>'
    +     '3. Nhập mã bên dưới để nhận Token'
    +   '</div>'
    +   '<div style="margin-top:10px;background:#111827;border:1px solid #3b82f644;border-radius:8px;padding:10px;display:flex;align-items:center;gap:8px">'
    +     '<span style="font-size:16px">📮</span>'
    +     '<div><div style="font-size:11px;color:#4b5563">Email liên hệ:</div>'
    +     '<div style="font-size:13px;font-weight:700;color:#60a5fa">tranthikimai4@gmail.com</div></div>'
    +   '</div>'
    + '</div>'
    + '<div style="margin-bottom:12px">'
    +   '<div style="font-size:12px;color:#6b7280;margin-bottom:7px;font-weight:600">Nhập mã của bạn:</div>'
    +   '<input id="token-code-input" type="text" maxlength="15" placeholder="VD: AB7H-32F5-53PQ-T" '
    +   'oninput="tokenFormatCode(this)" '
    +   'style="width:100%;box-sizing:border-box;padding:13px 14px;background:#111827;border:2px solid #3b82f644;border-radius:10px;color:#e2e8f0;font-size:15px;font-weight:700;font-family:monospace;letter-spacing:2px;text-align:center;outline:none;transition:border-color 0.2s" '
    +   'onfocus="this.style.borderColor=\'#60a5fa88\'" onblur="this.style.borderColor=\'#3b82f644\'">'
    +   '<div style="font-size:11px;color:#4b5563;margin-top:6px;text-align:center">S=Starter · P=Prime · C=Contraband · T=Token · A=All</div>'
    +   '<div id="token-code-msg" style="font-size:12px;margin-top:7px;text-align:center;min-height:18px"></div>'
    + '</div>'
    + '<button onclick="tokenRedeemCode()" '
    + 'style="width:100%;padding:13px;background:linear-gradient(135deg,#1e3a5f,#1e40af);color:#93c5fd;border:1.5px solid #3b82f655;border-radius:10px;cursor:pointer;font-size:14px;font-weight:800">'
    + '✅ Kích Hoạt & Nhận Token</button>'
    + '</div>';
  document.body.appendChild(overlay);
}

function showTokenBankPopup() {
  var existing = document.getElementById('token-bank-popup');
  if (existing) existing.remove();

  var overlay = document.createElement('div');
  overlay.id = 'token-bank-popup';
  overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.92);z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px;backdrop-filter:blur(8px)';
  overlay.innerHTML =
    '<div style="background:linear-gradient(135deg,#120a20,#1e1235);border:2px solid #7c3aed66;border-radius:20px;padding:26px 20px;width:100%;max-width:360px;position:relative;box-shadow:0 0 50px #7c3aed22">'
    + '<button onclick="document.getElementById(\'token-bank-popup\').remove();showTokenShopRealBuyPopup()" style="position:absolute;top:12px;left:14px;background:#1f2937;border:1px solid #374151;color:#9ca3af;border-radius:8px;padding:4px 10px;cursor:pointer;font-size:13px;font-weight:700">← Quay lại</button>'
    + '<button onclick="document.getElementById(\'token-bank-popup\').remove()" style="position:absolute;top:12px;right:14px;background:#1f2937;border:1px solid #374151;color:#9ca3af;border-radius:8px;padding:4px 10px;cursor:pointer;font-size:15px;font-weight:700">✕</button>'
    + '<div style="text-align:center;margin-bottom:18px;padding-top:8px">'
    +   '<div style="font-size:42px;margin-bottom:6px">🏦</div>'
    +   '<div style="font-size:17px;font-weight:800;color:#a78bfa">Chuyển Khoản Ngân Hàng</div>'
    +   '<div style="font-size:12px;color:#6b7280;margin-top:4px">Vietcombank — Nhận Token sau khi xác nhận</div>'
    + '</div>'
    + '<div style="background:#0d0d1a;border:1.5px solid #7c3aed55;border-radius:14px;padding:16px;margin-bottom:14px">'
    +   '<div style="font-size:11px;color:#7c3aed;font-weight:700;letter-spacing:1px;margin-bottom:10px">THÔNG TIN NGÂN HÀNG</div>'
    +   '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid #1f2937">'
    +     '<span style="font-size:13px;color:#6b7280">Ngân hàng:</span>'
    +     '<span style="font-size:14px;font-weight:700;color:#c4b5fd">Vietcombank</span>'
    +   '</div>'
    +   '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid #1f2937">'
    +     '<span style="font-size:13px;color:#6b7280">Số tài khoản:</span>'
    +     '<div style="display:flex;align-items:center;gap:6px">'
    +       '<span style="font-size:16px;font-weight:900;color:#a78bfa;font-family:monospace;letter-spacing:2px">0905393373</span>'
    +       '<button onclick="navigator.clipboard&&navigator.clipboard.writeText(\'0905393373\').then(function(){var b=document.getElementById(\'copy-token-bank-btn\');if(b){b.textContent=\'✓\';setTimeout(function(){b.textContent=\'📋\'},1500)}})" id="copy-token-bank-btn" style="background:#1f2937;border:1px solid #374151;color:#9ca3af;border-radius:6px;padding:3px 8px;cursor:pointer;font-size:13px">📋</button>'
    +     '</div>'
    +   '</div>'
    +   '<div style="display:flex;justify-content:space-between;align-items:center">'
    +     '<span style="font-size:13px;color:#6b7280">Chủ tài khoản:</span>'
    +     '<span style="font-size:13px;font-weight:700;color:#e2e8f0">Trần Thị Kim Mai</span>'
    +   '</div>'
    + '</div>'
    + '<div style="background:#0d1117;border:1px solid #7c3aed33;border-radius:12px;padding:14px;margin-bottom:14px">'
    +   '<div style="font-size:12px;color:#a78bfa;font-weight:700;margin-bottom:8px">📋 Các bước thực hiện:</div>'
    +   '<div style="font-size:12px;color:#9ca3af;line-height:2">'
    +     '1. Chuyển khoản, nội dung: <span style="color:#c4b5fd;font-weight:700">TEN_GAME MUA TOKEN</span><br>'
    +     '2. Chụp biên lai và gửi email đến:<br>'
    +     '<span style="color:#a78bfa;font-weight:700">tranthikimai4@gmail.com</span><br>'
    +     '3. Nhận mã kích hoạt qua email<br>'
    +     '4. Nhập mã tại mục <b style="color:#60a5fa">Nhập Mã Kích Hoạt</b>'
    +   '</div>'
    + '</div>'
    + '<div style="display:flex;gap:8px">'
    +   '<button onclick="document.getElementById(\'token-bank-popup\').remove()" style="flex:1;padding:11px;background:#1f2937;color:#9ca3af;border:1px solid #374151;border-radius:10px;cursor:pointer;font-size:13px;font-weight:600">Đóng</button>'
    +   '<button onclick="document.getElementById(\'token-bank-popup\').remove();showTokenCodePopup()" style="flex:1;padding:11px;background:linear-gradient(135deg,#1e1235,#2d1a4a);color:#c4b5fd;border:1.5px solid #7c3aed55;border-radius:10px;cursor:pointer;font-size:13px;font-weight:700">🔑 Nhập Mã</button>'
    + '</div>'
    + '</div>';
  document.body.appendChild(overlay);
}

function tokenFormatCode(input) {
  // Tách phần base (12 ký tự) và suffix (1 chữ cái S/P/C/T/A)
  var raw = input.value.toUpperCase().replace(/[^A-Z2-9]/g, '');
  var base = raw.slice(0, 12);
  var suffix = raw.slice(12, 13);
  var parts = [];
  for (var i = 0; i < base.length; i += 4) parts.push(base.slice(i, i + 4));
  var result = parts.join('-');
  if (suffix) result += '-' + suffix;
  input.value = result;
}

// ═══ API HELPER — Kết nối Google Sheets (GET để tránh CORS) ══════════════
function _callGAPI_T(code, bundleId, callback) {
  var url = 'https://script.google.com/macros/s/AKfycbxxHQ5BEGf7ISYeFaxnACWszb5vtLOOjWgSwXK3j60HSD66SUemDLb7fksLofCi5bUa/exec';
  var parts = code.trim().toUpperCase().split('-');
  var baseCode = parts.slice(0, 3).join('-');
  var params = '?action=check&code=' + encodeURIComponent(baseCode) + '&bundleId=' + encodeURIComponent(bundleId || '*');
  fetch(url + params, { method: 'GET', redirect: 'follow' })
    .then(function(r) { return r.json(); })
    .then(function(d) { callback(d); })
    .catch(function(e) { callback({ ok: false, msg: '❌ Lỗi kết nối: ' + e.message }); });
}

function tokenRedeemCode() {
  var input = document.getElementById('token-code-input');
  var msg = document.getElementById('token-code-msg');
  if (!input || !msg) return;
  var code = input.value.trim().toUpperCase();
  // Format: XXXX-XXXX-XXXX-S/P/C/T/A
  var suffixMatch = code.match(/^([A-Z2-9]{4}-[A-Z2-9]{4}-[A-Z2-9]{4})-([SPCTA])$/);
  if (!suffixMatch) {
    msg.style.color = '#f87171';
    msg.textContent = '⚠️ Sai định dạng! VD: AB7H-32F5-53PQ-T  (S/P/C/T/A)';
    return;
  }
  var suffix = suffixMatch[2]; // S, P, C, T, A
  // Map suffix → bundleId gửi lên server (khớp Code.gs SUFFIX_MAP)
  var SUFFIX_TO_BUNDLE = { S:'starter', P:'prime', C:'contraband', T:'token', A:'all' };
  var bundleId = SUFFIX_TO_BUNDLE[suffix] || '*';

  msg.style.color = '#60a5fa'; msg.textContent = '⏳ Đang kiểm tra mã với server...';
  _callGAPI_T(code, bundleId, function(res) {
    if (!res.ok) { msg.style.color = '#f87171'; msg.textContent = res.msg; return; }
    G.wallet = G.wallet || {};
    // Cấp phần thưởng theo bundle
    var rewards = [];
    if (suffix === 'T' || suffix === 'A') {
      G.wallet.token = (G.wallet.token || 0) + 500;
      rewards.push('+500 🔮 Token');
    }
    if (suffix === 'S' || suffix === 'A') {
      G.money = (G.money || 0) + 50000;
      rewards.push('+$50K');
    }
    if (suffix === 'P' || suffix === 'A') {
      G.money = (G.money || 0) + 500000;
      rewards.push('+$500K');
    }
    if (suffix === 'C' || suffix === 'A') {
      G.wallet.token = (G.wallet.token || 0) + 2000;
      rewards.push('+2000 🔮 Token');
    }
    saveGame(false); updateUI();
    var popup = document.getElementById('token-code-popup');
    if (popup) popup.remove();
    showNotif('🎉 Mã hợp lệ! ' + rewards.join(' · ') + ' đã được nạp!');
    renderSkinTab();
  });
}

window.showTokenShopRealBuyPopup = showTokenShopRealBuyPopup;
window.showTokenCodePopup = showTokenCodePopup;
window.showTokenBankPopup = showTokenBankPopup;
window.tokenFormatCode = tokenFormatCode;
window.tokenRedeemCode = tokenRedeemCode;
