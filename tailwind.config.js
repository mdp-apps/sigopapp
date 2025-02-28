import { Colors } from "./config/constants/Colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./presentation/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        light: {
          primary: Colors.light.primary,
          secondary: Colors.light.secondary,
          tertiary: Colors.light.tertiary,

          background: Colors.light.background,
          text: Colors.light.text,
          tomato: Colors.light.tomato,
          white: Colors.light.lightWhite,
          green: Colors.light.green,
          orange: Colors.light.orange,
        },
        dark: {
          primary: Colors.dark.primary,
          secondary: Colors.dark.secondary,
          tertiary: Colors.dark.tertiary,

          background: Colors.dark.background,
          text: Colors.dark.text,
          tomato: Colors.dark.tomato,
          white: Colors.dark.lightWhite,
          green: Colors.dark.green,
          orange: Colors.dark.orange,
        },
      },
      fontFamily: {
        ruda: ["Ruda", "sans-serif"],
        "ruda-bold": ["Ruda-Bold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
