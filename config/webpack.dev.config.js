const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ESLintPlugin = require('eslint-webpack-plugin');
const BaseConfig = require('./webpack.base.config');
const { merge } = require('webpack-merge');
const HappyPack = require("happypack");

module.exports = merge(BaseConfig, {
  mode: 'development',
  entry: [
    '/src/index.tsx',
  ],
  output: {
    path: path.resolve(__dirname),
    publicPath: "/",
    filename: "bundle-[contenthash].js",
  },
  devServer: {
    port: 8080,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://121.41.83.47:8080',
        pathRewrite: {'^/api' : ''},
        changeOrigin: true,     // target是域名的话，需要这个参数，
        secure: false,          // 设置支持https协议的代理
      },
    },
    hot: true,
  },
  devtool: "eval-source-map",
  optimization: {
    splitChunks: {
      chunks: "all",
    }
  },
  // externals: {
  //   react: "window.React",
  //   "react-dom": "window.ReactDOM",
  // },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      }
    }),
    new HappyPack({
      use: ["babel-loader", "css-loader", "postcss-loader"],
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      favicon: "./public/favicon.ico",
      template: "./public/index.html",
    })
  ]
})