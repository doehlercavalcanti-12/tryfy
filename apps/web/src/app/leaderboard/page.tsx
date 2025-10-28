'use client';

import { PageTemplate } from '@/components/page-template';
import { useI18n } from '@/providers/i18n-provider';
import { leaderboardEntrySchema } from '@tryfy/contracts';

const MOCK = leaderboardEntrySchema.array().parse([
  { id: '1', playerTag: 'Ace', rating: 2100, rank: 1 },
  { id: '2', playerTag: 'Nova', rating: 2040, rank: 2 },
  { id: '3', playerTag: 'Bolt', rating: 1985, rank: 3 }
]);

export default function LeaderboardPage() {
  const { t } = useI18n();

  return (
    <PageTemplate titleKey="leaderboard.title" descriptionKey="leaderboard.description">
      <table className="min-w-full overflow-hidden rounded-md border border-zinc-200 text-left text-sm dark:border-zinc-700">
        <thead className="bg-zinc-100 dark:bg-zinc-800">
          <tr>
            <th className="px-4 py-2">{t('leaderboard.rank')}</th>
            <th className="px-4 py-2">{t('leaderboard.player')}</th>
            <th className="px-4 py-2">{t('leaderboard.rating')}</th>
          </tr>
        </thead>
        <tbody>
          {MOCK.map((entry) => (
            <tr key={entry.id} className="border-t border-zinc-200 dark:border-zinc-700">
              <td className="px-4 py-2">{entry.rank}</td>
              <td className="px-4 py-2">{entry.playerTag}</td>
              <td className="px-4 py-2">{entry.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </PageTemplate>
  );
}
