import { Command } from 'commander';
import { authenticatedFetch } from '../api/client.js';
import { ticketBalanceSchema } from '@tryfy/shared';

export function createTicketsCommand(): Command {
  const tickets = new Command('tickets').description('Manage player tickets and balances');

  tickets
    .command('balance')
    .description('Check your current ticket balance')
    .action(async () => {
      const result = await authenticatedFetch('/api/payments/tickets/balance');
      const parsed = ticketBalanceSchema.safeParse(result);
      if (!parsed.success) {
        throw new Error('Unexpected response when fetching ticket balance.');
      }

      console.log(`Current balance: ${parsed.data.balance} tickets`);
    });

  return tickets;
}
