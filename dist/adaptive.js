'use strict';

(function (global) {
  const ADAPTIVE_KEY = 'toeic.adaptive.v1';
  const SRS_INTERVALS = [1, 3, 7, 21];

  function todayKey(date = new Date()) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function defaultState() {
    return {
      version: 1,
      itemLogs: [],
      reviewQueue: [],
      studyDays: [],
      preferences: {
        weeklyGoalDays: 5,
        dailyCourse: '3min',
        reminderTime: '20:00',
        reminderDays: ['MO', 'TU', 'WE', 'TH', 'FR']
      }
    };
  }

  function loadAdaptive() {
    try {
      const raw = localStorage.getItem(ADAPTIVE_KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      return normalizeState(parsed);
    } catch {
      return defaultState();
    }
  }

  function normalizeState(parsed) {
    const base = defaultState();
    if (!parsed || typeof parsed !== 'object') return base;
    if (Array.isArray(parsed.itemLogs)) {
      base.itemLogs = parsed.itemLogs.filter((l) =>
        l && typeof l.itemId === 'string' && typeof l.skill === 'string' && typeof l.isCorrect === 'boolean' && typeof l.answeredAt === 'string'
      );
    }
    if (Array.isArray(parsed.reviewQueue)) {
      base.reviewQueue = parsed.reviewQueue.filter((r) =>
        r && (r.targetType === 'item' || r.targetType === 'vocab') && typeof r.targetId === 'string' && typeof r.nextReviewAt === 'string'
      );
    }
    if (Array.isArray(parsed.studyDays)) {
      base.studyDays = [...new Set(parsed.studyDays.filter((d) => typeof d === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(d)))].sort();
    }
    if (parsed.preferences && typeof parsed.preferences === 'object') {
      const p = parsed.preferences;
      if (Number.isInteger(p.weeklyGoalDays) && p.weeklyGoalDays >= 1 && p.weeklyGoalDays <= 7) {
        base.preferences.weeklyGoalDays = p.weeklyGoalDays;
      }
      if (p.dailyCourse === '3min' || p.dailyCourse === '10min') {
        base.preferences.dailyCourse = p.dailyCourse;
      }
      if (typeof p.reminderTime === 'string' && /^\d{2}:\d{2}$/.test(p.reminderTime)) {
        base.preferences.reminderTime = p.reminderTime;
      }
      if (Array.isArray(p.reminderDays) && p.reminderDays.length) {
        const validDays = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
        const cleaned = p.reminderDays.filter((d) => validDays.includes(d));
        if (cleaned.length) base.preferences.reminderDays = cleaned;
      }
    }
    return base;
  }

  function saveAdaptive(state) {
    try {
      localStorage.setItem(ADAPTIVE_KEY, JSON.stringify(state));
      updateAppBadge(getDueReviews(state).length);
      return true;
    } catch {
      return false;
    }
  }

  function addDaysIso(fromDate, days) {
    const next = new Date(fromDate.getTime() + days * 24 * 60 * 60 * 1000);
    return next.toISOString();
  }

  function recordItemResults(entries) {
    if (!Array.isArray(entries) || !entries.length) return loadAdaptive();
    const state = loadAdaptive();
    const now = new Date();
    const nowIso = now.toISOString();
    const today = todayKey(now);

    for (const entry of entries) {
      if (!entry || !entry.itemId || !entry.skill) continue;
      state.itemLogs.push({
        id: (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : String(Date.now()) + '-' + Math.random().toString(36).slice(2),
        itemId: String(entry.itemId),
        setId: entry.setId ? String(entry.setId) : null,
        part: Number.isInteger(entry.part) ? entry.part : 5,
        skill: String(entry.skill),
        difficulty: entry.difficulty || 'medium',
        isCorrect: Boolean(entry.isCorrect),
        answeredAt: entry.answeredAt || nowIso,
        mode: entry.mode || 'study'
      });

      updateReviewQueueItem(state, {
        targetType: 'item',
        targetId: String(entry.setId || entry.itemId),
        itemId: String(entry.itemId),
        skill: String(entry.skill),
        part: Number.isInteger(entry.part) ? entry.part : 5,
        isCorrect: Boolean(entry.isCorrect),
        now
      });
    }

    if (!state.studyDays.includes(today)) {
      state.studyDays.push(today);
      state.studyDays.sort();
    }
    // Keep last 2000 logs to stay compact in localStorage
    if (state.itemLogs.length > 2000) {
      state.itemLogs = state.itemLogs.slice(-2000);
    }
    saveAdaptive(state);
    return state;
  }

  function updateReviewQueueItem(state, { targetType, targetId, itemId, skill, part, isCorrect, now }) {
    const idx = state.reviewQueue.findIndex((r) => r.targetType === targetType && r.targetId === targetId);
    const nowIso = now.toISOString();

    if (idx === -1) {
      if (!isCorrect) {
        state.reviewQueue.push({
          targetType,
          targetId,
          itemId: itemId || targetId,
          skill: skill || '',
          part: part || 5,
          nextReviewAt: addDaysIso(now, SRS_INTERVALS[0]),
          intervalDays: SRS_INTERVALS[0],
          streak: 0,
          lastAnsweredAt: nowIso
        });
      }
      return;
    }

    const current = state.reviewQueue[idx];
    current.lastAnsweredAt = nowIso;
    if (isCorrect) {
      current.streak = (current.streak || 0) + 1;
      const nextStep = Math.min(current.streak, SRS_INTERVALS.length - 1);
      current.intervalDays = SRS_INTERVALS[nextStep];
      current.nextReviewAt = addDaysIso(now, current.intervalDays);
    } else {
      current.streak = 0;
      current.intervalDays = SRS_INTERVALS[0];
      current.nextReviewAt = addDaysIso(now, SRS_INTERVALS[0]);
    }
  }

  function recordVocabReview(term, isKnown) {
    const state = loadAdaptive();
    const now = new Date();
    const today = todayKey(now);
    updateReviewQueueItem(state, {
      targetType: 'vocab',
      targetId: term.trim().normalize('NFKC').toLowerCase(),
      itemId: term.trim(),
      skill: '語彙',
      part: 5,
      isCorrect: Boolean(isKnown),
      now
    });
    if (!state.studyDays.includes(today)) {
      state.studyDays.push(today);
      state.studyDays.sort();
    }
    saveAdaptive(state);
    return state;
  }

  function getDueReviews(state, now = new Date()) {
    const nowMs = now.getTime();
    return state.reviewQueue
      .filter((r) => Date.parse(r.nextReviewAt) <= nowMs)
      .sort((a, b) => Date.parse(a.nextReviewAt) - Date.parse(b.nextReviewAt));
  }

  function analyzeSkills(state) {
    const bySkill = new Map();
    for (const log of state.itemLogs) {
      if (!bySkill.has(log.skill)) {
        bySkill.set(log.skill, {
          skill: log.skill,
          part: log.part,
          logs: [],
          firstByItem: new Map()
        });
      }
      const bucket = bySkill.get(log.skill);
      bucket.logs.push(log);
      if (!bucket.firstByItem.has(log.itemId)) {
        bucket.firstByItem.set(log.itemId, log);
      }
    }

    const results = [];
    for (const bucket of bySkill.values()) {
      const sorted = bucket.logs.slice().sort((a, b) => Date.parse(a.answeredAt) - Date.parse(b.answeredAt));
      const total = sorted.length;
      const correct = sorted.filter((l) => l.isCorrect).length;
      const recent = sorted.slice(-8);
      const recentCorrect = recent.filter((l) => l.isCorrect).length;
      const recentRate = recent.length ? recentCorrect / recent.length : 0;

      const firstItems = [...bucket.firstByItem.values()];
      const uniqueCount = firstItems.length;
      const firstCorrect = firstItems.filter((l) => l.isCorrect).length;
      const firstRate = uniqueCount ? firstCorrect / uniqueCount : 0;

      const easyMisses = recent.filter((l) => l.difficulty === 'easy' && !l.isCorrect).length;

      let status = 'unmeasured';
      let statusLabel = '未計測';
      let reasonJa = `回答数 ${total} 問（3問以上で判定）`;

      if (total >= 3) {
        if (recentRate < 0.7 || easyMisses >= 1) {
          status = 'weak';
          statusLabel = '要強化';
          reasonJa = easyMisses >= 1
            ? `直近${recent.length}問で${recentCorrect}/${recent.length}正解・基礎問題の取りこぼしあり`
            : `直近${recent.length}問で${recentCorrect}/${recent.length}正解（${Math.round(recentRate * 100)}%）`;
        } else if (recentRate >= 0.8 && (uniqueCount >= 2 ? firstRate >= 0.7 : true)) {
          status = 'mastered';
          statusLabel = '定着済み';
          reasonJa = `直近${recent.length}問で${recentCorrect}/${recent.length}正解・安定して解答できています`;
        } else {
          status = 'reviewing';
          statusLabel = '復習中';
          reasonJa = `直近${recent.length}問で${recentCorrect}/${recent.length}正解・類題で定着確認中`;
        }
      }

      // Priority score: higher means more urgent to review
      const statusWeight = status === 'weak' ? 100 : status === 'reviewing' ? 50 : status === 'unmeasured' ? 20 : 0;
      const priority = statusWeight + (1 - recentRate) * 40 + easyMisses * 15;

      results.push({
        skill: bucket.skill,
        part: bucket.part,
        total,
        correct,
        uniqueCount,
        recentTotal: recent.length,
        recentCorrect,
        recentRate,
        firstRate,
        status,
        statusLabel,
        reasonJa,
        priority
      });
    }

    return results.sort((a, b) => b.priority - a.priority);
  }

  function getWeekStats(state, now = new Date()) {
    const dayOfWeek = (now.getDay() + 6) % 7; // Monday = 0
    const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - dayOfWeek);
    const mondayKey = todayKey(monday);
    const today = todayKey(now);
    const weekDays = state.studyDays.filter((d) => d >= mondayKey && d <= today);

    let daysSinceLast = null;
    if (state.studyDays.length) {
      const last = state.studyDays[state.studyDays.length - 1];
      const [y, m, d] = last.split('-').map(Number);
      const lastDate = new Date(y, m - 1, d);
      const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      daysSinceLast = Math.round((todayDate - lastDate) / (24 * 60 * 60 * 1000));
    }

    return {
      completedDays: weekDays.length,
      goalDays: state.preferences.weeklyGoalDays,
      studiedToday: state.studyDays.includes(today),
      daysSinceLast
    };
  }

  function buildDailyMenu(course, bank, state) {
    const isTenMin = course === '10min';
    const maxQuestions = isTenMin ? 5 : 2;

    const allSets = (bank?.parts || []).flatMap((p) =>
      p.sets.map((s) => ({ ...s, part: p.part, partTitleJa: p.titleJa }))
    );
    const setById = new Map(allSets.map((s) => [s.setId, s]));

    const selectedSets = [];
    const usedIds = new Set();

    // 1. Due review items from SRS queue (that exist in bank)
    const dueItems = getDueReviews(state).filter((r) => r.targetType === 'item');
    for (const due of dueItems) {
      if (selectedSets.length >= Math.min(2, maxQuestions)) break;
      const found = setById.get(due.targetId);
      if (found && !usedIds.has(found.setId)) {
        selectedSets.push({ exercise: found, reason: '復習タイミング' });
        usedIds.add(found.setId);
      }
    }

    // 2. Weakest skills from analysis
    const analysis = analyzeSkills(state);
    for (const stat of analysis) {
      if (selectedSets.length >= maxQuestions) break;
      const match = allSets.find((s) => s.items[0]?.skill === stat.skill && !usedIds.has(s.setId));
      if (match) {
        selectedSets.push({ exercise: match, reason: stat.status === 'weak' ? '苦手補完' : '定着確認' });
        usedIds.add(match.setId);
      }
    }

    // 3. Fill remaining with unattempted or any available bank sets
    const attemptedIds = new Set(state.itemLogs.map((l) => l.setId || l.itemId));
    for (const s of allSets) {
      if (selectedSets.length >= maxQuestions) break;
      if (!usedIds.has(s.setId) && !attemptedIds.has(s.setId)) {
        selectedSets.push({ exercise: s, reason: '新しい分野' });
        usedIds.add(s.setId);
      }
    }
    for (const s of allSets) {
      if (selectedSets.length >= maxQuestions) break;
      if (!usedIds.has(s.setId)) {
        selectedSets.push({ exercise: s, reason: 'スキマ練習' });
        usedIds.add(s.setId);
      }
    }

    return {
      course,
      questions: selectedSets,
      dueCount: dueItems.length
    };
  }

  function getPartnerNudge(coachIndex, analysis, dueCount, weekStats) {
    const weak = analysis.find((a) => a.status === 'weak');
    const mastered = analysis.find((a) => a.status === 'mastered');
    const idx = [0, 1, 2].includes(coachIndex) ? coachIndex : 0;

    const lines = [
      // 0: ひなた
      {
        comeback: 'おかえり！久しぶりだから、まずは3分コースで1問ずつウォームアップしようね。',
        due: (n) => `復習のタイミングが来た問題が${n}件あるよ。今日の3分メニューで一緒に片付けよう！`,
        weak: (s) => `「${s}」を強化するチャンスだよ。今日のスキマ学習で1問からやってみようね！`,
        goalDone: '今週の学習目標を達成したね！すごいよ！無理せずこのペースでいこうね。',
        mastered: (s) => `「${s}」が定着済みになったね！その調子で次の分野も進めてみよう。`,
        default: '今日も3分だけ、スキマ学習から気軽に始めようね！'
      },
      // 1: 蓮
      {
        comeback: '久しぶりだな。ブランクがあっても問題ない。まずは3分のウォームアップから戻そう。',
        due: (n) => `復習期限の問題が${n}件ある。記憶が薄れる前に、今日の3分メニューで確認しよう。`,
        weak: (s) => `優先課題は「${s}」だ。今日のスキマ学習で根拠を意識しながら解こう。`,
        goalDone: '今週の目標を達成したな。積み重ねが効いている。',
        mastered: (s) => `「${s}」は定着したようだ。次は別の分野を固めよう。`,
        default: '今日も3分、一問ずつ根拠を確かめていこう。'
      },
      // 2: ミロ
      {
        comeback: 'おかえりにゃ！久しぶりでも大丈夫にゃ。まずは3分コースで軽く肩慣らしするにゃ！',
        due: (n) => `復習待ちが${n}件あるにゃ。今日の3分メニューでサッとやっつけるにゃ！`,
        weak: (s) => `「${s}」を一緒に克服するにゃ！今日のスキマ学習から始めるにゃ！`,
        goalDone: '今週の目標クリアにゃ！花丸にゃ！',
        mastered: (s) => `「${s}」が定着済みになったにゃ！すごい成長にゃ！`,
        default: '今日も3分だけ、ミロと一緒にスキマ学習するにゃ！'
      }
    ][idx];

    if (weekStats.daysSinceLast !== null && weekStats.daysSinceLast >= 3) {
      return { mood: 0, text: lines.comeback };
    }
    if (dueCount > 0) {
      return { mood: 2, text: lines.due(dueCount) };
    }
    if (weak) {
      return { mood: 2, text: lines.weak(weak.skill) };
    }
    if (weekStats.completedDays >= weekStats.goalDays) {
      return { mood: 1, text: lines.goalDone };
    }
    if (mastered) {
      return { mood: 1, text: lines.mastered(mastered.skill) };
    }
    return { mood: 0, text: lines.default };
  }

  function updateAppBadge(count) {
    try {
      if (typeof navigator === 'undefined') return;
      if (count > 0 && typeof navigator.setAppBadge === 'function') {
        navigator.setAppBadge(count).catch(() => {});
      } else if (typeof navigator.clearAppBadge === 'function') {
        navigator.clearAppBadge().catch(() => {});
      }
    } catch {
      // Badging API not supported or blocked
    }
  }

  function generateStudyIcs({ time = '20:00', days = ['MO', 'TU', 'WE', 'TH', 'FR'], url = '' } = {}) {
    const [hh, mm] = time.split(':').map((n) => String(Number(n) || 0).padStart(2, '0'));
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const dtStart = `${y}${m}${d}T${hh}${mm}00`;
    const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), Number(hh), Number(mm) + 10);
    const dtEnd = `${endDate.getFullYear()}${String(endDate.getMonth() + 1).padStart(2, '0')}${String(endDate.getDate()).padStart(2, '0')}T${String(endDate.getHours()).padStart(2, '0')}${String(endDate.getMinutes()).padStart(2, '0')}00`;
    const uid = `toeic-daily-study-${Date.now()}@local`;
    const byday = days.join(',');
    const desc = url ? `今日の3分スキマ学習を始めましょう: ${url}` : '今日の3分スキマ学習を始めましょう。';

    return [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//TOEIC Study App//Local Reminder//JA',
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      `RRULE:FREQ=WEEKLY;BYDAY=${byday}`,
      'SUMMARY:TOEIC 3分スキマ学習',
      `DESCRIPTION:${desc}`,
      'BEGIN:VALARM',
      'TRIGGER:-PT0M',
      'ACTION:DISPLAY',
      'DESCRIPTION:TOEIC 3分スキマ学習の時間です',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
  }

  global.toeicAdaptive = {
    loadAdaptive,
    saveAdaptive,
    normalizeState,
    recordItemResults,
    recordVocabReview,
    getDueReviews,
    analyzeSkills,
    getWeekStats,
    buildDailyMenu,
    getPartnerNudge,
    updateAppBadge,
    generateStudyIcs
  };
})(globalThis);
