const {
  merge
} = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const path = require('path');

const publicPath = 'http://localhost:8889/';
module.exports = merge(baseConfig, {
    mode: 'development',

    entry: {
        monaco: path.join(process.cwd(), './src/index.ts'),
        bootstrap: path.join(process.cwd(), './examples/amd/bootstrap.ts')
    },

    devtool: 'source-map',

    devServer: {
        port: '8888',
        publicPath,
        compress: true,
        stats: 'errors-only',
        inline: true,
        lazy: false,
        hot: true,
        open: true,
        openPage: '../examples/amd',
        disableHostCheck: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
        },
        watchOptions: {
            aggregateTimeout: 300,
            ignored: /node_modules/,
            poll: 100
        },
        historyApiFallback: {
            verbose: true,
            disableDotRule: false
        }
    },

    externals: ['monaco']
});