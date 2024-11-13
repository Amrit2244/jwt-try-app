// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Adjust the path if needed
  ],
  theme: {
    extend: {
      colors: {
        'background-gray': '#1a1a1a', // Define a custom gray background color
        'text-white': '#ffffff',      // Define custom white text color
      },
    },
  },
  plugins: [],
};
