import React from 'react';
import { homeContent, ServiceItem } from '@/content/home';
import { Container } from '../Container';
import { SectionEyebrow } from '../SectionEyebrow';
import { SectionHeading } from '../SectionHeading';
import { ArrowLink } from '../ArrowLink';
import { Reveal } from '../Reveal';

function ServiceIcon({ type }: { type: ServiceItem['icon'] }) {
  if (type === 'data') {
    return (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
        className="service-lead-icon"
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
        aria-hidden="true"
        className="service-lead-icon"
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
        aria-hidden="true"
        className="service-lead-icon"
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
      aria-hidden="true"
      className="service-lead-icon"
    >
      <path d="m14 12-8 8 8 8M26 12l8 8-8 8M23 8l-6 24" />
    </svg>
  );
}

export function ServicesList() {
  const { services } = homeContent;

  return (
    <section className="section-spacing services-section" id="services">
      <Container>
        <Reveal>
          <SectionEyebrow style={{ color: 'var(--ink)' }}>
            {services.eyebrow}
          </SectionEyebrow>
          <SectionHeading level="h2">{services.title}</SectionHeading>
        </Reveal>

        <Reveal delay={0.1} className="services-list-container">
          {services.servicesList.map((service) => (
            <div key={service.id} className="service-row">
              <ServiceIcon type={service.icon} />
              <div>
                <SectionHeading level="h3">{service.title}</SectionHeading>
                <p>{service.description}</p>
              </div>
              <ArrowLink href={service.href}>{service.ctaText}</ArrowLink>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
