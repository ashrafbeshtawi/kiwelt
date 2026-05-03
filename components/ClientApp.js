'use client';

import { useEffect, useState } from 'react';
import Nav from './Nav';
import Showcase from './Showcase';
import Footer from './Footer';
import { COPY } from '@/lib/copy';

export default function ClientApp() {
  const [lang, setLang] = useState('de');

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('kiw-lang') : null;
    if (saved && saved !== lang) setLang(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem('kiw-lang', lang);
  }, [lang]);

  const t = COPY[lang];

  return (
    <>
      <Nav lang={lang} setLang={setLang} t={t} current="home" />
      <Showcase t={t} />
      <Footer t={t} />
    </>
  );
}
