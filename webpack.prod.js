const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const MiniCssExtract = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
    mode: 'production',

    plugins: [
        new MiniCssExtract({
            filename: 'assets/styles/[name].[contenthash].css',
        }),

        // Spits out an html document into the dist/ folder
        new HtmlWebpackPlugin({
            template: './src/index.html',
            // just plain index.html to it can be served
            filename: '[name].[contenthash].html',
        }),
    ],

    devtool: 'source-map',

    module: {
        rules: [
            {
                // Extracts CSS file and emits into the build folder
                test: /\.(sa|sc|c)ss$/i,
                use: [MiniCssExtract.loader, 'css-loader'],
            },
        ],
    },
})
