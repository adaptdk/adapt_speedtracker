'use strict'

const webpack = require('webpack')
const path = require('path')

let config = {
  entry: [
    'whatwg-fetch',
    './app/App'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        test: /\.(js|jsx)$/,
        query: {
          presets: ['es2015', 'es2016', 'react'],
          plugins: [
            'transform-es2015-arrow-functions',
            'transform-class-properties'
          ]
        }
      }
    ]
  }
}

if (process.env.NODE_ENV === 'production') {
  config.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true
      }
    })
  ]
}

module.exports = config
