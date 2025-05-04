// command.js
import { exec } from 'child_process';
import readline from 'readline';
import chalk from 'chalk';

export function askAndExecute(command) {
  if (!command || typeof command !== 'string') {
    console.error(chalk.red('Invalid command provided.'));
    return Promise.resolve();
  }

  console.log(chalk.blue(`Command to execute: ${command}`)); // Debug log

  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question(chalk.yellow('\nDo you want to run this command? (yes/no): '), (ans) => {
      rl.close();
      if (ans.toLowerCase() === 'yes' || ans.toLowerCase() === 'y') {
        exec(command, (err, stdout, stderr) => {
          if (err) {
            console.error(chalk.red(`Error: ${err.message}`));
            resolve(); // Ensure the promise resolves even on error
            return;
          }
          if (stderr) {
            console.error(chalk.red(`stderr: ${stderr}`));
          }
          console.log(chalk.bold.green('\n=== Command Output ==='));
          console.log(chalk.cyan(stdout));
          resolve(); // Resolve after the command execution completes
        });
      } else {
        console.log(chalk.blue('\nCommand not executed.'));
        resolve(); // Resolve if the user chooses not to execute the command
      }
    });
  });
}