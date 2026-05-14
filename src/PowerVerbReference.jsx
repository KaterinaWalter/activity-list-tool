// =====================================================================
//  PowerVerbReference.jsx — Collapsible reference list of strong verbs.
// =====================================================================

import React from 'react';
import { POWER_VERB_GROUPS } from './constants';

export default function PowerVerbReference({ open, onToggle }) {
  return (
    <div className="power-ref">
      <button className="power-toggle" onClick={onToggle}>
        <span>Power verbs</span>
        <span className="caret">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="power-content">
          {POWER_VERB_GROUPS.map((g) => (
            <div key={g.theme} className="power-group">
              <span className="power-theme">{g.theme}</span>
              <span className="power-verbs">{g.verbs.join(' · ')}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
