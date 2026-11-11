'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { SectionEyebrow } from '@/components/SectionEyebrow';
import { SectionHeading } from '@/components/SectionHeading';
import { errorPageContent } from '@/content/error-pages';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="section-spacing flex min-h-[55vh] items-center">
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <SectionEyebrow>{errorPageContent.eyebrow}</SectionEyebrow>
          <SectionHeading level="h1" className="mt-2">
            {errorPageContent.heading}
          </SectionHeading>
          <p className="lead-text mt-5 max-w-[56ch]">
            {errorPageContent.description}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button onClick={reset} variant="primary">{errorPageContent.retryAction}</Button>
            <Link href="/" className="btn btn-outline">
              <span>{errorPageContent.homeAction}</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
