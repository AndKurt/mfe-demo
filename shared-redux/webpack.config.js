const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
    globalObject: 'this',
  },
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
      stream: false,
      crypto: false,
      http: false,
      https: false,
      zlib: false,
      url: false,
      buffer: false,
      assert: false,
      util: false,
      fs: false,
      path: false,
      os: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            compilerOptions: {
              target: 'es5',
              module: 'commonjs',
            },
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  externals: {
    react: 'commonjs react',
    'react-redux': 'commonjs react-redux',
    '@reduxjs/toolkit': 'commonjs @reduxjs/toolkit',
  },
}
