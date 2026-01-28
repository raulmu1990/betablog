// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import icon from 'astro-icon';

import node from '@astrojs/node';

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

  adapter: node({
    mode: 'standalone'
  })
});