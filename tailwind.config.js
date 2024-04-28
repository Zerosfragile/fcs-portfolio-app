/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    colors: {
      white: "#ffffff",
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
      christmas: {
        red: "#ef4444",
        green: "#22c55e",
        tree: "#013220",
      },
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        shake: {
          "5%": { transform: `rotate(5deg)` },
          "0%": { transform: `rotate(0deg)` },
          "10%": { transform: `rotate(-5deg)` },
          "15%": { transform: `rotate(0deg)` },
          "100%": { transform: `rotate(0deg)` },
        },
        pulse: {
          "0%": { opacity: 1 },
          "5%": { opacity: 1 },
          "50%": { opacity: 0.25 },
          "90%": { opacity: 1 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "shake-slow": "shake 3s infinite",
        "pulse-slow": "pulse 4s infinite",
      },
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
              '@media (max-width: theme("screens.md"))': {
                fontSize: theme("fontSize.lg"),
              },
            },
            h2: {
              color: "#e2e2e2",
              fontWeight: "700",
              borderTop: "1px solid #e2e2e254",
              padding: "1em 0",
              '@media (max-width: theme("screens.md"))': {
                margin: "0.5em 0",
                fontSize: theme("fontSize.base"),
              },
            },
            h3: {
              color: "#e2e2e2CC",
              fontWeight: "700",
              '@media (max-width: theme("screens.md"))': {
                margin: "0.5em 0",
                fontSize: theme("fontSize.sm"),
              },
            },
            h4: {
              color: "#e2e2e2BF",
              fontWeight: "700",
              '@media (max-width: theme("screens.md"))': {
                margin: "0.5em 0",
                fontSize: theme("fontSize.sm"),
              },
            },
            h5: {
              color: "#e2e2e2BF",
              fontWeight: "700",
              '@media (max-width: theme("screens.md"))': {
                margin: "0.5em 0",
                fontSize: theme("fontSize.sm"),
              },
            },
            h6: {
              color: "#e2e2e2BF",
              fontWeight: "700",
              '@media (max-width: theme("screens.md"))': {
                margin: "0.5em 0",
                fontSize: theme("fontSize.sm"),
              },
            },
            li: {
              color: "#e2e2e254",
              "&::marker": {
                color: "#e2e2e254",
              },
              '@media (max-width: theme("screens.md"))': {
                margin: "0.5em 0",
                fontSize: theme("fontSize.xs"),
              },
            },
            a: {
              color: "#6b7280",
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
              borderRadius: "10px",
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
              '@media (max-width: theme("screens.md"))': {
                padding: "1em",
                fontSize: theme("fontSize.xs"),
                "&::-webkit-scrollbar": {
                  maxHeight: "3px",
                  backgroundColor: "transparent",
                },
                "&::-webkit-scrollbar-thumb": {
                  borderRadius: "2px",
                },
              },
            },
            code: {
              color: "#e2e2e2A8",
              '@media (max-width: theme("screens.md"))': {
                margin: "0.5em",
                fontSize: theme("fontSize.xs"),
              },
            },
            p: {
              '@media (max-width: theme("screens.md"))': {
                margin: "0.5em 0",
                fontSize: theme("fontSize.xs"),
              },
            },
            img: {
              margin: "1em 0",
              borderRadius: "4px",
            },
          },
        },
      }),
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries"),
  ],
};
