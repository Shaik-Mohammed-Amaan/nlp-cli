// flask.js
import fetch from 'node-fetch';

export async function sendToFlask(question, answer) {
  try {
    const res = await fetch('http://127.0.0.1:5001/process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: question, answer: answer }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    return data; // Return the output from the Flask server
  } catch (error) {
    throw new Error('Error sending response to Flask server: ' + error.message);
  }
}


