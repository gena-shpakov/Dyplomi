const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlInlineCssWebpackPlugin =
  require("html-inline-css-webpack-plugin").default;
const HtmlInlineScriptPlugin = require("html-inline-script-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/ui/script.js",
  output: {
    filename: "inline.js",
    path: path.resolve(__dirname, "bundled"),
    clean: true,
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "style.css" }),
    new HtmlWebpackPlugin({
      template: "./src/ui/index.html",
      filename: "ui.html",
      inject: "body",
    }),
    new HtmlInlineCssWebpackPlugin(),
    new HtmlInlineScriptPlugin(),
  ],
};
