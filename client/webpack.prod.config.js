const { resolvePath } = require('./constant');

const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

process.env.NODE_ENV = 'production';

const rules = [
  {
    test: /\.(css)$/i,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
      },
      { loader: 'postcss-loader' },
    ],
  },
  {
    test: /\.(scss)$/i,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
      },
      'sass-loader',

      { loader: 'postcss-loader' },
    ],
  },
  {
    test: /\.(jsx|js)$/i,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
    },
  },
  {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 8000,
        },
      },
      {
        loader: 'file-loader',
        options: {
          name: '[path]/[contenthash:8].[ext]',
        },
      },
    ],
  },
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource',
  },
  {
    test: /\.(csv|tsv)$/i,
    use: ['csv-loader'],
  },
  {
    test: /\.xml$/i,
    use: ['xml-loader'],
  },
];

module.exports = {
  target: 'web',
  entry: resolvePath('src/index.js'),
  mode: 'production',
  output: {
    path: resolvePath('build'),
    filename: 'assets/js/main.[contenthash:8].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  devtool: 'source-map',
  plugins: [
    new htmlWebpackPlugin({
      filename: 'index.html',
      title: 'react boilerplate',
      template: './public/index.html',
      inject: true,
    }),
    new MiniCSSExtractPlugin({
      filename: 'assets/css/main.[contenthash:8].css',
      chunkFilename: '[id].css',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: resolvePath('public'),
          to: resolvePath('build'),
          globOptions: {
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
  ],
  module: { rules },
};
