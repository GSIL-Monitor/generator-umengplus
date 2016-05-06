const ExtractTextPlugin = require('extract-text-webpack-plugin');
const TARGET = process.env.npm_lifecycle_event;
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

process.env.BABEL_ENV = TARGET;

// 常用路径
const PATHS = {
  static: path.join(__dirname, 'static'),
  dist: path.join(__dirname, 'dist')
};


// 页面生成配置
const PAGES = [
  { title: 'title', entry: 'index' }
];


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
        loaders: ['style', 'css']
      },
      {
        test: /\.scss|\.sass$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        include: PATHS.static
      },
      { test: /\.(jpe?g|png|gif|svg)$/i,
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
        loader: 'html-loader'
      }
    ]
  },

  devServer: {
    contentBase: PATHS.dist,
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    stats: 'errors-only',
    host: process.env.HOST,
    port: process.env.PORT
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: '友盟+',
      filename: 'isie.html',
      chunks: [],
      favicon: path.resolve(__dirname, 'static/img/favicon.ico'),
      template: path.resolve(__dirname, 'static/isie.html'),
    })
  ].concat(HtmlWebpackPluginPages(PAGES)),

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


// 生成 HtmlWebpackPlguin 页面
function HtmlWebpackPluginPages(pages) {
  return pages.map(function(page) {
    return new HtmlWebpackPlugin({
      title: page.title,
      filename: page.entry + '.html',
      chunks: [page.entry],
      favicon: path.resolve(__dirname, 'static/img/favicon.ico'),
      template: path.resolve(__dirname, 'static/template.html'),
    })
  });
}
