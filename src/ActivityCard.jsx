// =====================================================================
//  ActivityCard.jsx — One numbered activity slot.
//  Collapsible. Holds three fields with hard char limits, the feedback
//  panel, the power-verb reference, and per-slot Copy / Clear actions.
// =====================================================================

import React, { useState } from 'react';
import { LIMITS } from './constants';
import {
  applyAbbrev,
  formatActivityForCopy,
  copyToClipboard,
} from './helpers';
import CharBar from './CharBar';
import FeedbackPanel from './FeedbackPanel';
import PowerVerbReference from './PowerVerbReference';

export default function ActivityCard({
  idx,
  activity,
  defaultOpen,
  onChange,
  onClear,
}) {
  const [expanded, setExpanded] = useState(defaultOpen);
  const [showVerbs, setShowVerbs] = useState(false);
  const [copyState, setCopyState] = useState('idle'); // idle | copied | error

  const hasContent =
    activity.position || activity.organization || activity.description;
  const previewLabel =
    activity.position || activity.organization || 'Empty slot';

  const handleApplyAbbrev = (abbr) => {
    onChange('description', applyAbbrev(activity.description, abbr));
  };

  const handleCopy = async () => {
    const text = formatActivityForCopy(activity, idx, false);
    const ok = await copyToClipboard(text);
    setCopyState(ok ? 'copied' : 'error');
    setTimeout(() => setCopyState('idle'), 1500);
  };

  return (
    <div className={`card ${expanded ? 'card-open' : ''}`}>
      <div className="card-head" onClick={() => setExpanded(!expanded)}>
        <div className="card-head-left">
          <span className="slot-num">{String(idx + 1).padStart(2, '0')}</span>
          <div className="card-preview">
            <div className={`preview-title ${!hasContent ? 'empty' : ''}`}>
              {previewLabel}
            </div>
            {!expanded && activity.organization && activity.position && (
              <div className="preview-org">{activity.organization}</div>
            )}
          </div>
        </div>
        <button
          className="card-toggle"
          aria-label={expanded ? 'Collapse' : 'Expand'}
        >
          {expanded ? '−' : '+'}
        </button>
      </div>

      {expanded && (
        <div className="card-body">
          <div className="field">
            <label className="field-label">Position</label>
            <input
              type="text"
              className="field-input"
              maxLength={LIMITS.position}
              value={activity.position}
              onChange={(e) => onChange('position', e.target.value)}
              placeholder="e.g. Co-Captain · Founder · Treasurer"
            />
            <CharBar count={activity.position.length} limit={LIMITS.position} />
          </div>

          <div className="field">
            <label className="field-label">Organization</label>
            <input
              type="text"
              className="field-input"
              maxLength={LIMITS.organization}
              value={activity.organization}
              onChange={(e) => onChange('organization', e.target.value)}
              placeholder="Name of the team, club, business, project..."
            />
            <CharBar
              count={activity.organization.length}
              limit={LIMITS.organization}
            />
          </div>

          <div className="field">
            <label className="field-label">
              Details, honors, accomplishments
            </label>
            <textarea
              className="field-input field-textarea"
              maxLength={LIMITS.description}
              value={activity.description}
              onChange={(e) => onChange('description', e.target.value)}
              placeholder="IMPACT: What you did, what you led, what you produced, what changed..."
              rows={3}
            />
            <CharBar
              count={activity.description.length}
              limit={LIMITS.description}
            />
          </div>

          <span class="field-label">SUGGESTIONS</span>
          <FeedbackPanel
            description={activity.description}
            onApplyAbbrev={handleApplyAbbrev}
          />

          <PowerVerbReference
            open={showVerbs}
            onToggle={() => setShowVerbs((s) => !s)}
          />

          {hasContent && (
            <div className="card-actions">
              <button
                className={`btn-ghost ${
                  copyState === 'copied' ? 'btn-ghost-success' : ''
                } ${copyState === 'error' ? 'btn-ghost-error' : ''}`}
                onClick={handleCopy}
              >
                {copyState === 'copied'
                  ? '✓ Copied'
                  : copyState === 'error'
                  ? 'Copy failed'
                  : 'Copy slot'}
              </button>
              <button className="btn-text" onClick={onClear}>
                Clear this slot
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
