const TARGET = process.env.npm_lifecycle_event;
const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');

process.env.BABEL_ENV = TARGET;

// 常用路径
const PATHS = {
  static: path.join(__dirname, 'static'),
  dist: path.join(__dirname, 'dist1')
};

module.exports = {
  context: __dirname + "/static",

  entry: {
    index: PATHS.static + '/js/<%= projectName %>.jsx',
    placeholders: PATHS.static + '/js/lib/placeholders.js'
  },

  output: {
    path: PATHS.dist,
    filename: 'js/[name].js',
    publicPath: '/'
  },

  module: {
    loaders: [
      {
        test: /\.css$byte/,
        loader: ExtractTextPlugin.extract("css")
      },
      {
        test: /\.scss|\.sass$/,
        loader: ExtractTextPlugin.extract("css!sass")
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        include: PATHS.static,
        exclude: [nodeModulesPath]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [ 'url?limit=10000']
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&minetype=application/font-woff'
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10&minetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10&minetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10&minetype=image/svg+xml'
      },
      {
        test: /\.html$/,
        loader: 'html-loader?minimize=false'
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin("css/[name].css"),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.ProvidePlugin({
      $: "jquery"
    }),
    new UglifyJsPlugin({
      comments: false,
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['index'],
      hash: true,
      favicon: path.resolve(__dirname, 'static/img/favicon.ico'),
      template: path.resolve(__dirname, 'static/template.prod.html'),
    }),
    new HtmlWebpackPlugin({
      title: '友盟+',
      filename: 'isie.html',
      chunks: [],
      favicon: path.resolve(__dirname, 'static/img/favicon.ico'),
      template: path.resolve(__dirname, 'static/isie.html'),
    })
  ],

  resolve: {
    modulesDirectories: ["node_modules"],
    extenstions: ['', '.js', '.jsx'],
    alias: {
      css: path.resolve(__dirname, "static/css"),
      sass: path.resolve(__dirname, 'static/sass'),
      img: path.resolve(__dirname, 'static/img'),
      container: path.resolve(__dirname, 'static/js/container'),
      components: path.resolve(__dirname, "static/js/components"),
      constants: path.resolve(__dirname, "static/js/constants"),
      actions: path.resolve(__dirname, "static/js/actions"),
      utils: path.resolve(__dirname, "static/js/utils")
    }
  }
};

