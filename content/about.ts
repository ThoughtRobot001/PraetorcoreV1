import { PageHeroContent } from './services';

export const aboutHero: PageHeroContent = {
  eyebrow: 'ABOUT US',
  title: 'About Our Mission',
  // TODO: client to approve
  intro: 'We are a tech services and training company based in Abuja, Nigeria.',
};

export interface WhoWeAreContent {
  eyebrow: string;
  heading: string;
  // TODO: client to supply
  paragraphs: string[];
  image: {
    src: string;
    alt: string;
  };
}

export const whoWeAreContent: WhoWeAreContent = {
  eyebrow: 'WHO WE ARE',
  heading: 'Tech services and training, built around people.',
  // TODO: client to supply
  paragraphs: [
    'We work alongside teams and individuals to make technology practical, accessible, and grounded in real-world application.',
    'Whether we are designing custom software, safeguarding critical systems, or running intensive cohort training, our focus remains on long-term capability and genuine understanding.',
    'Based in Abuja, we bring together practitioners with deep industry experience to support local and regional organizations.',
  ],
  image: {
    src: '/images/site/about-software-team.jpg',
    alt: 'Software professionals collaborating around code on a laptop.',
  },
};

export interface PillarItem {
  title: string;
  // TODO: client to supply
  text: string;
}

export const aboutPillars: PillarItem[] = [
  {
    title: 'Our mission',
    // TODO: client to supply
    text: 'To equip people and organizations with practical technology skills and resilient digital solutions that solve everyday challenges.',
  },
  {
    title: 'Our vision',
    // TODO: client to supply
    text: 'A thriving ecosystem where every individual has a clear pathway into technology and every business operates with reliable digital systems.',
  },
  {
    title: 'Our values',
    // TODO: client to supply
    text: 'Practical rigor, human-centered collaboration, integrity in execution, and a lasting commitment to community development.',
  },
];

export interface WhatWeDoItem {
  id: string;
  title: string;
  // TODO: client to supply
  summary: string;
  href: string;
  icon: 'data' | 'cybersecurity' | 'software' | 'training';
}

export const whatWeDoSection = {
  eyebrow: 'WHAT WE DO',
  heading: 'What we do.',
  items: [
    {
      id: 'data-analytics',
      title: 'Data Analytics',
      // TODO: client to supply
      summary: 'Turn operational records into clear reports, reliable dashboards, and actionable insights for decision-makers.',
      href: '/services',
      icon: 'data' as const,
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity',
      // TODO: client to supply
      summary: 'Protect networks, devices, and organizational data against modern threats through risk audits and practical defenses.',
      href: '/services',
      icon: 'cybersecurity' as const,
    },
    {
      id: 'software-development',
      title: 'Software Development',
      // TODO: client to supply
      summary: 'Engineer bespoke web platforms, internal management tools, and dependable system integrations tailored to your workflows.',
      href: '/services',
      icon: 'software' as const,
    },
    {
      id: 'capacity-building-and-training',
      title: 'Capacity building and Training',
      // TODO: client to supply
      summary: 'Deliver structured technical bootcamps, corporate workforce upskilling, and hands-on cohort learning experiences.',
      href: '/training',
      icon: 'training' as const,
    },
  ],
};

export interface WorkStepItem {
  step: string;
  title: string;
  // TODO: client to supply
  description: string;
}

export const howWeWorkSection = {
  eyebrow: 'OUR PROCESS',
  heading: 'How we work.',
  steps: [
    {
      step: '01',
      title: 'Listen',
      // TODO: client to supply
      description: 'We take the time to understand your team’s operating reality, unique context, and immediate objectives before proposing any technology.',
    },
    {
      step: '02',
      title: 'Plan',
      // TODO: client to supply
      description: 'We define transparent scopes, realistic timelines, and practical learning pathways built specifically around your needs.',
    },
    {
      step: '03',
      title: 'Deliver',
      // TODO: client to supply
      description: 'We build systems and deliver cohort training using hands-on industry standards with frequent check-ins and practical milestones.',
    },
    {
      step: '04',
      title: 'Support',
      // TODO: client to supply
      description: 'We remain available post-launch and post-graduation to provide ongoing guidance, operational advice, and technical mentorship.',
    },
  ],
};

export interface TeamMemberPlaceholder {
  initials: string;
  // TODO: client to supply
  name: string;
  // TODO: client to supply
  role: string;
  specialty: string;
  bio: string;
  image: string;
  linkedinUrl?: string;
}

export const teamSection: {
  eyebrow: string;
  heading: string;
  lead: string;
  members: TeamMemberPlaceholder[];
} = {
  eyebrow: 'LEADERSHIP & MENTORS',
  heading: 'Our team.',
  lead: 'Practitioners in software engineering, cybersecurity, and data analytics dedicated to building resilient systems and mentoring the next generation of tech talent.',
  // PLACEHOLDER: dummy team members, replace with real team before launch
  members: [
    {
      initials: 'AO',
      name: 'Adebayo Ogunlesi',
      role: 'Managing Director & Lead Architect',
      specialty: 'Software & Cloud',
      bio: 'Over a decade of experience designing enterprise web platforms, system integrations, and digital transformation strategies for public and private sector organisations.',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      linkedinUrl: 'https://linkedin.com',
    },
    {
      initials: 'ZN',
      name: 'Zainab Bello',
      role: 'Head of Data & AI Programmes',
      specialty: 'Data Analytics & AI',
      bio: 'Specialises in business intelligence architecture, automated SQL reporting pipelines, and curriculum design for hands-on data and AI cohorts.',
      image:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
      linkedinUrl: 'https://linkedin.com',
    },
    {
      initials: 'CE',
      name: 'Chukwudi Eze',
      role: 'Principal Cybersecurity Lead',
      specialty: 'Network Defense & SOC',
      bio: 'Leads vulnerability assessments, incident response readiness, and practical blue-team security labs for corporate teams and Tech4Youth fellows.',
      image:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
      linkedinUrl: 'https://linkedin.com',
    },
  ],
};
