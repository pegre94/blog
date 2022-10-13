/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    "./src/pages/*.{js,ts,jsx,tsx}",
    "./src/components/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  safelist: [{
    pattern: /hljs+/,
  }],
  important: '#__next',
  theme: {
    hljs: {
      theme: 'night-owl',
    },
  },
  plugins: [require('tailwind-highlightjs'), require('@tailwindcss/typography')],
}
