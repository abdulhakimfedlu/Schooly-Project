/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        schooly: {
          bg: '#0B0D0B',
          'bg-secondary': '#121612',
          'bg-card': '#171C17',
          primary: '#C6FF4D',
          'primary-dark': '#A8F52D',
          text: '#F5F7F2',
          'text-secondary': '#A6ADA2',
          border: '#252C24',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

