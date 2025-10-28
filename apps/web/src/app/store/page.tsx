'use client';

import { PageTemplate } from '@/components/page-template';
import { useI18n } from '@/providers/i18n-provider';

const PRODUCTS = [
  { id: 'booster', nameKey: 'store.items.booster', descriptionKey: 'store.items.boosterDescription' },
  { id: 'skin', nameKey: 'store.items.skin', descriptionKey: 'store.items.skinDescription' }
];

export default function StorePage() {
  const { t } = useI18n();

  return (
    <PageTemplate titleKey="store.title" descriptionKey="store.description">
      <div className="grid gap-4 md:grid-cols-2">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="rounded-md border border-zinc-200 p-4 dark:border-zinc-700">
            <h2 className="text-lg font-semibold">{t(product.nameKey)}</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">{t(product.descriptionKey)}</p>
          </div>
        ))}
      </div>
    </PageTemplate>
  );
}
