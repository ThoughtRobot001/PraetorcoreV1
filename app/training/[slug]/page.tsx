import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Container } from '@/components/Container';
import { SectionHeading } from '@/components/SectionHeading';
import { SectionEyebrow } from '@/components/SectionEyebrow';
import { Button } from '@/components/Button';
import { ProgrammeForm } from '@/components/ProgrammeForm';
import { getProgramme } from '@/content/programmes';
import { getProgrammeState, getPublicApplicationMessage } from '@/lib/programme-state';

export const dynamic = 'force-dynamic';
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const definition = getProgramme(slug);
  return { title: definition ? `${definition.title} Programme` : 'Programme' };
}

export default async function ProgrammeSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const definition = getProgramme(slug);
  if (!definition) notFound();
  let state;
  try { state = await getProgrammeState(slug); } catch { notFound(); }
  if (!state || (state.status !== 'open' && state.status !== 'closed')) notFound();
  const page = definition.pageContent;
  const hero = page.hero ?? { eyebrow: definition.title, title: definition.title, lead: definition.summary };
  const trackContent = page.tracks;
  const tracks = trackContent?.items ?? [];
  const statusMessage = await getPublicApplicationMessage(slug);
  return <>
    <section className="hero-section"><Container><SectionEyebrow>{hero.eyebrow}</SectionEyebrow><SectionHeading level="h1" className="hero-headline">{hero.title}</SectionHeading><p className="lead-text" style={{ maxWidth: '52ch', marginBottom: 24 }}>{hero.lead ?? definition.summary}</p><Button variant="primary" href="#signup">{hero.ctaLabel ?? 'Apply now'}</Button></Container></section>
    {page.overview && <section className="section-spacing"><Container><SectionEyebrow>{page.overview.eyebrow}</SectionEyebrow><SectionHeading level="h2">{page.overview.title}</SectionHeading><p className="lead-text" style={{ marginTop: 16 }}>{page.overview.lead}</p></Container></section>}
    {trackContent && tracks.length > 0 && <section id="tracks" className="section-spacing"><Container><SectionEyebrow>{trackContent.eyebrow}</SectionEyebrow><SectionHeading level="h2">{trackContent.title}</SectionHeading><p className="lead-text" style={{ marginTop: 12 }}>{trackContent.lead}</p><div className="t4y-track-grid" style={{ marginTop: 28 }}>{tracks.map((track) => <article key={track.id} className="t4y-track-card"><h3>{track.title}</h3><p>{track.description}</p><div className="flex flex-wrap gap-2">{track.skills?.map((skill) => <span key={skill} className="pill-badge">{skill}</span>)}</div></article>)}</div></Container></section>}
    {page.benefits && <section className="section-spacing"><Container><SectionEyebrow>{page.benefits.eyebrow}</SectionEyebrow><SectionHeading level="h2">{page.benefits.title}</SectionHeading><ul>{page.benefits.items?.map((item: string) => <li key={item}>{item}</li>)}</ul></Container></section>}
    {page.eligibility && <section className="section-spacing"><Container><SectionEyebrow>{page.eligibility.eyebrow}</SectionEyebrow><SectionHeading level="h2">{page.eligibility.title}</SectionHeading><ul>{page.eligibility.items?.map((item: string) => <li key={item}>{item}</li>)}</ul></Container></section>}
    <section id="signup" className="section-spacing" style={{ borderTop: '1px solid var(--border)' }}><Container><SectionEyebrow>Cohort Registration</SectionEyebrow><SectionHeading level="h2">{definition.title} Application Form</SectionHeading><ProgrammeForm definition={definition} statusMessage={statusMessage} /></Container></section>
  </>;
}
