// =====================================================================
//  CharBar.jsx — Thin progress bar + numeric character counter.
//  Status colors: ok (gray) → warn (amber, ≥90%) → over (red, =limit).
// =====================================================================

import React from 'react';

export default function CharBar({ count, limit }) {
  const pct = Math.min(100, (count / limit) * 100);

  let cls = 'cnt-ok';
  if (count >= limit) cls = 'cnt-over';
  else if (count >= limit * 0.9) cls = 'cnt-warn';

  return (
    <div className="char-row">
      <div className="char-bar">
        <div className={`char-fill ${cls}`} style={{ width: `${pct}%` }} />
      </div>
      <span className={`char-text ${cls}-text`}>
        {count} / {limit}
      </span>
    </div>
  );
}
