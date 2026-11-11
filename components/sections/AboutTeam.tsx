import React from 'react';
import { teamSection } from '@/content/about';
import { siteConfig } from '@/content/site';
import { Container } from '../Container';
import { SectionEyebrow } from '../SectionEyebrow';
import { SectionHeading } from '../SectionHeading';
import { ImageWithFallback } from '../ImageWithFallback';
import { Reveal } from '../Reveal';

export function AboutTeam() {
  if (!siteConfig.showPlaceholderSections) {
    return null;
  }

  return (
    <section className="py-[56px] lg:py-[88px] border-t border-[var(--border)]" id="team">
      <Container>
        <Reveal className="!mb-[44px] max-w-[62ch]">
          <SectionEyebrow className="!mb-[14px]">{teamSection.eyebrow}</SectionEyebrow>
          <SectionHeading level="h2">{teamSection.heading}</SectionHeading>
          <p className="lead-text mt-3 text-[var(--muted)]">{teamSection.lead}</p>
        </Reveal>

        {/* PLACEHOLDER: dummy team members, replace with real team before launch */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-8">
          {teamSection.members.map((member, idx) => (
            <Reveal key={member.name} delay={idx * 0.08} className="h-full">
              <article className="group h-full rounded-[var(--radius)] bg-white border border-[var(--border)] overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col">
                <div className="relative aspect-[4/3] w-full bg-[var(--cream)] overflow-hidden border-b border-[var(--border)]">
                  <ImageWithFallback
                    src={member.image}
                    alt={`Portrait of ${member.name}, ${member.role}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute left-3.5 top-3.5 inline-flex items-center px-3 py-1 rounded-[var(--radius-pill)] bg-[var(--ink)]/85 text-[var(--accent)] text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm">
                    {member.specialty}
                  </span>
                </div>

                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-bold text-[var(--ink)] leading-snug">
                          {member.name}
                        </h3>
                        <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mt-1">
                          {member.role}
                        </p>
                      </div>
                      {member.linkedinUrl && (
                        <a
                          href={member.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} on LinkedIn`}
                          className="w-9 h-9 rounded-lg bg-[var(--cream)] border border-[var(--border)] text-[var(--ink)] hover:bg-[var(--accent)] hover:border-[var(--accent)] transition-colors inline-grid place-items-center shrink-0"
                        >
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
                          </svg>
                        </a>
                      )}
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
