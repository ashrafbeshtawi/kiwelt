'use client';

import { useEffect, useState } from 'react';
import { COPY } from './copy';

export function useLang() {
  const [lang, setLang] = useState('de');

  useEffect(() => {
    const saved = localStorage.getItem('kiw-lang');
    if (saved && saved !== lang) setLang(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem('kiw-lang', lang);
  }, [lang]);

  return { lang, setLang, t: COPY[lang] };
}
