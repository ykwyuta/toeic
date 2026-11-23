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
  const partCards = get('study-part-cards');
  const skillChips = get('study-skill-chips');
  const exerciseTag = get('study-exercise-tag');
  const exerciseCount = get('study-question-count');
  const previous = get('study-question-previous');
  const next = get('study-question-next');
  const audio = get('study-audio');
  const audioStatus = get('study-audio-status');
  const review = get('skill-review');
  const feedback = get('skill-feedback');
  const answers = new Map();
  let exerciseIndex = 0;

  const groupsByPart = new Map(parts.map(({part, sets}) => {
    const skills = new Map();
    for (const exercise of sets) {
      const {skill} = exercise.items[0];
      if (!skills.has(skill)) skills.set(skill, {id: exercise.setId, skill, exercises: []});
      skills.get(skill).exercises.push(exercise);
    }
    return [part, [...skills.values()]];
  }));

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

  function selectedGroup() {
    return groupsByPart.get(Number(partPicker.value))?.find(({id}) => id === skillPicker.value);
  }

  function reviewQuestion(item) {
    const choices = item.choices.map(({text}) => text);
    return {
      stem: item.stem,
      choices,
      answer: item.choices.findIndex(({id}) => id === item.answerId),
      translation: item.translationJa.stem,
      choiceTranslations: item.translationJa.choices
        ? item.choices.map(({id}) => item.translationJa.choices[id]) : undefined,
      choiceNotes: item.choices.map(({id}) => item.choiceExplanationsJa[id]),
      vocabulary: item.vocabulary.map(({term, meaningJa}) => [term, meaningJa]),
    };
  }

  function renderExercise() {
    const group = selectedGroup();
    const exercise = group?.exercises[exerciseIndex];
    const materials = get('skill-material');
    audio.pause();
    audio.removeAttribute('src');
    audio.hidden = true;
    audioStatus.hidden = true;
    materials.replaceChildren();
    get('skill-item').replaceChildren();
    review.replaceChildren();
    feedback.textContent = '';
    feedback.hidden = true;
    delete feedback.dataset.state;
    review.hidden = true;
    get('study-answer').hidden = !exercise;
    if (!exercise) {
      audio.load();
      return;
    }
    exerciseTag.textContent = 'Part ' + exercise.part + ' · ' + group.skill;
    exerciseCount.textContent = (exerciseIndex + 1) + ' / ' + group.exercises.length + '問';
    previous.disabled = exerciseIndex === 0;
    next.disabled = exerciseIndex === group.exercises.length - 1;
    renderMaterials(materials, exercise);
    if (exercise.media.audio) {
      audio.src = './' + exercise.media.audio.src;
      audio.hidden = false;
    } else {
      audio.load();
    }
    const item = exercise.items[0];
    renderSingleQuestion('skill-item', reviewQuestion(item));
    if (answers.has(item.id)) {
      const selected = answers.get(item.id);
      get('skill-item').querySelectorAll('input[type=radio]')[selected].checked = true;
      showAnswer(exercise, selected);
    }
  }

  function renderSkillChips(groups) {
    if (!skillChips) return;
    skillChips.replaceChildren(...groups.map(({id, skill, exercises}) => {
      const btn = element('button');
      btn.type = 'button';
      btn.className = 'skill-chip';
      btn.dataset.groupId = id;
      btn.setAttribute('aria-pressed', 'false');
      btn.textContent = skill + '（' + exercises.length + '問）';
      btn.addEventListener('click', () => selectSkill(id));
      return btn;
    }));
  }

  function selectSkill(id, index = 0) {
    skillPicker.value = id;
    exerciseIndex = index;
    for (const chip of skillChips?.querySelectorAll('.skill-chip') ?? []) {
      chip.setAttribute('aria-pressed', String(chip.dataset.groupId === id));
    }
    renderExercise();
  }

  function selectPartValue(partVal) {
    partPicker.value = String(partVal);
    if (partCards) {
      for (const p of partCards.querySelectorAll('.part-pill')) {
        p.setAttribute('aria-pressed', String(p.dataset.part === String(partVal)));
      }
    }
    const part = selectedPart();
    const groups = groupsByPart.get(part?.part) ?? [];
    get('study-skill-step').hidden = !part;
    skillPicker.replaceChildren(new Option('分野を選択', ''));
    for (const {id, skill} of groups) {
      skillPicker.add(new Option(skill, id));
    }
    exerciseIndex = 0;
    renderSkillChips(groups);
    renderExercise();
  }

  for (const {part, titleJa, sets} of parts) {
    partPicker.add(new Option('Part ' + part + ' · ' + titleJa, String(part)));
    if (partCards) {
      const card = element('button');
      card.type = 'button';
      card.className = 'part-pill';
      card.dataset.part = String(part);
      card.setAttribute('aria-pressed', 'false');
      const tag = element('span', 'Part ' + part + (part <= 4 ? ' · Listening' : ' · Reading'));
      tag.className = 'part-pill-tag';
      const name = element('span', titleJa + '（' + sets.length + '問）');
      name.className = 'part-pill-name';
      card.append(tag, name);
      card.addEventListener('click', () => selectPartValue(part));
      partCards.append(card);
    }
  }
  partPicker.disabled = false;
  partPicker.addEventListener('change', () => selectPartValue(partPicker.value));
  skillPicker.addEventListener('change', () => selectSkill(skillPicker.value));
  function moveQuestion(direction) {
    const index = exerciseIndex + direction;
    if (index < 0 || index >= (selectedGroup()?.exercises.length ?? 0)) return;
    exerciseIndex = index;
    renderExercise();
    exerciseCount.focus();
  }
  previous.addEventListener('click', () => moveQuestion(-1));
  next.addEventListener('click', () => moveQuestion(1));
  audio.addEventListener('error', () => {
    if (!audio.hasAttribute('src')) return;
    audioStatus.textContent = '音声を読み込めませんでした。接続を確認して分野を選び直してください。';
    audioStatus.hidden = false;
  });
  function showAnswer(exercise, selected) {
    const item = exercise.items[0];
    const question = reviewQuestion(item);
    const answer = item.choices[question.answer];
    const isCorrect = item.choices[selected].id === answer.id;
    feedback.textContent = isCorrect ? '正解！よくできました。' : '不正解（正答: ' + answer.id + '）。解説を確認しましょう。';
    feedback.dataset.state = isCorrect ? 'ok' : 'ng';
    feedback.hidden = false;
    review.replaceChildren();
    if (exercise.passages.length || exercise.media.table) {
      review.append(element('h4', exercise.part <= 4 ? '台本・資料と日本語訳' : '本文と日本語訳'));
      renderMaterials(review, exercise, answer.text);
    }
    const explanation = element('div');
    renderReview(explanation, question, selected);
    review.append(explanation);
    review.hidden = false;
    return isCorrect;
  }

  get('skill-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const exercise = selectedGroup()?.exercises[exerciseIndex];
    const value = new FormData(event.currentTarget).get('answer');
    if (!exercise || value === null) return;
    const selected = Number(value);
    const item = exercise.items[0];
    answers.set(item.id, selected);
    const isCorrect = showAnswer(exercise, selected);
    onAnswer?.({
      itemId: item.id,
      setId: exercise.setId,
      part: exercise.part,
      skill: item.skill,
      difficulty: item.difficulty || 'medium',
      isCorrect,
      mode: 'study'
    });
  });

  function openExercise(part, setId) {
    const groups = groupsByPart.get(Number(part));
    if (!groups?.length) return false;
    const group = groups.find(({exercises}) => exercises.some((entry) => entry.setId === setId));
    if (!group && setId) return false;
    const target = group ?? groups[0];
    const index = target.exercises.findIndex((entry) => entry.setId === setId);
    selectPartValue(part);
    selectSkill(target.id, Math.max(0, index));
    return true;
  }

  return { renderMaterials, reviewQuestion, openExercise };
}
