import React from 'react';
import { Metadata } from 'next';
import { PageHero } from '@/components/sections/PageHero';
import { WhoWeAre } from '@/components/sections/WhoWeAre';
import { AboutPillars } from '@/components/sections/AboutPillars';
import { AboutWhatWeDo } from '@/components/sections/AboutWhatWeDo';
import { HowWeWork } from '@/components/sections/HowWeWork';
import { Tech4YouthBanner } from '@/components/sections/Tech4YouthBanner';
import { AboutTeam } from '@/components/sections/AboutTeam';
import { ConsultationCTA } from '@/components/sections/ConsultationCTA';
import { aboutHero } from '@/content/about';

import { siteConfig } from '@/content/site';

export const metadata: Metadata = {
  title: 'About Us | Our Mission & Vision',
  description:
    'We are a tech services and training company based in Abuja, Nigeria. Delivering data analytics, cybersecurity, software development, and workforce upskilling.',
};

export default function AboutPage() {
  return (
    <>
      {/* 1. Page Hero */}
      <PageHero {...aboutHero} />

      {/* 2. Who We Are */}
      <WhoWeAre />

      {/* 3. Mission, Vision, Values */}
      <AboutPillars />

      {/* 4. What We Do */}
      <AboutWhatWeDo />

      {/* 5. How We Work */}
      <HowWeWork />

      {/* 6. Currently Running: Tech4Youth Banner */}
      <Tech4YouthBanner />

      {/* 7. Our Team (under showPlaceholderSections) */}
      <AboutTeam />

      {/* 8. Consultation Band */}
      <ConsultationCTA
        className={
          siteConfig.showPlaceholderSections
            ? '!pt-0 pb-[48px] lg:pb-[72px]'
            : 'py-[48px] lg:py-[72px]'
        }
      />
    </>
  );
}
