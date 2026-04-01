// tailwind.config.js
const daisyui = require("daisyui");  // ← use require instead

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
}