'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  serviceEnquirySchema,
  ServiceEnquiryFormData,
  serviceOptions,
  ServiceChoice,
} from '@/lib/service-enquiry-schema';
import { Button } from './Button';

interface ConsultationFormProps {
  initialServiceSlug?: string;
}

function mapSlugToService(slug?: string): ServiceChoice {
  if (!slug) return 'Not sure yet';
  const clean = slug.toLowerCase();
  if (clean.includes('capac') || clean.includes('train')) return 'Capacity building and Training';
  if (clean.includes('data')) return 'Data Analytics';
  if (clean.includes('cyber')) return 'Cybersecurity';
  if (clean.includes('soft') || clean.includes('dev')) return 'Software Development';
  return 'Not sure yet';
}

export function ConsultationForm({ initialServiceSlug }: ConsultationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedFirstName, setSubmittedFirstName] = useState('');
  const [serverError, setServerError] = useState<string | null>(null);

  const defaultService = mapSlugToService(initialServiceSlug);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ServiceEnquiryFormData>({
    resolver: zodResolver(serviceEnquirySchema),
    mode: 'onBlur',
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      organisation: '',
      service: defaultService,
      message: '',
      consent: false,
      website: '',
    },
  });

  const onSubmit = async (data: ServiceEnquiryFormData) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const res = await fetch('/api/service-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok && result.ok) {
        setSubmittedFirstName(result.firstName || data.fullName.trim().split(' ')[0] || 'there');
        setSubmitSuccess(true);
      } else {
        setServerError(result.message || 'There was a problem submitting your request. Please try again.');
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
        <span className="pill-badge mb-4">Consultation Request Received</span>
        <h3 className="text-2xl font-bold mb-3 tracking-tight text-[var(--ink)]">
          {/* TODO: confirm response time */}
          Thanks, {submittedFirstName}. We will reply within two working days.
        </h3>
        <p className="lead-text max-w-[48ch] mx-auto mb-6 text-sm">
          A member of our engineering and consulting team will review your requirements and reach out to schedule your discovery session.
        </p>
        <Button variant="outline" href="/services">
          Explore All Services
        </Button>
      </div>
    );
  }

  return (
    <form
      id="consultation"
      onSubmit={handleFormSubmit}
      noValidate
      className="p-6 sm:p-9 rounded-[var(--radius)] bg-white border border-[var(--border)] shadow-sm"
    >
      {/* Hidden Honeypot */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website-consultation-honeypot">Leave this empty</label>
        <input
          id="website-consultation-honeypot"
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
          <strong>Submission error:</strong> {serverError}
        </div>
      )}

      <div className="form-grid-2">
        {/* Full name * */}
        <div className="form-field">
          <label htmlFor="fullName" className="form-label">
            Full name *
          </label>
          <input
            id="fullName"
            type="text"
            autoComplete="name"
            placeholder="e.g. Amina Bello"
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

        {/* Work email * */}
        <div className="form-field">
          <label htmlFor="email" className="form-label">
            Work email *
          </label>
          <input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@company.com"
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

        {/* Phone / WhatsApp number * */}
        <div className="form-field">
          <label htmlFor="phone" className="form-label">
            Phone / WhatsApp number *
          </label>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+234…"
            className={`form-input ${errors.phone ? 'has-error' : ''}`}
            aria-invalid={errors.phone ? 'true' : 'false'}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            {...register('phone')}
          />
          {errors.phone && (
            <span id="phone-error" className="form-error">
              {errors.phone.message}
            </span>
          )}
        </div>

        {/* Organisation (optional) */}
        <div className="form-field">
          <label htmlFor="organisation" className="form-label">
            Organisation <span className="text-[var(--muted)] font-normal">(optional)</span>
          </label>
          <input
            id="organisation"
            type="text"
            autoComplete="organization"
            placeholder="e.g. Sterling Logistics Ltd"
            className={`form-input ${errors.organisation ? 'has-error' : ''}`}
            aria-invalid={errors.organisation ? 'true' : 'false'}
            aria-describedby={errors.organisation ? 'organisation-error' : undefined}
            {...register('organisation')}
          />
          {errors.organisation && (
            <span id="organisation-error" className="form-error">
              {errors.organisation.message}
            </span>
          )}
        </div>

        {/* Service * */}
        <div className="form-field full-width">
          <label htmlFor="service" className="form-label">
            Service *
          </label>
          <select
            id="service"
            className={`form-select ${errors.service ? 'has-error' : ''}`}
            aria-invalid={errors.service ? 'true' : 'false'}
            aria-describedby={errors.service ? 'service-error' : undefined}
            {...register('service')}
          >
            {serviceOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.service && (
            <span id="service-error" className="form-error">
              {errors.service.message}
            </span>
          )}
        </div>

        {/* How can we help? * */}
        <div className="form-field full-width">
          <label htmlFor="message" className="form-label">
            How can we help? *
          </label>
          <textarea
            id="message"
            rows={4}
            placeholder="Describe your current tech challenges, project scope, team requirements, or desired timeline…"
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
          {isSubmitting ? 'Sending…' : 'Submit Consultation Request'}
        </Button>
      </div>
    </form>
  );
}
