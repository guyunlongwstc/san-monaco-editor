const path = require('path');
const webpack = require('webpack');
const tsImportPluginFactory = require('ts-import-plugin');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

const getStyleLoaders = () => {
    return [
        {
            loader: 'style-loader'
        },
        // isEnvProduction && {
        //     loader: MiniCssExtractPlugin.loader
        // },
        {
            loader: 'css-loader'
        },
        {
            loader: 'postcss-loader',
            options: {
                plugins: [
                    cssnano({
                        preset: 'default'
                    }),
                    autoprefixer()
                ],
                sourceMap: true
            }
        },
        {
            loader: 'less-loader'
        }
    ].filter(Boolean);
};

module.exports = {
    mode: 'production',

    output: {
        path: path.resolve(process.cwd(), 'dist'),
        filename: '[name].js',
        libraryTarget: 'umd',
    },

    resolve: {
        extensions: ['.js', '.ts', '.d.ts']
    },

    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use:
                    [
                        {
                            loader: 'babel-loader'
                        },
                        {
                            loader: 'ts-loader',
                            options: {
                                transpileOnly: true,
                                getCustomTransformers: () => ({
                                    before: [
                                        tsImportPluginFactory({
                                            style: false,
                                            libraryName: 'lodash',
                                            libraryDirectory: null,
                                            camel2DashComponentName: false
                                        })
                                    ]
                                }),
                                compilerOptions: {
                                    module: 'es2015'
                                }
                            }
                        }
                    ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|ttf)$/,
                loader: 'file-loader'
            },
            {
                test: /\.less$/,
                use: getStyleLoaders()
            },

        ]
    },

    plugins: [
        new webpack.EnvironmentPlugin({
            VERSION: JSON.stringify(process.env.VERSION || 'DEV'),
            NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production')
        }),

        // new webpack.NamedModulesPlugin(),

        new webpack.SourceMapDevToolPlugin({
            filename: '[name]-[hash:8].js.map'
        })
    ]
};