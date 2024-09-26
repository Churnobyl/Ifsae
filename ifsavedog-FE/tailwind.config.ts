/** @type {import('tailwindcss').Config} */

import fluid, { extract, fontSize } from 'fluid-tailwind';

export default {
  content: {
    files: ['./src/**/*.{js,jsx,ts,tsx}'],
    extract,
  },
  theme: {
    screens: {
      phone: { max: '767px' },
      pc: { min: '768px', max: '1920px' },
    },
    colors: {
      white: '#fff',
      black: '#4D4637',
      base: '#E8AA8C',
      red: '#FF3939',
      subBase: '#FCFAEB',
      main: '#DAEA94', // Main Color
      gray: '#9C9C9C',
      pointGreen: '#26CB1D',
      pointBlue: '#3370EA',
      transparent: 'transparent',
    },
    fontSize,
    extend: {},
  },
  plugins: [
    fluid,
    function ({ addBase, theme }) {
      addBase({
        ':root': {
          '--color-main': theme('colors.main'),
          '--color-black': theme('colors.black'),
        },
      });
    },
  ],
};
