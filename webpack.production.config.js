var webpack = require('webpack');
var path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin')

let pathsToClean = [
  'js/*.*'
]

let cleanOptions = {
  root: path.join(__dirname, 'public/build/')
}

module.exports = {
   entry: {
      'ico-build': path.join(__dirname, 'core/client/app/admin-dashboard/app.jsx'),
      'ico-site': path.join(__dirname, 'core/client/app/site/index.js')
   },
  output: {
    path: path.join(__dirname, 'public/build/js'),
    publicPath: '/build/js/',
    filename: '[name].js',
    chunkFilename:'[name].[hash].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css']
  },
  devtool: 'source-map',
   module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'stage-0', 'react']
      }
    },
    { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
    {
      test: /\.(scss|css)$/,
      loader: ['style-loader', 'css-loader', 'sass-loader']
    }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
   new webpack.IgnorePlugin(/jsdom$/),
   new webpack.optimize.UglifyJsPlugin(),
   new webpack.optimize.AggressiveMergingPlugin(),
   new CleanWebpackPlugin(pathsToClean, cleanOptions)
  ]
};