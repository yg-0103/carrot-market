module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "media", // media || class
  plugins: [require("@tailwindcss/forms")],
};

// content -> tailwindcss를 사용하는 곳 작성 pages 전체 components 전체
