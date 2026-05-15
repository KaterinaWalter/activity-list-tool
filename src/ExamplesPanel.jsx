import React from 'react';

const EXAMPLES = [
  {
    id: 1,
    before: {
      position: 'Debate Team Captain',
      details: "I am the captain of our school's debate team. I run our practices each week, give feedback to teammates, and represent the team at tournaments.",
    },
    after: {
      position: 'Captain, Varsity Debate Team | 3 yrs varsity',
      details: "Recruited 12 new debaters; coached team to 1st state-tournament finish in 5 yrs; mentored 6 younger teammates onto varsity.",
    },
  },
  {
    id: 2,
    before: {
      position: 'Volunteer Tutor',
      details: "I tutor elementary school kids in math and reading after school once a week at the local community center.",
    },
    after: {
      position: 'Volunteer Math & Literacy Tutor, Boys & Girls Club',
      details: "Tutored 5 K-3 students weekly; designed game-based lessons that helped 4 advance a full reading level by spring.",
    },
  },
  {
    id: 3,
    before: {
      position: 'Soccer Player',
      details: "I play varsity soccer at my school. We practice every day after school and have games on weekends. I love being part of the team.",
    },
    after: {
      position: 'Captain & Center Midfielder, Varsity Girls Soccer',
      details: "Led 22-player team to first league title in 6 yrs. Ran preseason fitness program; organized fundraiser raising $1,800 for new uniforms.",
    },
  },
  {
    id: 4,
    before: {
      position: 'Started a Podcast',
      details: "I started a podcast about books with my friend. We record episodes about novels we read together and post them online for fun.",
    },
    after: {
      position: 'Founder & Co-Host, "Page Turners" YA Book Podcast',
      details: "Launched weekly podcast on YA fiction; produced 24 episodes reaching 3,400+ listeners across 18 countries on Spotify & Apple.",
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
