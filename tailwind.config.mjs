/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        cti: {
          bg: '#F7F3EA',
          surface: '#FDFBF7',
          bar: '#FAF7F0',
          pill: '#FBF9F4',
          catInactive: '#ECE4D5',
          catActive: '#DEC7A3',
          badge: '#E3D7C1',
          border: '#E2D9C8',
          divider: '#E6DEC8',
          inputBorder: '#DDD4C3',
          text: '#231F1B',
          muted: '#5C5449',
          langMuted: '#736A5E',
          gold: '#96784B',
          star: '#E5A93B',
          open: '#2E7D43',
          closed: '#C53939',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};
