import type { APIRoute } from 'astro';
import { GOOGLE_GENERATIVE_AI_API_KEY } from 'astro:env/server';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';
import { reviews } from '../../lib/prompting/reviews';
import { prompts, type Version } from '../../lib/prompting/prompts';
import { parseEtiqueta } from '../../lib/prompting/parse';

export const prerender = false;

const google = createGoogleGenerativeAI({ apiKey: GOOGLE_GENERATIVE_AI_API_KEY });

// GET /api/clasificar?v=1  (v = 1, 2 o 3)
export const GET: APIRoute = async ({ url }) => {
  const v = Number(url.searchParams.get('v') ?? 1);
  if (v !== 1 && v !== 2 && v !== 3) {
    return Response.json({ error: 'v debe ser 1, 2 o 3' }, { status: 400 });
  }
  const crear = prompts[v as Version];

  try {
    const resultados = [];
    let input = 0;
    let output = 0;
    // En serie a propósito: 10 llamadas pequeñas, sin saturar el límite de la API.
    for (const review of reviews) {
      const { system, prompt } = crear(review);
      const { text, usage } = await generateText({
        model: google('gemini-3.5-flash-lite'),
        temperature: 0,
        ...(system ? { system } : {}),
        prompt,
      });
      const obtenida = parseEtiqueta(text);
      input += usage.inputTokens ?? 0;
      output += usage.outputTokens ?? 0;
      resultados.push({ id: review.id, esperada: review.esperada, obtenida, acierto: obtenida === review.esperada, ambigua: review.ambigua ?? false, respuesta: text });
    }
    const aciertos = resultados.filter((r) => r.acierto).length;
    return Response.json({ version: v, aciertos: `${aciertos}/${reviews.length}`, tokens: { input, output }, resultados });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'No se pudo llamar a Gemini' }, { status: 500 });
  }
};
