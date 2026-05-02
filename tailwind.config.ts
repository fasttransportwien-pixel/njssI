import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Premium Navy (Hero, TopBar, Footer)
        navy: {
          50: '#f3f5f8',
          100: '#dde3ec',
          200: '#b8c4d6',
          300: '#8b9bb6',
          400: '#5d7295',
          500: '#3a4f74',
          600: '#243a5c',
          700: '#162a47',
          800: '#0d1d34',
          900: '#0b1929',
          950: '#061222',
        },
        // Premium Champagne Gold (Accents, CTAs)
        gold: {
          50: '#fbf8ee',
          100: '#f5edcb',
          200: '#ecd994',
          300: '#e0c25f',
          400: '#d4af37',
          500: '#c9a961', // primary gold
          600: '#a88b4a',
          700: '#876d3a',
          800: '#6c562f',
          900: '#594729',
        },
        // Neutral grays
        ink: {
          50: '#fafafa',
          100: '#f4f5f7',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#0b1929',
        },
        // Legacy aliases (so older components still compile)
        brand: {
          50: '#fbf8ee',
          100: '#f5edcb',
          500: '#c9a961',
          600: '#a88b4a',
          700: '#876d3a',
        },
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 6px 28px -10px rgba(11, 25, 41, 0.18)',
        card: '0 10px 40px -16px rgba(11, 25, 41, 0.18)',
        gold: '0 8px 28px -8px rgba(201, 169, 97, 0.5)',
      },
      backgroundImage: {
        'gold-shine': 'linear-gradient(135deg, #d4af37 0%, #e5c97d 50%, #c9a961 100%)',
        'navy-deep': 'linear-gradient(180deg, #0b1929 0%, #061222 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
