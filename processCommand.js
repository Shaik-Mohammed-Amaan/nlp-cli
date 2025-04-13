import chalk from 'chalk';
import ollama from 'ollama';
import { sendToFlask } from './flask.js';
import { redisClient } from './redisClient.js';
import { askAndExecute } from './command.js';

export async function processCommand(userInput, fromChat) {
  try {
    console.log(chalk.bold.green('\n=== Processing Command ==='));
    console.log(chalk.blue(`\nYou entered: "${userInput}"`));

    const cached = await redisClient.get(userInput);
    if (cached) {
      console.log(chalk.bold.green('\n=== Response from Cache ==='));
      console.log(chalk.cyan(cached));
      if (!fromChat) await askAndExecute(cached);
      return;
    }

    const response = await ollama.generate({
      model: 'codellama:latest',
      prompt: `Translate the following natural language command into a system command. "${userInput}"`,
    });

    console.log(chalk.bold.green('\n=== Ollama Response ==='));
    console.log(chalk.cyan(response.response));

    const flaskResponse = await sendToFlask(userInput, response.response);
    const cleanedAnswer = flaskResponse.answer.replace(/[`"']/g, '');

    console.log(chalk.bold.green('\n=== Flask Server Output ==='));
    console.log(chalk.magenta(cleanedAnswer));

    await redisClient.set(userInput, cleanedAnswer, { EX: 3600 }); // cache 1 hr

    if (!fromChat) await askAndExecute(cleanedAnswer);
  } catch (err) {
    console.error(chalk.red('\nError:', err));
  }
}