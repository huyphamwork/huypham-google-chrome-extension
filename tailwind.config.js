/** @type {import('tailwindcss').Config} */
let content = [`./src/**/*.{html,ts}`];
module.exports = {
  corePlugins: {
    preflight: false, // Prevent reset css
  },
  content,
  theme: {
    fontFamily: {
      base: 'Open Sans',
      primary: 'Oswald',
      secondary: 'Open Sans',
    },
    extend: {
      colors: {
        base: '#5a5a5a',
        primary: '#a3345b',
        secondary: '#e48826',
        link: '#a3345b',
        linkHover: '#e94a6b',
        buttonPrimary: '#a3345b',
        buttonSecondary: '#212121',
        price: '#9b51e0',
        borderColor: '#DCD7D7',
        attrActive: '#a3345b',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['light'],
        },
      },
    ], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: 'dark', // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ':root', // The element that receives theme color CSS variables
  },
};
