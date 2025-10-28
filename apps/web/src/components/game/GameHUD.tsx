'use client';

import { useGameStore } from '@/stores/game-store';
import { useI18n } from '@/providers/i18n-provider';

export function GameHUD() {
  const { status, lastMatchId } = useGameStore();
  const { t } = useI18n();

  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-100 p-4 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
      <div>{t('game.status')}: {status}</div>
      {lastMatchId ? <div>{t('game.lastMatch')}: {lastMatchId}</div> : null}
    </div>
  );
}
