'use client';

import Nav from './Nav';
import Footer from './Footer';
import { useLang } from '@/lib/useLang';

export default function ServicesPage() {
  const { lang, setLang, t } = useLang();
  const s = t.services;
  return (
    <>
      <Nav lang={lang} setLang={setLang} t={t} current="services" />
      <main className="page shell">
        <header className="page-head">
          <div>
            <div className="kicker">{s.kicker}</div>
            <h1 className="h1">{s.title}</h1>
          </div>
          <p className="page-sub">{s.sub}</p>
        </header>
        <section className="services">
          {s.items.map((item) => (
            <article key={item.num} className="service">
              <div className="service-num">{item.num}</div>
              <h2 className="service-title">{item.title}</h2>
              <p className="service-body">{item.body}</p>
              <div className="service-tags">
                {item.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </section>
      </main>
      <Footer t={t} />
    </>
  );
}
