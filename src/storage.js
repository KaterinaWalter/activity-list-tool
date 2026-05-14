// =====================================================================
//  storage.js — Persistence adapter.
//
//  Auto-detects environment:
//    - Inside Claude artifacts → uses window.storage (async key-value)
//    - Anywhere else            → uses localStorage
//  No code change needed when you deploy this outside Claude.
// =====================================================================

const hasWindowStorage =
  typeof window !== 'undefined' &&
  window.storage &&
  typeof window.storage.get === 'function' &&
  typeof window.storage.set === 'function';

const hasLocalStorage =
  typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

export const storage = {
  async get(key) {
    try {
      if (hasWindowStorage) {
        const r = await window.storage.get(key);
        return r ? r.value : null;
      }
      if (hasLocalStorage) {
        return window.localStorage.getItem(key);
      }
    } catch (_) {
      // swallow — app still functions without persistence
    }
    return null;
  },

  async set(key, value) {
    try {
      if (hasWindowStorage) {
        await window.storage.set(key, value);
        return;
      }
      if (hasLocalStorage) {
        window.localStorage.setItem(key, value);
      }
    } catch (_) {
      // swallow — app still functions without persistence
    }
  },
};
