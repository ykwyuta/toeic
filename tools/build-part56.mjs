import fs from 'node:fs';
import path from 'node:path';

const contentExamPath = path.resolve('content/reading-part56-01/exam.json');
const distExamPath = path.resolve('dist/reading-part56/r1/exam.json');
fs.mkdirSync(path.dirname(contentExamPath), { recursive: true });
fs.mkdirSync(path.dirname(distExamPath), { recursive: true });

// 60 original Part 5 items (6 sets x 10 items) covering diverse TOEIC skills
const p5Templates = [
  // Skill: 品詞 (Part of Speech) - 15 items
  {
    skill: '品詞', diff: 'easy',
    stem: 'The new software update will _____ improve the speed of data processing.',
    stemJa: '新しいソフトウェア更新により、データ処理の速度が大幅に向上します。',
    choices: ['significant', 'significantly', 'significance', 'signify'],
    ans: 1,
    notes: [
      'significant は形容詞で名詞を修飾します。動詞 improve を修飾する副詞が必要です。',
      'significantly は「大幅に」を表す副詞で、動詞 improve を修飾します。',
      'significance は「重要性」という名詞です。',
      'signify は「〜を意味する」という動詞です。'
    ],
    vocab: [['significantly', '大幅に'], ['data processing', 'データ処理']]
  },
  {
    skill: '品詞', diff: 'easy',
    stem: 'All employees must complete the annual safety _____ before the end of March.',
    stemJa: '全従業員は3月末までに年次安全評価を完了しなければなりません。',
    choices: ['evaluate', 'evaluated', 'evaluation', 'evaluative'],
    ans: 2,
    notes: [
      'evaluate は動詞です。冠詞 the と形容詞 annual safety の後ろには名詞が必要です。',
      'evaluated は過去形・過去分詞で、ここの目的語の名詞になりません。',
      'evaluation は「評価」という名詞で、complete の目的語として適切です。',
      'evaluative は「評価の」という形容詞です。'
    ],
    vocab: [['annual', '年次の'], ['evaluation', '評価']]
  },
  {
    skill: '品詞', diff: 'medium',
    stem: 'Ms. Rivera gave a very _____ presentation on renewable energy trends.',
    stemJa: 'リベラ氏は再生可能エネルギーの動向について非常に有益なプレゼンを行いました。',
    choices: ['inform', 'information', 'informative', 'informatively'],
    ans: 2,
    notes: [
      'inform は動詞です。名詞 presentation を修飾する形容詞が必要です。',
      'information は名詞です。副詞 very の後ろに置くには形容詞が適切です。',
      'informative は「有益な・情報量が多い」という形容詞で presentation を修飾します。',
      'informatively は副詞で、名詞を直接修飾できません。'
    ],
    vocab: [['informative', '有益な'], ['renewable energy', '再生可能エネルギー']]
  },
  {
    skill: '品詞', diff: 'easy',
    stem: 'Customer _____ is the top priority for our regional support centers.',
    stemJa: '顧客満足は、当社の地域サポートセンターにとって最優先事項です。',
    choices: ['satisfy', 'satisfied', 'satisfaction', 'satisfactory'],
    ans: 2,
    notes: [
      'satisfy は動詞です。主語となる名詞が必要です。',
      'satisfied は形容詞・過去分詞で、単独で主語になれません。',
      'satisfaction は「満足」という名詞で、Customer satisfaction で主語を作ります。',
      'satisfactory は「満足のいく」という形容詞です。'
    ],
    vocab: [['priority', '優先事項'], ['satisfaction', '満足']]
  },
  {
    skill: '品詞', diff: 'medium',
    stem: 'The accounting department reviewed the expense reports _____ to avoid errors.',
    stemJa: '経理部はミスを防ぐため、経費報告書を注意深く確認しました。',
    choices: ['thorough', 'thoroughly', 'thoroughness', 'more thorough'],
    ans: 1,
    notes: [
      'thorough は形容詞で、動詞 reviewed を修飾できません。',
      'thoroughly は「徹底的に・注意深く」という副詞で reviewed を修飾します。',
      'thoroughness は名詞です。',
      'more thorough は形容詞の比較級です。'
    ],
    vocab: [['thoroughly', '徹底的に'], ['expense report', '経費報告書']]
  },
  {
    skill: '品詞', diff: 'medium',
    stem: 'We appreciate your _____ in testing the prototype before its public release.',
    stemJa: '一般公開前に試作品のテストにご協力いただき感謝します。',
    choices: ['cooperate', 'cooperative', 'cooperation', 'cooperatively'],
    ans: 2,
    notes: [
      'cooperate は動詞です。所有格 your の後ろには名詞が必要です。',
      'cooperative は形容詞です。',
      'cooperation は「協力」という名詞で your の後ろに入ります。',
      'cooperatively は副詞です。'
    ],
    vocab: [['cooperation', '協力'], ['prototype', '試作品']]
  },
  {
    skill: '品詞', diff: 'easy',
    stem: 'The newly hired technicians are _____ trained in handling sensitive equipment.',
    stemJa: '新しく採用された技術者たちは、精密機器の扱いについて専門的な訓練を受けています。',
    choices: ['profession', 'professional', 'professionally', 'professionals'],
    ans: 2,
    notes: [
      'profession は名詞です。過去分詞 trained を修飾する副詞が必要です。',
      'professional は形容詞です。',
      'professionally は「専門的に」という副詞で trained を修飾します。',
      'professionals は複数名詞です。'
    ],
    vocab: [['sensitive equipment', '精密機器'], ['professionally', '専門的に']]
  },
  {
    skill: '品詞', diff: 'medium',
    stem: 'A _____ inspection of the ventilation system is scheduled for next Monday.',
    stemJa: '換気システムの定期点検が来週月曜日に予定されています。',
    choices: ['routine', 'routinely', 'routines', 'routinized'],
    ans: 0,
    notes: [
      'routine は「定期的な・日常の」という形容詞で inspection を修飾します。',
      'routinely は副詞で、名詞 inspection を直接修飾できません。',
      'routines は複数名詞です。',
      'routinized は「定型化された」という意味で点検の表現として不自然です。'
    ],
    vocab: [['routine inspection', '定期点検'], ['ventilation', '換気']]
  },
  {
    skill: '品詞', diff: 'hard',
    stem: 'The committee’s _____ to relocate the branch office surprised many residents.',
    stemJa: '支店を移転するという委員会の決定は、多くの住民を驚かせました。',
    choices: ['decide', 'decisive', 'decision', 'decisively'],
    ans: 2,
    notes: [
      'decide は動詞です。所有格 committee’s の後ろには名詞が必要です。',
      'decisive は「決定的な」という形容詞です。',
      'decision は「決定」という名詞で、to relocate を伴って主語になります。',
      'decisively は副詞です。'
    ],
    vocab: [['relocate', '移転する'], ['committee', '委員会']]
  },
  {
    skill: '品詞', diff: 'medium',
    stem: 'The hotel offers _____ shuttle service to the airport every thirty minutes.',
    stemJa: 'そのホテルは空港への無料シャトルサービスを30分おきに提供しています。',
    choices: ['compliment', 'complimentary', 'compliments', 'complimented'],
    ans: 1,
    notes: [
      'compliment は「賛辞」という名詞・動詞です。',
      'complimentary は「無料の」という形容詞で shuttle service を修飾します。',
      'compliments は複数名詞です。',
      'complimented は動詞の過去形・過去分詞です。'
    ],
    vocab: [['complimentary', '無料の'], ['shuttle service', 'シャトル運行']]
  },
  {
    skill: '品詞', diff: 'easy',
    stem: 'Please check the _____ of all figures before submitting the quarterly report.',
    stemJa: '四半期報告書を提出する前に、すべての数値の正確さを確認してください。',
    choices: ['accurate', 'accurately', 'accuracy', 'accuracies'],
    ans: 2,
    notes: [
      'accurate は形容詞です。the ... of の間には名詞が必要です。',
      'accurately は副詞です。',
      'accuracy は「正確さ」を表す不可算名詞として適切です。',
      'accuracies は不可算名詞の複数形として不自然です。'
    ],
    vocab: [['accuracy', '正確さ'], ['figure', '数値']]
  },
  {
    skill: '品詞', diff: 'medium',
    stem: 'The warehouse expanded its storage _____ by adding two new shelving units.',
    stemJa: '倉庫は新しい棚を2基追加して保管容量を拡大しました。',
    choices: ['capable', 'capably', 'capacity', 'capacitate'],
    ans: 2,
    notes: [
      'capable は形容詞です。its storage の後ろには名詞が必要です。',
      'capably は副詞です。',
      'capacity は「容量・収容能力」という名詞で storage capacity で自然な表現です。',
      'capacitate は動詞です。'
    ],
    vocab: [['storage capacity', '保管容量'], ['shelving unit', '棚ユニット']]
  },
  {
    skill: '品詞', diff: 'medium',
    stem: 'Passengers are advised to arrive _____ at the boarding gate.',
    stemJa: '乗客は搭乗口に時間通りに到着するよう案内されています。',
    choices: ['prompt', 'promptly', 'promptness', 'prompted'],
    ans: 1,
    notes: [
      'prompt は形容詞・動詞です。動詞 arrive を修飾する副詞が必要です。',
      'promptly は「時間通りに・速やかに」という副詞です。',
      'promptness は名詞です。',
      'prompted は過去分詞です。'
    ],
    vocab: [['promptly', '速やかに・時間通りに'], ['boarding gate', '搭乗口']]
  },
  {
    skill: '品詞', diff: 'hard',
    stem: 'The revised policy provides greater _____ for staff working remotely.',
    stemJa: '改訂された規定は、リモート勤務のスタッフにより高い柔軟性を提供します。',
    choices: ['flexible', 'flexibly', 'flexibility', 'flex'],
    ans: 2,
    notes: [
      'flexible は形容詞です。greater の後ろに目的語となる名詞が必要です。',
      'flexibly は副詞です。',
      'flexibility は「柔軟性」という名詞で適切です。',
      'flex は動詞・名詞ですが文脈に合いません。'
    ],
    vocab: [['flexibility', '柔軟性'], ['remotely', 'リモートで']]
  },
  {
    skill: '品詞', diff: 'easy',
    stem: 'The marketing team launched an _____ campaign to attract younger readers.',
    stemJa: 'マーケティングチームは若い読者を引きつけるため革新的なキャンペーンを開始しました。',
    choices: ['innovate', 'innovation', 'innovative', 'innovatively'],
    ans: 2,
    notes: [
      'innovate は動詞です。an と名詞 campaign の間には形容詞が必要です。',
      'innovation は名詞です。',
      'innovative は「革新的な」という形容詞で campaign を修飾します。',
      'innovatively は副詞です。'
    ],
    vocab: [['innovative', '革新的な'], ['launch', '開始する']]
  },

  // Skill: 動詞の形 (Verb Forms & Tenses) - 15 items
  {
    skill: '動詞の形', diff: 'easy',
    stem: 'The maintenance crew _____ the elevators in the north wing yesterday afternoon.',
    stemJa: '保守チームは昨日の午後、北棟のエレベーターを修理しました。',
    choices: ['repair', 'repairs', 'repaired', 'repairing'],
    ans: 2,
    notes: [
      'repair は原形・現在形で yesterday afternoon と時制が合いません。',
      'repairs は現在形です。',
      'repaired は過去形で yesterday afternoon に一致します。',
      'repairing は単独で述語動詞になりません。'
    ],
    vocab: [['maintenance crew', '保守チーム'], ['north wing', '北棟']]
  },
  {
    skill: '動詞の形', diff: 'medium',
    stem: 'By the time the conference starts, the volunteers _____ all the welcome packets.',
    stemJa: '会議が始まる頃には、ボランティアたちはすべての案内資料を準備し終えているでしょう。',
    choices: ['prepare', 'prepared', 'will have prepared', 'were preparing'],
    ans: 2,
    notes: [
      'prepare は現在形で未来の完了を表せません。',
      'prepared は過去形で、starts（現在・未来基準）と合いません。',
      'will have prepared は未来完了形で、会議開始時点までの完了を表します。',
      'were preparing は過去進行形です。'
    ],
    vocab: [['by the time', '〜する頃には'], ['welcome packet', '案内資料セット']]
  },
  {
    skill: '動詞の形', diff: 'easy',
    stem: 'All invoices must _____ by the department head before payment is issued.',
    stemJa: 'すべての請求書は支払いが実行される前に部門長の承認を受けなければなりません。',
    choices: ['approve', 'approved', 'be approved', 'approving'],
    ans: 2,
    notes: [
      'approve は能動態で、請求書が承認する側になってしまい不自然です。',
      'approved 単独では助動詞 must の後ろに置けません。',
      'be approved は受動態で「承認されなければならない」という意味になります。',
      'approving は must の直後に置けません。'
    ],
    vocab: [['invoice', '請求書'], ['issue payment', '支払いを実行する']]
  },
  {
    skill: '動詞の形', diff: 'medium',
    stem: 'Ms. Kato _____ as the regional director since the Tokyo branch opened in 2021.',
    stemJa: '加藤氏は2021年に東京支店が開設されて以来、地域ディレクターを務めています。',
    choices: ['serves', 'served', 'has served', 'will serve'],
    ans: 2,
    notes: [
      'serves は現在形で since 2021 の継続を表せません。',
      'served は過去形で現在までの継続になりません。',
      'has served は現在完了形で since 以降の継続を表します。',
      'will serve は未来形です。'
    ],
    vocab: [['regional director', '地域ディレクター'], ['serve as', '〜を務める']]
  },
  {
    skill: '動詞の形', diff: 'medium',
    stem: 'We recommend _____ your travel itinerary at least two weeks in advance.',
    stemJa: '旅行日程は少なくとも2週間前までに確定しておくことをお勧めします。',
    choices: ['confirm', 'to confirm', 'confirming', 'confirmed'],
    ans: 2,
    notes: [
      'confirm は動詞の原形で recommend の目的語になりません。',
      'recommend は通常 to 不定詞ではなく動名詞を目的語に取ります。',
      'confirming は動名詞で recommend + -ing の語法に一致します。',
      'confirmed は過去分詞です。'
    ],
    vocab: [['itinerary', '旅行日程'], ['in advance', '前もって']]
  },
  {
    skill: '動詞の形', diff: 'easy',
    stem: 'The supplier promised _____ the replacement parts by Friday morning.',
    stemJa: '取引業者は金曜日の朝までに交換部品を届けると約束しました。',
    choices: ['deliver', 'to deliver', 'delivering', 'delivered'],
    ans: 1,
    notes: [
      'deliver は原形で promised の直後に置けません。',
      'promise to do で「〜すると約束する」という正しい語法です。',
      'delivering は promise の目的語になりません。',
      'delivered は過去分詞です。'
    ],
    vocab: [['replacement parts', '交換部品'], ['supplier', '取引業者']]
  },
  {
    skill: '動詞の形', diff: 'hard',
    stem: 'Each of the laboratory instruments _____ calibrated once every six months.',
    stemJa: '実験室の各機器は6か月に1回校正されます。',
    choices: ['is', 'are', 'were', 'have been'],
    ans: 0,
    notes: [
      '主語は Each（単数）であり、定期的な事実を表すため単数現在 is が正解です。',
      'are は複数主語用です。instruments に引かれないよう注意が必要です。',
      'were は複数過去形です。',
      'have been は複数主語用です。'
    ],
    vocab: [['calibrate', '校正する'], ['instrument', '機器']]
  },
  {
    skill: '動詞の形', diff: 'medium',
    stem: 'The brochure _____ on the reception desk contains the updated museum hours.',
    stemJa: '受付デスクに置かれているパンフレットには最新の開館時間が載っています。',
    choices: ['place', 'placing', 'placed', 'places'],
    ans: 2,
    notes: [
      'place は原形で、すでに述語動詞 contains があるため入れません。',
      'placing は能動の分詞で「置いているパンフレット」となり不自然です。',
      'placed は過去分詞で「置かれている」と brochure を後置修飾します。',
      'places は述語動詞が重複します。'
    ],
    vocab: [['brochure', 'パンフレット'], ['updated', '最新の']]
  },
  {
    skill: '動詞の形', diff: 'easy',
    stem: 'If it _____ tomorrow, the outdoor welcome picnic will move to the main hall.',
    stemJa: '明日雨が降れば、屋外の歓迎ピクニックはメインホールへ移ります。',
    choices: ['rain', 'rains', 'will rain', 'rained'],
    ans: 1,
    notes: [
      '主語 it に対して三人称単数現在 s が抜けています。',
      '条件の if 節では未来のことも現在形（rains）で表します。',
      '条件の if 節では通常 will を使いません。',
      'rained は過去形で主節の will move と合いません。'
    ],
    vocab: [['outdoor', '屋外の'], ['main hall', 'メインホール']]
  },
  {
    skill: '動詞の形', diff: 'medium',
    stem: 'The new interns are currently _____ a three-day orientation program.',
    stemJa: '新しいインターン生たちは現在3日間のオリエンテーションに参加しています。',
    choices: ['attend', 'attended', 'attending', 'attends'],
    ans: 2,
    notes: [
      'attend は be 動詞の後ろに原形で置けません。',
      'attended にすると受動態になり、目的語 program と合いません。',
      'are currently attending で現在進行形となり文脈に一致します。',
      'attends は be 動詞の後ろに置けません。'
    ],
    vocab: [['intern', 'インターン生'], ['orientation', 'オリエンテーション']]
  },
  {
    skill: '動詞の形', diff: 'hard',
    stem: 'Had the team _____ earlier, they would have caught the express train.',
    stemJa: 'チームがもっと早く出発していれば、急行列車に間に合っていただろう。',
    choices: ['leave', 'left', 'leaving', 'leaves'],
    ans: 1,
    notes: [
      'leave は原形で Had の後ろの過去分詞になりません。',
      '仮定法過去完了の倒置（Had + S + 過去分詞）なので left が正解です。',
      'leaving は現在分詞です。',
      'leaves は現在形です。'
    ],
    vocab: [['express train', '急行列車'], ['catch a train', '電車に間に合う']]
  },
  {
    skill: '動詞の形', diff: 'medium',
    stem: 'Neither the manager nor the assistants _____ able to attend the Friday briefing.',
    stemJa: 'マネージャーもアシスタントたちも金曜日の説明会には出席できませんでした。',
    choices: ['was', 'were', 'is', 'has been'],
    ans: 1,
    notes: [
      'Neither A nor B では B（assistants：複数）に動詞を一致させるため was は不可です。',
      'assistants（複数）に一致する過去形 were が適切です。',
      'is は単数用です。',
      'has been は単数用です。'
    ],
    vocab: [['briefing', '説明会'], ['neither A nor B', 'AもBも〜ない']]
  },
  {
    skill: '動詞の形', diff: 'easy',
    stem: 'Please avoid _____ personal devices to the secure office network.',
    stemJa: '安全な社内ネットワークに個人端末を接続するのは避けてください。',
    choices: ['connect', 'to connect', 'connecting', 'connected'],
    ans: 2,
    notes: [
      'connect は原形で avoid の後ろに置けません。',
      'avoid は to 不定詞ではなく動名詞を取ります。',
      'connecting は動名詞で avoid + -ing に一致します。',
      'connected は過去分詞です。'
    ],
    vocab: [['avoid', '〜を避ける'], ['personal device', '個人端末']]
  },
  {
    skill: '動詞の形', diff: 'medium',
    stem: 'The architect _____ the final blueprints before the construction permit was approved.',
    stemJa: '建築許可が承認される前に、建築家は最終設計図を提出していました。',
    choices: ['submits', 'had submitted', 'is submitting', 'will submit'],
    ans: 1,
    notes: [
      'submits は現在形で過去の出来事と合いません。',
      'was approved（過去）より前の完了を表す過去完了形 had submitted が正解です。',
      'is submitting は現在進行形です。',
      'will submit は未来形です。'
    ],
    vocab: [['blueprint', '設計図'], ['construction permit', '建築許可']]
  },
  {
    skill: '動詞の形', diff: 'easy',
    stem: 'The workshop participants were _____ by the clarity of the instructor’s examples.',
    stemJa: 'ワークショップの参加者は講師の例示の分かりやすさに感銘を受けました。',
    choices: ['impress', 'impressing', 'impressed', 'impressive'],
    ans: 2,
    notes: [
      'impress は原形で were の後ろに置けません。',
      'impressing では能動になり by 〜 と合いません。',
      'be impressed by 〜 で「〜に感銘を受ける」という表現になります。',
      'impressive は形容詞で by 〜 を伴う受動表現になりません。'
    ],
    vocab: [['clarity', '明快さ'], ['be impressed by', '〜に感銘を受ける']]
  },

  // Skill: 接続詞と前置詞 (Conjunctions & Prepositions) - 15 items
  {
    skill: '接続詞と前置詞', diff: 'easy',
    stem: '_____ the heavy snowfall, all commuter trains operated on schedule.',
    stemJa: '大雪にもかかわらず、すべての通勤電車は定刻通りに運行しました。',
    choices: ['Although', 'Despite', 'Because', 'Unless'],
    ans: 1,
    notes: [
      'Although は接続詞で節（S+V）が必要です。後ろは名詞句 the heavy snowfall です。',
      'Despite は「〜にもかかわらず」という前置詞で名詞句を取ります。',
      'Because は接続詞かつ理由を表し、文意と文法の両方に合いません。',
      'Unless は「〜でない限り」という接続詞です。'
    ],
    vocab: [['commuter train', '通勤電車'], ['on schedule', '定刻通りに']]
  },
  {
    skill: '接続詞と前置詞', diff: 'easy',
    stem: 'The store will remain open _____ 9:00 P.M. during the holiday week.',
    stemJa: 'その店はホリデー週間中、午後9時まで営業を続けます。',
    choices: ['until', 'while', 'among', 'between'],
    ans: 0,
    notes: [
      'until は「〜まで（ずっと）」を表す前置詞で 9:00 P.M. と結びつきます。',
      'while は「〜の間」を表す接続詞で節が必要です。',
      'among は「〜の間で（3つ以上）」です。',
      'between は「AとBの間」で時刻1点には使えません。'
    ],
    vocab: [['remain open', '営業を続ける'], ['holiday week', '休暇週間']]
  },
  {
    skill: '接続詞と前置詞', diff: 'medium',
    stem: '_____ you need technical assistance, please contact the IT help desk.',
    stemJa: '技術的な支援が必要な場合は、ITヘルプデスクへご連絡ください。',
    choices: ['In case of', 'If', 'During', 'Because of'],
    ans: 1,
    notes: [
      'In case of は前置詞句で後ろに名詞が必要です。ここは節 you need ... です。',
      'If は条件を表す接続詞で、後ろに節を取ります。',
      'During は前置詞です。',
      'Because of は前置詞句です。'
    ],
    vocab: [['technical assistance', '技術支援'], ['help desk', 'ヘルプデスク']]
  },
  {
    skill: '接続詞と前置詞', diff: 'medium',
    stem: 'The seminar was postponed _____ a scheduling conflict with the keynote speaker.',
    stemJa: '基調講演者との日程調整の都合により、セミナーは延期されました。',
    choices: ['because', 'due to', 'although', 'since'],
    ans: 1,
    notes: [
      'because は接続詞で節が必要です。後ろは名詞句 a scheduling conflict です。',
      'due to は「〜のため」を表す前置詞句で名詞句を取ります。',
      'although は逆接の接続詞です。',
      'since は接続詞（または「〜以来」の前置詞）で理由の名詞句を取りません。'
    ],
    vocab: [['postpone', '延期する'], ['scheduling conflict', '日程の重複']]
  },
  {
    skill: '接続詞と前置詞', diff: 'easy',
    stem: 'Please submit your reimbursement receipts _____ five business days of your trip.',
    stemJa: '出張から5営業日以内に経費精算の領収書を提出してください。',
    choices: ['within', 'while', 'unless', 'though'],
    ans: 0,
    notes: [
      'within は「〜以内に」を表す前置詞で five business days と結びつきます。',
      'while は接続詞です。',
      'unless は接続詞です。',
      'though は接続詞です。'
    ],
    vocab: [['reimbursement', '経費精算・払い戻し'], ['business day', '営業日']]
  },
  {
    skill: '接続詞と前置詞', diff: 'medium',
    stem: '_____ the client has signed the contract, we cannot begin production.',
    stemJa: '顧客が契約書に署名しない限り、製造を開始することはできません。',
    choices: ['Unless', 'Without', 'Despite', 'During'],
    ans: 0,
    notes: [
      'Unless は「〜でない限り」という接続詞で、後ろの節と文意に一致します。',
      'Without は前置詞で節を取れません。',
      'Despite は前置詞です。',
      'During は前置詞です。'
    ],
    vocab: [['contract', '契約書'], ['unless', '〜でない限り']]
  },
  {
    skill: '接続詞と前置詞', diff: 'medium',
    stem: 'The new café is conveniently located _____ the train station and the library.',
    stemJa: '新しいカフェは駅と図書館の間の便利な場所にあります。',
    choices: ['among', 'between', 'through', 'into'],
    ans: 1,
    notes: [
      'among は3つ以上のものの間に使います。',
      'between A and B で「AとBの間に」を表します。',
      'through は「〜を通って」です。',
      'into は「〜の中へ」です。'
    ],
    vocab: [['conveniently located', '便利な場所にある'], ['between A and B', 'AとBの間に']]
  },
  {
    skill: '接続詞と前置詞', diff: 'hard',
    stem: '_____ the renovation takes place, visitors should use the west entrance.',
    stemJa: '改装工事が行われている間、来訪者は西口をご利用ください。',
    choices: ['During', 'While', 'Throughout', 'For'],
    ans: 1,
    notes: [
      'During は前置詞で、後ろの節 the renovation takes place を導けません。',
      'While は「〜の間」を表す接続詞で、後ろに節を取ります。',
      'Throughout は前置詞です。',
      'For は前置詞（または等位接続詞「というのも」）で文意に合いません。'
    ],
    vocab: [['renovation', '改装工事'], ['take place', '行われる']]
  },
  {
    skill: '接続詞と前置詞', diff: 'medium',
    stem: 'The team finished the audit ahead of schedule _____ working extra hours.',
    stemJa: 'チームは残業することによって予定より早く監査を終えました。',
    choices: ['by', 'until', 'except', 'against'],
    ans: 0,
    notes: [
      'by + -ing で「〜することによって」という手段を表します。',
      'until は「〜まで」です。',
      'except は「〜を除いて」です。',
      'against は「〜に反対して」です。'
    ],
    vocab: [['audit', '監査'], ['ahead of schedule', '予定より早く']]
  },
  {
    skill: '接続詞と前置詞', diff: 'easy',
    stem: 'All departments are invited to the luncheon _____ the finance team, who have a client audit.',
    stemJa: '顧客監査がある財務チームを除き、すべての部署が昼食会に招待されています。',
    choices: ['except', 'besides', 'instead', 'unless'],
    ans: 0,
    notes: [
      'except は「〜を除いて」を表す前置詞で文脈に一致します。',
      'besides は「〜に加えて」で意味が逆になります。',
      'instead は副詞で of が必要です。',
      'unless は接続詞です。'
    ],
    vocab: [['luncheon', '昼食会'], ['except', '〜を除いて']]
  },
  {
    skill: '接続詞と前置詞', diff: 'hard',
    stem: '_____ the sales figures improved in May, overall annual growth remained modest.',
    stemJa: '5月に売上高は改善したものの、年間全体の成長は控えめなままでした。',
    choices: ['Even though', 'Despite', 'Because of', 'In spite of'],
    ans: 0,
    notes: [
      'Even though は「〜だけれども」という接続詞で、後ろの節を導きます。',
      'Despite は前置詞で節を取れません。',
      'Because of は理由の前置詞句です。',
      'In spite of は前置詞句です。'
    ],
    vocab: [['modest', '控えめな'], ['overall', '全体の']]
  },
  {
    skill: '接続詞と前置詞', diff: 'medium',
    stem: 'Please keep your badge visible _____ you are inside the research facility.',
    stemJa: '研究施設内にいる間は、身分証を見える位置に着用してください。',
    choices: ['as long as', 'due to', 'according to', 'prior to'],
    ans: 0,
    notes: [
      'as long as は「〜する間は・〜する限り」という接続詞で節を取ります。',
      'due to は前置詞句です。',
      'according to は前置詞句です。',
      'prior to は前置詞句です。'
    ],
    vocab: [['visible', '目に見える'], ['facility', '施設']]
  },
  {
    skill: '接続詞と前置詞', diff: 'easy',
    stem: 'The parcel was delivered _____ our receptionist at 10:15 A.M.',
    stemJa: 'その小包は午前10時15分に受付係へ配達されました。',
    choices: ['to', 'at', 'on', 'of'],
    ans: 0,
    notes: [
      'deliver A to B で「AをBに配達する」となります。',
      'at は場所の一点に使いますが、受取人には to を使います。',
      'on は接触・日付に使います。',
      'of は所有・所属を表します。'
    ],
    vocab: [['parcel', '小包'], ['receptionist', '受付係']]
  },
  {
    skill: '接続詞と前置詞', diff: 'medium',
    stem: 'The manager asked whether we preferred the morning slot _____ the afternoon slot.',
    stemJa: 'マネージャーは午前の枠と午後の枠のどちらを希望するか尋ねました。',
    choices: ['and', 'or', 'nor', 'but'],
    ans: 1,
    notes: [
      'and は並列で、whether ... or 〜 の選択構造に合いません。',
      'whether A or B（AかBか）の相関表現として or が正解です。',
      'nor は否定の neither と組になります。',
      'but は逆接です。'
    ],
    vocab: [['prefer', '〜を好む'], ['whether ... or', '〜かそれとも…か']]
  },
  {
    skill: '接続詞と前置詞', diff: 'hard',
    stem: '_____ further notice, the rooftop terrace will be closed for waterproofing work.',
    stemJa: '追って通知があるまで、屋上テラスは防水工事のため閉鎖されます。',
    choices: ['Until', 'Since', 'Across', 'Beyond'],
    ans: 0,
    notes: [
      'Until further notice は「追って通知があるまで」という定型表現です。',
      'Since は「〜以来」で意味が合いません。',
      'Across は「〜を横切って」です。',
      'Beyond は「〜を越えて」です。'
    ],
    vocab: [['until further notice', '追って通知があるまで'], ['waterproofing', '防水加工']]
  },

  // Skill: 語彙と文脈 (Vocabulary & Context) - 15 items
  {
    skill: '語彙と文脈', diff: 'easy',
    stem: 'The airline apologized for the _____ caused by the unexpected runway closure.',
    stemJa: '航空会社は予期せぬ滑走路閉鎖によるご不便をお詫びしました。',
    choices: ['inconvenience', 'appliance', 'attendance', 'insurance'],
    ans: 0,
    notes: [
      'inconvenience は「不便・迷惑」で apologize for the inconvenience は定番表現です。',
      'appliance は「家電製品」です。',
      'attendance は「出席」です。',
      'insurance は「保険」です。'
    ],
    vocab: [['inconvenience', '不便・迷惑'], ['runway', '滑走路']]
  },
  {
    skill: '語彙と文脈', diff: 'medium',
    stem: 'To reduce paper waste, all monthly statements will be sent _____ starting in July.',
    stemJa: '紙の無駄を減らすため、7月からすべての月次明細書は電子的に送付されます。',
    choices: ['electronically', 'manually', 'hesitantly', 'randomly'],
    ans: 0,
    notes: [
      'electronically は「電子的に」で、紙の削減という目的に一致します。',
      'manually は「手作業で」です。',
      'hesitantly は「ためらいがちに」です。',
      'randomly は「無作為に」です。'
    ],
    vocab: [['monthly statement', '月次明細書'], ['electronically', '電子的に']]
  },
  {
    skill: '語彙と文脈', diff: 'easy',
    stem: 'Our new ergonomic chairs are designed to _____ back strain during long shifts.',
    stemJa: '新しい人間工学チェアは、長時間勤務中の腰への負担を軽減するよう設計されています。',
    choices: ['minimize', 'enlarge', 'postpone', 'borrow'],
    ans: 0,
    notes: [
      'minimize は「最小限に抑える・軽減する」で back strain と自然に結びつきます。',
      'enlarge は「拡大する」で逆の意味になります。',
      'postpone は「延期する」です。',
      'borrow は「借りる」です。'
    ],
    vocab: [['minimize', '最小限に抑える'], ['strain', '負担・緊張']]
  },
  {
    skill: '語彙と文脈', diff: 'medium',
    stem: 'The keynote speaker provided practical _____ on managing distributed teams.',
    stemJa: '基調講演者は分散チームの管理について実践的な助言を提供しました。',
    choices: ['insights', 'invoices', 'ingredients', 'intervals'],
    ans: 0,
    notes: [
      'insights は「洞察・実践的な知見」で文脈に一致します。',
      'invoices は「請求書」です。',
      'ingredients は「材料・成分」です。',
      'intervals は「間隔」です。'
    ],
    vocab: [['insight', '洞察・知見'], ['distributed team', '分散チーム']]
  },
  {
    skill: '語彙と文脈', diff: 'easy',
    stem: 'Please _____ the attached form and return it to Human Resources by Thursday.',
    stemJa: '添付の用紙に記入し、木曜日までに人事部へ返送してください。',
    choices: ['complete', 'compete', 'complain', 'compose'],
    ans: 0,
    notes: [
      'complete a form で「用紙に記入を完了する」という意味になります。',
      'compete は「競争する」です。',
      'complain は「苦情を言う」です。',
      'compose は「作曲する・構成する」です。'
    ],
    vocab: [['attached form', '添付用紙'], ['complete', '記入する・完了する']]
  },
  {
    skill: '語彙と文脈', diff: 'medium',
    stem: 'Because of strong seasonal _____, the bakery hired three additional part-time staff.',
    stemJa: '季節的な強い需要のため、そのベーカリーはパートスタッフを3名追加採用しました。',
    choices: ['demand', 'debate', 'departure', 'deposit'],
    ans: 0,
    notes: [
      'demand は「需要」で、スタッフ追加採用の理由として自然です。',
      'debate は「討論」です。',
      'departure は「出発」です。',
      'deposit は「預金・手付金」です。'
    ],
    vocab: [['seasonal demand', '季節需要'], ['additional', '追加の']]
  },
  {
    skill: '語彙と文脈', diff: 'hard',
    stem: 'The warranty covers manufacturing defects but does not apply to _____ damage.',
    stemJa: '保証は製造上の欠陥を対象としていますが、偶発的な損傷には適用されません。',
    choices: ['accidental', 'abundant', 'adjacent', 'adequate'],
    ans: 0,
    notes: [
      'accidental は「偶発的な」で accidental damage（不慮の損傷）が自然な表現です。',
      'abundant は「豊富な」です。',
      'adjacent は「隣接した」です。',
      'adequate は「十分な」です。'
    ],
    vocab: [['warranty', '保証'], ['manufacturing defect', '製造上の欠陥']]
  },
  {
    skill: '語彙と文脈', diff: 'medium',
    stem: 'The city council approved funds to _____ the aging water pipes downtown.',
    stemJa: '市議会は中心部の老朽化した水道管を交換するための予算を承認しました。',
    choices: ['replace', 'remind', 'resemble', 'recite'],
    ans: 0,
    notes: [
      'replace は「交換する」で aging water pipes に合います。',
      'remind は「思い出させる」です。',
      'resemble は「〜に似ている」です。',
      'recite は「暗唱する」です。'
    ],
    vocab: [['aging', '老朽化した'], ['approve funds', '予算を承認する']]
  },
  {
    skill: '語彙と文脈', diff: 'easy',
    stem: 'Visitors must obtain a temporary parking _____ from the security desk.',
    stemJa: '来訪者は警備デスクで一時駐車許可証を受け取る必要があります。',
    choices: ['permit', 'profit', 'planet', 'pocket'],
    ans: 0,
    notes: [
      'permit は「許可証」で parking permit（駐車許可証）となります。',
      'profit は「利益」です。',
      'planet は「惑星」です。',
      'pocket は「ポケット」です。'
    ],
    vocab: [['temporary', '一時的な'], ['parking permit', '駐車許可証']]
  },
  {
    skill: '語彙と文脈', diff: 'medium',
    stem: 'The software includes a built-in tutorial to help new users _____ the interface.',
    stemJa: 'そのソフトには、新規ユーザーが画面操作に慣れるのを助ける内蔵チュートリアルがあります。',
    choices: ['navigate', 'negotiate', 'nominate', 'narrate'],
    ans: 0,
    notes: [
      'navigate は「（画面・サイトを）操作する・移動する」で interface と結びつきます。',
      'negotiate は「交渉する」です。',
      'nominate は「指名する」です。',
      'narrate は「語る」です。'
    ],
    vocab: [['built-in', '内蔵の'], ['navigate', '操作する・移動する']]
  },
  {
    skill: '語彙と文脈', diff: 'hard',
    stem: 'Our logistics partner guarantees next-day delivery for all _____ shipments.',
    stemJa: '当社の物流パートナーは、すべての国内配送について翌日配達を保証しています。',
    choices: ['domestic', 'dramatic', 'duplicate', 'dormant'],
    ans: 0,
    notes: [
      'domestic は「国内の」で domestic shipments（国内配送）となります。',
      'dramatic は「劇的な」です。',
      'duplicate は「複製の」です。',
      'dormant は「休止中の」です。'
    ],
    vocab: [['domestic', '国内の'], ['guarantee', '保証する']]
  },
  {
    skill: '語彙と文脈', diff: 'easy',
    stem: 'Please verify that your shipping _____ is correct before placing the order.',
    stemJa: '注文を確定する前に、配送先住所が正しいか確認してください。',
    choices: ['address', 'advice', 'accent', 'amount'],
    ans: 0,
    notes: [
      'shipping address で「配送先住所」となります。',
      'advice は「助言」です。',
      'accent は「アクセント」です。',
      'amount は「量・金額」です。'
    ],
    vocab: [['verify', '確認する'], ['place an order', '注文する']]
  },
  {
    skill: '語彙と文脈', diff: 'medium',
    stem: 'The new director plans to _____ several outdated administrative procedures.',
    stemJa: '新任のディレクターは、いくつかの時代遅れの事務手続きを合理化する計画です。',
    choices: ['streamline', 'scatter', 'suspend', 'stretch'],
    ans: 0,
    notes: [
      'streamline は「合理化する・効率化する」で procedures とよく使われます。',
      'scatter は「まき散らす」です。',
      'suspend は「一時停止する」です。',
      'stretch は「伸ばす」です。'
    ],
    vocab: [['streamline', '合理化する'], ['outdated', '時代遅れの']]
  },
  {
    skill: '語彙と文脈', diff: 'medium',
    stem: 'The exhibition attracted a _____ audience of architects, designers, and students.',
    stemJa: 'その展示会は建築家、デザイナー、学生など多様な観客を集めました。',
    choices: ['diverse', 'distant', 'dense', 'direct'],
    ans: 0,
    notes: [
      'diverse は「多様な」で、複数職種の観客を表す文脈に一致します。',
      'distant は「遠い」です。',
      'dense は「密集した」です。',
      'direct は「直接の」です。'
    ],
    vocab: [['diverse', '多様な'], ['attract', '引きつける']]
  },
  {
    skill: '語彙と文脈', diff: 'easy',
    stem: 'All conference materials will be _____ to registered attendees via email.',
    stemJa: 'すべての会議資料は登録済みの参加者へメールで配布されます。',
    choices: ['distributed', 'disturbed', 'disputed', 'disposed'],
    ans: 0,
    notes: [
      'distributed は「配布される」で materials と一致します。',
      'disturbed は「妨害される」です。',
      'disputed は「議論される」です。',
      'disposed は「処分される」です。'
    ],
    vocab: [['distribute', '配布する'], ['attendee', '参加者']]
  }
];

// 10 original Part 6 passages (4 questions each = 40 questions, including 1 sentence insertion each)
const p6Passages = [
  {
    id: 'p6-s01', title: 'Internal Memo: Office Printer Upgrade',
    text: 'To: All Staff\nFrom: IT Support\nSubject: New Multifunction Printers\n\nNext Monday, our team will install two new multifunction printers on the third floor. These units print faster and [1] significantly less energy than the current models. [2]. To avoid delays during the installation, please send any urgent print jobs to the second-floor printer between 9:00 A.M. and 11:00 A.M. Once the setup is complete, we will email a short guide [3] how to connect your laptop. Thank you for your [4] while we improve our office equipment.',
    textJa: '宛先：全スタッフ / 差出人：ITサポート / 件名：新型複合機\n来週月曜日に3階へ新型複合機を2台設置します。これらは現行機種より印刷が速く、消費電力も大幅に少ないです。[2]。設置中の遅延を避けるため、午前9時〜11時の急ぎの印刷は2階のプリンターへ送ってください。設定完了後、ノートPCの接続方法を説明する短いガイドをメールします。オフィス機器の改善中のご協力に感謝します。',
    vocab: [['multifunction', '多機能の'], ['urgent', '緊急の'], ['patience', '忍耐・ご理解']],
    qs: [
      { skill: '語彙と文脈', diff: 'easy', stem: 'Select the best word for blank [1].', stemJa: '空所 [1] に最も適切な語を選んでください。', choices: ['consume', 'contain', 'convince', 'collect'], ans: 0, notes: ['consume energy で「電力を消費する」となり文意に合います。', 'contain は「含む」です。', 'convince は「納得させる」です。', 'collect は「集める」です。'] },
      { skill: '文挿入', diff: 'medium', stem: 'Select the best sentence for blank [2].', stemJa: '空所 [2] に最も適切な文を選んでください。', choices: ['They also support double-sided scanning directly to email.', 'The cafeteria menu will change next Tuesday.', 'Please return your visitor badge at the lobby.', 'Our annual picnic was postponed due to rain.'], ans: 0, notes: ['前文の新型複合機の利点（速い・省エネ）に続けて、追加機能（両面スキャン）を述べる文が自然です。', 'カフェテリアの話は文脈と無関係です。', '来客バッジの話は無関係です。', 'ピクニックの話は無関係です。'] },
      { skill: '動詞の形', diff: 'medium', stem: 'Select the best word for blank [3].', stemJa: '空所 [3] に最も適切な語を選んでください。', choices: ['explain', 'explained', 'explaining', 'explanation'], ans: 2, notes: ['explain は原形で名詞 guide を修飾できません。', 'explained は受動になり意味が合いません。', 'explaining は現在分詞で「〜を説明するガイド」と後置修飾します。', 'explanation は名詞で後ろの how to ... と直接つながりません。'] },
      { skill: '品詞', diff: 'easy', stem: 'Select the best word for blank [4].', stemJa: '空所 [4] に最も適切な語を選んでください。', choices: ['patient', 'patiently', 'patience', 'patients'], ans: 2, notes: ['patient は形容詞です。your の後ろには名詞が必要です。', 'patiently は副詞です。', 'Thank you for your patience で「ご理解・ご協力に感謝します」という定番表現です。', 'patients は「患者たち」です。'] }
    ]
  },
  {
    id: 'p6-s02', title: 'Customer Notice: Store Renovation',
    text: 'Dear Valued Customers,\n\nOakridge Home Goods will be closed for interior remodeling from April 3 through April 7. During this time, our contractors will expand the lighting section and [1] wider aisles for easier shopping. [2]. However, our online store will remain fully operational, and local pickup will be available at the side entrance. We look forward to [3] you back on April 8 with special grand-reopening discounts [4] all kitchenware.',
    textJa: 'お客様各位\nオークリッジ・ホームグッズは4月3日〜7日の間、内装改装のため休業いたします。期間中、照明コーナーを拡大し、買い物しやすいよう通路を広く設けます。[2]。ただしオンラインストアは通常通り営業し、脇の入口で店舗受取が可能です。4月8日にキッチン用品全品のリニューアル記念割引で皆様をお迎えできるのを楽しみにしております。',
    vocab: [['remodeling', '改装'], ['aisle', '通路'], ['operational', '稼働中の']],
    qs: [
      { skill: '語彙と文脈', diff: 'easy', stem: 'Select the best word for blank [1].', stemJa: '空所 [1] に最も適切な語を選んでください。', choices: ['create', 'cancel', 'borrow', 'divide'], ans: 0, notes: ['create wider aisles（より広い通路を作る）が文脈に一致します。', 'cancel は「中止する」です。', 'borrow は「借りる」です。', 'divide は「分割する」です。'] },
      { skill: '文挿入', diff: 'medium', stem: 'Select the best sentence for blank [2].', stemJa: '空所 [2] に最も適切な文を選んでください。', choices: ['In-store shopping will not be possible during these five days.', 'All employees must attend a tax seminar.', 'The parking garage is free on Sundays.', 'Our bakery sells fresh bread every morning.'], ans: 0, notes: ['直後の However, our online store will remain fully operational（ただしオンラインは営業）と対比になる「実店舗での買い物は5日間不可」が最適です。', '税務セミナーは無関係です。', '駐車場の話は無関係です。', 'ベーカリーの話は無関係です。'] },
      { skill: '動詞の形', diff: 'easy', stem: 'Select the best word for blank [3].', stemJa: '空所 [3] に最も適切な語を選んでください。', choices: ['welcome', 'welcoming', 'welcomed', 'welcomes'], ans: 1, notes: ['look forward to の to は前置詞のため原形は不可です。', 'look forward to welcoming で「お迎えするのを楽しみにする」となります。', 'welcomed は過去分詞です。', 'welcomes は三人称単数現在です。'] },
      { skill: '接続詞と前置詞', diff: 'medium', stem: 'Select the best word for blank [4].', stemJa: '空所 [4] に最も適切な語を選んでください。', choices: ['on', 'at', 'by', 'into'], ans: 0, notes: ['discounts on all kitchenware（キッチン用品の割引）で前置詞 on を使います。', 'at は対象商品には使いません。', 'by は手段・期限です。', 'into は方向です。'] }
    ]
  },
  {
    id: 'p6-s03', title: 'Email: Conference Registration Confirmation',
    text: 'Dear Mr. Takahashi,\n\nThank you for registering for the Pacific Logistics Summit on September 18. Your badge and session schedule will be [1] at the main check-in desk starting at 8:00 A.M. [2]. If you have any dietary restrictions for the catered lunch, please notify us [3] September 10. Should you need to transfer your ticket to a colleague, simply reply to this email with their full name and job [4].',
    textJa: '高橋様\n9月18日のパシフィック物流サミットへのご登録ありがとうございます。バッジと予定表は午前8時よりメイン受付でお渡し可能です。[2]。ケータリング昼食に食事制限がある場合は9月10日までにお知らせください。チケットを同僚へ譲渡する場合は、その方の氏名と役職をこのメールへご返信ください。',
    vocab: [['dietary restriction', '食事制限'], ['catered', 'ケータリングの'], ['transfer', '譲渡する']],
    qs: [
      { skill: '語彙と文脈', diff: 'easy', stem: 'Select the best word for blank [1].', stemJa: '空所 [1] に最も適切な語を選んでください。', choices: ['available', 'avoidable', 'audible', 'agreeable'], ans: 0, notes: ['be available at the desk（デスクで受け取り可能）が適切です。', 'avoidable は「避けられる」です。', 'audible は「聞こえる」です。', 'agreeable は「快い」です。'] },
      { skill: '文挿入', diff: 'medium', stem: 'Select the best sentence for blank [2].', stemJa: '空所 [2] に最も適切な文を選んでください。', choices: ['Please bring a photo ID to speed up the check-in process.', 'The hotel pool closes at 9:00 P.M.', 'We have hired two new graphic designers.', 'Construction on the bridge will end in May.'], ans: 0, notes: ['前文の受付（check-in desk）に続けて、受付をスムーズにするため身分証持参を案内する文が自然です。', 'プールの話は無関係です。', 'デザイナー採用は無関係です。', '橋の工事は無関係です。'] },
      { skill: '接続詞と前置詞', diff: 'easy', stem: 'Select the best word for blank [3].', stemJa: '空所 [3] に最も適切な語を選んでください。', choices: ['by', 'until', 'during', 'among'], ans: 0, notes: ['期限「9月10日までに（通知する）」には前置詞 by を使います。', 'until は継続の期限です。', 'during は期間です。', 'among は「〜の間で」です。'] },
      { skill: '語彙と文脈', diff: 'easy', stem: 'Select the best word for blank [4].', stemJa: '空所 [4] に最も適切な語を選んでください。', choices: ['title', 'ticket', 'table', 'topic'], ans: 0, notes: ['job title で「役職・肩書き」となります。', 'ticket は「チケット」です。', 'table は「表・テーブル」です。', 'topic は「話題」です。'] }
    ]
  },
  {
    id: 'p6-s04', title: 'Announcement: New Bicycle Storage Area',
    text: 'To: Building Tenants\nFrom: Property Management\n\nWe are pleased to announce that a covered bicycle storage rack has been [1] next to the north garage entrance. Tenants who commute by bike may request an access key at the management office. [2]. Please note that bicycles may not be [3] in the main lobby or hallways for safety reasons. We hope this addition makes your daily commute more [4].',
    textJa: '宛先：ビル入居者各位 / 差出人：管理会社\n北側駐車場入口の隣に屋根付き駐輪ラックを設置したことをお知らせします。自転車通勤の入居者は管理事務所でアクセスキーを申請できます。[2]。安全上の理由から、メインロビーや廊下に自転車を置かないでください。この設備により毎日の通勤がより快適になることを願っております。',
    vocab: [['tenant', '入居者'], ['commute', '通勤する'], ['addition', '追加設備']],
    qs: [
      { skill: '動詞の形', diff: 'easy', stem: 'Select the best word for blank [1].', stemJa: '空所 [1] に最も適切な語を選んでください。', choices: ['install', 'installed', 'installing', 'installation'], ans: 1, notes: ['has been の後ろなので過去分詞が必要です。', 'has been installed（設置された）で現在完了受動態になります。', 'installing は能動です。', 'installation は名詞です。'] },
      { skill: '文挿入', diff: 'medium', stem: 'Select the best sentence for blank [2].', stemJa: '空所 [2] に最も適切な文を選んでください。', choices: ['There is no fee for the key, though a $10 deposit is required.', 'The elevator will be inspected next Friday.', 'All mail is delivered before noon.', 'Please turn off the lights when leaving.'], ans: 0, notes: ['前文の access key について費用とデポジットを補足する文が自然につながります。', 'エレベーター点検は無関係です。', '郵便配達は本文と無関係です。', '消灯の案内は無関係です。'] },
      { skill: '語彙と文脈', diff: 'easy', stem: 'Select the best word for blank [3].', stemJa: '空所 [3] に最も適切な語を選んでください。', choices: ['parked', 'packed', 'painted', 'passed'], ans: 0, notes: ['bicycles may not be parked（自転車を駐輪してはいけない）が適切です。', 'packed は「梱包される」です。', 'painted は「塗装される」です。', 'passed は「通過される」です。'] },
      { skill: '品詞', diff: 'easy', stem: 'Select the best word for blank [4].', stemJa: '空所 [4] に最も適切な語を選んでください。', choices: ['convenience', 'convenient', 'conveniently', 'conveniences'], ans: 1, notes: ['convenience は名詞です。make + O + C の補語には形容詞が必要です。', 'convenient は形容詞で more convenient（より便利な）となります。', 'conveniently は副詞です。', 'conveniences は複数名詞です。'] }
    ]
  },
  {
    id: 'p6-s05', title: 'Email: Shipment Delay Apology',
    text: 'Dear Ms. Bennett,\n\nWe are writing to inform you that your order #4821 has been slightly delayed due to [1] weather conditions at our regional hub. Our carrier now expects to deliver the package on Thursday afternoon. [2]. As a token of our apology, we have applied a 15 percent [3] to your next online purchase. Please do not hesitate to contact us [4] you have any questions.',
    textJa: 'ベネット様\n地域拠点の悪天候により、ご注文番号#4821がわずかに遅れております。配送業者は木曜午後の配達を見込んでいます。[2]。お詫びの印として、次回オンライン購入時に使える15%割引を適用いたしました。ご不明な点がございましたら遠慮なくご連絡ください。',
    vocab: [['regional hub', '地域拠点'], ['token of apology', 'お詫びの印'], ['hesitate', 'ためらう']],
    qs: [
      { skill: '語彙と文脈', diff: 'easy', stem: 'Select the best word for blank [1].', stemJa: '空所 [1] に最も適切な語を選んでください。', choices: ['severe', 'silent', 'smooth', 'simple'], ans: 0, notes: ['severe weather conditions（悪天候）が配送遅延の理由として適切です。', 'silent は「静かな」です。', 'smooth は「滑らかな」です。', 'simple は「単純な」です。'] },
      { skill: '文挿入', diff: 'medium', stem: 'Select the best sentence for blank [2].', stemJa: '空所 [2] に最も適切な文を選んでください。', choices: ['You can monitor the updated status using the tracking link below.', 'Our showroom is open seven days a week.', 'Thank you for applying for the sales position.', 'The warranty lasts for three years.'], ans: 0, notes: ['前文の配送予定（Thursday afternoon）に続けて、追跡リンクで状況確認できることを案内する文が自然です。', 'ショールームの営業時間は無関係です。', '採用応募の礼状は無関係です。', '保証期間の話は無関係です。'] },
      { skill: '語彙と文脈', diff: 'easy', stem: 'Select the best word for blank [3].', stemJa: '空所 [3] に最も適切な語を選んでください。', choices: ['discount', 'distance', 'display', 'district'], ans: 0, notes: ['15 percent discount（15%割引）が適切です。', 'distance は「距離」です。', 'display は「展示」です。', 'district は「地区」です。'] },
      { skill: '接続詞と前置詞', diff: 'easy', stem: 'Select the best word for blank [4].', stemJa: '空所 [4] に最も適切な語を選んでください。', choices: ['if', 'during', 'despite', 'because of'], ans: 0, notes: ['if you have any questions（ご質問があれば）で接続詞 if が正解です。', 'during は前置詞です。', 'despite は前置詞です。', 'because of は前置詞句です。'] }
    ]
  },
  {
    id: 'p6-s06', title: 'HR Memo: Mentorship Program',
    text: 'To: All Department Managers\nFrom: Human Resources\n\nThis autumn, we are launching a peer mentorship program to help new hires [1] smoothly into their roles. Experienced staff members who volunteer as mentors will meet with their assigned partner once every two weeks. [2]. We believe this initiative will strengthen teamwork and [3] employee retention across the company. Please nominate two qualified candidates from your team [4] October 5.',
    textJa: '宛先：各部門マネージャー / 差出人：人事部\nこの秋、新入社員が業務に円滑になじめるようピア・メンター制度を開始します。メンターに志願した経験豊富な社員は、担当パートナーと2週間に1回面談します。[2]。この取り組みによりチームワークが強化され、全社的な定着率が向上すると考えています。10月5日までにチームから適任者2名を推薦してください。',
    vocab: [['new hire', '新入社員'], ['retention', '定着率'], ['nominate', '推薦する']],
    qs: [
      { skill: '語彙と文脈', diff: 'medium', stem: 'Select the best word for blank [1].', stemJa: '空所 [1] に最も適切な語を選んでください。', choices: ['transition', 'translate', 'transport', 'transmit'], ans: 0, notes: ['transition smoothly into their roles（役割へ円滑に移行する・なじむ）が適切です。', 'translate は「翻訳する」です。', 'transport は「輸送する」です。', 'transmit は「送信する」です。'] },
      { skill: '文挿入', diff: 'medium', stem: 'Select the best sentence for blank [2].', stemJa: '空所 [2] に最も適切な文を選んでください。', choices: ['A brief training session for mentors will be held on October 12.', 'The cafeteria now serves vegan soup.', 'Please lock your desk drawers at night.', 'Our London office moved last year.'], ans: 0, notes: ['前文のメンターの役割に続けて、メンター向け研修の日程を案内する文が自然です。', 'カフェテリアは無関係です。', '机の施錠は無関係です。', 'ロンドン支店は本文と無関係です。'] },
      { skill: '語彙と文脈', diff: 'medium', stem: 'Select the best word for blank [3].', stemJa: '空所 [3] に最も適切な語を選んでください。', choices: ['improve', 'ignore', 'interrupt', 'impose'], ans: 0, notes: ['improve employee retention（社員の定着率を向上させる）が適切です。', 'ignore は「無視する」です。', 'interrupt は「中断する」です。', 'impose は「課す」です。'] },
      { skill: '接続詞と前置詞', diff: 'easy', stem: 'Select the best word for blank [4].', stemJa: '空所 [4] に最も適切な語を選んでください。', choices: ['by', 'since', 'while', 'except'], ans: 0, notes: ['期限「10月5日までに」には前置詞 by を使います。', 'since は「〜以来」です。', 'while は接続詞です。', 'except は「〜を除いて」です。'] }
    ]
  },
  {
    id: 'p6-s07', title: 'Newsletter: Community Library Book Sale',
    text: 'The Friends of Riverbend Library will host its annual used book sale this Saturday from 10:00 A.M. to 4:00 P.M. Thousands of gently used novels, cookbooks, and children’s stories will be [1] at prices starting at just one dollar. [2]. All proceeds from the event will directly [3] the purchase of new digital audiobooks for the library collection. We encourage visitors to bring [4] own reusable shopping bags.',
    textJa: 'リバーベンド図書館友の会は、今週土曜の午前10時〜午後4時に年次古本市を開催します。状態の良い小説、料理本、児童書数千冊がわずか1ドルから販売されます。[2]。イベントの収益はすべて図書館蔵書用の新しい電子オーディオブック購入に充てられます。来場者の皆様にはマイバッグのご持参をお勧めします。',
    vocab: [['proceeds', '収益金'], ['gently used', '状態のよい中古の'], ['collection', '蔵書']],
    qs: [
      { skill: '語彙と文脈', diff: 'easy', stem: 'Select the best word for blank [1].', stemJa: '空所 [1] に最も適切な語を選んでください。', choices: ['offered', 'ordered', 'opened', 'observed'], ans: 0, notes: ['be offered at prices starting at ...（〜からの価格で提供・販売される）が適切です。', 'ordered は「注文される」です。', 'opened は「開かれる」です。', 'observed は「観察される」です。'] },
      { skill: '文挿入', diff: 'medium', stem: 'Select the best sentence for blank [2].', stemJa: '空所 [2] に最も適切な文を選んでください。', choices: ['During the final hour, shoppers can fill an entire bag for five dollars.', 'Library cards must be renewed every two years.', 'The roof repair was completed in March.', 'Quiet study rooms are located upstairs.'], ans: 0, notes: ['前文の古本市の価格案内に続けて、最終時間の詰め放題セールを補足する文が自然です。', '図書館カードの更新は無関係です。', '屋根修理は無関係です。', '自習室の場所はこの文脈と無関係です。'] },
      { skill: '語彙と文脈', diff: 'medium', stem: 'Select the best word for blank [3].', stemJa: '空所 [3] に最も適切な語を選んでください。', choices: ['fund', 'fold', 'fail', 'fade'], ans: 0, notes: ['fund the purchase（購入資金を賄う）が収益金の使い道として最適です。', 'fold は「折りたたむ」です。', 'fail は「失敗する」です。', 'fade は「薄れる」です。'] },
      { skill: '代名詞', diff: 'easy', stem: 'Select the best word for blank [4].', stemJa: '空所 [4] に最も適切な語を選んでください。', choices: ['they', 'them', 'their', 'theirs'], ans: 2, notes: ['they は主格です。own reusable shopping bags の前には所有格が必要です。', 'them は目的格です。', 'their own で「彼ら自身の」となります。', 'theirs は所有代名詞で名詞の前に置けません。'] }
    ]
  },
  {
    id: 'p6-s08', title: 'Email: Software Subscription Renewal',
    text: 'Hello Team,\n\nOur annual subscription to CloudTrack Project Manager is scheduled to renew [1] on November 1. Before we commit to another year, I would like to know whether your department still finds the tool [2]. [3]. If fewer than ten staff members use it regularly, we may switch to a smaller plan to reduce overhead costs. Please share your feedback with me no [4] than Friday at 3:00 P.M.',
    textJa: 'チームの皆さん\nCloudTrackプロジェクト管理ツールの年間契約は11月1日に自動更新される予定です。来年度も継続する前に、各部署でこのツールが依然として有用か確認したいです。[3]。定期的に使う社員が10名未満であれば、間接費削減のため小規模プランへ切り替えるかもしれません。金曜午後3時までにフィードバックをお知らせください。',
    vocab: [['subscription', '定期契約'], ['overhead costs', '間接費・諸経費'], ['commit to', '〜を確約する']],
    qs: [
      { skill: '品詞', diff: 'easy', stem: 'Select the best word for blank [1].', stemJa: '空所 [1] に最も適切な語を選んでください。', choices: ['automatic', 'automatically', 'automate', 'automation'], ans: 1, notes: ['automatic は形容詞です。動詞 renew を修飾する副詞が必要です。', 'automatically（自動的に）が renew を修飾します。', 'automate は動詞です。', 'automation は名詞です。'] },
      { skill: '品詞', diff: 'easy', stem: 'Select the best word for blank [2].', stemJa: '空所 [2] に最も適切な語を選んでください。', choices: ['use', 'useful', 'usefully', 'usefulness'], ans: 1, notes: ['find + O + C の補語として形容詞が必要です。', 'useful（有用な）が適切です。', 'usefully は副詞です。', 'usefulness は名詞です。'] },
      { skill: '文挿入', diff: 'medium', stem: 'Select the best sentence for blank [3].', stemJa: '空所 [3] に最も適切な文を選んでください。', choices: ['We currently pay for twenty-five active user licenses.', 'The air conditioning was repaired yesterday.', 'Please welcome our new receptionist.', 'Parking permits expire at the end of the month.'], ans: 0, notes: ['直後の「10名未満なら小規模プランへ」につながる前提として「現在25ライセンス分を支払っている」が最適です。', '空調修理は無関係です。', '受付係の紹介は無関係です。', '駐車許可証は無関係です。'] },
      { skill: '語彙と文脈', diff: 'easy', stem: 'Select the best word for blank [4].', stemJa: '空所 [4] に最も適切な語を選んでください。', choices: ['later', 'lately', 'latest', 'late'], ans: 0, notes: ['no later than 〜 で「遅くとも〜までに」という定型表現です。', 'lately は「最近」です。', 'latest は最上級で than と結びつきません。', 'late は原級で than と結びつきません。'] }
    ]
  },
  {
    id: 'p6-s09', title: 'Notice: Cafeteria Menu Survey',
    text: 'We want to hear from you! Our kitchen staff is planning the winter menu for the headquarters cafeteria and is looking for [1] ideas. [2]. Whether you would like more hot soup options, vegetarian entrées, or quick grab-and-go salads, your input will help us serve you better. Simply scan the QR code on any dining table to complete the two-minute survey. Everyone who [3] by December 12 will be entered into a drawing for a free lunch [4].',
    textJa: '皆様の声をお聞かせください！厨房スタッフは本社カフェテリアの冬メニューを計画しており、新鮮なアイデアを募集しています。[2]。温かいスープの充実、ベジタリアン向け主菜、手軽なサラダなど、皆様のご意見がより良いサービスにつながります。テーブルのQRコードから2分のアンケートにご回答ください。12月12日までに参加された方全員を対象に、無料ランチ券の抽選を行います。',
    vocab: [['entrée', '主菜'], ['grab-and-go', '手軽に持ち帰れる'], ['drawing', '抽選']],
    qs: [
      { skill: '語彙と文脈', diff: 'easy', stem: 'Select the best word for blank [1].', stemJa: '空所 [1] に最も適切な語を選んでください。', choices: ['fresh', 'fragile', 'formal', 'frequent'], ans: 0, notes: ['fresh ideas（新しい・新鮮なアイデア）がメニュー企画の文脈に合います。', 'fragile は「壊れやすい」です。', 'formal は「公式の」です。', 'frequent は「頻繁な」です。'] },
      { skill: '文挿入', diff: 'medium', stem: 'Select the best sentence for blank [2].', stemJa: '空所 [2] に最も適切な文を選んでください。', choices: ['Last season’s survey led us to add freshly baked bread every day.', 'The gym lockers will be painted next week.', 'All expense reports require a receipt.', 'The conference room seats twelve people.'], ans: 0, notes: ['前回のアンケートが実際のメニュー改善につながった事例を示すことで、今回の回答を促す流れが自然です。', 'ジムのロッカーは無関係です。', '経費報告書は無関係です。', '会議室の席数は無関係です。'] },
      { skill: '動詞の形', diff: 'easy', stem: 'Select the best word for blank [3].', stemJa: '空所 [3] に最も適切な語を選んでください。', choices: ['participate', 'participates', 'participating', 'participation'], ans: 1, notes: ['Everyone は単数扱いのため原形は不可です。', 'Everyone who participates（参加するすべての人）で三人称単数現在 s が必要です。', 'participating は述語動詞になりません。', 'participation は名詞です。'] },
      { skill: '語彙と文脈', diff: 'easy', stem: 'Select the best word for blank [4].', stemJa: '空所 [4] に最も適切な語を選んでください。', choices: ['voucher', 'vehicle', 'volume', 'venture'], ans: 0, notes: ['free lunch voucher（無料ランチ引換券）が適切です。', 'vehicle は「車両」です。', 'volume は「音量・量」です。', 'venture は「事業」です。'] }
    ]
  },
  {
    id: 'p6-s10', title: 'Email: Client Workshop Follow-up',
    text: 'Dear Ms. Morales,\n\nThank you for attending our Supply Chain Optimization Workshop yesterday. It was a pleasure [1] your team’s current inventory challenges and exploring practical solutions together. [2]. As promised, I have attached the slide deck along with a checklist you can use during your next warehouse review. Please let me know if you would like to [3] a brief follow-up call next week to discuss the next [4].',
    textJa: 'モラレス様\n昨日はサプライチェーン最適化ワークショップにご参加いただきありがとうございました。貴社チームの現在の在庫課題について議論し、実践的な解決策を一緒に検討できたことを嬉しく思います。[2]。お約束通り、スライド資料と次回の倉庫点検で使えるチェックリストを添付しました。次のステップについて話し合うため、来週短いフォローアップ通話の日程調整をご希望でしたらお知らせください。',
    vocab: [['optimization', '最適化'], ['inventory', '在庫'], ['slide deck', 'スライド資料']],
    qs: [
      { skill: '動詞の形', diff: 'medium', stem: 'Select the best word for blank [1].', stemJa: '空所 [1] に最も適切な語を選んでください。', choices: ['discuss', 'discussing', 'discussed', 'discussion'], ans: 1, notes: ['後ろの and exploring と並列になる動名詞が必要です。', 'discussing ... and exploring ... で並列構造が成立します。', 'discussed は過去分詞です。', 'discussion は名詞で目的語 your team’s ... を直接取れません。'] },
      { skill: '文挿入', diff: 'medium', stem: 'Select the best sentence for blank [2].', stemJa: '空所 [2] に最も適切な文を選んでください。', choices: ['Your questions during the Q&A session sparked a very productive discussion.', 'The cafeteria closes at 2:30 P.M. on Fridays.', 'We need to order more printer toner.', 'Our annual holiday party is in December.'], ans: 0, notes: ['ワークショップ参加への謝辞に続けて、Q&Aでの質問が有意義な議論を生んだと述べる文が自然です。', 'カフェテリアは無関係です。', 'トナー注文は無関係です。', 'ホリデーパーティーは無関係です。'] },
      { skill: '語彙と文脈', diff: 'easy', stem: 'Select the best word for blank [3].', stemJa: '空所 [3] に最も適切な語を選んでください。', choices: ['schedule', 'separate', 'settle', 'supply'], ans: 0, notes: ['schedule a follow-up call（フォローアップ通話の日程を組む）が適切です。', 'separate は「分ける」です。', 'settle は「解決する」です。', 'supply は「供給する」です。'] },
      { skill: '語彙と文脈', diff: 'easy', stem: 'Select the best word for blank [4].', stemJa: '空所 [4] に最も適切な語を選んでください。', choices: ['steps', 'stamps', 'stairs', 'stores'], ans: 0, notes: ['discuss the next steps（次のステップを話し合う）がビジネス英語の定番表現です。', 'stamps は「切手・スタンプ」です。', 'stairs は「階段」です。', 'stores は「店舗」です。'] }
    ]
  }
];

const letters = ['A', 'B', 'C', 'D'];
let qNum = 1;

// Build Part 5 sets (6 sets x 10 questions = 60 questions)
const p5Sets = [];
for (let s = 0; s < 6; s++) {
  const slice = p5Templates.slice(s * 10, (s + 1) * 10);
  const setId = `p5-s${String(s + 1).padStart(2, '0')}`;
  const items = slice.map((q) => {
    const num = qNum++;
    const itemId = `p56-q${String(num).padStart(3, '0')}`;
    const choices = q.choices.map((text, idx) => ({ id: letters[idx], text }));
    const answerId = letters[q.ans];
    const choiceExplanationsJa = {};
    letters.forEach((L, idx) => { choiceExplanationsJa[L] = q.notes[idx]; });
    return {
      id: itemId,
      number: num,
      stem: q.stem,
      choices,
      answerId,
      skill: q.skill,
      difficulty: q.diff,
      evidence: [{ refId: itemId, noteJa: q.notes[q.ans] }],
      explanationJa: q.notes[q.ans],
      translationJa: { stem: q.stemJa },
      choiceExplanationsJa,
      vocabulary: q.vocab.map(([term, meaningJa]) => ({ term, meaningJa }))
    };
  });
  p5Sets.push({
    setId,
    part: 5,
    titleJa: `Part 5 セット ${s + 1}（Q${items[0].number}–Q${items[items.length - 1].number}）`,
    passages: [],
    media: [],
    items
  });
}

// Build Part 6 sets (10 sets x 4 questions = 40 questions)
const p6Sets = p6Passages.map((p, idx) => {
  const passageId = `${p.id}-d1`;
  const items = p.qs.map((q) => {
    const num = qNum++;
    const itemId = `p56-q${String(num).padStart(3, '0')}`;
    const choices = q.choices.map((text, cIdx) => ({ id: letters[cIdx], text }));
    const answerId = letters[q.ans];
    const choiceExplanationsJa = {};
    letters.forEach((L, cIdx) => { choiceExplanationsJa[L] = q.notes[cIdx]; });
    return {
      id: itemId,
      number: num,
      stem: q.stem,
      choices,
      answerId,
      skill: q.skill,
      difficulty: q.diff,
      evidence: [{ refId: passageId, noteJa: q.notes[q.ans] }],
      explanationJa: q.notes[q.ans],
      translationJa: { stem: q.stemJa },
      choiceExplanationsJa,
      vocabulary: p.vocab.map(([term, meaningJa]) => ({ term, meaningJa }))
    };
  });
  return {
    setId: p.id,
    part: 6,
    titleJa: `Part 6 文書 ${idx + 1}（Q${items[0].number}–Q${items[items.length - 1].number}）`,
    passages: [{ id: passageId, type: 'document', title: p.title, text: p.text, translationJa: p.textJa }],
    media: [],
    items
  };
});

const exam = {
  examId: 'reading-part56-01',
  revision: 1,
  titleJa: 'Part 5・6 集中演習 100問',
  parts: [
    { part: 5, titleJa: '短文穴埋め問題（60問）', sets: p5Sets },
    { part: 6, titleJa: '長文穴埋め問題（40問）', sets: p6Sets }
  ]
};

fs.writeFileSync(contentExamPath, JSON.stringify(exam, null, 2), 'utf8');
fs.writeFileSync(distExamPath, JSON.stringify(exam, null, 2), 'utf8');

console.log(`Generated Part 5 (${p5Sets.length} sets, 60q) + Part 6 (${p6Sets.length} sets, 40q) = ${qNum - 1} questions.`);
