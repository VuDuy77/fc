/* ┌─────────────────────────────────────────────────────────────────────────┐
   │  MODULE 06 · MARKET  —  items · stock · buy · listings · timers        │
   └─────────────────────────────────────────────────────────────────────────┘ */
// ═══ MARKET DATA ══════════════════════════════════════════════════
const MARKET_ITEMS = [
  // Tier 5: Siêu Tài Sản - dark matter rank - 1000 recycle pts
  {id:'m_island',name:'Đảo Cá Nhân',icon:'🏝️',minPrice:5e6,maxPrice:1e8,tier:'super',recyclePoints:1000,weight:1},
  {id:'m_yacht',name:'Du Thuyền Hạng Sang',icon:'🛥️',minPrice:2e6,maxPrice:5e7,tier:'super',recyclePoints:1000,weight:2},
  {id:'m_penthouse',name:'Căn Hộ Penthouse',icon:'🏙️',minPrice:1e6,maxPrice:2e7,tier:'super',recyclePoints:1000,weight:3},
  {id:'m_supercar',name:'Siêu Xe (Bugatti/Ferrari)',icon:'🏎️',minPrice:3e5,maxPrice:4e6,tier:'super',recyclePoints:1000,weight:4},
  {id:'m_diamond_gem',name:'Kim Cương Viên',icon:'💎',minPrice:5e4,maxPrice:5e5,tier:'super',recyclePoints:1000,weight:6},
  {id:'m_patek',name:'Đồng Hồ Patek Philippe',icon:'⌚',minPrice:4e4,maxPrice:3e5,tier:'super',recyclePoints:1000,weight:7},
  {id:'m_birkin',name:'Túi Hermes Birkin',icon:'👜',minPrice:12000,maxPrice:1.5e5,tier:'super',recyclePoints:1000,weight:9},
  {id:'m_piano',name:'Grand Piano Steinway',icon:'🎹',minPrice:7e4,maxPrice:1.8e5,tier:'super',recyclePoints:1000,weight:8},
  {id:'m_hifi',name:'Hệ Thống Âm Thanh Hi-end',icon:'🔊',minPrice:2e4,maxPrice:1e5,tier:'super',recyclePoints:1000,weight:10},
  {id:'m_golf',name:'Bộ Gậy Golf Thiết Kế Riêng',icon:'⛳',minPrice:5000,maxPrice:2e4,tier:'super',recyclePoints:1000,weight:12},
  // Tier 4: Công Nghệ - diamond rank - 400 recycle pts
  {id:'m_massage',name:'Ghế Massage Cao Cấp',icon:'💺',minPrice:1500,maxPrice:8000,tier:'tech',recyclePoints:400,weight:15},
  {id:'m_tv',name:'TV 4K OLED Cỡ Lớn',icon:'📺',minPrice:1200,maxPrice:5000,tier:'tech',recyclePoints:400,weight:16},
  {id:'m_camera',name:'Máy Ảnh Mirrorless',icon:'📷',minPrice:1500,maxPrice:4500,tier:'tech',recyclePoints:400,weight:16},
  {id:'m_motorbike',name:'Xe Máy (Vespa/Honda SH)',icon:'🛵',minPrice:2000,maxPrice:6000,tier:'tech',recyclePoints:400,weight:15},
  {id:'m_laptop',name:'Laptop Gaming Cao Cấp',icon:'💻',minPrice:1200,maxPrice:3500,tier:'tech',recyclePoints:400,weight:17},
  {id:'m_fridge',name:'Tủ Lạnh Thông Minh',icon:'🧊',minPrice:800,maxPrice:3000,tier:'tech',recyclePoints:400,weight:18},
  {id:'m_iphone',name:'iPhone Đời Mới Nhất',icon:'📱',minPrice:1000,maxPrice:1600,tier:'tech',recyclePoints:400,weight:20},
  {id:'m_mattress',name:'Nệm Cao Su Thiên Nhiên',icon:'🛏️',minPrice:500,maxPrice:2000,tier:'tech',recyclePoints:400,weight:20},
  {id:'m_espresso',name:'Máy Pha Cà Phê Espresso',icon:'☕',minPrice:300,maxPrice:1500,tier:'tech',recyclePoints:400,weight:22},
  {id:'m_robot',name:'Robot Hút Bụi Flagship',icon:'🤖',minPrice:400,maxPrice:1200,tier:'tech',recyclePoints:400,weight:22},
  // Tier 3: Gia Dụng & Thời Trang - 50 recycle pts
  {id:'m_perfume',name:'Nước Hoa Niche/Designer',icon:'🧴',minPrice:100,maxPrice:400,tier:'fashion',recyclePoints:50,weight:30},
  {id:'m_airpurifier',name:'Máy Lọc Không Khí',icon:'💨',minPrice:150,maxPrice:400,tier:'fashion',recyclePoints:50,weight:30},
  {id:'m_luggage',name:'Vali Du Lịch',icon:'🧳',minPrice:80,maxPrice:350,tier:'fashion',recyclePoints:50,weight:32},
  {id:'m_headphone',name:'Tai Nghe Chống Ồn',icon:'🎧',minPrice:250,maxPrice:400,tier:'fashion',recyclePoints:50,weight:30},
  {id:'m_sneaker',name:'Giày Sneaker Chính Hãng',icon:'👟',minPrice:70,maxPrice:250,tier:'fashion',recyclePoints:50,weight:35},
  {id:'m_racket',name:'Vợt Cầu Lông/Tennis',icon:'🏸',minPrice:50,maxPrice:200,tier:'fashion',recyclePoints:50,weight:38},
  {id:'m_desk',name:'Bàn Làm Việc Gỗ',icon:'🪑',minPrice:60,maxPrice:180,tier:'fashion',recyclePoints:50,weight:38},
  {id:'m_hairdryer',name:'Máy Sấy Tóc Ion',icon:'💇',minPrice:40,maxPrice:150,tier:'fashion',recyclePoints:50,weight:40},
  {id:'m_cookware',name:'Bộ Nồi Bếp Cao Cấp',icon:'🍳',minPrice:50,maxPrice:150,tier:'fashion',recyclePoints:50,weight:40},
  {id:'m_airfryer',name:'Nồi Chiên Không Dầu',icon:'🫕',minPrice:60,maxPrice:150,tier:'fashion',recyclePoints:50,weight:40},
  // === 40 VẬT PHẨM MỚI DƯỚI $500 ===
  // 💻 Công nghệ tầm trung
  {id:'m_smartwatch_samsung',name:'Đồng Hồ Galaxy Watch',icon:'⌚',minPrice:120,maxPrice:450,tier:'fashion',recyclePoints:50,weight:29},
  {id:'m_tablet_mini',name:'Máy Tính Bảng iPad Mini',icon:'📱',minPrice:250,maxPrice:499,tier:'fashion',recyclePoints:50,weight:27},
  {id:'m_keyboard_mech',name:'Bàn Phím Cơ Gaming RGB',icon:'⌨️',minPrice:60,maxPrice:280,tier:'fashion',recyclePoints:50,weight:33},
  {id:'m_monitor_27',name:'Màn Hình IPS 27 inch',icon:'🖥️',minPrice:180,maxPrice:460,tier:'fashion',recyclePoints:50,weight:29},
  {id:'m_speaker_jbl',name:'Loa Bluetooth JBL Charge 5',icon:'🔊',minPrice:80,maxPrice:250,tier:'fashion',recyclePoints:50,weight:34},
  {id:'m_drone_mini',name:'Drone Mini DJI Neo',icon:'🚁',minPrice:140,maxPrice:499,tier:'fashion',recyclePoints:50,weight:28},
  {id:'m_ext_ssd',name:'Ổ SSD Di Động 1TB Samsung',icon:'💾',minPrice:60,maxPrice:180,tier:'fashion',recyclePoints:50,weight:37},
  {id:'m_ereader',name:'Máy Đọc Sách Kindle Paperwhite',icon:'📖',minPrice:80,maxPrice:200,tier:'fashion',recyclePoints:50,weight:36},
  {id:'m_powerbank_xl',name:'Pin Dự Phòng Anker 20000mAh',icon:'🔋',minPrice:30,maxPrice:120,tier:'fashion',recyclePoints:50,weight:41},
  {id:'m_dashcam',name:'Camera Hành Trình 4K',icon:'📸',minPrice:50,maxPrice:220,tier:'fashion',recyclePoints:50,weight:36},
  // 🏠 Đồ gia dụng thông minh
  {id:'m_smart_lock',name:'Khóa Cửa Vân Tay Xiaomi',icon:'🔐',minPrice:55,maxPrice:220,tier:'fashion',recyclePoints:50,weight:36},
  {id:'m_security_cam',name:'Camera Giám Sát WiFi 360°',icon:'📹',minPrice:35,maxPrice:150,tier:'fashion',recyclePoints:50,weight:39},
  {id:'m_smart_bulb_set',name:'Bộ Đèn LED Thông Minh Philips Hue',icon:'💡',minPrice:40,maxPrice:180,tier:'fashion',recyclePoints:50,weight:38},
  {id:'m_water_filter',name:'Máy Lọc Nước RO Kangaroo',icon:'🚰',minPrice:100,maxPrice:380,tier:'fashion',recyclePoints:50,weight:31},
  {id:'m_bread_maker',name:'Máy Làm Bánh Mì Tự Động',icon:'🍞',minPrice:60,maxPrice:180,tier:'fashion',recyclePoints:50,weight:37},
  {id:'m_blender_ninja',name:'Máy Xay Sinh Tố Ninja Pro',icon:'🥤',minPrice:80,maxPrice:260,tier:'fashion',recyclePoints:50,weight:34},
  {id:'m_wine_cooler',name:'Tủ Mát Mini Rượu Vang 12 chai',icon:'🍷',minPrice:100,maxPrice:370,tier:'fashion',recyclePoints:50,weight:31},
  {id:'m_projector_mini',name:'Máy Chiếu Mini Portable XGIMI',icon:'📽️',minPrice:120,maxPrice:420,tier:'fashion',recyclePoints:50,weight:30},
  {id:'m_air_humidifier',name:'Máy Tạo Độ Ẩm & Tinh Dầu',icon:'🌫️',minPrice:45,maxPrice:200,tier:'fashion',recyclePoints:50,weight:38},
  {id:'m_standing_desk',name:'Bàn Đứng Điều Chỉnh Độ Cao',icon:'🪑',minPrice:150,maxPrice:490,tier:'fashion',recyclePoints:50,weight:28},
  // 🏋️ Thể thao & Sức khỏe
  {id:'m_treadmill_fold',name:'Máy Chạy Bộ Gấp Gọn',icon:'🏃',minPrice:199,maxPrice:499,tier:'fashion',recyclePoints:50,weight:28},
  {id:'m_dumbbell_adj',name:'Tạ Tay Điều Chỉnh 2-24kg',icon:'🏋️',minPrice:80,maxPrice:280,tier:'fashion',recyclePoints:50,weight:34},
  {id:'m_massage_gun',name:'Súng Massage Theragun Mini',icon:'💪',minPrice:80,maxPrice:300,tier:'fashion',recyclePoints:50,weight:33},
  {id:'m_yoga_mat_pro',name:'Thảm Yoga Cork Tự Nhiên',icon:'🧘',minPrice:40,maxPrice:160,tier:'fashion',recyclePoints:50,weight:39},
  {id:'m_jump_rope_smart',name:'Dây Nhảy Thông Minh Đếm Vòng',icon:'🪢',minPrice:25,maxPrice:100,tier:'fashion',recyclePoints:50,weight:43},
  {id:'m_pull_up_bar',name:'Thanh Xà Đơn Cửa Đa Năng',icon:'🤸',minPrice:30,maxPrice:120,tier:'fashion',recyclePoints:50,weight:42},
  // 🎵 Âm nhạc & Giải trí
  {id:'m_guitar_yamaha',name:'Đàn Guitar Acoustic Yamaha F310',icon:'🎸',minPrice:90,maxPrice:350,tier:'fashion',recyclePoints:50,weight:33},
  {id:'m_ukulele',name:'Đàn Ukulele Concert Koa',icon:'🎵',minPrice:40,maxPrice:160,tier:'fashion',recyclePoints:50,weight:39},
  {id:'m_gaming_headset',name:'Tai Nghe Gaming Razer Kraken',icon:'🎮',minPrice:60,maxPrice:250,tier:'fashion',recyclePoints:50,weight:35},
  {id:'m_board_game_catan',name:'Board Game Catan / Pandemic',icon:'🎲',minPrice:30,maxPrice:120,tier:'fashion',recyclePoints:50,weight:43},
  {id:'m_lego_technic',name:'Bộ LEGO Technic / Architecture',icon:'🧱',minPrice:60,maxPrice:300,tier:'fashion',recyclePoints:50,weight:34},
  {id:'m_telescope',name:'Kính Thiên Văn Ngắm Sao 70mm',icon:'🔭',minPrice:70,maxPrice:300,tier:'fashion',recyclePoints:50,weight:34},
  // 👗 Thời trang & Phụ kiện
  {id:'m_sunglasses_rb',name:'Kính Mắt Ray-Ban Aviator',icon:'🕶️',minPrice:100,maxPrice:260,tier:'fashion',recyclePoints:50,weight:35},
  {id:'m_backpack_north',name:'Balo The North Face 30L',icon:'🎒',minPrice:80,maxPrice:220,tier:'fashion',recyclePoints:50,weight:37},
  {id:'m_wallet_leather',name:'Ví Da Thật Handcraft',icon:'👛',minPrice:35,maxPrice:180,tier:'fashion',recyclePoints:50,weight:39},
  {id:'m_cap_limited',name:'Mũ Snapback Limited Edition',icon:'🧢',minPrice:25,maxPrice:130,tier:'fashion',recyclePoints:50,weight:42},
  {id:'m_scarf_cashmere',name:'Khăn Choàng Cashmere',icon:'🧣',minPrice:50,maxPrice:200,tier:'fashion',recyclePoints:50,weight:37},
  // 🐾 Đặc biệt & Thú vị
  {id:'m_pet_feeder',name:'Máy Cho Thú Cưng Ăn Tự Động',icon:'🐾',minPrice:45,maxPrice:180,tier:'fashion',recyclePoints:50,weight:38},
  {id:'m_electric_tooth',name:'Bàn Chải Điện Oral-B iO Series',icon:'🦷',minPrice:50,maxPrice:200,tier:'fashion',recyclePoints:50,weight:38},
  {id:'m_action_cam',name:'Camera Hành Trình GoPro Hero 12',icon:'🎥',minPrice:180,maxPrice:499,tier:'fashion',recyclePoints:50,weight:29},
  // ==========================================
  // Tier 2: Đồ Dùng Cá Nhân - 10 recycle pts
  {id:'m_lamp',name:'Đèn Bàn Học',icon:'🪔',minPrice:15,maxPrice:50,tier:'personal',recyclePoints:10,weight:55},
  {id:'m_bottle',name:'Bình Giữ Nhiệt Yeti',icon:'🧊',minPrice:20,maxPrice:50,tier:'personal',recyclePoints:10,weight:55},
  {id:'m_tshirt',name:'Áo Thun Cotton',icon:'👕',minPrice:10,maxPrice:30,tier:'personal',recyclePoints:10,weight:60},
  {id:'m_sunscreen',name:'Kem Chống Nắng',icon:'🧴',minPrice:10,maxPrice:30,tier:'personal',recyclePoints:10,weight:60},
  {id:'m_pillow',name:'Gối Ngủ Cao Cấp',icon:'🪣',minPrice:10,maxPrice:25,tier:'personal',recyclePoints:10,weight:62},
  {id:'m_plant',name:'Cây Cảnh Để Bàn',icon:'🪴',minPrice:5,maxPrice:20,tier:'personal',recyclePoints:10,weight:65},
  {id:'m_book',name:'Sách',icon:'📚',minPrice:10,maxPrice:25,tier:'personal',recyclePoints:10,weight:62},
  {id:'m_umbrella',name:'Ô Che Mưa',icon:'☂️',minPrice:5,maxPrice:15,tier:'personal',recyclePoints:10,weight:65},
  {id:'m_mouse',name:'Chuột Máy Tính',icon:'🖱️',minPrice:5,maxPrice:15,tier:'personal',recyclePoints:10,weight:65},
  {id:'m_phonecase',name:'Ốp Lưng Điện Thoại',icon:'📵',minPrice:3,maxPrice:10,tier:'personal',recyclePoints:10,weight:70},
  // Tier 1: Vật Dụng Nhỏ - 1 recycle pt
  {id:'m_cup',name:'Cốc Sứ',icon:'☕',minPrice:2,maxPrice:5,tier:'small',recyclePoints:1,weight:80},
  {id:'m_towel',name:'Khăn Mặt',icon:'🧻',minPrice:1,maxPrice:3,tier:'small',recyclePoints:1,weight:85},
  {id:'m_notebook',name:'Sổ Tay',icon:'📓',minPrice:1,maxPrice:3,tier:'small',recyclePoints:1,weight:85},
  {id:'m_toothbrush',name:'Bàn Chải Đánh Răng',icon:'🪥',minPrice:1,maxPrice:2.5,tier:'small',recyclePoints:1,weight:88},
  {id:'m_keychain',name:'Móc Khóa',icon:'🔑',minPrice:0.5,maxPrice:2,tier:'small',recyclePoints:1,weight:90},
  {id:'m_lighter',name:'Bật Lửa',icon:'🔥',minPrice:0.3,maxPrice:1,tier:'small',recyclePoints:1,weight:92},
  {id:'m_bag',name:'Túi Đi Chợ Tái Sử Dụng',icon:'👜',minPrice:0.5,maxPrice:1,tier:'small',recyclePoints:1,weight:92},
  {id:'m_pen',name:'Bút Bi',icon:'🖊️',minPrice:0.2,maxPrice:0.5,tier:'small',recyclePoints:1,weight:95},
  {id:'m_hairclip',name:'Kẹp Tóc',icon:'📎',minPrice:0.1,maxPrice:0.3,tier:'small',recyclePoints:1,weight:97},
  {id:'m_candy',name:'Một Viên Kẹo',icon:'🍬',minPrice:0.05,maxPrice:0.1,tier:'small',recyclePoints:1,weight:100},
];

const NORMAL_SELLERS = ['uyquyen.com ✅','nc.com ✅','batam.com ✅','shopvip.com ✅','luxury24.com ✅'];
const OTHER_SELLERS = ['???','ongtrum.com','bagia.com','dealroi.net','hàng_xách_tay','nguoiban_ẩn','mrx.shop','store99.com','deal_hot','bán_rẻ_vcl'];

const MARKET_CONFIG = {
  normal: { priceMult:3.0, chance:1.00, accent:'#4ade80', theme:'#1e3a2a', sellers:NORMAL_SELLERS, label:'Chợ Phổ Thông' },
  mid:    { priceMult:0.9, chance:0.57, accent:'#60a5fa', theme:'#1e2f4a', sellers:OTHER_SELLERS, label:'Chợ Giá Rẻ' },
  black:  { priceMult:0.67,chance:0.36, accent:'#f87171', theme:'#2a1a1a', sellers:OTHER_SELLERS, label:'Chợ Đen' },
};

let activeMarket = localStorage.getItem('ui_activeMarket')||'normal';
let mktCountdown = 60;
let buyerCountdown = 20;

function weightedRandomItem() {
  const totalWeight = MARKET_ITEMS.reduce((s,i)=>s+i.weight,0);
  let r = Math.random()*totalWeight;
  for (const item of MARKET_ITEMS) {
    r -= item.weight;
    if (r <= 0) return item;
  }
  return MARKET_ITEMS[MARKET_ITEMS.length-1];
}

function generateStock(marketType) {
  const cfg = MARKET_CONFIG[marketType];
  const stock = [];
  for (let i = 0; i < 50; i++) {
    const item = weightedRandomItem();
    const basePrice = item.minPrice + Math.random()*(item.maxPrice - item.minPrice);
    const price = basePrice * cfg.priceMult;
    const seller = cfg.sellers[Math.floor(Math.random()*cfg.sellers.length)];
    stock.push({ id: item.id+'_'+Date.now()+'_'+i, itemId: item.id, price, seller, bought:false });
  }
  return stock;
}

function restockAll() {
  G.marketStocks.normal = generateStock('normal');
  G.marketStocks.mid = generateStock('mid');
  G.marketStocks.black = generateStock('black');
  G.lastStockTime = Date.now();
  saveGame(false);
  if (document.getElementById('panel-market').classList.contains('active')) renderMarket();
}

function switchMarket(type) {
  activeMarket = type;
  localStorage.setItem('ui_activeMarket', type);
  document.querySelectorAll('.market-tab').forEach(t=>t.classList.remove('active'));
  document.getElementById('mtab-'+type).classList.add('active');
  renderMarket();
}

function renderMarket() {
  const container = document.getElementById('market-content');
  if (activeMarket === 'my') { renderMyListings(); return; }
  const cfg = MARKET_CONFIG[activeMarket];
  const stock = G.marketStocks[activeMarket] || [];
  const available = stock.filter(s=>!s.bought);

  container.innerHTML = `
    <div style="font-size:12px;color:#6b7280;margin-bottom:10px;padding:8px;background:#111827;border:1px solid #1f2937;border-radius:6px">
      ${cfg.label} — Giá x${cfg.priceMult} | Tỉ lệ nhận hàng: <span style="color:${cfg.accent}">${(cfg.chance*100).toFixed(0)}%</span> | Còn ${available.length}/50 món
    </div>
    <div class="market-items-grid" id="mkt-grid"></div>`;

  const grid = document.getElementById('mkt-grid');
  available.slice(0,50).forEach(stock_item => {
    const item = MARKET_ITEMS.find(i=>i.id===stock_item.itemId);
    if (!item) return;
    const canBuy = G.money >= stock_item.price;
    const invFull = G.inventory.length >= G.invMaxSlots;
    const div = document.createElement('div');
    div.className = 'mkt-card';
    div.style.borderColor = cfg.accent+'44';
    div.innerHTML = `
      <div class="mkt-img">${item.icon}</div>
      <div class="mkt-name">${item.name}</div>
      <div class="mkt-seller" style="color:${stock_item.seller.includes('✅')?'#4ade80':'#6b7280'}">${stock_item.seller}</div>
      <div class="mkt-price">${fmtPrice(stock_item.price)}</div>
      <div style="font-size:10px;color:#4b5563;margin-top:1px">Giá gốc: ${fmtPrice(item.minPrice)}–${fmtPrice(item.maxPrice)}</div>
      <div class="mkt-chance" style="color:${cfg.accent}">🎲 ${(cfg.chance*100).toFixed(0)}% nhận hàng</div>
      <div style="font-size:10px;color:#4b5563">♻️ ${item.recyclePoints} điểm tái chế</div>
      <button class="mkt-buy-btn" style="background:${cfg.theme};color:${cfg.accent};border-color:${cfg.accent}44"
        ${(!canBuy||invFull)?'disabled':''}
        onclick="buyMarketItem('${activeMarket}','${stock_item.id}')">
        ${invFull?'Kho đầy':!canBuy?'Thiếu '+fmtPrice(stock_item.price-G.money):'Mua'}
      </button>`;
    grid.appendChild(div);
  });

  if (available.length === 0) {
    container.innerHTML += `<div style="text-align:center;color:#374151;padding:30px;font-size:14px">Hết hàng! Chờ stock mới 🔄</div>`;
  }
}

function fmtPrice(n) {
  if (n < 0.1) return '$'+n.toFixed(3);
  if (n < 1) return '$'+n.toFixed(2);
  if (n < 1000) return '$'+n.toFixed(2);
  if (n < 1e6) return '$'+(n/1e3).toFixed(2)+'K';
  if (n < 1e9) return '$'+(n/1e6).toFixed(2)+'M';
  return '$'+(n/1e9).toFixed(2)+'B';
}

function buyMarketItem(marketType, stockId) {
  const stock = G.marketStocks[marketType];
  const idx = stock.findIndex(s=>s.id===stockId);
  if (idx===-1) return;
  const stock_item = stock[idx];
  const item = MARKET_ITEMS.find(i=>i.id===stock_item.itemId);
  if (!item) return;
  // Chợ đen: không đánh thuế, không bị cấm mua
  const isBlack = marketType === 'black';
  if (!isBlack && !taxCheckBanBeforeBuy()) return;
  if (G.money < stock_item.price) { showError('💸 Không đủ tiền!'); return; }
  if (G.inventory.length >= G.invMaxSlots) { showError('🎒 Kho đầy!'); return; }

  G.money -= stock_item.price;
  G.totalEarned -= 0; // buying cost

  const cfg = MARKET_CONFIG[marketType];
  const success = Math.random() < cfg.chance;

  if (success) {
    G.inventory.push({
      id: 'inv_'+Date.now()+'_'+Math.random().toString(36).slice(2),
      itemId: item.id, name: item.name, icon: item.icon,
      boughtPrice: stock_item.price, tier: item.tier,
      recyclePoints: item.recyclePoints,
      baseMinPrice: item.minPrice, baseMaxPrice: item.maxPrice,
    });
    stock[idx].bought = true;
    if (!isBlack) taxIssueBill(item.icon + ' ' + item.name, stock_item.price);
    showNotif(item.icon+' '+item.name+' → Kho!');
  } else {
    stock[idx].bought = true;
    showError('😢 Mua thất bại! Mất '+fmtPrice(stock_item.price));
  }

  updateUI(); saveGame(false);
  renderMarket();
  if (document.getElementById('panel-inventory').classList.contains('active')) renderInventory();
}

// ═══ MY LISTINGS ══════════════════════════════════════════════════
function renderMyListings() {
  const container = document.getElementById('market-content');
  const inv = G.inventory;

  let html = `<div style="font-size:14px;color:#fbbf24;font-weight:500;margin-bottom:12px">📦 Đăng bán vật phẩm của bạn</div>`;

  if (G.myListings.length > 0) {
    html += `<div style="margin-bottom:14px"><div style="font-size:13px;color:#6b7280;margin-bottom:8px">Đang treo bán (${G.myListings.length}):</div>`;
    G.myListings.forEach((l,idx) => {
      const item = MARKET_ITEMS.find(i=>i.id===l.itemId);
      const minP = l.baseMinPrice || (l.boughtPrice * 0.5) || 1;
      const maxP = l.baseMaxPrice || (l.boughtPrice * 2) || 2;
      const baseAvg = (minP + maxP) / 2;
      const priceMax = baseAvg <= 100 ? baseAvg * 2.0 : baseAvg * 1.5;
      const priceMin = Math.max(0.01, baseAvg * 0.1);
      const t = Math.max(0, Math.min(1, (l.price - priceMin) / (priceMax - priceMin)));
      const c = Math.log(0.95), end = Math.log(0.01), mid = Math.log(0.55);
      const b = 4*mid - 3*c - end, a = (end - c) - b;
      const buyChance = Math.max(1, Math.min(95, Math.round(Math.exp(a*t*t + b*t + c) * 100)));
      html += `<div class="listing-card">
        <div style="display:flex;align-items:center;gap:10px">
          <span style="font-size:24px">${l.icon}</span>
          <div style="flex:1">
            <div style="font-size:13px;color:#e2e8f0">${l.name}</div>
            <div style="font-size:12px;color:#6b7280">Chợ: ${MARKET_CONFIG[l.market].label}</div>
            <div style="font-size:12px;color:#fbbf24">Giá: ${fmtPrice(l.price)} | 🎲 ${buyChance.toFixed(0)}% bán được</div>
          </div>
          <button onclick="cancelListing(${idx})" style="padding:4px 10px;background:#3b1a1a;color:#f87171;border:1px solid #5a2a2a;border-radius:5px;cursor:pointer;font-size:11px">Hủy</button>
        </div>
      </div>`;
    });
    html += `</div>`;
  }

  if (inv.length === 0) {
    html += `<div style="text-align:center;color:#374151;padding:20px;font-size:13px">Kho trống, không có gì để bán</div>`;
  } else {
    html += `<div style="font-size:13px;color:#6b7280;margin-bottom:8px">Chọn vật phẩm để đăng bán:</div>
    <div class="market-items-grid">`;
    inv.forEach((invItem, iIdx) => {
      const item = MARKET_ITEMS.find(i=>i.id===invItem.itemId);
      const baseAvg = item
        ? (item.minPrice+item.maxPrice)/2
        : ((invItem.baseMinPrice||0) + (invItem.baseMaxPrice||invItem.boughtPrice||1)) / 2 || (invItem.boughtPrice||1);
      const priceCap = baseAvg <= 100 ? baseAvg * 2.0 : baseAvg * 1.5;
      const priceMin = Math.max(0.01, baseAvg * 0.1);
      const capLabel = baseAvg <= 100 ? '200%' : '150%';
      html += `<div class="mkt-card" style="border-color:#fbbf2444">
        <div class="mkt-img">${invItem.icon}</div>
        <div class="mkt-name">${invItem.name}</div>
        <div style="font-size:11px;color:#6b7280;margin-bottom:3px">Đã mua: ${fmtPrice(invItem.boughtPrice)}</div>
        <div style="font-size:11px;color:#4b5563;margin-bottom:2px">Gợi ý: ${fmtPrice(baseAvg)}</div>
        <div style="font-size:10px;color:#374151;margin-bottom:5px">Min: ${fmtPrice(priceMin)} | Max: ${fmtPrice(priceCap)} (${capLabel})</div>
        <div style="display:flex;gap:4px;margin-bottom:5px;align-items:center">
          <span style="font-size:11px;color:#6b7280">Giá:</span>
          <input type="number" id="price_${iIdx}" value="${baseAvg.toFixed(2)}" step="0.01" min="${priceMin.toFixed(2)}" max="${priceCap.toFixed(2)}"
            style="flex:1;padding:3px 5px;background:#0d1117;border:1px solid #374151;border-radius:4px;color:#e2e8f0;font-size:11px">
        </div>
        <select id="mkt_${iIdx}" style="width:100%;padding:4px;background:#0d1117;border:1px solid #374151;border-radius:4px;color:#e2e8f0;font-size:11px;margin-bottom:5px">
          <option value="normal">🏬 Chợ Phổ Thông</option>
          <option value="mid">🛒 Chợ Giá Rẻ</option>
          <option value="black">🌑 Chợ Đen</option>
        </select>
        <button class="mkt-buy-btn" style="background:#2a2a1e;color:#fbbf24;border-color:#fbbf2444"
          onclick="listForSale(${iIdx})">Đăng Bán</button>
      </div>`;
    });
    html += `</div>`;
  }

  container.innerHTML = html;
}

function listForSale(invIdx) {
  const invItem = G.inventory[invIdx];
  if (!invItem) return;
  const priceEl = document.getElementById('price_'+invIdx);
  const mktEl = document.getElementById('mkt_'+invIdx);
  const price = parseFloat(priceEl.value);
  if (isNaN(price) || price <= 0) { showError('⚠️ Giá không hợp lệ!'); return; }

  // Price cap: ≤$100 base → max 200%, >$100 base → max 150%
  const item = MARKET_ITEMS.find(i=>i.id===invItem.itemId);
  const baseAvg = item
    ? (item.minPrice+item.maxPrice)/2
    : ((invItem.baseMinPrice||0) + (invItem.baseMaxPrice||invItem.boughtPrice||1)) / 2 || (invItem.boughtPrice||1);
  const priceCap = baseAvg <= 100 ? baseAvg * 2.0 : baseAvg * 1.5;
  const priceMin = baseAvg * 0.1;
  if (price > priceCap) {
    showError(`⚠️ Giá tối đa: ${fmtPrice(priceCap)} (${baseAvg<=100?'200%':'150%'} giá trị)`);
    priceEl.value = priceCap.toFixed(2);
    return;
  }
  if (price < priceMin) {
    showError(`⚠️ Giá tối thiểu: ${fmtPrice(priceMin)} (10% giá trị)`);
    priceEl.value = priceMin.toFixed(2);
    return;
  }

  const market = mktEl.value;

  G.myListings.push({
    invId: invItem.id, itemId: invItem.itemId, name: invItem.name, icon: invItem.icon,
    price, market, boughtPrice: invItem.boughtPrice,
    baseMinPrice: invItem.baseMinPrice, baseMaxPrice: invItem.baseMaxPrice,
  });
  G.inventory.splice(invIdx, 1);
  showNotif('📦 Đã đăng bán '+invItem.name);
  saveGame(false); renderMyListings();
}

function cancelListing(idx) {
  const l = G.myListings[idx];
  if (!l) return;
  if (G.inventory.length >= G.invMaxSlots) { showError('🎒 Kho đầy! Không thể hủy.'); return; }
  G.inventory.push({
    id: l.invId, itemId: l.itemId, name: l.name, icon: l.icon,
    boughtPrice: l.boughtPrice, tier: '',
    recyclePoints: (function(){ var _m=MARKET_ITEMS.find(i=>i.id===l.itemId); return _m ? _m.recyclePoints : undefined; })()||1,
    baseMinPrice: l.baseMinPrice, baseMaxPrice: l.baseMaxPrice,
  });
  G.myListings.splice(idx, 1);
  showNotif('↩️ Đã hủy đăng bán');
  saveGame(false); renderMyListings();
}

function processListingSales() {
  if (!G.myListings.length) return;
  const toRemove = [];
  G.myListings.forEach((l,idx) => {
    // Dùng baseMinPrice/baseMaxPrice đã lưu khi niêm yết để đồng nhất với UI
    const minP = l.baseMinPrice || (l.boughtPrice * 0.5) || 1;
    const maxP = l.baseMaxPrice || (l.boughtPrice * 2) || 2;
    const baseAvg = (minP + maxP) / 2;
    // priceMax phải khớp đúng với UI: baseAvg <= 100 → x2, còn lại → x1.5
    const priceMax = baseAvg <= 100 ? baseAvg * 2.0 : baseAvg * 1.5;
    // Chuẩn hóa giá người chơi đặt vào [0, 1]: 0 = giá min, 1 = giá max
    const priceMin = Math.max(0.01, baseAvg * 0.1);
    const t = Math.max(0, Math.min(1, (l.price - priceMin) / (priceMax - priceMin)));
    // Nội suy tuyến tính trên thang log: t=0 → 95%, t=0.5 (giá tb) → 55%, t=1 → 1%
    // log(0.95)=−0.051, log(0.55)=−0.598, log(0.01)=−4.605
    // Dùng hàm bậc hai trên thang log để khớp 3 điểm neo
    // ln(chance) = a*t^2 + b*t + c
    // c = ln(0.95), a+b+c = ln(0.01), 0.25a+0.5b+c = ln(0.55)
    const c = Math.log(0.95);                    // −0.0513
    const end = Math.log(0.01);                  // −4.6052
    const mid = Math.log(0.55);                  // −0.5978
    // 0.25a + 0.5b = mid - c  →  (1)
    // a + b = end - c          →  (2)
    // Từ (1)×4: a + 2b = 4*(mid-c)
    // Trừ (2): b = 4*(mid-c) - (end-c) = 4*mid - 3*c - end
    const b = 4*mid - 3*c - end;                 // ≈ −3.876
    const a = (end - c) - b;                     // ≈ −0.682
    const lnChance = a*t*t + b*t + c;
    const buyChance = Math.max(0.01, Math.min(0.95, Math.exp(lnChance)));
    // Factory Plus / Premium: x2 market buy success rate
    const finalBuyChance = (G.factoryPlus || G.factoryPremium) ? Math.min(0.95, buyChance * 2) : buyChance;
    if (Math.random() < finalBuyChance) {
      G.money += l.price;
      G.totalEarned += l.price;
      showNotif('💰 Bán được: '+l.name+' +'+fmtPrice(l.price));
      toRemove.push(idx);
    }
  });
  for (let i = toRemove.length-1; i>=0; i--) G.myListings.splice(toRemove[i],1);
  if (toRemove.length) { saveGame(false); if (document.getElementById('panel-market').classList.contains('active')&&activeMarket==='my') renderMyListings(); }
}

/* ┌─────────────────────────────────────────────────────────────────────────┐
   │  MODULE 07 · INVENTORY  —  kho đồ · recycle · quickSell               │
   └─────────────────────────────────────────────────────────────────────────┘ */
// ═══ INVENTORY ════════════════════════════════════════════════════
function renderInventory() {
  const grid = document.getElementById('inv-grid');
  const emptyEl = document.getElementById('inv-empty');
  document.getElementById('inv-used').textContent = G.inventory.length;
  document.getElementById('inv-max').textContent = G.invMaxSlots;
  document.getElementById('inv-rp').textContent = G.recyclePoints;

  grid.innerHTML = '';
  if (G.inventory.length === 0) { emptyEl.style.display='block'; return; }
  emptyEl.style.display = 'none';

  G.inventory.forEach((invItem, idx) => {
    const item = MARKET_ITEMS.find(i=>i.id===invItem.itemId);
    const tierColors = {super:'#a78bfa',tech:'#60a5fa',fashion:'#fbbf24',personal:'#4ade80',small:'#6b7280',special:'#ffd700'};
    const tierNames = {super:'Siêu Tài Sản',tech:'Công Nghệ',fashion:'Thời Trang',personal:'Cá Nhân',small:'Nhỏ',special:'Đặc Biệt'};
    const tc = tierColors[invItem.tier]||'#6b7280';
    const tn = tierNames[invItem.tier]||invItem.tier;
    const baseAvg = item
      ? (item.minPrice+item.maxPrice)/2
      : ((invItem.baseMinPrice||0) + (invItem.baseMaxPrice||invItem.boughtPrice||1)) / 2 || (invItem.boughtPrice||1);
    const div = document.createElement('div');
    div.className = 'inv-card';
    div.style.borderColor = tc+'44';

    if (invItem.isTicket) {
      div.innerHTML = `
        <div class="inv-img">${invItem.icon}</div>
        <div class="inv-name">${invItem.name}</div>
        <div class="inv-tier" style="background:${tc}22;color:${tc}">${tn}</div>
        <div style="font-size:10px;color:#ffd700;margin-bottom:5px">Dùng để miễn phí 1 lần thuế hoặc nợ</div>
        <div class="inv-btns">
          <button onclick="useEvadeTicket(${idx})" style="background:#1a1500;color:#ffd700;border-color:#b45309;font-size:11px;padding:5px 8px" title="Dùng vé">🎫 Dùng</button>
        </div>`;
    } else if (invItem.isBannerMetal) {
      const mc = invItem.color || '#ffd700';
      div.style.borderColor = mc + '55';
      div.innerHTML = `
        <div class="inv-img">${invItem.icon}</div>
        <div class="inv-name" style="color:${mc}">${invItem.name}</div>
        <div class="inv-tier" style="background:${mc}22;color:${mc}">${invItem.tier||'rare'}</div>
        <div style="font-size:10px;color:#00f5ff;margin-bottom:5px">🔮 ${invItem.tokenValue||0} Token</div>
        <div class="inv-btns">
          <button onclick="sellBannerMetal(${idx})" style="background:#1a1000;color:#ffd700;border-color:#ffd70066;font-size:11px;padding:5px 8px" title="Bán lấy Token">💰 Bán</button>
        </div>`;
    } else {
      div.innerHTML = `
        <div class="inv-img">${invItem.icon}</div>
        <div class="inv-name">${invItem.name}</div>
        <div class="inv-tier" style="background:${tc}22;color:${tc}">${tn}</div>
        <div style="font-size:10px;color:#6b7280;margin-bottom:5px">Đã mua: ${fmtPrice(invItem.boughtPrice)}</div>
        <div class="inv-btns">
          <button onclick="recycleItem(${idx})" style="background:#1e3a2a;color:#4ade80;border-color:#2d5a3f" title="Tái chế">♻️ +${invItem.recyclePoints}pt</button>
          <button onclick="quickSell(${idx},${baseAvg})" style="background:#3b1a1a;color:#f87171;border-color:#5a2a2a" title="Bán nhanh">💵</button>
        </div>`;
    }
    grid.appendChild(div);
  });
}

let pendingRecycleIdx = null;

function recycleItem(idx) {
  const invItem = G.inventory[idx];
  if (!invItem) return;
  const item = MARKET_ITEMS.find(i=>i.id===invItem.itemId);
  const baseAvg = item
    ? (item.minPrice+item.maxPrice)/2
    : ((invItem.baseMinPrice||0) + (invItem.baseMaxPrice||invItem.boughtPrice||1)) / 2 || (invItem.boughtPrice||1);
  if (baseAvg > 100) {
    // Show confirm modal
    pendingRecycleIdx = idx;
    document.getElementById('rcmod-icon').textContent = invItem.icon;
    document.getElementById('rcmod-name').textContent = invItem.name;
    document.getElementById('rcmod-price').textContent = 'Giá trị khoảng: '+fmtPrice(baseAvg);
    document.getElementById('rcmod-pts').textContent = '+'+invItem.recyclePoints+' điểm tái chế';
    document.getElementById('recycle-modal').style.display = 'flex';
  } else {
    doRecycle(idx);
  }
}

function confirmRecycle() {
  if (pendingRecycleIdx === null) return;
  doRecycle(pendingRecycleIdx);
  closeRecycleModal();
}

function closeRecycleModal() {
  document.getElementById('recycle-modal').style.display = 'none';
  pendingRecycleIdx = null;
}

function doRecycle(idx) {
  const invItem = G.inventory[idx];
  if (!invItem) return;
  const boost = (G.matBonuses&&G.matBonuses.recycleBoost)||1;
  const pts = Math.round(invItem.recyclePoints * boost);
  G.recyclePoints += pts;
  G.inventory.splice(idx, 1);
  showNotif('♻️ Tái chế! +'+pts+(boost>1?' (×'+boost.toFixed(1)+'boost)':'')+' điểm');
  saveGame(false); renderInventory();
  if (document.getElementById('panel-rshop').classList.contains('active')) renderRShop();
}

function quickSell(idx, baseAvg) {
  const invItem = G.inventory[idx];
  if (!invItem) return;
  const sellPrice = baseAvg * 0.5;
  G.money += sellPrice;
  G.totalEarned += sellPrice;
  G.inventory.splice(idx, 1);
  showNotif('💵 Bán nhanh: +'+fmtPrice(sellPrice));
  updateUI(); saveGame(false); renderInventory();
}

function expandInventory() {
  if (G.money < 700) { showError('💸 Cần $700 để mở thêm 10 ô kho!'); return; }
  G.money -= 700; G.invMaxSlots += 10;
  showNotif('🎒 Kho mở rộng → '+G.invMaxSlots+' slots!');
  updateUI(); saveGame(false); renderInventory();
}

// ═══ RECYCLE SHOP ═════════════════════════════════════════════════
const RECYCLE_SHOP_ITEMS = [
  // Xu - tỉ lệ: 10 xu = $1, mua 10xu cần 50pt (1pt~$0.02)
  {id:'rs_xu10',   name:'10 Xu',          icon:'🪙',  cost:50,      desc:'10 xu vào ví (~$1)'},
  {id:'rs_xu100',  name:'100 Xu',          icon:'🪙🪙', cost:450,     desc:'100 xu vào ví (~$10)'},
  // Gold - 1 gold = $100, mua cần 8000pt (1pt~$0.012)
  {id:'rs_gold1',  name:'1 Gold',          icon:'🥇',  cost:8000,    desc:'1 Gold vào ví (~$100)'},
  // Diamond - 1 diamond = $1,000, mua cần 120,000pt
  {id:'rs_diamond1',name:'1 Diamond',      icon:'💎',  cost:120000,  desc:'1 Diamond vào ví (~$1,000)'},
  // Kho - tiện ích thuần, giá vừa phải
  {id:'rs_inv10',  name:'+10 Ô Kho',       icon:'🎒',  cost:3000,    desc:'Mở thêm 10 ô kho đồ'},
  // Cash - đắt cực kỳ, lỗ so với mua xu/gold để tránh lạm phát
  {id:'rs_money10',name:'$10 Cash',        icon:'💵',  cost:2000,    desc:'Nhận $10 tiền mặt (tỉ lệ thấp)'},
  {id:'rs_money100',name:'$100 Cash',      icon:'💵💵', cost:25000,   desc:'Nhận $100 tiền mặt (tỉ lệ thấp)'},
  {id:'rs_money1k', name:'$1,000 Cash',    icon:'💴',  cost:300000,  desc:'Nhận $1,000 tiền mặt (tỉ lệ thấp)'},
  {id:'rs_money10k',name:'$10,000 Cash',   icon:'💶',  cost:4000000, desc:'Nhận $10,000 tiền mặt (tỉ lệ rất thấp)'},
];

function renderRShop() {
  document.getElementById('rshop-rp').textContent = G.recyclePoints;
  const grid = document.getElementById('rshop-grid');
  grid.innerHTML = '';
  RECYCLE_SHOP_ITEMS.forEach(item => {
    const canBuy = G.recyclePoints >= item.cost;
    const div = document.createElement('div');
    div.className = 'rshop-card';
    div.innerHTML = `
      <div class="rshop-icon">${item.icon}</div>
      <div class="rshop-name">${item.name}</div>
      <div style="font-size:12px;color:#6b7280;margin-bottom:5px">${item.desc}</div>
      <div class="rshop-cost">♻️ ${item.cost.toLocaleString()} điểm</div>
      <button class="rshop-btn" ${!canBuy?'disabled':''} onclick="buyRShopItem('${item.id}')">
        ${canBuy?'Đổi':'Cần '+(item.cost-G.recyclePoints)+' điểm nữa'}
      </button>`;
    grid.appendChild(div);
  });
}

// buyRShopItem(id) — spend Recycle Points to redeem a reward.
// Rewards: Xu, Gold, Diamond, extra inventory slots, or direct cash.
// Cash rewards are deliberately bad value to prevent inflation.
function buyRShopItem(id) {
  const item = RECYCLE_SHOP_ITEMS.find(i=>i.id===id);
  if (!item || G.recyclePoints < item.cost) return;
  G.recyclePoints -= item.cost;
  if      (id==='rs_xu10')     { G.wallet.xu=(G.wallet.xu||0)+10;   showNotif('🪙 +10 Xu!'); }
  else if (id==='rs_xu100')    { G.wallet.xu=(G.wallet.xu||0)+100;  showNotif('🪙 +100 Xu!'); }
  else if (id==='rs_gold1')    { G.wallet.gold=(G.wallet.gold||0)+1; showNotif('🥇 +1 Gold!'); }
  else if (id==='rs_diamond1') { G.wallet.diamond=(G.wallet.diamond||0)+1; showNotif('💎 +1 Diamond!'); }
  else if (id==='rs_inv10')    { G.invMaxSlots+=10; showNotif('🎒 Kho +10 → '+G.invMaxSlots); }
  else if (id==='rs_money10')  { G.money+=10;    G.totalEarned+=10;    showNotif('💵 +$10!'); }
  else if (id==='rs_money100') { G.money+=100;   G.totalEarned+=100;   showNotif('💵 +$100!'); }
  else if (id==='rs_money1k')  { G.money+=1000;  G.totalEarned+=1000;  showNotif('💵 +$1,000!'); }
  else if (id==='rs_money10k') { G.money+=10000; G.totalEarned+=10000; showNotif('💵 +$10,000!'); }
  updateUI(); saveGame(false); renderRShop();
}

function convertRPtoDollar() {
  if (!G.recyclePoints) { showError('Không có điểm tái chế!'); return; }
  const earned = G.recyclePoints;
  G.money += earned; G.totalEarned += earned;
  G.recyclePoints = 0;
  showNotif('💵 Đổi '+earned+' điểm → $'+earned);
  updateUI(); saveGame(false); renderRShop();
}

/* ┌─────────────────────────────────────────────────────────────────────────┐
   │  MODULE 08 · VALUE SYSTEM  —  multiplier growth · VIP bundles          │
   └─────────────────────────────────────────────────────────────────────────┘ */
// ═══ MARKET TIMERS ════════════════════════════════════════════════
// Initial stock if empty
if (!G.marketStocks.normal.length) restockAll();

// ── Market timers ─────────────────────────────────────────────────────────
// Two parallel countdown timers drive the market simulation:
//   mktCountdown  (60 s) — adds 10 new items to each market, trims to 50 max
//   buyerCountdown (20 s) — NPC buyers auto-purchase from the player's listings
// Both counters are displayed live in the Market panel UI.
setInterval(() => {
  mktCountdown--;
  buyerCountdown--;

  if (mktCountdown <= 0) {
    // Add 10 items to each market
    ['normal','mid','black'].forEach(type => {
      const cfg = MARKET_CONFIG[type];
      for (let i=0;i<10;i++) {
        const item = weightedRandomItem();
        const basePrice = item.minPrice + Math.random()*(item.maxPrice - item.minPrice);
        const price = basePrice * cfg.priceMult;
        const sellers = cfg.sellers;
        const seller = sellers[Math.floor(Math.random()*sellers.length)];
        G.marketStocks[type].push({ id:item.id+'_'+Date.now()+'_'+i, itemId:item.id, price, seller, bought:false });
      }
      // Trim to max 50
      const avail = G.marketStocks[type].filter(s=>!s.bought);
      if (avail.length > 50) {
        let toRemove = avail.length - 50;
        for (let j=0;j<G.marketStocks[type].length&&toRemove>0;j++) {
          if (!G.marketStocks[type][j].bought) { G.marketStocks[type].splice(j,1); j--; toRemove--; }
        }
      }
    });
    mktCountdown = 60;
    saveGame(false);
    if (document.getElementById('panel-market').classList.contains('active')&&activeMarket!=='my') renderMarket();
  }

  if (buyerCountdown <= 0) {
    processListingSales();
    buyerCountdown = 20;
  }

  const ctEl = document.getElementById('mkt-countdown');
  const btEl = document.getElementById('mkt-buyer-countdown');
  if (ctEl) ctEl.textContent = mktCountdown+'s';
  if (btEl) btEl.textContent = buyerCountdown+'s';
}, 1000);

// [PERF] Old 500ms money loop removed — replaced by RAF _gameLoop above
setInterval(()=>saveGame(false), 15000);


// ═══ VIP SHOP ═════════════════════════════════════════════════════
// ═══ TOKEN BUNDLES (mua bằng VNĐ thật) ═════════════════════════════
const TOKEN_BUNDLES = [
  {
    id:'token_small', name:'Token Bundle', icon:'🔮', tier:1,
    priceVND:10000, priceDisplay:'10,000đ', tokens:10,
    color:'#00f5ff', border:'#00c8ff', badgeColor:'#0ea5e9', badge:'PHỔ BIẾN',
    theme:'linear-gradient(135deg,#001a2e,#002a3e)',
    desc:'Khởi đầu hành trình Token của bạn!',
    perks:[ {icon:'🔮',text:'+10 Token'}, {icon:'📺',text:'+1 Block Ads vĩnh viễn'} ],
    effects:{ tokens:10, blockAds:1 }
  },
  {
    id:'token_big', name:'Big Token Bundle', icon:'💠', tier:2,
    priceVND:30000, priceDisplay:'30,000đ', tokens:40,
    color:'#818cf8', border:'#6366f1', badgeColor:'#6366f1', badge:'GIÁ TRỊ',
    theme:'linear-gradient(135deg,#0f0a2a,#1a0f3a)',
    desc:'Tăng tốc sản xuất ngay từ đầu game!',
    perks:[ {icon:'💠',text:'+40 Token'}, {icon:'🏭',text:'Unlock Tier 1 & 2 Shop Machine'} ],
    effects:{ tokens:40, unlockShopTiers:[1,2] }
  },
  {
    id:'token_mega', name:'Mega Token Bundle', icon:'⚡', tier:3,
    priceVND:50000, priceDisplay:'50,000đ', tokens:90,
    color:'#f59e0b', border:'#f59e0b', badgeColor:'#d97706', badge:'HOT 🔥',
    theme:'linear-gradient(135deg,#1a1000,#2a1a00)',
    desc:'Combo cực mạnh cho game thủ nghiêm túc!',
    perks:[
      {icon:'⚡',text:'+90 Token'},
      {icon:'🗝️',text:'+3 Key 🗝️ (quay Banner kim loại quý)'},
      {icon:'🔓',text:'Unlock Tier 2, 3, 4 Shop Machine'},
      {icon:'🌐',text:'Gói Internet Speed vĩnh viễn'},
      {icon:'💹',text:'Value Pump ×2 (tab Nguyên Liệu)'},
    ],
    effects:{ tokens:90, keys:3, unlockShopTiers:[2,3,4], permanentSpeedInternet:true, freeValuePump:true }
  },
  {
    id:'token_elite', name:'Elite Token Bundle', icon:'🌟', tier:3,
    priceVND:80000, priceDisplay:'80,000đ', tokens:150,
    color:'#34d399', border:'#10b981', badgeColor:'#059669', badge:'ELITE ✨',
    theme:'linear-gradient(135deg,#001a10,#002a18)',
    desc:'Gói trung cấp hoàn hảo — tăng tốc toàn diện!',
    perks:[
      {icon:'🌟',text:'+150 Token'},
      {icon:'🗝️',text:'+6 Key 🗝️ (quay Banner kim loại quý)'},
      {icon:'🔓',text:'Unlock Tier 3, 4, 5 Shop Machine'},
      {icon:'⛽',text:'Bình Xăng Loại 4 × 3 (tab Điện)'},
      {icon:'🎒',text:'+10 ô Kho Đồ'},
    ],
    effects:{ tokens:150, keys:6, unlockShopTiers:[3,4,5], fuelF4:3, bonusInvSlots:10 }
  },
  {
    id:'token_super', name:'Super Token Bundle', icon:'🚀', tier:4,
    priceVND:200000, priceDisplay:'200,000đ', tokens:500,
    color:'#f87171', border:'#ef4444', badgeColor:'#dc2626', badge:'SIÊU HIẾM 💎',
    theme:'linear-gradient(135deg,#1a0505,#2a0a0a)',
    desc:'Gói siêu giá trị dành cho người chơi đỉnh cao!',
    perks:[
      {icon:'🚀',text:'+450 Token + 50 Token bonus'},
      {icon:'🗝️',text:'+15 Key 🗝️ (quay Banner kim loại quý)'},
      {icon:'💵',text:'+400,000đ tiền khởi đầu'},
    ],
    effects:{ tokens:500, keys:15, startBonus:400000 }
  },
  {
    id:'token_legendary', name:'Legendary Token Bundle', icon:'👑', tier:5,
    priceVND:499999, priceDisplay:'499,999đ', tokens:1100,
    color:'#ffd700', border:'#ffd700', badgeColor:'#b45309', badge:'👑 LEGENDARY',
    theme:'linear-gradient(135deg,#1a1000,#2d1f00,#1a1000)',
    desc:'Gói đỉnh nhất lịch sử game. Chỉ dành cho huyền thoại!',
    perks:[
      {icon:'👑',text:'+1,100 Token'},
      {icon:'🗝️',text:'+35 Key 🗝️ (quay Banner kim loại quý)'},
      {icon:'🌐',text:'Gói Internet Speed vĩnh viễn'},
      {icon:'🏭',text:'Bình Xăng Loại 5 × 5 (tab Điện)'},
      {icon:'💰',text:'+5,000,000$ tiền khởi đầu'},
      {icon:'🎫',text:'+20 Vé Trốn Thuế & Trốn Nợ (vào Túi Đồ)'},
    ],
    effects:{ tokens:1100, keys:35, permanentSpeedInternet:true, fuelF5:5, startBonusMillion:5, taxEvadeTickets:20 }
  },
  {
    id:'token_supermega', name:'Super Mega Key Bundle', icon:'🗝️', tier:6,
    priceVND:799999, priceDisplay:'799,999đ', tokens:2888,
    color:'#00ffe7', border:'#00c8ff', badgeColor:'linear-gradient(135deg,#0ea5e9,#7c3aed)', badge:'🗝️ SUPER MEGA',
    theme:'linear-gradient(135deg,#000d1a,#001a2e,#000f20)',
    desc:'Chìa khóa siêu cấp mở toàn bộ tiềm năng — tokens khổng lồ & vốn khởi nghiệp tỷ đô!',
    perks:[
      {icon:'🗝️',text:'+2,888 Token — Siêu Cấp'},
      {icon:'🗝️',text:'+80 Key 🗝️ (quay Banner kim loại quý)'},
      {icon:'💵',text:'+1,000,000,000$ (1 Tỷ) tiền khởi đầu'},
      {icon:'🌐',text:'Gói Internet Speed vĩnh viễn'},
      {icon:'⛽',text:'Bình Xăng Loại 5 × 10 (tab Điện)'},
      {icon:'🎫',text:'+30 Vé Trốn Thuế & Trốn Nợ'},
      {icon:'🎒',text:'+30 ô Kho Đồ mở rộng'},
    ],
    effects:{ tokens:2888, keys:80, startBonusBillion:1, permanentSpeedInternet:true, fuelF5:10, taxEvadeTickets:30, bonusInvSlots:30 }
  },
  {
    id:'token_arch', name:'Arch Bundle', icon:'⚜️', tier:7,
    priceVND:999999, priceDisplay:'999,999đ', tokens:4888,
    color:'#ffd700', border:'#ff6b00', badgeColor:'linear-gradient(135deg,#dc2626,#7c3aed,#ffd700)', badge:'⚜️ ARCH',
    theme:'linear-gradient(135deg,#0d0000,#1a0a00,#0d0000)',
    desc:'Bundle tối thượng — quyền năng tuyệt đối, chỉ dành cho Arch Nemesis đích thực!',
    perks:[
      {icon:'⚜️',text:'+4,888 Token — Tuyệt Đỉnh'},
      {icon:'🗝️',text:'+200 Key 🗝️ (quay Banner kim loại quý)'},
      {icon:'💰',text:'+3,000,000,000$ (3 Tỷ) tiền khởi đầu'},
      {icon:'🌐',text:'Gói Internet Speed vĩnh viễn'},
      {icon:'⛽',text:'Bình Xăng Loại 5 × 20 (tab Điện)'},
      {icon:'🎫',text:'+50 Vé Trốn Thuế & Trốn Nợ'},
      {icon:'🎒',text:'+50 ô Kho Đồ mở rộng'},
      {icon:'🔓',text:'Unlock tất cả Shop Tier ngay lập tức'},
    ],
    effects:{ tokens:4888, keys:200, startBonusBillion:3, permanentSpeedInternet:true, fuelF5:20, taxEvadeTickets:50, bonusInvSlots:50, unlockAllTiers:true }
  },
];

// One-time purchasable bundles that give permanent advantages.
// Each bundle can only be bought once (tracked in G.boughtBundles[]).
// Prime:      +1 slot, unlock next 2 tiers
// Contraband: +4 slots, unlock next 3 tiers, +20 inventory slots
const VIP_BUNDLES = [
  {
    id: 'prime',
    name: 'Prime Bundle',
    icon: '⭐',
    price: 799,
    color: '#a78bfa',
    theme: '#1e1a3a',
    border: '#7c3aed',
    badge: 'PHỔ BIẾN',
    badgeColor: '#7c3aed',
    perks: [
      { icon: '🔧', text: '+1 Slot máy Base' },
      { icon: '🔓', text: 'Unlock ngay 2 Tier tiếp theo' },
    ],
    desc: 'Gói khởi đầu hoàn hảo cho người mới chơi.',
  },
  {
    id: 'contraband',
    name: 'Contraband Bundle',
    icon: '💀',
    price: 1999,
    color: '#f87171',
    theme: '#2a1a1a',
    border: '#dc2626',
    badge: 'GIÁ TRỊ NHẤT',
    badgeColor: '#dc2626',
    perks: [
      { icon: '🔧', text: '+4 Slot máy Base' },
      { icon: '🔓', text: 'Unlock ngay 3 Tier tiếp theo' },
      { icon: '🎒', text: '+20 ô Kho đồ' },
    ],
    desc: 'Gói siêu giá trị, bứt phá nhanh chóng.',
  },
];

// ═══ FACTORY BUNDLES (mua bằng Token 🔮) ═════════════════════════════
const FACTORY_BUNDLES = [
  {
    id: 'factory_plus',
    name: 'Factory Plus',
    icon: '🏭',
    tokenPrice: 599,
    color: '#38bdf8',
    theme: 'linear-gradient(135deg,#020f1c,#0a1a2e)',
    border: '#0ea5e9',
    badge: 'FACTORY',
    badgeColor: '#0369a1',
    perks: [
      { icon: '💵', text: 'x2 thu nhập từ máy' },
      { icon: '🛒', text: 'Tỉ lệ mua thành công chợ x2' },
      { icon: '🔮', text: '+5% bonus token khi mua bundle Token' },
      { icon: '✨', text: 'Name tag hiệu ứng Sunny ở Profile & Rank' },
    ],
    desc: 'Nâng cấp nhà máy vượt trội — thu nhập gấp đôi, chợ có lợi hơn!',
  },
  {
    id: 'factory_premium',
    name: 'Factory Premium',
    icon: '⚡',
    tokenPrice: 999,
    color: '#f0abfc',
    theme: 'linear-gradient(135deg,#0d0118,#1a0a2e)',
    border: '#a855f7',
    badge: 'PREMIUM',
    badgeColor: '#7e22ce',
    perks: [
      { icon: '💵', text: 'x2 thu nhập từ máy' },
      { icon: '🛒', text: 'Tỉ lệ mua thành công chợ x2' },
      { icon: '🔮', text: '+10% bonus token khi mua bundle Token' },
      { icon: '⚡', text: 'Name tag hiệu ứng Glitchy ở Profile & Rank' },
    ],
    desc: 'Trải nghiệm premium tối thượng — name tag glitchy độc quyền!',
  },
];

function renderVipShop() {
  var container = document.getElementById('vip-bundles');
  container.innerHTML = '';

  // Token balance header
  var tokenHeader = document.createElement('div');
  tokenHeader.style.cssText = 'background:linear-gradient(135deg,#001520,#002030);border:1px solid #00f5ff44;border-radius:12px;padding:14px 18px;margin-bottom:18px;display:flex;align-items:center;justify-content:space-between';
  tokenHeader.innerHTML = '<div style="display:flex;align-items:center;gap:10px"><span style="font-size:24px">🔮</span><div><div style="font-size:13px;color:#00f5ff;font-weight:700;letter-spacing:1px">TOKEN CỦA BẠN</div><div style="font-size:11px;color:#64748b">Đồng tiền hiếm nhất game</div></div></div>'
    + '<div style="text-align:right"><div style="font-size:24px;font-weight:900;color:#00f5ff">' + (G.wallet.token||0).toLocaleString() + ' 🔮</div>'
    + '<div style="font-size:13px;font-weight:700;color:#4ade80;margin-top:2px">' + fmt(G.money) + '</div></div>';
  container.appendChild(tokenHeader);

  // Section title
  var sec = document.createElement('div');
  sec.style.cssText = 'text-align:center;margin-bottom:16px';
  sec.innerHTML = '<div style="font-size:15px;font-weight:700;color:#ffd700;letter-spacing:2px">⭐ TOKEN BUNDLES ⭐</div>'
    + '<div style="font-size:11px;color:#6b7280;margin-top:4px">Mua token bằng VNĐ — Một lần mua, hưởng mãi mãi</div>';
  container.appendChild(sec);

  // Separate small bundles (tier 1-3) from large bundles (tier 4-5) and ultra bundles (tier 6+)
  var smallBundles = TOKEN_BUNDLES.filter(function(b){ return b.tier <= 3; });
  var largeBundles = TOKEN_BUNDLES.filter(function(b){ return b.tier >= 4 && b.tier <= 5; });
  var ultraBundles = TOKEN_BUNDLES.filter(function(b){ return b.tier >= 6; });

  function buildTokenBundleCard(bundle, isSmall) {
    var bought = (G.boughtTokenBundles||[]).includes(bundle.id);
    var tier = bundle.tier;
    var div = document.createElement('div');

    var glowStyle = '';
    var extraStyle = '';
    var particleHTML = '';

    if (tier >= 7) {
      // ARCH tier — ultra rainbow gold
      particleHTML = '<div style="position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none;overflow:hidden;z-index:0">';
      for (var ai=0;ai<22;ai++) {
        var ac=['#ffd700','#ff6b00','#dc2626','#a855f7','#ff4400'];
        var acol=ac[ai%ac.length];
        particleHTML += '<span style="position:absolute;width:'+(3+Math.random()*9).toFixed(0)+'px;height:'+(3+Math.random()*9).toFixed(0)+'px;border-radius:50%;background:radial-gradient(circle,'+acol+',transparent);left:'+Math.round(Math.random()*100)+'%;top:'+Math.round(Math.random()*100)+'%;animation:tb-particle-float '+(1.5+Math.random()*2.5).toFixed(1)+'s '+(Math.random()*2).toFixed(1)+'s ease-in infinite;opacity:0.9"></span>';
      }
      particleHTML += '</div>'
        + '<div style="position:absolute;top:-30px;right:-30px;width:110px;height:110px;border:2px dashed rgba(255,200,0,0.5);border-radius:50%;animation:tb-sparkle-ring-spin 3s linear infinite;pointer-events:none;z-index:0"></div>'
        + '<div style="position:absolute;bottom:-20px;left:-20px;width:70px;height:70px;border:1.5px dashed rgba(220,38,38,0.4);border-radius:50%;animation:tb-sparkle-ring-spin 5s linear infinite reverse;pointer-events:none;z-index:0"></div>';
      glowStyle = 'box-shadow:0 0 40px #ffd70066,0 0 80px #ff6b0044,0 0 120px #dc262622,inset 0 0 40px rgba(255,215,0,0.08);';
      extraStyle = 'animation:tb-arch-pulse 1.8s ease-in-out infinite;';
    } else if (tier >= 6) {
      // SUPER MEGA tier — cyan/teal glow
      particleHTML = '<div style="position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none;overflow:hidden;z-index:0">';
      for (var si=0;si<18;si++) {
        var sc=['#00ffe7','#00c8ff','#0080ff','#00f5ff'];
        var scol=sc[si%sc.length];
        particleHTML += '<span style="position:absolute;width:'+(3+Math.random()*8).toFixed(0)+'px;height:'+(3+Math.random()*8).toFixed(0)+'px;border-radius:50%;background:radial-gradient(circle,'+scol+',transparent);left:'+Math.round(Math.random()*100)+'%;top:'+Math.round(Math.random()*100)+'%;animation:tb-particle-float '+(1.8+Math.random()*2.5).toFixed(1)+'s '+(Math.random()*2).toFixed(1)+'s ease-in infinite;opacity:0.85"></span>';
      }
      particleHTML += '</div>'
        + '<div style="position:absolute;top:-25px;right:-25px;width:95px;height:95px;border:2px dashed rgba(0,255,231,0.45);border-radius:50%;animation:tb-sparkle-ring-spin 3.5s linear infinite;pointer-events:none;z-index:0"></div>';
      glowStyle = 'box-shadow:0 0 35px #00ffe766,0 0 70px #00c8ff44,0 0 110px #0080ff22,inset 0 0 35px rgba(0,255,231,0.07);';
      extraStyle = 'animation:tb-smk-pulse 2s ease-in-out infinite;';
    } else if (tier >= 5) {
      var stars = '';
      for (var i=0;i<16;i++) {
        stars += '<span style="position:absolute;width:' + (4+Math.random()*6) + 'px;height:' + (4+Math.random()*6) + 'px;border-radius:50%;background:radial-gradient(circle,#ffd700,#ff8800);left:' + Math.round(Math.random()*100) + '%;bottom:' + Math.round(Math.random()*100) + '%;animation:tb-particle-float ' + (2+Math.random()*2).toFixed(1) + 's ' + (Math.random()*2).toFixed(1) + 's ease-in infinite;opacity:0.85"></span>';
      }
      particleHTML = '<div style="position:absolute;top:0; right:0; bottom:0; left:0;pointer-events:none;overflow:hidden;z-index:0">' + stars + '</div>'
        + '<div style="position:absolute;top:-20px;right:-20px;width:80px;height:80px;border:2px dashed rgba(255,215,0,0.4);border-radius:50%;animation:tb-sparkle-ring-spin 4s linear infinite;pointer-events:none"></div>';
      glowStyle = 'box-shadow:0 0 30px #ffd70055,0 0 60px #ffd70033,inset 0 0 30px rgba(255,215,0,0.05);';
      extraStyle = 'animation:tb-legendary-pulse 2s ease-in-out infinite;';
    } else if (tier === 4) {
      particleHTML = '<div style="position:absolute;bottom:0;left:0;right:0;height:3px;background:linear-gradient(90deg,transparent,#ef4444,#ff6b00,#ef4444,transparent);pointer-events:none"></div>';
      glowStyle = 'box-shadow:0 0 20px #ef444455,0 0 40px #ef444422;';
      extraStyle = 'animation:tb-super-shake 4s ease-in-out infinite;';
    } else if (tier === 3) {
      glowStyle = 'box-shadow:0 0 15px #f59e0b44,0 0 30px #f59e0b22;';
    } else if (tier === 2) {
      glowStyle = 'box-shadow:0 0 10px #6366f133;';
    }

    var baseRadius = isSmall ? '14px' : '16px';
    var basePad    = isSmall ? '14px' : '20px';
    div.style.cssText = 'background:' + bundle.theme + ';border:2px solid ' + bundle.border + '99;border-radius:' + baseRadius + ';padding:' + basePad + ';position:relative;overflow:hidden;' + glowStyle + extraStyle + (isSmall ? 'display:flex;flex-direction:column;' : '');

    var badgeAnim = tier >= 5 ? 'animation:tb-badge-flash 1.5s ease-in-out infinite;' : '';
    var iconSize  = isSmall ? '36' : (tier >= 6 ? '58' : tier >= 4 ? '50' : '42');
    var iconExtra = tier >= 7 ? ('animation:tb-arch-icon 2s ease-in-out infinite;filter:drop-shadow(0 0 16px #ffd700) drop-shadow(0 0 30px #ff6b00);')
                  : tier >= 6 ? ('animation:tb-smk-icon 2.5s ease-in-out infinite;filter:drop-shadow(0 0 14px #00ffe7) drop-shadow(0 0 28px #00c8ff);')
                  : tier >= 5 ? ('animation:tb-icon-spin 3s linear infinite;filter:drop-shadow(0 0 10px ' + bundle.color + ');')
                  : (tier >= 4 ? 'filter:drop-shadow(0 0 8px ' + bundle.color + ');' : '');
    var nameSize  = isSmall ? '14' : (tier >= 6 ? '22' : tier >= 4 ? '20' : '17');
    var nameExtra = tier >= 7 ? ('animation:tb-arch-name 2s ease-in-out infinite;')
                  : tier >= 6 ? ('animation:tb-smk-name 2.5s ease-in-out infinite;')
                  : tier >= 5 ? ('text-shadow:0 0 10px ' + bundle.color + ';') : '';
    var priceExtra= tier >= 4 ? ('text-shadow:0 0 8px ' + bundle.color + ';') : '';
    var bonusTag  = bundle.id === 'token_super' ? '<span style="font-size:10px;color:#fcd34d;background:#78350f44;padding:2px 6px;border-radius:10px;margin-left:4px">+50 bonus!</span>' : '';
    var btnCursor = bought ? 'not-allowed' : 'pointer';
    var btnBg     = bought ? '#1f2937' : 'transparent';
    var btnColor  = bought ? '#4b5563' : bundle.color;
    var btnOpacity= bought ? 'opacity:0.5;' : '';
    var btnAnim   = (!bought && tier >= 7)
      ? ('animation:tb-arch-btn 1.5s ease-in-out infinite;box-shadow:0 0 20px #ffd70088,0 0 40px #ff6b0055;')
      : (!bought && tier >= 6)
      ? ('animation:tb-smk-btn 2s ease-in-out infinite;box-shadow:0 0 18px #00ffe788,0 0 36px #00c8ff55;')
      : (!bought && tier >= 5)
      ? ('animation:tb-btn-glow 1.5s ease-in-out infinite;box-shadow:0 0 15px ' + bundle.color + '66;')
      : (!bought && tier === 4 ? 'animation:tb-btn-pulse 2s ease-in-out infinite;' : '');
    var btnLabel  = bought ? '✅ Đã Mua' : '💳 Mua';
    var btnPad    = isSmall ? '8px 12px' : '11px 24px';
    var btnFontSize = isSmall ? '12px' : '14px';

    var perksHTML = '';
    bundle.perks.forEach(function(p) {
      perksHTML += '<div style="display:flex;align-items:center;gap:6px;padding:5px 0;border-bottom:1px solid ' + bundle.border + '33">'
        + '<span style="font-size:' + (isSmall?'14':'17') + 'px">' + p.icon + '</span>'
        + '<span style="font-size:' + (isSmall?'11':'13') + 'px;color:#e2e8f0">' + p.text + '</span></div>';
    });

    var badgeFontSize = isSmall ? '9px' : '10px';
    var badgePad = isSmall ? '3px 8px' : '4px 12px';
    var tokenFontSize = isSmall ? '16px' : '20px';
    var priceFontSize = isSmall ? '18px' : '24px';

    if (isSmall) {
      div.innerHTML = particleHTML
        + '<div style="position:absolute;top:8px;right:8px;background:' + bundle.badgeColor + ';color:#fff;font-size:' + badgeFontSize + ';font-weight:700;padding:' + badgePad + ';border-radius:20px;letter-spacing:1px;z-index:2;' + badgeAnim + '">' + bundle.badge + '</div>'
        + '<div style="display:flex;flex-direction:column;align-items:center;text-align:center;gap:8px;margin-bottom:10px;position:relative;z-index:2">'
          + '<div style="font-size:' + iconSize + 'px;' + iconExtra + '">' + bundle.icon + '</div>'
          + '<div><div style="font-size:' + nameSize + 'px;font-weight:800;color:' + bundle.color + ';' + nameExtra + '">' + bundle.name + '</div>'
          + '<div style="font-size:10px;color:#9ca3af;margin-top:2px">' + bundle.desc + '</div>'
          + '<div style="margin-top:4px;display:flex;align-items:center;justify-content:center;gap:4px">'
            + '<span style="font-size:' + tokenFontSize + 'px;font-weight:900;color:#00f5ff">+' + bundle.tokens + '</span>'
            + '<span style="font-size:12px">🔮</span>' + bonusTag
          + '</div></div></div>'
        + '<div style="margin-bottom:10px;position:relative;z-index:2;flex:1">' + perksHTML + '</div>'
        + '<div style="display:flex;flex-direction:column;align-items:center;gap:6px;position:relative;z-index:2;margin-top:auto">'
          + '<div style="font-size:' + priceFontSize + 'px;font-weight:900;color:' + bundle.color + ';' + priceExtra + '">' + bundle.priceDisplay + '</div>'
          + '<div style="font-size:10px;color:#6b7280">Thanh toán bằng VNĐ</div>'
          + '<button onclick="buyTokenBundle(\'' + bundle.id + '\')" ' + (bought?'disabled':'')
            + ' style="width:100%;padding:' + btnPad + ';font-size:' + btnFontSize + ';font-weight:700;border-radius:10px;cursor:' + btnCursor + ';border:2px solid ' + bundle.border + ';background:' + btnBg + ';color:' + btnColor + ';' + btnOpacity + btnAnim + 'letter-spacing:0.5px">'
            + btnLabel + '</button>'
        + '</div>';
    } else {
      div.innerHTML = particleHTML
        + '<div style="position:absolute;top:12px;right:12px;background:' + bundle.badgeColor + ';color:#fff;font-size:' + badgeFontSize + ';font-weight:700;padding:' + badgePad + ';border-radius:20px;letter-spacing:1px;z-index:2;' + badgeAnim + '">' + bundle.badge + '</div>'
        + '<div style="display:flex;align-items:center;gap:14px;margin-bottom:14px;position:relative;z-index:2">'
          + '<div style="font-size:' + iconSize + 'px;' + iconExtra + '">' + bundle.icon + '</div>'
          + '<div><div style="font-size:' + nameSize + 'px;font-weight:800;color:' + bundle.color + ';' + nameExtra + '">' + bundle.name + '</div>'
          + '<div style="font-size:12px;color:#9ca3af;margin-top:3px">' + bundle.desc + '</div>'
          + '<div style="margin-top:6px;display:flex;align-items:center;gap:6px">'
            + '<span style="font-size:' + tokenFontSize + 'px;font-weight:900;color:#00f5ff">+' + bundle.tokens + '</span>'
            + '<span style="font-size:14px">🔮</span>' + bonusTag
          + '</div></div></div>'
        + '<div style="margin-bottom:14px;position:relative;z-index:2">' + perksHTML + '</div>'
        + '<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;position:relative;z-index:2">'
          + '<div><div style="font-size:' + priceFontSize + 'px;font-weight:900;color:' + bundle.color + ';' + priceExtra + '">' + bundle.priceDisplay + '</div>'
          + '<div style="font-size:11px;color:#6b7280">Thanh toán bằng VNĐ</div></div>'
          + '<button onclick="buyTokenBundle(\'' + bundle.id + '\')" ' + (bought?'disabled':'')
            + ' style="padding:' + btnPad + ';font-size:' + btnFontSize + ';font-weight:700;border-radius:10px;cursor:' + btnCursor + ';border:2px solid ' + bundle.border + ';background:' + btnBg + ';color:' + btnColor + ';' + btnOpacity + btnAnim + 'letter-spacing:0.5px">'
            + btnLabel + '</button>'
        + '</div>';
    }
    return div;
  }

  // Small bundles — square grid (2 columns)
  var smallGrid = document.createElement('div');
  smallGrid.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px';
  smallBundles.forEach(function(bundle) {
    smallGrid.appendChild(buildTokenBundleCard(bundle, true));
  });
  container.appendChild(smallGrid);

  // Large bundles — two rectangles side by side (opposing)
  var largeSep = document.createElement('div');
  largeSep.style.cssText = 'text-align:center;margin:8px 0 14px';
  largeSep.innerHTML = '<div style="font-size:12px;color:#4b5563;letter-spacing:1px">— PREMIUM BUNDLES —</div>';
  container.appendChild(largeSep);

  var largeRow = document.createElement('div');
  largeRow.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:16px';
  largeBundles.forEach(function(bundle) {
    largeRow.appendChild(buildTokenBundleCard(bundle, false));
  });
  container.appendChild(largeRow);

  // Ultra bundles — Super Mega & Arch (each full width, ultra animated)
  if (ultraBundles.length > 0) {
    var ultraSep = document.createElement('div');
    ultraSep.style.cssText = 'text-align:center;margin:18px 0 16px;position:relative';
    ultraSep.innerHTML =
      '<div style="position:absolute;left:0;right:0;top:50%;height:1px;background:linear-gradient(90deg,transparent,#00ffe744,#ffd70044,transparent)"></div>'
      + '<span style="position:relative;background:#060912;padding:0 16px;font-size:13px;font-weight:800;letter-spacing:3px;background:linear-gradient(135deg,#00ffe7,#00c8ff,#ffd700,#ff6b00);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">✦ ULTRA BUNDLES ✦</span>';
    container.appendChild(ultraSep);
    ultraBundles.forEach(function(bundle) {
      container.appendChild(buildTokenBundleCard(bundle, false));
    });
  }

  // ── VIP Bundles (mua bằng tiền game) ──
  var vipTitle = document.createElement('div');
  vipTitle.style.cssText = 'text-align:center;margin:24px 0 14px';
  vipTitle.innerHTML = '<div style="font-size:14px;font-weight:700;color:#a78bfa;letter-spacing:2px">💎 VIP BUNDLES TRONG GAME</div>'
    + '<div style="font-size:11px;color:#6b7280;margin-top:4px">Mua bằng tiền trong game (M$)</div>';
  container.appendChild(vipTitle);

  VIP_BUNDLES.forEach(function(bundle) {
    var canBuy = G.money >= bundle.price;
    var bought = (G.boughtBundles||[]).includes(bundle.id);
    var div = document.createElement('div');
    div.style.cssText = 'background:' + bundle.theme + ';border:1px solid ' + bundle.border + '66;border-radius:13px;padding:20px;margin-bottom:14px;position:relative;overflow:hidden';
    var needMore = (!canBuy && !bought) ? '<div style="font-size:12px;color:#4b5563">Cần thêm ' + fmt(bundle.price - G.money) + '</div>' : '';
    var btnStyle = 'padding:10px 28px;font-size:15px;font-weight:600;border-radius:8px;cursor:pointer;border:1px solid ' + bundle.border + ';'
      + 'background:' + (bought ? '#1f2937' : canBuy ? bundle.theme : '#111827') + ';'
      + 'color:' + (bought ? '#4b5563' : canBuy ? bundle.color : '#374151') + ';'
      + ((!canBuy || bought) ? 'opacity:0.5;cursor:not-allowed' : '');
    var perksHTML = '';
    bundle.perks.forEach(function(p) {
      perksHTML += '<div style="display:flex;align-items:center;gap:8px;padding:7px 0;border-bottom:1px solid ' + bundle.border + '22">'
        + '<span style="font-size:18px">' + p.icon + '</span>'
        + '<span style="font-size:14px;color:#e2e8f0">' + p.text + '</span></div>';
    });
    div.innerHTML = '<div style="position:absolute;top:12px;right:12px;background:' + bundle.badgeColor + ';color:#fff;font-size:10px;font-weight:700;padding:3px 10px;border-radius:20px;letter-spacing:0.5px">' + bundle.badge + '</div>'
      + '<div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">'
        + '<div style="font-size:40px">' + bundle.icon + '</div>'
        + '<div><div style="font-size:18px;font-weight:700;color:' + bundle.color + '">' + bundle.name + '</div>'
        + '<div style="font-size:13px;color:#6b7280;margin-top:2px">' + bundle.desc + '</div></div></div>'
      + '<div style="margin-bottom:14px">' + perksHTML + '</div>'
      + '<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">'
        + '<div><div style="font-size:22px;font-weight:700;color:' + bundle.color + '">$' + bundle.price.toLocaleString() + '</div>' + needMore + '</div>'
        + '<button onclick="buyVipBundle(\'' + bundle.id + '\')" ' + ((bought||!canBuy)?'disabled':'')
          + ' style="' + btnStyle + '">' + (bought?'✅ Đã mua':canBuy?'🛒 Mua Ngay':'Chưa đủ tiền') + '</button>'
      + '</div>';
    container.appendChild(div);
  });

  // ── Factory Bundles (mua bằng Token) ──
  var factoryTitle = document.createElement('div');
  factoryTitle.style.cssText = 'text-align:center;margin:24px 0 14px';
  factoryTitle.innerHTML = '<div style="font-size:15px;font-weight:700;color:#38bdf8;letter-spacing:2px">🏭 FACTORY BUNDLES</div>'
    + '<div style="font-size:11px;color:#6b7280;margin-top:4px">Mua bằng Token 🔮 · Đặc quyền vĩnh viễn</div>';
  container.appendChild(factoryTitle);

  FACTORY_BUNDLES.forEach(function(bundle) {
    var curTok = G.wallet.token || 0;
    var canBuy = curTok >= bundle.tokenPrice;
    var bought = (G.boughtBundles||[]).includes(bundle.id);
    var div = document.createElement('div');
    // Glow effect for factory bundles
    var glowColor = bundle.id === 'factory_premium' ? '#a855f755' : '#0ea5e955';
    div.style.cssText = 'background:' + bundle.theme + ';border:2px solid ' + bundle.border + '88;border-radius:14px;padding:20px;margin-bottom:14px;position:relative;overflow:hidden;'
      + 'box-shadow:0 0 24px ' + glowColor + ';';
    if (bundle.id === 'factory_premium') {
      div.style.cssText += 'animation:factoryPremiumPulse 3s ease-in-out infinite;';
    }
    var perksHTML = '';
    bundle.perks.forEach(function(p) {
      perksHTML += '<div style="display:flex;align-items:center;gap:8px;padding:7px 0;border-bottom:1px solid ' + bundle.border + '22">'
        + '<span style="font-size:18px">' + p.icon + '</span>'
        + '<span style="font-size:14px;color:#e2e8f0">' + p.text + '</span></div>';
    });
    var needMore = (!canBuy && !bought) ? '<div style="font-size:12px;color:#4b5563">Cần thêm ' + (bundle.tokenPrice - curTok) + ' 🔮</div>' : '';
    var btnLabel = bought ? '✅ Đã mua' : canBuy ? '🔮 Mua bằng Token' : 'Không đủ Token';
    var btnStyle = 'padding:10px 24px;font-size:14px;font-weight:700;border-radius:9px;cursor:pointer;'
      + 'border:2px solid ' + bundle.border + ';'
      + 'background:' + (bought ? '#1f2937' : canBuy ? 'transparent' : '#111827') + ';'
      + 'color:' + (bought ? '#4b5563' : canBuy ? bundle.color : '#374151') + ';'
      + (bought || !canBuy ? 'opacity:0.5;cursor:not-allowed;' : 'box-shadow:0 0 12px ' + bundle.border + '66;');
    div.innerHTML = '<div style="position:absolute;top:12px;right:12px;background:' + bundle.badgeColor + ';color:#fff;font-size:10px;font-weight:700;padding:3px 10px;border-radius:20px;letter-spacing:0.5px">' + bundle.badge + '</div>'
      + '<div style="display:flex;align-items:center;gap:14px;margin-bottom:14px">'
        + '<div style="font-size:40px">' + bundle.icon + '</div>'
        + '<div><div style="font-size:19px;font-weight:800;color:' + bundle.color + '">' + bundle.name + '</div>'
        + '<div style="font-size:12px;color:#9ca3af;margin-top:2px">' + bundle.desc + '</div></div></div>'
      + '<div style="margin-bottom:14px">' + perksHTML + '</div>'
      + '<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">'
        + '<div>'
          + '<div style="display:flex;align-items:center;gap:6px">'
            + '<span style="font-size:26px;font-weight:900;color:' + bundle.color + '">' + bundle.tokenPrice.toLocaleString() + '</span>'
            + '<span style="font-size:20px">🔮</span>'
          + '</div>'
          + needMore
        + '</div>'
        + '<button onclick="buyFactoryBundle(\'' + bundle.id + '\')" ' + (bought || !canBuy ? 'disabled' : '') + ' style="' + btnStyle + '">' + btnLabel + '</button>'
      + '</div>';
    container.appendChild(div);
  });

  // Token Exchange Section
  var exchTitle = document.createElement('div');
  exchTitle.style.cssText = 'text-align:center;margin:24px 0 14px';
  exchTitle.innerHTML = '<div style="font-size:14px;font-weight:700;color:#ffd700;letter-spacing:2px">🎫 ĐỔI TOKEN → VÉ TRỐN NỢ</div>'
    + '<div style="font-size:11px;color:#6b7280;margin-top:4px">1 Token = 1 Vé Trốn Nợ · Dùng để xóa nợ trong Ngân Hàng</div>';
  container.appendChild(exchTitle);
  var curTokens2 = G.wallet.token || 0;
  var curTickets2 = G.debtEvadeTickets || 0;
  var exchBox = document.createElement('div');
  exchBox.style.cssText = 'background:linear-gradient(135deg,#1a1500,#2a1f00);border:1px solid #b4530966;border-radius:13px;padding:18px;margin-bottom:14px';
  exchBox.innerHTML = '<div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">'
    + '<div style="font-size:32px">🔮</div>'
    + '<div><div style="font-size:15px;font-weight:700;color:#ffd700">Đổi Token lấy Vé Trốn Nợ</div>'
    + '<div style="font-size:12px;color:#6b7280;margin-top:2px">Token hiện tại: <span style="color:#00f5ff;font-weight:700">' + curTokens2 + ' 🔮</span>  \u00b7  Vé hiện có: <span style="color:#ffd700;font-weight:700">' + curTickets2 + ' 🎫</span></div></div></div>'
    + '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">'
    + '<span style="font-size:13px;color:#9ca3af">Số lượng:</span>'
    + '<input id="token-exchange-qty" type="number" min="1" max="' + curTokens2 + '" value="1" style="flex:1;background:#0d1117;border:1.5px solid #b4530966;border-radius:8px;padding:8px 12px;color:#e2e8f0;font-size:14px;outline:none"/>'
    + '<span style="font-size:13px;color:#6b7280">/ ' + curTokens2 + ' token</span></div>'
    + '<div style="display:flex;gap:6px;margin-bottom:10px;flex-wrap:wrap">'
    + '<button onclick="setTokenExchQty(1)" style="padding:4px 10px;background:#111827;border:1px solid #374151;color:#9ca3af;border-radius:5px;cursor:pointer;font-size:11px">1</button>'
    + '<button onclick="setTokenExchQty(5)" style="padding:4px 10px;background:#111827;border:1px solid #374151;color:#9ca3af;border-radius:5px;cursor:pointer;font-size:11px">5</button>'
    + '<button onclick="setTokenExchQty(10)" style="padding:4px 10px;background:#111827;border:1px solid #374151;color:#9ca3af;border-radius:5px;cursor:pointer;font-size:11px">10</button>'
    + '<button onclick="setTokenExchQty(50)" style="padding:4px 10px;background:#111827;border:1px solid #374151;color:#9ca3af;border-radius:5px;cursor:pointer;font-size:11px">50</button>'
    + '<button onclick="setTokenExchQtyMax()" style="padding:4px 10px;background:#111827;border:1px solid #ffd70044;color:#ffd700;border-radius:5px;cursor:pointer;font-size:11px">MAX</button>'
    + '</div>'
    + '<button onclick="exchangeTokenToTicket()" style="width:100%;padding:11px;background:linear-gradient(135deg,#1a1500,#2a1f00);color:#ffd700;border:2px solid #b45309;border-radius:10px;cursor:pointer;font-size:14px;font-weight:700">🎫 \u0110\u1ed5i Ngay (1 Token = 1 Vé Trốn Nợ)</button>';
  container.appendChild(exchBox);
}

function setTokenExchQty(n) {
  var inp = document.getElementById('token-exchange-qty');
  if (inp) inp.value = Math.max(1, Math.min(G.wallet.token||0, n));
}
function setTokenExchQtyMax() {
  var inp = document.getElementById('token-exchange-qty');
  if (inp) inp.value = G.wallet.token || 0;
}
function exchangeTokenToTicket() {
  var inp = document.getElementById('token-exchange-qty');
  var qty = parseInt(inp ? inp.value : 1) || 1;
  qty = Math.max(1, qty);
  if (qty > (G.wallet.token||0)) { showError('Không đủ Token!'); return; }
  G.wallet.token -= qty;
  G.debtEvadeTickets = (G.debtEvadeTickets||0) + qty;
  G.taxEvadeTickets = (G.taxEvadeTickets||0) + qty;
  for (var t2 = 0; t2 < qty; t2++) {
    if (G.inventory.length < G.invMaxSlots) {
      G.inventory.push({ id:'evade_ticket_exc_'+Date.now()+'_'+t2, itemId:'evade_ticket', name:'Vé Trốn Nợ', icon:'🎫', tier:'special', boughtPrice:0, recyclePoints:0, obtainedAt:Date.now(), isTicket:true });
    }
  }
  updateUI(); saveGame(false); renderVipShop();
  showNotif('🎫 Đổi thành công! +' + qty + ' Vé Trốn Nợ');
}

function buyFactoryBundle(id) {
  const bundle = FACTORY_BUNDLES.find(b => b.id === id);
  if (!bundle) return;
  if (!G.boughtBundles) G.boughtBundles = [];
  if (G.boughtBundles.includes(id)) { showError('⚠️ Đã mua bundle này rồi!'); return; }
  if ((G.wallet.token||0) < bundle.tokenPrice) { showError('🔮 Không đủ Token! Cần ' + bundle.tokenPrice + ' 🔮'); return; }

  G.wallet.token -= bundle.tokenPrice;

  if (id === 'factory_plus') {
    G.factoryPlus = true;
    showNotif('🏭 Factory Plus đã kích hoạt! x2 thu nhập, x2 tỉ lệ chợ, +5% token bonus, name tag Sunny!');
  }
  if (id === 'factory_premium') {
    G.factoryPremium = true;
    showNotif('⚡ Factory Premium đã kích hoạt! x2 thu nhập, x2 tỉ lệ chợ, +10% token bonus, name tag Glitchy!');
  }

  G.boughtBundles.push(id);
  updateUI(); saveGame(false);
  renderVipShop();
}

function buyVipBundle(id) {
  const bundle = VIP_BUNDLES.find(b=>b.id===id);
  if (!bundle) return;
  if (!G.boughtBundles) G.boughtBundles = [];
  if (G.boughtBundles.includes(id)) { showError('⚠️ Đã mua bundle này rồi!'); return; }
  if (!taxCheckBanBeforeBuy()) return;
  if (G.money < bundle.price) { showError('💸 Không đủ tiền!'); return; }

  G.money -= bundle.price;
  taxIssueBill('👑 ' + bundle.name, bundle.price);

  if (id === 'prime') {
    // +1 base slot
    G.ownedSlots += 1;
    while (G.slots.length < G.ownedSlots) G.slots.push(null);
    // unlock next 2 tiers
    const maxUnlocked = G.unlockedTiers.length ? Math.max(...G.unlockedTiers) : 0;
    for (let t = maxUnlocked+1; t <= maxUnlocked+2 && t <= 10; t++) {
      if (!G.unlockedTiers.includes(t)) G.unlockedTiers.push(t);
    }
    showNotif('⭐ Prime Bundle! +1 slot, 2 tiers mở!');
  }

  if (id === 'contraband') {
    // +4 base slots
    G.ownedSlots += 4;
    while (G.slots.length < G.ownedSlots) G.slots.push(null);
    // unlock next 3 tiers
    const maxUnlocked = G.unlockedTiers.length ? Math.max(...G.unlockedTiers) : 0;
    for (let t = maxUnlocked+1; t <= maxUnlocked+3 && t <= 10; t++) {
      if (!G.unlockedTiers.includes(t)) G.unlockedTiers.push(t);
    }
    // +20 inventory slots
    G.invMaxSlots += 20;
    showNotif('💀 Contraband Bundle! +4 slots, 3 tiers, +20 kho!');
  }

  G.boughtBundles.push(id);
  updateUI(); saveGame(false);
  renderVipShop();
  renderSlots(); renderShopTabs();
}

function buyTokenBundle(id) {
  if (!G.boughtTokenBundles) G.boughtTokenBundles = [];
  if (G.boughtTokenBundles.indexOf(id) !== -1) { showError('⚠️ Đã mua bundle này rồi!'); return; }
  var bundle = TOKEN_BUNDLES.find(function(b){ return b.id === id; });
  if (!bundle) return;
  // Show popup for code input
  showTokenBundlePopup(id, bundle);
}

function showTokenBundlePopup(id, bundle) {
  // Remove existing popup if any
  var existing = document.getElementById('token-bundle-popup');
  if (existing) existing.remove();

  // Special ultra-premium popup for tier 6 & 7 bundles
  if (bundle.tier >= 6) {
    showUltraBundlePopup(id, bundle);
    return;
  }

  var overlay = document.createElement('div');
  overlay.id = 'token-bundle-popup';
  overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.85);z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px';

  overlay.innerHTML =
    '<div style="background:linear-gradient(135deg,#0d1117,#111827);border:2px solid ' + bundle.border + '66;border-radius:18px;padding:28px 22px;width:100%;max-width:360px;position:relative;box-shadow:0 0 40px ' + bundle.border + '44">'
    + '<button onclick="document.getElementById(\'token-bundle-popup\').remove()" style="position:absolute;top:12px;right:14px;background:#1f2937;border:1px solid #374151;color:#9ca3af;border-radius:8px;padding:4px 10px;cursor:pointer;font-size:15px;font-weight:700;line-height:1">✕</button>'
    + '<div style="text-align:center;margin-bottom:18px">'
      + '<div style="font-size:44px;margin-bottom:6px">' + bundle.icon + '</div>'
      + '<div style="font-size:17px;font-weight:800;color:' + bundle.color + ';margin-bottom:4px">' + bundle.name + '</div>'
      + '<div style="font-size:13px;color:#6b7280">' + bundle.priceDisplay + ' · +' + bundle.tokens.toLocaleString() + ' 🔮</div>'
    + '</div>'
    + '<div style="font-size:13px;color:#4ade80;font-weight:700;margin-bottom:12px;text-align:center">💳 Chọn phương thức thanh toán · Mua được nhiều lần</div>'
    + '<div onclick="document.getElementById(\'token-bundle-popup\').remove();showMarketCodePopup(\'' + id + '\')" '
    + 'style="background:linear-gradient(135deg,#0a1220,#111f3a);border:1.5px solid #3b82f655;border-radius:14px;padding:14px;margin-bottom:10px;cursor:pointer;display:flex;align-items:center;gap:12px" '
    + 'onmouseover="this.style.borderColor=\'#60a5fa88\'" onmouseout="this.style.borderColor=\'#3b82f655\'">'
    +   '<div style="font-size:28px;flex-shrink:0">🔑</div>'
    +   '<div>'
    +     '<div style="font-size:14px;font-weight:700;color:#60a5fa">Nhập Mã Kích Hoạt</div>'
    +     '<div style="font-size:11px;color:#6b7280;margin-top:2px">Mã dạng <span style="color:#93c5fd;font-family:monospace">XX-XX-XX-XX</span></div>'
    +     '<div style="font-size:11px;color:#374151;margin-top:2px">Mua mã: <span style="color:#60a5fa">tranthikimai4@gmail.com</span></div>'
    +   '</div>'
    + '</div>'
    + '<div onclick="document.getElementById(\'token-bundle-popup\').remove();showMarketBankPopup(\'' + id + '\')" '
    + 'style="background:linear-gradient(135deg,#120a20,#1e1235);border:1.5px solid #7c3aed55;border-radius:14px;padding:14px;cursor:pointer;display:flex;align-items:center;gap:12px" '
    + 'onmouseover="this.style.borderColor=\'#a78bfa88\'" onmouseout="this.style.borderColor=\'#7c3aed55\'">'
    +   '<div style="font-size:28px;flex-shrink:0">🏦</div>'
    +   '<div>'
    +     '<div style="font-size:14px;font-weight:700;color:#a78bfa">Chuyển Khoản Ngân Hàng</div>'
    +     '<div style="font-size:11px;color:#6b7280;margin-top:2px">Vietcombank · TK: <span style="color:#c4b5fd;font-family:monospace;font-weight:700">0905393373</span></div>'
    +     '<div style="font-size:11px;color:#374151;margin-top:2px">Liên hệ email sau khi chuyển khoản</div>'
    +   '</div>'
    + '</div>'
    + '</div>';

  document.body.appendChild(overlay);
}

function showUltraBundlePopup(id, bundle) {
  var isArch = (bundle.tier >= 7);
  var overlay = document.createElement('div');
  overlay.id = 'token-bundle-popup';
  overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px;overflow:hidden;';

  // Aura background for popup
  var bgClass = isArch ? 'ultra-popup-bg-arch' : 'ultra-popup-bg-smk';
  var boxClass = isArch ? 'ultra-popup-box-arch' : 'ultra-popup-box-smk';
  var iconClass = isArch ? 'ultra-popup-icon-arch' : 'ultra-popup-icon-smk';
  var btnClass = isArch ? 'ultra-popup-btn-arch' : 'ultra-popup-btn-smk';
  var particleClass = isArch ? 'ultra-particle-arch' : 'ultra-particle-smk';

  // Generate floating particles
  var particles = '';
  var pCount = isArch ? 14 : 10;
  for (var pi = 0; pi < pCount; pi++) {
    var px = Math.random()*100, py = Math.random()*100;
    var ps = (0.4 + Math.random()*0.8).toFixed(2);
    var pd = (1.5 + Math.random()*3).toFixed(2);
    var pDelay = (Math.random()*2).toFixed(2);
    particles += '<div class="' + particleClass + '" style="left:' + px + '%;top:' + py + '%;width:' + (4+Math.random()*8).toFixed(0) + 'px;height:' + (4+Math.random()*8).toFixed(0) + 'px;animation-duration:' + pd + 's;animation-delay:' + pDelay + 's;"></div>';
  }

  overlay.innerHTML =
    '<div class="' + bgClass + '"></div>'
    + particles
    + '<div class="' + boxClass + '" style="width:100%;max-width:380px;position:relative;z-index:2;">'
      + '<button onclick="document.getElementById(\'token-bundle-popup\').remove()" style="position:absolute;top:14px;right:14px;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.15);color:#9ca3af;border-radius:8px;padding:5px 11px;cursor:pointer;font-size:15px;font-weight:700;z-index:5;line-height:1">✕</button>'
      // Aura rings
      + '<div class="' + (isArch ? 'arch-ring-1' : 'smk-ring-1') + '"></div>'
      + '<div class="' + (isArch ? 'arch-ring-2' : 'smk-ring-2') + '"></div>'
      + '<div style="text-align:center;margin-bottom:20px;position:relative;">'
        + '<div class="' + iconClass + '">' + bundle.icon + '</div>'
        + '<div class="' + (isArch ? 'ultra-name-arch' : 'ultra-name-smk') + '">' + bundle.name + '</div>'
        + '<div style="font-size:12px;color:' + (isArch ? '#ffaa44' : '#00d4ff') + ';margin-top:4px;letter-spacing:1px;">' + bundle.priceDisplay + ' · <span style="color:#00f5ff;font-weight:700">+' + bundle.tokens.toLocaleString() + ' 🔮</span></div>'
        + '<div style="font-size:11px;color:#6b7280;margin-top:3px;">' + bundle.desc + '</div>'
      + '</div>'
      + '<div style="font-size:13px;color:#4ade80;font-weight:700;margin-bottom:12px;text-align:center;">💳 Chọn phương thức thanh toán · Mua được nhiều lần</div>'
      + '<div onclick="document.getElementById(\'token-bundle-popup\').remove();showMarketCodePopup(\'' + id + '\')" '
      + 'style="background:linear-gradient(135deg,#0a1220,#111f3a);border:1.5px solid #3b82f655;border-radius:14px;padding:14px;margin-bottom:10px;cursor:pointer;display:flex;align-items:center;gap:12px" '
      + 'onmouseover="this.style.borderColor=\'#60a5fa88\'" onmouseout="this.style.borderColor=\'#3b82f655\'">'
      +   '<div style="font-size:28px;flex-shrink:0">🔑</div>'
      +   '<div>'
      +     '<div style="font-size:14px;font-weight:700;color:#60a5fa">Nhập Mã Kích Hoạt</div>'
      +     '<div style="font-size:11px;color:#6b7280;margin-top:2px">Mã dạng <span style="color:#93c5fd;font-family:monospace">XX-XX-XX-XX</span></div>'
      +     '<div style="font-size:11px;color:#374151;margin-top:2px">Mua mã: <span style="color:#60a5fa">tranthikimai4@gmail.com</span></div>'
      +   '</div>'
      + '</div>'
      + '<div onclick="document.getElementById(\'token-bundle-popup\').remove();showMarketBankPopup(\'' + id + '\')" '
      + 'style="background:linear-gradient(135deg,#120a20,#1e1235);border:1.5px solid #7c3aed55;border-radius:14px;padding:14px;cursor:pointer;display:flex;align-items:center;gap:12px" '
      + 'onmouseover="this.style.borderColor=\'#a78bfa88\'" onmouseout="this.style.borderColor=\'#7c3aed55\'">'
      +   '<div style="font-size:28px;flex-shrink:0">🏦</div>'
      +   '<div>'
      +     '<div style="font-size:14px;font-weight:700;color:#a78bfa">Chuyển Khoản Ngân Hàng</div>'
      +     '<div style="font-size:11px;color:#6b7280;margin-top:2px">Vietcombank · TK: <span style="color:#c4b5fd;font-family:monospace;font-weight:700">0905393373</span></div>'
      +     '<div style="font-size:11px;color:#374151;margin-top:2px">Liên hệ email sau khi chuyển khoản</div>'
      +   '</div>'
      + '</div>'
    + '</div>';

  document.body.appendChild(overlay);
}

// ═══ API HELPER — Kết nối Google Sheets ══════════════════════════════════
function _callGAPI(code, bundleId, callback) {
  var url = 'https://script.google.com/macros/s/AKfycbyHt9804Lrdg902sEiE-Fz0-TG0w_bXxAsGfunZuLFcsHpwkmOOLcBgnYFl0Y7cSPFqkQ/exec';
  if (!url) {
    callback({ ok: false, msg: '⚠️ Chưa cài đặt API! Vui lòng liên hệ admin.' });
    return;
  }
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'check', code: code.trim().toUpperCase(), bundleId: bundleId || '*' })
  })
  .then(function(r){ return r.json(); })
  .then(function(data){ callback(data); })
  .catch(function(e){ callback({ ok: false, msg: '❌ Lỗi kết nối: ' + e.message }); });
}

function _applyTokenBundleEffects(id) {
  var bundle = TOKEN_BUNDLES.find(function(b){ return b.id === id; });
  if (!bundle) return false;
  var fx = bundle.effects;
  var tokenBonus = 0;
  if (G.factoryPremium) tokenBonus = Math.floor((fx.tokens||0) * 0.10);
  else if (G.factoryPlus) tokenBonus = Math.floor((fx.tokens||0) * 0.05);
  G.wallet.token = (G.wallet.token||0) + (fx.tokens||0) + tokenBonus;
  if (fx.keys) { G.wallet.key = (G.wallet.key||0) + fx.keys; }
  if (fx.blockAds) { G.adBlockCount = (G.adBlockCount||0) + fx.blockAds; }
  if (fx.unlockShopTiers && fx.unlockShopTiers.length) {
    if (!G.unlockedTiers) G.unlockedTiers = [];
    fx.unlockShopTiers.forEach(function(t){ if (!G.unlockedTiers.includes(t)) G.unlockedTiers.push(t); });
  }
  if (fx.permanentSpeedInternet) {
    G.permanentSpeedInternet = true;
    G.inetPackage = 'speed';
    G.inetExpiry = Date.now() + 100*365*24*60*60*1000;
  }
  if (fx.freeValuePump) { G.valueMultiplier = (G.valueMultiplier||1) * 2; }
  if (fx.startBonus) { G.money += fx.startBonus; }
  if (fx.startBonusMillion) { G.money += fx.startBonusMillion * 1000000; }
  if (fx.startBonusBillion) { G.money += fx.startBonusBillion * 1000000000; }
  if (fx.unlockAllTiers) {
    if (!G.unlockedTiers) G.unlockedTiers = [];
    for (var ti = 1; ti <= 10; ti++) { if (!G.unlockedTiers.includes(ti)) G.unlockedTiers.push(ti); }
  }
  if (fx.fuelF4) {
    var fuelF4Type = FUEL_TYPES.find(function(f){ return f.id === 'f4'; });
    if (fuelF4Type) {
      G.powerSeconds = (G.powerSeconds||0) + fuelF4Type.seconds * fx.fuelF4;
      G.totalPowerBought = (G.totalPowerBought||0) + fuelF4Type.seconds * fx.fuelF4;
      G.powerOutageTriggered = true; powerState = 'normal';
      try { hideOutageScreen(); applyPowerOutageLock(false); updateProgressBars(); } catch(e){}
    }
  }
  if (fx.fuelF5) {
    var fuelF5Type = FUEL_TYPES.find(function(f){ return f.id === 'f5'; });
    if (fuelF5Type) {
      G.powerSeconds = (G.powerSeconds||0) + fuelF5Type.seconds * fx.fuelF5;
      G.totalPowerBought = (G.totalPowerBought||0) + fuelF5Type.seconds * fx.fuelF5;
      G.powerOutageTriggered = true; powerState = 'normal';
      try { hideOutageScreen(); applyPowerOutageLock(false); updateProgressBars(); } catch(e){}
    }
  }
  if (fx.bonusInvSlots) { G.invMaxSlots = (G.invMaxSlots||50) + fx.bonusInvSlots; }
  if (fx.taxEvadeTickets) {
    G.taxEvadeTickets = (G.taxEvadeTickets||0) + fx.taxEvadeTickets;
    G.debtEvadeTickets = (G.debtEvadeTickets||0) + fx.taxEvadeTickets;
    for (var t = 0; t < fx.taxEvadeTickets; t++) {
      if (G.inventory.length < G.invMaxSlots) {
        G.inventory.push({ id:'evade_ticket_'+Date.now()+'_'+t, itemId:'evade_ticket', name:'Vé Trốn Thuế & Nợ', icon:'🎫', tier:'special', boughtPrice:0, recyclePoints:0, obtainedAt:Date.now(), isTicket:true });
      }
    }
  }
  updateUI(); saveGame(false);
  renderVipShop(); renderSlots(); renderShopTabs();
  var bonusMsg = tokenBonus > 0 ? ' (+' + tokenBonus + ' bonus 🔮!)' : '';
  showNotif('🎉 ' + bundle.name + ' đã kích hoạt! +' + bundle.tokens + ' 🔮' + bonusMsg);
  return true;
}

// ═══ POPUP NHẬP MÃ ════════════════════════════════════════════════════════
function showMarketCodePopup(id) {
  var existing = document.getElementById('market-code-popup');
  if (existing) existing.remove();
  var bundle = TOKEN_BUNDLES.find(function(b){ return b.id === id; });
  var bName = bundle ? bundle.name : 'Bundle';
  var bColor = bundle ? bundle.color : '#4ade80';
  var bBorder = bundle ? bundle.border : '#4ade80';

  var overlay = document.createElement('div');
  overlay.id = 'market-code-popup';
  overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.92);z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px;backdrop-filter:blur(8px)';
  overlay.innerHTML =
    '<div style="background:linear-gradient(135deg,#0a1220,#111f3a);border:2px solid #3b82f666;border-radius:20px;padding:26px 20px;width:100%;max-width:360px;position:relative;box-shadow:0 0 50px #3b82f622">'
    + '<button onclick="document.getElementById(\'market-code-popup\').remove();showTokenBundlePopup(\'' + id + '\')" style="position:absolute;top:12px;left:14px;background:#1f2937;border:1px solid #374151;color:#9ca3af;border-radius:8px;padding:4px 10px;cursor:pointer;font-size:13px;font-weight:700">← Quay lại</button>'
    + '<button onclick="document.getElementById(\'market-code-popup\').remove()" style="position:absolute;top:12px;right:14px;background:#1f2937;border:1px solid #374151;color:#9ca3af;border-radius:8px;padding:4px 10px;cursor:pointer;font-size:15px;font-weight:700">✕</button>'
    + '<div style="text-align:center;margin-bottom:18px;padding-top:8px">'
    +   '<div style="font-size:42px;margin-bottom:6px">🔑</div>'
    +   '<div style="font-size:17px;font-weight:800;color:#60a5fa">Nhập Mã Kích Hoạt</div>'
    +   '<div style="font-size:12px;color:' + bColor + ';margin-top:4px;font-weight:600">' + bName + '</div>'
    +   '<div style="font-size:11px;color:#6b7280;margin-top:2px">Mã 8 số: XX-XX-XX-XX · Mua được nhiều lần</div>'
    + '</div>'
    + '<div style="background:#0d1117;border:1px solid #3b82f633;border-radius:12px;padding:14px;margin-bottom:14px">'
    +   '<div style="font-size:12px;color:#60a5fa;font-weight:700;margin-bottom:8px">📧 Cách mua mã:</div>'
    +   '<div style="font-size:12px;color:#9ca3af;line-height:1.9">1. Liên hệ email để đặt mua<br>2. Thanh toán và nhận mã kích hoạt<br>3. Nhập mã bên dưới để kích hoạt</div>'
    +   '<div style="margin-top:10px;background:#111827;border:1px solid #3b82f644;border-radius:8px;padding:10px;display:flex;align-items:center;gap:8px">'
    +     '<span style="font-size:16px">📮</span>'
    +     '<div><div style="font-size:11px;color:#4b5563">Email liên hệ:</div><div style="font-size:13px;font-weight:700;color:#60a5fa">tranthikimai4@gmail.com</div></div>'
    +   '</div>'
    + '</div>'
    + '<div style="margin-bottom:12px">'
    +   '<div style="font-size:12px;color:#6b7280;margin-bottom:7px;font-weight:600">Nhập mã của bạn:</div>'
    +   '<input id="market-code-input-' + id + '" type="text" maxlength="14" placeholder="VD: AB7H-32F5-53PQ" '
    +   'oninput="marketFormatCode(this)" '
    +   'style="width:100%;box-sizing:border-box;padding:13px 14px;background:#111827;border:2px solid #3b82f644;border-radius:10px;color:#e2e8f0;font-size:15px;font-weight:700;font-family:monospace;letter-spacing:3px;text-align:center;outline:none" '
    +   'onfocus="this.style.borderColor=\'#60a5fa88\'" onblur="this.style.borderColor=\'#3b82f644\'">'
    +   '<div id="market-code-msg-' + id + '" style="font-size:12px;margin-top:7px;text-align:center;min-height:18px"></div>'
    + '</div>'
    + '<button onclick="marketRedeemCode(\'' + id + '\')" '
    + 'style="width:100%;padding:13px;background:linear-gradient(135deg,#1e3a5f,#1e40af);color:#93c5fd;border:1.5px solid #3b82f655;border-radius:10px;cursor:pointer;font-size:14px;font-weight:800">'
    + '✅ Kích Hoạt & Nhận Bundle</button>'
    + '</div>';
  document.body.appendChild(overlay);
  setTimeout(function(){ var inp = document.getElementById('market-code-input-'+id); if(inp) inp.focus(); }, 100);
}

function marketFormatCode(input) {
  var raw = input.value.toUpperCase().replace(/[^A-Z2-9]/g, '').slice(0, 12);
  var parts = [];
  for (var i = 0; i < raw.length; i += 4) parts.push(raw.slice(i, i + 4));
  input.value = parts.join('-');
}

function marketRedeemCode(id) {
  var input = document.getElementById('market-code-input-' + id);
  var msg = document.getElementById('market-code-msg-' + id);
  if (!input || !msg) return;
  var code = input.value.trim().toUpperCase();
  if (!/^[A-Z2-9]{4}-[A-Z2-9]{4}-[A-Z2-9]{4}$/.test(code)) {
    msg.style.color = '#f87171'; msg.textContent = '⚠️ Mã không đúng định dạng! VD: AB7H-32F5-53PQ'; return;
  }
  msg.style.color = '#60a5fa'; msg.textContent = '⏳ Đang kiểm tra mã...';
  _callGAPI(code, id, function(res) {
    if (!res.ok) {
      msg.style.color = '#f87171'; msg.textContent = res.msg; return;
    }
    var popup = document.getElementById('market-code-popup');
    if (popup) popup.remove();
    _applyTokenBundleEffects(id);
  });
}

// ═══ POPUP NGÂN HÀNG ══════════════════════════════════════════════════════
function showMarketBankPopup(id) {
  var existing = document.getElementById('market-bank-popup');
  if (existing) existing.remove();
  var bundle = TOKEN_BUNDLES.find(function(b){ return b.id === id; });
  var bName = bundle ? bundle.name : 'Bundle';

  var overlay = document.createElement('div');
  overlay.id = 'market-bank-popup';
  overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.92);z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px;backdrop-filter:blur(8px)';
  overlay.innerHTML =
    '<div style="background:linear-gradient(135deg,#120a20,#1e1235);border:2px solid #7c3aed66;border-radius:20px;padding:26px 20px;width:100%;max-width:360px;position:relative;box-shadow:0 0 50px #7c3aed22">'
    + '<button onclick="document.getElementById(\'market-bank-popup\').remove();showTokenBundlePopup(\'' + id + '\')" style="position:absolute;top:12px;left:14px;background:#1f2937;border:1px solid #374151;color:#9ca3af;border-radius:8px;padding:4px 10px;cursor:pointer;font-size:13px;font-weight:700">← Quay lại</button>'
    + '<button onclick="document.getElementById(\'market-bank-popup\').remove()" style="position:absolute;top:12px;right:14px;background:#1f2937;border:1px solid #374151;color:#9ca3af;border-radius:8px;padding:4px 10px;cursor:pointer;font-size:15px;font-weight:700">✕</button>'
    + '<div style="text-align:center;margin-bottom:18px;padding-top:8px">'
    +   '<div style="font-size:42px;margin-bottom:6px">🏦</div>'
    +   '<div style="font-size:17px;font-weight:800;color:#a78bfa">Chuyển Khoản Ngân Hàng</div>'
    +   '<div style="font-size:12px;color:#6b7280;margin-top:4px">' + bName + ' · Nhận Bundle sau khi xác nhận</div>'
    + '</div>'
    + '<div style="background:#0d0d1a;border:1.5px solid #7c3aed55;border-radius:14px;padding:16px;margin-bottom:14px">'
    +   '<div style="font-size:11px;color:#7c3aed;font-weight:700;letter-spacing:1px;margin-bottom:10px">THÔNG TIN NGÂN HÀNG</div>'
    +   '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid #1f2937">'
    +     '<span style="font-size:13px;color:#6b7280">Ngân hàng:</span><span style="font-size:14px;font-weight:700;color:#c4b5fd">Vietcombank</span>'
    +   '</div>'
    +   '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid #1f2937">'
    +     '<span style="font-size:13px;color:#6b7280">Số tài khoản:</span>'
    +     '<div style="display:flex;align-items:center;gap:6px">'
    +       '<span style="font-size:16px;font-weight:900;color:#a78bfa;font-family:monospace;letter-spacing:2px">0905393373</span>'
    +       '<button onclick="navigator.clipboard&&navigator.clipboard.writeText(\'0905393373\').then(function(){var b=document.getElementById(\'copy-mkt-bank-btn\');if(b){b.textContent=\'✓\';setTimeout(function(){b.textContent=\'📋\'},1500)}})" id="copy-mkt-bank-btn" style="background:#1f2937;border:1px solid #374151;color:#9ca3af;border-radius:6px;padding:3px 8px;cursor:pointer;font-size:13px">📋</button>'
    +     '</div>'
    +   '</div>'
    +   '<div style="display:flex;justify-content:space-between;align-items:center">'
    +     '<span style="font-size:13px;color:#6b7280">Chủ tài khoản:</span><span style="font-size:13px;font-weight:700;color:#e2e8f0">Trần Thị Kim Mai</span>'
    +   '</div>'
    + '</div>'
    + '<div style="background:#0d1117;border:1px solid #7c3aed33;border-radius:12px;padding:14px;margin-bottom:14px">'
    +   '<div style="font-size:12px;color:#a78bfa;font-weight:700;margin-bottom:8px">📋 Các bước thực hiện:</div>'
    +   '<div style="font-size:12px;color:#9ca3af;line-height:2">1. Chuyển khoản, nội dung: <span style="color:#c4b5fd;font-weight:700">TEN_GAME ' + id.replace('token_','').toUpperCase() + '</span><br>2. Chụp biên lai và gửi email đến:<br><span style="color:#a78bfa;font-weight:700">tranthikimai4@gmail.com</span><br>3. Nhận mã kích hoạt qua email<br>4. Nhập mã tại mục <b style="color:#60a5fa">Nhập Mã Kích Hoạt</b></div>'
    + '</div>'
    + '<div style="display:flex;gap:8px">'
    +   '<button onclick="document.getElementById(\'market-bank-popup\').remove()" style="flex:1;padding:11px;background:#1f2937;color:#9ca3af;border:1px solid #374151;border-radius:10px;cursor:pointer;font-size:13px;font-weight:600">Đóng</button>'
    +   '<button onclick="document.getElementById(\'market-bank-popup\').remove();showMarketCodePopup(\'' + id + '\')" style="flex:1;padding:11px;background:linear-gradient(135deg,#1e1235,#2d1a4a);color:#c4b5fd;border:1.5px solid #7c3aed55;border-radius:10px;cursor:pointer;font-size:13px;font-weight:700">🔑 Nhập Mã</button>'
    + '</div>'
    + '</div>';
  document.body.appendChild(overlay);
}

window.showMarketCodePopup = showMarketCodePopup;
window.showMarketBankPopup = showMarketBankPopup;
window.marketFormatCode = marketFormatCode;
window.marketRedeemCode = marketRedeemCode;

function confirmTokenBundleCode(id) {
  var inp = document.getElementById('tbpop-code-' + id);
  var errEl = document.getElementById('tbpop-err-' + id);
  if (!inp || !errEl) return;
  var code = inp.value.trim().toUpperCase();
  // Each bundle has its own code format: BUNDLE_ID in uppercase + "-2025"
  var expectedCode = id.replace('token_','').toUpperCase() + '-2025';
  if (!code) { errEl.textContent = '⚠️ Vui lòng nhập mã kích hoạt!'; return; }
  if (code !== expectedCode) { errEl.textContent = '❌ Mã không hợp lệ! Liên hệ admin để nhận mã.'; return; }

  // Code valid — apply effects
  if (!G.boughtTokenBundles) G.boughtTokenBundles = [];
  if (G.boughtTokenBundles.indexOf(id) !== -1) { errEl.textContent = '⚠️ Bundle này đã được kích hoạt rồi!'; return; }

  var bundle = TOKEN_BUNDLES.find(function(b){ return b.id === id; });
  if (!bundle) return;
  var fx = bundle.effects;
  // Apply Factory Plus/Premium token bonus
  let tokenBonus = 0;
  if (G.factoryPremium) tokenBonus = Math.floor((fx.tokens||0) * 0.10);
  else if (G.factoryPlus) tokenBonus = Math.floor((fx.tokens||0) * 0.05);
  G.wallet.token = (G.wallet.token||0) + (fx.tokens||0) + tokenBonus;
  if (fx.keys) { G.wallet.key = (G.wallet.key||0) + fx.keys; }
  if (fx.blockAds) { G.adBlockCount = (G.adBlockCount||0) + fx.blockAds; }
  if (fx.unlockShopTiers && fx.unlockShopTiers.length) {
    if (!G.unlockedTiers) G.unlockedTiers = [];
    fx.unlockShopTiers.forEach(function(t){ if (!G.unlockedTiers.includes(t)) G.unlockedTiers.push(t); });
  }
  if (fx.permanentSpeedInternet) {
    G.permanentSpeedInternet = true;
    G.inetPackage = 'speed';
    G.inetExpiry = Date.now() + 100*365*24*60*60*1000;
  }
  if (fx.freeValuePump) { G.valueMultiplier = (G.valueMultiplier||1) * 2; }
  if (fx.startBonus) { G.money += fx.startBonus; }
  if (fx.startBonusMillion) { G.money += fx.startBonusMillion * 1000000; }
  if (fx.startBonusBillion) { G.money += fx.startBonusBillion * 1000000000; }
  if (fx.unlockAllTiers) {
    if (!G.unlockedTiers) G.unlockedTiers = [];
    for (var ti = 1; ti <= 10; ti++) { if (!G.unlockedTiers.includes(ti)) G.unlockedTiers.push(ti); }
  }
  if (fx.fuelF4) {
    var fuelF4Type = FUEL_TYPES.find(function(f){ return f.id === 'f4'; });
    if (fuelF4Type) {
      G.powerSeconds = (G.powerSeconds||0) + fuelF4Type.seconds * fx.fuelF4;
      G.totalPowerBought = (G.totalPowerBought||0) + fuelF4Type.seconds * fx.fuelF4;
      G.powerOutageTriggered = true;
      powerState = 'normal';
      try { hideOutageScreen(); applyPowerOutageLock(false); updateProgressBars(); } catch(e){}
    }
  }
  if (fx.fuelF5) {
    var fuelF5Type = FUEL_TYPES.find(function(f){ return f.id === 'f5'; });
    if (fuelF5Type) {
      G.powerSeconds = (G.powerSeconds||0) + fuelF5Type.seconds * fx.fuelF5;
      G.totalPowerBought = (G.totalPowerBought||0) + fuelF5Type.seconds * fx.fuelF5;
      G.powerOutageTriggered = true;
      powerState = 'normal';
      try { hideOutageScreen(); applyPowerOutageLock(false); updateProgressBars(); } catch(e){}
    }
  }
  if (fx.bonusInvSlots) {
    G.invMaxSlots = (G.invMaxSlots||50) + fx.bonusInvSlots;
  }
  if (fx.taxEvadeTickets) {
    G.taxEvadeTickets = (G.taxEvadeTickets||0) + fx.taxEvadeTickets;
    G.debtEvadeTickets = (G.debtEvadeTickets||0) + fx.taxEvadeTickets;
    // Add tickets as items in inventory
    for (var t = 0; t < fx.taxEvadeTickets; t++) {
      if (G.inventory.length < G.invMaxSlots) {
        G.inventory.push({
          id: 'evade_ticket_' + Date.now() + '_' + t,
          itemId: 'evade_ticket',
          name: 'Vé Trốn Thuế & Nợ',
          icon: '🎫',
          tier: 'special',
          boughtPrice: 0,
          recyclePoints: 0,
          obtainedAt: Date.now(),
          isTicket: true
        });
      }
    }
  }
  G.boughtTokenBundles.push(id);
  updateUI(); saveGame(false);
  renderVipShop(); renderSlots(); renderShopTabs();

  // Close popup and show success
  var popup = document.getElementById('token-bundle-popup');
  if (popup) popup.remove();
  var bonusMsg = tokenBonus > 0 ? ' (+' + tokenBonus + ' bonus 🔮!)' : '';
  showNotif('🎉 ' + bundle.name + ' đã được kích hoạt! +' + bundle.tokens + ' 🔮' + bonusMsg);
}
