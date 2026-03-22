// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import icon from 'astro-icon';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [icon()],

  env: {
    schema: {
      STRAPI_CMS_URL: envField.string({ context: 'client', access: 'public' })
    }
  },

  output: 'server',

  adapter: vercel()
});