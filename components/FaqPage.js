'use client';

import Nav from './Nav';
import Footer from './Footer';
import { useLang } from '@/lib/useLang';

export default function FaqPage() {
  const { lang, setLang, t } = useLang();
  const f = t.faq;
  return (
    <>
      <Nav lang={lang} setLang={setLang} t={t} current="faq" />
      <main className="page shell">
        <header className="page-head">
          <div>
            <div className="kicker">{f.kicker}</div>
            <h1 className="h1">{f.title}</h1>
          </div>
        </header>
        <section className="faqs">
          {f.items.map((item, i) => (
            <details key={i} className="faq">
              <summary>
                {item.q}
                <span className="icon" aria-hidden>+</span>
              </summary>
              <div className="faq-body">{item.a}</div>
            </details>
          ))}
        </section>
      </main>
      <Footer t={t} />
    </>
  );
}
