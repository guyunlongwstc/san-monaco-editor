const {
  merge
} = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const path = require('path');

module.exports = merge(baseConfig, {
    mode: 'production',

    entry: {
        monaco: path.join(process.cwd(), './src/index.ts')
    },

    output: {
        path: path.resolve(process.cwd(), 'dist-amd'),
        chunkFilename: '[name].js'
    },

    externals: ['san']
});