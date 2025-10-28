'use client';

import { PageTemplate } from '@/components/page-template';
import { auditLogSchema } from '@tryfy/contracts';
import { useI18n } from '@/providers/i18n-provider';

const AUDIT = auditLogSchema.array().parse([
  { id: '1', actor: 'moderator@tryfy', action: 'Suspended player Bolt for abuse', timestamp: new Date().toISOString() },
  { id: '2', actor: 'admin@tryfy', action: 'Reviewed fraud alerts', timestamp: new Date().toISOString() }
]);

export default function AdminPage() {
  const { t } = useI18n();

  return (
    <PageTemplate titleKey="admin.title" descriptionKey="admin.description">
      <div className="space-y-3">
        {AUDIT.map((entry) => (
          <div key={entry.id} className="rounded-md border border-zinc-200 p-4 text-sm dark:border-zinc-700">
            <div className="font-medium">{entry.actor}</div>
            <div>{entry.action}</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">{new Date(entry.timestamp).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </PageTemplate>
  );
}
