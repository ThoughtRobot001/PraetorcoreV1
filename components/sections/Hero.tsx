import React from 'react';
import { ImageWithFallback } from '../ImageWithFallback';
import { homeContent } from '@/content/home';
import { Container } from '../Container';
import { Button } from '../Button';
import { Reveal } from '../Reveal';
import { SectionEyebrow } from '../SectionEyebrow';
import { SectionHeading } from '../SectionHeading';

function HeroPillIcon({ label }: { label: string }) {
  const normalized = label.toLowerCase();

  if (normalized.includes('data')) {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="4" y="14" width="3.5" height="6" rx="0.75" />
        <rect x="10.25" y="10" width="3.5" height="10" rx="0.75" />
        <rect x="16.5" y="5" width="3.5" height="15" rx="0.75" />
      </svg>
    );
  }

  if (normalized.includes('cyber') || normalized.includes('security')) {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 2.75 4.75 6v5.75c0 5.1 3.1 9.35 7.25 10.75 4.15-1.4 7.25-5.65 7.25-10.75V6L12 2.75Z" />
        <rect x="9.5" y="11.25" width="5" height="4" rx="0.8" />
        <path d="M10.5 11.25V9.8a1.5 1.5 0 0 1 3 0v1.45" />
      </svg>
    );
  }

  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m8 8-4 4 4 4" />
      <path d="m16 8 4 4-4 4" />
      <path d="m13.5 6.5-3 11" />
    </svg>
  );
}

export function Hero() {
  const { hero } = homeContent;

  return (
    <section className="hero-section">
      <Container className="hero-grid">
        <Reveal className="hero-text-col self-center">
          <SectionEyebrow className="inline-flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full bg-[var(--accent)]"
              aria-hidden="true"
            />
            <span>{hero.eyebrow}</span>
          </SectionEyebrow>
          {/* TODO: client value proposition */}
          <SectionHeading
            level="h1"
            className="hero-headline"
            style={{ fontSize: 'clamp(34px, 4.4vw, 52px)' }}
          >
            {hero.title}
          </SectionHeading>
          <p className="lead-text">{hero.lead}</p>
          <div className="hero-actions">
            <Button variant="primary" href={hero.primaryCta.href}>
              {hero.primaryCta.label}
            </Button>
            <Button variant="outline" href={hero.secondaryCta.href}>
              {hero.secondaryCta.label}
            </Button>
          </div>
          <div className="hero-pills" role="list">
            {hero.pills.map((pill, index) => (
              <React.Fragment key={pill}>
                {index > 0 && <span className="hero-pill-divider" aria-hidden="true" />}
                <div className="hero-pill-item" role="listitem">
                  <span className="hero-pill-icon">
                    <HeroPillIcon label={pill} />
                  </span>
                  <span className="hero-pill-label">{pill}</span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </Reveal>

        <Reveal className="hero-photo-wrapper">
          {/* TODO: Replace with real photo from client */}
          <ImageWithFallback
            src={hero.image.src}
            alt={hero.image.alt}
            fill
            sizes="(max-width: 946px) 100vw, 55vw"
            className="object-cover object-center"
            priority
            referrerPolicy="no-referrer"
          />
        </Reveal>
      </Container>
    </section>
  );
}
