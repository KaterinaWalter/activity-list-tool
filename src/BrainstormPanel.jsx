// =====================================================================
//  BrainstormPanel.jsx — Clickable prompts for writer's block.
//  Saved notes persist alongside activities for later reference.
// =====================================================================

import React, { useState } from 'react';
import { BRAINSTORM_PROMPTS } from './constants';

export default function BrainstormPanel({ notes, onAddNote, onDeleteNote }) {
  const [activePrompt, setActivePrompt] = useState(null);
  const [draft, setDraft] = useState('');

  const handleOpen = (i) => {
    setActivePrompt(i);
    setDraft('');
  };

  const handleSave = () => {
    if (draft.trim()) {
      onAddNote({
        promptIdx: activePrompt,
        text: draft.trim(),
        id: Date.now(),
      });
    }
    setActivePrompt(null);
    setDraft('');
  };

  const handleSkip = () => {
    setActivePrompt(null);
    setDraft('');
  };

  return (
    <div className="brainstorm">
      <p className="brain-intro">
        <em>Stuck?</em> Click any prompt that sparks something. Students often forget
        their most differentiating activities: caregiving, side gigs, online
        communities, self-taught skills. Jot a note now, build it into a real
        activity slot later.
      </p>

      <div className="prompt-grid">
        {BRAINSTORM_PROMPTS.map((p, i) => (
          <div
            key={i}
            className={`prompt-card ${
              activePrompt === i ? 'prompt-active' : ''
            }`}
          >
            <div className="prompt-tag">{p.tag}</div>
            <div className="prompt-q">{p.q}</div>
            {activePrompt === i ? (
              <div className="prompt-editor">
                <textarea
                  className="prompt-textarea"
                  autoFocus
                  rows={3}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Whatever comes to mind — no editing, no polish."
                />
                <div className="prompt-actions">
                  <button className="btn-text" onClick={handleSkip}>
                    Cancel
                  </button>
                  <button
                    className="btn-primary"
                    onClick={handleSave}
                    disabled={!draft.trim()}
                  >
                    Save note
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="prompt-btn"
                onClick={() => handleOpen(i)}
              >
                Add a note →
              </button>
            )}
          </div>
        ))}
      </div>

      {notes.length > 0 && (
        <div className="notes-section">
          <div className="notes-title">
            Your notes <span className="notes-count">{notes.length}</span>
          </div>
          <div className="notes-list">
            {notes.map((n) => (
              <div key={n.id} className="note">
                <div className="note-tag">
                  {BRAINSTORM_PROMPTS[n.promptIdx]?.tag || '—'}
                </div>
                <div className="note-text">{n.text}</div>
                <button
                  className="note-del"
                  onClick={() => onDeleteNote(n.id)}
                  aria-label="Delete note"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
