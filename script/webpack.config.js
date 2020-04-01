const path = require('path');
const isProd = 'PRODUCTION' in process.env;
module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: path.resolve(__dirname, '../lib/index.js'),
  devtool: isProd ? false : 'sourcemap',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: `jinge-wasm-utility.${isProd ? 'min.' : ''}js`,
    chunkFilename: `jinge-wasm-utility.[hash].[name].${isProd ? 'min.' : ''}js`,
    library: 'JingeWasmUtility',
    libraryTarget: 'umd'
  },
  devServer: {
    publicPath: '/.tmp',
    contentBase: path.resolve(__dirname, '../')
  }
};
