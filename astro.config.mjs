// @ts-check
import { defineConfig, envField } from 'astro/config';
import vue from '@astrojs/vue';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  integrations: [vue()],
  adapter: node({ mode: 'standalone' }),
  env: {
    schema: {
      GOOGLE_GENERATIVE_AI_API_KEY: envField.string({
        context: 'server',
        access: 'secret',
      }),
    },
  },
});
