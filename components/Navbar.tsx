'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/content/site';
import { Button } from './Button';
import { Container } from './Container';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        toggleBtnRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <header className="nav-header">
      <Container className="nav-inner">
        <Link href="/" className="wordmark" onClick={closeMenu}>
          <Image
            src="/images/praetorcore-emblem.png"
            alt={`${siteConfig.name} home`}
            width={1536}
            height={1024}
            priority
          />
        </Link>

        <ul className={`nav-links ${isOpen ? 'open' : ''}`} id="menu">
          {siteConfig.navItems.map((item) => {
            const isCurrent =
              item.href === '/'
                ? pathname === '/'
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isCurrent ? 'page' : undefined}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li className="nav-cta-mobile">
            <Button
              variant="primary"
              href={siteConfig.primaryCta.href}
              onClick={closeMenu}
            >
              {siteConfig.primaryCta.label}
            </Button>
          </li>
        </ul>

        <div className="btn-desktop">
          <Button variant="primary" href={siteConfig.primaryCta.href}>
            {siteConfig.primaryCta.label}
          </Button>
        </div>

        <button
          ref={toggleBtnRef}
          type="button"
          className="nav-toggle"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="menu"
          onClick={handleToggle}
        >
          {isOpen ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </Container>
    </header>
  );
}
