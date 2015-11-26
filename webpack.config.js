var path = require('path');

module.exports = {
  entry: path.join(__dirname, 'app', 'main.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js'
  }
}
