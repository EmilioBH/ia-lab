import type { Review } from './reviews';

export type Version = 1 | 2 | 3;

export interface PromptConfig {
  system?: string;
  prompt: string;
}

// v1 · zero-shot: solo la tarea, sin rol ni ejemplos.
function v1(review: Review): PromptConfig {
  return {
    prompt: `Clasifica esta reseña como positiva, negativa o neutra. Responde con la etiqueta en la primera línea y una frase explicando por qué en la segunda.\n\nReseña: "${review.texto}"`,
  };
}

const SYSTEM = `Eres un clasificador de reseñas de restaurantes.
Clasifica cada reseña como positiva, negativa o neutra.
Reglas:
- Si mezcla elogios y quejas de peso parecido, es neutra.
- Si usa ironía o sarcasmo, clasifica lo que quiere decir de verdad, no las palabras literales.
- Si solo describe hechos sin opinar, es neutra.
Formato de respuesta, exactamente dos líneas:
1. La etiqueta en minúsculas, sin nada más.
2. Un motivo de 10 palabras como máximo.`;

// v2 · prompt de sistema: rol, reglas y formato fuera del mensaje del usuario.
function v2(review: Review): PromptConfig {
  return {
    system: SYSTEM,
    prompt: `Reseña: "${review.texto}"`,
  };
}

// v3 · few-shot: el mismo system más 3 ejemplos resueltos (no están en la lista de prueba).
const EJEMPLOS = `Ejemplos:

Reseña: "El pulpo, en su punto, y nos invitaron al chupito. Un acierto."
positiva
Pulpo excelente y trato generoso.

Reseña: "Nos cobraron dos veces el pan y el camarero se rió cuando lo dijimos."
negativa
Cobro indebido y trato desagradable.

Reseña: "Postres caseros riquísimos, aunque el primer plato llegó tibio."
neutra
Postres buenos, primer plato flojo; balance equilibrado.`;

function v3(review: Review): PromptConfig {
  return {
    system: `${SYSTEM}\n\n${EJEMPLOS}`,
    prompt: `Reseña: "${review.texto}"`,
  };
}

export const prompts: Record<Version, (review: Review) => PromptConfig> = { 1: v1, 2: v2, 3: v3 };
