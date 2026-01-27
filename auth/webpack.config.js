const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container
const path = require('path')
const deps = require('./package.json').dependencies

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  devServer: {
    port: 3002,
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
    publicPath: 'http://localhost:3002/',
    uniqueName: 'auth',
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
          transpileOnly: true, // для ускорения
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'auth',
      filename: 'remoteEntry.js',
      exposes: {
        './LoginForm': './src/components/LoginForm',
        //'./UserProfile': './src/components/UserProfile',
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
        'react-redux': {
          singleton: true,
          requiredVersion: deps['react-redux'],
        },
        'shared-redux': {
          singleton: true,
          requiredVersion: deps['shared-redux'],
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
}
