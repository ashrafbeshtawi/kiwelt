import Logomark from './Logomark';

export default function Footer({ t }) {
  return (
    <footer className="footer-mini shell">
      <div className="footer-left">
        <Logomark size={20} />
        <span>{t.footer.copy}</span>
      </div>
      <div className="footer-right">
        {t.footer.links.map(l => <a key={l} href="#">{l}</a>)}
      </div>
    </footer>
  );
}
