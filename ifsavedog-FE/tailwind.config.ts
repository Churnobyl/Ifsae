/** @type {import('tailwindcss').Config} */

import fluid, { extract, fontSize } from 'fluid-tailwind';
import scrollbarHide from 'tailwind-scrollbar-hide';

export default {
  content: {
    files: ['./src/**/*.{js,jsx,ts,tsx}'],
    extract,
  },
  theme: {
    backgroundImage: {
      shelter: 'url("./assets/shelter.webp")',
      individual: 'url("./assets/individual.webp")',
    },
    screens: {
      phone: { max: '767px' },
      pc: { min: '768px', max: '1920px' },
    },
    colors: {
      white: '#fff',
      black: '#4D4637',
      veryBlack: '#000000',
      base: '#F9F6E3',
      darkbase: '#98764F',
      red: '#FF3939',
      subBase: '#FCFAEB',
      main: '#DAEA94',
      lightGray: '#EFEFEF',
      whiteGray: '#F5F5F5',
      gray: '#969696',
      lightBlue: '#CCE5FF',
      pointGreen: '#26CB1D',
      pointBlue: '#3370EA',
      hoverGreen: '#B6D96E',
      transparent: 'transparent',
      pointYellow: '#F4CF57',
    },
    fontSize,
    extend: {},
  },
  plugins: [
    fluid,
    scrollbarHide,
    function ({ addBase, theme }) {
      addBase({
        ':root': {
          '--color-main': theme('colors.main'),
          '--color-black': theme('colors.black'),
          '--color-gray': theme('colors.gray'),
        },
      });
    },
  ],
};
