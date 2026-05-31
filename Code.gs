// ============================================================
//  FACTORY GAME — Quản lý mã kích hoạt qua Google Sheets
//  Paste toàn bộ file này vào Google Apps Script
// ============================================================

var SHEET_NAME = 'Codes';       // Tên sheet chứa mã
var SECRET_KEY = 'factory2025'; // Khóa bí mật (tùy ý đổi)

// ── Hàm chính: xử lý mọi request từ game ──────────────────
function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    var action = body.action;

    if (action === 'check') {
      return checkCode(body.code, body.bundleId);
    }
    if (action === 'add') {
      return addCode(body.code, body.note, body.secret);
    }
    if (action === 'addBatch') {
      return addBatch(body.codes, body.secret);
    }
    if (action === 'list') {
      return listCodes(body.secret);
    }

    return resp({ ok: false, msg: 'Action không hợp lệ' });
  } catch(err) {
    return resp({ ok: false, msg: 'Lỗi server: ' + err.message });
  }
}

// ── CORS support ────────────────────────────────────────────
function doGet(e) {
  return resp({ ok: true, msg: 'Factory Game API đang hoạt động' });
}

// ── Kiểm tra mã khi người chơi nhập ───────────────────────
function checkCode(code, bundleId) {
  if (!code || code.length < 5) {
    return resp({ ok: false, msg: '⚠️ Mã không hợp lệ!' });
  }

  var sheet = getSheet();
  var data = sheet.getDataRange().getValues();

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var rowCode  = String(row[0]).trim().toUpperCase();
    var rowUsed  = row[2]; // TRUE/FALSE
    var rowBundle = String(row[3]).trim(); // bundle nào được phép dùng mã này ('*' = tất cả)

    if (rowCode === code.trim().toUpperCase()) {
      if (rowUsed === true || rowUsed === 'TRUE' || rowUsed === 'Đã dùng') {
        return resp({ ok: false, msg: '❌ Mã này đã được sử dụng rồi!' });
      }
      // Kiểm tra bundle phù hợp
      if (rowBundle !== '*' && rowBundle !== '' && bundleId && rowBundle !== bundleId) {
        return resp({ ok: false, msg: '❌ Mã này không áp dụng cho bundle này!' });
      }

      // Đánh dấu đã dùng
      var sheetRow = i + 1;
      sheet.getRange(sheetRow, 3).setValue('Đã dùng');
      sheet.getRange(sheetRow, 5).setValue(new Date().toLocaleString('vi-VN'));

      // Lấy phần thưởng của mã này
      var reward = String(row[4] || '').trim(); // Cột E: mô tả phần thưởng (tuỳ chọn)

      return resp({
        ok: true,
        msg: '✅ Mã hợp lệ!',
        bundle: rowBundle === '*' ? bundleId : rowBundle,
        reward: reward
      });
    }
  }

  return resp({ ok: false, msg: '❌ Mã không tồn tại! Kiểm tra lại hoặc liên hệ admin.' });
}

// ── Thêm 1 mã mới (dùng trong admin tool) ─────────────────
function addCode(code, note, secret) {
  if (secret !== SECRET_KEY) {
    return resp({ ok: false, msg: 'Sai khóa bí mật!' });
  }
  if (!code) return resp({ ok: false, msg: 'Thiếu mã!' });

  var sheet = getSheet();
  var data = sheet.getDataRange().getValues();
  var codeUp = code.trim().toUpperCase();

  // Kiểm tra trùng
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][0]).trim().toUpperCase() === codeUp) {
      return resp({ ok: false, msg: 'Mã ' + codeUp + ' đã tồn tại!' });
    }
  }

  sheet.appendRow([codeUp, note || '', false, '*', '', new Date().toLocaleString('vi-VN')]);
  return resp({ ok: true, msg: 'Đã thêm mã: ' + codeUp });
}

// ── Thêm nhiều mã cùng lúc ─────────────────────────────────
function addBatch(codes, secret) {
  if (secret !== SECRET_KEY) {
    return resp({ ok: false, msg: 'Sai khóa bí mật!' });
  }
  if (!codes || !codes.length) return resp({ ok: false, msg: 'Thiếu danh sách mã!' });

  var sheet = getSheet();
  var data = sheet.getDataRange().getValues();
  var existing = data.slice(1).map(function(r){ return String(r[0]).trim().toUpperCase(); });

  var added = [], skipped = [];
  codes.forEach(function(code) {
    var c = String(code).trim().toUpperCase();
    if (existing.includes(c)) { skipped.push(c); return; }
    sheet.appendRow([c, '', false, '*', '', new Date().toLocaleString('vi-VN')]);
    existing.push(c);
    added.push(c);
  });

  return resp({ ok: true, added: added, skipped: skipped, msg: 'Thêm ' + added.length + ' mã, bỏ qua ' + skipped.length + ' mã trùng' });
}

// ── Lấy danh sách mã (chỉ admin) ──────────────────────────
function listCodes(secret) {
  if (secret !== SECRET_KEY) {
    return resp({ ok: false, msg: 'Sai khóa bí mật!' });
  }
  var sheet = getSheet();
  var data = sheet.getDataRange().getValues();
  var codes = data.slice(1).map(function(r){
    return { code: r[0], note: r[1], used: r[2], bundle: r[3], usedAt: r[4], createdAt: r[5] };
  });
  return resp({ ok: true, codes: codes });
}

// ── Tạo sheet nếu chưa có ─────────────────────────────────
function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['Mã', 'Ghi chú', 'Đã dùng', 'Bundle', 'Dùng lúc', 'Tạo lúc']);
    // Format header
    var header = sheet.getRange(1, 1, 1, 6);
    header.setBackground('#1a1a2e');
    header.setFontColor('#ffffff');
    header.setFontWeight('bold');
    sheet.setColumnWidth(1, 180);
    sheet.setColumnWidth(2, 200);
    sheet.setColumnWidth(3, 100);
    sheet.setColumnWidth(4, 150);
    sheet.setColumnWidth(5, 180);
    sheet.setColumnWidth(6, 180);
  }
  return sheet;
}

// ── Helper: trả về JSON response ──────────────────────────
function resp(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
