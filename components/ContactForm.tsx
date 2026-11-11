'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, ContactFormData } from '@/lib/contact-schema';
import { Button } from './Button';

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedFirstName, setSubmittedFirstName] = useState('');
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
    defaultValues: {
      fullName: '',
      email: '',
      subject: '',
      message: '',
      consent: false,
      website: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok && result.ok) {
        setSubmittedFirstName(result.firstName || data.fullName.trim().split(' ')[0] || 'there');
        setSubmitSuccess(true);
      } else {
        setServerError(result.message || 'There was a problem sending your message. Please try again.');
      }
    } catch {
      setServerError('Network connection error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.currentTarget;
    handleSubmit(onSubmit, () => {
      setTimeout(() => {
        const firstInvalid = target.querySelector<HTMLElement>('[aria-invalid="true"]');
        if (firstInvalid) {
          firstInvalid.focus();
          firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 50);
    })(e);
  };

  if (submitSuccess) {
    return (
      <div
        className="p-8 sm:p-10 rounded-[var(--radius)] bg-white border border-[var(--border)] text-center shadow-sm"
        role="status"
        aria-live="polite"
      >
        <span className="pill-badge mb-4">Message Sent</span>
        <h3 className="text-2xl font-bold mb-3 tracking-tight text-[var(--ink)]">
          {/* TODO: confirm response time */}
          Thanks, {submittedFirstName}. We will reply within two working days.
        </h3>
        <p className="lead-text max-w-[46ch] mx-auto mb-6 text-sm">
          Your inquiry has been routed to our team. We will review your message and respond directly via email.
        </p>
        <Button variant="outline" href="/">
          Return to Home
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleFormSubmit}
      noValidate
      className="p-6 sm:p-9 rounded-[var(--radius)] bg-white border border-[var(--border)] shadow-sm"
    >
      {/* Hidden Honeypot */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website-contact-honeypot">Leave this empty</label>
        <input
          id="website-contact-honeypot"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('website')}
        />
      </div>

      {serverError && (
        <div
          className="p-4 mb-6 rounded border border-red-300 bg-red-50 text-red-800 text-sm"
          role="alert"
        >
          <strong>Error sending message:</strong> {serverError}
        </div>
      )}

      <div className="space-y-4">
        {/* Full name * */}
        <div className="form-field">
          <label htmlFor="fullName" className="form-label">
            Full name *
          </label>
          <input
            id="fullName"
            type="text"
            autoComplete="name"
            placeholder="e.g. Tunde Adeyemi"
            className={`form-input ${errors.fullName ? 'has-error' : ''}`}
            aria-invalid={errors.fullName ? 'true' : 'false'}
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
            {...register('fullName')}
          />
          {errors.fullName && (
            <span id="fullName-error" className="form-error">
              {errors.fullName.message}
            </span>
          )}
        </div>

        {/* Email * */}
        <div className="form-field">
          <label htmlFor="email" className="form-label">
            Email *
          </label>
          <input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={`form-input ${errors.email ? 'has-error' : ''}`}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
            {...register('email')}
          />
          {errors.email && (
            <span id="email-error" className="form-error">
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Subject * */}
        <div className="form-field">
          <label htmlFor="subject" className="form-label">
            Subject *
          </label>
          <input
            id="subject"
            type="text"
            placeholder="e.g. Training cohort inquiry or partnership"
            className={`form-input ${errors.subject ? 'has-error' : ''}`}
            aria-invalid={errors.subject ? 'true' : 'false'}
            aria-describedby={errors.subject ? 'subject-error' : undefined}
            {...register('subject')}
          />
          {errors.subject && (
            <span id="subject-error" className="form-error">
              {errors.subject.message}
            </span>
          )}
        </div>

        {/* Message * */}
        <div className="form-field">
          <label htmlFor="message" className="form-label">
            Message *
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder="How can we assist you? Tell us about your question, project, or training track…"
            className={`form-textarea ${errors.message ? 'has-error' : ''}`}
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'message-error' : undefined}
            {...register('message')}
          />
          {errors.message && (
            <span id="message-error" className="form-error">
              {errors.message.message}
            </span>
          )}
        </div>
      </div>

      {/* Consent Checkbox */}
      <div className="consent-row mt-4">
        <input
          id="consent"
          type="checkbox"
          className="consent-checkbox"
          aria-invalid={errors.consent ? 'true' : 'false'}
          aria-describedby={errors.consent ? 'consent-error' : undefined}
          {...register('consent')}
        />
        <label htmlFor="consent" className="consent-text">
          I agree to the processing of my personal data as described in the{' '}
          <Link href="/privacy" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </Link>
          . *
        </label>
      </div>
      {errors.consent && (
        <span id="consent-error" className="form-error block mt-1">
          {errors.consent.message}
        </span>
      )}

      {/* Submit Button */}
      <div className="mt-6">
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? 'Sending…' : 'Send Message'}
        </Button>
      </div>
    </form>
  );
}
