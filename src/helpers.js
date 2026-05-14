// =====================================================================
//  helpers.js — Pure helpers: text analysis, formatting, clipboard.
// =====================================================================

import { WEAK_PATTERNS, I_PATTERN, ABBREVS } from './constants';

export const blankActivity = () => ({
  position: '',
  organization: '',
  description: '',
});

// Find weak phrases in text and return them with suggestion alternatives
export function findWeakPhrases(text) {
  if (!text) return [];
  const found = [];
  for (const pat of WEAK_PATTERNS) {
    const matches = [...text.matchAll(pat.match)];
    if (matches.length > 0) {
      found.push({
        label: pat.label,
        suggestions: pat.suggestions,
        count: matches.length,
      });
    }
  }
  return found;
}

// Count standalone uses of "I" as a subject
export function countI(text) {
  if (!text) return 0;
  return [...text.matchAll(I_PATTERN)].length;
}

// Find abbreviation opportunities sorted by character savings (high to low)
export function findAbbrevOpportunities(text) {
  if (!text) return [];
  const found = [];
  for (const a of ABBREVS) {
    const matches = [...text.matchAll(a.match)];
    if (matches.length > 0) {
      const sample = matches[0][0];
      const savings = (sample.length - a.replace.length) * matches.length;
      if (savings > 0) {
        found.push({
          from: sample,
          to: a.replace,
          count: matches.length,
          savings,
          pattern: a.match,
        });
      }
    }
  }
  return found.sort((x, y) => y.savings - x.savings);
}

// Apply an abbreviation transformation to text
export function applyAbbrev(text, abbr) {
  return text.replace(abbr.pattern, abbr.to);
}

// =====================================================================
//  Copy / export helpers
// =====================================================================

// Format a single activity as readable plain text
export function formatActivityForCopy(activity, idx, includeHeader = false) {
  const lines = [];
  if (includeHeader) {
    lines.push(`ACTIVITY ${String(idx + 1).padStart(2, '0')}`);
  }
  lines.push(`Position:     ${activity.position || '—'}`);
  lines.push(`Organization: ${activity.organization || '—'}`);
  lines.push(`Description:  ${activity.description || '—'}`);
  return lines.join('\n');
}

// Format all filled activities as one readable plain-text block
export function formatAllActivitiesForCopy(activities) {
  return activities
    .map((a, i) => ({ a, i }))
    .filter(({ a }) => a.position || a.organization || a.description)
    .map(({ a, i }) => formatActivityForCopy(a, i, true))
    .join('\n\n');
}

// Copy text to clipboard. Tries the modern API first, falls back to
// the legacy textarea-select-execCommand technique for non-secure
// contexts (rare today but cheap to support).
export async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (_) {
    // fall through to fallback
  }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    ta.style.pointerEvents = 'none';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch (_) {
    return false;
  }
}
