import React from 'react';
import { Container } from '../Container';
import { Button, ButtonVariant } from '../Button';
import { SectionEyebrow } from '../SectionEyebrow';
import { Reveal } from '../Reveal';
import { ImageWithFallback } from '../ImageWithFallback';

export interface PageHeroAction {
  label: string;
  href: string;
  variant?: ButtonVariant;
}

export interface PageHeroImage {
  src: string;
  alt: string;
}

export interface PageHeroProps {
  eyebrow: string;
  title: string;
  intro: string;
  actions?: PageHeroAction[];
  images?: PageHeroImage[];
  align?: 'center' | 'left';
  className?: string;
}

export function PageHero({
  eyebrow,
  title,
  intro,
  actions,
  images,
  align = 'center',
  className = '',
}: PageHeroProps) {
  const hasImages = Array.isArray(images) && images.length > 0;
  const isLeft = align === 'left';

  return (
    <section
      className={`page-hero-section ${className}`.trim()}
      style={{
        paddingTop: '40px',
        paddingBottom: hasImages ? '68px' : '32px',
      }}
    >
      <Container>
        {/* Hero Content with Reveal animation */}
        <Reveal
          className={`flex flex-col ${
            isLeft
              ? 'text-left items-start mr-auto'
              : 'text-center items-center mx-auto'
          }`}
        >
          <SectionEyebrow
            className={`mb-0 ${isLeft ? 'text-left mr-auto' : 'mx-auto text-center'}`}
          >
            {eyebrow}
          </SectionEyebrow>

          <h1
            className={isLeft ? 'text-left mr-auto' : 'mx-auto text-center'}
            style={{
              fontSize: 'clamp(34px, 4.4vw, 52px)',
              fontWeight: 600,
              lineHeight: 1.1,
              maxWidth: '22ch',
              textWrap: 'balance',
              letterSpacing: '-0.025em',
              marginTop: '12px',
            }}
          >
            {title}
          </h1>

          <p
            className={`text-[var(--muted)] ${
              isLeft ? 'text-left mr-auto' : 'mx-auto text-center'
            }`}
            style={{
              marginTop: '16px',
              maxWidth: '64ch',
              textWrap: 'balance',
              fontSize: 'clamp(15px, 1.6vw, 17.6px)',
              lineHeight: 1.6,
            }}
          >
            {intro}
          </p>

          {actions && actions.length > 0 && (
            <div
              className={`flex flex-wrap items-center gap-3 sm:gap-4 ${
                isLeft ? 'justify-start' : 'justify-center'
              }`}
              style={{ marginTop: '24px' }}
            >
              {actions.map((action) => (
                <Button
                  key={action.label}
                  variant={action.variant || 'primary'}
                  href={action.href}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </Reveal>

        {/* Image Strip: only rendered when images are provided */}
        {hasImages && (
          <Reveal delay={0.1}>
            <div
              className="page-hero-image-strip"
              style={{ marginTop: '36px' }}
            >
              {/* Desktop: 3 images in a row with 20px gap, middle staggered 32px lower.
                  Mobile (<770px): only the first image is shown, full width, aspect-ratio 16/10. */}
              <div className="grid grid-cols-1 min-[770px]:grid-cols-3 gap-[20px] items-start min-[770px]:pb-[32px]">
                {images.slice(0, 3).map((img, idx) => (
                  <div
                    key={`${img.src}-${idx}`}
                    className={`relative overflow-hidden rounded-[var(--radius)] border border-[var(--border)] bg-[var(--cream)] ${
                      idx === 0
                        ? 'w-full aspect-[16/10] min-[770px]:aspect-[4/3]'
                        : 'hidden min-[770px]:block min-[770px]:aspect-[4/3]'
                    } ${idx === 1 ? 'min-[770px]:translate-y-[32px]' : ''}`}
                  >
                    {/* TODO: Replace with real photo from client */}
                    <ImageWithFallback
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 769px) 100vw, 33vw"
                      className="object-cover"
                      priority={idx === 0}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
