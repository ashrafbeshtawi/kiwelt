'use client';

import Nav from './Nav';
import Showcase from './Showcase';
import Footer from './Footer';
import { useLang } from '@/lib/useLang';

export default function ClientApp() {
  const { lang, setLang, t } = useLang();
  return (
    <>
      <Nav lang={lang} setLang={setLang} t={t} current="home" />
      <Showcase t={t} />
      <Footer t={t} />
    </>
  );
}
