'use client';

import Link from 'next/link';
import { GameCanvas2D, GameCanvas3D, GameHUD } from '@/components/game';
import { LocaleSwitcher } from '@/components/locale-switcher';
import { ThemeToggle } from '@/components/theme-toggle';
import { useI18n } from '@/providers/i18n-provider';

export default function Home() {
  const { t } = useI18n();

  return (
    <div className="space-y-8 p-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">{t('home.title')}</h1>
          <p className="text-zinc-600 dark:text-zinc-300">{t('home.subtitle')}</p>
        </div>
        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <GameCanvas3D />
        <GameCanvas2D />
      </section>

      <GameHUD />

      <nav className="grid gap-2 md:grid-cols-4">
        {[
          ['/login', t('nav.login')],
          ['/signup', t('nav.signup')],
          ['/store', t('nav.store')],
          ['/play', t('nav.play')],
          ['/leaderboard', t('nav.leaderboard')],
          ['/account', t('nav.account')],
          ['/admin', t('nav.admin')]
        ].map(([href, label]) => (
          <Link
            key={href}
            href={href}
            className="rounded-md border border-zinc-200 px-4 py-2 text-center transition hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-500"
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
