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
import ExamplesPanel from './ExamplesPanel';

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
      ? 'Fill at least one activity slot to enable copy & paste export.'
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
              <p className="subtitle">Common App Activities List • Writing Tool</p>
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
              ✏️ EDITOR
            </button>
            <button
              className={`tab ${tab === 'brainstorm' ? 'tab-active' : ''}`}
              onClick={() => setTab('brainstorm')}
            >
              🧠 BRAINSTORM
              {notes.length > 0 && (
                <span className="tab-badge">{notes.length}</span>
              )}
            </button>
            <button
              className={`tab ${tab === 'examples' ? 'tab-active' : ''}`}
              onClick={() => setTab('examples')}
            >
              💡 EXAMPLES
            </button>
          </nav>
        </header>

        <main>
          {!loaded ? (
            <div className="loading">Loading saved work...</div>
          ) : tab === 'edit' ? (
            <>

              <p className="tab-intro">
                <span className="bold">Character Count Limits:</span> <strong>50</strong> for
                Position, <strong>100</strong> for Organization, <strong>150</strong> for Details.
                <br/>
                <span className="bold">Tips:</span> Lead with a <em>verb</em>. Use <em>fragments</em>, not sentences. <em>Quantify</em> when you can.
              </p>

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
          ) : tab === 'brainstorm' ? (
            <BrainstormPanel
              notes={notes}
              onAddNote={addNote}
              onDeleteNote={deleteNote}
            />
          ) : (
            <ExamplesPanel />
          )}
        </main>

        <footer className="footer">
          <p>Coded by <a href="https://coderina.dev">Katerina Walter</a></p>
          <p>for College Counseling @ <a href="https://bwl.org">BWL</a></p>
        </footer>
      </div>
    </div>
  );
}
