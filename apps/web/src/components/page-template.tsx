'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';
import { LocaleSwitcher } from './locale-switcher';
import { useI18n } from '@/providers/i18n-provider';

interface PageTemplateProps {
  titleKey: string;
  descriptionKey: string;
  children?: ReactNode;
}

export function PageTemplate({ titleKey, descriptionKey, children }: PageTemplateProps) {
  const { t } = useI18n();

  return (
    <div className="space-y-6 p-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">{t(titleKey)}</h1>
          <p className="text-zinc-600 dark:text-zinc-300">{t(descriptionKey)}</p>
        </div>
        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <ThemeToggle />
          <Link
            href="/"
            className="rounded-md border border-zinc-200 px-3 py-2 text-sm transition hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-500"
          >
            {t('nav.home')}
          </Link>
        </div>
      </header>
      {children ?? (
        <div className="rounded-md border border-dashed border-zinc-300 p-6 text-sm text-zinc-500 dark:border-zinc-700">
          {t('common.placeholderContent')}
        </div>
      )}
    </div>
  );
}
