'use client';

import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { defaultLocale, locales, messages } from '@tryfy/shared';

interface I18nContextValue {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<string>(defaultLocale);

  const value = useMemo<I18nContextValue>(() => {
    const dictionary = messages[locale] ?? messages[defaultLocale];
    return {
      locale,
      setLocale: (next) => {
        if (!locales.includes(next)) {
          console.warn(`Unsupported locale: ${next}`);
          return;
        }
        setLocale(next);
      },
      t: (key) => dictionary[key] ?? key
    };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
