import type { Etiqueta } from './reviews';

const etiquetas: Etiqueta[] = ['positiva', 'negativa', 'neutra'];

// Lee la primera línea de la respuesta y la normaliza. Devuelve null si no es una etiqueta válida.
export function parseEtiqueta(texto: string): Etiqueta | null {
  const primera = (texto.trim().split('\n')[0] ?? '').toLowerCase().replace(/[^a-záéíóú]/g, '');
  return etiquetas.find((e) => primera === e) ?? null;
}
