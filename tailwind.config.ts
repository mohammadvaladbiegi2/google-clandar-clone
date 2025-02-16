import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4285F4',
        secondary: '#34A853',
        danger: '#EA4335',
        warning: '#FBBC05',
      },
    },
  },
  plugins: [],
} satisfies Config;
