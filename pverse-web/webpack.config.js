'use strict'

const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const path = require('path')
//console.log(process.env.NODE_ENV,"<<<<");
module.exports = {
  mode: process.env.NODE_ENV || "production",
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  entry: {
    bundle: "./client/app.js",
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      "process.env": Object.keys(process.env).reduce(function(o, k) {
        o[k] = JSON.stringify(process.env[k]);
        return o;
      }, {}),
    }),
  ],
  node: {
    fs: "empty",
    net: "empty",
    tls: "empty",
  },
};
