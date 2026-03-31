const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack')
const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'src/index.ts'),
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  output: {
    publicPath: 'http://localhost:3001/',
  },
  optimization: {
    moduleIds: 'named',
    chunkIds: 'named',
    splitChunks: false,
    runtimeChunk: false,
  },
  devServer: {
    port: 3001,
    historyApiFallback: true,
    static: [{ directory: path.resolve(__dirname, 'public') }, { directory: path.resolve(__dirname, 'dist') }],
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-react', { runtime: 'automatic' }], '@babel/preset-typescript'],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.module\.css$/,
        use: [MiniCssExtractPlugin.loader, { loader: 'css-loader', options: { modules: true } }],
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    new ModuleFederationPlugin({
      name: 'recipes',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^19.0.0' },
        'react-dom': { singleton: true, requiredVersion: '^19.0.0' },
        'react-router-dom': { singleton: true },
      },
    }),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
  ],
}
