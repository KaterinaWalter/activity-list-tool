import React, { useState, useEffect } from 'react';
import './App.css';

import { STORAGE_KEY, NUM_SLOTS } from './constants';
import {
  blankActivity,
  formatAllActivitiesForCopy,
  copyToClipboard,
} from './helpers';
import { storage } from './storage';

import ActivityCard from './ActivityCard';
import BrainstormPanel from './BrainstormPanel';

export default function App() {
  const [tab, setTab] = useState('edit');
  const [activities, setActivities] = useState(() =>
    Array.from({ length: NUM_SLOTS }, blankActivity)
  );
  const [notes, setNotes] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [copyAllState, setCopyAllState] = useState('idle'); // idle | copied | error

  // ---- Load saved work ----
  useEffect(() => {
    (async () => {
      const raw = await storage.get(STORAGE_KEY);
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed.activities)) {
            const filled = Array.from({ length: NUM_SLOTS }, (_, i) =>
              parsed.activities[i]
                ? { ...blankActivity(), ...parsed.activities[i] }
                : blankActivity()
            );
            setActivities(filled);
          }
          if (Array.isArray(parsed.notes)) setNotes(parsed.notes);
        } catch (_) {
          // corrupted save — ignore
        }
      }
      setLoaded(true);
    })();
  }, []);

  // ---- Auto-save (debounced) ----
  useEffect(() => {
    if (!loaded) return;
    const t = setTimeout(() => {
      storage.set(STORAGE_KEY, JSON.stringify({ activities, notes }));
    }, 400);
    return () => clearTimeout(t);
  }, [activities, notes, loaded]);

  // ---- Mutations ----
  const updateActivity = (idx, field, value) => {
    setActivities((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: value };
      return next;
    });
  };

  const clearActivity = (idx) => {
    setActivities((prev) => {
      const next = [...prev];
      next[idx] = blankActivity();
      return next;
    });
  };

  const addNote = (n) => setNotes((prev) => [n, ...prev]);
  const deleteNote = (id) =>
    setNotes((prev) => prev.filter((n) => n.id !== id));

  // ---- Copy All ----
  const handleCopyAll = async () => {
    if (filledCount === 0) return;
    const text = formatAllActivitiesForCopy(activities);
    const ok = await copyToClipboard(text);
    setCopyAllState(ok ? 'copied' : 'error');
    setTimeout(() => setCopyAllState('idle'), 1800);
  };

  const filledCount = activities.filter(
    (a) => a.position || a.organization || a.description
  ).length;

  // ---- Toolbar label / button text ----
  const toolbarInfo =
    filledCount === 0
      ? 'No activities yet — fill at least one slot to enable export.'
      : `${filledCount} ${
          filledCount === 1 ? 'activity' : 'activities'
        } ready to copy.`;

  const copyAllBtnText =
    copyAllState === 'copied'
      ? '✓ Copied all activities'
      : copyAllState === 'error'
      ? 'Copy failed — try again'
      : 'Copy all activities';

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <div className="title-row">
            <div>
              <h1 className="title">Ten Slots</h1>
              <p className="subtitle">Common App activities · writing tool</p>
            </div>
            <div className="status">
              <span className="status-num">{filledCount}</span>
              <span className="status-lbl">/ 10 filled</span>
            </div>
          </div>
          <nav className="tabs">
            <button
              className={`tab ${tab === 'edit' ? 'tab-active' : ''}`}
              onClick={() => setTab('edit')}
            >
              Editor
            </button>
            <button
              className={`tab ${tab === 'brainstorm' ? 'tab-active' : ''}`}
              onClick={() => setTab('brainstorm')}
            >
              Brainstorm
              {notes.length > 0 && (
                <span className="tab-badge">{notes.length}</span>
              )}
            </button>
          </nav>
        </header>

        <main>
          {!loaded ? (
            <div className="loading">Loading saved work…</div>
          ) : tab === 'edit' ? (
            <>
              {/* Copy-All toolbar — pinned at the top of the editor tab */}
              <div className="toolbar">
                <div className="toolbar-info">{toolbarInfo}</div>
                <button
                  className={`btn-primary copy-all-btn ${
                    copyAllState === 'copied' ? 'copy-success' : ''
                  } ${copyAllState === 'error' ? 'copy-error' : ''}`}
                  onClick={handleCopyAll}
                  disabled={filledCount === 0}
                >
                  {copyAllBtnText}
                </button>
              </div>

              <p className="tab-intro">
                Each slot has hard limits: <strong>50</strong> chars for
                Position, <strong>100</strong> for Organization,{' '}
                <strong>150</strong> for Details. Use fragments, not sentences.
                Lead with a verb. Quantify when you can.
              </p>

              {activities.map((a, i) => (
                <ActivityCard
                  key={i}
                  idx={i}
                  activity={a}
                  defaultOpen={i === 0}
                  onChange={(f, v) => updateActivity(i, f, v)}
                  onClear={() => clearActivity(i)}
                />
              ))}
            </>
          ) : (
            <BrainstormPanel
              notes={notes}
              onAddNote={addNote}
              onDeleteNote={deleteNote}
            />
          )}
        </main>

        <footer className="footer">
          Coded by <a href="https://coderina.dev">Katerina Walter</a>
        </footer>
      </div>
    </div>
  );
}
