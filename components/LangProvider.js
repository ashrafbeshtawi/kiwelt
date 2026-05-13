'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { COPY } from '@/lib/copy';

const LangContext = createContext(null);

export function LangProvider({ initial = 'de', children }) {
  const [lang, setLangState] = useState(initial === 'en' ? 'en' : 'de');

  const setLang = useCallback((next) => {
    if (next !== 'de' && next !== 'en') return;
    setLangState(next);
    document.cookie = `df-lang=${next}; path=/; max-age=31536000; SameSite=Lax`;
    document.documentElement.lang = next;
  }, []);

  const value = { lang, setLang, t: COPY[lang] };
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLangContext() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used inside <LangProvider>');
  return ctx;
}
