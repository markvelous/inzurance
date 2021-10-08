module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      myKuaiLe: ['ZCOOL KuaiLe'],
      myUbuntu: ['Ubuntu'],
      myLuckiest: ['Luckiest Guy'],
      myGochi: ['Gochi Hand'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
