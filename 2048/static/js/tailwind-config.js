tailwind.config = {
  theme: {
    colors: {
      black: "#000000",
      white: "#FFFFFF",
      "page-background-blue": "#3253ad",
      "grid-dark-blue": "#011F4B",
      "container-dark-blue": "#083158",
      "tile-2-colour": "#82EEFD",
      "tile-4-colour": "#63C5DA",
      "tile-8-colour": "#52B2BF",
      "tile-16-colour": "#0492C2",
      "tile-32-colour": "#99EDC3",
      "tile-64-colour": "#3DED97",
      "tile-128-colour": "#03C04A",
      "tile-256-colour": "#03AC13",
      "tile-512-colour": "#FDE992",
      "tile-1024-colour": "#FC6A03",
      "tile-2048-colour": "#D21404",
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
