module.exports = [
  // Add support for native node modules
  {
    test: /\.(tsx|ts|jsx|js|mjs)$/,
    exclude: /(node_modules|\.webpack)/,
    use: {
      loader: "ts-loader",
    },
  },
];
