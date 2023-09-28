module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["wireframe", "dark", "cupcake"],
  },
  plugins: [require("daisyui")],
};
