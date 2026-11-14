import type { APIRoute } from 'astro';
import { GOOGLE_GENERATIVE_AI_API_KEY } from 'astro:env/server';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';

export const prerender = false;

const google = createGoogleGenerativeAI({ apiKey: GOOGLE_GENERATIVE_AI_API_KEY });

export const GET: APIRoute = async () => {
  try {
    const { text, usage } = await generateText({
      model: google('gemini-3.5-flash-lite'),
      prompt: 'Saluda en una frase a Emilio, que hoy empieza su laboratorio de IA.',
    });

    return Response.json({ texto: text, usage });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'No se pudo llamar a Gemini' }, { status: 500 });
  }
};
