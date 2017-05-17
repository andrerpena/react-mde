import fs from 'fs';
import express from 'express';
import colors from 'colors';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';
import webpackConfig from '../webpack.config.demo.dev';
import packageJson from '../package.json';


const webpackCompiler = webpack(webpackConfig);

require.extensions['.html'] = (module, filename) => {
    module.exports = fs.readFileSync(filename, 'utf8');
};

const app = express();

app.use(webpackMiddleware(webpackCompiler));
app.use(webpackHotMiddleware(webpackCompiler));
/*eslint-disable*/
app.use((req, res) => res.status(200).send(require('./index.html')));
/*eslint-enable*/

app.listen(4000, '0.0.0.0', () => {
    console.log(colors.green(`${packageJson.name} at http://localhost:4000/`));
});
