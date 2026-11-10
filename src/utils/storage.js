/**
 * Browser Local Storage Utility Functions
 * =======================================
 * Manages classification history and real-time analytics strictly inside
 * the user's browser localStorage. No personal images or classification logs
 * are ever uploaded to external servers.
 */

import { WASTE_CATEGORIES, normalizeCategoryLabel } from "../data/wasteInfo.js";

const STORAGE_KEYS = {
  HISTORY: "ecovision_history",
};

const MAX_HISTORY_ITEMS = 120;

function readHistoryRaw() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeHistorySafe(entries) {
  try {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(entries));
    return true;
  } catch {
    // Handle QuotaExceededError gracefully by stripping older thumbnails first
    try {
      const trimmed = entries.slice(0, 60).map((item, idx) =>
        idx > 20 ? { ...item, thumbnail: "" } : item
      );
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(trimmed));
      return true;
    } catch {
      return false;
    }
  }
}

/**
 * Normalizes legacy entries (e.g. "Organic" -> "Organic Waste") safely on read.
 */
export function getHistory() {
  return readHistoryRaw().map((entry) => ({
    ...entry,
    category: normalizeCategoryLabel(entry.category),
  }));
}

/**
 * Saves a newly classified waste item into localStorage history.
 */
export function addToHistory(entry) {
  const history = getHistory();
  const normalizedCategory = normalizeCategoryLabel(entry.category);

  const newEntry = {
    id: `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    category: normalizedCategory,
    rawLabel: entry.rawLabel || entry.category,
    confidence: Number(entry.confidence) || 0,
    allScores: entry.allScores || [],
    source: entry.source || "upload",
    thumbnail: entry.thumbnail || "",
    timestamp: new Date().toISOString(),
    disposed: false,
    disposedAt: null,
    userVerifiedCorrect: null, // null = unreviewed, true = confirmed accurate, false = flagged incorrect
  };

  const next = [newEntry, ...history].slice(0, MAX_HISTORY_ITEMS);
  writeHistorySafe(next);
  return newEntry;
}

/**
 * Toggles or sets whether the user has properly disposed of a classified item.
 */
export function setDisposedStatus(id, isDisposed = true) {
  const history = getHistory();
  let updated = null;
  const next = history.map((item) => {
    if (item.id !== id) return item;
    updated = {
      ...item,
      disposed: Boolean(isDisposed),
      disposedAt: isDisposed ? new Date().toISOString() : null,
    };
    return updated;
  });

  if (updated) {
    writeHistorySafe(next);
  }
  return next;
}

/**
 * Backward-compatible helper to mark an item as properly disposed (only once).
 */
export function markAsDisposed(id) {
  return setDisposedStatus(id, true);
}

/**
 * Lets the user record whether the AI prediction matched the actual item.
 */
export function setPredictionVerification(id, isCorrect) {
  const history = getHistory();
  const next = history.map((item) =>
    item.id === id ? { ...item, userVerifiedCorrect: isCorrect } : item
  );
  writeHistorySafe(next);
  return next;
}

/**
 * Removes a single history entry by id.
 */
export function deleteHistoryEntry(id) {
  const history = getHistory();
  const next = history.filter((item) => item.id !== id);
  writeHistorySafe(next);
  return next;
}

/**
 * Clears all local classification history.
 */
export function clearAllData() {
  localStorage.removeItem(STORAGE_KEYS.HISTORY);
}

/**
 * Derives all dashboard statistics strictly from actual recorded localStorage entries.
 */
export function getStats(historyInput) {
  const history = historyInput || getHistory();

  const byCategory = {
    Plastic: 0,
    Paper: 0,
    Metal: 0,
    "Organic Waste": 0,
  };

  const disposedByCategory = {
    Plastic: 0,
    Paper: 0,
    Metal: 0,
    "Organic Waste": 0,
  };

  let disposedCorrectly = 0;
  let verifiedCorrectCount = 0;
  let reviewedCount = 0;
  let identifiedForRecycling = 0;
  let identifiedForComposting = 0;
  let confirmedRecycledDisposals = 0;
  let confirmedCompostDisposals = 0;

  for (const item of history) {
    const cat = normalizeCategoryLabel(item.category);
    if (Object.prototype.hasOwnProperty.call(byCategory, cat)) {
      byCategory[cat] += 1;
    }

    if (cat === "Organic Waste") {
      identifiedForComposting += 1;
    } else if (WASTE_CATEGORIES.includes(cat)) {
      identifiedForRecycling += 1;
    }

    if (item.disposed) {
      disposedCorrectly += 1;
      if (Object.prototype.hasOwnProperty.call(disposedByCategory, cat)) {
        disposedByCategory[cat] += 1;
      }
      if (cat === "Organic Waste") {
        confirmedCompostDisposals += 1;
      } else if (WASTE_CATEGORIES.includes(cat)) {
        confirmedRecycledDisposals += 1;
      }
    }

    if (item.userVerifiedCorrect !== null && item.userVerifiedCorrect !== undefined) {
      reviewedCount += 1;
      if (item.userVerifiedCorrect === true) {
        verifiedCorrectCount += 1;
      }
    }
  }

  return {
    totalClassified: history.length,
    byCategory,
    disposedByCategory,
    disposedCorrectly,
    pendingDisposal: Math.max(0, history.length - disposedCorrectly),
    identifiedForRecycling,
    identifiedForComposting,
    confirmedRecycledDisposals,
    confirmedCompostDisposals,
    verifiedCorrectCount,
    reviewedCount,
  };
}

/**
 * Formats local YYYY-MM-DD key from a Date object (avoids UTC day-shift bugs).
 */
function toLocalDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Computes Daily Activity (Last 7 Days) strictly from recorded timestamps.
 */
export function getDailyActivityData(historyInput) {
  const history = historyInput || getHistory();
  const countsByDate = {};

  for (const item of history) {
    if (!item.timestamp) continue;
    const key = toLocalDateKey(new Date(item.timestamp));
    countsByDate[key] = (countsByDate[key] || 0) + 1;
  }

  const days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - i);
    const key = toLocalDateKey(date);
    days.push({
      label: date.toLocaleDateString("en-IN", { weekday: "short", day: "numeric" }),
      shortDay: date.toLocaleDateString("en-IN", { weekday: "short" }),
      date: key,
      count: countsByDate[key] || 0,
    });
  }
  return days;
}

/**
 * Computes Weekly Activity (Last 4 Weeks) strictly from recorded timestamps.
 */
export function getWeeklyActivityData(historyInput) {
  const history = historyInput || getHistory();
  const now = new Date();
  now.setHours(23, 59, 59, 999);

  const weeks = [];
  for (let w = 3; w >= 0; w--) {
    const weekEnd = new Date(now);
    weekEnd.setDate(now.getDate() - w * 7);
    weekEnd.setHours(23, 59, 59, 999);

    const weekStart = new Date(weekEnd);
    weekStart.setDate(weekEnd.getDate() - 6);
    weekStart.setHours(0, 0, 0, 0);

    const count = history.filter((item) => {
      if (!item.timestamp) return false;
      const t = new Date(item.timestamp);
      return t >= weekStart && t <= weekEnd;
    }).length;

    const startLabel = weekStart.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
    const endLabel = weekEnd.toLocaleDateString("en-IN", { day: "numeric", month: "short" });

    weeks.push({
      label: w === 0 ? "This Week" : `${startLabel}–${endLabel}`,
      dateRange: `${startLabel} – ${endLabel}`,
      count,
    });
  }
  return weeks;
}
