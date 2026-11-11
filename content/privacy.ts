import { siteConfig } from './site';

export interface PrivacyPolicySection {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
}

export const privacySections: PrivacyPolicySection[] = [
  {
    id: 'who-we-are',
    title: 'Who we are',
    paragraphs: [
      `${siteConfig.legalName} ("we") is responsible for your personal information collected through this website. Address: ${siteConfig.contact.address}. Contact: ${siteConfig.privacyEmail}.`,
      'TODO: confirm whether a funder or partner is also responsible for Tech4Youth applicant data, and whether a Data Protection Officer has been appointed.',
    ],
  },
  {
    id: 'what-we-collect',
    title: 'What we collect',
    paragraphs: [
      'Tech4Youth applications may include the following personal information:',
    ],
    bullets: [
      'Name, email, phone, gender, age range and date of birth, location, nationality, education, employment status, track choice, knowledge level, ICT training history, optional LinkedIn and GitHub links, your written answers, and readiness details (attendance and laptop access).',
      'Consultation and contact forms: name, email, phone (consultation only), organisation, and your message.',
      'Technical information: our hosting provider may log basic technical data such as IP address and browser type for security. TODO: client to confirm the technical data logged by the hosting provider.',
    ],
  },
  {
    id: 'sensitive-information',
    title: 'Sensitive information',
    paragraphs: [
      'The application asks six questions about difficulty with seeing, hearing, walking, remembering, self-care and communication. This is health-related information. We ask for it only for [TODO: client to state the purpose, for example making the programme accessible and reporting] and process it only with your explicit consent, which you give by ticking the consent box. TODO: lawyer to confirm whether these questions can be required, or need a “prefer not to say” option.',
    ],
  },
  {
    id: 'why-we-use-it',
    title: 'Why we use your information and our legal basis',
    paragraphs: [
      'We use your information to:',
      'Our legal bases are your consent, steps you ask us to take, and our legitimate interests. TODO: lawyer to confirm these legal bases.',
    ],
    bullets: [
      'Assess applications.',
      'Contact you about your application and the programme.',
      'Answer your messages and requests.',
      'Keep our systems secure.',
      'Meet legal duties.',
    ],
  },
  {
    id: 'who-can-see-it',
    title: 'Who can see it',
    paragraphs: [
      'Your information may be seen by our authorised staff and service providers who help us run the website, including hosting and database providers, and email delivery providers once email delivery is added. TODO: client to confirm the service providers and whether applicant data is shared with any funder or programme partner, and list them.',
      'We do not sell your information.',
    ],
  },
  {
    id: 'storage-and-transfers',
    title: 'Where it is stored and transfers outside Nigeria',
    paragraphs: [
      'Our website and database are run by service providers whose servers may be outside Nigeria (database region: TODO: state the region). We take steps to make sure your information stays protected when it is transferred. TODO: lawyer to confirm the transfer basis and safeguards.',
    ],
  },
  {
    id: 'retention',
    title: 'How long we keep it',
    paragraphs: [
      'TODO: client to state retention periods for Tech4Youth applications and for enquiries. We keep personal information only as long as needed for the purposes above.',
    ],
  },
  {
    id: 'security',
    title: 'How we protect it',
    paragraphs: [
      'Access is limited to authorised staff with individual logins, the website uses secure connections, and administrator actions are logged. No system is completely secure, but we take reasonable steps. TODO: confirm these security practices.',
    ],
  },
  {
    id: 'under-18s',
    title: 'Under-18s',
    paragraphs: [
      'TODO: client to state the minimum age and the guardian-consent process for Tech4Youth applicants under 18.',
    ],
  },
  {
    id: 'your-rights',
    title: 'Your rights',
    paragraphs: [
      `You may ask to see, correct or delete your information, restrict or object to its use, receive a copy, or withdraw your consent at any time. Email ${siteConfig.privacyEmail}. We will respond within TODO: confirm period. You may also complain to the Nigeria Data Protection Commission (NDPC).`,
    ],
  },
  {
    id: 'cookies',
    title: 'Cookies',
    paragraphs: [
      'This site does not currently use advertising or analytics cookies. Administrators who sign in use essential cookies to keep them signed in. If we add analytics, we will update this policy and ask for your consent first. TODO: confirm when analytics are added.',
    ],
  },
  {
    id: 'changes',
    title: 'Changes',
    paragraphs: ['We may update this policy. The date at the top shows the latest version.'],
  },
  {
    id: 'contact',
    title: 'Contact',
    paragraphs: [`Email ${siteConfig.privacyEmail} or write to ${siteConfig.contact.address}.`],
  },
];
