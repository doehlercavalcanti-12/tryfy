#!/usr/bin/env node
import { Command } from 'commander';
import { createLoginCommand } from './commands/login.js';
import { createHistoryCommand } from './commands/history.js';
import { createTicketsCommand } from './commands/tickets.js';
import { createAdminCommand } from './commands/admin.js';
import { loadConfig } from './utils/config.js';

const program = new Command();
program
  .name('tryfy')
  .description('CLI for Tryfy platform management and player workflows')
  .version('0.1.0');

loadConfig();

program.addCommand(createLoginCommand());
program.addCommand(createHistoryCommand());
program.addCommand(createTicketsCommand());
program.addCommand(createAdminCommand());

program.parseAsync().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
