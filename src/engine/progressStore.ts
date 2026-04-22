import type { LineProgress, PracticeResult } from "./types";

const STORAGE_KEY = "sokolsky.progress.v1";

type Store = Record<string, LineProgress>;

function readStore(): Store {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as Store) : {};
  } catch {
    return {};
  }
}

function writeStore(store: Store): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // quota exceeded / storage disabled : on ignore silencieusement
  }
}

function emptyProgress(lineName: string): LineProgress {
  return {
    lineName,
    learned: false,
    practiceAttempts: 0,
    lastPracticeDate: null,
    bestScore: 0,
  };
}

export const progressStore = {
  get(lineName: string): LineProgress | null {
    const store = readStore();
    return store[lineName] ?? null;
  },

  getAll(): Store {
    return readStore();
  },

  markLearned(lineName: string): void {
    const store = readStore();
    const existing = store[lineName] ?? emptyProgress(lineName);
    store[lineName] = { ...existing, learned: true };
    writeStore(store);
  },

  recordPractice(lineName: string, result: PracticeResult): void {
    const store = readStore();
    const existing = store[lineName] ?? emptyProgress(lineName);
    const score =
      result.totalUserMoves === 0
        ? 0
        : Math.round((result.perfectMoves / result.totalUserMoves) * 100);
    store[lineName] = {
      ...existing,
      practiceAttempts: existing.practiceAttempts + 1,
      lastPracticeDate: new Date().toISOString(),
      bestScore: Math.max(existing.bestScore, score),
    };
    writeStore(store);
  },

  reset(): void {
    writeStore({});
  },
};
