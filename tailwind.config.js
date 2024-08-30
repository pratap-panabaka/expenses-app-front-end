/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '475px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        toolite: "#eef4d4",
        lite: "#daefb3",
        dark: "#2589bd",
        toodark: "#1c2826",
      },
      fontFamily: {
        sans: ['"palanquin-dark"', "sans-serif"],
        custom: ['palanquin-dark', "sans-serif"]
      }
    },
  },
  plugins: [forms],
}