import React from 'react';
import { homeContent } from '@/content/home';
import { siteConfig } from '@/content/site';
import { Container } from '../Container';
import { SectionEyebrow } from '../SectionEyebrow';
import { SectionHeading } from '../SectionHeading';
import { Button } from '../Button';
import { Reveal } from '../Reveal';

export function Tech4YouthBanner() {
  const { tech4Youth } = homeContent;

  return (
    <section className="py-[56px] lg:py-[80px] dark-section on-dark" id="tech4youth">
      <Container>
        <div className="t4y-grid">
          <Reveal>
            <SectionEyebrow className="!mb-[14px]">{tech4Youth.eyebrow}</SectionEyebrow>
            <SectionHeading level="h2">{tech4Youth.title}</SectionHeading>
          </Reveal>
          <Reveal delay={0.1}>
            {/* TODO: confirm with Tech4Youth team */}
            <p className="lead-text">{tech4Youth.lead}</p>
            <div className="t4y-cta-wrapper">
              <Button variant="primary" href={tech4Youth.cta.href}>
                {tech4Youth.cta.label}
              </Button>
            </div>
          </Reveal>
        </div>

        {/* PLACEHOLDER: fake content, replace with real content or remove */}
        {/* TODO: placeholder numbers, replace with real figures or remove this strip */}
        {siteConfig.showPlaceholderSections && (
          <Reveal delay={0.2}>
            <div className="stats-grid">
              {tech4Youth.stats.map((stat) => (
                <div key={stat.label} className="stat-item">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
