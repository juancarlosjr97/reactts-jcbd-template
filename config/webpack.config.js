const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const dotenv = require("dotenv");
const webpack = require("webpack");
const fs = require("fs");
const { merge } = require("webpack-merge");
const pathResolutions = require("./paths");

const topDirectory = path.join(__dirname, "..");

const envKeys = () => {
  const env = dotenv.config().parsed;

  if (env) {
    return Object.keys(env).reduce((prev, next) => {
      prev[`process.env.${next}`] = JSON.stringify(env[next]);
      return prev;
    }, {});
  }

  return {};
};

const commonConfig = {
  devServer: {
    contentBase: path.join(topDirectory, "public"),
    compress: true,
    port: 3500,
    watchOptions: {
      aggregateTimeout: 500,
      poll: true,
    },
  },
  entry: path.resolve(topDirectory, "src", "index.tsx"),
  output: {
    path: path.resolve(topDirectory, "dist"),
    filename: "bundle.[hash].js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(topDirectory, "public", "index.html"),
    }),
    new webpack.DefinePlugin(envKeys()),
    new CopyPlugin({
      patterns: [{ from: path.resolve(topDirectory, "public"), to: path.resolve(topDirectory, "dist") }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: ["babel-loader", "eslint-loader"],
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [{ loader: "ts-loader" }, { loader: "eslint-loader" }],
      },
      {
        test: /\.s?css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }, { loader: "sass-loader" }],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: ["file-loader"],
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
    ],
  },
};

module.exports = () => {
  return merge(commonConfig, pathResolutions);
};
