module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      serif: ["Roboto Slab"],
    },
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "code::before": {
              content: "''",
            },
            "code::after": {
              content: "''",
            },
            code: {
              color: theme("colors.yellow.600"),
              fontWeight: "700",
            },
          },
        },
      }),
      screens: {
        print: { raw: "print" },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
