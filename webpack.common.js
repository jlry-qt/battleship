const path = require('path')

module.exports = {
    entry: './src/index.js',

    output: {
        // changes to [name].[contenthash].js if there are multiple entry.
        filename: 'main.[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },

    module: {
        rules: [
            {
                // what the fck is the difference between these two regex
                // //\.png|svg|jpeg$/i
                test: /\.png|svg|jpeg/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/images/[name].[hash].[ext]',
                },
            },
        ],
    },
}
