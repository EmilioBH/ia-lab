import { describe, expect, it } from 'vitest';
import { parseEtiqueta } from './parse';

describe('parseEtiqueta', () => {
  it('lee la etiqueta de la primera línea', () => {
    expect(parseEtiqueta('Positiva\nPorque le encantó.')).toBe('positiva');
  });
  it('tolera asteriscos y puntos', () => {
    expect(parseEtiqueta('**Negativa.**')).toBe('negativa');
  });
  it('devuelve null si no hay etiqueta válida', () => {
    expect(parseEtiqueta('Creo que es mixta')).toBeNull();
  });
});
