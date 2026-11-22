'use strict';

(async function () {
  const $ = (id) => document.getElementById(id);
  const statusEl = $('load-status');
  const setSelect = $('set-select');
  const container = $('set-container');
  let sets = [];
  let currentIndex = 0;

  try {
    const res = await fetch('./r1/exam.json');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const exam = await res.json();
    sets = exam.parts.flatMap((p) => p.sets);
  } catch {
    statusEl.textContent = '問題データを読み込めませんでした。ページを再読み込みしてください。';
    return;
  }

  sets.forEach((s, idx) => {
    const firstNum = s.items[0].number;
    const lastNum = s.items[s.items.length - 1].number;
    setSelect.add(new Option(`セット ${idx + 1}（Q${firstNum}–Q${lastNum}）`, String(idx)));
  });

  const requestedSet = new URLSearchParams(location.search).get('set');
  if (requestedSet) {
    const foundIdx = sets.findIndex((s) => s.setId === requestedSet);
    if (foundIdx >= 0) currentIndex = foundIdx;
  }

  function renderSet(index) {
    currentIndex = Math.max(0, Math.min(sets.length - 1, index));
    setSelect.value = String(currentIndex);
    $('prev-set').disabled = currentIndex === 0;
    $('next-set').disabled = currentIndex === sets.length - 1;

    const s = sets[currentIndex];
    const media = s.media[0];
    const passage = s.passages[0];

    const img = $('set-image');
    img.src = './r1/' + media.src;
    img.alt = media.altJa;

    $('doc-title').textContent = passage.title || '';
    $('doc-text').textContent = passage.text;
    $('doc-ja').textContent = '【日本語訳】' + passage.translationJa;
    $('doc-ja').hidden = true;
    $('set-score').textContent = '';

    const qWrap = $('set-questions');
    qWrap.replaceChildren(...s.items.map((item) => {
      const fs = document.createElement('fieldset');
      const legend = document.createElement('legend');
      legend.lang = 'en';
      legend.textContent = `Q${item.number}. ${item.stem}`;
      fs.append(legend);

      item.choices.forEach((c) => {
        const label = document.createElement('label');
        label.lang = 'en';
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = item.id;
        input.value = c.id;
        input.required = true;
        label.append(input, ` ${c.id}. ${c.text}`);
        fs.append(label);
      });

      const rev = document.createElement('div');
      rev.className = 'review-box';
      rev.id = 'rev-' + item.id;
      rev.hidden = true;
      fs.append(rev);
      return fs;
    }));

    container.hidden = false;
  }

  $('set-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const s = sets[currentIndex];
    const data = new FormData(event.currentTarget);
    let correct = 0;
    const nowIso = new Date().toISOString();
    const logEntries = [];

    for (const item of s.items) {
      const picked = data.get(item.id);
      const isCorrect = picked === item.answerId;
      if (isCorrect) correct++;

      logEntries.push({
        itemId: item.id,
        setId: s.setId,
        part: 7,
        skill: item.skill,
        difficulty: item.difficulty || 'medium',
        isCorrect,
        answeredAt: nowIso,
        mode: 'reading-visual'
      });

      const rev = $('rev-' + item.id);
      const head = document.createElement('p');
      head.className = isCorrect ? 'status-ok' : 'status-ng';
      head.textContent = isCorrect ? `正解（${item.answerId}）` : `不正解（あなたの回答: ${picked} / 正答: ${item.answerId}）`;

      const stemJa = document.createElement('p');
      stemJa.textContent = '設問訳: ' + item.translationJa.stem;

      const ul = document.createElement('ul');
      item.choices.forEach((c) => {
        const li = document.createElement('li');
        li.textContent = `${c.id}. ${c.text}（${item.translationJa.choices[c.id]}）: ${item.choiceExplanationsJa[c.id]}`;
        ul.append(li);
      });

      rev.replaceChildren(head, stemJa, ul);
      rev.hidden = false;
    }

    $('doc-ja').hidden = false;
    $('set-score').textContent = `このセットの結果: ${correct} / ${s.items.length} 問正解（学習履歴・苦手分析に反映しました）`;

    if (globalThis.toeicAdaptive) {
      globalThis.toeicAdaptive.recordItemResults(logEntries);
    }
  });

  setSelect.addEventListener('change', () => renderSet(Number(setSelect.value)));
  $('prev-set').addEventListener('click', () => renderSet(currentIndex - 1));
  $('next-set').addEventListener('click', () => renderSet(currentIndex + 1));

  renderSet(currentIndex);
})();
