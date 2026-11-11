import React from 'react';
import { aboutPillars } from '@/content/about';
import { Container } from '../Container';
import { SectionHeading } from '../SectionHeading';
import { Reveal } from '../Reveal';

export function AboutPillars() {
  return (
    <section className="!pt-0 pb-[48px] lg:pb-[72px]" id="mission-vision-values">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {aboutPillars.map((pillar, idx) => (
            <Reveal key={pillar.title} delay={idx * 0.1} className="h-full">
              <div className="h-full p-8 sm:p-9 rounded-[var(--radius)] bg-white border border-[var(--border)] shadow-sm flex flex-col justify-between">
                <div>
                  <SectionHeading level="h3" className="!mb-[16px] text-xl sm:text-2xl">
                    {pillar.title}
                  </SectionHeading>
                  {/* TODO: client to supply */}
                  <p className="lead-text text-sm sm:text-base leading-relaxed text-[var(--muted)]">
                    {pillar.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
