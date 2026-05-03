'use client';

import Nav from './Nav';
import Footer from './Footer';
import { useLang } from '@/lib/useLang';

export default function ProcessPage() {
  const { lang, setLang, t } = useLang();
  const p = t.process;
  return (
    <>
      <Nav lang={lang} setLang={setLang} t={t} current="process" />
      <main className="page shell">
        <header className="page-head">
          <div>
            <div className="kicker">{p.kicker}</div>
            <h1 className="h1">{p.title}</h1>
          </div>
          <p className="page-sub">{p.sub}</p>
        </header>
        <section className="process">
          {p.steps.map((step) => (
            <article key={step.num} className="step">
              <div className="step-num">{step.num}</div>
              <h2 className="step-title">{step.title}</h2>
              <p className="step-body">{step.body}</p>
              <span className="step-time">{step.time}</span>
            </article>
          ))}
        </section>
      </main>
      <Footer t={t} />
    </>
  );
}
