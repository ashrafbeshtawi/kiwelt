'use client';

import Nav from './Nav';
import Footer from './Footer';
import PageIcon from './PageIcon';
import { useLang } from '@/lib/useLang';
import { LuWorkflow, LuBot, LuShieldCheck, LuSquareCode } from 'react-icons/lu';

const SERVICE_ICONS = {
  automation: LuWorkflow,
  agents: LuBot,
  security: LuShieldCheck,
  custom: LuSquareCode,
};

export default function ServicesPage() {
  const { lang, setLang, t } = useLang();
  const s = t.services;
  return (
    <>
      <Nav lang={lang} setLang={setLang} t={t} current="services" />
      <main className="page shell">
        <header className="page-head">
          <PageIcon name="services" />
          <div className="kicker">{s.kicker}</div>
          <h1 className="h1">{s.title}</h1>
          <p className="page-sub">{s.sub}</p>
        </header>
        <section className="services">
          {s.items.map((item) => {
            const Icon = SERVICE_ICONS[item.icon];
            return (
              <article key={item.num} className="service">
                <div className="service-head">
                  {Icon && (
                    <span className="service-icon" aria-hidden>
                      <Icon />
                    </span>
                  )}
                  <div className="service-num">{item.num}</div>
                </div>
                <h2 className="service-title">{item.title}</h2>
                <p className="service-body">{item.body}</p>
                <div className="service-tags">
                  {item.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </article>
            );
          })}
        </section>
      </main>
      <Footer t={t} />
    </>
  );
}
