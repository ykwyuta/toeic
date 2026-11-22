'use strict';
const questions = [
  {
    stem: 'The warehouse will remain closed _____ the safety inspection is complete.',
    choices: ['during', 'until', 'despite', 'within'],
    answer: 1,
    skill: '接続詞と前置詞',
    term: 'until', meaning: '〜するまで',
    explanation: 'until は「〜するまで」を表し、後ろの主語と動詞を含む節を取れます。during・despite・within はこの位置でその節を直接取れません。'
  },
  {
    stem: 'Please _____ the conference room by noon if you need it for tomorrow’s workshop.',
    choices: ['reservation', 'reserved', 'reserving', 'reserve'],
    answer: 3,
    skill: '動詞の形',
    term: 'reserve', meaning: '予約する・確保する',
    explanation: 'Please に続く命令文には動詞の原形 reserve が入ります。reservation は名詞、reserved は過去形・過去分詞、reserving は -ing 形です。'
  },
  {
    stem: 'We have extended the registration _____ to give applicants more time to submit their forms.',
    choices: ['deadline', 'receipt', 'summary', 'fee'],
    answer: 0,
    skill: '語彙と文脈',
    term: 'deadline', meaning: '締め切り',
    explanation: '提出時間を増やすために延長するものは deadline（締め切り）です。receipt は領収書、summary は要約、fee は料金で、いずれも提出期限を表しません。'
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
      ? '技能別の正答率を表示します。各技能で3回答以上たまると復習候補を判定します。'
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

const coachMessages = [
  ['今日は一緒に3問。気軽に始めよう。', '全問正解！この調子でいこう！', '間違えた問題は伸びしろ。解説を一緒に見よう。'],
  ['まずは1問。根拠を意識して解こう。', '全問正解。着実に力がついている。', '惜しい。迷った選択肢との差を一つだけ確認しよう。'],
  ['にゃ。まずは肩の力を抜いて3問。', '全問正解にゃ！今日は花丸。', 'ひと息ついて、間違えたところを見直すにゃ。']
];
let mood = 0;
const coachKey = 'toeic.coach.v1';
function renderCoach() {
  const coach = Number(select('coach').value);
  select('coach-portrait').style.backgroundPosition = (mood * 50) + '% ' + (coach * 50) + '%';
  const message = coachMessages[coach][mood];
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

select('items').innerHTML = questions.map((question, index) =>
  '<fieldset><legend>問題 ' + (index + 1) + '</legend><p lang="en">' + question.stem + '</p>' +
  question.choices.map((choice, option) => '<label lang="en"><input type="radio" required name="q' + index +
    '" value="' + option + '"> ' + letter(option) + '. ' + choice + '</label>').join('') +
  '<p hidden id="explanation-' + index + '"></p>' +
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
    explanation.textContent = '正答 ' + letter(question.answer) + '。' + question.explanation;
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
  {skill: 0, stem: '_____ the lobby is being painted, please use the side entrance.', choices: ['During', 'Because', 'Despite', 'Within'], answer: 1},
  {skill: 1, stem: 'The manager _____ the updated schedule yesterday.', choices: ['approve', 'approves', 'approved', 'approving'], answer: 2},
  {skill: 2, stem: 'Please keep your _____ as proof that you paid for the repairs.', choices: ['receipt', 'departure', 'appointment', 'equipment'], answer: 0},
  {skill: 0, stem: 'The outdoor concert went ahead _____ the rain.', choices: ['although', 'because', 'unless', 'despite'], answer: 3},
  {skill: 1, stem: 'By the time the guests arrived, the staff _____ setting up the room.', choices: ['finish', 'will finish', 'had finished', 'are finishing'], answer: 2},
  {skill: 2, stem: 'As demand grows, the company plans to _____ production at its main factory.', choices: ['consult', 'expand', 'deliver', 'mention'], answer: 1}
];
const practiceQuestions = [
  {...questions[0], stem: 'Please leave your badge at reception _____ you exit the building.', choices: ['during', 'before', 'despite', 'regarding'], term: 'before', meaning: '〜する前に', explanation: 'before は時を表す接続詞として主語と動詞を含む節を導けます。'},
  {...questions[1], stem: 'The director agreed to _____ the contract before Friday.', choices: ['renewal', 'renews', 'renewed', 'renew'], term: 'renew', meaning: '更新する', explanation: 'agree to の後ろには動詞の原形が入り、renew the contract で「契約を更新する」です。'},
  {...questions[2], stem: 'The supplier sent a revised _____ showing the amount we owe.', choices: ['invoice', 'itinerary', 'inventory', 'application'], term: 'invoice', meaning: '請求書', explanation: '支払うべき金額を記載した文書は invoice（請求書）です。'}
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

const menuEncouragement = [
  ['一緒に、できるところから始めよう！', '全問正解、おめでとう！次の3問にも挑戦してみよう。'],
  ['一問ずつ、根拠を確かめていこう。', 'いい調子だ。ミニ模試でも力を試してみよう。'],
  ['モカと一緒に、まずは1問やってみるにゃ。', '全問正解にゃ！次はミニ模試に挑戦するにゃ。']
];

function renderMenuCoach(result, scoreText) {
  const picker = select('coach');
  const coach = Number(picker.value);
  const fullMarks = result.total === placementQuestions.length;
  select('menu-coach-name').textContent = picker.selectedOptions[0].textContent;
  select('menu-profile').textContent = scoreText;
  select('menu-portrait').style.backgroundPosition = (fullMarks ? 50 : 100) + '% ' + (coach * 50) + '%';
  select('menu-message').textContent = menuEncouragement[coach][Number(fullMarks)] +
    (fullMarks ? '' : '「分野学習」で「' + result.counts[result.focus].skill + '」から復習できます。');
}

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
  select('study-tip').textContent = advice;
  select('placement-breakdown').replaceChildren(...result.counts.map(({skill, correct, total}) => {
    const item = document.createElement('li');
    item.textContent = skill + ' · ' + correct + ' / ' + total;
    return item;
  }));
}

function renderSingleQuestion(id, question) {
  const fieldset = document.createElement('fieldset');
  const legend = document.createElement('legend');
  legend.lang = 'en';
  legend.textContent = question.stem;
  fieldset.append(legend);
  question.choices.forEach((choice, index) => {
    const label = document.createElement('label');
    label.lang = 'en';
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'answer';
    radio.value = index;
    radio.required = true;
    label.append(radio, ' ' + letter(index) + '. ' + choice);
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
  select('study-skill').value = String(placementResults().focus);
  renderSkillQuestion();
  renderProfile();
  showScreen('placement-result');
});

for (const [index, question] of practiceQuestions.entries()) {
  const option = document.createElement('option');
  option.value = index;
  option.textContent = question.skill;
  select('study-skill').append(option);
}

function selectedSkillQuestion() {
  return practiceQuestions[Number(select('study-skill').value)];
}

function renderSkillQuestion() {
  renderSingleQuestion('skill-item', selectedSkillQuestion());
  select('skill-feedback').textContent = '';
  select('skill-word').hidden = true;
}

select('study-skill').addEventListener('change', renderSkillQuestion);
select('skill-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const selected = new FormData(event.currentTarget).get('answer');
  if (selected === null) return;
  const question = selectedSkillQuestion();
  select('skill-feedback').textContent = (Number(selected) === question.answer ? '正解。' : '正答 ' + letter(question.answer) + '。') + question.explanation;
  select('skill-word').hidden = false;
});
select('skill-word').addEventListener('click', () => {
  const {term, meaning} = selectedSkillQuestion();
  addWord(term, meaning);
});

select('study-skill').value = String(profile ? placementResults().focus : 0);
renderSkillQuestion();
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
