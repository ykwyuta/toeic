'use strict';

const $ = (selector) => document.querySelector(selector);
// Each exam keeps its own versioned release directory; ?exam= selects one.
const releases = {
  l01: { path: './r1/', title: '第1回' },
  l02: { path: './l02/r1/', title: '第2回' },
};
const examKey = Object.hasOwn(releases, new URLSearchParams(location.search).get('exam'))
  ? new URLSearchParams(location.search).get('exam') : 'l01';
const releasePath = releases[examKey].path;
const audio = $('#exam-audio');
const reviewAudio = $('#review-audio');
const answers = new Map();
let exam;
let sets;
let items;
let viewed = 0;
let playingSet = 0;
let mode = 'setup';

function node(tag, text, attributes = {}) {
  const element = document.createElement(tag);
  if (text !== undefined) element.textContent = text;
  for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, value);
  return element;
}

function labelFor(set) {
  const start = set.items[0].number;
  const end = set.items.at(-1).number;
  return `Part ${set.part} · ${start === end ? `第${start}問` : `第${start}〜${end}問`}`;
}

function fillSelector(selector) {
  $(selector).replaceChildren(...sets.map(
    (set, index) => node('option', labelFor(set), { value: index })
  ));
}

function displayTime(ms) {
  const seconds = Math.floor(ms / 1000);
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}

async function loadExam() {
  try {
    const response = await fetch(releasePath + 'exam.json');
    if (!response.ok) throw new Error('Missing exam');
    exam = await response.json();
    sets = exam.parts.flatMap(({ sets }) => sets);
    items = sets.flatMap(({ items }) => items);
    audio.src = releasePath + exam.media.audio.src;
    fillSelector('#set-select');
    fillSelector('#review-select');
    const partNumbers = exam.parts.map(({ part }) => part);
    const hasPhotos = sets.some((set) => set.media.photo);
    $('#exam-summary').textContent = `TOEIC L&R 非公式教材 · ${releases[examKey].title} · Part ${partNumbers[0]}〜${partNumbers.at(-1)} · ${items.length}問`;
    $('#material-note').textContent = `${hasPhotos ? '写真と図表' : '図表'}は画面に表示します。Part ${partNumbers[0]}${partNumbers[0] < 2 ? '・2' : ''}の英文は音声で聞いて解答してください。採点後に台本と日本語訳を確認できます。`;
    if (!hasPhotos) $('#material-note').textContent += 'この回は写真描写問題（Part 1）を含まず、第7問から始まります。';
    $('#instructions').textContent = `音声は約${Math.round(exam.media.audio.durationMs / 60000)}分です。再生に使う音量を確認してから始めてください。音声は米語・英語の4話者です。`;
    $('#start').disabled = false;
  } catch {
    $('#instructions').textContent = '問題を読み込めません。静的サイトの配信URLで開き、ページを再読み込みしてください。';
  }
}

function appendMaterial(parent, set, includeJapanese) {
  const { photo, table } = set.media;
  if (photo) {
    const description = includeJapanese ? photo.descriptionJa : photo.altJa;
    parent.append(node('img', undefined, {
      class: 'photo', src: releasePath + photo.src, alt: description, width: 1200, height: 800,
    }));
    if (includeJapanese) parent.append(node('p', photo.descriptionJa));
  }
  if (table) {
    const wrapper = node('div', undefined, { class: 'table-wrap' });
    const element = node('table', undefined, { lang: includeJapanese ? 'ja' : 'en' });
    element.append(node('caption', includeJapanese ? `${table.title}（${table.translationJa}）` : table.title));
    const head = node('thead');
    const body = node('tbody');
    element.append(head, body);
    table.rows.forEach((row, rowIndex) => {
      const tr = node('tr');
      for (const cell of row) {
        tr.append(node(rowIndex ? 'td' : 'th',
          includeJapanese ? `${cell.text}（${cell.translationJa}）` : cell.text,
          rowIndex ? {} : { scope: 'col' }));
      }
      (rowIndex ? body : head).append(tr);
    });
    wrapper.append(element);
    parent.append(wrapper);
  }
}

function updateAnswered() {
  $('#answered').textContent = `解答済み ${answers.size} / ${items.length}問`;
}

function showSet(index, focus = false) {
  viewed = index;
  const set = sets[index];
  const heading = node('h3', labelFor(set), { tabindex: '-1' });
  const questions = $('#questions');
  questions.replaceChildren(heading);
  appendMaterial(questions, set, false);
  for (const item of set.items) {
    const fieldset = node('fieldset');
    const title = node('legend', item.stem ? `${item.number}. ${item.stem}` : `第${item.number}問`,
      item.stem ? { lang: 'en' } : {});
    const choices = node('div', undefined, item.stem ? { lang: 'en' } : { class: 'letters' });
    for (const choice of item.choices) {
      const radio = node('input', undefined, { type: 'radio', name: item.id, value: choice.id });
      radio.checked = answers.get(item.id) === choice.id;
      radio.addEventListener('change', () => {
        answers.set(item.id, choice.id);
        updateAnswered();
      });
      const option = node('label', undefined, { class: 'option' });
      option.append(radio, node('span', item.stem ? `${choice.id}. ${choice.text}` : choice.id));
      choices.append(option);
    }
    fieldset.append(title, choices);
    questions.append(fieldset);
  }
  $('#set-select').value = index;
  $('#previous').disabled = index === 0;
  $('#next').disabled = index === sets.length - 1;
  if (focus) heading.focus();
}

function syncAudio() {
  if (mode !== 'exam') return;
  const elapsed = audio.currentTime * 1000;
  while (playingSet < sets.length - 1 && elapsed >= sets[playingSet + 1].media.audio.startMs) {
    playingSet += 1;
  }
  if (viewed !== playingSet && playingSet !== lastReportedSet) showSet(playingSet);
  const label = labelFor(sets[playingSet]);
  const status = audio.ended ? '音声が終了しました。解答を確認して提出してください。' :
    audio.paused ? `${label} · 一時停止中` : `${label} · 再生中`;
  if ($('#play-status').textContent !== status) $('#play-status').textContent = status;
  $('#play-time').textContent = `${displayTime(elapsed)} / ${displayTime(exam.media.audio.durationMs)}`;
  $('#play-toggle').textContent = audio.paused ? '音声の再生を再開' : '音声を一時停止';
  $('#play-toggle').disabled = audio.ended;
  lastReportedSet = playingSet;
}

let lastReportedSet = -1;

async function play() {
  try {
    if (audio.error) {
      const resumeAt = audio.currentTime;
      audio.load();
      if (resumeAt > 0) audio.currentTime = resumeAt;
    }
    await audio.play();
  } catch {
    if (mode === 'exam') $('#play-status').textContent = '音声を再生できません。接続を確認して再開を押してください。';
  }
}

function start() {
  answers.clear();
  mode = 'exam';
  playingSet = 0;
  lastReportedSet = -1;
  audio.currentTime = 0;
  reviewAudio.pause();
  $('#setup').hidden = true;
  $('#results').hidden = true;
  $('#review').hidden = true;
  $('#exercise').hidden = false;
  showSet(0);
  updateAnswered();
  syncAudio();
  $('#exercise-title').focus();
  void play();
}

function showReview(index) {
  const set = sets[index];
  reviewAudio.src = releasePath + set.media.audio.src;
  const content = $('#review-content');
  content.replaceChildren(node('h3', labelFor(set)));
  appendMaterial(content, set, true);
  if (set.passages.length) {
    const transcript = node('details');
    transcript.open = true;
    transcript.append(node('summary', '音声台本と日本語訳'));
    const turns = node('ol');
    for (const line of set.passages) {
      const turn = node('li');
      turn.append(node('p', line.spokenText, { lang: 'en' }), node('p', line.translationJa));
      turns.append(turn);
    }
    transcript.append(turns);
    content.append(transcript);
  }
  for (const item of set.items) {
    const review = node('details');
    review.open = true;
    const selected = answers.get(item.id);
    review.append(node('summary', `第${item.number}問 · 正答 ${item.answerId} · 回答 ${selected ?? '未回答'}`));
    if (item.stem) {
      review.append(node('p', item.stem, { lang: 'en' }), node('p', item.translationJa.stem));
    }
    review.append(node('p', item.explanationJa));
    const choices = node('ul');
    for (const choice of item.choices) {
      const row = node('li');
      row.append(node('strong', `${choice.id}. ${choice.text}`, { lang: 'en' }),
        node('div', item.translationJa.choices[choice.id]), node('div', item.choiceExplanationsJa[choice.id]));
      choices.append(row);
    }
    review.append(node('h4', '選択肢の訳と解説'), choices);
    const vocabulary = node('dl');
    for (const { term, meaningJa } of item.vocabulary) {
      vocabulary.append(node('dt', term, { lang: 'en' }), node('dd', meaningJa));
    }
    review.append(node('h4', '単語・熟語'), vocabulary);
    content.append(review);
  }
}

function countCorrect(list) {
  return list.filter((item) => answers.get(item.id) === item.answerId).length;
}

function finish() {
  mode = 'review';
  audio.pause();
  $('#exercise').hidden = true;
  $('#results').hidden = false;
  $('#review').hidden = false;
  $('#score-title').textContent = `リスニング ${countCorrect(items)} / ${items.length}問正解`;
  $('#scores').replaceChildren(...exam.parts.map(({ part, sets }) => {
    const partItems = sets.flatMap(({ items }) => items);
    return node('li', `Part ${part} · ${countCorrect(partItems)} / ${partItems.length}問正解`);
  }));
  if (globalThis.toeicAdaptive) {
    const nowIso = new Date().toISOString();
    const entries = exam.parts.flatMap(({ part, sets }) =>
      sets.flatMap((set) =>
        set.items.map((item) => ({
          itemId: item.id,
          setId: set.setId,
          part,
          skill: item.skill || ('Part ' + part),
          difficulty: item.difficulty || 'medium',
          isCorrect: answers.get(item.id) === item.answerId,
          answeredAt: nowIso,
          mode: 'listening'
        }))
      )
    );
    globalThis.toeicAdaptive.recordItemResults(entries);
  }
  const firstIncorrect = sets.findIndex(({ items }) => countCorrect(items) < items.length);
  const index = Math.max(firstIncorrect, 0);
  $('#review-select').value = index;
  showReview(index);
  $('#score-title').focus();
}

$('#start').addEventListener('click', start);
$('#restart').addEventListener('click', () => {
  mode = 'setup';
  reviewAudio.pause();
  $('#results').hidden = true;
  $('#review').hidden = true;
  $('#setup').hidden = false;
  $('#start').focus();
});
$('#finish').addEventListener('click', finish);
$('#previous').addEventListener('click', () => showSet(viewed - 1, true));
$('#next').addEventListener('click', () => showSet(viewed + 1, true));
$('#set-select').addEventListener('change', (event) => showSet(Number(event.target.value)));
$('#review-select').addEventListener('change', (event) => showReview(Number(event.target.value)));
$('#play-toggle').addEventListener('click', () => {
  if (audio.paused) void play();
  else audio.pause();
});
for (const event of ['timeupdate', 'play', 'pause', 'ended']) audio.addEventListener(event, syncAudio);
audio.addEventListener('error', () => {
  if (mode === 'exam') $('#play-status').textContent = '音声の読み込みが中断されました。接続を確認して再開してください。';
});

for (const link of document.querySelectorAll('#exam-switch a')) {
  if (link.dataset.exam === examKey) link.setAttribute('aria-current', 'page');
}
void loadExam();
