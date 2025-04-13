// ollama.js
import ollama from 'ollama';

export async function generateOllamaResponse(userInput) {
  try {
    const response = await ollama.generate({
      model: 'codellama:latest', // Use the correct model name
      prompt: `Translate the following natural language command into a system command. "${userInput}"`,
    });
    return response.response;
  } catch (error) {
    throw new Error('Error generating Ollama response: ' + error.message);
  }
}
