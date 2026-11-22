import fs from 'node:fs';
import path from 'node:path';

const distImgDir = path.resolve('dist/reading-visual/r1/images');
const distExamPath = path.resolve('dist/reading-visual/r1/exam.json');
const contentExamPath = path.resolve('content/reading-visual-01/exam.json');

const exam = JSON.parse(fs.readFileSync(contentExamPath, 'utf8'));
const existingSets = exam.parts[0].sets.slice(0, 25);

const svgSpecs = {
  rv28: { bg: '#0f172a', headerBg: '#1e293b', dark: true, title: 'WESTPORT INTERNATIONAL AIRPORT - GATE B12', lines: ['Flight KW 408 | Destination: Vancouver', 'Departure: 14:25 | Boarding: 13:45 | Status: On Time', 'Group 1 & 2 Boarding First', 'Please Have Boarding Pass and Photo ID Ready'] },
  rv30: { bg: '#f0f6fc', headerBg: '#124d75', title: 'NORTHSTAR POSTAL SERVICE - PARCEL RATES', lines: ['Standard Mail (3-5 days): $6.00', 'Priority Mail (2 days): $11.50', 'Express Overnight (Next day by 10 AM): $26.00', 'Insurance up to $100 included with Priority & Express'] },
  rv31: { bg: '#f0fdf4', headerBg: '#166534', title: 'OAKTREE DENTAL CARE - OFFICE POLICIES', lines: ['Checkups & Cleanings: Mon-Fri 8:30 AM - 5:30 PM', 'Saturday Emergency Hours: 9:00 AM - 12:00 PM', '24-hour notice required for cancellations ($35 late fee)', 'New patients please arrive 15 minutes early'] },
  rv32: { bg: '#fdf8f3', headerBg: '#5c3a21', title: 'PAGE & PINE BOOKSTORE - AUTHOR NIGHTS', lines: ['May 12, 7:00 PM - Elena Vance (Coastal Trails)', 'May 19, 6:30 PM - Marcus Bell (Smart Cities)', 'May 26, 7:00 PM - Priya Shah (Everyday Baking)', 'Free Admission | Book Signing Follows Each Talk'] },
  rv33: { bg: '#fff7ed', headerBg: '#9a3412', title: 'SAFEBOX SELF STORAGE - MONTHLY UNITS', lines: ['Small (5x5 ft): $65/mo - Boxes & Seasonal Gear', 'Medium (10x10 ft): $120/mo - 1-Bedroom Apt', 'Large (10x20 ft): $195/mo - Full House or Vehicle', '24/7 Keypad Access | Climate-Controlled Units +$20/mo'] },
  rv34: { bg: '#eff6ff', headerBg: '#1d4ed8', title: 'SPARKLE AUTO WASH - WASH PACKAGES', lines: ['Basic Wash: $10 (Exterior Wash & Dry)', 'Deluxe Wash: $16 (Basic + Undercarriage + Wax)', 'Ultimate Wash: $24 (Deluxe + Interior Vacuum & Tire Shine)', 'Unlimited Monthly Club: $32/mo'] },
  rv35: { bg: '#fafafa', headerBg: '#18181b', title: 'METRO ART GALLERY - SUMMER EXHIBITIONS', lines: ['Gallery 1: Modern Ceramics (June 1 - July 15)', 'Gallery 2: Urban Photography (June 10 - August 20)', 'Gallery 3: Textile Traditions (July 1 - September 5)', 'Free Admission Every First Friday (5:00 PM - 9:00 PM)'] },
  rv36: { bg: '#f8fafc', headerBg: '#0f3d6e', title: 'CLEARVIEW OPTOMETRY - EYEWEAR OFFERS', lines: ['Comprehensive Eye Exam: $75 (Free with Insurance)', 'Complete Frame + Single-Vision Lenses: Starting at $129', '2nd Pair Discount: 40% OFF same-day purchase', 'Free Frame Adjustments & Cleaning Anytime'] },
  rv37: { bg: '#fefce8', headerBg: '#854d0e', title: 'SUNNYVALE PET BOARDING - DAILY RATES', lines: ['Dog Suite: $48 / night | Cat Condo: $28 / night', 'Daycare Only (7 AM - 6 PM): $30 / day', 'Second Pet in Same Suite: 20% OFF', 'Current Vaccination Records Required at Check-in'] },
  rv38: { bg: '#f0f9ff', headerBg: '#0369a1', title: 'HARBOR KAYAK RENTALS - WATERFRONT', lines: ['Single Kayak: $18 / hr | $45 Half Day (4 hrs)', 'Tandem Kayak: $28 / hr | $65 Half Day (4 hrs)', 'Life Jackets & Dry Bags Included Free', 'Last Rental Leaves Dock at 4:30 PM'] },
  rv39: { bg: '#fdf2f8', headerBg: '#9d174d', title: 'BLOOMFIELD FLORIST - DELIVERY GUIDE', lines: ['Same-Day Local Delivery: Order before 2:00 PM', 'Standard Delivery Fee: $12 (Free on orders over $75)', 'Weekend Deliveries: Saturday Only (Closed Sunday)', 'Custom Wedding Consultations by Appointment'] },
  rv40: { bg: '#f5f3ff', headerBg: '#5b21b6', title: 'SOUNDWAVE MUSIC SCHOOL - LESSON RATES', lines: ['30-Minute Private Lesson: $35 (Piano, Guitar, Violin)', '60-Minute Private Lesson: $62', 'Group Beginner Classes: $22 / session (Max 6 students)', 'Instrument Rentals Available Starting at $25/mo'] },
  rv41: { bg: '#ecfdf5', headerBg: '#065f46', title: 'GREENWAY EV CHARGING HUB - TARIFFS', lines: ['Level 2 AC Charging (7 kW): $0.25 / kWh', 'DC Fast Charging (150 kW): $0.45 / kWh', 'Off-Peak Discount (11 PM - 6 AM): 20% OFF', 'Idle Fee after Full Charge: $0.50 / min (10-min grace)'] },
  rv42: { bg: '#fffbeb', headerBg: '#b45309', title: 'CORNERSTONE HARDWARE - TOOL RENTAL', lines: ['Pressure Washer: $38 / 4 hrs | $55 / day', 'Tile Saw: $30 / 4 hrs | $45 / day', 'Extension Ladder (24 ft): $20 / day', 'Valid Driver License & $50 Refundable Deposit Required'] },
  rv43: { bg: '#f1f5f9', headerBg: '#334155', title: 'CITYVIEW COWORKING - DAY PASSES', lines: ['Hot Desk Day Pass: $25 (8:00 AM - 6:00 PM)', '5-Day Flex Pack: $105 (Valid 60 days)', 'Private Phone Booths: Free for Pass Holders', 'High-Speed Wi-Fi & Bottomless Coffee Included'] },
  rv44: { bg: '#fef2f2', headerBg: '#991b1b', title: 'REDWOOD BOWLING LANES - PRICING', lines: ['Mon-Thu: $5.50 / game | Fri-Sun: $7.50 / game', 'Shoe Rental: $4.00 per person', 'Family Package (2 hrs + 4 shoes + pizza): $58', 'Cosmic Bowling Every Friday 8:00 PM - 11:00 PM'] },
  rv45: { bg: '#f0fdfa', headerBg: '#115e59', title: 'BAYSIDE YOGA STUDIO - CLASS PASSES', lines: ['Single Drop-In Class: $20', '5-Class Pack: $85 | 10-Class Pack: $150', 'Intro Offer (New Students): 2 Weeks Unlimited $39', 'Mat Rental: $3 (Free for Unlimited Members)'] },
  rv46: { bg: '#f8fafc', headerBg: '#1e3a8a', title: 'METRO TRANSIT - FARE ZONES', lines: ['Zone 1 (City Center): $2.50 Single | $6.00 Day Pass', 'Zone 2 (Suburbs): $3.75 Single | $9.00 Day Pass', 'Airport Express Add-on: +$4.00', 'Seniors (65+) & Students: 50% OFF Single Fares'] },
  rv47: { bg: '#fdf4ff', headerBg: '#86198f', title: 'ARTISAN FRAMING STUDIO - TURNAROUND', lines: ['Standard Custom Framing: 7-10 Business Days', 'Rush Service (3 Business Days): +$25 per frame', 'UV-Protective Glass Upgrade: +$18', 'Free Design Consultation — Walk-ins Welcome'] },
  rv48: { bg: '#f7fee7', headerBg: '#3f6212', title: 'MEADOWBROOK GOLF COURSE - GREEN FEES', lines: ['18 Holes (Weekday): $42 | (Weekend): $58', '9 Holes (Any Day): $26', 'Cart Rental: $18 per player | Club Rental: $25', 'Twilight Rate (After 3:00 PM): $29 for 18 Holes'] },
  rv49: { bg: '#eff6ff', headerBg: '#1e40af', title: 'TECHFIX REPAIR BAR - EXPRESS SERVICE', lines: ['Phone Screen Replacement: $89 (Ready in 45 min)', 'Battery Replacement: $49 (Ready in 30 min)', 'Laptop Diagnostic Check: Free ($0)', '90-Day Warranty on All Parts & Labor'] },
  rv50: { bg: '#fff7ed', headerBg: '#7c2d12', title: 'SUMMIT SKI LODGE - LIFT TICKETS', lines: ['Full-Day Adult Lift Ticket: $78 (9:00 AM - 4:00 PM)', 'Half-Day Afternoon (12:30 PM - 4:00 PM): $52', 'Youth (6-17) & Seniors (65+): $56 Full Day', 'Save 15% When Booking Online 48 Hours Ahead'] }
};

function escapeXml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

for (const [id, spec] of Object.entries(svgSpecs)) {
  const fg = spec.dark ? '#f9fafb' : '#13273b';
  const border = spec.dark ? '#374151' : '#cbd5e1';
  const lineSvg = spec.lines.map((line, i) =>
    `<text x="48" y="${150 + i * 74}" font-family="system-ui,Segoe UI,sans-serif" font-size="25" font-weight="600" fill="${fg}">${escapeXml(line)}</text>`
  ).join('\n  ');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="460" viewBox="0 0 960 460">
  <rect width="960" height="460" rx="18" fill="${spec.bg}" stroke="${border}" stroke-width="4"/>
  <rect x="0" y="0" width="960" height="86" rx="14" fill="${spec.headerBg}"/>
  <text x="48" y="54" font-family="system-ui,Segoe UI,sans-serif" font-size="30" font-weight="800" fill="#ffffff">${escapeXml(spec.title)}</text>
  ${lineSvg}
</svg>`;
  fs.writeFileSync(path.join(distImgDir, `${id}.svg`), svg, 'utf8');
}

const rawNewSets = [
  {
    id: 'rv26', img: 'images/rv26.jpg', altJa: 'ハーバー・ロースターズのランチスペシャルメニューカード',
    setting: 'カフェのランチメニューカードと同僚からの注文メモ。',
    passageTitle: 'Note from Kevin Park to Mia Sato',
    passageEn: 'Mia, I’m heading to Harbor Roasters at 12:15 P.M. I’ll order the Turkey Avocado Sandwich and Roasted Tomato Soup for myself, plus an Iced Matcha Latte.',
    passageJa: 'ミア、12時15分にハーバー・ロースターズへ行くよ。自分用にターキーアボカドサンドとローストトマトスープ、それにアイスマッチャラテを注文するつもり。',
    vocab: [['lunch combo', 'ランチセット'], ['specials', '特別メニュー']],
    qs: [
      { skill: '複数情報照合', diff: 'medium', stem: 'How much will Kevin pay for his sandwich and soup together?', stemJa: 'ケビンのサンドイッチとスープの合計はいくらになりますか？', choices: ['$13.00', '$15.50', '$17.50', '$19.00'], choicesJa: ['13.00ドル', '15.50ドル', '17.50ドル', '19.00ドル'], ans: 0, notes: ['12:15 P.M.は11:30 AM - 2:00 PMのランチコンボ対象時間なので$13.00になります。', '$15.50は単品合計（$9.50+$6.00）です。', '$17.50はラテ込みの金額です。', '$19.00は該当しません。'] },
      { skill: '複数情報照合', diff: 'hard', stem: 'What is the total cost of Kevin’s entire order?', stemJa: 'ケビンの注文全体の合計金額はいくらですか？', choices: ['$13.00', '$15.50', '$17.50', '$20.00'], choicesJa: ['13.00ドル', '15.50ドル', '17.50ドル', '20.00ドル'], ans: 2, notes: ['$13.00はラテが含まれていません。', '$15.50はコンボ未適用でラテなしです。', 'ランチコンボ（$13.00）＋アイスマッチャラテ（$4.50）＝$17.50です。', '$20.00はコンボ未適用＋ラテです。'] },
      { skill: '図表・画像参照', diff: 'easy', stem: 'How much is the Quinoa Garden Salad?', stemJa: 'キヌアガーデンサラダはいくらですか？', choices: ['$4.50', '$6.00', '$8.50', '$9.50'], choicesJa: ['4.50ドル', '6.00ドル', '8.50ドル', '9.50ドル'], ans: 2, notes: ['$4.50はラテです。', '$6.00はスープです。', 'メニューに「Quinoa Garden Salad - $8.50」とあります。', '$9.50はサンドイッチです。'] },
      { skill: '図表・画像参照', diff: 'easy', stem: 'When does the Lunch Combo end?', stemJa: 'ランチコンボは何時に終了しますか？', choices: ['11:30 AM', '12:15 PM', '2:00 PM', '3:00 PM'], choicesJa: ['午前11時30分', '午後12時15分', '午後2時00分', '午後3時00分'], ans: 2, notes: ['11:30 AMは開始時刻です。', '12:15 PMはケビンの来店時刻です。', '「11:30 AM - 2:00 PM」と記載されています。', '3:00 PMの記載はありません。'] }
    ]
  },
  {
    id: 'rv27', img: 'images/rv27.jpg', altJa: 'リバーサイド・アクアティックセンターのプール利用時間看板',
    setting: 'プールの利用時間看板と利用者のメッセージ。',
    passageTitle: 'Message from Sarah Cole to Ben Ortiz',
    passageEn: 'Ben, I want to swim laps at Riverside Aquatic Center on Wednesday morning before work. Also, my 8-year-old nephew wants to visit for Open Swim this weekend.',
    passageJa: 'ベン、水曜の朝に出勤前にリバーサイド・アクアティックセンターで周回水泳をしたいんだ。あと8歳の甥が今週末にオープン遊泳に行きたがっているの。',
    vocab: [['lap swim', '周回水泳'], ['accompanied', '同伴された']],
    qs: [
      { skill: '図表・画像参照', diff: 'easy', stem: 'During what hours can Sarah do Lap Swim on Wednesday?', stemJa: 'サラは水曜日の何時から何時まで周回水泳ができますか？', choices: ['6:00 AM - 9:00 AM', '10:00 AM - 12:00 PM', '1:00 PM - 6:00 PM', 'All day'], choicesJa: ['午前6時〜午前9時', '午前10時〜正午', '午後1時〜午後6時', '終日'], ans: 0, notes: ['「Lap Swim: Mon-Fri 6:00 AM - 9:00 AM」とあります。', '10:00 AMは火木の水泳エアロビクスです。', '1:00 PM - 6:00 PMはオープン遊泳です。', '終日ではありません。'] },
      { skill: '図表・画像参照', diff: 'easy', stem: 'What must Sarah wear in the lap lanes?', stemJa: 'サラは周回レーンで何を着用しなければなりませんか？', choices: ['Goggles', 'A swim cap', 'Flippers', 'A wristband'], choicesJa: ['ゴーグル', '水泳帽', 'フィン', 'リストバンド'], ans: 1, notes: ['ゴーグルの義務記載はありません。', '「Swim Caps Required in Lap Lanes」とあります。', 'フィンの記載はありません。', 'リストバンドの記載はありません。'] },
      { skill: '複数情報照合', diff: 'medium', stem: 'What rule applies to Sarah’s 8-year-old nephew?', stemJa: 'サラの8歳の甥にはどの規則が適用されますか？', choices: ['He cannot enter on weekends.', 'He must be accompanied by an adult.', 'He can only join Water Aerobics.', 'He must swim in the lap lanes.'], choicesJa: ['週末は入場できない。', '大人の同伴が必要である。', '水泳エアロビクスのみ参加できる。', '周回レーンで泳がなければならない。'], ans: 1, notes: ['週末は毎日1:00-6:00 PMでオープン遊泳があります。', '「Children under 10 must be accompanied by an adult」に該当します。', 'エアロビクス限定ではありません。', '周回レーン指定ではありません。'] },
      { skill: '図表・画像参照', diff: 'easy', stem: 'On which days is Water Aerobics held?', stemJa: '水泳エアロビクスは何曜日に開催されますか？', choices: ['Monday & Wednesday', 'Tuesday & Thursday', 'Friday & Saturday', 'Daily'], choicesJa: ['月・水', '火・木', '金・土', '毎日'], ans: 1, notes: ['月・水ではありません。', '「Water Aerobics: Tue & Thu 10:00 AM」とあります。', '金・土ではありません。', '毎日はオープン遊泳です。'] }
    ]
  },
  {
    id: 'rv28', img: 'images/rv28.svg', altJa: 'ウェストポート国際空港B12搭乗口の案内画面',
    setting: '空港搭乗口の案内画面と出張者のテキスト。',
    passageTitle: 'Text from Leo Tanaka to Boss',
    passageEn: 'I just cleared security at Westport International Airport and am walking to Gate B12 for my flight to Vancouver. My boarding pass says Group 2.',
    passageJa: 'ウェストポート国際空港の保安検査を通過し、バンクーバー行きのためB12ゲートへ向かっています。搭乗券はグループ2です。',
    vocab: [['boarding pass', '搭乗券'], ['departure', '出発']],
    qs: [
      { skill: '図表・画像参照', diff: 'easy', stem: 'What is Leo’s flight number?', stemJa: 'レオの便名は何番ですか？', choices: ['KW 408', 'B12', 'KW 1345', 'KW 1425'], choicesJa: ['KW 408', 'B12', 'KW 1345', 'KW 1425'], ans: 0, notes: ['画面に「Flight KW 408」と表示されています。', 'B12は搭乗口番号です。', '13:45は搭乗開始時刻です。', '14:25は出発時刻です。'] },
      { skill: '図表・画像参照', diff: 'easy', stem: 'What time does boarding begin?', stemJa: '搭乗は何時に開始されますか？', choices: ['13:15', '13:45', '14:00', '14:25'], choicesJa: ['13時15分', '13時45分', '14時00分', '14時25分'], ans: 1, notes: ['13:15の記載はありません。', '「Boarding: 13:45」と表示されています。', '14:00の記載はありません。', '14:25は出発時刻です。'] },
      { skill: '複数情報照合', diff: 'easy', stem: 'When will Leo be invited to board?', stemJa: 'レオはいつ搭乗案内されますか？', choices: ['In the first boarding wave', 'After Group 3', 'At 14:25', 'Only after a delay'], choicesJa: ['最初の搭乗グループで', 'グループ3のあとで', '14時25分に', '遅延のあとで'], ans: 0, notes: ['レオはGroup 2で、画面に「Group 1 & 2 Boarding First」とあります。', 'Group 3のあとではありません。', '14:25は出発時刻です。', 'StatusはOn Timeです。'] },
      { skill: '図表・画像参照', diff: 'easy', stem: 'What is the current status of the flight?', stemJa: 'この便の現在の運航状況はどうなっていますか？', choices: ['Delayed', 'Canceled', 'On Time', 'Departed'], choicesJa: ['遅延', '欠航', '定刻通り', '出発済み'], ans: 2, notes: ['遅延ではありません。', '欠航ではありません。', '「Status: On Time」と表示されています。', '出発済みではありません。'] }
    ]
  },
  {
    id: 'rv29', img: 'images/rv29.jpg', altJa: 'クリスプ＆クリーンのクリーニング料金看板',
    setting: 'クリーニング店の料金看板と顧客のメモ。',
    passageTitle: 'Note from Maya Ortiz',
    passageEn: 'Drop off one two-piece suit and two dress shirts at Crisp & Clean Dry Cleaners at 8:30 A.M. tomorrow. I need them back the same afternoon for a conference dinner.',
    passageJa: '明朝8時30分にクリスプ＆クリーンへツーピーススーツ1着とドレスシャツ2枚を出す。会議の夕食会のため当日午後に受け取る必要がある。',
    vocab: [['drop off', '預ける'], ['same-day service', '当日仕上げ']],
    qs: [
      { skill: '複数情報照合', diff: 'hard', stem: 'How much will Maya pay in total, including same-day service?', stemJa: '当日仕上げを含めたマヤの合計料金はいくらですか？', choices: ['$19.50', '$23.00', '$27.00', '$31.00'], choicesJa: ['19.50ドル', '23.00ドル', '27.00ドル', '31.00ドル'], ans: 2, notes: ['$19.50はシャツ1枚分しか含んでいません。', '$23.00は当日仕上げ料金（+$4.00）を含んでいません。', 'スーツ$16.00＋シャツ2枚（$3.50×2=$7.00）＋当日仕上げ$4.00＝$27.00です。', '$31.00は計算誤りです。'] },
      { skill: '複数情報照合', diff: 'easy', stem: 'Does Maya qualify for same-day service at 8:30 A.M.?', stemJa: '午前8時30分の預け入れで当日仕上げは利用できますか？', choices: ['Yes, because it is before 9:00 AM.', 'No, the shop opens at 9:00 AM.', 'No, suits cannot be done same-day.', 'Only on Saturdays.'], choicesJa: ['はい、午前9時前だからです。', 'いいえ、午前9時開店だからです。', 'いいえ、スーツは当日不可だからです。', '土曜日のみです。'], ans: 0, notes: ['7:30 AM開店で9:00 AM前の預け入れが条件なので利用可能です。', '開店は7:30 AMです。', 'スーツ不可の記載はありません。', '土曜限定の記載はありません。'] },
      { skill: '図表・画像参照', diff: 'easy', stem: 'How much does it cost to dry clean a winter coat?', stemJa: '冬用コートのクリーニング料金はいくらですか？', choices: ['$3.50', '$16.00', '$22.00', '$26.00'], choicesJa: ['3.50ドル', '16.00ドル', '22.00ドル', '26.00ドル'], ans: 2, notes: ['$3.50はドレスシャツです。', '$16.00はツーピーススーツです。', '「Winter Coat: $22.00」とあります。', '$26.00は当日仕上げ込みの金額です。'] },
      { skill: '図表・画像参照', diff: 'easy', stem: 'On which day is the dry cleaner closed?', stemJa: 'このクリーニング店の定休日は何曜日ですか？', choices: ['Monday', 'Friday', 'Saturday', 'Sunday'], choicesJa: ['月曜日', '金曜日', '土曜日', '日曜日'], ans: 3, notes: ['月曜は営業です。', '金曜は営業です。', '土曜は営業です。', '「Open Mon-Sat」とあるため日曜が定休です。'] }
    ]
  },
  {
    id: 'rv30', img: 'images/rv30.svg', altJa: 'ノーススター郵便の小包料金表',
    setting: '郵便局の料金表と発送担当者のメール。',
    passageTitle: 'Email from Hana Lee to Sam Patel',
    passageEn: 'Sam, please mail this $80 sensor sample via Northstar Postal Service. It needs to arrive within two days, and we want it insured.',
    passageJa: 'サム、この80ドルのセンサー試作品をノーススター郵便で発送してください。2日以内に届く必要があり、保険も付けたいです。',
    vocab: [['parcel', '小包'], ['insurance', '保険']],
    qs: [
      { skill: '複数情報照合', diff: 'easy', stem: 'Which shipping option best fits Hana’s requirements?', stemJa: 'ハナの条件に最も合う発送方法はどれですか？', choices: ['Standard Mail', 'Priority Mail', 'Express Overnight', 'Economy Surface'], choicesJa: ['普通郵便', 'プライオリティ便', '翌日速達', 'エコノミー船便'], ans: 1, notes: ['Standardは3-5日で保険なしです。', 'Priority Mail（2日・$100まで保険込み）が最適です。', 'Express Overnightは割高です。', 'エコノミー船便の記載はありません。'] },
      { skill: '図表・画像参照', diff: 'easy', stem: 'How much does Priority Mail cost?', stemJa: 'プライオリティ便の料金はいくらですか？', choices: ['$6.00', '$11.50', '$26.00', '$100.00'], choicesJa: ['6.00ドル', '11.50ドル', '26.00ドル', '100.00ドル'], ans: 1, notes: ['$6.00はStandardです。', '「Priority Mail (2 days): $11.50」とあります。', '$26.00はExpressです。', '$100は保険上限額です。'] },
      { skill: '図表・画像参照', diff: 'easy', stem: 'By what time does Express Overnight deliver the next day?', stemJa: '翌日速達は翌日の何時までに配達されますか？', choices: ['8:00 AM', '10:00 AM', '12:00 PM', '5:00 PM'], choicesJa: ['午前8時', '午前10時', '正午', '午後5時'], ans: 1, notes: ['8:00 AMではありません。', '「Next day by 10 AM」とあります。', '正午ではありません。', '午後5時ではありません。'] },
      { skill: '図表・画像参照', diff: 'easy', stem: 'Up to what amount is insurance included with Priority and Express?', stemJa: 'プライオリティ便と速達便にはいくらまでの保険が含まれますか？', choices: ['$26', '$50', '$80', '$100'], choicesJa: ['26ドル', '50ドル', '80ドル', '100ドル'], ans: 3, notes: ['$26は速達料金です。', '$50ではありません。', '$80は試作品の価格です。', '「Insurance up to $100 included」とあります。'] }
    ]
  }
];

// Generate remaining 20 sets (rv31 - rv50) concisely from structured specs so all 25 new sets = 100 questions are rich, accurate, and unique
const compactSpecs = [
  ['rv31', 'images/rv31.svg', 'オークツリー歯科の案内カード', '歯科医院の案内カードと新患のメール。', 'Email from Alex Cho', 'I am a new patient scheduled for a cleaning at 2:00 P.M. this Friday at Oaktree Dental Care. I want to make sure I arrive on time.', '今週金曜午後2時にクリーニング予約をしている新患です。時間通りに間に合うよう確認したいです。', [['cancellation', 'キャンセル'], ['checkup', '検診']],
    ['What time should Alex arrive for the 2:00 P.M. appointment?', 'アレックスは午後2時の予約に何時に到着すべきですか？', ['1:30 PM', '1:45 PM', '2:00 PM', '2:15 PM'], ['午後1時30分', '午後1時45分', '午後2時00分', '午後2時15分'], 1, '新患は15分前到着（arrive 15 minutes early）が求められているため1:45 PMです。'],
    ['What is the fee for canceling with less than 24 hours notice?', '24時間未満のキャンセルにかかる手数料はいくらですか？', ['$15', '$24', '$35', '$50'], ['15ドル', '24ドル', '35ドル', '50ドル'], 2, '「24-hour notice required for cancellations ($35 late fee)」とあります。'],
    ['What are Saturday emergency hours?', '土曜日の緊急診療時間は何時から何時までですか？', ['8:30 AM - 5:30 PM', '9:00 AM - 12:00 PM', '1:00 PM - 4:00 PM', 'Closed'], ['8:30-17:30', '9:00-12:00', '13:00-16:00', '休診'], 1, '「Saturday Emergency Hours: 9:00 AM - 12:00 PM」とあります。'],
    ['On which days are regular cleanings offered?', '通常のクリーニングは何曜日に実施されていますか？', ['Mon-Fri', 'Tue-Sat', 'Weekends only', 'Daily'], ['月〜金', '火〜土', '週末のみ', '毎日'], 0, '「Checkups & Cleanings: Mon-Fri 8:30 AM - 5:30 PM」とあります。']
  ],
  ['rv32', 'images/rv32.jpg', 'ページ＆パイン書店の著者イベントポスター', '書店の著者イベント案内と読者のメモ。', 'Note from Lisa Park', 'I want to attend the talk about Smart Cities at Page & Pine Bookstore and get my copy signed afterward.', 'ページ＆パイン書店で『Smart Cities』のトークイベントに参加し、終了後にサインをもらいたい。', [['author', '著者'], ['book signing', 'サイン会']],
    ['On what date will Lisa attend the event?', 'リサは何月何日のイベントに参加しますか？', ['May 12', 'May 19', 'May 26', 'June 1'], ['5月12日', '5月19日', '5月26日', '6月1日'], 1, 'Smart Cities（Marcus Bell）はMay 19です。'],
    ['What time does Marcus Bell’s talk begin?', 'マーカス・ベルの講演は何時に始まりますか？', ['6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM'], ['午後6時', '午後6時30分', '午後7時', '午後7時30分'], 1, '「May 19, 6:30 PM - Marcus Bell (Smart Cities)」とあります。'],
    ['How much does admission cost?', '入場料はいくらですか？', ['Free', '$5', '$10', '$15'], ['無料', '5ドル', '10ドル', '15ドル'], 0, '「Free Admission」と記載されています。'],
    ['Who is speaking on May 26?', '5月26日に登壇する著者は誰ですか？', ['Elena Vance', 'Marcus Bell', 'Priya Shah', 'Lisa Park'], ['エレナ・ヴァンス', 'マーカス・ベル', 'プリヤ・シャー', 'リサ・パーク'], 2, '「May 26, 7:00 PM - Priya Shah (Everyday Baking)」とあります。']
  ],
  ['rv33', 'images/rv33.svg', 'セーフボックス・トランクルームの料金表', 'トランクルームの料金表と利用者のメール。', 'Email from Omar Diaz', 'I am moving out of my 1-bedroom apartment for two months and need a climate-controlled unit at SafeBox Self Storage.', '1ベッドルームのアパートを2か月空けるため、空調管理付きのユニットを借りたいです。', [['climate-controlled', '空調管理付きの'], ['keypad access', '暗証番号アクセス']],
    ['Which unit size is recommended for a 1-bedroom apartment?', '1ベッドルームのアパートに適したサイズはどれですか？', ['Small', 'Medium', 'Large', 'Extra Large'], ['スモール', 'ミディアム', 'ラージ', '特大'], 1, '「Medium (10x10 ft): $120/mo - 1-Bedroom Apt」とあります。'],
    ['How much will Omar pay per month with climate control?', '空調管理付きの場合、オマールの月額料金はいくらですか？', ['$120', '$140', '$195', '$215'], ['120ドル', '140ドル', '195ドル', '215ドル'], 1, 'Medium（$120/mo）＋Climate-Controlled（+$20/mo）＝$140/moです。'],
    ['When can customers access their storage units?', '利用者はいつトランクルームへ入室できますか？', ['Weekdays only', '8 AM - 8 PM', '24/7', 'By appointment'], ['平日のみ', '8時〜20時', '24時間年中無休', '予約制'], 2, '「24/7 Keypad Access」と記載されています。'],
    ['What is the base monthly rate for a Small (5x5 ft) unit?', 'スモール（5x5フィート）の基本月額はいくらですか？', ['$45', '$65', '$85', '$120'], ['45ドル', '65ドル', '85ドル', '120ドル'], 1, '「Small (5x5 ft): $65/mo」とあります。']
  ],
  ['rv34', 'images/rv34.svg', 'スパークル・オートウォッシュの洗車メニュー看板', '洗車店のメニュー看板とドライバーのメモ。', 'Note from David Kim', 'I need an interior vacuum and tire shine in addition to a wax wash before picking up clients at the airport.', '空港へ顧客を迎えに行く前に、ワックス洗車に加えて車内掃除機とタイヤ艶出しをしたい。', [['undercarriage', '車体下部'], ['interior vacuum', '車内掃除機']],
    ['Which wash package should David choose?', 'デイビッドはどの洗車パッケージを選ぶべきですか？', ['Basic Wash', 'Deluxe Wash', 'Ultimate Wash', 'Express Rinse'], ['ベーシック', 'デラックス', 'アルティメット', '急行リンス'], 2, 'Interior Vacuum & Tire Shineが含まれるのはUltimate Wash（$24）です。'],
    ['How much does the Ultimate Wash cost?', 'アルティメット洗車の料金はいくらですか？', ['$10', '$16', '$24', '$32'], ['10ドル', '16ドル', '24ドル', '32ドル'], 2, '「Ultimate Wash: $24」とあります。'],
    ['What is included in the Basic Wash?', 'ベーシック洗車に含まれる内容は何ですか？', ['Exterior wash and dry', 'Undercarriage and wax', 'Interior vacuum', 'Tire shine'], ['外装洗車と乾燥', '車体下部とワックス', '車内掃除機', 'タイヤ艶出し'], 0, '「Basic Wash: $10 (Exterior Wash & Dry)」とあります。'],
    ['How much is the Unlimited Monthly Club?', '無制限月額クラブの料金はいくらですか？', ['$16/mo', '$24/mo', '$32/mo', '$40/mo'], ['月16ドル', '月24ドル', '月32ドル', '月40ドル'], 2, '「Unlimited Monthly Club: $32/mo」とあります。']
  ],
  ['rv35', 'images/rv35.svg', 'メトロ・アートギャラリーの夏季展示予定表', '美術館の展示予定表と来館者のメッセージ。', 'Message from Nora Lee', 'Let’s visit Metro Art Gallery on the first Friday of July around 6:00 P.M. to see the Textile Traditions exhibition.', '7月の第1金曜日の午後6時ごろ、メトロ・アートギャラリーへ『Textile Traditions』を観に行こう。', [['exhibition', '展示会'], ['ceramics', '陶芸']],
    ['In which gallery is Textile Traditions displayed?', '『Textile Traditions』はどのギャラリーで展示されていますか？', ['Gallery 1', 'Gallery 2', 'Gallery 3', 'Main Lobby'], ['ギャラリー1', 'ギャラリー2', 'ギャラリー3', 'メインロビー'], 2, '「Gallery 3: Textile Traditions (July 1 - September 5)」とあります。'],
    ['How much will Nora pay for admission on the first Friday of July at 6:00 P.M.?', '7月第1金曜の午後6時の入館料はいくらですか？', ['Free', '$5', '$10', '$15'], ['無料', '5ドル', '10ドル', '15ドル'], 0, '「Free Admission Every First Friday (5:00 PM - 9:00 PM)」の対象時間です。'],
    ['When does the Modern Ceramics exhibition end?', '『Modern Ceramics』展はいつ終了しますか？', ['June 10', 'July 15', 'August 20', 'September 5'], ['6月10日', '7月15日', '8月20日', '9月5日'], 1, '「Gallery 1: Modern Ceramics (June 1 - July 15)」とあります。'],
    ['Which exhibition runs from June 10 to August 20?', '6月10日から8月20日まで開催される展示はどれですか？', ['Modern Ceramics', 'Urban Photography', 'Textile Traditions', 'Sculpture Garden'], ['現代陶芸', '都市写真', '織物の伝統', '彫刻庭園'], 1, '「Gallery 2: Urban Photography (June 10 - August 20)」とあります。']
  ],
  ['rv36', 'images/rv36.svg', 'クリアビュー眼鏡店のサービス案内板', '眼鏡店の案内板と顧客のメモ。', 'Note from Kenji Sato', 'I have vision insurance and want an eye exam plus two pairs of single-vision glasses today.', '視力保険に入っているので、今日視力検査と単焦点メガネを2本作りたい。', [['comprehensive', '総合的な'], ['adjustment', '調整']],
    ['How much will Kenji pay for the eye exam with insurance?', '保険があるケンジの視力検査料はいくらですか？', ['Free', '$40', '$75', '$129'], ['無料', '40ドル', '75ドル', '129ドル'], 0, '「Comprehensive Eye Exam: $75 (Free with Insurance)」とあります。'],
    ['What discount applies to Kenji’s second pair of glasses?', '2本目のメガネに適用される割引はいくらですか？', ['20% off', '30% off', '40% off', '50% off'], ['20%オフ', '30%オフ', '40%オフ', '50%オフ'], 2, '「2nd Pair Discount: 40% OFF same-day purchase」とあります。'],
    ['What is the starting price for a complete frame and single-vision lenses?', 'フレーム＋単焦点レンズの最低価格はいくらですか？', ['$75', '$99', '$129', '$150'], ['75ドル', '99ドル', '129ドル', '150ドル'], 2, '「Starting at $129」とあります。'],
    ['Which services are offered free anytime?', 'いつでも無料で受けられるサービスは何ですか？', ['Eye exams', 'Frame adjustments and cleaning', 'Lens tinting', 'Contact lens refills'], ['視力検査', 'フレーム調整とクリーニング', 'レンズ着色', 'コンタクト補充'], 1, '「Free Frame Adjustments & Cleaning Anytime」とあります。']
  ],
  ['rv37', 'images/rv37.svg', 'サニーベール・ペットホテルの料金表', 'ペットホテルの料金表と飼い主のメール。', 'Email from Claire Bell', 'I am traveling for one night and would like to board my two dogs together in the same suite at Sunnyvale Pet Boarding.', '1泊旅行のため、犬2匹を同じスイートで預けたいです。', [['boarding', 'ペット預かり'], ['vaccination', '予防接種']],
    ['How much will Claire pay for the first dog for one night?', '1匹目の犬の1泊料金はいくらですか？', ['$28', '$30', '$48', '$60'], ['28ドル', '30ドル', '48ドル', '60ドル'], 2, '「Dog Suite: $48 / night」とあります。'],
    ['What discount applies to the second dog in the same suite?', '同じスイートの2匹目に適用される割引率は？', ['10% off', '20% off', '30% off', '50% off'], ['10%オフ', '20%オフ', '30%オフ', '50%オフ'], 1, '「Second Pet in Same Suite: 20% OFF」とあります。'],
    ['What must owners bring at check-in?', 'チェックイン時に飼い主が持参すべきものは何ですか？', ['A crate', 'Current vaccination records', 'Pet toys', 'A leash only'], ['ケージ', '最新の予防接種記録', 'おもちゃ', 'リードのみ'], 1, '「Current Vaccination Records Required at Check-in」とあります。'],
    ['How much is a Cat Condo per night?', 'キャットコンドの1泊料金はいくらですか？', ['$20', '$28', '$30', '$48'], ['20ドル', '28ドル', '30ドル', '48ドル'], 1, '「Cat Condo: $28 / night」とあります。']
  ],
  ['rv38', 'images/rv38.svg', 'ハーバー・カヤックレンタルの料金看板', 'カヤックレンタルの料金看板と観光客のメッセージ。', 'Message from Ryan Cruz', 'Let’s rent a tandem kayak for four hours starting at 11:00 A.M. We don’t need to buy dry bags because they provide them.', '午前11時から4時間、2人乗りカヤックを借りよう。ドライバッグは貸してくれるから買わなくていいね。', [['tandem', '2人乗りの'], ['dock', '桟橋']],
    ['How much will Ryan pay for the four-hour tandem kayak rental?', 'ライアンの2人乗りカヤック4時間の料金はいくらですか？', ['$28', '$45', '$65', '$112'], ['28ドル', '45ドル', '65ドル', '112ドル'], 2, '「Tandem Kayak: $28 / hr | $65 Half Day (4 hrs)」とあります。'],
    ['What items are included free with every rental?', 'レンタルに無料で含まれるものは何ですか？', ['Wetsuits', 'Life jackets and dry bags', 'Snacks and water', 'Waterproof cameras'], ['ウェットスーツ', 'ライフジャケットとドライバッグ', '軽食と水', '防水カメラ'], 1, '「Life Jackets & Dry Bags Included Free」とあります。'],
    ['What is the latest time a rental can leave the dock?', '最終レンタルの出発時刻は何時ですか？', ['3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM'], ['午後3時30分', '午後4時00分', '午後4時30分', '午後5時00分'], 2, '「Last Rental Leaves Dock at 4:30 PM」とあります。'],
    ['How much is a single kayak for one hour?', '1人乗りカヤック1時間の料金はいくらですか？', ['$18', '$28', '$45', '$65'], ['18ドル', '28ドル', '45ドル', '65ドル'], 0, '「Single Kayak: $18 / hr」とあります。']
  ],
  ['rv39', 'images/rv39.svg', 'ブルームフィールド生花店の配達案内板', '生花店の配達案内板と注文者のメモ。', 'Note from Hannah Cho', 'Order an $85 bouquet from Bloomfield Florist at 1:15 P.M. today for same-day delivery to the office.', '今日午後1時15分にブルームフィールド生花店で85ドルの花束を当日配達で注文する。', [['bouquet', '花束'], ['consultation', '相談']],
    ['How much will Hannah pay for delivery?', 'ハンナの配達料はいくらになりますか？', ['Free', '$12', '$20', '$75'], ['無料', '12ドル', '20ドル', '75ドル'], 0, '85ドルは「Free on orders over $75」を満たすため無料です。'],
    ['Does Hannah’s 1:15 P.M. order qualify for same-day delivery?', '午後1時15分の注文は当日配達に間に合いますか？', ['Yes, because it is before 2:00 PM.', 'No, cutoff is noon.', 'Only on Sundays.', 'Only with a $12 rush fee.'], ['はい、午後2時前だからです。', 'いいえ、正午締切だからです。', '日曜日のみです。', '12ドルの急ぎ料金が必要です。'], 0, '「Same-Day Local Delivery: Order before 2:00 PM」に間に合います。'],
    ['On which weekend day does the shop deliver?', '週末のうち配達を行っている曜日はいつですか？', ['Saturday only', 'Sunday only', 'Both Saturday and Sunday', 'Neither'], ['土曜日のみ', '日曜日のみ', '土日両方', 'どちらも不可'], 0, '「Weekend Deliveries: Saturday Only (Closed Sunday)」とあります。'],
    ['How are custom wedding consultations arranged?', 'ウェディング相談はどのように利用しますか？', ['Walk-in only', 'By appointment', 'Online chat only', 'On Sundays'], ['予約不要', '予約制', 'チャットのみ', '日曜日のみ'], 1, '「Custom Wedding Consultations by Appointment」とあります。']
  ],
  ['rv40', 'images/rv40.svg', 'サウンドウェーブ音楽教室の料金表', '音楽教室の料金表と受講希望者のメール。', 'Email from Lucas Meyer', 'I am a complete beginner interested in group violin classes and renting an instrument at Soundwave Music School.', '初心者ですが、グループクラスと楽器レンタルに興味があります。', [['private lesson', '個人レッスン'], ['instrument', '楽器']],
    ['How much is each group beginner class session?', '初心者グループクラス1回あたりの料金はいくらですか？', ['$22', '$25', '$35', '$62'], ['22ドル', '25ドル', '35ドル', '62ドル'], 0, '「Group Beginner Classes: $22 / session」とあります。'],
    ['What is the maximum number of students in a group class?', 'グループクラスの最大定員は何名ですか？', ['4 students', '6 students', '8 students', '10 students'], ['4名', '6名', '8名', '10名'], 1, '「Max 6 students」と記載されています。'],
    ['What is the starting monthly rate for instrument rentals?', '楽器レンタルの最低月額料金はいくらですか？', ['$22/mo', '$25/mo', '$35/mo', '$62/mo'], ['月22ドル', '月25ドル', '月35ドル', '月62ドル'], 1, '「Instrument Rentals Available Starting at $25/mo」とあります。'],
    ['How much does a 60-minute private lesson cost?', '60分の個人レッスンはいくらですか？', ['$22', '$35', '$62', '$70'], ['22ドル', '35ドル', '62ドル', '70ドル'], 2, '「60-Minute Private Lesson: $62」とあります。']
  ],
  ['rv41', 'images/rv41.svg', 'グリーンウェイEV充電ハブの料金看板', 'EV充電ステーションの料金看板とドライバーのメモ。', 'Note from Daniel Reed', 'Charging my electric car at Greenway EV Charging Hub at 11:30 P.M. using DC Fast Charging. Must unplug within 10 minutes of reaching 100%.', '午後11時30分にDC急速充電を利用する。満充電から10分以内にプラグを抜くこと。', [['off-peak', 'オフピーク時間帯'], ['idle fee', '放置料金']],
    ['What discount does Daniel receive at 11:30 P.M.?', '午後11時30分に適用される割引はいくらですか？', ['10% off', '15% off', '20% off', 'Free'], ['10%オフ', '15%オフ', '20%オフ', '無料'], 2, '「Off-Peak Discount (11 PM - 6 AM): 20% OFF」に該当します。'],
    ['What is the standard rate for DC Fast Charging?', 'DC急速充電の通常料金はいくらですか？', ['$0.25 / kWh', '$0.45 / kWh', '$0.50 / kWh', '$1.00 / kWh'], ['0.25ドル/kWh', '0.45ドル/kWh', '0.50ドル/kWh', '1.00ドル/kWh'], 1, '「DC Fast Charging (150 kW): $0.45 / kWh」とあります。'],
    ['Why must Daniel unplug within 10 minutes after a full charge?', '満充電から10分以内に抜く必要があるのはなぜですか？', ['The station closes.', 'To avoid the $0.50/min idle fee.', 'The battery will drain.', 'To get the off-peak rate.'], ['施設が閉まるから。', '1分0.50ドルの放置料金を避けるため。', '電池が減るから。', '夜間割引を受けるため。'], 1, '「Idle Fee after Full Charge: $0.50 / min (10-min grace)」とあります。'],
    ['What is the Level 2 AC Charging rate?', 'レベル2 AC充電の料金はいくらですか？', ['$0.25 / kWh', '$0.45 / kWh', '$0.50 / kWh', '$0.75 / kWh'], ['0.25ドル/kWh', '0.45ドル/kWh', '0.50ドル/kWh', '0.75ドル/kWh'], 0, '「Level 2 AC Charging (7 kW): $0.25 / kWh」とあります。']
  ],
  ['rv42', 'images/rv42.svg', 'コーナーストーン金物店の工具レンタル料金表', '工具レンタルの料金表と利用者のメモ。', 'Note from Victor Grant', 'Rent a pressure washer for a full day from Cornerstone Hardware to clean the patio. Bring driver license and deposit.', 'パティオ清掃のため高圧洗浄機を1日借りる。運転免許証とデポジットを持参。', [['pressure washer', '高圧洗浄機'], ['refundable deposit', '返金可能な保証金']],
    ['How much is the full-day rental rate for a pressure washer?', '高圧洗浄機の1日レンタル料金はいくらですか？', ['$30', '$38', '$45', '$55'], ['30ドル', '38ドル', '45ドル', '55ドル'], 3, '「Pressure Washer: $38 / 4 hrs | $55 / day」とあります。'],
    ['How much is the refundable deposit?', '返金可能な保証金はいくらですか？', ['$20', '$30', '$50', '$55'], ['20ドル', '30ドル', '50ドル', '55ドル'], 2, '「$50 Refundable Deposit Required」とあります。'],
    ['How much does it cost to rent a 24-ft extension ladder for a day?', '24フィートの伸縮はしごの1日レンタル料はいくらですか？', ['$20', '$30', '$38', '$45'], ['20ドル', '30ドル', '38ドル', '45ドル'], 0, '「Extension Ladder (24 ft): $20 / day」とあります。'],
    ['How much is a tile saw for 4 hours?', 'タイルカッター4時間の料金はいくらですか？', ['$20', '$30', '$38', '$45'], ['20ドル', '30ドル', '38ドル', '45ドル'], 1, '「Tile Saw: $30 / 4 hrs」とあります。']
  ],
  ['rv43', 'images/rv43.svg', 'シティビュー・コワーキングのデイパス料金表', 'コワーキングスペースの料金表とリモートワーカーのメール。', 'Email from Elena Rossi', 'I will be working in town for five days next month and want to use CityView Coworking. I have several client calls, so phone booths will be helpful.', '来月5日間滞在するため利用したいです。顧客通話があるので電話ブースがあると助かります。', [['hot desk', 'フリーアドレス席'], ['bottomless', 'おかわり自由の']],
    ['How much does Elena save with the 5-Day Flex Pack compared to five separate day passes?', '5日パックは1日パス5回分よりいくらお得ですか？', ['$10', '$15', '$20', '$25'], ['10ドル', '15ドル', '20ドル', '25ドル'], 2, '1日パス$25×5＝$125、5日パック$105なので$20お得です。'],
    ['How long is the 5-Day Flex Pack valid?', '5日フレックスパックの有効期限は何日間ですか？', ['30 days', '45 days', '60 days', '90 days'], ['30日間', '45日間', '60日間', '90日間'], 2, '「Valid 60 days」と記載されています。'],
    ['How much do private phone booths cost for pass holders?', 'パス所持者の個室電話ブース利用料はいくらですか？', ['Free', '$5/hr', '$10/hr', '$25'], ['無料', '時給5ドル', '時給10ドル', '25ドル'], 0, '「Private Phone Booths: Free for Pass Holders」とあります。'],
    ['What are the day pass hours?', 'デイパスの利用時間は何時から何時までですか？', ['7:00 AM - 5:00 PM', '8:00 AM - 6:00 PM', '9:00 AM - 7:00 PM', '24 hours'], ['7時〜17時', '8時〜18時', '9時〜19時', '24時間'], 1, '「8:00 AM - 6:00 PM」とあります。']
  ],
  ['rv44', 'images/rv44.svg', 'レッドウッド・ボウリング場の料金看板', 'ボウリング場の料金看板と家族の計画メモ。', 'Note from Sofia Patel', 'Taking our family of four to Redwood Bowling Lanes on Saturday for two hours with pizza included.', '土曜日に家族4人で2時間、ピザ付きプランでボウリングに行く。', [['shoe rental', '貸し靴'], ['package', 'パック料金']],
    ['How much is the Family Package?', 'ファミリーパッケージの料金はいくらですか？', ['$40', '$52', '$58', '$65'], ['40ドル', '52ドル', '58ドル', '65ドル'], 2, '「Family Package (2 hrs + 4 shoes + pizza): $58」とあります。'],
    ['How much is a single game on Saturday?', '土曜日の1ゲーム料金はいくらですか？', ['$4.00', '$5.50', '$7.50', '$10.00'], ['4.00ドル', '5.50ドル', '7.50ドル', '10.00ドル'], 2, '「Fri-Sun: $7.50 / game」とあります。'],
    ['When is Cosmic Bowling held?', 'コズミックボウリングはいつ開催されますか？', ['Every Thursday', 'Every Friday 8-11 PM', 'Every Saturday afternoon', 'Every Sunday'], ['毎週木曜', '毎週金曜20時〜23時', '毎週土曜午後', '毎週日曜'], 1, '「Cosmic Bowling Every Friday 8:00 PM - 11:00 PM」とあります。'],
    ['How much is shoe rental per person?', '1人あたりの貸し靴料金はいくらですか？', ['$2.00', '$4.00', '$5.50', '$7.50'], ['2.00ドル', '4.00ドル', '5.50ドル', '7.50ドル'], 1, '「Shoe Rental: $4.00 per person」とあります。']
  ],
  ['rv45', 'images/rv45.svg', 'ベイサイド・ヨガスタジオのクラスパス料金表', 'ヨガスタジオの料金表と新規生徒のメッセージ。', 'Message from Chloe Lin', 'I have never been to Bayside Yoga Studio before. I want to try the new student unlimited offer for two weeks.', '初めてなので、新規生徒向けの2週間通い放題プランを試したいです。', [['drop-in', '1回単発利用'], ['unlimited', '無制限の']],
    ['How much is the Intro Offer for new students?', '新規生徒向けの初回限定プランはいくらですか？', ['$20', '$39', '$85', '$150'], ['20ドル', '39ドル', '85ドル', '150ドル'], 1, '「Intro Offer (New Students): 2 Weeks Unlimited $39」とあります。'],
    ['How much will Chloe pay for mat rental as an Unlimited member?', '通い放題会員のクロエのマットレンタル料はいくらですか？', ['Free', '$3', '$5', '$10'], ['無料', '3ドル', '5ドル', '10ドル'], 0, '「Mat Rental: $3 (Free for Unlimited Members)」とあります。'],
    ['How much does a 10-Class Pack cost?', '10回券の料金はいくらですか？', ['$39', '$85', '$150', '$200'], ['39ドル', '85ドル', '150ドル', '200ドル'], 2, '「10-Class Pack: $150」とあります。'],
    ['What is the price of a single drop-in class?', '1回単発利用の料金はいくらですか？', ['$15', '$20', '$25', '$39'], ['15ドル', '20ドル', '25ドル', '39ドル'], 1, '「Single Drop-In Class: $20」とあります。']
  ],
  ['rv46', 'images/rv46.svg', 'メトロトランジットの運賃ゾーン案内板', '公共交通機関の運賃表と学生のメモ。', 'Note from Yuki Mori', 'I am a university student riding one way within Zone 1 tomorrow, then taking the Airport Express on Friday.', '大学生です。明日はゾーン1内を片道乗車し、金曜はエアポート急行に乗ります。', [['fare zone', '運賃ゾーン'], ['add-on', '追加料金']],
    ['How much is a regular single fare in Zone 1?', 'ゾーン1の通常片道運賃はいくらですか？', ['$1.25', '$2.50', '$3.75', '$6.00'], ['1.25ドル', '2.50ドル', '3.75ドル', '6.00ドル'], 1, '「Zone 1 (City Center): $2.50 Single」とあります。'],
    ['What discount do students receive on single fares?', '学生は片道運賃が何割引になりますか？', ['20% off', '25% off', '50% off', 'Free'], ['20%オフ', '25%オフ', '50%オフ', '無料'], 2, '「Seniors (65+) & Students: 50% OFF Single Fares」とあります。'],
    ['How much is the Airport Express add-on?', 'エアポート急行の追加料金はいくらですか？', ['$2.50', '$3.75', '$4.00', '$6.00'], ['2.50ドル', '3.75ドル', '4.00ドル', '6.00ドル'], 2, '「Airport Express Add-on: +$4.00」とあります。'],
    ['How much is a Zone 2 Day Pass?', 'ゾーン2の1日乗車券はいくらですか？', ['$3.75', '$6.00', '$9.00', '$12.00'], ['3.75ドル', '6.00ドル', '9.00ドル', '12.00ドル'], 2, '「Zone 2 (Suburbs): $3.75 Single | $9.00 Day Pass」とあります。']
  ],
  ['rv47', 'images/rv47.svg', 'アルチザン額装スタジオの納期・オプション案内板', '額装店の案内板と顧客のメール。', 'Email from Priya Nair', 'I need one diploma framed quickly for a ceremony next week, plus UV-protective glass.', '来週の式典のため卒業証書を急ぎで額装し、UVカットガラスも付けたいです。', [['turnaround', '納期・仕上がり期間'], ['rush service', '急ぎ仕上げ']],
    ['How many business days does Rush Service take?', '急ぎ仕上げ（Rush Service）は何営業日で仕上がりますか？', ['1 business day', '3 business days', '7 business days', '10 business days'], ['1営業日', '3営業日', '7営業日', '10営業日'], 1, '「Rush Service (3 Business Days): +$25 per frame」とあります。'],
    ['How much extra will Priya pay for both Rush Service and UV-protective glass?', '急ぎ仕上げとUVカットガラスの両方で追加料金はいくらですか？', ['$18', '$25', '$43', '$50'], ['18ドル', '25ドル', '43ドル', '50ドル'], 2, 'Rush Service（+$25）＋UVガラス（+$18）＝$43です。'],
    ['How long does standard custom framing take?', '通常のカスタム額装の納期はどれくらいですか？', ['3 business days', '5 business days', '7-10 business days', '14 business days'], ['3営業日', '5営業日', '7〜10営業日', '14営業日'], 2, '「Standard Custom Framing: 7-10 Business Days」とあります。'],
    ['Is an appointment required for a design consultation?', 'デザイン相談に予約は必要ですか？', ['Yes, 48 hours ahead', 'No, walk-ins are welcome', 'Only on Saturdays', 'Yes, with a $25 fee'], ['はい、48時間前まで', 'いいえ、予約なしで歓迎', '土曜のみ必要', 'はい、25ドル必要'], 1, '「Free Design Consultation — Walk-ins Welcome」とあります。']
  ],
  ['rv48', 'images/rv48.svg', 'メドウブルック・ゴルフコースの料金看板', 'ゴルフ場の料金看板とゴルファーのメッセージ。', 'Message from Ben Walker', 'Let’s play 18 holes at Meadowbrook Golf Course at 3:30 P.M. on Saturday and rent a cart.', '土曜の午後3時30分から18ホールをカート付きで回ろう。', [['green fee', 'プレー料金'], ['twilight rate', '薄暮（夕方）料金']],
    ['How much is Ben’s green fee at 3:30 P.M.?', '午後3時30分からのベンのプレー料金はいくらですか？', ['$26', '$29', '$42', '$58'], ['26ドル', '29ドル', '42ドル', '58ドル'], 1, '3:00 PM以降は「Twilight Rate (After 3:00 PM): $29 for 18 Holes」が適用されます。'],
    ['How much is cart rental per player?', '1人あたりのカートレンタル料はいくらですか？', ['$18', '$25', '$26', '$29'], ['18ドル', '25ドル', '26ドル', '29ドル'], 0, '「Cart Rental: $18 per player」とあります。'],
    ['What is the regular weekend 18-hole green fee?', '週末の通常18ホール料金はいくらですか？', ['$26', '$42', '$58', '$65'], ['26ドル', '42ドル', '58ドル', '65ドル'], 2, '「18 Holes (Weekday): $42 | (Weekend): $58」とあります。'],
    ['How much does club rental cost?', 'クラブレンタルの料金はいくらですか？', ['$18', '$25', '$26', '$29'], ['18ドル', '25ドル', '26ドル', '29ドル'], 1, '「Club Rental: $25」とあります。']
  ],
  ['rv49', 'images/rv49.svg', 'テックフィックス修理バーの料金看板', 'スマホ・PC修理店の料金看板と顧客のメモ。', 'Note from Grace Kim', 'Drop off my phone for a cracked screen replacement and ask them to run a diagnostic check on my slow laptop.', 'スマホの画面割れ修理を頼み、動きの遅いノートPCの診断チェックもお願いする。', [['diagnostic', '診断'], ['warranty', '保証']],
    ['How long does a phone screen replacement take?', 'スマホの画面交換にはどれくらい時間がかかりますか？', ['30 minutes', '45 minutes', '60 minutes', '90 minutes'], ['30分', '45分', '60分', '90分'], 1, '「Phone Screen Replacement: $89 (Ready in 45 min)」とあります。'],
    ['How much does the laptop diagnostic check cost?', 'ノートPCの診断チェック料金はいくらですか？', ['Free', '$25', '$49', '$89'], ['無料', '25ドル', '49ドル', '89ドル'], 0, '「Laptop Diagnostic Check: Free ($0)」とあります。'],
    ['How long is the warranty on parts and labor?', '部品と作業の保証期間はどれくらいですか？', ['30 days', '60 days', '90 days', '1 year'], ['30日間', '60日間', '90日間', '1年間'], 2, '「90-Day Warranty on All Parts & Labor」とあります。'],
    ['How much is a battery replacement?', 'バッテリー交換の料金はいくらですか？', ['$30', '$49', '$89', '$90'], ['30ドル', '49ドル', '89ドル', '90ドル'], 1, '「Battery Replacement: $49」とあります。']
  ],
  ['rv50', 'images/rv50.svg', 'サミット・スキーロッジのリフト券料金表', 'スキー場のリフト券料金表と旅行者のメール。', 'Email from Jordan Bell', 'We are arriving at Summit Ski Lodge at 1:00 P.M. this Saturday, so we only need afternoon lift tickets. We will book online three days in advance.', '今週土曜の午後1時に到着するので午後のリフト券だけで十分です。3日前にオンライン予約します。', [['lift ticket', 'リフト券'], ['in advance', '前もって']],
    ['What is the base price of a half-day afternoon lift ticket?', '午後半日リフト券の通常価格はいくらですか？', ['$52', '$56', '$78', '$85'], ['52ドル', '56ドル', '78ドル', '85ドル'], 0, '「Half-Day Afternoon (12:30 PM - 4:00 PM): $52」とあります。'],
    ['What discount will Jordan get by booking online three days ahead?', '3日前にオンライン予約すると何割引になりますか？', ['10% off', '15% off', '20% off', '25% off'], ['10%オフ', '15%オフ', '20%オフ', '25%オフ'], 1, '48時間前以上の予約で「Save 15% When Booking Online 48 Hours Ahead」が適用されます。'],
    ['How much is a full-day lift ticket for a 14-year-old?', '14歳の1日リフト券はいくらですか？', ['$52', '$56', '$78', '$80'], ['52ドル', '56ドル', '78ドル', '80ドル'], 1, '「Youth (6-17) & Seniors (65+): $56 Full Day」とあります。'],
    ['What time do the lifts close?', 'リフトの営業終了時刻は何時ですか？', ['12:30 PM', '3:00 PM', '4:00 PM', '5:00 PM'], ['午後12時30分', '午後3時00分', '午後4時00分', '午後5時00分'], 2, '「9:00 AM - 4:00 PM」と記載されています。']
  ]
];

for (const c of compactSpecs) {
  const [id, img, altJa, setting, passageTitle, passageEn, passageJa, vocab, ...qTuples] = c;
  rawNewSets.push({
    id, img, altJa, setting, passageTitle, passageEn, passageJa, vocab,
    qs: qTuples.map(([stem, stemJa, choices, choicesJa, ans, correctNote], i) => ({
      skill: i === 0 ? '複数情報照合' : '図表・画像参照',
      diff: i === 0 ? 'medium' : 'easy',
      stem, stemJa, choices, choicesJa, ans,
      notes: choices.map((ch, idx) => idx === ans ? correctNote : `${ch} は案内板・本文の条件と一致しません。`)
    }))
  });
}

const letters = ['A', 'B', 'C', 'D'];
let qNumber = 101;

const newSets = rawNewSets.map((s) => {
  const passageId = `${s.id}-d1`;
  const mediaId = `${s.id}-m1`;
  const items = s.qs.map((q) => {
    const num = qNumber++;
    const itemId = `rv-q${String(num).padStart(3, '0')}`;
    const choices = q.choices.map((text, idx) => ({ id: letters[idx], text }));
    const answerId = letters[q.ans];
    const choiceExplanationsJa = {};
    const choiceTranslations = {};
    letters.forEach((L, idx) => {
      choiceExplanationsJa[L] = q.notes[idx];
      choiceTranslations[L] = q.choicesJa[idx];
    });
    return {
      id: itemId,
      number: num,
      stem: q.stem,
      choices,
      answerId,
      skill: q.skill,
      difficulty: q.diff,
      evidence: [
        { refId: mediaId, noteJa: '画像内の該当表記' },
        { refId: passageId, noteJa: '本文の条件・文脈' }
      ],
      explanationJa: q.notes[q.ans],
      translationJa: { stem: q.stemJa, choices: choiceTranslations },
      choiceExplanationsJa,
      vocabulary: s.vocab.map(([term, meaningJa]) => ({ term, meaningJa }))
    };
  });

  return {
    setId: s.id,
    part: 7,
    setting: s.setting,
    passages: [{ id: passageId, type: 'document', title: s.passageTitle, text: s.passageEn, translationJa: s.passageJa }],
    media: [{ id: mediaId, type: 'image', src: s.img, altJa: s.altJa }],
    items
  };
});

exam.titleJa = 'リーディング画像問題 200問（Part 7）';
exam.parts[0].sets = [...existingSets, ...newSets];

fs.writeFileSync(contentExamPath, JSON.stringify(exam, null, 2), 'utf8');
fs.writeFileSync(distExamPath, JSON.stringify(exam, null, 2), 'utf8');

console.log(`Updated reading-visual-01: ${exam.parts[0].sets.length} sets, ${qNumber - 1} questions.`);
