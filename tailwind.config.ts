import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'RedTint/900':'#D3332B',
        'Primary':'#3758F9',
        'slate/900': '#0F172A',
        'red/200': '#FECACA',
        'red/600': '#DC2626',
        'green/200': '#BBF7D0',
        'green/600': '#16A34A',

      },
    },
  },
  plugins: [],
};
export default config;
