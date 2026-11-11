import type { Metadata } from 'next';
import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { SectionEyebrow } from '@/components/SectionEyebrow';
import { SectionHeading } from '@/components/SectionHeading';
import { notFoundContent } from '@/content/error-pages';

export const metadata: Metadata = {
  title: notFoundContent.pageTitle,
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="section-spacing flex min-h-[55vh] items-center">
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <SectionEyebrow>{notFoundContent.eyebrow}</SectionEyebrow>
          <SectionHeading level="h1" className="mt-2">
            {notFoundContent.heading}
          </SectionHeading>
          <p className="lead-text mt-5 max-w-[56ch]">
            {notFoundContent.description}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/" variant="primary">{notFoundContent.homeAction}</Button>
            <Button href="/contact" variant="outline">{notFoundContent.contactAction}</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
