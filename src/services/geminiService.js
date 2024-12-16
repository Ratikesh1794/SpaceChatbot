import { spaceExplorerPrompt } from '../config/botPersona';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

export async function sendMessageToGemini(message) {
  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${spaceExplorerPrompt}\n\nUser: ${message}\n\nCosmo:`
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract the response text from Gemini's response format
    const responseText = data.candidates[0].content.parts[0].text;
    
    // Clean up any potential "Cosmo:" prefix from the response
    const cleanedResponse = responseText.replace(/^Cosmo:\s*/i, '');
    
    return cleanedResponse;
  } catch (error) {
    console.error('Error sending message to Gemini:', error);
    throw error;
  }
} 