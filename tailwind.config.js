/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: {
        DEFAULT: "#00000000",
      },
      OffWhite: {
        dark: "#b3b3b3",
        DEFAULT: "#e2e2e2",
        light: "#f0fbff",
      },
      LunarGrey: {
        darkest: "#202020",
        dark: "#393939",
        DEFAULT: "#595959",
        light: "#8B8B8B",
      },
      VoidBlack: {
        DEFAULT: "#000000",
        light: "#111111",
        lightest: "#131313",
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-card-before":
          "radial-gradient(800px circle at var(--mouse-x) var(--mouse-y),rgba(255, 255, 255, 0.01), transparent 40%)",
        "gradient-card-after":
          "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.4), transparent 40%)",
      },
      boxShadow: {
        glow: "inset 0 0 0 1px rgba(140, 140, 140, 0.1)",
      },
      lineHeight: {
        "extra-tight": "1.245",
      },
      transitionTimingFunction: {
        cubic: "cubic-bezier(.4, 0, .2, 1)",
      },
    },
  },
  plugins: [],
};
