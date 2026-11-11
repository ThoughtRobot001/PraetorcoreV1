import React from 'react';
import { Metadata } from 'next';
import { Container } from '@/components/Container';
import { SectionHeading } from '@/components/SectionHeading';
import { SectionEyebrow } from '@/components/SectionEyebrow';
import { Button } from '@/components/Button';
import { Pill } from '@/components/Pill';
import { Reveal } from '@/components/Reveal';
import { Tech4YouthImageCarousel } from '@/components/Tech4YouthImageCarousel';
import { ProgrammeForm } from '@/components/ProgrammeForm';
import { tech4youthProgramme } from '@/content/programmes/tech4youth';
import { getProgrammeState, getPublicApplicationMessage } from '@/lib/programme-state';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Tech4Youth Programme | Youth Tech Empowerment in Abuja',
  description:
    'A three-month in-person programme equipping young people in Abuja with hands-on skills in AI, Cybersecurity, Data Analytics, and Software Development.',
};

interface Tech4YouthPageProps {
  searchParams?: Promise<{ track?: string }>;
}

function resolveTrackParam(trackParam: string | undefined, trackOptions: string[]): string | undefined {
  if (!trackParam) return undefined;
  const clean = trackParam.trim().toLowerCase();

  const slugMap: Record<string, string> = {
    'artificial-intelligence': 'Artificial Intelligence',
    'ai': 'Artificial Intelligence',
    'cybersecurity': 'Cybersecurity',
    'cyber': 'Cybersecurity',
    'data-analytics': 'Data Analytics',
    'data': 'Data Analytics',
    'software-development': 'Software Development',
    'software': 'Software Development',
    'web-development': 'Software Development',
  };

  if (slugMap[clean]) {
    return slugMap[clean];
  }

  // Check direct case-insensitive match against trackOptions
  const match = trackOptions.find(
    (opt) => opt.toLowerCase() === clean
  );
  return match || undefined;
}

export default async function Tech4YouthPage({ searchParams }: Tech4YouthPageProps) {
  const resolvedParams = searchParams ? await searchParams : undefined;
  const pageContent = tech4youthProgramme.pageContent;
  const defaultTrack = resolveTrackParam(resolvedParams?.track, pageContent.trackOptions);
  let programmeState;
  try { programmeState = await getProgrammeState(tech4youthProgramme.slug); } catch { notFound(); }
  if (!programmeState || (programmeState.status !== 'open' && programmeState.status !== 'closed')) notFound();
  const statusMessage = await getPublicApplicationMessage(tech4youthProgramme.slug);
  const { hero, overview, tracks, benefits, eligibility, programme } = pageContent;

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 xl:gap-14">
            <Reveal>
              <SectionEyebrow>{hero.eyebrow}</SectionEyebrow>
              <SectionHeading level="h1" className="hero-headline" style={{ maxWidth: '16ch' }}>
                {hero.title}
              </SectionHeading>
              <p className="lead-text" style={{ maxWidth: '52ch', marginBottom: '24px' }}>
                {hero.lead}
              </p>

              <div className="hero-actions">
                <Button variant="primary" href="#signup">
                  {hero.ctaLabel}
                </Button>
                <Button variant="outline" href="#tracks">
                  Explore Tracks
                </Button>
              </div>

              <div className="hero-pills" style={{ marginTop: '30.8px' }}>
                <Pill>Location: {programme.location}</Pill>
                <Pill>Delivery: {programme.delivery}</Pill>
                <Pill>Duration: {programme.duration}</Pill>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <Tech4YouthImageCarousel />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 2. WHAT TECH4YOUTH IS AND WHO IT IS FOR */}
      <section className="section-spacing" style={{ borderTop: '1px solid var(--border)' }}>
        <Container>
          <div className="t4y-grid">
            <Reveal>
              <SectionEyebrow>{overview.eyebrow}</SectionEyebrow>
              <SectionHeading level="h2">{overview.title}</SectionHeading>
              <p className="lead-text" style={{ marginTop: '16px' }}>
                {overview.lead}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  padding: '32px 28px',
                }}
              >
                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    marginBottom: '16px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  Who this programme is for
                </h3>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                  }}
                >
                  {overview.targetAudience.map((audience, i) => (
                    <li
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        fontSize: '14.3px',
                        lineHeight: 1.5,
                        color: 'var(--ink)',
                      }}
                    >
                      <span
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          background: 'var(--accent)',
                          color: 'var(--ink)',
                          display: 'grid',
                          placeItems: 'center',
                          fontSize: '11px',
                          fontWeight: 700,
                          flexShrink: 0,
                          marginTop: '2px',
                        }}
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                      <span>{audience}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 3. FOUR TRACK CARDS */}
      <section id="tracks" className="section-spacing services-section">
        <Container>
          <Reveal className="head-row">
            <div>
              <SectionEyebrow>{tracks.eyebrow}</SectionEyebrow>
              <SectionHeading level="h2">{tracks.title}</SectionHeading>
              <p className="lead-text" style={{ marginTop: '12px' }}>
                {tracks.lead}
              </p>
            </div>
          </Reveal>

          <div className="cards-grid">
            {tracks.items.map((track, index) => (
              <Reveal key={track.id} delay={index * 0.08} className="h-full flex flex-col">
                <div
                  style={{
                    background: '#ffffff',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    padding: '32px 28px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <span className="testimonial-service-tag">{track.title}</span>
                    <h3
                      style={{
                        fontSize: '22px',
                        fontWeight: 700,
                        margin: '8px 0 12px',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {track.title}
                    </h3>
                    <p className="lead-text" style={{ fontSize: '14.3px', lineHeight: 1.6 }}>
                      {track.description}
                    </p>
                  </div>

                  <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                    <div
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'var(--muted)',
                        marginBottom: '8px',
                      }}
                    >
                      Core skills covered
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {track.skills.map((skill) => (
                        <span
                          key={skill}
                          style={{
                            fontSize: '12.1px',
                            padding: '4px 10px',
                            borderRadius: 'var(--radius-pill)',
                            background: 'var(--cream)',
                            border: '1px solid var(--border)',
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. WHAT PARTICIPANTS RECEIVE & 5. ELIGIBILITY */}
      <section className="section-spacing">
        <Container>
          <div className="t4y-grid">
            {/* What participants receive */}
            <Reveal>
              <SectionEyebrow>{benefits.eyebrow}</SectionEyebrow>
              <SectionHeading level="h2">{benefits.title}</SectionHeading>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  marginTop: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                {benefits.items.map((benefit, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      fontSize: '14.3px',
                      lineHeight: 1.6,
                      color: 'var(--ink)',
                    }}
                  >
                    <span
                      style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: 'var(--radius)',
                        background: 'var(--ink)',
                        color: 'var(--cream)',
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: '12px',
                        fontWeight: 700,
                        flexShrink: 0,
                        marginTop: '2px',
                      }}
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Eligibility */}
            <Reveal delay={0.1}>
              <div
                style={{
                  background: 'var(--cream)',
                  border: '1.5px solid var(--ink)',
                  borderRadius: 'var(--radius)',
                  padding: '36px 30px',
                }}
              >
                <SectionEyebrow>{eligibility.eyebrow}</SectionEyebrow>
                <h3
                  style={{
                    fontSize: '24px',
                    fontWeight: 700,
                    margin: '6px 0 16px',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {eligibility.title}
                </h3>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                  }}
                >
                  {eligibility.items.map((req, i) => (
                    <li
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        fontSize: '14.3px',
                        lineHeight: 1.5,
                        color: 'var(--ink)',
                      }}
                    >
                      <span
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          background: 'var(--ink)',
                          color: '#fff',
                          display: 'grid',
                          placeItems: 'center',
                          fontSize: '10px',
                          fontWeight: 700,
                          flexShrink: 0,
                          marginTop: '3px',
                        }}
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>

                <div style={{ marginTop: '28px' }}>
                  <Button variant="primary" href="#signup">
                    Apply if Eligible
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 6. SIGN-UP FORM (id="signup") */}
      <section id="signup" className="section-spacing" style={{ borderTop: '1px solid var(--border)' }}>
        <Container>
          <Reveal style={{ marginBottom: '44px' }}>
            <SectionEyebrow>Cohort Registration</SectionEyebrow>
            <SectionHeading level="h2">Tech4Youth Application Form</SectionHeading>
            <p className="lead-text" style={{ marginTop: '12px' }}>
              Submit your application below. Cohort placements are competitive and evaluated on commitment and availability.
            </p>
          </Reveal>

          <ProgrammeForm definition={tech4youthProgramme} statusMessage={statusMessage} defaultTrack={defaultTrack} />
        </Container>
      </section>
    </>
  );
}
