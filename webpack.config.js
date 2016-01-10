var path = require('path')
var webpack = require('webpack')
var outputDir = 'dist'

module.exports = {
  entry: {
    vendor: ['pixi.js', 'jquery', 'EventEmitter'],
    app: path.join(__dirname, 'app', 'main.js')
  },
  output: {
    path: path.join(__dirname, outputDir),
    filename: 'app.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new webpack.ProvidePlugin({
      $: 'jquery'
    }),
    new webpack.ProvidePlugin({
      EventEmitter: 'EventEmitter'
    })
  ],
  module: {
    noParse: [
      path.join(__dirname, 'node_modules', 'pixi.js')
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  resolve: {
    alias: {
      'pixi.js': path.join(__dirname, 'node_modules', 'pixi.js', 'bin',
        'pixi.min.js'),
      'jquery': path.join(__dirname, 'node_modules', 'jquery', 'dist',
        'jquery.min.js'),
      'EventEmitter': path.join(__dirname, 'node_modules', 'eventemitter3',
        'index.js')
    }
  },
  devtool: '#source-map'
}
