/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
      colors: {
        bg:        '#0a0f1e',
        surface:   '#111827',
        surface2:  '#1a2235',
        surface3:  '#222d42',
        accent:    '#6ee7b7',
        accent2:   '#818cf8',
        danger:    '#f87171',
        warning:   '#fbbf24',
      },
      borderRadius: {
        DEFAULT: '14px',
        sm: '8px',
        lg: '20px',
        xl: '28px',
      },
      boxShadow: {
        card: '0 4px 24px rgba(0,0,0,0.4)',
        lg:   '0 12px 48px rgba(0,0,0,0.6)',
        glow: '0 0 24px rgba(110,231,183,0.2)',
      },
    },
  },
  plugins: [],
}