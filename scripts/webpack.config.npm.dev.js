const {
  merge
} = require('webpack-merge');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const path = require('path');
const baseConfig = require('./webpack.config.base');

const publicPath = 'http://localhost:8888/';

module.exports = merge(baseConfig, {
    mode: 'development',

    entry: {
        monaco: path.join(process.cwd(), './src/index.ts'),
        bootstrap: path.join(process.cwd(), './examples/npm/bootstrap.ts')
    },

    devtool: 'source-map',

    output: {
        publicPath
    },

    plugins: [
        new MonacoWebpackPlugin({
            publicPath,
            languages: ['json', 'javascript'],
            features: ['coreCommands']
        })
    ],

    devServer: {
        port: '8888',
        publicPath,
        compress: true,
        stats: 'errors-only',
        inline: true,
        lazy: false,
        hot: true,
        open: true,
        openPage: '../examples/npm',
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