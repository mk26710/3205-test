import defaultTheme from "tailwindcss/defaultTheme";
import { Config } from "tailwindcss/types/config";

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Inter", ...defaultTheme.fontFamily.sans] },
    },
  },
  plugins: [],
} satisfies Config;
