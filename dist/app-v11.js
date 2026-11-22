'use strict';
const questions = [
  {
    translation: "倉庫は安全点検が完了するまで閉鎖されたままです。",
    choiceNotes: [
      "during は「〜の間に」を表す前置詞で、during the inspection のように名詞句を取ります。ここでは the safety inspection is complete という節が続くため入りません。",
      "until は「〜するまで」を表す接続詞です。点検が完了する時点を、閉鎖が続く期限として示します。",
      "despite は「〜にもかかわらず」を表す前置詞で、despite the delay のように名詞句を取ります。後ろの節を直接導けず、閉鎖の期限も示しません。",
      "within は「〜以内に」を表す前置詞で、within two hours のように期間を取ります。後ろの節は期間を表す名詞句ではありません。"
    ],
    vocabulary: [["warehouse", "倉庫"], ["remain closed", "閉鎖されたままである"], ["safety inspection", "安全点検"], ["be complete", "完了している"]],
    stem: 'The warehouse will remain closed _____ the safety inspection is complete.',
    choices: ['during', 'until', 'despite', 'within'],
    answer: 1,
    skill: '接続詞と前置詞',
    term: 'until', meaning: '〜するまで'
  },
  {
    translation: "明日の研修会で会議室が必要なら、正午までに予約してください。",
    choiceNotes: [
      "reservation は「予約」という名詞です。Please に続く命令文では、会議室を目的語に取れる動詞が必要です。",
      "reserved は reserve の過去形または過去分詞です。命令文では動詞の原形を使います。過去分詞は The room is reserved. のような文で使えます。",
      "reserving は reserve の -ing 形です。We are reserving the room. のような進行形では使えますが、Please の直後で命令文の動詞にはなりません。",
      "reserve は「予約する」という動詞の原形です。Please reserve で丁寧な依頼になり、the conference room が予約する対象です。"
    ],
    vocabulary: [["reserve", "予約する"], ["conference room", "会議室"], ["by noon", "正午までに"], ["workshop", "研修会"]],
    stem: 'Please _____ the conference room by noon if you need it for tomorrow’s workshop.',
    choices: ['reservation', 'reserved', 'reserving', 'reserve'],
    answer: 3,
    skill: '動詞の形',
    term: 'reserve', meaning: '予約する・確保する'
  },
  {
    translation: "申込者が書類を提出する時間をより多く取れるよう、登録の締め切りを延長しました。",
    choiceNotes: [
      "deadline は「締め切り」です。extend the deadline は期限を延長するという意味で、提出時間を増やすという後半の目的と一致します。",
      "receipt は「領収書」や「受領」です。登録を受け付けた証明は、延長して申込者の提出時間が増えるものではありません。",
      "summary は「要約」です。登録内容の要約を長くしても、書類の提出期限そのものは変わりません。",
      "fee は「料金」です。registration fee は自然な組み合わせですが、登録料を指します。後半が問うのは提出できる時間です。"
    ],
    vocabulary: [["extend", "延長する"], ["registration deadline", "登録締め切り"], ["applicant", "申込者"], ["submit a form", "書類を提出する"]],
    stem: 'We have extended the registration _____ to give applicants more time to submit their forms.',
    choices: ['deadline', 'receipt', 'summary', 'fee'],
    answer: 0,
    skill: '語彙と文脈',
    term: 'deadline', meaning: '締め切り'
  }
];
const key = 'toeic.history.v1';
const examId = 'part5-demo';
const revision = 1;
const select = (id) => document.getElementById(id);

const dateFormat = new Intl.DateTimeFormat('ja-JP', { dateStyle: 'medium', timeStyle: 'short' });
const letter = (index) => 'ABCD'[index];
const score = (answers) => answers.filter((value, index) => value === questions[index].answer).length;

function validate(data) {
  if (!data || data.version !== 1 || !Array.isArray(data.attempts)) throw new Error('履歴の形式に対応していません。');
  const seen = new Set();
  for (const attempt of data.attempts) {
    if (!attempt || typeof attempt.id !== 'string' || !/^[0-9a-f-]{36}$/i.test(attempt.id) ||
        seen.has(attempt.id) || attempt.examId !== examId || attempt.revision !== revision ||
        typeof attempt.finishedAt !== 'string' || !Number.isFinite(Date.parse(attempt.finishedAt)) ||
        !Array.isArray(attempt.answers) || attempt.answers.length !== questions.length ||
        !attempt.answers.every((value, index) => Number.isInteger(value) && value >= 0 && value < questions[index].choices.length)) {
      throw new Error('履歴に無効な受験データがあります。');
    }
    seen.add(attempt.id);
  }
  const words = data.words === undefined ? [] : data.words;
  if (!Array.isArray(words)) throw new Error('単語帳の形式に対応していません。');
  const wordKeys = new Set();
  const cleanWords = words.map((entry) => {
    if (!entry || typeof entry.term !== 'string' || !entry.term.trim() || entry.term.length > 100 ||
        typeof entry.meaning !== 'string' || !entry.meaning.trim() || entry.meaning.length > 300 ||
        typeof entry.mastered !== 'boolean' || wordKeys.has(wordKey(entry.term))) {
      throw new Error('単語帳に無効なデータがあります。');
    }
    wordKeys.add(wordKey(entry.term));
    return { term: entry.term.trim(), meaning: entry.meaning.trim(), mastered: entry.mastered };
  });
  return {
    attempts: data.attempts.map(({ id, finishedAt, answers }) => ({ id, examId, revision, finishedAt, answers })),
    words: cleanWords
  };
}

function load() {
  const raw = localStorage.getItem(key);
  return raw === null ? { attempts: [], words: [] } : validate(JSON.parse(raw));
}

function save(progress) {
  localStorage.setItem(key, JSON.stringify({ version: 1, ...progress }));
}

function wordKey(term) {
  return term.trim().normalize('NFKC').toLowerCase();
}

function renderProgress({ attempts, words }) {
  renderHistory(attempts);
  renderSkills(attempts);
  renderWords(words);
  select('download').disabled = !attempts.length && !words.length;
}

function renderSkills(attempts) {
  const bySkill = new Map();
  questions.forEach((question, index) => {
    const stat = bySkill.get(question.skill) ?? {skill: question.skill, correct: 0, total: 0};
    stat.correct += attempts.filter(({ answers }) => answers[index] === question.answer).length;
    stat.total += attempts.length;
    bySkill.set(question.skill, stat);
  });
  const stats = [...bySkill.values()].sort((a, b) => a.correct * b.total - b.correct * a.total);
  const weak = stats.find(({ correct, total }) => total >= 3 && correct / total < .7);
  select('skill-summary').textContent = weak
    ? '優先して復習する技能 · ' + weak.skill + '。同じ問題の再受験も集計します。'
    : attempts.length < 3
      ? 'Part 5ミニ模試の技能別正答率を表示します。各技能で3回答以上たまると復習候補を判定します。'
      : '正答率70%未満の技能はありません。同じ問題の再受験も集計します。';
  select('skill-results').replaceChildren(...stats.map(({ skill, correct, total }) => {
    const item = document.createElement('li');
    item.textContent = skill + ' · ' + (total ? correct + ' / ' + total + ' 正解（' + Math.round(100 * correct / total) + '%）' : '回答なし');
    return item;
  }));
}

function renderWords(words) {
  const list = select('word-list');
  list.replaceChildren(...words.map((entry) => {
    const row = document.createElement('li');
    row.className = 'word-card';
    const card = document.createElement('details');
    const term = document.createElement('summary');
    term.lang = 'en';
    term.textContent = entry.term;
    const meaning = document.createElement('p');
    meaning.textContent = entry.meaning;
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.textContent = entry.mastered ? '習得済み' : '習得済みにする';
    toggle.setAttribute('aria-pressed', String(entry.mastered));
    toggle.addEventListener('click', () => {
      try {
        const progress = load();
        const current = progress.words.find((word) => wordKey(word.term) === wordKey(entry.term));
        if (!current) return;
        current.mastered = !current.mastered;
        save(progress);
        toggle.textContent = current.mastered ? '習得済み' : '習得済みにする';
        toggle.setAttribute('aria-pressed', String(current.mastered));
        select('word-status').textContent = current.mastered ? '習得済みにしました。' : '復習対象に戻しました。';
      } catch {
        select('word-status').textContent = '単語帳に保存できませんでした。';
      }
    });
    card.append(term, meaning, toggle);
    row.append(card);
    return row;
  }));
}

function addWord(term, meaning) {
  term = term.trim();
  meaning = meaning.trim();
  if (!term || !meaning) {
    select('word-status').textContent = '単語と意味の両方を入力してください。';
    return false;
  }
  try {
    const progress = load();
    if (progress.words.some((entry) => wordKey(entry.term) === wordKey(term))) {
      select('word-status').textContent = 'この単語は登録済みです。';
      return false;
    }
    progress.words.push({term, meaning, mastered: false});
    save(progress);
    renderProgress(progress);
    select('word-status').textContent = term + ' を登録しました。';
    return true;
  } catch {
    select('word-status').textContent = '単語帳に保存できませんでした。';
    return false;
  }
}

select('word-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  if (addWord(data.get('term'), data.get('meaning'))) form.reset();
});

const coachDialogue = [
  {
    greeting: '今日は一緒に3問。気軽に始めようね。',
    menuCheer: '1問でも進めたら、それで十分だよ。今日も一緒にやってみようね！',
    celebrate: '全問正解！この調子でいこうね。',
    encourage: '間違えたところは、解説を一緒に見直そうね。',
    menuChallenge: '全問正解、おめでとう！次はミニ模試に挑戦してみようね。',
    menuReview: (skill) => '「分野学習」で「' + skill + '」を一緒に復習しようね。まずは1問から！'
  },
  {
    greeting: 'まずは1問。答えの根拠を意識して解こう。',
    menuCheer: '急がなくていい。今日わかったことを一つ持ち帰ろう。',
    celebrate: '全問正解だ。次も一問ずつ、根拠を確かめよう。',
    encourage: '惜しい。迷った選択肢との差を一つ確認しよう。',
    menuChallenge: '全問正解だ。次はミニ模試で力を試そう。',
    menuReview: (skill) => 'まずは「分野学習」で「' + skill + '」を復習しよう。一問ずつでいい。'
  },
  {
    greeting: '肩の力を抜いて、ミロと一緒に3問やってみるにゃ。',
    menuCheer: '小さな一歩も花丸にゃ。ミロがそばで応援してるにゃ！',
    celebrate: '全問正解にゃ！今日は花丸にゃ。',
    encourage: 'ひと息ついて、間違えたところを一緒に見直すにゃ。',
    menuChallenge: '全問正解にゃ！次はミニ模試に挑戦するにゃ。',
    menuReview: (skill) => '「分野学習」で「' + skill + '」から復習するにゃ。ミロと一緒にまずは1問にゃ！'
  }
];
let mood = 0;
const coachKey = 'toeic.coach.v1';
function renderCoach() {
  const coach = Number(select('coach').value);
  select('coach-portrait').style.backgroundPosition = (mood * 50) + '% ' + (coach * 50) + '%';
  const dialogue = coachDialogue[coach];
  const message = [dialogue.greeting, dialogue.celebrate, dialogue.encourage][mood];
  select('coach-message').textContent = message;
  select('practice-coach').hidden = !mood;
  select('practice-message').textContent = mood ? message : '';
  select('practice-portrait').style.backgroundPosition = (mood * 50) + '% ' + (coach * 50) + '%';

}
try {
  const savedCoach = localStorage.getItem(coachKey);
  if (['0', '1', '2'].includes(savedCoach)) select('coach').value = savedCoach;
} catch {
  // The selector still works for this session.
}
select('coach').addEventListener('change', () => {
  try {
    localStorage.setItem(coachKey, select('coach').value);
  } catch {
    // The selector still works for this session.
  }
  renderCoach();
});
renderCoach();

function renderHistory(attempts) {
  const rows = attempts.slice().sort((a, b) => Date.parse(b.finishedAt) - Date.parse(a.finishedAt)).map((attempt) => {
    const row = document.createElement('li');
    row.textContent = dateFormat.format(new Date(attempt.finishedAt)) + ' · ' + score(attempt.answers) + ' / ' + questions.length + ' 問正解';
    return row;
  });
  select('history').replaceChildren(...rows);
  if (!rows.length) select('status').textContent = '保存された履歴はありません。';
}

function refresh() {
  try {
    select('status').textContent = '';
    renderProgress(load());
  } catch {
    select('download').disabled = true;
    select('status').textContent = 'ブラウザの履歴を読み込めませんでした。';
  }
}

function renderReview(container, question, selected) {
  const heading = (text) => {
    const element = document.createElement('h4');
    element.textContent = text;
    return element;
  };
  const sentence = document.createElement('p');
  sentence.lang = 'en';
  sentence.textContent = question.stem?.replace('_____', question.choices[question.answer]) ?? '';
  const translation = document.createElement('p');
  translation.textContent = question.translation;
  const options = document.createElement('ul');
  question.choices.forEach((choice, index) => {
    const row = document.createElement('li');
    const label = document.createElement('strong');
    const term = document.createElement('span');
    term.lang = 'en';
    term.textContent = choice;
    label.append(letter(index) + '. ', term, index === question.answer ? '（正解）' : '（不正解）');
    if (index === selected) label.append('・あなたの回答');
    const explanation = document.createElement('div');
    explanation.textContent = question.choiceNotes[index];
    row.append(label);
    if (question.choiceTranslations) {
      const meaning = document.createElement('div');
      meaning.textContent = question.choiceTranslations[index];
      row.append(meaning);
    }
    row.append(explanation);
    options.append(row);
  });
  const vocabulary = document.createElement('dl');
  for (const [word, meaning] of question.vocabulary) {
    const term = document.createElement('dt');
    term.lang = 'en';
    term.textContent = word;
    const definition = document.createElement('dd');
    definition.textContent = meaning;
    vocabulary.append(term, definition);
  }
  const translationTitle = question.stem?.includes('_____')
    ? '完成文と日本語訳' : '設問と日本語訳';
  container.replaceChildren(heading(translationTitle));
  if (sentence.textContent) container.append(sentence);
  container.append(translation, heading('選択肢の解説'), options, heading('単語・熟語'), vocabulary);
}

select('items').innerHTML = questions.map((question, index) =>
  '<fieldset><legend>問題 ' + (index + 1) + '</legend><p lang="en">' + question.stem + '</p>' +
  question.choices.map((choice, option) => '<label lang="en"><input type="radio" required name="q' + index +
    '" value="' + option + '"> ' + letter(option) + '. ' + choice + '</label>').join('') +
  '<div class="answer-review" hidden id="explanation-' + index + '"></div>' +
  '<button hidden class="word-action" type="button" id="word-' + index + '" aria-label="' + question.term + ' を単語帳に追加">単語帳に追加</button></fieldset>').join('');

questions.forEach((question, index) => {
  select('word-' + index).addEventListener('click', (event) => {
    if (addWord(question.term, question.meaning)) {
      event.currentTarget.textContent = '単語帳に登録済み';
      event.currentTarget.removeAttribute('aria-label');
      event.currentTarget.disabled = true;
    }
  });
});

select('exam').addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const answers = questions.map((_, index) => Number(formData.get('q' + index)));
  mood = score(answers) === questions.length ? 1 : 2;
  renderCoach();
  select('result').textContent = score(answers) + ' / ' + questions.length + ' 問正解';
  questions.forEach((question, index) => {
    const explanation = select('explanation-' + index);
    renderReview(explanation, question, answers[index]);
    explanation.hidden = false;
    select('word-' + index).hidden = false;
  });
  try {
    const progress = load();
    progress.attempts.push({ id: crypto.randomUUID(), examId, revision, finishedAt: new Date().toISOString(), answers });
    save(progress);
    renderProgress(progress);
    select('status').textContent = '採点結果を保存しました。';
  } catch {
    select('status').textContent = '採点結果を保存できませんでした。';
  }
});

select('download').addEventListener('click', () => {
  try {
    const blob = new Blob([JSON.stringify({ version: 1, ...load() }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'toeic-history.json';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } catch {
    select('status').textContent = '履歴を書き出せませんでした。';
  }
});

select('upload').addEventListener('change', async (event) => {
  const input = event.currentTarget;
  const file = input.files[0];
  if (!file) return;
  try {
    const incoming = validate(JSON.parse(await file.text()));
    const progress = load();
    const known = new Set(progress.attempts.map(({ id }) => id));
    const knownWords = new Set(progress.words.map(({ term }) => wordKey(term)));
    const additions = incoming.attempts.filter(({ id }) => !known.has(id));
    const words = incoming.words.filter(({ term }) => !knownWords.has(wordKey(term)));
    progress.attempts.push(...additions);
    progress.words.push(...words);
    save(progress);
    renderProgress(progress);
    select('status').textContent = '履歴' + additions.length + '件、単語' + words.length + '件を追加しました。';
  } catch {
    select('status').textContent = '履歴を読み込めませんでした。書き出したJSONファイルを選んでください。';
  } finally {
    input.value = '';
  }
});

window.addEventListener('storage', (event) => {
  if (event.key === key || event.key === null) refresh();
});
refresh();

const placementQuestions = [
  {skill: 0,
    translation: "ロビーは塗装中なので、脇の入口を使ってください。",
    choiceNotes: [
      "During は「〜の間に」を表す前置詞です。during the painting のように名詞句なら続けられますが、ここには主語と動詞を含む節が続きます。",
      "Because は理由を表す接続詞で、the lobby is being painted という節を導きます。ロビーの塗装が脇の入口を使う理由という関係になります。",
      "Despite は「〜にもかかわらず」を表す前置詞です。後続の節を直接導けず、塗装が理由であるという関係にも合いません。",
      "Within は「〜以内に」を表す前置詞です。within an hour のような期間なら続けられますが、この文の後続部分は理由となる節です。"
    ],
    vocabulary: [["lobby", "ロビー"], ["be being painted", "塗装されている最中である"], ["side entrance", "脇の入口"]],
    stem: '_____ the lobby is being painted, please use the side entrance.', choices: ['During', 'Because', 'Despite', 'Within'], answer: 1},
  {skill: 1,
    translation: "マネージャーは昨日、更新された日程を承認しました。",
    choiceNotes: [
      "approve は原形です。主語 The manager に続く肯定文の述語として、yesterday が示す完了した過去の行為には過去形が必要です。",
      "approves は三人称単数現在形です。主語の人称・数には合いますが、yesterday が示す過去の時点に合いません。",
      "approved は approve の過去形です。yesterday が示す過去の承認という一回の出来事を表します。",
      "approving は -ing 形です。was approving のように助動詞相当の be 動詞が伴えば述語になりますが、ここにはありません。"
    ],
    vocabulary: [["approve", "承認する"], ["updated schedule", "更新された日程"], ["yesterday", "昨日"]],
    stem: 'The manager _____ the updated schedule yesterday.', choices: ['approve', 'approves', 'approved', 'approving'], answer: 2},
  {skill: 2,
    translation: "修理代を支払った証明として、領収書を保管してください。",
    choiceNotes: [
      "receipt は「領収書」です。修理代の支払いを証明する書類なので、as proof that you paid という目的に一致します。",
      "departure は「出発」です。時刻や出発便には関係しますが、修理代を支払った証明として保管するものではありません。",
      "appointment は「予約・面会の約束」です。修理の予約があっても、代金をすでに支払った証明にはなりません。",
      "equipment は「機器・備品」です。修理の対象にはなり得ますが、支払いの証拠として保管する書類を指しません。"
    ],
    vocabulary: [["receipt", "領収書"], ["as proof", "証明として"], ["pay for repairs", "修理代を支払う"]],
    stem: 'Please keep your _____ as proof that you paid for the repairs.', choices: ['receipt', 'departure', 'appointment', 'equipment'], answer: 0},
  {skill: 0,
    translation: "雨にもかかわらず、屋外コンサートは予定どおり行われました。",
    choiceNotes: [
      "although は「〜だけれども」を表す接続詞です。although it was raining のような節が必要で、the rain という名詞句を直接取りません。",
      "because は理由を表す接続詞です。because of the rain なら名詞句を取れますが、この文に of はなく、必要なのは雨を押して開催したという意味です。",
      "unless は「〜でない限り」を表す接続詞です。条件を示す節を導くため、the rain を直接取らず、ここでの逆接にも合いません。",
      "despite は「〜にもかかわらず」を表す前置詞です。the rain を取り、雨という不利な状況でも開催したことを表します。"
    ],
    vocabulary: [["outdoor concert", "屋外コンサート"], ["go ahead", "予定どおり行われる"], ["despite", "〜にもかかわらず"]],
    stem: 'The outdoor concert went ahead _____ the rain.', choices: ['although', 'because', 'unless', 'despite'], answer: 3},
  {skill: 1,
    translation: "来客が到着したときには、スタッフは部屋の準備を終えていました。",
    choiceNotes: [
      "finish は原形です。過去の到着を基準にする文で、すでに準備を終えていたことを表せません。",
      "will finish は未来形です。未来の完了予定を表し、guests arrived という過去の基準時点に合いません。",
      "had finished は過去完了です。来客の到着より前に準備を終えたという、二つの過去の出来事の順序を示します。",
      "are finishing は現在進行形です。現在進行中という意味になり、過去の到着時には準備済みだったことを表せません。"
    ],
    vocabulary: [["by the time", "〜するときまでに"], ["finish doing", "〜し終える"], ["set up the room", "部屋を準備する"]],
    stem: 'By the time the guests arrived, the staff _____ setting up the room.', choices: ['finish', 'will finish', 'had finished', 'are finishing'], answer: 2},
  {skill: 2,
    translation: "需要の増加に伴い、その会社は主力工場での生産を拡大する予定です。",
    choiceNotes: [
      "consult は「相談する・参照する」です。consult an adviser のように人や情報源を取りますが、生産量を増やす意味にはなりません。",
      "expand は「拡大する」です。expand production は生産規模を拡大するという意味で、需要増加への対応として自然です。",
      "deliver は「届ける」です。deliver goods なら商品を届ける意味ですが、工場での生産規模を広げる動作を表しません。",
      "mention は「言及する」です。生産について話題にすることは表せますが、需要増に応じて工場で生産する量を増やすという文脈に合いません。"
    ],
    vocabulary: [["demand", "需要"], ["expand production", "生産を拡大する"], ["main factory", "主力工場"]],
    stem: 'As demand grows, the company plans to _____ production at its main factory.', choices: ['consult', 'expand', 'deliver', 'mention'], answer: 1}
];
const profileKey = 'toeic.placement.v1';
const screens = [...document.querySelectorAll('.screen')];
let profile;
let diagnosticAnswers = [];
let placementReturn = 'welcome';

try {
  const saved = JSON.parse(localStorage.getItem(profileKey));
  if (saved?.answers?.length === placementQuestions.length && Array.isArray(saved.answers) &&
      saved.answers.every((answer, index) => Number.isInteger(answer) && answer >= 0 &&
        answer < placementQuestions[index].choices.length)) profile = saved;
} catch {
  // An unavailable or invalid profile starts the initial flow.
}

function showScreen(id, focus = true) {
  if (id !== 'study') select('study-audio').pause();
  if (id === 'menu' || id === 'preferences' || id === 'study') renderProfile();
  for (const screen of screens) screen.hidden = screen.id !== id;
  if (focus) {
    select(id).querySelector('h2').focus({preventScroll: true});
    window.scrollTo(0, 0);
  }
}

function placementResults() {
  const counts = questions.map((question) => ({skill: question.skill, correct: 0, total: 0}));
  placementQuestions.forEach(({skill, answer}, index) => {
    counts[skill].total++;
    if (answer === profile.answers[index]) counts[skill].correct++;
  });
  const focus = counts.reduce((weak, next, index) =>
    next.correct < counts[weak].correct ? index : weak, 0);
  return {
    counts,
    focus,
    total: counts.reduce((sum, item) => sum + item.correct, 0)
  };
}

function renderMenuCoach(result, scoreText) {
  const picker = select('coach');
  const coach = Number(picker.value);
  const fullMarks = result.total === placementQuestions.length;
  select('menu-coach').dataset.coach = String(coach);
  select('menu-profile').textContent = scoreText;
  select('menu-portrait').style.backgroundPosition = (fullMarks ? 50 : 100) + '% ' + (coach * 50) + '%';
  const dialogue = coachDialogue[coach];
  select('menu-message').textContent = fullMarks
    ? dialogue.menuChallenge
    : dialogue.menuReview(result.counts[result.focus].skill);
}

select('menu-cheer').addEventListener('click', () => {
  const coach = Number(select('coach').value);
  const message = select('menu-message');
  const dialogue = coachDialogue[coach];
  if (message.textContent === dialogue.menuCheer) {
    renderProfile();
    return;
  }
  select('menu-portrait').style.backgroundPosition = '50% ' + (coach * 50) + '%';
  message.textContent = dialogue.menuCheer;
});

function renderProfile() {
  if (!profile) return;
  const result = placementResults();
  const scoreText = '文法・語彙 ' + result.total + ' / ' + placementQuestions.length + ' 問正解';
  const advice = result.total === placementQuestions.length
    ? '次はミニ模試で確認しましょう。'
    : 'おすすめの復習 · ' + result.counts[result.focus].skill;
  renderMenuCoach(result, scoreText);
  select('saved-placement').textContent = scoreText;
  select('placement-score').textContent = scoreText;
  select('placement-tip').textContent = advice;
  const studyTip = select('study-tip');
  studyTip.hidden = result.total === placementQuestions.length;
  studyTip.textContent = 'おすすめの復習 · Part 5の「' + result.counts[result.focus].skill + '」';
  select('placement-breakdown').replaceChildren(...result.counts.map(({skill, correct, total}) => {
    const item = document.createElement('li');
    item.textContent = skill + ' · ' + correct + ' / ' + total;
    return item;
  }));
}

function renderSingleQuestion(id, question) {
  const fieldset = document.createElement('fieldset');
  const legend = document.createElement('legend');
  legend.lang = question.stem ? 'en' : 'ja';
  legend.textContent = question.stem || '音声を聞いて選択肢を選んでください。';
  fieldset.append(legend);
  question.choices.forEach((choice, index) => {
    const label = document.createElement('label');
    label.lang = 'en';
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'answer';
    radio.value = index;
    radio.required = true;
    label.append(radio, ' ' + letter(index) + (question.stem ? '. ' + choice : ''));
    fieldset.append(label);
  });
  select(id).replaceChildren(fieldset);
}

function showPlacementQuestion() {
  const index = diagnosticAnswers.length;
  select('placement-count').textContent = '問題 ' + (index + 1) + ' / ' + placementQuestions.length;
  select('placement-next').textContent = index + 1 === placementQuestions.length ? '結果を見る' : '次の問題';
  renderSingleQuestion('placement-item', placementQuestions[index]);
}

function startPlacement(returnTo) {
  placementReturn = returnTo;
  diagnosticAnswers = [];
  showPlacementQuestion();
  showScreen('placement');
}

for (const button of document.querySelectorAll('[data-partner]')) {
  button.addEventListener('click', () => {
    select('coach').value = button.dataset.partner;
    select('coach').dispatchEvent(new Event('change'));
    startPlacement('welcome');
  });
}
for (const button of document.querySelectorAll('[data-screen]')) {
  button.addEventListener('click', () => showScreen(button.dataset.screen));
}
select('retake').addEventListener('click', () => startPlacement('preferences'));
select('placement-back').addEventListener('click', () => showScreen(placementReturn));
select('placement-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const value = new FormData(event.currentTarget).get('answer');
  if (value === null) return;
  diagnosticAnswers.push(Number(value));
  if (diagnosticAnswers.length < placementQuestions.length) {
    showPlacementQuestion();
    select('placement-item').querySelector('input').focus();
    return;
  }

  profile = {answers: diagnosticAnswers.slice()};
  select('placement-save').textContent = '';
  try {
    localStorage.setItem(profileKey, JSON.stringify(profile));
  } catch {
    select('placement-save').textContent = 'このブラウザには診断結果を保存できませんでした。';
  }
  renderProfile();
  select('placement-reviews').replaceChildren(...placementQuestions.map((question, index) => {
    const details = document.createElement('details');
    details.className = 'answer-review';
    const summary = document.createElement('summary');
    summary.textContent = '問題 ' + (index + 1) + ' · ' + (profile.answers[index] === question.answer ? '正解' : '不正解');
    const review = document.createElement('div');
    renderReview(review, question, profile.answers[index]);
    details.append(summary, review);
    return details;
  }));
  showScreen('placement-result');
});

initializeFieldStudy({renderSingleQuestion, renderReview, addWord});
showScreen(profile ? 'menu' : 'welcome', false);
for (const button of document.querySelectorAll('[data-partner]')) button.disabled = false;
select('startup-notice').hidden = true;

const offlineStatus = select('offline-status');
const offlineReset = select('offline-reset');

function sendOfflineCommand(worker, command) {
  return new Promise((resolve, reject) => {
    const channel = new MessageChannel();
    const timeout = setTimeout(() => {
      channel.port1.close();
      reject(new Error('Service worker did not respond.'));
    }, 15000);
    channel.port1.onmessage = ({ data }) => {
      clearTimeout(timeout);
      channel.port1.close();
      resolve(data);
    };
    worker.postMessage(command, [channel.port2]);
  });
}

if ('serviceWorker' in navigator && 'caches' in window) {
  const workers = navigator.serviceWorker;

  async function showOfflineStatus() {
    if (!workers.controller || offlineReset.dataset.busy) return;
    offlineReset.disabled = false;
    try {
      const { ready } = await sendOfflineCommand(workers.controller, 'offline-status');
      if (offlineReset.dataset.busy) return;
      offlineStatus.textContent = ready
        ? 'オフラインで利用できます。'
        : 'キャッシュがありません。接続して再取得してください。';
    } catch {
      offlineStatus.textContent = 'オフラインの準備状況を確認できませんでした。';
    }
  }

  workers.addEventListener('controllerchange', showOfflineStatus);
  workers.register('./sw.js', { updateViaCache: 'none' }).then(showOfflineStatus).catch(() => {
    offlineStatus.textContent = 'オフラインの準備に失敗しました。接続してページを開き直してください。';
  });

  offlineReset.addEventListener('click', async () => {
    const worker = workers.controller;
    if (!worker) return;
    offlineReset.disabled = true;
    offlineReset.dataset.busy = 'true';
    offlineStatus.textContent = 'キャッシュを削除し、ページを再取得しています。学習履歴は保持されます。';
    try {
      const { ready, deleted } = await sendOfflineCommand(worker, 'offline-reset');
      offlineStatus.textContent = ready
        ? '再取得しました。次にページを開くと反映されます。オフラインで利用できます。'
        : deleted
          ? 'キャッシュを削除しました。オフライン利用を再開するには、接続して再取得してください。'
          : 'キャッシュを削除できませんでした。';
    } catch {
      offlineStatus.textContent = 'キャッシュの処理結果を確認できませんでした。';
    } finally {
      delete offlineReset.dataset.busy;
      offlineReset.disabled = false;
    }
  });
} else {
  offlineStatus.textContent = 'この環境はオフライン保存に対応していません。';
}
