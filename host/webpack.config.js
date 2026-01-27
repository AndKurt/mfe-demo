const { ModuleFederationPlugin } = require('webpack').container
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const deps = require('./package.json').dependencies

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  devServer: {
    port: 3001,
    hot: true,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    static: {
      directory: path.join(__dirname, 'dist'),
    },
  },
  output: {
    publicPath: 'http://localhost:3001/',
    uniqueName: 'host',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        auth: 'auth@http://localhost:3002/remoteEntry.js',
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          eager: true,
          requiredVersion: deps.react,
        },
        'react-dom': {
          singleton: true,
          eager: true,
          requiredVersion: deps['react-dom'],
        },
        'react-redux': {
          singleton: true,
          eager: true,
          requiredVersion: deps['react-redux'],
        },
        'shared-redux': {
          singleton: true,
          eager: true,
          requiredVersion: deps['shared-redux'],
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
}
