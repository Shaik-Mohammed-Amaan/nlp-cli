// cacheManager.js
import { redisClient } from './redisClient.js';
import chalk from 'chalk';

export async function listCache() {
  try {
    const keys = await redisClient.keys('*');
    if (keys.length === 0) {
      console.log(chalk.yellow('🔍 No cached entries found.'));
      return;
    }

    console.log(chalk.bold.green('\n=== Cached Commands ==='));
    for (const key of keys) {
      const value = await redisClient.get(key);
      console.log(chalk.blue(`Command: ${key}`));
      console.log(chalk.magenta(`→ Result: ${value}\n`));
    }
  } catch (error) {
    console.error(chalk.red('Error listing cache:'), error);
  }
}

export async function clearCache() {
  try {
    await redisClient.flushDb();
    console.log(chalk.green('✅ Redis cache cleared successfully.'));
  } catch (error) {
    console.error(chalk.red('Error clearing cache:'), error);
  }
}
