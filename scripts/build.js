/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const path = require("path");
const rimraf = require("rimraf");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.NODE_ENV === "production";
rimraf.sync(path.resolve(__dirname, "../build"));
webpack(
  {
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? "source-map" : "cheap-module-source-map",
    entry: [path.resolve(__dirname, "../src/index.js")],
    output: {
      path: path.resolve(__dirname, "../build"),
      filename: "main.js"
    },
    plugins: [new MiniCssExtractPlugin()],
    module: {
      rules: [
        {
          test: /\.js$/,
          use: "babel-loader",
          exclude: /node_modules/
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"]
        }
      ]
    }
  },
  (err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      process.exit(1);
      return;
    }
    const info = stats.toJson();
    if (stats.hasErrors()) {
      console.log("Finished running webpack with errors.");
      info.errors.forEach((e) => console.error(e));
      process.exit(1);
    } else {
      console.log("Finished running webpack.");
    }
  }
);
