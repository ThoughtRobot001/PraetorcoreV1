import React from 'react';
import { whoWeAreContent } from '@/content/about';
import { Container } from '../Container';
import { SectionEyebrow } from '../SectionEyebrow';
import { SectionHeading } from '../SectionHeading';
import { ImageWithFallback } from '../ImageWithFallback';
import { Reveal } from '../Reveal';

export function WhoWeAre() {
  return (
    <section
      className="section-spacing !pt-[24px] pb-[48px] lg:pb-[72px]"
      id="who-we-are"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Heading and placeholder sentences */}
          <div className="lg:col-span-6">
            <Reveal>
              <SectionEyebrow className="!mb-[14px]">
                {whoWeAreContent.eyebrow}
              </SectionEyebrow>
              <SectionHeading
                level="h2"
                className="!mb-[24px]"
                style={{ maxWidth: '26ch' }}
              >
                {whoWeAreContent.heading}
              </SectionHeading>
              <div className="space-y-[28px]">
                {whoWeAreContent.paragraphs.map((p, idx) => (
                  <p
                    key={idx}
                    className="lead-text text-base sm:text-lg leading-relaxed text-[var(--muted)]"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right Column: One photo with the same radius as other photos */}
          <div className="lg:col-span-6">
            <Reveal delay={0.15}>
              <div className="relative w-full aspect-[4/3] rounded-[var(--radius)] overflow-hidden border border-[var(--border)] shadow-sm">
                {/* TODO: Replace with real photo from client */}
                <ImageWithFallback
                  src={whoWeAreContent.image.src}
                  alt={whoWeAreContent.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
