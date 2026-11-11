'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useForm, type FieldError } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { buildSchema } from '@/lib/programme-schema';
import type { ProgrammeDefinition, ProgrammeField } from '@/content/programmes/types';
import { Button } from './Button';

function ConfettiShower() {
  const colors = ['#ffb400', '#171717', '#f97316', '#2f855a', '#3b82f6'];
  return <div className="t4y-confetti" aria-hidden="true">{Array.from({ length: 48 }, (_, index) => <span key={index} className={`t4y-confetti-piece${index % 4 === 0 ? ' is-round' : ''}`} style={{ left: `${(index * 37) % 100}%`, animationDelay: `${((index * 7) % 18) / 100}s`, animationDuration: `${1.8 + ((index * 13) % 10) / 10}s`, backgroundColor: colors[index % colors.length], '--confetti-drift': `${((index * 19) % 81) - 40}px`, '--confetti-spin': `${360 + ((index * 29) % 720)}deg` } as React.CSSProperties} />)}</div>;
}

function messageForStatus(statusMessage: string | null, definition: ProgrammeDefinition) {
  if (!statusMessage) return null;
  const title = statusMessage === definition.form.fullMessage ? 'Applications are full' : statusMessage === definition.form.closedMessage ? 'Sign-ups are closed' : 'Applications unavailable';
  return <div className="t4y-form-section text-center py-16"><h3 className="t4y-section-title mb-3">{title}</h3><p className="lead-text mx-auto max-w-[48ch] mb-6">{statusMessage}</p><Button variant="primary" href="/contact">Inquire About Future Cohorts</Button></div>;
}

export function ProgrammeForm({ definition, statusMessage = null, defaultTrack }: { definition: ProgrammeDefinition; statusMessage?: string | null; defaultTrack?: string }) {
  const [activeStep, setActiveStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedFirstName, setSubmittedFirstName] = useState('');
  const [serverError, setServerError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const schema = useMemo(() => buildSchema(definition), [definition]);
  const defaultValues = useMemo(() => Object.fromEntries([
    ...definition.form.sections.flatMap((section) => section.fields.map((field) => [field.key, field.key === 'track' ? (defaultTrack ?? '') : ''])),
    ['consent', false], ['website', ''],
  ]), [definition, defaultTrack]);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Record<string, any>>({ resolver: zodResolver(schema) as any, mode: 'onBlur', defaultValues });
  const watchedValues = watch();

  useEffect(() => {
    const sectionIds = definition.form.sections.map((_, index) => `section-${String(index + 1).padStart(2, '0')}`);
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const element = document.getElementById(sectionIds[i]);
        if (element && element.offsetTop <= scrollPos) { setActiveStep(i + 1); break; }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [definition]);

  const onSubmit = async (data: Record<string, any>) => {
    setIsSubmitting(true); setServerError(null);
    try {
      const response = await fetch(`/api/programmes/${encodeURIComponent(definition.slug)}/apply`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const result = await response.json();
      if (response.ok && result.ok) {
        setSubmittedFirstName(result.firstName || String(data.fullName ?? '').trim().split(' ')[0] || 'there');
        setSubmitSuccess(true);
        document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' });
      } else setServerError(result.message || 'There was a problem submitting your application. Please try again.');
    } catch { setServerError('Network error. Please check your connection and try again.'); }
    finally { setIsSubmitting(false); }
  };

  const onError = () => setTimeout(() => {
    const firstInvalid = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
    firstInvalid?.focus(); firstInvalid?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 50);

  if (statusMessage) return messageForStatus(statusMessage, definition);
  if (submitSuccess) return <div className="t4y-form-section text-center py-16" role="status" aria-live="polite"><ConfettiShower /><span className="pill-badge mb-4">Application Submitted</span><h3 className="t4y-section-title mb-4" style={{ fontSize: 28 }}>Thanks, {submittedFirstName}. Check your email for confirmation.</h3><p className="lead-text mx-auto max-w-[50ch] mb-8">We have received your application for {definition.title}. Our admissions team will review your submission and reach out with next steps.</p><Button variant="primary" href="/">Return to Home</Button></div>;

  const renderField = (field: ProgrammeField) => {
    const error = errors[field.key] as FieldError | undefined;
    const id = field.key;
    const label = `${field.label}${field.required ? ' *' : ''}`;
    const errorMarkup = error?.message ? <span id={`${id}-error`} className="form-error">{String(error.message)}</span> : null;
    const common = { id, 'aria-invalid': (error ? 'true' : 'false') as 'true' | 'false', 'aria-describedby': error ? `${id}-error` : undefined, ...register(id) };
    if (field.type === 'radio') return <fieldset key={id} className="form-fieldset" style={id === 'laptopAccess' ? { marginBottom: 28 } : undefined}><legend className="form-legend">{label}</legend>{field.helperText && <p className="form-helper">{field.helperText}</p>}<div className="chips-group" role="radiogroup" aria-invalid={error ? 'true' : 'false'} aria-describedby={error ? `${id}-error` : undefined}>{(field.options ?? []).map((option) => <label key={option} className={`option-chip ${watchedValues[id] === option ? 'selected' : ''} ${error ? 'has-error' : ''}`} style={field.key === 'trackKnowledge' ? { minWidth: 44, textAlign: 'center' } : undefined}><input type="radio" value={option} className="sr-only" {...register(id)} /><span>{option}</span></label>)}</div>{errorMarkup}</fieldset>;
    return <div key={id} className="form-field" style={id === 'whyJoin' ? { marginBottom: 22 } : undefined}>{field.type === 'checkbox' ? <><input type="checkbox" className="consent-checkbox" {...common} /><label htmlFor={id} className="consent-text">{label}</label>{errorMarkup}</> : <><label htmlFor={id} className="form-label">{label}</label>{field.type === 'select' ? <select className={`form-select ${error ? 'has-error' : ''}`} {...common}><option value="">Select an option</option>{(field.options ?? []).map((option) => <option key={option} value={option}>{option}</option>)}</select> : field.type === 'textarea' ? <textarea rows={4} placeholder={field.placeholder} className={`form-textarea ${error ? 'has-error' : ''}`} {...common} /> : <input type={field.type === 'phone' ? 'tel' : field.type} inputMode={field.type === 'phone' ? 'tel' : field.type === 'email' ? 'email' : undefined} autoComplete={id === 'fullName' ? 'name' : id === 'email' ? 'email' : id === 'phone' ? 'tel' : undefined} placeholder={field.placeholder} className={`form-input ${error ? 'has-error' : ''}`} {...common} />}{field.helperText && <p className="form-helper">{field.helperText}</p>}{errorMarkup}</>}</div>;
  };

  return <div className="t4y-form-layout">
    <aside className="t4y-sticky-sidebar" aria-label="Application Progress"><div className="t4y-step-counter" aria-live="polite"><span className="t4y-step-current">{String(activeStep).padStart(2, '0')}</span><span className="t4y-step-total"> / {String(definition.form.sections.length).padStart(2, '0')}</span></div><h3 className="t4y-step-title">Your application</h3><p className="t4y-step-copy">Complete each section. Fields marked * are required. Your information is used only to assess your application.</p><p className="t4y-step-copy" style={{ marginBottom: 0 }}>Need help? <Link href="/contact" className="t4y-help-link">Contact our team through the contact page.</Link></p></aside>
    <form ref={formRef} onSubmit={handleSubmit(onSubmit, onError)} noValidate className="t4y-form-sections">
      <div className="sr-only" aria-hidden="true"><label htmlFor="website-field">Leave this empty</label><input id="website-field" type="text" tabIndex={-1} autoComplete="off" {...register('website')} /></div>
      {serverError && <div className="p-4 rounded border border-red-300 bg-red-50 text-red-800 text-sm" role="alert"><strong>Submission failed:</strong> {serverError}</div>}
      {definition.form.sections.map((section, index) => {
        const id = `section-${String(index + 1).padStart(2, '0')}`;
        const inlineField = (field: ProgrammeField) => field.type !== 'radio' && field.type !== 'textarea' && field.type !== 'checkbox';
        const fieldGroups: React.ReactNode[] = [];
        let inlineRun: ProgrammeField[] = [];
        const flushInline = () => { if (inlineRun.length) { const style = section.title.startsWith('02.') ? { marginBottom: 32 } : section.title.startsWith('03.') && inlineRun[0].key === 'linkedinUrl' ? { marginBottom: 22 } : undefined; fieldGroups.push(<div key={`grid-${inlineRun[0].key}`} className="form-grid-2" style={style}>{inlineRun.map(renderField)}</div>); inlineRun = []; } };
        section.fields.forEach((field, fieldIndex) => {
          if (inlineField(field)) inlineRun.push(field);
          else { flushInline(); fieldGroups.push(renderField(field)); }
          if (section.introTitle && section.introAfterFieldCount === fieldIndex + 1) {
            flushInline();
            fieldGroups.push(<div key="section-intro" style={{ marginBottom: 20 }}><h4 style={{ fontSize: 16.5, fontWeight: 700, color: 'var(--ink)', margin: '0 0 6px' }}>{section.introTitle}</h4>{section.introText && <p className="form-helper">{section.introText}</p>}</div>);
          }
        });
        flushInline();
        if (section.introTitle && section.introAfterFieldCount === undefined) fieldGroups.unshift(<div key="section-intro" style={{ marginBottom: 20 }}><h4 style={{ fontSize: 16.5, fontWeight: 700, color: 'var(--ink)', margin: '0 0 6px' }}>{section.introTitle}</h4>{section.introText && <p className="form-helper">{section.introText}</p>}</div>);
        return <section key={id} id={id} className="t4y-form-section"><div className="t4y-section-header"><h3 className="t4y-section-title">{section.title}</h3>{section.subtitle && <p className="t4y-section-subtitle">{section.subtitle}</p>}</div>{fieldGroups}{index === definition.form.sections.length - 1 && <><div className="consent-row"><input id="consent" type="checkbox" className="consent-checkbox" aria-invalid={errors.consent ? 'true' : 'false'} aria-describedby={errors.consent ? 'consent-error' : undefined} {...register('consent')} /><label htmlFor="consent" className="consent-text">I agree to the processing of my personal data, including the accessibility information I have provided, as described in the <Link href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</Link>. *</label></div>{errors.consent && <span id="consent-error" className="form-error" style={{ display: 'block', marginTop: 6 }}>{String(errors.consent.message)}</span>}<div style={{ marginTop: 28 }}><Button type="submit" variant="primary" disabled={isSubmitting} className="w-full sm:w-auto">{isSubmitting ? 'Submitting.' : 'Submit application'}</Button><p className="submit-disclaimer">By submitting, you confirm that the information provided is accurate.</p></div></>}</section>;
      })}
    </form>
  </div>;
}
