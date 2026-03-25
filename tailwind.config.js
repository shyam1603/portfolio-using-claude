/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-black": "#0F0F1E",
        "secondary-black": "#1A1A2E",
        "accent-blue": "#00D9FF",
        "accent-purple": "#8B5CF6",
        "text-light": "#FFFFFF",
        "text-secondary": "#A0AEC0",
        "border-color": "#2D3748",
        "bg-hover": "#2A2A3E",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0,217,255,0.1)",
        medium: "0 8px 24px rgba(139,92,246,0.15)",
        glass: "0 8px 32px rgba(0,0,0,0.3)",
        "glow-blue": "0 0 20px rgba(0,217,255,0.3)",
        "glow-purple": "0 0 20px rgba(139,92,246,0.3)",
      },
      backdropFilter: {
        glass: "blur(10px)",
      },
      animation: {
        typing: "typing 3.5s steps(40, end)",
        blink: "blink .7s infinite",
        float: "float 3s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        typing: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        blink: {
          "0%, 49%": { borderRightColor: "#00D9FF" },
          "50%, 100%": { borderRightColor: "transparent" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      gap: {
        6: "1.5rem",
        8: "2rem",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
