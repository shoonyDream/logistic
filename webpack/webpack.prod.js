const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');


const deployPath = process.env.DEPLOY_KEY || '';

const {
  prod_Path,
  src_Path
} = require('./path');
const {
  selectedPreprocessor
} = require('./loader');

module.exports = {
  entry: {
    main: './' + src_Path + '/index.js'
  },
  output: {
    path: path.resolve(__dirname, prod_Path),
    filename: 'js/[name].[chunkhash].js',
    publicPath: `${deployPath}`,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "initial",
        },
      },
    },
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env'],
            plugins: ['transform-es2015-destructuring', 'transform-object-rest-spread']
          }
        }
      },
      {
        test: selectedPreprocessor.fileRegexp,
        use: [{
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',

          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: './postcss.config.js'
              }
            },
          },
          {
            loader: selectedPreprocessor.loaderName
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images',
            publicPath: `${deployPath}/images`,
          },
        }],
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            interpolate: true
          }
        }
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        // query: {
        //   limit: 10000,
        //   mimetype: 'application/font-woff'
        // },
        options: {
          outputPath: 'fonts/',
          publicPath: `${deployPath}`,
          name: '[name].[ext]',
        },
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          outputPath: 'fonts/',
          publicPath: `${deployPath}`,
          name: '[name].[ext]',
        },
        // query: {
        //   limit: '10000',
        //   mimetype: 'application/octet-stream'
        // }
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          outputPath: 'fonts/',
          publicPath: `${deployPath}`,
          name: '[name].[ext]',
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(path.resolve(__dirname, prod_Path), {
      root: process.cwd()
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.[contenthash].css'
    }),
    new HtmlWebpackPlugin({
      hash: true,
      template: './' + src_Path + '/index.html',
      filename: 'index.html',
      minify: {
        collapseWhitespace: true
      },
    }),
    new webpack.ProvidePlugin({
      $: "jquery/dist/jquery.min.js",
      jQuery: "jquery/dist/jquery.min.js",
      "window.jQuery": "jquery/dist/jquery.min.js"
    }),
    new CopyPlugin({
      patterns: [
        { from: `./${src_Path}/favicon`, to: `./${src_Path}/favicon` },
      ],
    }),
    new WebpackMd5Hash()
  ]
};
