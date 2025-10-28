import { Command } from 'commander';
import { authenticatedFetch } from '../api/client.js';
import { adminSessionSchema, auditLogSchema } from '@tryfy/contracts';

export function createAdminCommand(): Command {
  const admin = new Command('admin').description('Administrative workflows');

  admin
    .command('sessions')
    .description('List active admin control sessions')
    .action(async () => {
      const result = await authenticatedFetch('/api/admin/sessions');
      const parsed = adminSessionSchema.array().safeParse(result);
      if (!parsed.success) {
        throw new Error('Unexpected response when listing admin sessions.');
      }

      console.table(parsed.data.map((session) => ({
        id: session.id,
        actor: session.actor,
        createdAt: session.createdAt,
        expiresAt: session.expiresAt
      })));
    });

  admin
    .command('audit')
    .description('Download recent admin audit log entries')
    .option('-l, --limit <limit>', 'Number of entries to fetch', '50')
    .action(async (options: { limit: string }) => {
      const result = await authenticatedFetch(`/api/admin/audit?limit=${options.limit}`);
      const parsed = auditLogSchema.array().safeParse(result);
      if (!parsed.success) {
        throw new Error('Unexpected response when reading audit log.');
      }

      parsed.data.forEach((entry) => {
        console.log(`[${entry.timestamp}] ${entry.actor}: ${entry.action}`);
      });
    });

  return admin;
}
