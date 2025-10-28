'use client';

import { locales } from '@tryfy/shared';
import { useI18n } from '@/providers/i18n-provider';

export function LocaleSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <select
      value={locale}
      onChange={(event) => setLocale(event.target.value)}
      className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
    >
      {locales.map((option) => (
        <option key={option} value={option}>
          {option.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
