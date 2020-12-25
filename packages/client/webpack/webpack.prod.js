const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'vendor',
    },
  },
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader, // extracts css into files
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS modules
          },
          {
            loader: 'postcss-loader', // Run post css actions
            options: {
              postcssOptions: {
                plugins: function () {
                  // post css plugins, can be exported to postcss.config.js
                  // This is from Bootstrap's Webpack docs, and I don't quite understand what these packages are doing here.
                  // FWIW, importing Bootstrap compules even with postcss-loader commented out, so... Anyway:
                  // "PreCSS lets you use Sass-like markup and staged CSS features in CSS."
                  // autoprefixer: "PostCSS plugin to parse CSS and add vendor prefixes to CSS rules using values from Can I Use."
                  // autoprefixer kind looks like it generates polyfills for you?
                  // Also: "You did not set any plugins, parser, or stringifier. Right now, PostCSS does nothing. Pick plugins for your case on https://www.postcss.parts/ and use them in postcss.config.js."
                  return [require('precss'), require('autoprefixer')];
                },
              },
            },
          },
          {
            loader: require.resolve('sass-loader'),
            options: {
              // using sass (Dart) instead of node-sass because node-sass (Javascript) cannot resolve Yarn 2's Plug'N'Play synthetic node_modules directory
              // Evidently, sass is a bit slower to compule than node-sass, but I think I prefer sass anyway for latest features (such as @use)
              implementation: require('sass'),
            },
          },
        ],
      },
    ],
  },
});
