import React from 'react';
import Image from 'next/image';
import { homeContent } from '@/content/home';
import { Container } from '../Container';
import { SectionEyebrow } from '../SectionEyebrow';
import { SectionHeading } from '../SectionHeading';
import { Reveal } from '../Reveal';

export function PartnerLogos() {
  const { partnerLogos } = homeContent;
  const items = partnerLogos.partners;

  // Group into balanced centered rows (single row of 4 when 4 items, or 2x3x2 when 6-7 items)
  const rows =
    items.length <= 4
      ? [items]
      : [items.slice(0, 2), items.slice(2, 5), items.slice(5, 7)].filter((row) => row.length > 0);

  return (
    <section
      className="bg-white py-16 sm:py-24 border-y border-[var(--border)]"
      aria-label="Who we work with"
    >
      <Container>
        <Reveal>
          {/* Centered header in Praetorcore's typography & theme */}
          <div className="flex flex-col items-center text-center max-w-xl mx-auto">
            <SectionEyebrow className="inline-flex items-center gap-2 !mb-3">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)]" aria-hidden="true" />
              <span>OUR NETWORK</span>
            </SectionEyebrow>

            <SectionHeading level="h2">Who we work with.</SectionHeading>

            <p className="mt-3 text-base sm:text-[17px] text-[var(--muted)] leading-relaxed">
              Partnering with forward-thinking organisations, public institutions, and international development partners.
            </p>
          </div>

          {/* Centered partner logo rows */}
          <div className="mt-12 sm:mt-16 max-w-5xl mx-auto flex flex-col items-center gap-y-10 sm:gap-y-12">
            {rows.map((row, rowIdx) => (
              <div
                key={rowIdx}
                className="flex flex-wrap items-center justify-center gap-x-12 sm:gap-x-16 lg:gap-x-20 gap-y-10 w-full"
              >
                {row.map((partner) => {
                  const targetHeight = partner.displayHeight ?? 60;

                  return (
                    <div
                      key={partner.id}
                      className="flex items-center justify-center px-2 transition-transform duration-200 hover:scale-[1.03]"
                    >
                      {partner.logoSrc ? (
                        <Image
                          src={partner.logoSrc}
                          alt={partner.name}
                          width={partner.width ?? 220}
                          height={partner.height ?? 90}
                          style={{ height: `${targetHeight}px`, width: 'auto' }}
                          className="object-contain select-none"
                          unoptimized
                        />
                      ) : (
                        <span className="text-xl sm:text-[22px] font-bold tracking-tight text-[var(--ink)]">
                          {partner.name}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
