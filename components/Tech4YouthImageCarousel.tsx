'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useReducedMotion } from 'motion/react';

const photos = [
  {
    src: '/images/tech4youth/tech4youth-cohort.jpg',
    alt: 'The Tech4Youth cohort and programme team gathered in Abuja.',
  },
  {
    src: '/images/tech4youth/tech4youth-software-tools.jpg',
    alt: 'Instructors presenting software development tools to Tech4Youth learners in Abuja.',
  },
  {
    src: '/images/tech4youth/tech4youth-laptop-lab.jpg',
    alt: 'Tech4Youth participants collaborating on laptops during a practical lab session.',
  },
  {
    src: '/images/tech4youth/tech4youth-ai-session.jpg',
    alt: 'Facilitator leading an Artificial Intelligence and Machine Learning session.',
  },
  {
    src: '/images/tech4youth/tech4youth-mentorship-session.jpg',
    alt: 'Mentor guiding Tech4Youth participants during hands-on coursework.',
  },
  {
    src: '/images/tech4youth/tech4youth-interactive-class.jpg',
    alt: 'Facilitators engaging with Tech4Youth learners during an interactive classroom discussion.',
  },
  {
    src: '/images/tech4youth/tech4youth-classroom-session.jpg',
    alt: 'Tech4Youth instructors and learners during an in-person workshop in Abuja.',
  },
  {
    src: '/images/tech4youth/tech4youth-workshop.jpg',
    alt: 'A Tech4Youth instructor leading an orientation workshop in Abuja.',
  },
];

export function Tech4YouthImageCarousel() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const activePhotoIndex = (activeIndex - 1 + photos.length) % photos.length;
  const activeIndexIndex = activePhotoIndex;
  const loopedPhotos = [photos[photos.length - 1], ...photos, photos[0]];
  const shouldRotate = isPlaying && !isHovered;

  useEffect(() => {
    if (prefersReducedMotion === false) setIsPlaying(true);
    if (prefersReducedMotion === true) setIsPlaying(false);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!shouldRotate) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex((index) => index + 1);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [shouldRotate]);

  useEffect(() => {
    if (isTransitioning) return;

    const frameId = window.requestAnimationFrame(() => setIsTransitioning(true));
    return () => window.cancelAnimationFrame(frameId);
  }, [isTransitioning]);

  const showPrevious = () => {
    setIsPlaying(false);
    setActiveIndex((index) => prefersReducedMotion ? (index <= 1 ? photos.length : index - 1) : index - 1);
  };

  const showNext = () => {
    setIsPlaying(false);
    setActiveIndex((index) => prefersReducedMotion ? (index >= photos.length ? 1 : index + 1) : index + 1);
  };

  const handleTransitionEnd = () => {
    if (activeIndex === 0) {
      setIsTransitioning(false);
      setActiveIndex(photos.length);
    } else if (activeIndex === photos.length + 1) {
      setIsTransitioning(false);
      setActiveIndex(1);
    }
  };

  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius)] border border-[var(--border)] bg-white"
      role="region"
      aria-roledescription="carousel"
      aria-label="Tech4Youth programme photos"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsPlaying(false)}
    >
      <div
        className="absolute inset-0 flex"
        onTransitionEnd={handleTransitionEnd}
        style={{
          transform: `translateX(-${activeIndex * 100}%)`,
          transition: isTransitioning && !prefersReducedMotion
            ? 'transform 700ms cubic-bezier(0.22, 0.61, 0.36, 1)'
            : 'none',
        }}
      >
        {loopedPhotos.map((photo, index) => {
          const photoIndex = (index - 1 + photos.length) % photos.length;
          const isActive = index === activeIndex;

          return (
            <div
              key={`${photo.src}-${index}`}
              className="relative h-full w-full shrink-0"
              role="group"
              aria-roledescription="slide"
              aria-label={`${photoIndex + 1} of ${photos.length}`}
              aria-hidden={!isActive}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                priority={index === 1}
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={showPrevious}
        aria-label="Previous Tech4Youth photo"
        className="absolute left-3 top-1/2 z-10 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-white/80 text-[var(--ink)] shadow-sm backdrop-blur-sm transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
      >
        <ChevronLeft aria-hidden="true" size={22} />
      </button>

      <button
        type="button"
        onClick={showNext}
        aria-label="Next Tech4Youth photo"
        className="absolute right-3 top-1/2 z-10 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-white/80 text-[var(--ink)] shadow-sm backdrop-blur-sm transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
      >
        <ChevronRight aria-hidden="true" size={22} />
      </button>

      <div
        className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/30 px-2 py-1.5 backdrop-blur-sm"
        role="group"
        aria-label="Choose a photo"
        aria-live={isPlaying ? 'off' : 'polite'}
      >
          {photos.map((photo, index) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => {
                setIsPlaying(false);
                setActiveIndex(index + 1);
              }}
              aria-label={`Show photo ${index + 1}`}
              aria-pressed={activeIndexIndex === index}
              className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                activeIndexIndex === index ? 'w-5 bg-white' : 'w-1.5 bg-white/60 hover:bg-white'
              }`}
            />
          ))}
      </div>

      <div className="absolute right-3 top-3 z-10">
        <button
          type="button"
          onClick={() => setIsPlaying((playing) => !playing)}
          aria-label={isPlaying ? 'Pause photo carousel' : 'Play photo carousel'}
          className="grid size-8 place-items-center rounded-full bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {isPlaying ? <Pause aria-hidden="true" size={15} /> : <Play aria-hidden="true" size={15} />}
        </button>
      </div>
    </div>
  );
}
