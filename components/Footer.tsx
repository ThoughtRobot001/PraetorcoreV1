import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Twitter, Github, Mail } from 'lucide-react';
import { siteConfig } from '@/content/site';
import { Container } from './Container';
import { ArrowIcon } from './ArrowIcon';

export function Footer() {
  return (
    <footer className="footer-section" id="footer">
      <Container>
        <div className="footer-grid-layout">
          {/* Column 1: Brand & Call-To-Action (matches Hulio reference) */}
          <div className="footer-brand-col">
            <Link href="/" className="footer-wordmark" aria-label={`${siteConfig.name} home`}>
              <Image
                src="/images/praetorcore-footer-emblem.png"
                alt=""
                width={1536}
                height={1024}
              />
            </Link>

            <h3 className="footer-cta-headline">
              Do you like what you see?
            </h3>
            <p className="footer-tagline">
              Let&apos;s work together to turn your dream tech career or business project into reality.
            </p>

            <Link href="/contact" className="footer-talk-link">
              <span>Book a free consultation</span>
              <ArrowIcon size={14} />
            </Link>
          </div>

          {/* Column 2: Useful Links (yellow header preserved) */}
          <div>
            <h4 className="footer-col-header">Useful Links</h4>
            <ul className="footer-links-list">
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/training">Training</Link>
              </li>
              <li>
                <Link href="/training/tech4youth">Tech4Youth Initiative</Link>
              </li>
              <li>
                <Link href="/services">Tech Services</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Information (yellow header preserved) */}
          <div>
            <h4 className="footer-col-header">Information</h4>
            <ul className="footer-links-list">
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <a href="/services#consultation">Book a free consultation</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Get In Touch (yellow header preserved) */}
          <div>
            <h4 className="footer-col-header">Get In Touch</h4>
            {/* TODO: client to confirm */}
            <p className="footer-social-intro">
              Connect with us via our socials or visit our training hub in Abuja.
            </p>

            {/* Circular Social Chips */}
            <div className="footer-socials" aria-label="Social media channels">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} strokeWidth={2} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="X (formerly Twitter)"
              >
                <Twitter size={18} strokeWidth={2} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="GitHub"
              >
                <Github size={18} strokeWidth={2} />
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="footer-social-btn"
                aria-label="Email Us"
              >
                <Mail size={18} strokeWidth={2} />
              </a>
            </div>

            <div className="footer-contact-mini">
              <div>{siteConfig.contact.location}</div>
              <div>{siteConfig.contact.phone}</div>
            </div>
          </div>
        </div>

        {/* Watermark Typography respecting page margins */}
        <div className="footer-watermark" aria-hidden="true">
          {siteConfig.name}
        </div>

        {/* Bottom utility bar with copyright */}
        <div className="footer-bottom-bar">
          <p className="copy">{siteConfig.copyright}</p>
          <div className="footer-bottom-links">
            <Link href="/privacy">Privacy Policy</Link>
            <span className="footer-dot-sep">·</span>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
