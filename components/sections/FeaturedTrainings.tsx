import React from 'react';
import Link from 'next/link';
import { ImageWithFallback } from '../ImageWithFallback';
import { homeContent } from '@/content/home';
import { tech4youthProgramme } from '@/content/programmes/tech4youth';
import { getPublicApplicationMessage } from '@/lib/programme-state';
import { Container } from '../Container';
import { SectionEyebrow } from '../SectionEyebrow';
import { SectionHeading } from '../SectionHeading';
import { ArrowLink } from '../ArrowLink';
import { ArrowIcon } from '../ArrowIcon';
import { Reveal } from '../Reveal';

export async function FeaturedTrainings() {
  const { featuredTrainings } = homeContent;
  const intakeOpen = (await getPublicApplicationMessage(tech4youthProgramme.slug)) === null;
  const tech4youthTrackCards = tech4youthProgramme.pageContent.trackCards;

  return (
    <section className="section-spacing" id="trainings">
      <Container>
        <Reveal className="head-row items-end">
          <div className="max-w-[58ch]">
            <SectionEyebrow className="inline-flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full bg-[var(--accent)]"
                aria-hidden="true"
              />
              <span>{featuredTrainings.eyebrow}</span>
            </SectionEyebrow>
            <SectionHeading level="h2">{featuredTrainings.title}</SectionHeading>
            <p className="lead-text mt-2.5 text-[var(--muted)]">
              {intakeOpen
                ? 'Our flagship cohort equipping young people with job-ready digital skills through hands-on labs and mentorship. Choose a track below to apply.'
                : 'Our flagship cohort equipping young people with job-ready digital skills through hands-on labs and mentorship. This intake has closed — check back for the next cohort.'}
            </p>
          </div>
          <ArrowLink href={featuredTrainings.viewAllCta.href}>
            {featuredTrainings.viewAllCta.label}
          </ArrowLink>
        </Reveal>

        {/* Four track cards in 2x2 grid */}
        <div className="cards-grid">
          {tech4youthTrackCards.map((track, index) => (
            <Reveal key={track.slug} delay={index * 0.08} className="h-full flex flex-col">
              <Link
                href={
                  intakeOpen
                    ? `/training/tech4youth?track=${track.slug}#signup`
                    : `/training/tech4youth`
                }
                className="card-item group h-full flex flex-col justify-between"
              >
                <div>
                  <div className="photo-frame">
                    <span className="card-badge-overlay">
                      {intakeOpen ? 'Sign-ups open' : 'Intake closed'}
                    </span>
                    {/* TODO: Replace with real photo from client */}
                    <ImageWithFallback
                      src={track.image}
                      alt={track.imageAlt}
                      fill
                      sizes="(max-width: 770px) 100vw, 50vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Card Meta - arrow removed to eliminate double arrows */}
                  <div className="card-meta">
                    <div>
                      {/* TODO: client to confirm tracks and details */}
                      <SectionHeading level="h3">{track.title}</SectionHeading>
                      <small>{track.meta}</small>
                    </div>
                  </div>

                  {/* TODO: client to confirm tracks and details */}
                  <p className="card-lead text-[14.5px] leading-relaxed w-full">
                    {track.summary}
                  </p>
                </div>

                {/* ONE clear, prominent call to action */}
                <div className="card-footer mt-5 pt-3.5 border-t border-[var(--border)]">
                  {intakeOpen ? (
                    <div className="btn btn-outline w-full justify-between py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-[var(--ink)] group-hover:bg-[var(--ink)] group-hover:text-white group-hover:border-[var(--ink)] transition-all duration-200">
                      <span>Apply for {track.title}</span>
                      <ArrowIcon
                        size={12}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </div>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="btn btn-outline w-full justify-center py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-[var(--muted)] opacity-60 cursor-not-allowed border-dashed"
                    >
                      <span>Intake closed</span>
                    </button>
                  )}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
