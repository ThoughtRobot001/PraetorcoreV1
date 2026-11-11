import React from 'react';
import { howWeWorkSection } from '@/content/about';
import { Container } from '../Container';
import { SectionEyebrow } from '../SectionEyebrow';
import { SectionHeading } from '../SectionHeading';
import { Reveal } from '../Reveal';

export function HowWeWork() {
  return (
    <section className="py-[48px] lg:py-[72px] border-t border-[var(--border)]" id="how-we-work">
      <Container>
        <Reveal className="!mb-[40px]">
          <SectionEyebrow className="!mb-[14px]">{howWeWorkSection.eyebrow}</SectionEyebrow>
          <SectionHeading level="h2">{howWeWorkSection.heading}</SectionHeading>
        </Reveal>

        {/* Four numbered steps in a row on desktop, 2x2 on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {howWeWorkSection.steps.map((step, idx) => (
            <Reveal key={step.step} delay={idx * 0.08} className="h-full">
              <div className="h-full p-6 sm:p-7 rounded-[var(--radius)] bg-white border border-[var(--border)] shadow-sm flex flex-col justify-between">
                <div>
                  <div
                    className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)] mb-3 opacity-30"
                    aria-hidden="true"
                  >
                    {step.step}
                  </div>
                  <SectionHeading level="h3" className="mb-3 text-lg sm:text-xl">
                    {step.title}
                  </SectionHeading>
                  {/* TODO: client to supply */}
                  <p className="lead-text text-xs sm:text-sm leading-relaxed text-[var(--muted)]">
                    {step.description}
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
