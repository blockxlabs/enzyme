const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const customPath = path.join(__dirname, './customPublicPath');
const browser = process.env.TEMP_BROWSER;
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  mode: 'production',
  entry: {
    mainapp: [customPath, path.join(__dirname, '../browser/extension/mainapp')],
    background: [customPath, path.join(__dirname, '../backgroundScript/background')],
    contentScript: [customPath, path.join(__dirname, '../contentScript/content-script')],
    inPageScript: [path.join(__dirname, '../contentScript/in-page-script')],
  },
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, `../build/${browser}/js`),
    filename: x => {
      if (x.chunk.name.includes('background')) {
        return 'background.bundle.js';
      }
      if (x.chunk.name.includes('mainapp')) {
        return 'mainapp.bundle.js';
      }
      if (x.chunk.name.includes('contentScript')) {
        return 'contentScript.bundle.js';
      }
      if (x.chunk.name.includes('inPageScript')) {
        return 'inPageScript.bundle.js';
      }
      return x;
    },
    chunkFilename: '[id].chunk.js',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.IgnorePlugin(/[^/]+\/[\S]+.dev$/),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new UglifyJSPlugin(),
    new HtmlWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        BROWSER: JSON.stringify(browser),
      },
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: false,
      statsOptions: { source: false },
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxSize: 1024 * 1024 * 4,
    },
  },

  resolve: {
    extensions: ['*', '.js'],
  },
  node: {
    fs: 'empty',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
      {
        test: /\.bundle\.js$/,
        use: 'bundle-loader',
      },
      {
        test: /\.(png|jpg|gif|svg|ttf|eot|woff2?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer],
            },
          },
        ],
      },
    ],
  },
};
