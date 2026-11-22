// Machine checks for a versioned exam described by AGENTS.md.
// Usage: node tools/validate-exam.mjs content/mock-01/exam.json
import {readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';

const examPath = process.argv[2];
if (!examPath) {
  console.error('Usage: node tools/validate-exam.mjs <exam.json>');
  process.exit(2);
}

const errors = [];
const warnings = [];
const fail = (where, message) => errors.push(`${where}: ${message}`);
const warn = (where, message) => warnings.push(`${where}: ${message}`);
const text = (value) => typeof value === 'string' && value.trim().length > 0;

const exam = JSON.parse(readFileSync(examPath, 'utf8'));
if (!text(exam.examId)) fail('exam', 'examId is missing');
if (!Number.isInteger(exam.revision)) fail('exam', 'revision must be an integer');
if (!Array.isArray(exam.parts) || exam.parts.length === 0) fail('exam', 'parts is empty');

const sets = [];
for (const {part, files} of exam.parts ?? []) {
  for (const file of files) {
    const data = JSON.parse(readFileSync(join(dirname(examPath), file), 'utf8'));
    if (data.part !== part) fail(file, `part ${data.part} does not match exam part ${part}`);
    for (const set of data.sets) sets.push({...set, file});
  }
}

const expected = {
  5: {items: 30, from: 101},
  6: {items: 16, from: 131, sets: 4, perSet: 4},
  7: {items: 54, from: 147, single: 29, multiple: 25}
};
const insertionStem = /In which of the positions marked/;
const choiceIds = ['A', 'B', 'C', 'D'];
const items = [];
const setIds = new Set();
const itemIds = new Set();

for (const set of sets) {
  const where = set.setId ?? set.file;
  if (setIds.has(set.setId)) fail(where, 'duplicate setId');
  setIds.add(set.setId);
  for (const key of ['setId', 'part', 'passages', 'media', 'items']) {
    if (!(key in set)) fail(where, `set is missing ${key}`);
  }

  const segments = new Map();
  for (const passage of set.passages) {
    if (!text(passage.id)) fail(where, 'passage without id');
    for (const segment of passage.segments ?? []) {
      if (segments.has(segment.id)) fail(where, `duplicate segment id ${segment.id}`);
      segments.set(segment.id, {segment, passage});
      if (!text(segment.text)) fail(segment.id, 'segment text is empty');
      if (!text(segment.translationJa)) fail(segment.id, 'segment translationJa is empty');
    }
    if (passage.header && !text(passage.headerTranslationJa)) fail(passage.id, 'header has no translation');
    if (passage.title && !text(passage.titleTranslationJa)) fail(passage.id, 'title has no translation');
  }

  for (const item of set.items) {
    const at = item.id ?? where;
    items.push({...item, part: set.part, setId: set.setId, passageCount: set.passages.length});
    if (itemIds.has(item.id)) fail(at, 'duplicate item id');
    itemIds.add(item.id);
    for (const key of ['id', 'number', 'stem', 'choices', 'answerId', 'skill', 'difficulty',
      'evidence', 'explanationJa', 'translationJa', 'choiceExplanationsJa', 'vocabulary']) {
      if (!(key in item)) fail(at, `missing ${key}`);
    }
    if (!text(item.stem)) fail(at, 'stem is empty');
    if (!['easy', 'medium', 'hard'].includes(item.difficulty)) fail(at, `invalid difficulty ${item.difficulty}`);
    if (!text(item.skill)) fail(at, 'skill is empty');
    if (!text(item.explanationJa)) fail(at, 'explanationJa is empty');

    const ids = (item.choices ?? []).map((choice) => choice.id);
    if (ids.join() !== choiceIds.join()) fail(at, `choice ids must be A-D, got ${ids.join()}`);
    for (const choice of item.choices ?? []) {
      if (!text(choice.text)) fail(at, `choice ${choice.id} text is empty`);
    }
    if (new Set((item.choices ?? []).map((choice) => choice.text)).size !== ids.length) {
      fail(at, 'duplicate choice text');
    }
    if (!ids.includes(item.answerId)) fail(at, `answerId ${item.answerId} is not a choice`);

    const explained = Object.keys(item.choiceExplanationsJa ?? {}).sort();
    if (explained.join() !== [...ids].sort().join()) {
      fail(at, `choiceExplanationsJa keys ${explained.join()} do not match choices`);
    }
    for (const [id, note] of Object.entries(item.choiceExplanationsJa ?? {})) {
      if (!text(note) || note.length < 20) fail(at, `explanation for ${id} is missing or too short`);
    }

    if (!text(item.translationJa?.text)) fail(at, 'translationJa.text is empty');
    const needsChoiceTranslation = set.part === 7 || /sentence/.test(item.stem);
    if (needsChoiceTranslation && !insertionStem.test(item.stem)) {
      const translated = Object.keys(item.translationJa?.choices ?? {}).sort();
      if (translated.join() !== [...ids].sort().join()) fail(at, 'translationJa.choices must cover every choice');
    }

    if (!Array.isArray(item.vocabulary) || item.vocabulary.length === 0) fail(at, 'vocabulary is empty');
    for (const entry of item.vocabulary ?? []) {
      if (!text(entry.term) || !text(entry.meaningJa)) fail(at, 'vocabulary entry needs term and meaningJa');
    }

    if (!Array.isArray(item.evidence) || item.evidence.length === 0) fail(at, 'evidence is empty');
    for (const evidence of item.evidence ?? []) {
      if (!text(evidence.keyPoint)) fail(at, 'evidence keyPoint is empty');
      if (evidence.ref === `${item.id}:stem`) continue;
      if (!segments.has(evidence.ref)) fail(at, `evidence ref ${evidence.ref} does not resolve`);
    }

    if (set.part === 6) {
      const blank = segments.get(item.blankRef)?.segment;
      if (!blank) fail(at, `blankRef ${item.blankRef} does not resolve`);
      else if (!blank.text.includes(`(${item.number}) _____`)) fail(at, `blank (${item.number}) not found in ${item.blankRef}`);
    }
    if (insertionStem.test(item.stem)) {
      const hasPoints = set.passages.some((passage) =>
        ['[1]', '[2]', '[3]', '[4]'].every((mark) => passage.segments.some((segment) => segment.text.includes(`— ${mark} —`))));
      if (!hasPoints) fail(at, 'insertion question but passage lacks [1]-[4] markers');
    }

    if (set.part === 7 && !insertionStem.test(item.stem)) {
      const lengths = item.choices.map((choice) => choice.text.length);
      const answerLength = item.choices.find((choice) => choice.id === item.answerId)?.text.length ?? 0;
      const otherMax = Math.max(...item.choices.filter((choice) => choice.id !== item.answerId).map((c) => c.text.length));
      if (answerLength > otherMax * 1.5 && Math.min(...lengths) > 3) warn(at, 'correct choice is much longer than every distractor');
    }
  }
}

items.sort((a, b) => a.number - b.number);
const numbers = items.map((item) => item.number);
const first = numbers[0];
numbers.forEach((number, index) => {
  if (number !== first + index) fail('numbering', `expected ${first + index}, found ${number}`);
});

for (const [part, rule] of Object.entries(expected)) {
  const partItems = items.filter((item) => item.part === Number(part));
  if (partItems.length === 0) continue;
  if (partItems.length !== rule.items) fail(`Part ${part}`, `expected ${rule.items} items, found ${partItems.length}`);
  if (partItems[0].number !== rule.from) fail(`Part ${part}`, `should start at ${rule.from}`);
  const partSets = sets.filter((set) => set.part === Number(part));
  if (rule.sets && partSets.length !== rule.sets) fail(`Part ${part}`, `expected ${rule.sets} sets`);
  if (rule.perSet && partSets.some((set) => set.items.length !== rule.perSet)) fail(`Part ${part}`, `each set needs ${rule.perSet} items`);
  if (rule.single) {
    const single = partItems.filter((item) => item.passageCount === 1).length;
    if (single !== rule.single) fail(`Part ${part}`, `expected ${rule.single} single-passage items, found ${single}`);
    if (partItems.length - single !== rule.multiple) fail(`Part ${part}`, `expected ${rule.multiple} multi-passage items`);
  }
}

const tally = (list) => Object.fromEntries(choiceIds.map((id) => [id, list.filter((item) => item.answerId === id).length]));
let run = 1;
let longest = {length: 1, from: items[0]?.number};
for (let index = 1; index < items.length; index++) {
  run = items[index].answerId === items[index - 1].answerId ? run + 1 : 1;
  if (run > longest.length) longest = {length: run, from: items[index - run + 1].number};
}
if (longest.length >= 4) warn('answer positions', `${longest.length} identical answers in a row from ${longest.from}`);
const overall = tally(items);
for (const id of choiceIds) {
  if (Math.abs(overall[id] - items.length / 4) > items.length * 0.08) warn('answer positions', `${id} is used ${overall[id]} times`);
}

console.log(`${exam.examId} r${exam.revision}: ${items.length} items in ${sets.length} sets (${first}-${numbers.at(-1)})`);
for (const part of [5, 6, 7]) {
  const partItems = items.filter((item) => item.part === part);
  if (partItems.length) console.log(`  Part ${part}: ${partItems.length} items, answers ${JSON.stringify(tally(partItems))}`);
}
console.log(`  All: answers ${JSON.stringify(overall)}, longest run ${longest.length}`);
const difficulty = Object.fromEntries(['easy', 'medium', 'hard'].map((d) => [d, items.filter((i) => i.difficulty === d).length]));
console.log(`  Difficulty (editorial hypothesis): ${JSON.stringify(difficulty)}`);
for (const message of warnings) console.log(`WARN  ${message}`);
for (const message of errors) console.log(`ERROR ${message}`);
console.log(errors.length ? `${errors.length} error(s)` : 'OK');
process.exit(errors.length ? 1 : 0);
