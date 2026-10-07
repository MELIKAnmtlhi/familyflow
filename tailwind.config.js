/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
       screens: {
          "sm": "480px",
          "md": "0",
          "lg": "1024",
          "xl": "1280px",
          "2xl": "1536px",
       },
      animation: {
        marquee: "marquee 8s linear infinite",
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)'},
          '100%': { transform: 'translateX(-50%)'},
        }
      }
    },
  },
  plugins: [],
};

