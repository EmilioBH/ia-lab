export type Etiqueta = 'positiva' | 'negativa' | 'neutra';

export interface Review {
  id: number;
  texto: string;
  esperada: Etiqueta;
  ambigua?: boolean;
}

// Tu "verdad": la etiqueta que tú consideras correcta. Si no estás de acuerdo con alguna, cámbiala.
export const reviews: Review[] = [
  { id: 1, texto: 'El arroz negro estaba espectacular y el camarero, encantador. Volveremos seguro.', esperada: 'positiva' },
  { id: 2, texto: 'Pedí una ensalada y llegó una hora tarde, fría y con la salsa equivocada.', esperada: 'negativa' },
  { id: 3, texto: 'Abren a las 9 y tienen terraza. Pedí un cortado.', esperada: 'neutra' },
  { id: 4, texto: 'Precio justo, raciones generosas y vistas al mar. Muy recomendable.', esperada: 'positiva' },
  { id: 5, texto: 'El baño estaba sucio y nadie nos atendió en veinte minutos. No vuelvo.', esperada: 'negativa' },
  { id: 6, texto: 'Local pequeño, música de fondo. Aceptan tarjeta.', esperada: 'neutra' },
  { id: 7, texto: 'Las croquetas, de otro planeta. Repetiría solo por ellas.', esperada: 'positiva' },
  { id: 8, texto: 'Carísimo para lo que es: tres gambas mustias por 18 euros.', esperada: 'negativa' },
  { id: 9, texto: 'La comida genial, pero tardaron una hora en servirnos.', esperada: 'neutra', ambigua: true },
  { id: 10, texto: 'Qué maravilla esperar 40 minutos para un café. Un servicio de diez, vamos.', esperada: 'negativa', ambigua: true },
];
