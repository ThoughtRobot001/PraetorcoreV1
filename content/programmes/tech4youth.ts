import type { ProgrammeDefinition, ProgrammeField, ProgrammePageContent } from './types';

export type Tech4YouthAudienceItem = string;

interface Tech4YouthPageContent extends ProgrammePageContent {
  closingDate: string | null;
  minAge: number | null;
  guardianConsentBelowAge: number | null;
  programme: { duration: string; delivery: string; location: string };
  hero: { eyebrow: string; title: string; lead: string; ctaLabel: string };
  overview: {
    eyebrow: string;
    title: string;
    lead: string;
    targetAudience: Tech4YouthAudienceItem[];
  };
  tracks: {
    eyebrow: string;
    title: string;
    lead: string;
    items: Array<{ id: string; title: string; description: string; skills: string[] }>;
  };
  benefits: { eyebrow: string; title: string; items: string[] };
  eligibility: { eyebrow: string; title: string; items: string[] };
  dropdownOptions: {
    gender: string[];
    ageRange: string[];
    nationality: string[];
    education: string[];
    employmentStatus: string[];
  };
  disabilityOptions: string[];
  trackOptions: string[];
  trackKnowledgeOptions: string[];
  binaryOptions: string[];
  laptopAccessOptions: string[];
  trackCards: Tech4YouthTrackCard[];
}

const tech4youthContent: Omit<Tech4YouthPageContent, 'trackCards'> = {
  closingDate: null as string | null,
  minAge: null as number | null,
  guardianConsentBelowAge: null as number | null,
  programme: { duration: 'three months', delivery: 'In person', location: 'Abuja' },
  hero: {
    eyebrow: 'Youth Tech Empowerment Initiative',
    title: 'Tech4Youth: Launch your journey into technology.',
    lead: 'A three-month in-person programme equipping young people in Abuja with hands-on skills in AI, Cybersecurity, Data, and Software Development.',
    ctaLabel: 'Sign up now',
  },
  overview: {
    eyebrow: 'About Tech4Youth',
    title: 'Practical, guided training built for absolute and early-stage beginners.',
    lead: 'Tech4Youth is a community initiative designed to remove barriers to tech employment. Through intensive in-person sessions, collaborative projects, and industry mentorship, participants build the foundational competencies demanded by modern digital teams.',
    targetAudience: [
      'Motivated young residents in Abuja eager to build digital careers',
      'Beginners with curiosity and commitment to attend regular in-person workshops',
      'Recent school leavers, students, or jobseekers ready for structured technical training',
    ],
  },
  tracks: {
    eyebrow: 'Specialisation Tracks',
    title: 'Choose one focused track for your three-month cohort.',
    lead: 'Each participant focuses deeply on one discipline with guided labs, weekly project milestones, and instructor support.',
    items: [
      { id: 'artificial-intelligence', title: 'Artificial Intelligence', description: 'Explore prompt engineering, machine learning basics, model fine-tuning, and integrating AI APIs into practical tools.', skills: ['Prompt Engineering', 'Python Fundamentals', 'AI APIs', 'Ethics & Evaluation'] },
      { id: 'cybersecurity', title: 'Cybersecurity', description: 'Learn foundational network defense, identity security, vulnerability scanning, and security operations fundamentals.', skills: ['Network Security', 'SOC Operations', 'Threat Analysis', 'Defensive Labs'] },
      { id: 'data-analytics', title: 'Data Analytics', description: 'Clean, structure, and visualize data using modern spreadsheet models, SQL queries, and interactive reporting dashboards.', skills: ['Excel Modeling', 'SQL Databases', 'Power BI / Dashboards', 'Business Intelligence'] },
      { id: 'software-development', title: 'Software Development', description: 'Build responsive web applications from the ground up using HTML, CSS, modern TypeScript, and version control.', skills: ['Semantic HTML/CSS', 'TypeScript/JavaScript', 'Git & GitHub', 'Web App Architecture'] },
    ],
  },
  benefits: {
    eyebrow: 'What You Receive',
    title: 'Everything you need to build job-ready confidence.',
    items: [
      'Two intensive in-person classroom and lab workshops each week led by practicing tech engineers',
      'Hands-on portfolio assignments evaluated with personal instructor feedback',
      'Access to a curated peer community, study groups, and hack sessions in Abuja',
      'Career readiness workshops: CV clinics, GitHub/LinkedIn portfolio polish, and interview prep',
      'Certificate of Completion validating skills, project work, and cohort attendance',
    ],
  },
  eligibility: {
    eyebrow: 'Eligibility Criteria',
    title: 'What is required to participate.',
    items: [
      'Abuja residents only (all training sessions and lab evaluations are conducted in person in Abuja)',
      'Able to attend at least two in-person sessions per week consistently for the full three months',
      'Regular access to a functional laptop that you can bring to in-person training days',
      'Commitment to complete weekly practical assignments and capstone cohort submissions',
    ],
  },
  dropdownOptions: {
    gender: ['Female', 'Male', 'Prefer not to say'],
    ageRange: ['Under 18', '18-24', '25-34', '35-44', '45 and above'],
    nationality: ['Nigerian', 'Other'],
    education: ['Primary', 'Secondary', 'OND/NCE', "HND/Bachelor's degree", 'Postgraduate', 'Other'],
    employmentStatus: ['Student', 'Employed', 'Self-employed', 'Unemployed', 'Other'],
  },
  disabilityOptions: ['No difficulty', 'Some difficulty', 'A lot of difficulty', 'Cannot do at all'],
  trackOptions: ['Artificial Intelligence', 'Cybersecurity', 'Data Analytics', 'Software Development'],
  trackKnowledgeOptions: ['1', '2', '3', '4', '5'],
  binaryOptions: ['Yes', 'No'],
  laptopAccessOptions: ['Yes, I own a laptop', 'Yes, I can reliably borrow one', 'No, I do not have access to a laptop'],
};

export interface Tech4YouthTrackCard {
  id: string; slug: string; title: string; category: string; summary: string; meta: string; image: string; imageAlt: string;
}

export const tech4youthTrackCards: Tech4YouthTrackCard[] = [
  { id: 't4y-ai', slug: 'artificial-intelligence', title: 'Artificial Intelligence', category: 'Artificial Intelligence', summary: 'Build practical AI skills with prompt engineering, Python fundamentals, and API integrations for real-world tools.', meta: 'Three months · In person · Abuja', image: '/images/tech4youth/track-ai.webp', imageAlt: 'Artificial intelligence and neural network concepts visualization' },
  { id: 't4y-cyber', slug: 'cybersecurity', title: 'Cybersecurity', category: 'Cybersecurity', summary: 'Master foundational network defense, incident response, vulnerability assessment, and security operations center practices.', meta: 'Three months · In person · Abuja', image: '/images/tech4youth/tech4youth-laptop-lab.jpg', imageAlt: 'Tech4Youth participants working on laptops during an in-person technical lab session in Abuja.' },
  { id: 't4y-data', slug: 'data-analytics', title: 'Data Analytics', category: 'Data Analytics', summary: 'Transform raw datasets into actionable insights using structured SQL queries, spreadsheet modeling, and interactive dashboards.', meta: 'Three months · In person · Abuja', image: '/images/tech4youth/tech4youth-mentorship-session.jpg', imageAlt: 'Mentor guiding Tech4Youth participants through hands-on exercises on their laptops.' },
  { id: 't4y-software', slug: 'software-development', title: 'Software Development', category: 'Software Development', summary: 'Create and deploy responsive web applications and backend services with modern TypeScript, React, and Git collaboration.', meta: 'Three months · In person · Abuja', image: '/images/tech4youth/tech4youth-software-development-session.jpg', imageAlt: 'Instructor presenting software development tools to Tech4Youth participants.' },
];

const field = (key: string, label: string, type: ProgrammeField['type'], options?: string[], group: ProgrammeField['group'] = 'answers', required = true, placeholder?: string, helperText?: string, validation?: ProgrammeField['validation']): ProgrammeField => ({ key, label, type, options, group, required, placeholder, helperText, validation });

const tech4youthPageContent: Tech4YouthPageContent = {
  ...tech4youthContent,
  trackCards: tech4youthTrackCards,
};

export const tech4youthProgramme: ProgrammeDefinition<Tech4YouthPageContent> = {
  slug: 'tech4youth',
  title: 'Tech4Youth',
  summary: 'A hands-on, three-month technical training initiative empowering motivated young people in Abuja with job-ready skills in modern digital disciplines.',
  status: 'open',
  pageContent: tech4youthPageContent,
  form: {
    closedMessage: 'Applications for the current cohort are now closed. Check back soon for announcements on our next intake.',
    fullMessage: 'Applications for this programme are full. Please check back for future cohorts.',
    sections: [
      { title: '01. About you', subtitle: "First, let's get to know you.", fields: [
        field('fullName', 'Full name', 'text', undefined, 'core', true, undefined, undefined, { minLength: 2, maxLength: 120 }),
        field('gender', 'Gender', 'select', tech4youthContent.dropdownOptions.gender),
        field('ageRange', 'Age range', 'select', tech4youthContent.dropdownOptions.ageRange),
        field('dateOfBirth', 'Date of birth', 'date', undefined, 'answers', true, undefined, undefined, { dateInPast: true, minAge: tech4youthContent.minAge ?? undefined }),
        field('phone', 'Phone / WhatsApp number', 'phone', undefined, 'core', true, '+234.', undefined, { phone: 'nigerian' }),
        field('email', 'Email address', 'email', undefined, 'core', true, undefined, undefined, { email: true }),
        field('location', 'Location (Abuja residents only)', 'text', undefined, 'answers', true, 'e.g. Wuse 2, Garki, Maitama', undefined, { minLength: 2 }),
        field('nationality', 'Nationality', 'select', tech4youthContent.dropdownOptions.nationality),
      ] },
      { title: '02. Education & experience', subtitle: "There's no wrong place to start.", introTitle: 'Do you have difficulty with any of the following?', introText: 'Please answer based on your usual experience. Your answers help us make the programme accessible.', introAfterFieldCount: 2, fields: [
        field('education', 'Highest level of education', 'select', tech4youthContent.dropdownOptions.education),
        field('employmentStatus', 'Employment status', 'select', tech4youthContent.dropdownOptions.employmentStatus),
        field('difficultySeeing', '1. Seeing, even if wearing glasses?', 'radio', tech4youthContent.disabilityOptions, 'sensitive'),
        field('difficultyHearing', '2. Hearing, even if using hearing aids?', 'radio', tech4youthContent.disabilityOptions, 'sensitive'),
        field('difficultyWalking', '3. Walking or climbing steps?', 'radio', tech4youthContent.disabilityOptions, 'sensitive'),
        field('difficultyRemembering', '4. Remembering or concentrating?', 'radio', tech4youthContent.disabilityOptions, 'sensitive'),
        field('difficultySelfCare', '5. Self-care, such as washing all over or dressing?', 'radio', tech4youthContent.disabilityOptions, 'sensitive'),
        field('difficultyCommunicating', '6. Using your usual language, communicating (understanding or being understood)?', 'radio', tech4youthContent.disabilityOptions, 'sensitive'),
      ] },
      { title: '03. Your learning goals', subtitle: 'Choose a track and tell us what motivates you.', fields: [
        field('track', 'Which track are you applying for? Select one only.', 'radio', tech4youthContent.trackOptions, 'core'),
        field('trackKnowledge', 'How do you rate your current knowledge in the selected track?', 'radio', tech4youthContent.trackKnowledgeOptions, 'answers', true, undefined, '1 = Complete beginner, 5 = Experienced enthusiast'),
        field('previousIctTraining', 'Have you previously attended any ICT training?', 'radio', tech4youthContent.binaryOptions),
        field('linkedinUrl', 'LinkedIn profile URL (optional)', 'url', undefined, 'answers', false, 'https://linkedin.com/in/.', undefined, { url: true }),
        field('githubUrl', 'GitHub profile URL (optional)', 'url', undefined, 'answers', false, 'https://github.com/.', undefined, { url: true }),
        field('whyJoin', 'Why do you want to join the programme?', 'textarea', undefined, 'answers', true, 'Tell us what draws you to Tech4Youth and what you hope to learn (min 20 characters).', undefined, { minLength: 20, maxLength: 1000 }),
        field('goals', 'What do you hope to achieve after completing the programme?', 'textarea', undefined, 'answers', true, 'Describe your goals for employment, internships, or building projects post-graduation (min 20 characters).', undefined, { minLength: 20, maxLength: 1000 }),
      ] },
      { title: '04. Readiness', subtitle: 'A few practical details before you submit.', fields: [
        field('canAttendInPerson', 'Can you attend at least two in-person training sessions per week throughout the three-month programme?', 'radio', tech4youthContent.binaryOptions),
        field('laptopAccess', 'Do you have regular access to a laptop you can use throughout the training?', 'radio', tech4youthContent.laptopAccessOptions),
      ] },
    ],
  },
};
