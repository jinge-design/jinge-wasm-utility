const path = require('path');
const isProd = 'PRODUCTION' in process.env;
module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: path.resolve(__dirname, '../lib/index.js'),
  devtool: isProd ? false : 'sourcemap',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: `jinge-wasm-utility.${isProd ? 'min.' : ''}js`,
    chunkFilename: `[contenthash].${isProd ? 'min.' : ''}js`,
    library: 'JingeWasmUtility',
    libraryTarget: 'umd'
  },
  module: {
    rules: [{
      test: /\.wasm$/,
      type: 'javascript/auto', /** this disabled webpacks default handling of wasm */
      use: [{
        loader: 'file-loader',
        options: {
          name: '[contenthash].[ext]'
        }
      }]
    }]
  },
  devServer: {
    publicPath: '/.tmp',
    contentBase: path.resolve(__dirname, '../')
  }
};
