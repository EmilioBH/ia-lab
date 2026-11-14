# ia-lab

Laboratorio de prácticas de IA con Astro + Vue.

Proyecto base con TypeScript en modo `strict` e islas de Vue. Para comprobar que el laboratorio está listo:

```bash
npm run check
npm test
npm run build
```

## Experimento de temperatura (Clase 0 · 14 nov 2026)

Modelo: `gemini-3.5-flash-lite` · Prompt: «Inventa un nombre para una cafetería en Malgrat de Mar»
Precio: 0,30 $/M tokens de entrada · 2,50 $/M tokens de salida

| # | Temperatura | Tokens entrada | Tokens salida | Coste aprox. | Primeros nombres que propone |
|---|---|---|---|---|---|
| 1 | 0 | 12 | 582 | 0,00146 $ | La Mar de Café, Costa Brava Coffee, Olas y Aromas |
| 2 | 0 | 12 | 639 | 0,00160 $ | Costa & Coffee Malgrat, Passeig del Mar Cafú, La Trencadís |
| 3 | 0 | 12 | 618 | 0,00155 $ | Àfora Cafè, La Sal y el Café, Ona Coffee |
| 4 | 1 | 12 | 511 | 0,00128 $ | La Ola Café, Costa Brava Coffee, Passeig del Mar |
| 5 | 1 | 12 | 583 | 0,00146 $ | La Mar de Cafés, Costa Brava Coffee, Ona Coffee |
| 6 | 1 | 12 | 535 | 0,00134 $ | La Mar de Càfis, Costa Café, Ona Coffee |
| **Total** | | **72** | **3.468** | **≈ 0,0087 $** | |

### Conclusiones
- Con `t=0` las respuestas tampoco fueron idénticas: la temperatura reduce la aleatoriedad, pero no garantiza un resultado determinista en Gemini. Con `t=1` aparecen nombres más arriesgados (Espamar, Malva Coffee, Kala Coffee) y algún error («Càfis»). Las seis siguen la misma estructura, así que el prompt marca más la forma que la temperatura.
- El coste lo dominan los tokens de salida (más del 99 % del total). Un prompt tan abierto genera unos 550 tokens por respuesta; pedir «solo un nombre» o limitar `maxOutputTokens` lo abarataría muchísimo.
- Siguiente prueba: repetir con «Responde solo con un nombre» para ver la diferencia de temperatura con más claridad.
