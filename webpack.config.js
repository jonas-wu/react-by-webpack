const path = require('path')
const webpack = require('webpack')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const HOST = '127.0.0.1'
const PORT = 3000

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {presets: ['@babel/env']},
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: ["style-loader", 'css-loader', "postcss-loader", 
          {loader: "less-loader", options: {javascriptEnabled: true}}
        ]
      },
      {
        test: /\.(png|jpg|gif|JPG|GIF|PNG|BMP|bmp|JPEG|jpeg)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }]
      },
      {
        test: /\.(eot|woff|ttf|woff2|svg)$/,
        use: 'url-loader'
      },
    ]
  },
  resolve: { extensions: ["*", '.js', '.jsx']},
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: PORT,
    publicPath: `http://${HOST}:${PORT}/dist/`,
    hotOnly: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({
      url: `http://${HOST}:${PORT}`
    }),
    new ProgressBarPlugin(),
    // new HtmlWebpackPlugin({
    //   title: 'react demo',
    //   showErrors: true,
    // }),
    new CleanWebpackPlugin(),
  ],
}
