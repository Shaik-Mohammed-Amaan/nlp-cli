import readline from 'readline';
import chalk from 'chalk';
import { processCommand } from './processCommand.js';

export function startChat() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log(chalk.bold.green('\nWelcome to the NLP-Based CLI Application!'));
  console.log(chalk.blue('Type your commands or questions below. Type "exit" to quit.'));

  const ask = () => {
    rl.question('> ', async (input) => {
      if (input.toLowerCase() === 'exit') {
        console.log(chalk.bold.green('\nThank you for using the app. Goodbye!'));
        rl.close();
        process.exit(0);
      } else {
        await processCommand(input, true);
        ask();
      }
    });
  };
  ask();
}