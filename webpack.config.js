const webpack = require('webpack');
const path = require('path');

const config = {
  entry: './app/App.js',
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx'
    ]
  },
  devServer: {
    proxy: {
      '*': 'http://0.0.0.0:4820/',
    },
  }
}

module.exports = config;
