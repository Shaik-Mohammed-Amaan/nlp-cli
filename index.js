#!/usr/bin/env node

import { listCache, clearCache } from './cacheManager.js';

import { Command } from 'commander';
import { startChat } from './chat.js';

import { processCommand } from './processCommand.js';

const program = new Command();

program
  .version('1.0.0')
  .description('NLP-Based CLI Application')
  .option('-c, --command <text>', 'Input natural language command')
  .option('-l, --list-cache', 'List all cached commands')
  .option('-x, --clear-cache', 'Clear Redis cache')
  .parse(process.argv);

const options = program.opts();
if (options.listCache) {
  await listCache();
  process.exit(0);
}

if (options.clearCache) {
  await clearCache();
  process.exit(0);
}

if (options.command) {
  await processCommand(options.command, false);
  process.exit(0);
} else {
  await startChat();
  
}