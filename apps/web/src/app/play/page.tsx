'use client';

import { PageTemplate } from '@/components/page-template';
import { GameCanvas2D, GameCanvas3D, GameHUD } from '@/components/game';
import { useGameStore } from '@/stores/game-store';
import { useI18n } from '@/providers/i18n-provider';
import { useEffect } from 'react';

export default function PlayPage() {
  const { setStatus } = useGameStore();
  const { t } = useI18n();

  useEffect(() => {
    setStatus('matching');
    const timeout = setTimeout(() => setStatus('playing'), 500);
    return () => {
      clearTimeout(timeout);
      setStatus('idle');
    };
  }, [setStatus]);

  return (
    <PageTemplate titleKey="play.title" descriptionKey="play.description">
      <div className="space-y-4">
        <GameCanvas3D />
        <GameCanvas2D />
        <div className="rounded-md border border-zinc-200 p-4 text-sm dark:border-zinc-700">
          {t('play.matchmakingCopy')}
        </div>
        <GameHUD />
      </div>
    </PageTemplate>
  );
}
