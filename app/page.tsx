import { Hero } from '@/components/sections/Hero';
import { PartnerLogos } from '@/components/sections/PartnerLogos';
import { AboutSection } from '@/components/sections/AboutSection';
import { FeaturedTrainings } from '@/components/sections/FeaturedTrainings';
import { ServicesList } from '@/components/sections/ServicesList';
import { Testimonials } from '@/components/sections/Testimonials';
import { FAQ } from '@/components/sections/FAQ';
import { ConsultationCTA } from '@/components/sections/ConsultationCTA';
import { siteConfig } from '@/content/site';

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <PartnerLogos />
      <FeaturedTrainings />
      <ServicesList />
      {siteConfig.showPlaceholderSections && <Testimonials />}
      <FAQ />
      <ConsultationCTA />
    </>
  );
}
