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
        toolite: "#FBF2c0",
        lite: "#c06352",
        dark: "#f96f5d",
        toodark: "#43281c",
        active: "#FA824C"
      },
      fontFamily: {
        sans: ['"palanquin-dark"', "sans-serif"],
        custom: ['palanquin-dark', "sans-serif"]
      }
    },
  },
  plugins: [forms],
}