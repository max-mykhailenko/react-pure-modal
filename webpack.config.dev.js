const path = require('path');
const webpack = require('webpack');
const env = process.env.NODE_ENV;

const config = {
  entry: {
    example: path.join(__dirname, 'example/example.js'),
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /(node_modules)/ },
      { test: /\.css$/, loaders: ['style-loader', 'css-loader'], exclude: /(node_modules)/ },
    ],
  },
  output: {
    path: path.join(__dirname, 'example/'),
    filename: '[name].min.js',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
  ],
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js'],
  },
};

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true,
        warnings: false,
      },
    })
  );
}

module.exports = config;
