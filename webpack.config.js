var path = require('path')
var outputDir = 'dist'

module.exports = {
  entry: path.join(__dirname, 'app', 'main.js'),
  output: {
    path: path.join(__dirname, outputDir),
    filename: 'app.js'
  }
}
