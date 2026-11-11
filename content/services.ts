export interface PageHeroAction {
  label: string;
  href: string;
  variant?: 'primary' | 'outline' | 'dark';
}

export interface PageHeroImage {
  src: string;
  alt: string;
}

export interface PageHeroContent {
  eyebrow: string;
  title: string;
  intro: string;
  actions?: PageHeroAction[];
  images?: PageHeroImage[];
  align?: 'center' | 'left';
}

// TODO: client to approve headline
// TODO: client to approve copy
export const servicesHero: PageHeroContent = {
  eyebrow: 'OUR SERVICES',
  title: 'Technology solutions and workforce training.',
  intro:
    'We help businesses, public institutions, and development partners build custom software, turn data into insights, secure systems, and upskill teams.',
  actions: [
    { label: 'Book a free consultation', href: '#consultation', variant: 'primary' },
    { label: 'Explore Training Offerings', href: '/training', variant: 'outline' },
  ],
  images: [
    {
      src: '/images/services/services-ai.webp',
      alt: 'Artificial intelligence and digital automation solutions',
    },
    {
      src: '/images/services/services-analytics.webp',
      alt: 'Business analytics metrics and reporting dashboards on a laptop screen',
    },
    {
      src: '/images/services/services-software.webp',
      alt: 'Full-stack software engineering code and development environment on a laptop',
    },
  ],
};

export interface ServiceItem {
  slug:
    | 'data-analytics'
    | 'cybersecurity'
    | 'software-development'
    | 'capacity-building-and-training';
  title: string;
  summary: string;
  overview: string;
  offerings: string[]; // exactly 5 offerings
  useCases: string[]; // 3-4 use cases
  icon: string;
}

// PLACEHOLDER: replace with real service details from client
export const servicesList: ServiceItem[] = [
  {
    slug: 'data-analytics',
    title: 'Data Analytics',
    summary:
      'Turn enterprise operational data into automated business intelligence dashboards, predictive reporting, and actionable executive insights.',
    overview:
      'We help organizations audit, centralize, and visualize their distributed business records. From messy multi-department spreadsheets to unified relational data models, our analytics consulting empowers leadership teams to make data-backed operational decisions with speed and clarity.',
    offerings: [
      'Interactive Power BI and Tableau executive dashboard architecture',
      'Automated SQL data transformation and nightly ETL batch pipelines',
      'Spreadsheet consolidation, data schema auditing, and deduplication',
      'KPI framework development and automated anomaly alerting',
      'Post-implementation team training and documentation handoff',
    ],
    useCases: [
      'Automating monthly executive performance and revenue reconciliations',
      'Centralizing multi-branch retail sales and inventory telemetry',
      'Tracking customer churn and service delivery metrics in real time',
      'Consolidating disparate operational spreadsheets into a single source of truth',
    ],
    icon: 'chart',
  },
  {
    slug: 'cybersecurity',
    title: 'Cybersecurity',
    summary:
      'Safeguard corporate networks, endpoints, and customer data with proactive vulnerability assessments, staff resilience training, and defense playbooks.',
    overview:
      'Modern security requires continuous vigilance rather than one-time check-the-box audits. We partner with organizations to identify network exposure points, review cloud access permissions, formulate practical incident response procedures, and train non-technical staff against modern social engineering.',
    offerings: [
      'External and internal vulnerability assessments and risk scoring',
      'Network perimeter security architecture and firewall policy review',
      'Simulated phishing campaigns and employee security awareness workshops',
      'Incident response playbook development and blue-team tabletop drills',
      'Endpoint protection deployment and multi-factor authentication (MFA) rollouts',
    ],
    useCases: [
      'Preparing enterprise systems and controls for vendor security questionnaires',
      'Auditing remote-work access policies and VPN configurations',
      'Hardening corporate email systems against executive impersonation and wire fraud',
      'Remediating critical findings from automated network vulnerability scans',
    ],
    icon: 'shield',
  },
  {
    slug: 'software-development',
    title: 'Software Development',
    summary:
      'Design, build, and maintain custom web applications, internal business portals, and secure API integrations built for reliability.',
    overview:
      'Off-the-shelf software rarely fits specialized organizational workflows. We architect and build bespoke full-stack applications with clean, type-safe code, scalable relational databases, and accessible, responsive interfaces designed specifically for your team’s operating reality.',
    offerings: [
      'Bespoke web application architecture and cloud deployment',
      'Internal staff management, client intake, and inventory portal development',
      'RESTful and third-party API integration (payment gateways, CRMs, ERPs)',
      'Database schema modernization, migration, and query optimization',
      'Ongoing application maintenance, security patching, and SLA support',
    ],
    useCases: [
      'Replacing paper-based client onboarding with a secure self-service portal',
      'Connecting legacy accounting software to a modern cloud database',
      'Building customized inventory tracking across geographically distributed teams',
      'Upgrading outdated internal web apps to responsive, accessible frameworks',
    ],
    icon: 'code',
  },
  {
    slug: 'capacity-building-and-training',
    // TODO: client to confirm service title and scope
    title: 'Capacity building and Training',
    summary:
      'Equip your workforce with practical technology capabilities through tailored enterprise bootcamps, structured upskilling tracks, and executive workshops.',
    overview:
      'Technology investments only yield returns when your team possesses the competencies to execute. We design and deliver custom, hands-on capacity building initiatives for corporations, public institutions, and donor-funded programs—grounded in real-world workflows rather than academic theory.',
    offerings: [
      'Custom corporate workforce upskilling in Data Analytics, Cybersecurity, and Software Engineering',
      'Cohort-based onboarding programs for junior developers and analysts',
      'Executive briefings on practical AI integration, cloud governance, and cybersecurity',
      'Curriculum design, lab infrastructure provisioning, and technical mentoring',
      'Pre- and post-training skills assessments with measurable competency tracking',
    ],
    useCases: [
      'Upskilling internal IT personnel to transition into modern cloud and cybersecurity operations',
      'Upskilling non-technical department leads to leverage business intelligence and SQL dashboards',
      'Designing and facilitating technical bootcamps for public sector capacity development',
      'Standardizing software development best practices across distributed engineering teams',
    ],
    icon: 'training',
  },
];
