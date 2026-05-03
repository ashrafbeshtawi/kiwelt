'use client';

import { useState } from 'react';
import Nav from './Nav';
import Footer from './Footer';
import { useLang } from '@/lib/useLang';

export default function ContactPage() {
  const { lang, setLang, t } = useLang();
  const c = t.contact;
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Nav lang={lang} setLang={setLang} t={t} current="contact" />
      <main className="page shell">
        <header className="page-head">
          <div>
            <div className="kicker">{c.kicker}</div>
            <h1 className="h1">{c.title}</h1>
          </div>
        </header>
        <section className="contact">
          <div>
            <h3>{c.title}</h3>
            <p>{c.body}</p>
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
                  <label htmlFor="name">{c.f.name}</label>
                  <input id="name" name="name" type="text" required />
                </div>
                <div className="field">
                  <label htmlFor="company">{c.f.company}</label>
                  <input id="company" name="company" type="text" required />
                </div>
              </div>
              <div className="row">
                <div className="field">
                  <label htmlFor="email">{c.f.email}</label>
                  <input id="email" name="email" type="email" required />
                </div>
                <div className="field">
                  <label htmlFor="phone">{c.f.phone}</label>
                  <input id="phone" name="phone" type="tel" />
                </div>
              </div>
              <div className="field">
                <label htmlFor="topic">{c.f.topic}</label>
                <select id="topic" name="topic" defaultValue={c.f.topicOpts[0]}>
                  {c.f.topicOpts.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              <div className="field">
                <label htmlFor="message">{c.f.message}</label>
                <textarea id="message" name="message" rows={4} placeholder={c.f.messagePh} required />
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
