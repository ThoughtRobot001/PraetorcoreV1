'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '../ImageWithFallback';
import { homeContent } from '@/content/home';
import { Container } from '../Container';
import { SectionEyebrow } from '../SectionEyebrow';
import { SectionHeading } from '../SectionHeading';
import { Reveal } from '../Reveal';

const VISIBLE_COUNT = 3;

export function Testimonials() {
  const { testimonials } = homeContent;
  const items = testimonials.testimonials;
  const total = items.length;
  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % total);
  };

  const visibleTestimonials = Array.from({ length: Math.min(VISIBLE_COUNT, total) }, (_, offset) => {
    return items[(startIndex + offset) % total];
  });

  return (
    <section className="section-spacing" id="testimonials">
      <Container>
        <Reveal>
          <div className="testimonials-header-row">
            <div>
              <SectionEyebrow>{testimonials.eyebrow}</SectionEyebrow>
              <SectionHeading level="h2">{testimonials.title}</SectionHeading>
              <p className="lead-text" style={{ marginTop: '12px' }}>
                {testimonials.lead}
              </p>
            </div>

            {total > VISIBLE_COUNT && (
              <div className="testimonials-nav" aria-label="Testimonial navigation">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="testimonials-nav-btn"
                  aria-label="Previous testimonials"
                >
                  <ChevronLeft size={20} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="testimonials-nav-btn"
                  aria-label="Next testimonials"
                >
                  <ChevronRight size={20} aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </Reveal>

        {/* PLACEHOLDER: fake logos / fake testimonials, replace with real ones or remove before launch */}
        {/* TODO: replace with real alumni testimonials from client */}
        <div className="testimonials-grid" aria-live="polite">
          {visibleTestimonials.map((item) => (
            <div key={item.id} className="h-full flex flex-col">
              <div className="testimonial-card">
                <div>
                  <span className="testimonial-service-tag">{item.track}</span>
                  <p className="testimonial-quote">“{item.quote}”</p>
                </div>
                <div className="testimonial-author-row">
                  <div className="testimonial-avatar">
                    <ImageWithFallback
                      src={item.avatar}
                      alt={item.avatarAlt}
                      fill
                      sizes="48px"
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <div className="testimonial-author-name">{item.author}</div>
                    <div className="testimonial-meta">
                      {item.role} · {item.organization}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
