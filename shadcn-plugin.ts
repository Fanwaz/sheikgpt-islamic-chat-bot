
import plugin from "tailwindcss/plugin";

export const shadcnPlugin = plugin(
  ({ addBase }) => {
    addBase({
      ":root": {
        "--radius": "0.75rem",
      },
    });
  },
  {
    theme: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
      extend: {
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
        keyframes: {
          "accordion-down": {
            from: { height: "0" },
            to: { height: "var(--radix-accordion-content-height)" },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: "0" },
          },
          "fade-in": {
            from: { opacity: "0" },
            to: { opacity: "1" },
          },
          "slide-in-up": {
            from: { transform: "translateY(20px)", opacity: "0" },
            to: { transform: "translateY(0)", opacity: "1" },
          }
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
          "fade-in": "fade-in 0.5s ease-out",
          "slide-in-up": "slide-in-up 0.5s ease-out",
        },
      },
    },
  }
);
