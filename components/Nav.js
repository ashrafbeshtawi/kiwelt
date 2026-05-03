import Logomark from './Logomark';

export default function Nav({ lang, setLang, t, current = 'home' }) {
  return (
    <nav className="nav">
      <div className="shell nav-inner">
        <a className="logo" href="/">
          <Logomark />
          <span>KI Welt</span>
        </a>
        <div className="nav-links">
          <a href="/services" className={current === 'services' ? 'current' : ''}>{t.nav.services}</a>
          <a href="/process" className={current === 'process' ? 'current' : ''}>{t.nav.process}</a>
          <a href="/faq" className={current === 'faq' ? 'current' : ''}>{t.nav.faq}</a>
          <a href="/contact" className={current === 'contact' ? 'current' : ''}>{t.nav.contact}</a>
        </div>
        <div className="nav-right">
          <div className="lang-toggle" role="tablist" aria-label="Language">
            <button className={lang === 'de' ? 'active' : ''} onClick={() => setLang('de')}>DE</button>
            <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
          </div>
          <a href="/contact" className="btn btn-primary">{t.nav.cta}<span aria-hidden>→</span></a>
        </div>
      </div>
    </nav>
  );
}
