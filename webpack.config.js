var path = require('path');

module.exports = {
  entry: {
    login: './static/js/bundles/login.js',
    dashboard: './static/js/bundles/dashboard.js',
    interruptions: './static/js/bundles/interruptions.js',
    interruptions2: './static/js/bundles/interruptions2.js'
  },
  output: {
    path: path.join(path.join(__dirname, 'dist'), 'js'),
    filename: '[name].js'
  },
  devServer: {
    inline: true,
    port: 443,
    host: "127.0.0.1"
  },
  module: {
    loaders: [
     {
       test: /\.(js|jsx)$/,
       exclude: /node_modules/,
       loader: 'babel',
       query: {
         presets: ['react', 'es2015', 'stage-2']
       }
     }
   ]
 }
};
