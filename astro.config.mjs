import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://www.cyprustopindex.com',
  output: 'static',
  integrations: [
    tailwind({
      applyBaseStyles: true,
    }),
  ],
  build: {
    format: 'directory',
  },
});
