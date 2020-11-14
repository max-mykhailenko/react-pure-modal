const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const config = {
  mode: process.env.NODE_ENV || 'production',
  optimization: {
    minimize: process.env.NODE_ENV !== 'development',
    minimizer:
      process.env.NODE_ENV !== 'development'
        ? [
            new TerserPlugin({
              cache: true,
              parallel: true,
              sourceMap: true, // Must be set to true if using source-maps in production
              terserOptions: {},
            }),
            new CssMinimizerPlugin(),
          ]
        : [],
  },
  entry: {
    example: path.join(__dirname, 'example/example.tsx'),
  },
  devtool: process.env.NODE_ENV !== 'development' ? '' : 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        exclude: /(node_modules)/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'examples/'),
    compress: true,
    port: 8000,
    stats: 'errors-only',
    open: true,
  },
  output: {
    path: path.join(__dirname, 'example/'),
    filename: '[name].min.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [path.join(__dirname, './src'), path.join(__dirname, './node_modules')],
  },
};

module.exports = config;
