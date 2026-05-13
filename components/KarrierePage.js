'use client';

import { useState } from 'react';
import Nav from './Nav';
import Footer from './Footer';
import PageIcon from './PageIcon';
import { useLang } from '@/lib/useLang';

const ACCEPT = '.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document';
const MAX_BYTES = 8 * 1024 * 1024;
const ACCEPT_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

export default function KarrierePage() {
  const { lang, setLang, t } = useLang();
  const c = t.karriere;
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const errFor = (fieldName, reason) => {
    if (fieldName === 'cv') {
      if (reason === 'too_large') return c.f.errors.cv_too_large;
      if (reason === 'invalid_type') return c.f.errors.cv_invalid_type;
    }
    return null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const form = e.currentTarget;
    const file = form.elements.cv?.files?.[0];

    // client-side guard for CV (server still revalidates)
    if (file && file.size > 0) {
      if (file.size > MAX_BYTES) {
        setError(c.f.errors.cv_too_large);
        setFieldErrors({ cv: true });
        return;
      }
      if (!ACCEPT_TYPES.has(file.type)) {
        setError(c.f.errors.cv_invalid_type);
        setFieldErrors({ cv: true });
        return;
      }
    }

    setSubmitting(true);
    setError(null);
    setFieldErrors({});

    const fd = new FormData(form);

    try {
      const res = await fetch('/api/karriere', { method: 'POST', body: fd });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setSubmitted(true);
      } else {
        const key = data?.error || 'send_failed';
        let message = c.f.errors[key] || c.f.errors.send_failed;
        const map = {};
        if (data?.fields) {
          for (const fe of data.fields) {
            map[fe.field] = true;
            const fieldMsg = errFor(fe.field, fe.reason);
            if (fieldMsg) message = fieldMsg;
          }
        }
        setError(message);
        setFieldErrors(map);
      }
    } catch {
      setError(c.f.errors.network);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Nav lang={lang} setLang={setLang} t={t} current="karriere" />
      <main className="page shell">
        <header className="page-head">
          <PageIcon name="contact" />
          <div className="kicker">{c.kicker}</div>
          <h1 className="h1">{c.title}</h1>
          <p className="page-sub">{c.sub}</p>
        </header>
        <section className="contact">
          <div>
            <h3>{c.formIntroHeading}</h3>
            <p>{c.formIntroBody}</p>
            <ul className="contact-checks">
              {c.checks.map((check) => <li key={check}>{check}</li>)}
            </ul>
          </div>
          {submitted ? (
            <div className="form-thanks" role="status">✓ {c.f.thanks}</div>
          ) : (
            <form className="form" onSubmit={onSubmit} encType="multipart/form-data" noValidate>
              <div className="row">
                <div className={`field ${fieldErrors.name ? 'field-error' : ''}`}>
                  <label htmlFor="k-name">{c.f.name}</label>
                  <input id="k-name" name="name" type="text" required maxLength={200} />
                </div>
                <div className={`field ${fieldErrors.email ? 'field-error' : ''}`}>
                  <label htmlFor="k-email">{c.f.email}</label>
                  <input id="k-email" name="email" type="email" required maxLength={320} />
                </div>
              </div>
              <div className={`field ${fieldErrors.role ? 'field-error' : ''}`}>
                <label htmlFor="k-role">{c.f.role}</label>
                <select id="k-role" name="role" defaultValue={c.f.roleOpts[0]}>
                  {c.f.roleOpts.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              <div className={`field ${fieldErrors.portfolio ? 'field-error' : ''}`}>
                <label htmlFor="k-portfolio">{c.f.portfolio}</label>
                <input id="k-portfolio" name="portfolio" type="url" placeholder="https://" maxLength={500} />
              </div>
              <div className={`field ${fieldErrors.cv ? 'field-error' : ''}`}>
                <label htmlFor="k-cv">{c.f.cv}</label>
                <input id="k-cv" name="cv" type="file" accept={ACCEPT} />
              </div>
              <div className={`field ${fieldErrors.message ? 'field-error' : ''}`}>
                <label htmlFor="k-message">{c.f.message}</label>
                <textarea id="k-message" name="message" rows={5} placeholder={c.f.messagePh} required maxLength={5000} />
              </div>
              <div className="hp-field" aria-hidden="true">
                <label htmlFor="hp-website-k">Website</label>
                <input id="hp-website-k" name="_hp" type="text" tabIndex={-1} autoComplete="off" />
              </div>
              {error && <div className="form-error" role="alert">{error}</div>}
              <button type="submit" className="submit" disabled={submitting}>
                {submitting ? c.f.sending : c.f.submit}
                <span aria-hidden>→</span>
              </button>
            </form>
          )}
        </section>
      </main>
      <Footer t={t} />
    </>
  );
}
