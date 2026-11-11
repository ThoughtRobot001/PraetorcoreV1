export interface NavItem {
  label: string;
  href: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  name: string;
  url: string;
  handle: string;
}

export interface ContactInfo {
  email: string; // TODO: client email
  phone: string; // TODO: client phone
  location: string;
  address: string; // TODO: client physical address
  openingHours: string; // TODO: client working hours
  socialLinks: SocialLink[]; // TODO: client social links
}

export interface SiteConfig {
  name: string; // TODO: client logo
  legalName: string;
  adminLabel: string;
  privacyEmail: string;
  privacyLastUpdated: string;
  privacyDraft: boolean;
  tagline: string; // TODO: tagline
  // Set to false before launch. Hides testimonials, partner logos, the Tech4Youth stats strip and 'Upcoming initiative' cards until real content exists.
  showPlaceholderSections: boolean;
  navItems: NavItem[];
  primaryCta: {
    label: string;
    href: string;
  };
  footerSections: {
    pages: FooterSection;
    utility: FooterSection;
  };
  contact: ContactInfo; // TODO: real details, social links
  copyright: string;
}

const companyName = 'PRAETORCORE';
const legalCompanyName = 'Praetorcore Limited';

export const siteConfig: SiteConfig = {
  name: companyName,
  legalName: legalCompanyName,
  adminLabel: 'ADMIN',
  privacyEmail: 'privacy@example.com', // TODO: client to confirm privacy contact email
  privacyLastUpdated: 'TODO: set on publication',
  privacyDraft: true,
  // TODO: client to approve
  tagline: 'We are a tech services and training company based in Abuja, Nigeria.',
  // Set to false before launch. Hides testimonials, partner logos, the Tech4Youth stats strip and 'Upcoming initiative' cards until real content exists.
  showPlaceholderSections: true,
  navItems: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Training', href: '/training' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  primaryCta: {
    label: 'Explore Training',
    href: '/training',
  },
  footerSections: {
    pages: {
      title: 'Pages',
      links: [
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Training', href: '/training' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    utility: {
      title: 'Utility',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms and Conditions', href: '/privacy' },
      ],
    },
  },
  contact: {
    email: 'hello@example.com', // TODO: client email
    phone: '+234 800 000 0000', // TODO: client to confirm phone number
    location: 'Abuja, Nigeria',
    address: 'Plot 104, Central Business District, Abuja, Nigeria', // TODO: client to confirm office address
    openingHours: 'Monday – Friday: 8:30 AM – 5:30 PM WAT', // TODO: client office hours
    // TODO: client to confirm social handles
    socialLinks: [
      { name: 'LinkedIn', url: 'https://linkedin.com', handle: companyName }, // TODO: client to confirm social handles
      { name: 'X / Twitter', url: 'https://x.com', handle: `@${companyName}` }, // TODO: client to confirm social handles
      { name: 'GitHub', url: 'https://github.com', handle: companyName }, // TODO: client to confirm social handles
    ],
  }, // TODO: real details, social links
  copyright: `© 2026 ${legalCompanyName}. All rights reserved.`,
};
