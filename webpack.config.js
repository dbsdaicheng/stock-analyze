const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ESLintPlugin = require('eslint-webpack-plugin');

const { DEV, DEBUG } = process.env;

process.env.BABEL_ENV = DEV ? 'development' : 'production';
process.env.NODE_ENV = DEV ? 'development' : 'production';

module.exports = {
  entry: './src/index',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
    clean: true,
    publicPath: '/'
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
    }
  },
  mode: DEV ? 'development' : 'production',
  devtool: DEV && 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // 处理 .less
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          // less-loader
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                // 替换antd的变量，去掉 @ 符号即可
                // https://ant.design/docs/react/customize-theme-cn
                modifyVars: {
                  'primary-color': '#1DA57A',
                  'border-color-base': '#d9d9d9', // 边框色
                  'text-color': '#d9d9d9'
                },
                javascriptEnabled: true, // 支持js
              },
            },
          },
        ],
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: !!DEV,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !!DEV,
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        type: 'asset/resource',
        use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(csv|tsv)$/i,
        use: ['csv-loader'],
      },
      {
        test: /\.xml$/i,
        use: ['xml-loader'],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: false,
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    minimize: !DEV,
    splitChunks: {
      minSize: 500000,
      cacheGroups: {
        vendors: false,
      },
    },
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.json', '.js', '.jsx', '.ts', '.tsx', '.less', 'scss'],
    alias: {
      "@/api": path.resolve(__dirname, './src/api'),
      "@/utils": path.resolve(__dirname, './src/utils'),
      "@/pages": path.resolve(__dirname , './src/pages'),
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/index.html'),
    }),
    DEBUG && new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css',
    }),
    new ESLintPlugin(),
    new ForkTsCheckerWebpackPlugin(),
  ].filter(Boolean),
};