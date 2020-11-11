const {
  merge
} = require('webpack-merge');
const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const baseConfig = require('./webpack.config.base');

const publicPath = 'https://bce.bdstatic.com/console/static/';

module.exports = merge(baseConfig, {
    mode: 'production',

    entry: {
        monaco: path.join(process.cwd(), './src/index.ts')
    },

    output: {
        path: path.resolve(process.cwd(), 'dist-npm'),
    },

    plugins: [
        new MonacoWebpackPlugin({
            publicPath,
            languages: ['json', 'javascript'],
            features: ['coreCommands']
        })
    ],

    externals: ['san']
});