const path = require('path');
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

const publicPath = 'http://localhost:8887/';


module.exports = merge(baseConfig, {
    mode: 'development',

    devtool: 'source-map',

    entry: {
        monaco: path.join(process.cwd(), './src/index.ts'),
        bootstrap: path.resolve(__dirname, '../doc/bootstrap.ts')
    },

    resolveLoader: {
        modules: ['node_modules', path.resolve(__dirname, './loaders')]
    },

    module: {
        rules: [
            {
                test: /\.md$/,
                use: [
                    {
                        loader: 'san-md-loader',
                        options: {
                            templateClass: 'san-component-container',
                            plugins: [
                                [
                                    require('markdown-it-toc-and-anchor').default,
                                    {
                                        tocFirstLevel: 4,
                                        tocLastLevel: 4,
                                        anchorLinkSymbolClassName: 's-doc-anchor'
                                    }
                                ]
                            ]
                        }
                    },
                    'demo-loader'
                ]
            }
        ]
    },

    output: {
        filename: '[name].js',
        libraryTarget: 'umd',
        chunkFilename: '[name].js',
        publicPath
    },

    plugins: [
        new webpack.NamedModulesPlugin()
    ],

    externals: ['san', 'san-router', 'monaco'],

    devServer: {
        port: '8887',
        publicPath,
        compress: true,
        stats: 'errors-only',
        inline: true,
        lazy: false,
        hot: true,
        open: true,
        openPage: 'doc/',
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
    }
});
