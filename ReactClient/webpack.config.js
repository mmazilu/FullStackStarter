const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        app: [
            './src/app.js'
        ]
    },

    output: {
        path: path.resolve(__dirname + '/dist'),
        filename: '[name].js'
    },

    plugins: [
        new CopyWebpackPlugin([
            {
                from: 'index.html'
            },
            {
                from: 'dist/*',
                to: './../../NodeJS/public/',
                flatten: true,
                force: true
            }
        ])//,

        //new webpack.optimize.OccurenceOrderPlugin(),
        //
        //new webpack.optimize.UglifyJsPlugin({
        //    minimize: true,
        //    compressor: {
        //        warnings: false
        //    }
        //})
    ],

    module: {
        loaders: [
            {
                test: /\.(scss)$/,
                loaders: [
                    'style',
                    'css',
                    'sass'
                ]
            },
            {
                test: /(\.jsx|\.js)$/,
                loader: 'babel-loader'
            },
            {
                test: /\.html$/,
                loader: 'file?name=[name].[ext]'
            }
        ]
    },

    devServer: {
        inline: true,
        stats: { colors: true },
        proxy: {
            '*': {
                bypass: function(req, res, proxyOptions) {
                    return '/index.html';
                }
            },
            '/api/*': "http://localhost:4000"
        }
    }
};