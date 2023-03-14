//TODO if using normal
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar-hide")],
};

//TODO if using JIT
// module.exports = {
//   mode: "jit",
//   purge: [
//     "./app/**/*.{js,ts,jsx,tsx}",
//     "./pages/**/*.{js,ts,jsx,tsx}",
//     "./components/**/*.{js,ts,jsx,tsx}",

//     // Or if using `src` directory:
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [require("tailwind-scrollbar-hide")],
// };
