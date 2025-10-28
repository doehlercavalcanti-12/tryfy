import { Command } from 'commander';
import { authenticatedFetch } from '../api/client.js';
import { matchHistoryResponseSchema } from '@tryfy/contracts';

export function createHistoryCommand(): Command {
  const history = new Command('history').description('Player history operations');

  history
    .command('list')
    .description('List recent match history entries')
    .option('-l, --limit <limit>', 'Number of entries to list', '10')
    .action(async (options: { limit: string }) => {
      const playerId = process.env.TRYFY_PLAYER_ID ?? 'player-1';
      const result = await authenticatedFetch(`/api/game/history/${playerId}?limit=${options.limit}`);
      const parsed = matchHistoryResponseSchema.safeParse(result);
      if (!parsed.success) {
        throw new Error('Unexpected response from history endpoint.');
      }

      console.table(
        parsed.data.entries.map((entry) => ({
          id: entry.id,
          mode: entry.mode,
          result: entry.result,
          earnedTickets: entry.earnedTickets,
          playedAt: entry.playedAt
        }))
      );
    });

  history
    .command('export')
    .description('Export full history to JSON for offline analysis')
    .action(async () => {
      const playerId = process.env.TRYFY_PLAYER_ID ?? 'player-1';
      const result = await authenticatedFetch(`/api/game/history/${playerId}?limit=100`);
      console.log(JSON.stringify(result, null, 2));
    });

  return history;
}
