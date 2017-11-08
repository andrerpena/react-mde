const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

    entry: [
        './demo/client.tsx'
    ],

    output: {
        filename: 'bundle-prod.js',
        path: path.resolve(__dirname, 'docs'),
        publicPath: '/docs/'
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss', '.json']
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)/,
                use: {
                    loader: 'awesome-typescript-loader',
                    options: {
                        configFileName: "tsconfig.demo.prod.json"
                    },
                },
                exclude: /node_modules/,
            },
            {test: /\.css/, use: ExtractTextPlugin.extract({use: "css-loader"})},
            {
                test: /\.scss/,
                use: ExtractTextPlugin.extract({use: ["css-loader", "sass-loader"]})
            },
            {test: /\.jpe?g$|\.gif$|\.png$|\.ico$/, use: 'file-loader?name=[name].[ext]'},
            {test: /\.eot|\.ttf|\.svg|\.woff2?/, use: 'file-loader?name=[name].[ext]'},
        ]
    },

    plugins: [
        new ExtractTextPlugin("bundle.css"),
    ]
};