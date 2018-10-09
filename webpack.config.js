const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = {
  mode: 'production',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'assets/js/[name].[hash:7].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.svg', '.png', '.webp', 'jpg', 'jpeg', 'gif', '.html'],
    alias: {
      jquery: 'jquery/dist/jquery.js',
    },
  },
  module: {
    rules: [
      /*{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },*/
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader', // translates CSS into CommonJS modules
              options: {
                minimize: true,
              },
            },
            {
              loader: 'postcss-loader', // Run post css actions
              options: {
                plugins: function() {
                  // post css plugins, can be exported to postcss.config.js
                  return [require('precss'), require('autoprefixer')];
                },
              },
            },
            {
              loader: 'sass-loader', // compiles Sass to CSS
            },
          ],
        }),
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /img/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:7].[ext]',
              outputPath: 'assets/fonts/',
            },
          },
        ],
      },
      {
        test: /\.(gif|png|jpe?g|webp|svg)$/i,
        exclude: /fonts/,
        include: path.resolve(__dirname, './assets'),
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'assets/img/[name].[hash:7].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(html)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
          {
            loader: 'extract-loader',
          },
          {
            loader: 'html-loader',
            options: {
              attrs: [':data-src', 'img:src', 'source:srcset'],
              minimize: false,
              removeComments: false,
              collapseWhitespace: true,
              removeAttributeQuotes: false,
              root: path.resolve(__dirname, './'),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'windows.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
    }),
    /*new CopyWebpackPlugin([
      {
        from: './assets/ico',
        to: '.',
      },
      {
        from: './assets/text',
        to: '.',
      },
    ]),*/
    new ExtractTextPlugin('assets/css/styles.[hash:7].css'),
    new webpack.HashedModuleIdsPlugin(),
    new HtmlWebPackPlugin({
      template: '!!raw-loader!./src/index.html',
      filename: 'index.html',
      minify: false,
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async'
    })
  ],
  optimization: {
    /*
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true,
        },
      },
    },
    */
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: false,
        extractComments: {
          condition: function() {
            return true;
          },
          banner: false,
        },
      }),
    ],
  },
};

module.exports = config;
