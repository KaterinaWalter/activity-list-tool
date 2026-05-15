// =====================================================================
//  constants.js — All shared data: limits, patterns, prompts.
// =====================================================================

export const LIMITS = { position: 50, organization: 100, description: 150 };
export const STORAGE_KEY = 'cca_activities_v1';
export const NUM_SLOTS = 10;

// Weak phrase patterns with stronger alternatives
export const WEAK_PATTERNS = [
  // participate
  { match: /\bparticipated in\b/gi, label: 'participated in', suggestions: ['led', 'organized', 'coordinated', 'drove'] },
  { match: /\bparticipat(?:e|es|ing) in\b/gi, label: 'participate in', suggestions: ['lead', 'organize', 'coordinate', 'drive'] },

  // member of
  { match: /\bwas (?:a |an )?member(?: of)?\b/gi, label: 'was a member of', suggestions: ['served as', 'contributed to', 'collaborated with', 'engaged with'] },
  { match: /\b(?:am|is|are) (?:a |an )?member(?: of)?\b/gi, label: 'am a member of', suggestions: ['serve as', 'contribute to', 'collaborate with', 'engage with'] },

  // part of
  { match: /\bwas (?:a |an )?part of\b/gi, label: 'was part of', suggestions: ['served in', 'contributed to', 'collaborated with'] },
  { match: /\b(?:am|is|are) (?:a |an )?part of\b/gi, label: 'am part of', suggestions: ['serve in', 'contribute to', 'collaborate with'] },

  // help
  { match: /\bhelped (?:to |with )?/gi, label: 'helped (with/to)', suggestions: ['coordinated', 'facilitated', 'supported', 'drove'] },
  { match: /\bhelp(?:s|ing)? (?:to |with )?/gi, label: 'help (with/to)', suggestions: ['coordinate', 'facilitate', 'support', 'drive'] },

  // work
  { match: /\bworked (?:on|with)\b/gi, label: 'worked on/with', suggestions: ['developed', 'built', 'designed', 'spearheaded', 'produced'] },
  { match: /\bwork(?:s|ing)? (?:on|with)\b/gi, label: 'work on/with', suggestions: ['develop', 'build', 'design', 'spearhead', 'produce'] },

  // involved
  { match: /\bwas involved (?:in|with)\b/gi, label: 'was involved in/with', suggestions: ['led', 'drove', 'engaged in', 'contributed to'] },
  { match: /\b(?:am|is|are) involved (?:in|with)\b/gi, label: 'am involved in/with', suggestions: ['lead', 'drive', 'engage in', 'contribute to'] },

  // take part
  { match: /\btook part in\b/gi, label: 'took part in', suggestions: ['led', 'contributed to', 'competed in', 'performed in'] },
  { match: /\btak(?:e|es|ing) part in\b/gi, label: 'take part in', suggestions: ['lead', 'contribute to', 'compete in', 'perform in'] },

  // responsible
  { match: /\bwas responsible for\b/gi, label: 'was responsible for', suggestions: ['managed', 'oversaw', 'directed', 'led'] },
  { match: /\b(?:am|is|are) responsible for\b/gi, label: 'am responsible for', suggestions: ['manage', 'oversee', 'direct', 'lead'] },

  // assist
  { match: /\bassisted (?:in|with)?/gi, label: 'assisted', suggestions: ['supported', 'partnered with', 'collaborated with'] },
  { match: /\bassist(?:s|ing)? (?:in|with)?/gi, label: 'assist', suggestions: ['support', 'partner with', 'collaborate with'] },

  // join
  { match: /\bjoined\b/gi, label: 'joined', suggestions: ['founded', 'launched', 'served on'] },
  { match: /\bjoin(?:s|ing)?\b/gi, label: 'join', suggestions: ['establish', 'launch', 'serve on'] },

  // attend
  { match: /\battended\b/gi, label: 'attended', suggestions: ['completed', 'trained at', 'studied at'] },
  { match: /\battend(?:s|ing)?\b/gi, label: 'attend', suggestions: ['train at', 'study at', 'enroll in'] },
];

// Match "I" as a standalone pronoun (subject usage)
export const I_PATTERN = /\bI\b/g;

// Abbreviation candidates with their shorter forms
export const ABBREVS = [
  { match: /\band\b/g, replace: '&' },
  { match: /\bwith\b/gi, replace: 'w/' },
  { match: /\bwithout\b/gi, replace: 'w/o' },
  { match: /\bapproximately\b/gi, replace: '~' },
  { match: /\bbecause\b/gi, replace: 'b/c' },
  { match: /\borganization(?:s)?\b/gi, replace: 'org' },
  { match: /\bdepartment(?:s)?\b/gi, replace: 'dept' },
  { match: /\bvice president\b/gi, replace: 'VP' },
  { match: /\bnational\b/gi, replace: "nat'l" },
  { match: /\binternational\b/gi, replace: "int'l" },
  { match: /\bmanagement\b/gi, replace: 'mgmt' },
  { match: /\bgovernment\b/gi, replace: 'govt' },
  { match: /\bhours\b/gi, replace: 'hrs' },
  { match: /\bpercent\b/gi, replace: '%' },
  { match: /\bnumber(?:s)?\b/gi, replace: '#' },
  { match: /\bfirst\b/gi, replace: '1st' },
  { match: /\bsecond\b/gi, replace: '2nd' },
  { match: /\bthird\b/gi, replace: '3rd' },
];

// Power verb reference, grouped by theme
export const POWER_VERB_GROUPS = [
  { theme: 'Lead',     verbs: ['Led', 'Directed', 'Spearheaded', 'Chaired', 'Headed'] },
  { theme: 'Start',    verbs: ['Founded', 'Launched', 'Established', 'Initiated'] },
  { theme: 'Build',    verbs: ['Developed', 'Built', 'Designed', 'Engineered', 'Produced'] },
  { theme: 'Teach',    verbs: ['Taught', 'Mentored', 'Tutored', 'Trained', 'Coached'] },
  { theme: 'Organize', verbs: ['Organized', 'Coordinated', 'Managed', 'Oversaw', 'Hosted'] },
  { theme: 'Grow',     verbs: ['Expanded', 'Increased', 'Doubled', 'Scaled', 'Recruited'] },
  { theme: 'Create',   verbs: ['Authored', 'Composed', 'Designed', 'Published', 'Filmed'] },
  { theme: 'Perform',  verbs: ['Performed', 'Competed', 'Captained', 'Presented', 'Showcased'] },
  { theme: 'Win',      verbs: ['Earned', 'Won', 'Ranked', 'Placed', 'Qualified'] },
];

// Brainstorm prompts for the writer's-block panel
export const BRAINSTORM_PROMPTS = [
  { q: 'Started anything: a club, business, community service, newsletter?', tag: 'Founder' },
  { q: 'Organized an event, fundraiser, gathering, or drive?', tag: 'Organizing' },
  { q: 'Volunteer consistently somewhere, beyond required service hours?', tag: 'Service' },

  { q: 'Train or compete in any sport, even casually or outside school?', tag: 'Athletics' },
  { q: 'Compete in non-sports: Robotics, Model UN, Debate?', tag: 'Competition' },
  { q: 'Part of a cultural group, heritage org, or language school?', tag: 'Culture' },
  
  { q: 'Held an internship or paid job: even informal (babysitting, retail)?', tag: 'Work' },
  { q: 'Freelance: tutoring, coding, design, photography, lessons?', tag: 'Work' },
  { q: 'Tutor, mentor, or coach anyone: paid, unpaid, formal, or not?', tag: 'Teaching' },

  { q: 'Write, draw, compose, film, or design regularly outside class?', tag: 'Creative' },
  { q: 'Published or shared creative work anywhere (zines, blogs, YouTube)?', tag: 'Creative' },
  { q: 'Perform: music, theatre, dance, comedy, slam poetry?', tag: 'Creative' },

  { q: "Taught yourself a skill you've kept up for over a year?", tag: 'Self-taught' },
  { q: 'Contribute to an online forum, wiki, or open-source project?', tag: 'Online' },
  { q: 'Run an account, channel, podcast, or blog with consistent output?', tag: 'Online' },

  { q: 'Active in a religious community: service, choir, youth group?', tag: 'Faith' },
  { q: 'Do you regularly care for younger siblings or relatives?', tag: 'Family' },
  { q: 'Do you translate, interpret, or handle paperwork for your family?', tag: 'Family' },
];
