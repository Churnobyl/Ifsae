/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      xs: { max: '767px' },
      sm: { min: '768px', max: '1023px' },
      md: { min: '1024px', max: '1279px' },
      lg: { min: '1280px', max: '1439px' },
      xl: '1920px',
    },
    colors: {
      white: '#fff',
      black: '#4A4A4A',
      base: '#E8AA8C',
      subBase: '#F9F3E6',
      main: '#E50000', // Main Color
      gray: '#9C9C9C',
      pointGreen: '#26CB1D',
      pointBlue: '#3370EA',
      transparent: 'transparent',
    },
    extend: {},
  },
  plugins: [],
};
