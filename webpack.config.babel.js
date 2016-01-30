import path from 'path';
import webpack from 'webpack';

class WebpackConfig {
  constructor(outputDir, minify, sourcemaps) {
    this.entry = {
      vendor: [],
      app: path.join(__dirname, 'app', 'main.js')
    };

    this.output = {
      path: path.join(__dirname, outputDir),
      filename: 'app.js'
    };

    this.plugins = [
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    ];

    this.module = {
      noParse: [],
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015']
          }
        },
        {
          test: /.png$/,
          exclude: /node_modules/,
          loader: 'url-loader',
          query: { mimetype: 'image/png' }
        }
      ]
    };

    this.resolve = {
      alias: {}
    };

    if(sourcemaps) {
      this.devtool = 'source-map';
    }
    
    if(minify) {
      this.plugins.push(new webpack.optimize.UglifyJsPlugin());
    }

    this.addLibraryPlugin('$', 'jquery', path.join(__dirname, 'node_modules',
      'jquery', 'dist', 'jquery.min.js'));
    this.addLibraryPlugin('EventEmitter', 'EventEmitter', path.join(__dirname,
      'node_modules', 'eventemitter3', 'index.js'));
    this.addLibraryPlugin('PIXI', 'pixi.js', path.join(__dirname,
      'node_modules', 'pixi.js', 'bin', 'pixi.min.js'));
  }

  addLibraryPlugin(varName, moduleAlias, filename) {
    let pluginConfig = {};

    this.resolve.alias[moduleAlias] = filename;

    this.entry.vendor.push(moduleAlias);

    pluginConfig[varName] = moduleAlias;
    this.plugins.push(new webpack.ProvidePlugin(pluginConfig));

    this.module.noParse.push(filename);
  }
}

export default new WebpackConfig('dist', false, true);
