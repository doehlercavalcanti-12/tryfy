'use client';

import { PageTemplate } from '@/components/page-template';
import { useI18n } from '@/providers/i18n-provider';
import { accountProfileSchema } from '@tryfy/shared';

const PROFILE = accountProfileSchema.parse({
  id: 'player-1',
  email: 'player@example.com',
  marketingOptIn: false
});

export default function AccountPage() {
  const { t } = useI18n();

  return (
    <PageTemplate titleKey="account.title" descriptionKey="account.description">
      <div className="space-y-4">
        <div className="rounded-md border border-zinc-200 p-4 dark:border-zinc-700">
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            <strong>{t('account.email')}:</strong> {PROFILE.email}
          </p>
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            <strong>{t('account.optIn')}:</strong> {PROFILE.marketingOptIn ? t('common.yes') : t('common.no')}
          </p>
        </div>
      </div>
    </PageTemplate>
  );
}
