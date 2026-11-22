'use strict';

function initializeFieldStudy({renderSingleQuestion, renderReview, onAnswer}) {
  const get = (id) => document.getElementById(id);
  const parts = globalThis.toeicStudyBank?.parts;
  if (!parts) {
    const notice = get('study-load-status');
    notice.textContent = '練習問題を読み込めませんでした。ページを再読み込みしてください。';
    notice.hidden = false;
    return;
  }

  const partPicker = get('study-part');
  const skillPicker = get('study-skill');
  const audio = get('study-audio');
  const audioStatus = get('study-audio-status');
  const review = get('skill-review');
  const feedback = get('skill-feedback');

  function element(tag, text, lang) {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (lang) node.lang = lang;
    return node;
  }

  function renderMaterials(container, exercise, completedWith = null) {
    const reviewing = completedWith !== null;
    const {photo, table} = exercise.media;
    if (photo && !reviewing) {
      const image = element('img');
      image.className = 'exercise-photo';
      image.src = './' + photo.src;
      image.alt = photo.altJa;
      image.width = 1200;
      image.height = 800;
      container.append(image);
    }
    if (table) {
      const tableWrap = element('div');
      tableWrap.className = 'exercise-table';
      const grid = element('table');
      const caption = element('caption', table.caption, 'en');
      if (reviewing) caption.append('（', element('span', table.translationJa, 'ja'), '）');
      const head = element('thead');
      const body = element('tbody');
      table.rows.forEach((row, rowIndex) => {
        const tr = element('tr');
        row.forEach((cell) => {
          const td = element(rowIndex ? 'td' : 'th');
          if (!rowIndex) td.scope = 'col';
          td.append(element('span', cell.text, 'en'));
          if (reviewing) td.append('（', element('span', cell.translationJa, 'ja'), '）');
          tr.append(td);
        });
        (rowIndex ? body : head).append(tr);
      });
      grid.append(caption, head, body);
      tableWrap.append(grid);
      container.append(tableWrap);
    }
    for (const passage of exercise.passages) {
      if (passage.type !== 'document' && !reviewing) continue;
      const english = passage.text ?? passage.spokenText;
      const block = element('div');
      block.className = 'exercise-document';
      block.append(element('div', reviewing ? english.replace('_____', completedWith) : english, 'en'));
      if (reviewing) block.append(element('p', passage.translationJa, 'ja'));
      container.append(block);
    }
  }

  function selectedPart() {
    return parts.find(({part}) => String(part) === partPicker.value);
  }

  function selectedExercise() {
    return selectedPart()?.sets.find(({setId}) => setId === skillPicker.value);
  }

  function reviewQuestion(item) {
    const choices = item.choices.map(({text}) => text);
    return {
      stem: item.stem,
      choices,
      answer: item.choices.findIndex(({id}) => id === item.answerId),
      translation: item.translationJa.stem,
      choiceTranslations: item.choices.map(({id}) => item.translationJa.choices[id]),
      choiceNotes: item.choices.map(({id}) => item.choiceExplanationsJa[id]),
      vocabulary: item.vocabulary.map(({term, meaningJa}) => [term, meaningJa]),
    };
  }

  function renderExercise() {
    const exercise = selectedExercise();
    const materials = get('skill-material');
    audio.pause();
    audio.removeAttribute('src');
    audio.hidden = true;
    audioStatus.hidden = true;
    materials.replaceChildren();
    get('skill-item').replaceChildren();
    review.replaceChildren();
    feedback.textContent = '';
    review.hidden = true;
    get('study-answer').hidden = !exercise;
    if (!exercise) {
      audio.load();
      return;
    }
    renderMaterials(materials, exercise);
    if (exercise.media.audio) {
      audio.src = './' + exercise.media.audio.src;
      audio.hidden = false;
    } else {
      audio.load();
    }
    renderSingleQuestion('skill-item', reviewQuestion(exercise.items[0]));
  }

  for (const {part, titleJa} of parts) {
    partPicker.add(new Option('Part ' + part + ' · ' + titleJa, String(part)));
  }
  partPicker.disabled = false;
  partPicker.addEventListener('change', () => {
    const group = selectedPart();
    get('study-skill-step').hidden = !group;
    skillPicker.replaceChildren(new Option('分野を選択', ''));
    for (const {setId, items} of group?.sets ?? []) {
      skillPicker.add(new Option(items[0].skill, setId));
    }
    renderExercise();
  });
  skillPicker.addEventListener('change', renderExercise);
  audio.addEventListener('error', () => {
    if (!audio.hasAttribute('src')) return;
    audioStatus.textContent = '音声を読み込めませんでした。接続を確認して分野を選び直してください。';
    audioStatus.hidden = false;
  });
  get('skill-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const exercise = selectedExercise();
    const selected = new FormData(event.currentTarget).get('answer');
    if (!exercise || selected === null) return;
    const item = exercise.items[0];
    const question = reviewQuestion(item);
    const answer = item.choices[question.answer];
    const isCorrect = item.choices[Number(selected)].id === answer.id;
    feedback.textContent = isCorrect ? '正解。' : '正答 ' + answer.id + '。';
    if (typeof onAnswer === 'function') {
      onAnswer({
        itemId: item.id,
        setId: exercise.setId,
        part: exercise.part,
        skill: item.skill,
        difficulty: item.difficulty || 'medium',
        isCorrect,
        mode: 'study'
      });
    }
    review.replaceChildren();
    if (exercise.passages.length || exercise.media.table) {
      review.append(element('h4', exercise.part <= 4 ? '台本・資料と日本語訳' : '本文と日本語訳'));
      renderMaterials(review, exercise, answer.text);
    }
    const explanation = element('div');
    renderReview(explanation, question, Number(selected));
    review.append(explanation);
    review.hidden = false;
  });

  function openExercise(part, setId) {
    const group = parts.find((p) => Number(p.part) === Number(part));
    if (!group) return false;
    partPicker.value = String(group.part);
    get('study-skill-step').hidden = false;
    skillPicker.replaceChildren(new Option('分野を選択', ''));
    for (const {setId: sid, items} of group.sets) {
      skillPicker.add(new Option(items[0].skill, sid));
    }
    const target = group.sets.find((s) => s.setId === setId) || group.sets[0];
    if (!target) return false;
    skillPicker.value = target.setId;
    renderExercise();
    return true;
  }

  return { renderMaterials, reviewQuestion, openExercise };
}
