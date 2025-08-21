
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const apiKey = process.env.OPENROUTER_API_KEY;

if (!apiKey) {
  throw new Error('OPENROUTER_API_KEY is not defined in environment variables.');
}

export async function translateWithOpenRouter(messages: any): Promise<string> {
  const data = {
    model: 'deepseek/deepseek-r1:free', // Correct model identifier
    messages,
    stream: false,
  };

  try {
    console.log('OpenRouter is thinking...');
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': 'http://localhost:3000', // Required header
          'X-Title': 'Translation App'              // Required header
        }
      }
    );

    console.log('Full response data:', JSON.stringify(response.data, null, 2));

    // Properly access the message content
    const result = response.data.choices[0].message.content;
    console.log('Translation result:', result);

    return result || 'No translation returned.';

  } catch (error: any) {
    console.error('OpenRouter API error:', error.response?.data || error.message);
    throw new Error('Failed to get translation from OpenRouter API.');
  }
}