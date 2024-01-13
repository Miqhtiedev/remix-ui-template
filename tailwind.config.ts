import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["light", "dark", "sunset"],
  },
  plugins: [require("daisyui")],
} satisfies Config;
