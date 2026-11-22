import fs from 'node:fs';
import path from 'node:path';

const distImgDir = path.resolve('dist/reading-visual/r1/images');
const distExamPath = path.resolve('dist/reading-visual/r1/exam.json');
const contentExamPath = path.resolve('content/reading-visual-01/exam.json');

fs.mkdirSync(distImgDir, { recursive: true });
fs.mkdirSync(path.dirname(contentExamPath), { recursive: true });

// 11 SVG signage images for sets where AI image generation hit 429 quota
const svgSpecs = {
  rv13: {
    bg: '#fff8eb', headerBg: '#9b2c2c', title: 'OAKWOOD HARDWARE - SPRING SALE',
    lines: [
      '20% OFF All Garden Tools',
      'BUY 2 GET 1 FREE Paint Brushes',
      'Valid June 1 - June 14',
      'Excludes Power Tools & Clearance Items'
    ]
  },
  rv15: {
    bg: '#fefce8', headerBg: '#1e3a5f', title: 'SILVERLINE LOGISTICS - WAREHOUSE ZONES',
    lines: [
      'ZONE A: Receiving & Inspection',
      'ZONE B: Cold Storage (4 C)',
      'ZONE C: Packing & Dispatch',
      'SAFETY RULE: Hard Hats & Safety Vests Required Beyond Yellow Line'
    ]
  },
  rv17: {
    bg: '#f6f9f0', headerBg: '#2f5d3a', title: 'SUNRIDGE FARMERS MARKET - DIRECTORY',
    lines: [
      'Open Saturdays 8:00 AM - 1:00 PM (Rain or Shine)',
      'Row A: Fresh Produce & Herbs | Row B: Artisan Bread & Pastries',
      'Row C: Local Honey & Jams | Row D: Cut Flowers & Potted Plants',
      'Info & Token Tent: Main Archway'
    ]
  },
  rv18: {
    bg: '#f0f6fc', headerBg: '#124d75', title: 'METROPRINT COPY SHOP - SERVICES',
    lines: [
      'Black & White Copies: $0.10 / page',
      'Color Copies: $0.45 / page',
      'Spiral Binding: $4.00 / document | Poster (24x36 in): $15.00',
      'BULK DISCOUNT: 10% OFF orders of 100+ pages'
    ]
  },
  rv19: {
    bg: '#f0fdf4', headerBg: '#166534', title: 'PINEHURST BIKE RENTAL - RATES',
    lines: [
      '1 Hour: $10 | Half Day (4 Hours): $22 | Full Day: $35',
      'Helmet & Lock Included Free',
      'Child Seats Available: $5 / day',
      'All bikes must be returned by 6:00 PM'
    ]
  },
  rv20: {
    bg: '#111827', headerBg: '#1f2937', title: "BAYVIEW CINEMA - TODAY'S SHOWTIMES", dark: true,
    lines: [
      'Screen 1: Ocean Drift — 1:15 PM, 4:00 PM, 7:10 PM',
      'Screen 2: City Lights — 1:45 PM, 5:15 PM, 8:00 PM',
      'Screen 3: Wild Trail — 2:30 PM, 6:00 PM',
      'Matinee Discount ($9) for all shows before 4:00 PM'
    ]
  },
  rv21: {
    bg: '#f8fafc', headerBg: '#0f3d6e', title: 'KESTREL AIRLINES - BAGGAGE ALLOWANCE',
    lines: [
      'Carry-on Bag: Max 10 kg (fits overhead bin)',
      'Checked Bag: Max 23 kg (1 free on Flex fares)',
      'Oversize / Overweight Fee: $60 per bag',
      'Liquids in Carry-on: Max 100 ml per container'
    ]
  },
  rv22: {
    bg: '#f4f7fb', headerBg: '#2b4c7e', title: 'BRIDGEWATER UNIVERSITY - CAMPUS SHUTTLE',
    lines: [
      'Loop Route: Main Quad -> Science Hall -> North Dorms -> Sports Complex -> Train Station',
      'Frequency: Every 15 minutes (Mon-Fri, 7:00 AM - 10:00 PM)',
      'Weekend Service: Every 30 minutes (9:00 AM - 8:00 PM)',
      'Free with Student or Staff ID'
    ]
  },
  rv23: {
    bg: '#fdf8f3', headerBg: '#5c3a21', title: 'LINDEN COFFEE ROASTERS - REWARDS',
    lines: [
      'Loyalty Card: Buy 8 drinks, get your 9th drink FREE',
      'Reusable Cup Discount: $0.50 off any beverage',
      'Friday Special: 15% off all 250g roasted bean bags',
      'Ask your barista to stamp your card at checkout'
    ]
  },
  rv24: {
    bg: '#f5f7fa', headerBg: '#1e293b', title: 'HORIZON CONFERENCE CENTER - TODAY AGENDA',
    lines: [
      '09:00 AM - Opening Keynote (Hall A)',
      '10:30 AM - Cloud Security Workshop (Room B)',
      '01:00 PM - UX Design Case Studies (Room C)',
      '03:00 PM - Industry Panel & Q&A (Hall A)'
    ]
  },
  rv25: {
    bg: '#f0fdf4', headerBg: '#065f46', title: 'FAIRVIEW RECYCLING CENTER - SORTING GUIDE',
    lines: [
      'BLUE BIN: Clean Paper & Flattened Cardboard',
      'GREEN BIN: Glass Bottles & Aluminum Cans',
      'YELLOW BIN: Plastics #1 and #2 (Rinse First)',
      'RED DROP-OFF: Batteries & Small Electronics (Staffed Desk)'
    ]
  }
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

const rawSets = [
  {
    id: 'rv01', img: 'images/rv01.jpg', altJa: 'ハーバービュー・コミュニティセンターの週末ワークショップ案内ポスター',
    setting: 'コミュニティセンターのワークショップ案内ポスターと、職員からの確認メール。',
    passageTitle: 'Email from Maya Lin to Samira Patel',
    passageEn: 'Hi Samira, I saw the weekend workshop poster at Harborview Community Center. I want to join the Saturday afternoon session, and my brother wants to try the Sunday afternoon class. Can you stop by the front desk on Thursday to register both of us?',
    passageJa: 'サミラさん、ハーバービュー・コミュニティセンターの週末ワークショップのポスターを見ました。私は土曜午後の講座に、兄は日曜午後の講座に参加したいです。木曜日にフロントで2人分の申し込みをしてもらえますか？',
    vocab: [['workshop', 'ワークショップ・講座'], ['register', '申し込む・登録する'], ['front desk', '受付・フロント']],
    qs: [
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'Which class does Maya want to attend?',
        stemJa: 'マヤはどの講座に参加したいですか？',
        choices: ['Woodworking Basics', 'Watercolor Painting', 'Morning Yoga', 'Intro to Coding'],
        choicesJa: ['木工入門', '水彩画', '朝のヨガ', 'プログラミング入門'],
        ans: 1,
        notes: [
          'Woodworking Basics は土曜午前10:00の講座です。マヤは土曜午後を希望しています。',
          'ポスターより土曜午後2:00の講座は Watercolor Painting であり、マヤの希望と一致します。',
          'Morning Yoga は日曜午前9:00の講座です。',
          'Intro to Coding は日曜午後1:30で、兄が希望する講座です。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'medium',
        stem: 'Where will Maya’s brother take his class?',
        stemJa: 'マヤの兄はどこで講座を受けますか？',
        choices: ['Room 204', 'Studio B', 'Hall A', 'Lab 3'],
        choicesJa: ['204号室', 'スタジオB', 'ホールA', 'ラボ3'],
        ans: 3,
        notes: [
          'Room 204 は土曜午前の Woodworking Basics の会場です。',
          'Studio B は土曜午後の Watercolor Painting の会場です。',
          'Hall A は日曜午前の Morning Yoga の会場です。',
          '兄が希望する日曜午後の Intro to Coding は Lab 3 で開催されます。'
        ]
      },
      {
        skill: '複数情報照合', diff: 'medium',
        stem: 'How much will it cost to register both Maya and her brother?',
        stemJa: 'マヤと兄の2人分の登録料はいくらですか？',
        choices: ['$25', '$40', '$50', '$75'],
        choicesJa: ['25ドル', '40ドル', '50ドル', '75ドル'],
        ans: 2,
        notes: [
          '25ドルは1講座1人分の料金です。2人分なので倍になります。',
          '40ドルという割引料金の記載はありません。',
          'ポスターに「Fee: $25 per class」とあり、2人分で50ドルになります。',
          '75ドルは3人分の金額です。'
        ]
      },
      {
        skill: '詳細理解', diff: 'easy',
        stem: 'Why does Maya ask Samira to visit the front desk on Thursday?',
        stemJa: 'マヤが木曜日にフロントへ行くよう頼んだのはなぜですか？',
        choices: ['Classes begin on Thursday.', 'Registration closes by Friday.', 'Thursday has a lower fee.', 'The center is closed on Friday.'],
        choicesJa: ['講座が木曜に始まるから。', '申し込み期限が金曜日までだから。', '木曜は料金が安いから。', '金曜はセンターが休館だから。'],
        ans: 1,
        notes: [
          '講座は土日開催で、木曜開始ではありません。',
          'ポスター下部に「Register by Friday at Front Desk」とあり、期限前に申し込むためです。',
          '曜日による割引の記載はありません。',
          '金曜休館の記載はありません。'
        ]
      }
    ]
  },
  {
    id: 'rv02', img: 'images/rv02.jpg', altJa: 'シダーパーク・オフィスビルのロビー階数案内板',
    setting: 'オフィスビルの案内板と、来客への到着連絡メッセージ。',
    passageTitle: 'Message from Daniel Ortiz to Claire Sato',
    passageEn: 'Hi Claire, I just parked in the basement garage at Cedar Park Office Building. I have a 10:00 A.M. interview with the HR team, and afterward I plan to grab a quick coffee before heading back to my car.',
    passageJa: 'クレアさん、シダーパーク・オフィスビルの地下駐車場に車を停めました。10時から人事チームとの面接があり、その後車に戻る前に軽くコーヒーを飲む予定です。',
    vocab: [['directory', '案内板'], ['basement', '地下'], ['atrium', '吹き抜けロビー']],
    qs: [
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'Which floor should Daniel go to for his 10:00 A.M. interview?',
        stemJa: 'ダニエルは10時の面接のため何階へ行くべきですか？',
        choices: ['1F', '2F', '3F', '4F'],
        choicesJa: ['1階', '2階', '3階', '4階'],
        ans: 1,
        notes: [
          '1F は Reception & Atrium Cafe です。',
          '案内板より 2F が Legal & HR Offices なので、人事との面接は2階です。',
          '3F は Design Studio です。',
          '4F は Conference Suites です。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'Where can Daniel get coffee after his interview?',
        stemJa: 'ダニエルは面接のあとどこでコーヒーを飲めますか？',
        choices: ['On B1', 'On 1F', 'On 3F', 'On 4F'],
        choicesJa: ['地下1階', '1階', '3階', '4階'],
        ans: 1,
        notes: [
          'B1 は Visitor Parking です。',
          '1F に Reception & Atrium Cafe があります。',
          '3F は Design Studio です。',
          '4F は Conference Suites です。'
        ]
      },
      {
        skill: '詳細理解', diff: 'easy',
        stem: 'Where did Daniel leave his car?',
        stemJa: 'ダニエルはどこに車を停めましたか？',
        choices: ['On 1F', 'On 2F', 'On B1', 'Across the street'],
        choicesJa: ['1階', '2階', '地下1階', '通りの向かい'],
        ans: 2,
        notes: [
          '1F は受付とカフェです。',
          '2F はオフィス階です。',
          'メッセージの「basement garage」と案内板の「B1 - Visitor Parking」が一致します。',
          '通りの向かいに停めた記載はありません。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'medium',
        stem: 'What is located directly above the Design Studio?',
        stemJa: 'デザインスタジオのすぐ上の階には何がありますか？',
        choices: ['Legal & HR Offices', 'Conference Suites', 'Reception & Atrium Cafe', 'Visitor Parking'],
        choicesJa: ['法務・人事オフィス', '会議室スイート', '受付とアトリウムカフェ', '来客用駐車場'],
        ans: 1,
        notes: [
          'Legal & HR Offices は2階で、3階のDesign Studioの下です。',
          'Design Studio は3階、そのすぐ上の4階は Conference Suites です。',
          'Reception & Atrium Cafe は1階です。',
          'Visitor Parking は地下1階です。'
        ]
      }
    ]
  },
  {
    id: 'rv03', img: 'images/rv03.jpg', altJa: 'ノースゲート駅のデジタル発車案内板',
    setting: '駅の発車案内板と、出張中の同僚へのメッセージ。',
    passageTitle: 'Text Message from Kenji Mori to Rachel Brooks',
    passageEn: 'Hi Rachel, I am at Northgate Rail Station waiting for the train to Bayport. Unfortunately, it is running behind schedule, so I will arrive at the client office later than planned.',
    passageJa: 'レイチェルさん、ノースゲート駅でベイポート行きの電車を待っています。あいにく遅れていて、顧客のオフィスへの到着が予定より遅くなりそうです。',
    vocab: [['departure', '出発'], ['delayed', '遅延した'], ['boarding', '乗車中']],
    qs: [
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'Which track does Kenji need to use?',
        stemJa: 'ケンジは何番線を使う必要がありますか？',
        choices: ['Track 1', 'Track 2', 'Track 3', 'Track 4'],
        choicesJa: ['1番線', '2番線', '3番線', '4番線'],
        ans: 2,
        notes: [
          'Track 1 は Oakridge 行きです。',
          'Track 2 は Hillcrest 行きです。',
          '案内板より Bayport 行きは Track 3 から発車します。',
          'Track 4 は Milltown 行きです。'
        ]
      },
      {
        skill: '複数情報照合', diff: 'medium',
        stem: 'At what time is Kenji’s train now expected to depart?',
        stemJa: 'ケンジの電車は何時に発車する見込みですか？',
        choices: ['09:15', '09:30', '09:45', '10:05'],
        choicesJa: ['9時15分', '9時30分', '9時45分', '10時5分'],
        ans: 2,
        notes: [
          '09:15 は Oakridge 行きの定刻です。',
          '09:30 は定刻ですが、15分遅れ（Delayed 15m）と表示されています。',
          '定刻 09:30 に15分の遅れを加えると 09:45 発車の見込みとなります。',
          '10:05 は Milltown 行きの時刻です。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'Which train is currently boarding?',
        stemJa: '現在乗車中の電車はどれですか？',
        choices: ['The train to Oakridge', 'The train to Bayport', 'The train to Hillcrest', 'The train to Milltown'],
        choicesJa: ['オークリッジ行き', 'ベイポート行き', 'ヒルクレスト行き', 'ミルタウン行き'],
        ans: 3,
        notes: [
          'Oakridge 行きは On Time です。',
          'Bayport 行きは Delayed 15m です。',
          'Hillcrest 行きは On Time です。',
          '案内板で Status が Boarding になっているのは Milltown 行きです。'
        ]
      },
      {
        skill: '詳細理解', diff: 'easy',
        stem: 'What is the status of the 09:45 train to Hillcrest?',
        stemJa: '9時45分発ヒルクレスト行きの運行状況はどうなっていますか？',
        choices: ['Canceled', 'Delayed 15 minutes', 'On Time', 'Boarding'],
        choicesJa: ['運休', '15分遅れ', '定刻通り', '乗車中'],
        ans: 2,
        notes: [
          '運休（Canceled）の列車はありません。',
          '15分遅れは Bayport 行きです。',
          '09:45 Hillcrest 行きは Track 2 で On Time と表示されています。',
          'Boarding は Milltown 行きです。'
        ]
      }
    ]
  },
  {
    id: 'rv04', img: 'images/rv04.jpg', altJa: 'メープルストリート・ベーカリーの黒板メニュー',
    setting: 'ベーカリーの黒板メニューと、同僚へのお使いメモ。',
    passageTitle: 'Note from Hannah Cho to Ben Walker',
    passageEn: 'Ben, thanks for going to Maple Street Bakery before our 9:30 A.M. meeting! Please get me a brewed coffee and a butter croissant, plus one sourdough loaf to take home.',
    passageJa: 'ベン、9時半の会議前にメープルストリート・ベーカリーへ行ってくれてありがとう！私にコーヒーとバタークロワッサン、それに持ち帰り用のサワードウを1本買ってきて。',
    vocab: [['combo', 'セット・コンボ'], ['loaf', 'パン1斤・1本'], ['countertop', 'カウンター上の']],
    qs: [
      {
        skill: '複数情報照合', diff: 'medium',
        stem: 'How much will Hannah’s coffee and croissant cost together?',
        stemJa: 'ハンナのコーヒーとクロワッサンの合計はいくらになりますか？',
        choices: ['$3.50', '$5.00', '$6.50', '$8.00'],
        choicesJa: ['3.50ドル', '5.00ドル', '6.50ドル', '8.00ドル'],
        ans: 1,
        notes: [
          '$3.50 はクロワッサン単品の価格です。',
          '9:30 A.M. の会議前（10:00 AM前）なので、MORNING COMBO（Coffee + Croissant $5.00）が適用されます。',
          '$6.50 は通常単品合計（$3.00 + $3.50）で、10時前の割引を考慮していません。',
          '$8.00 に該当する組み合わせはありません。'
        ]
      },
      {
        skill: '複数情報照合', diff: 'hard',
        stem: 'What is the total cost of Hannah’s entire order?',
        stemJa: 'ハンナの注文全体の合計金額はいくらですか？',
        choices: ['$9.50', '$11.00', '$12.50', '$14.00'],
        choicesJa: ['9.50ドル', '11.00ドル', '12.50ドル', '14.00ドル'],
        ans: 1,
        notes: [
          '$9.50 はサワードウ（$6.00）とクロワッサン（$3.50）のみの合計です。',
          'モーニングコンボ（$5.00）＋サワードウ（$6.00）＝ $11.00 になります。',
          '$12.50 はコンボ割引を適用しない場合の金額です。',
          '$14.00 は該当しません。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'How much is a Mixed Berry Tart?',
        stemJa: 'ミックスベリータルトはいくらですか？',
        choices: ['$3.00', '$3.50', '$4.50', '$6.00'],
        choicesJa: ['3.00ドル', '3.50ドル', '4.50ドル', '6.00ドル'],
        ans: 2,
        notes: [
          '$3.00 は Brewed Coffee の価格です。',
          '$3.50 は Butter Croissant の価格です。',
          '黒板メニューに「Mixed Berry Tart - $4.50」と記載されています。',
          '$6.00 は Sourdough Loaf の価格です。'
        ]
      },
      {
        skill: '詳細理解', diff: 'easy',
        stem: 'Until what time is the Morning Combo available?',
        stemJa: 'モーニングコンボは何時まで利用できますか？',
        choices: ['9:00 AM', '9:30 AM', '10:00 AM', '11:00 AM'],
        choicesJa: ['午前9時', '午前9時30分', '午前10時', '午前11時'],
        ans: 2,
        notes: [
          '9:00 AM の記載はありません。',
          '9:30 AM はハンナたちの会議時刻です。',
          'メニュー下部に「Before 10:00 AM」と明記されています。',
          '11:00 AM の記載はありません。'
        ]
      }
    ]
  },
  {
    id: 'rv05', img: 'images/rv05.jpg', altJa: 'ブライトライン・コワーキングの火曜日会議室予約ホワイトボード',
    setting: 'コワーキングスペースの会議室予定表と、チームリーダーのメール。',
    passageTitle: 'Email from Priya Nair to Omar Hassan',
    passageEn: 'Omar, we need a two-hour slot on Tuesday afternoon for our quarterly planning session. Room A is our first choice because of the larger monitor. Could you check the whiteboard and book it if it is available?',
    passageJa: 'オマール、火曜日の午後に四半期計画会議のため2時間枠が必要です。大きいモニターがあるのでルームAが第一希望です。ホワイトボードを確認して空いていれば予約してくれますか？',
    vocab: [['slot', '時間枠'], ['quarterly', '四半期ごとの'], ['available', '空いている・利用可能な']],
    qs: [
      {
        skill: '複数情報照合', diff: 'medium',
        stem: 'Which time slot should Omar book for Room A?',
        stemJa: 'オマールはルームAのどの時間帯を予約すべきですか？',
        choices: ['09:00-11:00', '11:00-13:00', '13:00-15:00', '15:00-17:00'],
        choicesJa: ['9:00-11:00', '11:00-13:00', '13:00-15:00', '15:00-17:00'],
        ans: 3,
        notes: [
          '09:00-11:00 は午前で、Product Sync が入っています。',
          '11:00-13:00 は空いていますが、午後（Tuesday afternoon）ではありません。',
          '13:00-15:00 は Marketing の予約が入っています。',
          '火曜午後の枠で Room A が OPEN なのは 15:00-17:00 です。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'Which time period has no available rooms at all?',
        stemJa: '空き部屋が1つもない時間帯はどれですか？',
        choices: ['09:00-11:00', '11:00-13:00', '13:00-15:00', '15:00-17:00'],
        choicesJa: ['9:00-11:00', '11:00-13:00', '13:00-15:00', '15:00-17:00'],
        ans: 2,
        notes: [
          '09:00-11:00 は Room B が OPEN です。',
          '11:00-13:00 は Room A と Room C が OPEN です。',
          '13:00-15:00 は Room A (Marketing)、Room B (Budget Prep)、Room C (Training) と全室埋まっています。',
          '15:00-17:00 は Room A と Room B が OPEN です。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'What is scheduled in Room B from 11:00 to 13:00?',
        stemJa: '11時から13時までルームBに入っている予定は何ですか？',
        choices: ['Product Sync', 'Design Review', 'Budget Prep', 'Team Retro'],
        choicesJa: ['プロダクト同期', 'デザインレビュー', '予算準備', 'チーム振り返り'],
        ans: 1,
        notes: [
          'Product Sync は 09:00-11:00 の Room A です。',
          'ホワイトボードより 11:00-13:00 の Room B は Design Review です。',
          'Budget Prep は 13:00-15:00 の Room B です。',
          'Team Retro は 15:00-17:00 の Room C です。'
        ]
      },
      {
        skill: '詳細理解', diff: 'easy',
        stem: 'Why does Priya prefer Room A?',
        stemJa: 'プリヤがルームAを好む理由は何ですか？',
        choices: ['It has a larger monitor.', 'It is closer to the entrance.', 'It seats more people.', 'It has a whiteboard.'],
        choicesJa: ['より大きなモニターがあるから。', '入口に近いから。', '収容人数が多いから。', 'ホワイトボードがあるから。'],
        ans: 0,
        notes: [
          'メールに「because of the larger monitor」と明記されています。',
          '入口との距離については述べられていません。',
          '収容人数についての言及はありません。',
          'ホワイトボードは予定表を確認する対象であり、部屋を選ぶ理由ではありません。'
        ]
      }
    ]
  },
  {
    id: 'rv06', img: 'images/rv06.jpg', altJa: 'リバーベンド公共図書館の開館時間・案内サイン',
    setting: '公共図書館の入口案内と、利用者のメモ。',
    passageTitle: 'Note from Evan Brooks',
    passageEn: 'Need to return two overdue novels at Riverbend Public Library this Sunday afternoon. Also want to study for my exam in a quiet area next Tuesday evening around 6:30 P.M.',
    passageJa: '今週日曜の午後にリバーベンド公共図書館へ延滞中の小説を2冊返却する必要がある。また来週火曜の夕方6時半ごろに静かな場所で試験勉強をしたい。',
    vocab: [['overdue', '延滞した'], ['quiet zone', '静粛エリア'], ['book return box', '返却ポスト']],
    qs: [
      {
        skill: '複数情報照合', diff: 'medium',
        stem: 'How can Evan return his books on Sunday?',
        stemJa: 'エヴァンは日曜日にどうやって本を返却できますか？',
        choices: ['At the 2nd floor desk', 'Using the outdoor book return box', 'By waiting until 10:00 AM', 'By mailing them to the library'],
        choicesJa: ['2階のカウンターで', '屋外の返却ポストを使って', '午前10時まで待って', '図書館へ郵送して'],
        ans: 1,
        notes: [
          '日曜は休館（Sunday: Closed）のため館内に入れません。',
          '案内板に「24-Hour Book Return Box located outside East Entrance」とあり、日曜でも返却可能です。',
          '10:00 AM 開館は金・土曜です。',
          '郵送返却の記載はありません。'
        ]
      },
      {
        skill: '複数情報照合', diff: 'medium',
        stem: 'Will the library be open when Evan plans to study on Tuesday?',
        stemJa: 'エヴァンが火曜日に勉強する予定の時間帯、図書館は開いていますか？',
        choices: ['No, it closes at 6:00 PM.', 'Yes, it stays open until 8:00 PM.', 'No, it is closed on Tuesdays.', 'Yes, it is open 24 hours.'],
        choicesJa: ['いいえ、午後6時に閉館します。', 'はい、午後8時まで開いています。', 'いいえ、火曜は休館です。', 'はい、24時間開館です。'],
        ans: 1,
        notes: [
          '午後6時閉館は金・土曜です。',
          '月〜木は 9:00 AM - 8:00 PM まで開館しているため、火曜18:30は利用可能です。',
          '休館日は日曜のみです。',
          '24時間利用できるのは返却ポストのみです。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'Where should Evan go to study quietly?',
        stemJa: 'エヴァンが静かに勉強するにはどこへ行くべきですか？',
        choices: ['The East Entrance', 'The 1st Floor', 'The 2nd Floor', 'The basement'],
        choicesJa: ['東口', '1階', '2階', '地下'],
        ans: 2,
        notes: [
          '東口は返却ポストの場所です。',
          '1階の静粛エリアの記載はありません。',
          '案内板に「Quiet Study Zone: 2nd Floor」とあります。',
          '地下の記載はありません。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'What time does the library open on Saturdays?',
        stemJa: '土曜日の開館時間は何時ですか？',
        choices: ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM'],
        choicesJa: ['午前8時', '午前9時', '午前10時', '午前11時'],
        ans: 2,
        notes: [
          '8:00 AM の記載はありません。',
          '9:00 AM 開館は月〜木です。',
          '「Fri - Sat: 10:00 AM - 6:00 PM」と記載されています。',
          '11:00 AM の記載はありません。'
        ]
      }
    ]
  },
  {
    id: 'rv07', img: 'images/rv07.jpg', altJa: 'サミット・フィットネスクラブの会員プランポスター',
    setting: 'フィットネスクラブの会員プランポスターと、入会相談メール。',
    passageTitle: 'Email from Lucas Meyer to Summit Fitness Club',
    passageEn: 'Hello, I would like to sign up on May 20. I am joining by myself, and I want access to the swimming pool and group classes in addition to the gym floor.',
    passageJa: 'こんにちは。5月20日に入会したいと考えています。1人での入会で、ジムフロアに加えてプールとグループクラスも利用したいです。',
    vocab: [['membership', '会員資格'], ['signup fee', '入会金'], ['all access', '全施設利用可能']],
    qs: [
      {
        skill: '複数情報照合', diff: 'easy',
        stem: 'Which membership plan best fits Lucas’s needs?',
        stemJa: 'ルーカスの希望に最も合う会員プランはどれですか？',
        choices: ['Basic', 'Plus', 'Family', 'Student'],
        choicesJa: ['ベーシック', 'プラス', 'ファミリー', '学生'],
        ans: 1,
        notes: [
          'Basic はジムフロアとロッカーのみでプール・クラスが含まれません。',
          'Plus（$55/mo）は Gym + Pool + Group Classes が含まれ、1人利用に最適です。',
          'Family は最大4人向けで割高です。',
          'Student プランの記載はありません。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'How much will Lucas pay per month for his plan?',
        stemJa: 'ルーカスのプランの月額料金はいくらですか？',
        choices: ['$35', '$55', '$85', '$90'],
        choicesJa: ['35ドル', '55ドル', '85ドル', '90ドル'],
        ans: 1,
        notes: [
          '$35 は Basic プランです。',
          'Plus プランは $55/mo とポスターに記載されています。',
          '$85 は Family プランです。',
          '$90 の記載はありません。'
        ]
      },
      {
        skill: '複数情報照合', diff: 'medium',
        stem: 'How much will Lucas pay for the signup fee on May 20?',
        stemJa: '5月20日に入会する場合、ルーカスの入会金はいくらですか？',
        choices: ['$0', '$20', '$35', '$55'],
        choicesJa: ['0ドル', '20ドル', '35ドル', '55ドル'],
        ans: 0,
        notes: [
          'ポスター下部に「$0 Signup Fee through May 31」とあり、5月20日は対象期間内です。',
          '$20 の記載はありません。',
          '$35 は Basic の月額料金です。',
          '$55 は Plus の月額料金です。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'Up to how many people can share the Family plan?',
        stemJa: 'ファミリープランは最大何人まで利用できますか？',
        choices: ['2 members', '3 members', '4 members', '6 members'],
        choicesJa: ['2人', '3人', '4人', '6人'],
        ans: 2,
        notes: [
          '2人ではありません。',
          '3人ではありません。',
          'ポスターに「FAMILY - $85/mo (Up to 4 Members, All Access)」とあります。',
          '6人ではありません。'
        ]
      }
    ]
  },
  {
    id: 'rv08', img: 'images/rv08.jpg', altJa: 'グリーンリーフ植物園の園内マップ看板',
    setting: '植物園の園内マップ看板と、ガイドの案内メモ。',
    passageTitle: 'Tour Guide Note',
    passageEn: 'Welcome to Greenleaf Botanical Garden! After entering at the Main Gate, we will walk straight to the center of the park to visit our famous glass building, then head east for a 20-minute refreshment break.',
    passageJa: 'グリーンリーフ植物園へようこそ！メインゲートから入園後、園の中央にある有名なガラス張りの建物へ直行し、その後東へ向かって20分間の休憩をとります。',
    vocab: [['glasshouse', '温室'], ['landmark', '目印・名所'], ['refreshment', '軽食・飲み物']],
    qs: [
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'What will the group visit in the center of the park?',
        stemJa: 'グループが園の中央で訪れる場所はどこですか？',
        choices: ['Rose Garden', 'Tropical Glasshouse', 'Lake Trail', 'Gift Shop'],
        choicesJa: ['バラ園', '熱帯温室', '湖畔トレイル', 'ギフトショップ'],
        ans: 1,
        notes: [
          'Rose Garden は西側（West）にあります。',
          'マップより中央（Center）にあるのは Tropical Glasshouse です。',
          'Lake Trail は北側（North）にあります。',
          'Gift Shop はメインゲート付近（南側）にあります。'
        ]
      },
      {
        skill: '複数情報照合', diff: 'medium',
        stem: 'Where will the group take their 20-minute break?',
        stemJa: 'グループは20分間の休憩をどこでとりますか？',
        choices: ['Garden Cafe', 'Rose Garden', 'Main Gate', 'Lake Trail'],
        choicesJa: ['ガーデンカフェ', 'バラ園', 'メインゲート', '湖畔トレイル'],
        ans: 0,
        notes: [
          '「head east for a 20-minute refreshment break」とマップの「Garden Cafe (East)」が一致します。',
          'Rose Garden は西側です。',
          'Main Gate は南側の入口です。',
          'Lake Trail は北側です。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'Where is the Gift Shop located?',
        stemJa: 'ギフトショップはどこにありますか？',
        choices: ['North of the lake', 'Near the Main Gate', 'Inside the Rose Garden', 'East of the Cafe'],
        choicesJa: ['湖の北', 'メインゲート付近', 'バラ園の中', 'カフェの東'],
        ans: 1,
        notes: [
          '北側にあるのは Lake Trail です。',
          'マップに「Gift Shop (Near Main Gate)」と明記されています。',
          'バラ園の中ではありません。',
          'カフェの東ではありません。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'In which direction is the Lake Trail from the Tropical Glasshouse?',
        stemJa: '熱帯温室から見て湖畔トレイルはどちらの方角ですか？',
        choices: ['North', 'South', 'East', 'West'],
        choicesJa: ['北', '南', '東', '西'],
        ans: 0,
        notes: [
          'マップ上、Tropical Glasshouse が Center、Lake Trail が North に位置します。',
          '南は Main Gate です。',
          '東は Garden Cafe です。',
          '西は Rose Garden です。'
        ]
      }
    ]
  },
  {
    id: 'rv09', img: 'images/rv09.jpg', altJa: 'ウェストサイド立体駐車場の料金看板',
    setting: '駐車場の料金看板と、イベント参加者のメッセージ。',
    passageTitle: 'Message from Nora Vance to Tomoki Sato',
    passageEn: 'Hi Tomoki, I arrived at Westside Parking Garage at 6:15 P.M. for the concert. I plan to stay for about three hours. Do I pay the attendant at the exit gate?',
    passageJa: 'トモキさん、コンサートのために午後6時15分にウェストサイド駐車場へ入庫しました。3時間ほど停める予定です。出口ゲートで係員に支払うのですか？',
    vocab: [['flat rate', '一律料金'], ['automated kiosk', '自動精算機'], ['daily maximum', '1日最大料金']],
    qs: [
      {
        skill: '複数情報照合', diff: 'medium',
        stem: 'How much will Nora pay for parking?',
        stemJa: 'ノラの駐車料金はいくらになりますか？',
        choices: ['$4.00', '$6.00', '$7.00', '$18.00'],
        choicesJa: ['4.00ドル', '6.00ドル', '7.00ドル', '18.00ドル'],
        ans: 1,
        notes: [
          '$4.00 は1時間までの通常料金です。',
          '6:15 P.M. 入庫なので「Evening Flat Rate (Enter after 6:00 PM): $6.00」が適用されます。',
          '$7.00 は2時間までの通常料金です。',
          '$18.00 は1日最大料金です。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'How should Nora pay her parking fee?',
        stemJa: 'ノラはどのように駐車料金を支払うべきですか？',
        choices: ['To an attendant at the exit', 'At an automated kiosk before exiting', 'By mobile app only', 'At the concert hall'],
        choicesJa: ['出口の係員に支払う', '出庫前に自動精算機で支払う', 'アプリのみで支払う', 'コンサート会場で支払う'],
        ans: 1,
        notes: [
          '係員への支払いではなく事前精算です。',
          '看板下部に「Pay at Automated Kiosk before Exit」とあります。',
          'アプリ限定の記載はありません。',
          'コンサート会場での精算ではありません。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'How long can a driver park for free?',
        stemJa: '無料で駐車できるのは何分間ですか？',
        choices: ['15 minutes', '30 minutes', '60 minutes', '2 hours'],
        choicesJa: ['15分', '30分', '60分', '2時間'],
        ans: 1,
        notes: [
          '15分ではありません。',
          '看板に「First 30 Minutes: FREE」とあります。',
          '1時間は $4.00 です。',
          '2時間は $7.00 です。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'What is the maximum charge for a full day of parking?',
        stemJa: '1日の最大駐車料金はいくらですか？',
        choices: ['$7.00', '$12.00', '$18.00', '$24.00'],
        choicesJa: ['7.00ドル', '12.00ドル', '18.00ドル', '24.00ドル'],
        ans: 2,
        notes: [
          '$7.00 は2時間までの料金です。',
          '$12.00 の記載はありません。',
          '「Daily Maximum: $18.00」と明記されています。',
          '$24.00 の記載はありません。'
        ]
      }
    ]
  },
  {
    id: 'rv10', img: 'images/rv10.jpg', altJa: 'アルダークリニックの受付案内サイン',
    setting: 'クリニックの受付サインと、患者への案内メール。',
    passageTitle: 'Email from Alder Clinic to Owen Grant',
    passageEn: 'Dear Mr. Grant, we look forward to seeing you for your appointment on Wednesday at 10:00 A.M. If you also want a seasonal flu shot without an appointment, please note that walk-in vaccinations are only offered on specific afternoons.',
    passageJa: 'グラント様、水曜午前10時のご予約をお待ちしております。予約なしでの季節性インフルエンザ予防接種をご希望の場合、特定の午後にのみ実施しておりますのでご注意ください。',
    vocab: [['walk-in', '予約なしの来院'], ['self-service kiosk', '自動受付機'], ['insurance card', '保険証']],
    qs: [
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'What should Mr. Grant do first when he arrives at the clinic?',
        stemJa: 'グラント氏がクリニックに到着したら最初にすべきことは何ですか？',
        choices: ['Wait in the hallway', 'Check in at the self-service kiosk', 'Call the nurse', 'Fill out a paper form'],
        choicesJa: ['廊下で待つ', '自動受付機でチェックインする', '看護師を呼ぶ', '紙の用紙に記入する'],
        ans: 1,
        notes: [
          '廊下で待つ指示はありません。',
          'サインの1番に「Please check in at the self-service kiosk.」とあります。',
          '看護師を呼ぶ指示はありません。',
          '紙の用紙の記載はありません。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'What two items should patients have ready?',
        stemJa: '患者が用意しておくべき2つのものは何ですか？',
        choices: ['Passport and cash', 'Photo ID and insurance card', 'Appointment slip and pen', 'Medical history and receipt'],
        choicesJa: ['パスポートと現金', '写真付き身分証と保険証', '予約票とペン', '病歴書と領収書'],
        ans: 1,
        notes: [
          'パスポートや現金の記載はありません。',
          'サインの2番に「Have your photo ID and insurance card ready.」とあります。',
          '予約票とペンの記載はありません。',
          '病歴書と領収書の記載はありません。'
        ]
      },
      {
        skill: '複数情報照合', diff: 'medium',
        stem: 'Can Mr. Grant get a walk-in flu shot during his Wednesday morning visit?',
        stemJa: 'グラント氏は水曜午前の来院時に予約なしで予防接種を受けられますか？',
        choices: ['Yes, walk-in shots are offered all day.', 'No, they are only on Tuesday and Thursday afternoons.', 'Yes, if he arrives before 10:00 AM.', 'No, flu shots are unavailable this month.'],
        choicesJa: ['はい、終日実施しています。', 'いいえ、火曜と木曜の午後のみです。', 'はい、午前10時前なら可能です。', 'いいえ、今月は実施していません。'],
        ans: 1,
        notes: [
          '終日実施ではありません。',
          'サインの3番に「Walk-in Flu Shots: Tue & Thu, 2:00 PM - 4:00 PM.」とあるため水曜午前は不可です。',
          '10時前という条件はありません。',
          '今月休止の記載はありません。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'What are patients asked to do in the waiting area?',
        stemJa: '待合室で患者が求められていることは何ですか？',
        choices: ['Wear a visitor badge', 'Silence mobile phones', 'Keep doors closed', 'Pay in advance'],
        choicesJa: ['来客バッジを付ける', '携帯電話をマナーモードにする', 'ドアを閉めておく', '前払いする'],
        ans: 1,
        notes: [
          'バッジの記載はありません。',
          'サインの4番に「Please silence mobile phones in the waiting area.」とあります。',
          'ドアの記載はありません。',
          '前払いの記載はありません。'
        ]
      }
    ]
  },
  {
    id: 'rv11', img: 'images/rv11.jpg', altJa: 'クリアウォーターホテルのエレベーター階数案内板',
    setting: 'ホテルのエレベーター案内板と、宿泊客へのウェルカムメモ。',
    passageTitle: 'Welcome Note from Clearwater Hotel',
    passageEn: 'Welcome, Ms. Alvarez! Your room is 604. Feel free to enjoy our indoor pool before dinner, and join us for evening drinks overlooking the city once the lounge opens.',
    passageJa: 'アルバレス様、ようこそ！お部屋は604号室です。夕食前に屋内プールをご自由にご利用ください。また、ラウンジが開きましたら街を見渡す夜のドリンクもぜひお楽しみください。',
    vocab: [['rooftop lounge', '屋上ラウンジ'], ['overlooking', '〜を見渡す'], ['guest room', '客室']],
    qs: [
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'Which floor should Ms. Alvarez go to for the indoor pool?',
        stemJa: 'アルバレス様が屋内プールへ行くには何階へ行くべきですか？',
        choices: ['L', '2', '6', '9'],
        choicesJa: ['ロビー階', '2階', '6階', '9階'],
        ans: 1,
        notes: [
          'L は Lobby, Front Desk & Harbor Restaurant です。',
          '案内板より 2階 が Fitness Center & Indoor Pool です。',
          '6階は客室（3 to 8）です。',
          '9階は Rooftop Lounge です。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'What time does the Rooftop Lounge open?',
        stemJa: 'ルーフトップラウンジは何時に開きますか？',
        choices: ['3:00 PM', '5:00 PM', '6:00 PM', '11:00 PM'],
        choicesJa: ['午後3時', '午後5時', '午後6時', '午後11時'],
        ans: 1,
        notes: [
          '3:00 PM の記載はありません。',
          '案内板に「9 - Rooftop Lounge (5:00 PM - 11:00 PM)」とあります。',
          '6:00 PM ではありません。',
          '11:00 PM は閉店時刻です。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'Where is Harbor Restaurant located?',
        stemJa: 'ハーバーレストランは何階にありますか？',
        choices: ['Lobby level', '2nd floor', '8th floor', '9th floor'],
        choicesJa: ['ロビー階', '2階', '8階', '9階'],
        ans: 0,
        notes: [
          '案内板に「L - Lobby, Front Desk & Harbor Restaurant」とあります。',
          '2階はジムとプールです。',
          '8階は客室です。',
          '9階はルーフトップラウンジです。'
        ]
      },
      {
        skill: '詳細理解', diff: 'easy',
        stem: 'On which floors are the guest rooms located?',
        stemJa: '客室は何階から何階にありますか？',
        choices: ['Floors 1 to 5', 'Floors 2 to 7', 'Floors 3 to 8', 'Floors 4 to 9'],
        choicesJa: ['1〜5階', '2〜7階', '3〜8階', '4〜9階'],
        ans: 2,
        notes: [
          '1〜5階ではありません。',
          '2階はジム・プールです。',
          '案内板に「3 to 8 - Guest Rooms」と明記されています。',
          '9階はラウンジです。'
        ]
      }
    ]
  },
  {
    id: 'rv12', img: 'images/rv12.jpg', altJa: 'ビーコン・テックエキスポの展示会場フロアマップ',
    setting: '展示会のフロアマップと、出展担当者への指示メール。',
    passageTitle: 'Email from Marcus Reed to Yuki Tanaka',
    passageEn: 'Yuki, after you pick up your badge at the entrance, please head straight to the robotics exhibitor booth to test the demo unit. Afterward, we will meet the journalists on the east side of the hall.',
    passageJa: 'ユキ、入口でバッジを受け取ったら、デモ機のテストをするためロボティクス出展ブースへ直行してください。その後、ホールの東側で記者たちと合流します。',
    vocab: [['exhibitor', '出展者'], ['journalist', '記者'], ['refreshments', '軽食・飲み物']],
    qs: [
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'Which booth should Yuki visit first?',
        stemJa: 'ユキが最初に訪れるべきブースはどれですか？',
        choices: ['Booth A1', 'Booth A2', 'Booth A3', 'Booth A4'],
        choicesJa: ['ブースA1', 'ブースA2', 'ブースA3', 'ブースA4'],
        ans: 2,
        notes: [
          'Booth A1 は CloudTech です。',
          'Booth A2 は DataFlow です。',
          'マップより NextRobotics は Booth A3 です。',
          'Booth A4 は GreenGrid です。'
        ]
      },
      {
        skill: '複数情報照合', diff: 'medium',
        stem: 'Where will Marcus and Yuki meet the journalists?',
        stemJa: 'マーカスとユキはどこで記者たちと合流しますか？',
        choices: ['Registration Desk', 'Main Stage', 'Refreshments Lounge', 'Press Room'],
        choicesJa: ['受付デスク', 'メインステージ', '軽食ラウンジ', 'プレスルーム'],
        ans: 3,
        notes: [
          'Registration Desk は入口にあります。',
          'Main Stage は中央にあります。',
          'Refreshments Lounge は西側（West）です。',
          'ホールの東側（East）にあるのは Press Room です。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'What is located on the west side of the exhibition hall?',
        stemJa: '展示ホールの西側には何がありますか？',
        choices: ['Press Room', 'Refreshments Lounge', 'Registration Desk', 'Main Stage'],
        choicesJa: ['プレスルーム', '軽食ラウンジ', '受付デスク', 'メインステージ'],
        ans: 1,
        notes: [
          'Press Room は東側です。',
          'マップに「Refreshments Lounge (West)」とあります。',
          'Registration Desk は入口です。',
          'Main Stage は中央です。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'Which company is exhibiting at Booth A4?',
        stemJa: 'ブースA4に出展している企業はどこですか？',
        choices: ['CloudTech', 'DataFlow', 'NextRobotics', 'GreenGrid'],
        choicesJa: ['CloudTech', 'DataFlow', 'NextRobotics', 'GreenGrid'],
        ans: 3,
        notes: [
          'CloudTech は A1 です。',
          'DataFlow は A2 です。',
          'NextRobotics は A3 です。',
          'マップより Booth A4 は GreenGrid です。'
        ]
      }
    ]
  },
  {
    id: 'rv13', img: 'images/rv13.svg', altJa: 'オークウッド・ハードウェアのスプリングセール垂れ幕',
    setting: 'ホームセンターのセール案内と、買い物メモ。',
    passageTitle: 'Shopping Note from Carla Gomez',
    passageEn: 'Going to Oakwood Hardware on June 10. Need three paint brushes, a new garden shovel, and a cordless power drill.',
    passageJa: '6月10日にオークウッド・ハードウェアへ行く。塗装用ブラシ3本、新しい園芸用シャベル、それにコードレス電動ドリルが必要。',
    vocab: [['clearance', '在庫処分'], ['exclude', '〜を除外する'], ['valid', '有効な']],
    qs: [
      {
        skill: '複数情報照合', diff: 'medium',
        stem: 'How many paint brushes will Carla actually pay for?',
        stemJa: 'カーラが実際に代金を支払う塗装用ブラシは何本分ですか？',
        choices: ['1', '2', '3', '4'],
        choicesJa: ['1本', '2本', '3本', '4本'],
        ans: 1,
        notes: [
          '1本ではありません。',
          '6月10日はセール期間内（June 1 - June 14）で「BUY 2 GET 1 FREE Paint Brushes」が適用されるため、3本買って2本分の支払いになります。',
          '3本分の支払いは不要です。',
          '4本は購入数より多いです。'
        ]
      },
      {
        skill: '複数情報照合', diff: 'medium',
        stem: 'Which item on Carla’s list is NOT eligible for a discount?',
        stemJa: 'カーラの買い物リストのうち、割引対象外なのはどれですか？',
        choices: ['Paint brushes', 'Garden shovel', 'Cordless power drill', 'All items are discounted'],
        choicesJa: ['塗装用ブラシ', '園芸用シャベル', 'コードレス電動ドリル', 'すべて割引対象'],
        ans: 2,
        notes: [
          '塗装用ブラシは Buy 2 Get 1 Free の対象です。',
          '園芸用シャベルは Garden Tools として20%オフの対象です。',
          'バナー下部に「Excludes Power Tools & Clearance Items」とあるため、電動ドリルは対象外です。',
          '電動ドリルが除外されているため誤りです。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'What discount applies to garden tools?',
        stemJa: '園芸用品に適用される割引率はいくらですか？',
        choices: ['10% off', '15% off', '20% off', '25% off'],
        choicesJa: ['10%オフ', '15%オフ', '20%オフ', '25%オフ'],
        ans: 2,
        notes: [
          '10%ではありません。',
          '15%ではありません。',
          'バナーに「20% OFF All Garden Tools」と明記されています。',
          '25%ではありません。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'When does the Spring Sale end?',
        stemJa: 'スプリングセールはいつ終了しますか？',
        choices: ['June 1', 'June 10', 'June 14', 'June 30'],
        choicesJa: ['6月1日', '6月10日', '6月14日', '6月30日'],
        ans: 2,
        notes: [
          'June 1 は開始日です。',
          'June 10 はカーラが来店する日です。',
          '「Valid June 1 - June 14」と記載されています。',
          'June 30 の記載はありません。'
        ]
      }
    ]
  },
  {
    id: 'rv14', img: 'images/rv14.jpg', altJa: 'クレストビュー美術館の入館料・ツアー案内板',
    setting: '美術館のチケットカウンター案内板と、家族の訪問計画メモ。',
    passageTitle: 'Message from David Kim to Lisa Kim',
    passageEn: 'Lisa, let’s take Mom (who is a senior) and our 8-year-old son to Crestview Museum tomorrow. We should arrive in time for the afternoon guided tour, and I’d like to rent one audio guide for myself.',
    passageJa: 'リサ、明日母（シニア）と8歳の息子を連れてクレストビュー美術館へ行こう。午後のガイドツアーに間に合うように到着して、僕用に音声ガイドを1台借りたいな。',
    vocab: [['admission', '入館料'], ['rotunda', '円形広間'], ['guided tour', 'ガイド付きツアー']],
    qs: [
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'What time does the afternoon guided tour start?',
        stemJa: '午後のガイドツアーは何時に始まりますか？',
        choices: ['11:00 AM', '1:00 PM', '2:00 PM', '4:00 PM'],
        choicesJa: ['午前11時', '午後1時', '午後2時', '午後4時'],
        ans: 2,
        notes: [
          '11:00 AM は午前のツアーです。',
          '1:00 PM の記載はありません。',
          '案内板に「Free Guided Tours Daily: 11:00 AM & 2:00 PM」とあります。',
          '4:00 PM の記載はありません。'
        ]
      },
      {
        skill: '複数情報照合', diff: 'hard',
        stem: 'How much will admission cost for David, Lisa, Mom, and their son (excluding the audio guide)?',
        stemJa: '音声ガイドを除いた4人（デイビッド、リサ、母、8歳の息子）の入館料合計はいくらですか？',
        choices: ['$23', '$37', '$41', '$46'],
        choicesJa: ['23ドル', '37ドル', '41ドル', '46ドル'],
        ans: 1,
        notes: [
          '$23 は大人1人＋シニア1人のみです。',
          '大人2人（$14×2=$28）＋シニア1人（$9）＋12歳未満無料（$0）＝ $37 です。',
          '$41 は音声ガイド代（$4）を含めた金額です。',
          '$46 は息子にもシニア/学生料金を足した誤算です。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'Where do visitors meet for the guided tour?',
        stemJa: 'ガイドツアーの集合場所はどこですか？',
        choices: ['Ticket Counter', 'Main Rotunda', 'Gift Shop', 'East Gallery'],
        choicesJa: ['チケットカウンター', 'メインロタンダ（中央円形広間）', 'ギフトショップ', '東ギャラリー'],
        ans: 1,
        notes: [
          'チケットカウンターではありません。',
          '案内板に「Meet at Main Rotunda」とあります。',
          'ギフトショップの記載はありません。',
          '東ギャラリーの記載はありません。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'How much does it cost to rent an audio guide?',
        stemJa: '音声ガイドのレンタル料金はいくらですか？',
        choices: ['Free', '$4', '$9', '$14'],
        choicesJa: ['無料', '4ドル', '9ドル', '14ドル'],
        ans: 1,
        notes: [
          '無料なのはガイドツアーと12歳未満の入館です。',
          '案内板下部に「Audio Guides available for $4」とあります。',
          '$9 は学生・シニア入館料です。',
          '$14 は大人入館料です。'
        ]
      }
    ]
  },
  {
    id: 'rv15', img: 'images/rv15.svg', altJa: 'シルバーライン・ロジスティクスの倉庫ゾーン・安全掲示板',
    setting: '物流倉庫のゾーン案内板と、新人スタッフへの指示メモ。',
    passageTitle: 'Memo from Supervisor to New Warehouse Staff',
    passageEn: 'Before crossing the yellow floor line this morning, make sure you have all required protective gear. First, move the newly arrived dairy boxes directly into the temperature-controlled section.',
    passageJa: '今朝、床の黄色い線を越える前に、必要な保護具をすべて着用してください。まず、到着したばかりの乳製品の箱を温度管理エリアへ直接運んでください。',
    vocab: [['protective gear', '保護具'], ['cold storage', '冷蔵保管庫'], ['dispatch', '発送']],
    qs: [
      {
        skill: '複数情報照合', diff: 'easy',
        stem: 'Which zone should the staff move the dairy boxes to?',
        stemJa: 'スタッフは乳製品の箱をどのゾーンへ運ぶべきですか？',
        choices: ['Zone A', 'Zone B', 'Zone C', 'The front office'],
        choicesJa: ['ゾーンA', 'ゾーンB', 'ゾーンC', '事務所'],
        ans: 1,
        notes: [
          'Zone A は荷受け・検品（Receiving & Inspection）です。',
          '「temperature-controlled section」と案内板の「ZONE B: Cold Storage (4 C)」が一致します。',
          'Zone C は梱包・発送（Packing & Dispatch）です。',
          '事務所の記載はありません。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'What protective gear is required beyond the yellow line?',
        stemJa: '黄色い線の先で着用が義務付けられている保護具は何ですか？',
        choices: ['Gloves and goggles', 'Hard hats and safety vests', 'Earplugs and masks', 'Steel boots only'],
        choicesJa: ['手袋とゴーグル', 'ヘルメットと安全ベスト', '耳栓とマスク', '安全靴のみ'],
        ans: 1,
        notes: [
          '手袋とゴーグルの記載はありません。',
          '案内板に「Hard Hats & Safety Vests Required Beyond Yellow Line」とあります。',
          '耳栓とマスクの記載はありません。',
          '安全靴のみの記載はありません。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'What happens in Zone C?',
        stemJa: 'ゾーンCでは何が行われますか？',
        choices: ['Receiving and inspection', 'Cold storage', 'Packing and dispatch', 'Equipment repair'],
        choicesJa: ['荷受けと検品', '冷蔵保管', '梱包と発送', '機材修理'],
        ans: 2,
        notes: [
          '荷受けと検品は Zone A です。',
          '冷蔵保管は Zone B です。',
          '「ZONE C: Packing & Dispatch」と明記されています。',
          '機材修理の記載はありません。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'At what temperature is Zone B maintained?',
        stemJa: 'ゾーンBは何度に保たれていますか？',
        choices: ['0 C', '4 C', '10 C', '18 C'],
        choicesJa: ['0度', '4度', '10度', '18度'],
        ans: 1,
        notes: [
          '0度ではありません。',
          '案内板に「ZONE B: Cold Storage (4 C)」と記載されています。',
          '10度ではありません。',
          '18度ではありません。'
        ]
      }
    ]
  },
  {
    id: 'rv16', img: 'images/rv16.jpg', altJa: 'レイクサイド・フェリーターミナルの時刻表看板',
    setting: 'フェリーターミナルの時刻表と、観光客のメッセージ。',
    passageTitle: 'Message from Sofia Rossi to Liam Chen',
    passageEn: 'Liam, I’m heading to South Pier on the 10:00 A.M. ferry and returning later today. I’ll reach the pier at 9:50 A.M. to buy my ticket.',
    passageJa: 'リアム、午前10時のフェリーでサウスピアへ行き、今日中に戻ってくるよ。9時50分に桟橋に着いてチケットを買う予定。',
    vocab: [['round-trip', '往復'], ['on the hour', '毎正時（00分）に'], ['boarding', '乗船']],
    qs: [
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'Which route will Sofia take?',
        stemJa: 'ソフィアはどの航路を利用しますか？',
        choices: ['Route 1', 'Route 2', 'Route 3', 'Express Route'],
        choicesJa: ['ルート1', 'ルート2', 'ルート3', '急行ルート'],
        ans: 1,
        notes: [
          'Route 1 は Pine Island 行きです。',
          '時刻表より South Pier 行きは Route 2 です。',
          'Route 3 の記載はありません。',
          '急行ルートの記載はありません。'
        ]
      },
      {
        skill: '複数情報照合', diff: 'medium',
        stem: 'How much will Sofia save by buying a round-trip ticket instead of two one-way tickets?',
        stemJa: 'ソフィアが片道2枚ではなく往復チケットを買うと、いくらお得になりますか？',
        choices: ['$1.00', '$2.00', '$4.00', '$6.00'],
        choicesJa: ['1.00ドル', '2.00ドル', '4.00ドル', '6.00ドル'],
        ans: 1,
        notes: [
          '$1.00 ではありません。',
          '片道 $8.00 × 2 ＝ $16.00、往復 $14.00 なので差額は $2.00 です。',
          '$4.00 ではありません。',
          '$6.00 は片道と往復の単純差額です。'
        ]
      },
      {
        skill: '複数情報照合', diff: 'medium',
        stem: 'By what time must Sofia board the 10:00 A.M. ferry?',
        stemJa: 'ソフィアは10時発のフェリーに何時までに乗船する必要がありますか？',
        choices: ['9:45 AM', '9:50 AM', '9:55 AM', '10:00 AM'],
        choicesJa: ['午前9時45分', '午前9時50分', '午前9時55分', '午前10時00分'],
        ans: 2,
        notes: [
          '9:45 AM は15分前です。',
          '9:50 AM はソフィアの到着予定時刻です。',
          '「Boarding closes 5 minutes before departure」とあるため 9:55 AM までです。',
          '10:00 AM にはすでに乗船が締め切られています。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'When does the last ferry depart for South Pier?',
        stemJa: 'サウスピア行きの最終フェリーは何時発ですか？',
        choices: ['5:00 PM', '6:00 PM', '7:00 PM', '7:30 PM'],
        choicesJa: ['午後5時', '午後6時', '午後7時', '午後7時30分'],
        ans: 1,
        notes: [
          '5:00 PM ではありません。',
          'Route 2: South Pier は「Last 6:00 PM」と記載されています。',
          '7:00 PM ではありません。',
          '7:30 PM は Route 1（Pine Island）の最終便です。'
        ]
      }
    ]
  },
  {
    id: 'rv17', img: 'images/rv17.svg', altJa: 'サンリッジ・ファーマーズマーケットの案内板',
    setting: 'ファーマーズマーケットの案内板と、出店スタッフへの連絡。',
    passageTitle: 'Note from Market Coordinator',
    passageEn: 'Hi everyone, even though light rain is forecast for Saturday morning, Sunridge Farmers Market will operate as usual. Visitors looking for market tokens should be directed to the Main Archway.',
    passageJa: '皆さん、土曜の朝は小雨の予報ですが、サンリッジ・ファーマーズマーケットは通常通り開催します。マーケット用トークンをお探しの来場者はメインアーチへ案内してください。',
    vocab: [['rain or shine', '雨天決行'], ['artisan', '職人手作りの'], ['produce', '農産物']],
    qs: [
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'Where can shoppers buy fresh sourdough bread and pastries?',
        stemJa: '買い物客は焼きたてのパンやペストリーをどこで買えますか？',
        choices: ['Row A', 'Row B', 'Row C', 'Row D'],
        choicesJa: ['A列', 'B列', 'C列', 'D列'],
        ans: 1,
        notes: [
          'Row A は Fresh Produce & Herbs です。',
          '案内板より Row B が Artisan Bread & Pastries です。',
          'Row C は Local Honey & Jams です。',
          'Row D は Cut Flowers & Potted Plants です。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'What are the market hours on Saturdays?',
        stemJa: '土曜日のマーケット開催時間は何時から何時までですか？',
        choices: ['7:00 AM - 12:00 PM', '8:00 AM - 1:00 PM', '9:00 AM - 2:00 PM', '10:00 AM - 3:00 PM'],
        choicesJa: ['午前7時〜正午', '午前8時〜午後1時', '午前9時〜午後2時', '午前10時〜午後3時'],
        ans: 1,
        notes: [
          '7:00 AM ではありません。',
          '案内板に「Open Saturdays 8:00 AM - 1:00 PM」とあります。',
          '9:00 AM ではありません。',
          '10:00 AM ではありません。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'Which row sells local honey?',
        stemJa: '地元のハチミツを売っているのはどの列ですか？',
        choices: ['Row A', 'Row B', 'Row C', 'Row D'],
        choicesJa: ['A列', 'B列', 'C列', 'D列'],
        ans: 2,
        notes: [
          'Row A は農産物とハーブです。',
          'Row B はパンとペストリーです。',
          '案内板に「Row C: Local Honey & Jams」とあります。',
          'Row D は花と鉢植えです。'
        ]
      },
      {
        skill: '詳細理解', diff: 'easy',
        stem: 'What will happen if it rains on Saturday morning?',
        stemJa: '土曜の朝に雨が降った場合どうなりますか？',
        choices: ['The market will be canceled.', 'It will move indoors.', 'It will open as scheduled.', 'It will close at 10:00 AM.'],
        choicesJa: ['中止になる。', '屋内に移動する。', '予定通り開催される。', '午前10時に終了する。'],
        ans: 2,
        notes: [
          '中止にはなりません。',
          '屋内移動の記載はありません。',
          '案内板の「Rain or Shine」およびメモの「operate as usual」と一致します。',
          '短縮営業の記載はありません。'
        ]
      }
    ]
  },
  {
    id: 'rv18', img: 'images/rv18.svg', altJa: 'メトロプリント・コピーショップの料金表',
    setting: 'コピーショップの料金表と、事務担当者からの依頼メール。',
    passageTitle: 'Email from Grace Park to Noah Bell',
    passageEn: 'Noah, please go to MetroPrint Copy Shop and print 100 black-and-white copies of our training handout. We also need one large poster for the lobby.',
    passageJa: 'ノア、メトロプリント・コピーショップへ行って研修資料を白黒で100部印刷してください。ロビー用の大型ポスターも1枚必要です。',
    vocab: [['bulk discount', '大量注文割引'], ['spiral binding', 'リング製本'], ['handout', '配布資料']],
    qs: [
      {
        skill: '複数情報照合', diff: 'hard',
        stem: 'How much will the 100 black-and-white copies cost after the bulk discount?',
        stemJa: '大量注文割引適用後の白黒コピー100枚の料金はいくらですか？',
        choices: ['$8.00', '$9.00', '$10.00', '$11.00'],
        choicesJa: ['8.00ドル', '9.00ドル', '10.00ドル', '11.00ドル'],
        ans: 1,
        notes: [
          '$8.00 は20%オフの計算です。',
          '通常 $0.10 × 100枚 ＝ $10.00、100枚以上で10%オフ（$1.00引き）なので $9.00 です。',
          '$10.00 は割引前の金額です。',
          '$11.00 は該当しません。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'How much is one large poster print?',
        stemJa: '大型ポスター印刷1枚の料金はいくらですか？',
        choices: ['$4.00', '$10.00', '$15.00', '$24.00'],
        choicesJa: ['4.00ドル', '10.00ドル', '15.00ドル', '24.00ドル'],
        ans: 2,
        notes: [
          '$4.00 は Spiral Binding の料金です。',
          '$10.00 は白黒100枚の定価です。',
          '料金表に「Poster (24x36 in): $15.00」とあります。',
          '24はポスターのインチサイズです。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'What is the price per page for color copies?',
        stemJa: 'カラーコピー1ページあたりの料金はいくらですか？',
        choices: ['$0.10', '$0.25', '$0.45', '$0.50'],
        choicesJa: ['0.10ドル', '0.25ドル', '0.45ドル', '0.50ドル'],
        ans: 2,
        notes: [
          '$0.10 は白黒コピーです。',
          '$0.25 の記載はありません。',
          '「Color Copies: $0.45 / page」と明記されています。',
          '$0.50 の記載はありません。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'How many pages are required to qualify for the 10% bulk discount?',
        stemJa: '10%の大量注文割引を受けるには何ページ以上必要ですか？',
        choices: ['50 pages', '100 pages', '200 pages', '500 pages'],
        choicesJa: ['50ページ', '100ページ', '200ページ', '500ページ'],
        ans: 1,
        notes: [
          '50ページではありません。',
          '「BULK DISCOUNT: 10% OFF orders of 100+ pages」とあります。',
          '200ページではありません。',
          '500ページではありません。'
        ]
      }
    ]
  },
  {
    id: 'rv19', img: 'images/rv19.svg', altJa: 'パインハースト・バイクレンタルの料金看板',
    setting: 'レンタサイクル店の料金看板と、旅行者のメッセージ。',
    passageTitle: 'Message from Chloe Adams to Ryan Cooper',
    passageEn: 'Ryan, let’s rent two bikes from Pinehurst Bike Rental at 1:00 P.M. for four hours. We don’t need child seats, and we should bring our own water bottles.',
    passageJa: 'ライアン、午後1時にパインハースト・バイクレンタルで自転車を2台、4時間借りよう。チャイルドシートは不要で、水筒は自分たちで持参しようね。',
    vocab: [['half day', '半日'], ['included free', '無料で含まれる'], ['helmet', 'ヘルメット']],
    qs: [
      {
        skill: '複数情報照合', diff: 'medium',
        stem: 'How much will Chloe and Ryan pay in total for two bikes?',
        stemJa: 'クロエとライアンの自転車2台分の合計料金はいくらですか？',
        choices: ['$20', '$22', '$44', '$70'],
        choicesJa: ['20ドル', '22ドル', '44ドル', '70ドル'],
        ans: 2,
        notes: [
          '$20 は1時間×2台です。',
          '$22 は半日（4時間）1台分です。',
          '4時間＝Half Day（$22）× 2台 ＝ $44 です。',
          '$70 は1日（Full Day $35）× 2台です。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'What items are provided at no extra charge?',
        stemJa: '追加料金なしで提供されるものは何ですか？',
        choices: ['Water bottles', 'Child seats', 'Helmets and locks', 'Rain jackets'],
        choicesJa: ['水筒', 'チャイルドシート', 'ヘルメットと鍵', 'レインジャケット'],
        ans: 2,
        notes: [
          '水筒は持参します。',
          'チャイルドシートは1日$5の追加料金です。',
          '看板に「Helmet & Lock Included Free」とあります。',
          'レインジャケットの記載はありません。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'What is the latest time all bikes must be returned?',
        stemJa: '自転車の最終返却時刻は何時ですか？',
        choices: ['4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'],
        choicesJa: ['午後4時', '午後5時', '午後6時', '午後7時'],
        ans: 2,
        notes: [
          '4:00 PM ではありません。',
          '5:00 PM はクロエたちの返却予定時刻です。',
          '看板に「All bikes must be returned by 6:00 PM」とあります。',
          '7:00 PM ではありません。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'How much does a full-day bike rental cost?',
        stemJa: '1日レンタルの料金はいくらですか？',
        choices: ['$10', '$22', '$35', '$40'],
        choicesJa: ['10ドル', '22ドル', '35ドル', '40ドル'],
        ans: 2,
        notes: [
          '$10 は1時間料金です。',
          '$22 は半日料金です。',
          '看板に「Full Day: $35」と明記されています。',
          '$40 の記載はありません。'
        ]
      }
    ]
  },
  {
    id: 'rv20', img: 'images/rv20.svg', altJa: 'ベイビュー・シネマの上映スケジュール画面',
    setting: '映画館の上映スケジュール画面と、友人へのメッセージ。',
    passageTitle: 'Text from Jordan Lee to Mia Torres',
    passageEn: 'Mia, I want to see City Lights at Bayview Cinema today, and I’d like to get the matinee discount price. Can you meet me at the lobby 15 minutes before the show?',
    passageJa: 'ミア、今日ベイビュー・シネマで『City Lights』を観たいんだけど、マチネ割引料金にしたいんだ。上映の15分前にロビーで待ち合わせできる？',
    vocab: [['matinee', '昼間上映（マチネ）'], ['showtime', '上映時刻'], ['screen', 'スクリーン']],
    qs: [
      {
        skill: '複数情報照合', diff: 'medium',
        stem: 'Which showtime does Jordan plan to attend?',
        stemJa: 'ジョーダンは何時の上映回を観る予定ですか？',
        choices: ['1:15 PM', '1:45 PM', '5:15 PM', '8:00 PM'],
        choicesJa: ['午後1時15分', '午後1時45分', '午後5時15分', '午後8時00分'],
        ans: 1,
        notes: [
          '1:15 PM は Ocean Drift です。',
          'City Lights のうち午後4時前（マチネ割引対象）の回は 1:45 PM です。',
          '5:15 PM は午後4時以降のため割引対象外です。',
          '8:00 PM も割引対象外です。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'In which screen is City Lights playing?',
        stemJa: '『City Lights』はどのスクリーンで上映されていますか？',
        choices: ['Screen 1', 'Screen 2', 'Screen 3', 'Screen 4'],
        choicesJa: ['スクリーン1', 'スクリーン2', 'スクリーン3', 'スクリーン4'],
        ans: 1,
        notes: [
          'Screen 1 は Ocean Drift です。',
          '画面表示より City Lights は Screen 2 です。',
          'Screen 3 は Wild Trail です。',
          'Screen 4 はありません。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'How much is a matinee ticket?',
        stemJa: 'マチネ割引チケットはいくらですか？',
        choices: ['$7', '$9', '$12', '$15'],
        choicesJa: ['7ドル', '9ドル', '12ドル', '15ドル'],
        ans: 1,
        notes: [
          '$7 の記載はありません。',
          '「Matinee Discount ($9) for all shows before 4:00 PM」とあります。',
          '$12 の記載はありません。',
          '$15 の記載はありません。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'Which movie has only two showtimes today?',
        stemJa: '今日の上映回が2回だけの映画はどれですか？',
        choices: ['Ocean Drift', 'City Lights', 'Wild Trail', 'All three movies'],
        choicesJa: ['Ocean Drift', 'City Lights', 'Wild Trail', '3作品すべて'],
        ans: 2,
        notes: [
          'Ocean Drift は3回上映です。',
          'City Lights も3回上映です。',
          'Wild Trail は 2:30 PM と 6:00 PM の2回のみです。',
          '3作品すべてではありません。'
        ]
      }
    ]
  },
  {
    id: 'rv21', img: 'images/rv21.svg', altJa: 'ケストレル航空の手荷物許容量案内板',
    setting: '航空会社の手荷物案内板と、出張者のパッキング確認メモ。',
    passageTitle: 'Travel Note from Victor Hugo',
    passageEn: 'Flying Kestrel Airlines on a Flex fare tomorrow. My suitcase weighs 25 kg, and my backpack is 8 kg. I also packed a 120 ml bottle of shampoo in my backpack.',
    passageJa: '明日ケストレル航空のフレックス運賃で搭乗する。スーツケースは25kg、バックパックは8kg。バックパックに120mlのシャンプーも入れた。',
    vocab: [['carry-on', '機内持ち込み手荷物'], ['checked bag', '預け入れ手荷物'], ['overweight fee', '重量超過料金']],
    qs: [
      {
        skill: '複数情報照合', diff: 'medium',
        stem: 'How much extra fee will Victor pay if he checks his 25 kg suitcase as is?',
        stemJa: 'ビクターが25kgのスーツケースをそのまま預けると、追加料金はいくらになりますか？',
        choices: ['$0', '$23', '$60', '$100'],
        choicesJa: ['0ドル', '23ドル', '60ドル', '100ドル'],
        ans: 2,
        notes: [
          'Flex運賃でも23kg上限を超えているため無料にはなりません。',
          '23は上限重量（kg）です。',
          '預け入れ上限23kgを超過しているため「Oversize / Overweight Fee: $60 per bag」が発生します。',
          '100は液体上限（ml）です。'
        ]
      },
      {
        skill: '複数情報照合', diff: 'medium',
        stem: 'What problem does Victor have with his backpack?',
        stemJa: 'ビクターのバックパックにはどのような問題がありますか？',
        choices: ['It exceeds the 10 kg weight limit.', 'It contains a liquid bottle over 100 ml.', 'Backpacks are not allowed as carry-ons.', 'It requires a $60 fee.'],
        choicesJa: ['10kgの重量制限を超えている。', '100mlを超える液体ボトルが入っている。', 'バックパックは機内持ち込み不可である。', '60ドルの料金がかかる。'],
        ans: 1,
        notes: [
          'バックパックは8kgで上限10kg以内です。',
          '機内持ち込み液体は1容器あたり最大100mlですが、120mlのシャンプーを入れています。',
          'バックパック禁止の記載はありません。',
          '$60は超過手荷物料金です。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'What is the maximum weight for a carry-on bag?',
        stemJa: '機内持ち込み手荷物の最大重量は何kgですか？',
        choices: ['8 kg', '10 kg', '20 kg', '23 kg'],
        choicesJa: ['8kg', '10kg', '20kg', '23kg'],
        ans: 1,
        notes: [
          '8kgはビクターのバックパックの重さです。',
          '案内板に「Carry-on Bag: Max 10 kg」とあります。',
          '20kgの記載はありません。',
          '23kgは預け入れ手荷物の上限です。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'Who receives one free checked bag up to 23 kg?',
        stemJa: '23kgまでの預け入れ手荷物が1個無料になるのは誰ですか？',
        choices: ['All passengers', 'Passengers on Flex fares', 'Only frequent flyers', 'Passengers with carry-ons under 5 kg'],
        choicesJa: ['全乗客', 'フレックス運賃の乗客', 'マイレージ会員のみ', '機内持ち込み5kg未満の乗客'],
        ans: 1,
        notes: [
          '全乗客ではありません。',
          '案内板に「Checked Bag: Max 23 kg (1 free on Flex fares)」とあります。',
          'マイレージ会員の記載はありません。',
          '5kg未満の条件はありません。'
        ]
      }
    ]
  },
  {
    id: 'rv22', img: 'images/rv22.svg', altJa: 'ブリッジウォーター大学のキャンパスシャトル路線図',
    setting: '大学キャンパスシャトルの案内板と、新入生への案内メール。',
    passageTitle: 'Email from Student Services to New Students',
    passageEn: 'Welcome to Bridgewater University! If you are arriving at the Train Station on Saturday morning, you can take the campus shuttle directly to Main Quad. Please remember to show your student ID to the driver.',
    passageJa: 'ブリッジウォーター大学へようこそ！土曜の朝に駅へ到着されたら、キャンパスシャトルでメインクワッドへ直接お越しいただけます。運転手に学生証をご提示ください。',
    vocab: [['loop route', '循環路線'], ['frequency', '運行間隔'], ['shuttle', 'シャトルバス']],
    qs: [
      {
        skill: '複数情報照合', diff: 'medium',
        stem: 'How often does the shuttle run on Saturday morning?',
        stemJa: '土曜の朝、シャトルバスは何分間隔で運行していますか？',
        choices: ['Every 10 minutes', 'Every 15 minutes', 'Every 30 minutes', 'Every 60 minutes'],
        choicesJa: ['10分おき', '15分おき', '30分おき', '60分おき'],
        ans: 2,
        notes: [
          '10分おきではありません。',
          '15分おきは平日（Mon-Fri）の運行間隔です。',
          '案内板に「Weekend Service: Every 30 minutes (9:00 AM - 8:00 PM)」とあります。',
          '60分おきではありません。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'Which stop comes immediately after Science Hall?',
        stemJa: 'サイエンスホールのすぐ次の停留所はどこですか？',
        choices: ['Main Quad', 'North Dorms', 'Sports Complex', 'Train Station'],
        choicesJa: ['メインクワッド', '北寮', 'スポーツ複合施設', '駅'],
        ans: 1,
        notes: [
          'Main Quad は Science Hall の前です。',
          '路線図より「Science Hall -> North Dorms」となっています。',
          'Sports Complex は North Dorms の次です。',
          'Train Station は Sports Complex の次です。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'How much does the campus shuttle cost for students with an ID?',
        stemJa: '学生証を持つ学生のシャトル運賃はいくらですか？',
        choices: ['Free', '$1.00', '$2.00', '$5.00'],
        choicesJa: ['無料', '1.00ドル', '2.00ドル', '5.00ドル'],
        ans: 0,
        notes: [
          '案内板に「Free with Student or Staff ID」と明記されています。',
          '有料ではありません。',
          '有料ではありません。',
          '有料ではありません。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'What time does weekday shuttle service end?',
        stemJa: '平日のシャトル運行は何時に終了しますか？',
        choices: ['7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'],
        choicesJa: ['午後7時', '午後8時', '午後9時', '午後10時'],
        ans: 3,
        notes: [
          '7:00 AM は開始時刻です。',
          '8:00 PM は週末の終了時刻です。',
          '9:00 AM は週末の開始時刻です。',
          '「Mon-Fri, 7:00 AM - 10:00 PM」と記載されています。'
        ]
      }
    ]
  },
  {
    id: 'rv23', img: 'images/rv23.svg', altJa: 'リンデン・コーヒーロースターズの特典案内板',
    setting: 'コーヒーショップの特典案内板と、常連客のメッセージ。',
    passageTitle: 'Message from Elena Novak to Paulina Cruz',
    passageEn: 'Paulina, I’m stopping by Linden Coffee Roasters this Friday to buy two 250g bags of dark roast beans for the office. I’ll also bring my tumbler for an iced latte.',
    passageJa: 'パウリナ、今週金曜日にリンデン・コーヒーロースターズへ寄って、オフィス用に250gの深煎り豆を2袋買うよ。アイスラテ用にマイタンブラーも持っていくね。',
    vocab: [['loyalty card', 'ポイントカード'], ['reusable cup', 'マイカップ・タンブラー'], ['barista', 'バリスタ']],
    qs: [
      {
        skill: '複数情報照合', diff: 'easy',
        stem: 'What discount will Elena get on the roasted bean bags on Friday?',
        stemJa: 'エレナが金曜日にコーヒー豆を買うと、どの割引が適用されますか？',
        choices: ['5% off', '10% off', '15% off', 'Buy 1 get 1 free'],
        choicesJa: ['5%オフ', '10%オフ', '15%オフ', '1袋買うと1袋無料'],
        ans: 2,
        notes: [
          '5%ではありません。',
          '10%ではありません。',
          '案内板に「Friday Special: 15% off all 250g roasted bean bags」とあります。',
          '1袋無料の特典はありません。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'How much will Elena save on her iced latte by bringing a tumbler?',
        stemJa: 'タンブラーを持参することでアイスラテはいくら割引になりますか？',
        choices: ['$0.25', '$0.50', '$1.00', '$1.50'],
        choicesJa: ['0.25ドル', '0.50ドル', '1.00ドル', '1.50ドル'],
        ans: 1,
        notes: [
          '$0.25 ではありません。',
          '案内板に「Reusable Cup Discount: $0.50 off any beverage」とあります。',
          '$1.00 ではありません。',
          '$1.50 ではありません。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'How many drinks must a customer buy to earn a free drink?',
        stemJa: '無料ドリンクをもらうには何杯購入する必要がありますか？',
        choices: ['5 drinks', '8 drinks', '9 drinks', '10 drinks'],
        choicesJa: ['5杯', '8杯', '9杯', '10杯'],
        ans: 1,
        notes: [
          '5杯ではありません。',
          '「Buy 8 drinks, get your 9th drink FREE」とあり、8杯購入が条件です。',
          '9杯目は無料でもらえる杯数です。',
          '10杯ではありません。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'What should customers ask the barista to do at checkout?',
        stemJa: '会計時にバリスタへ頼むべきことは何ですか？',
        choices: ['Grind the beans', 'Stamp the loyalty card', 'Heat the tumbler', 'Provide a receipt'],
        choicesJa: ['豆を挽くこと', 'ポイントカードにスタンプを押すこと', 'タンブラーを温めること', '領収書を出すこと'],
        ans: 1,
        notes: [
          '豆を挽く記載はありません。',
          '「Ask your barista to stamp your card at checkout」とあります。',
          'タンブラーを温める記載はありません。',
          '領収書の記載はありません。'
        ]
      }
    ]
  },
  {
    id: 'rv24', img: 'images/rv24.svg', altJa: 'ホライゾン・カンファレンスセンターの本日の予定表',
    setting: 'カンファレンスセンターの予定表と、参加者への連絡メール。',
    passageTitle: 'Email from Conference Organizer to Attendees',
    passageEn: 'Good morning! Please note that our opening session and our final Q&A session both take place in our largest auditorium. Lunch will be served in the atrium between 12:00 and 1:00 P.M.',
    passageJa: 'おはようございます！オープニングセッションと最後のQ&Aセッションはいずれも最大の講堂で行われます。昼食は12時から午後1時の間にアトリウムで提供されます。',
    vocab: [['keynote', '基調講演'], ['case study', '事例研究'], ['auditorium', '講堂']],
    qs: [
      {
        skill: '複数情報照合', diff: 'easy',
        stem: 'Which room is the largest auditorium?',
        stemJa: '最大の講堂はどの部屋ですか？',
        choices: ['Hall A', 'Room B', 'Room C', 'The Atrium'],
        choicesJa: ['ホールA', 'ルームB', 'ルームC', 'アトリウム'],
        ans: 0,
        notes: [
          'Opening Keynote と Industry Panel & Q&A が両方行われるのは Hall A です。',
          'Room B は Cloud Security Workshop のみです。',
          'Room C は UX Design Case Studies のみです。',
          'アトリウムは昼食会場です。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'What session takes place immediately after lunch?',
        stemJa: '昼食の直後に行われるセッションはどれですか？',
        choices: ['Opening Keynote', 'Cloud Security Workshop', 'UX Design Case Studies', 'Industry Panel & Q&A'],
        choicesJa: ['基調講演', 'クラウドセキュリティ講座', 'UXデザイン事例研究', '業界パネル＆Q&A'],
        ans: 2,
        notes: [
          'Opening Keynote は午前9時です。',
          'Cloud Security Workshop は午前10時半です。',
          '昼食（12:00-1:00 PM）の直後の 01:00 PM は UX Design Case Studies です。',
          'Industry Panel & Q&A は午後3時です。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'Where is the Cloud Security Workshop held?',
        stemJa: 'クラウドセキュリティ・ワークショップはどこで開催されますか？',
        choices: ['Hall A', 'Room B', 'Room C', 'Main Lobby'],
        choicesJa: ['ホールA', 'ルームB', 'ルームC', 'メインロビー'],
        ans: 1,
        notes: [
          'Hall A は基調講演とパネルです。',
          '予定表に「10:30 AM - Cloud Security Workshop (Room B)」とあります。',
          'Room C は UX Design です。',
          'メインロビーの記載はありません。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'At what time does the Industry Panel & Q&A begin?',
        stemJa: '業界パネル＆Q&Aは何時に始まりますか？',
        choices: ['09:00 AM', '10:30 AM', '01:00 PM', '03:00 PM'],
        choicesJa: ['午前9時', '午前10時30分', '午後1時', '午後3時'],
        ans: 3,
        notes: [
          '09:00 AM は基調講演です。',
          '10:30 AM はクラウドセキュリティです。',
          '01:00 PM はUXデザインです。',
          '「03:00 PM - Industry Panel & Q&A (Hall A)」と明記されています。'
        ]
      }
    ]
  },
  {
    id: 'rv25', img: 'images/rv25.svg', altJa: 'フェアビュー・リサイクルセンターの分別ガイド看板',
    setting: 'リサイクルセンターの分別案内板と、オフィス管理者の連絡メモ。',
    passageTitle: 'Memo from Facilities Manager to Staff',
    passageEn: 'We are taking a load of office recyclables to Fairview Recycling Center this afternoon, including flattened shipping boxes, empty soda cans, and old laptop batteries.',
    passageJa: '今日の午後、つぶした配送用段ボール箱、空の炭酸飲料缶、古いノートPC用バッテリーなど、オフィスの資源ごみをフェアビュー・リサイクルセンターへ運びます。',
    vocab: [['flattened', '平らにつぶした'], ['recyclables', '資源ごみ'], ['drop-off', '持ち込み回収所']],
    qs: [
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'Which bin should be used for the flattened shipping boxes?',
        stemJa: 'つぶした配送用段ボール箱はどの色の回収箱に入れるべきですか？',
        choices: ['Blue bin', 'Green bin', 'Yellow bin', 'Red drop-off'],
        choicesJa: ['青い箱', '緑の箱', '黄色い箱', '赤い持ち込み所'],
        ans: 0,
        notes: [
          '案内板に「BLUE BIN: Clean Paper & Flattened Cardboard」とあります。',
          '緑はガラス瓶とアルミ缶です。',
          '黄色はプラスチック #1・#2 です。',
          '赤はバッテリーと小型電子機器です。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'Where should the old laptop batteries be taken?',
        stemJa: '古いノートPC用バッテリーはどこへ持っていくべきですか？',
        choices: ['Blue bin', 'Green bin', 'Yellow bin', 'Red drop-off'],
        choicesJa: ['青い箱', '緑の箱', '黄色い箱', '赤い持ち込み所'],
        ans: 3,
        notes: [
          '青は紙・段ボールです。',
          '緑はガラス・缶です。',
          '黄色はプラスチックです。',
          '案内板に「RED DROP-OFF: Batteries & Small Electronics (Staffed Desk)」とあります。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'What should visitors do before putting #1 and #2 plastics in the yellow bin?',
        stemJa: 'プラスチック #1・#2 を黄色い箱に入れる前にすべきことは何ですか？',
        choices: ['Flatten them', 'Rinse them first', 'Remove the labels', 'Take them to the desk'],
        choicesJa: ['平らにつぶす', '先にすすぐ', 'ラベルをはがす', '受付デスクへ持っていく'],
        ans: 1,
        notes: [
          'つぶす指示は段ボールに対するものです。',
          '案内板に「YELLOW BIN: Plastics #1 and #2 (Rinse First)」とあります。',
          'ラベルはがしの記載はありません。',
          '受付デスクはバッテリー・電子機器用です。'
        ]
      },
      {
        skill: '図表・画像参照', diff: 'easy',
        stem: 'Which items belong in the green bin?',
        stemJa: '緑の回収箱に入れるべきものは何ですか？',
        choices: ['Clean paper', 'Glass bottles and aluminum cans', 'Plastics #1 and #2', 'Small electronics'],
        choicesJa: ['きれいな紙', 'ガラス瓶とアルミ缶', 'プラスチック #1・#2', '小型電子機器'],
        ans: 1,
        notes: [
          '紙は青い箱です。',
          '案内板に「GREEN BIN: Glass Bottles & Aluminum Cans」とあります。',
          'プラスチックは黄色い箱です。',
          '小型電子機器は赤い持ち込み所です。'
        ]
      }
    ]
  }
];

const letters = ['A', 'B', 'C', 'D'];
let qNumber = 1;

const sets = rawSets.map((s) => {
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
      translationJa: {
        stem: q.stemJa,
        choices: choiceTranslations
      },
      choiceExplanationsJa,
      vocabulary: s.vocab.map(([term, meaningJa]) => ({ term, meaningJa }))
    };
  });

  return {
    setId: s.id,
    part: 7,
    setting: s.setting,
    passages: [
      {
        id: passageId,
        type: 'document',
        title: s.passageTitle,
        text: s.passageEn,
        translationJa: s.passageJa
      }
    ],
    media: [
      {
        id: mediaId,
        type: 'image',
        src: s.img,
        altJa: s.altJa
      }
    ],
    items
  };
});

const exam = {
  examId: 'reading-visual-01',
  revision: 1,
  titleJa: 'リーディング画像問題 100問（Part 7）',
  parts: [
    {
      part: 7,
      titleJa: '読解問題（画像・資料参照）',
      sets
    }
  ]
};

fs.writeFileSync(contentExamPath, JSON.stringify(exam, null, 2), 'utf8');
fs.writeFileSync(distExamPath, JSON.stringify(exam, null, 2), 'utf8');

console.log(`Generated ${sets.length} sets, ${qNumber - 1} questions.`);
