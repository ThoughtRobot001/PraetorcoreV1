import React from 'react';
import { homeContent } from '@/content/home';
import { siteConfig } from '@/content/site';
import { tech4youthTrackCards } from '@/content/programmes/tech4youth';
import { Container } from '../Container';
import { SectionEyebrow } from '../SectionEyebrow';
import { SectionHeading } from '../SectionHeading';
import { ImageWithFallback } from '../ImageWithFallback';
import { Reveal } from '../Reveal';

export function AboutSection() {
  const { about } = homeContent;

  return (
    <section className="section-spacing dark-section on-dark" id="about">
      <Container>
        {/* Top 2-Column Layout matching reference image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Eyebrow + Large Headline */}
          <div className="lg:col-span-6">
            <Reveal>
              <SectionEyebrow>{about.eyebrow}</SectionEyebrow>
              <SectionHeading
                level="h2"
                className="text-white mt-3"
                style={{
                  fontSize: 'clamp(32px, 3.8vw, 54px)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.025em',
                  maxWidth: '16ch',
                }}
              >
                {about.title}
              </SectionHeading>
            </Reveal>
          </div>

          {/* Right Column: Lead Paragraph + Team Office Image */}
          <div className="lg:col-span-6 flex flex-col">
            <Reveal delay={0.1}>
              <p className="lead-text text-white/70 text-base sm:text-lg leading-relaxed mb-6">
                {about.lead}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div
                className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-[var(--radius)] overflow-hidden border border-white/10"
                style={{ background: '#141414' }}
              >
                {/* TODO: Replace with real photo from client */}
                <ImageWithFallback
                  src={about.image.src}
                  alt={about.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </Reveal>
          </div>
        </div>

        {/* Bottom 4-Column Stats Strip matching reference */}
        {/* PLACEHOLDER: replace with real figures or remove before launch */}
        {siteConfig.showPlaceholderSections && (
          <div className="mt-14 sm:mt-20 pt-10 sm:pt-14 border-t border-white/10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
              {about.stats.map((stat, idx) => {
                const displayValue = stat.label.toLowerCase().includes('specialisation')
                  ? tech4youthTrackCards.length
                  : stat.value;

                return (
                  <Reveal key={stat.label} delay={0.08 * idx}>
                    <div className="flex flex-col">
                      <div
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2"
                        style={{ letterSpacing: '-0.03em' }}
                      >
                        {displayValue}
                      </div>
                      <div className="text-xs sm:text-sm text-white/60 font-medium leading-snug">
                        {stat.label}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
