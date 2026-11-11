import type { Metadata } from 'next';
import { Container } from '@/components/Container';
import { PageHero } from '@/components/sections/PageHero';
import { privacySections } from '@/content/privacy';
import { siteConfig } from '@/content/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How we collect, use and protect your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="privacy-policy-page" id="top">
      {siteConfig.privacyDraft && (
        <div className="privacy-draft-banner" role="status">
          <Container>Draft: awaiting legal review.</Container>
        </div>
      )}
      <PageHero eyebrow="LEGAL" title="Privacy Policy" intro="How we collect, use and protect your personal information." align="left" />
      <section className="privacy-policy-section">
        <Container>
          <article className="privacy-policy-content">
            <p className="privacy-last-updated"><strong>Last updated:</strong> {siteConfig.privacyLastUpdated}</p>
            <nav className="privacy-on-this-page" aria-label="On this page">
              <h2>On this page</h2>
              <ol>
                {privacySections.map((section) => (
                  <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>
                ))}
              </ol>
            </nav>
            {privacySections.map((section) => (
              <section key={section.id} id={section.id} className="privacy-policy-section-block" aria-labelledby={`${section.id}-title`}>
                <h2 id={`${section.id}-title`}>{section.title}</h2>
                {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets && (
                  <ul>
                    {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                )}
              </section>
            ))}
            <p className="privacy-back-to-top"><a href="#top">Back to top</a></p>
          </article>
        </Container>
      </section>
    </div>
  );
}
