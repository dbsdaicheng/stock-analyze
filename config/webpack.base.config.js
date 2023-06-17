const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const DEV = process.env.NODE_ENV === 'production';

module.exports = {
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude:/node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ]
          }
        }
      },
      {
        test: /\.(png|jep?g|gif|eot|ttf|woff|woff2)$/i,
        type: 'asset/resource',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024,
          }
        }
      },
      {
        test: /\.less$/,
        use: [
          DEV ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                lessOptions: {
                  javascriptEnabled: true,
                },
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          DEV ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
    ]
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.less', '.css', '.json'],
    alias: {
      "@/api": path.resolve(__dirname, '../src/api'),
      "@/utils": path.resolve(__dirname, '../src/utils'),
      "@/pages": path.resolve(__dirname , '../src/pages'),
    }
  }
}