import React from 'react';

const EXAMPLES = [
  {
    id: 1,
    before: {
      position: 'Member',
      organization: 'Science Olympiad club',
      details: 'Participated in competitions and helped with projects.',
    },
    after: {
      position: 'Build Captain',
      organization: 'Science Olympiad Team',
      details: 'Built 3 event devices; coached 8 rookies; team placed 2nd at regionals.',
    },
  },
  {
    id: 2,
    before: {
      position: 'Volunteer',
      organization: 'Local hospital',
      details: 'Helped nurses and patients every weekend.',
    },
    after: {
      position: 'Pediatric Unit Volunteer',
      organization: 'St. Mary Medical Center',
      details: 'Logged 120 hrs; ran reading cart for 25+ patients/week; translated Spanish intake forms.',
    },
  },
  {
    id: 3,
    before: {
      position: 'Tutor',
      organization: 'My school',
      details: 'Tutored students in math after class.',
    },
    after: {
      position: 'Founder, Peer Math Lab',
      organization: 'Lincoln High School',
      details: 'Recruited 14 tutors, launched drop-in center, raised Algebra pass rate from 71% to 84%.',
    },
  },
  {
    id: 4,
    before: {
      position: 'Intern',
      organization: 'Tech startup',
      details: 'Worked on coding tasks and attended meetings.',
    },
    after: {
      position: 'Software Engineering Intern',
      organization: 'BrightPath Analytics',
      details: 'Shipped React dashboard module; cut report load time 40%; presented sprint demo to 12-person team.',
    },
  },
  {
    id: 5,
    before: {
      position: 'Player',
      organization: 'Varsity soccer',
      details: 'Went to practice and played in games.',
    },
    after: {
      position: 'Captain, Varsity Soccer',
      organization: 'Roosevelt HS Athletics',
      details: 'Led daily drills, mentored 9 underclassmen, and helped program reach first district final in 11 years.',
    },
  },
];

function ExampleEntry({ label, entry, tone }) {
  return (
    <div className={`example-cell ${tone}`}>
      <div className="example-cell-title">{label}</div>
      <div className="example-lines">
        <div className="example-line">
          <span className="example-key">Position:</span> {entry.position}
        </div>
        <div className="example-line">
          <span className="example-key">Organization:</span> {entry.organization}
        </div>
        <div className="example-line">
          <span className="example-key">Details:</span> {entry.details}
        </div>
      </div>
    </div>
  );
}

export default function ExamplesPanel() {
  return (
    <section className="examples" aria-label="Activity examples">
      <p className="examples-intro">
        <span className="bold">Before vs. After:</span> Keep each entry specific, action-driven,
        and measurable. Strong versions lead with role clarity, power verbs, and impact shown with numbers.
      </p>

      <div className="examples-list">
        {EXAMPLES.map((row) => (
          <article key={row.id} className="example-row">
            <div className="example-row-num">#{row.id}</div>
            <div className="example-grid">
              <ExampleEntry label="Before" entry={row.before} tone="example-before" />
              <ExampleEntry label="After" entry={row.after} tone="example-after" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
