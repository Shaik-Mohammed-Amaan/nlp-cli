// command.js
import { exec } from 'child_process';
import readline from 'readline';
import chalk from 'chalk';

export function askAndExecute(command) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question(chalk.yellow('\nDo you want to run this command? (yes/no): '), (ans) => {
      rl.close();
      if (ans.toLowerCase() === 'yes' || ans.toLowerCase() === 'y') {
        exec(command, (err, stdout, stderr) => {
          if (err) return console.error(chalk.red(`Error: ${err.message}`));
          if (stderr) return console.error(chalk.red(`stderr: ${stderr}`));
          console.log(chalk.bold.green('\n=== Command Output ==='));
          console.log(chalk.cyan(stdout));
        });
      } else {
        console.log(chalk.blue('\nCommand not executed.'));
      }
      resolve();
    });
  });
}