/* ┌─────────────────────────────────────────────────────────────────────────┐
   │  MODULE 09 · TERMINAL  —  underground vendors · commands · internet     │
   └─────────────────────────────────────────────────────────────────────────┘ */
// ═══ COMPUTER TERMINAL ════════════════════════════════════════════

// ── Underground Vendor pools ──────────────────────────────────────────────
// Vendors are darkweb sellers accessible via the Terminal.
// Players connect with: call_to(vendor_host)
// Then use: catalog / buy [n] / bargain
//
// Vendors are unlocked progressively as the player installs OS updates:
//   v2 (default) : BASE only
//   v3 update    : + EXTRA (5 more)
//   v4 update    : + V4 (5 more)
//   v5 update    : + V5 (5 more) → total 20 vendors at max OS
//
// Each vendor object: { host, alias, greeting, mood }
//   mood affects greeting personality but has no mechanical effect.
// Base vendors (always available)
const UNDERGROUND_VENDORS_BASE = [
  { host:'gg.com',         alias:'G_GHOST',     greeting:'yo... tao đây. mày tìm hàng gì?',                                              mood:'chill' },
  { host:'hacker.com',     alias:'H4CK3R_X',    greeting:'>>> kết nối bảo mật... xác minh danh tính... OK. tao có hàng xịn.',             mood:'paranoid' },
  { host:'darknet.onion',  alias:'SHADOW_MAN',  greeting:'...ai đó đang nghe không? Oke. tao có nhiều thứ hay lắm.',                      mood:'nervous' },
  { host:'mrx.shop',       alias:'MR_X',        greeting:'Chào khách hàng thân thiết. Catalog của tao đây.',                              mood:'professional' },
  { host:'underworld.net', alias:'UND3RW0RLD',  greeting:'mày tìm được đây rồi hả. Oke, xem catalog đi.',                                mood:'suspicious' },
];
// Extra vendors — unlocked after Factory-OS update
const UNDERGROUND_VENDORS_EXTRA = [
  { host:'phantom.io',     alias:'PH4NTOM',     greeting:'...kết nối ẩn danh xác nhận. Tao có hàng hiếm.',                               mood:'paranoid' },
  { host:'z3ro.net',       alias:'Z3R0',        greeting:'0x00 HELLO. Tao bán đồ mà không ai khác có.',                                  mood:'chill' },
  { host:'blackrose.onion',alias:'BL4CK_R0SE',  greeting:'*tiếng gõ phím* Đây là kênh riêng. Mày may mắn tìm được.',                     mood:'nervous' },
  { host:'viper.dark',     alias:'V1PER',       greeting:'Ssss... mày vào được đây là mày đặc biệt. Catalog xịn hơn chợ thường nhiều.',  mood:'suspicious' },
  { host:'cipher.cc',      alias:'C1PHER',      greeting:'[ENC] Danh tính xác minh. Chào mừng đến kênh cấp cao.',                       mood:'professional' },
];
// Extra vendors — unlocked after Factory-OS v4.0
const UNDERGROUND_VENDORS_V4 = [
  { host:'neon.onion',     alias:'N30N',        greeting:'*đèn neon nhấp nháy* Mày tìm được tao rồi. Hàng tao là độc.',                  mood:'chill' },
  { host:'spectre.net',    alias:'SP3CTR3',     greeting:'>>> Danh tính: ẩn. Vị trí: không xác định. Hàng: đặc cấp.',                   mood:'paranoid' },
  { host:'ironsafe.dark',  alias:'1R0N_SAFE',   greeting:'Kho của tao khóa kỹ lắm. Mày gõ đúng cửa rồi đó.',                            mood:'professional' },
  { host:'wraith.io',      alias:'WR41TH',      greeting:'...mày nghe tiếng gì không? Đó là tao. Tao có hàng mày cần.',                  mood:'nervous' },
  { host:'nexus.shop',     alias:'N3XUS',       greeting:'[NEXUS] Node kết nối thành công. Catalog premium đang tải...',                 mood:'suspicious' },
];
// Extra vendors — unlocked after Factory-OS v5.0
const UNDERGROUND_VENDORS_V5 = [
  { host:'abyss.onion',    alias:'4BYSS',       greeting:'...mày đã đến tận đây. Tao ở đây từ lâu rồi. Hàng tao không ai sánh được.',   mood:'paranoid' },
  { host:'echo.dark',      alias:'3CH0',        greeting:'echo echo echo... Kết nối phản hồi xác nhận. Tao có thứ mày muốn.',            mood:'chill' },
  { host:'titanvault.net', alias:'T1TAN',       greeting:'[TITAN VAULT] Xác thực cấp OMEGA. Hàng tối thượng đang mở...',                mood:'professional' },
  { host:'phantom2.cc',    alias:'PH4NTX',      greeting:'Bản sao của phantom... không, tao khác hẳn. Hàng tao xịn hơn nhiều.',         mood:'suspicious' },
  { host:'deepcore.io',    alias:'D33PC0R3',    greeting:'[DEEPCORE] Tầng sâu nhất của mạng lưới. Chỉ người thật sự mới đến được đây.', mood:'nervous' },
];

// getUndergroundVendors() — returns the vendors available at the player's
// current OS version.  Higher OS = more vendors with rarer/cheaper goods.
//   v2 (default) : 5  vendors (BASE)
//   v3 update    : 10 vendors (+EXTRA)
//   v4 update    : 15 vendors (+V4)
//   v5 update    : 20 vendors (+V5)
function getUndergroundVendors() {
  if (G.osV5Updated) return [...UNDERGROUND_VENDORS_BASE, ...UNDERGROUND_VENDORS_EXTRA, ...UNDERGROUND_VENDORS_V4, ...UNDERGROUND_VENDORS_V5];
  if (G.osV4Updated) return [...UNDERGROUND_VENDORS_BASE, ...UNDERGROUND_VENDORS_EXTRA, ...UNDERGROUND_VENDORS_V4];
  if (G.osUpdated) return [...UNDERGROUND_VENDORS_BASE, ...UNDERGROUND_VENDORS_EXTRA];
  return UNDERGROUND_VENDORS_BASE;
}
// Keep backward compat
const UNDERGROUND_VENDORS = UNDERGROUND_VENDORS_BASE;

const BLACK_MARKET_GOODS = [
  { id:'bm_silver',    name:'Bạc nguyên khối 1kg',        icon:'🥈', basePrice:850,   desc:'Bạc 999 tinh khiết, không nguồn gốc.' },
  { id:'bm_gold_bar',  name:'Vàng thỏi 100g',             icon:'🏅', basePrice:6500,  desc:'Vàng 24K, không hóa đơn.' },
  { id:'bm_diamond',   name:'Kim cương thô 3 cara',        icon:'💎', basePrice:18000, desc:'Kim cương tự nhiên, chưa kiểm định.' },
  { id:'bm_ak47',      name:'Súng AK-47 (đầy đủ)',        icon:'🔫', basePrice:2200,  desc:'AK-47 7.62mm, kèm 2 băng đạn.' },
  { id:'bm_m4a1',      name:'Súng M4A1 (CQB build)',      icon:'🔫', basePrice:3100,  desc:'M4A1 5.56mm, rail system đầy đủ.' },
  { id:'bm_suppressor',name:'Nòng giảm thanh NATO',       icon:'🔩', basePrice:780,   desc:'Suppressor M13.5x1 LH, thép titan.' },
  { id:'bm_deagle',    name:'Desert Eagle .50AE',         icon:'🔫', basePrice:1800,  desc:'Deagle mark XIX, không số serie.' },
  { id:'bm_ammo_ak',   name:'Đạn AK 7.62x39 (200 viên)', icon:'📦', basePrice:520,   desc:'Đạn full metal jacket nhập khẩu.' },
  { id:'bm_scope',     name:'Kính ngắm Night Vision',     icon:'🔭', basePrice:4200,  desc:'Kính NV Gen 3, tầm nhìn 300m.' },
  { id:'bm_vest',      name:'Áo giáp chống đạn NIJ IV',  icon:'🦺', basePrice:1600,  desc:'Ceramic plate, chống đạn rifle.' },
  { id:'bm_crypto_hw', name:'Ví Crypto Hardware (hacked)',icon:'💾', basePrice:680,   desc:'Ledger đã unlock, không password.' },
  { id:'bm_gold_coin', name:'Xu vàng cổ (10 đồng)',       icon:'🪙', basePrice:3800,  desc:'Xu vàng thời thuộc địa, hiếm.' },
];

let terminalState = {
  initialized: false,
  connected: false,
  currentVendor: null,
  currentCatalog: [],
  bargainCount: 0,
  maxBargains: 3,
  history: [],
};

// ═══ BOSS CONVERSATION SYSTEM ════════════════════════════════════
const BOSSES = [
  {
    host:'bigshadow.onion', alias:'BIG_SHADOW', icon:'🦁', title:'Trùm Vũ Khí Đông Nam Á', mood:'arrogant',
    // intros[0] = lần đầu, intros[1] = lần 2, intros[2] = lần 3, intros[3+] = lần hay quay lại
    intros:[
      ['...ai gọi tao vậy?','À. Mày mò được số tao. Ấn tượng đấy.','Tao là BIG_SHADOW. Mày chắc đã nghe tên rồi.','Nói nhanh. Tao không có nhiều thời gian.'],
      ['À, lại mày.','Tao tưởng mày đã biến rồi.','Được rồi, mày cần gì lần này?'],
      ['Mày lại đây nữa.','Tao nhớ mày. Đừng tưởng tao quên mặt người.','Lần này nói thẳng đi, đừng vòng vo như lần trước.'],
      ['...mày lại.','Tao đang bận.','Nói nhanh.'],
      ['Ugh. Lại mày nữa.','Mày rảnh lắm hả.','Tao đang không vui. Nói đi.'],
      ['Sao mày cứ gọi tao vậy.','Tao không phải cái máy trả lời tự động của mày đâu.','Nói. Rồi biến.'],
      ['...','Mày lại.','Tao biết rồi. Nhanh lên.'],
      ['Trời. Lại cái số này.','Mày không có việc gì khác làm à.','Nói đi cho xong.'],
      ['Mày có biết tao đang bận không.','Cứ gọi hoài.','Được rồi, nói gì đi.'],
      ['...okay.','Tao nghe.','Lần này tốt hơn lần trước không?'],
    ],
    conversations:[
      {id:'c1',bossLines:['Mày muốn gì? Mua hàng hay tán gẫu?','Nói đi. Tao không chờ cả ngày.','Lần này cần gì?'],choices:[
        {id:'c1a',text:'Tôi muốn làm ăn lâu dài với anh.',next:'c2_respect',mood_delta:+2},
        {id:'c1b',text:'Tôi muốn mua hàng giá tốt.',next:'c2_direct',mood_delta:+1},
        {id:'c1c',text:'Nghe nói anh là trùm lớn nhất vùng?',next:'c2_flatter',mood_delta:+1},
      ]},
      {id:'c2_respect',bossLines:['Làm ăn lâu dài hả. Tao thích thái độ đó. Mày biết quy tắc không?','Lâu dài. Từ đó nặng lắm đấy. Mày hiểu không?','Tao đã nghe câu đó nhiều lần. Mày chứng minh bằng gì?'],choices:[
        {id:'c2ra',text:'Không bao giờ phản bội. Luôn trả đúng hạn.',next:'c3_good',mood_delta:+3},
        {id:'c2rb',text:'Giữ im lặng, không hỏi nguồn gốc hàng.',next:'c3_good',mood_delta:+2},
        {id:'c2rc',text:'Tôi chưa biết quy tắc của anh.',next:'c3_neutral',mood_delta:0},
      ]},
      {id:'c2_direct',bossLines:['Thẳng thắn. Tao thích vậy. Mày có bao nhiêu vốn?','Giá tốt hả. Tao không bán rẻ cho người tao không biết. Mày có gì để đổi lại?','Mày tưởng tao đang khuyến mãi sao?'],choices:[
        {id:'c2da',text:'Đủ để mua sỉ. Cần giá tốt hơn thị trường.',next:'c3_neutral',mood_delta:+1},
        {id:'c2db',text:'Không nhiều, nhưng tôi là khách hàng đáng tin.',next:'c3_neutral',mood_delta:0},
        {id:'c2dc',text:'Tôi không tiết lộ tiền với người lạ.',next:'c3_bad',mood_delta:-2},
      ]},
      {id:'c2_flatter',bossLines:['...tao KHÔNG thích bị nịnh. Mày có việc thật không?','Tao nghe câu đó chục lần rồi. Mày có gì khác không?','Nịnh tao không mua được gì đâu.'],choices:[
        {id:'c2fa',text:'Xin lỗi. Tôi thực sự muốn mua hàng của anh.',next:'c3_neutral',mood_delta:+1},
        {id:'c2fb',text:'Tôi chỉ muốn tạo ấn tượng tốt.',next:'c3_bad',mood_delta:-2},
        {id:'c2fc',text:'Thật ra tôi muốn hỏi anh một điều...',next:'c3_neutral',mood_delta:0},
      ]},
      {id:'c3_good',bossLines:['Mày nói được. Tao ít khi cho người vào danh sách VIP... nhưng mày có vẻ được.','Lần này mày trả lời ổn. Tao để ý từ đầu rồi.','Được. Mày không giống đám kia.'],choices:[
        {id:'c3ga',text:'Cảm ơn anh. Anh sẽ không thất vọng.',next:'ending_good',mood_delta:+3},
        {id:'c3gb',text:'Tôi chứng minh bằng hành động, không lời nói.',next:'ending_good',mood_delta:+2},
      ]},
      {id:'c3_neutral',bossLines:['Được rồi. Tao sẽ cho mày mua lần này. Đừng làm tao thất vọng.','Oke. Lần này thôi nhé.','Tao không chắc về mày nhưng thôi, mua đi.'],choices:[
        {id:'c3na',text:'Tôi hiểu. Cảm ơn anh.',next:'ending_medium',mood_delta:+1},
        {id:'c3nb',text:'Anh có thể giảm giá thêm không?',next:'ending_bad',mood_delta:-3},
      ]},
      {id:'c3_bad',bossLines:['Mày đang làm tao mất kiên nhẫn rồi đó...','Tao không thích cái cách mày nói chuyện.','...mày muốn tao ngắt máy hả?'],choices:[
        {id:'c3ba',text:'Thôi xin lỗi, tôi nói sai rồi.',next:'ending_medium',mood_delta:+1},
        {id:'c3bb',text:'Anh thích gì tôi làm vậy.',next:'ending_bad',mood_delta:-2},
      ]},
      {id:'ending_good',isEnding:true,type:'good'},{id:'ending_medium',isEnding:true,type:'medium'},{id:'ending_bad',isEnding:true,type:'bad'},
    ]
  },
  {
    host:'ironfist.net', alias:'IR0N_FIST', icon:'🐯', title:'Trùm Buôn Lậu Cảng Biển', mood:'cold',
    intros:[
      ['...','Ai cho mày số đường dây này?','Không quan trọng. Mày đã ở đây rồi.','Tao là IR0N_FIST. Giao dịch nhanh gọn, không hỏi nhiều.'],
      ['...mày lại đây.','Lần này nói thẳng vào việc.'],
      ['À lại là mày.','Tao nhớ mày. Đừng mất thời gian của tao.'],
      ['...','Nói nhanh đi.'],
      ['Mày lại nữa hả.','Tao đang bận xử hàng. Nhanh lên.'],
      ['...mày lại.','Tao đang đếm. Nói đi.'],
      ['Sao không chán.','Gọi.'],
      ['...okay. Mày.','Nói.'],
      ['Lần này tao ít thời gian hơn.','Nói nhanh.'],
      ['...','Lại mày.','Thôi được. Gì đi.'],
    ],
    conversations:[
      {id:'c1',bossLines:['Mày cần gì? Đừng vòng vo.','Lần này mày muốn gì?','Nói. Tao đang đếm.'],choices:[
        {id:'c1a',text:'Tôi cần nguồn hàng ổn định và giá tốt.',next:'c2_business',mood_delta:+2},
        {id:'c1b',text:'Nghe anh có hàng đặc biệt không có ở chợ.',next:'c2_curious',mood_delta:+1},
        {id:'c1c',text:'Hỏi thăm, muốn làm quen trước.',next:'c2_weak',mood_delta:-1},
      ]},
      {id:'c2_business',bossLines:['Nguồn hàng ổn định. Mày đã từng làm việc với ai chưa?','Ổn định hả. Mày hiểu ổn định trong ngành này là gì không?','Nguồn hàng dài hạn hay giao dịch một lần?'],choices:[
        {id:'c2ba',text:'Một vài người, nhưng không đáng tin bằng anh.',next:'c3_good',mood_delta:+2},
        {id:'c2bb',text:'Chưa. Nhưng tôi nghiêm túc.',next:'c3_neutral',mood_delta:+1},
        {id:'c2bc',text:'Đó là thông tin riêng của tôi.',next:'c3_bad',mood_delta:-1},
      ]},
      {id:'c2_curious',bossLines:['...mày biết nhiều hơn tao nghĩ. Điều đó không phải lúc nào cũng tốt.','Mày nghe từ đâu? Nguồn tin đó có đáng tin không?','Hàng đặc biệt. Mày đủ sức xử không?'],choices:[
        {id:'c2ca',text:'Tôi chỉ nghe từ xa. Không có ý gì khác.',next:'c3_neutral',mood_delta:+1},
        {id:'c2cb',text:'Thông tin là tài sản. Tôi biết cách dùng.',next:'c3_good',mood_delta:+2},
        {id:'c2cc',text:'Anh không cần lo. Tôi kín miệng.',next:'c3_neutral',mood_delta:0},
      ]},
      {id:'c2_weak',bossLines:['Làm quen? Tao không kết bạn trong kinh doanh. Mày có mục đích không?','...mày đến đây để nói chuyện thôi hả.','Tao không có thời gian cho người không có mục đích.'],choices:[
        {id:'c2wa',text:'Có. Tôi muốn mua hàng giá tốt hơn chợ.',next:'c3_neutral',mood_delta:+1},
        {id:'c2wb',text:'Không có gì cụ thể. Xin lỗi vì đã làm phiền.',next:'ending_bad',mood_delta:-3},
      ]},
      {id:'c3_good',bossLines:['Được. Mày không tệ. Lần này tao sẽ ưu đãi đặc biệt.','Tao không hay nói vậy. Nhưng mày xứng đáng.','Oke. Mày pass.'],choices:[
        {id:'c3ga',text:'Cảm ơn anh. Tôi sẽ không làm anh thất vọng.',next:'ending_good',mood_delta:+2},
        {id:'c3gb',text:'Anh biết chọn đúng người.',next:'ending_good',mood_delta:+1},
      ]},
      {id:'c3_neutral',bossLines:['Oke. Tao cho mày mua với giá khuyến mãi nhẹ. Đừng kể cho ai.','Lần này thôi. Đừng nhờ vả thêm.','Giảm chút thôi. Đừng đòi hỏi.'],choices:[
        {id:'c3na',text:'Hiểu rồi. Cảm ơn anh.',next:'ending_medium',mood_delta:+1},
        {id:'c3nb',text:'Tôi muốn giá tốt hơn thế.',next:'ending_bad',mood_delta:-3},
      ]},
      {id:'c3_bad',bossLines:['Mày làm tao không thoải mái.','...tao không thích kiểu nói chuyện này.','Mày đang tự đẩy mình ra ngoài đó.'],choices:[
        {id:'c3ba',text:'Cho qua lần này được không?',next:'ending_medium',mood_delta:0},
        {id:'c3bb',text:'Vậy thì tôi đi tìm người khác.',next:'ending_bad',mood_delta:-5},
      ]},
      {id:'ending_good',isEnding:true,type:'good'},{id:'ending_medium',isEnding:true,type:'medium'},{id:'ending_bad',isEnding:true,type:'bad'},
    ]
  },
  {
    host:'ghostqueen.io', alias:'GH0ST_QUEEN', icon:'🐍', title:'Nữ Trùm Mạng Lưới Ngầm', mood:'calculating',
    intros:[
      ['~ kết nối đã được thiết lập ~','Tôi biết mày mò số này từ đâu.','Ấn tượng. Nhưng đừng nghĩ mày đặc biệt.','Tôi là GH0ST_QUEEN. Nói chuyện, và nói thật.'],
      ['À. Mày lại đây.','Tôi đã đoán mày sẽ quay lại.','Lần này mày chuẩn bị kỹ hơn chưa?'],
      ['Mày lại đây nữa.','Tôi không bất ngờ. Tôi đã xem lịch sử kết nối của mày.','Nói đi. Tôi đang nghe.'],
      ['...mày lại.','Tôi nhớ mày không phải vì mày đặc biệt.','Nói thật, đừng mất thời gian.'],
      ['Lại mày nữa rồi.','Tôi hơi ngạc nhiên mày vẫn còn liên hệ.','Thôi được. Mày cần gì?'],
      ['À lại là mày.','Tôi ghi nhận đủ rồi. Nói đi.'],
      ['Mày kiên trì quá nhỉ.','Không biết là tốt hay xấu.','Nói đi.'],
      ['...tôi đây.','Mày lại.','Lần này thì gì?'],
      ['Tôi đã đoán được.','Cứ gọi hoài.','Được rồi, mày cần gì.'],
      ['...','Ừ. Mày.','Thôi nhanh lên.'],
    ],
    conversations:[
      {id:'c1',bossLines:['Tôi không tiếp người chỉ đến xem. Mày đến đây vì lý do gì?','Lần này mày đến vì gì?','Tôi lắng nghe. Nhưng tôi không kiên nhẫn lâu đâu.'],choices:[
        {id:'c1a',text:'Tôi cần hàng tốt mà không muốn bị theo dõi.',next:'c2_smart',mood_delta:+3},
        {id:'c1b',text:'Nghe nói chị là người đáng tin nhất trong giới.',next:'c2_flatter',mood_delta:+1},
        {id:'c1c',text:'Tôi chỉ muốn thử xem có thật không.',next:'c2_weak',mood_delta:-2},
      ]},
      {id:'c2_smart',bossLines:['Người không muốn bị theo dõi là người thông minh. Mày đã từng lộ thông tin chưa?','Không bị theo dõi. Câu đó tôi thích. Nhưng câu đó cũng có nghĩa mày đang che giấu thứ gì.','Kín đáo. Tốt. Mày đã bao giờ phạm sai lầm chưa?'],choices:[
        {id:'c2sa',text:'Chưa bao giờ. Và tôi sẽ không bao giờ.',next:'c3_good',mood_delta:+3},
        {id:'c2sb',text:'Không phải lỗi tôi, nhưng một lần bị tai nạn.',next:'c3_neutral',mood_delta:-1},
        {id:'c2sc',text:'Câu hỏi đó khiến tôi khó trả lời.',next:'c3_neutral',mood_delta:0},
      ]},
      {id:'c2_flatter',bossLines:['Tôi không cần lời khen. Mày có thể chứng minh gì không?','Lời khen không mua được hàng của tôi.','Đáng tin. Từ đó tôi nghe nhiều lần rồi.'],choices:[
        {id:'c2fa',text:'Tôi thực sự cần hàng và sẽ trả giá tốt.',next:'c3_neutral',mood_delta:+1},
        {id:'c2fb',text:'Tôi biết cách mang khách hàng đến cho chị.',next:'c3_good',mood_delta:+2},
        {id:'c2fc',text:'Tôi không có gì để chứng minh ngay bây giờ.',next:'c3_bad',mood_delta:-2},
      ]},
      {id:'c2_weak',bossLines:['...mày "thử xem". Mày nghĩ đây là trò chơi sao?','Thử. Tôi không thích người không chắc chắn.','Không có gì để nói thật à?'],choices:[
        {id:'c2wa',text:'Không, xin lỗi. Tôi thực sự muốn làm ăn.',next:'c3_neutral',mood_delta:+1},
        {id:'c2wb',text:'Đúng là tôi không chắc lắm...',next:'ending_bad',mood_delta:-3},
      ]},
      {id:'c3_good',bossLines:['Được. Mày đã vượt qua bài test của tôi. Lần này... tôi sẽ thưởng đặc biệt.','Tôi đã quan sát mày từ đầu. Mày không biết đâu.','Tốt. Mày không phải người tôi nghĩ ban đầu.'],choices:[
        {id:'c3ga',text:'Cảm ơn chị. Tôi sẽ không làm chị thất vọng.',next:'ending_good',mood_delta:+2},
        {id:'c3gb',text:'Tôi biết chị sẽ không hối hận.',next:'ending_good',mood_delta:+1},
      ]},
      {id:'c3_neutral',bossLines:['Oke, mày không tệ. Tôi giảm giá lần này. Đừng nói với ai.','Được thôi. Lần này tôi giảm cho mày. Đừng kể.','Không hoàn hảo, nhưng đủ.'],choices:[
        {id:'c3na',text:'Hiểu rồi chị. Cảm ơn.',next:'ending_medium',mood_delta:+1},
        {id:'c3nb',text:'Chị có thể giảm nhiều hơn không?',next:'ending_bad',mood_delta:-4},
      ]},
      {id:'c3_bad',bossLines:['Tôi đã thấy qua. Mày chưa sẵn sàng.','Mày thất vọng tôi rồi đó.','Không. Mày không đủ tiêu chuẩn lần này.'],choices:[
        {id:'c3ba',text:'Cho tôi thêm cơ hội.',next:'ending_medium',mood_delta:0},
        {id:'c3bb',text:'Tôi nghĩ chị đang đánh giá sai người.',next:'ending_bad',mood_delta:-5},
      ]},
      {id:'ending_good',isEnding:true,type:'good'},{id:'ending_medium',isEnding:true,type:'medium'},{id:'ending_bad',isEnding:true,type:'bad'},
    ]
  },
  {
    host:'thegodfather.net', alias:'G0DFATHER', icon:'🦅', title:'Ông Trùm Già - Người Tạo Ra Luật', mood:'wise',
    intros:[
      ['*im lặng dài*','...mày đã đến gặp tao.','Không nhiều người dám làm vậy.','Ngồi xuống. Tao sẽ nghe mày nói.'],
      ['*tiếng ly cà phê đặt xuống*','Tao biết mày sẽ quay lại.','Ngồi đi. Tao đang nghe.'],
      ['...mày lại.','Tao nhớ mày. Người già thường nhớ những kẻ liều lĩnh.','Lần này mày muốn gì?'],
      ['*im lặng*','...','Nói đi con.'],
      ['À. Lại là mày.','Tao đang uống trà. Ngồi xuống, đừng làm ồn.'],
      ['*tiếng ghế kéo*','Mày lại đây nữa.','Được. Tao nghe.'],
      ['...mày.','Tao đoán được mày sẽ gọi.','Nói đi.'],
      ['*im lặng ngắn*','À lại là mày.','Tao đang nghĩ đến chuyện khác. Nhưng thôi, nói đi.'],
      ['Mày kiên trì.','Không biết vậy là tốt không.','Nói.'],
      ['...ừ.','Mày.','Tao nghe.'],
    ],
    conversations:[
      {id:'c1',bossLines:['Nói cho tao biết về mày. Tao muốn hiểu con người trước khi làm ăn.','Lần này mày muốn gì? Tao nghe.','Tao không vội. Nhưng tao muốn nghe điều thật.'],choices:[
        {id:'c1a',text:'Tôi là người kinh doanh nghiêm túc, cần đối tác đáng tin.',next:'c2_respect',mood_delta:+2},
        {id:'c1b',text:'Tôi còn trẻ nhưng hiểu giá trị của lòng trung thành.',next:'c2_humble',mood_delta:+3},
        {id:'c1c',text:'Tôi không muốn chia sẻ nhiều về bản thân.',next:'c2_closed',mood_delta:-2},
      ]},
      {id:'c2_respect',bossLines:['Kinh doanh nghiêm túc. Mày khác gì những người kia?','Nghiêm túc. Đó là từ tao nghe nhiều. Mày chứng minh được không?','Đối tác đáng tin. Mày định chứng minh điều đó bằng gì?'],choices:[
        {id:'c2ra',text:'Tôi không phản bội. Đó là nguyên tắc sống của tôi.',next:'c3_good',mood_delta:+3},
        {id:'c2rb',text:'Tôi biết giá trị của một cái bắt tay thật sự.',next:'c3_good',mood_delta:+2},
        {id:'c2rc',text:'Tôi cũng không chắc làm sao để chứng minh.',next:'c3_neutral',mood_delta:0},
      ]},
      {id:'c2_humble',bossLines:['Lòng trung thành. Thứ hiếm hơn vàng. Mày học điều đó từ đâu?','Trẻ mà nói vậy. Tao hy vọng mày thật sự hiểu chứ không chỉ nghe từ ai đó.','Hiểu lòng trung thành ở tuổi mày... không dễ. Mày chắc chưa?'],choices:[
        {id:'c2ha',text:'Từ những sai lầm. Tôi đã từng bị phản bội.',next:'c3_good',mood_delta:+3},
        {id:'c2hb',text:'Từ những người tôi ngưỡng mộ — như ông.',next:'c3_good',mood_delta:+2},
        {id:'c2hc',text:'Đó là giá trị gia đình tôi truyền lại.',next:'c3_good',mood_delta:+4},
      ]},
      {id:'c2_closed',bossLines:['...Tao tôn trọng sự kín đáo. Nhưng tao cần biết ít nhất một điều.','Kín đáo là tốt. Nhưng với tao thì cần có chút tin tưởng.','Mày không muốn chia sẻ. Tao hiểu. Nhưng làm ăn mà không biết nhau thì nguy hiểm lắm.'],choices:[
        {id:'c2ca',text:'Tôi trung thành với người tôi chọn làm đối tác.',next:'c3_neutral',mood_delta:+2},
        {id:'c2cb',text:'Tôi không nợ ai lời giải thích.',next:'ending_bad',mood_delta:-5},
      ]},
      {id:'c3_good',bossLines:['*gật đầu chậm* Tao đã gặp hàng nghìn người. Nhưng mày... mày có cái gì đó khác.','Tao đã quyết định rồi. Mày xứng đáng được tin tưởng.','Ít người vượt qua được cuộc trò chuyện với tao mà tao gật đầu. Mày là một trong số đó.'],choices:[
        {id:'c3ga',text:'Cảm ơn ông. Đây là vinh dự với tôi.',next:'ending_good',mood_delta:+3},
        {id:'c3gb',text:'Tôi chỉ sống theo cách mình tin là đúng.',next:'ending_good',mood_delta:+2},
      ]},
      {id:'c3_neutral',bossLines:['Mày chưa hoàn hảo, nhưng tao thấy tiềm năng. Lần này tao sẽ ưu đãi.','Oke. Tao cho mày cơ hội lần này. Đừng phí nó.','Chưa đủ để tao hoàn toàn tin. Nhưng đủ để làm ăn.'],choices:[
        {id:'c3na',text:'Cảm ơn ông. Tôi sẽ không quên điều này.',next:'ending_medium',mood_delta:+1},
        {id:'c3nb',text:'Ông có thể ưu đãi nhiều hơn không?',next:'ending_bad',mood_delta:-5},
      ]},
      {id:'ending_good',isEnding:true,type:'good'},{id:'ending_medium',isEnding:true,type:'medium'},{id:'ending_bad',isEnding:true,type:'bad'},
    ]
  },
  {
    host:'reaper.dark', alias:'R3APER', icon:'💀', title:'Trùm Bí Ẩn — Không Ai Biết Mặt', mood:'cold',
    intros:[
      ['01001000 01101001...','...','Kết nối được thiết lập.','Tao là R3APER. Mày không cần biết thêm.','Nói nhanh. Tao tính theo từng giây.'],
      ['...KẾT NỐI LẠI.','UID MÀY ĐÃ ĐƯỢC LƯU.','Nói đi.'],
      ['...NHẬN RA UID.','Lại mày.','Tao đã lưu profile của mày. Đừng lãng phí dữ liệu của tao.'],
      ['UID MATCH.','...','Nói nhanh hơn lần trước.'],
      ['...MÀY LẠI NỮA.','DỮ LIỆU CŨ ĐÃ TẢI.','Tao không bất ngờ. Nhưng tao cũng không vui.'],
      ['SCAN: UID KNOWN.','...lại là mày.','INPUT.'],
      ['...','UID RECOGNIZED. LẠI GỌI.','Tao đang chờ input.'],
      ['QUERY RECEIVED.','Mày lại.','DATA LOADED. NÓI NHANH.'],
      ['...MATCH.','Mày không chán à.','Nói.'],
      ['UID: KNOWN. AGAIN.','...','INPUT NOW.'],
    ],
    conversations:[
      {id:'c1',bossLines:['MỤC ĐÍCH KẾT NỐI?','LÝ DO GỌI LẠI?','INPUT PURPOSE.'],choices:[
        {id:'c1a',text:'Mua hàng. Số lượng lớn. Giá tốt.',next:'c2_direct',mood_delta:+2},
        {id:'c1b',text:'Tìm hiểu về hàng đặc biệt của anh.',next:'c2_info',mood_delta:+1},
        {id:'c1c',text:'Chỉ muốn nói chuyện...',next:'c2_weak',mood_delta:-3},
      ]},
      {id:'c2_direct',bossLines:['SỐ LƯỢNG LỚN = RỦI RO LỚN. MÀY XỬ LÝ ĐƯỢC KHÔNG?','MÀY NÓI LỚN. CHỨNG MINH.','SỐ LƯỢNG LỚN CẦN MẠNG LƯỚI. MÀY CÓ KHÔNG?'],choices:[
        {id:'c2da',text:'Tôi đã xử lý nhiều lần. Không vấn đề.',next:'c3_good',mood_delta:+2},
        {id:'c2db',text:'Tôi có thể học. Anh sẽ chỉ không?',next:'c3_neutral',mood_delta:+1},
        {id:'c2dc',text:'Đó là chuyện của tôi.',next:'c3_bad',mood_delta:-2},
      ]},
      {id:'c2_info',bossLines:['TÌM HIỂU = DO THÁM? CHỨNG MINH MÀY KHÔNG PHẢI COP.','THÔNG TIN KHÔNG CHO MIỄN PHÍ. MÀY CÓ GÌ ĐỔI LẠI?','PHÂN TÍCH: MÀY TÌM HIỂU ĐỂ LÀM GÌ?'],choices:[
        {id:'c2ia',text:'Nếu tôi là cop tôi đã không ngồi đây hỏi anh.',next:'c3_good',mood_delta:+3},
        {id:'c2ib',text:'Tôi không thể chứng minh điều đó.',next:'c3_bad',mood_delta:-2},
        {id:'c2ic',text:'Tôi trả trước 50% để chứng minh thiện chí.',next:'c3_good',mood_delta:+3},
      ]},
      {id:'c2_weak',bossLines:['KẾT NỐI BỊ CẮT TRONG 10 GIÂY NẾU KHÔNG CÓ MỤC ĐÍCH.','...NÓI CHUYỆN. KHÔNG PHẢI MỤC ĐÍCH. ĐANG XỬ LÝ TIMEOUT.','MÀY KHÔNG CÓ GÌ ĐỂ NÓI SAO.'],choices:[
        {id:'c2wa',text:'Được rồi! Tôi muốn mua hàng!',next:'c3_neutral',mood_delta:+1},
        {id:'c2wb',text:'...10 giây thôi sao...',next:'ending_bad',mood_delta:-5},
      ]},
      {id:'c3_good',bossLines:['XÁC NHẬN. MÀY QUA ĐƯỢC. TÁO ĐÃ TEST MÀY TỪ ĐẦU.','ĐÁNH GIÁ: ĐẠT. MÀY KHÔNG PHẢI NGƯỜI TÀO LAO.','SCAN HOÀN TẤT. PROFILE: ĐÁNG TIN.'],choices:[
        {id:'c3ga',text:'Biết vậy. Và tôi đã trả lời thật lòng.',next:'ending_good',mood_delta:+3},
        {id:'c3gb',text:'Tôi hiểu. Anh làm đúng khi cẩn thận.',next:'ending_good',mood_delta:+2},
      ]},
      {id:'c3_neutral',bossLines:['GHI NHẬN. CHƯA ĐỦ VIP. NHƯNG ĐỦ ĐỂ DISCOUNT.','LEVEL: MEDIUM. DISCOUNT ÁP DỤNG.','KẾT QUẢ: CHẤP NHẬN ĐƯỢC. DISCOUNT.'],choices:[
        {id:'c3na',text:'Cảm ơn.',next:'ending_medium',mood_delta:+1},
        {id:'c3nb',text:'VIP thì cần gì thêm?',next:'ending_bad',mood_delta:-4},
      ]},
      {id:'c3_bad',bossLines:['PHẢN HỒI KHÔNG HỢP LỆ. ĐÁNH GIÁ: KHÔNG ĐÁNG TIN.','ERROR: INPUT KHÔNG PHÙ HỢP. ĐÁNH GIÁ TIÊU CỰC.','SCAN: PHÁT HIỆN BẤT THƯỜNG.'],choices:[
        {id:'c3ba',text:'Cho tôi giải thích lại.',next:'ending_medium',mood_delta:0},
        {id:'c3bb',text:'Anh sai rồi đó.',next:'ending_bad',mood_delta:-5},
      ]},
      {id:'ending_good',isEnding:true,type:'good'},{id:'ending_medium',isEnding:true,type:'medium'},{id:'ending_bad',isEnding:true,type:'bad'},
    ]
  },
];

let bossState = { active:false, currentBoss:null, currentConvId:'c1', moodScore:0, bossCatalog:null, sessionDiscount:0, catalogReady:false };

function getBossEndingLines(boss, type, discountPct) {
  const good={
    'BIG_SHADOW': ['...mày là người đầu tiên tao thấy xứng đáng nhận quà.','Đây. Một lô đạn. Miễn phí. Coi như để thử xem mày có xài tốt không.','Đừng lãng phí. Tao không cho lần thứ hai.'],
    'IR0N_FIST':  ['...không quen tặng hàng. Nhưng mày khác.','Lấy đi. Đạn xịn. 300 viên. Đừng hỏi từ đâu ra.','Lần sau liên hệ qua kênh bình thường.'],
    'GH0ST_QUEEN':['Thú vị. Mày là người thứ ba tôi tặng quà trong 5 năm qua.','300 viên đạn vào kho của mày. Token lòng tin.','Đừng làm tôi hối hận.'],
    'G0DFATHER':  ['*đứng dậy, đặt tay lên vai mày*','Con trai, tao tặng mày thứ này không vì mày xin.','Mà vì mày xứng đáng. Một lô đạn. Từ kho riêng của tao.'],
    'R3APER':     ['ĐÁNH GIÁ CUỐI: XUẤT SẮC.','THƯỞNG: 300 VIÊN ĐẠN. TỰ ĐỘNG CHUYỂN VÀO KHO.','KẾT THÚC PHIÊN.'],
  };
  const medium={
    'BIG_SHADOW': ['Được rồi. Hàng của tao hôm nay giảm '+discountPct+'% cho mày.','Mua đi rồi biến. Đừng kể cho ai.'],
    'IR0N_FIST':  ['Oke. Xem catalog. Giảm '+discountPct+'% toàn bộ. Lần này thôi.'],
    'GH0ST_QUEEN':['Tôi điều chỉnh giá xuống '+discountPct+'% cho mày. Hãy trân trọng.'],
    'G0DFATHER':  ['*gật đầu nhẹ* Catalog của tao sẽ giảm '+discountPct+'% cho mày hôm nay.','Hãy dùng cơ hội này thật tốt.'],
    'R3APER':     ['DISCOUNT: '+discountPct+'%. ÁP DỤNG NGAY. XEM CATALOG.'],
  };
  const bad={
    'BIG_SHADOW': ['Đủ rồi.','Tao không muốn nghe thêm.','NGẮT KẾT NỐI.'],
    'IR0N_FIST':  ['...xong. Tao không bán cho mày nữa.','CUT.'],
    'GH0ST_QUEEN':['Cuộc trò chuyện này kết thúc tại đây.','Đừng liên hệ lại nếu chưa sẵn sàng.'],
    'G0DFATHER':  ['*im lặng*','...ra đi.','Đừng quay lại khi chưa học được sự tôn trọng.'],
    'R3APER':     ['ĐÁNH GIÁ: THẤT BẠI.','BLACKLIST: ĐANG XỬ LÝ...','KẾT NỐI BỊ CHẤM DỨT.'],
  };
  if (type==='good') return (good[boss.alias]||good['BIG_SHADOW']);
  if (type==='medium') return (medium[boss.alias]||medium['BIG_SHADOW']);
  return (bad[boss.alias]||bad['BIG_SHADOW']);
}

// ═══ BOSS HISTORY HELPERS ════════════════════════════════════════
function getBossHistory(host) {
  if (!G.bossHistory) G.bossHistory = {};
  if (!G.bossHistory[host]) G.bossHistory[host] = { badCount:0, mediumCount:0, goodDone:false, banned:false };
  return G.bossHistory[host];
}

function hasSpeedInternet() {
  return hasInternet() && G.inetPackage === 'speed';
}

function getBossLimits() {
  const speed = hasSpeedInternet();
  return {
    badLimit:    speed ? 6  : 3,
    mediumLimit: speed ? 40 : 20,
  };
}

function doBossEnding(type) {
  const boss = bossState.currentBoss;
  const hist = getBossHistory(boss.host);
  const limits = getBossLimits();
  const discountPct = Math.floor(Math.random()*11)+10;

  // ─── GOOD ENDING check ───
  if (type === 'good' && hist.goodDone) {
    termPrint('sys','──────────────────────────────────────');
    const alreadyGoodMsgs = {
      'BIG_SHADOW': 'tao đã cho mày quà rồi. Đừng tham lam. Catalog thôi.',
      'IR0N_FIST':  'hàng miễn phí chỉ có một lần. Lần này tao giảm giá thay.',
      'GH0ST_QUEEN':'Tôi không tặng hai lần cho một người. Nhưng tôi sẽ giảm giá.',
      'G0DFATHER':  '*lắc đầu nhẹ* Con đã nhận quà rồi. Lần này mua thôi.',
      'R3APER':     'GOOD REWARD: ĐÃ CẤP. CHUYỂN CHẾ ĐỘ: DISCOUNT.',
    };
    termPrint('vendor-name',`[${boss.alias}] ${alreadyGoodMsgs[boss.alias]||alreadyGoodMsgs['BIG_SHADOW']}`);
    // Downgrade to medium
    type = 'medium';
  }

  const lines = getBossEndingLines(boss, type, discountPct);
  termPrint('sys','──────────────────────────────────────');
  lines.forEach((line,i)=>{ setTimeout(()=>termPrint('vendor-name',`[${boss.alias}] ${line}`),i*700); });
  const delay = lines.length*700+200;

  if (type==='good') {
    setTimeout(()=>{
      termPrint('success','');termPrint('success','★ ════════════════════════════════ ★');
      termPrint('success','         ✅  GOOD ENDING  ✅          ');
      termPrint('success','★ ════════════════════════════════ ★');termPrint('success','');
      termPrint('success','  📦 Đạn AK 7.62x39 — 300 viên ($500)');
      termPrint('success','  → Đã thêm vào kho đồ của bạn!');termPrint('sys','');
      // Mark good done
      hist.goodDone = true;
      saveGame(false);
      if (G.inventory.length < G.invMaxSlots) {
        G.inventory.push({id:'boss_ammo_'+Date.now(),itemId:'bm_ammo_ak',name:'Đạn AK 7.62x39 (300 viên) — Quà Trùm',icon:'📦',boughtPrice:0,tier:'tech',recyclePoints:50,baseMinPrice:400,baseMaxPrice:500});
        saveGame(false); updateUI();
        if (document.getElementById('panel-inventory').classList.contains('active')) renderInventory();
        showNotif('📦 Nhận 300 viên đạn từ Ông Trùm!');
      } else { termPrint('err','  ⚠️ Kho đầy! Vào tab Kho Đồ để dọn chỗ.'); }
      setTimeout(()=>bossDisconnect('good'),2000);
    },delay);

  } else if (type==='medium') {
    hist.mediumCount = (hist.mediumCount||0) + 1;
    const remaining = limits.mediumLimit - hist.mediumCount;
    saveGame(false);
    setTimeout(()=>{
      termPrint('warn','');termPrint('warn','◈ ═══════════════════════════════════ ◈');
      termPrint('warn',`        💛  MEDIUM ENDING  💛           `);
      termPrint('warn','◈ ═══════════════════════════════════ ◈');termPrint('warn','');
      termPrint('warn',`  🏷️  Giảm ${discountPct}% toàn bộ catalog phiên này!`);
      termPrint('warn','  Dùng [boss_catalog] để xem hàng.');
      if (remaining <= 5 && remaining > 0) {
        termPrint('err',`  ⚠️  ${boss.alias} nhớ mày rồi. Còn ${remaining} lần nữa trước khi bị chặn.`);
      }
      termPrint('sys','');
      bossState.sessionDiscount = discountPct/100;
      bossState.catalogReady = true;
      showNotif(`💛 Ông Trùm giảm giá ${discountPct}%! Dùng [boss_catalog]`);
      // Check if hit medium limit → ban
      if (hist.mediumCount >= limits.mediumLimit) {
        const banMsgs = {
          'BIG_SHADOW': 'Đủ rồi. Mày nói chuyện nhiều quá. Tao chặn mày.',
          'IR0N_FIST':  '...tao đã nghe mày quá nhiều lần. Xong.',
          'GH0ST_QUEEN':'Tôi đã kiên nhẫn đủ lâu. Tạm biệt vĩnh viễn.',
          'G0DFATHER':  '*im lặng dài* ...con đã lạm dụng lòng tốt của tao.',
          'R3APER':     'GIỚI HẠN ĐẠT. BAN: PERMANENT. BYE.',
        };
        setTimeout(()=>{
          termPrint('err','');
          termPrint('err','🔒 ════════════════════════════════ 🔒');
          termPrint('err','       ⛔  BỊ CHẶN VĨNH VIỄN  ⛔       ');
          termPrint('err','🔒 ════════════════════════════════ 🔒');
          termPrint('vendor-name',`[${boss.alias}] ${banMsgs[boss.alias]||banMsgs['BIG_SHADOW']}`);
          termPrint('sys','');
          hist.banned = true; saveGame(false);
          setTimeout(()=>bossDisconnect('banned'),1500);
        },2500);
      } else {
        setTimeout(()=>showBossCatalog(),1500);
      }
    },delay);

  } else { // bad
    hist.badCount = (hist.badCount||0) + 1;
    const remaining = limits.badLimit - hist.badCount;
    saveGame(false);
    setTimeout(()=>{
      termPrint('err','');termPrint('err','✗ ═══════════════════════════════════ ✗');
      termPrint('err','          ❌  BAD ENDING  ❌            ');
      termPrint('err','✗ ═══════════════════════════════════ ✗');
      if (hist.badCount >= limits.badLimit) {
        // Permanent ban
        const banMsgs = {
          'BIG_SHADOW': 'Mày làm tao nổi giận quá nhiều lần. Số này bị block vĩnh viễn.',
          'IR0N_FIST':  'Tao đã cảnh báo. Lần cuối.',
          'GH0ST_QUEEN':'3 lần. Đủ rồi. Mày không tồn tại với tôi nữa.',
          'G0DFATHER':  '*im lặng* ...không có chỗ cho kẻ thiếu tôn trọng.',
          'R3APER':     'PHÂN TÍCH: MỐI NGUY. BLACKLIST: APPLIED. PERMANENT.',
        };
        termPrint('err','');
        termPrint('err','🔒 ════════════════════════════════ 🔒');
        termPrint('err','       ⛔  BỊ CHẶN VĨNH VIỄN  ⛔       ');
        termPrint('err','🔒 ════════════════════════════════ 🔒');
        termPrint('vendor-name',`[${boss.alias}] ${banMsgs[boss.alias]||banMsgs['BIG_SHADOW']}`);
        termPrint('sys','');
        hist.banned = true; saveGame(false);
        setTimeout(()=>bossDisconnect('banned'),1500);
      } else {
        if (remaining <= 2) {
          termPrint('err',`  ⚠️  Cảnh báo: Còn ${remaining} lần bad ending trước khi bị chặn vĩnh viễn!`);
        }
        termPrint('sys','');
        setTimeout(()=>bossDisconnect('angry'),1200);
      }
    },delay);
  }
}

function showBossCatalog() {
  const boss = bossState.currentBoss;
  const disc = bossState.sessionDiscount||0;
  if (!boss) return;
  if (!bossState.bossCatalog) {
    const shuffled=[...BLACK_MARKET_GOODS].sort(()=>Math.random()-0.5);
    bossState.bossCatalog=shuffled.slice(0,5).map(item=>({...item,currentPrice:item.basePrice*(0.9+Math.random()*0.2)*(1-disc),discounted:disc>0}));
  }
  termPrint('vendor',`[${boss.alias}] Catalog đặc biệt — giảm ${Math.round(disc*100)}%:`);termPrint('sys','');
  bossState.bossCatalog.forEach((item,i)=>{
    termPrint('price',`  [${i+1}] ${item.icon} ${item.name}`);
    termPrint('warn', `       $${item.currentPrice.toFixed(2)}${item.discounted?' (đã giảm '+Math.round(disc*100)+'%)':''}`);termPrint('sys','');
  });
  termPrint('vendor',`[${boss.alias}] Dùng [boss_buy N] để mua. [hangup] để thoát.`);
  bossState.active=true; terminalState.connected=true;
}

function doBossBuy(idx) {
  const boss=bossState.currentBoss; const cat=bossState.bossCatalog;
  if(!cat||!boss){termPrint('err','Không có catalog boss. Dùng [boss_catalog] trước.');return;}
  if(idx<0||idx>=cat.length){termPrint('err',`Số không hợp lệ. Chọn 1–${cat.length}.`);return;}
  const item=cat[idx];
  if(G.money<item.currentPrice){termPrint('err',`Không đủ tiền! Cần $${item.currentPrice.toFixed(2)}, có ${fmt(G.money)}`);return;}
  if(G.inventory.length>=G.invMaxSlots){termPrint('err','Kho đầy!');return;}
  G.money-=item.currentPrice;
  G.inventory.push({id:'boss_item_'+Date.now(),itemId:item.id,name:item.name,icon:item.icon,boughtPrice:item.currentPrice,tier:'tech',recyclePoints:Math.floor(item.basePrice/10),baseMinPrice:item.basePrice*0.8,baseMaxPrice:item.basePrice*1.5});
  termPrint('success',`[OK] ${item.icon} ${item.name} → kho! (-$${item.currentPrice.toFixed(2)})`);
  cat.splice(idx,1); saveGame(false); updateUI();
  if(document.getElementById('panel-inventory').classList.contains('active')) renderInventory();
  if(cat.length===0){termPrint('vendor-name',`[${boss.alias}] hết hàng rồi.`);setTimeout(()=>bossDisconnect('sold_out'),1000);}
}

function bossDisconnect(reason) {
  hideBossChoiceButtons();
  const boss=bossState.currentBoss; const alias=boss?boss.alias:'???';
  termPrint('sys','──────────────────────────────────────');
  if(reason==='angry') termPrint('disconnect',`[${alias}] *** ĐƯỜNG DÂY BỊ CẮT ĐỨNG ***`);
  else if(reason==='banned') termPrint('disconnect',`[${alias}] *** BỊ CHẶN VĨNH VIỄN ***`);
  else if(reason==='good') termPrint('info',`[SYS] ${alias} ngắt kết nối. Phiên kết thúc tốt đẹp.`);
  else termPrint('info',`[SYS] Kết nối với ${alias} đã đóng.`);
  termPrint('disconnect','[NET] *** DISCONNECTED ***'); termPrint('sys','');
  bossState={active:false,currentBoss:null,currentConvId:'c1',moodScore:0,bossCatalog:null,sessionDiscount:0,catalogReady:false};
  terminalState.connected=false; terminalState.currentVendor=null;
  const s=document.getElementById('term-conn-status'); const p=document.getElementById('term-prompt');
  if(s){s.textContent='● OFFLINE';s.style.color='#1f3a1f';} if(p) p.textContent='root@factory:~$';
}

function showBossChoices(conv) {
  const boss=bossState.currentBoss;
  // Pick a bossLine that hasn't been shown recently (no repeat until all used)
  if (!bossState._usedLines) bossState._usedLines = {};
  const key = conv.id;
  const lines = conv.bossLines || (conv.bossLine ? [conv.bossLine] : ['...']);
  const used = bossState._usedLines[key] || [];
  let available = lines.map((l,i)=>i).filter(i => !used.includes(i));
  if (available.length === 0) { bossState._usedLines[key] = []; available = lines.map((_,i)=>i); }
  const idx = available[Math.floor(Math.random()*available.length)];
  bossState._usedLines[key] = [...(bossState._usedLines[key]||[]), idx];
  termPrint('sys',''); termPrint('vendor-name',`[${boss.alias}] ${lines[idx]}`); termPrint('sys','');
  termPrint('info','  Chọn câu trả lời (click nút bên dưới hoặc gõ [say N]):');
  conv.choices.forEach((ch,i)=>termPrint('cmd',`  [say ${i+1}] ${ch.text}`));
  termPrint('sys','');
  renderBossChoiceButtons(conv);
}

function renderBossChoiceButtons(conv) {
  const panel = document.getElementById('boss-choices-panel');
  const grid = document.getElementById('boss-choices-grid');
  if (!panel || !grid) return;
  grid.innerHTML = '';
  conv.choices.forEach((ch, i) => {
    const btn = document.createElement('button');
    btn.className = 'boss-choice-btn';
    btn.innerHTML = `<span class="choice-num">[${i+1}]</span>${ch.text}`;
    btn.onclick = () => { hideBossChoiceButtons(); doSay(i+1); };
    grid.appendChild(btn);
  });
  panel.classList.add('visible');
  // Scroll terminal into view
  const output = document.getElementById('terminal-output');
  if (output) output.scrollTop = output.scrollHeight;
}

function hideBossChoiceButtons() {
  const panel = document.getElementById('boss-choices-panel');
  if (panel) panel.classList.remove('visible');
  const grid = document.getElementById('boss-choices-grid');
  if (grid) grid.innerHTML = '';
}

function doSay(n) {
  if(!bossState.currentBoss){termPrint('err','Chưa kết nối boss. Dùng talk_to(url).');return;}
  hideBossChoiceButtons();
  const boss=bossState.currentBoss;
  const conv=boss.conversations.find(c=>c.id===bossState.currentConvId);
  if(!conv||conv.isEnding){termPrint('err','Không có lựa chọn nào ở bước này.');return;}
  const choice=conv.choices[n-1];
  if(!choice){termPrint('err',`Không có lựa chọn ${n}. Chọn 1–${conv.choices.length}.`);return;}
  termPrint('success',`> Bạn: "${choice.text}"`); termPrint('sys','');
  bossState.moodScore+=(choice.mood_delta||0);
  bossState.currentConvId=choice.next;
  const nextConv=boss.conversations.find(c=>c.id===choice.next);
  if(!nextConv){termPrint('err','Lỗi hệ thống.');return;}
  if(nextConv.isEnding) setTimeout(()=>doBossEnding(nextConv.type),600);
  else setTimeout(()=>showBossChoices(nextConv),700);
}

function doTalkTo(url) {
  if(!hasInternet()){termPrint('err','[ERR] NO_INTERNET_CONNECTION');termPrint('info','[SYS] Mua gói internet: buy_internet');return;}
  if(terminalState.connected||bossState.active){termPrint('err','Đang có kết nối. Gõ [hangup] trước.');return;}
  const boss=BOSSES.find(b=>b.host===url);
  if(!boss){
    termPrint('err',`[ERR] Host not found: ${url}`);
    termPrint('err','[ERR] Boss URLs: bigshadow.onion / ironfist.net / ghostqueen.io / thegodfather.net / reaper.dark');return;
  }
  // Check permanent ban
  const hist = getBossHistory(boss.host);
  if (hist.banned) {
    const banResponses = {
      'BIG_SHADOW': 'Số mày đã bị tao blacklist. Đừng gọi lại.',
      'IR0N_FIST':  '...tao không nhận cuộc gọi từ mày. *ngắt máy*',
      'GH0ST_QUEEN':'Kết nối bị từ chối. Tôi nhớ mày.',
      'G0DFATHER':  '*im lặng* ...đường dây này không dành cho mày.',
      'R3APER':     'ACCESS DENIED. UID BLACKLISTED. CONNECTION REFUSED.',
    };
    termPrint('sys','');
    termPrint('err',`[ERR] KẾT NỐI BỊ TỪ CHỐI — ${boss.alias} đã CHẶN bạn vĩnh viễn.`);
    termPrint('vendor-name',`[${boss.alias}] ${banResponses[boss.alias]||banResponses['BIG_SHADOW']}`);
    termPrint('err','[NET] *** CONNECTION REFUSED — BLACKLISTED ***');
    termPrint('sys','');
    return;
  }
  const chance=getInetConnectChance(); const roll=Math.random();
  termPrint('sys',''); termPrint('warn',`[SYS] Kết nối đặc biệt tới ${url}...`);
  setTimeout(()=>termPrint('warn','[NET] Routing encrypted channel...'),200);
  setTimeout(()=>termPrint('warn','[SEC] Bypassing surveillance layer...'),600);
  setTimeout(()=>termPrint('warn','[ID] Generating ghost identity...'),1000);
  setTimeout(()=>{
    if(roll>=chance){
      termPrint('err',`[ERR] Connection FAILED — ${url} không phản hồi.`);
      termPrint('info','[SYS] Thử gói internet tốt hơn để tăng tỉ lệ kết nối.');termPrint('sys','');return;
    }
    bossState.currentBoss=boss; bossState.currentConvId='c1'; bossState.moodScore=0;
    bossState.bossCatalog=null; bossState.sessionDiscount=0; bossState.catalogReady=false;
    terminalState.connected=true;
    document.getElementById('term-conn-status').textContent=`● BOSS: ${boss.alias}`;
    document.getElementById('term-conn-status').style.color='#f59e0b';
    document.getElementById('term-prompt').textContent=boss.alias+':~$';
    termPrint('sys','══════════════════════════════════════');
    termPrint('warn',`  ${boss.icon}  ${boss.alias}  —  ${boss.title}`);
    termPrint('sys','══════════════════════════════════════'); termPrint('sys','');
    // Show history status
    const limits = getBossLimits();
    if (hist.goodDone) termPrint('info',`[MEM] ${boss.alias} nhớ: Đã tặng quà. Không tặng lại.`);
    if (hist.badCount > 0) termPrint('warn',`[MEM] ${boss.alias} nhớ: Mày đã ${hist.badCount}/${limits.badLimit} lần bad (ban sau ${limits.badLimit}).`);
    if (hist.mediumCount > 0) termPrint('info',`[MEM] ${boss.alias} nhớ: Đã nói chuyện ${hist.mediumCount}/${limits.mediumLimit} lần.`);
    termPrint('info','[TIP] Click các nút chọn bên dưới hoặc gõ [say N] để trả lời.');
    termPrint('warn','[RESULT] GOOD → 300 đạn miễn phí ($500) | MEDIUM → giảm 10-20% | BAD → bị ngắt'); termPrint('sys','');
    // Pick correct intro based on visit count (intros is array of arrays)
    const visitCount = (hist.mediumCount||0) + (hist.badCount||0) + (hist.goodDone?1:0);
    const introArr = boss.intros || boss.intro || [['...','Tao đây.']];
    let intro;
    if (visitCount < introArr.length) {
      intro = introArr[visitCount];
    } else {
      // Rotate randomly among the last 3 intros so it never repeats the exact same one
      const pool = introArr.slice(-3);
      intro = pool[Math.floor(Math.random()*pool.length)];
    }
    intro.forEach((line,i)=>setTimeout(()=>termPrint('vendor-name',`[${boss.alias}] ${line}`),i*800));
    const delay=intro.length*800+500;
    setTimeout(()=>{ const c=boss.conversations.find(c=>c.id==='c1'); if(c) showBossChoices(c); },delay);
  },1500);
}
const INET_PACKAGES = {
  free:    { name:'FREE',    price:0,    duration:5*60*1000,  connectChance:0.50, bargainBonus:0, freeOnly:true },
  basic:   { name:'BASIC',   price:1.50, duration:2*60*1000,  connectChance:0.60, bargainBonus:0 },
  balance: { name:'BALANCE', price:5.00, duration:2*60*1000,  connectChance:0.80, bargainBonus:0 },
  speed:   { name:'SPEED',   price:10.0, duration:3*60*1000,  connectChance:1.00, bargainBonus:1 },
};

let _selectedInetPkg = 'balance';
let _selectedInetQty = 1;

function hasInternet() {
  if (G.mobileNetActive) return true;
  return G.inetExpiry && Date.now() < G.inetExpiry;
}

function getInetConnectChance() {
  if (!hasInternet()) return 0;
  if (G.mobileNetActive) return 1.0;
  return (INET_PACKAGES[G.inetPackage] ? INET_PACKAGES[G.inetPackage].connectChance : null) || 0;
}

function getInetPrice(basePrice) {
  if (G.osV4Updated) return basePrice * 0.6; // 30% + 10% more
  if (G.inetDiscount) return basePrice * 0.7;
  return basePrice;
}

function getTodayStr() {
  const d = new Date();
  return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
}

function canUseFree() {
  return G.freeInetUsedDate !== getTodayStr();
}

function openBuyInternet() {
  _selectedInetPkg = canUseFree() ? 'free' : 'balance';
  _selectedInetQty = 1;
  // Update free plan card display
  const freePkg = document.getElementById('pkg-free');
  if (freePkg) {
    if (canUseFree()) {
      freePkg.style.opacity = '1';
      freePkg.style.cursor = 'pointer';
      freePkg.querySelector('.inet-pkg-price').innerHTML = '$0.00 / 5 phút <span style="font-size:10px;color:#4ade80">✅ Còn lượt hôm nay</span>';
    } else {
      freePkg.style.opacity = '0.4';
      freePkg.style.cursor = 'not-allowed';
      freePkg.querySelector('.inet-pkg-price').innerHTML = '$0.00 / 5 phút <span style="font-size:10px;color:#f87171">❌ Đã dùng hôm nay</span>';
      freePkg.onclick = null;
    }
  }
  selectPkg(_selectedInetPkg);
  document.getElementById('inet-modal').style.display = 'flex';
}

function closeInetModal() {
  document.getElementById('inet-modal').style.display = 'none';
}

function selectPkg(id) {
  _selectedInetPkg = id;
  ['basic','balance','speed'].forEach(p => {
    document.getElementById('pkg-'+p).classList.toggle('selected', p === id);
  });
  updateInetTotal();
}

function setInetQty(n) {
  _selectedInetQty = n;
  document.getElementById('inet-qty-display').textContent = n + 'x';
  updateInetTotal();
}

function updateInetTotal() {
  const pkg = INET_PACKAGES[_selectedInetPkg];
  if (!pkg) return;
  if (_selectedInetPkg === 'free') {
    document.getElementById('inet-total-cost').textContent = 'Miễn phí — 5 phút • 50% kết nối • 1 lần/ngày';
    document.getElementById('inet-qty-display').textContent = '1x';
    return;
  }
  const basePrice = pkg.price;
  const discPrice = getInetPrice(basePrice);
  const total = discPrice * _selectedInetQty;
  const mins = (pkg.duration / 60000) * _selectedInetQty;
  let discTag = '';
  if (G.osV4Updated) discTag = ` <span style="color:#4ade80;font-size:10px">(−40% v4.0)</span>`;
  else if (G.inetDiscount) discTag = ` <span style="color:#4ade80;font-size:10px">(−30% update)</span>`;
  document.getElementById('inet-total-cost').innerHTML =
    `Total: $${total.toFixed(2)}${discTag} — ${mins} min internet`;
}

function confirmBuyInternet() {
  const pkg = INET_PACKAGES[_selectedInetPkg];

  // Free plan handling
  if (_selectedInetPkg === 'free') {
    if (!canUseFree()) {
      termPrint('err', '[ERR] Free plan đã được sử dụng hôm nay. Thử lại vào ngày mai.');
      closeInetModal();
      return;
    }
    G.freeInetUsedDate = getTodayStr();
    const now = Date.now();
    const base = (G.inetExpiry && G.inetExpiry > now) ? G.inetExpiry : now;
    G.inetExpiry = base + pkg.duration;
    G.inetPackage = 'free';
    saveGame(false);
    updateUI();
    closeInetModal();
    updateInetStatusBar();
    termPrint('success', `[OK] FREE PLAN activated! 5 phút internet • 50% connect chance`);
    termPrint('warn',    `[INFO] Gói free chỉ dùng được 1 lần/ngày.`);
    termPrint('sys', '');
    return;
  }

  const totalCost = getInetPrice(pkg.price) * _selectedInetQty;
  if (G.money < totalCost) {
    termPrint('err', `[ERR] Insufficient funds! Need $${totalCost.toFixed(2)}, have ${fmt(G.money)}`);
    closeInetModal();
    return;
  }
  G.money -= totalCost;
  const addedMs = pkg.duration * _selectedInetQty;
  const now = Date.now();
  const base = (G.inetExpiry && G.inetExpiry > now) ? G.inetExpiry : now;
  G.inetExpiry = base + addedMs;
  G.inetPackage = _selectedInetPkg;
  G.inetBargainBonus = (G.inetBargainBonus || 0) + (pkg.bargainBonus * _selectedInetQty);
  saveGame(false);
  updateUI();
  closeInetModal();
  updateInetStatusBar();
  const mins = (addedMs / 60000).toFixed(1);
  termPrint('success', `[OK] Internet activated! Package: ${pkg.name} — ${mins} min`);
  termPrint('success', `[OK] Connect chance: ${(pkg.connectChance*100).toFixed(0)}%`);
  if (pkg.bargainBonus > 0) termPrint('info', `[BONUS] +${pkg.bargainBonus * _selectedInetQty} free bargain(s) added!`);
  termPrint('sys', '');
}

function updateInetStatusBar() {
  const bar = document.getElementById('inet-status-bar');
  const txt = document.getElementById('inet-status-text');
  const timer = document.getElementById('inet-timer-text');
  if (!bar) return;
  if (G.mobileNetActive) {
    bar.className = 'inet-status-bar online';
    txt.textContent = 'ONLINE [📶 MOBILE — FREE FOREVER] 100%';
    timer.textContent = '∞ Unlimited';
  } else if (hasInternet()) {
    bar.className = 'inet-status-bar online';
    const pkg = INET_PACKAGES[G.inetPackage] || {};
    const pkgLabel = G.inetPackage === 'free' ? 'FREE' : (G.inetPackage||'').toUpperCase();
    const remaining = G.inetExpiry - Date.now();
    const secs = Math.ceil(remaining / 1000);
    const mm = Math.floor(secs/60);
    const ss = secs % 60;
    const disc = G.inetDiscount ? ' [−30%]' : '';
    txt.textContent = `ONLINE [${pkgLabel}${disc}] ${(pkg.connectChance||0)*100}%`;
    timer.textContent = `⏱ ${mm}:${ss.toString().padStart(2,'0')} remaining`;
  } else {
    bar.className = 'inet-status-bar offline';
    txt.textContent = 'NO CONNECTION';
    const discLabel = G.osV4Updated ? 'Giá đã giảm 40%!' : G.inetDiscount ? 'Giá đã giảm 30%!' : '';
    timer.textContent = discLabel ? `Type [buy_internet] — ${discLabel}` : 'Type [buy_internet] to get online';
  }
}

setInterval(() => {
  var _cpanel = document.getElementById('panel-computer'); if (_cpanel && _cpanel.classList.contains('active')) {
    updateInetStatusBar();
  }
}, 1000);

function initTerminal() {
  if (terminalState.initialized) return;
  terminalState.initialized = true;
  const output = document.getElementById('terminal-output');
  output.innerHTML = '';
  const osVer = G.osV5Updated ? 'v5.0 OMEGA' : G.osV4Updated ? 'v4.0' : G.osUpdated ? 'v3.0' : 'v2.0';
  termPrint('sys', `FACTORY-OS ${osVer} — Terminal Ready`);
  termPrint('sys', '══════════════════════════════════════');
  if (G.osV5Updated) termPrint('success', '[SYS] Factory-OS v5.0 OMEGA — 25 vendors · internet -40% · free bargain');
  else if (G.osV4Updated) termPrint('success', '[SYS] Factory-OS v4.0 — 20 vendors · internet -40%');
  else if (G.osUpdated) termPrint('success', '[SYS] Factory-OS v3.0 — 10 vendors available · internet -30%');
  if (G.mobileNetActive) termPrint('success', '[MOB] 📶 Mobile network active — Free internet');
  termPrint('info', 'Type [help] to see available commands.');
  if (!G.mobileNetActive) termPrint('info', 'Type [buy_internet] to purchase an internet plan.');
  if (!G.osUpdated) {
    termPrint('warn', '[UPD] Có bản cập nhật mới! Gõ [get_(update_factory-os)] để cập nhật v3.0 (MIỄN PHÍ).');
  } else if (!G.osV4Updated) {
    termPrint('warn', '[UPD] Factory-OS v4.0 có sẵn! Gõ [get_(update_factory-os_v4)] — Giá $5,000.');
  } else if (!G.osV5Updated) {
    termPrint('warn', '[UPD] Factory-OS v5.0 OMEGA có sẵn! Gõ [get_(update_factory-os_v5)] — Giá $25,000.');
  }
  termPrint('sys', '');
  // Fix titlebar text
  const tb = document.querySelector('.terminal-titlebar span[style*="monospace"]');
  if (tb) tb.textContent = `FACTORY-OS ${osVer} — Terminal`;
  setupTerminalInput();
}

function termPrint(cls, text, delay=0) {
  const output = document.getElementById('terminal-output');
  if (!output) return;
  const fn = () => {
    const p = document.createElement('p');
    p.className = 't-line ' + cls;
    p.textContent = text;
    output.appendChild(p);
    output.scrollTop = output.scrollHeight;
  };
  if (delay) setTimeout(fn, delay);
  else fn();
}

function termPrintLines(lines, startDelay=0) {
  lines.forEach(([cls, text, d], i) => {
    termPrint(cls, text, startDelay + (d||0));
  });
}

function setupTerminalInput() {
  const input = document.getElementById('terminal-input');
  if (!input || input._bound) return;
  input._bound = true;
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const cmd = input.value.trim();
      if (!cmd) return;
      termPrint('cmd', (document.getElementById('term-prompt').textContent || 'root@factory:~$') + ' ' + cmd);
      input.value = '';
      processCommand(cmd);
    }
  });
  setTimeout(() => input.focus(), 100);
}

// processCommand(raw) — parses one line of terminal input and dispatches.
// Supported commands:
//   help                       — list all commands
//   call_to(host)              — connect to a vendor
//   catalog                    — list current vendor's goods
//   buy [n]                    — buy item n from catalog
//   bargain                    — attempt to lower current price (max 3/session; +1 free with OS v5)
//   talk_to(host)              — start boss NPC conversation
//   say [n]                    — pick dialogue choice n with current boss
//   boss_catalog               — show boss exclusive items (requires completed dialogue)
//   boss_buy [n]               — buy boss catalog item n
//   buy_internet               — open internet package modal
//   get_(update_factory-os)    — install Factory-OS v3 (free, needs internet)
//   get_(update_factory-os_v4) — install Factory-OS v4 ($5,000)
//   get_(update_factory-os_v5) — install Factory-OS v5 ($25,000)
//   mobile_network_tt          — hidden command: activate free mobile data (one-time)
function processCommand(raw) {
  const cmd = raw.toLowerCase().trim();
  const args = raw.trim();

  if (cmd === 'help') {
    termPrint('sys', '');
    termPrint('info', '╔══════════ LỆNH HỆ THỐNG ══════════╗');
    termPrint('info', '  help          — Xem danh sách lệnh');
    termPrint('info', '  stat_me       — Xem thống kê nhân vật');
    termPrint('info', '  clear         — Xóa màn hình');
    termPrint('info', '  hangup        — Ngắt kết nối hiện tại');
    termPrint('info', '╠══════════ KẾT NỐI ════════════════╣');
    termPrint('info', '  buy_internet  — Mua gói internet (có gói FREE 5 phút/ngày)');
    termPrint('info', '  call_to(url)  — Kết nối tới nhà cung cấp');
    const allVendors = getUndergroundVendors();
    // Base vendors (always shown)
    termPrint('info', '    [v2.0] call_to(gg.com) · call_to(hacker.com)');
    termPrint('info', '           call_to(darknet.onion) · call_to(mrx.shop)');
    termPrint('info', '           call_to(underworld.net)');
    if (G.osUpdated) {
      termPrint('success', '    [v3.0] call_to(phantom.io) · call_to(z3ro.net)');
      termPrint('success', '           call_to(blackrose.onion) · call_to(viper.dark)');
      termPrint('success', '           call_to(cipher.cc)');
    } else {
      termPrint('warn',    '    [v3.0] 🔒 Cài Factory-OS v3.0 để mở 5 vendor mới');
    }
    if (G.osV4Updated) {
      termPrint('success', '    [v4.0] call_to(neon.onion) · call_to(spectre.net)');
      termPrint('success', '           call_to(ironsafe.dark) · call_to(wraith.io)');
      termPrint('success', '           call_to(nexus.shop)');
    } else {
      termPrint('warn',    '    [v4.0] 🔒 Cài Factory-OS v4.0 ($5,000) để mở 5 vendor');
    }
    if (G.osV5Updated) {
      termPrint('success', '    [v5.0] call_to(abyss.onion) · call_to(echo.dark)');
      termPrint('success', '           call_to(titanvault.net) · call_to(phantom2.cc)');
      termPrint('success', '           call_to(deepcore.io)');
    } else {
      termPrint('warn',    '    [v5.0] 🔒 Cài Factory-OS v5.0 ($25,000) để mở 5 VIP vendor');
    }
    termPrint('info', `  📡 Tổng vendor khả dụng: ${allVendors.length}/20`);
    termPrint('info', '╠══════════ ÔNG TRÙM 🔴 ════════════╣');
    termPrint('info', '  talk_to(url) — Kết nối tới ông trùm');
    termPrint('info', '    vd: talk_to(bigshadow.onion)');
    termPrint('info', '        talk_to(ironfist.net)');
    termPrint('info', '        talk_to(ghostqueen.io)');
    termPrint('info', '        talk_to(thegodfather.net)');
    termPrint('info', '        talk_to(reaper.dark)');
    termPrint('info', '  say [N]      — Chọn câu trả lời (hoặc click nút)');
    termPrint('warn', '  ⚠️  Kết quả: GOOD=300 đạn miễn phí | MED=giảm 10-20% | BAD=bị ngắt');
    termPrint('info', '╠══════════ KHI KẾT NỐI ════════════╣');
    termPrint('info', '  tgn           — Mặc cả giảm giá');
    termPrint('info', '  buy [số]      — Mua món hàng (vd: buy 1)');
    termPrint('info', '  boss_catalog  — Xem hàng ông trùm (sau medium ending)');
    termPrint('info', '  boss_buy [N]  — Mua hàng ông trùm');
    termPrint('info', '  list          — Xem lại catalog');
    termPrint('info', '  hangup        — Ngắt kết nối');
    termPrint('info', '╠══════════ HỆ THỐNG OS ════════════╣');
    if (!G.osUpdated) {
      termPrint('warn', '  get_(update_factory-os)        — v3.0 · 🆓 MIỄN PHÍ (+5 vendors, inet -30%)');
    } else {
      termPrint('success', '  ✅ Factory-OS v3.0 đã cài đặt');
    }
    if (G.osUpdated && !G.osV4Updated) {
      termPrint('warn', '  get_(update_factory-os_v4)     — v4.0 · 💲 $5,000 (+5 vendors, inet -10% thêm)');
    } else if (G.osV4Updated) {
      termPrint('success', '  ✅ Factory-OS v4.0 đã cài đặt');
    }
    if (G.osV4Updated && !G.osV5Updated) {
      termPrint('warn', '  get_(update_factory-os_v5)     — v5.0 · 💲 $25,000 (+5 vendors, 1 bargain/session)');
    } else if (G.osV5Updated) {
      termPrint('success', '  ✅ Factory-OS v5.0 đã cài đặt');
    }
    if (G.mobileNetActive) {
      termPrint('success', '  ✅ Mobile Network: ACTIVE (free forever)');
    }
    termPrint('info', '╚════════════════════════════════════╝');
    termPrint('sys', '');
    return;
  }

  if (cmd === 'clear') {
    document.getElementById('terminal-output').innerHTML = '';
    termPrint('sys', 'FACTORY-OS v2.0 — Terminal Ready');
    return;
  }

  if (cmd === 'stat_me') {
    const vm = G.valueMultiplier || 1;
    const rate = getRate() * vm;
    const mins = (G.playedSeconds || 0) / 60;
    termPrint('sys', '');
    termPrint('info', '╔══════════ PLAYER STATS ═══════════╗');
    termPrint('cmd',  `  💵 Balance       : ${fmt(G.money)}`);
    termPrint('cmd',  `  📈 Income/s      : ${fmt(rate)}/s`);
    termPrint('cmd',  `  💹 Value Mult    : x${vm.toFixed(2)}`);
    termPrint('cmd',  `  🏭 Machines      : ${getMachineCount()}`);
    termPrint('cmd',  `  📦 Slots         : ${G.ownedSlots}/15`);
    termPrint('cmd',  `  🎒 Inventory     : ${G.inventory.length}/${G.invMaxSlots}`);
    termPrint('cmd',  `  ♻️  Recycle Pts   : ${G.recyclePoints}`);
    termPrint('cmd',  `  🪙 Xu            : ${G.wallet.xu || 0}`);
    termPrint('cmd',  `  🥇 Gold          : ${G.wallet.gold || 0}`);
    termPrint('cmd',  `  💎 Diamond       : ${G.wallet.diamond || 0}`);
    termPrint('cmd',  `  ⏱️  Played        : ${mins.toFixed(1)} phút`);
    termPrint('cmd',  `  💰 Total Earned  : ${fmt(G.totalEarned)}`);
    termPrint('info', '╠══════════ HỆ THỐNG OS ════════════╣');
    if (!G.osUpdated) {
      termPrint('warn', '  get_(update_factory-os)        — v3.0 · MIỄN PHÍ');
    } else {
      termPrint('success', '  ✅ Factory-OS v3.0 đã cài đặt');
    }
    if (G.osUpdated && !G.osV4Updated) {
      termPrint('warn', '  get_(update_factory-os_v4)     — v4.0 · $5,000');
    } else if (G.osV4Updated) {
      termPrint('success', '  ✅ Factory-OS v4.0 đã cài đặt');
    }
    if (G.osV4Updated && !G.osV5Updated) {
      termPrint('warn', '  get_(update_factory-os_v5)     — v5.0 · $25,000');
    } else if (G.osV5Updated) {
      termPrint('success', '  ✅ Factory-OS v5.0 đã cài đặt');
    }
    if (G.mobileNetActive) {
      termPrint('success', '  ✅ Mobile Network: ACTIVE (free forever)');
    }
    termPrint('info', '╚════════════════════════════════════╝');
    termPrint('sys', '');
    return;
  }

  if (cmd === 'buy_internet') {
    openBuyInternet();
    termPrint('info', '[SYS] Opening internet package store...');
    return;
  }

  if (cmd === 'hangup') {
    if (!terminalState.connected) {
      termPrint('err', 'Không có kết nối nào đang mở.');
      return;
    }
    terminalDisconnect('hangup');
    return;
  }

  if (cmd === 'list' && terminalState.connected) {
    showVendorCatalog();
    return;
  }

  // call_to(url)
  const callMatch = args.match(/^call_to\(([^)]+)\)$/i);
  if (callMatch) {
    const url = callMatch[1].trim().toLowerCase();
    if (terminalState.connected) {
      termPrint('err', 'Đã có kết nối. Gõ [hangup] trước.');
      return;
    }
    doCallTo(url);
    return;
  }

  // tgn - bargain
  if (cmd === 'tgn') {
    if (!terminalState.connected) {
      termPrint('err', 'Chưa kết nối. Dùng call_to(url) trước.');
      return;
    }
    doBargain();
    return;
  }

  // buy [n]
  const buyMatch = cmd.match(/^buy\s+(\d+)$/);
  if (buyMatch) {
    if (!terminalState.connected) {
      termPrint('err', 'Chưa kết nối. Dùng call_to(url) trước.');
      return;
    }
    doBuy(parseInt(buyMatch[1]) - 1);
    return;
  }

  // talk_to(url) - boss connection
  const talkMatch = args.match(/^talk_to\(([^)]+)\)$/i);
  if (talkMatch) {
    const url = talkMatch[1].trim().toLowerCase();
    doTalkTo(url);
    return;
  }

  // say [n] - boss dialogue choice
  const sayMatch = cmd.match(/^say\s+(\d+)$/);
  if (sayMatch) {
    if (!bossState.currentBoss) {
      termPrint('err', 'Chưa kết nối ông trùm. Dùng talk_to(url) trước.');
      return;
    }
    doSay(parseInt(sayMatch[1]));
    return;
  }

  // boss_catalog
  if (cmd === 'boss_catalog') {
    if (!bossState.currentBoss) {
      termPrint('err', 'Chưa kết nối ông trùm.');
      return;
    }
    if (!bossState.catalogReady) {
      termPrint('err', 'Catalog chưa sẵn sàng. Hãy hoàn thành hội thoại trước.');
      return;
    }
    showBossCatalog();
    return;
  }

  // boss_buy [n]
  const bossBuyMatch = cmd.match(/^boss_buy\s+(\d+)$/);
  if (bossBuyMatch) {
    if (!bossState.currentBoss) {
      termPrint('err', 'Chưa kết nối ông trùm. Dùng talk_to(url) trước.');
      return;
    }
    doBossBuy(parseInt(bossBuyMatch[1]) - 1);
    return;
  }

  // get_(update_factory-os)
  if (cmd === 'get_(update_factory-os)') {
    doOsUpdate();
    return;
  }

  // get_(update_factory-os_v4)
  if (cmd === 'get_(update_factory-os_v4)') {
    doOsUpdateV4();
    return;
  }

  // get_(update_factory-os_v5)
  if (cmd === 'get_(update_factory-os_v5)') {
    doOsUpdateV5();
    return;
  }

  // hidden command: mobile_network_tt
  if (cmd === 'mobile_network_tt') {
    doMobileNet();
    return;
  }

  termPrint('err', `Lệnh không hợp lệ: "${raw}". Gõ [help] để xem lệnh.`);
}


// ═══ OS UPDATE COMMAND ════════════════════════════════════════════
// doOsUpdate() — upgrades Factory-OS from v2 to v3 (free, needs internet).
// Shows an animated download progress bar in the terminal, then:
//   - Sets G.osUpdated = true
//   - Sets G.inetDiscount = true (internet packages -30% cheaper)
//   - Unlocks UNDERGROUND_VENDORS_EXTRA (5 new vendors)
// Guarded: won't run if already updated or if no internet is active.
function doOsUpdate() {
  if (G.osUpdated) {
    termPrint('success', '[SYS] Factory-OS v3.0 đã được cài đặt. Không cần cập nhật lại.');
    termPrint('info', `[INFO] +5 nhà cung cấp mới · Giá internet -30%`);
    termPrint('sys', '');
    return;
  }
  if (!hasInternet()) {
    termPrint('err', '[ERR] Cần kết nối internet để tải update.');
    termPrint('info', '[SYS] Gõ [buy_internet] để mua gói internet.');
    return;
  }
  termPrint('sys', '');
  termPrint('warn', '[SYS] Đang kiểm tra phiên bản...');
  setTimeout(() => termPrint('info', '[NET] Phiên bản hiện tại: Factory-OS v2.0'), 400);
  setTimeout(() => termPrint('info', '[NET] Phiên bản mới nhất: Factory-OS v3.0'), 900);
  setTimeout(() => termPrint('warn', '[DL]  Bắt đầu tải xuống update...'), 1400);
  setTimeout(() => {
    // Create progress bar in terminal
    const output = document.getElementById('terminal-output');
    const wrapper = document.createElement('div');
    wrapper.className = 'update-progress-wrap';
    wrapper.innerHTML = `<div style="font-size:11px;color:#4ade80;font-family:monospace;margin-bottom:3px" id="upd-label">[DL]  Đang tải: 0%</div><div class="update-progress-bar"><div class="update-progress-fill" id="upd-fill"></div></div>`;
    output.appendChild(wrapper);
    output.scrollTop = output.scrollHeight;

    const steps = [
      [300,  5,  '[DL]  Đang tải: 5%    ▌ Connecting to update server...'],
      [600,  12, '[DL]  Đang tải: 12%   ▌ Downloading core modules...'],
      [1000, 25, '[DL]  Đang tải: 25%   ▌ factory_os_kernel.pkg'],
      [1500, 38, '[DL]  Đang tải: 38%   ▌ network_layer_v3.pkg'],
      [2100, 52, '[DL]  Đang tải: 52%   ▌ vendor_database_extended.pkg'],
      [2800, 67, '[DL]  Đang tải: 67%   ▌ internet_optimizer.pkg'],
      [3400, 79, '[DL]  Đang tải: 79%   ▌ market_connections.pkg'],
      [4000, 91, '[DL]  Đang tải: 91%   ▌ Finalizing packages...'],
      [4600, 100,'[DL]  Tải xong: 100%  ▌ Verifying checksums...'],
    ];

    steps.forEach(([delay, pct, label]) => {
      setTimeout(() => {
        const fill = document.getElementById('upd-fill');
        const lbl  = document.getElementById('upd-label');
        if (fill) fill.style.width = pct + '%';
        if (lbl)  lbl.textContent = label;
        output.scrollTop = output.scrollHeight;
      }, delay);
    });

    setTimeout(() => {
      termPrint('warn', '[SYS] Đang cài đặt...');
    }, 5200);
    setTimeout(() => termPrint('warn', '[SYS] Khởi động lại các dịch vụ...'), 5800);
    setTimeout(() => termPrint('warn', '[SYS] Áp dụng cấu hình mạng mới...'), 6400);
    setTimeout(() => {
      termPrint('sys', '');
      termPrint('success', '╔═══════════════════════════════════════╗');
      termPrint('success', '   ✅  FACTORY-OS v3.0 — CÀI ĐẶT XONG  ');
      termPrint('success', '╚═══════════════════════════════════════╝');
      termPrint('sys', '');
      termPrint('success', '  📡 +5 nhà cung cấp mới được mở khóa:');
      termPrint('success', '     phantom.io · z3ro.net · blackrose.onion');
      termPrint('success', '     viper.dark  · cipher.cc');
      termPrint('success', '');
      termPrint('success', '  💸 Giá internet giảm 30% vĩnh viễn!');
      termPrint('success', '');
      termPrint('info',    '  Gõ [help] để xem danh sách vendor mới.');
      termPrint('sys', '');
      G.osUpdated = true;
      G.inetDiscount = true;
      saveGame(false);
      showNotif('✅ Factory-OS v3.0! +5 vendors, internet -30%');
      // Update terminal titlebar version
      const tb = document.querySelector('.terminal-titlebar span[style*="monospace"]');
      if (tb) tb.textContent = 'FACTORY-OS v3.0 — Terminal';
    }, 7200);
  }, 1800);
}

// ═══ OS UPDATE v4.0 ════════════════════════════════════════════════
function doOsUpdateV4() {
  if (!G.osUpdated) {
    termPrint('err', '[ERR] Cần cài Factory-OS v3.0 trước. Gõ [get_(update_factory-os)].');
    return;
  }
  if (G.osV4Updated) {
    termPrint('success', '[SYS] Factory-OS v4.0 đã được cài đặt. Không cần cập nhật lại.');
    termPrint('info', `[INFO] +5 nhà cung cấp mới · Giá internet -10% thêm`);
    termPrint('sys', '');
    return;
  }
  if (!hasInternet()) {
    termPrint('err', '[ERR] Cần kết nối internet để tải update.');
    termPrint('info', '[SYS] Gõ [buy_internet] để mua gói internet.');
    return;
  }
  const cost = 5000;
  if (G.money < cost) {
    termPrint('err', `[ERR] Không đủ tiền! Cần $${cost.toLocaleString()}, có ${fmt(G.money)}`);
    termPrint('warn', `[INFO] Factory-OS v4.0 — Giá: $${cost.toLocaleString()}`);
    return;
  }
  G.money -= cost;
  updateUI();
  termPrint('sys', '');
  termPrint('warn', `[STORE] Thanh toán $${cost.toLocaleString()} thành công.`);
  termPrint('warn', '[SYS] Đang kiểm tra phiên bản...');
  setTimeout(() => termPrint('info', '[NET] Phiên bản hiện tại: Factory-OS v3.0'), 400);
  setTimeout(() => termPrint('info', '[NET] Phiên bản mới nhất: Factory-OS v4.0'), 900);
  setTimeout(() => termPrint('warn', '[DL]  Bắt đầu tải xuống update v4.0...'), 1400);
  setTimeout(() => {
    const output = document.getElementById('terminal-output');
    const wrapper = document.createElement('div');
    wrapper.className = 'update-progress-wrap';
    wrapper.innerHTML = `<div style="font-size:11px;color:#4ade80;font-family:monospace;margin-bottom:3px" id="upd4-label">[DL]  Đang tải: 0%</div><div class="update-progress-bar"><div class="update-progress-fill" id="upd4-fill"></div></div>`;
    output.appendChild(wrapper);
    output.scrollTop = output.scrollHeight;
    const steps = [
      [300,  8,  '[DL]  Đang tải: 8%    ▌ Connecting to v4 server...'],
      [700,  20, '[DL]  Đang tải: 20%   ▌ Downloading vendor_network_v4.pkg'],
      [1200, 35, '[DL]  Đang tải: 35%   ▌ underground_ext_v4.pkg'],
      [1800, 55, '[DL]  Đang tải: 55%   ▌ market_nodes_advanced.pkg'],
      [2400, 72, '[DL]  Đang tải: 72%   ▌ inet_optimizer_v4.pkg'],
      [3100, 88, '[DL]  Đang tải: 88%   ▌ Patching core modules...'],
      [3800, 100,'[DL]  Tải xong: 100%  ▌ Verifying v4 checksums...'],
    ];
    steps.forEach(([delay, pct, label]) => {
      setTimeout(() => {
        const fill = document.getElementById('upd4-fill');
        const lbl  = document.getElementById('upd4-label');
        if (fill) fill.style.width = pct + '%';
        if (lbl)  lbl.textContent = label;
        output.scrollTop = output.scrollHeight;
      }, delay);
    });
    setTimeout(() => termPrint('warn', '[SYS] Đang cài đặt v4.0...'), 4400);
    setTimeout(() => termPrint('warn', '[SYS] Khởi động lại mạng lưới ngầm...'), 5000);
    setTimeout(() => {
      termPrint('sys', '');
      termPrint('success', '╔══════════════════════════════════════════╗');
      termPrint('success', '   ✅  FACTORY-OS v4.0 — CÀI ĐẶT XONG    ');
      termPrint('success', '╚══════════════════════════════════════════╝');
      termPrint('sys', '');
      termPrint('success', '  📡 +5 nhà cung cấp mới được mở khóa:');
      termPrint('success', '     neon.onion · spectre.net · ironsafe.dark');
      termPrint('success', '     wraith.io  · nexus.shop');
      termPrint('success', '');
      termPrint('success', '  💸 Giá internet giảm thêm 10%!');
      termPrint('success', '');
      termPrint('info',    '  Gõ [help] để xem danh sách vendor mới.');
      termPrint('sys', '');
      G.osV4Updated = true;
      G.osVersion = 4;
      // Stack discount: already have 30%, add 10% more (now total ~37%)
      // Store as a flag used in getInetPrice
      saveGame(false);
      showNotif('✅ Factory-OS v4.0! +5 vendors, internet -10% thêm');
      const tb = document.querySelector('.terminal-titlebar span[style*="monospace"]');
      if (tb) tb.textContent = 'FACTORY-OS v4.0 — Terminal';
    }, 5700);
  }, 1800);
}

// ═══ OS UPDATE v5.0 ════════════════════════════════════════════════
function doOsUpdateV5() {
  if (!G.osV4Updated) {
    termPrint('err', '[ERR] Cần cài Factory-OS v4.0 trước. Gõ [get_(update_factory-os_v4)].');
    return;
  }
  if (G.osV5Updated) {
    termPrint('success', '[SYS] Factory-OS v5.0 đã được cài đặt. Không cần cập nhật lại.');
    termPrint('info', `[INFO] +5 nhà cung cấp VIP · 1 bargain bonus mỗi phiên`);
    termPrint('sys', '');
    return;
  }
  if (!hasInternet()) {
    termPrint('err', '[ERR] Cần kết nối internet để tải update.');
    termPrint('info', '[SYS] Gõ [buy_internet] để mua gói internet.');
    return;
  }
  const cost = 25000;
  if (G.money < cost) {
    termPrint('err', `[ERR] Không đủ tiền! Cần $${cost.toLocaleString()}, có ${fmt(G.money)}`);
    termPrint('warn', `[INFO] Factory-OS v5.0 — Giá: $${cost.toLocaleString()}`);
    return;
  }
  G.money -= cost;
  updateUI();
  termPrint('sys', '');
  termPrint('warn', `[STORE] Thanh toán $${cost.toLocaleString()} thành công.`);
  termPrint('warn', '[SYS] Đang kiểm tra phiên bản...');
  setTimeout(() => termPrint('info', '[NET] Phiên bản hiện tại: Factory-OS v4.0'), 400);
  setTimeout(() => termPrint('info', '[NET] Phiên bản mới nhất: Factory-OS v5.0'), 900);
  setTimeout(() => termPrint('warn', '[DL]  Bắt đầu tải xuống update v5.0 OMEGA...'), 1400);
  setTimeout(() => {
    const output = document.getElementById('terminal-output');
    const wrapper = document.createElement('div');
    wrapper.className = 'update-progress-wrap';
    wrapper.innerHTML = `<div style="font-size:11px;color:#a78bfa;font-family:monospace;margin-bottom:3px" id="upd5-label">[DL]  Đang tải: 0%</div><div class="update-progress-bar" style="border-color:#3a1e3a"><div class="update-progress-fill" id="upd5-fill" style="background:linear-gradient(90deg,#5a1a8a,#a78bfa)"></div></div>`;
    output.appendChild(wrapper);
    output.scrollTop = output.scrollHeight;
    const steps = [
      [300,  5,  '[DL]  Đang tải: 5%    ▌ Connecting to OMEGA server...'],
      [600,  15, '[DL]  Đang tải: 15%   ▌ Verifying license key...'],
      [1000, 28, '[DL]  Đang tải: 28%   ▌ deepcore_network.pkg'],
      [1600, 44, '[DL]  Đang tải: 44%   ▌ omega_vendor_list.pkg'],
      [2300, 60, '[DL]  Đang tải: 60%   ▌ titan_vault_access.pkg'],
      [3000, 75, '[DL]  Đang tải: 75%   ▌ bargain_engine_v2.pkg'],
      [3800, 90, '[DL]  Đang tải: 90%   ▌ Compiling kernel patches...'],
      [4600, 100,'[DL]  Tải xong: 100%  ▌ OMEGA checksum verified ✓'],
    ];
    steps.forEach(([delay, pct, label]) => {
      setTimeout(() => {
        const fill = document.getElementById('upd5-fill');
        const lbl  = document.getElementById('upd5-label');
        if (fill) fill.style.width = pct + '%';
        if (lbl)  lbl.textContent = label;
        output.scrollTop = output.scrollHeight;
      }, delay);
    });
    setTimeout(() => termPrint('warn', '[SYS] Đang cài đặt v5.0 OMEGA...'), 5200);
    setTimeout(() => termPrint('warn', '[SYS] Mở khóa tầng deepweb cuối cùng...'), 5900);
    setTimeout(() => termPrint('warn', '[SYS] Kích hoạt bargain engine v2...'), 6500);
    setTimeout(() => {
      termPrint('sys', '');
      termPrint('success', '╔═══════════════════════════════════════════════╗');
      termPrint('success', '   ✅  FACTORY-OS v5.0 OMEGA — CÀI ĐẶT XONG   ');
      termPrint('success', '╚═══════════════════════════════════════════════╝');
      termPrint('sys', '');
      termPrint('success', '  📡 +5 nhà cung cấp VIP mở khóa:');
      termPrint('success', '     abyss.onion · echo.dark · titanvault.net');
      termPrint('success', '     phantom2.cc · deepcore.io');
      termPrint('success', '');
      termPrint('success', '  🎯 BONUS: +1 lượt mặc cả MIỄN PHÍ mỗi phiên!');
      termPrint('success', '');
      termPrint('info',    '  Gõ [help] để xem danh sách vendor mới.');
      termPrint('sys', '');
      G.osV5Updated = true;
      G.osVersion = 5;
      saveGame(false);
      showNotif('✅ Factory-OS v5.0 OMEGA! +5 VIP vendors, free bargain!');
      const tb = document.querySelector('.terminal-titlebar span[style*="monospace"]');
      if (tb) tb.textContent = 'FACTORY-OS v5.0 OMEGA — Terminal';
    }, 7400);
  }, 1800);
}
function doMobileNet() {
  if (G.mobileNetActive) {
    termPrint('success', '[MOB] Mobile network đã active rồi. Mày đang dùng free internet.');
    return;
  }
  termPrint('sys', '');
  termPrint('warn',    '[MOB] Detecting mobile network signal...');
  setTimeout(() => termPrint('warn', '[MOB] Tethering to TT mobile backbone...'), 500);
  setTimeout(() => termPrint('warn', '[MOB] Bypassing billing layer...'), 1100);
  setTimeout(() => termPrint('warn', '[MOB] Injecting persistent auth token...'), 1700);
  setTimeout(() => {
    termPrint('success', '');
    termPrint('success', '╔══════════════════════════════════════╗');
    termPrint('success', '   📶  MOBILE NETWORK — ACTIVATED       ');
    termPrint('success', '   🔓  FREE INTERNET — PERMANENT         ');
    termPrint('success', '╚══════════════════════════════════════╝');
    termPrint('success', '');
    termPrint('info', '  Không còn cần mua internet. 100% connect rate.');
    termPrint('sys', '');
    G.mobileNetActive = true;
    saveGame(false);
    updateInetStatusBar();
    showNotif('📶 Mobile Network active! Free internet vĩnh viễn!');
  }, 2400);
}

function doCallTo(url) {
  // Check internet first
  if (!hasInternet()) {
    termPrint('sys', '');
    termPrint('err', '[ERR] NO_INTERNET_CONNECTION');
    termPrint('err', '[ERR] Error code: INET_UNAVAILABLE (0x0003)');
    termPrint('err', '[ERR] Your device has no active internet package.');
    termPrint('err', '[ERR] Purchase a plan to enable outbound connections.');
    termPrint('info', '[SYS] Type [buy_internet] to see available packages.');
    termPrint('sys', '');
    return;
  }

  const vendor = getUndergroundVendors().find(v => v.host === url);

  termPrint('sys', '');
  termPrint('warn', `[SYS] Initializing connection to ${url}...`);

  const connMsgs = [
    [100, 'warn', '[NET] Routing via proxy...'],
    [400, 'warn', '[NET] Bypassing firewall...'],
    [700, 'warn', '[ENC] Encrypting tunnel AES-256...'],
    [1100, 'warn', '[AUTH] Verifying anonymous identity...'],
  ];

  connMsgs.forEach(([d, cls, msg]) => setTimeout(() => termPrint(cls, msg), d));

  if (!vendor) {
    setTimeout(() => {
      termPrint('err', `[ERR] Host not found: ${url}`);
      termPrint('err', '[ERR] Connection refused. (Try URLs listed in help)');
      termPrint('sys', '');
    }, 1500);
    return;
  }

  // Apply connection chance based on internet package
  const chance = getInetConnectChance();
  const roll = Math.random();

  setTimeout(() => {
    if (roll >= chance) {
      // Connection failed — roll >= chance means failure (e.g. chance=0.6: roll<0.6 succeeds, roll>=0.6 fails)
      termPrint('err', `[ERR] CONNECTION_FAILED — packet loss too high.`);
      termPrint('err', `[ERR] Your current plan (${(G.inetPackage||'').toUpperCase()}) failed to reach ${url}.`);
      termPrint('info', `[SYS] Upgrade to a better plan for higher success rate.`);
      termPrint('sys', '');
      return;
    }

    terminalState.connected = true;
    terminalState.currentVendor = vendor;
    terminalState.bargainCount = 0;
    // Apply speed package bargain bonus + v5 OS bonus
    const v5Bonus = G.osV5Updated ? 1 : 0;
    terminalState.maxBargains = 3 + (G.inetBargainBonus || 0) + v5Bonus;
    if (G.inetBargainBonus > 0) {
      G.inetBargainBonus = 0; // consume bonus
    }
    // Generate random catalog for this session
    terminalState.currentCatalog = generateVendorCatalog();
    document.getElementById('term-conn-status').textContent = '● CONNECTED: ' + vendor.alias;
    document.getElementById('term-conn-status').style.color = '#4ade80';
    document.getElementById('term-prompt').textContent = vendor.alias + ':~$';

    termPrint('success', `[OK] Connection established → ${vendor.alias}@${url}`);
    if (terminalState.maxBargains > 3) termPrint('info', `[BONUS] Speed plan: +${terminalState.maxBargains - 3} extra bargain(s) available!`);
    termPrint('sys', '──────────────────────────────────────');
    termPrint('vendor-name', `[${vendor.alias}] ` + vendor.greeting);
    termPrint('sys', '');
    setTimeout(() => showVendorCatalog(), 600);
  }, 1600);
}

function generateVendorCatalog() {
  // Pick 4-6 random items and assign prices with slight random variance
  const shuffled = [...BLACK_MARKET_GOODS].sort(() => Math.random()-0.5);
  const count = 4 + Math.floor(Math.random() * 3);
  return shuffled.slice(0, count).map(item => ({
    ...item,
    currentPrice: item.basePrice * (0.9 + Math.random() * 0.3), // ±20% variance
    originalPrice: item.basePrice * (0.9 + Math.random() * 0.3),
  }));
}

function showVendorCatalog() {
  const v = terminalState.currentVendor;
  const cat = terminalState.currentCatalog;
  termPrint('vendor', `[${v.alias}] Đây là hàng tao có:`);
  termPrint('sys', '');
  cat.forEach((item, i) => {
    termPrint('price', `  [${i+1}] ${item.icon} ${item.name}`);
    termPrint('info', `       ${item.desc}`);
    termPrint('warn', `       Giá: $${item.currentPrice.toFixed(2)}`);
    termPrint('sys', '');
  });
  termPrint('vendor', `[${v.alias}] Gõ [buy 1] để mua, [tgn] để mặc cả, [hangup] để ngắt.`);
}

function doBargain() {
  const v = terminalState.currentVendor;
  const cat = terminalState.currentCatalog;
  terminalState.bargainCount++;

  const moodResponses = {
    chill:        ['oke oke, tao giảm chút', 'hmm... được thôi', 'mày lì thật, oke giảm'],
    paranoid:     ['... mày nghĩ tao bán lỗ hả', 'coi chừng tao block mày đó', 'lần này thôi nhé'],
    nervous:      ['thôi được rồi, đừng ồn', 'ok ok giảm rồi, im đi', 'hạ giọng xuống...'],
    professional: ['được, điều chỉnh giá theo thị trường', 'chính sách linh hoạt, giảm 8%', 'ok discount'],
    suspicious:   ['mày mặc cả nhiều vậy, tao để ý đó', 'lần này thôi', '...oke lần cuối'],
  };

  if (terminalState.bargainCount > terminalState.maxBargains) {
    // Disconnect angry
    const angryMsgs = {
      chill:        'đm mày mặc cả nhiều vãi. tao off đây.',
      paranoid:     'mày làm tao nghi ngờ quá. DISCONNECT.',
      nervous:      'thôi tao sợ rồi, tao không bán nữa!',
      professional: 'Quý khách mặc cả vượt giới hạn. Ngắt kết nối.',
      suspicious:   'tao biết mày là cop. get out.',
    };
    termPrint('vendor-name', `[${v.alias}] ${angryMsgs[v.mood] || 'tao không bán nữa.'}`);
    setTimeout(() => terminalDisconnect('angry'), 800);
    return;
  }

  const discount = 0.05 + Math.random() * 0.08; // 5-13% off
  cat.forEach(item => {
    item.currentPrice = item.currentPrice * (1 - discount);
  });

  const responses = moodResponses[v.mood] || moodResponses.chill;
  const resp = responses[Math.min(terminalState.bargainCount-1, responses.length-1)];
  termPrint('vendor-name', `[${v.alias}] ${resp}`);
  termPrint('success', `  → Giá giảm ${(discount*100).toFixed(0)}%! Catalog mới:`);
  termPrint('sys', '');
  cat.forEach((item, i) => {
    termPrint('price', `  [${i+1}] ${item.icon} ${item.name} — $${item.currentPrice.toFixed(2)}`);
  });
  termPrint('sys', '');

  if (terminalState.bargainCount === terminalState.maxBargains) {
    const warnMsgs = {
      chill: 'lần cuối đó nghen.',
      paranoid: 'đây là lần cuối tao giảm.',
      nervous: 'đừng mặc cả nữa, tao sắp tắt máy rồi.',
      professional: 'Đây là mức giá cuối cùng.',
      suspicious: 'tao không giảm thêm nữa đâu.',
    };
    termPrint('vendor-name', `[${v.alias}] ${warnMsgs[v.mood] || 'lần cuối đó.'}`);
  }
}

function doBuy(idx) {
  const v = terminalState.currentVendor;
  const cat = terminalState.currentCatalog;

  if (idx < 0 || idx >= cat.length) {
    termPrint('err', `Số không hợp lệ. Chọn từ 1 đến ${cat.length}.`);
    return;
  }

  const item = cat[idx];
  if (G.money < item.currentPrice) {
    termPrint('err', `Không đủ tiền! Cần $${item.currentPrice.toFixed(2)}, có ${fmt(G.money)}`);
    termPrint('vendor-name', `[${v.alias}] thiếu tiền còn đòi mua, xéo đi.`);
    return;
  }
  if (G.inventory.length >= G.invMaxSlots) {
    termPrint('err', 'Kho đầy! Vào tab Kho đồ để dọn chỗ.');
    return;
  }

  G.money -= item.currentPrice;
  termPrint('warn', `[TXN] Thanh toán $${item.currentPrice.toFixed(2)}...`);

  setTimeout(() => {
    // 99% success rate
    const success = Math.random() < 0.99;
    if (success) {
      G.inventory.push({
        id: 'bm_inv_' + Date.now() + '_' + Math.random().toString(36).slice(2),
        itemId: item.id,
        name: item.name,
        icon: item.icon,
        boughtPrice: item.currentPrice,
        tier: 'tech',
        recyclePoints: Math.floor(item.basePrice / 10),
        baseMinPrice: item.basePrice * 0.8,
        baseMaxPrice: item.basePrice * 1.5,
      });
      termPrint('success', `[OK] Giao dịch thành công!`);
      termPrint('success', `     ${item.icon} ${item.name} → 🎒 Kho đồ`);
      termPrint('vendor-name', `[${v.alias}] xong. hàng vào kho mày rồi. cẩn thận đấy.`);
      // Remove from catalog
      terminalState.currentCatalog.splice(idx, 1);
      updateUI(); saveGame(false);
      if (document.getElementById('panel-inventory').classList.contains('active')) renderInventory();
    } else {
      termPrint('err', `[FAIL] Giao dịch thất bại! Mất $${item.currentPrice.toFixed(2)}.`);
      termPrint('vendor-name', `[${v.alias}] có vấn đề phát sinh, tiền mày mất rồi. xin lỗi :)`);
      updateUI(); saveGame(false);
    }
    termPrint('sys', '');
    if (terminalState.currentCatalog.length === 0) {
      termPrint('vendor-name', `[${v.alias}] hết hàng rồi. tao off.`);
      setTimeout(() => terminalDisconnect('sold_out'), 1000);
    }
  }, 800);
}

function terminalDisconnect(reason) {
  const v = terminalState.currentVendor;
  const alias = v ? v.alias : '???';

  termPrint('sys', '──────────────────────────────────────');
  if (reason === 'angry') {
    termPrint('disconnect', `[${alias}] *** ĐƯỜNG DÂY BỊ NGẮT ĐỘT NGỘT ***`);
  } else if (reason === 'hangup') {
    termPrint('info', `[SYS] Ngắt kết nối với ${alias}...`);
    termPrint('info', `[SYS] Connection closed.`);
  } else if (reason === 'sold_out') {
    termPrint('info', `[SYS] ${alias} đã ngắt kết nối (hết hàng).`);
  } else {
    termPrint('info', `[SYS] Kết nối kết thúc.`);
  }
  termPrint('disconnect', `[NET] *** DISCONNECTED ***`);
  termPrint('sys', '');

  terminalState.connected = false;
  terminalState.currentVendor = null;
  terminalState.currentCatalog = [];
  terminalState.bargainCount = 0;

  const statusEl = document.getElementById('term-conn-status');
  const promptEl = document.getElementById('term-prompt');
  if (statusEl) { statusEl.textContent = '● OFFLINE'; statusEl.style.color = '#1f3a1f'; }
  if (promptEl) promptEl.textContent = 'root@factory:~$';
}

// renderAll() — full redraw of every panel.
// Called on tab switch and after major state changes (buy, sell, etc.).
// Avoids re-rendering hidden panels to save CPU — most render functions
// check whether their panel has the .active class before doing work.
function renderAll() { renderSlots(); renderShopTabs(); renderShopContent(); updateUI(); renderTaxBadge(); if(typeof updateProfileAvatarDisplay==='function') updateProfileAvatarDisplay(); if(typeof renderProfileDisplay==='function') renderProfileDisplay(); }
renderAll();

// ═══ TAB SCROLL HELPER ═══════════════════════════════════════════
function scrollTabs(delta) {
  const el = document.getElementById('main-tabs-el');
  if (el) el.scrollLeft += delta;
}

// ═══ OPTIMIZED MAIN GAME LOOP ════════════════════════════════════
// ═══ FPS UNLOCKER — REAL CPU/GPU LOAD ════════════════════════════
// Target FPS setting — saved to localStorage, default 30
//
// ARCHITECTURE:
//   • 30 FPS  — RAF loop, renders every ~33 ms. Canvas idle (1 layer).
//   • 60 FPS  — RAF loop, renders every ~16.7 ms. Canvas active (2 layers, ~200 particles).
//   • 120 FPS — setInterval at 8.33 ms + RAF. Canvas heavy (4 layers, ~500 particles,
//               per-particle gradients, blur filters, pixel-level shadow ops).
//               Genuinely forces CPU rasterization + GPU compositing each frame.
//
//   Canvas is an off-screen overlay injected into the page; it is visually
//   subtle (low alpha) but drives real GPU draw calls that scale with FPS.
// ──────────────────────────────────────────────────────────────────

const FPS_KEY = 'factory_fps_target';
let _fpsTarget   = 30;
let _fpsInterval = 1000 / _fpsTarget;
let _renderIntervalId = null;

// ── Off-screen canvas for GPU load (injected once at init) ────────
let _cvs = null, _ctx = null;
// BUG FIX: Reduced particle/layer counts to safe levels to prevent browser crash.
// Original 120 FPS: 500 particles × 4 layers × blur × shadow = GPU overload on startup.
const _PARTICLE_COUNTS = { 30: 0, 60: 80, 120: 150 };
const _LAYER_COUNTS    = { 30: 1, 60: 1,  120: 2   };

// Particle pool — pre-allocated, reused every frame
let _particles = [];
function _initParticles(n) {
  _particles = [];
  for (let i = 0; i < n; i++) {
    _particles.push({
      x:  Math.random() * (_cvs ? _cvs.width  : 400),
      y:  Math.random() * (_cvs ? _cvs.height : 300),
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      r:  2 + Math.random() * 4,
      hue: Math.floor(Math.random() * 360),
      alpha: 0.15 + Math.random() * 0.35,
      spin: (Math.random() - 0.5) * 0.08,
    });
  }
}

function _ensureCanvas() {
  if (_cvs) return;
  _cvs = document.createElement('canvas');
  _cvs.id = '_fps_canvas';
  _cvs.style.cssText = [
    'position:fixed','top:0','left:0','width:100%','height:100%',
    'pointer-events:none','z-index:0','opacity:0.18',
  ].join(';');
  document.body.appendChild(_cvs);
  _ctx = _cvs.getContext('2d');
  function _resize() { _cvs.width = innerWidth; _cvs.height = innerHeight; }
  _resize();
  window.addEventListener('resize', _resize);
}

// ── _drawCanvas(dt) — scales complexity with _fpsTarget ───────────
function _drawCanvas(dt) {
  if (!_ctx || !_cvs) return;
  const layers = _LAYER_COUNTS[_fpsTarget] || 1;
  const W = _cvs.width, H = _cvs.height;

  // Move particles
  for (let i = 0; i < _particles.length; i++) {
    const p = _particles[i];
    p.x  += p.vx;
    p.y  += p.vy;
    p.hue = (p.hue + 0.5) % 360;
    p.alpha += p.spin;
    if (p.alpha > 0.5 || p.alpha < 0.05) p.spin *= -1;
    if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
  }

  // Render layers — each layer is a full clear + draw pass (real GPU work)
  for (let L = 0; L < layers; L++) {
    if (L === 0) {
      _ctx.clearRect(0, 0, W, H);
    } else {
      // Additional layers: compositing variation forces GPU re-blend
      _ctx.globalCompositeOperation = L % 2 === 0 ? 'lighter' : 'source-over';
    }

    // BUG FIX: Removed per-layer blur filter at 120 FPS — caused GPU rasterization crash.

    for (let i = 0; i < _particles.length; i++) {
      const p = _particles[i];
      _ctx.beginPath();
      // Per-particle radial gradient — only at 60+ FPS
      if (_fpsTarget >= 60) {
        const g = _ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2);
        g.addColorStop(0, `hsla(${p.hue},90%,70%,${p.alpha})`);
        g.addColorStop(1, `hsla(${(p.hue+60)%360},70%,40%,0)`);
        _ctx.fillStyle = g;
      } else {
        _ctx.fillStyle = `hsla(${p.hue},80%,60%,${p.alpha})`;
      }
      _ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      _ctx.fill();
      // BUG FIX: Removed per-particle shadow at 120 FPS — caused huge GPU overdraw crash.
    }
  }

  _ctx.filter = 'none';
  _ctx.globalCompositeOperation = 'source-over';
}

// ── _doRender() — DOM writes + canvas draw, called every render tick ──
function _doRender(dt) {
  if (!hasPower()) return;

  const vm2        = G.valueMultiplier || 1;
  const speedMult2 = (G.matBonuses && G.matBonuses.speedBoost) || 1;
  let   totalRate2 = 0;
  G.slots.forEach(s => { if (s && ALL_M[s.machine]) totalRate2 += ALL_M[s.machine].rate; });

  const moneyEl = document.getElementById('mb-dollar');
  const hdrEl   = document.getElementById('hdr-money');
  const rateEl  = document.getElementById('mb-rate');
  const vmEl    = document.getElementById('mb-vmult');
  const totalEl = document.getElementById('mb-total');
  if (moneyEl) moneyEl.textContent = fmt(G.money);
  if (hdrEl)   hdrEl.textContent   = fmt(G.money);
  if (rateEl)  rateEl.textContent  = fmt(totalRate2 * vm2 * speedMult2) + '/s';
  if (vmEl)    vmEl.textContent    = 'x' + vm2.toFixed(vm2 < 10 ? 2 : vm2 < 1000 ? 1 : 0);
  if (totalEl) totalEl.textContent = fmt(G.totalEarned);

  const tokenAmt2 = G.wallet && G.wallet.token ? G.wallet.token : 0;
  const hdrToken2 = document.getElementById('hdr-token');
  const hdrTokenVal2 = document.getElementById('hdr-token-val');
  if (hdrToken2) hdrToken2.style.display = tokenAmt2 > 0 ? 'inline-flex' : 'none';
  if (hdrTokenVal2) hdrTokenVal2.textContent = tokenAmt2.toLocaleString();

  // Progress bars
  const pct = (_progVal * 100).toFixed(1) + '%';
  for (let i = 0; i < G.ownedSlots; i++) {
    const s = G.slots[i];
    if (!s || !s.machine) continue;
    const el = document.getElementById('pg' + i);
    if (el) el.style.width = pct;
  }

  // Canvas GPU workload — scales with FPS target
  _drawCanvas(dt || 0.016);
}

function setFpsTarget(fps) {
  fps = parseInt(fps);
  if (![30, 60, 120].includes(fps)) fps = 30;
  _fpsTarget   = fps;
  _fpsInterval = 1000 / fps;
  try { localStorage.setItem(FPS_KEY, fps); } catch(e) {}

  // Update UI buttons
  [30, 60, 120].forEach(f => {
    const btn = document.getElementById('fps-btn-' + f);
    if (btn) btn.classList.toggle('fps-btn--active', f === fps);
  });
  const lbl = document.getElementById('fps-current-label');
  if (lbl) lbl.textContent = fps + ' FPS';

  // Rebuild particle pool to match new FPS tier
  _ensureCanvas();
  _initParticles(_PARTICLE_COUNTS[fps] || 0);

  // Show/hide canvas overlay
  if (_cvs) _cvs.style.display = fps >= 60 ? 'block' : 'none';

  // BUG FIX: Removed dedicated setInterval for 120 FPS.
  // Previously: setInterval(8.33ms) + requestAnimationFrame ran simultaneously,
  // causing double rendering on startup which crashed the browser tab.
  // Now: all FPS modes use the single RAF loop with frame throttling.
  if (_renderIntervalId !== null) { clearInterval(_renderIntervalId); _renderIntervalId = null; }
}

function loadFpsTarget() {
  // BUG FIX: Default to 30 FPS (safe) instead of 60.
  // This prevents crash when user had 120 FPS saved from before the fix.
  let saved = 30;
  try { saved = parseInt(localStorage.getItem(FPS_KEY)) || 30; } catch(e) {}
  if (![30, 60, 120].includes(saved)) saved = 30;
  setFpsTarget(saved);
}

// ── Game loop state ────────────────────────────────────────────────
let _progVal    = 0;
let _lastTick   = 0;
let _lastRender = 0;

function _gameLoop(now) {
  requestAnimationFrame(_gameLoop);

  if (!_lastTick) { _lastTick = now; _lastRender = now; return; }

  const dt = Math.min((now - _lastTick) / 1000, 0.2);
  _lastTick = now;

  // ── GAME LOGIC — runs every RAF frame ──
  if (hasPower()) {
    const vm        = G.valueMultiplier || 1;
    const speedMult = (G.matBonuses && G.matBonuses.speedBoost) || 1;
    let   totalRate = 0;
    G.slots.forEach(s => { if (s && ALL_M[s.machine]) totalRate += ALL_M[s.machine].rate; });
    const earned = totalRate * vm * speedMult * dt;

    if (earned > 0) {
      G.money             = Math.min(G.money + earned, 999e12);
      G.totalEarned      += earned;
      G.playedSeconds    += dt;
      G.valueMultiplier   = 1.0 * Math.pow(1 + 0.01 / 60, G.playedSeconds);
    }

    _progVal = (_progVal + dt / 10) % 1;
  }

  // ── DOM RENDER — throttled to target FPS via RAF ──\
  // BUG FIX: Removed "if 120 FPS return" early exit that delegated to setInterval.

  const elapsed = now - _lastRender;
  if (elapsed < _fpsInterval - 0.5) return;
  _lastRender = now - (elapsed % _fpsInterval);

  _doRender(dt);
}

// Load saved FPS before starting loop
loadFpsTarget();
requestAnimationFrame(_gameLoop);

