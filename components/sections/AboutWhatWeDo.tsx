import React from 'react';
import Link from 'next/link';
import { whatWeDoSection } from '@/content/about';
import { Container } from '../Container';
import { SectionEyebrow } from '../SectionEyebrow';
import { SectionHeading } from '../SectionHeading';
import { ArrowIcon } from '../ArrowIcon';
import { Reveal } from '../Reveal';

function WhatWeDoIcon({
  type,
}: {
  type: 'data' | 'cybersecurity' | 'software' | 'training';
}) {
  if (type === 'data') {
    return (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-8 h-8 text-[var(--ink)]"
        aria-hidden="true"
      >
        <path d="M6 34V20M16 34V8M26 34V16M36 34V24" />
      </svg>
    );
  }
  if (type === 'cybersecurity') {
    return (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-8 h-8 text-[var(--ink)]"
        aria-hidden="true"
      >
        <path d="M20 4 7 9v10c0 8 5.5 14 13 17 7.5-3 13-9 13-17V9z" />
      </svg>
    );
  }
  if (type === 'training') {
    return (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-8 h-8 text-[var(--ink)]"
        aria-hidden="true"
      >
        <path d="M4 16L20 8l16 8-16 8-16-8z" />
        <path d="M10 19v10c0 4 4.5 7 10 7s10-3 10-7V19" />
        <path d="M36 16v12" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="w-8 h-8 text-[var(--ink)]"
      aria-hidden="true"
    >
      <path d="m14 12-8 8 8 8M26 12l8 8-8 8M23 8l-6 24" />
    </svg>
  );
}

export function AboutWhatWeDo() {
  return (
    <section
      className="py-[56px] lg:py-[80px] border-t border-[var(--border)]"
      style={{ background: 'var(--accent-soft)' }}
      id="what-we-do"
    >
      <Container>
        <Reveal className="!mb-[40px]">
          <SectionEyebrow style={{ color: 'var(--ink)' }} className="!mb-[14px]">
            {whatWeDoSection.eyebrow}
          </SectionEyebrow>
          <SectionHeading level="h2">{whatWeDoSection.heading}</SectionHeading>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {whatWeDoSection.items.map((item, idx) => (
            <Reveal key={item.id} delay={idx * 0.08} className="h-full">
              <Link
                href={item.href}
                className="group block h-full p-8 sm:p-9 rounded-[var(--radius)] bg-white/90 border border-[var(--border)] hover:border-[var(--ink)] shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-[var(--radius)] bg-[var(--cream)] border border-[var(--border)] flex items-center justify-center mb-6">
                      <WhatWeDoIcon type={item.icon} />
                    </div>
                    <SectionHeading
                      level="h3"
                      className="mb-3 text-xl sm:text-2xl group-hover:text-[var(--ink)] transition-colors"
                    >
                      {item.title}
                    </SectionHeading>
                    {/* TODO: client to supply */}
                    <p className="lead-text text-sm sm:text-base leading-relaxed text-[var(--muted)]">
                      {item.summary}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
                    <span>
                      {item.href === '/training' ? 'Explore training' : 'View service'}
                    </span>
                    <ArrowIcon
                      size={11}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
