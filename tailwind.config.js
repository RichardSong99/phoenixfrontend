// tailwind.config.js
import {nextui} from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    // ...
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        appleGray1: '#8E8E93',
        appleGray2: '#AEAEA2',
        appleGray3: '#C7C7CC',
        appleGray4: '#D1D1D6',
        appleGray5: '#E5E5EA',
        appleGray6: '#F2F2F7',
        appleGray6Dark: '#1C1C1E',
        appleBlue: '#007AFF',
      },
    },
  },
  plugins: [nextui({
    addCommonColors: true,
  })]
}

export default config;