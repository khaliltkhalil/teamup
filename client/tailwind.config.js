module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["cmyk", "dark", "cupcake"],
  },
  plugins: [require("daisyui")],
};
