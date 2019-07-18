const config = {
  entry: './app/App.js',
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
<<<<<<< HEAD
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
=======
        exclude: /node_modules/,
      },
    ],
>>>>>>> master
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
    ],
  },
  devServer: {
    proxy: {
      '*': 'http://0.0.0.0:4820/',
    },
  },
};

module.exports = config;
