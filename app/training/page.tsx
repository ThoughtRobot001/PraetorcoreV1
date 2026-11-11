import React from 'react';
import { Metadata } from 'next';
import { Container } from '@/components/Container';
import { SectionHeading } from '@/components/SectionHeading';
import { SectionEyebrow } from '@/components/SectionEyebrow';
import { Button } from '@/components/Button';
import { Reveal } from '@/components/Reveal';
import { FAQ } from '@/components/sections/FAQ';
import { ConsultationCTA } from '@/components/sections/ConsultationCTA';
import { PageHero } from '@/components/sections/PageHero';
import { trainingFaqs, trainingHero } from '@/content/training';
import { loadPublicProgrammes } from '@/lib/programme-state';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Training Programmes | Practical Tech Education',
  description:
    'Hands-on technology training programmes in Abuja. Explore our flagship Tech4Youth initiative and custom enterprise workforce upskilling cohorts.',
};

export default async function TrainingPage() {
  const programmes = await loadPublicProgrammes();
  return (
    <>
      {/* 1. Page Hero */}
      <PageHero {...trainingHero} />

      {/* 2. Our Current Programme */}
      <section className="section-spacing pt-0">
        <Container>
          <Reveal className="mb-8">
            <SectionEyebrow>OUR CURRENT PROGRAMME</SectionEyebrow>
            <SectionHeading level="h2">Hands-on cohorts in session</SectionHeading>
          </Reveal>

          <div className="space-y-6">
            {programmes.map((prog) => (
              <Reveal key={prog.slug}>
                <div className="p-8 sm:p-10 rounded-[var(--radius)] bg-white border border-[var(--border)] shadow-sm">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span
                      className="pill-badge text-xs"
                      style={{ background: 'var(--accent)', borderColor: 'var(--accent)' }}
                    >
                      {prog.status === 'open' ? 'Sign-ups open' : 'Intake closed'}
                    </span>
                    {prog.pageContent.programme?.location && <span className="pill-badge text-xs">{prog.pageContent.programme.location}</span>}
                    {prog.pageContent.programme?.duration && <span className="pill-badge text-xs">{prog.pageContent.programme.duration}</span>}
                    {prog.pageContent.programme?.delivery && <span className="pill-badge text-xs">{prog.pageContent.programme.delivery}</span>}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)] mb-3">
                    {prog.title}
                  </h3>
                  <p className="lead-text text-base sm:text-lg max-w-[60ch] mb-6">
                    {prog.summary}
                  </p>

                  <div className="mb-8">
                    <div className="text-xs font-bold uppercase tracking-wider text-[var(--muted)] mb-3">
                      Specialisation Tracks
                    </div>
                    <div className="flex flex-wrap gap-2">
                    {(prog.pageContent.tracks?.items ?? []).map((track: { title: string }) => (
                        <span
                          key={track.title}
                          className="px-3 py-1.5 rounded-[var(--radius-pill)] bg-[var(--cream)] border border-[var(--border)] text-xs font-semibold text-[var(--ink)]"
                        >
                          {track.title}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[var(--border)]">
                    <Button variant="primary" href={`/training/${prog.slug}`}>
                      View programme and sign up
                    </Button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. Training for Organisations */}
      <section className="section-spacing border-t border-[var(--border)] bg-white">
        <Container>
          <div className="max-w-2xl">
            <Reveal>
              <SectionEyebrow>ENTERPRISE &amp; TEAMS</SectionEyebrow>
              {/* TODO: client to confirm they offer this */}
              <SectionHeading level="h2" className="mb-3">
                Training for organisations
              </SectionHeading>
              {/* TODO: client to confirm they offer this */}
              <p className="lead-text text-base sm:text-lg mb-6">
                We partner with corporate teams, public sector institutions, and growing companies to upskill technical staff in Data Analytics, Cybersecurity, and Software Development.
              </p>
              <Button variant="primary" href="/services?service=training#consultation">
                Book a free consultation
              </Button>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 4. FAQ Section */}
      <FAQ
        eyebrow="Training FAQ"
        title="Frequently Asked Questions"
        items={trainingFaqs}
      />

      {/* 5. Closing Consultation CTA */}
      <ConsultationCTA />
    </>
  );
}
