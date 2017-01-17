var webpack = require ('webpack');

module.exports = {
  entry: './Client/View/index.js',
  output : {
    path : './Client/Build',
    filename : 'bundle.js'
  }, 
  watch : true,
  module : {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015']
      }
    }]
  }
}