/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/*.{js,ts,jsx,tsx}",
    "./src/components/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
    safelist: [{
    pattern: /hljs+/,
  }],
  theme: {
   hljs: {
      theme: 'night-owl',
    },
  },
  plugins: [require('tailwind-highlightjs'), require('@tailwindcss/typography')],
}
