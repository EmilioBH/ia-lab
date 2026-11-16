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

// v2 · prompt de sistema: TODO Emilio.
// Pista: mueve al "system" el rol, las reglas (qué hacer con las ambiguas) y el formato exacto.
function v2(review: Review): PromptConfig {
  return {
    system: 'TODO',
    prompt: `Reseña: "${review.texto}"`,
  };
}

// v3 · few-shot: TODO Emilio.
// Pista: igual que v2, pero añade 3 ejemplos resueltos (uno de cada etiqueta).
// No uses reseñas de la lista de prueba como ejemplos, o estarás haciendo trampa.
function v3(review: Review): PromptConfig {
  return {
    system: 'TODO',
    prompt: `Reseña: "${review.texto}"`,
  };
}

export const prompts: Record<Version, (review: Review) => PromptConfig> = { 1: v1, 2: v2, 3: v3 };
