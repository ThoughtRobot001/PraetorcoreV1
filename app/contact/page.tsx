import React from 'react';
import { Metadata } from 'next';
import { Container } from '@/components/Container';
import { SectionEyebrow } from '@/components/SectionEyebrow';
import { Reveal } from '@/components/Reveal';
import { siteConfig } from '@/content/site';
import { contactHero } from '@/content/contact';
import { ContactForm } from '@/components/ContactForm';
import { PageHero } from '@/components/sections/PageHero';

export const metadata: Metadata = {
  title: 'Contact Us | Direct Inquiries & Support',
  description:
    'Get in touch with our team in Abuja. Inquire about tech training tracks, corporate consulting, or tech partnership opportunities.',
};

export default function ContactPage() {
  const { contact } = siteConfig;

  return (
    <>
      {/* Hero Section */}
      <PageHero {...contactHero} />

      {/* Two Column Layout: Details (Left) + Contact Form (Right) */}
      <section className="section-spacing pt-4 border-t border-[var(--border)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Contact Details */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <Reveal>
                <div className="p-6 sm:p-8 rounded-[var(--radius)] bg-white border border-[var(--border)] shadow-sm">
                  <SectionEyebrow>Office &amp; Hub</SectionEyebrow>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)] mb-6">
                    Our Contact Details
                  </h2>

                  <div className="space-y-6">
                    {/* Office Address */}
                    <div>
                      {/* TODO: client physical address */}
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)] block mb-1">
                        Physical Address
                      </span>
                      <p className="text-sm font-semibold text-[var(--ink)] leading-relaxed m-0">
                        {contact.address}
                      </p>
                    </div>

                    {/* Email */}
                    <div>
                      {/* TODO: client email */}
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)] block mb-1">
                        Email Address
                      </span>
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-sm font-semibold text-[var(--ink)] underline underline-offset-4 hover:text-[var(--accent)] transition-colors"
                      >
                        {contact.email}
                      </a>
                    </div>

                    {/* Phone */}
                    <div>
                      {/* TODO: client phone */}
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)] block mb-1">
                        Phone / WhatsApp
                      </span>
                      <a
                        href={`tel:${contact.phone.replace(/[\s-]/g, '')}`}
                        className="text-sm font-semibold text-[var(--ink)] underline underline-offset-4 hover:text-[var(--accent)] transition-colors"
                      >
                        {contact.phone}
                      </a>
                    </div>

                    {/* Opening Hours */}
                    <div>
                      {/* TODO: client working hours */}
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)] block mb-1">
                        Operating Hours
                      </span>
                      <p className="text-sm font-semibold text-[var(--ink)] leading-relaxed m-0">
                        {contact.openingHours}
                      </p>
                    </div>

                    {/* Social Channels */}
                    <div className="pt-4 border-t border-[var(--border)]">
                      {/* TODO: client social links */}
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)] block mb-3">
                        Official Channels
                      </span>
                      <div className="flex flex-col gap-2">
                        {contact.socialLinks.map((social) => (
                          <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between text-xs font-semibold text-[var(--ink)] p-2.5 rounded bg-[var(--cream)] hover:bg-[var(--accent)]/20 transition-colors"
                          >
                            <span>{social.name}</span>
                            <span className="text-[var(--muted)]">{social.handle} ↗</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              <Reveal delay={0.1}>
                <div className="mb-6">
                  <SectionEyebrow>Direct Message</SectionEyebrow>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)]">
                    Send Us a Message
                  </h2>
                </div>

                <ContactForm />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
