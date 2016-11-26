import fs from 'fs';
import React from 'react';
import express from 'express';
import webpackConfig from '../webpack.config.demo.dev';
import colors from 'colors';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';
import packageJson from '../package.json';

const webpackCompiler = webpack(webpackConfig);

require.extensions['.html'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

let app = express();

app.use(webpackMiddleware(webpackCompiler));
app.use(webpackHotMiddleware(webpackCompiler));
app.use((req, res) => res.status(200).send(require('./index.html')));

app.listen(4000, '0.0.0.0', function () {
    console.log(colors.green(`${packageJson.name} at http://localhost:4000/`));
});