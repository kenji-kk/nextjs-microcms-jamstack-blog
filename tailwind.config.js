module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        'mxl': {'max': '1279px'},
        // => @media (max-width: 1279px) { ... }

        'mlg': {'max': '1023px'},
        // => @media (max-width: 1023px) { ... }

        'mmd': {'max': '767px'},
        // => @media (max-width: 767px) { ... }

        'msm': {'max': '639px'},
        // => @media (max-width: 639px) { ... }
    }},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
