const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    home: './src/pages/home/index.js',
    about: './src/pages/about/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.hbs$/,
        use: [
          {
            loader: 'handlebars-loader',
            options: {
              partialDirs: [
                path.join(__dirname, 'src/pages/home/components'),
                path.join(__dirname, 'src/components')
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[path][name].[ext]',
              context: 'src/assets',
              emitFile: true,
              esModule: false,
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/pages/home/home.hbs',
      chunks: ['home']
    }),
    new HtmlWebpackPlugin({
      filename: 'about.html',
      template: './src/pages/about/about.hbs',
      chunks: ['about']
    }),
    new MiniCssExtractPlugin({
      filename: '[name].styles.css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/assets', to: 'assets' }
      ]
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
    open: true,
  }
};