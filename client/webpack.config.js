const htmlWebpackPlugin = require('html-webpack-plugin');
const { resolvePath, HOST } = require('./constant');

process.env.NODE_ENV = 'development';

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
      'url-loader',
      {
        loader: 'file-loader',
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
  entry: {
    app: resolvePath('src/index.js'),
  },
  mode: 'development',
  output: {
    filename: 'main.[contenthash:8].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  devtool: 'source-map',
  devServer: {
    port: 3000,
    server: 'http',
    liveReload: true,
    compress: true,
    headers: {
      'X-Custom-Author': 'saddam',
    },
    client: {
      logging: 'log',
    },
    hot: true,
    historyApiFallback: true,
    host: HOST,
    static: resolvePath('public'),
  },
  plugins: [
    new htmlWebpackPlugin({
      inject: true,
      title: 'react boilerplate',
      template: resolvePath('public/index.html'),
    }),
  ],
  module: { rules },
};
