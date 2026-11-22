import fs from 'node:fs';
import path from 'node:path';

const contentExamPath = path.resolve('content/reading-part56-01/exam.json');
const distExamPath = path.resolve('dist/reading-part56/r1/exam.json');

const exam = JSON.parse(fs.readFileSync(contentExamPath, 'utf8'));

// Ensure idempotency if re-run
const existingP5 = exam.parts[0].sets.slice(0, 6);
const existingP6 = exam.parts[1].sets.slice(0, 10);

const extraP5 = [
  // 品詞 (15)
  { skill: '品詞', diff: 'easy', stem: 'The board praised the team for its _____ handling of the product recall.', stemJa: '取締役会は製品リコールへの効率的な対応を称賛しました。', choices: ['efficiency', 'efficient', 'efficiently', 'efficiencies'], ans: 1, notes: ['efficiency は名詞です。handling を修飾する形容詞が必要です。', 'efficient は「効率的な」という形容詞で handling を修飾します。', 'efficiently は副詞です。', 'efficiencies は複数名詞です。'], vocab: [['product recall', '製品リコール'], ['efficient', '効率的な']] },
  { skill: '品詞', diff: 'easy', stem: 'All visitors must sign in _____ upon arriving at the main reception desk.', stemJa: 'すべての来訪者はメイン受付に到着したら速やかに記帳しなければなりません。', choices: ['immediate', 'immediately', 'immediacy', 'intermediates'], ans: 1, notes: ['immediate は形容詞です。動詞句 sign in を修飾する副詞が必要です。', 'immediately は「直ちに」という副詞です。', 'immediacy は名詞です。', 'intermediates は名詞です。'], vocab: [['sign in', '記帳する'], ['immediately', '直ちに']] },
  { skill: '品詞', diff: 'medium', stem: 'The _____ of the new commuter rail line will begin in early October.', stemJa: '新しい通勤鉄道路線の建設は10月上旬に開始されます。', choices: ['construct', 'constructed', 'construction', 'constructive'], ans: 2, notes: ['construct は動詞です。The ... of の間には名詞が必要です。', 'constructed は過去分詞です。', 'construction は「建設」という名詞で適切です。', 'constructive は「建設的な」という形容詞です。'], vocab: [['construction', '建設'], ['rail line', '鉄道路線']] },
  { skill: '品詞', diff: 'easy', stem: 'Our technical support staff is always _____ to assist customers by phone.', stemJa: '当社の技術サポートスタッフは電話で顧客を支援する準備が常にできています。', choices: ['readiness', 'ready', 'readily', 'readied'], ans: 1, notes: ['readiness は名詞です。be + 形容詞 + to do の形が必要です。', 'ready は「準備ができた」という形容詞です。', 'readily は副詞です。', 'readied は動詞の過去分詞です。'], vocab: [['assist', '支援する'], ['ready to', '〜する準備ができている']] },
  { skill: '品詞', diff: 'medium', stem: 'The quarterly newsletter provides a _____ overview of upcoming regional events.', stemJa: '季刊ニュースレターは今後の地域イベントの包括的な概要を提供します。', choices: ['comprehend', 'comprehension', 'comprehensive', 'comprehensively'], ans: 2, notes: ['comprehend は動詞です。名詞 overview を修飾する形容詞が必要です。', 'comprehension は名詞です。', 'comprehensive は「包括的な」という形容詞です。', 'comprehensively は副詞です。'], vocab: [['comprehensive', '包括的な'], ['overview', '概要']] },
  { skill: '品詞', diff: 'medium', stem: 'The laboratory requires strict _____ to all chemical handling guidelines.', stemJa: 'その実験室ではすべての薬品取扱指針の厳格な遵守が求められます。', choices: ['adhere', 'adherent', 'adherence', 'adhering'], ans: 2, notes: ['adhere は動詞です。形容詞 strict の後ろに名詞が必要です。', 'adherent は「支持者」という名詞・形容詞です。', 'adherence to 〜 で「〜の遵守」となります。', 'adhering は動名詞ですが strict の後ろは名詞 adherence が自然です。'], vocab: [['adherence', '遵守'], ['strict', '厳格な']] },
  { skill: '品詞', diff: 'easy', stem: 'The hotel’s rooftop garden is _____ popular during the summer months.', stemJa: 'そのホテルの屋上庭園は夏季に特に人気があります。', choices: ['particular', 'particularly', 'particulars', 'particularity'], ans: 1, notes: ['particular は形容詞です。形容詞 popular を修飾する副詞が必要です。', 'particularly は「特に」という副詞です。', 'particulars は「詳細」という名詞です。', 'particularity は名詞です。'], vocab: [['particularly', '特に'], ['rooftop garden', '屋上庭園']] },
  { skill: '品詞', diff: 'medium', stem: 'We are looking for a _____ candidate who can lead the expansion into Europe.', stemJa: '欧州進出を主導できる信頼性の高い候補者を探しています。', choices: ['rely', 'reliable', 'reliably', 'reliability'], ans: 1, notes: ['rely は動詞です。名詞 candidate を修飾する形容詞が必要です。', 'reliable は「信頼できる」という形容詞です。', 'reliably は副詞です。', 'reliability は名詞です。'], vocab: [['reliable', '信頼できる'], ['expansion', '拡大・進出']] },
  { skill: '品詞', diff: 'hard', stem: 'The speaker explained the complex tax regulations with remarkable _____.', stemJa: '講演者は複雑な税制を驚くほど明快に説明しました。', choices: ['clear', 'clearly', 'clarity', 'clarify'], ans: 2, notes: ['clear は形容詞です。前置詞 with + 形容詞 remarkable の後ろに名詞が必要です。', 'clearly は副詞です。', 'clarity は「明快さ」という名詞で with remarkable clarity が自然な表現です。', 'clarify は動詞です。'], vocab: [['remarkable', '驚くべき'], ['clarity', '明快さ']] },
  { skill: '品詞', diff: 'medium', stem: 'All conference sessions will be recorded _____ for registered members.', stemJa: 'すべての会議セッションは登録会員専用に録画されます。', choices: ['exclusive', 'exclusively', 'exclusivity', 'exclude'], ans: 1, notes: ['exclusive は形容詞です。for registered members を修飾する副詞が必要です。', 'exclusively は「専用に・限定して」という副詞です。', 'exclusivity は名詞です。', 'exclude は動詞です。'], vocab: [['exclusively', '限定して・専用に'], ['registered member', '登録会員']] },
  { skill: '品詞', diff: 'easy', stem: 'The _____ of the charity concert exceeded the organizers’ expectations.', stemJa: 'チャリティコンサートの成功は主催者の予想を上回りました。', choices: ['succeed', 'successful', 'success', 'successfully'], ans: 2, notes: ['succeed は動詞です。主語となる名詞が必要です。', 'successful は形容詞です。', 'success は「成功」という名詞です。', 'successfully は副詞です。'], vocab: [['exceed', '〜を上回る'], ['expectation', '予想・期待']] },
  { skill: '品詞', diff: 'medium', stem: 'The courier company offers _____ tracking updates via text message.', stemJa: 'その宅配業者はテキストメッセージで継続的な追跡更新を提供しています。', choices: ['continue', 'continuous', 'continuously', 'continuation'], ans: 1, notes: ['continue は動詞です。tracking updates を修飾する形容詞が必要です。', 'continuous は「継続的な」という形容詞です。', 'continuously は副詞です。', 'continuation は名詞です。'], vocab: [['continuous', '継続的な'], ['courier', '宅配業者']] },
  { skill: '品詞', diff: 'hard', stem: 'The finance committee is reviewing the _____ of opening a third warehouse.', stemJa: '財務委員会は第3倉庫を開設する実現可能性を検討しています。', choices: ['feasible', 'feasibly', 'feasibility', 'infeasible'], ans: 2, notes: ['feasible は形容詞です。the ... of の間には名詞が必要です。', 'feasibly は副詞です。', 'feasibility は「実現可能性」という名詞です。', 'infeasible は形容詞です。'], vocab: [['feasibility', '実現可能性'], ['finance committee', '財務委員会']] },
  { skill: '品詞', diff: 'easy', stem: 'Please handle the glass display cases _____ when moving them to Hall B.', stemJa: 'ガラス製の展示ケースをホールBへ運ぶ際は慎重に扱ってください。', choices: ['careful', 'carefully', 'carefulness', 'care'], ans: 1, notes: ['careful は形容詞です。動詞 handle を修飾する副詞が必要です。', 'carefully は「慎重に」という副詞です。', 'carefulness は名詞です。', 'care は名詞・動詞です。'], vocab: [['display case', '展示ケース'], ['handle', '扱う']] },
  { skill: '品詞', diff: 'medium', stem: 'The city museum announced an _____ to its permanent photography wing.', stemJa: '市立美術館は常設写真展示棟の増築を発表しました。', choices: ['extend', 'extensive', 'extension', 'extensively'], ans: 2, notes: ['extend は動詞です。冠詞 an の後ろには名詞が必要です。', 'extensive は形容詞です。', 'extension は「増築・拡張」という名詞です。', 'extensively は副詞です。'], vocab: [['extension', '増築・拡張'], ['permanent', '常設の']] },

  // 動詞の形 (15)
  { skill: '動詞の形', diff: 'easy', stem: 'The HR department _____ over sixty applications for the analyst role last week.', stemJa: '人事部は先週、アナリスト職に60件以上の応募を受け取りました。', choices: ['receive', 'receives', 'received', 'receiving'], ans: 2, notes: ['receive は原形です。last week があるため過去形が必要です。', 'receives は現在形です。', 'received は過去形で last week と一致します。', 'receiving は述語動詞になりません。'], vocab: [['application', '応募書類'], ['analyst', 'アナリスト']] },
  { skill: '動詞の形', diff: 'medium', stem: 'The quarterly budget report _____ by the CFO before tomorrow’s board meeting.', stemJa: '四半期予算報告書は明日の取締役会までにCFOによって確認される予定です。', choices: ['will review', 'will be reviewed', 'reviewing', 'has reviewed'], ans: 1, notes: ['will review は能動態で報告書が主語になりません。', 'will be reviewed は未来の受動態で適切です。', 'reviewing は述語になりません。', 'has reviewed は能動態です。'], vocab: [['board meeting', '取締役会'], ['budget report', '予算報告書']] },
  { skill: '動詞の形', diff: 'easy', stem: 'Ms. Morales enjoys _____ with international clients on branding projects.', stemJa: 'モラレス氏はブランディング案件で海外顧客と協働することを楽しんでいます。', choices: ['collaborate', 'to collaborate', 'collaborating', 'collaborated'], ans: 2, notes: ['collaborate は原形で enjoy の後ろに置けません。', 'enjoy は to 不定詞ではなく動名詞を取ります。', 'collaborating は動名詞で enjoy + -ing に一致します。', 'collaborated は過去分詞です。'], vocab: [['collaborate', '協働する'], ['branding', 'ブランディング']] },
  { skill: '動詞の形', diff: 'medium', stem: 'The research team _____ on this battery prototype for nearly three years.', stemJa: '研究チームはこのバッテリー試作品に約3年間取り組んでいます。', choices: ['works', 'worked', 'has been working', 'will work'], ans: 2, notes: ['works は現在形で for nearly three years の継続を表せません。', 'worked は過去の事実のみです。', 'has been working は現在完了進行形で現在までの継続動作を表します。', 'will work は未来形です。'], vocab: [['nearly', '約・ほとんど'], ['prototype', '試作品']] },
  { skill: '動詞の形', diff: 'medium', stem: 'Anyone _____ to join the weekend volunteer cleanup should sign up by Friday.', stemJa: '週末のボランティア清掃に参加を希望する人は金曜日までに申し込んでください。', choices: ['wish', 'wishing', 'wished', 'wishes'], ans: 1, notes: ['wish は原形で後置修飾になりません。', 'wishing は現在分詞で「希望する人」と Anyone を修飾します。', 'wished は受動の意味になり不自然です。', 'wishes は述語動詞が重複します。'], vocab: [['sign up', '申し込む'], ['cleanup', '清掃活動']] },
  { skill: '動詞の形', diff: 'easy', stem: 'The training coordinator asked all attendees _____ their laptops fully charged.', stemJa: '研修担当者は全参加者にノートPCを満充電にして持参するよう求めました。', choices: ['bring', 'to bring', 'bringing', 'brought'], ans: 1, notes: ['ask + O + to do の構文なので原形は不可です。', 'to bring が ask all attendees to bring の正しい形です。', 'bringing は不可です。', 'brought は不可です。'], vocab: [['fully charged', '満充電の'], ['coordinator', '担当者']] },
  { skill: '動詞の形', diff: 'hard', stem: 'Not only the main auditorium but also the seminar rooms _____ equipped with microphones.', stemJa: 'メイン講堂だけでなくセミナー室にもマイクが備え付けられています。', choices: ['is', 'are', 'was', 'has been'], ans: 1, notes: ['Not only A but also B は B（seminar rooms：複数）に動詞を一致させます。', '複数現在 are が正解です。', 'was は単数過去です。', 'has been は単数です。'], vocab: [['be equipped with', '〜を備えている'], ['auditorium', '講堂']] },
  { skill: '動詞の形', diff: 'medium', stem: 'Please ensure that all confidential files _____ securely before leaving the office.', stemJa: '退社前にすべての機密ファイルが安全に保管されていることを確認してください。', choices: ['store', 'are stored', 'storing', 'have stored'], ans: 1, notes: ['store は能動態でファイルが主語になりません。', 'are stored（保管されている）で受動態が成立します。', 'storing は述語になりません。', 'have stored は能動態です。'], vocab: [['confidential', '機密の'], ['ensure', '確実にする']] },
  { skill: '動詞の形', diff: 'easy', stem: 'When the shipment _____ at the warehouse, notify the inventory clerk immediately.', stemJa: '貨物が倉庫に到着したら、直ちに在庫担当者に知らせてください。', choices: ['arrive', 'arrives', 'will arrive', 'arrived'], ans: 1, notes: ['主語 the shipment は単数なので arrive は不可です。', '時を表す when 節では未来のことも現在形（arrives）で表します。', 'when 節では通常 will を使いません。', 'arrived は過去形で命令文と合いません。'], vocab: [['inventory clerk', '在庫担当者'], ['notify', '通知する']] },
  { skill: '動詞の形', diff: 'medium', stem: 'The software engineers are currently _____ a patch to fix the login issue.', stemJa: 'ソフトウェア技術者たちは現在ログイン不具合を修正するパッチを開発しています。', choices: ['develop', 'developed', 'developing', 'develops'], ans: 2, notes: ['develop は be 動詞の後ろに原形で置けません。', 'developed は受動になり目的語 a patch と合いません。', 'are currently developing で現在進行形になります。', 'develops は不可です。'], vocab: [['patch', '修正プログラム'], ['login issue', 'ログイン不具合']] },
  { skill: '動詞の形', diff: 'hard', stem: 'Were the company _____ a second shift, production output would increase by 40 percent.', stemJa: 'もし会社が第2シフトを導入すれば、生産量は40%増加するだろう。', choices: ['add', 'to add', 'adding', 'added'], ans: 1, notes: ['Were + S + to do（仮定法未来の倒置）の形が必要です。', 'to add が正解です。', 'adding は不可です。', 'added は受動になってしまいます。'], vocab: [['second shift', '第2シフト'], ['output', '生産量']] },
  { skill: '動詞の形', diff: 'medium', stem: 'The newly printed brochures _____ to all branch offices earlier this morning.', stemJa: '新しく印刷されたパンフレットは今朝早く全支店へ発送されました。', choices: ['shipped', 'were shipped', 'are shipping', 'will ship'], ans: 1, notes: ['shipped 単独では能動になり不自然です。', 'were shipped（発送された）で過去受動態になります。', 'are shipping は現在進行形です。', 'will ship は未来形です。'], vocab: [['branch office', '支店'], ['earlier this morning', '今朝早く']] },
  { skill: '動詞の形', diff: 'easy', stem: 'We plan _____ our new customer loyalty app in the first quarter.', stemJa: '第1四半期に新しい顧客ポイントアプリをリリースする予定です。', choices: ['release', 'to release', 'releasing', 'released'], ans: 1, notes: ['plan は to 不定詞を目的語に取ります。', 'plan to release で「リリースする予定だ」となります。', 'releasing は不可です。', 'released は不可です。'], vocab: [['first quarter', '第1四半期'], ['loyalty app', 'ポイントアプリ']] },
  { skill: '動詞の形', diff: 'medium', stem: 'After _____ the client’s feedback, the design team revised the homepage layout.', stemJa: '顧客のフィードバックを確認した後、デザインチームはホームページの配置を修正しました。', choices: ['review', 'reviewing', 'reviewed', 'reviews'], ans: 1, notes: ['前置詞 After の後ろには動名詞が必要です。', 'After reviewing で「確認した後」となります。', 'reviewed は目的語 the client’s feedback を取れません。', 'reviews は不可です。'], vocab: [['revise', '修正する'], ['layout', '配置・レイアウト']] },
  { skill: '動詞の形', diff: 'easy', stem: 'The committee has _____ to extend the grant application deadline by one week.', stemJa: '委員会は助成金申請の締め切りを1週間延長することに同意しました。', choices: ['agree', 'agreed', 'agreeing', 'agrees'], ans: 1, notes: ['has の後ろには過去分詞が必要です。', 'has agreed（同意した）が現在完了形として正解です。', 'agreeing は不可です。', 'agrees は不可です。'], vocab: [['grant', '助成金'], ['extend', '延長する']] },

  // 接続詞と前置詞 (15)
  { skill: '接続詞と前置詞', diff: 'easy', stem: '_____ the museum is closed on Mondays, the outdoor sculpture garden remains open.', stemJa: '美術館は月曜休館ですが、屋外彫刻庭園は開いています。', choices: ['Although', 'Despite', 'Because of', 'During'], ans: 0, notes: ['後ろに節（the museum is closed）が続くため逆接の接続詞 Although が正解です。', 'Despite は前置詞で節を取れません。', 'Because of は前置詞句です。', 'During は前置詞です。'], vocab: [['sculpture garden', '彫刻庭園'], ['remain open', '開いたままである']] },
  { skill: '接続詞と前置詞', diff: 'easy', stem: 'The shuttle bus departs every twenty minutes _____ 7:00 A.M. and 9:00 P.M.', stemJa: 'シャトルバスは午前7時から午後9時まで20分おきに出発します。', choices: ['between', 'among', 'until', 'during'], ans: 0, notes: ['between A and B で「AからBの間」を表します。', 'among は3つ以上に使います。', 'until は and と組になりません。', 'during は and と組になりません。'], vocab: [['depart', '出発する'], ['between A and B', 'AとBの間']] },
  { skill: '接続詞と前置詞', diff: 'medium', stem: '_____ an emergency, use the stairwell located at the end of the corridor.', stemJa: '緊急時には廊下の突き当たりにある階段を使用してください。', choices: ['In case of', 'In case', 'Unless', 'While'], ans: 0, notes: ['後ろが名詞句 an emergency のため前置詞句 In case of が正解です。', 'In case は接続詞で節を取ります。', 'Unless は接続詞です。', 'While は接続詞です。'], vocab: [['stairwell', '階段室'], ['corridor', '廊下']] },
  { skill: '接続詞と前置詞', diff: 'medium', stem: 'Sales in the western region grew rapidly _____ the launch of the mobile app.', stemJa: 'モバイルアプリの公開に続いて、西部地域の売上は急速に伸びました。', choices: ['following', 'whereas', 'unless', 'although'], ans: 0, notes: ['following は「〜に続いて・〜の後で」という前置詞で名詞句 the launch を取ります。', 'whereas は接続詞です。', 'unless は接続詞です。', 'although は接続詞です。'], vocab: [['following', '〜に続いて'], ['rapidly', '急速に']] },
  { skill: '接続詞と前置詞', diff: 'easy', stem: 'Please turn off your mobile phone _____ the performance begins.', stemJa: '公演が始まる前に携帯電話の電源を切ってください。', choices: ['before', 'during', 'without', 'among'], ans: 0, notes: ['before は接続詞として節 the performance begins を導きます。', 'during は前置詞です。', 'without は前置詞です。', 'among は前置詞です。'], vocab: [['performance', '公演'], ['turn off', '電源を切る']] },
  { skill: '接続詞と前置詞', diff: 'medium', stem: 'The warehouse stayed open late _____ the couriers could finish loading the trucks.', stemJa: '宅配業者がトラックへの積み込みを終えられるよう、倉庫は遅くまで開いていました。', choices: ['so that', 'in order to', 'due to', 'despite'], ans: 0, notes: ['後ろに節（the couriers could finish）があるため目的の接続詞 so that が正解です。', 'in order to は後ろに動詞の原形を取ります。', 'due to は前置詞句です。', 'despite は前置詞です。'], vocab: [['so that', '〜できるように'], ['load', '積み込む']] },
  { skill: '接続詞と前置詞', diff: 'hard', stem: '_____ the revised safety manual, all lab staff must wear protective eyewear.', stemJa: '改訂された安全マニュアルによれば、すべての実験室スタッフは保護眼鏡を着用しなければなりません。', choices: ['According to', 'Because', 'Even if', 'Provided that'], ans: 0, notes: ['According to 〜 で「〜によれば」という前置詞句になります。', 'Because は接続詞です。', 'Even if は接続詞です。', 'Provided that は接続詞です。'], vocab: [['according to', '〜によれば'], ['eyewear', '保護眼鏡']] },
  { skill: '接続詞と前置詞', diff: 'medium', stem: 'The internship is unpaid; _____, participants receive a monthly transit pass.', stemJa: 'そのインターンシップは無給ですが、参加者は月間定期券を受け取ります。', choices: ['however', 'although', 'despite', 'because'], ans: 0, notes: ['セミコロンとコンマの間に入る逆接の接続副詞 however が正解です。', 'although は接続詞でセミコロンの後ろに単独で置けません。', 'despite は前置詞です。', 'because は接続詞です。'], vocab: [['transit pass', '定期券'], ['however', 'しかしながら']] },
  { skill: '接続詞と前置詞', diff: 'easy', stem: 'The conference room is reserved _____ 2:00 P.M. to 4:00 P.M. today.', stemJa: '会議室は今日、午後2時から午後4時まで予約されています。', choices: ['from', 'since', 'by', 'at'], ans: 0, notes: ['from A to B で「AからBまで」を表します。', 'since は to と組になりません。', 'by は期限です。', 'at は時刻の1点です。'], vocab: [['reserve', '予約する'], ['from A to B', 'AからBまで']] },
  { skill: '接続詞と前置詞', diff: 'medium', stem: '_____ Mr. Grant nor Ms. Sato was available for the afternoon interview.', stemJa: 'グラント氏も佐藤氏も午後の面接には都合がつきませんでした。', choices: ['Neither', 'Either', 'Both', 'Not only'], ans: 0, notes: ['後ろの nor と呼応する Neither（Neither A nor B）が正解です。', 'Either は or と組になります。', 'Both は and と組になります。', 'Not only は but also と組になります。'], vocab: [['neither A nor B', 'AもBも〜ない'], ['available', '都合がつく']] },
  { skill: '接続詞と前置詞', diff: 'hard', stem: 'You may borrow the projector _____ you return it to the media desk by 5:00 P.M.', stemJa: '午後5時までにメディアデスクへ返却することを条件に、プロジェクターを借りられます。', choices: ['provided that', 'in spite of', 'prior to', 'instead of'], ans: 0, notes: ['provided that は「〜という条件で」を表す接続詞で節を取ります。', 'in spite of は前置詞句です。', 'prior to は前置詞句です。', 'instead of は前置詞句です。'], vocab: [['provided that', '〜という条件で'], ['media desk', 'メディア管理デスク']] },
  { skill: '接続詞と前置詞', diff: 'easy', stem: 'The guest speaker arrived _____ the airport twenty minutes ahead of schedule.', stemJa: '招待講演者は予定より20分早く空港に到着しました。', choices: ['at', 'to', 'on', 'with'], ans: 0, notes: ['arrive at + 場所（空港・駅など）が正しい語法です。', 'arrive to は使いません。', 'on は不可です。', 'with は不可です。'], vocab: [['arrive at', '〜に到着する'], ['guest speaker', '招待講演者']] },
  { skill: '接続詞と前置詞', diff: 'medium', stem: '_____ submitting the invoice, double-check the purchase order number.', stemJa: '請求書を提出する前に、発注番号を二重確認してください。', choices: ['Prior to', 'Because', 'Unless', 'Although'], ans: 0, notes: ['Prior to + -ing（〜する前に）が前置詞句として適切です。', 'Because は接続詞です。', 'Unless は接続詞です。', 'Although は接続詞です。'], vocab: [['prior to', '〜の前に'], ['purchase order', '発注書']] },
  { skill: '接続詞と前置詞', diff: 'easy', stem: 'The bookstore is located right _____ the street from the central post office.', stemJa: 'その書店は中央郵便局から通りを挟んで向かい側にあります。', choices: ['across', 'among', 'during', 'until'], ans: 0, notes: ['across the street from 〜 で「〜の通り向かいに」となります。', 'among は「〜の間で」です。', 'during は期間です。', 'until は期限です。'], vocab: [['across the street', '通りの向かいに'], ['post office', '郵便局']] },
  { skill: '接続詞と前置詞', diff: 'medium', stem: '_____ the high cost of raw materials, the company kept retail prices unchanged.', stemJa: '原材料費の高騰にもかかわらず、同社は小売価格を据え置きました。', choices: ['In spite of', 'Even though', 'Because', 'While'], ans: 0, notes: ['後ろが名詞句 the high cost ... なので前置詞句 In spite of が正解です。', 'Even though は接続詞です。', 'Because は接続詞です。', 'While は接続詞です。'], vocab: [['raw materials', '原材料'], ['retail price', '小売価格']] },

  // 語彙と文脈 (15)
  { skill: '語彙と文脈', diff: 'easy', stem: 'Please _____ your seat belt whenever the aircraft is moving on the runway.', stemJa: '航空機が滑走路上を移動している間はシートベルトを締めてください。', choices: ['fasten', 'flatten', 'foster', 'filter'], ans: 0, notes: ['fasten your seat belt で「シートベルトを締める」となります。', 'flatten は「平らにする」です。', 'foster は「育成する」です。', 'filter は「ろ過する」です。'], vocab: [['fasten', '締める'], ['aircraft', '航空機']] },
  { skill: '語彙と文脈', diff: 'medium', stem: 'The marketing manager proposed a new _____ to attract corporate sponsors.', stemJa: 'マーケティング部長は企業スポンサーを引きつける新しい戦略を提案しました。', choices: ['strategy', 'staircase', 'stationery', 'statue'], ans: 0, notes: ['strategy は「戦略」で文脈に一致します。', 'staircase は「階段」です。', 'stationery は「文房具」です。', 'statue は「彫像」です。'], vocab: [['strategy', '戦略'], ['corporate sponsor', '企業スポンサー']] },
  { skill: '語彙と文脈', diff: 'easy', stem: 'All full-time employees are _____ for paid parental leave after six months.', stemJa: '全正社員は入社6か月後に有給育児休暇の受給資格を得ます。', choices: ['eligible', 'edible', 'audible', 'legible'], ans: 0, notes: ['be eligible for 〜 で「〜の資格がある」となります。', 'edible は「食べられる」です。', 'audible は「聞こえる」です。', 'legible は「読みやすい」です。'], vocab: [['eligible', '資格がある'], ['parental leave', '育児休暇']] },
  { skill: '語彙と文脈', diff: 'medium', stem: 'The contractor gave us a written _____ before starting the roof repairs.', stemJa: '請負業者は屋根の修理を始める前に書面の見積書を提示しました。', choices: ['estimate', 'episode', 'envelope', 'element'], ans: 0, notes: ['written estimate で「書面の見積書」となります。', 'episode は「出来事・回」です。', 'envelope は「封筒」です。', 'element は「要素」です。'], vocab: [['estimate', '見積書'], ['contractor', '請負業者']] },
  { skill: '語彙と文脈', diff: 'easy', stem: 'Our downtown branch will _____ its business hours starting next Monday.', stemJa: '中心街の支店は来週月曜から営業時間を延長します。', choices: ['extend', 'exclude', 'expose', 'exhaust'], ans: 0, notes: ['extend business hours（営業時間を延長する）が適切です。', 'exclude は「除外する」です。', 'expose は「さらす」です。', 'exhaust は「使い果たす」です。'], vocab: [['business hours', '営業時間'], ['extend', '延長する']] },
  { skill: '語彙と文脈', diff: 'medium', stem: 'The hotel staff went out of their way to _____ our group’s special dietary needs.', stemJa: 'ホテルスタッフは私たちのグループの特別な食事要望に快く対応してくれました。', choices: ['accommodate', 'accumulate', 'accelerate', 'accompany'], ans: 0, notes: ['accommodate needs で「要望に応える・対応する」となります。', 'accumulate は「蓄積する」です。', 'accelerate は「加速する」です。', 'accompany は「同行する」です。'], vocab: [['accommodate', '（要望に）応える'], ['go out of one’s way', 'わざわざ尽力する']] },
  { skill: '語彙と文脈', diff: 'hard', stem: 'Because of a sudden power _____, the afternoon workshop was moved to another building.', stemJa: '突然の停電のため、午後のワークショップは別棟へ移されました。', choices: ['outage', 'outlet', 'outline', 'outlook'], ans: 0, notes: ['power outage で「停電」となります。', 'outlet は「コンセント・販売店」です。', 'outline は「概要」です。', 'outlook は「見通し」です。'], vocab: [['power outage', '停電'], ['sudden', '突然の']] },
  { skill: '語彙と文脈', diff: 'medium', stem: 'The supervisor commended the interns for their _____ attention to detail.', stemJa: '上司はインターン生たちの細部への徹底した注意を称賛しました。', choices: ['meticulous', 'miraculous', 'monetary', 'mutual'], ans: 0, notes: ['meticulous attention to detail（細部への細心の注意）が自然な表現です。', 'miraculous は「奇跡的な」です。', 'monetary は「金銭の」です。', 'mutual は「相互の」です。'], vocab: [['meticulous', '細心の・綿密な'], ['commend', '称賛する']] },
  { skill: '語彙と文脈', diff: 'easy', stem: 'Customers may _____ any unused merchandise within 30 days with a receipt.', stemJa: '顧客はレシートがあれば30日以内に未使用商品を返品できます。', choices: ['return', 'remain', 'remind', 'repeat'], ans: 0, notes: ['return merchandise で「商品を返品する」となります。', 'remain は「残る」です。', 'remind は「思い出させる」です。', 'repeat は「繰り返す」です。'], vocab: [['merchandise', '商品'], ['unused', '未使用の']] },
  { skill: '語彙と文脈', diff: 'medium', stem: 'The architect presented two _____ designs for the new community library.', stemJa: '建築家は新しい地域図書館のために2つの代替案を提示しました。', choices: ['alternative', 'attentive', 'attractive', 'additive'], ans: 0, notes: ['alternative designs（代替デザイン案）が文脈に合います。', 'attentive は「注意深い」です。', 'attractive は「魅力的な」です。', 'additive は「添加物」です。'], vocab: [['alternative', '代替の'], ['architect', '建築家']] },
  { skill: '語彙と文脈', diff: 'hard', stem: 'The company’s new water bottle is made from _____ recycled aluminum.', stemJa: '同社の新しい水筒は耐久性のある再生アルミニウムで作られています。', choices: ['durable', 'doubtful', 'distant', 'drowsy'], ans: 0, notes: ['durable は「耐久性のある」で水筒の素材説明に最適です。', 'doubtful は「疑わしい」です。', 'distant は「遠い」です。', 'drowsy は「眠い」です。'], vocab: [['durable', '耐久性のある'], ['recycled', '再生の']] },
  { skill: '語彙と文脈', diff: 'easy', stem: 'Please _____ the attached itinerary and let me know if any flight times need changing.', stemJa: '添付の日程表を確認し、フライト時刻の変更が必要かお知らせください。', choices: ['review', 'rescue', 'retire', 'resign'], ans: 0, notes: ['review the itinerary（日程表を確認する）が適切です。', 'rescue は「救助する」です。', 'retire は「退職する」です。', 'resign は「辞任する」です。'], vocab: [['itinerary', '日程表'], ['review', '確認する']] },
  { skill: '語彙と文脈', diff: 'medium', stem: 'The charity event raised a _____ amount of money for local youth sports.', stemJa: 'そのチャリティイベントは地域の青少年スポーツのためにかなりの額の資金を集めました。', choices: ['substantial', 'superficial', 'suspicious', 'subsequent'], ans: 0, notes: ['substantial amount（かなりの額）が自然な表現です。', 'superficial は「表面的な」です。', 'suspicious は「疑わしい」です。', 'subsequent は「その後の」です。'], vocab: [['substantial', 'かなりの・実質的な'], ['raise money', '資金を集める']] },
  { skill: '語彙と文脈', diff: 'medium', stem: 'To prevent unauthorized access, passwords must be _____ every ninety days.', stemJa: '不正アクセスを防ぐため、パスワードは90日ごとに更新しなければなりません。', choices: ['updated', 'uploaded', 'upheld', 'uprooted'], ans: 0, notes: ['passwords must be updated（パスワードを更新する）が適切です。', 'uploaded は「アップロードされる」です。', 'upheld は「支持される」です。', 'uprooted は「根こそぎにされる」です。'], vocab: [['unauthorized', '不正な・無許可の'], ['update', '更新する']] },
  { skill: '語彙と文脈', diff: 'easy', stem: 'The train was delayed briefly while technicians _____ a signal near Oakridge.', stemJa: '技術者がオークリッジ付近の信号を点検する間、電車は一時的に遅れました。', choices: ['inspected', 'invited', 'invented', 'invested'], ans: 0, notes: ['inspected a signal（信号を点検した）が文脈に一致します。', 'invited は「招待した」です。', 'invented は「発明した」です。', 'invested は「投資した」です。'], vocab: [['inspect', '点検する'], ['briefly', '一時的に']] }
];

const extraP6 = [
  {
    id: 'p6-s11', title: 'Memo: Office Air Conditioning Maintenance',
    text: 'To: All Employees\nFrom: Building Operations\n\nThis Saturday, technicians will clean and [1] the central air conditioning units on floors two through five. The work is expected to last from 8:00 A.M. until 1:00 P.M. [2]. Staff members who plan to come into the office that morning should dress [3] for slightly warmer indoor temperatures. Normal cooling service will [4] by early afternoon.',
    textJa: '宛先：全社員 / 差出人：施設管理\n今週土曜、技術者が2〜5階の中央空調設備を清掃・点検します。作業は午前8時〜午後1時の予定です。[2]。その朝に出社予定のスタッフは、やや暖かい室温に合わせて服装を調整してください。通常の冷房運転は午後早い時間に再開します。',
    vocab: [['operations', '管理・運営'], ['resume', '再開する'], ['appropriately', '適切に']],
    qs: [
      { skill: '語彙と文脈', diff: 'easy', stem: 'Select the best word for blank [1].', stemJa: '空所 [1] に最も適切な語を選んでください。', choices: ['inspect', 'insist', 'insert', 'inhabit'], ans: 0, notes: ['clean and inspect（清掃・点検する）が保守作業に最適です。', 'insist は「主張する」です。', 'insert は「挿入する」です。', 'inhabit は「居住する」です。'] },
      { skill: '文挿入', diff: 'medium', stem: 'Select the best sentence for blank [2].', stemJa: '空所 [2] に最も適切な文を選んでください。', choices: ['During these five hours, the cooling system will be temporarily shut off.', 'Our cafeteria has added a new pasta bar.', 'Please submit your vacation request online.', 'The company softball game is next Sunday.'], ans: 0, notes: ['前文の8:00〜13:00の作業時間と、次文の「やや暖かい室温」をつなぐ「5時間、冷房が一時停止する」が最適です。', 'カフェテリアは無関係です。', '休暇申請は無関係です。', 'ソフトボールは無関係です。'] },
      { skill: '品詞', diff: 'easy', stem: 'Select the best word for blank [3].', stemJa: '空所 [3] に最も適切な語を選んでください。', choices: ['appropriate', 'appropriately', 'appropriateness', 'appropriated'], ans: 1, notes: ['appropriate は形容詞です。動詞 dress を修飾する副詞が必要です。', 'dress appropriately（適切に装う）が正解です。', 'appropriateness は名詞です。', 'appropriated は過去分詞です。'] },
      { skill: '語彙と文脈', diff: 'easy', stem: 'Select the best word for blank [4].', stemJa: '空所 [4] に最も適切な語を選んでください。', choices: ['resume', 'resign', 'retire', 'resemble'], ans: 0, notes: ['Normal cooling service will resume（通常の冷房が再開する）が適切です。', 'resign は「辞任する」です。', 'retire は「退職する」です。', 'resemble は「似ている」です。'] }
    ]
  },
  {
    id: 'p6-s12', title: 'Email: Welcome to New Wellness Benefit',
    text: 'Dear Colleagues,\n\nBeginning next month, all full-time staff will receive a $50 monthly stipend to [1] fitness memberships, yoga classes, or home exercise equipment. [2]. To claim your reimbursement, simply upload your receipt to the HR portal by the last business day of each month. We are committed to supporting your physical and mental [3] both inside and [4] the workplace.',
    textJa: '同僚の皆さん\n来月から全正社員に、ジム会費・ヨガ教室・自宅用運動器具の費用を補助する月額50ドルの手当を支給します。[2]。精算するには毎月末営業日までに人事ポータルへ領収書をアップロードしてください。職場内外での皆様の心身の健康を支援してまいります。',
    vocab: [['stipend', '手当・補助金'], ['claim', '請求する'], ['well-being', '健康・幸福']],
    qs: [
      { skill: '語彙と文脈', diff: 'medium', stem: 'Select the best word for blank [1].', stemJa: '空所 [1] に最も適切な語を選んでください。', choices: ['cover', 'copy', 'count', 'cause'], ans: 0, notes: ['cover fitness memberships（費用を賄う）が適切です。', 'copy は「コピーする」です。', 'count は「数える」です。', 'cause は「引き起こす」です。'] },
      { skill: '文挿入', diff: 'medium', stem: 'Select the best sentence for blank [2].', stemJa: '空所 [2] に最も適切な文を選んでください。', choices: ['Unused monthly funds do not roll over to the following month.', 'The lobby floor will be waxed tonight.', 'Please update your emergency contact.', 'Our annual picnic was very popular.'], ans: 0, notes: ['前文の月額50ドル手当に関する条件（翌月繰越不可）を補足する文が自然です。', 'ロビーのワックスがけは無関係です。', '緊急連絡先は無関係です。', 'ピクニックは無関係です。'] },
      { skill: '語彙と文脈', diff: 'easy', stem: 'Select the best word for blank [3].', stemJa: '空所 [3] に最も適切な語を選んでください。', choices: ['well-being', 'warehouse', 'warranty', 'weather'], ans: 0, notes: ['physical and mental well-being（心身の健康）が定番表現です。', 'warehouse は「倉庫」です。', 'warranty は「保証」です。', 'weather は「天気」です。'] },
      { skill: '接続詞と前置詞', diff: 'easy', stem: 'Select the best word for blank [4].', stemJa: '空所 [4] に最も適切な語を選んでください。', choices: ['outside', 'among', 'until', 'during'], ans: 0, notes: ['both inside and outside the workplace（職場の内外で）が対比表現として正解です。', 'among は不可です。', 'until は不可です。', 'during は不可です。'] }
    ]
  },
  {
    id: 'p6-s13', title: 'Notice: Parking Lot Repaving',
    text: 'Attention Drivers,\n\nThe south visitor parking lot will be closed for repaving on Tuesday, August 12. Vehicles left in the lot after 7:00 A.M. will be [1] at the owner’s expense. [2]. Temporary parking has been arranged at the municipal garage two blocks east, and a free shuttle will run every ten minutes. We apologize for any [3] this one-day closure may [4].',
    textJa: '運転者の皆様へ\n南側来客用駐車場は8月12日（火）に再舗装のため閉鎖されます。午前7時以降に残された車両は所有者負担でレッカー移動されます。[2]。東へ2ブロックの市営駐車場に臨時駐車スペースを確保しており、10分おきに無料シャトルを運行します。1日間の閉鎖によるご不便をお詫び申し上げます。',
    vocab: [['repaving', '再舗装'], ['towed', 'レッカー移動される'], ['municipal', '市営の']],
    qs: [
      { skill: '語彙と文脈', diff: 'medium', stem: 'Select the best word for blank [1].', stemJa: '空所 [1] に最も適切な語を選んでください。', choices: ['towed', 'typed', 'taught', 'tasted'], ans: 0, notes: ['will be towed at the owner’s expense（所有者負担でレッカー移動される）が定番表現です。', 'typed は「入力される」です。', 'taught は「教えられる」です。', 'tasted は「味見される」です。'] },
      { skill: '文挿入', diff: 'medium', stem: 'Select the best sentence for blank [2].', stemJa: '空所 [2] に最も適切な文を選んでください。', choices: ['The lot is scheduled to reopen at 6:00 A.M. on Wednesday.', 'New coffee machines were installed in the break room.', 'Please recycle plastic bottles in the yellow bin.', 'Our sales team won an industry award.'], ans: 0, notes: ['火曜の閉鎖に続けて、水曜朝6時の再開予定を案内する文が自然です。', 'コーヒーマシンは無関係です。', 'リサイクルは無関係です。', '営業チームの受賞は無関係です。'] },
      { skill: '語彙と文脈', diff: 'easy', stem: 'Select the best word for blank [3].', stemJa: '空所 [3] に最も適切な語を選んでください。', choices: ['inconvenience', 'invitation', 'invention', 'inspection'], ans: 0, notes: ['apologize for any inconvenience（ご不便をお詫びする）が定番です。', 'invitation は「招待」です。', 'invention は「発明」です。', 'inspection は「点検」です。'] },
      { skill: '動詞の形', diff: 'easy', stem: 'Select the best word for blank [4].', stemJa: '空所 [4] に最も適切な語を選んでください。', choices: ['cause', 'caused', 'causing', 'causes'], ans: 0, notes: ['助動詞 may の後ろには動詞の原形が必要です。', 'caused は不可です。', 'causing は不可です。', 'causes は不可です。'] }
    ]
  },
  {
    id: 'p6-s14', title: 'Email: Freelance Photographer Inquiry',
    text: 'Dear Ms. Chen,\n\nWe admired the architectural photos in your online portfolio and would like to [1] your availability for a one-day shoot at our new headquarters in Portland. We need high-resolution images of the lobby, workspaces, and rooftop terrace for our annual report. [2]. Please send us your daily rate and let us know which dates in June work [3] for you. We look forward to [4] from you soon.',
    textJa: 'チェン様\nオンラインポートフォリオの建築写真を拝見し、ポートランドの新本社での1日撮影のご予定をお伺いしたくご連絡しました。年次報告書用にロビー、執務室、屋上テラスの高解像度写真が必要です。[2]。1日の撮影料金と6月のご都合の良い日程をお知らせください。お返事をお待ちしております。',
    vocab: [['portfolio', '作品集'], ['high-resolution', '高解像度の'], ['daily rate', '日当・1日料金']],
    qs: [
      { skill: '語彙と文脈', diff: 'easy', stem: 'Select the best word for blank [1].', stemJa: '空所 [1] に最も適切な語を選んでください。', choices: ['check', 'chase', 'charge', 'cheer'], ans: 0, notes: ['check your availability（空き状況を確認する）が自然です。', 'chase は「追いかける」です。', 'charge は「請求する」です。', 'cheer は「応援する」です。'] },
      { skill: '文挿入', diff: 'medium', stem: 'Select the best sentence for blank [2].', stemJa: '空所 [2] に最も適切な文を選んでください。', choices: ['We would also like to include a few candid shots of staff collaborating.', 'The train to Portland departs from Track 2.', 'All invoices are paid by credit card.', 'Please return your library books on time.'], ans: 0, notes: ['前文の撮影対象（ロビー・執務室・テラス）に続けて、追加の撮影希望（スタッフの自然な写真）を述べる文が自然です。', '電車のホームは無関係です。', 'クレジットカード払いは突然すぎます。', '図書館の本は無関係です。'] },
      { skill: '語彙と文脈', diff: 'easy', stem: 'Select the best word for blank [3].', stemJa: '空所 [3] に最も適切な語を選んでください。', choices: ['best', 'good', 'better', 'well'], ans: 0, notes: ['work best for you（あなたにとって最も都合がよい）が定番表現です。', 'good は副詞になりません。', 'better は2択比較向きです。', 'well よりも最上級 best が「どの日程が一番良いか」に一致します。'] },
      { skill: '動詞の形', diff: 'easy', stem: 'Select the best word for blank [4].', stemJa: '空所 [4] に最も適切な語を選んでください。', choices: ['hear', 'hearing', 'heard', 'hears'], ans: 1, notes: ['look forward to の後ろには動名詞が必要です。', 'look forward to hearing from you（お返事をお待ちしています）が定番です。', 'heard は不可です。', 'hears は不可です。'] }
    ]
  },
  {
    id: 'p6-s15', title: 'Article: Local Bakery Wins Sustainability Award',
    text: 'Maple Street Bakery has been named this year’s winner of the Green Business Award for its commitment to reducing food waste. Every evening, the bakery donates unsold loaves to neighborhood shelters and [1] coffee grounds for local community gardens. [2]. Owner Clara Diaz credited her twelve employees for suggesting many of the eco-friendly [3]. The bakery plans to use the $5,000 prize money to install solar panels [4] its roof.',
    textJa: 'メープルストリート・ベーカリーは食品ロス削減への取り組みにより、今年のグリーンビジネス賞を受賞しました。毎晩、売れ残ったパンを地域のシェルターに寄付し、コーヒーかすを地域菜園用に堆肥化しています。[2]。オーナーのクララ・ディアス氏は、環境に優しい取り組みの多くを提案してくれた12名のスタッフの功績を称えました。賞金5,000ドルは屋根への太陽光パネル設置に充てる予定です。',
    vocab: [['sustainability', '持続可能性'], ['compost', '堆肥化する'], ['credit', '〜の功績とする']],
    qs: [
      { skill: '語彙と文脈', diff: 'medium', stem: 'Select the best word for blank [1].', stemJa: '空所 [1] に最も適切な語を選んでください。', choices: ['composts', 'competes', 'complains', 'completes'], ans: 0, notes: ['composts coffee grounds（コーヒーかすを堆肥化する）が地域菜園の文脈に一致します。', 'competes は「競争する」です。', 'complains は「苦情を言う」です。', 'completes は「完了する」です。'] },
      { skill: '文挿入', diff: 'medium', stem: 'Select the best sentence for blank [2].', stemJa: '空所 [2] に最も適切な文を選んでください。', choices: ['In addition, the shop switched entirely to biodegradable takeout packaging last year.', 'The city library is closed on Sundays.', 'Parking rates increased by two dollars.', 'A new highway exit opened in March.'], ans: 0, notes: ['環境への取り組み（寄付・堆肥化）に続けて、生分解性容器への切替を補足する文が自然です。', '図書館は無関係です。', '駐車料金は無関係です。', '高速道路は無関係です。'] },
      { skill: '語彙と文脈', diff: 'medium', stem: 'Select the best word for blank [3].', stemJa: '空所 [3] に最も適切な語を選んでください。', choices: ['practices', 'passwords', 'passengers', 'passages'], ans: 0, notes: ['eco-friendly practices（環境に優しい取り組み・実践）が適切です。', 'passwords は「パスワード」です。', 'passengers は「乗客」です。', 'passages は「通路・一節」です。'] },
      { skill: '接続詞と前置詞', diff: 'easy', stem: 'Select the best word for blank [4].', stemJa: '空所 [4] に最も適切な語を選んでください。', choices: ['on', 'in', 'at', 'of'], ans: 0, notes: ['install solar panels on its roof（屋根の上に設置する）で前置詞 on を使います。', 'in は内部です。', 'at は1点です。', 'of は所有です。'] }
    ]
  },
  {
    id: 'p6-s16', title: 'Notice: Library Digital Media Workshop',
    text: 'Want to borrow e-books and audiobooks for free? Join our librarians this Thursday at 6:00 P.M. in the Media Lab for a hands-on workshop. Participants will learn how to download the library app and [1] titles directly to their phone or tablet. [2]. No prior technical experience is [3], and light refreshments will be served. Space is limited to twenty people, so please register online [4] at the reference desk.',
    textJa: '電子書籍やオーディオブックを無料で借りたいですか？今週木曜午後6時にメディアラボで司書による体験型ワークショップを開催します。参加者は図書館アプリのダウンロード方法と、スマホやタブレットへ直接作品を借りる方法を学びます。[2]。事前の技術経験は不要で、軽食も用意します。定員20名のため、オンラインまたはレファレンスデスクでお申し込みください。',
    vocab: [['hands-on', '体験型の'], ['reference desk', '相談カウンター'], ['prior', '事前の']],
    qs: [
      { skill: '語彙と文脈', diff: 'easy', stem: 'Select the best word for blank [1].', stemJa: '空所 [1] に最も適切な語を選んでください。', choices: ['borrow', 'build', 'bake', 'break'], ans: 0, notes: ['borrow titles（作品を借りる）が図書館アプリの文脈に一致します。', 'build は「建てる」です。', 'bake は「焼く」です。', 'break は「壊す」です。'] },
      { skill: '文挿入', diff: 'medium', stem: 'Select the best sentence for blank [2].', stemJa: '空所 [2] に最も適切な文を選んでください。', choices: ['Please bring your library card and a charged mobile device.', 'The museum gift shop closes at 5:00 P.M.', 'All interns must attend orientation.', 'The ferry departs every 45 minutes.'], ans: 0, notes: ['体験型ワークショップの持ち物（図書館カードと充電済み端末）を案内する文が自然です。', '美術館は無関係です。', 'インターンは無関係です。', 'フェリーは無関係です。'] },
      { skill: '語彙と文脈', diff: 'easy', stem: 'Select the best word for blank [3].', stemJa: '空所 [3] に最も適切な語を選んでください。', choices: ['required', 'retired', 'repaired', 'removed'], ans: 0, notes: ['No prior technical experience is required（事前の技術経験は不要）が定番表現です。', 'retired は「退職した」です。', 'repaired は「修理された」です。', 'removed は「撤去された」です。'] },
      { skill: '接続詞と前置詞', diff: 'easy', stem: 'Select the best word for blank [4].', stemJa: '空所 [4] に最も適切な語を選んでください。', choices: ['or', 'but', 'so', 'nor'], ans: 0, notes: ['online or at the reference desk（オンラインまたはデスクで）が選択を表します。', 'but は逆接です。', 'so は結果です。', 'nor は否定です。'] }
    ]
  },
  {
    id: 'p6-s17', title: 'Email: Quarterly Inventory Count',
    text: 'Hi Warehouse Team,\n\nOur quarterly physical inventory count will take place on Friday, June 28. All outgoing shipments must be [1] by 12:00 P.M. so that every aisle can be scanned accurately. [2]. Team leaders will assign each pair of staff members to a specific shelving zone before lunch. Please wear comfortable shoes and report any damaged [3] to your supervisor [4].',
    textJa: '倉庫チームの皆さん\n四半期の実地棚卸しを6月28日（金）に実施します。全通路を正確にスキャンできるよう、発送荷物はすべて正午までに完了させる必要があります。[2]。チームリーダーは昼食前に各ペアへ担当の棚ゾーンを割り当てます。歩きやすい靴を履き、破損したラベルがあれば直ちに上司へ報告してください。',
    vocab: [['inventory count', '棚卸し'], ['outgoing', '発送の'], ['shelving zone', '棚エリア']],
    qs: [
      { skill: '動詞の形', diff: 'easy', stem: 'Select the best word for blank [1].', stemJa: '空所 [1] に最も適切な語を選んでください。', choices: ['completed', 'complete', 'completing', 'completion'], ans: 0, notes: ['must be + 過去分詞（completed）で受動態になります。', 'complete は能動になります。', 'completing は不可です。', 'completion は名詞です。'] },
      { skill: '文挿入', diff: 'medium', stem: 'Select the best sentence for blank [2].', stemJa: '空所 [2] に最も適切な文を選んでください。', choices: ['No new deliveries will be accepted during the afternoon count.', 'Our new logo was unveiled last month.', 'Please RSVP for the retirement dinner.', 'The rooftop lounge opens at 5:00 P.M.'], ans: 0, notes: ['午前中の発送締切に続けて、午後の棚卸し中は新規荷受けもしないことを補足する文が自然です。', '新ロゴは無関係です。', '退職パーティーは無関係です。', '屋上ラウンジは無関係です。'] },
      { skill: '語彙と文脈', diff: 'easy', stem: 'Select the best word for blank [3].', stemJa: '空所 [3] に最も適切な語を選んでください。', choices: ['labels', 'ladders', 'letters', 'lunches'], ans: 0, notes: ['スキャン作業の文脈から damaged labels（破損したラベル）が最適です。', 'ladders は「はしご」です。', 'letters は「手紙」です。', 'lunches は「昼食」です。'] },
      { skill: '品詞', diff: 'easy', stem: 'Select the best word for blank [4].', stemJa: '空所 [4] に最も適切な語を選んでください。', choices: ['prompt', 'promptly', 'promptness', 'prompted'], ans: 1, notes: ['prompt は形容詞です。動詞 report を修飾する副詞が必要です。', 'promptly（速やかに）が正解です。', 'promptness は名詞です。', 'prompted は過去分詞です。'] }
    ]
  },
  {
    id: 'p6-s18', title: 'Letter: Hotel Loyalty Tier Upgrade',
    text: 'Dear Mr. Okafor,\n\nCongratulations! Because you stayed more than twenty nights with Clearwater Hotels this year, your account has been [1] to Gold Member status. [2]. As a Gold Member, you will enjoy complimentary breakfast, priority check-in, and late checkout until 2:00 P.M. whenever [3]. Your new digital membership card is already active in our mobile app, so you can start using your benefits on your [4] stay.',
    textJa: 'オカフォー様\nおめでとうございます！今年クリアウォーターホテルに20泊以上ご宿泊いただいたため、アカウントがゴールド会員へアップグレードされました。[2]。ゴールド会員特典として、無料朝食、優先チェックイン、空室状況に応じた午後2時までのレイトチェックアウトをご利用いただけます。新しいデジタル会員証はすでにアプリで有効になっており、次回のご宿泊から特典をご利用いただけます。',
    vocab: [['upgraded', '昇格された'], ['priority', '優先の'], ['late checkout', 'レイトチェックアウト']],
    qs: [
      { skill: '語彙と文脈', diff: 'easy', stem: 'Select the best word for blank [1].', stemJa: '空所 [1] に最も適切な語を選んでください。', choices: ['upgraded', 'uploaded', 'unpacked', 'unfolded'], ans: 0, notes: ['be upgraded to Gold Member status（ゴールド会員へ昇格された）が適切です。', 'uploaded は「アップロードされた」です。', 'unpacked は「荷解きされた」です。', 'unfolded は「展開された」です。'] },
      { skill: '文挿入', diff: 'medium', stem: 'Select the best sentence for blank [2].', stemJa: '空所 [2] に最も適切な文を選んでください。', choices: ['This upgraded status will remain valid through December of next year.', 'The swimming pool is located on the second floor.', 'Please silence your phone in the clinic.', 'Our hardware store is holding a spring sale.'], ans: 0, notes: ['前文のゴールド会員昇格に続けて、その有効期限を案内する文が自然です。', 'プールの場所は文脈に合いません。', 'クリニックは無関係です。', 'ホームセンターは無関係です。'] },
      { skill: '語彙と文脈', diff: 'easy', stem: 'Select the best word for blank [3].', stemJa: '空所 [3] に最も適切な語を選んでください。', choices: ['available', 'annual', 'average', 'anxious'], ans: 0, notes: ['whenever available（利用可能なときはいつでも）がホテル特典の定番表現です。', 'annual は「年次の」です。', 'average は「平均の」です。', 'anxious は「心配な」です。'] },
      { skill: '語彙と文脈', diff: 'easy', stem: 'Select the best word for blank [4].', stemJa: '空所 [4] に最も適切な語を選んでください。', choices: ['next', 'near', 'neat', 'narrow'], ans: 0, notes: ['on your next stay（次回の宿泊で）が適切です。', 'near は「近い」です。', 'neat は「きちんとした」です。', 'narrow は「狭い」です。'] }
    ]
  },
  {
    id: 'p6-s19', title: 'Announcement: New Express Bus Route',
    text: 'Starting May 1, Metro Transit will launch Express Route 42 connecting Northgate Station directly to the Harborview Business Park. Buses will run every fifteen minutes during weekday rush hours, cutting average travel time in [1]. [2]. Commuters can pay using the standard transit card or contactless bank cards at the front door. Full timetables and stop maps are [3] on our website and at all major [4].',
    textJa: '5月1日よりメトロトランジットは、ノースゲート駅とハーバービュー・ビジネスパークを直結する急行42番系統を開始します。平日のラッシュ時間帯は15分おきに運行し、平均所要時間を半分に短縮します。[2]。通勤客は通常の交通系カードまたはタッチ決済対応カードで乗車口にて支払えます。時刻表と停留所マップは公式サイトおよび主要駅で閲覧できます。',
    vocab: [['rush hour', 'ラッシュ時間帯'], ['contactless', '非接触型の'], ['timetable', '時刻表']],
    qs: [
      { skill: '語彙と文脈', diff: 'medium', stem: 'Select the best word for blank [1].', stemJa: '空所 [1] に最も適切な語を選んでください。', choices: ['half', 'hand', 'height', 'haste'], ans: 0, notes: ['cut travel time in half（所要時間を半分に短縮する）が定型表現です。', 'hand は不可です。', 'height は不可です。', 'haste は不可です。'] },
      { skill: '文挿入', diff: 'medium', stem: 'Select the best sentence for blank [2].', stemJa: '空所 [2] に最も適切な文を選んでください。', choices: ['Each bus is equipped with free Wi-Fi and USB charging ports.', 'The farmers market opens at 8:00 A.M.', 'Please wear a hard hat in Zone A.', 'Our bookstore sells used novels.'], ans: 0, notes: ['新設急行バスの特徴（所要時間短縮）に続けて、車内設備（Wi-Fi・USB充電）を紹介する文が自然です。', 'ファーマーズマーケットは無関係です。', 'ヘルメットは無関係です。', '書店は無関係です。'] },
      { skill: '語彙と文脈', diff: 'easy', stem: 'Select the best word for blank [3].', stemJa: '空所 [3] に最も適切な語を選んでください。', choices: ['posted', 'packed', 'painted', 'poured'], ans: 0, notes: ['are posted on our website（ウェブサイトに掲載されている）が適切です。', 'packed は「梱包される」です。', 'painted は「塗装される」です。', 'poured は「注がれる」です。'] },
      { skill: '語彙と文脈', diff: 'easy', stem: 'Select the best word for blank [4].', stemJa: '空所 [4] に最も適切な語を選んでください。', choices: ['stations', 'statues', 'staples', 'stages'], ans: 0, notes: ['at all major stations（すべての主要駅で）が交通機関の文脈に一致します。', 'statues は「彫像」です。', 'staples は「ホッチキス針」です。', 'stages は「舞台」です。'] }
    ]
  },
  {
    id: 'p6-s20', title: 'Email: Annual Staff Appreciation Picnic',
    text: 'Hello Everyone,\n\nMark your calendars! Our annual Staff Appreciation Picnic will be held on Saturday, July 19, at Cedar Park Pavilion from 11:30 A.M. to 3:30 P.M. Employees are welcome to bring [1] family members and guests. [2]. We will provide grilled dishes, vegetarian wraps, cold drinks, and games for children. To help us order the right amount of food, please RSVP [3] July 10 and indicate any food [4].',
    textJa: '皆さんこんにちは\n予定に入れておいてください！恒例の社員感謝ピクニックを7月19日（土）11:30〜15:30にシダーパーク・パビリオンで開催します。ご家族やゲストの同伴も歓迎です。[2]。グリル料理、ベジタリアンラップ、冷たい飲み物、お子様向けゲームを用意します。適切な量の料理を手配するため、7月10日までに出欠を回答し、食物アレルギーがあればお知らせください。',
    vocab: [['pavilion', '東屋・パビリオン'], ['RSVP', '出欠の返事をする'], ['allergy', 'アレルギー']],
    qs: [
      { skill: '代名詞', diff: 'easy', stem: 'Select the best word for blank [1].', stemJa: '空所 [1] に最も適切な語を選んでください。', choices: ['their', 'they', 'them', 'theirs'], ans: 0, notes: ['family members の前なので所有格 their が正解です。', 'they は主格です。', 'them は目的格です。', 'theirs は所有代名詞です。'] },
      { skill: '文挿入', diff: 'medium', stem: 'Select the best sentence for blank [2].', stemJa: '空所 [2] に最も適切な文を選んでください。', choices: ['Free parking is available right next to the pavilion.', 'The quarterly audit begins next Monday.', 'Please submit your expense report by Friday.', 'Our copy shop offers a 10 percent bulk discount.'], ans: 0, notes: ['会場案内と家族同伴に続けて、パビリオン隣の無料駐車場を案内する文が自然です。', '監査は無関係です。', '経費精算は無関係です。', 'コピーショップは無関係です。'] },
      { skill: '接続詞と前置詞', diff: 'easy', stem: 'Select the best word for blank [3].', stemJa: '空所 [3] に最も適切な語を選んでください。', choices: ['by', 'during', 'among', 'without'], ans: 0, notes: ['期限「7月10日までに」には前置詞 by を使います。', 'during は期間です。', 'among は「〜の間で」です。', 'without は「〜なしで」です。'] },
      { skill: '語彙と文脈', diff: 'easy', stem: 'Select the best word for blank [4].', stemJa: '空所 [4] に最も適切な語を選んでください。', choices: ['allergies', 'agencies', 'agendas', 'averages'], ans: 0, notes: ['food allergies（食物アレルギー）が料理手配の文脈に一致します。', 'agencies は「代理店」です。', 'agendas は「議題」です。', 'averages は「平均」です。'] }
    ]
  }
];

const letters = ['A', 'B', 'C', 'D'];
let qNum = 101;

// Build extra Part 5 sets (sets 7-12, Q101-Q160)
const newP5Sets = [];
for (let s = 0; s < 6; s++) {
  const slice = extraP5.slice(s * 10, (s + 1) * 10);
  const setNum = 7 + s;
  const setId = `p5-s${String(setNum).padStart(2, '0')}`;
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
  newP5Sets.push({
    setId,
    part: 5,
    titleJa: `Part 5 セット ${setNum}（Q${items[0].number}–Q${items[items.length - 1].number}）`,
    passages: [],
    media: [],
    items
  });
}

// Build extra Part 6 sets (passages 11-20, Q161-Q200)
const newP6Sets = extraP6.map((p, idx) => {
  const docNum = 11 + idx;
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
    titleJa: `Part 6 文書 ${docNum}（Q${items[0].number}–Q${items[items.length - 1].number}）`,
    passages: [{ id: passageId, type: 'document', title: p.title, text: p.text, translationJa: p.textJa }],
    media: [],
    items
  };
});

exam.titleJa = 'Part 5・6 集中演習 200問';
exam.parts[0].titleJa = '短文穴埋め問題（120問）';
exam.parts[0].sets = [...existingP5, ...newP5Sets];
exam.parts[1].titleJa = '長文穴埋め問題（80問）';
exam.parts[1].sets = [...existingP6, ...newP6Sets];

// Renumber sequentially 1..200 and update set titles
let seq = 1;
exam.parts[0].sets.forEach((s, idx) => {
  s.items.forEach((q) => {
    q.number = seq;
    q.id = `p56-q${String(seq).padStart(3, '0')}`;
    seq++;
  });
  s.titleJa = `Part 5 セット ${idx + 1}（Q${s.items[0].number}–Q${s.items[s.items.length - 1].number}）`;
});
exam.parts[1].sets.forEach((s, idx) => {
  s.items.forEach((q) => {
    q.number = seq;
    q.id = `p56-q${String(seq).padStart(3, '0')}`;
    seq++;
  });
  s.titleJa = `Part 6 文書 ${idx + 1}（Q${s.items[0].number}–Q${s.items[s.items.length - 1].number}）`;
});

fs.writeFileSync(contentExamPath, JSON.stringify(exam, null, 2), 'utf8');
fs.writeFileSync(distExamPath, JSON.stringify(exam, null, 2), 'utf8');

console.log(`Updated reading-part56-01: Part 5 (${exam.parts[0].sets.length} sets, 120q) + Part 6 (${exam.parts[1].sets.length} sets, 80q) = ${seq - 1} questions.`);
