"use strict";

const Path = require("path");
const TestWebpackPlugin = require("./test-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SuppressChunksPlugin = require("suppress-chunks-webpack-plugin").default;

const scripts = {
  "scripts/app": "./src/app.js"
};

const styles = {
  "styles/app": "./src/app.scss",
  "styles/home": "./src/home.scss"
};

const supressList = Object.keys(styles).map(key => ({
  name: key,
  match: /\.js$/
}));

module.exports = {
  mode: "development",

  entry: {
    ...scripts,
    ...styles
  },

  output: {
    path: Path.resolve("public"),
    publicPath: "/",
    filename: "[name].js"
  },

  plugins: [
    new MiniCssExtractPlugin(),
    new SuppressChunksPlugin(supressList)
  ],

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        // use: ["style-loader", "css-loader", "sass-loader"]
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              filename: "[name].css",
              publicPath: "css"
            }
          },
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  }
};
