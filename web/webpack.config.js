const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: {
        app: './index.js',
    },
    output: {
        path: path.resolve(__dirname, './public'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    devServer: {
        contentBase: path.resolve(__dirname, './public'),
        host: '0.0.0.0'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: {presets: ['es2015']}
                }],
            },
            {
                test: /\.(sass|scss)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: ['file-loader?context=src/images&name=images/[name].[ext]', {
                    loader: 'image-webpack-loader',
                    query: {
                        mozjpeg: {
                            progressive: true,
                        },
                        gifsicle: {
                            interlaced: false,
                        },
                        optipng: {
                            optimizationLevel: 4,
                        },
                        pngquant: {
                            quality: '75-90',
                            speed: 3,
                        },
                    },
                }],
            }
        ],
    },
    plugins: [
        new CleanWebpackPlugin(['css/main.css', 'js/bundle.js'], {
            root: __dirname + '/public',
            verbose: true,
            dry: false, // true for simulation
        }),
    ]
};
