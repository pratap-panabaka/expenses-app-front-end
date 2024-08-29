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
        toolite: "#97FEED",
        lite: "#35A29F",
        dark: "#0B666A",
        toodark: "#071952",
      },
      fontFamily: {
        sans: ['"palanquin-dark"', "sans-serif"],
        custom: ['palanquin-dark', "sans-serif"]
      }
    },
  },
  plugins: [forms],
}