import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: "#f0f7f4",
          100: "#dcede5",
          200: "#bbdacc",
          300: "#8ec0a9",
          400: "#5ea082",
          500: "#3d8464",
          600: "#2d6a4f",
          700: "#245542",
          800: "#1e4436",
          900: "#1a3a2f",
          950: "#0d1f19",
        },
        gold: {
          50: "#fdf9ec",
          100: "#faf0cc",
          200: "#f5df95",
          300: "#f0c957",
          400: "#ecb52e",
          500: "#d4920f",
          600: "#c9a84c",
          700: "#9a6a0a",
          800: "#7d570f",
          900: "#684711",
          950: "#3c2505",
        },
        cream: {
          50: "#fefcf7",
          100: "#fdf6ec",
          200: "#faecd5",
          300: "#f5dcb0",
          400: "#efc482",
          500: "#e8a957",
        },
        bark: {
          800: "#2c1810",
          900: "#1a0e08",
        },
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "leaf-pattern":
          "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232d6a4f' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
