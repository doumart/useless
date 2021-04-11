const rules = require("./webpack.rules");
const plugins = require("./webpack.plugins");
const path = require("path");

module.exports = {
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, ".webpack/renderer"),
  },
  devtool: "inline-source-map",
  entry: "./src/renderer.tsx",
  module: {
    rules: [
      ...rules,
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
      },
    ],
  },
  plugins,
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".scss"],
  },
};
