/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#09090B",
          900: "#0F0F11",
          850: "#141416",
          800: "#18181B",
          700: "#242427",
          600: "#2E2E33",
        },
        acid: {
          DEFAULT: "#EAFD56",
          soft: "#F3FF9B",
          deep: "#C9DE2F",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1rem" }],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      maxWidth: {
        shell: "82rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        lift: "0 1px 0 0 rgba(255,255,255,.05) inset, 0 20px 50px -30px rgba(0,0,0,.9)",
        acid: "0 18px 40px -22px rgba(234,253,86,.55)",
      },
      keyframes: {
        "slide-x": {
          from: { transform: "translate3d(0,0,0)" },
          to: { transform: "translate3d(-50%,0,0)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: ".45", transform: "scale(.7)" },
        },
      },
      animation: {
        "slide-x": "slide-x 38s linear infinite",
        "pulse-dot": "pulse-dot 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
