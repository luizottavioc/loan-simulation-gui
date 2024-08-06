import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-open-sans)'],
      },
      animation: {
        'show-fade-in': 'show-fade-in 0.1s ease-out',
        'show-fade-in-top-bottom': 'show-fade-in-top-bottom 0.1s ease-out',
        'show-opacity': 'show-opacity 0.2 s ease-out',
      },
      keyframes: {
        'show-fade-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(5px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'show-fade-in-top-bottom': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-5px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'show-opacity': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
      },
    },
  },
  plugins: [],
}
export default config
