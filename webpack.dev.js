const { merge } = require('webpack-merge')
const path = require('path')
const common = require('./webpack.common.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
    mode: 'development',

    devtool: 'eval',

    plugins: [
        // Spits out an html document into the dist/ folder
        new HtmlWebpackPlugin({
            template: './src/index.html',
            // just plain index.html to it can be served
            filename: 'index.html',
        }),
    ],

    devServer: {
        static: {
            // This tells the dev server "where and what" files to serve
            directory: path.resolve(__dirname, 'dist'),
        },
        watchFiles: ['src/*'], // Reloads when changes are made in the src directory
        compress: true,
        port: 8080,
    },

    module: {
        rules: [
            {
                // For development mode use style-loader,
                // because it injects CSS into the DOM using multiple and works faster.
                // Needed to install style-loader and css-loader
                test: /\.(sa|sc|c)ss$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
})
