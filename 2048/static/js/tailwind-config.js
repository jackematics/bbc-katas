tailwind.config = {
  theme: {
    colors: {
      black: "#000000",
      white: "#FFFFFF",
      "page-background-blue": "#3253ad",
      "grid-dark-blue": "#011F4B",
      "container-dark-blue": "#083158",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
