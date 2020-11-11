const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {merge} = require('webpack-merge');
const baseConfig = require('./webpack.config.base');


module.exports = merge(baseConfig, {
    mode: 'development',

    devtool: 'source-map',

    entry: {
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
        path: path.join(process.cwd(), 'dist-doc'),
        chunkFilename: '[name].js',
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: false,
            template: path.resolve(process.cwd(), './doc/index.prod.html'),
            env: (process.env.NODE_ENV || 'production')
        })
    ],

    externals: ['san', 'san-router', 'monaco']
});
