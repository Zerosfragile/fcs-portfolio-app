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
      typography: ({ theme }) => ({
        offwhite: {
          css: {
            color: "#e2e2e254",
            fontFamily: "CygnitoMono-011",
            textTransform: "uppercase",
            fontWeight: "300",
            margin: "1em 0",
            h1: {
              color: "#e2e2e2",
              fontWeight: "700",
              textAlign: "center",
              margin: "1em 0",
            },
            h2: {
              color: "#e2e2e2",
              fontWeight: "700",
              borderTop: "1px solid #e2e2e254",
              padding: "1em 0",
            },
            h3: {
              color: "#e2e2e2CC",
              fontWeight: "700",
            },
            h4: {
              color: "#e2e2e2BF",
              fontWeight: "700",
            },
            h5: {
              color: "#e2e2e2BF",
              fontWeight: "700",
            },
            h6: {
              color: "#e2e2e2BF",
              fontWeight: "700",
            },
            li: {
              color: "#e2e2e254",
            },
            a: {
              color: "#551A8B",
              transition: "all cubic-bezier(.4, 0, .2, 1) .25s",
              "&:hover": {
                color: "#2c5282",
              },
              "&:visted": {
                color: "#551A5B",
              },
            },
            strong: {
              color: "#e2e2e280",
              fontWeight: "700",
            },
            pre: {
              backgroundColor: "#111",
              color: "#e2e2e254",
              padding: "2em",
              borderRadius: "18.75px",
              border: "1px solid #e2e2e254",
              overflowX: "scroll",
              "&::-webkit-scrollbar": {
                maxHeight: "6px",
                backgroundColor: "transparent",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "transparent",
              },
              "&::-webkit-scrollbar-thumb": {
                borderRadius: "5px",
                backgroundColor: "#8B8B8B66",
                "&:hover": {
                  backgroundColor: "#8B8B8B",
                },
              },
            },
            code: {
              color: "#e2e2e2A8",
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
