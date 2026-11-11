export interface TrainingItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  duration: string;
  format: string;
  image: string;
  imageAlt: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: 'data' | 'cybersecurity' | 'software' | 'training';
  href: string;
  ctaText: string;
}

export interface PartnerItem {
  id: string;
  name: string;
  tagline: string;
  logoSrc?: string;
  width?: number;
  height?: number;
  displayHeight?: number;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  organization: string;
  track: string;
  avatar: string;
  avatarAlt: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface HomePageContent {
  hero: {
    eyebrow: string;
    title: string; // TODO: client value proposition
    lead: string;
    primaryCta: {
      label: string;
      href: string;
    };
    secondaryCta: {
      label: string;
      href: string;
    };
    pills: string[];
    image: {
      src: string;
      alt: string; // TODO: real training photo from client
    };
  };
  featuredTrainings: {
    eyebrow: string;
    title: string;
    viewAllCta: {
      label: string;
      href: string;
    };
    trainings: TrainingItem[]; // TODO: all training content below is placeholder. Replace from client / CMS
  };
  tech4Youth: {
    eyebrow: string;
    title: string;
    lead: string; // TODO: confirm with Tech4Youth team
    cta: {
      label: string;
      href: string;
    };
    stats: StatItem[]; // TODO: placeholder numbers, replace with real figures or remove this strip
  };
  partnerLogos: {
    eyebrow: string;
    partners: PartnerItem[]; // TODO: replace with client real partner logos
  };
  about: {
    eyebrow: string;
    title: string;
    lead: string;
    image: {
      src: string;
      alt: string;
    };
    stats: StatItem[];
  };
  testimonials: {
    eyebrow: string;
    title: string;
    lead: string;
    testimonials: TestimonialItem[]; // TODO: replace with real alumni testimonials from client
  };
  services: {
    eyebrow: string;
    title: string;
    servicesList: ServiceItem[];
  };
  faq: {
    eyebrow: string;
    title: string;
    image: {
      src: string;
      alt: string;
    };
    items: FaqItem[]; // TODO: replace with client real FAQs
  };
  consultationCta: {
    title: string;
    lead: string; // TODO: confirm response time
    cta: {
      label: string;
      href: string;
    };
  };
}

export const homeContent: HomePageContent = {
  hero: {
    eyebrow: 'TECH SERVICES & TRAINING',
    // TODO: client to approve
    title: 'Tech services and training that put skills to work.',
    // TODO: client to approve
    lead: 'We deliver data analytics, cybersecurity and software development services, and run training programmes such as Tech4Youth.',
    primaryCta: {
      label: 'Explore Training',
      href: '/training',
    },
    secondaryCta: {
      label: 'Our Services',
      href: '/services',
    },
    pills: ['Data Analytics', 'Cybersecurity', 'Software Development'],
    image: {
      src: '/images/site/home-hero-developer.png',
      alt: 'Praetorcore software developer working on a laptop in a modern Abuja training lab.',
    },
  },
  featuredTrainings: {
    eyebrow: 'CURRENT TRAINING PROGRAMME',
    title: 'Tech4Youth.',
    viewAllCta: {
      label: 'View full programme',
      href: '/training/tech4youth',
    },
    trainings: [],
  },
  tech4Youth: {
    eyebrow: 'Featured project',
    title: 'Tech4Youth: your first step into tech.',
    lead: 'A programme that trains young people in the skills behind data, security and software. Sign up to be considered for the next intake.', // TODO: confirm with Tech4Youth team
    cta: {
      label: 'Sign up for Tech4Youth',
      href: '/training/tech4youth#signup',
    },
    // PLACEHOLDER: fake content, replace with real content or remove
    stats: [
      { value: '00+', label: 'Learners trained' },
      { value: '00', label: 'Cohorts completed' },
      { value: '00+', label: 'Partners' },
      { value: '00%', label: 'Completion rate' },
    ], // TODO: placeholder numbers, replace with real figures or remove this strip
  },
  // PLACEHOLDER: fake logos / fake testimonials, replace with real ones or remove before launch
  partnerLogos: {
    eyebrow: 'Who We Work With',
    partners: [
      {
        id: 'partner-eu',
        name: 'Co-funded by the European Union',
        tagline: 'Development Partner',
        logoSrc: '/images/partners/european-union.png',
        width: 105,
        height: 94,
        displayHeight: 68,
      },
      {
        id: 'partner-denmark',
        name: 'Ministry of Foreign Affairs of Denmark',
        tagline: 'Development Partner',
        logoSrc: '/images/partners/ministry-of-foreign-affairs-denmark.png',
        width: 657,
        height: 164,
        displayHeight: 54,
      },
      {
        id: 'partner-german-coop',
        name: 'German Cooperation (Deutsche Zusammenarbeit)',
        tagline: 'Development Partner',
        logoSrc: '/images/partners/german-cooperation.png',
        width: 131,
        height: 77,
        displayHeight: 64,
      },
      {
        id: 'partner-giz',
        name: 'Implemented by GIZ',
        tagline: 'Implementation Partner',
        logoSrc: '/images/partners/giz.png',
        width: 208,
        height: 92,
        displayHeight: 62,
      },
    ],
  },
  about: {
    eyebrow: 'ABOUT US',
    // TODO: client to approve headline
    title: 'Bridging the tech capability gap for individuals and enterprise teams.',
    // TODO: client to approve
    lead: 'We are a tech services and training company based in Abuja, Nigeria.',
    image: {
      src: '/images/site/home-about-nigerian-team.jpg',
      alt: 'Nigerian technology professionals collaborating around a laptop.',
    },
    // PLACEHOLDER: replace with real figures or remove before launch
    stats: [
      { value: '00+', label: 'Learners trained' },
      { value: '4', label: 'Specialisation tracks' },
      { value: '00%', label: 'Completion rate' },
      { value: '00+', label: 'Projects delivered' },
    ],
  },
  // PLACEHOLDER: fake logos / fake testimonials, replace with real ones or remove before launch
  testimonials: {
    eyebrow: 'Testimonials',
    title: 'Real skills. Real career outcomes.',
    lead: 'Hear how our graduates gained job-ready skills and how employers found exceptional tech talent.',
    testimonials: [
      {
        id: 'testimonial-1',
        quote:
          'The hands-on dashboards and SQL projects were identical to what I now do daily. I transitioned from retail management into a Data Analyst role within two months of graduation.',
        author: 'Amara Okafor',
        role: 'Data Analyst',
        organization: 'Apex Analytics',
        track: 'Data Analytics Foundations',
        avatar:
          'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&h=160&q=80',
        avatarAlt: 'Portrait of Amara Okafor',
      },
      {
        id: 'testimonial-2',
        quote:
          'The threat-hunting simulations and practical blue-team labs gave me real problem-solving instincts. The mentorship directly helped me land my first Security Analyst position.',
        author: 'David Chen',
        role: 'Junior SOC Analyst',
        organization: 'CyberShield',
        track: 'Cybersecurity Essentials',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&h=160&q=80',
        avatarAlt: 'Portrait of David Chen',
      },
      {
        id: 'testimonial-3',
        quote:
          'Instead of abstract theory, we shipped production-grade web applications with modern stacks. The portfolio I built during the bootcamp opened doors to several engineering interviews.',
        author: 'Sarah Mensah',
        role: 'Frontend Engineer',
        organization: 'Veloce Labs',
        track: 'Web Development Bootcamp',
        avatar:
          'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=160&h=160&q=80',
        avatarAlt: 'Portrait of Sarah Mensah',
      },
      {
        id: 'testimonial-4',
        quote:
          'Learning prompt engineering, Python automation, and API workflows in person in Abuja gave me a massive edge. Within weeks of completing the cohort, I automated our team’s reporting pipeline.',
        author: 'Tunde Adeyemi',
        role: 'AI & Automation Specialist',
        organization: 'Novus Digital',
        track: 'Artificial Intelligence',
        avatar:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=80',
        avatarAlt: 'Portrait of Tunde Adeyemi',
      },
      {
        id: 'testimonial-5',
        quote:
          'Praetorcore consolidated our scattered branch spreadsheets into a unified Power BI executive dashboard. Our leadership team now reviews live operational metrics in minutes instead of days.',
        author: 'Chidinma Nwosu',
        role: 'Head of Operations',
        organization: 'Meridian Logistics',
        track: 'Data Analytics Consulting',
        avatar:
          'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=160&h=160&q=80',
        avatarAlt: 'Portrait of Chidinma Nwosu',
      },
      {
        id: 'testimonial-6',
        quote:
          'Their instructors break down complex backend architecture and Git workflows into practical steps anyone can follow. Collaborating with peers in the lab made all the difference.',
        author: 'Ibrahim Musa',
        role: 'Full-Stack Developer',
        organization: 'PayStack Partner Studio',
        track: 'Software Development',
        avatar:
          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&h=160&q=80',
        avatarAlt: 'Portrait of Ibrahim Musa',
      },
    ], // TODO: replace with real alumni testimonials from client
  },
  services: {
    eyebrow: 'Services',
    title: 'Tech services for your business.',
    servicesList: [
      {
        id: 'data-analytics',
        title: 'Data Analytics',
        description: 'Turn your data into decisions with dashboards and reports.',
        icon: 'data',
        href: '/services?service=data-analytics#consultation',
        ctaText: 'Book a free consultation',
      },
      {
        id: 'cybersecurity',
        title: 'Cybersecurity',
        description: 'Protect your systems and your people with audits and training.',
        icon: 'cybersecurity',
        href: '/services?service=cybersecurity#consultation',
        ctaText: 'Book a free consultation',
      },
      {
        id: 'software-development',
        title: 'Software Development',
        description: 'Websites and apps built to fit the way you work.',
        icon: 'software',
        href: '/services?service=software-development#consultation',
        ctaText: 'Book a free consultation',
      },
      {
        id: 'capacity-building-and-training',
        title: 'Capacity building and Training',
        description: 'Empower your workforce with custom tech cohorts, practical labs, and mentorship.',
        icon: 'training',
        href: '/services?service=capacity-building-and-training#consultation',
        ctaText: 'Book a free consultation',
      },
    ],
  },
  faq: {
    eyebrow: "FAQ'S",
    title: 'Frequently Asked Questions',
    image: {
      src: '/images/tech4youth/tech4youth-group-discussion.jpg',
      alt: 'Tech4Youth facilitator and learners collaborating during a workshop in Abuja.',
    },
    items: [
      {
        id: 'faq-1',
        question: 'Who are your training programmes designed for?',
        answer:
          'Our programmes cater to beginners seeking to launch a new career in tech, students looking for practical skills, and working professionals looking to upskill in Data Analytics, Cybersecurity, or Software Development.',
      },
      {
        id: 'faq-2',
        question: 'What formats are the trainings delivered in?',
        answer:
          'We offer both in-person cohort workshops at our physical training centres and interactive virtual live sessions with instructor-led labs, peer study groups, and weekly mentorship check-ins.',
      },
      {
        id: 'faq-3',
        question: 'Do you provide career support and job placement assistance?',
        answer:
          'Yes. Every career track includes dedicated portfolio guidance, resume and GitHub/LinkedIn reviews, interview coaching, and direct referrals to our hiring and industry partner network upon successful graduation.',
      },
      {
        id: 'faq-4',
        question: 'How do corporate consulting and tech services work?',
        answer:
          'We partner with businesses to deliver custom software solutions, business intelligence dashboards, and cybersecurity posture reviews, as well as customized internal upskilling programs for your staff.',
      },
      {
        id: 'faq-5',
        question: 'What hardware or software do I need to get started?',
        answer:
          'You only need a functional laptop with internet access. We provide pre-configured cloud environments, software licenses, datasets, and step-by-step installation guides for all track tooling.',
      },
      {
        id: 'faq-6',
        question: 'What is Tech4Youth and how do I apply?',
        answer:
          'Tech4Youth is our flagship community empowerment programme providing in-person tech training in Abuja. Eligible young people can apply through the dedicated Tech4Youth page whenever a cohort intake is open.',
      },
      {
        id: 'faq-7',
        question: 'Will I receive a recognised certificate upon completion?',
        // TODO: client to confirm certificate FAQ answer, verified credentials
        answer:
          'Yes. Graduates who satisfy attendance requirements and submit their verified capstone projects receive an industry-recognized Certificate of Completion detailing their competencies and practical hours.',
      },
    ], // TODO: replace with client real FAQs
  },
  consultationCta: {
    title: 'Book your free consultation.',
    lead: 'Tell us what you need and we will reply within two working days.', // TODO: confirm response time
    cta: {
      label: 'Book a free consultation',
      href: '/services#consultation',
    },
  },
};
