const webpack = require('webpack');

module.exports = {

    entry: [
        './demo/client.tsx'
    ],

    output: {
        filename: 'bundle.js',
        path: '/wp-out',
        publicPath: '/'
    },

    externals: undefined,

    devtool: 'source-map',

    resolve: {
        extensions: ['.ts', '.tsx']
    },

    module: {
        rules: [
            { test: /\.ts/, use: ['awesome-typescript-loader'], exclude: /node_modules/ },
            { test: /\.tsx/, use: ['awesome-typescript-loader'], exclude: /node_modules/ },
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
            { test: /\.jpe?g$|\.gif$|\.png$|\.ico$/, use: 'file-loader' },
            { test: /\.eot|\.ttf|\.svg|\.woff2?/, use: 'file-loader' },
        ]
    },

    stats: {
        colors: true
    }
};