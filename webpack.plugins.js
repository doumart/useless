const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  new CopyWebpackPlugin({
    patterns: [
      { from: "src/assets", to: "assets" },
    ],
  }),
  new HtmlWebpackPlugin({
    filename: "index.html",
    template: "public/index.html",
  }),
];
