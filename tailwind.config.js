module.exports = {
  content: ["./**/*.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        newGame: '#3cc1a3',
        tryAgain: '#ffd71f',
        customDark: "oklch(23% 0.015 260)",
        customDark2: "oklch(31% 0.015 260)",
      },
      gridColumn: {
        'span-5': 'span 5 / span 5',  // Custom span for Space key
      },
    },
  },
  plugins: [],
  darkMode: 'selector',
}

