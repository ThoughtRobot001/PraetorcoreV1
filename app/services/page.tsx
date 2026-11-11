import React from 'react';
import { Metadata } from 'next';
import { Container } from '@/components/Container';
import { SectionHeading } from '@/components/SectionHeading';
import { SectionEyebrow } from '@/components/SectionEyebrow';
import { Button } from '@/components/Button';
import { Reveal } from '@/components/Reveal';
import { servicesList, servicesHero } from '@/content/services';
import { ConsultationForm } from '@/components/ConsultationForm';
import { PageHero } from '@/components/sections/PageHero';

export const metadata: Metadata = {
  title: 'Technology Services & Enterprise Consulting',
  description:
    'Bespoke technology services in Data Analytics, Cybersecurity, and Custom Software Development. Architected for operational stability, scalability, and security.',
};

interface ServicesPageProps {
  searchParams?: Promise<{ service?: string }>;
}

export default async function ServicesPage({ searchParams }: ServicesPageProps) {
  const resolvedParams = searchParams ? await searchParams : undefined;
  const selectedServiceSlug = resolvedParams?.service;

  return (
    <>
      {/* 1. Page Hero Section */}
      <PageHero {...servicesHero} />

      {/* 2. Alternating Service Sections */}
      <div className="space-y-0">
        {servicesList.map((service, index) => {
          const isReversed = index % 2 !== 0;

          return (
            <section
              key={service.slug}
              id={service.slug}
              className={`section-spacing border-t border-[var(--border)] ${
                index % 2 === 1 ? 'bg-white' : 'bg-[var(--cream)]'
              }`}
            >
              <Container>
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start ${
                    isReversed ? 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1' : ''
                  }`}
                >
                  {/* Column 1: Title, Overview, and CTA */}
                  <div className="lg:col-span-6 flex flex-col justify-between">
                    <Reveal>
                      <span className="testimonial-service-tag mb-3">{service.title}</span>
                      <SectionHeading level="h2" className="mb-4">
                        {service.title}
                      </SectionHeading>
                      <p className="lead-text text-base leading-relaxed text-[var(--ink)] mb-6">
                        {service.overview}
                      </p>

                      <div className="pt-2">
                        <Button
                          variant="primary"
                          href={`/services?service=${service.slug}#consultation`}
                        >
                          Book a free consultation
                        </Button>
                      </div>
                    </Reveal>
                  </div>

                  {/* Column 2: Offerings and Typical Use Cases */}
                  <div className="lg:col-span-6 flex flex-col gap-8">
                    {/* What we offer */}
                    <Reveal delay={0.1}>
                      <div className="p-6 sm:p-7 rounded-[var(--radius)] bg-white border border-[var(--border)] shadow-sm">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--ink)] mb-4">
                          What we offer
                        </h3>
                        <ul className="space-y-3 list-none p-0 m-0">
                          {service.offerings.map((offering, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-3 text-sm leading-relaxed text-[var(--ink)]"
                            >
                              <span
                                className="w-4 h-4 rounded-full bg-[var(--accent)] text-[var(--ink)] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5"
                                aria-hidden="true"
                              >
                                ✓
                              </span>
                              <span>{offering}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Reveal>

                    {/* Typical use cases */}
                    <Reveal delay={0.15}>
                      <div className="p-6 sm:p-7 rounded-[var(--radius)] bg-white/70 border border-[var(--border)]">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--muted)] mb-4">
                          Typical use cases
                        </h3>
                        <ul className="space-y-2.5 list-none p-0 m-0">
                          {service.useCases.map((useCase, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--muted)]"
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full bg-[var(--muted)] shrink-0 mt-2"
                                aria-hidden="true"
                              />
                              <span className="text-[var(--ink)]">{useCase}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Reveal>
                  </div>
                </div>
              </Container>
            </section>
          );
        })}
      </div>

      {/* 3. Consultation Form Section */}
      <section className="section-spacing border-t border-[var(--border)] bg-[var(--cream)]">
        <Container>
          <div className="max-w-2xl mx-auto">
            <Reveal className="text-center mb-8">
              <SectionEyebrow>Discovery &amp; Scoping</SectionEyebrow>
              <SectionHeading level="h2" className="mb-3">
                Request a Consultation
              </SectionHeading>
              <p className="lead-text text-sm sm:text-base max-w-[48ch] mx-auto">
                Share your organizational requirements below. We will review your scope and arrange an introductory strategy call.
              </p>
            </Reveal>

            <ConsultationForm initialServiceSlug={selectedServiceSlug} />
          </div>
        </Container>
      </section>
    </>
  );
}
