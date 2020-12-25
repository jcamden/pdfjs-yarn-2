const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    app: path.join(__dirname, '../public', 'index.tsx'),
  },
  target: 'web',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../public', 'index.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './public/favicon', to: 'favicon' },
        { from: './src/dummy.pdf', to: 'dummy.pdf' },
      ],
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' }, // Images
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' }, // Fonts and SVGs
      {
        test: /\.(html)?$/,
        use: ['html-loader'],
      },
      {
        test: /\.(tsx|ts)?$/,
        use: ['ts-loader'],
      },
    ],
  },
};
