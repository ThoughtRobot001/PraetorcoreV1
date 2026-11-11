import React from 'react';
import { homeContent } from '@/content/home';
import { Container } from '../Container';
import { SectionHeading } from '../SectionHeading';
import { Button } from '../Button';
import { Reveal } from '../Reveal';

function ConsultationIllustration() {
  return (
    <div className="cta-illustration-wrap" aria-hidden="true">
      <svg
        viewBox="0 0 500 330"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="cta-illustration-svg"
      >
        {/* Main white UI card */}
        <rect x="0" y="0" width="500" height="330" rx="14" fill="#FFFFFF" />

        {/* Top header skeleton bars */}
        <rect x="28" y="26" width="192" height="14" rx="7" fill="#EFECE4" />
        <rect x="28" y="54" width="110" height="10" rx="5" fill="#F5F3ED" />
        <rect x="332" y="54" width="140" height="10" rx="5" fill="#EFECE4" />

        {/* Left area: 4 service scope mini-cards + architecture/metrics grid */}
        {/* Card 1: Data Analytics mini chart */}
        <rect
          x="28"
          y="82"
          width="132"
          height="94"
          rx="10"
          fill="#FAF8F4"
          stroke="#ECE8DE"
          strokeWidth="1.2"
        />
        <rect x="42" y="96" width="56" height="7" rx="3.5" fill="#E5E0D4" />
        <rect x="44" y="142" width="14" height="20" rx="3" fill="#EFECE4" />
        <rect x="66" y="128" width="14" height="34" rx="3" fill="#E5E0D4" />
        <rect x="88" y="114" width="14" height="48" rx="3" fill="#FCD66B" />
        <rect x="110" y="122" width="14" height="40" rx="3" fill="#FFB800" />

        {/* Card 2: Cybersecurity shield & posture */}
        <rect
          x="172"
          y="82"
          width="132"
          height="94"
          rx="10"
          fill="#FAF8F4"
          stroke="#ECE8DE"
          strokeWidth="1.2"
        />
        <rect x="186" y="96" width="64" height="7" rx="3.5" fill="#E5E0D4" />
        <path
          d="M238 114L218 122V136C218 148.5 226.5 159.5 238 163C249.5 159.5 258 148.5 258 136V122L238 114Z"
          fill="#FFF4D1"
          stroke="#FFB800"
          strokeWidth="2"
        />
        <path
          d="M232 138L236.5 142.5L245 134"
          stroke="#0A0A0A"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Card 3: Custom Software code block */}
        <rect
          x="28"
          y="188"
          width="132"
          height="112"
          rx="10"
          fill="#FAF8F4"
          stroke="#ECE8DE"
          strokeWidth="1.2"
        />
        <circle cx="43" cy="203" r="3.5" fill="#E5E0D4" />
        <circle cx="54" cy="203" r="3.5" fill="#E5E0D4" />
        <circle cx="65" cy="203" r="3.5" fill="#E5E0D4" />
        <rect x="42" y="220" width="48" height="7" rx="3.5" fill="#FFB800" />
        <rect x="52" y="235" width="76" height="7" rx="3.5" fill="#E5E0D4" />
        <rect x="52" y="250" width="60" height="7" rx="3.5" fill="#EFECE4" />
        <rect x="42" y="265" width="40" height="7" rx="3.5" fill="#E5E0D4" />

        {/* Card 4: Capacity building & roadmap */}
        <rect
          x="172"
          y="188"
          width="132"
          height="112"
          rx="10"
          fill="#FAF8F4"
          stroke="#ECE8DE"
          strokeWidth="1.2"
        />
        <rect x="186" y="202" width="72" height="7" rx="3.5" fill="#E5E0D4" />
        <rect x="186" y="246" width="96" height="8" rx="4" fill="#EFECE4" />
        <rect x="186" y="264" width="74" height="8" rx="4" fill="#EFECE4" />
        <rect x="186" y="282" width="52" height="8" rx="4" fill="#FCD66B" />

        {/* Right column: Service track selection slots (matching reference layout) */}
        {/* Slot 1: Data Analytics */}
        <rect
          x="332"
          y="82"
          width="140"
          height="42"
          rx="7"
          fill="#FFFFFF"
          stroke="#E5E1D8"
          strokeWidth="1.2"
        />
        <rect x="344" y="95" width="16" height="16" rx="4" fill="#FFF4D1" />
        <path
          d="M348 107V103M352 107V100M356 107V98"
          stroke="#0A0A0A"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <text
          x="368"
          y="107"
          fill="#0A0A0A"
          fontSize="11"
          fontWeight="600"
          fontFamily="var(--font), sans-serif"
        >
          Data Analytics
        </text>

        {/* Slot 2: Cybersecurity */}
        <rect
          x="332"
          y="134"
          width="140"
          height="42"
          rx="7"
          fill="#FFFFFF"
          stroke="#E5E1D8"
          strokeWidth="1.2"
        />
        <rect x="344" y="147" width="16" height="16" rx="4" fill="#FFF4D1" />
        <path
          d="M352 150L347.5 152V155.5C347.5 158.3 349.4 160.7 352 161.5C354.6 160.7 356.5 158.3 356.5 155.5V152L352 150Z"
          stroke="#0A0A0A"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <text
          x="368"
          y="159"
          fill="#0A0A0A"
          fontSize="11"
          fontWeight="600"
          fontFamily="var(--font), sans-serif"
        >
          Cybersecurity
        </text>

        {/* Slot 3: Software Dev (Active/Selected highlight) */}
        <rect
          x="332"
          y="186"
          width="140"
          height="42"
          rx="7"
          fill="#FFF9E6"
          stroke="#FFB800"
          strokeWidth="1.8"
        />
        <rect x="344" y="199" width="16" height="16" rx="4" fill="#FFB800" />
        <path
          d="M349.5 204.5L347 207L349.5 209.5M354.5 204.5L357 207L354.5 209.5"
          stroke="#0A0A0A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          x="368"
          y="211"
          fill="#0A0A0A"
          fontSize="11"
          fontWeight="700"
          fontFamily="var(--font), sans-serif"
        >
          Software Dev
        </text>

        {/* Slot 4: Team Training */}
        <rect
          x="332"
          y="238"
          width="140"
          height="42"
          rx="7"
          fill="#FFFFFF"
          stroke="#E5E1D8"
          strokeWidth="1.2"
        />
        <rect x="344" y="251" width="16" height="16" rx="4" fill="#FFF4D1" />
        <path
          d="M346.5 257.5L352 254.5L357.5 257.5L352 260.5L346.5 257.5Z"
          stroke="#0A0A0A"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <text
          x="368"
          y="263"
          fill="#0A0A0A"
          fontSize="11"
          fontWeight="600"
          fontFamily="var(--font), sans-serif"
        >
          Team Training
        </text>

        {/* Pop-out Circular Callout Badge (matching reference style) */}
        <g>
          {/* 3 Gold accent rays at top-left of circle */}
          <line
            x1="126"
            y1="142"
            x2="136"
            y2="152"
            stroke="#FFB800"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="145"
            y1="133"
            x2="147"
            y2="146"
            stroke="#FFB800"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="118"
            y1="162"
            x2="131"
            y2="163"
            stroke="#FFB800"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* White circle with bold gold border */}
          <circle
            cx="182"
            cy="196"
            r="52"
            fill="#FFFFFF"
            stroke="#FFB800"
            strokeWidth="3.5"
          />

          {/* Callout text inside circle */}
          <text
            x="182"
            y="186"
            textAnchor="middle"
            fill="#0A0A0A"
            fontSize="24"
            fontWeight="700"
            fontFamily="var(--font), sans-serif"
          >
            Free
          </text>
          <line
            x1="150"
            y1="198"
            x2="214"
            y2="198"
            stroke="#E5E1D8"
            strokeWidth="1.2"
          />
          <text
            x="182"
            y="216"
            textAnchor="middle"
            fill="#5C5C5C"
            fontSize="11.5"
            fontWeight="700"
            fontFamily="var(--font), sans-serif"
          >
            STRATEGY CALL
          </text>

          {/* Curved gold arrow from right slot to circle */}
          <path
            d="M324 214C302 242 262 244 236 222"
            stroke="#FFB800"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M236 231L235 221L245 222"
            stroke="#FFB800"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Label pill above the arrow */}
          <rect x="242" y="176" width="84" height="36" rx="6" fill="#FFFFFF" />
          <text
            x="246"
            y="191"
            fill="#0A0A0A"
            fontSize="11.5"
            fontWeight="700"
            fontFamily="var(--font), sans-serif"
          >
            Pick a track
          </text>
          <text
            x="246"
            y="206"
            fill="#5C5C5C"
            fontSize="11"
            fontWeight="600"
            fontFamily="var(--font), sans-serif"
          >
            &amp; book now
          </text>
        </g>
      </svg>
    </div>
  );
}

export function ConsultationCTA({ className = '' }: { className?: string }) {
  const { consultationCta } = homeContent;

  return (
    <section className={`section-spacing ${className}`.trim()} id="contact">
      <Container>
        <Reveal>
          <div className="cta-band">
            <div className="cta-band-copy">
              <SectionHeading level="h2">{consultationCta.title}</SectionHeading>
              {/* TODO: confirm response time */}
              <p>{consultationCta.lead}</p>
              <Button variant="dark" href={consultationCta.cta.href}>
                {consultationCta.cta.label}
              </Button>
            </div>
            <ConsultationIllustration />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
