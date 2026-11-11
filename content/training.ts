import { PageHeroContent } from './services';
import { tech4youthProgramme } from './programmes/tech4youth';

export interface ProgrammeItem {
  slug: string;
  title: string;
  summary: string;
  status: string;
  duration: string;
  delivery: string;
  location: string;
  tracks: string[];
  href: string;
}

export interface TrainingFaqItem {
  id: string;
  question: string;
  answer: string;
}

// TODO: client to approve
export const trainingHero: PageHeroContent = {
  eyebrow: 'TRAINING',
  // TODO: client to approve
  title: 'Training programmes that build real skills.',
  // TODO: client to approve
  intro: 'We design and run hands-on tech training. Our current programme is Tech4Youth.',
};

// TODO: client to confirm
export const programmes: ProgrammeItem[] = [
  {
    slug: 'tech4youth',
    title: 'Tech4Youth',
    // TODO: client to confirm
    summary:
      'A hands-on, three-month technical training initiative empowering motivated young people in Abuja with job-ready skills in modern digital disciplines.',
    status: tech4youthProgramme.status === 'open' ? 'Sign-ups open' : 'Intake closed',
    duration: 'Three months',
    delivery: 'In person',
    location: 'Abuja',
    tracks: [
      'Artificial Intelligence',
      'Cybersecurity',
      'Data Analytics',
      'Software Development',
    ],
    href: '/training/tech4youth',
  },
];

// PLACEHOLDER: replace with real training FAQ content from client
export const trainingFaqs: TrainingFaqItem[] = [
  {
    id: 'training-faq-1',
    question: 'Who is eligible to enrol in your training programmes?',
    // TODO: client to confirm
    answer:
      'Our programmes are open to motivated learners of all backgrounds with basic computer literacy. Eligibility requirements, such as in-person availability in Abuja, are detailed on each programme page.',
  },
  {
    id: 'training-faq-2',
    question: 'What is the schedule and time commitment required?',
    // TODO: client to confirm
    answer:
      'Most programmes require consistent weekly in-person sessions (typically two sessions per week) plus dedicated time for practical exercises, labs, and collaborative projects.',
  },
  {
    id: 'training-faq-3',
    question: 'Do graduates receive a certificate of completion?',
    // TODO: client to confirm certificate FAQ answer, verified credentials
    answer:
      'Yes. Participants who achieve required attendance thresholds and successfully pass project milestones receive a verified Certificate of Completion.',
  },
  {
    id: 'training-faq-4',
    question: 'Do you offer tailored training for corporate teams or organisations?',
    // TODO: client to confirm
    answer:
      'Yes. We design and deliver bespoke workforce upskilling cohorts for enterprises, non-profits, and public sector teams in Data Analytics, Cybersecurity, and Software Development. Reach out through our consultation form to discuss custom curricula.',
  },
  {
    id: 'training-faq-5',
    question: 'How do I apply for the current Tech4Youth intake?',
    answer:
      'Visit the Tech4Youth programme page and complete the multi-section application form when sign-ups are open. Our admissions desk reviews all applications and contacts successful applicants ahead of the cohort start.',
  },
];
