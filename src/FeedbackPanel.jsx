// =====================================================================
//  FeedbackPanel.jsx — Inline analysis of the description field.
//  Surfaces: weak phrasing, "I" subjects, abbreviation opportunities.
//  Abbreviation suggestions only appear once description ≥70% of limit.
// =====================================================================

import React, { useMemo } from 'react';
import { LIMITS } from './constants';
import {
  findWeakPhrases,
  countI,
  findAbbrevOpportunities,
} from './helpers';

export default function FeedbackPanel({ description, onApplyAbbrev }) {
  const weaks = useMemo(() => findWeakPhrases(description), [description]);
  const iCount = useMemo(() => countI(description), [description]);
  const abbrevs = useMemo(
    () => findAbbrevOpportunities(description),
    [description]
  );
  const isTight = description.length >= LIMITS.description * 0.7;

  if (!description.trim()) {
    return (
      <div className="feedback empty-feedback">
        Start writing above. We'll flag weak phrasing, "I" subjects, and
        abbreviations that buy you characters.
      </div>
    );
  }

  const cleanRead =
    weaks.length === 0 &&
    iCount === 0 &&
    !isTight &&
    description.length > 20;

  return (
    <div className="feedback">
      {weaks.length > 0 && (
        <div className="fb-section">
          <div className="fb-title">Weak phrasing</div>
          {weaks.map((w, i) => (
            <div key={i} className="fb-item">
              <span className="fb-flag">
                {w.label}
                {w.count > 1 ? ` ×${w.count}` : ''}
              </span>
              <span className="fb-arrow">→</span>
              <span className="fb-suggestions">
                {w.suggestions.join(' · ')}
              </span>
            </div>
          ))}
        </div>
      )}

      {iCount > 0 && (
        <div className="fb-section">
          <div className="fb-title">Pronoun "I"</div>
          <div className="fb-item">
            <span className="fb-flag">
              {iCount} use{iCount > 1 ? 's' : ''} of "I"
            </span>
            <span className="fb-arrow">→</span>
            <span className="fb-suggestions">
              Drop the subject. Lead with a verb: "Led" not "I led".
            </span>
          </div>
        </div>
      )}

      {isTight && abbrevs.length > 0 && (
        <div className="fb-section">
          <div className="fb-title">Buy back characters</div>
          {abbrevs.slice(0, 4).map((a, i) => (
            <div key={i} className="fb-item">
              <span className="fb-flag">
                {a.from}
                {a.count > 1 ? ` ×${a.count}` : ''}
              </span>
              <span className="fb-arrow">→</span>
              <span className="fb-suggestions">{a.to}</span>
              <button
                className="fb-apply"
                onClick={() => onApplyAbbrev(a)}
                title={`Save ${a.savings} char${a.savings > 1 ? 's' : ''}`}
              >
                Apply (−{a.savings})
              </button>
            </div>
          ))}
        </div>
      )}

      {cleanRead && (
        <div className="fb-section">
          <div className="fb-positive">
            Reads clean. Lead with action verbs and quantify when you can.
          </div>
        </div>
      )}
    </div>
  );
}
