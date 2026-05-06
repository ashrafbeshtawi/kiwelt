'use client';

import Nav from './Nav';
import Footer from './Footer';
import { useLang } from '@/lib/useLang';

export default function LegalPage({ contentKey, current }) {
  const { lang, setLang, t } = useLang();
  const c = t[contentKey];
  return (
    <>
      <Nav lang={lang} setLang={setLang} t={t} current={current} />
      <main className="page shell">
        <header className="page-head">
          <div className="kicker">{c.kicker}</div>
          <h1 className="h1">{c.title}</h1>
          <p className="page-sub">{c.sub}</p>
        </header>
        <section className="legal">
          {c.sections.map((sec) => (
            <article key={sec.heading} className="legal-section">
              <h2 className="legal-heading">{sec.heading}</h2>
              {sec.body && <p className="legal-body">{sec.body}</p>}
              {sec.lines && (
                <ul className="legal-lines">
                  {sec.lines.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </section>
      </main>
      <Footer t={t} />
    </>
  );
}
