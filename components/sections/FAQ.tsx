'use client';

import React, { useState } from 'react';
import { ImageWithFallback } from '../ImageWithFallback';
import { homeContent } from '@/content/home';
import { Container } from '../Container';
import { SectionEyebrow } from '../SectionEyebrow';
import { SectionHeading } from '../SectionHeading';
import { Reveal } from '../Reveal';

interface FAQProps {
  eyebrow?: string;
  title?: string;
  image?: {
    src: string;
    alt: string;
  };
  items?: { id: string; question: string; answer: string }[];
}

export function FAQ({ eyebrow, title, image, items }: FAQProps = {}) {
  const defaultFaq = homeContent.faq;
  const activeEyebrow = eyebrow || defaultFaq.eyebrow;
  const activeTitle = title || defaultFaq.title;
  const activeImage = image || defaultFaq.image;
  const activeItems = items || defaultFaq.items;

  // First item open by default for clear discoverability
  const [openId, setOpenId] = useState<string | null>(activeItems[0]?.id || null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="section-spacing faq-section" id="faq">
      <Container>
        <div className="faq-grid">
          {/* Left Column: Eyebrow, Heading, and Reference-matching Collaboration Photo */}
          <div className="faq-left-col">
            <Reveal>
              <SectionEyebrow style={{ color: 'var(--accent)' }}>
                {activeEyebrow}
              </SectionEyebrow>
              <SectionHeading
                level="h2"
                style={{
                  color: '#ffffff',
                  fontSize: 'clamp(35.2px, 4.4vw, 52.8px)',
                  letterSpacing: '-0.025em',
                  marginTop: '6px',
                }}
              >
                {activeTitle}
              </SectionHeading>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="faq-photo-frame">
                {/* TODO: Replace with real photo from client */}
                <ImageWithFallback
                  src={activeImage.src}
                  alt={activeImage.alt}
                  fill
                  sizes="(max-width: 946px) 100vw, 45vw"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </Reveal>
          </div>

          {/* Right Column: Accordion FAQ List with plus/minus toggles */}
          <div className="faq-list">
            {activeItems.map((item, index) => {
              const isOpen = openId === item.id;
              return (
                <Reveal key={item.id} delay={index * 0.04}>
                  <div className="faq-item">
                    <button
                      id={`faq-trigger-${item.id}`}
                      type="button"
                      className="faq-trigger"
                      onClick={() => toggleItem(item.id)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${item.id}`}
                    >
                      <span>{item.question}</span>
                      <span
                        className={`faq-icon ${isOpen ? 'open' : ''}`}
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </button>

                    {isOpen && (
                      <div
                        id={`faq-answer-${item.id}`}
                        role="region"
                        aria-labelledby={`faq-trigger-${item.id}`}
                        className="faq-answer"
                      >
                        <p style={{ margin: 0 }}>{item.answer}</p>
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
