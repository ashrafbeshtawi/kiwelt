'use client';

import { useState } from 'react';
import Nav from './Nav';
import Footer from './Footer';
import PageIcon from './PageIcon';
import { useLang } from '@/lib/useLang';

export default function KarrierePage() {
  const { lang, setLang, t } = useLang();
  const c = t.karriere;
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
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
            <form className="form" onSubmit={onSubmit}>
              <div className="row">
                <div className="field">
                  <label htmlFor="k-name">{c.f.name}</label>
                  <input id="k-name" name="name" type="text" required />
                </div>
                <div className="field">
                  <label htmlFor="k-email">{c.f.email}</label>
                  <input id="k-email" name="email" type="email" required />
                </div>
              </div>
              <div className="field">
                <label htmlFor="k-role">{c.f.role}</label>
                <select id="k-role" name="role" defaultValue={c.f.roleOpts[0]}>
                  {c.f.roleOpts.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              <div className="field">
                <label htmlFor="k-portfolio">{c.f.portfolio}</label>
                <input id="k-portfolio" name="portfolio" type="url" placeholder="https://" />
              </div>
              <div className="field">
                <label htmlFor="k-message">{c.f.message}</label>
                <textarea id="k-message" name="message" rows={5} placeholder={c.f.messagePh} required />
              </div>
              <button type="submit" className="submit">{c.f.submit}<span aria-hidden>→</span></button>
            </form>
          )}
        </section>
      </main>
      <Footer t={t} />
    </>
  );
}
