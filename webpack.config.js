/* eslint-disable */
const fs = require('fs');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');

const PAGES_DIR = path.join(__dirname, 'src/pages');
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'))

module.exports = (env) => {
    const prod = env.production !== undefined;

    return {
        entry: [
            './src/index'
        ],
        mode: 'development',
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.pug$/,
                    loader: 'pug-loader',
                    query: { pretty: true }
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: [/node_modules/, path.resolve(__dirname, 'server.js')],
                    use: [
                        'babel-loader'
                    ]
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    autoprefixer()
                                ]
                            }
                        }
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    autoprefixer()
                                ]
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                },
                {
                    test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'assets',
                                publicPath: prod ? '/assets/template/dist/assets/' : './assets', // '/assets/template/dist/assets' // './assets' - for dev
                            },
                        }
                    ]
                }
        ]
        },
        resolve: {
            extensions: ['*', '.js', '.jsx']
        },
        output: {
            path: __dirname + '/dist',
            publicPath: '/',
            filename: 'bundle.js'
        },
        plugins: [
            ...PAGES.map(page => new HtmlWebpackPlugin({
                template: `${PAGES_DIR}/${page}`,
                filename: `${page.replace(/\.pug/,'.html')}`,
                minify: false,
                inject: false
            })),
            new MiniCssExtractPlugin({
                filename: 'style.css'
            }),
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery"
            })
        ],
        stats: {
            children: false,
            moduleAssets: false,
            modules: false,
        }
    };
}