const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: "development",

    entry: [
        './demo/client.tsx'
    ],

    output: {
        filename: 'bundle.js',
        path: path.resolve('./demo'),
        publicPath: '/'
    },

    devtool: 'source-map',

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },

    module: {
        rules: [
            { test: /\.ts(x?)/, use: ['awesome-typescript-loader'], exclude: /node_modules/ },
            {test: /\.css/, use: ['style-loader', 'css-loader']},
            {
                test: /\.scss$/, use: [
                {
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader', options: {sourceMap: true}
                },
                {
                    loader: 'sass-loader', options: {sourceMap: true}
                }]
            },
            { test: /\.jpe?g$|\.gif$|\.png$|\.ico$/, use: 'file-loader?name=[name].[ext]' },
            { test: /\.eot|\.ttf|\.svg|\.woff2?/, use: 'file-loader?name=[name].[ext]' },
        ]
    },

    stats: {
        colors: true
    }
};